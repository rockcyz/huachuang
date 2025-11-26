import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AppContext } from '../App';
import { TRANSLATIONS } from '../constants';

export const Hero: React.FC = () => {
    const { language } = useContext(AppContext);
    const t = TRANSLATIONS[language];

    return (
        <div className="relative bg-slate-900 overflow-hidden pt-20">
            {/* Background Abstract Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-brand-500 rounded-full blur-[120px]" />
                <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
                <div className="lg:w-2/3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/50 border border-brand-700/50 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                        {language === 'zh' ? '官方授权经销商' : 'Authorized Distributor'}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
                        {t.heroTitle}
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                        {t.heroSubtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            to="/products" 
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white bg-brand-600 hover:bg-brand-700 transition-all hover:scale-105 shadow-lg shadow-brand-600/30"
                        >
                            {t.buyNow}
                            <ArrowRight className="ml-2 -mr-1" size={20} />
                        </Link>
                        <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white border border-gray-600 hover:bg-white/10 transition-colors backdrop-blur-sm">
                            {t.contactUs}
                        </button>
                    </div>
                </div>
            </div>

            {/* Brands Strip */}
            <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <p className="text-center text-gray-400 text-sm font-medium uppercase tracking-widest mb-6">
                        {t.featuredBrands}
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {['SMC', 'FESTO', 'AirTac', 'NORGREN'].map((brand) => (
                            <div key={brand} className="text-2xl md:text-3xl font-black text-white/80 hover:text-white cursor-default">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
