import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getIntials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n.at(0))
    .join("")
    .toUpperCase();
};
