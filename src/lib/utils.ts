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

export const buildFullUrl = (url: string | null) => {
  if (!url) return null;

  const baseUrl = getBaseUrl();

  return `${baseUrl}/${url}`;
};

export const getBaseUrl = () => {
  const url = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      "http://localhost:3000"
  );

  return url.host;
};
