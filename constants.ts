
import { CategoryData } from './types';

export const pricingData: CategoryData[] = [
  {
    id: 'web-tasarim',
    label: 'Web Tasarım',
    icon: '💻',
    shortDesc: 'Markanızı dijital dünyada en iyi yansıtan, modern, hızlı ve mobil uyumlu web siteleri tasarlıyoruz.',
    packages: [
      { name: 'Kurumsal', price: '₺19.000', period: '/tek sefer', isPopular: false },
      { name: 'Profesyonel', price: '₺39.000', period: '/tek sefer', isPopular: true, highlightColor: 'blue' },
      { name: 'Premium & Özel', price: 'FİYAT AL', period: '/tek sefer', isPopular: false },
    ],
    features: [
      { name: 'Domain (Alan Adı) & Hosting', values: ['1 Yıl Hediye', '1 Yıl Hediye', '2 Yıl Hediye (VPS)'] },
      { name: 'Arayüz Tasarımı (UI/UX)', values: ['Modern Şablon', 'Özel Tasarım', 'Kişiye Özel Premium UI'] },
      { name: 'Mobil Uyumluluk (Responsive)', values: [true, true, true] },
      { name: 'Yönetim Paneli (CMS)', values: ['Standart', 'Gelişmiş', 'Özel Yazılım Panel'] },
      { name: 'Sayfa Sayısı', values: ['5 Sayfaya Kadar', '10 Sayfaya Kadar', 'Sınırsız'] },
      { name: 'SEO Altyapı Kurulumu', values: ['Temel', 'Kapsamlı', 'İleri Düzey + Schema'] },
      { name: 'Kurumsal E-Posta Kurulumu', values: ['1 Adet', '5 Adet', 'Bilgi Al'] },
      { name: 'İletişim & WhatsApp Modülü', values: [true, true, true] },
      { name: 'Çoklu Dil Desteği', values: [false, '2 Dil', 'Bilgi Al'] },
      { name: 'Blog / Haberler Modülü', values: [false, true, true] },
      { name: 'Google Haritalar Kaydı', values: [true, true, true] },
      { name: 'Teknik Destek & Bakım', values: ['1 Ay', '6 Ay', '1 Yıl VIP'] },
    ]
  },
  {
    id: 'e-ticaret',
    label: 'E-Ticaret',
    icon: 'shopping_cart',
    shortDesc: 'Ürünlerinizi 7/24 satabileceğiniz, güvenli ödeme altyapısına sahip güçlü e-ticaret mağazaları kuruyoruz.',
    packages: [
      { name: 'Girişimci', price: '₺49.000', period: '/yıllık', isPopular: false },
      { name: 'Büyüme', price: '₺89.000', period: '/yıllık', isPopular: true, highlightColor: 'purple' },
      { name: 'Global ', price: 'Fiyat Al', period: '/yıllık', isPopular: false },
    ],
    features: [
      { name: 'Altyapı & Kurulum', values: ['Hazır Sistem', 'WooCommerce / Shopify', 'Özel / İdeasoft / İkas'] },
      { name: 'Tasarım Özelleştirme', values: ['Logo & Renkler', 'Kategori & Bannerlar', 'Full Konsept Tasarım'] },
      { name: 'Sanal POS (Ödeme) Entegrasyonu', values: ['iyzico/PayTR', 'Tüm Bankalar', 'Global (Stripe vb.)'] },
      { name: 'Kargo & Lojistik Entegrasyonu', values: [true, true, true] },
      { name: 'Ürün Yükleme Desteği', values: ['50 Ürün', '250 Ürün', 'Sınırsız / XML'] },
      { name: 'Pazaryeri Entegrasyonu (Trendyol vb.)', values: [false, '2 Mağaza', '5 Mağaza'] },
      { name: 'Stok & Sipariş Yönetimi', values: ['Manuel', 'Otomatik Panel', 'Gelişmiş ERP Bağlantısı'] },
      { name: 'Hediye Çeki & Promosyon Modülü', values: [true, true, true] },
      { name: 'Üyelik & Müşteri Paneli', values: [true, true, true] },
      { name: 'E-Fatura Entegrasyonu', values: [false, true, true] },
      { name: 'Sosyal Medya Mağaza (Insta Shop)', values: [false, true, true] },
      { name: 'Yönetim Paneli Eğitimi', values: ['Video Eğitim', 'Online Birebir', 'Yerinde Eğitim'] },
    ]
  },
  {
    id: 'e-ihracat',
    label: 'E-İhracat',
    icon: 'public',
    shortDesc: 'Sınırları kaldırın. Ürünlerinizi döviz ile dünyaya satmanız için gerekli tüm altyapı ve danışmanlığı sağlıyoruz.',
    packages: [
      { name: 'Mikro İhracat', price: '149.000', period: '/proje', isPopular: false },
      { name: 'Global ', price: '199.000', period: '/proje', isPopular: true, highlightColor: 'pink' },
      { name: 'Export', price: 'FİYAT AL', period: '/proje', isPopular: false },
    ],
    features: [
      { name: 'Hedef Pazar Analizi', values: ['Bölgesel', 'Kıtasal', 'Global'] },
      { name: 'Yurtdışı Pazaryeri Kurulumu (Amazon/Etsy)', values: ['1 Platform', '3 Platform', '5 Platform + FBA'] },
      { name: 'Gümrük & Lojistik Danışmanlığı', values: ['Temel Bilgi', 'Süreç Yönetimi', 'Birebir Operasyon'] },
      { name: 'Çoklu Para Birimi & Dil Ayarları', values: [true, true, true] },
      { name: 'Yurtdışı Ödeme Sistemleri (PayPal/Stripe)', values: ['Danışmanlık', 'Kurulum Desteği', 'Tam Entegrasyon'] },
      { name: 'Global Dijital Pazarlama Stratejisi', values: [false, 'Google Ads Global', '360° Global Ads'] },
      { name: 'Devlet Teşvikleri Danışmanlığı', values: [false, true, true] },
      { name: 'Yurtdışı Şirketleşme Rehberliği', values: [false, false, true] },
    ]
  },
  {
    id: 'pazaryeri-entegrasyon',
    label: 'Pazaryeri Entegrasyon',
    icon: 'hub',
    shortDesc: 'Trendyol, Hepsiburada, N11 ve Amazon mağazalarınızı tek panelden yönetin. Stok, fiyat ve sipariş süreçlerini otomatikleştirin.',
    packages: [
      { name: 'Başlangıç', price: '₺29.000', period: '/yıllık', isPopular: false },
      { name: 'Tam Otomasyon', price: '₺49.000', period: '/yıllık', isPopular: true, highlightColor: 'blue' },
      { name: 'Global Entegratör', price: 'Fiyat Al', period: '/yıllık', isPopular: false },
    ],
    features: [
      { name: 'Desteklenen Pazaryerleri', values: ['Trendyol + 1 Seçim', 'Trendyol, HB, N11', 'Tüm Yerli + Amazon TR'] },
      { name: 'Stok & Fiyat Senkronizasyonu', values: ['15 Dakika', 'Anlık (Real-time)', 'Anlık + Global Kur'] },
      { name: 'Otomatik Faturalandırma (E-Fatura)', values: [false, true, true] },
      { name: 'Kargo Barkodu Oluşturma', values: ['Manuel Tetikleme', 'Otomatik', 'Otomatik + Takip'] },
      { name: 'Buybox (Rekabet) Analizi', values: [false, 'Temel Analiz', 'Akıllı Oto-Fiyat Motoru'] },
      { name: 'Toplu Ürün Yükleme (XML)', values: [true, true, true] },
      { name: 'Tek Ekrandan Sipariş Yönetimi', values: [true, true, true] },
      { name: 'Müşteri Soruları & Mesajlaşma', values: [false, true, true] },
    ]
  },
  {
    id: 'veritabani',
    label: 'Veritabanı & DBA',
    icon: 'storage',
    shortDesc: 'Verilerinizi güvenle saklayın. SQL ve NoSQL veritabanlarınız için kurulum, bakım, yedekleme ve performans optimizasyonu.',
    packages: [
      { name: 'Startup DB', price: '₺39.000', period: '/ay', isPopular: false },
      { name: 'Enterprise DBA', price: '₺59.000', period: '/ay', isPopular: true, highlightColor: 'blue' },
      { name: 'High Availability', price: 'Fiyat Al', period: '/proje', isPopular: false },
    ],
    features: [
      { name: 'Kurulum & Yapılandırma', values: ['Tek Sunucu', 'Master-Slave', 'Cluster Yapısı'] },
      { name: 'Veritabanı Türleri', values: ['MySQL/PostgreSQL', 'SQL + NoSQL', 'Tüm Platformlar'] },
      { name: 'Yedekleme (Backup) Stratejisi', values: ['Günlük', 'Anlık (PITR)', 'Geo-Redundant'] },
      { name: 'Performans Tuning', values: ['Temel İndeks', 'Sorgu Analizi', 'Derinlemesine Tuning'] },
      { name: '7/24 İzleme & Alarm', values: [false, true, true] },
      { name: 'Güvenlik & Audit', values: ['Temel', 'Gelişmiş', 'KVKK/GDPR Uyumlu'] },
      { name: 'Veri Göçü (Migration)', values: [false, 'Dahil', 'Dahil'] },
      { name: 'Disaster Recovery (Felaket Kurtarma)', values: [false, false, true] },
    ]
  },
  {
    id: 'dijital-pazarlama',
    label: 'Dijital Pazarlama',
    icon: 'campaign',
    shortDesc: 'Doğru hedef kitleye, doğru zamanda ulaşın. Sosyal medya ve Google reklamları ile satışlarınızı artırın.',
    packages: [
      { name: 'Start', price: '₺29.000', period: '/ay', isPopular: false },
      { name: 'Scale', price: '₺59.000', period: '/ay', isPopular: true, highlightColor: 'blue' },
      { name: 'Premium', price: 'Fiyat Al', period: '/ay', isPopular: false },
    ],
    features: [
      { name: 'Sosyal Medya Yönetimi', values: ['2 Platform', '3 Platform', '5 Platform'] },
      { name: 'Aylık İçerik Planı', values: ['8 Post', '12 Post + 8 Story', '20 Post + 20 Story'] },
      { name: 'Reels / Video Kurgu', values: [false, '4 Reels', '8 Reels + Prodüksiyon'] },
      { name: 'Meta Ads (Facebook/Instagram) Yönetimi', values: ['Bütçe Planlama', 'Gelişmiş Hedefleme', 'Dönüşüm Odaklı (ROAS)'] },
      { name: 'Google Ads (Arama/Görüntülü) Yönetimi', values: [false, true, true] },
      { name: 'Remarketing (Yeniden Pazarlama)', values: [false, true, true] },
      { name: 'Influencer Marketing Kurgusu', values: [false, false, true] },
      { name: 'Aylık Performans Raporu', values: ['Özet', 'Detaylı', 'Toplantı ile Sunum'] },
    ]
  },
  {
    id: 'seo',
    label: 'S.E.O',
    icon: 'search',
    shortDesc: 'Google\'da ilk sayfada olun. Organik trafiğinizi artırarak reklam maliyetlerinizi düşürün.',
    packages: [
      { name: 'Scale SEO', price: '₺19.000', period: '/ay', isPopular: false },
      { name: 'Expert  SEO', price: '₺39.000', period: '/ay', isPopular: true, highlightColor: 'purple' },
      { name: 'Pro  SEO', price: '₺Fiyat Al', period: '/ay', isPopular: false },
    ],
    features: [
      { name: 'Site İçi (On-Page) Optimizasyon', values: [true, true, true] },
      { name: 'Teknik SEO & Hız Optimizasyonu', values: ['Temel', 'Gelişmiş', 'Tam Kapsamlı'] },
      { name: 'Anahtar Kelime Araştırması', values: ['20 Kelime', '100 Kelime', 'Sınırsız'] },
      { name: 'İçerik & Blog Stratejisi', values: ['2 Makale/Ay', '4 Makale/Ay', '8 Makale + PR'] },
      { name: 'Backlink (Off-Page) Çalışmaları', values: ['Başlangıç', 'Otoriter Kaynaklar', 'Premium Haber Siteleri'] },
      { name: 'Google Haritalar (Local SEO)', values: [true, true, true] },
      { name: 'Rakip & Sektör Analizi', values: [false, true, true] },
      { name: 'Haftalık Sıralama Takibi', values: [false, true, true] },
      { name: 'Google Search Console Yönetimi', values: [true, true, true] },
    ]
  },
  {
    id: 'danismanlik',
    label: 'Danışmanlık',
    icon: 'school',
    shortDesc: 'İşletmenizin dijital röntgenini çekiyor, büyümeniz için gereken yol haritasını sizinle birlikte çiziyoruz.',
    packages: [
      { name: 'Saatlik', price: '₺2.500', period: '/saat', isPopular: false },
      { name: 'Aylık Mentörlük', price: '₺15.000', period: '/ay', isPopular: true, highlightColor: 'pink' },
      { name: 'Proje Bazlı', price: 'Teklif Alın', period: '/proje', isPopular: false },
    ],
    features: [
      { name: 'Mevcut Durum Analizi (Check-up)', values: [true, true, true] },
      { name: 'Dijital Dönüşüm Stratejisi', values: [false, true, true] },
      { name: 'Marka Konumlandırma', values: ['Yüzeysel', 'Detaylı', 'Full Strateji'] },
      { name: 'Bütçe & Kaynak Yönetimi', values: [false, true, true] },
      { name: 'Ekip Eğitimi', values: [false, 'Yönlendirme', 'Uzaktan'] },
      { name: 'Kriz Yönetimi Danışmanlığı', values: [false, true, true] },
      { name: 'Haftalık İlerleme Toplantıları', values: [false, 'Online', 'Online/Yüz Yüze'] },
    ]
  },
  {
    id: 'mageros-akademi',
    label: 'Mageros Akademi',
    icon: 'menu_book',
    shortDesc: 'Kendi ekibinizi yetiştirin veya kendinizi geliştirin. Sektör profesyonellerinden uygulamalı eğitimler.',
    packages: [
      { name: 'Video Eğitim', price: '₺10.000', period: '/paket', isPopular: false },
      { name: 'Bootcamp', price: '₺20.000', period: '/6 hafta', isPopular: true, highlightColor: 'blue' },
      { name: 'Birebir Eğitim', price: 'Fiyat Al', period: '/kişi', isPopular: false },
    ],
    features: [
      { name: 'Eğitim Kapsamı', values: ['Temel Seviye', 'İleri Seviye', 'Masterclass'] },
      { name: 'E-Ticaret & Pazarlama Dersleri', values: ['10 Saat Video', '30 Saat Canlı', '40 Saat Özel'] },
      { name: 'Uygulamalı Atölye Çalışmaları', values: [false, true, true] },
      { name: 'Soru-Cevap & Mentorluk', values: ['Topluluk Grubu', 'Haftalık Canlı', '7/24 Birebir'] },
      { name: 'Doküman & Kaynak Kütüphanesi', values: [true, true, true] },
      { name: 'Bitirme Sertifikası', values: ['Dijital', 'Basılı & Dijital', 'Özel'] },
      { name: 'Kariyer & Staj Desteği', values: [false, true, true] },
    ]
  },
  {
    id: 'kurumsal-kimlik',
    label: 'Kurumsal Kimlik',
    icon: 'palette',
    shortDesc: 'Akılda kalıcı bir marka yaratın. Logo, renk paleti ve tüm kurumsal materyalleriniz bir bütün olsun.',
    packages: [
      { name: 'Startup', price: '₺15.000', period: '/tek sefer', isPopular: false },
      { name: 'Prestij', price: '₺30.000', period: '/tek sefer', isPopular: true, highlightColor: 'purple' },
      { name: 'Marka İnşası', price: '₺Fiyat Al', period: '/tek sefer', isPopular: false },
    ],
    features: [
      { name: 'Logo Tasarımı', values: ['2 Alternatif', '3 Alternatif', '5 Alternatif'] },
      { name: 'Renk Paleti & Tipografi', values: [true, true, true] },
      { name: 'Kurumsal Evraklar (Kartvizit, Antetli vb.)', values: ['3 Parça', '5 Parça', 'Tüm Set'] },
      { name: 'Marka Rehberi (Brandbook)', values: [false, 'Mini Rehber', 'Kapsamlı Rehber'] },
      { name: 'Sosyal Medya Kit (Profil & Kapak)', values: [false, true, true] },
      { name: 'Sunum Şablonu Tasarımı', values: [false, true, true] },
      { name: 'Promosyon Ürün Tasarımları', values: [false, false, true] },
      { name: 'Revize Hakkı', values: ['2 Tur', '3 Tur', 'Sınırsız'] },
    ]
  },
  {
    id: 'mobil-uygulama',
    label: 'Mobil Uygulama',
    icon: 'smartphone',
    shortDesc: 'Müşterilerinizin cebine girin. iOS ve Android uyumlu, kullanıcı dostu mobil uygulamalar geliştiriyoruz.',
    packages: [
      { name: 'MVP', price: '₺60.000', period: '/proje', isPopular: false },
      { name: 'Business', price: '₺120.000', period: '/proje', isPopular: true, highlightColor: 'pink' },
      { name: 'Enterprise', price: 'Teklif Alın', period: '/proje', isPopular: false },
    ],
    features: [
      { name: 'Platform', values: ['iOS veya Android', 'Hybrid (Flutter/RN)', 'Native (Swift/Kotlin)'] },
      { name: 'UI/UX Tasarımı', values: ['Standart', 'Özel Tasarım', 'Premium UX Araştırmalı'] },
      { name: 'Yönetim Paneli (Admin)', values: [true, true, true] },
      { name: 'API Entegrasyonları', values: ['Temel', 'Gelişmiş', 'Tam Kapsamlı'] },
      { name: 'Bildirim Sistemi (Push Notification)', values: [true, true, true] },
      { name: 'Ödeme Altyapısı', values: [false, true, true] },
      { name: 'Mağaza Yayınlama (Store)', values: ['Danışmanlık', 'Biz Yayınlıyoruz', 'Biz Yayınlıyoruz'] },
      { name: 'Bakım ve Hata Düzeltme', values: ['1 Ay', '6 Ay', '1 Yıl'] },
    ]
  },
  {
    id: 'fotograf',
    label: 'Fotoğraf',
    icon: 'photo_camera',
    shortDesc: 'Ürünlerinizi en iyi şekilde sunun. Profesyonel ekipmanlarla stüdyo veya dış çekim hizmetleri.',
    packages: [
      { name: 'Ürün Çekimi', price: '₺25.000', period: '/gün', isPopular: false },
      { name: 'Konsept', price: '₺42.000', period: '/gün', isPopular: true, highlightColor: 'blue' },
      { name: 'Katalog', price: '₺Fiyat Al', period: '/gün', isPopular: false },
    ],
    features: [
      { name: 'Çekim Türü', values: ['Beyaz Fon (E-Ticaret)', 'Styling & Konsept', 'Mekan & Model'] },
      { name: 'Teslim Edilen Kare', values: ['20 Kare', '50 Kare', '100+ Kare'] },
      { name: 'Retouch & Düzenleme', values: [true, true, true] },
      { name: 'Model & Manken Kullanımı', values: [false, 'Opsiyonel', 'Dahil'] },
      { name: 'Stüdyo / Mekan', values: ['Stüdyo', 'Stüdyo veya Dış', 'Özel Lokasyon'] },
      { name: 'Video Backstage (Kamera Arkası)', values: [false, true, true] },
      { name: 'Sosyal Medya Boyutlandırma', values: [false, true, true] },
    ]
  },
  {
    id: 'produksiyon',
    label: 'Prodüksiyon',
    icon: 'movie',
    shortDesc: 'Hikayenizi videoya dönüştürüyoruz. Reklam, tanıtım ve sosyal medya içerikleri için profesyonel prodüksiyon.',
    packages: [
      { name: 'Reels Paket', price: '₺40.000', period: '/proje', isPopular: false },
      { name: 'Tanıtım Filmi', price: '₺70.000', period: '/proje', isPopular: true, highlightColor: 'purple' },
      { name: 'Reklam Filmi', price: '₺Fiyat Al', period: '/proje', isPopular: false },
    ],
    features: [
      { name: 'Çekim Süresi', values: ['Yarım Gün', '1 Tam Gün', '2+ Gün'] },
      { name: 'Ekipman Kalitesi', values: ['Sony A7SIII / FX3', 'Red Komodo / FX6', 'Arri Alexa Mini'] },
      { name: 'Senaryo & Metin Yazımı', values: [false, true, true] },
      { name: 'Kurgu & Montaj (Post)', values: [true, true, true] },
      { name: 'Ses Tasarımı & Mix', values: [false, true, true] },
      { name: 'Drone Çekimi', values: [false, 'Opsiyonel', 'Dahil'] },
      { name: 'Format', values: ['Dikey (9:16)', 'Yatay (16:9)', 'Tüm Formatlar'] },
      { name: 'Revize Hakkı', values: ['1 Tur', '2 Tur', 'Sınırsız'] },
    ]
  }
];
