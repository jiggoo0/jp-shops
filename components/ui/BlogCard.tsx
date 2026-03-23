import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  author: string;
  category?: string;
  readTime?: string;
}

export const BlogCard = ({
  slug,
  title,
  description,
  date,
  image,
  author,
  category = "Insight",
  readTime = "5 min read",
}: BlogCardProps) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative flex flex-col h-full bg-white rounded-[3rem] border border-gray-100 overflow-hidden hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 ease-out"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Floating Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-[8px] font-black uppercase tracking-widest rounded-full shadow-sm self-start">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-10 flex flex-col flex-grow relative">
        <div className="flex items-center space-x-4 mb-6 text-gray-400 text-[9px] font-black uppercase tracking-widest">
          <span className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-green-600" />
            <span>{date}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{readTime}</span>
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 uppercase italic mb-4 leading-[1.1] group-hover:text-green-600 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-500 text-[11px] font-medium leading-relaxed mb-10 line-clamp-3">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-[9px] font-black italic border-2 border-white shadow-sm">
              JP
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-900 leading-none mb-1">
                {author}
              </p>
              <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                AI ARCHITECT
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 group/btn">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover/btn:text-gray-900 transition-colors">
              Read Protocol
            </span>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
