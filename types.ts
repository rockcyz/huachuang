export interface Product {
  id: string;
  name: string;
  brand: 'Airtac' | 'SMC' | 'Festo' | 'Norgren';
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar: string;
}

export type Language = 'zh' | 'en';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Translation {
  home: string;
  products: string;
  about: string;
  contact: string;
  login: string;
  logout: string;
  cart: string;
  adminDashboard: string;
  heroTitle: string;
  heroSubtitle: string;
  featuredBrands: string;
  contactUs: string;
  addToCart: string;
  buyNow: string;
  loading: string;
  aiAssistant: string;
  aiWelcome: string;
  price: string;
  stock: string;
  features: string;
}
