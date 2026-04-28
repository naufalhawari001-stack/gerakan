"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface NewsListProps {
  initialNews: any[];
}

export default function NewsList({ initialNews }: NewsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // 4 Kolom x 4 Baris

  // Helpers Thumbnail
  const getYouTubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg` : null;
  };

  const getInstagramThumbnail = (url: string) => {
    const match = url?.match(/(?:reels\/|p\/)([\w-]+)/);
    return match ? `https://www.instagram.com/p/${match[1]}/media/?size=l` : null;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Baru saja";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  // Filter Logic
  const categories = ["Semua", ...new Set(initialNews.map((item) => item.category).filter(Boolean))];
  
  const filteredNews = initialNews.filter((item) => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1440px] mx-auto pb-24">
      {/* SEARCH & FILTER */}
      <div className="flex flex-col lg:flex-row gap-6 mb-16 -mt-24 relative z-20">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-[#FF4500] transition-colors" size={20} />
          </div>
          <input
            type="text"
            placeholder="Cari berita..."
            className="w-full bg-white border border-gray-100 shadow-xl rounded-2xl py-6 pl-16 pr-8 text-gray-900 focus:ring-4 focus:ring-[#FF4500]/10 outline-none transition-all font-bold text-sm"
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cat: any) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md ${
                activeCategory === cat ? "bg-[#FF4500] text-white" : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID 4 KOLOM (SAMA DENGAN HOMEPAGE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {currentItems.length > 0 ? (
          currentItems.map((item) => {
            const thumbnailSrc = item.mainImage || getYouTubeThumbnail(item.youtubeUrl) || getInstagramThumbnail(item.instagramUrl) || "/placeholder-news.jpg";
            return (
              <article key={item._id} className="group flex flex-col">
                <Link href={`/berita/${item.slug}`} className="relative aspect-video w-full overflow-hidden rounded-2xl mb-4 bg-gray-100 shadow-sm border border-gray-50">
                  <Image src={thumbnailSrc} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-md">{item.category}</span>
                  </div>
                </Link>
                <div className="flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-900 leading-snug tracking-tight group-hover:text-[#FF4500] transition-colors line-clamp-2 mb-2">
                    <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] font-medium text-gray-400 mt-auto">
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="col-span-full py-32 text-center text-gray-400 font-bold uppercase tracking-widest">Berita tidak ditemukan</div>
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="mt-20 flex justify-center items-center gap-3">
          <button 
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`w-12 h-12 rounded-xl text-xs font-black transition-all ${
                  currentPage === i + 1 ? "bg-[#FF4500] text-white shadow-lg shadow-orange-600/20" : "bg-white border border-gray-100 text-gray-400 hover:border-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}