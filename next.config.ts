import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "images.unsplash.com","firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
