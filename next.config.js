/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: '.next',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  swcMinify: true
}

module.exports = nextConfig 