import Link from "next/link";
import { posts } from "@/content/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yazılar",
  description: "Notlar ve kısa yazılar — Emir Buğra Aydoğan",
};

export default function YazilarPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm text-muted hover:text-foreground"
        >
          ← Ana sayfa
        </Link>
        <h1 className="font-display mt-8 text-4xl text-foreground md:text-5xl">
          Yazılar
        </h1>
        <p className="mt-4 text-muted">
          Kısa notlar — fotoğraf, video ve web üzerine.
        </p>
        <ul className="mt-12 space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="border-b border-border pb-8">
                <time className="font-mono text-xs text-accent uppercase tracking-wider">
                  {post.date}
                </time>
                <h2 className="mt-2 font-display text-2xl text-foreground">
                  <Link
                    href={`/yazilar/${post.slug}`}
                    className="hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                <Link
                  href={`/yazilar/${post.slug}`}
                  className="mt-4 inline-block text-sm text-accent hover:underline"
                >
                  Oku →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
