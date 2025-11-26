import { Product, Translation, Language } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'SMC Solenoid Valve SY5000',
    brand: 'SMC',
    category: 'Valves',
    price: 450,
    image: 'https://picsum.photos/400/400?random=1',
    description: 'High performance 5-port solenoid valve, compact design, low power consumption.',
    stock: 500
  },
  {
    id: '2',
    name: 'Festo Cylinder DSBC',
    brand: 'Festo',
    category: 'Cylinders',
    price: 850,
    image: 'https://picsum.photos/400/400?random=2',
    description: 'ISO 15552 standard cylinder with self-adjusting pneumatic cushioning.',
    stock: 200
  },
  {
    id: '3',
    name: 'Airtac Air Filter Regulator',
    brand: 'Airtac',
    category: 'Air Preparation',
    price: 120,
    image: 'https://picsum.photos/400/400?random=3',
    description: 'Efficient moisture removal and pressure regulation combo unit.',
    stock: 1000
  },
  {
    id: '4',
    name: 'Norgren Excelon Plus',
    brand: 'Norgren',
    category: 'Air Preparation',
    price: 350,
    image: 'https://picsum.photos/400/400?random=4',
    description: 'Modular air preparation system, safety and performance optimized.',
    stock: 150
  },
  {
    id: '5',
    name: 'SMC Compact Cylinder CQ2',
    brand: 'SMC',
    category: 'Cylinders',
    price: 320,
    image: 'https://picsum.photos/400/400?random=5',
    description: 'Space-saving design, various mounting options available.',
    stock: 300
  },
  {
    id: '6',
    name: 'Festo VUVG Valve',
    brand: 'Festo',
    category: 'Valves',
    price: 280,
    image: 'https://picsum.photos/400/400?random=6',
    description: 'Universal directional control valve, compact and durable.',
    stock: 400
  }
];

export const TRANSLATIONS: Record<Language, Translation> = {
  zh: {
    home: '首页',
    products: '产品中心',
    about: '关于我们',
    contact: '联系我们',
    login: '会员登录',
    logout: '退出登录',
    cart: '购物车',
    adminDashboard: '管理后台',
    heroTitle: '气动自动化领域的领航者',
    heroSubtitle: '主营 AirTac、SMC、Festo、Norgren。大量现货，价格优，货期快。',
    featuredBrands: '合作品牌',
    contactUs: '联系客服',
    addToCart: '加入购物车',
    buyNow: '立即购买',
    loading: '加载中...',
    aiAssistant: '智能助手',
    aiWelcome: '您好！我是华创云昇的AI助手。关于气动元件选型、报价或库存，请随时问我！',
    price: '价格',
    stock: '库存',
    features: '核心优势'
  },
  en: {
    home: 'Home',
    products: 'Products',
    about: 'About Us',
    contact: 'Contact',
    login: 'Login',
    logout: 'Logout',
    cart: 'Cart',
    adminDashboard: 'Dashboard',
    heroTitle: 'Leader in Pneumatic Automation',
    heroSubtitle: 'Specializing in AirTac, SMC, Festo, Norgren. Large Stock, Best Prices, Fast Delivery.',
    featuredBrands: 'Featured Brands',
    contactUs: 'Contact Us',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    loading: 'Loading...',
    aiAssistant: 'AI Assistant',
    aiWelcome: 'Hello! I am your Huachuang Yunsheng AI assistant. Ask me about pneumatic parts selection, pricing, or stock!',
    price: 'Price',
    stock: 'Stock',
    features: 'Core Features'
  }
};
