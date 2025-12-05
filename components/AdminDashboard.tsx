
import React, { useState, useEffect } from 'react';
import { Lead } from '../types';

interface AdminDashboardProps {
  leads: Lead[];
  kanbanData: any;
  activityFeed: any[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ leads, kanbanData, activityFeed }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'kanban' | 'cms' | 'leads'>('overview');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Clock for "Space Station" feel
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen">
      
      {/* COMMAND CENTER HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-gray-800 pb-6">
        <div>
            <div className="flex items-center gap-3 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                <span className="text-xs font-mono text-green-500 tracking-widest">SYSTEM ONLINE</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">KONTROL MERKEZİ</h1>
            <p className="text-gray-500">Mageros Digital Command Station</p>
        </div>
        
        <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
                <div className="text-3xl font-mono text-white font-bold">{time}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Yerel Zaman</div>
            </div>
            
            <div className="flex gap-2 bg-[#0a0a0a] p-1 rounded-lg border border-gray-800">
                <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded font-bold text-sm transition-all ${activeTab === 'overview' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Özet</button>
                <button onClick={() => setActiveTab('kanban')} className={`px-4 py-2 rounded font-bold text-sm transition-all ${activeTab === 'kanban' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>İş Akışı</button>
                <button onClick={() => setActiveTab('leads')} className={`px-4 py-2 rounded font-bold text-sm transition-all ${activeTab === 'leads' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Leads</button>
                <button onClick={() => setActiveTab('cms')} className={`px-4 py-2 rounded font-bold text-sm transition-all ${activeTab === 'cms' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>CMS</button>
            </div>
        </div>
      </div>

      {/* --- TAB: OVERVIEW --- */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            
            {/* LEFT COLUMN: LIVE FEED & ALERTS */}
            <div className="space-y-6">
                {/* Live Activity Feed */}
                <div className="bg-[#050505] border border-gray-800 rounded-2xl overflow-hidden flex flex-col h-[400px]">
                    <div className="p-4 border-b border-gray-800 bg-gray-900/30 flex justify-between items-center">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <span className="material-icons text-blue-400 text-sm">radar</span>
                            Canlı Aktivite Akışı
                        </h3>
                        <span className="text-[10px] text-green-500 bg-green-900/20 px-2 py-0.5 rounded border border-green-900 animate-pulse">CANLI</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                        {activityFeed.map((activity, i) => (
                            <div key={i} className="flex gap-3 items-start text-sm border-b border-gray-900 pb-3 last:border-0 last:pb-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                                    ${activity.type === 'payment' ? 'bg-green-900/20 text-green-400' : 
                                      activity.type === 'user' ? 'bg-blue-900/20 text-blue-400' :
                                      activity.type === 'support' ? 'bg-red-900/20 text-red-400' : 'bg-gray-800 text-gray-400'}`}>
                                    <span className="material-icons text-xs">
                                        {activity.type === 'payment' ? 'attach_money' : activity.type === 'user' ? 'person_add' : activity.type === 'support' ? 'warning' : 'visibility'}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-gray-300"><span className="text-white font-bold">{activity.user}</span> {activity.action}</p>
                                    <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Smart Reminders */}
                <div className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <span className="material-icons text-6xl text-purple-500">notifications_active</span>
                    </div>
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <span className="material-icons text-purple-400">assistant</span>
                        Akıllı Asistan
                    </h3>
                    <div className="space-y-3 relative z-10">
                        <div className="bg-black/50 border border-purple-500/20 p-3 rounded-lg flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-sm text-gray-300">"Global Lojistik" sözleşmesi 2 gün içinde bitiyor.</span>
                        </div>
                        <div className="bg-black/50 border border-purple-500/20 p-3 rounded-lg flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <span className="text-sm text-gray-300">3 adet bekleyen destek talebi var.</span>
                        </div>
                        <div className="bg-black/50 border border-purple-500/20 p-3 rounded-lg flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-300">Haftalık ciro hedefi %85 tamamlandı.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* MIDDLE COLUMN: STATS & MAP */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-800">
                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Aylık Ciro</p>
                        <h4 className="text-2xl font-bold text-white">₺342.000</h4>
                        <span className="text-green-500 text-xs flex items-center">▲ %12</span>
                    </div>
                    <div className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-800">
                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Aktif Proje</p>
                        <h4 className="text-2xl font-bold text-white">24</h4>
                        <span className="text-blue-500 text-xs flex items-center">● Stabil</span>
                    </div>
                    <div className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-800">
                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Yeni Lead</p>
                        <h4 className="text-2xl font-bold text-white">156</h4>
                        <span className="text-green-500 text-xs flex items-center">▲ %24</span>
                    </div>
                    <div className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-800">
                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Dönüşüm</p>
                        <h4 className="text-2xl font-bold text-white">%3.8</h4>
                        <span className="text-yellow-500 text-xs flex items-center">▼ %0.5</span>
                    </div>
                </div>

                {/* Product Analytics (Visual Bar Chart Simulation) */}
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-white">Paket Görüntülenme Analizi</h3>
                        <select className="bg-black border border-gray-800 text-gray-400 text-xs p-1 rounded">
                            <option>Son 7 Gün</option>
                            <option>Son 30 Gün</option>
                        </select>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'E-Ticaret Büyüme', views: 450, color: 'bg-purple-600' },
                            { name: 'Kurumsal Web', views: 320, color: 'bg-blue-600' },
                            { name: 'Sosyal Medya Scale-Up', views: 280, color: 'bg-pink-600' },
                            { name: 'E-İhracat Global', views: 150, color: 'bg-orange-600' },
                            { name: 'Prodüksiyon Tanıtım', views: 90, color: 'bg-red-600' },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>{item.name}</span>
                                    <span>{item.views} Görüntülenme</span>
                                </div>
                                <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
                                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.views / 500) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- TAB: KANBAN BOARD --- */}
      {activeTab === 'kanban' && (
        <div className="animate-fadeIn overflow-x-auto">
            <h2 className="text-2xl font-bold text-white mb-6">İş Akış Yönetimi</h2>
            <div className="flex gap-6 min-w-[1000px] pb-4">
                
                {/* Column: New Orders */}
                <div className="w-80 shrink-0">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="font-bold text-gray-400 text-sm uppercase">Yeni Sipariş</h3>
                        <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">{kanbanData.new.length}</span>
                    </div>
                    <div className="space-y-3">
                        {kanbanData.new.map((card: any) => (
                            <div key={card.id} className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-800 border-l-4 border-l-blue-500 cursor-grab active:cursor-grabbing hover:bg-gray-900 transition-colors">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs font-bold text-blue-400">{card.client}</span>
                                    <span className="text-[10px] text-gray-500">{card.daysLeft} gün önce</span>
                                </div>
                                <h4 className="text-white font-bold mb-2">{card.project}</h4>
                                <div className="text-xs text-gray-400 bg-gray-800 w-fit px-2 py-1 rounded">{card.budget}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column: In Progress */}
                <div className="w-80 shrink-0">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="font-bold text-purple-400 text-sm uppercase">Geliştirme / Yapım</h3>
                        <span className="bg-purple-900/30 text-purple-400 text-xs px-2 py-0.5 rounded-full">{kanbanData.inProgress.length}</span>
                    </div>
                    <div className="space-y-3">
                        {kanbanData.inProgress.map((card: any) => (
                            <div key={card.id} className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-800 border-l-4 border-l-purple-500 cursor-grab active:cursor-grabbing hover:bg-gray-900 transition-colors">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs font-bold text-purple-400">{card.client}</span>
                                    <span className="material-icons text-gray-600 text-xs">more_horiz</span>
                                </div>
                                <h4 className="text-white font-bold mb-3">{card.project}</h4>
                                <div className="w-full bg-gray-800 rounded-full h-1.5 mb-2">
                                    <div className="bg-purple-500 h-1.5 rounded-full" style={{width: `${card.progress}%`}}></div>
                                </div>
                                <div className="text-xs text-gray-500 flex justify-between">
                                    <span>İlerleme</span>
                                    <span>%{card.progress}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column: Review */}
                <div className="w-80 shrink-0">
                     <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="font-bold text-yellow-400 text-sm uppercase">Onay / Revize</h3>
                        <span className="bg-yellow-900/30 text-yellow-400 text-xs px-2 py-0.5 rounded-full">{kanbanData.review.length}</span>
                    </div>
                    <div className="space-y-3">
                        {kanbanData.review.map((card: any) => (
                            <div key={card.id} className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-800 border-l-4 border-l-yellow-500 cursor-grab active:cursor-grabbing hover:bg-gray-900 transition-colors">
                                <h4 className="text-white font-bold mb-1">{card.project}</h4>
                                <p className="text-xs text-gray-400 mb-2">{card.client}</p>
                                <span className="text-[10px] bg-yellow-900/20 text-yellow-500 px-2 py-1 rounded uppercase font-bold">{card.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column: Done */}
                <div className="w-80 shrink-0">
                     <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="font-bold text-green-400 text-sm uppercase">Tamamlanan</h3>
                        <span className="bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded-full">{kanbanData.done.length}</span>
                    </div>
                    <div className="space-y-3">
                        {kanbanData.done.map((card: any) => (
                             <div key={card.id} className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-800 border-l-4 border-l-green-500 opacity-60 hover:opacity-100 transition-opacity">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-icons text-green-500 text-sm">check_circle</span>
                                    <span className="text-xs font-bold text-gray-300">{card.client}</span>
                                </div>
                                <h4 className="text-white font-bold text-sm strike-through decoration-white">{card.project}</h4>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      )}

      {/* --- TAB: CMS (Simplified for Demo) --- */}
      {activeTab === 'cms' && (
         <div className="animate-fadeIn">
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-900/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-icons text-3xl">edit_note</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">İçerik Yönetim Sistemi</h2>
                <p className="text-gray-400 mb-6">Sitenin metinlerini, fiyatlarını ve görsellerini buradan düzenleyebilirsiniz.</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors">
                    CMS Panelini Aç
                </button>
            </div>
         </div>
      )}
       
       {/* --- TAB: LEADS (Table) --- */}
      {activeTab === 'leads' && (
         <div className="animate-fadeIn bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden">
             <table className="w-full text-left">
                 <thead className="bg-gray-900">
                     <tr>
                         <th className="p-4 text-xs text-gray-500 uppercase">İsim</th>
                         <th className="p-4 text-xs text-gray-500 uppercase">Hizmet</th>
                         <th className="p-4 text-xs text-gray-500 uppercase">Durum</th>
                         <th className="p-4 text-xs text-gray-500 uppercase">Tarih</th>
                     </tr>
                 </thead>
                 <tbody>
                     {leads.map(lead => (
                         <tr key={lead.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-900/50">
                             <td className="p-4 font-bold text-white">{lead.name}</td>
                             <td className="p-4 text-gray-400">{lead.serviceInterest}</td>
                             <td className="p-4">
                                 <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">{lead.status}</span>
                             </td>
                             <td className="p-4 text-gray-500 text-sm">{lead.date}</td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
      )}

    </div>
  );
};
