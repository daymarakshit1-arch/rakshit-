export type ProductCategory =
  | 'Ceiling Fans'
  | 'Fans'
  | 'Air Conditioners'
  | 'Televisions'
  | 'Washing Machines'
  | 'Electrical Wires & Cables'
  | 'LED Tubelights'
  | 'LED Bulbs'
  | 'Fancy / Decorative Lights'
  | 'Other Electrical & Electronic Appliances';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  formattedPrice: string;
  powerRating: string;
  warranty: string;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  stockQuantity: number;
  keyFeatures: string[];
  specs: Record<string, string>;
  bestFor: string;
  roomSuitability?: string;
  energyRating?: string;
  productUrl: string;
  imageUrl?: string;
  safetyAdvisory?: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  recommendedProductIds?: string[];
  comparisonProductIds?: string[];
}

export interface LeadSubmission {
  id?: string;
  name: string;
  contact: string; // phone or email
  productRequirement: string;
  type: 'quotation' | 'callback' | 'bulk_order' | 'sales_assistance';
  createdAt?: string;
}
