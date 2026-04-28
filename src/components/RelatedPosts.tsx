"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, PlayCircle, Instagram } from "lucide-react";

interface RelatedPostsProps {
  posts: any[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  /**
   * 1. HELPERS: LOGIC THUMBNAIL
   */
  const getYouTubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg` : null;
  };

  const getInstagramThumbnail = (url: string) => {
    const match = url?.match(/(?:reels\/|p\/)([\w-]+)/);
    return match ? `https://www.instagram.com/p/${match[1]}/media/?size=l` : null;
  };

  return (
    <section className="mt-8 pt-8 border-t border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-6 bg-[#FF4500] rounded-full"></div>
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-gray-900">
          Berita <span className="text-[#FF4500]">Terkait</span>
        </h3>
      </div>

      {/* GRID: 3 KOLOM (Karena berada di dalam col-span-8 detail page) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => {
          // LOGIKA THUMBNAIL & ICON
          const thumbnailSrc = post.mainImage || 
                               getYouTubeThumbnail(post.youtubeUrl) || 
                               getInstagramThumbnail(post.instagramUrl) || 
                               "/placeholder-news.jpg";

          const isVideo = !post.mainImage && (post.youtubeUrl || post.instagramUrl?.includes('/reels/'));
          const isInstagram = !post.mainImage && post.instagramUrl && !post.instagramUrl.includes('/reels/');

          return (
            <Link 
              key={post._id} 
              href={`/berita/${post.slug}`}
              className="group flex flex-col"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-4 bg-gray-100 shadow-sm border border-gray-50">
                <Image 
                  src={thumbnailSrc} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Overlay Play Icon untuk Video */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-all">
                    <PlayCircle size={40} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                )}

                {/* Overlay Instagram Icon */}
                {isInstagram && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-all">
                    <Instagram size={32} className="text-white opacity-60 group-hover:scale-110 transition-transform" />
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[7px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                </div>
              </div>
              
              {/* CONTENT */}
              <div className="flex flex-col flex-1">
                <h4 className="text-sm font-bold text-gray-900 leading-snug tracking-tight group-hover:text-[#FF4500] transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h4>

                <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400 mt-auto">
                  <Calendar size={12} className="text-[#FF4500]" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}