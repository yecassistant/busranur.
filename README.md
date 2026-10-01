# Büşranur'un Resmi 🌸

Lavanta, şakayık ve lilyum temalı, sayfa sayfa ilerleyen flörtöz bir davet.

## Sayfalar (sırasıyla)
1. `index.html` – Resmin hazır (resim soluk görünür)
2. `davet.html` – "Bu resim elden teslim edilir… Benimle buluşur musun?" (Hayır butonu kaçar, tıklanamaz)
3. `tercih.html` – Kahve mi, yemek mi?
4. `secim.html` – Kahve / yemek çeşidi
5. `gun.html` – Gün seçimi (önümüzdeki 14 gün)
6. `saat.html` – Saat seçimi
7. `not.html` – İsteğe bağlı not
8. `bilet.html` – Resim tamamen açılır + randevu bileti + WhatsApp'tan gönder

Ortak dosyalar: `style.css` (tasarım), `app.js` (çiçekler, animasyonlar, seçenekler), `resim.jpg` (resim).

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
- **WhatsApp numarası:** `app.js` → `var PHONE = "905318864491"` (başında 90, + yok)
