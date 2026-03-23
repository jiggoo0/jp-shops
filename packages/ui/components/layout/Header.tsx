"use client";

import React from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logo?: string;
  navItems?: NavItem[];
  rightElement?: React.ReactNode;
}

export function Header({
  logo = "JP VISUAL DOCS.",
  navItems = [],
  rightElement,
}: HeaderProps) {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-black text-2xl tracking-tighter italic">
          {logo}
        </Link>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="hover:text-gray-900 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div>{rightElement}</div>
      </div>
    </nav>
  );
}
