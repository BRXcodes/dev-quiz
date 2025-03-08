/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  distDir: '.next',
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: false
  }
}

module.exports = nextConfig 