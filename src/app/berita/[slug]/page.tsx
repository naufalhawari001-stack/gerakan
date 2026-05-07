import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { User, ChevronRight, Clock, Calendar, PlayCircle } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getNewsBySlug, getAllNewsSlugs, getRelatedNews, getLatestNews } from "@/lib/sanity.fetch";
import Footer from "@/components/Footer";
import HeaderDetail from "@/components/HeaderDetail";
import ShareAction from "@/components/ShareAction";
import RelatedPosts from "@/components/RelatedPosts"; 
import FollowUs from "@/components/FollowUs"; 
import CommentSection from "@/components/CommentSection"; // IMPORT BARU
import { Metadata } from "next";

/**
 * 1. HELPERS: THUMBNAIL GENERATORS
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

/**
 * 2. CUSTOM PORTABLE TEXT COMPONENTS
 */
const portableTextComponents = {
  types: {
    youtube: ({ value }: any) => {
      const id = value.url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)?.[2];
      return id ? (
        <div className="my-8 relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black">
          <iframe src={`https://www.youtube.com/embed/${id}`} title="YouTube" allowFullScreen className="absolute inset-0 w-full h-full" />
        </div>
      ) : null;
    },
    instagram: ({ value }: any) => {
      const embedUrl = value.url?.endsWith('/') ? `${value.url}embed/` : `${value.url}/embed/`;
      return (
        <div className="my-8 flex justify-center w-full">
          <iframe src={embedUrl} className="w-full max-w-[540px] min-h-[600px] rounded-3xl border border-gray-100 shadow-xl" scrolling="no" />
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: any) => <p className="text-lg md:text-xl mb-6 leading-relaxed text-gray-700">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mt-10 mb-5 uppercase tracking-tight">{children}</h2>,
  },
};

/**
 * 3. METADATA: FIXED DOUBLE BRANDING
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  
  if (!news) return { title: "Berita Tidak Ditemukan" };
  
  const ogImage = news.mainImage || 
                  getYouTubeThumbnail(news.youtubeUrl) || 
                  getInstagramThumbnail(news.instagramUrl) || 
                  "/og-image.jpg";

  return {
    title: news.title, 
    description: news.excerpt || "Baca berita terbaru dari Gerakan Rakyat Banyumas",
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: [{ url: ogImage }],
      url: `https://gerakanrakyatbms.com/berita/${slug}`,
      siteName: "Gerakan Rakyat BMS",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) notFound();

  const [relatedPosts, popularPosts] = await Promise.all([
    getRelatedNews(news.categoryRef, news._id),
    getLatestNews(5) 
  ]);

  const readingTime = Math.ceil((news.body?.map((b:any) => b.children?.map((c:any) => c.text).join("")).join(" ").split(/\s+/).length || 0) / 200) || 1;
  const currentUrl = `https://gerakanrakyatbms.com/berita/${slug}`;

  return (
    <main className="bg-white min-h-screen relative font-sans">
      <HeaderDetail />
      
      <div className="relative pt-10 md:pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-gray-400">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="bg-orange-600 text-white px-3 py-1 rounded-sm font-bold uppercase">{news.category || "Berita"}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              
              {/* JUDUL */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-[1.15] tracking-tight">
                {news.title}
              </h1>

              {/* META INFO */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-gray-100 py-6 mb-8 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-gray-400 border border-gray-100">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Penulis</p>
                    <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">{news.author || "Admin"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                  <div className="flex gap-8 text-xs font-semibold text-gray-500">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Terbit</span>
                      {new Date(news.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Baca</span>
                      {readingTime} Menit
                    </div>
                  </div>
                  <ShareAction title={news.title} url={currentUrl} />
                </div>
              </div>

              {/* MEDIA HEADER */}
              {news.mainImage && (
                <figure className="mb-10 group">
                  <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-[2rem] shadow-xl border-8 border-white bg-gray-50">
                    <Image src={news.mainImage} alt={news.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                  </div>
                  <figcaption className="text-[10px] text-gray-400 mt-4 text-center uppercase tracking-widest">
                     Foto: Dok. Gerakan Rakyat • {news.title}
                  </figcaption>
                </figure>
              )}

              {/* ISI KONTEN */}
              <article className="prose prose-xl max-w-none pb-0 first-letter:text-7xl first-letter:font-black first-letter:text-orange-600 first-letter:mr-3 first-letter:float-left">
                <PortableText value={news.body} components={portableTextComponents} />
              </article>

              {/* RELATED POSTS SECTION */}
              <div className="mt-4">
                 <RelatedPosts posts={relatedPosts} />
              </div>

              {/* COMMENT SECTION (DI TARUH DI BAWAH RELATED POSTS) */}
              <CommentSection postSlug={slug} />
            </div>

            {/* SIDEBAR */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
               <FollowUs socials={news.socialMedia} />

               {/* POPULER SIDEBAR */}
               <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm mb-8">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-7 bg-[#FF4500] rounded-full"></div>
                    <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest">Populer</h3>
                 </div>
                 <ul className="space-y-8">
                   {popularPosts.map((post: any, index: number) => (
                     <li key={post._id} className="border-b last:border-0 pb-5">
                       <Link href={`/berita/${post.slug}`} className="flex gap-4 items-start group/item">
                         <span className="text-2xl font-black text-gray-100 group-hover/item:text-orange-200 transition-colors pt-1">
                           {(index + 1).toString().padStart(2, '0')}
                         </span>
                         <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold uppercase text-gray-800 group-hover/item:text-orange-600 transition-colors line-clamp-2 leading-tight">
                              {post.title}
                            </span>
                            <div className="flex items-center gap-2 text-[8px] font-black uppercase text-gray-400">
                               <span className="text-orange-600">{post.category}</span>
                               <span>•</span>
                               <span>{new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                            </div>
                         </div>
                       </Link>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* CTA CARD */}
               <div className="bg-black rounded-3xl p-8 text-white relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                  <h4 className="text-lg font-black uppercase leading-tight mb-4 relative z-10">Gabung Gerakan Rakyat</h4>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-6 relative z-10">Suarakan aspirasi bersama rakyat Banyumas.</p>
                  <Link href="/pendaftaran" className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all relative z-10 shadow-lg shadow-orange-600/20">
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