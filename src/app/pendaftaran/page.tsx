import { UserPlus, FileCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { getHomePageData } from "@/lib/sanity.fetch";
import Footer from "@/components/Footer";
import DynamicHeader from "@/components/DynamicHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pendaftaran Anggota | Gerakan Rakyat BMS",
  description: "Bergabunglah bersama Gerakan Rakyat Banyumas. Dapatkan KTA resmi dan jadilah bagian dari perubahan nyata.",
};

export default async function PendaftaranPage() {
  const { settings, agenda } = await getHomePageData();

  return (
    <main className="bg-white min-h-screen relative font-sans">
      {/* Smart Switcher Header */}
      <DynamicHeader />

      {/* 1. HEADER SECTION - Gelap & Elegan */}
      <section className="bg-[#1a1a1a] text-white pt-44 pb-28 relative overflow-hidden">
        {/* Dekorasi Glow Oranye */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF4500]/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <span className="text-[#FF4500] font-black tracking-[0.4em] uppercase text-xs block mb-6 animate-in fade-in slide-in-from-left-4 duration-1000">
            Official Membership
          </span>
          {/* Tipografi Judul: Extrabold & Gray-100 agar lebih premium */}
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter uppercase leading-[0.85] text-gray-100 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Gabung Barisan <br /> <span className="text-white">Perubahan</span>
          </h1>
          <p className="mt-10 text-gray-400 font-medium uppercase tracking-[0.2em] text-xs md:text-sm max-w-2xl leading-relaxed opacity-80 animate-in fade-in duration-1000 delay-300">
            Wujudkan Banyumas yang lebih baik melalui kontribusi nyata. Daftarkan dirimu untuk mendapatkan KTA Digital resmi Gerakan Rakyat.
          </p>
        </div>
      </section>

      {/* 2. CONTENT SECTION */}
      <div className="max-w-[1440px] mx-auto px-8 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* KOLOM INFO */}
          <div className="lg:col-span-7 space-y-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tighter mb-8 text-gray-800 italic">
                Kenapa Harus Ber-KTA?
              </h2>
              <p className="text-gray-600 leading-relaxed font-medium text-lg md:text-xl">
                KTA bukan sekadar kartu, tapi simbol komitmen kita untuk bergotong-royong. Sebagai anggota resmi, kamu akan mendapatkan akses ke forum diskusi daerah dan agenda strategis gerakan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-6 p-10 bg-gray-50 rounded-3xl border border-gray-100 hover:border-[#FF4500]/30 transition-all group">
                <div className="text-[#FF4500] shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck size={44} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-xs mb-3 tracking-[0.2em] text-gray-900">Data Terlindungi</h4>
                  <p className="text-[11px] text-gray-500 font-bold leading-relaxed uppercase">Privasi data anggota dijamin aman dalam sistem basis data terpusat kami.</p>
                </div>
              </div>
              <div className="flex gap-6 p-10 bg-gray-50 rounded-3xl border border-gray-100 hover:border-[#FF4500]/30 transition-all group">
                <div className="text-[#FF4500] shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <FileCheck size={44} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-xs mb-3 tracking-[0.2em] text-gray-900">Digital Card</h4>
                  <p className="text-[11px] text-gray-500 font-bold leading-relaxed uppercase">Dapatkan KTA dalam format digital yang bisa disimpan langsung di ponselmu.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA BOX / FORM LINK */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <div className="bg-white p-12 rounded-[3.5rem] border-2 border-gray-900 border-dashed text-center shadow-2xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100">
                  <UserPlus size={40} className="text-[#FF4500]" />
                </div>
                
                <h3 className="text-3xl font-extrabold uppercase mb-4 text-gray-800 tracking-tighter">
                  {agenda?.title || "Form Pendaftaran"}
                </h3>
                <p className="text-gray-400 font-bold text-[10px] mb-12 uppercase tracking-[0.3em] leading-relaxed italic">
                  {agenda?.slogan || "#BanyumasBersatu Untuk Perubahan"}
                </p>
                
                <a 
                  href={agenda?.registrationLink || "#"} 
                  target="_blank" 
                  className="flex items-center justify-center gap-4 bg-gray-900 hover:bg-[#FF4500] text-white w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl group active:scale-95"
                >
                  Mulai Mendaftar
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </a>
                
                <p className="mt-8 text-[9px] text-gray-400 font-black uppercase tracking-[0.3em]">
                  *PROSES PENDAFTARAN GRATIS
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer settings={settings} />
    </main>
  );
}