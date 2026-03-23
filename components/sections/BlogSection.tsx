import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { BlogCard } from "@/components/ui/BlogCard";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";

interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
}

async function getLatestPosts(limit = 3) {
  const contentDir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir);

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(".mdx", "");
      const source = fs.readFileSync(path.join(contentDir, file), "utf8");
      const { frontmatter } = await compileMDX<PostFrontmatter>({
        source,
        options: { parseFrontmatter: true },
      });
      return {
        slug,
        frontmatter,
      };
    }),
  );

  // Sort by date descending and limit
  return posts
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    )
    .slice(0, limit);
}

export default async function BlogSection() {
  const latestPosts = await getLatestPosts();

  if (latestPosts.length === 0) return null;

  return (
    <Section className="py-32 bg-[#FDFDFD] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-green-50/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-[-10%] w-[30%] h-[30%] bg-gray-50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 mb-8">
              <span className="w-16 h-1 bg-green-500 rounded-full"></span>
              <span className="text-gray-900 text-[10px] font-black uppercase tracking-[0.4em] flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-3 text-green-600 animate-pulse" />
                Latest Protocols & Insights
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 uppercase italic leading-[0.85]">
              Elite{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
                Insights.
              </span>
            </h2>
            <p className="text-gray-700 text-xl font-bold mt-10 max-w-xl leading-relaxed italic bg-gray-50/50 px-6 py-4 rounded-2xl border border-gray-100">
              &quot;เกาะติดเทรนด์การจัดการเอกสารยุคใหม่และเทคโนโลยีความปลอดภัย
              เพื่อยกระดับความแม่นยำและความน่าเชื่อถือให้กับคุณ&quot;
            </p>
          </div>

          <div className="mt-12 md:mt-0">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-5 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-all duration-500 group"
            >
              <span className="border-b-2 border-transparent group-hover:border-green-500 pb-1">
                Explore All Insights
              </span>
              <div className="w-14 h-14 rounded-2xl border border-gray-100 flex items-center justify-center bg-white shadow-sm group-hover:bg-gray-900 group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.frontmatter.title}
              description={post.frontmatter.description}
              date={post.frontmatter.date}
              image={post.frontmatter.image}
              author={post.frontmatter.author}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
