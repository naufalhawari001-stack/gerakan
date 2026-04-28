/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Untuk gambar dari Sanity
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // Untuk thumbnail YouTube
      },
      {
        protocol: 'https',
        hostname: 'www.instagram.com', // Untuk thumbnail Instagram
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com', // Untuk CDN Instagram
      },
    ],
  },
};

export default nextConfig;