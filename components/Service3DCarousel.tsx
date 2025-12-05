
import React, { useState, useEffect } from 'react';

const showcaseItems = [
  {
    id: 1,
    title: "E-Ticaret",
    category: "Web Tasarım",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 2,
    title: "Mobil App",
    category: "Yazılım",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 3,
    title: "SEO Analiz",
    category: "Veri",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 4,
    title: "Sosyal Medya",
    category: "İçerik",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 5,
    title: "Prodüksiyon",
    category: "Video",
    image: "https://images.unsplash.com/photo-1588483977959-badc9893d432?q=80&w=800&auto=format&fit=crop", // Professional Camera Rig
  },
  {
    id: 6,
    title: "E-İhracat",
    category: "Global",
    image: "https://images.unsplash.com/photo-1526304640155-234dad33e798?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 7,
    title: "Marka Kimliği",
    category: "Tasarım",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 8,
    title: "Mageros Akademi",
    category: "Eğitim",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", 
  }
];

export const Service3DCarousel: React.FC = () => {
  const itemCount = showcaseItems.length;
  const angle = 360 / itemCount;
  
  // Radius state
  const [radius, setRadius] = useState(450);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(280); 
      } else {
        setRadius(450); // Desktop
      }
    };
    
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-24 bg-black relative overflow-hidden flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] border-b border-gray-900 w-full">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Section Title */}
      <div className="absolute top-10 z-20 text-center px-4 w-full">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
            Dijital Vitrin
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
            Hizmetlerimizin görsel dünyasında 360° bir tur atın.
        </p>
      </div>

      {/* 3D Scene Container - Increased height for mobile to prevent clipping */}
      <div className="perspective-1000 relative w-full h-[350px] md:h-[400px] flex items-center justify-center mt-20 md:mt-20 group">
        
        {/* Rotating Cylinder */}
        <div className="transform-style-3d animate-spin-slow w-[160px] md:w-[280px] h-[120px] md:h-[200px] absolute">
            
          {showcaseItems.map((item, index) => {
            const rotation = index * angle;
            
            return (
              <div
                key={item.id}
                className="absolute inset-0 rounded-xl overflow-hidden border border-white/10 bg-gray-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300"
                style={{
                  transform: `rotateY(${rotation}deg) translateZ(${radius}px)`
                }}
              >
                <div className="relative w-full h-full">
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-90"
                    />
                    {/* Overlay Text */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-2 md:p-4">
                        <span className="text-[8px] md:text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-0.5">
                            {item.category}
                        </span>
                        <h3 className="text-white font-bold text-xs md:text-lg leading-none truncate">
                            {item.title}
                        </h3>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Interaction Hint */}
      <div className="absolute bottom-10 text-gray-500 text-[10px] md:text-xs animate-pulse tracking-widest">
        DURDURMAK İÇİN ÜZERİNE GELİN
      </div>

    </section>
  );
};
