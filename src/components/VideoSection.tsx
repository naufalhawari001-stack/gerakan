"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Instagram, ArrowRight, Video } from "lucide-react";

interface VideoSectionProps {
  videos: any[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  /**
   * 1. HELPER: LOGIC THUMBNAIL
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

  if (!videos || videos.length === 0) return null;

  // 2. LIMIT LOGIC: Maksimal 4 Card
  const displayVideos = videos.slice(0, 4);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Baru saja";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* HEADER SECTION - Seirama dengan NewsSection */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-[#FFB400] rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">Galeri Video</h2>
          </div>
          <Link href="/berita" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FFB400] transition-colors">
            Lihat Semua Video <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* VIDEO GRID - 4 KOLOM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {displayVideos.map((video) => {
            const thumbnailSrc = video.mainImage || 
                                 getYouTubeThumbnail(video.youtubeUrl) || 
                                 getInstagramThumbnail(video.instagramUrl) || 
                                 "/placeholder-news.jpg";
            
            const isInstagram = video.instagramUrl && !video.youtubeUrl;

            return (
              <article key={video._id} className="group flex flex-col">
                {/* IMAGE CONTAINER - Dengan Overlay Play Icon */}
                <Link href={`/berita/${video.slug}`} className="relative aspect-video w-full overflow-hidden rounded-2xl mb-4 bg-black shadow-sm border border-gray-100">
                  <Image
                    src={thumbnailSrc}
                    alt={video.title}
                    fill
                    className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  
                  {/* PLAY ICON OVERLAY - Selalu Muncul (Ciri Khas Video) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 shadow-2xl transition-transform duration-500 group-hover:scale-110">
                      {isInstagram ? (
                        <Instagram size={24} className="text-white" />
                      ) : (
                        <PlayCircle size={24} className="text-white" />
                      )}
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="bg-[#FFB400] text-black text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-lg">
                      {video.category || "Video"}
                    </span>
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-900 leading-snug tracking-tight group-hover:text-orange-500 transition-colors line-clamp-2 mb-2">
                    <Link href={`/berita/${video.slug}`}>
                      {video.title}
                    </Link>
                  </h3>
                  
                  <div className="flex items-center gap-2 text-[11px] font-medium text-gray-400 mt-auto uppercase tracking-widest">
                    <Video size={12} className="text-[#FFB400]" />
                    <span>{formatDate(video.publishedAt)}</span>
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