/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, Product } from './types.ts';
import { ELECTROBOLT_CATALOGUE } from './data/products.ts';
import { Header } from './components/Header.tsx';
import { QuickOptionsBar } from './components/QuickOptionsBar.tsx';
import { ChatMessageItem } from './components/ChatMessageItem.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { ProductComparisonModal } from './components/ProductComparisonModal.tsx';
import { HumanSupportModal } from './components/HumanSupportModal.tsx';
import { CatalogueBrowserModal } from './components/CatalogueBrowserModal.tsx';
import {
  Send,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  Info,
  Layers,
  Phone,
  HelpCircle,
} from 'lucide-react';

const INITIAL_WELCOME_MESSAGES: Record<'en' | 'hi' | 'hinglish', string> = {
  en: `👋 Hi! I’m the electrobolt.electro AI Product Advisor.

I can help you find the right electrical or electronic product based on your needs, budget, room size, usage, and preferred features.

What are you looking for today?`,

  hi: `👋 नमस्ते! मैं electrobolt.electro AI Product Advisor हूँ।

मैं आपकी आवश्यकताओं, बजट, कमरे के आकार, उपयोग और पसंदीदा सुविधाओं के आधार पर सही इलेक्ट्रिकल या इलेक्ट्रॉनिक उत्पाद चुनने में मदद कर सकता हूँ।

आज आप क्या खोज रहे हैं?`,

  hinglish: `👋 Hi! Main hoon electrobolt.electro AI Product Advisor.

Main aapki needs, budget, room size, usage aur preferred features ke according perfect electrical ya electronic product choose karne mein help kar sakta hoon.

Aaj aap kya dhoondh rahe hain?`,
};

