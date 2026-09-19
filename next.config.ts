import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first for browsers that take it (smaller at the same quality), WebP for the rest.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
