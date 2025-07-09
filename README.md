# Effe Mimarlık Web Sitesi

Modern, duyarlı (responsive) ve kullanıcı dostu mimarlık ofisi web sitesi.

## Özellikler

- **Modern Tasarım**: Temiz ve profesyonel görünüm
- **Duyarlı Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Hızlı Yükleme**: Optimize edilmiş kod ve görseller
- **SEO Uyumlu**: Arama motorları için optimize edilmiş
- **Etkileşimli Galeri**: Proje görselleri için modal galeri
- **Video Desteği**: HTML5 video oynatıcı ile proje tanıtımları

## Sayfalar

1. **Ana Sayfa (index.html)**
   - Hero slider ile proje görselleri
   - Hakkımızda bölümü
   - Projeler önizleme
   - Staj başvuru bölümü

2. **Projeler (projeler.html)**
   - 5 ana proje: Hill Garden, Bein Tisan, Saya Park, Lotus Park, Sezin Hanım
   - Her proje için galeri (maksimum 10 görsel)
   - Konum bilgileri
   - Proje açıklamaları

3. **Galeri & Video (galeri.html)**
   - Yüksek çözünürlüklü fotoğraf galerisi
   - 4 adet proje videosu
   - Modal görüntüleme sistemi

4. **Ekibimiz (ekibimiz.html)**
   - Mimar Baki Efe Uysal profili
   - Staj programı detayları
   - Mezun programı bilgileri

5. **İletişim (iletisim.html)**
   - İletişim bilgileri
   - Google Maps entegrasyonu
   - İletişim formu
   - Hizmet alanları

## Teknolojiler

- **HTML5**: Modern ve semantik markup
- **CSS3**: Flexbox, Grid, animasyonlar
- **JavaScript (ES6+)**: Modern syntax ve özellikler
- **Google Fonts**: Inter font ailesi
- **Responsive Design**: Mobile-first yaklaşım

## Kurulum

1. Projeyi indirin veya klonlayın
2. `görseller/` klasörüne proje görsellerini ekleyin
3. `videolar/` klasörüne video dosyalarını ekleyin
4. Web sunucusunda çalıştırın

## Dosya Yapısı

```
EFFEMİMARLIK/
├── index.html
├── projeler.html
├── galeri.html
├── ekibimiz.html
├── iletisim.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── görseller/
│   ├── logo.png
│   ├── Baki_Efe_Uysal.jpg
│   ├── hill-garden-1.jpg
│   ├── bein-tisan-1.jpg
│   ├── saya-park-1.jpg
│   ├── lotus-park-1.jpg
│   ├── sezin-hanim-1.jpg
│   └── [diğer proje görselleri]
├── videolar/
│   ├── hill-garden-tanitim.mp4
│   ├── bein-tisan-proje.mp4
│   ├── saya-park-animasyon.mp4
│   └── lotus-park-sanal-tur.mp4
├── sitemap.xml
├── robots.txt
└── README.md
```

## Gerekli Görseller

### Logo
- `logo.png` - Şirket logosu

### Ekip Fotoğrafları
- `Baki_Efe_Uysal.jpg` - Kurucu mimar fotoğrafı
- `team-placeholder.jpg` - Gelecek ekip üyeleri için placeholder

### Proje Görselleri
Her proje için 8 adet görsel:
- `hill-garden-1.jpg` - `hill-garden-8.jpg`
- `bein-tisan-1.jpg` - `bein-tisan-8.jpg`
- `saya-park-1.jpg` - `saya-park-8.jpg`
- `lotus-park-1.jpg` - `lotus-park-8.jpg`
- `sezin-hanim-1.jpg` - `sezin-hanim-8.jpg`

### Video Dosyaları
- `hill-garden-tanitim.mp4` - Hill Garden tanıtım videosu
- `bein-tisan-proje.mp4` - Bein Tisan proje videosu
- `saya-park-animasyon.mp4` - Saya Park animasyon
- `lotus-park-sanal-tur.mp4` - Lotus Park sanal tur

## Özelleştirme

### Renk Değişiklikleri
CSS dosyasındaki ana renk değişkenleri:
- `#2c3e50` - Koyu mavi (başlıklar)
- `#3498db` - Açık mavi (linkler, butonlar)
- `#f8f9fa` - Açık gri (arkaplanlar)

### İletişim Bilgileri
`iletisim.html` dosyasında:
- Telefon numarası
- E-posta adresi
- Ofis adresi
- Google Maps koordinatları

## Deployment

### Netlify Deploy
1. Proje klasörünü Netlify'a sürükleyin
2. Domain ayarlarını yapın
3. SSL otomatik olarak etkinleştirilir

### Vercel Deploy
1. Proje klasörünü Vercel'e yükleyin
2. Ayarları yapın
3. Deploy edin

### Bolt.new Deploy
1. Proje dosyalarını Bolt.new'e yükleyin
2. Önizleme yapın
3. Yayınlayın

## Performans Optimizasyonu

- Görseller WebP formatında optimize edilmeli
- Lazy loading uygulanmış
- CSS ve JS dosyları minify edilmeli
- Gzip sıkıştırma kullanılmalı

## SEO Ayarları

- Her sayfada benzersiz title ve description
- Semantic HTML kullanımı
- Görsel alt text'leri
- Sitemap.xml mevcut
- Robots.txt yapılandırılmış

## Destek

Teknik destek için: info@effemimarlik.com

---

**Effe Mimarlık** - Modern mimarlık çözümleri
