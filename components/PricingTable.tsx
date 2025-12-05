
import React from 'react';
import { CategoryData, Package } from '../types';

interface PricingTableProps {
  data: CategoryData;
  onSelectPackage?: (pkg: Package) => void;
}

// Icons
const CheckIcon = () => (
  <div className="flex justify-center items-center w-6 h-6 rounded-full bg-green-400/20 mx-auto">
    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const DashIcon = () => (
  <div className="flex justify-center items-center mx-auto">
    <div className="w-4 h-1 bg-gray-700 rounded-full"></div>
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
              relative rounded-2xl border bg-[#0a0a0a] p-6 overflow-hidden
              ${pkg.isPopular 
                ? 'border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                : 'border-gray-800'
              }
            `}
          >
            {pkg.isPopular && (
              <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Popüler
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl font-bold text-white">{pkg.price}</span>
                <span className="text-xs text-gray-500">{pkg.period}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {data.features.slice(0, 6).map((feature, fIndex) => { // Show top 6 features on mobile card preview
                const val = feature.values[index];
                return (
                  <div key={fIndex} className="flex justify-between items-center text-sm border-b border-gray-900 pb-2 last:border-0">
                    <span className="text-gray-400">{feature.name}</span>
                    <span className="text-white font-medium">
                      {typeof val === 'boolean' ? (val ? 'Var' : '-') : val}
                    </span>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => onSelectPackage && onSelectPackage(pkg)}
              className={`
                w-full py-3 rounded-xl font-bold text-sm transition-all
                ${pkg.isPopular 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'border border-gray-700 text-white hover:bg-gray-900'
                }
              `}
            >
              Paketi Seç
            </button>
          </div>
        ))}
        <div className="text-center text-xs text-gray-500 mt-2">
          * Daha detaylı karşılaştırma için masaüstü sürümü ziyaret ediniz.
        </div>
      </div>

      {/* --- DESKTOP VIEW: TABLE (Visible on medium+ screens) --- */}
      <div className="hidden md:block relative w-full overflow-hidden rounded-3xl border border-gray-900 bg-[#050505] shadow-2xl">
        
        {/* Table Header / Grid Definition */}
        <div className="grid grid-cols-4 min-w-[800px] overflow-x-auto">
          
          {/* Top Left Empty Corner (or Label) */}
          <div className="p-6 md:p-8 flex items-end border-b border-r border-gray-900/50 bg-[#0a0a0a]">
            <span className="text-gray-400 font-medium text-sm uppercase tracking-wider">
              {data.label} Özellikleri
            </span>
          </div>

          {/* Package Headers */}
          {data.packages.map((pkg, index) => {
            const isHighlight = pkg.isPopular;
            const highlightClass = isHighlight 
              ? 'relative bg-gradient-to-b from-purple-900/20 to-transparent' 
              : '';
              
            const borderClass = index === data.packages.length - 1 ? '' : 'border-r border-gray-900/50';

            return (
              <div key={index} className={`p-6 md:p-8 text-center border-b border-gray-900/50 flex flex-col items-center justify-between gap-4 ${highlightClass} ${borderClass}`}>
                
                {isHighlight && (
                  <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]"></div>
                )}
                
                {isHighlight && (
                  <span className="mb-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-purple-600 rounded-full shadow-lg shadow-purple-900/50">
                    En Çok Tercih Edilen
                  </span>
                )}

                <div className="space-y-2">
                  <h3 className={`text-xl font-bold ${isHighlight ? 'text-white' : 'text-gray-300'}`}>
                    {pkg.name}
                  </h3>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-white tracking-tight">{pkg.price}</span>
                    <span className="text-xs text-gray-500">{pkg.period}</span>
                  </div>
                </div>

                <button 
                  onClick={() => onSelectPackage && onSelectPackage(pkg)}
                  className={`
                    w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 mt-4
                    ${isHighlight 
                      ? 'bg-white text-black hover:bg-gray-200 hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                      : 'border border-gray-700 text-white hover:border-gray-500 hover:bg-gray-900'
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
              <div className="p-4 md:p-6 flex items-center border-b border-r border-gray-900/50 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors">
                <span className="text-gray-300 font-medium text-sm md:text-base">
                  {feature.name}
                </span>
              </div>

              {/* Feature Values */}
              {feature.values.map((val, vIndex) => {
                const isHighlight = data.packages[vIndex].isPopular;
                const borderClass = vIndex === data.packages.length - 1 ? '' : 'border-r border-gray-900/50';
                const bgClass = isHighlight ? 'bg-purple-900/5' : '';

                return (
                  <div 
                    key={vIndex} 
                    className={`p-4 md:p-6 flex items-center justify-center border-b border-gray-900/50 text-center ${borderClass} ${bgClass}`}
                  >
                    {typeof val === 'boolean' ? (
                      val ? <CheckIcon /> : <DashIcon />
                    ) : (
                      <span className={`text-sm font-medium ${isHighlight ? 'text-white' : 'text-gray-400'}`}>
                        {val}
                      </span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
          
          <div className="bg-[#0a0a0a] border-r border-gray-900/50 h-4"></div>
          {data.packages.map((pkg, i) => (
            <div key={i} className={`h-4 ${pkg.isPopular ? 'bg-purple-900/5' : ''} ${i !== data.packages.length - 1 ? 'border-r border-gray-900/50' : ''}`}></div>
          ))}
        </div>
      </div>
    </>
  );
};
