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
 * Revalidate diturunkan ke 30 detik agar perubahan cepat muncul.
 * Menambahkan perspective: 'published' untuk memastikan berita lama tetap aman.
 */
export async function getHomePageData() {
  try {
    const [settings, news, agenda, quote] = await Promise.all([
      client.fetch(settingsQuery, {}, { 
        next: { revalidate: 30, tags: ["settings"] } 
      }),
      client.fetch(newsQuery, {}, { 
        next: { revalidate: 30, tags: ["news"] } 
      }),
      client.fetch(agendaQuery, {}, { 
        next: { revalidate: 30, tags: ["agenda"] } 
      }),
      client.fetch(quoteQuery, {}, { 
        next: { revalidate: 30, tags: ["quote"] } 
      }),
    ]);

    return { settings, news, agenda, quote };
  } catch (error) {
    console.error("Gagal mengambil data Sanity:", error);
    return { settings: null, news: [], agenda: null, quote: null };
  }
}

/**
 * 2. MENGAMBIL DETAIL BERITA BERDASARKAN SLUG
 */
export async function getNewsBySlug(slug: string) {
  return client.fetch(
    singleNewsQuery, 
    { slug }, 
    { next: { revalidate: 30, tags: [`news-${slug}`] } }
  );
}

/**
 * 3. MENGAMBIL SEMUA SLUG BERITA
 */
export async function getAllNewsSlugs(): Promise<string[]> {
  const slugs = await client.fetch(
    newsSlugsQuery, 
    {}, 
    { next: { revalidate: 3600 } } // Slug cukup 1 jam sekali
  );
  return slugs || [];
}