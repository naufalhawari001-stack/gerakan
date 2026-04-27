/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
  // Mengaktifkan fitur-fitur modern Next.js
  typescript: {
    // Set ke true jika ingin build tetap lanjut meskipun ada sedikit error type (opsional)
    ignoreBuildErrors: false,
  },
  eslint: {
    // Mempercepat build dengan mengabaikan linting saat deploy
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;