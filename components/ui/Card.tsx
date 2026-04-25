/* @identity เจ้าป่า */
import React from "react";
import { cn } from "@/lib/utils";

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
      className
    )}
  >
    {children}
  </div>
);

export const CardHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn("p-6 pb-0", className)}>{children}</div>;

export const CardContent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn("p-6", className)}>{children}</div>;

export const CardFooter = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "border-t border-slate-50 p-6 pt-0 dark:border-zinc-800",
      className
    )}
  >
    {children}
  </div>
);
