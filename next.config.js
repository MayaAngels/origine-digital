/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  // Force dynamic rendering for all pages to avoid auth errors
  staticPageGenerationTimeout: 120,
  serverRuntimeConfig: {
    // Will be available on the server only
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
  // Disable static optimization for all pages
  trailingSlash: false,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig