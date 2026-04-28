import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { User, ChevronRight, Clock, Calendar, PlayCircle } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getNewsBySlug, getAllNewsSlugs, getRelatedNews } from "@/lib/sanity.fetch";
import Footer from "@/components/Footer";
import HeaderDetail from "@/components/HeaderDetail";
import ShareAction from "@/components/ShareAction";
import RelatedPosts from "@/components/RelatedPosts"; // KOMPONEN BARU
import { Metadata } from "next";

/**
 * 1. HELPER: EKSTRAK ID YOUTUBE & THUMBNAIL
 */
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getYouTubeThumbnail = (url: string) => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "/placeholder.jpg";
};

/**
 * 2. CUSTOM PORTABLE TEXT COMPONENTS
 */
const portableTextComponents = {
  types: {
    youtube: ({ value }: any) => {
      const id = getYouTubeId(value.url);
      if (!id) return null;
      return (
        <div className="my-12 relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: any) => <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-700">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mt-14 mb-6 uppercase italic tracking-tight">{children}</h2>,
  },
};

// Logic SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) return { title: "Berita Tidak Ditemukan" };
  
  const ogImage = news.mainImage || getYouTubeThumbnail(news.youtubeUrl);

  return {
    title: `${news.title} | Gerakan Rakyat BMS`,
    description: news.excerpt || "Berita terbaru Gerakan Rakyat BMS",
    openGraph: { title: news.title, images: [{ url: ogImage }] },
  };
}

// Logic Hitung Waktu Baca
const calculateReadingTime = (body: any[]) => {
  const text = body?.map(b => b.children?.map((c:any) => c.text).join("")).join(" ") || "";
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200) || 1;
};

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) notFound();

  // AMBIL DATA BERITA TERKAIT (Berdasarkan Category ID berita saat ini)
  const relatedPosts = await getRelatedNews(news.categoryRef, news._id);

  const readingTime = calculateReadingTime(news.body);
  const currentUrl = `https://gerakanrakyatbms.com/berita/${slug}`;
  const finalThumbnail = news.mainImage || getYouTubeThumbnail(news.youtubeUrl);

  return (
    <main className="bg-white min-h-screen relative font-sans">
      <HeaderDetail />
      
      <div className="relative pt-24 md:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-gray-400">
            <Link href="/" className="text-black hover:text-orange-600 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="bg-orange-600 text-white px-3 py-1 rounded-sm shadow-md font-bold uppercase">{news.category || "Berita"}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-700 mb-10 leading-[1.1] tracking-tight italic">
                {news.title}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-gray-100 py-8 mb-12 gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-orange-50 flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><User size={32} /></div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Penulis</p>
                    <p className="text-base font-bold text-gray-700 uppercase tracking-tight">{news.author || "Admin"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 md:gap-12 text-sm font-semibold text-gray-600">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase flex items-center gap-1.5 font-black tracking-widest"><Calendar size={12}/> Terbit</span>
                    {new Date(news.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })} • {new Date(news.publishedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase flex items-center gap-1.5 font-black tracking-widest"><Clock size={12}/> Baca</span>
                    {readingTime} Menit
                  </div>
                </div>

                <ShareAction title={news.title} url={currentUrl} />
              </div>

              {/* GAMBAR UTAMA */}
              <figure className="mb-16 group relative">
                <div className="relative h-[300px] md:h-[600px] w-full overflow-hidden rounded-3xl shadow-2xl border-8 border-white bg-gray-100">
                  <Image 
                    src={finalThumbnail} 
                    alt={news.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    priority 
                  />
                  {!news.mainImage && news.youtubeUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                        <PlayCircle size={80} className="text-white opacity-80 drop-shadow-2xl" />
                    </div>
                  )}
                </div>
                <figcaption className="text-[11px] font-medium text-gray-400 mt-6 text-center uppercase tracking-widest italic">
                   {news.mainImage ? "Foto: Dok. Gerakan Rakyat" : "Video: YouTube Gerakan Rakyat"} • {news.title}
                </figcaption>
              </figure>

              {/* ISI BERITA */}
              <article className="prose prose-xl max-w-none first-letter:text-8xl first-letter:font-black first-letter:text-orange-600 first-letter:mr-4 first-letter:float-left first-letter:leading-[0.85] pb-20 border-b border-gray-100">
                <PortableText value={news.body} components={portableTextComponents} />
              </article>

              {/* FITUR BARU: BERITA TERKAIT (RELATED POSTS) */}
              <RelatedPosts posts={relatedPosts} />
            </div>

            <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start">
               {/* SIDEBAR WIDGET */}
               <div className="bg-gray-50/50 rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
                 <h3 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-orange-600 border-l-4 border-orange-600 pl-4">Populer</h3>
                 <ul className="space-y-6 text-[11px] font-bold uppercase text-gray-600">
                   <li className="hover:text-orange-600 cursor-pointer transition-all border-b pb-3">01 PARPOL BARU</li>
                   <li className="hover:text-orange-600 cursor-pointer transition-all border-b pb-3">02 BANYUMAS UPDATE</li>
                   <li className="hover:text-orange-600 cursor-pointer">03 GERAKAN SOSIAL</li>
                 </ul>
               </div>

               {/* ADS / CTA BOX */}
               <div className="bg-black rounded-2xl p-8 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <h4 className="text-lg font-black italic uppercase leading-tight mb-4 relative z-10">Gabung Perjuangan Rakyat Banyumas</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 relative z-10">Suarakan aspirasimu, kawal perubahan bersama kami.</p>
                  <Link href="/pendaftaran" className="inline-block bg-orange-600 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all relative z-10">
                    Daftar Anggota
                  </Link>
               </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}