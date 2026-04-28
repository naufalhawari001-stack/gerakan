"use client";

import { useState } from "react";
import Image from "next/image"; 
import { 
  Share2, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Send, 
  Link as LinkIcon 
} from "lucide-react";

export default function ShareAction({ title, url }: { title: string; url: string }) {
  const [showShare, setShowShare] = useState(false);

  const socialMedia = [
    { 
      name: "WhatsApp", 
      icon: <MessageCircle size={18} />, 
      color: "bg-[#25D366]", 
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " - " + url)}` 
    },
    { 
      name: "Facebook", 
      icon: <Facebook size={18} />, 
      color: "bg-[#1877F2]", 
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` 
    },
    { 
      name: "Twitter", 
      icon: <Twitter size={18} />, 
      color: "bg-[#000000]", 
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` 
    },
    { 
      name: "Telegram", 
      icon: <Send size={18} />, 
      color: "bg-[#0088cc]", 
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` 
    },
    { 
      name: "Pinterest", 
      icon: <div className="w-[18px] h-[18px] flex items-center justify-center font-bold text-[10px]">P</div>,
      color: "bg-[#E60023]", 
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}` 
    },
  ];

  return (
    <div className="relative">
      {/* TRIGGER BUTTON: Diperhalus ke bg-gray-800 */}
      <button 
        onClick={() => setShowShare(!showShare)}
        className="flex items-center gap-3 bg-gray-800 text-white px-6 py-3.5 rounded-full hover:bg-orange-600 transition-all shadow-xl active:scale-95"
      >
        <Share2 size={18} />
        <span className="text-[11px] font-black uppercase tracking-widest">Share</span>
      </button>

      {/* DROPDOWN MENU: Dipastikan muncul ke BAWAH (top-full) */}
      {showShare && (
        <>
          {/* Overlay transparan untuk menutup menu saat klik di luar */}
          <div className="fixed inset-0 z-[90]" onClick={() => setShowShare(false)} />
          
          <div className="absolute top-full right-0 mt-4 w-64 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-2xl p-4 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2 text-left">Bagikan Artikel</p>
            
            <div className="grid grid-cols-2 gap-3">
              {socialMedia.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-xl transition-all group"
                >
                  <div className={`${social.color} text-white p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform`}>
                    {social.icon}
                  </div>
                  <span className="text-[9px] font-bold mt-2 text-gray-500 uppercase tracking-tighter">{social.name}</span>
                </a>
              ))}

              {/* COPY LINK BUTTON */}
              <button 
                onClick={() => { 
                  navigator.clipboard.writeText(url); 
                  alert("Link berhasil disalin!");
                  setShowShare(false);
                }}
                className="flex items-center justify-center gap-3 p-3 hover:bg-gray-50 rounded-xl col-span-2 border-t border-gray-100 mt-2 transition-colors group"
              >
                <div className="bg-gray-100 text-gray-600 p-2 rounded-full group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                  <LinkIcon size={16} />
                </div>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Salin Link</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}