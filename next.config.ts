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
        destination: 'https://dash.atghj.africa/ojsdir/index.php/:path*',
      },
      {
        source: '/ojs-assets/:path*',
        destination: 'https://dash.atghj.africa/ojs-assets/:path*',
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'dash.atghj.africa',
        port: '',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'dash.atghj.africa',
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
