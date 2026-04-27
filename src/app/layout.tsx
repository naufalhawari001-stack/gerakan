import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  // 1. Basic SEO
  title: {
    default: "Gerakan Rakyat BMS | Perubahan & Gotong Royong",
    template: "%s | Gerakan Rakyat BMS",
  },
  description: "Website resmi Gerakan Rakyat BMS. Wadah perjuangan rakyat untuk perubahan, keadilan sosial, dan gotong royong di daerah Banyumas.",
  keywords: ["Gerakan Rakyat", "BMS", "Banyumas", "Anies Baswedan", "Relawan Banyumas", "Perubahan", "Politik Rakyat"],
  authors: [{ name: "Aris Suharyanto" }],
  creator: "Aris Suharyanto",
  publisher: "Gerakan Rakyat BMS",
  
  // 2. Open Graph (Thumbnail WhatsApp & FB)
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://gerakanrakyatbms.com", 
    siteName: "Gerakan Rakyat BMS",
    title: "Gerakan Rakyat BMS - Bersatu untuk Perubahan",
    description: "Gabung bersama kami di Gerakan Rakyat BMS. Suarakan perubahan untuk Banyumas yang lebih baik.",
    images: [
      {
        url: "/og-image.jpg", // WAJIB ada di /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Gerakan Rakyat BMS Banner",
      },
    ],
  },

  // 3. Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Gerakan Rakyat BMS",
    description: "Wadah perjuangan rakyat untuk perubahan di Banyumas.",
    images: ["/og-image.jpg"],
  },

  // 4. Search Engine Verification (DI PERBAIKI DI SINI)
  verification: {
    // Cukup masukkan kodenya saja, jangan tag HTML-nya
    google: "2vAK4fS7Gxwo38J6T18EOFGi0E9OPaxBYKwBFkDrbFI",
  },

  // 5. Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${montserrat.className} bg-white antialiased`}>
        {children}
      </body>
    </html>
  );
}