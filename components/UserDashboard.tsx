
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

// Mock Data for New Features
const initialTickets: Ticket[] = [
    { id: 'TCK-921', subject: 'Reklam bütçesi revizesi', status: 'Yanıtlandı', lastUpdate: '2 saat önce', priority: 'Yüksek' },
    { id: 'TCK-854', subject: 'Fatura talebi', status: 'Kapalı', lastUpdate: '3 gün önce', priority: 'Düşük' },
];

const initialMeetings: Meeting[] = [
    { id: 'MTG-1', title: 'Aylık Performans Değerlendirmesi', date: '25 Ekim 2024', time: '14:00', consultant: 'Emre Yılmaz', status: 'Onaylandı' },
];

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, pricingData, onSelectPackage, orders }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'analytics' | 'support' | 'meetings' | 'marketplace'>('timeline');
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  // Mobile Bottom Navigation Items
  const navItems = [
    { id: 'timeline', icon: 'timeline', label: 'Projeler' },
    { id: 'analytics', icon: 'bar_chart', label: 'Rapor' },
    { id: 'support', icon: 'support_agent', label: 'Destek' },
    { id: 'meetings', icon: 'calendar_month', label: 'Toplantı' },
    { id: 'marketplace', icon: 'storefront', label: 'Market' },
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

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col md:flex-row gap-8">
        
        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:flex w-64 flex-col gap-2 shrink-0 sticky top-24 h-fit">
            <div className="mb-8 px-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold text-white mb-3 shadow-lg shadow-purple-900/50">
                    {user.name.charAt(0)}
                </div>
                <h1 className="text-xl font-bold text-white">{user.name}</h1>
                <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            
            {navItems.map((item) => (
                <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === item.id ? 'bg-white text-black font-bold shadow-lg' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
                >
                    <span className="material-icons text-xl">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                </button>
            ))}

             <div className="mt-8 px-4">
                 <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                     <p className="text-gray-400 text-xs mb-2">Müşteri Temsilcisi</p>
                     <div className="flex items-center gap-3 mb-3">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" className="w-8 h-8 rounded-full object-cover" />
                        <div className="text-sm font-bold text-white">Selin K.</div>
                     </div>
                     <button className="w-full py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded transition-colors flex items-center justify-center gap-2">
                        <span className="material-icons text-xs">whatsapp</span>
                        Hızlı Mesaj
                     </button>
                 </div>
             </div>
        </div>

        {/* MOBILE BOTTOM NAV */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-gray-800 z-50 pb-safe">
            <div className="flex justify-around items-center p-2">
                {navItems.map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg w-full ${activeTab === item.id ? 'text-purple-400' : 'text-gray-500'}`}
                    >
                        <span className={`material-icons text-2xl mb-1 ${activeTab === item.id ? 'animate-bounce' : ''}`}>{item.icon}</span>
                        <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 w-full">
            
            {/* --- TAB: TIMELINE --- */}
            {activeTab === 'timeline' && (
                <div className="animate-fadeIn space-y-8">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Siparişlerim</h2>
                            <p className="text-gray-400">Projelerinizin anlık durumunu buradan takip edebilirsiniz.</p>
                        </div>
                    </div>

                    {orders.length === 0 ? (
                         <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-10 text-center">
                             <p className="text-gray-500">Henüz aktif bir projeniz bulunmuyor.</p>
                             <button onClick={() => setActiveTab('marketplace')} className="mt-4 text-purple-400 underline">Yeni Hizmet Satın Al</button>
                         </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="bg-[#0a0a0a] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                                <div className="relative h-48 md:h-64">
                                    <img src={order.image} alt={order.serviceName} className="w-full h-full object-cover opacity-50" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 md:left-10">
                                        <div className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full w-fit mb-2 uppercase tracking-wide">{order.status}</div>
                                        <h3 className="text-2xl md:text-4xl font-bold text-white">{order.serviceName}</h3>
                                        <p className="text-gray-400 text-sm mt-1 font-mono">ID: {order.id}</p>
                                    </div>
                                </div>
                                <div className="p-6 md:p-10">
                                    <div className="flex justify-between items-center mb-4 text-sm font-bold text-gray-400">
                                        <span>Proje İlerlemesi</span>
                                        <span className="text-white text-lg">{order.progress}%</span>
                                    </div>
                                    <div className="w-full h-4 bg-gray-800 rounded-full mb-10 overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-1000 ease-out relative" style={{ width: `${order.progress}%` }}>
                                            <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_white]"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                                        <div className="hidden md:block absolute top-6 left-0 w-full h-[2px] bg-gray-800 -z-10"></div>
                                        {order.steps.map((step, idx) => (
                                            <div key={idx} className={`relative flex flex-row md:flex-col items-center gap-4 md:gap-2 ${step.completed ? 'text-white' : 'text-gray-600'}`}>
                                                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center bg-[#0a0a0a] z-10 transition-all ${step.completed ? 'border-green-500 text-green-500' : step.current ? 'border-blue-500 text-blue-500 animate-pulse' : 'border-gray-800 text-gray-700'}`}>
                                                    <span className="material-icons text-xl">{step.completed ? 'check' : step.current ? 'work' : 'lock'}</span>
                                                </div>
                                                <div className="md:text-center">
                                                    <h4 className={`font-bold text-sm ${step.current ? 'text-blue-400' : ''}`}>{step.name}</h4>
                                                    {step.current && <span className="text-[10px] bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded">Şu anki aşama</span>}
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

            {/* --- TAB: ANALYTICS (NEW) --- */}
            {activeTab === 'analytics' && (
                <div className="animate-fadeIn space-y-6">
                    <h2 className="text-3xl font-bold text-white mb-2">Performans Raporu</h2>
                    
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl">
                            <div className="text-gray-500 text-xs uppercase font-bold mb-1">Toplam Harcama</div>
                            <div className="text-2xl font-bold text-white">₺14,250</div>
                            <div className="text-xs text-green-500 mt-1">Geçen aya göre +%12</div>
                        </div>
                        <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl">
                            <div className="text-gray-500 text-xs uppercase font-bold mb-1">ROAS (Getiri)</div>
                            <div className="text-2xl font-bold text-blue-400">4.8x</div>
                            <div className="text-xs text-green-500 mt-1">Hedef: 4.0x</div>
                        </div>
                        <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl">
                            <div className="text-gray-500 text-xs uppercase font-bold mb-1">Tıklama (CPC)</div>
                            <div className="text-2xl font-bold text-white">₺2.10</div>
                            <div className="text-xs text-yellow-500 mt-1">Stabil</div>
                        </div>
                        <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl">
                            <div className="text-gray-500 text-xs uppercase font-bold mb-1">Dönüşüm</div>
                            <div className="text-2xl font-bold text-purple-400">342</div>
                            <div className="text-xs text-green-500 mt-1">Rekor Seviye</div>
                        </div>
                    </div>

                    {/* Charts Simulation */}
                    <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-6">Trafik & Dönüşüm Analizi</h3>
                        <div className="flex items-end gap-2 h-48 w-full">
                            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                                <div key={i} className="flex-1 bg-gray-900 rounded-t-sm relative group overflow-hidden">
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600 to-blue-500 transition-all duration-500 group-hover:opacity-100 opacity-80" style={{ height: `${h}%` }}></div>
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-white text-black px-2 py-1 rounded font-bold transition-opacity">{h * 10}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>1 Eki</span>
                            <span>15 Eki</span>
                            <span>30 Eki</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
                             <h3 className="font-bold text-white mb-4">Kanal Dağılımı</h3>
                             <div className="space-y-4">
                                 <div>
                                     <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">Google Ads</span><span className="text-white">45%</span></div>
                                     <div className="w-full bg-gray-900 h-2 rounded-full"><div className="bg-blue-500 h-2 rounded-full w-[45%]"></div></div>
                                 </div>
                                 <div>
                                     <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">Instagram / Meta</span><span className="text-white">35%</span></div>
                                     <div className="w-full bg-gray-900 h-2 rounded-full"><div className="bg-pink-500 h-2 rounded-full w-[35%]"></div></div>
                                 </div>
                                 <div>
                                     <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">SEO / Organik</span><span className="text-white">20%</span></div>
                                     <div className="w-full bg-gray-900 h-2 rounded-full"><div className="bg-green-500 h-2 rounded-full w-[20%]"></div></div>
                                 </div>
                             </div>
                         </div>
                         <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 flex flex-col justify-center text-center">
                             <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                 <span className="material-icons text-3xl">download</span>
                             </div>
                             <h3 className="font-bold text-white mb-2">Detaylı PDF Rapor</h3>
                             <p className="text-xs text-gray-500 mb-4">Tüm metrikleri içeren kapsamlı aylık raporu indirin.</p>
                             <button className="bg-white text-black py-2 rounded-lg font-bold text-sm hover:bg-gray-200">Raporu İndir (PDF)</button>
                         </div>
                    </div>
                </div>
            )}

            {/* --- TAB: SUPPORT (NEW) --- */}
            {activeTab === 'support' && (
                <div className="animate-fadeIn">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Destek Talepleri</h2>
                        <button onClick={handleNewTicket} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                            <span className="material-icons text-sm">add</span> Yeni Talep
                        </button>
                    </div>

                    <div className="space-y-4">
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl flex items-center justify-between hover:border-gray-600 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ticket.status === 'Açık' ? 'bg-green-900/20 text-green-500' : ticket.status === 'Yanıtlandı' ? 'bg-yellow-900/20 text-yellow-500' : 'bg-gray-800 text-gray-500'}`}>
                                        <span className="material-icons text-lg">
                                            {ticket.status === 'Açık' ? 'mark_email_unread' : ticket.status === 'Yanıtlandı' ? 'reply' : 'check'}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{ticket.subject}</h4>
                                        <p className="text-gray-500 text-xs">ID: {ticket.id} • Son Güncelleme: {ticket.lastUpdate}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs px-2 py-1 rounded font-bold ${ticket.status === 'Kapalı' ? 'bg-gray-800 text-gray-400' : 'bg-blue-900/30 text-blue-400'}`}>
                                        {ticket.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- TAB: MEETINGS (NEW) --- */}
            {activeTab === 'meetings' && (
                 <div className="animate-fadeIn">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Toplantılarım</h2>
                        <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                            <span className="material-icons text-sm">add</span> Toplantı Planla
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {initialMeetings.map((meeting) => (
                             <div key={meeting.id} className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-2xl relative overflow-hidden">
                                 <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                                 <div className="flex justify-between items-start mb-4">
                                     <div>
                                         <h3 className="font-bold text-white">{meeting.title}</h3>
                                         <p className="text-gray-400 text-sm">Danışman: {meeting.consultant}</p>
                                     </div>
                                     <div className="text-center bg-gray-900 p-2 rounded-lg border border-gray-800">
                                         <div className="text-xs text-gray-500 uppercase font-bold">EKİM</div>
                                         <div className="text-xl font-bold text-white">25</div>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-4 text-sm text-gray-300 border-t border-gray-800 pt-4">
                                     <div className="flex items-center gap-1"><span className="material-icons text-xs">schedule</span> {meeting.time}</div>
                                     <div className="flex items-center gap-1"><span className="material-icons text-xs">videocam</span> Google Meet</div>
                                     <span className="ml-auto text-green-500 text-xs font-bold uppercase border border-green-900/50 bg-green-900/10 px-2 py-1 rounded">Onaylandı</span>
                                 </div>
                             </div>
                        ))}
                        
                        {/* Empty State / Booking Promo */}
                        <div className="border border-dashed border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-900/50 transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-3">
                                <span className="material-icons">calendar_add_on</span>
                            </div>
                            <h3 className="text-gray-300 font-bold">Yeni Görüşme Ayarla</h3>
                            <p className="text-gray-500 text-xs mt-1">Strateji ekibimizle uygun bir zaman seçin.</p>
                        </div>
                    </div>
                 </div>
            )}

            {/* --- TAB: MARKETPLACE --- */}
            {activeTab === 'marketplace' && (
                <div className="animate-fadeIn">
                     <div className="mb-6">
                         <h2 className="text-2xl font-bold text-white">Hizmet Marketi</h2>
                         <p className="text-gray-400 text-sm">Dijital varlığınızı güçlendirecek ek çözümler.</p>
                    </div>

                    <div className="space-y-6">
                        {pricingData.map((category) => (
                            <div key={category.id} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-4 md:p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="material-icons text-purple-400">{category.icon || 'category'}</span>
                                    <h3 className="text-lg md:text-xl font-bold text-white">{category.label}</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {category.packages.map((pkg, idx) => (
                                        <div key={idx} className={`p-4 rounded-xl border flex flex-col justify-between ${pkg.isPopular ? 'border-purple-500/50 bg-purple-900/10' : 'border-gray-800 bg-black'}`}>
                                            <div>
                                                {pkg.isPopular && <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded uppercase font-bold mb-2 inline-block">Popüler</span>}
                                                <h4 className="text-white font-bold mb-1">{pkg.name}</h4>
                                                <div className="text-lg font-bold text-white mb-2">{pkg.price} <span className="text-xs font-normal text-gray-500">{pkg.period}</span></div>
                                            </div>
                                            <button 
                                                onClick={() => onSelectPackage(pkg)}
                                                className={`w-full py-2 rounded-lg text-xs font-bold mt-4 ${pkg.isPopular ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                                            >
                                                Sipariş Ver
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
