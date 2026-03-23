import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";
import { Button } from "@/components/ui";

interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir);
  return files.map((file) => ({
    slug: file.replace(".mdx", ""),
  }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });
  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-40 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-12 group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Hero Section */}
        <header className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full">
              Insight
            </span>
            <div className="flex items-center space-x-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{frontmatter.date}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>5 min read</span>
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 uppercase italic leading-none mb-10">
            {frontmatter.title}
          </h1>

          <div className="flex items-center space-x-4 mb-12 border-b border-gray-100 pb-12">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white text-[10px] font-black italic">
              JP
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                {frontmatter.author}
              </p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                AI Architect
              </p>
            </div>
          </div>

          <div className="relative aspect-[21/9] w-full rounded-[3.5rem] overflow-hidden shadow-2xl border border-gray-100">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* MDX Content */}
        <article className="prose-wrapper">{content}</article>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-100">
          <div className="p-12 bg-gray-50 rounded-[3rem] text-center">
            <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-4">
              สนใจร่วมเป็นพาร์ทเนอร์กับ JP Visual Docs?
            </h3>
            <p className="text-gray-500 text-sm font-medium mb-8 max-w-md mx-auto leading-relaxed">
              เราพร้อมสนับสนุนความถูกต้องของเอกสารและการตรวจสอบแบบดิจิทัล
              ร่วมสร้างมาตรฐานความเชื่อมั่นยุคใหม่ไปกับเรา
            </p>
            <Button
              asChild
              className="h-16 px-10 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-[10px] hover:bg-green-600 transition-all"
            >
              <Link href="/register">สมัครสมาชิกพาร์ทเนอร์</Link>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
