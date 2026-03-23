import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { BlogCard } from "@/components/ui/BlogCard";

interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
}

async function getBlogPosts() {
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

  // Sort by date descending
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-40 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 uppercase italic leading-none mb-6">
            Insights & <span className="text-gray-300">Protocols.</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] max-w-md mx-auto">
            Deep dive into AI security, document verification, and the future of
            digital trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
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
    </div>
  );
}
