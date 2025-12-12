
import React, { useState, useEffect } from 'react';

const showcaseItems = [
  {
    id: 1,
    title: "Otomotiv",
    category: "Kurumsal Web",
    // Luxury car website concept
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 2,
    title: "Sigorta & Finans",
    category: "Kurumsal Çözüm",
    // Professional handshake/finance concept
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 3,
    title: "Sağlık & Klinik",
    category: "Medikal Web",
    // Modern medical/doctor concept
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 4,
    title: "Güzellik Merkezi",
    category: "Estetik & Spa",
    // Spa/Beauty aesthetic
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 5,
    title: "E-Ticaret",
    category: "Online Satış",
    // Shopping/Product concept
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 6,
    title: "SaaS Projeleri",
    category: "Yazılım Paneli",
    // Dashboard/Analytics concept
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 7,
    title: "Mobil Uygulama",
    category: "iOS & Android",
    // App interface concept
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop", 
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
        // Mobilde kartlar birbirine girmesin diye radius'u artırdık
        setRadius(320); 
      } else {
        setRadius(500); // Desktop için daha geniş
      }
    };
    
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    // Changed background to slate-900 (Dark) for hybrid theme contrast
    <section className="py-24 bg-slate-900 relative overflow-hidden flex flex-col items-center justify-center min-h-[650px] md:min-h-[750px] border-b border-slate-800 w-full">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/30 to-blue-900/30 rounded-full blur-[100px] pointer-events-none opacity-60"></div>

      {/* Section Title */}
      <div className="absolute top-10 z-20 text-center px-4 w-full">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
            Sektörel Çözümler
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Farklı sektörler için geliştirdiğimiz özel web tasarım ve yazılım projelerine göz atın.
        </p>
      </div>

      {/* 3D Scene Container */}
      <div className="perspective-1000 relative w-full h-[400px] md:h-[450px] flex items-center justify-center mt-24 md:mt-24 group">
        
        {/* Rotating Cylinder */}
        <div className="transform-style-3d animate-spin-slow w-[200px] md:w-[320px] h-[150px] md:h-[220px] absolute">
            
          {showcaseItems.map((item, index) => {
            const rotation = index * angle;
            
            return (
              <div
                key={item.id}
                className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-purple-500/50"
                style={{
                  transform: `rotateY(${rotation}deg) translateZ(${radius}px)`
                }}
              >
                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                    {/* Overlay Text - Light Grey Style */}
                    <div className="absolute bottom-0 left-0 right-0 bg-slate-100/95 backdrop-blur-md p-4">
                        <span className="text-[10px] md:text-xs font-bold text-purple-600 uppercase tracking-widest block mb-1">
                            {item.category}
                        </span>
                        <h3 className="text-slate-900 font-bold text-sm md:text-lg leading-tight truncate">
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
      <div className="absolute bottom-10 text-gray-500 text-[10px] md:text-xs animate-pulse tracking-widest font-bold bg-black/30 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
        DURDURMAK İÇİN ÜZERİNE GELİN
      </div>

    </section>
  );
};
