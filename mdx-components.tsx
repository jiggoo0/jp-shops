import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import React from "react";

// Define the components object separately to be used in both Hook and Direct usage
export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-8 text-gray-900 leading-none">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase mt-12 mb-6 text-gray-900 border-l-4 border-green-600 pl-6">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-black uppercase mt-8 mb-4 text-gray-900">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-600 leading-relaxed mb-6 font-medium text-lg">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-none pl-0 mb-8 space-y-4">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="relative pl-8 text-gray-600 font-medium before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-2.5 before:h-2.5 before:bg-green-600 before:rounded-full">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="bg-gray-50 p-10 rounded-[2.5rem] italic text-xl text-gray-900 font-bold my-12 relative overflow-hidden border-none shadow-sm">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-green-600"></div>
      {children}
    </blockquote>
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      className="rounded-[3rem] shadow-2xl my-16 border border-gray-100"
      {...(props as ImageProps)}
      alt={props.alt || "JP Visual Docs Blog Image"}
    />
  ),
  a: ({ href, children }) => (
    <Link
      href={href as string}
      className="text-green-600 underline underline-offset-4 font-bold hover:text-green-700 transition-colors"
    >
      {children}
    </Link>
  ),
  hr: () => <hr className="my-16 border-gray-100" />,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
