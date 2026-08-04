export const kafe = {
  name: "Demle Kahve",
  tagline: "Ankara · sıcak fincan, sakin köşe",
  description:
    "Tek fincan kahve için durulacak bir yer. Çekirdekten demleme, ev yapımı tatlılar ve gün boyu sakin ışık.",
  nav: [
    { label: "Hikâye", href: "#hikaye" },
    { label: "Menü", href: "#menu" },
    { label: "Saatler", href: "#saatler" },
    { label: "Konum", href: "#konum" },
  ],
  story: {
    title: "Neden Demle?",
    text: "2023'te küçük bir sokak dükkânında başladık. Amacımız zincir hızında değil; her fincanın özenle hazırlanması. Çekirdekleri yerel kavuruculardan alıyor, mevsimsel tatlıları kendi mutfağımızda üretiyoruz.",
  },
  menu: [
    {
      category: "Sıcak",
      items: [
        { name: "Espresso", price: "70 ₺", note: "Tek / çift" },
        { name: "Americano", price: "85 ₺" },
        { name: "Latte", price: "110 ₺", note: "Bitkisel süt +15 ₺" },
        { name: "Cortado", price: "95 ₺" },
        { name: "Filtre Kahve", price: "90 ₺", note: "Günün çekirdeği" },
      ],
    },
    {
      category: "Soğuk",
      items: [
        { name: "Cold Brew", price: "115 ₺" },
        { name: "Buzlu Latte", price: "120 ₺" },
        { name: "Limonata", price: "80 ₺", note: "Ev yapımı" },
      ],
    },
    {
      category: "Tatlı & atıştırmalık",
      items: [
        { name: "Cheesecake", price: "130 ₺", note: "Günlük" },
        { name: "Brownie", price: "95 ₺" },
        { name: "Kruvasan", price: "75 ₺", note: "Tereyağlı" },
        { name: "Granola kase", price: "140 ₺" },
      ],
    },
  ],
  hours: [
    { days: "Pazartesi – Cuma", time: "08:00 – 22:00" },
    { days: "Cumartesi", time: "09:00 – 23:00" },
    { days: "Pazar", time: "09:00 – 21:00" },
  ],
  location: {
    address: "Kızılay, Güvenlik Cd. No: 12, Çankaya / Ankara",
    mapUrl: "https://maps.google.com/?q=Kizilay+Ankara",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0!2d32.8597!3d39.9208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU1JzE0LjkiTiAzMsKwNTEnMzQuOSJF!5e0!3m2!1str!2str!4v1",
    note: "Metro: Kızılay — 4 dk yürüme",
  },
  whatsapp: {
    label: "WhatsApp sipariş",
    href: "https://wa.me/905551234567?text=Merhaba%2C%20sipari%C5%9F%20vermek%20istiyorum.",
  },
  features: [
    {
      title: "Özel kavrum",
      description: "Çekirdekler her hafta küçük partiler halinde gelir.",
    },
    {
      title: "Sakin köşe",
      description: "Gürültüsüz ortam — ders, kitap veya sohbet için.",
    },
    {
      title: "Ev yapımı",
      description: "Tatlılar ve granola günlük mutfaktan çıkar.",
    },
  ],
  heroImage: "/kafe/hero-visual.svg",
  credit: {
    text: "Bu site örnek bir portföy çalışmasıdır.",
    author: "Emir Buğra Aydoğan",
    authorUrl: "/",
  },
} as const;
