
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
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-green-200 rounded-[2rem] p-8 text-center shadow-2xl shadow-green-100 animate-fadeIn">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="material-icons text-4xl text-green-600">check</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Ödeme Başarılı!</h2>
          <p className="text-slate-500 mb-8">
            <span className="text-slate-900 font-bold">{selectedPackage.name}</span> paketini başarıyla satın aldınız. Müşteri temsilcimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 mb-6 text-sm text-slate-500 border border-slate-100">
            Sipariş No: <span className="font-mono text-slate-900 font-bold">#{Math.floor(Math.random() * 1000000)}</span>
          </div>
          <button 
            onClick={onBack}
            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
          >
            Anasayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        <button onClick={onBack} className="text-slate-500 hover:text-slate-900 mb-6 flex items-center gap-2 transition-colors font-medium">
          <span className="material-icons text-sm">arrow_back</span> Geri Dön
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Güvenli Ödeme</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Payment Methods */}
          <div className="lg:col-span-2">
            
            {/* Method Selection */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={() => setPaymentMethod('credit_card')}
                className={`flex-1 p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all shadow-sm ${paymentMethod === 'credit_card' ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-md ring-2 ring-purple-100' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
              >
                <span className="material-icons text-3xl">credit_card</span>
                <span className="font-bold">Kredi Kartı</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`flex-1 p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all shadow-sm ${paymentMethod === 'bank_transfer' ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-md ring-2 ring-purple-100' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
              >
                <span className="material-icons text-3xl">account_balance</span>
                <span className="font-bold">Havale / EFT</span>
              </button>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'credit_card' && (
              <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 animate-fadeIn relative overflow-hidden shadow-lg shadow-slate-200/50">
                {processing && (
                  <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-slate-900 font-bold animate-pulse">Ödeme İşleniyor...</div>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-slate-900 mb-6">Kart Bilgileri</h3>
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-slate-500 tracking-wide">Kart Sahibi Ad Soyad</label>
                    <input 
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all" 
                      placeholder="AD SOYAD" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-slate-500 tracking-wide">Kart Numarası</label>
                    <input 
                      type="text" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all font-mono" 
                      placeholder="0000 0000 0000 0000" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-500 tracking-wide">Son Kullanma Tarihi</label>
                      <input 
                        type="text" 
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        maxLength={5}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all text-center" 
                        placeholder="AA / YY" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-500 tracking-wide">CVV</label>
                      <input 
                        type="text" 
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all text-center" 
                        placeholder="123" 
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-400/50 transform hover:scale-[1.02]">
                    {selectedPackage.price} Güvenli Öde
                  </button>
                  <div className="flex justify-center items-center gap-2 text-slate-400 text-xs mt-4">
                    <span className="material-icons text-sm">lock</span> 256-bit SSL ile şifreli ödeme
                  </div>
                </form>
              </div>
            )}

            {/* Bank Transfer Info */}
            {paymentMethod === 'bank_transfer' && (
              <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 animate-fadeIn relative overflow-hidden shadow-lg shadow-slate-200/50">
                {processing && (
                  <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-slate-900 font-bold animate-pulse">Bildirim Gönderiliyor...</div>
                  </div>
                )}

                <h3 className="text-xl font-bold text-slate-900 mb-4">Banka Havalesi Bilgileri</h3>
                <p className="text-slate-500 mb-6 text-sm">
                  Lütfen ödemeyi aşağıdaki IBAN numarasına gönderiniz. Açıklama kısmına <strong className="text-slate-900">Sipariş No</strong> yazmayı unutmayınız.
                </p>
                
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4 flex justify-between items-center group cursor-pointer hover:bg-slate-100 transition-colors">
                  <div>
                    <div className="text-xs text-slate-400">Banka Adı</div>
                    <div className="text-slate-900 font-bold">QNB Finansbank</div>
                  </div>
                  <span className="material-icons text-slate-400" onClick={() => alert("Kopyalandı")}>content_copy</span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4 flex justify-between items-center group cursor-pointer hover:bg-slate-100 transition-colors">
                  <div>
                    <div className="text-xs text-slate-400">Alıcı Adı</div>
                    <div className="text-slate-900 font-bold">Mageros Dijital Medya</div>
                  </div>
                  <span className="material-icons text-slate-400" onClick={() => alert("Kopyalandı")}>content_copy</span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 flex justify-between items-center group cursor-pointer hover:bg-slate-100 transition-colors">
                  <div>
                    <div className="text-xs text-slate-400">IBAN</div>
                    <div className="text-slate-900 font-bold font-mono tracking-wider sm:text-base text-sm">TR12 0006 2000 0001 2345 6789 01</div>
                  </div>
                  <span className="material-icons text-slate-400" onClick={() => alert("IBAN Kopyalandı")}>content_copy</span>
                </div>

                 <button 
                  type="button" 
                  onClick={handlePayment}
                  className="w-full py-4 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all"
                >
                    Ödemeyi Yaptım, Bildir
                  </button>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 sticky top-24 shadow-lg shadow-slate-200/50">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">Sipariş Özeti</h3>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h4 className="text-slate-900 font-bold">{selectedPackage.name} Paket</h4>
                   <p className="text-xs text-slate-500">Dijital Hizmet Bedeli</p>
                </div>
                <div className="text-slate-900 font-bold">{selectedPackage.price}</div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Ara Toplam</span>
                  <span>{selectedPackage.price}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>KDV (%20)</span>
                  <span>Dahil</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                <span className="text-slate-900 font-bold text-lg">Toplam</span>
                <span className="text-purple-600 font-black text-2xl">{selectedPackage.price}</span>
              </div>
              
              <div className="mt-6 text-xs text-slate-400 text-center">
                Ödeme yaparak <span className="underline cursor-pointer hover:text-slate-600">Hizmet Sözleşmesi</span>'ni kabul etmiş olursunuz.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};