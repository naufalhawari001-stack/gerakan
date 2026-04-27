import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import AgendaSection from "@/components/AgendaSection";
import DonationCTA from "@/components/DonationCTA";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { getHomePageData } from "@/lib/sanity.fetch";

export default async function HomePage() {
  /**
   * Mengambil seluruh data dari Sanity secara paralel.
   * Data ini mencakup Settings, News, Agenda, dan Quote.
   */
  const data = await getHomePageData(); 

  return (
    <>
      {/* NAVBAR: Dipanggil manual di sini karena sudah dihapus dari RootLayout.
        Ini memastikan Navbar transparan/putih kamu hanya muncul di Homepage.
      */}
      <Navbar />

      <main className="relative bg-white">
        {/* 1. HERO SECTION 
            Menampilkan Headline dan Tagline dari Pengaturan Global di Sanity.
        */}
        <Hero 
          headline={data.settings?.heroHeadline} 
          tagline={data.settings?.heroTagline} 
        />
        
        {/* 2. HIGHLIGHT BERITA
            Menampilkan daftar berita terbaru. Pastikan query GROQ kamu 
            sudah menggunakan dereference (category->title).
        */}
        <NewsSection news={data.news} />

        {/* 3. AGENDA GERAKAN
            Informasi mengenai kegiatan dan link pendaftaran KTA.
        */}
        <AgendaSection 
          title={data.agenda?.title}
          slogan={data.agenda?.slogan}
          link={data.agenda?.registrationLink}
        />

        {/* 4. DONATION CTA BAR 
            Bar ajakan donasi yang statis.
        */}
        <DonationCTA />

        {/* 5. QUOTE SECTION (PESAN KETUA UMUM)
            Menampilkan kutipan dari Sahrin Hamid beserta fotonya.
        */}
        <QuoteSection quoteData={data.quote} />

        {/* 6. FOOTER SECTION
            Menggunakan data kontak dan sosial media dari Settings.
        */}
        <Footer settings={data.settings} />
      </main>
    </>
  );
}