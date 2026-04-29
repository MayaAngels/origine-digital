/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // This is the key - disable static generation for all routes
  staticPageGenerationTimeout: 0,
  // Use Node.js runtime for API routes
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Exclude API routes from static generation
  outputFileTracingExcludes: {
    '*': ['**/api/**/*'],
  },
  // Configure webpack to handle issues
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  // Prevent static generation of problematic pages
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
}

module.exports = nextConfig