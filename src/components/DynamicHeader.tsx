"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import HeaderDetail from "./HeaderDetail";

export default function DynamicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted true supaya React tahu kita sudah di client-side
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };

    // Cek posisi awal saat pertama kali mount (antisipasi refresh di tengah halaman)
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // PERBAIKAN KRUSIAL: 
  // Sebelum mounted, kita kembalikan Navbar default (sama dengan yang dirender server)
  // Ini akan menghilangkan error Hydration Mismatch.
  if (!mounted) {
    return <Navbar />;
  }

  return (
    <>
      {/* HEADER STICKY (Muncul saat scroll) */}
      <div className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 transform ${
        isScrolled 
        ? "translate-y-0 opacity-100 visible" 
        : "-translate-y-full opacity-0 invisible"
      }`}>
        <HeaderDetail isHomePage={true} />
      </div>

      {/* NAVBAR HERO (Hanya muncul saat di atas) */}
      <div className={`transition-opacity duration-500 ${isScrolled ? "opacity-0 invisible" : "opacity-100 visible"}`}>
        <Navbar />
      </div>
    </>
  );
}