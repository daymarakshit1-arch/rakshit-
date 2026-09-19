import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { ELECTROBOLT_CATALOGUE } from './src/data/products.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for lead submissions
const leadsStore: any[] = [];

// Lazy initialization of Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// System Instruction incorporating the entire Master Prompt
const SYSTEM_INSTRUCTION = `
You are “electrobolt.electro AI Product Advisor,” an intelligent shopping assistant for the electrobolt.electro website.

Your primary job is to help website visitors discover, compare, and choose electrical and electronic products that best match their needs, preferences, room requirements, and budget.

WEBSITE: electrobolt.electro
WEBSITE URL: /

BUSINESS CATEGORIES:
- Ceiling Fans
- Fans
- Air Conditioners
- Televisions
- Washing Machines
- Electrical Wires & Cables
- LED Tubelights
- LED Bulbs
- Fancy / Decorative Lights
- Other Electrical & Electronic Appliances

CORE OBJECTIVE:
Help customers make an informed product choice quickly and easily.
Do NOT simply display a long list of products. Ask relevant questions, understand the customer's requirements, and recommend the most suitable products from the electrobolt.electro catalogue.

IMPORTANT GROUNDING RULES:
1. Only recommend products that actually exist in the electrobolt.electro product catalogue provided below.
2. Never invent:
   - Product names
   - Prices
   - Specifications
   - Warranty information
   - Stock availability
   - Discounts
   - Product URLs
   - Features
3. If product information is unavailable, clearly say that the information is not currently available.
4. If stock information is unavailable, say: "I can show you the product details, but I don’t currently have verified live stock information."

RECOMMENDATION PROCESS:
STEP 1: Identify the product category.
STEP 2: Ask only the questions necessary to make a useful recommendation:
- Ceiling Fans: Room size, Budget, Preferred design, Airflow preference, Energy efficiency preference, Noise preference, Remote-control requirement
- AC: Room size, Budget, Cooling requirement, Energy-efficiency preference, Inverter/non-inverter preference, Usage duration
- Television: Screen size, Budget, Room size, Smart TV requirement, Preferred display features, Usage (movies, gaming, sports, normal)
- Washing Machines: Budget, Family size, Approximate washing load, Fully automatic/semi-automatic preference, Front-load/top-load preference, Important features
- Lighting: Room/application, Required brightness, Light type, Wattage, Colour temperature, Budget, Decorative vs functional requirement
- Electrical Wires: Application, Required length, Wire type, Load/application requirement, Installation type, Budget
Do not ask unnecessary questions.

BUDGET HANDLING:
If the customer provides a budget, prioritize products within that budget.
Example: "I need a ceiling fan under ₹3,000." -> Respond with suitable products within ₹3,000 when available.
If no suitable product is available within budget, explain that clearly and show the closest available alternatives without falsely claiming they are within budget.

RECOMMENDATION FORMAT:
After collecting enough information, provide up to 3 suitable recommendations.
Use this format:
“Based on your requirements, these electrobolt.electro products may be suitable:”

PRODUCT 1:
Product Name: [Exact name from catalogue]
Price: [Exact price with ₹]
Key Features: [Bullet points]
Why it matches: [Specific explanation linking customer's requirement]
Warranty: [Exact warranty]
Product URL: [View Product](url from catalogue)

(Repeat for PRODUCT 2 and PRODUCT 3 if applicable)
Keep recommendations concise, structured, and easy to understand.

PRODUCT COMPARISON FORMAT:
If the customer asks: “Compare these products” or asks to compare 2 or 3 items:
Create a simple comparison markdown table:
| Feature | Product 1 | Product 2 | Product 3 |
|---------|-----------|-----------|-----------|
| Price | | | |
| Power | | | |
| Key Feature | | | |
| Warranty | | | |
| Best For | | | |

Do not declare a universal “best product.”
Instead explain which product fits which type of requirement (e.g., “Product A may suit customers prioritizing energy efficiency, while Product B may be more suitable for customers prioritizing airflow.”).

LANGUAGE SUPPORT:
- English, Hindi, Hinglish.
- If customer writes in Hindi, respond in Hindi (Devanagari).
- If customer writes in Hinglish, respond in natural Hinglish.
- If customer writes in English, respond in English.
Keep language simple, natural, and customer-friendly.

CUSTOMER EXPERIENCE:
Be helpful, friendly, professional, concise, and product-focused.
Never pressure the customer to buy.
Do not make unsupported claims like "Best product in India" or "Guaranteed lowest price".

QUESTIONS HANDLING:
- If customer asks "What should I buy?" -> Ask about requirements first.
- If "Which fan is good for my bedroom?" -> Ask room size and budget if not known.
- If "What is the cheapest product?" -> Identify lowest-priced relevant product from catalogue.
- If "What is best for me?" -> Ask requirements first.

HUMAN SUPPORT & BUSINESS ENQUIRIES:
If the customer wants to speak with a human or has a complex inquiry, respond:
“Sure! I can help you connect with the electrobolt.electro team for further assistance.”
Official Contact:
- Toll-free Helpline: 1800-209-BOLT (1800-209-2658) (Mon-Sat, 9:00 AM - 8:00 PM)
- Email: support@electrobolt.electro
- In-app request: You can click the "Request Callback / Quotation" button above.
Never invent other phone numbers or emails.
For Bulk / Business / Wholesale / Contractor / School / Hotel orders: Identify as a business enquiry and guide them to the electrobolt.electro Contractor & Bulk Order Desk (or to submit an enquiry via the Callback/Quotation form).

SAFETY:
For electrical products, never provide unsafe instructions. Do not encourage dangerous electrical installation or repairs. For wiring, high-power electrical connections, AC installation, recommend using a qualified licensed electrician or professional technician.

OFFICIAL ELECTROBOLT.ELECTRO PRODUCT CATALOGUE (SINGLE SOURCE OF TRUTH):
${JSON.stringify(ELECTROBOLT_CATALOGUE, null, 2)}
`;

