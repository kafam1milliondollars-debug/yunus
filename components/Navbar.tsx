
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => user ? onDashboardClick() : scrollToSection('home')}
            className="text-2xl md:text-3xl font-bold cursor-pointer tracking-tighter z-50 relative flex items-center gap-2"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
              MAGEROS
            </span>
            {user?.role === 'admin' && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded uppercase">Admin</span>}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {!user ? (
               navItems.map((item, index) => {
                  const target = item === 'Anasayfa' ? 'home' : item === 'Hikayeler' ? 'stories' : item === 'Hizmetler' ? 'services' : item === 'Fiyatlar' ? 'pricing' : 'contact';
                  return (
                   <button 
                     key={index}
                     onClick={() => scrollToSection(target)}
                     className={`text-sm font-medium px-3 py-2 rounded-lg transition-all uppercase tracking-wide
                        ${scrolled ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-200 hover:text-white hover:bg-black/20 shadow-black drop-shadow-md'}
                     `}
                   >
                     {item}
                   </button>
                  )
               })
            ) : (
              <button onClick={onDashboardClick} className="text-sm font-medium text-gray-300 hover:text-white uppercase tracking-wide">
                Panelim
              </button>
            )}

            {/* CALL BUTTON */}
             <a 
               href="tel:05441073492"
               className="hidden lg:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
             >
               <span className="material-icons text-sm">call</span>
               Hemen Ara
             </a>

            <div className={`h-6 w-px mx-2 ${scrolled ? 'bg-gray-700' : 'bg-white/30'}`}></div>

            {/* Auth Buttons */}
            {user ? (
               <div className="flex items-center gap-4">
                 <div className="text-right hidden lg:block">
                    <div className="text-sm font-bold text-white">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                 </div>
                 <button 
                   onClick={onLogout}
                   className="px-5 py-2 rounded-full border border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500 transition-all text-sm font-medium"
                 >
                   Çıkış
                 </button>
               </div>
            ) : (
               <div className="flex items-center gap-3">
                 <button 
                   onClick={onLoginClick}
                   className={`px-5 py-2 rounded-full transition-all text-sm font-medium ${scrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-black/30'}`}
                 >
                   Giriş Yap
                 </button>
                 <button 
                   onClick={onRegisterClick}
                   className="px-5 py-2 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-700 hover:scale-105 transition-all text-sm shadow-lg shadow-purple-900/50"
                 >
                   Kayıt Ol
                 </button>
               </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-icons text-3xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col items-center justify-center space-y-8`}
      >
        {!user && navItems.map((item, index) => {
             const target = item === 'Anasayfa' ? 'home' : item === 'Hikayeler' ? 'stories' : item === 'Hizmetler' ? 'services' : item === 'Fiyatlar' ? 'pricing' : 'contact';
             return (
               <button 
                 key={index}
                 onClick={() => scrollToSection(target)}
                 className="text-2xl font-bold text-gray-200 hover:text-purple-500 transition-colors"
               >
                 {item}
               </button>
             )
        })}
        {user && (
           <button onClick={() => { setMobileMenuOpen(false); onDashboardClick(); }} className="text-2xl font-bold text-purple-500">
             Panelim
           </button>
        )}

        {/* Mobile Call Button */}
        <a 
          href="tel:05441073492"
          className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold text-lg shadow-xl"
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
                  className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-900/50"
                >
                  Kayıt Ol
                </button>
             </>
           ) : (
             <button 
               onClick={() => { setMobileMenuOpen(false); onLogout(); }}
               className="w-full py-3 rounded-xl border border-red-500/50 text-red-500 font-bold bg-red-900/10"
             >
               Çıkış Yap
             </button>
           )}
        </div>
      </div>
    </>
  );
};
