
import React, { useState } from 'react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  type: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  onRegisterSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, type, onClose, onLoginSuccess, onRegisterSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(type);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('Web Sitesi İstiyorum'); // Default intent

  React.useEffect(() => {
    setActiveTab(type);
  }, [type]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ADMIN SIMULATION
    if (activeTab === 'login' && email === 'admin@mageros.com' && password === 'admin') {
      const adminUser: User = {
        id: 1,
        name: 'Mageros Admin',
        email: 'admin@mageros.com',
        role: 'admin',
      };
      onLoginSuccess(adminUser);
      onClose();
      return;
    }

    // USER SIMULATION
    if (activeTab === 'login') {
       const mockUser: User = {
         id: Math.floor(Math.random() * 1000),
         name: 'Demo Kullanıcı',
         email: email,
         role: 'user',
         position: 'E-Ticaret Paketi',
       };
       onLoginSuccess(mockUser);
    } else {
       const newUser: User = {
         id: Math.floor(Math.random() * 1000),
         name: name || 'Yeni Üye',
         email: email,
         role: 'user',
         position: position,
       };
       onRegisterSuccess(newUser);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-fadeIn">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex mb-8 border-b border-slate-100">
          <button 
            className={`flex-1 pb-4 text-sm font-bold transition-colors ${activeTab === 'login' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-400 hover:text-slate-600'}`}
            onClick={() => setActiveTab('login')}
          >
            Giriş Yap
          </button>
          <button 
            className={`flex-1 pb-4 text-sm font-bold transition-colors ${activeTab === 'register' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-400 hover:text-slate-600'}`}
            onClick={() => setActiveTab('register')}
          >
            Kayıt Ol
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
           {activeTab === 'register' && (
             <div className="space-y-2">
                <label className="text-xs text-slate-500 uppercase font-bold">Ad Soyad</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                  placeholder="Adınız Soyadınız"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
             </div>
           )}
           
           <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase font-bold">E-Posta</label>
              <input 
                type="email" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
           </div>

           <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase font-bold">Şifre</label>
              <input 
                type="password" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
           </div>

           {activeTab === 'register' && (
             <div className="space-y-2">
                <label className="text-xs text-slate-500 uppercase font-bold">Hangi hizmeti istiyorsunuz?</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option>Web Sitesi Yaptırmak İstiyorum</option>
                  <option>E-Ticaret Sitesi Kurmak İstiyorum</option>
                  <option>SEO Hizmeti Almak İstiyorum</option>
                  <option>Sosyal Medya Yönetimi</option>
                  <option>Mobil Uygulama Projem Var</option>
                  <option>Sadece Bilgi Almak İstiyorum</option>
                </select>
             </div>
           )}

           <button 
             type="submit"
             className="w-full py-4 mt-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg"
           >
             {activeTab === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
           </button>
        </form>

        {activeTab === 'login' && (
          <div className="mt-4 text-center">
            <span className="text-xs text-slate-400">Admin Demo: admin@mageros.com / admin</span>
          </div>
        )}
      </div>
    </div>
  );
};