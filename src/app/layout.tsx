import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers"; // IMPORT PROVIDER UNTUK LOGIN

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  // 1. Basic SEO & Title Template (Mencegah Double Branding)
  title: {
    default: "Gerakan Rakyat BMS | Perubahan & Gotong Royong",
    template: "%s | Gerakan Rakyat BMS",
  },
  description: "Website resmi Gerakan Rakyat BMS. Wadah perjuangan rakyat untuk perubahan, keadilan sosial, dan gotong royong di daerah Banyumas.",
  keywords: ["Gerakan Rakyat", "BMS", "Banyumas", "Anies Baswedan", "Relawan Banyumas", "Perubahan", "Politik Rakyat"],
  authors: [{ name: "Aris Suharyanto" }],
  creator: "Aris Suharyanto",
  publisher: "Gerakan Rakyat BMS",
  metadataBase: new URL("https://gerakanrakyatbms.com"), // Base URL untuk social media preview
  
  // 2. Open Graph (Thumbnail WhatsApp, FB, Telegram)
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://gerakanrakyatbms.com", 
    siteName: "Gerakan Rakyat BMS",
    title: "Gerakan Rakyat BMS - Bersatu untuk Perubahan",
    description: "Gabung bersama kami di Gerakan Rakyat BMS. Suarakan perubahan untuk Banyumas yang lebih baik.",
    images: [
      {
        url: "/og-image.jpg", 
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

  // 4. Icons (Favicon)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  // 5. Search Engine Verification
  verification: {
    google: "2vAK4fS7Gxwo38J6T18EOFGi0E9OPaxBYKwBFkDrbFI",
  },

  // 6. Robots
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
        {/* BUNGKUS DENGAN PROVIDERS AGAR FITUR LOGIN/KOMENTAR JALAN */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}