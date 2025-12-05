
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogout: () => void;
  onDashboardClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onRegisterClick, onLogout, onDashboardClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    // If we are in a dashboard view, this might need to redirect to home first in a real app.
    // Assuming this component is used on the landing page primarily.
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = ['Anasayfa', 'Hizmetler', 'Hikayeler', 'Fiyatlar', 'İletişim'];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => user ? onDashboardClick() : scrollToSection('home')}
            className="text-2xl md:text-3xl font-bold cursor-pointer tracking-tighter z-50 relative flex items-center gap-2"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              MAGEROS
            </span>
            {user?.role === 'admin' && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded uppercase">Admin</span>}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {!user ? (
               // Guest Links
               navItems.map((item, index) => {
                  const target = item === 'Anasayfa' ? 'home' : item === 'Hikayeler' ? 'stories' : item === 'Hizmetler' ? 'services' : item === 'Fiyatlar' ? 'pricing' : 'contact';
                  return (
                   <button 
                     key={index}
                     onClick={() => scrollToSection(target)}
                     className="text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all uppercase tracking-wide"
                   >
                     {item}
                   </button>
                  )
               })
            ) : (
              // Logged In Links
              <button onClick={onDashboardClick} className="text-sm font-medium text-gray-300 hover:text-white uppercase tracking-wide">
                Panelim
              </button>
            )}

            {/* CALL BUTTON - NEW */}
             <a 
               href="tel:05441073492"
               className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-full text-white font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform"
             >
               <span className="material-icons text-sm">call</span>
               Hemen Ara
             </a>

            <div className="h-6 w-px bg-gray-800 mx-2"></div>

            {/* Auth Buttons */}
            {user ? (
               <div className="flex items-center gap-4">
                 <div className="text-right hidden lg:block">
                    <div className="text-sm font-bold text-white">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                 </div>
                 <button 
                   onClick={onLogout}
                   className="px-5 py-2 rounded-full border border-gray-700 text-white hover:border-red-500 hover:text-red-400 transition-all text-sm font-medium"
                 >
                   Çıkış
                 </button>
               </div>
            ) : (
               <div className="flex items-center gap-3">
                 <button 
                   onClick={onLoginClick}
                   className="px-5 py-2 rounded-full text-white hover:bg-white/10 transition-all text-sm font-medium"
                 >
                   Giriş Yap
                 </button>
                 <button 
                   onClick={onRegisterClick}
                   className="px-5 py-2 rounded-full bg-white text-black font-bold hover:scale-105 transition-all text-sm"
                 >
                   Kayıt Ol
                 </button>
               </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-icons text-3xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-40 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col items-center justify-center space-y-8`}
      >
        {!user && navItems.map((item, index) => {
             const target = item === 'Anasayfa' ? 'home' : item === 'Hikayeler' ? 'stories' : item === 'Hizmetler' ? 'services' : item === 'Fiyatlar' ? 'pricing' : 'contact';
             return (
               <button 
                 key={index}
                 onClick={() => scrollToSection(target)}
                 className="text-2xl font-bold text-white hover:text-purple-500 transition-colors"
               >
                 {item}
               </button>
             )
        })}
        {user && (
           <button onClick={() => { setMobileMenuOpen(false); onDashboardClick(); }} className="text-2xl font-bold text-purple-400">
             Panelim
           </button>
        )}

        {/* Mobile Call Button */}
        <a 
          href="tel:05441073492"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full text-white font-bold text-lg"
        >
          <span className="material-icons">call</span>
          Hemen Ara
        </a>

        <div className="flex flex-col gap-4 mt-8 w-64 px-6">
           {!user ? (
             <>
                <button 
                  onClick={() => { setMobileMenuOpen(false); onLoginClick(); }}
                  className="w-full py-3 rounded-xl border border-gray-700 text-white font-bold"
                >
                  Giriş Yap
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); onRegisterClick(); }}
                  className="w-full py-3 rounded-xl bg-white text-black font-bold"
                >
                  Kayıt Ol
                </button>
             </>
           ) : (
             <button 
               onClick={() => { setMobileMenuOpen(false); onLogout(); }}
               className="w-full py-3 rounded-xl border border-red-500 text-red-500 font-bold"
             >
               Çıkış Yap
             </button>
           )}
        </div>
      </div>
    </>
  );
};
