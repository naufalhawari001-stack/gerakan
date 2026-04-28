import { Metadata } from "next";
import { getHomePageData } from "@/lib/sanity.fetch";
import NewsList from "@/components/NewsList";
import Footer from "@/components/Footer";
import DynamicHeader from "@/components/DynamicHeader";

export const metadata: Metadata = {
  title: "Arsip Berita | Gerakan Rakyat BMS",
  description: "Kumpulan berita terbaru dan suara rakyat mengenai gerakan perubahan di Banyumas.",
};

export default async function BeritaPage() {
  const data = await getHomePageData();

  return (
    <main className="bg-white min-h-screen relative font-sans">
      <DynamicHeader />

      {/* MODERN HEADER (Judul Tegak) */}
      <section className="bg-[#1a1a1a] text-white pt-44 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF4500]/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
        
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
            <div className="max-w-2xl">
              <span className="text-[#FF4500] font-black tracking-[0.4em] uppercase text-[10px] block mb-4">
                Informasi & Aspirasi
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-white">
                Arsip <span className="text-gray-400">&</span> Berita Rakyat
              </h1>
            </div>
            <div className="md:text-right">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] leading-relaxed max-w-xs ml-auto opacity-70">
                Catatan perjuangan dan suara perubahan dari Banyumas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT AREA */}
      <div className="relative bg-white py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-8">
           <NewsList initialNews={data.news} />
        </div>
      </div>

      <Footer settings={data.settings} />
    </main>
  );
}