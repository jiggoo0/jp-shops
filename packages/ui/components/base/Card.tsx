"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  onClick,
  hoverEffect = true,
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, borderColor: "#111827" } : {}}
      className={cn(
        "bg-white p-8 rounded-2xl border border-gray-100 transition-all",
        hoverEffect && "hover:shadow-xl cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
