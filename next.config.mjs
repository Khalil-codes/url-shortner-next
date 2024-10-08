/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.supabase.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
