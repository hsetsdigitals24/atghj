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
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      }, {
        source: '/dashboard/:path*',
        destination: 'https://atghj.h-sets.com/ojs/index.php/:path*',
      },
      {
        source: '/ojs-assets/:path*',
        destination: 'https://atghj.h-sets.com/ojs-assets/:path*',
      }
    ];
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
