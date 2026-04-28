import { Metadata } from "next";
import DynamicHeader from "@/components/DynamicHeader";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import AgendaSection from "@/components/AgendaSection";
import DonationCTA from "@/components/DonationCTA";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { getHomePageData } from "@/lib/sanity.fetch";

/**
 * METADATA: Optimasi SEO & Social Share
 * Memastikan link yang dibagikan ke WhatsApp/FB terlihat profesional.
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
  // Mengambil data terpusat dengan revalidate 30-60 detik
  const data = await getHomePageData(); 

  return (
    <>
      {/* SMART NAVIGATION 
        Otomatis menangani transisi transparan ke solid saat scroll.
        Aman dari Hydration Error karena sudah dipagari state 'mounted'.
      */}
      <DynamicHeader />

      <main className="relative bg-white overflow-hidden font-sans">
        {/* HERO SECTION 
          Menerima data headline & tagline dinamis dari Settings Sanity.
        */}
        <Hero 
          headline={data.settings?.heroHeadline} 
          tagline={data.settings?.heroTagline} 
        />
        
        {/* NEWS SECTION 
          Menampilkan list berita terbaru. 
          Sudah mendukung fitur Auto-Thumbnail YouTube jika image utama kosong.
        */}
        <section id="berita" className="relative z-10">
           <NewsSection news={data.news} />
        </section>

        {/* AGENDA & REGISTRATION 
          Fokus pada konversi anggota baru (Gabung KTA).
        */}
        <AgendaSection 
          title={data.agenda?.title}
          slogan={data.agenda?.slogan}
          link={data.agenda?.registrationLink}
        />

        {/* DONATION / ACTION CTA 
          Elemen interaktif untuk mengajak partisipasi aktif.
        */}
        <DonationCTA />

        {/* QUOTE TOKOH 
          Membangun kepercayaan (Trust) melalui statement pimpinan.
        */}
        <QuoteSection quoteData={data.quote} />

        {/* FOOTER 
          Berisi identitas resmi DPD Banyumas dan link Supported by Onislam.
        */}
        <Footer settings={data.settings} />
      </main>
    </>
  );
}