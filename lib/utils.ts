import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitialFromFullName(full_name: string) {
  return full_name
    .split(" ")
    .map((name) => name[0].toUpperCase())
    .join("")
    .slice(0, 2);
}
