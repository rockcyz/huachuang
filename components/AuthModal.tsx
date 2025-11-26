import React, { useContext, useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { AppContext } from '../App';
import { TRANSLATIONS } from '../constants';

export const AuthModal: React.FC = () => {
    const { showAuthModal, setShowAuthModal, setUser, language } = useContext(AppContext);
    const t = TRANSLATIONS[language];
    const [email, setEmail] = useState('demo@hcys-tech.com');
    const [password, setPassword] = useState('password');
    const [isAdminLogin, setIsAdminLogin] = useState(false);

    if (!showAuthModal) return null;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Login Logic
        const mockUser = {
            id: 'u1',
            name: isAdminLogin ? 'Admin User' : 'John Doe',
            email: email,
            role: isAdminLogin ? 'admin' : 'user',
            avatar: 'https://picsum.photos/200?random=user'
        } as const;
        
        // TypeScript workaround for strict typing in context
        setUser({ ...mockUser, role: isAdminLogin ? 'admin' : 'user' });
        setShowAuthModal(false);
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
            
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up">
                <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={20} />
                </button>
                
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-brand-600 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-brand-600/30">H</div>
                        <h2 className="text-2xl font-bold text-gray-900">{isAdminLogin ? 'Admin Portal' : 'Member Login'}</h2>
                        <p className="text-gray-500 text-sm mt-2">Welcome back to Huachuang Yunsheng</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-700 uppercase">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-700 uppercase">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                                <span className="text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-brand-600 hover:text-brand-800 font-medium">Forgot password?</a>
                        </div>

                        <button type="submit" className="w-full py-3 bg-brand-900 text-white rounded-lg font-bold hover:bg-brand-800 transition-all shadow-lg">
                            {t.login}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <button 
                            onClick={() => setIsAdminLogin(!isAdminLogin)}
                            className="text-xs text-gray-400 hover:text-brand-600 underline"
                        >
                            {isAdminLogin ? 'Switch to Member Login' : 'Switch to Admin Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
