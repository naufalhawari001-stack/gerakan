import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Instagram, ArrowRight, Video } from "lucide-react";

interface VideoSectionProps {
  videos: any[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
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

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* HEADER SECTION */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-[#FFB400] rounded-full"></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600 mb-1">Multimedia</p>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">Galeri Video</h2>
            </div>
          </div>
          <Link href="/berita" className="hidden md:flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-orange-600 transition-colors">
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => {
            const thumbnail = video.mainImage || 
                              getYouTubeThumbnail(video.youtubeUrl) || 
                              getInstagramThumbnail(video.instagramUrl) || 
                              "/placeholder.jpg";
            
            const isInstagram = video.instagramUrl && !video.youtubeUrl;

            return (
              <Link 
                key={video._id}
                href={`/berita/${video.slug}`}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* THUMBNAIL WRAPPER */}
                <div className="relative h-[400px] w-full overflow-hidden">
                  <Image 
                    src={thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* OVERLAY GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                  {/* PLAY ICON */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500 border border-white/30">
                      {isInstagram ? (
                        <Instagram size={40} className="text-white" />
                      ) : (
                        <PlayCircle size={40} className="text-white" />
                      )}
                    </div>
                  </div>

                  {/* CATEGORY TAG */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {video.category || "Video"}
                    </span>
                  </div>

                  {/* INFO TEXT AT BOTTOM */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-xl font-bold text-white leading-tight mb-3 line-clamp-2 group-hover:text-orange-400 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                       <Video size={12} className="text-orange-500" />
                       <span>{new Date(video.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* MOBILE SHOW ALL BUTTON */}
        <div className="mt-10 md:hidden">
            <Link href="/berita" className="flex items-center justify-center gap-3 w-full py-5 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
                Semua Video <ArrowRight size={14} />
            </Link>
        </div>
      </div>
    </section>
  );
}