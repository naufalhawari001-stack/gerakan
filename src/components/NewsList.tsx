"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Search, Filter, PlayCircle, ArrowRight } from "lucide-react";

interface NewsListProps {
  initialNews: any[];
}

export default function NewsList({ initialNews }: NewsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  /**
   * 1. HELPER: LOGIC THUMBNAIL YOUTUBE OTOMATIS
   */
  const getYouTubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "/placeholder-news.jpg";
  };

  // Daftar kategori unik (Filter data null agar tidak error)
  const categories = ["Semua", ...new Set(initialNews.map((item) => item.category).filter(Boolean))];

  // Logika filter ganda
  const filteredNews = initialNews.filter((item) => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "Baru saja";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto pb-24">
      {/* FILTER SECTION 
          -mt-24 agar bar pencarian sedikit menumpuk di atas header hitam (efek depth)
      */}
      <div className="flex flex-col lg:flex-row gap-6 mb-20 -mt-24 relative z-20">
        
        {/* 1. SEARCH BAR - Modern & Clean */}
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-[#FF4500] transition-colors" size={20} />
          </div>
          <input
            type="text"
            placeholder="Cari berita atau isu terkini..."
            className="w-full bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl py-6 pl-16 pr-8 text-gray-900 focus:ring-4 focus:ring-[#FF4500]/10 outline-none transition-all font-bold text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 2. CATEGORY CHIPS */}
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cat: any) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-7 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 ${
                activeCategory === cat
                  ? "bg-[#FF4500] text-white shadow-[#FF4500]/30 scale-105"
                  : "bg-white text-gray-500 hover:text-gray-900 border border-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID BERITA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => {
            // Priority: mainImage > YouTube Thumbnail > Placeholder
            const thumbnailSrc = item.mainImage || getYouTubeThumbnail(item.youtubeUrl);
            const isVideo = !item.mainImage && item.youtubeUrl;

            return (
              <article 
                key={item._id} 
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-700 hover:-translate-y-3 border border-gray-50"
              >
                {/* IMAGE CONTAINER */}
                <Link href={`/berita/${item.slug}`} className="block relative h-[280px] w-full overflow-hidden">
                  <Image
                    src={thumbnailSrc}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Overlay Video */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all duration-500">
                      <PlayCircle size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
                    </div>
                  )}

                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-xl">
                      {item.category || "Berita"}
                    </span>
                  </div>
                </Link>

                {/* CONTENT CONTAINER */}
                <div className="p-10">
                  <div className="flex items-center gap-3 text-gray-400 text-[10px] font-black mb-6 uppercase tracking-[0.2em]">
                    <Calendar size={14} className="text-[#FF4500]" />
                    {formatDate(item.publishedAt)}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-extrabold text-gray-800 leading-[1.3] group-hover:text-[#FF4500] transition-colors line-clamp-2 italic tracking-tight">
                    <Link href={`/berita/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                  
                  <p className="mt-4 text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed">
                    {item.excerpt || "Baca selengkapnya mengenai kabar terbaru dari barisan rakyat banyumas..."}
                  </p>

                  <Link 
                    href={`/berita/${item.slug}`} 
                    className="mt-8 inline-flex items-center gap-4 text-gray-900 group/link"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-[#FF4500] group-hover/link:text-white transition-all duration-500">
                      <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] group-hover/link:text-[#FF4500] transition-colors">
                      Selengkapnya
                    </span>
                  </Link>
                </div>
              </article>
            );
          })
        ) : (
          <div className="col-span-full py-32 text-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100">
            <Search size={48} className="mx-auto text-gray-200 mb-6" />
            <p className="text-gray-400 text-lg font-bold italic uppercase tracking-widest">
              Pencarian "{searchTerm}" tidak ditemukan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}