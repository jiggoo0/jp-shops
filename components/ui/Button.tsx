/* @identity เจ้าป่า */
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
      secondary:
        "bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20",
      outline:
        "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
      ghost: "hover:bg-slate-100 text-slate-600",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-6 py-3 text-sm font-semibold",
      lg: "px-8 py-4 text-base font-bold",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all focus:outline-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
