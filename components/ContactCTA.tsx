
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
    <section id="contact" className="relative py-24 bg-gradient-to-b from-[#050505] to-black border-t border-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Neon CTA Strip */}
        <div className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 rounded-3xl p-10 md:p-16 text-center mb-24 relative overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
                Markanızı Zirveye Taşımaya Hazır mısınız?
            </h2>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
                Sizin için en uygun stratejiyi belirleyelim, dijital dünyada fark yaratın. Ücretsiz analiz için hemen iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                    Hemen Teklif Al
                </button>
                <a href="tel:05441073492" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                    <span className="material-icons text-sm">call</span>
                    Bizi Arayın: 0544 107 34 92
                </a>
            </div>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                    Bize Ulaşın
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Projeleriniz hakkında konuşmak, danışmanlık almak veya sadece kahve içmek için ofisimize bekleriz. Aşağıdaki formu doldurun, en kısa sürede dönüş yapalım.
                </p>
                
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 text-purple-400">
                            <span className="material-icons">location_on</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Ofis Adresi</h4>
                            <p className="text-gray-500 text-sm">Levent Mah. Büyükdere Cad. Kanyon Ofis No: 185, 34394 Şişli/İstanbul</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 text-blue-400">
                            <span className="material-icons">mail</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold">E-Posta</h4>
                            <p className="text-gray-500 text-sm">info@mageros.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 text-pink-400">
                            <span className="material-icons">phone</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Telefon</h4>
                            <p className="text-gray-500 text-sm">0544 107 34 92</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-gray-900 relative overflow-hidden">
                {formState === 'success' ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-10 animate-fadeIn">
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                            <span className="material-icons text-3xl">check</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Mesajınız İletildi!</h3>
                        <p className="text-gray-400 text-center px-6">En kısa sürede size dönüş yapacağız.</p>
                        <button onClick={() => setFormState('idle')} className="mt-6 text-sm text-gray-500 underline hover:text-white">Yeni mesaj gönder</button>
                    </div>
                ) : (
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 uppercase font-bold">Adınız</label>
                                <input type="text" className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 uppercase font-bold">Telefon</label>
                                <input type="tel" className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors" placeholder="+90 555..." />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase font-bold">E-Posta</label>
                            <input type="email" className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors" placeholder="ornek@sirket.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase font-bold">Konu</label>
                            <select className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors">
                                <option>Web Tasarım</option>
                                <option>E-Ticaret</option>
                                <option>SEO & Pazarlama</option>
                                <option>Diğer</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase font-bold">Mesajınız</label>
                            <textarea rows={4} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors" placeholder="Projenizden bahsedin..."></textarea>
                        </div>
                        <button 
                            type="button" 
                            onClick={handleSubmit}
                            disabled={formState === 'sending'}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
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
