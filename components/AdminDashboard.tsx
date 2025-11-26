import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AppContext } from '../App';
import { PRODUCTS, TRANSLATIONS } from '../constants';
import { Package, Users, DollarSign, TrendingUp, Edit3 } from 'lucide-react';

const data = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 139 },
  { name: 'Mar', sales: 2000, orders: 980 },
  { name: 'Apr', sales: 2780, orders: 390 },
  { name: 'May', sales: 1890, orders: 480 },
  { name: 'Jun', sales: 2390, orders: 380 },
  { name: 'Jul', sales: 3490, orders: 430 },
];

export const AdminDashboard: React.FC = () => {
    const { language } = useContext(AppContext);
    const t = TRANSLATIONS[language];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{t.adminDashboard}</h1>
                    <div className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm text-gray-500">
                        Overview: Last 30 Days
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: 'Total Revenue', value: '¥1,245,000', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
                        { title: 'Active Users', value: '1,234', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
                        { title: 'Products Sold', value: '856', icon: Package, color: 'text-purple-600', bg: 'bg-purple-100' },
                        { title: 'Conversion Rate', value: '3.2%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:translate-y-[-2px]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                                <div className={`p-2 rounded-lg ${stat.bg}`}>
                                    <stat.icon size={20} className={stat.color} />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-xs text-green-600 mt-2 flex items-center">
                                <TrendingUp size={12} className="mr-1" /> +12.5% from last month
                            </p>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Trend</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                                    <Tooltip 
                                        contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} 
                                        cursor={{fill: '#f9fafb'}}
                                    />
                                    <Bar dataKey="sales" fill="#0284c7" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Order Volume</h3>
                         <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                                    <Tooltip contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                                    <Line type="monotone" dataKey="orders" stroke="#7c3aed" strokeWidth={3} dot={{r: 4, fill: '#7c3aed', strokeWidth: 0}} activeDot={{r: 6}} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Visual Editing / Inventory Table Simulation */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900">Inventory Management</h3>
                        <button className="text-brand-600 text-sm font-medium hover:text-brand-700">Add New Product</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="p-4 font-medium">Product</th>
                                    <th className="p-4 font-medium">Brand</th>
                                    <th className="p-4 font-medium">Price</th>
                                    <th className="p-4 font-medium">Stock</th>
                                    <th className="p-4 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {PRODUCTS.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                                <span className="font-medium text-gray-900">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600">{product.brand}</td>
                                        <td className="p-4 text-gray-900 font-medium">¥{product.price}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 200 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {product.stock} units
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button className="text-gray-400 hover:text-brand-600 transition-colors">
                                                <Edit3 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
