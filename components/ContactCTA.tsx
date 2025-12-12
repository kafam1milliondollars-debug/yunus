
import React, { useState } from 'react';

export const ContactCTA: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = () => {
    setFormState('sending');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    // Changed to dark background for hybrid theme
    <section id="contact" className="relative py-24 bg-black border-t border-gray-900">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Modern Glass CTA Strip */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-[2.5rem] p-10 md:p-16 text-center mb-24 relative overflow-hidden shadow-2xl shadow-purple-900/20 border border-white/10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            {/* Abstract circles */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 drop-shadow-md">
                İstanbul'da Markanızı Zirveye Taşıyalım
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 font-medium">
                Türkiye'nin en yenilikçi dijital ajansı ile çalışın. Web tasarım, SEO ve reklam yönetimi stratejilerini sizin için kurgulayalım.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
                    Hemen Teklif Al
                </button>
                <a href="tel:05441073492" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-purple-900 transition-all flex items-center justify-center gap-2">
                    <span className="material-icons text-sm">call</span>
                    Bizi Arayın: 0544 107 34 92
                </a>
            </div>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                    İletişime Geçin
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                    İstanbul ofisimizde kahve içmeye bekleriz. Dijital projelerinizi, e-ticaret hedeflerinizi ve markanızın geleceğini konuşalım.
                </p>
                
                <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 hover:shadow-md transition-all border border-transparent hover:border-white/10">
                        <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center border border-purple-500/30 text-purple-400">
                            <span className="material-icons">location_on</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Ofis Adresi (İstanbul)</h4>
                            <p className="text-gray-500 text-sm">Yenişehir mah, Osmanlı Blv. LENS İSTANBUL OFİSİ 34912 Pendik/İstanbul</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 hover:shadow-md transition-all border border-transparent hover:border-white/10">
                        <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center border border-blue-500/30 text-blue-400">
                            <span className="material-icons">mail</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold">E-Posta</h4>
                            <p className="text-gray-500 text-sm">info@mageros.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 hover:shadow-md transition-all border border-transparent hover:border-white/10">
                        <div className="w-12 h-12 rounded-full bg-pink-900/30 flex items-center justify-center border border-pink-500/30 text-pink-400">
                            <span className="material-icons">phone</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Telefon & WhatsApp</h4>
                            <p className="text-gray-500 text-sm">0544 107 34 92</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-gray-800 shadow-xl relative overflow-hidden">
                {formState === 'success' ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-10 animate-fadeIn p-8 text-center">
                        <div className="w-20 h-20 bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-900/50">
                            <span className="material-icons text-4xl">check</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Mesajınız İletildi!</h3>
                        <p className="text-gray-500 text-center px-6">Talebiniz bize ulaştı. En kısa sürede size dönüş yapacağız.</p>
                        <button onClick={() => setFormState('idle')} className="mt-8 text-sm text-purple-400 font-bold hover:underline">Yeni mesaj gönder</button>
                    </div>
                ) : (
                    <form className="space-y-5">
                        <h4 className="text-xl font-bold text-white mb-2">Hemen Başlayalım</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 uppercase font-bold tracking-wide">Adınız</label>
                                <input type="text" className="w-full bg-black border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-900 focus:outline-none transition-all" placeholder="Ad Soyad" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 uppercase font-bold tracking-wide">Telefon</label>
                                <input type="tel" className="w-full bg-black border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-900 focus:outline-none transition-all" placeholder="+90 555..." />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase font-bold tracking-wide">E-Posta</label>
                            <input type="email" className="w-full bg-black border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-900 focus:outline-none transition-all" placeholder="ornek@sirket.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase font-bold tracking-wide">Hizmet Seçimi</label>
                            <select className="w-full bg-black border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-900 focus:outline-none transition-all">
                                <option>Web Tasarım Fiyatı Al</option>
                                <option>E-Ticaret Sitesi Kurmak</option>
                                <option>SEO & Dijital Pazarlama</option>
                                <option>Diğer Konular</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase font-bold tracking-wide">Mesajınız</label>
                            <textarea rows={4} className="w-full bg-black border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-900 focus:outline-none transition-all" placeholder="Projenizden bahsedin..."></textarea>
                        </div>
                        <button 
                            type="button" 
                            onClick={handleSubmit}
                            disabled={formState === 'sending'}
                            className="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            {formState === 'sending' ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Gönderiliyor...
                                </>
                            ) : 'Gönder'}
                        </button>
                    </form>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};