/* @identity เจ้าป่า */
import { notFound } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/schema";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { Calendar, User } from "lucide-react";
import { Metadata } from "next";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "หน้าแรก", url: siteConfig.url },
    { name: "บทความทั้งหมด", url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${slug}` },
  ]);

  let PostContent;
  try {
    const postModule = await import(`@/content/blog/${slug}.mdx`);
    PostContent = postModule.default;
  } catch (error) {
    console.error("MDX Load Error:", error);
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <header className="bg-slate-50 py-20 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-primary" />
                <span>โดย {post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {post.image && (
        <div className="container mx-auto -mt-10 px-4">
          <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-3xl border border-slate-200 shadow-2xl dark:border-zinc-800">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <article className="container prose prose-slate mx-auto max-w-3xl px-4 py-20 lg:prose-xl dark:prose-invert">
        <PostContent />
      </article>
    </>
  );
}
