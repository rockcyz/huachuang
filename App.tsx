import React, { useState, createContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { ProductList, CartDrawer } from './components/Products';
import { AdminDashboard } from './components/AdminDashboard';
import { ChatBot } from './components/ChatBot';
import { AuthModal } from './components/AuthModal';
import { Product, CartItem, User, Language } from './types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('zh');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      cart, addToCart, removeFromCart, updateQuantity,
      user, setUser,
      showAuthModal, setShowAuthModal,
      showCart, setShowCart
    }}>
      <HashRouter>
        <div className="flex flex-col min-h-screen text-gray-800 font-sans">
          <Header />
          <CartDrawer />
          <AuthModal />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <div className="bg-white py-20">
                    <div className="max-w-7xl mx-auto px-4">
                      <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                        <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full" />
                      </div>
                      <div className="grid md:grid-cols-3 gap-8">
                        {[
                          { title: 'Global Brands', desc: 'Direct sourcing from Airtac, SMC, Festo.' },
                          { title: 'Rapid Logistics', desc: 'Warehouses in strategic locations for fast delivery.' },
                          { title: 'Expert Support', desc: 'Professional engineers to help with selection.' }
                        ].map((item, idx) => (
                          <div key={idx} className="p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
                             <h3 className="text-xl font-bold text-brand-900 mb-3">{item.title}</h3>
                             <p className="text-gray-600">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ProductList /> {/* Show some products on home too */}
                </>
              } />
              <Route path="/products" element={<ProductList />} />
              <Route path="/about" element={
                <div className="pt-24 pb-12 max-w-7xl mx-auto px-4">
                  <h1 className="text-4xl font-bold mb-6">About Huachuang Yunsheng</h1>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Shaanxi Huachuang Yunsheng Technology Co., Ltd. is a premier supplier of pneumatic automation components in Northwest China. 
                    We pride ourselves on our extensive inventory, competitive pricing, and unparalleled customer service.
                  </p>
                  <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden bg-gray-200">
                    <img src="https://picsum.photos/1200/600?random=office" alt="Office" className="w-full h-full object-cover" />
                  </div>
                </div>
              } />
              <Route path="/admin" element={
                user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />
              } />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
