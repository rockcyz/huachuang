import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Globe, Menu, X, Phone, ShieldCheck, Truck, Zap } from 'lucide-react';
import { AppContext } from '../App';
import { TRANSLATIONS } from '../constants';

export const Header: React.FC = () => {
  const { language, setLanguage, cart, user, setShowAuthModal, setShowCart } = useContext(AppContext);
  const t = TRANSLATIONS[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleLang = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.products, path: '/products' },
    { name: t.about, path: '/about' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">H</div>
             <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-lg leading-tight">华创云昇</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Huachuang Tech</span>
             </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-600 ${location.pathname === link.path ? 'text-brand-600' : 'text-gray-700'}`}
              >
                {link.name}
              </Link>
            ))}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-sm font-medium text-brand-600 hover:text-brand-800">
                {t.adminDashboard}
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={toggleLang} className="text-gray-500 hover:text-brand-600 flex items-center gap-1">
              <Globe size={18} />
              <span className="text-xs font-medium uppercase">{language}</span>
            </button>
            
            <button onClick={() => setShowCart(true)} className="relative text-gray-500 hover:text-brand-600">
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>

            {user ? (
               <div className="flex items-center gap-2">
                 <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-gray-200" />
                 <span className="text-sm font-medium text-gray-700">{user.name}</span>
               </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 bg-brand-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-800 transition-colors shadow-lg shadow-brand-500/30"
              >
                <User size={16} />
                {t.login}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-600"
              >
                {link.name}
              </Link>
            ))}
             <div className="border-t border-gray-100 my-2 pt-2">
                <button onClick={() => {toggleLang(); setMobileMenuOpen(false);}} className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
                   <Globe size={18} className="mr-2" /> Switch Language ({language})
                </button>
                <button onClick={() => {setShowCart(true); setMobileMenuOpen(false);}} className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
                   <ShoppingCart size={18} className="mr-2" /> {t.cart} ({cart.length})
                </button>
                {!user && (
                    <button onClick={() => {setShowAuthModal(true); setMobileMenuOpen(false);}} className="flex w-full items-center px-3 py-2 text-base font-medium text-brand-600 hover:bg-gray-50">
                        <User size={18} className="mr-2" /> {t.login}
                    </button>
                )}
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => {
    const { language } = useContext(AppContext);
    const t = TRANSLATIONS[language];

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-brand-500 rounded flex items-center justify-center font-bold">H</div>
                            <span className="text-xl font-bold">华创云昇</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {language === 'zh' ? '致力于为工业自动化提供最优质的气动元件解决方案。' : 'Dedicated to providing the highest quality pneumatic component solutions for industrial automation.'}
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t.products}</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>SMC Cylinders</li>
                            <li>Festo Valves</li>
                            <li>Airtac Fittings</li>
                            <li>Norgren Regulators</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t.contact}</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-brand-500"/>
                                +86 029-88888888
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-brand-500 font-bold">@</span>
                                sales@hcys-tech.com
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-4 h-4 rounded-full bg-brand-500 flex-shrink-0" />
                                {language === 'zh' ? '陕西省西安市高新区' : 'High-tech Zone, Xi\'an, Shaanxi, China'}
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t.features}</h3>
                         <ul className="space-y-3">
                             <li className="flex items-center gap-3 text-sm text-gray-400">
                                 <ShieldCheck size={18} className="text-green-500"/>
                                 {language === 'zh' ? '正品保证' : 'Authentic Guarantee'}
                             </li>
                             <li className="flex items-center gap-3 text-sm text-gray-400">
                                 <Truck size={18} className="text-blue-500"/>
                                 {language === 'zh' ? '极速发货' : 'Fast Shipping'}
                             </li>
                             <li className="flex items-center gap-3 text-sm text-gray-400">
                                 <Zap size={18} className="text-yellow-500"/>
                                 {language === 'zh' ? '专业选型' : 'Expert Selection'}
                             </li>
                         </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; 2024 Shaanxi Huachuang Yunsheng Technology Co., Ltd.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
