import { Metadata } from "next";
import DynamicHeader from "@/components/DynamicHeader";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import AgendaSection from "@/components/AgendaSection";
import DonationCTA from "@/components/DonationCTA";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { getHomePageData } from "@/lib/sanity.fetch";

export const metadata: Metadata = {
  title: "Gerakan Rakyat BMS | Wadah Perjuangan & Perubahan Banyumas",
  description: "Selamat datang di website resmi Gerakan Rakyat BMS. Kami bergerak bersama untuk keadilan sosial, gotong royong, dan perubahan nyata di Banyumas.",
  openGraph: {
    title: "Gerakan Rakyat BMS - Bersatu untuk Perubahan",
    description: "Suarakan aspirasimu dan bergabung bersama pejuang rakyat di Banyumas.",
    url: "https://gerakanrakyatbms.com",
    siteName: "Gerakan Rakyat BMS",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

export default async function HomePage() {
  const data = await getHomePageData(); 

  return (
    <>
      {/* Panggil DynamicHeader yang sudah include Navbar & HeaderDetail */}
      <DynamicHeader />

      <main className="relative bg-white overflow-hidden font-sans">
        <Hero 
          headline={data.settings?.heroHeadline} 
          tagline={data.settings?.heroTagline} 
        />
        
        <section id="berita" className="relative z-10">
           <NewsSection news={data.news} />
        </section>

        <AgendaSection 
          title={data.agenda?.title}
          slogan={data.agenda?.slogan}
          link={data.agenda?.registrationLink}
        />

        <DonationCTA />

        <QuoteSection quoteData={data.quote} />

        <Footer settings={data.settings} />
      </main>
    </>
  );
}