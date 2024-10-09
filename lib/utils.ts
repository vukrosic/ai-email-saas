import { type ClassValue, clsx } from "clsx"
import { defineRateLimits } from "convex-helpers/server/rateLimit";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}