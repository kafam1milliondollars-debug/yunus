# Mageros Panel - Cloud Sunucu Kurulum Rehberi

Bu rehber, React uygulamasını WordPress kurulu olan Cloud sunucunuza (DigitalOcean, Hetzner, AWS vb.) kurmak ve API anahtarlarını gizlemek için hazırlanmıştır.

## Ön Hazırlık (Kendi Bilgisayarınızda)

1.  **Uygulamayı Derleyin (Build):**
    Terminalde proje klasöründe şu komutu çalıştırın:
    ```bash
    npm run build
    ```
    Bu işlem, proje ana dizininde `dist` (veya `build`) adında bir klasör oluşturacaktır. Sunucuya sadece bu klasörün içindekileri yükleyeceğiz.

---

## Sunucu Tarafı İşlemleri (Cloud Sunucu)

WordPress sitenizin çalıştığı sunucuya SSH ile bağlanın.

### 1. Klasör Oluşturma
Uygulama dosyaları için bir dizin oluşturun:
```bash
sudo mkdir -p /var/www/mageros-panel
```

### 2. Dosyaları Yükleme
Bilgisayarınızdaki `dist` klasörünün **içindekileri**, sunucudaki `/var/www/mageros-panel` klasörüne yükleyin. (FileZilla veya SCP kullanabilirsiniz).

### 3. Nginx Kurulumu & Ayarları
Eğer sunucunuzda Nginx yoksa kurun. (WordPress varsa muhtemelen Apache veya Nginx vardır. Nginx olduğunu varsayıyoruz).

1.  Projedeki `nginx.conf.example` dosyasının içeriğini kopyalayın.
2.  Sunucuda yeni bir yapılandırma dosyası oluşturun:
    ```bash
    sudo nano /etc/nginx/sites-available/mageros-panel
    ```
3.  Kopyaladığınız içeriği buraya yapıştırın.
    *   `server_name` kısmını kendi alt alan adınızla değiştirin (örn: `panel.siteniz.com`).
    *   `BURAYA_GERCEK_API_KEY_YAZILACAK` kısmına API anahtarınızı yapıştırın.
4.  Dosyayı kaydedip çıkın (CTRL+O, Enter, CTRL+X).

### 4. Siteyi Aktif Etme
```bash
sudo ln -s /etc/nginx/sites-available/mageros-panel /etc/nginx/sites-enabled/
sudo nginx -t  # Hata kontrolü yapın
sudo systemctl restart nginx
```

### 5. SSL Sertifikası (HTTPS)
Certbot kullanarak ücretsiz SSL alın:
```bash
sudo certbot --nginx -d panel.siteniz.com
```

---

## API Gizleme Mantığı Nasıl Çalışır?

Normalde React uygulamasında:
`const response = await fetch('https://google-api.com?key=ABC12345');`
yaparsanız, kullanıcı `ABC12345` anahtarını görür.

Bu kurulumda ise React uygulamanızda isteği şöyle yapmalısınız:
`const response = await fetch('/api/ai/v1/models...');`

1.  İstek tarayıcıdan sizin sunucunuza (`panel.siteniz.com/api/ai/...`) gider.
2.  Nginx bu isteği yakalar.
3.  İçine gizlice API anahtarını ekler (`proxy_set_header`).
4.  İsteği Google'a (veya hedef servise) iletir.
5.  Cevabı alıp kullanıcıya geri döner.

**Sonuç:** Kullanıcı sadece sizin sunucunuzu görür, gerçek API anahtarını asla göremez.
