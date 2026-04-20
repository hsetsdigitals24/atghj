import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'react-icons',
      'date-fns',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'atghj.h-sets.com',
        port: '',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'atghj.h-sets.com',
        port: '',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/photo/**',
      },
    ],
  },
};

export default nextConfig;
