"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface NewsSectionProps {
  news: any[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  /**
   * 1. HELPER: LOGIC THUMBNAIL YOUTUBE & INSTAGRAM
   */
  const getYouTubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    const id = match && match[2].length === 11 ? match[2] : null;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
  };

  const getInstagramThumbnail = (url: string) => {
    const match = url?.match(/(?:reels\/|p\/)([\w-]+)/);
    const id = match ? match[1] : null;
    return id ? `https://www.instagram.com/p/${id}/media/?size=l` : null;
  };

  if (!news || news.length === 0) return null;

  // 2. FILTER LOGIC: Hanya kategori "Berita" & bukan "Video"
  const newsEntries = news
    .filter((item) => {
      const categoryName = item.category?.toLowerCase() || "";
      return categoryName === "berita" && categoryName !== "video";
    })
    .slice(0, 8); // Tampilkan 8 berita (2 baris x 4 kolom)

  const formatDate = (dateString: string) => {
    if (!dateString) return "Baru saja";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 24 && diffInHours > 0) return `${diffInHours} jam lalu`;
    if (diffInHours === 0) return "Baru saja";
    
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* HEADER SECTION - Lebih Minimalis */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-[#FF4500] rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">Berita Terbaru</h2>
          </div>
          <Link href="/berita" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FF4500] transition-colors">
            Lihat Semua <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* GRID BERITA - 4 KOLOM (SESUAI IMAGE_4D8B5C) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {newsEntries.map((item) => {
            const thumbnailSrc = item.mainImage || 
                                 getYouTubeThumbnail(item.youtubeUrl) || 
                                 getInstagramThumbnail(item.instagramUrl) || 
                                 "/placeholder-news.jpg";

            return (
              <article key={item._id} className="group flex flex-col">
                {/* IMAGE CONTAINER - Aspect Ratio 16:9 agar rapi */}
                <Link href={`/berita/${item.slug}`} className="relative aspect-video w-full overflow-hidden rounded-2xl mb-4 bg-gray-100 shadow-sm">
                  <Image
                    src={thumbnailSrc}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Tag Overlay (Kecil & Rapih) */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-md">
                      {item.category}
                    </span>
                  </div>
                </Link>

                {/* CONTENT - Tipografi ala Portal Berita */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-900 leading-snug tracking-tight group-hover:text-[#FF4500] transition-colors line-clamp-2 mb-2">
                    <Link href={`/berita/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                  
                  <div className="flex items-center gap-2 text-[11px] font-medium text-gray-400 mt-auto">
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}