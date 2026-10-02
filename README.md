# Büşranur'un Resmi 🌸

Lavanta, şakayık ve lilyum temalı, sayfa sayfa ilerleyen flörtöz bir davet.

## Sayfalar (sırasıyla)
1. `index.html` – Resmin hazır (resim soluk görünür)
2. `davet.html` – "Bu resim elden teslim edilir… Benimle buluşur musun?" (Hayır butonu kaçar, tıklanamaz)
3. `tercih.html` – Kahve mi, yemek mi?
4. `secim.html` – Kahve / yemek çeşidi
5. `gun.html` – Gün seçimi (önümüzdeki 14 gün + takvimden "Başka bir gün")
6. `saat.html` – Saat seçimi (hazır saatler + "Başka bir saat")
7. `not.html` – Hazır kısa notlar + isteğe bağlı yazı
8. `bilet.html` – Resim açılır ama üstü **çiçek filigranlı** (lavanta, şakayık, lilyum); randevu bileti + WhatsApp'tan gönder. Bilet sana gelince ona kodu verirsin, kodu girince çiçekler çekilir.

Ortak dosyalar: `style.css` (tasarım), `app.js` (çiçekler, animasyonlar, seçenekler), `resim.jpg` (resim), `onizleme.jpg` (Instagram/WhatsApp link önizleme görseli).

## GitHub Pages'te yayınlama
1. GitHub'da yeni repo aç (ör. `resmin-teslimati`), **Public** olsun
2. Bu klasördeki tüm dosyaları repoya yükle (Add file → Upload files)
3. Settings → Pages → Branch: `main` / `(root)` → Save
4. Link: `https://KULLANICIADIN.github.io/resmin-teslimati/`

## Değiştirmek istersen
- **Resim:** `resim.jpg`'yi aynı isimle kendi çizimin ile değiştir (dikey, 3:4 ideal)
- **Kahve / yemek çeşitleri:** `app.js` → `/* 4 · Menü */` bölümü
- **Saatler:** `app.js` → `/* 6 · Saat */`
- **Hayır butonunun yazıları:** `app.js` → `texts` listesi
- **Link önizleme görseli:** sayfaların `<head>` kısmındaki `og:image` adresi `https://yecassistant.github.io/busranur/onizleme.jpg`. Repo adı farklıysa bu adresi düzelt.
- **Çiçek filigranı kodu:** `app.js` → `var CODE = "LAVANTA26"` satırı. Büyük/küçük harf, boşluk ve tire fark etmez. Kodu girince telefonunda hatırlanır; tekrar sormaz.
- **WhatsApp numarası:** `app.js` → `var PHONE = "905318864491"` (başında 90, + yok)
