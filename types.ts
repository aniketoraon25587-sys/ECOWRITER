export enum Tone {
  Professional = 'Professional',
  Luxury = 'Luxury',
  Funny = 'Funny',
  Minimalist = 'Minimalist',
  Emotional = 'Emotional',
  Salesy = 'Salesy'
}

export enum Platform {
  Amazon = 'Amazon',
  Shopify = 'Shopify',
  Meesho = 'Meesho',
  Instagram = 'Instagram',
  WhatsApp = 'WhatsApp',
  General = 'General'
}

export interface ProductFormData {
  productName: string;
  category: string;
  features: string;
  brand: string;
  tone: Tone;
  audience: string;
  image: string | null; // Base64 string
}

export interface PlatformCopy {
  amazon: string;
  meesho: string;
  shopify: string;
  instagram_caption: string;
  whatsapp_message: string;
}

export interface GeneratedContent {
  title: string;
  bullets: string[];
  long_description: string;
  platform_copy: PlatformCopy;
  seo_keywords: string[];
}

export type AppState = 'LANDING' | 'FORM' | 'LOADING' | 'RESULTS';
