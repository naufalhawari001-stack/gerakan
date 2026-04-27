/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}", // Tambahkan ini agar style di helper lib terbaca
    "./sanity/**/*.{js,ts,jsx,tsx}", // Tambahkan ini jika kamu punya custom component di Studio
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F97316", // Warna Oranye Gerakan
        dark: "#111111",
        light: "#F5F5F5"
      }
    },
  },
  plugins: [],
}