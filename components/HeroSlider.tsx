
import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    title: "Dijital Geleceğinizi İnşa Ediyoruz",
    subtitle: "Web Tasarım, Yazılım ve Strateji ile markanızı bir adım öne taşıyın.",
    color: "from-blue-600 to-purple-600"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    title: "İçeriklerinle İz Bırak",
    subtitle: "Prodüksiyon ve sosyal medya yönetiminde yaratıcılığın sınırlarını zorluyoruz.",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
    title: "Global Arenaya Açılın",
    subtitle: "E-İhracat altyapımız ile sınırları kaldırın, dünyaya satış yapın.",
    color: "from-pink-600 to-red-600"
  }
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="home" className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Ken Burns Effect */}
          <div className="absolute inset-0 overflow-hidden">
             <img 
                src={slide.image} 
                alt={slide.title} 
                className={`w-full h-full object-cover transform transition-transform duration-[8000ms] ease-out ${index === current ? 'scale-110' : 'scale-100'}`} 
            />
          </div>
          
          {/* Complex Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end md:justify-center items-center text-center px-4 pb-32 md:pb-0 max-w-6xl mx-auto">
            <div className={`transition-all duration-1000 transform ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className={`inline-block py-1 px-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-medium text-white mb-6 uppercase tracking-widest`}>
                    Dijital Medya Ajansı
                </span>
                <h1 className={`text-5xl md:text-8xl font-black mb-6 text-white leading-tight tracking-tight`}>
                  {slide.title.split(" ").map((word, i) => (
                      <span key={i} className={i % 2 !== 0 ? `bg-clip-text text-transparent bg-gradient-to-r ${slide.color}` : ''}>
                          {word}{' '}
                      </span>
                  ))}
                </h1>
                <p className="text-gray-300 text-lg md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                  {slide.subtitle}
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'})}
                        className={`group relative px-8 py-4 rounded-full text-white font-bold text-lg bg-white/10 border border-white/20 backdrop-blur-md overflow-hidden transition-all hover:scale-105 hover:bg-white/20 hover:border-white/40`}
                    >
                        <span className="relative z-10">Fiyatları İncele</span>
                        <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r ${slide.color} transition-transform duration-500 opacity-30`}></div>
                    </button>
                    <button 
                        onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                        className="px-8 py-4 rounded-full text-black font-bold text-lg bg-white hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    >
                        İletişime Geç
                    </button>
                </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Bar Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="group relative h-1 w-16 bg-white/20 rounded-full overflow-hidden"
          >
             <div className={`absolute top-0 left-0 h-full bg-white transition-all duration-[6000ms] ease-linear ${index === current ? 'w-full' : 'w-0'}`}></div>
          </button>
        ))}
      </div>
    </div>
  );
};
