import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with clsx — handles conditional classes
 * and resolves conflicts (e.g., `bg-red-500 bg-blue-500` → `bg-blue-500`)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
