/* @identity เจ้าป่า */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * รวม Class ของ Tailwind CSS อย่างมีประสิทธิภาพ ป้องกันการชนกันของ Class
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
