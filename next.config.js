/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  experimental: {
    appDir: true
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/src/app/page'
      }
    ]
  }
}

module.exports = nextConfig 