import React, { useContext, useState } from 'react';
import { ShoppingBag, Plus, Filter, Search, X, Minus, Trash2 } from 'lucide-react';
import { AppContext } from '../App';
import { PRODUCTS, TRANSLATIONS } from '../constants';
import { Product } from '../types';

export const ProductList: React.FC = () => {
    const { addToCart, language } = useContext(AppContext);
    const t = TRANSLATIONS[language];
    const [filterBrand, setFilterBrand] = useState<string>('All');

    const brands = ['All', 'SMC', 'Festo', 'Airtac', 'Norgren'];
    
    const filteredProducts = filterBrand === 'All' 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.brand === filterBrand);

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{t.products}</h2>
                        <p className="text-gray-500 mt-1">Premium pneumatic components for automation.</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                            <Filter size={16} className="text-gray-400" />
                            <select 
                                value={filterBrand}
                                onChange={(e) => setFilterBrand(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm text-gray-700 cursor-pointer"
                            >
                                {brands.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search part #..." 
                                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-brand-500 outline-none text-sm w-full md:w-64"
                            />
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                            <div className="relative h-56 bg-gray-100 overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-brand-900">
                                    {product.brand}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                                <h3 className="font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8">{product.description}</p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="text-lg font-bold text-brand-600">¥{product.price}</div>
                                    <button 
                                        onClick={() => addToCart(product)}
                                        className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const CartDrawer: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, showCart, setShowCart, language } = useContext(AppContext);
    const t = TRANSLATIONS[language];

    if (!showCart) return null;

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 z-[60] overflow-hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCart(false)} />
            
            <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
                <div className="w-full h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <ShoppingBag className="text-brand-600" />
                            {t.cart}
                        </h2>
                        <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <ShoppingBag size={48} className="mb-4 opacity-20" />
                                <p>Your cart is empty.</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                                            <p className="text-xs text-gray-500">{item.brand}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-brand-600"><Minus size={14}/></button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-brand-600"><Plus size={14}/></button>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-bold text-gray-900">¥{item.price * item.quantity}</span>
                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="border-t border-gray-100 p-6 bg-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-500">Total</span>
                            <span className="text-2xl font-bold text-gray-900">¥{total.toLocaleString()}</span>
                        </div>
                        <button 
                            className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cart.length === 0}
                            onClick={() => alert("Payment Gateway Simulated: Proceeding to Checkout...")}
                        >
                            Checkout Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
