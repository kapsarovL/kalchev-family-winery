import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize CSS loading to prevent "No link element found for chunk" errors
  experimental: {
    // Keep these optimizations that are compatible with Turbopack
    optimizePackageImports: [
      "@/components/ui",
      "lucide-react",
      "class-variance-authority",
    ],
    // Explicitly enable Turbopack
    turbo: {
      resolveAlias: {
        // Ensure proper CSS resolution
        styles: "./styles",
      },
    },
  },
  // This part will be used when not in Turbopack mode
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
};

export default nextConfig;
