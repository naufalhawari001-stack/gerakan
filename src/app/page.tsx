import { Metadata } from "next";
import DynamicHeader from "@/components/DynamicHeader";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import VideoSection from "@/components/VideoSection";
import AgendaSection from "@/components/AgendaSection";
import DonationCTA from "@/components/DonationCTA";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { getHomePageData, getVideoNews } from "@/lib/sanity.fetch";

/**
 * METADATA: Optimasi SEO & Social Share
 * Memastikan tampilan saat link dibagikan sangat profesional.
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
      url: "/og-image.jpg", // Pastikan file ini ada di folder public
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
  /**
   * DATA FETCHING PARALEL
   * - getHomePageData: Mengambil Settings, News (List), Agenda, dan Quote.
   * - getVideoNews(4): Mengambil 4 konten multimedia terbaru untuk barisan VideoSection.
   */
  const [data, videoData] = await Promise.all([
    getHomePageData(),
    getVideoNews(4) // FIX: Limit diubah ke 4 agar pas dengan grid 4 kolom.
  ]);

  return (
    <>
      {/* SMART NAVIGATION: Transisi transparan ke solid saat scroll */}
      <DynamicHeader />

      <main className="relative bg-white overflow-hidden font-sans">
        {/* HERO SECTION: Headline & Tagline dari Sanity Settings */}
        <Hero 
          headline={data.settings?.heroHeadline} 
          tagline={data.settings?.heroTagline} 
        />
        
        {/* NEWS SECTION (ARTIKEL TERBARU) 
            Kini tampil 4 kolom x 2 baris (Total 8) khusus kategori "Berita".
        */}
        <section id="berita" className="relative z-10">
           <NewsSection news={data.news} />
        </section>

        {/* MULTIMEDIA SECTION (YOUTUBE & INSTAGRAM)
            Kini tampil 4 kolom sejajar (Total 4) khusus kategori "Video".
        */}
        <VideoSection videos={videoData} />

        {/* AGENDA & REGISTRATION (KTA) */}
        <AgendaSection 
          title={data.agenda?.title}
          slogan={data.agenda?.slogan}
          link={data.agenda?.registrationLink}
        />

        {/* ACTION CTA: Elemen interaktif partisipasi rakyat */}
        <DonationCTA />

        {/* QUOTE TOKOH: Pernyataan pimpinan DPD */}
        <QuoteSection quoteData={data.quote} />

        {/* FOOTER: Identitas resmi & link kolaborasi */}
        <Footer settings={data.settings} />
      </main>
    </>
  );
}