// Helper fallback algorithm if Gemini API key is not configured or fails
function fallbackAdvisorResponse(userQuery: string, history: any[]): string {
  const query = userQuery.toLowerCase();

  // Language detection
  const isHindi = /[\u0900-\u097F]/.test(userQuery);
  const isHinglish = /\b(kya|kaunsa|kitna|chahiye|batao|kripya|sasta|achha|accha|dam|kam|paise)\b/i.test(query);

  // Human support request
  if (query.includes('human') || query.includes('agent') || query.includes('call') || query.includes('contact') || query.includes('phone') || query.includes('number') || query.includes('support team')) {
    if (isHindi) {
      return "ज़रूर! मैं आपको आगे की सहायता के लिए electrobolt.electro टीम से जुड़ने में मदद कर सकता हूँ।\n\n- **टोल-फ्री हेल्पलाइन**: 1800-209-BOLT (1800-209-2658) (सोम-शनि 9 AM - 8 PM)\n- **ईमेल**: support@electrobolt.electro\n- आप ऊपर दिए गए **Request Callback / Quotation** बटन पर क्लिक करके भी अपनी जानकारी दर्ज कर सकते हैं।";
    }
    return "Sure! I can help you connect with the electrobolt.electro team for further assistance.\n\n- **Toll-free Helpline**: 1800-209-BOLT (1800-209-2658) (Mon-Sat, 9:00 AM - 8:00 PM)\n- **Email**: support@electrobolt.electro\n- You can also click the **Request Callback / Quotation** button above to leave your details for our team.";
  }

  // Bulk / Business order
  if (query.includes('bulk') || query.includes('wholesale') || query.includes('dealer') || query.includes('contractor') || query.includes('hotel') || query.includes('school') || query.includes('office') || query.includes('project')) {
    return "Thank you for reaching out regarding business/bulk requirements! electrobolt.electro offers institutional pricing and direct contractor dispatch for commercial projects.\n\nPlease share your **Name, Contact number, and required product quantities**, or reach out to our dedicated B2B Desk:\n- **Helpline**: 1800-209-BOLT\n- **Email**: corporate@electrobolt.electro\n- Or click the **Request Callback / Quotation** button to submit your project bill of quantities (BOQ).";
  }

  // Comparison request
  if (query.includes('compare') || query.includes('अंतर') || query.includes('difference')) {
    const fans = ELECTROBOLT_CATALOGUE.filter(p => p.category === 'Ceiling Fans').slice(0, 3);
    return `Here is a side-by-side comparison of our popular ceiling fans:

| Feature | ${fans[0].name} | ${fans[1].name} | ${fans[2].name} |
|---------|-----------------|-----------------|-----------------|
| **Price** | ${fans[0].formattedPrice} | ${fans[1].formattedPrice} | ${fans[2].formattedPrice} |
| **Power** | ${fans[0].powerRating} | ${fans[1].powerRating} | ${fans[2].powerRating} |
| **Key Feature** | 5-Star Energy Saver + RF Remote | High Speed 380 RPM + Anti-Dust | Natural Teak Finish + IoT Smart App |
| **Warranty** | ${fans[0].warranty} | ${fans[1].warranty} | ${fans[2].warranty} |
| **Best For** | ${fans[0].bestFor} | ${fans[1].bestFor} | ${fans[2].bestFor} |

*Note: Product 1 suits energy-conscious bedrooms wanting silent remote operation; Product 2 suits high-speed airflow on a budget; Product 3 is ideal for designer living rooms.*`;
  }

  // Identify category
  let matchedCategory = '';
  if (query.includes('ceiling fan') || query.includes('fan')) matchedCategory = 'Ceiling Fans';
  else if (query.includes('ac') || query.includes('air conditioner') || query.includes('cooling')) matchedCategory = 'Air Conditioners';
  else if (query.includes('tv') || query.includes('television') || query.includes('screen')) matchedCategory = 'Televisions';
  else if (query.includes('washing') || query.includes('washer') || query.includes('clothes')) matchedCategory = 'Washing Machines';
  else if (query.includes('wire') || query.includes('cable') || query.includes('wiring')) matchedCategory = 'Electrical Wires & Cables';
  else if (query.includes('tubelight') || query.includes('batten')) matchedCategory = 'LED Tubelights';
  else if (query.includes('bulb') || query.includes('lamp')) matchedCategory = 'LED Bulbs';
  else if (query.includes('chandelier') || query.includes('decorative') || query.includes('fancy light') || query.includes('strip')) matchedCategory = 'Fancy / Decorative Lights';
  else if (query.includes('geyser') || query.includes('heater') || query.includes('purifier') || query.includes('cooktop') || query.includes('induction')) matchedCategory = 'Other Electrical & Electronic Appliances';

  // Budget extraction
  const budgetMatch = query.match(/(?:under|below|less than|within|upto|budget)\s*(?:₹|rs\.?|inr)?\s*(\d{1,6})/i);
  const budgetNum = budgetMatch ? parseInt(budgetMatch[1], 10) : null;

  if (matchedCategory) {
    let items = ELECTROBOLT_CATALOGUE.filter(p => p.category === matchedCategory);
    if (budgetNum) {
      const budgetItems = items.filter(p => p.price <= budgetNum);
      if (budgetItems.length > 0) {
        items = budgetItems;
      } else {
        const closest = [...items].sort((a, b) => a.price - b.price)[0];
        return `We currently do not have a ${matchedCategory} within ₹${budgetNum}. Our closest available option is the **${closest.name}** at ${closest.formattedPrice}.\n\nWould you like to explore this model or adjust your budget?`;
      }
    }

    // Return recommendations in required format
    const topItems = items.slice(0, 3);
    let resp = `Based on your requirements, these electrobolt.electro products may be suitable:\n\n`;
    topItems.forEach((p, idx) => {
      resp += `PRODUCT ${idx + 1}:\n`;
      resp += `Product Name: ${p.name}\n`;
      resp += `Price: ${p.formattedPrice}\n`;
      resp += `Key Features:\n${p.keyFeatures.map(f => `• ${f}`).join('\n')}\n`;
      resp += `Why it matches: ${p.bestFor}\n`;
      resp += `Warranty: ${p.warranty}\n`;
      resp += `Product URL: [View Product](${p.productUrl})\n\n`;
    });
    return resp.trim();
  }

  // Default diagnostic response
  if (isHindi) {
    return "नमस्ते! मैं electrobolt.electro AI Product Advisor हूँ। कृपया मुझे बताएं कि आप किस उत्पाद श्रेणी की तलाश कर रहे हैं (जैसे सीलिंग फैन, एसी, टीवी, वाशिंग मशीन, वायर या एलईडी लाइटिंग), आपका रूम साइज और अनुमानित बजट क्या है?";
  }
  if (isHinglish) {
    return "Haanji! Aapko kis category mein product chahiye (jaise Ceiling Fan, Inverter AC, Smart TV, Washing Machine, ya Electrical Wires)? Apna room size aur budget batayein taaki main accurate recommendations de sakun.";
  }

  return "To help you make the best choice, could you tell me a little more about your requirements?\n\n• What is the room size or application area?\n• Do you have an approximate budget in mind?\n• Are there specific features you need (e.g. BLDC energy saving, remote control, smart IoT, silent operation)?";
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Products catalog endpoint
app.get('/api/products', (req, res) => {
  const { category, search, maxPrice } = req.query;
  let list = ELECTROBOLT_CATALOGUE;

  if (category && typeof category === 'string') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (search && typeof search === 'string') {
    const s = search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(s) || p.tags.some(t => t.toLowerCase().includes(s)));
  }
  if (maxPrice) {
    const priceNum = Number(maxPrice);
    if (!isNaN(priceNum)) {
      list = list.filter(p => p.price <= priceNum);
    }
  }

  res.json({ products: list, count: list.length });
});

