import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'atghj.africa',
        port: '',
        pathname: '/public/**',
      },
      // If you also want to support HTTPS:
      {
        protocol: 'https',
        hostname: 'atghj.africa',
        port: '',
        pathname: '/public/**',
      },
    ],
  }
};

export default nextConfig;
