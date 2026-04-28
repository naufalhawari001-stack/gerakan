import { Metadata } from "next";
import { getHomePageData } from "@/lib/sanity.fetch";
import NewsList from "@/components/NewsList";
import Footer from "@/components/Footer";
import DynamicHeader from "@/components/DynamicHeader"; // Switcher pintar

export const metadata: Metadata = {
  title: "Arsip Berita | Gerakan Rakyat BMS",
  description: "Kumpulan berita terbaru dan suara rakyat mengenai gerakan perubahan di Banyumas.",
};

export default async function BeritaPage() {
  const data = await getHomePageData();

  return (
    <main className="bg-white min-h-screen relative font-sans">
      {/* SMART NAVBAR 
          Otomatis transparan di header gelap dan putih solid saat scroll.
      */}
      <DynamicHeader />

      {/* 1. MODERN HEADER SECTION 
          - Menghapus judul jumbo (7xl).
          - Menggunakan font-extrabold & gray-100 agar lebih elegan.
      */}
      <section className="bg-[#1a1a1a] text-white pt-44 pb-20 relative overflow-hidden">
        {/* Aksen Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF4500]/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
        
        <div className="max-w-[1440px] mx-auto px-8 relative z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
            <div className="max-w-2xl">
              <span className="text-[#FF4500] font-black tracking-[0.4em] uppercase text-[10px] block mb-4 animate-in fade-in slide-in-from-left-4 duration-1000">
                Informasi & Aspirasi
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-white italic animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Berita <span className="text-gray-400">&</span> Suara Rakyat
              </h1>
            </div>
            
            <div className="md:text-right">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] leading-relaxed max-w-xs ml-auto">
                Mengawal perubahan dari Banyumas untuk Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTENT SECTION 
          Komponen List dengan Fitur Search.
          Jarak (py) dibuat lega agar terlihat modern.
      */}
      <div className="relative bg-white py-20">
        <div className="max-w-[1440px] mx-auto px-8">
           {/* Menampilkan list berita dari Sanity */}
           <NewsList initialNews={data.news} />
        </div>
      </div>

      <Footer settings={data.settings} />
    </main>
  );
}