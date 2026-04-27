import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import AgendaSection from "@/components/AgendaSection";
import DonationCTA from "@/components/DonationCTA";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { getHomePageData } from "@/lib/sanity.fetch";

/**
 * 1. SEO TAK TERTANDINGI (Homepage Metadata)
 * Supaya saat share link utama (gerakanrakyatbms.com) di WA muncul gambar gede.
 */
export const metadata: Metadata = {
  title: "Gerakan Rakyat BMS | Wadah Perjuangan & Perubahan Banyumas",
  description: "Selamat datang di website resmi Gerakan Rakyat BMS. Kami bergerak bersama untuk keadilan sosial, gotong royong, dan perubahan nyata di Banyumas.",
  openGraph: {
    title: "Gerakan Rakyat BMS - Bersatu untuk Perubahan",
    description: "Suarakan aspirasimu dan bergabung bersama pejuang rakyat di Banyumas.",
    url: "https://gerakanrakyatbms.com",
    siteName: "Gerakan Rakyat BMS",
    images: [
      {
        url: "/og-image.jpg", // Pastikan file 1200x630px ini ada di folder public
        width: 1200,
        height: 630,
        alt: "Gerakan Rakyat BMS Indonesia",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerakan Rakyat BMS",
    description: "Wadah perjuangan rakyat untuk perubahan di Banyumas.",
    images: ["/og-image.jpg"],
  },
};

export default async function HomePage() {
  /**
   * Fetch data secara paralel untuk performa maksimal (Grade A GTmetrix).
   * Server Component akan merender ini di sisi server.
   */
  const data = await getHomePageData(); 

  return (
    <>
      {/* NAVBAR 
          Berdiri sendiri agar tidak double dengan HeaderDetail di halaman blog.
      */}
      <Navbar />

      <main className="relative bg-white overflow-hidden">
        {/* 1. HERO SECTION 
            Catatan GTmetrix: Pastikan di dalam komponen Hero, tag <Image /> 
            sudah ditambahkan property 'priority' agar LCP cepat.
        */}
        <Hero 
          headline={data.settings?.heroHeadline} 
          tagline={data.settings?.heroTagline} 
        />
        
        {/* 2. HIGHLIGHT BERITA
            Jika NewsSection kamu belum memanggil NewsList, 
            pastikan NewsSection merender list berita dengan rapi.
        */}
        <section id="berita" className="relative z-10">
           <NewsSection news={data.news} />
        </section>

        {/* 3. AGENDA GERAKAN */}
        <AgendaSection 
          title={data.agenda?.title}
          slogan={data.agenda?.slogan}
          link={data.agenda?.registrationLink}
        />

        {/* 4. DONATION CTA BAR (Sticky/Fixed di mobile jika perlu) */}
        <DonationCTA />

        {/* 5. QUOTE SECTION */}
        <QuoteSection quoteData={data.quote} />

        {/* 6. FOOTER */}
        <Footer settings={data.settings} />
      </main>
    </>
  );
}