export default function App() {
  const [language, setLanguage] = useState<'en' | 'hi' | 'hinglish'>('en');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      role: 'model',
      text: INITIAL_WELCOME_MESSAGES['en'],
      timestamp: new Date(),
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportPrefillProduct, setSupportPrefillProduct] = useState<Product | null>(null);
  const [isCatalogueModalOpen, setIsCatalogueModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle language switch
  const handleSelectLanguage = (lang: 'en' | 'hi' | 'hinglish') => {
    setLanguage(lang);
    // If only welcome message exists, update it to selected language
    if (messages.length === 1 && messages[0].id === 'msg-welcome') {
      setMessages([
        {
          id: 'msg-welcome',
          role: 'model',
          text: INITIAL_WELCOME_MESSAGES[lang],
          timestamp: new Date(),
        },
      ]);
    }
  };

  // Compare products toggle
  const handleToggleCompare = (product: Product) => {
    setComparedProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 3) {
        // limit to 3 products for clean table comparison
        return [...prev.slice(1), product.id];
      }
      return [...prev, product.id];
    });
  };

  // Send message to server Gemini endpoint
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : inputQuery).trim();
    if (!text || isLoading) return;

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputQuery('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.text || 'I could not process that request. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMessage('Could not connect to electrobolt.electro AI Advisor. Please check network or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Option Button clicked
  const handleSelectQuickOption = (_label: string, promptText: string) => {
    handleSendMessage(promptText);
  };

  // Ask Advisor specific question about a product
  const handleAskAboutProduct = (product: Product) => {
    const prompt = `Can you tell me more about the ${product.name} (${product.formattedPrice})? Is it suitable for my requirements?`;
    handleSendMessage(prompt);
  };

  // Ask comparison in chat
  const handleAskComparisonInChat = () => {
    const comparedProducts = ELECTROBOLT_CATALOGUE.filter((p) =>
      comparedProductIds.includes(p.id)
    );
    if (comparedProducts.length < 2) return;
    const names = comparedProducts.map((p) => p.name).join(' vs ');
    handleSendMessage(`Please compare these products: ${names}`);
  };

  // Clear chat conversation
  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-welcome',
        role: 'model',
        text: INITIAL_WELCOME_MESSAGES[language],
        timestamp: new Date(),
      },
    ]);
    setErrorMessage(null);
  };

  // Open support modal with prefilled product
  const handleRequestQuote = (product: Product) => {
    setSupportPrefillProduct(product);
    setIsSupportModalOpen(true);
  };

  const comparedProductsList = ELECTROBOLT_CATALOGUE.filter((p) =>
    comparedProductIds.includes(p.id)
  );

  return (
    <div id="electrobolt-electro-app" className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 antialiased">
      {/* Header */}
      <Header
        onOpenCatalogue={() => setIsCatalogueModalOpen(true)}
        onOpenComparison={() => setIsComparisonModalOpen(true)}
        onOpenSupport={() => {
          setSupportPrefillProduct(null);
          setIsSupportModalOpen(true);
        }}
        selectedLanguage={language}
        onSelectLanguage={handleSelectLanguage}
        comparisonCount={comparedProductIds.length}
      />

      {/* Quick Category Options Bar */}
      <QuickOptionsBar onSelectOption={handleSelectQuickOption} disabled={isLoading} />

      {/* Main Chat Workspace */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-4 flex flex-col justify-between">
        {/* Messages Scroll Container */}
        <div id="chat-stream-container" className="flex-1 overflow-y-auto space-y-2 pb-4">
          {messages.map((msg) => (
            <ChatMessageItem
              key={msg.id}
              message={msg}
              onViewProduct={(prod) => setSelectedProduct(prod)}
              onToggleCompare={handleToggleCompare}
              comparedProductIds={comparedProductIds}
              onAskAboutProduct={handleAskAboutProduct}
            />
          ))}

          {/* Loading Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 my-4 justify-start">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Zap className="w-4 h-4 fill-slate-950 animate-bounce" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-75"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-150"></span>
                <span className="text-xs text-slate-500 font-medium ml-1">
                  Advisor checking electrobolt.electro catalogue & specs...
                </span>
              </div>
            </div>
          )}

          {/* Error notice */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => handleSendMessage()}
                className="font-bold underline text-red-900 hover:text-red-700 cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Chips */}
        {messages.length <= 2 && (
          <div className="py-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Popular customer inquiries:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'I need a ceiling fan under ₹3,000.',
                'Best 1.5 Ton 5-Star Split AC for 150 sq ft bedroom.',
                'Which wire size is recommended for 1.5 Ton AC and geyser?',
                'Compare Aeroflow BLDC vs StormAir Ultra fan.',
                'Kya aapke paas battery backup wala emergency bulb hai?',
                'Fully automatic vs semi-automatic washing machine for family of 4.',
              ].map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(query)}
                  className="text-xs bg-white hover:bg-amber-50 hover:text-amber-900 border border-slate-200 hover:border-amber-300 text-slate-700 px-3 py-1 rounded-full transition-all cursor-pointer shadow-2xs text-left"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input Floating Box */}
        <div className="sticky bottom-2 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-300/80 shadow-md p-2 mt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2"
          >
            <div className="flex-1 min-h-[44px] flex items-center">
              <textarea
                ref={textareaRef}
                id="advisor-chat-input"
                rows={1}
                value={inputQuery}
                onChange={(e) => {
                  setInputQuery(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={
                  language === 'hi'
                    ? 'अपनी आवश्यकता, रूम साइज या बजट लिखें (जैसे 3000 के अंदर सीलिंग फैन)...'
                    : language === 'hinglish'
                    ? 'Apna requirement, room size ya budget likhein...'
                    : 'Ask about ceiling fans, ACs, TVs, washing machines, wires, lighting, or budget...'
                }
                className="w-full text-xs sm:text-sm px-3 py-2 bg-transparent border-0 focus:outline-hidden resize-none max-h-32 text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-1 shrink-0 pb-1 pr-1">
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              <button
                id="send-query-btn"
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-200 text-slate-950 disabled:text-slate-400 transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Helper Subtext */}
          <div className="px-2 pt-1.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 mt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Grounded in official electrobolt.electro catalogue • Never invents prices or stock</span>
            </span>
            <span className="hidden sm:inline">Press Enter to send</span>
          </div>
        </div>
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onToggleCompare={handleToggleCompare}
        isCompared={selectedProduct ? comparedProductIds.includes(selectedProduct.id) : false}
        onAskAboutProduct={handleAskAboutProduct}
        onRequestQuote={handleRequestQuote}
      />

      {/* Product Comparison Modal */}
      {isComparisonModalOpen && (
        <ProductComparisonModal
          products={comparedProductsList}
          onClose={() => setIsComparisonModalOpen(false)}
          onRemoveProduct={(id) =>
            setComparedProductIds((prev) => prev.filter((pId) => pId !== id))
          }
          onAskComparisonInChat={handleAskComparisonInChat}
        />
      )}

      {/* Human Support / Quotation Modal */}
      {isSupportModalOpen && (
        <HumanSupportModal
          onClose={() => setIsSupportModalOpen(false)}
          prefilledProduct={supportPrefillProduct}
        />
      )}

      {/* Live Catalogue Browser Modal */}
      {isCatalogueModalOpen && (
        <CatalogueBrowserModal
          onClose={() => setIsCatalogueModalOpen(false)}
          onViewProduct={(prod) => setSelectedProduct(prod)}
          onToggleCompare={handleToggleCompare}
          comparedProductIds={comparedProductIds}
          onAskAboutProduct={handleAskAboutProduct}
        />
      )}
    </div>
  );
}
