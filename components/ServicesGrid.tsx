
import React from 'react';
import { pricingData } from '../constants';

export const ServicesGrid: React.FC = () => {
  return (
    <section id="services" className="py-24 px-4 relative bg-slate-50">
        
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
                    Hizmetlerimiz
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                    360° dijital ajans deneyimi. İhtiyacınız olan her şey tek bir çatı altında.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricingData.map((service) => (
                    <div 
                        key={service.id}
                        onClick={() => {
                            document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'});
                        }}
                        className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-purple-100/50 cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-50 to-blue-50 rounded-bl-[4rem] -mr-4 -mt-4 transition-all group-hover:scale-110"></div>
                        
                        <div className="relative w-14 h-14 mb-6 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all text-purple-600 shadow-sm">
                             <span className="material-icons-outlined text-3xl" style={{fontFamily: 'Material Icons, sans-serif'}}>
                                {service.icon || 'star'}
                             </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors relative z-10">
                            {service.label}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed relative z-10">
                            {service.shortDesc}
                        </p>
                        
                        <div className="mt-6 flex items-center text-purple-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                           İncele <span className="material-icons text-sm ml-1">arrow_forward</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};