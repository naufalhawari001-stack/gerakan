import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Share2, User, ChevronRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getNewsBySlug, getAllNewsSlugs } from "@/lib/sanity.fetch";
import Footer from "@/components/Footer";
import HeaderDetail from "@/components/HeaderDetail";

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-800 last:mb-0">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-4xl font-black text-gray-900 mt-14 mb-6 uppercase tracking-tighter">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-black text-gray-900 mt-10 mb-4 uppercase tracking-tighter">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-8 space-y-3 text-lg md:text-xl text-gray-800">
        {children}
      </ul>
    ),
  },
};

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) notFound();

  const formattedDate = news.publishedAt 
    ? new Date(news.publishedAt).toLocaleDateString("id-ID", {
        day: "numeric", 
        month: "long", 
        year: "numeric",
      })
    : "Baru saja";

  return (
    <main className="bg-white min-h-screen relative overflow-x-hidden">
      <HeaderDetail />

      <div className="relative pt-36 md:pt-48 pb-24"> 
        <div className="max-w-7xl mx-auto px-4 md:px-8 font-sans">
          
          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] mb-12 text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors text-black font-bold">Home</Link>
            <ChevronRight size={10} />
            <Link href="/berita" className="hover:text-primary transition-colors text-black font-bold">News</Link>
            <ChevronRight size={10} />
            <span className="bg-orange-600 text-white px-3 py-1 rounded-sm font-bold shadow-md uppercase">
                {news.category || "Berita"}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* KOLOM KIRI: KONTEN UTAMA */}
            <div className="lg:col-span-8">
              <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-10 leading-[1.05] tracking-tighter">
                {news.title}
              </h1>

              {/* META INFO */}
              <div className="flex items-center justify-between border-y border-gray-100 py-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <User size={26} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Penulis</p>
                    <p className="text-sm font-black text-gray-900 uppercase">
                      {news.author || "Admin Gerakan"}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Waktu Terbit</p>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-tighter">{formattedDate}</p>
                </div>
                <button className="p-3.5 rounded-full bg-gray-50 text-gray-400 hover:bg-orange-600 hover:text-white transition-all shadow-sm">
                  <Share2 size={20} />
                </button>
              </div>

              {/* GAMBAR UTAMA - Rounded dikurangi ke 2xl */}
              <figure className="mb-16">
                <div className="relative h-[300px] md:h-[600px] w-full overflow-hidden rounded-2xl shadow-2xl border-8 border-white bg-gray-50">
                  <Image 
                    src={news.mainImage || "/placeholder.jpg"} 
                    alt={news.title} 
                    fill 
                    className="object-cover" 
                    priority 
                  />
                </div>
                <figcaption className="text-[11px] font-bold text-gray-400 mt-6 text-center leading-relaxed uppercase tracking-widest italic">
                   {news.title} <span className="text-orange-300 mx-3">•</span> (Foto: Dok. Gerakan Rakyat)
                </figcaption>
              </figure>

              {/* ISI BERITA */}
              <div className="prose prose-xl max-w-none first-letter:text-8xl first-letter:font-black first-letter:text-orange-600 first-letter:mr-4 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-2">
                {news.body ? (
                    <PortableText 
                      value={news.body} 
                      components={portableTextComponents} 
                    />
                ) : (
                    <p className="text-center italic text-gray-400">Konten tidak tersedia.</p>
                )}
              </div>
            </div>

            {/* KOLOM KANAN: SIDEBAR STICKY */}
            <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start">
              <div className="space-y-10">
                {/* TOPIK POPULER - Rounded dikurangi ke xl */}
                <div className="bg-gray-50/50 rounded-xl p-8 border border-gray-100 backdrop-blur-sm shadow-sm">
                  <h3 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-orange-600 border-l-4 border-orange-600 pl-4">Populer</h3>
                  <ul className="space-y-6">
                    {['01 PARPOL BARU', '02 BANYUMAS UPDATE', '03 GERAKAN SOSIAL'].map((item, i) => (
                      <li key={i} className="text-[11px] font-black text-gray-900 hover:text-orange-600 cursor-pointer transition-all hover:translate-x-1 uppercase tracking-tight border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA GABUNG - Rounded dikurangi ke xl */}
                <div className="bg-gray-900 p-10 rounded-xl text-white relative shadow-2xl overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                   <div className="relative z-10">
                      <h4 className="font-black text-2xl leading-none mb-4 uppercase tracking-tighter italic">Siap Jadi Pejuang?</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed mb-8 uppercase tracking-widest font-bold">#BanyumasBersatu</p>
                      <Link href="/gabung" className="block w-full bg-orange-600 text-white text-[11px] font-black py-5 rounded-lg text-center uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                        Daftar KTA
                      </Link>
                   </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}