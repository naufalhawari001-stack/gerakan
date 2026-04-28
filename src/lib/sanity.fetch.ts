import { groq } from "next-sanity";
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
 * Mencari berita dengan kategori yang sama, mengecualikan berita aktif.
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
      "instagramUrl": instagramUrl,
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
 * 4. MENGAMBIL DAFTAR BERITA TERBARU (SIDEBAR POPULER)
 * Mengambil berita terbaru lengkap dengan kategori dan tanggal.
 */
export async function getLatestNews(limit = 5) {
  const query = groq`
    *[_type == "news" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      "slug": slug.current,
      "category": category->title,
      publishedAt
    }
  `;
  
  return client.fetch(
    query, 
    {}, 
    { next: { revalidate: 3600, tags: ["news"] } } 
  );
}

/**
 * 5. MENGAMBIL BERITA KHUSUS VIDEO (Untuk Homepage Video Section)
 * Mengambil berita yang memiliki link YouTube atau Instagram.
 */
export async function getVideoNews(limit = 3) {
  const query = groq`
    *[_type == "news" && (defined(youtubeUrl) || defined(instagramUrl)) && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      "slug": slug.current,
      "category": category->title,
      "mainImage": mainImage.asset->url,
      youtubeUrl,
      instagramUrl,
      publishedAt
    }
  `;
  return client.fetch(
    query, 
    {}, 
    { next: { revalidate: 30, tags: ["news"] } }
  );
}

/**
 * 6. MENGAMBIL SEMUA SLUG BERITA
 * Digunakan untuk generateStaticParams (SEO & Build Speed)
 */
export async function getAllNewsSlugs(): Promise<string[]> {
  const slugs = await client.fetch(
    newsSlugsQuery, 
    {}, 
    { next: { revalidate: 3600 } } 
  );
  return slugs || [];
}