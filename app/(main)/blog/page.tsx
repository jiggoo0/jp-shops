/* @identity เจ้าป่า */
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/data";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "คลังความรู้และกลยุทธ์ - JP-VISUAL&DOCS",
  description:
    "เจาะลึกเทคนิคการจัดการเอกสารสินเชื่อ วีซ่า และการสร้างภาพลักษณ์ระดับสากล โดยทีมงานมืออาชีพ",
};

async function BlogPostsList() {
  const posts = await getBlogPosts();
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
          <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            {post.image && (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="flex flex-grow flex-col p-6">
              <div className="mb-3 text-sm font-medium text-primary">
                {post.date}
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                {post.title}
              </h3>
              <p className="mb-6 line-clamp-3 flex-grow text-sm text-slate-600 dark:text-slate-400">
                {post.excerpt}
              </p>              <div className="flex items-center gap-2 border-t pt-6 text-sm font-semibold text-primary">
                อ่านต่อ{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}

export default function BlogListPage() {
  return (
    <>
      <section className="bg-slate-50 py-20 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            คลังความรู้และกลยุทธ์
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-800 dark:text-slate-400">
            เจาะลึกเทคนิคการจัดการเอกสารและกลยุทธ์การสร้างโปรไฟล์เพื่อความสำเร็จ
            ถ่ายทอดจากประสบการณ์จริงโดยทีมงาน{" "}
            <span className="font-bold italic text-primary">
              JP-VISUAL&DOCS
            </span>
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-96 animate-pulse rounded-2xl bg-slate-100"
                  />
                ))}
              </div>
            }
          >
            <BlogPostsList />
          </Suspense>
        </div>
      </section>
    </>
  );
}
