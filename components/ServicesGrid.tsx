
import React from 'react';
import { pricingData } from '../constants';

// Helper to map icon names to material icons (simple version using text/emoji if font not loaded, or assuming material symbols font)
// Since we don't have the font loaded in the prompt, let's use a mapping to simple SVG or just display the text provided in constants if it was emoji. 
// However, the constants now have string names like 'computer'. Let's make a simple SVG mapper or just use a generic icon if no font.
// To make it look "amazing", I'll use inline SVGs for a few key ones or just a generic style. 
// Actually, let's just use the Material Icons font in index.html, but here I will assume the `icon` string is a Material Icon ligature.

export const ServicesGrid: React.FC = () => {
  return (
    <section id="services" className="py-24 px-4 relative bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    Hizmetlerimiz
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    360° dijital ajans deneyimi. İhtiyacınız olan her şey tek bir çatı altında.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricingData.map((service) => (
                    <div 
                        key={service.id}
                        onClick={() => {
                            // Scroll to pricing and select this category (in a real app we'd need context, here just scroll)
                            document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'});
                        }}
                        className="group p-8 rounded-2xl bg-[#0a0a0a] border border-gray-900 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] cursor-pointer"
                    >
                        <div className="w-12 h-12 mb-6 rounded-lg bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-gray-800 group-hover:border-purple-500/50 group-hover:from-purple-900/20 group-hover:to-purple-600/20 transition-all">
                             {/* Using Google Material Symbols outlined via class if available, or fallback */}
                             <span className="material-icons-outlined text-2xl text-gray-300 group-hover:text-purple-400" style={{fontFamily: 'Material Icons, sans-serif'}}>
                                {service.icon || 'star'}
                             </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                            {service.label}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {service.shortDesc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};
