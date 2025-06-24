/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Cloudflare Pages configuration
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 