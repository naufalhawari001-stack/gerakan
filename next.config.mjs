/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Gambar dari database Sanity
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // Thumbnail otomatis YouTube
      },
      {
        protocol: 'https',
        hostname: 'www.instagram.com', // Thumbnail Instagram
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com', // CDN Gambar Instagram
      },
      // --- TAMBAHAN UNTUK AVATAR KOMENTAR ---
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // WAJIB: Agar foto Google muncul
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // WAJIB: Agar foto GitHub muncul
      },
    ],
  },
  // Opsi tambahan jika kamu ingin Turbopack lebih stabil
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;