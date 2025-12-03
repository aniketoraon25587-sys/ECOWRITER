import { Tone, Platform } from './types';

export const TONES = Object.values(Tone);
export const PLATFORMS = Object.values(Platform);

export const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Beauty & Personal Care",
  "Home & Kitchen",
  "Health & Fitness",
  "Baby & Kids",
  "Toys",
  "Automotive",
  "Pet Supplies",
  "Stationery",
  "Jewellery & Accessories",
  "Bags & Luggage",
  "Footwear",
  "Sports & Outdoors"
];

export const SAMPLE_PROMPTS = [
  {
    name: "Wireless Earbuds",
    category: "Electronics",
    features: "Noise cancelling, 24h battery, waterproof, ergonomic fit"
  },
  {
    name: "Organic Face Serum",
    category: "Beauty",
    features: "Vitamin C, Hyaluronic acid, anti-aging, vegan, cruelty-free"
  },
  {
    name: "Ergonomic Office Chair",
    category: "Furniture",
    features: "Lumbar support, breathable mesh, adjustable height, 360 swivel"
  }
];