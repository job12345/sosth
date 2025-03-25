/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Workers specific settings
  output: 'standalone',
  experimental: {
    isrMemoryCacheSize: 0, // Disable ISR cache for Cloudflare Workers
  }
};

module.exports = nextConfig;
