import Link from "next/link";
import { getPost, posts } from "@/content/posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Yazı bulunamadı" };
  return { title: post.title, description: post.excerpt };
}

export default async function YaziPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const paragraphs = post.body.split("\n\n").filter(Boolean);

  return (
    <article className="min-h-screen bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/yazilar"
          className="text-sm text-muted hover:text-foreground"
        >
          ← Yazılar
        </Link>
        <time className="mt-8 block font-mono text-xs text-accent uppercase tracking-wider">
          {post.date}
        </time>
        <h1 className="font-display mt-4 text-4xl text-foreground md:text-5xl">
          {post.title}
        </h1>
        <div className="prose-custom mt-10 space-y-6">
          {paragraphs.map((para) => (
            <p key={para.slice(0, 24)} className="text-lg leading-relaxed text-muted">
              {para}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
