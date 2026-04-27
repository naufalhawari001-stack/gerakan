import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

/**
 * Konfigurasi Font Montserrat agar tipografi terlihat bold dan profesional.
 * Kita biarkan di sini agar seluruh halaman menggunakan font yang sama.
 */
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gerakan Rakyat BMS",
  description: "Website resmi Gerakan Rakyat BMS Daerah",
  keywords: ["Gerakan Rakyat", "BMS", "Gotong Royong", "Perubahan"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${montserrat.className} bg-white antialiased`}>
        {/* PERBAIKAN KRUSIAL: 
            Navbar dihapus dari sini supaya tidak muncul di semua halaman secara otomatis.
            Sekarang, kamu panggil <Navbar /> secara manual di halaman Homepage (page.tsx),
            dan panggil <HeaderDetail /> di halaman berita detail.
        */}
        
        {children}
      </body>
    </html>
  );
}