"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import HeaderDetail from "./HeaderDetail";

export default function DynamicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Jika scroll lebih dari 100px, ganti ke HeaderDetail
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Gunakan transisi halus saat pergantian.
        HeaderDetail muncul saat scroll, Navbar muncul saat di atas (Hero).
      */}
      <div className={`transition-all duration-500 fixed top-0 left-0 w-full z-[100] ${
        isScrolled 
        ? "translate-y-0 opacity-100 visible" 
        : "-translate-y-full opacity-0 invisible"
      }`}>
        <HeaderDetail isHomePage={true} />
      </div>

      <div className={`transition-all duration-500 ${
        isScrolled 
        ? "opacity-0 invisible" 
        : "opacity-100 visible"
      }`}>
        <Navbar />
      </div>
    </>
  );
}