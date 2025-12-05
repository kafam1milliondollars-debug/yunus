
import React, { useState } from 'react';
import { Package } from '../types';

interface PaymentPageProps {
  selectedPackage: Package | null;
  onBack: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ selectedPackage, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'bank_transfer'>('credit_card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form States
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  if (!selectedPackage) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'credit_card' && (!cardName || !cardNumber || !expiry || !cvv)) {
      alert("Lütfen tüm kart bilgilerini doldurunuz. (Demo modunda rastgele doldurabilirsiniz)");
      return;
    }

    setProcessing(true);

    // Simulate API call delay
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#0a0a0a] border border-green-500/30 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(34,197,94,0.2)] animate-fadeIn">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
            <span className="material-icons text-4xl text-white">check</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Ödeme Başarılı!</h2>
          <p className="text-gray-400 mb-8">
            <span className="text-white font-bold">{selectedPackage.name}</span> paketini başarıyla satın aldınız. Müşteri temsilcimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
          <div className="bg-gray-900 rounded-xl p-4 mb-6 text-sm text-gray-300">
            Sipariş No: <span className="font-mono text-white">#{Math.floor(Math.random() * 1000000)}</span>
          </div>
          <button 
            onClick={onBack}
            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Anasayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        <button onClick={onBack} className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition-colors">
          <span className="material-icons text-sm">arrow_back</span> Geri Dön
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Güvenli Ödeme</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Payment Methods */}
          <div className="lg:col-span-2">
            
            {/* Method Selection */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={() => setPaymentMethod('credit_card')}
                className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'credit_card' ? 'bg-purple-900/20 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'bg-[#0a0a0a] border-gray-800 text-gray-400 hover:border-gray-600'}`}
              >
                <span className="material-icons text-3xl">credit_card</span>
                <span className="font-bold">Kredi Kartı</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'bank_transfer' ? 'bg-purple-900/20 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'bg-[#0a0a0a] border-gray-800 text-gray-400 hover:border-gray-600'}`}
              >
                <span className="material-icons text-3xl">account_balance</span>
                <span className="font-bold">Havale / EFT</span>
              </button>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'credit_card' && (
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 md:p-8 animate-fadeIn relative overflow-hidden">
                {processing && (
                  <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-white font-bold animate-pulse">Ödeme İşleniyor...</div>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-white mb-6">Kart Bilgileri</h3>
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500">Kart Sahibi Ad Soyad</label>
                    <input 
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors" 
                      placeholder="AD SOYAD" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-500">Kart Numarası</label>
                    <input 
                      type="text" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors font-mono" 
                      placeholder="0000 0000 0000 0000" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-gray-500">Son Kullanma Tarihi</label>
                      <input 
                        type="text" 
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        maxLength={5}
                        className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors text-center" 
                        placeholder="AA / YY" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-gray-500">CVV</label>
                      <input 
                        type="text" 
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={3}
                        className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors text-center" 
                        placeholder="123" 
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-purple-900/40 transform hover:scale-[1.02]">
                    {selectedPackage.price} Güvenli Öde
                  </button>
                  <div className="flex justify-center items-center gap-2 text-gray-500 text-xs mt-4">
                    <span className="material-icons text-sm">lock</span> 256-bit SSL ile şifreli ödeme
                  </div>
                </form>
              </div>
            )}

            {/* Bank Transfer Info */}
            {paymentMethod === 'bank_transfer' && (
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 md:p-8 animate-fadeIn relative overflow-hidden">
                {processing && (
                  <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-white font-bold animate-pulse">Bildirim Gönderiliyor...</div>
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-4">Banka Havalesi Bilgileri</h3>
                <p className="text-gray-400 mb-6 text-sm">
                  Lütfen ödemeyi aşağıdaki IBAN numarasına gönderiniz. Açıklama kısmına <strong className="text-white">Sipariş No</strong> yazmayı unutmayınız.
                </p>
                
                <div className="bg-black border border-gray-800 rounded-xl p-4 mb-4 flex justify-between items-center group cursor-pointer hover:border-gray-600">
                  <div>
                    <div className="text-xs text-gray-500">Banka Adı</div>
                    <div className="text-white font-bold">QNB Finansbank</div>
                  </div>
                  <span className="material-icons text-gray-600" onClick={() => alert("Kopyalandı")}>content_copy</span>
                </div>

                <div className="bg-black border border-gray-800 rounded-xl p-4 mb-4 flex justify-between items-center group cursor-pointer hover:border-gray-600">
                  <div>
                    <div className="text-xs text-gray-500">Alıcı Adı</div>
                    <div className="text-white font-bold">Mageros Dijital Medya</div>
                  </div>
                  <span className="material-icons text-gray-600" onClick={() => alert("Kopyalandı")}>content_copy</span>
                </div>

                <div className="bg-black border border-gray-800 rounded-xl p-4 mb-6 flex justify-between items-center group cursor-pointer hover:border-gray-600">
                  <div>
                    <div className="text-xs text-gray-500">IBAN</div>
                    <div className="text-white font-bold font-mono tracking-wider sm:text-base text-sm">TR12 0006 2000 0001 2345 6789 01</div>
                  </div>
                  <span className="material-icons text-gray-600" onClick={() => alert("IBAN Kopyalandı")}>content_copy</span>
                </div>

                 <button 
                  type="button" 
                  onClick={handlePayment}
                  className="w-full py-4 border border-purple-500 text-purple-400 font-bold rounded-lg hover:bg-purple-900/20 transition-all"
                >
                    Ödemeyi Yaptım, Bildir
                  </button>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-4">Sipariş Özeti</h3>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h4 className="text-white font-semibold">{selectedPackage.name} Paket</h4>
                   <p className="text-xs text-gray-500">Dijital Hizmet Bedeli</p>
                </div>
                <div className="text-white font-bold">{selectedPackage.price}</div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Ara Toplam</span>
                  <span>{selectedPackage.price}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>KDV (%20)</span>
                  <span>Dahil</span>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4 flex justify-between items-center">
                <span className="text-white font-bold text-lg">Toplam</span>
                <span className="text-purple-400 font-bold text-2xl">{selectedPackage.price}</span>
              </div>
              
              <div className="mt-6 text-xs text-gray-500 text-center">
                Ödeme yaparak <span className="underline cursor-pointer hover:text-white">Hizmet Sözleşmesi</span>'ni kabul etmiş olursunuz.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
