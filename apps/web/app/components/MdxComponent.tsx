import React from "react";

interface MdxComponentProps {
  children: React.ReactNode;
}

export const MdxComponent: React.FC<MdxComponentProps> = ({ children }) => {
  return (
    <article
      className="prose prose-slate prose-lg max-w-none 
      prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
      prose-h1:text-5xl md:prose-h1:text-6xl prose-h1:mb-12 prose-h1:leading-none
      prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-green-600 prose-h2:pl-6
      prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-8 prose-p:font-medium
      prose-strong:text-gray-900 prose-strong:font-black
      prose-ul:list-none prose-ul:pl-0
      prose-li:relative prose-li:pl-8 prose-li:mb-4
      prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.6em] 
      prose-li:before:w-2 prose-li:before:h-2 prose-li:before:bg-green-600 prose-li:before:rounded-full
      prose-blockquote:border-l-0 prose-blockquote:bg-gray-50 prose-blockquote:p-10 prose-blockquote:rounded-[2.5rem] 
      prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-gray-900 prose-blockquote:font-bold
      prose-img:rounded-[3rem] prose-img:shadow-2xl prose-img:my-16
      selection:bg-green-600 selection:text-white
    "
    >
      {children}
    </article>
  );
};
