
import React, { useState, useEffect, useRef } from 'react';
import { pricingData } from '../constants'; // Veri dosyasını içe aktar

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  type?: 'text' | 'options' | 'link';
  options?: { label: string; action: string; value?: string }[];
  linkUrl?: string;
}

// WhatsApp SVG Icon Component for reusability
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Merhaba! 👋 Ben Mageros Asistan. Tüm hizmetlerimiz ve güncel fiyatlarımız hakkında size anında bilgi verebilirim. Nasıl yardımcı olayım?",
      sender: 'bot',
      type: 'options',
      options: [
        { label: "📋 Tüm Hizmetleri Listele", action: "list_all_services" },
        { label: "🚀 Fiyatları Öğrenmek İstiyorum", action: "list_all_services" }, // Fiyatlar da hizmet seçimiyle başlar
        { label: "📞 Müşteri Temsilcisi", action: "contact_human" }
      ]
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Otomatik aşağı kaydırma
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const handleOptionClick = (action: string, label: string) => {
    // 1. Kullanıcı Mesajını Ekle
    const userMsg: Message = { id: Date.now(), text: label, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Bot Mantığı (Gecikmeli Cevap)
    setTimeout(() => {
      let botResponse: Message;
      const timestamp = Date.now() + 1;

      // --- DİNAMİK İŞLEYİCİLER ---

      // 1. Tüm Kategorileri Listele
      if (action === 'list_all_services') {
        const serviceOptions = pricingData.map(cat => ({
            label: `${cat.icon ? '🔹 ' + cat.label : cat.label}`, // İkon varsa ekle
            action: `select_category:${cat.id}`
        }));

        botResponse = {
            id: timestamp,
            text: "Hangi hizmetimizle ilgileniyorsunuz? Seçiminizi yapın, detayları ve paketleri göstereyim:",
            sender: 'bot',
            type: 'options',
            options: serviceOptions
        };
      }
      
      // 2. Belirli Bir Kategoriyi Göster (Dinamik)
      else if (action.startsWith('select_category:')) {
          const catId = action.split(':')[1];
          const category = pricingData.find(c => c.id === catId);

          if (category) {
              botResponse = {
                  id: timestamp,
                  text: `${category.label} hizmetimiz hakkında bilgi vereyim:\n\n"${category.shortDesc}"\n\nPaketleri ve fiyatları görmek ister misiniz?`,
                  sender: 'bot',
                  type: 'options',
                  options: [
                      { label: "💰 Paketleri & Fiyatları Göster", action: `show_packages:${category.id}` },
                      { label: "🔙 Diğer Hizmetler", action: "list_all_services" }
                  ]
              };
          } else {
              botResponse = { id: timestamp, text: "Bir hata oluştu, hizmet bulunamadı.", sender: 'bot' };
          }
      }

      // 3. Paketleri ve Fiyatları Göster (Dinamik)
      else if (action.startsWith('show_packages:')) {
          const catId = action.split(':')[1];
          const category = pricingData.find(c => c.id === catId);

          if (category) {
              // Paketleri metin olarak formatla
              let packageText = `📂 *${category.label} Paketleri:*\n`;
              category.packages.forEach(pkg => {
                  const badge = pkg.isPopular ? '⭐ ' : '📦 ';
                  packageText += `\n${badge}**${pkg.name}**\n   🏷️ Fiyat: ${pkg.price} (${pkg.period})\n`;
              });
              packageText += `\nDetaylı özellik tablosu için sayfayı aşağı kaydırabilir veya doğrudan satın alabilirsiniz.`;

              botResponse = {
                  id: timestamp,
                  text: packageText,
                  sender: 'bot',
                  type: 'options',
                  options: [
                      { label: "👀 Tabloya Git", action: "go_to_pricing" },
                      { label: "✅ Hemen Başvuru Yap", action: "contact_form_redirect" },
                      { label: "💬 WhatsApp'tan Yaz", action: "whatsapp_redirect" },
                      { label: "🔙 Listeye Dön", action: "list_all_services" }
                  ]
              };
          } else {
              botResponse = { id: timestamp, text: "Paket bilgisi alınamadı.", sender: 'bot' };
          }
      }

      // --- STATİK İŞLEYİCİLER ---

      else if (action === 'contact_human') {
          botResponse = {
            id: timestamp,
            text: "Uzman ekibimize haftanın 7 günü ulaşabilirsiniz. Hangi yöntemi tercih edersiniz?",
            sender: 'bot',
            type: 'options',
            options: [
              { label: "WhatsApp (En Hızlı) 🟢", action: "whatsapp_redirect" },
              { label: "İletişim Formu 📝", action: "contact_form_redirect" },
              { label: "Beni Arayın 📞", action: "contact_form_redirect" }
            ]
          };
      }

      else if (action === 'go_to_pricing') {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
          botResponse = {
            id: timestamp,
            text: "Sizi detaylı fiyat tablosuna yönlendirdim. Oradan tüm özellikleri karşılaştırabilirsiniz.",
            sender: 'bot',
            type: 'options',
            options: [{ label: "Teşekkürler", action: "reset" }]
          };
      }

      else if (action === 'whatsapp_redirect') {
          window.open('https://wa.me/905441073492?text=Merhaba,%20sitenizden%20ulaşıyorum.%20Hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum.', '_blank');
          botResponse = {
            id: timestamp,
            text: "WhatsApp sohbeti açıldı! Arkadaşlarımız hemen dönüş yapacaktır.",
            sender: 'bot'
          };
      }
        
      else if (action === 'contact_form_redirect') {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
           botResponse = {
            id: timestamp,
            text: "Aşağıdaki formu doldurun, sizi 15 dakika içinde arayalım.",
            sender: 'bot'
          };
      }

      else {
          // Varsayılan / Sıfırla
          botResponse = {
            id: timestamp,
            text: "Başka nasıl yardımcı olabilirim?",
            sender: 'bot',
            type: 'options',
            options: [
                { label: "Hizmetleri Listele", action: "list_all_services" },
                { label: "İletişim", action: "contact_human" }
            ]
          };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 800); // Biraz daha hızlı tepki süresi
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4 print:hidden">
        
        {/* WhatsApp specific button */}
        {!isOpen && (
            <a 
                href="https://wa.me/905441073492" 
                target="_blank" 
                rel="noreferrer"
                className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer relative group"
            >
                <WhatsAppIcon className="w-8 h-8 text-white" />
                <div className="absolute right-full mr-4 bg-white px-3 py-1 rounded-lg shadow-sm text-xs font-bold text-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    WhatsApp'tan Yaz
                </div>
            </a>
        )}

        {/* Main Chat Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform relative border-2 border-white/20"
        >
          {isOpen ? (
            <span className="material-icons text-white text-3xl">close</span>
          ) : (
            <>
                <span className="material-icons text-white text-3xl">smart_toy</span>
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl z-[60] flex flex-col overflow-hidden border border-slate-200 animate-fadeIn">
          
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-white/20 shadow-inner">
                    <span className="material-icons text-white text-sm">smart_toy</span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Mageros AI Asistan</h3>
                <p className="text-slate-400 text-[10px] flex items-center gap-1 uppercase tracking-wider font-semibold">
                    Çevrimiçi
                </p>
              </div>
            </div>
            <div className="flex gap-2">
                <button onClick={() => setMessages([messages[0]])} className="text-slate-400 hover:text-white transition-colors" title="Sohbeti Temizle">
                    <span className="material-icons text-sm">refresh</span>
                </button>
                <a href="https://wa.me/905441073492" target="_blank" className="bg-[#25D366] hover:bg-[#128C7E] text-white p-2 rounded-full transition-colors shadow-sm flex items-center justify-center">
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                </a>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Options Area */}
          <div className="p-3 bg-white border-t border-slate-100 shrink-0">
            {messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].options && !isTyping ? (
              <div className="flex flex-wrap gap-2 justify-end max-h-[140px] overflow-y-auto custom-scrollbar">
                {messages[messages.length - 1].options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(opt.action, opt.label)}
                    className="bg-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border border-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 text-left"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : !isTyping && (
                <div className="text-center text-xs text-slate-400 py-2">
                    Mageros AI sizin için düşünüyor...
                </div>
            )}
          </div>

        </div>
      )}
    </>
  );
};
