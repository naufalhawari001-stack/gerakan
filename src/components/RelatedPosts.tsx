"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface RelatedPostsProps {
  posts: any[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  const getYouTubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "/placeholder.jpg";
  };

  return (
    <section className="mt-24 pt-16 border-t border-gray-100">
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-900 italic">
          Berita <span className="text-[#FF4500]">Terkait</span>
        </h3>
        <div className="hidden md:block h-[2px] flex-1 bg-gray-50 mx-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => {
          const thumbnail = post.mainImage || getYouTubeThumbnail(post.youtubeUrl);

          return (
            <Link 
              key={post._id} 
              href={`/berita/${post.slug}`}
              className="group flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-6 shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                <Image 
                  src={thumbnail} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
                <Calendar size={12} className="text-[#FF4500]" />
                {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
              </div>

              <h4 className="text-lg font-bold text-gray-800 leading-snug group-hover:text-[#FF4500] transition-colors line-clamp-2 italic">
                {post.title}
              </h4>

              <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                Baca Artikel <ArrowRight size={14} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}