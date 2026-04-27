import Link from 'next/link';
import Image from 'next/image';

export default function HeaderDetail() {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
        
        {/* LOGO - Ukuran diperbesar (h-16 w-52) */}
        <Link href="/" className="relative h-16 w-52 transition-transform hover:scale-105 duration-300">
          <Image 
            src="/gr-logo.png" 
            alt="Gerakan Rakyat"
            fill
            className="object-contain object-left" // object-left agar logo tetap di kiri
            priority
          />
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex items-center gap-10 text-[12px] font-black uppercase tracking-widest text-gray-900">
          <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
          <Link href="/tentang" className="hover:text-primary transition-colors">Tentang</Link>
          <Link href="/berita" className="text-primary">Berita</Link>
          <Link href="/kontak" className="hover:text-primary transition-colors">Kontak</Link>
        </nav>

        {/* TOMBOL DONASI */}
        <Link 
          href="/donasi" 
          className="bg-primary text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:bg-black transition-all duration-300"
        >
          Donasi
        </Link>
      </div>
    </header>
  );
}