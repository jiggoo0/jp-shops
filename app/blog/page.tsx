import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

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
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] max-w-md mx-auto">
            Deep dive into AI security, document verification, and the future of
            digital trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative flex flex-col h-full bg-white rounded-[3rem] border border-gray-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-[8px] font-black uppercase tracking-widest rounded-full shadow-sm">
                    {post.frontmatter.date}
                  </span>
                </div>
              </div>

              <div className="p-10 flex flex-col flex-grow">
                <h2 className="text-xl font-black tracking-tight text-gray-900 uppercase italic mb-4 leading-tight group-hover:text-green-600 transition-colors">
                  {post.frontmatter.title}
                </h2>
                <p className="text-gray-500 text-[11px] font-medium leading-relaxed mb-10 line-clamp-3">
                  {post.frontmatter.description}
                </p>

                <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-white text-[8px] font-black italic">
                      JP
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                      {post.frontmatter.author}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
