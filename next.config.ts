import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize CSS loading to prevent "No link element found for chunk" errors
  experimental: {
    // Keep these optimizations that are compatible with production builds
    optimizePackageImports: [
      "@/components/ui",
      "lucide-react",
      "class-variance-authority",
    ],
  },
  // This part will be used in production mode
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // In production, force all CSS to be included in the main chunk
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      };
    }
    return config;
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
