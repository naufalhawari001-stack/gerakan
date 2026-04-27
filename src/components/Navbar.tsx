"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="max-w-[1440px] mx-auto flex items-center px-8 py-8">
        
        {/* 1. LOGO SECTION - Diperbesar agar gagah */}
        <Link href="/" className="flex flex-col items-start z-50 transition-all hover:scale-105 group">
          <div className="relative h-12 md:h-16 w-48 md:w-64">
            <Image 
              src="/gr-logo.png" 
              alt="Logo Gerakan Rakyat" 
              fill
              className="object-contain object-left drop-shadow-2xl"
              priority
            />
          </div>
          <span className="text-white text-[10px] md:text-xs font-black tracking-[0.5em] uppercase mt-2 ml-1 opacity-90 group-hover:text-orange-400 transition-colors">
            Banyumas
          </span>
        </Link>
        
        {/* 2. MENU LINKS */}
        <div className="hidden lg:flex ml-auto items-center gap-x-10 text-white font-bold text-[13px] uppercase tracking-[0.15em] mr-12">
          <Link href="/" className="relative py-2 hover:text-orange-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-orange-500">
            Beranda
          </Link>
          
          {/* DROPDOWN TENTANG - PERBAIKAN DI SINI */}
          <div 
            className="relative h-full py-2" // Container induk tanpa gap
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <div className={`flex items-center gap-2 cursor-pointer transition-colors duration-300 ${isAboutOpen ? 'text-orange-400' : 'hover:text-orange-300'}`}>
              Tentang Gerakan 
              <ChevronDown size={14} className={`transition-transform duration-500 ${isAboutOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Menu Dropdown dengan 'Bridge' Padding */}
            <div className={`absolute top-full right-0 w-72 pt-6 transition-all duration-300 ${isAboutOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}>
              <div className="bg-white text-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden border-t-[6px] border-orange-600">
                <Link href="/profil" className="block px-8 py-4 hover:bg-orange-50 font-bold text-sm text-gray-800 hover:text-orange-700 transition-all border-b border-gray-50">Profil Gerakan</Link>
                <Link href="/visi-misi" className="block px-8 py-4 hover:bg-orange-50 font-bold text-sm text-gray-800 hover:text-orange-700 transition-all border-b border-gray-50">Visi dan Misi</Link>
                <Link href="/struktur" className="block px-8 py-4 hover:bg-orange-50 font-bold text-sm text-gray-800 hover:text-orange-700 transition-all">Struktur Organisasi</Link>
                
                <div className="bg-orange-600 p-1">
                   <Link href="/identitas" className="block px-7 py-3 bg-white hover:bg-orange-50 font-black text-[10px] text-orange-600 tracking-[0.2em] uppercase transition-all rounded-lg">
                      → Logo & Identitas
                   </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/suara" className="py-2 hover:text-orange-400 transition-all tracking-widest">Suara Rakyat</Link>
          <Link href="/pendaftaran" className="py-2 hover:text-orange-400 transition-all tracking-widest">Pendaftaran</Link>
          <Link href="/kontak" className="py-2 hover:text-orange-400 transition-all tracking-widest">Kontak</Link>
        </div>

        {/* 3. DONASI BUTTON */}
        <Link 
          href="/donasi" 
          className="hidden md:block bg-white text-orange-700 px-12 py-4 rounded-xl shadow-2xl font-black text-xs tracking-[0.2em] transition-all hover:-translate-y-1 hover:bg-orange-50 hover:shadow-orange-500/40 active:scale-95 shadow-black/20"
        >
          DONASI
        </Link>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white ml-auto p-2 hover:bg-white/10 rounded-lg transition">
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-orange-700 z-[100] lg:hidden flex flex-col pt-32 px-10 space-y-8 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-white"><X size={40} /></button>
        <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-3xl font-black text-white border-b-4 border-orange-500 pb-2 tracking-tighter">BERANDA</Link>
        <Link onClick={() => setIsMobileMenuOpen(false)} href="/pendaftaran" className="text-3xl font-black text-white border-b-4 border-orange-500 pb-2 tracking-tighter">PENDAFTARAN</Link>
        <Link onClick={() => setIsMobileMenuOpen(false)} href="/tentang" className="text-3xl font-black text-white border-b-4 border-orange-500 pb-2 tracking-tighter">TENTANG</Link>
        <Link onClick={() => setIsMobileMenuOpen(false)} href="/donasi" className="bg-white text-orange-700 text-center py-5 rounded-2xl font-black text-2xl shadow-2xl mt-8">DONASI SEKARANG</Link>
      </div>
    </header>
  );
}