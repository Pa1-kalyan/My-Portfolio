/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/My_Portfolio',
  assetPrefix: '/My_Portfolio/',
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
