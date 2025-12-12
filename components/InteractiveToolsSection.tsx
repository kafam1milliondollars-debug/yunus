
import React, { useState } from 'react';
import { User } from '../types';

interface InteractiveToolsSectionProps {
  user: User | null;
  onRegisterClick: () => void;
  onPricingClick: () => void;
}

type ToolType = 'qr' | 'kdv' | 'cargo' | 'domain';

export const InteractiveToolsSection: React.FC<InteractiveToolsSectionProps> = ({ user, onRegisterClick, onPricingClick }) => {
  const [activeTool, setActiveTool] = useState<ToolType>('kdv');
  const [usageCount, setUsageCount] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);

  // Tool States
  const [qrText, setQrText] = useState('');
  const [qrImage, setQrImage] = useState('');
  
  const [kdvAmount, setKdvAmount] = useState('');
  const [kdvRate, setKdvRate] = useState(20);
  const [kdvResult, setKdvResult] = useState<{
    added: { total: number, tax: number }, // Tutar KDV Hariç ise -> KDV Ekle
    removed: { base: number, tax: number } // Tutar KDV Dahil ise -> KDV Çıkar
  } | null>(null);

  const [desi, setDesi] = useState('');
  const [cargoPrice, setCargoPrice] = useState<number | null>(null);

  const [domainKeyword, setDomainKeyword] = useState('');
  const [domains, setDomains] = useState<string[]>([]);

  // Usage Logic
  const checkLimit = () => {
    if (user) return true; // Logged in users have unlimited access
    if (usageCount >= 2) {
      setShowLimitModal(true);
      return false;
    }
    setUsageCount(prev => prev + 1);
    return true;
  };

  // Tool Handlers
  const handleQrGenerate = () => {
    if (!qrText) return;
    if (!checkLimit()) return;
    setQrImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrText)}`);
  };

  const handleKdvCalculate = () => {
    if (!kdvAmount) return;
    if (!checkLimit()) return;
    const amount = parseFloat(kdvAmount);
    const rate = kdvRate / 100;

    // Senaryo 1: Girilen tutar KDV HARİÇ ise (KDV Ekle)
    const taxAdded = amount * rate;
    const totalWithTax = amount + taxAdded;

    // Senaryo 2: Girilen tutar KDV DAHİL ise (KDV Çıkar)
    const baseWithoutTax = amount / (1 + rate);
    const taxIncluded = amount - baseWithoutTax;

    setKdvResult({ 
      added: { total: totalWithTax, tax: taxAdded },
      removed: { base: baseWithoutTax, tax: taxIncluded }
    });
  };

  const handleCargoCalculate = () => {
    if (!desi) return;
    if (!checkLimit()) return;
    // Mock logic for TR shipping prices
    const d = parseFloat(desi);
    let price = 0;
    if (d <= 1) price = 65;
    else if (d <= 5) price = 95;
    else if (d <= 10) price = 140;
    else price = 140 + ((d - 10) * 12);
    setCargoPrice(price);
  };

  const handleDomainGenerate = () => {
    if (!domainKeyword) return;
    if (!checkLimit()) return;
    const clean = domainKeyword.toLowerCase().replace(/[^a-z0-9]/g, '');
    setDomains([
      `${clean}.com`,
      `${clean}.net`,
      `${clean}.com.tr`,
      `${clean}digital.com`,
      `get${clean}.com`,
      `${clean}app.io`
    ]);
  };

  const tools = [
    { id: 'kdv', label: 'KDV Hesapla', icon: 'calculate' },
    { id: 'cargo', label: 'Kargo Ücreti', icon: 'local_shipping' },
    { id: 'qr', label: 'QR Oluştur', icon: 'qr_code_2' },
    { id: 'domain', label: 'Domain Bul', icon: 'language' },
  ];

  return (
    <section className="bg-slate-900 py-12 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: TOOLS AREA */}
          <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl border border-slate-700 p-6 relative overflow-hidden">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="material-icons text-purple-400">handyman</span>
                    Ücretsiz Web Araçları
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    İşinizi kolaylaştıracak pratik hesaplama araçları.
                    {!user && <span className="text-yellow-500 ml-2 font-bold">(Kalan Deneme Hakkı: {2 - usageCount})</span>}
                  </p>
               </div>
               
               {/* Tool Selector */}
               <div className="flex gap-2 bg-slate-900 p-1 rounded-lg overflow-x-auto max-w-full">
                  {tools.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTool(t.id as ToolType)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-all ${activeTool === t.id ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                      <span className="material-icons text-sm">{t.icon}</span>
                      {t.label}
                    </button>
                  ))}
               </div>
            </div>

            {/* ACTIVE TOOL CONTENT */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 min-h-[250px] relative">
              
              {/* Limit Modal Overlay */}
              {showLimitModal && (
                <div className="absolute inset-0 z-20 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 animate-fadeIn rounded-xl">
                   <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-700">
                      <span className="material-icons text-3xl text-yellow-500">lock</span>
                   </div>
                   <h4 className="text-xl font-bold text-white mb-2">Deneme Hakkınız Doldu</h4>
                   <p className="text-slate-400 text-sm mb-6 max-w-sm">
                     Araçları sınırsız kullanmak ve projelerinizi yönetmek için ücretsiz üye olun.
                   </p>
                   <button 
                      onClick={onRegisterClick}
                      className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/50"
                   >
                      Ücretsiz Kayıt Ol
                   </button>
                </div>
              )}

              {/* KDV CALCULATOR */}
              {activeTool === 'kdv' && (
                <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                   <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Tutar (TL)</label>
                        <input type="number" value={kdvAmount} onChange={e => setKdvAmount(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none font-bold text-lg" placeholder="1000" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">KDV Oranı</label>
                        <div className="flex gap-2 mt-1">
                          {[1, 10, 20].map(r => (
                            <button key={r} onClick={() => setKdvRate(r)} className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${kdvRate === r ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>%{r}</button>
                          ))}
                        </div>
                      </div>
                      <button onClick={handleKdvCalculate} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">HESAPLA</button>
                   </div>
                   
                   {/* Results Display */}
                   <div className="flex flex-col gap-3 h-full">
                      {/* Senaryo 1: KDV Hariçten -> Dahile */}
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center flex-1 flex flex-col justify-center relative overflow-hidden group">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Girdiğiniz Tutar KDV Hariç İse</p>
                          <p className="text-xs text-green-400 mb-1">KDV Dahil Toplam</p>
                          <div className="text-3xl font-black text-white">
                            {kdvResult ? `₺${kdvResult.added.total.toFixed(2)}` : '₺0.00'}
                          </div>
                          <p className="text-slate-500 text-[10px] mt-1">Eklenen KDV: {kdvResult ? `₺${kdvResult.added.tax.toFixed(2)}` : '₺0.00'}</p>
                      </div>

                      {/* Senaryo 2: KDV Dahilden -> Harice */}
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center flex-1 flex flex-col justify-center relative overflow-hidden group">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Girdiğiniz Tutar KDV Dahil İse</p>
                          <p className="text-xs text-orange-400 mb-1">KDV Hariç Tutar</p>
                          <div className="text-3xl font-black text-white">
                            {kdvResult ? `₺${kdvResult.removed.base.toFixed(2)}` : '₺0.00'}
                          </div>
                          <p className="text-slate-500 text-[10px] mt-1">İçindeki KDV: {kdvResult ? `₺${kdvResult.removed.tax.toFixed(2)}` : '₺0.00'}</p>
                      </div>
                   </div>
                </div>
              )}

              {/* CARGO CALCULATOR */}
              {activeTool === 'cargo' && (
                <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                   <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Desi / Ağırlık</label>
                        <input type="number" value={desi} onChange={e => setDesi(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Örn: 5" />
                      </div>
                      <p className="text-xs text-slate-500 italic">*Ortalama Türkiye kargo fiyatları baz alınmıştır.</p>
                      <button onClick={handleCargoCalculate} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors">Fiyat Gör</button>
                   </div>
                   <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center flex flex-col justify-center h-full">
                      <p className="text-slate-500 text-sm mb-2">Tahmini Kargo Ücreti</p>
                      <div className="text-4xl font-black text-white mb-2">
                        {cargoPrice ? `₺${cargoPrice.toFixed(2)}` : '₺0.00'}
                      </div>
                      <p className="text-slate-400 text-xs">+KDV Dahil Değildir</p>
                   </div>
                </div>
              )}

              {/* QR GENERATOR */}
              {activeTool === 'qr' && (
                <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                   <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Metin veya Link</label>
                        <input type="text" value={qrText} onChange={e => setQrText(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="https://mageros.com" />
                      </div>
                      <button onClick={handleQrGenerate} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors">QR Oluştur</button>
                   </div>
                   <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl p-4">
                      {qrImage ? (
                        <img src={qrImage} alt="QR Code" className="w-32 h-32" />
                      ) : (
                        <div className="w-32 h-32 bg-slate-100 flex items-center justify-center text-slate-300">
                           <span className="material-icons text-4xl">qr_code_2</span>
                        </div>
                      )}
                      <p className="text-slate-900 text-xs font-bold mt-2">Önizleme</p>
                   </div>
                </div>
              )}

               {/* DOMAIN GENERATOR */}
               {activeTool === 'domain' && (
                <div className="grid md:grid-cols-2 gap-8 items-start h-full">
                   <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Marka / Kelime</label>
                        <input type="text" value={domainKeyword} onChange={e => setDomainKeyword(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="mageros" />
                      </div>
                      <button onClick={handleDomainGenerate} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors">Alan Adı Üret</button>
                   </div>
                   <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 h-full overflow-y-auto max-h-[200px] no-scrollbar">
                      <p className="text-slate-500 text-xs mb-3 font-bold uppercase">Öneriler</p>
                      {domains.length > 0 ? (
                        <div className="space-y-2">
                           {domains.map((d, i) => (
                             <div key={i} className="flex justify-between items-center text-sm border-b border-slate-700 pb-2 last:border-0">
                                <span className="text-white font-mono">{d}</span>
                                <span className="text-green-500 text-[10px] border border-green-900 bg-green-900/20 px-1 rounded">Müsait Olabilir</span>
                             </div>
                           ))}
                        </div>
                      ) : (
                        <div className="text-center text-slate-500 mt-8">
                           <span className="material-icons mb-2">search</span>
                           <p className="text-xs">Kelime girip arama yapın.</p>
                        </div>
                      )}
                   </div>
                </div>
              )}

            </div>
          </div>

          {/* RIGHT: CTA CARD (Sales Direction) */}
          <div className="lg:col-span-1 bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-8 relative overflow-hidden shadow-xl border border-white/10 flex flex-col justify-center text-center">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
             
             <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/20">
                <span className="material-icons text-3xl text-white">rocket_launch</span>
             </div>

             <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
               Markanızı Büyütmeye Hazır mısınız?
             </h3>
             <p className="text-blue-100 text-sm mb-8 leading-relaxed">
               Bu araçlar sadece başlangıç. Profesyonel web tasarım, e-ticaret ve reklam yönetimi ile cironuzu katlayın.
             </p>

             <div className="space-y-4">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                  className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg"
                >
                  Hemen Teklif Al
                </button>
                <button 
                  onClick={onPricingClick}
                  className="w-full py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
                >
                   Paketleri İncele
                </button>
             </div>
             
             <div className="mt-6 flex items-center justify-center gap-2 text-xs text-blue-200 opacity-80">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Şu an 3 uzmanımız online</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
