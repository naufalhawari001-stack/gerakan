import { Metadata } from "next";
import DynamicHeader from "@/components/DynamicHeader";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import VideoSection from "@/components/VideoSection"; // IMPORT BARU
import AgendaSection from "@/components/AgendaSection";
import DonationCTA from "@/components/DonationCTA";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { getHomePageData, getVideoNews } from "@/lib/sanity.fetch"; // IMPORT FETCHER BARU

/**
 * METADATA: Optimasi SEO & Social Share
 */
export const metadata: Metadata = {
  title: "Gerakan Rakyat BMS | Wadah Perjuangan & Perubahan Banyumas",
  description: "Selamat datang di website resmi Gerakan Rakyat BMS. Kami bergerak bersama untuk keadilan sosial, gotong royong, dan perubahan nyata di Banyumas.",
  openGraph: {
    title: "Gerakan Rakyat BMS - Bersatu untuk Perubahan",
    description: "Suarakan aspirasimu dan bergabung bersama pejuang rakyat di Banyumas.",
    url: "https://gerakanrakyatbms.com",
    siteName: "Gerakan Rakyat BMS",
    images: [{ 
      url: "/og-image.jpg",
      width: 1200, 
      height: 630,
      alt: "Pejuang Gerakan Rakyat Banyumas"
    }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerakan Rakyat BMS",
    description: "Wadah perjuangan kolektif rakyat Banyumas.",
    images: ["/og-image.jpg"],
  },
};

export default async function HomePage() {
  // Ambil data secara paralel agar loading super cepat
  const [data, videoData] = await Promise.all([
    getHomePageData(),
    getVideoNews(3) // Mengambil 3 video terbaru untuk section multimedia
  ]);

  return (
    <>
      {/* SMART NAVIGATION */}
      <DynamicHeader />

      <main className="relative bg-white overflow-hidden font-sans">
        {/* HERO SECTION */}
        <Hero 
          headline={data.settings?.heroHeadline} 
          tagline={data.settings?.heroTagline} 
        />
        
        {/* NEWS SECTION (LATEST ARTICLES) */}
        <section id="berita" className="relative z-10">
           <NewsSection news={data.news} />
        </section>

        {/* MULTIMEDIA SECTION (YOUTUBE & INSTAGRAM REELS) */}
        <VideoSection videos={videoData} />

        {/* AGENDA & REGISTRATION (KTA) */}
        <AgendaSection 
          title={data.agenda?.title}
          slogan={data.agenda?.slogan}
          link={data.agenda?.registrationLink}
        />

        {/* DONATION / ACTION CTA */}
        <DonationCTA />

        {/* QUOTE TOKOH */}
        <QuoteSection quoteData={data.quote} />

        {/* FOOTER */}
        <Footer settings={data.settings} />
      </main>
    </>
  );
}