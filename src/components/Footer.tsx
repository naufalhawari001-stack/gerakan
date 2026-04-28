"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook, 
  MessageCircle 
} from "lucide-react";

interface FooterProps {
  settings?: {
    siteName?: string;
    contactInfo?: {
      phone?: string;
      email?: string;
      address?: string;
    };
    socialMedia?: {
      instagram?: string;
      twitter?: string;
      youtube?: string;
      facebook?: string;
      whatsapp?: string;
    };
    footerLogo?: string;
  };
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] text-white pt-24 pb-12 border-t border-white/5 font-sans">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* KOLOM 1: IDENTITAS RESMI (REFERENSI IMAGE_760C76.PNG) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="mb-12">
              <Image 
                src={settings?.footerLogo || "/macan.png"} 
                alt="Gerakan Rakyat" 
                width={450} 
                height={170}
                className="h-20 md:h-24 w-auto object-contain transition-transform hover:scale-105 duration-500"
                priority
              />
            </div>

            {/* STYLING PREMIUM UNTUK IDENTITAS */}
            <div className="space-y-2 group">
               <p className="text-[11px] font-black uppercase tracking-[0.5em] text-[#FF4500] opacity-90 leading-none">
                  Dewan Pimpinan Daerah
               </p>
               <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight text-white">
                  Kabupaten Banyumas
               </h2>
               <p className="text-xl md:text-2xl font-extrabold uppercase italic tracking-tight text-gray-500 group-hover:text-gray-300 transition-colors leading-none">
                  Partai Gerakan Rakyat
               </p>
            </div>

            <p className="mt-10 text-gray-500 font-medium leading-relaxed max-w-sm uppercase tracking-[0.2em] text-[10px]">
               Wadah Perjuangan, Perubahan, dan Gotong Royong Rakyat Banyumas Untuk Indonesia.
            </p>
          </div>

          {/* KOLOM 2: KONTAK */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-black mb-10 relative inline-block uppercase tracking-[0.3em] text-gray-400">
              Hubungi Kami
              <span className="absolute -bottom-3 left-0 w-8 h-[2px] bg-[#FF4500]"></span>
            </h4>
            
            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-500">
                  <Phone size={20} strokeWidth={2.5} />
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-0.5">WhatsApp / Call</p>
                   <p className="text-base font-bold tracking-tight">{settings?.contactInfo?.phone || "0813-2732-2706"}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-500">
                  <Mail size={20} strokeWidth={2.5} />
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Email Resmi</p>
                   <p className="text-base font-bold tracking-tight lowercase">{settings?.contactInfo?.email || "gerakanrakyatbanyumas@gmail.com"}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-500 shrink-0">
                  <MapPin size={20} strokeWidth={2.5} />
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Alamat Kantor</p>
                   <p className="text-sm font-bold leading-relaxed text-gray-300">{settings?.contactInfo?.address || "Jl. Menteri Supeno, RT 08 RW 01, Wiradadi, Sokaraja, Banyumas"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM 3: TAUTAN CEPAT & SOSIAL (JUDUL DIPERBAIKI) */}
          <div className="lg:col-span-3">
            {/* PERBAIKAN: Judul diubah agar relevan dengan isinya */}
            <h4 className="text-sm font-black mb-10 relative inline-block uppercase tracking-[0.3em] text-gray-400">
              Tautan Cepat
              <span className="absolute -bottom-3 left-0 w-8 h-[2px] bg-[#FF4500]"></span>
            </h4>
            
            {/* Sosial Media Icons */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: <Instagram size={18} />, href: settings?.socialMedia?.instagram, color: "hover:bg-[#E4405F]" },
                { icon: <Twitter size={18} />, href: settings?.socialMedia?.twitter, color: "hover:bg-[#000000]" },
                { icon: <Youtube size={18} />, href: settings?.socialMedia?.youtube, color: "hover:bg-[#FF0000]" },
                { icon: <Facebook size={18} />, href: settings?.socialMedia?.facebook, color: "hover:bg-[#1877F2]" },
                { icon: <MessageCircle size={18} />, href: settings?.socialMedia?.whatsapp, color: "hover:bg-[#25D366]" },
              ].map((social, idx) => (
                social.href && (
                  <Link 
                    key={idx} 
                    href={social.href}
                    target="_blank"
                    className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 border border-white/5 ${social.color} hover:border-transparent hover:-translate-y-1 shadow-lg`}
                  >
                    {social.icon}
                  </Link>
                )
              ))}
            </div>

            {/* Navigasi Internal */}
            <nav className="flex flex-col space-y-4">
               <Link href="/berita" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#FF4500] transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-4 h-[1px] bg-[#FF4500] transition-all"></span>
                  Arsip Berita
               </Link>
               <Link href="/pendaftaran" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#FF4500] transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-4 h-[1px] bg-[#FF4500] transition-all"></span>
                  Gabung KTA
               </Link>
               <Link href="/identitas" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#FF4500] transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-4 h-[1px] bg-[#FF4500] transition-all"></span>
                  Logo & Branding
               </Link>
            </nav>
          </div>
        </div>

        {/* FOOTER BOTTOM SECTION */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-black">
              &copy; {currentYear} Gerakan Rakyat {settings?.siteName || "Banyumas"} &bull; Hak Cipta Dilindungi
            </p>
          </div>
          
          <div className="flex items-center">
            <Link 
              href="https://onislam.web.id" 
              target="_blank"
              className="group flex items-center gap-3 text-[10px] text-gray-600 uppercase tracking-[0.3em] font-black"
            >
              Supported by 
              <span className="text-gray-500 group-hover:text-[#FF4500] transition-colors duration-300 underline underline-offset-4 decoration-white/10">
                Onislam
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}