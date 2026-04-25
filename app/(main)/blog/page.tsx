/* @identity เจ้าป่า */
import Link from "next/link";
import { BLOG_POSTS } from "@/constants";

export default function BlogListPage() {
  return (
    <>
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold">บทความและสาระน่ารู้</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            รวมเทคนิคและข้อมูลสำคัญด้านการจัดการเอกสาร วีซ่า และสินเชื่อ
            โดยทีมงานมืออาชีพ
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="group"
              >
                <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-3 text-sm font-medium text-primary">
                    {post.date}
                  </div>
                  <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow text-sm">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 border-t pt-6 text-sm font-semibold">
                    อ่านต่อ{" "}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
