/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mk6n6kinhajxg1fp.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'dxy4adpuoflk7uxq.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
