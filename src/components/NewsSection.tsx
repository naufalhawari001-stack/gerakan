"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, PlayCircle, Instagram } from "lucide-react";

interface NewsSectionProps {
  news: any[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  /**
   * 1. HELPER: LOGIC THUMBNAIL YOUTUBE
   */
  const getYouTubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
  };

  /**
   * 2. HELPER: LOGIC THUMBNAIL INSTAGRAM
   */
  const getInstagramThumbnail = (url: string) => {
    const match = url?.match(/(?:reels\/|p\/)([\w-]+)/);
    const id = match ? match[1] : null;
    return id ? `https://www.instagram.com/p/${id}/media/?size=l` : null;
  };

  if (!news || news.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-[#FF4500] rounded-full"></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600 mb-1">Update Terkini</p>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">Berita Terbaru</h2>
            </div>
          </div>
          <Link href="/berita" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-orange-600 transition-colors group">
            Lihat Semua Berita <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* GRID BERITA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.slice(0, 3).map((item) => {
            // LOGIKA PEMILIHAN THUMBNAIL (Priority: Manual > YT > IG)
            const thumbnailSrc = item.mainImage || 
                                 getYouTubeThumbnail(item.youtubeUrl) || 
                                 getInstagramThumbnail(item.instagramUrl) || 
                                 "/placeholder-news.jpg";

            const isVideo = !item.mainImage && (item.youtubeUrl || item.instagramUrl?.includes('/reels/'));
            const isInstagram = !item.mainImage && item.instagramUrl && !item.instagramUrl.includes('/reels/');

            return (
              <article 
                key={item._id} 
                className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-50 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-3"
              >
                {/* IMAGE CONTAINER */}
                <Link href={`/berita/${item.slug}`} className="relative h-[280px] w-full overflow-hidden block">
                  <Image
                    src={thumbnailSrc}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Overlay Play Icon untuk Video/Reels */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all duration-500">
                      <PlayCircle size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
                    </div>
                  )}

                  {/* Overlay Instagram Icon untuk Post Biasa */}
                  {isInstagram && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-all duration-500">
                      <Instagram size={64} className="text-white opacity-60 group-hover:scale-110 transition-transform" />
                    </div>
                  )}

                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[9px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg">
                      {item.category || "Berita"}
                    </span>
                  </div>
                </Link>

                {/* CONTENT CONTAINER */}
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-gray-400 text-[10px] font-black mb-6 uppercase tracking-widest">
                    <Calendar size={14} className="text-[#FF4500]" />
                    {new Date(item.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-gray-800 leading-tight group-hover:text-[#FF4500] transition-colors line-clamp-2 tracking-tight mb-4">
                    <Link href={`/berita/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed mb-8">
                    {item.excerpt || "Baca selengkapnya mengenai perjuangan rakyat banyumas hari ini..."}
                  </p>

                  <div className="mt-auto">
                    <Link 
                      href={`/berita/${item.slug}`} 
                      className="inline-flex items-center gap-4 text-gray-900 group/link"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-[#FF4500] group-hover/link:text-white transition-all duration-500 shadow-sm">
                        <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover/link:text-[#FF4500] transition-colors">
                        Selengkapnya
                      </span>
                    </Link>
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