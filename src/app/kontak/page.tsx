import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Music2 // Digunakan untuk TikTok
} from "lucide-react";
import { getHomePageData } from "@/lib/sanity.fetch";
import Footer from "@/components/Footer";
import DynamicHeader from "@/components/DynamicHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Kami | Gerakan Rakyat BMS",
  description: "Hubungi Gerakan Rakyat Banyumas untuk menyampaikan aspirasi, saran, atau pertanyaan mengenai perjuangan perubahan.",
};

export default async function KontakPage() {
  const { settings } = await getHomePageData();

  // Mapping data sosial media agar mudah diatur
  const socialLinks = [
    { icon: <Facebook size={20} />, href: settings?.socialMedia?.facebook || "#", color: "hover:bg-[#1877F2]", label: "Facebook" },
    { icon: <Instagram size={20} />, href: settings?.socialMedia?.instagram || "#", color: "hover:bg-[#E4405F]", label: "Instagram" },
    { icon: <Twitter size={20} />, href: settings?.socialMedia?.twitter || "#", color: "hover:bg-[#000000]", label: "X / Twitter" },
    { icon: <Music2 size={20} />, href: settings?.socialMedia?.tiktok || "#", color: "hover:bg-[#000000]", label: "TikTok" },
    { icon: <Youtube size={20} />, href: settings?.socialMedia?.youtube || "#", color: "hover:bg-[#FF0000]", label: "YouTube" },
  ];

  return (
    <main className="bg-white min-h-screen relative font-sans">
      {/* SMART NAVBAR STICKY */}
      <DynamicHeader />

      {/* 1. HERO SECTION - Konsisten dengan Pendaftaran */}
      <section className="bg-[#1a1a1a] text-white pt-44 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF4500]/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
        
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <span className="text-[#FF4500] font-black tracking-[0.4em] uppercase text-xs block mb-6 animate-in fade-in slide-in-from-left-4 duration-1000">
            Hubungi Kami
          </span>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter uppercase leading-[0.85] text-gray-100 italic animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Suarakan <br /> <span className="text-white">Aspirasimu</span>
          </h1>
          <p className="mt-10 text-gray-400 font-medium uppercase tracking-[0.2em] text-xs md:text-sm max-w-xl leading-relaxed opacity-80">
            Kami siap mendengar setiap keluhan, saran, dan semangat perjuangan dari seluruh rakyat Banyumas untuk Indonesia.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-8 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* 2. CONTACT INFO (Kolom Kiri) */}
          <div className="lg:col-span-5 space-y-16">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4 text-gray-900">
                <span className="w-12 h-1 bg-[#FF4500]"></span>
                Informasi Kontak
              </h2>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="bg-[#f8f9fa] p-5 rounded-2xl text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Telepon / WhatsApp</p>
                    <p className="text-xl font-bold text-gray-900">{settings?.contactInfo?.phone || "+62 812-3456-7890"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-[#f8f9fa] p-5 rounded-2xl text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Mail size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Email Resmi</p>
                    <p className="text-xl font-bold text-gray-900">{settings?.contactInfo?.email || "kontak@gerakanrakyat.id"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-[#f8f9fa] p-5 rounded-2xl text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-500 shadow-sm">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Markas Besar</p>
                    <p className="text-xl font-bold text-gray-900 leading-relaxed max-w-xs">
                      {settings?.contactInfo?.address || "Purwokerto, Banyumas, Jawa Tengah"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Link - UPDATED WITH ICONS */}
            <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner">
              <h3 className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 mb-6">Ikuti Pergerakan Kami</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm border border-gray-100 transition-all duration-300 ${social.color} hover:text-white hover:-translate-y-1 hover:shadow-lg`}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="mt-6 text-gray-400 text-xs font-bold uppercase tracking-widest italic opacity-60">@gerakanrakyat_bms</p>
            </div>
          </div>

          {/* 3. CONTACT FORM (Kolom Kanan) */}
          <div className="lg:col-span-7">
            <div className="bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] p-10 md:p-16 border border-gray-50 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 text-gray-50 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                <MessageSquare size={200} />
              </div>
              
              <form className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Nama Lengkap</label>
                    <input type="text" className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-2xl py-5 px-8 focus:bg-white focus:border-[#FF4500]/20 transition-all outline-none font-bold text-gray-900" placeholder="Tulis namamu..." />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Alamat Email</label>
                    <input type="email" className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-2xl py-5 px-8 focus:bg-white focus:border-[#FF4500]/20 transition-all outline-none font-bold text-gray-900" placeholder="email@anda.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Subjek Pesan</label>
                  <input type="text" className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-2xl py-5 px-8 focus:bg-white focus:border-[#FF4500]/20 transition-all outline-none font-bold text-gray-900" placeholder="Apa yang ingin kamu sampaikan?" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Isi Pesan</label>
                  <textarea rows={6} className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-2xl py-5 px-8 focus:bg-white focus:border-[#FF4500]/20 transition-all outline-none font-bold text-gray-900 resize-none" placeholder="Tuliskan aspirasi atau pertanyaanmu di sini..."></textarea>
                </div>
                
                <button type="submit" className="w-full bg-gray-900 hover:bg-[#FF4500] text-white font-black uppercase tracking-[0.3em] text-xs py-6 rounded-2xl transition-all duration-500 flex items-center justify-center gap-4 group shadow-2xl active:scale-95">
                  Kirim Pesan Sekarang
                  <Send size={18} className="transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <Footer settings={settings} />
    </main>
  );
}