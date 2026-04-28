"use client";

import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  MessageCircle, 
  Music2 
} from "lucide-react";

interface FollowUsProps {
  socials?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    whatsapp?: string;
  };
}

export default function FollowUs({ socials }: FollowUsProps) {
  const socialLinks = [
    { 
      name: "Facebook", 
      icon: <Facebook size={18} fill="currentColor" />, 
      href: socials?.facebook || "#", 
      color: "bg-[#1877F2]",
      shadow: "hover:shadow-[#1877F2]/30"
    },
    { 
      name: "Instagram", 
      icon: <Instagram size={18} strokeWidth={2.5} />, 
      href: socials?.instagram || "#", 
      color: "bg-gradient-to-tr from-[#FFB400] via-[#FF0080] to-[#7000FF]",
      shadow: "hover:shadow-[#FF0080]/30"
    },
    { 
      name: "YouTube", 
      // Perbaikan Icon YouTube: Ukuran disesuaikan agar tidak terlihat kekecilan
      icon: <Youtube size={20} fill="currentColor" strokeWidth={0} />, 
      href: socials?.youtube || "#", 
      color: "bg-[#FF0000]",
      shadow: "hover:shadow-[#FF0000]/30"
    },
    { 
      name: "TikTok", 
      icon: <Music2 size={18} fill="currentColor" />, 
      href: socials?.tiktok || "#", 
      color: "bg-black",
      shadow: "hover:shadow-black/30"
    },
    { 
      name: "WhatsApp", 
      icon: <MessageCircle size={18} fill="currentColor" />, 
      href: socials?.whatsapp || "#", 
      color: "bg-[#25D366]",
      shadow: "hover:shadow-[#25D366]/30"
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm mb-8 transition-all duration-500 hover:shadow-lg">
      {/* JUDUL DENGAN AKSEN BAR KUNING (REFERENSI IMAGE_5D1297.PNG) */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-6 bg-[#FFB400] rounded-full"></div>
        <h3 className="text-base font-black text-gray-800 uppercase tracking-widest">
          Ikuti Kami
        </h3>
      </div>

      {/* ICON GRID - Disesuaikan agar pas 1 baris */}
      <div className="flex items-center justify-between gap-2">
        {socialLinks.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            target="_blank"
            className={`
              relative w-11 h-11 ${item.color} text-white rounded-xl 
              flex items-center justify-center transition-all duration-500 
              hover:-translate-y-1.5 hover:scale-105 active:scale-95
              shadow-md ${item.shadow} overflow-hidden group/icon
            `}
          >
            {/* EFEK SHINE */}
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover/icon:translate-x-full transition-transform duration-700 skew-x-12"></div>
            
            <div className="relative z-10 drop-shadow-sm">
              {item.icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}