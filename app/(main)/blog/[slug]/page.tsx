/* @identity เจ้าป่า */
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/constants";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/schema";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

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
      <article className="container prose prose-slate mx-auto max-w-3xl px-4 py-20 lg:prose-xl dark:prose-invert">
        <PostContent />
      </article>
    </>
  );
}