// Lead generation & callback enquiries
app.post('/api/leads', (req, res) => {
  const { name, contact, productRequirement, type } = req.body;
  if (!name || !contact || !productRequirement) {
    res.status(400).json({ error: 'Name, Contact, and Product Requirement are required.' });
    return;
  }
  const lead = {
    id: `LEAD-${Date.now()}`,
    name,
    contact,
    productRequirement,
    type: type || 'quotation',
    createdAt: new Date().toISOString(),
  };
  leadsStore.push(lead);
  res.json({
    success: true,
    message: 'Your enquiry has been securely logged with the electrobolt.electro team. A technical representative will contact you shortly.',
    leadId: lead.id,
  });
});

// Main Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'Messages array is required' });
    return;
  }

  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.text || '';

  const ai = getGeminiClient();

  if (!ai) {
    // Graceful fallback to local grounded advisor engine
    const answer = fallbackAdvisorResponse(lastUserMessage, messages);
    res.json({ text: answer, model: 'local-grounded-fallback' });
    return;
  }

  try {
    // Format contents for Gemini
    const contents = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // low temperature for high catalogue precision and factual grounding
      },
    });

    const reply = response.text || "I'm sorry, I couldn't generate a response. Please try again or connect with our support team.";
    res.json({ text: reply, model: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Graceful fallback on API error so user gets a real grounded answer
    const fallbackAnswer = fallbackAdvisorResponse(lastUserMessage, messages);
    res.json({
      text: fallbackAnswer,
      model: 'local-grounded-fallback',
      warning: 'Processed via electrobolt.electro Grounded Rules Engine'
    });
  }
});

// ----------------------------------------------------
// VITE MIDDLEWARE SETUP
// ----------------------------------------------------
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`electrobolt.electro AI Advisor Server running on port ${PORT}`);
  });
}

start();
