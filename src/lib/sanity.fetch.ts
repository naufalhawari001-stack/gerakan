import { groq } from "next-sanity"; // Pastikan import groq ada di sini
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
 * Revalidate: 30 detik (Update data otomatis)
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
 * 3. MENGAMBIL BERITA TERKAIT
 * Mencari berita dengan kategori yang sama, tapi mengecualikan berita yang sedang dibuka.
 */
export async function getRelatedNews(categoryId: string, currentId: string) {
  if (!categoryId || !currentId) return [];

  const relatedQuery = groq`
    *[_type == "news" && category._ref == $categoryId && _id != $currentId && !(_id in path("drafts.**"))][0...3] {
      _id,
      title,
      "slug": slug.current,
      "category": category->title,
      "mainImage": mainImage.asset->url,
      "youtubeUrl": youtubeUrl,
      publishedAt
    }
  `;

  return client.fetch(
    relatedQuery, 
    { categoryId, currentId }, 
    { next: { revalidate: 30, tags: ["news"] } }
  );
}

/**
 * 4. MENGAMBIL SEMUA SLUG BERITA
 */
export async function getAllNewsSlugs(): Promise<string[]> {
  const slugs = await client.fetch(
    newsSlugsQuery, 
    {}, 
    { next: { revalidate: 3600 } } 
  );
  return slugs || [];
}