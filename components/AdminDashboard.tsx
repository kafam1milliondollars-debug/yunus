
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

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen bg-slate-50 text-slate-900">
      
      {/* COMMAND CENTER HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-slate-200 pb-6">
        <div>
            <div className="flex items-center gap-3 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-md shadow-green-200"></div>
                <span className="text-xs font-mono text-green-600 tracking-widest font-bold">SYSTEM ONLINE</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">KONTROL MERKEZİ</h1>
            <p className="text-slate-500">Mageros Digital Command Station</p>
        </div>
        
        <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
                <div className="text-3xl font-mono text-slate-900 font-bold">{time}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Yerel Zaman</div>
            </div>
            
            <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'overview' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Özet</button>
                <button onClick={() => setActiveTab('kanban')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'kanban' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>İş Akışı</button>
                <button onClick={() => setActiveTab('leads')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'leads' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Leads</button>
                <button onClick={() => setActiveTab('cms')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'cms' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>CMS</button>
            </div>
        </div>
      </div>

      {/* --- TAB: OVERVIEW --- */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            
            {/* LEFT COLUMN: LIVE FEED & ALERTS */}
            <div className="space-y-6">
                {/* Live Activity Feed */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-[400px] shadow-sm">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <span className="material-icons text-blue-500 text-sm">radar</span>
                            Canlı Aktivite Akışı
                        </h3>
                        <span className="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded border border-green-200 animate-pulse font-bold">CANLI</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                        {activityFeed.map((activity, i) => (
                            <div key={i} className="flex gap-3 items-start text-sm border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                                    ${activity.type === 'payment' ? 'bg-green-100 text-green-600' : 
                                      activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                                      activity.type === 'support' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                                    <span className="material-icons text-xs">
                                        {activity.type === 'payment' ? 'attach_money' : activity.type === 'user' ? 'person_add' : activity.type === 'support' ? 'warning' : 'visibility'}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-slate-600"><span className="text-slate-900 font-bold">{activity.user}</span> {activity.action}</p>
                                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Smart Reminders */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 relative overflow-hidden shadow-xl text-white">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="material-icons text-6xl">notifications_active</span>
                    </div>
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <span className="material-icons text-purple-300">assistant</span>
                        Akıllı Asistan
                    </h3>
                    <div className="space-y-3 relative z-10">
                        <div className="bg-white/10 border border-white/10 p-3 rounded-lg flex items-center gap-3 backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <span className="text-sm text-slate-200">"Global Lojistik" sözleşmesi 2 gün içinde bitiyor.</span>
                        </div>
                        <div className="bg-white/10 border border-white/10 p-3 rounded-lg flex items-center gap-3 backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            <span className="text-sm text-slate-200">3 adet bekleyen destek talebi var.</span>
                        </div>
                        <div className="bg-white/10 border border-white/10 p-3 rounded-lg flex items-center gap-3 backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-sm text-slate-200">Haftalık ciro hedefi %85 tamamlandı.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* MIDDLE COLUMN: STATS & MAP */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-slate-400 text-xs uppercase font-bold mb-1">Aylık Ciro</p>
                        <h4 className="text-2xl font-bold text-slate-900">₺342.000</h4>
                        <span className="text-green-600 text-xs flex items-center font-bold bg-green-50 w-fit px-2 py-0.5 rounded mt-2">▲ %12</span>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-slate-400 text-xs uppercase font-bold mb-1">Aktif Proje</p>
                        <h4 className="text-2xl font-bold text-slate-900">24</h4>
                        <span className="text-blue-600 text-xs flex items-center font-bold bg-blue-50 w-fit px-2 py-0.5 rounded mt-2">● Stabil</span>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-slate-400 text-xs uppercase font-bold mb-1">Yeni Lead</p>
                        <h4 className="text-2xl font-bold text-slate-900">156</h4>
                        <span className="text-green-600 text-xs flex items-center font-bold bg-green-50 w-fit px-2 py-0.5 rounded mt-2">▲ %24</span>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-slate-400 text-xs uppercase font-bold mb-1">Dönüşüm</p>
                        <h4 className="text-2xl font-bold text-slate-900">%3.8</h4>
                        <span className="text-yellow-600 text-xs flex items-center font-bold bg-yellow-50 w-fit px-2 py-0.5 rounded mt-2">▼ %0.5</span>
                    </div>
                </div>

                {/* Product Analytics */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900">Paket Görüntülenme Analizi</h3>
                        <select className="bg-slate-50 border border-slate-200 text-slate-600 text-xs p-2 rounded-lg outline-none">
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
                                <div className="flex justify-between text-xs text-slate-500 mb-1 font-medium">
                                    <span>{item.name}</span>
                                    <span className="text-slate-900 font-bold">{item.views} Görüntülenme</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
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
        <div className="animate-fadeIn overflow-x-auto pb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">İş Akış Yönetimi</h2>
            <div className="flex gap-6 min-w-[1000px]">
                
                {/* Column: New Orders */}
                <div className="w-80 shrink-0">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="font-bold text-slate-500 text-sm uppercase">Yeni Sipariş</h3>
                        <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold">{kanbanData.new.length}</span>
                    </div>
                    <div className="space-y-3">
                        {kanbanData.new.map((card: any) => (
                            <div key={card.id} className="bg-white p-4 rounded-xl border border-slate-200 border-l-4 border-l-blue-500 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs font-bold text-blue-600">{card.client}</span>
                                    <span className="text-[10px] text-slate-400">{card.daysLeft} gün önce</span>
                                </div>
                                <h4 className="text-slate-900 font-bold mb-2">{card.project}</h4>
                                <div className="text-xs text-slate-500 bg-slate-50 w-fit px-2 py-1 rounded border border-slate-100">{card.budget}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column: In Progress */}
                <div className="w-80 shrink-0">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="font-bold text-purple-600 text-sm uppercase">Geliştirme / Yapım</h3>
                        <span className="bg-purple-50 text-purple-600 text-xs px-2 py-0.5 rounded-full font-bold">{kanbanData.inProgress.length}</span>
                    </div>
                    <div className="space-y-3">
                        {kanbanData.inProgress.map((card: any) => (
                            <div key={card.id} className="bg-white p-4 rounded-xl border border-slate-200 border-l-4 border-l-purple-500 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs font-bold text-purple-600">{card.client}</span>
                                    <span className="material-icons text-slate-400 text-xs">more_horiz</span>
                                </div>
                                <h4 className="text-slate-900 font-bold mb-3">{card.project}</h4>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                                    <div className="bg-purple-500 h-1.5 rounded-full" style={{width: `${card.progress}%`}}></div>
                                </div>
                                <div className="text-xs text-slate-500 flex justify-between">
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
                        <h3 className="font-bold text-yellow-600 text-sm uppercase">Onay / Revize</h3>
                        <span className="bg-yellow-50 text-yellow-600 text-xs px-2 py-0.5 rounded-full font-bold">{kanbanData.review.length}</span>
                    </div>
                    <div className="space-y-3">
                        {kanbanData.review.map((card: any) => (
                            <div key={card.id} className="bg-white p-4 rounded-xl border border-slate-200 border-l-4 border-l-yellow-500 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all">
                                <h4 className="text-slate-900 font-bold mb-1">{card.project}</h4>
                                <p className="text-xs text-slate-500 mb-2">{card.client}</p>
                                <span className="text-[10px] bg-yellow-50 text-yellow-600 px-2 py-1 rounded uppercase font-bold border border-yellow-100">{card.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column: Done */}
                <div className="w-80 shrink-0">
                     <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="font-bold text-green-600 text-sm uppercase">Tamamlanan</h3>
                        <span className="bg-green-50 text-green-600 text-xs px-2 py-0.5 rounded-full font-bold">{kanbanData.done.length}</span>
                    </div>
                    <div className="space-y-3">
                        {kanbanData.done.map((card: any) => (
                             <div key={card.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 border-l-4 border-l-green-500 opacity-80 hover:opacity-100 transition-all">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-icons text-green-500 text-sm">check_circle</span>
                                    <span className="text-xs font-bold text-slate-500">{card.client}</span>
                                </div>
                                <h4 className="text-slate-700 font-bold text-sm line-through decoration-slate-400">{card.project}</h4>
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
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                    <span className="material-icons text-3xl">edit_note</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">İçerik Yönetim Sistemi</h2>
                <p className="text-slate-500 mb-6">Sitenin metinlerini, fiyatlarını ve görsellerini buradan düzenleyebilirsiniz.</p>
                <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg">
                    CMS Panelini Aç
                </button>
            </div>
         </div>
      )}
       
       {/* --- TAB: LEADS (Table) --- */}
      {activeTab === 'leads' && (
         <div className="animate-fadeIn bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
             <table className="w-full text-left">
                 <thead className="bg-slate-50 border-b border-slate-200">
                     <tr>
                         <th className="p-4 text-xs text-slate-500 uppercase font-bold">İsim</th>
                         <th className="p-4 text-xs text-slate-500 uppercase font-bold">Hizmet</th>
                         <th className="p-4 text-xs text-slate-500 uppercase font-bold">Durum</th>
                         <th className="p-4 text-xs text-slate-500 uppercase font-bold">Tarih</th>
                     </tr>
                 </thead>
                 <tbody>
                     {leads.map(lead => (
                         <tr key={lead.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                             <td className="p-4 font-bold text-slate-900">{lead.name}</td>
                             <td className="p-4 text-slate-600">{lead.serviceInterest}</td>
                             <td className="p-4">
                                 <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded font-bold border border-slate-200">{lead.status}</span>
                             </td>
                             <td className="p-4 text-slate-500 text-sm">{lead.date}</td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
      )}

    </div>
  );
};