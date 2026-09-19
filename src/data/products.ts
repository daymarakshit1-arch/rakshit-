import { Product } from '../types.ts';

export const ELECTROBOLT_CATALOGUE: Product[] = [
  // ----------------------------------------------------
  // CEILING FANS
  // ----------------------------------------------------
  {
    id: 'eb-fan-aeroflow-bldc',
    name: 'electrobolt.electro Aeroflow BLDC 1200mm',
    category: 'Ceiling Fans',
    price: 2899,
    formattedPrice: '₹2,899',
    powerRating: '28W BLDC Motor',
    warranty: '3 Years Comprehensive Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 42,
    keyFeatures: [
      '28W super energy-efficient BLDC copper motor',
      'High air delivery of 230 CMM with 360 RPM',
      'Point-anywhere RF Smart Remote with 6 speeds, sleep mode & timer',
      '5-Star BEE energy rating saving up to ₹1,500/year on electricity',
      'Ultra-silent aerodynamic ribbed blades'
    ],
    specs: {
      'Sweep Size': '1200 mm (48 inch)',
      'Power Consumption': '28 Watts',
      'Air Delivery': '230 CMM',
      'Speed': '360 RPM',
      'BEE Star Rating': '5 Star',
      'Motor Type': '100% Copper Brushless DC',
      'Control Type': 'RF Remote Control',
      'Noise Level': '< 38 dB'
    },
    bestFor: 'Medium bedrooms (10x12 to 12x14 ft) and energy-conscious homes looking for silent operation under ₹3,000.',
    roomSuitability: 'Bedrooms, Living Rooms, Study Rooms (100 - 150 sq ft)',
    energyRating: '5 Star BEE',
    productUrl: '/products/electrobolt-electro-aeroflow-bldc-1200mm',
    imageUrl: 'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Ensure ceiling hook is structurally anchored. Installation must be conducted with main circuit breaker turned OFF.',
    tags: ['bldc', 'remote', 'silent', 'energy-saving', '5-star', 'bedroom', 'under-3000']
  },
  {
    id: 'eb-fan-stormair-ultra',
    name: 'electrobolt.electro StormAir Ultra 1200mm',
    category: 'Ceiling Fans',
    price: 1999,
    formattedPrice: '₹1,999',
    powerRating: '52W Copper Motor',
    warranty: '2 Years Manufacturer Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 75,
    keyFeatures: [
      'High-speed 380 RPM for heavy, rapid air thrust',
      '100% high-grade electrolytic copper winding',
      'Anti-dust powder-coated metallic finish',
      'Double ball-bearing for long mechanical life',
      'Operates reliably even at low voltage (140V-260V)'
    ],
    specs: {
      'Sweep Size': '1200 mm (48 inch)',
      'Power Consumption': '52 Watts',
      'Air Delivery': '225 CMM',
      'Speed': '380 RPM',
      'Motor Type': 'Heavy-duty Induction Copper Motor',
      'Control Type': 'Wall Regulator Compatible',
      'Noise Level': '44 dB'
    },
    bestFor: 'Customers prioritizing maximum budget-friendliness (under ₹2,000) and strong air velocity for hot regions.',
    roomSuitability: 'Bedrooms, Dining Areas, Guest Rooms (90 - 140 sq ft)',
    energyRating: '3 Star BEE',
    productUrl: '/products/electrobolt-electro-stormair-ultra-1200mm',
    imageUrl: 'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Use certified 3-core connection wire. Mount minimum 7 feet above floor level.',
    tags: ['budget', 'high-speed', 'copper', 'under-2000', 'sturdy']
  },
  {
    id: 'eb-fan-luxewood-smart',
    name: 'electrobolt.electro LuxeWood Smart BLDC 1320mm',
    category: 'Ceiling Fans',
    price: 5499,
    formattedPrice: '₹5,499',
    powerRating: '32W BLDC Motor',
    warranty: '3 Years On-Site Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 28,
    keyFeatures: [
      'Handcrafted natural teak wood grain aesthetics',
      'Smart IoT Wi-Fi and Bluetooth enabled with Alexa & Google Assistant support',
      'Integrated under-light with 3-step dimming (Warm/Neutral/White)',
      'Reverse rotation mode for winter air circulation',
      'Aerodynamic wide-span 1320mm blades for expansive coverage'
    ],
    specs: {
      'Sweep Size': '1320 mm (52 inch)',
      'Power Consumption': '32 Watts (Fan) + 8W LED',
      'Air Delivery': '245 CMM',
      'Speed': '330 RPM',
      'Motor Type': 'WhisperDrive BLDC',
      'Smart Connectivity': 'Wi-Fi 2.4GHz, Alexa, Google Home, Mobile App',
      'Underlight': 'Warm / Daylight LED CCT'
    },
    bestFor: 'Modern living rooms, designer dining spaces, and buyers wanting premium aesthetics with smart home voice automation.',
    roomSuitability: 'Master Bedrooms, Large Living Rooms (150 - 220 sq ft)',
    energyRating: '5 Star BEE',
    productUrl: '/products/electrobolt-electro-luxewood-smart-1320mm',
    imageUrl: 'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Ceiling structure must support at least 15 kg dynamic load.',
    tags: ['smart', 'wifi', 'iot', 'teak', 'wooden', 'luxury', 'led-light', '5-star']
  },
  {
    id: 'eb-fan-whisperquiet-bldc',
    name: 'electrobolt.electro WhisperQuiet Bedroom BLDC 1200mm',
    category: 'Ceiling Fans',
    price: 3299,
    formattedPrice: '₹3,299',
    powerRating: '26W Silent BLDC Motor',
    warranty: '3 Years Comprehensive Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 34,
    keyFeatures: [
      'Ultra-silent acoustic performance rated below 32 dB',
      'Intelligent Gentle-Breeze natural wind simulation mode',
      'Soft bottom-glow warm night LED locator',
      'Premium matte scratch-resistant finish with dust-repellent coating',
      'Ergonomic glow-in-dark RF remote control'
    ],
    specs: {
      'Sweep Size': '1200 mm (48 inch)',
      'Power Consumption': '26 Watts',
      'Air Delivery': '220 CMM',
      'Speed': '350 RPM',
      'Noise Level': '< 32 dB',
      'Control Type': 'RF Remote with Breeze Cycle'
    },
    bestFor: 'Light sleepers, nursery rooms, and bedrooms where quiet acoustic operation is the primary requirement.',
    roomSuitability: 'Bedrooms, Study, Library (100 - 140 sq ft)',
    energyRating: '5 Star BEE',
    productUrl: '/products/electrobolt-electro-whisperquiet-bldc-1200mm',
    imageUrl: 'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Keep blades clear of any pendant light cords or cabinet doors.',
    tags: ['silent', 'bedroom', 'bldc', 'remote', 'quiet', 'night-light']
  },

  // ----------------------------------------------------
  // FANS (Table / Pedestal / Wall / Exhaust)
  // ----------------------------------------------------
  {
    id: 'eb-fan-mistflow-pedestal',
    name: 'electrobolt.electro MistFlow Pedestal Fan 400mm',
    category: 'Fans',
    price: 2450,
    formattedPrice: '₹2,450',
    powerRating: '55W Copper Motor',
    warranty: '2 Years Comprehensive Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 50,
    keyFeatures: [
      'High air thrust pedestal fan with telescopic height adjustment',
      '90-degree smooth motorized oscillation & tilt mechanism',
      'Aerodynamic 3-blade polypropylene blade system for low vibration',
      'Heavy-duty weighted round base preventing tipping',
      'Thermal overload protector (TOP) against motor burnout'
    ],
    specs: {
      'Sweep Size': '400 mm (16 inch)',
      'Power Consumption': '55 Watts',
      'Speed': '1350 RPM',
      'Air Delivery': '85 CMM',
      'Height Range': '115 cm to 142 cm adjustable',
      'Speed Levels': '3 Speed push buttons'
    },
    bestFor: 'Flexible portable cooling in living rooms, balconies, kitchens, or dining spaces.',
    roomSuitability: 'Any room / Semi-outdoor balconies / Kitchens',
    productUrl: '/products/electrobolt-electro-mistflow-pedestal-400mm',
    imageUrl: 'https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Ensure protective wire guard is tightly secured before operating.',
    tags: ['pedestal', 'portable', 'oscillation', 'height-adjustable', 'living-room']
  },
  {
    id: 'eb-fan-aerowall-400',
    name: 'electrobolt.electro AeroWall Wall-Mount Fan 400mm',
    category: 'Fans',
    price: 1850,
    formattedPrice: '₹1,850',
    powerRating: '50W Copper Motor',
    warranty: '2 Years Manufacturer Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 36,
    keyFeatures: [
      'Space-saving sturdy wall mounting bracket',
      'Dual pull-cord mechanism for convenient speed and oscillation control',
      'High air thrust for kitchens, dining areas, and small commercial shops',
      'Rust-proof powder coated safety wire cage'
    ],
    specs: {
      'Sweep Size': '400 mm (16 inch)',
      'Power Consumption': '50 Watts',
      'Speed': '1330 RPM',
      'Air Delivery': '80 CMM',
      'Control': 'Dual Pull Cord (Speed & Oscillation)'
    },
    bestFor: 'Compact kitchens, dining spaces, and retail shops where floor and ceiling space is constrained.',
    roomSuitability: 'Kitchens, Workstations, Small Shops',
    productUrl: '/products/electrobolt-electro-aerowall-wall-fan-400mm',
    imageUrl: 'https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Drill firmly into solid concrete or masonry wall using provided heavy-duty anchors.',
    tags: ['wall-fan', 'kitchen', 'space-saving', 'pull-cord']
  },
  {
    id: 'eb-fan-turbovent-exhaust',
    name: 'electrobolt.electro TurboVent Heavy Exhaust Fan 200mm',
    category: 'Fans',
    price: 1150,
    formattedPrice: '₹1,150',
    powerRating: '35W High Suction Motor',
    warranty: '2 Years Comprehensive Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 60,
    keyFeatures: [
      'High air suction 550 m³/hr to rapidly eliminate odor, heat and oil smoke',
      'Rust-proof automatic gravity rear shutters to block insects and outside dust',
      '100% copper shielded motor resistant to grease and high humidity',
      'Easy-clean snap-off front grill'
    ],
    specs: {
      'Duct/Opening Size': '200 mm (8 inch)',
      'Power Consumption': '35 Watts',
      'Air Suction Volume': '550 m³/hr',
      'RPM': '1300 RPM',
      'Shutters': 'Automatic Gravity Louvers'
    },
    bestFor: 'Kitchens with cooktops and bathrooms requiring rapid odor, steam, and moisture clearance.',
    roomSuitability: 'Kitchens, Bathrooms, Storerooms',
    productUrl: '/products/electrobolt-electro-turbovent-exhaust-200mm',
    imageUrl: 'https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Connect to grounded neutral wiring and maintain separation from direct water spray.',
    tags: ['exhaust', 'kitchen', 'bathroom', 'ventilation', 'odor-removal']
  },

  // ----------------------------------------------------
  // AIR CONDITIONERS
  // ----------------------------------------------------
  {
    id: 'eb-ac-coolmaster-15-5star',
    name: 'electrobolt.electro CoolMaster Pro 1.5 Ton 5-Star Inverter Split AC',
    category: 'Air Conditioners',
    price: 36990,
    formattedPrice: '₹36,990',
    powerRating: '1050W (ISEER 5.2)',
    warranty: '1 Year Comprehensive + 5 Years PCB + 10 Years Compressor Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 18,
    keyFeatures: [
      'Dual Rotary Inverter Compressor with AI Convertible 6-in-1 cooling modes',
      '100% Inner-grooved Pure Copper Condenser & Evaporator coils with Blue Fin anti-corrosion coat',
      'PM 2.5 Micro-Dust & Anti-Bacterial filter for clean breathable indoor air',
      'Instant Turbo Cooling drops room temperature within 45 seconds',
      'Silent operation down to 24 dB in Quiet Sleep mode',
      'Stabilizer-free operation (140V to 290V)'
    ],
    specs: {
      'Capacity': '1.5 Ton (Suitable for 120 - 170 sq ft)',
      'Energy Efficiency': '5 Star BEE (ISEER: 5.20)',
      'Annual Energy Consumption': '740 kWh/year',
      'Cooling Capacity': '5100 Watts rated',
      'Condenser': '100% Copper with BlueFin Protection',
      'Refrigerant': 'Eco-Friendly R32',
      'Noise Level': '24 dB (Low) to 42 dB (Turbo)'
    },
    bestFor: 'Standard master bedrooms and medium living rooms seeking peak electricity savings with 5-Star efficiency and heavy daily summer usage.',
    roomSuitability: 'Master Bedroom, Living Room (120 - 170 sq ft)',
    energyRating: '5 Star BEE',
    productUrl: '/products/electrobolt-electro-coolmaster-pro-15-5star',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Installation requires dedicated 16A power socket with MCB and professional technician for vacuum pumping and leak testing.',
    tags: ['ac', 'inverter', '5-star', '1.5-ton', 'copper', 'energy-saving', 'silent']
  },
  {
    id: 'eb-ac-ecochill-10-3star',
    name: 'electrobolt.electro EcoChill 1.0 Ton 3-Star Inverter Split AC',
    category: 'Air Conditioners',
    price: 27490,
    formattedPrice: '₹27,490',
    powerRating: '920W (ISEER 3.9)',
    warranty: '1 Year Comprehensive + 10 Years Compressor Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 24,
    keyFeatures: [
      'Ideal for compact bedrooms, kids rooms, and personal home offices',
      'Variable Speed Inverter adjusts compressor based on ambient heat load',
      'Rapid 60-second chill cycle with 4-way swing airflow',
      '100% Copper tubes with Golden Hydrophilic fin protection',
      'R32 green refrigerant with zero ozone depletion potential'
    ],
    specs: {
      'Capacity': '1.0 Ton (Suitable for 80 - 120 sq ft)',
      'Energy Efficiency': '3 Star BEE (ISEER: 3.90)',
      'Annual Energy Consumption': '685 kWh/year',
      'Cooling Capacity': '3500 Watts rated',
      'Condenser': '100% Copper with GoldFin coating',
      'Refrigerant': 'R32'
    },
    bestFor: 'Compact bedrooms under 120 sq ft with moderate daily usage looking for an affordable, reliable inverter AC under ₹30,000.',
    roomSuitability: 'Guest Rooms, Kids Bedrooms, Home Offices (80 - 120 sq ft)',
    energyRating: '3 Star BEE',
    productUrl: '/products/electrobolt-electro-ecochill-10-3star',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Requires 16A power supply and professional wall mounting by certified technician.',
    tags: ['ac', '1.0-ton', '3-star', 'budget-ac', 'compact-room', 'copper']
  },
  {
    id: 'eb-ac-arcticblast-20-5star',
    name: 'electrobolt.electro ArcticBlast Heavy Duty 2.0 Ton 5-Star Split AC',
    category: 'Air Conditioners',
    price: 48990,
    formattedPrice: '₹48,990',
    powerRating: '1480W (ISEER 5.15)',
    warranty: '1 Year Comprehensive + 5 Years PCB + 10 Years Compressor Warranty',
    stockStatus: 'Limited Stock',
    stockQuantity: 7,
    keyFeatures: [
      'Heavy-duty cooling engineered for extreme ambient heat up to 55°C',
      'Large cross-flow blower throwing chilled air up to 15 meters',
      'Built-in Wi-Fi Smart App control: monitor power usage & adjust timers remotely',
      'Triple protection: Anti-corrosion condenser, anti-freeze thermostat, fireproof electric box',
      'Active Dehumidifier function for humid monsoon seasons'
    ],
    specs: {
      'Capacity': '2.0 Ton (Suitable for 180 - 260 sq ft)',
      'Energy Efficiency': '5 Star BEE (ISEER: 5.15)',
      'Cooling Capacity': '6400 Watts rated',
      'Air Flow Volume': '1150 m³/hr',
      'Smart Connectivity': 'Wi-Fi / electrobolt.electro Smart Home App'
    },
    bestFor: 'Large living halls, conference rooms, master suites with high ceiling or large sunny glass windows.',
    roomSuitability: 'Large Living Halls, Open Plan Kitchen-Living, Offices (180 - 260 sq ft)',
    energyRating: '5 Star BEE',
    productUrl: '/products/electrobolt-electro-arcticblast-20-5star',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Must be wired via dedicated 20A MCB with proper copper earthing.',
    tags: ['ac', '2.0-ton', '5-star', 'heavy-duty', 'large-room', 'wifi', 'tropical']
  },

  // ----------------------------------------------------
  // TELEVISIONS
  // ----------------------------------------------------
  {
    id: 'eb-tv-visionx-43-4k',
    name: 'electrobolt.electro VisionX 43" 4K Ultra HD Smart Google TV',
    category: 'Televisions',
    price: 22990,
    formattedPrice: '₹22,990',
    powerRating: '85W Operating Power',
    warranty: '2 Years Comprehensive Warranty (Panel + Motherboard)',
    stockStatus: 'In Stock',
    stockQuantity: 31,
    keyFeatures: [
      'True 4K UHD (3840x2160) resolution with HDR10+ and Dolby Vision',
      'Official Google TV interface with curated personal profiles & watchlist',
      '24W Box Speakers with Dolby Atmos & DTS Virtual:X sound',
      'Quad-Core A55 processor with 2GB RAM + 16GB Storage for fluid app switching',
      'Bezel-less alloy aesthetic design with 178-degree wide viewing angle',
      'Voice Assistant remote with Google Assistant hotkeys'
    ],
    specs: {
      'Screen Size': '43 inches (108 cm)',
      'Resolution': '4K Ultra HD (3840 x 2160 pixels)',
      'Refresh Rate': '60 Hz with MEMC motion smoothing',
      'Sound Output': '24 Watts Dolby Audio',
      'Operating System': 'Google TV (Android 14)',
      'Connectivity': '3 x HDMI 2.1, 2 x USB, Dual Band Wi-Fi, Bluetooth 5.2'
    },
    bestFor: 'Bedrooms and medium-sized living rooms looking for crisp 4K cinema streaming, OTT series, and family viewing under ₹25,000.',
    roomSuitability: 'Viewing distance 5 to 7 feet (Medium rooms)',
    productUrl: '/products/electrobolt-electro-visionx-43-4k-google-tv',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Use certified wall mount rated for min 12 kg or secure base stand on solid TV unit.',
    tags: ['tv', '4k', '43-inch', 'google-tv', 'hdr', 'dolby-audio', 'budget-4k']
  },
  {
    id: 'eb-tv-cinemax-55-qled',
    name: 'electrobolt.electro CineMax 55" 4K QLED Smart Google TV',
    category: 'Televisions',
    price: 38990,
    formattedPrice: '₹38,990',
    powerRating: '135W Operating Power',
    warranty: '2 Years Comprehensive + 3 Years Panel Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 15,
    keyFeatures: [
      'Quantum Dot QLED Panel delivering 100% DCI-P3 color volume and 650 nits peak brightness',
      '120Hz VRR & ALLM game accelerator mode with under 6.5ms input latency',
      'Dolby Vision IQ dynamic scene tone mapping with ambient light sensor',
      '30W integrated woofer sound system with Dolby Atmos 3D acoustic staging',
      'Hands-free far-field microphones: talk directly to your TV without remote'
    ],
    specs: {
      'Screen Size': '55 inches (139 cm)',
      'Panel Type': 'QLED Quantum Dot Display',
      'Resolution': '4K Ultra HD (3840 x 2160 pixels)',
      'Refresh Rate': '120Hz VRR (Game Mode) / 60Hz Native',
      'Sound Output': '30W Subwoofer + Stereo',
      'Connectivity': '4 x HDMI 2.1 (eARC), 2 x USB 3.0, Optical, Wi-Fi 6'
    },
    bestFor: 'Home theater lovers, movie enthusiasts, and console gamers (PS5/Xbox) wanting rich contrast, vibrant colors, and fast refresh rates.',
    roomSuitability: 'Viewing distance 7 to 10 feet (Spacious living rooms)',
    productUrl: '/products/electrobolt-electro-cinemax-55-qled-google-tv',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Heavy panel. Mount with 2 adults or utilize electrobolt.electro certified wall mounting service.',
    tags: ['qled', '55-inch', 'gaming', '120hz', 'dolby-vision', 'cinematic', 'premium-tv']
  },
  {
    id: 'eb-tv-clearview-32-smart',
    name: 'electrobolt.electro ClearView 32" HD Ready Smart Android TV',
    category: 'Televisions',
    price: 11490,
    formattedPrice: '₹11,490',
    powerRating: '45W Operating Power',
    warranty: '1 Year Comprehensive Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 44,
    keyFeatures: [
      'Frameless metal bezel design maximizing screen area',
      'Vibrant HD Ready display with A+ grade panel and Vivid Picture Engine',
      '20W Stereo Sound with DTS-HD surround audio',
      'Official Android TV with built-in Chromecast and Google Play Store',
      'Preloaded with Netflix, Prime Video, YouTube, Disney+ Hotstar'
    ],
    specs: {
      'Screen Size': '32 inches (80 cm)',
      'Resolution': 'HD Ready (1366 x 768 pixels)',
      'Sound Output': '20 Watts Stereo',
      'OS': 'Android TV 11',
      'Connectivity': '2 x HDMI, 2 x USB, Wi-Fi, Bluetooth'
    },
    bestFor: 'Small bedrooms, kitchens, hostel rooms, or rental spaces needing a dependable smart TV under ₹12,000.',
    roomSuitability: 'Viewing distance 4 to 6 feet (Small rooms)',
    productUrl: '/products/electrobolt-electro-clearview-32-smart-tv',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Connect to standard 6A socket with surge suppressor for voltage protection.',
    tags: ['32-inch', 'budget-tv', 'android-tv', 'compact', 'under-12000']
  },

  // ----------------------------------------------------
  // WASHING MACHINES
  // ----------------------------------------------------
  {
    id: 'eb-wm-aquaclean-75-front',
    name: 'electrobolt.electro AquaClean 7.5 kg Fully-Automatic Front Load',
    category: 'Washing Machines',
    price: 26990,
    formattedPrice: '₹26,990',
    powerRating: '2000W (with 60°C In-Built Heater)',
    warranty: '2 Years Comprehensive + 10 Years Inverter Motor Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 16,
    keyFeatures: [
      'Inverter Direct Drive Motor directly coupled to drum for silent, vibration-free spinning',
      'In-Built 90°C Steam & Allergy Care wash eliminates 99.9% germs and dust mites',
      '1400 RPM spin speed for ultra-rapid drying in humid weather',
      '15 specialized wash programs including Quick 15, Woolens, Delicates & Heavy Bedsheets',
      '5-Star BEE energy and water conservation rating'
    ],
    specs: {
      'Capacity': '7.5 kg (Ideal for 3 - 5 family members)',
      'Type': 'Fully Automatic Front Load',
      'Max Spin Speed': '1400 RPM',
      'Heater': 'In-built variable temperature (20°C to 90°C)',
      'Tub Material': 'Stainless Steel Honeycomb Drum',
      'BEE Star Rating': '5 Star'
    },
    bestFor: 'Families of 3 to 5 people wanting superior fabric protection, deep allergen sterilization, low water usage, and quiet wash cycles.',
    roomSuitability: 'Bathroom, Utility Balcony, Laundry Area',
    energyRating: '5 Star BEE',
    productUrl: '/products/electrobolt-electro-aquaclean-75-front-load',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Ensure transit bolts are removed prior to first use. Connect to standard 16A power socket with direct water pressure (0.5 to 8 bar).',
    tags: ['front-load', 'heater', 'inverter-motor', 'steam-wash', '5-star', 'premium-wash']
  },
  {
    id: 'eb-wm-quickwash-70-top',
    name: 'electrobolt.electro QuickWash 7.0 kg Fully-Automatic Top Load',
    category: 'Washing Machines',
    price: 14990,
    formattedPrice: '₹14,990',
    powerRating: '380W Wash Motor',
    warranty: '2 Years Comprehensive + 10 Years Motor Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 26,
    keyFeatures: [
      'Convenient top-loading ergonomics: load and unload clothes without bending',
      'TurboPulsator generates dynamic 3D water currents to detach stubborn stains',
      'Soft-closing tempered glass hydraulic lid with scratch-resistant surface',
      'Smart Sensor automatically weighs laundry load and calculates precise water level',
      'Tub Clean cycle prevents detergent residue and mildew buildup'
    ],
    specs: {
      'Capacity': '7.0 kg (Suitable for 3 - 4 family members)',
      'Type': 'Fully Automatic Top Load',
      'Spin Speed': '720 RPM',
      'Wash Programs': '8 Wash Cycles (Normal, Heavy, Delicates, Quick, Spin, etc.)',
      'Drum Material': '100% Stainless Steel Diamond Drum',
      'Lid': 'Hydraulic Soft-Close Tempered Glass'
    },
    bestFor: 'Families seeking easy top-load convenience, reliable automated washing, and great value under ₹16,000.',
    roomSuitability: 'Utility Area, Balcony, Bathroom',
    energyRating: '5 Star BEE',
    productUrl: '/products/electrobolt-electro-quickwash-70-top-load',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Use water inlet hose with clamp. Ensure level floor placement to prevent imbalance during spin cycle.',
    tags: ['top-load', 'fully-automatic', 'budget-wm', 'soft-close', 'under-16000']
  },
  {
    id: 'eb-wm-duraspin-80-semi',
    name: 'electrobolt.electro DuraSpin 8.0 kg Semi-Automatic Twin Tub',
    category: 'Washing Machines',
    price: 9490,
    formattedPrice: '₹9,490',
    powerRating: '450W Wash Motor',
    warranty: '2 Years Comprehensive + 5 Years Motor Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 38,
    keyFeatures: [
      'Economical twin tub machine with zero requirement for continuous high water tap pressure',
      'Large 8.0 kg capacity easily handles heavy curtains and blankets',
      'Rust-proof high-impact thermoplastic dual body',
      'Air Jet Dry spin system with 1350 RPM spin tub for rapid moisture removal',
      'Collar scrubber texture built directly on tub wall'
    ],
    specs: {
      'Capacity': '8.0 kg Wash / 6.0 kg Spin',
      'Type': 'Semi-Automatic Twin Tub',
      'Spin Speed': '1350 RPM',
      'Body': '100% Rust-Proof Fiber Plastic',
      'Lint Collector': 'High-Efficiency Magic Filter'
    },
    bestFor: 'Budget-conscious buyers, areas with irregular or low water pressure, and families looking for durable washing under ₹10,000.',
    roomSuitability: 'Washroom, Balcony, Verandah',
    energyRating: '5 Star BEE',
    productUrl: '/products/electrobolt-electro-duraspin-80-semi-automatic',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Keep electrical cord dry and never insert hand into spin tub until it has completely stopped spinning.',
    tags: ['semi-automatic', 'twin-tub', 'low-water-pressure', 'durable', 'under-10000']
  },

  // ----------------------------------------------------
  // ELECTRICAL WIRES & CABLES
  // ----------------------------------------------------
  {
    id: 'eb-wire-fireshield-15',
    name: 'electrobolt.electro FireShield 1.5 sq mm FR-LSH Copper Wire (90m Box)',
    category: 'Electrical Wires & Cables',
    price: 1690,
    formattedPrice: '₹1,690',
    powerRating: 'Current Carrying Capacity: 16A @ 40°C',
    warranty: '100% Pure Copper Guarantee / ISI & RoHS Certified',
    stockStatus: 'In Stock',
    stockQuantity: 120,
    keyFeatures: [
      '100% Electrolytic Grade Bright Annealed Pure Copper conductors (>101% IACS conductivity)',
      'Flame Retardant Low Smoke Zero Halogen (FR-LSH) high oxygen index PVC insulation',
      'Self-extinguishing in flame contact; releases non-toxic, transparent smoke during fire emergency',
      'Anti-rodent and anti-termite insulation compound',
      'ISI marked to IS:694 and CE certified'
    ],
    specs: {
      'Conductor Size': '1.5 sq mm (multi-strand copper)',
      'Length': '90 meters coil',
      'Voltage Grade': 'Up to 1100 Volts',
      'Max Operating Temp': '85°C continuous / 105°C thermal stability',
      'Current Rating': '16 Amperes (Concealed conduit)'
    },
    bestFor: 'Standard residential lighting circuits, ceiling fans, 6A switchboards, and general light household wiring.',
    productUrl: '/products/electrobolt-electro-fireshield-15-sqmm-90m',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'CRITICAL: Must only be installed through PVC conduits by a certified professional licensed electrician. Turn off main DP switch before wiring.',
    tags: ['wire', 'copper', 'fr-lsh', '1.5-sqmm', 'isi', 'fire-resistant', 'house-wiring']
  },
  {
    id: 'eb-wire-fireshield-25',
    name: 'electrobolt.electro FireShield 2.5 sq mm FR-LSH Copper Wire (90m Box)',
    category: 'Electrical Wires & Cables',
    price: 2650,
    formattedPrice: '₹2,650',
    powerRating: 'Current Carrying Capacity: 24A @ 40°C',
    warranty: '100% Pure Copper Guarantee / ISI & RoHS Certified',
    stockStatus: 'In Stock',
    stockQuantity: 95,
    keyFeatures: [
      'Engineered for medium to heavy load household power sockets (16A sockets)',
      'FR-LSH flame retardant low smoke compound preventing secondary fire flashovers',
      'High thermal endurance resisting voltage surges and overheating',
      'Flexible stranded class 5 copper for effortless pulling through curved conduit pipes'
    ],
    specs: {
      'Conductor Size': '2.5 sq mm (multi-strand copper)',
      'Length': '90 meters coil',
      'Voltage Grade': 'Up to 1100 Volts',
      'Current Rating': '24 Amperes (Concealed conduit)'
    },
    bestFor: 'Power plug sockets (16A), 1.0/1.5 Ton AC units, water geysers, kitchen microwave ovens, and refrigerators.',
    productUrl: '/products/electrobolt-electro-fireshield-25-sqmm-90m',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'CRITICAL: High load wire. Always connect to properly rated 16A/20A MCB. Consult a licensed electrician.',
    tags: ['wire', '2.5-sqmm', 'ac-wiring', 'geyser-wiring', 'power-plug', 'copper', 'fire-shield']
  },
  {
    id: 'eb-wire-powercore-40',
    name: 'electrobolt.electro PowerCore 4.0 sq mm Industrial Grade Wire (90m Box)',
    category: 'Electrical Wires & Cables',
    price: 4120,
    formattedPrice: '₹4,120',
    powerRating: 'Current Carrying Capacity: 32A @ 40°C',
    warranty: 'ISI Marked to IS:694 / 100% Pure Copper Certification',
    stockStatus: 'In Stock',
    stockQuantity: 58,
    keyFeatures: [
      'Heavy-duty conductor gauge designed for distribution sub-mains and central loads',
      'Dual-layer heat resistant FR insulation with thermal withstand up to 105°C',
      'Zero copper impurity for negligible resistance and maximum line voltage transmission',
      'Recommended for continuous heavy loads like 2.0 Ton ACs and central water heaters'
    ],
    specs: {
      'Conductor Size': '4.0 sq mm (heavy multi-strand)',
      'Length': '90 meters coil',
      'Voltage Grade': 'Up to 1100 Volts',
      'Current Rating': '32 Amperes'
    },
    bestFor: 'Main distribution boards, sub-meter supply lines, 2.0 Ton split ACs, and high-wattage instantaneous water heaters.',
    productUrl: '/products/electrobolt-electro-powercore-40-sqmm-90m',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'CRITICAL: High amperage wiring. Proper crimped lugs and correct MCB torque must be applied by a certified electrician.',
    tags: ['wire', '4.0-sqmm', 'sub-main', 'industrial', 'heavy-load', 'copper']
  },
  {
    id: 'eb-cable-submersible-3core',
    name: 'electrobolt.electro Armored 3-Core Submersible Flat Cable (100m)',
    category: 'Electrical Wires & Cables',
    price: 5400,
    formattedPrice: '₹5,400',
    powerRating: 'For 3HP to 5HP Submersible Pump Motors',
    warranty: 'ISI Marked to IS:694 / 3 Years Manufacturer Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 25,
    keyFeatures: [
      'Special waterproof and oil-resistant high-grade PVC outer sheath',
      'Designed to operate submerged in deep borewells, agricultural wells, and underground sumps',
      'High abrasion resistance and mechanical puncture resistance'
    ],
    specs: {
      'Type': '3-Core Flat Submersible Cable (2.5 sq mm each core)',
      'Length': '100 meters roll',
      'Water Immersion': 'Certified for continuous underwater depth'
    },
    bestFor: 'Submersible water pump installations in deep borewells, residential sumps, and agricultural setups.',
    productUrl: '/products/electrobolt-electro-submersible-3core-flat-cable-100m',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Ensure vulcanized waterproof resin joints are used when connecting underwater motor leads.',
    tags: ['cable', 'submersible', 'pump-wire', 'borewell', 'waterproof', '3-core']
  },

  // ----------------------------------------------------
  // LED TUBELIGHTS
  // ----------------------------------------------------
  {
    id: 'eb-led-lumina-20w',
    name: 'electrobolt.electro Lumina 20W 4-Foot LED Batten',
    category: 'LED Tubelights',
    price: 249,
    formattedPrice: '₹249',
    powerRating: '20 Watts / 2200 Lumens (110 lm/W)',
    warranty: '2 Years Replacement Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 210,
    keyFeatures: [
      'High luminous efficiency of 2200 Lumens with wide 180-degree glare-free spread',
      '6500K Cool Day White light for bright, energetic task clarity',
      'Surge protection up to 4.0 kV protects against power fluctuations',
      'Slim extruded aluminum-polycarbonate composite body',
      'Quick wall-mount clips and push-fit connector included'
    ],
    specs: {
      'Length': '4 Feet (120 cm)',
      'Wattage': '20 Watts',
      'Lumen Output': '2200 Lumens',
      'Color Temp': '6500K Cool Day White',
      'Operating Voltage': '120V - 300V AC',
      'CRI': '> 80'
    },
    bestFor: 'General lighting in bedrooms, living rooms, kitchens, hallways, and home study desks.',
    productUrl: '/products/electrobolt-electro-lumina-20w-led-batten',
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Turn off switch before installing into wall clips. Do not use with legacy magnetic chokes.',
    tags: ['tubelight', 'led-batten', '20w', 'cool-white', 'energy-saving', 'under-300']
  },
  {
    id: 'eb-led-tritone-22w',
    name: 'electrobolt.electro TriTone 22W 3-in-1 Switchable CCT LED Batten',
    category: 'LED Tubelights',
    price: 399,
    formattedPrice: '₹399',
    powerRating: '22 Watts / 2400 Lumens',
    warranty: '2 Years Replacement Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 85,
    keyFeatures: [
      '3-in-1 Color Temperature adjustable via existing wall switch:',
      '  - Warm White (3000K) for relaxing evenings & dining',
      '  - Neutral White (4000K) for comfortable reading & work',
      '  - Cool Day White (6500K) for bright morning alertness',
      'Flicker-free eye-care IC driver',
      'High CRI > 85 for natural color rendering of room interiors'
    ],
    specs: {
      'Length': '4 Feet (120 cm)',
      'Wattage': '22 Watts',
      'CCT Options': '3000K / 4000K / 6500K (Switch toggling)',
      'Lumen Output': '2400 Lumens',
      'Surge Protection': '4 kV'
    },
    bestFor: 'Multi-purpose living rooms and bedrooms where you want relaxed warm lighting in evenings and bright white light for daytime work.',
    productUrl: '/products/electrobolt-electro-tritone-22w-switchable-batten',
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Compatible with standard wall switches. No additional rewiring required.',
    tags: ['tubelight', 'cct-switchable', 'warm-white', 'neutral-white', '22w', 'versatile']
  },

  // ----------------------------------------------------
  // LED BULBS
  // ----------------------------------------------------
  {
    id: 'eb-led-brightlife-9w-pack4',
    name: 'electrobolt.electro BrightLife 9W LED Bulb (Pack of 4)',
    category: 'LED Bulbs',
    price: 299,
    formattedPrice: '₹299',
    powerRating: '9 Watts each / 900 Lumens (Pack of 4)',
    warranty: '1 Year Replacement Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 300,
    keyFeatures: [
      'High luminous efficacy replacing traditional 60W incandescent bulb with 85% less power',
      'Standard B22 base fits existing Indian household lamp holders',
      '6500K Crystal Cool Day White light with uniform 240-degree beam angle',
      'High surge withstand up to 3.5 kV',
      'Estimated lifespan of 25,000 burning hours'
    ],
    specs: {
      'Base Cap': 'B22 Pin Base',
      'Wattage': '9 Watts per bulb',
      'Lumen Output': '900 Lumens per bulb',
      'Color Temp': '6500K Cool White',
      'Pack Contents': '4 Bulbs'
    },
    bestFor: 'Everyday household replacement in lamps, ceiling holders, passages, and washrooms seeking unbeatable value.',
    productUrl: '/products/electrobolt-electro-brightlife-9w-led-bulb-pack-4',
    imageUrl: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Allow bulb to cool down before replacing. Do not use in fully sealed moisture-dense enclosures without ventilation.',
    tags: ['led-bulb', 'pack-of-4', '9w', 'b22', 'budget-lighting', 'under-300']
  },
  {
    id: 'eb-led-inverter-emergency-9w',
    name: 'electrobolt.electro Inverter Emergency 9W LED Bulb with Battery Backup',
    category: 'LED Bulbs',
    price: 380,
    formattedPrice: '₹380',
    powerRating: '9W (Main) / 4W (Emergency Battery Mode)',
    warranty: '1 Year Manufacturer Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 140,
    keyFeatures: [
      'In-built 2200 mAh Lithium-ion battery providing up to 4 hours backup during power cuts',
      'Automatically switches ON within 0.1 second when electrical power fails',
      'Auto-recharges during normal electricity operation in 8-10 hours',
      'Can be removed from holder and carried as a portable emergency torch with touch-activation cap'
    ],
    specs: {
      'Base Cap': 'B22',
      'Battery Capacity': '2200 mAh Li-ion',
      'Backup Duration': 'Up to 4 Hours',
      'Wattage': '9W Main / 4W Inverter Mode',
      'Lumen Output': '900 Lumens (Main) / 400 Lumens (Emergency)'
    },
    bestFor: 'Areas with frequent load-shedding and power outages; essential safety lighting for staircases, kitchens, and elder bedrooms.',
    productUrl: '/products/electrobolt-electro-inverter-emergency-9w-bulb',
    imageUrl: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Install on a dedicated live-neutral circuit with a connected load so the internal sensor detects line cutoff.',
    tags: ['emergency-bulb', 'inverter-bulb', 'battery-backup', 'b22', 'power-cut', 'safe']
  },
  {
    id: 'eb-led-highbeam-20w',
    name: 'electrobolt.electro HighBeam 20W High-Lumen LED Bulb',
    category: 'LED Bulbs',
    price: 280,
    formattedPrice: '₹280',
    powerRating: '20 Watts / 2100 Lumens',
    warranty: '1 Year Replacement Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 90,
    keyFeatures: [
      'Ultra-bright 2100 Lumens concentrated light output',
      'Replaces older 150W incandescent or 36W CFL lamps',
      'Internal aluminum heat sink ensuring prolonged diode life',
      'Standard B22 base fitting'
    ],
    specs: {
      'Base Cap': 'B22',
      'Wattage': '20 Watts',
      'Lumen Output': '2100 Lumens',
      'Color Temp': '6500K Cool White'
    },
    bestFor: 'Shops, home workshops, garages, high-ceiling rooms, and spacious study desks requiring intense task lighting.',
    productUrl: '/products/electrobolt-electro-highbeam-20w-led-bulb',
    imageUrl: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Bulb generates localized heat dissipation on base; ensure adequate airflow around fixture.',
    tags: ['high-lumen', '20w', 'bright', 'shop-lighting', 'garage']
  },

  // ----------------------------------------------------
  // FANCY / DECORATIVE LIGHTS
  // ----------------------------------------------------
  {
    id: 'eb-light-celestial-chandelier-6',
    name: 'electrobolt.electro Celestial Crystal Chandelier 6-Light',
    category: 'Fancy / Decorative Lights',
    price: 7490,
    formattedPrice: '₹7,490',
    powerRating: '6 x E14 Holders (Up to 40W per socket / LED compatible)',
    warranty: '1 Year Warranty on Electrical Fixture',
    stockStatus: 'In Stock',
    stockQuantity: 12,
    keyFeatures: [
      'Crafted with genuine K9 sparkling faceted crystal prisms that refract brilliant rainbow prisms',
      'Electroplated satin gold brass chassis resistant to tarnishing and humidity',
      'Adjustable ceiling suspension chain up to 60 cm',
      'Accommodates 6 x E14 candle LED bulbs (sold separately or bundled)'
    ],
    specs: {
      'Diameter': '55 cm (22 inch)',
      'Height': '45 cm fixture body + adjustable chain',
      'Socket Type': '6 x E14 Brass Holders',
      'Material': 'K9 Crystal & Electroplated Stainless Steel'
    },
    bestFor: 'Luxury dining halls, entrance foyers, and living room centerpieces desiring classic grandeur and shimmering ambient illumination.',
    roomSuitability: 'Dining Hall, Living Room Foyer, High Ceilings (>9.5 ft)',
    productUrl: '/products/electrobolt-electro-celestial-crystal-chandelier-6-light',
    imageUrl: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Weighs approx 7.5 kg. Requires ceiling anchor bolted directly into reinforced concrete ceiling slab by professional electrician.',
    tags: ['chandelier', 'crystal', 'decorative', 'luxury', 'dining-room', 'living-room']
  },
  {
    id: 'eb-light-nordic-ring-pendant',
    name: 'electrobolt.electro Minimalist Nordic Ring Pendant Light',
    category: 'Fancy / Decorative Lights',
    price: 3290,
    formattedPrice: '₹3,290',
    powerRating: '36W Integrated LED (Warm White 3000K)',
    warranty: '1 Year Comprehensive Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 22,
    keyFeatures: [
      'Contemporary Scandinavian circular ring silhouette with warm ambient perimeter glow',
      'Warm White (3000K) soft eye-comfort diffusion without exposed bulb glare',
      'High-grade brushed champagne gold aluminum alloy finish',
      'Adjustable steel suspension wires up to 120 cm to customize drop height over tables'
    ],
    specs: {
      'Ring Diameter': '45 cm',
      'Wattage': '36 Watts built-in LED',
      'Color Temperature': '3000K Warm Gold',
      'Cable Length': '120 cm adjustable drop'
    },
    bestFor: 'Modern kitchen breakfast islands, dining tables, cafe corners, and contemporary bedroom bedside drops.',
    roomSuitability: 'Kitchen Islands, Dining Tables, Bedside Drops',
    productUrl: '/products/electrobolt-electro-nordic-ring-pendant-light',
    imageUrl: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Turn off switch before height adjustment. Do not pull roughly on internal power feed wire.',
    tags: ['pendant-light', 'nordic', 'modern', 'warm-white', 'kitchen-island', 'dining']
  },
  {
    id: 'eb-light-smart-rgbic-strip-5m',
    name: 'electrobolt.electro Smart RGBIC Cob Strip Light (5 Meters)',
    category: 'Fancy / Decorative Lights',
    price: 1690,
    formattedPrice: '₹1,690',
    powerRating: '24W with 12V Certified Adapter',
    warranty: '1 Year Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 65,
    keyFeatures: [
      'Continuous COB LED dot-less diffused illumination: no ugly individual LED pixel spots',
      'RGBIC technology allows multiple colors chasing simultaneously on a single strip',
      'Music Rhythm Sync mode with built-in high-sensitivity audio sensor',
      'Smartphone Wi-Fi app + Alexa & Google Home voice control + physical RF remote',
      'Strong 3M adhesive backing for quick peel-and-stick application'
    ],
    specs: {
      'Length': '5 Meters continuous roll',
      'Color Capability': '16 Million Colors + Pure Tunable White',
      'Input Voltage': '12V DC with 240V Adapter',
      'Smart Compatibility': 'Tuya / Smart Life / Alexa / Google'
    },
    bestFor: 'TV backlighting, false ceiling cove accents, gaming battle stations, and under-cabinet mood lighting.',
    productUrl: '/products/electrobolt-electro-smart-rgbic-cob-strip-5m',
    imageUrl: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Clean surface dust with dry cloth before adhering. Cut only at marked copper solder pads.',
    tags: ['rgb-strip', 'smart-light', 'alexa', 'gaming', 'false-ceiling', 'cove-lighting']
  },

  // ----------------------------------------------------
  // OTHER ELECTRICAL & ELECTRONIC APPLIANCES
  // ----------------------------------------------------
  {
    id: 'eb-app-hydropure-15l-geyser',
    name: 'electrobolt.electro HydroPure 15L Storage Water Heater / Geyser',
    category: 'Other Electrical & Electronic Appliances',
    price: 6990,
    formattedPrice: '₹6,990',
    powerRating: '2000W Heavy-Duty Incoloy 800 Element',
    warranty: '2 Years Comprehensive + 3 Years Element + 7 Years Tank Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 20,
    keyFeatures: [
      'Titanium Vitreous Enamel Glasslined Inner Tank protecting against corrosion and hard water scaling',
      '8-Bar Pressure rating: fully certified for multi-storey high-rise residential towers',
      'High-density PUF insulation maintains boiling water temperature for up to 18 hours',
      'Multi-function safety valve and thermal cutout preventing dry heating or overpressure',
      '5-Star BEE energy efficiency'
    ],
    specs: {
      'Capacity': '15 Liters',
      'Wattage': '2000 Watts',
      'Pressure Rating': '8 Bar (800 kPa)',
      'Tank Material': 'Titanium Glasslined Steel Tank',
      'Star Rating': '5 Star BEE'
    },
    bestFor: 'Family bathrooms requiring reliable hot water for 3 to 4 family members in both low-rise and high-rise apartments.',
    roomSuitability: 'Bathrooms, Kitchens',
    energyRating: '5 Star BEE',
    productUrl: '/products/electrobolt-electro-hydropure-15l-geyser',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'CRITICAL: Must never switch ON while tank is empty. Ensure tank is completely full of running water before plugging into 16A grounded outlet.',
    tags: ['geyser', 'water-heater', '15-liter', '5-star', 'high-rise', 'hard-water']
  },
  {
    id: 'eb-app-airpure-max-hepa',
    name: 'electrobolt.electro AirPure Max HEPA Room Air Purifier',
    category: 'Other Electrical & Electronic Appliances',
    price: 8990,
    formattedPrice: '₹8,990',
    powerRating: '45W Energy Efficient Motor',
    warranty: '2 Years Comprehensive Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 18,
    keyFeatures: [
      'Medical Grade True HEPA H13 Filter capturing 99.97% particles down to 0.1 microns',
      'High CADR of 320 m³/hr purifies a 250 sq ft room in just 12 minutes',
      'Real-time PM2.5 laser digital display with 4-color air quality indicator ring',
      'Activated Carbon honeycomb filter adsorbs pet odors, VOCs, cooking smells, and smoke',
      'Silent Sleep Mode running at whisper-quiet 22 dB with all indicator lights dimmed'
    ],
    specs: {
      'Coverage Area': 'Up to 350 sq ft',
      'CADR': '320 m³/hr',
      'Filter Stages': '3-Stage (Pre-filter + H13 True HEPA + Granular Carbon)',
      'Noise Level': '22 dB (Sleep) to 48 dB (Max)'
    },
    bestFor: 'Homes in polluted urban cities, individuals with asthma or dust allergies, pet parents, and nursery rooms.',
    roomSuitability: 'Bedrooms, Living Rooms, Nursery (Up to 350 sq ft)',
    productUrl: '/products/electrobolt-electro-airpure-max-hepa-air-purifier',
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Unwrap plastic protective sleeve from the HEPA filter inside the unit before first power-on.',
    tags: ['air-purifier', 'hepa-h13', 'pm2.5', 'allergies', 'bedroom', 'clean-air']
  },
  {
    id: 'eb-app-induction-cooktop-2000w',
    name: 'electrobolt.electro Induction Cooktop 2000W with Indian Menu Presets',
    category: 'Other Electrical & Electronic Appliances',
    price: 2390,
    formattedPrice: '₹2,390',
    powerRating: '2000 Watts',
    warranty: '1 Year Replacement Warranty',
    stockStatus: 'In Stock',
    stockQuantity: 45,
    keyFeatures: [
      '2000W rapid electromagnetic heating for 40% faster cooking than LPG gas',
      '8 Pre-programmed Indian cooking presets: Roti/Dosa, Curry, Pressure Cook, Deep Fry, Milk Boiled, Idli, Keep Warm',
      'High-grade microcrystalline polished black glass top, scratch-proof & easy to wipe clean',
      'Auto Pan-Detection and Auto Shut-Off against dry boil accidents',
      'Built-in digital timer up to 3 hours'
    ],
    specs: {
      'Wattage': '2000 Watts (Adjustable 200W - 2000W)',
      'Control Type': 'Feather Touch Tactile Control Panel',
      'Timer': '0 to 180 Minutes',
      'Safety': 'Voltage surge protection + Auto dry-pan cut-off'
    },
    bestFor: 'Modern kitchens, bachelor apartments, PG rentals, or supplementary smokeless cooking during gas cylinder replacements.',
    roomSuitability: 'Kitchens, Pantry, Rental Accommodation',
    productUrl: '/products/electrobolt-electro-induction-cooktop-2000w',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    safetyAdvisory: 'Use flat-bottom induction-compatible stainless steel or cast iron cookware. Never touch cooktop immediately after prolonged boiling.',
    tags: ['induction', 'cooktop', 'kitchen-appliance', '2000w', 'fast-cooking', 'under-2500']
  }
];

export const CATEGORY_LIST = [
  'Ceiling Fans',
  'Fans',
  'Air Conditioners',
  'Televisions',
  'Washing Machines',
  'Electrical Wires & Cables',
  'LED Tubelights',
  'LED Bulbs',
  'Fancy / Decorative Lights',
  'Other Electrical & Electronic Appliances'
] as const;
