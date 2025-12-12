
import React, { useState } from 'react';
import { User, CategoryData, Package, Ticket, Meeting } from '../types';

interface Order {
  id: string;
  serviceName: string;
  status: string;
  progress: number;
  startDate: string;
  deliveryDate: string;
  image: string;
  steps: { name: string; completed: boolean; current?: boolean }[];
}

interface UserDashboardProps {
  user: User;
  pricingData: CategoryData[];
  onSelectPackage: (pkg: Package) => void;
  orders: Order[];
}

// --- MOCK DATA ---
const initialTickets: Ticket[] = [
    { id: 'TCK-921', subject: 'Reklam bütçesi revizesi', status: 'Yanıtlandı', lastUpdate: '2 saat önce', priority: 'Yüksek' },
    { id: 'TCK-854', subject: 'Fatura talebi', status: 'Kapalı', lastUpdate: '3 gün önce', priority: 'Düşük' },
];

const initialMeetings: Meeting[] = [
    { id: 'MTG-1', title: 'Aylık Performans Değerlendirmesi', date: '25 Ekim 2024', time: '14:00', consultant: 'Emre Yılmaz', status: 'Onaylandı' },
];

const mockCampaigns = [
    { id: 1, name: 'Yaz Sezonu İndirimi', platform: 'meta', status: 'active', spend: '₺4.250', clicks: 850, ctr: '2.4%' },
    { id: 2, name: 'Marka Bilinirliği (Search)', platform: 'google', status: 'active', spend: '₺2.100', clicks: 1200, ctr: '5.1%' },
    { id: 3, name: 'Retargeting - Sepet', platform: 'meta', status: 'paused', spend: '₺950', clicks: 140, ctr: '1.8%' },
];

