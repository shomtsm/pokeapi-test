import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Development configuration - no standalone output needed
  // output: 'standalone', // Only needed for production builds
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/PokeAPI/sprites/**',
      },
    ],
  },
};

export default nextConfig;
