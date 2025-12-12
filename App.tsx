console.log("APP ÇALIŞTI");

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CreativeHero } from './components/CreativeHero';
import { ServicesGrid } from './components/ServicesGrid';
import { VideoShowcase } from './components/VideoShowcase';
import { Service3DCarousel } from './components/Service3DCarousel';
import { ContactCTA } from './components/ContactCTA';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDashboard } from './components/UserDashboard';
import { PaymentPage } from './components/PaymentPage';
import { PricingTable } from './components/PricingTable';
import { TeamSection } from './components/TeamSection';
import { InteractiveToolsSection } from './components/InteractiveToolsSection';
import { ChatAssistant } from './components/ChatAssistant';
import { pricingData as initialPricingData } from './constants';
import { User, Lead, Package, CategoryData } from './types';

// --- MOCK DATA FOR ADMIN DASHBOARD ---
const initialLeads: Lead[] = [
  { id: 101, name: 'Ahmet Yılmaz', email: 'ahmet@firma.com', serviceInterest: 'E-Ticaret', status: 'Görüşüldü', date: '2024-10-15' },
  { id: 102, name: 'Ayşe Demir', email: 'ayse@startup.com', serviceInterest: 'Mobil App', status: 'Yeni', date: '2024-10-18' },
  { id: 103, name: 'Mehmet Kaya', email: 'mehmet@insaat.com', serviceInterest: 'Web Tasarım', status: 'Teklif Verildi', date: '2024-10-20' },
  { id: 104, name: 'Zeynep Çelik', email: 'zeynep@export.com', serviceInterest: 'E-İhracat', status: 'Satış', date: '2024-10-22' },
];

const mockKanban = {
  new: [
    { id: 'k1', client: 'TechStart A.Ş.', project: 'Kurumsal Web', budget: '₺25.000', daysLeft: 2 },
    { id: 'k2', client: 'Moda Butik', project: 'E-Ticaret', budget: '₺35.000', daysLeft: 1 },
  ],
  inProgress: [
    { id: 'k3', client: 'Global Lojistik', project: 'SEO Yönetimi', budget: '₺15.000/ay', progress: 45 },
    { id: 'k4', client: 'Dr. Ahmet B.', project: 'Sosyal Medya', budget: '₺18.000/ay', progress: 80 },
  ],
  review: [
    { id: 'k5', client: 'Pizza Express', project: 'Reklam Filmi', budget: '₺30.000', status: 'Revize Bekliyor' },
  ],
  done: [
    { id: 'k6', client: 'Avukatlık Bürosu', project: 'Logo Tasarım', budget: '₺10.000', date: 'Dün' },
  ]
};

const mockActivityFeed = [
  { id: 1, user: 'Canan K.', action: 'yeni üye oldu.', time: '2 dk önce', type: 'user' },
  { id: 2, user: 'Sistem', action: 'TechStart A.Ş. ödemesi onaylandı.', time: '15 dk önce', type: 'payment' },
  { id: 3, user: 'Mehmet Y.', action: 'Profesyonel Web Paketini inceliyor.', time: '23 dk önce', type: 'view' },
  { id: 4, user: 'Sistem', action: 'Moda Butik faturası oluşturuldu.', time: '1 saat önce', type: 'invoice' },
  { id: 5, user: 'Ali V.', action: 'Destek talebi oluşturdu.', time: '2 saat önce', type: 'support' },
];

// --- MOCK DATA FOR USER DASHBOARD ---
const userOrders = [
  {
    id: 'ORD-2024-001',
    serviceName: 'E-Ticaret Büyüme Paketi',
    status: 'Geliştirme',
    progress: 65,
    startDate: '10.10.2024',
    deliveryDate: '30.10.2024',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=300&q=80',
    steps: [
      { name: 'Sipariş Alındı', completed: true },
      { name: 'Tasarım Onayı', completed: true },
      { name: 'Geliştirme', completed: false, current: true },
      { name: 'Test & Yayın', completed: false }
    ]
  },
  {
    id: 'ORD-2024-002',
    serviceName: 'Sosyal Medya Yönetimi (Ekim)',
    status: 'Yayında',
    progress: 100,
    startDate: '01.10.2024',
    deliveryDate: '31.10.2024',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=300&q=80',
    steps: [
      { name: 'Planlama', completed: true },
      { name: 'İçerik Üretimi', completed: true },
      { name: 'Onay', completed: true },
      { name: 'Yayın', completed: true }
    ]
  }
];

