
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

  // Sync internal state if prop changes (simplified for this demo)
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
       // Mock Login
       const mockUser: User = {
         id: Math.floor(Math.random() * 1000),
         name: 'Demo Kullanıcı',
         email: email,
         role: 'user',
         position: 'E-Ticaret Paketi',
       };
       onLoginSuccess(mockUser);
    } else {
       // Mock Register
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-md p-8 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex mb-8 border-b border-gray-800">
          <button 
            className={`flex-1 pb-4 text-sm font-bold transition-colors ${activeTab === 'login' ? 'text-white border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => setActiveTab('login')}
          >
            Giriş Yap
          </button>
          <button 
            className={`flex-1 pb-4 text-sm font-bold transition-colors ${activeTab === 'register' ? 'text-white border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => setActiveTab('register')}
          >
            Kayıt Ol
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
           {activeTab === 'register' && (
             <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase font-bold">Ad Soyad</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Adınız Soyadınız"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
             </div>
           )}
           
           <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase font-bold">E-Posta</label>
              <input 
                type="email" 
                className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
           </div>

           <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase font-bold">Şifre</label>
              <input 
                type="password" 
                className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
           </div>

           {activeTab === 'register' && (
             <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase font-bold">Hangi hizmeti istiyorsunuz?</label>
                <select 
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
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
             className="w-full py-4 mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
           >
             {activeTab === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
           </button>
        </form>

        {activeTab === 'login' && (
          <div className="mt-4 text-center">
            <span className="text-xs text-gray-500">Admin Demo: admin@mageros.com / admin</span>
          </div>
        )}
      </div>
    </div>
  );
};
