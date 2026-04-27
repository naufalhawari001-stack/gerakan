import { client } from "./sanity.client";
import { 
  settingsQuery, 
  newsQuery, 
  agendaQuery, 
  quoteQuery,
  singleNewsQuery, 
  newsSlugsQuery 
} from "./sanity.queries";

/**
 * 1. MENGAMBIL DATA HALAMAN UTAMA
 * Revalidate: 60 detik (Update data otomatis setiap menit)
 */
export async function getHomePageData() {
  const [settings, news, agenda, quote] = await Promise.all([
    client.fetch(settingsQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(newsQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(agendaQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(quoteQuery, {}, { next: { revalidate: 60 } }),
  ]);

  return { settings, news, agenda, quote };
}

/**
 * 2. MENGAMBIL DETAIL BERITA BERDASARKAN SLUG
 */
export async function getNewsBySlug(slug: string) {
  // Pastikan parameter { slug } dikirim sebagai argumen kedua
  return client.fetch(singleNewsQuery, { slug }, { next: { revalidate: 60 } });
}

/**
 * 3. MENGAMBIL SEMUA SLUG BERITA
 * Digunakan untuk generateStaticParams agar SEO mantap
 */
export async function getAllNewsSlugs(): Promise<string[]> {
  const slugs = await client.fetch(newsSlugsQuery, {}, { next: { revalidate: 60 } });
  return slugs || [];
}