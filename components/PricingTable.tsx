
import React from 'react';
import { CategoryData, Package } from '../types';

interface PricingTableProps {
  data: CategoryData;
  onSelectPackage?: (pkg: Package) => void;
}

// Icons
const CheckIcon = () => (
  <div className="flex justify-center items-center w-6 h-6 rounded-full bg-green-100 mx-auto">
    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const DashIcon = () => (
  <div className="flex justify-center items-center mx-auto">
    <div className="w-4 h-1 bg-slate-300 rounded-full"></div>
  </div>
);

export const PricingTable: React.FC<PricingTableProps> = ({ data, onSelectPackage }) => {
  return (
    <>
      {/* --- MOBILE VIEW: CARDS (Visible on small screens) --- */}
      <div className="md:hidden flex flex-col gap-6">
        {data.packages.map((pkg, index) => (
          <div 
            key={index} 
            className={`
              relative rounded-3xl border p-6 overflow-hidden bg-white shadow-xl
              ${pkg.isPopular 
                ? 'border-purple-200 shadow-purple-200/50' 
                : 'border-slate-100 shadow-slate-100'
              }
            `}
          >
            {pkg.isPopular && (
              <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-md">
                Popüler
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl font-bold text-slate-900">{pkg.price}</span>
                <span className="text-xs text-slate-500">{pkg.period}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {data.features.slice(0, 6).map((feature, fIndex) => { 
                const val = feature.values[index];
                return (
                  <div key={fIndex} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2 last:border-0">
                    <span className="text-slate-500">{feature.name}</span>
                    <span className="text-slate-900 font-medium">
                      {typeof val === 'boolean' ? (val ? 'Var' : '-') : val}
                    </span>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => onSelectPackage && onSelectPackage(pkg)}
              className={`
                w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md
                ${pkg.isPopular 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }
              `}
            >
              Paketi Seç
            </button>
          </div>
        ))}
      </div>

      {/* --- DESKTOP VIEW: TABLE (Visible on medium+ screens) --- */}
      <div className="hidden md:block relative w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/50">
        
        {/* Table Header / Grid Definition */}
        <div className="grid grid-cols-4 min-w-[800px] overflow-x-auto">
          
          {/* Top Left Empty Corner (or Label) */}
          <div className="p-6 md:p-8 flex items-end border-b border-r border-slate-100 bg-slate-50">
            <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">
              {data.label} Özellikleri
            </span>
          </div>

          {/* Package Headers */}
          {data.packages.map((pkg, index) => {
            const isHighlight = pkg.isPopular;
            const highlightClass = isHighlight 
              ? 'relative bg-purple-50/50' 
              : 'bg-white';
              
            const borderClass = index === data.packages.length - 1 ? '' : 'border-r border-slate-100';

            return (
              <div key={index} className={`p-6 md:p-8 text-center border-b border-slate-100 flex flex-col items-center justify-between gap-4 ${highlightClass} ${borderClass}`}>
                
                {isHighlight && (
                  <div className="absolute -top-px left-0 right-0 h-1.5 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400"></div>
                )}
                
                {isHighlight && (
                  <span className="mb-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-purple-600 rounded-full shadow-md">
                    En Çok Tercih Edilen
                  </span>
                )}

                <div className="space-y-2">
                  <h3 className={`text-xl font-bold text-slate-900`}>
                    {pkg.name}
                  </h3>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-slate-900 tracking-tight">{pkg.price}</span>
                    <span className="text-xs text-slate-500 font-medium">{pkg.period}</span>
                  </div>
                </div>

                <button 
                  onClick={() => onSelectPackage && onSelectPackage(pkg)}
                  className={`
                    w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 mt-4 shadow-sm
                    ${isHighlight 
                      ? 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 shadow-slate-300' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }
                  `}
                >
                  Bilgi Alın
                </button>
              </div>
            );
          })}

          {/* Features Rows */}
          {data.features.map((feature, fIndex) => (
            <React.Fragment key={fIndex}>
              {/* Feature Name */}
              <div className="p-4 md:p-6 flex items-center border-b border-r border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                <span className="text-slate-600 font-bold text-sm md:text-base">
                  {feature.name}
                </span>
              </div>

              {/* Feature Values */}
              {feature.values.map((val, vIndex) => {
                const isHighlight = data.packages[vIndex].isPopular;
                const borderClass = vIndex === data.packages.length - 1 ? '' : 'border-r border-slate-100';
                const bgClass = isHighlight ? 'bg-purple-50/30' : 'bg-white';

                return (
                  <div 
                    key={vIndex} 
                    className={`p-4 md:p-6 flex items-center justify-center border-b border-slate-100 text-center ${borderClass} ${bgClass}`}
                  >
                    {typeof val === 'boolean' ? (
                      val ? <CheckIcon /> : <DashIcon />
                    ) : (
                      <span className={`text-sm font-semibold ${isHighlight ? 'text-purple-700' : 'text-slate-500'}`}>
                        {val}
                      </span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
          
        </div>
      </div>
    </>
  );
};