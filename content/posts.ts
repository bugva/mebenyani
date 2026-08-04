export const posts = [
  {
    slug: "ilk-web-projem",
    title: "İlk web projemden notlar",
    date: "2025-01-08",
    excerpt:
      "Next.js, Tailwind ve küçük bir işletme sitesi — ne işe yaradı, ne öğrendim.",
    body: `İlk müşteri projemde en büyük ders: önce içerik, sonra tasarım.

Müşteri ne istediğini söyleyince hemen renk seçmeye başlamak yerine, hedef kitleyi ve tek CTA'yı netleştirdik. Sonuç: tek sayfa, hızlı yükleme, mobilde rahat menü.

Teknik tarafta Next.js App Router ve Tailwind ile çalıştım. Form için embed kullandım — kişisel sitede de aynı altyapıyı kullanıyorum.

Sonraki adım: gerçek fotoğraflar ve domain. Ama iskelet hazır.`,
  },
] as const;

export type Post = (typeof posts)[number];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
