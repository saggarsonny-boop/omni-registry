/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Ensure we can run edge/serverless API routes on Cloudflare Pages
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Any server-specific overrides if needed
    }
    return config;
  },
};

module.exports = nextConfig;
