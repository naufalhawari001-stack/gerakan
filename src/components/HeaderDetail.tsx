"use client";

import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from "lucide-react";

interface HeaderDetailProps {
  isHomePage?: boolean;
}

export default function HeaderDetail({ isHomePage = false }: HeaderDetailProps) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between font-sans">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex flex-col items-start transition-transform hover:scale-105 duration-300 group">
          <div className="relative h-10 md:h-12 w-40 md:w-56">
            <Image 
              src="/gr-logo.png" 
              alt="Gerakan Rakyat"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <span className="text-gray-400 text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase ml-1 mt-1 transition-colors group-hover:text-orange-600">
            Banyumas
          </span>
        </Link>

        {/* NAVIGATION MENU */}
        <nav className="hidden lg:flex items-center gap-10 text-[12px] font-black uppercase tracking-[0.15em] text-gray-900">
          <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
          
          <div 
            className="relative h-full flex items-center py-4"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <div className={`flex items-center gap-1 cursor-pointer transition-colors ${isAboutOpen ? 'text-orange-600' : 'hover:text-orange-600'}`}>
              Tentang Gerakan <ChevronDown size={14} className={`transition-transform duration-300 ${isAboutOpen ? 'rotate-180' : ''}`} />
            </div>

            <div className={`absolute top-full left-0 w-72 pt-2 transition-all duration-300 ${isAboutOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}>
              <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-b-md overflow-hidden border-t-[5px] border-orange-600">
                <Link href="/profil" className="block px-8 py-4 hover:bg-orange-50 font-black text-[11px] text-gray-900 hover:text-orange-600 transition-all border-b border-gray-50"> Profil Gerakan </Link>
                <Link href="/visi-misi" className="block px-8 py-4 hover:bg-orange-50 font-black text-[11px] text-gray-900 hover:text-orange-600 transition-all border-b border-gray-50"> Visi dan Misi </Link>
                <Link href="/struktur" className="block px-8 py-4 hover:bg-orange-50 font-black text-[11px] text-gray-900 hover:text-orange-600 transition-all"> Struktur Organisasi </Link>
                <div className="p-1 bg-gray-50">
                   <Link href="/identitas" className="block px-7 py-3 bg-white hover:bg-orange-50 font-black text-[10px] text-orange-600 tracking-[0.2em] uppercase transition-all rounded shadow-sm"> → Logo & Identitas </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/berita" className={`transition-all ${!isHomePage ? "text-orange-600 underline underline-offset-8 decoration-2" : "hover:text-orange-600"}`}>Berita</Link>
          <Link href="/kontak" className="hover:text-orange-600 transition-colors">Kontak</Link>
        </nav>

        {/* DONASI BUTTON */}
        <Link href="/donasi" className="bg-orange-600 text-white px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-gray-900 transition-all duration-300">
          Donasi
        </Link>
      </div>
    </header>
  );
}