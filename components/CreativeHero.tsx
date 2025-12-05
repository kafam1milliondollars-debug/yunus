
import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", // Agency Team Strategy
    subtitle: "DİJİTAL DÖNÜŞÜM AJANSI",
    titleLine1: "Markanızı",
    titleLine2: "Geleceğe Taşıyoruz",
    description: "Web tasarım, yazılım ve stratejik pazarlama çözümleriyle işletmenizin potansiyelini açığa çıkarın.",
    cta: "Projeyi Başlat",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop", // Tech / Coding Team
    subtitle: "YARATICI TEKNOLOJİLER",
    titleLine1: "Sınırları",
    titleLine2: "Ortadan Kaldırın",
    description: "Yapay zeka destekli çözümler ve yenilikçi tasarımlarla rakiplerinizin bir adım önüne geçin.",
    cta: "Hizmetleri İncele",
    color: "from-purple-500 to-pink-600"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop", // Analytics / Growth
    subtitle: "GLOBAL E-İHRACAT",
    titleLine1: "Dünyaya",
    titleLine2: "Satış Yapın",
    description: "Sınırları aşan e-ticaret stratejileri ile ürünlerinizi global pazarlara ulaştırıyoruz.",
    cta: "İletişime Geç",
    color: "from-orange-500 to-red-600"
  }
];

export const CreativeHero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div id="home" className="relative w-full h-screen overflow-hidden bg-black text-white">
      
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === current;
        
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`w-full h-full transform transition-transform duration-[8000ms] ease-out ${isActive ? 'scale-110' : 'scale-100'}`}>
                    <img 
                        src={slide.image} 
                        alt={slide.subtitle} 
                        className="w-full h-full object-cover brightness-[0.35]" 
                    />
                </div>
            </div>
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-20 mix-blend-overlay`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
                
                {/* Subtitle with slide-in animation */}
                <div className={`overflow-hidden mb-4`}>
                    <p className={`text-sm md:text-base font-bold tracking-[0.3em] text-gray-300 uppercase transform transition-transform duration-1000 delay-300 ${isActive ? 'translate-y-0' : 'translate-y-full'}`}>
                        — {slide.subtitle}
                    </p>
                </div>

                {/* Big Title Lines */}
                <div className="overflow-hidden">
                    <h1 className={`text-5xl md:text-8xl font-black leading-tight transform transition-transform duration-1000 delay-500 ${isActive ? 'translate-y-0' : 'translate-y-[120%]'}`}>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            {slide.titleLine1}
                        </span>
                    </h1>
                </div>
                <div className="overflow-hidden mb-8">
                    <h1 className={`text-5xl md:text-8xl font-black leading-tight transform transition-transform duration-1000 delay-700 ${isActive ? 'translate-y-0' : 'translate-y-[120%]'}`}>
                        <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${slide.color}`}>
                            {slide.titleLine2}
                        </span>
                    </h1>
                </div>

                {/* Description */}
                <p className={`max-w-xl text-lg md:text-xl text-gray-300 mb-10 leading-relaxed transform transition-all duration-1000 delay-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {slide.description}
                </p>

                {/* CTA Button */}
                <div className={`transform transition-all duration-1000 delay-[1200ms] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <button 
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'})}
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105"
                    >
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">{slide.cta}</span>
                        <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                </div>
            </div>
          </div>
        );
      })}

      {/* Custom Navigation / Progress */}
      <div className="absolute bottom-10 right-6 md:right-20 z-30 flex flex-col gap-4 items-end">
         <div className="text-white font-mono text-sm">
             0{current + 1} <span className="text-gray-500">/ 0{slides.length}</span>
         </div>
         <div className="flex gap-3">
             {slides.map((_, idx) => (
                 <button 
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`w-1 h-12 rounded-full transition-all duration-500 ${idx === current ? 'bg-white h-20' : 'bg-gray-700 hover:bg-gray-500'}`}
                 ></button>
             ))}
         </div>
      </div>

    </div>
  );
};