const mockAutomations = [
    { id: 1, name: 'Hoşgeldin Serisi', type: 'Email', status: 'active', sent: 1250, openRate: '42%' },
    { id: 2, name: 'Sepet Hatırlatma', type: 'SMS + Email', status: 'active', sent: 340, conversion: '12%' },
    { id: 3, name: 'Geri Kazanım', type: 'Email', status: 'draft', sent: 0, openRate: '-' },
];

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, pricingData, onSelectPackage, orders }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'analytics' | 'ads' | 'marketing' | 'support' | 'meetings' | 'marketplace'>('orders');
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [campaigns, setCampaigns] = useState(mockCampaigns);

  // Navigation Items
  const navItems = [
    { id: 'orders', icon: 'inventory_2', label: 'Siparişler' },
    { id: 'analytics', icon: 'insights', label: 'Raporlar' },
    { id: 'ads', icon: 'campaign', label: 'Reklam Yönetimi' },
    { id: 'marketing', icon: 'mark_email_read', label: 'Pazarlama' },
    { id: 'marketplace', icon: 'storefront', label: 'Market' },
    { id: 'meetings', icon: 'calendar_month', label: 'Toplantılar' },
    { id: 'support', icon: 'support_agent', label: 'Destek' },
  ];

  const handleNewTicket = () => {
      const newTicket: Ticket = {
          id: `TCK-${Math.floor(Math.random() * 1000)}`,
          subject: 'Yeni Destek Talebi',
          status: 'Açık',
          lastUpdate: 'Az önce',
          priority: 'Orta'
      };
      setTickets([newTicket, ...tickets]);
  };

  const toggleCampaignStatus = (id: number) => {
      setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c));
  };

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-20 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen flex flex-col md:flex-row gap-8 bg-slate-50 text-slate-900">
        
        {/* --- SIDEBAR NAVIGATION --- */}
        <div className="hidden md:flex w-72 flex-col gap-2 shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <div className="mb-6 px-4 py-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-3xl font-bold text-white mb-3 shadow-lg shadow-purple-200">
                    {user.name.charAt(0)}
                </div>
                <h1 className="text-lg font-bold text-slate-900 truncate">{user.name}</h1>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                <div className="mt-4 flex justify-center">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-200">Premium Hesap</span>
                </div>
            </div>
            
            <div className="space-y-1">
                {navItems.map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-left font-medium ${activeTab === item.id ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
                    >
                        <span className={`material-icons ${activeTab === item.id ? 'text-purple-400' : 'text-slate-400'}`}>{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                        {item.id === 'ads' && <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                    </button>
                ))}
            </div>

             <div className="mt-auto px-4 py-4">
                 <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-4 shadow-lg text-white relative overflow-hidden">
                     <div className="relative z-10">
                        <p className="text-xs text-purple-200 mb-1 uppercase font-bold">Müşteri Temsilcisi</p>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white border border-white/30">SK</div>
                            <div>
                                <div className="text-sm font-bold">Selin K.</div>
                                <div className="text-[10px] text-purple-200">7/24 Aktif</div>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-white text-purple-700 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 hover:bg-purple-50">
                            <span className="material-icons text-sm">chat</span>
                            Canlı Destek
                        </button>
                     </div>
                     {/* Decor */}
                     <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                 </div>
             </div>
        </div>

        {/* --- MOBILE BOTTOM NAV --- */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center p-2 overflow-x-auto">
                {navItems.slice(0, 5).map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`flex flex-col items-center justify-center p-2 min-w-[64px] rounded-lg ${activeTab === item.id ? 'text-purple-600' : 'text-slate-400'}`}
                    >
                        <span className={`material-icons text-2xl mb-1 ${activeTab === item.id ? 'scale-110' : ''}`}>{item.icon}</span>
                        <span className="text-[9px] font-bold whitespace-nowrap">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 w-full min-w-0">
            
            {/* 1. ORDERS / PROJECTS */}
            {activeTab === 'orders' && (
                <div className="animate-fadeIn space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Proje Yönetimi</h2>
                            <p className="text-slate-500">Aktif siparişlerinizin durumunu ve süreçlerini takip edin.</p>
                        </div>
                        <button onClick={() => setActiveTab('marketplace')} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                            <span className="material-icons text-sm">add</span> Yeni Sipariş
                        </button>
                    </div>

                    {orders.length === 0 ? (
                         <div className="bg-white border border-slate-200 rounded-[2rem] p-12 text-center shadow-sm">
                             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                 <span className="material-icons text-4xl text-slate-300">inventory_2</span>
                             </div>
                             <h3 className="text-xl font-bold text-slate-900 mb-2">Henüz Aktif Projeniz Yok</h3>
                             <p className="text-slate-500 mb-6 max-w-md mx-auto">Markanızı büyütmek için ilk adımı atın. Web tasarım, reklam veya SEO paketlerimizi inceleyin.</p>
                             <button onClick={() => setActiveTab('marketplace')} className="text-purple-600 font-bold hover:underline flex items-center justify-center gap-1">
                                 Hizmetlere Göz At <span className="material-icons text-sm">arrow_forward</span>
                             </button>
                         </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-300">
                                {/* Order Header */}
                                <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-start md:items-center bg-slate-50/50">
                                    <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shadow-md shrink-0">
                                        <img src={order.image} alt={order.serviceName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full uppercase tracking-wide border border-purple-200">{order.status}</span>
                                            <span className="text-slate-400 text-xs font-mono">#{order.id}</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-2">{order.serviceName}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                            <div className="flex items-center gap-1"><span className="material-icons text-sm">calendar_today</span> Başlangıç: <span className="font-bold text-slate-700">{order.startDate}</span></div>
                                            <div className="flex items-center gap-1"><span className="material-icons text-sm">event</span> Tahmini Teslim: <span className="font-bold text-slate-700">{order.deliveryDate}</span></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <button className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-purple-300 hover:text-purple-600 transition-colors flex items-center justify-center gap-2">
                                            <span className="material-icons text-sm">description</span> Sözleşme
                                        </button>
                                        <button className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-purple-300 hover:text-purple-600 transition-colors flex items-center justify-center gap-2">
                                            <span className="material-icons text-sm">receipt</span> Fatura
                                        </button>
                                    </div>
                                </div>

                                {/* Progress Bar & Steps */}
                                <div className="p-6 md:p-10">
                                    <div className="flex justify-between items-center mb-4 text-sm font-bold text-slate-400">
                                        <span>Proje İlerlemesi</span>
                                        <span className="text-purple-600 text-lg">{order.progress}%</span>
                                    </div>
                                    <div className="w-full h-4 bg-slate-100 rounded-full mb-12 overflow-hidden border border-slate-100 shadow-inner">
                                        <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-out relative" style={{ width: `${order.progress}%` }}>
                                            <div className="absolute top-0 right-0 bottom-0 w-full bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                                        <div className="hidden md:block absolute top-6 left-0 w-full h-[2px] bg-slate-100 -z-10"></div>
                                        {order.steps.map((step, idx) => (
                                            <div key={idx} className={`relative flex flex-row md:flex-col items-center gap-4 md:gap-2 ${step.completed ? 'text-slate-800' : 'text-slate-400'}`}>
                                                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center bg-white z-10 transition-all shadow-sm ${step.completed ? 'border-green-500 text-green-500' : step.current ? 'border-blue-500 text-blue-500 animate-pulse' : 'border-slate-200 text-slate-300'}`}>
                                                    <span className="material-icons text-xl">{step.completed ? 'check' : step.current ? 'construction' : 'lock'}</span>
                                                </div>
                                                <div className="md:text-center">
                                                    <h4 className={`font-bold text-sm ${step.current ? 'text-blue-600' : ''}`}>{step.name}</h4>
                                                    {step.current && <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold border border-blue-100 inline-block mt-1">Şu anki aşama</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* 2. AD MANAGEMENT (NEW) */}
            {activeTab === 'ads' && (
                <div className="animate-fadeIn space-y-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Reklam Yönetimi</h2>
                            <p className="text-slate-500">Tüm reklam hesaplarınızı tek bir panelden yönetin.</p>
                        </div>
                        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-500 transition-all flex items-center gap-2">
                            <span className="material-icons text-sm">add</span> Yeni Kampanya
                        </button>
                    </div>

                    {/* Account Integrations */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">f</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Meta Ads</h4>
                                    <p className="text-xs text-green-600 font-bold flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Bağlı</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600"><span className="material-icons">settings</span></button>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold">G</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Google Ads</h4>
                                    <p className="text-xs text-green-600 font-bold flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Bağlı</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600"><span className="material-icons">settings</span></button>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-2 text-slate-500 font-bold">
                                <span className="material-icons">add_circle_outline</span>
                                TikTok / Diğer Bağla
                            </div>
                        </div>
                    </div>

                    {/* Campaigns List */}
                    <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-lg">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900">Aktif Kampanyalar</h3>
                            <button className="text-purple-600 text-sm font-bold hover:underline">Tümünü Gör</button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {campaigns.map((camp) => (
                                <div key={camp.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4 w-full md:w-1/3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm ${camp.platform === 'meta' ? 'bg-blue-600' : 'bg-red-500'}`}>
                                            {camp.platform === 'meta' ? 'f' : 'G'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm md:text-base">{camp.name}</h4>
                                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${camp.status === 'active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
                                                {camp.status === 'active' ? 'YAYINDA' : 'DURAKLATILDI'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between w-full md:w-1/3 gap-4">
                                        <div className="text-center">
                                            <p className="text-xs text-slate-400 font-bold uppercase">Harcama</p>
                                            <p className="font-bold text-slate-900">{camp.spend}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-slate-400 font-bold uppercase">Tıklama</p>
                                            <p className="font-bold text-slate-900">{camp.clicks}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-slate-400 font-bold uppercase">CTR</p>
                                            <p className="font-bold text-green-600">{camp.ctr}</p>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto flex justify-end">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={camp.status === 'active'} onChange={() => toggleCampaignStatus(camp.id)} />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 3. MARKETING (NEW) */}
            {activeTab === 'marketing' && (
                <div className="animate-fadeIn space-y-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Pazarlama Otomasyonu</h2>
                            <p className="text-slate-500">Müşterilerinize otomatik e-posta ve SMS gönderin.</p>
                        </div>
                        <button className="bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-purple-500 transition-all flex items-center gap-2">
                            <span className="material-icons text-sm">add</span> Yeni Otomasyon
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {mockAutomations.map((auto) => (
                            <div key={auto.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm mb-4 text-purple-600">
                                        <span className="material-icons">{auto.type.includes('SMS') ? 'sms' : 'email'}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{auto.name}</h3>
                                    <p className="text-xs text-slate-500 mb-4">{auto.type} Kampanyası</p>
                                    
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Gönderilen</p>
                                            <p className="font-bold text-slate-900">{auto.sent}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Açılma/Dönüşüm</p>
                                            <p className="font-bold text-green-600">{auto.openRate || auto.conversion}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${auto.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                            {auto.status === 'active' ? 'Çalışıyor' : 'Taslak'}
                                        </span>
                                        <button className="text-slate-400 hover:text-purple-600"><span className="material-icons">edit</span></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* New Automation Card */}
                        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-[2rem] flex flex-col items-center justify-center text-center p-6 hover:bg-slate-100 transition-colors cursor-pointer group">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                <span className="material-icons text-slate-400">add</span>
                            </div>
                            <h3 className="font-bold text-slate-600">Özel Akış Oluştur</h3>
                            <p className="text-xs text-slate-400 mt-1">Sürükle bırak editör ile kurgula</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. ANALYTICS (Detailed) */}
            {activeTab === 'analytics' && (
                <div className="animate-fadeIn space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-bold text-slate-900">Performans Raporu</h2>
                        <div className="bg-white border border-slate-200 rounded-lg p-1 flex text-xs font-bold">
                            <button className="px-3 py-1 bg-slate-900 text-white rounded shadow-sm">30 Gün</button>
                            <button className="px-3 py-1 text-slate-500 hover:bg-slate-50 rounded">90 Gün</button>
                            <button className="px-3 py-1 text-slate-500 hover:bg-slate-50 rounded">Yıl</button>
                        </div>
                    </div>
                    
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-slate-400 text-xs uppercase font-bold">Toplam Ciro</div>
                                <span className="material-icons text-green-500 text-lg">trending_up</span>
                            </div>
                            <div className="text-2xl font-black text-slate-900">₺142,500</div>
                            <div className="text-xs text-green-600 mt-1 font-bold bg-green-50 w-fit px-2 py-0.5 rounded">+%12.5</div>
                        </div>
                        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-slate-400 text-xs uppercase font-bold">Reklam Harcaması</div>
                                <span className="material-icons text-blue-500 text-lg">payments</span>
                            </div>
                            <div className="text-2xl font-black text-slate-900">₺14,250</div>
                            <div className="text-xs text-slate-500 mt-1">ROAS: <span className="text-blue-600 font-bold">10x</span></div>
                        </div>
                        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-slate-400 text-xs uppercase font-bold">Ziyaretçi</div>
                                <span className="material-icons text-purple-500 text-lg">group</span>
                            </div>
                            <div className="text-2xl font-black text-slate-900">45.2K</div>
                            <div className="text-xs text-green-600 mt-1 font-bold">+%5.2</div>
                        </div>
                        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-slate-400 text-xs uppercase font-bold">Dönüşüm Oranı</div>
                                <span className="material-icons text-yellow-500 text-lg">shopping_cart</span>
                            </div>
                            <div className="text-2xl font-black text-slate-900">%3.8</div>
                            <div className="text-xs text-yellow-600 mt-1 font-bold bg-yellow-50 w-fit px-2 py-0.5 rounded">Stabil</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         {/* Traffic Chart Simulation */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-4 bg-purple-500 rounded-full"></span> Trafik Analizi
                            </h3>
                            <div className="flex items-end gap-2 h-48 w-full">
                                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                                    <div key={i} className="flex-1 bg-slate-100 rounded-t-sm relative group overflow-hidden">
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-500 to-blue-400 transition-all duration-500 group-hover:opacity-100 opacity-80" style={{ height: `${h}%` }}></div>
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-slate-800 text-white px-2 py-1 rounded font-bold transition-opacity">{h * 10}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium border-t border-slate-100 pt-2">
                                <span>1 Eki</span>
                                <span>15 Eki</span>
                                <span>30 Eki</span>
                            </div>
                        </div>

                        {/* Channel Distribution */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                             <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-1 h-4 bg-blue-500 rounded-full"></span> Satış Kaynakları
                             </h3>
                             <div className="space-y-5">
                                 <div>
                                     <div className="flex justify-between text-xs mb-1 font-medium"><span className="text-slate-500 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Google Ads</span><span className="text-slate-900 font-bold">₺64,125 (45%)</span></div>
                                     <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-blue-500 h-2 rounded-full w-[45%]"></div></div>
                                 </div>
                                 <div>
                                     <div className="flex justify-between text-xs mb-1 font-medium"><span className="text-slate-500 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-pink-500"></span> Instagram / Meta</span><span className="text-slate-900 font-bold">₺49,875 (35%)</span></div>
                                     <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-pink-500 h-2 rounded-full w-[35%]"></div></div>
                                 </div>
                                 <div>
                                     <div className="flex justify-between text-xs mb-1 font-medium"><span className="text-slate-500 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> SEO / Organik</span><span className="text-slate-900 font-bold">₺28,500 (20%)</span></div>
                                     <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-green-500 h-2 rounded-full w-[20%]"></div></div>
                                 </div>
                             </div>
                             <button className="mt-6 w-full py-3 bg-slate-50 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                                 <span className="material-icons text-sm">download</span> Detaylı Rapor İndir
                             </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 5. SUPPORT & TICKETS */}
            {activeTab === 'support' && (
                <div className="animate-fadeIn">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Destek Merkezi</h2>
                            <p className="text-slate-500">Taleplerinizi oluşturun ve takip edin.</p>
                        </div>
                        <button onClick={handleNewTicket} className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105">
                            <span className="material-icons text-sm">add</span> Yeni Destek Talebi
                        </button>
                    </div>

                    <div className="space-y-4">
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between hover:border-purple-300 transition-all cursor-pointer shadow-sm hover:shadow-md group">
                                <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${ticket.status === 'Açık' ? 'bg-red-50 text-red-600 group-hover:bg-red-100' : ticket.status === 'Yanıtlandı' ? 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100' : 'bg-slate-100 text-slate-500'}`}>
                                        <span className="material-icons text-xl">
                                            {ticket.status === 'Açık' ? 'priority_high' : ticket.status === 'Yanıtlandı' ? 'forum' : 'check_circle'}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-slate-900 font-bold text-base mb-1">{ticket.subject}</h4>
                                        <div className="flex items-center gap-3 text-xs text-slate-500">
                                            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">#{ticket.id}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><span className="material-icons text-[10px]">schedule</span> {ticket.lastUpdate}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${ticket.priority === 'Yüksek' ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'}`}>
                                        {ticket.priority} Öncelik
                                    </span>
                                    <span className={`text-xs px-3 py-1 rounded-full font-bold border ${ticket.status === 'Kapalı' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-white text-slate-900 border-slate-200 shadow-sm'}`}>
                                        {ticket.status}
                                    </span>
                                    <span className="material-icons text-slate-300 group-hover:text-purple-500 transition-colors">chevron_right</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 6. MEETINGS */}
            {activeTab === 'meetings' && (
                 <div className="animate-fadeIn">
                     <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Toplantı Takvimi</h2>
                            <p className="text-slate-500">Uzman ekibimizle birebir görüşmelerinizi planlayın.</p>
                        </div>
                        <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg">
                            <span className="material-icons text-sm">event</span> Toplantı Planla
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {initialMeetings.map((meeting) => (
                             <div key={meeting.id} className="bg-white border border-slate-200 p-6 rounded-[2rem] relative overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                                 <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-blue-500"></div>
                                 <div className="flex justify-between items-start mb-6">
                                     <div>
                                         <h3 className="font-bold text-lg text-slate-900 mb-1">{meeting.title}</h3>
                                         <div className="flex items-center gap-2">
                                             <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80" className="w-6 h-6 rounded-full border border-white shadow-sm" />
                                             <p className="text-slate-500 text-xs font-bold">{meeting.consultant}</p>
                                         </div>
                                     </div>
                                     <div className="text-center bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-inner min-w-[60px]">
                                         <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">EKİM</div>
                                         <div className="text-2xl font-black text-slate-900 leading-none mt-1">25</div>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
                                     <div className="flex items-center gap-1.5 font-medium bg-slate-50 px-3 py-1.5 rounded-lg"><span className="material-icons text-purple-500 text-sm">schedule</span> {meeting.time}</div>
                                     <div className="flex items-center gap-1.5 font-medium bg-slate-50 px-3 py-1.5 rounded-lg"><span className="material-icons text-blue-500 text-sm">videocam</span> Google Meet</div>
                                 </div>
                                 <button className="mt-4 w-full py-2 bg-purple-600 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">Toplantıya Katıl</button>
                             </div>
                        ))}
                        
                        {/* New Meeting Placeholder */}
                        <div className="border-2 border-dashed border-slate-300 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-purple-300 transition-all cursor-pointer group min-h-[200px]">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm mb-4 group-hover:text-purple-600 group-hover:scale-110 transition-all">
                                <span className="material-icons text-3xl">add_card</span>
                            </div>
                            <h3 className="text-slate-900 font-bold mb-1">Yeni Görüşme Ayarla</h3>
                            <p className="text-slate-400 text-xs">Strateji ekibimizle uygun bir zaman seçin.</p>
                        </div>
                    </div>
                 </div>
            )}

            {/* 7. MARKETPLACE */}
            {activeTab === 'marketplace' && (
                <div className="animate-fadeIn">
                     <div className="mb-8">
                         <h2 className="text-3xl font-bold text-slate-900">Hizmet Marketi</h2>
                         <p className="text-slate-500">İşletmenizi büyütecek profesyonel çözümler.</p>
                    </div>

                    <div className="space-y-8">
                        {pricingData.map((category) => (
                            <div key={category.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 shadow-sm">
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm">
                                        <span className="material-icons text-2xl">{category.icon || 'category'}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{category.label}</h3>
                                        <p className="text-xs text-slate-500 line-clamp-1">{category.shortDesc}</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {category.packages.map((pkg, idx) => (
                                        <div key={idx} className={`p-5 rounded-2xl border flex flex-col justify-between transition-all hover:shadow-lg ${pkg.isPopular ? 'border-purple-200 bg-purple-50/30' : 'border-slate-100 bg-slate-50/50'}`}>
                                            <div>
                                                {pkg.isPopular && <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded uppercase font-bold mb-3 inline-block shadow-sm">En Çok Tercih Edilen</span>}
                                                <h4 className="text-slate-900 font-bold text-lg mb-1">{pkg.name}</h4>
                                                <div className="text-2xl font-black text-slate-900 mb-4">{pkg.price} <span className="text-xs font-normal text-slate-500">{pkg.period}</span></div>
                                            </div>
                                            <button 
                                                onClick={() => onSelectPackage(pkg)}
                                                className={`w-full py-3 rounded-xl text-xs font-bold shadow-md transition-transform active:scale-95 ${pkg.isPopular ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-100'}`}
                                            >
                                                Hemen Satın Al
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    </div>
  );
};
