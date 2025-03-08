/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: '.next',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  swcMinify: true,
  basePath: '',
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig 