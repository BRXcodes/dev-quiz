/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: '.next',
  experimental: {
    // Remove appDir since it's now stable in Next.js 14
  }
}

module.exports = nextConfig 