import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBadgeColor(type: string): string {
  switch (type) {
    case "red":
      return "bg-wineRed-100 text-white-100";
    case "white":
      return "bg-gold-100 text-white-100";
    case "rosé":
      return "bg-wineRed-100/70 text-white-100";
    default:
      return "bg-deepBrown-100 text-white-100";
  }
}
