# Emir Buğra Aydoğan — Kişisel Tanıtım Sitesi

Fotoğraf, video ve web odaklı kişisel portföy. İletişim e-posta ve Instagram üzerinden; ticari teklif formu yok.

## Kurulum

```bash
npm install
cp .env.example .env.local
# .env.local dosyasını doldur
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000)

## Ortam değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `RESEND_API_KEY` | (İsteğe bağlı) eski mesaj API’si için |
| `TEKLIF_TO_EMAIL` | (İsteğe bağlı) |
| `TEKLIF_FROM_EMAIL` | (İsteğe bağlı) |

## İçerik düzenleme

Tüm metinler, linkler ve portföy: [`content/site.ts`](content/site.ts)

Fotoğraflar: `public/gallery/` — `01.svg` … `09.svg` dosyalarını kendi görsellerinle değiştir (`.jpg` kullanırsan `content/site.ts` içindeki yolları güncelle).

Instagram URL’sini `content/site.ts` içindeki `instagram` alanından güncelle.

## Deploy (Vercel)

1. Repoyu GitHub’a push et
2. [vercel.com](https://vercel.com) → Import → env değişkenlerini ekle
3. Deploy

## Sayfalar

| Rota | Açıklama |
|------|----------|
| `/` | Tanıtım — galeri, hakkımda, iletişim |
| `/yazilar` | Yazılar |
| `/projeler/fotograf` | Lens (konser fotoğrafı) |
| `/projeler/kahve` | Demo kafe sayfası |
| `/teklif` | Eski rota — `#iletisim`’e yönlendirir |
