import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { User, ChevronRight, Clock, Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getNewsBySlug, getAllNewsSlugs } from "@/lib/sanity.fetch";
import Footer from "@/components/Footer";
import HeaderDetail from "@/components/HeaderDetail";
import ShareAction from "@/components/ShareAction";
import { Metadata } from "next";

// Logic SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) return { title: "Berita Tidak Ditemukan" };
  const title = `${news.title} | Gerakan Rakyat BMS`;
  return {
    title,
    description: news.excerpt || "Berita terbaru Gerakan Rakyat BMS",
    openGraph: { title, images: [{ url: news.mainImage || "/og-image.jpg" }] },
  };
}

// Logic Hitung Waktu Baca
const calculateReadingTime = (body: any[]) => {
  const text = body?.map(b => b.children?.map((c:any) => c.text).join("")).join(" ") || "";
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200) || 1;
};

const portableTextComponents = {
  block: {
    // Sesuai image_a0c2e3.png, kita gunakan leading-relaxed dan warna yang tidak terlalu hitam
    normal: ({ children }: any) => <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-700">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mt-14 mb-6 uppercase italic tracking-tight">{children}</h2>,
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

  const readingTime = calculateReadingTime(news.body);
  const currentUrl = `https://gerakanrakyatbms.com/berita/${slug}`;

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

              {/* META INFO */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-gray-100 py-8 mb-12 gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-gray-50 flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50"><User size={32} /></div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Penulis</p>
                    {/* Diubah ke gray-700 agar tidak terlalu hitam pekat */}
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

                {/* Share Action sekarang menggunakan bg-gray-800 (lebih soft) */}
                <ShareAction title={news.title} url={currentUrl} />
              </div>

              {/* GAMBAR UTAMA */}
              <figure className="mb-16">
                <div className="relative h-[300px] md:h-[600px] w-full overflow-hidden rounded-3xl shadow-2xl border-8 border-white">
                  <Image src={news.mainImage || "/placeholder.jpg"} alt={news.title} fill className="object-cover" priority />
                </div>
                <figcaption className="text-[11px] font-medium text-gray-400 mt-6 text-center uppercase tracking-widest italic">Foto: Dok. Gerakan Rakyat • {news.title}</figcaption>
              </figure>

              <article className="prose prose-xl max-w-none first-letter:text-8xl first-letter:font-black first-letter:text-orange-600 first-letter:mr-4 first-letter:float-left first-letter:leading-[0.85]">
                <PortableText value={news.body} components={portableTextComponents} />
              </article>
            </div>

            <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start">
               <div className="bg-gray-50/50 rounded-2xl p-8 border border-gray-100 shadow-sm">
                 <h3 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-orange-600 border-l-4 border-orange-600 pl-4">Populer</h3>
                 <ul className="space-y-6 text-[11px] font-bold uppercase text-gray-600">
                   <li className="hover:text-orange-600 cursor-pointer transition-all border-b pb-3">01 PARPOL BARU</li>
                   <li className="hover:text-orange-600 cursor-pointer transition-all border-b pb-3">02 BANYUMAS UPDATE</li>
                   <li className="hover:text-orange-600 cursor-pointer">03 GERAKAN SOSIAL</li>
                 </ul>
               </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}