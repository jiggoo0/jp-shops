"use client";

import React from "react";
import Link from "next/link";

interface FooterProps {
  logo?: string;
  tagline?: string;
  links?: { label: string; href: string }[];
}

export function Footer({
  logo = "JP VISUAL DOCS.",
  tagline = "AI-Powered Professional Document Services",
  links = [],
}: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 text-center text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="font-black text-xl tracking-tighter italic text-gray-900 mb-4">
          {logo}
        </div>
        <p className="mb-6">{tagline}</p>
        <div className="flex space-x-6 justify-center">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="hover:text-gray-900 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-8">
          © {new Date().getFullYear()} {logo} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
