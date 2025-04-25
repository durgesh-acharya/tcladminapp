import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/admin',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'http',              // 👈 use 'http' here since your domain is not using https
        hostname: '103.168.18.92',     // 👈 your VPS IP or domain name
      },
    ]
  },
};

export default nextConfig;
