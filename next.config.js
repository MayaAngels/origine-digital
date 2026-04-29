/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // Disable static generation for all API routes
  staticPageGenerationTimeout: 0,
  // Transpile more packages
  transpilePackages: [],
  // Ignore ESLint and TypeScript errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure webpack to handle problematic modules
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@supabase/supabase-js': 'commonjs @supabase/supabase-js',
      });
    }
    return config;
  },
  // Disable static optimization for all dynamic routes
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@supabase',
      'node_modules/next-auth',
      'app/api/**/*',
    ],
  },
}

module.exports = nextConfig