const App: React.FC = () => {
  // Navigation & View State
  const [view, setView] = useState<'landing' | 'dashboard' | 'payment'>('landing');
  const [activeCategory, setActiveCategory] = useState(initialPricingData[0].id);
  const [pricingData, setPricingData] = useState<CategoryData[]>(initialPricingData);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [authModal, setAuthModal] = useState({ open: false, type: 'login' as 'login' | 'register' });

  // Payment State
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  // --- SECURITY & ANTI-COPY PROTECTION ---
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable Keyboard Shortcuts (Inspect, View Source, Save, Copy)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Ctrl+Shift+I (Inspect) or Ctrl+Shift+J (Console) or Ctrl+Shift+C (Element)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }
      // Ctrl+S (Save)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setView('payment');
  };

  const handlePaymentSuccess = () => {
    setTimeout(() => {
       setView('dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-none select-none">
      {/* 'select-none' class prevents text highlighting */}
      
      {/* Navbar is visible on landing and dashboard */}
      {view !== 'payment' && (
        <Navbar 
          user={user}
          onLoginClick={() => setAuthModal({ open: true, type: 'login' })}
          onRegisterClick={() => setAuthModal({ open: true, type: 'register' })}
          onLogout={handleLogout}
          onDashboardClick={() => setView('dashboard')}
        />
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModal.open}
        type={authModal.type}
        onClose={() => setAuthModal({ ...authModal, open: false })}
        onLoginSuccess={handleLogin}
        onRegisterSuccess={handleLogin}
      />

      {/* CHAT ASSISTANT - VISIBLE GLOBALLY */}
      <ChatAssistant />

      {/* ROUTING */}
      {view === 'landing' && (
        <>
          <CreativeHero />

          {/* NEW SECTION: Web Tools & CTA */}
          <InteractiveToolsSection 
            user={user} 
            onRegisterClick={() => setAuthModal({ open: true, type: 'register' })}
            onPricingClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          />
          
          {/* Hybrid Theme: Dark Section */}
          <Service3DCarousel />
          
          {/* Hybrid Theme: Light Section */}
          <ServicesGrid />
          
          {/* Hybrid Theme: Dark Section */}
          <VideoShowcase />
          
          {/* Pricing Section Wrapper (Light) */}
          <section id="pricing" className="py-24 bg-white border-t border-slate-100 relative">
             <div className="absolute inset-0 bg-slate-50/50 pointer-events-none" />
             <div className="text-center max-w-7xl mx-auto px-4 mb-12 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                  Paketler ve Fiyatlandırma
                </h2>
                <p className="text-slate-500 text-lg">İşletmenize en uygun çözümü seçin, hemen başlayalım.</p>
             </div>
             
             {/* Sticky Category Nav */}
             <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md py-4 border-y border-slate-200 shadow-sm mb-8">
                 <div className="flex justify-start md:justify-center overflow-x-auto gap-4 px-4 pb-2 no-scrollbar">
                     {pricingData.map((cat) => (
                         <button 
                            key={cat.id} 
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold border whitespace-nowrap transition-all shadow-sm
                              ${activeCategory === cat.id 
                                ? 'bg-slate-900 border-slate-900 text-white shadow-md transform scale-105' 
                                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800'
                              }
                            `}
                         >
                             {cat.label}
                         </button>
                     ))}
                 </div>
             </div>

             <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                 {/* Render Active Category Table */}
                 {(() => {
                    const data = pricingData.find(d => d.id === activeCategory);
                    if (!data) return null;
                    return <PricingTable data={data} onSelectPackage={handlePackageSelect} />;
                 })()}
             </div>
          </section>
          
          <TeamSection />
          
          {/* Hybrid Theme: Dark Section */}
          <ContactCTA />

          <footer className="bg-black border-t border-gray-900 py-12 px-4 text-center">
             <div className="flex justify-center items-center gap-2 mb-4">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">MAGEROS</span>
             </div>
             <p className="text-gray-500 text-sm">© 2026 Mageros Digital Agency. Tüm hakları saklıdır.</p>
          </footer>
        </>
      )}

      {view === 'payment' && selectedPackage && (
        <PaymentPage 
          selectedPackage={selectedPackage} 
          onBack={() => setView('landing')} 
        />
      )}

      {view === 'dashboard' && user && (
        user.role === 'admin' ? (
          <AdminDashboard 
             leads={initialLeads} 
             kanbanData={mockKanban}
             activityFeed={mockActivityFeed}
          />
        ) : (
          <UserDashboard 
            user={user} 
            pricingData={pricingData} 
            onSelectPackage={handlePackageSelect}
            orders={userOrders}
          />
        )
      )}

    </div>
  );
};

export default App;
