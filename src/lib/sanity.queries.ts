import { groq } from "next-sanity";

/**
 * 1. QUERY PENGATURAN GLOBAL
 */
export const settingsQuery = groq`
  *[_type == "settings"][0] {
    siteName,
    heroHeadline,
    heroTagline,
    contactInfo,
    socialMedia,
    "footerLogo": logos.footerLogo.asset->url,
    "mainLogo": logos.mainLogo.asset->url
  }
`;

/**
 * 2. QUERY DAFTAR BERITA (Untuk Homepage & Arsip)
 * PERBAIKAN: Kita ambil data lebih banyak (misal 50) agar setelah difilter 
 * kategori "Video" di frontend, sisa datanya masih cukup untuk tampil 8 card.
 */
export const newsQuery = groq`
  *[_type == "news" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...50] {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "author": author->name,
    "authorImage": author->image.asset->url,
    "mainImage": mainImage.asset->url,
    "youtubeUrl": youtubeUrl,
    "instagramUrl": instagramUrl,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "...",
    publishedAt
  }
`;

/**
 * 3. QUERY DETAIL BERITA BERDASARKAN SLUG
 */
export const singleNewsQuery = groq`
  *[_type == "news" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categoryRef": category._ref, 
    "author": author->name,
    "authorImage": author->image.asset->url,
    "mainImage": mainImage.asset->url,
    "youtubeUrl": youtubeUrl,
    "instagramUrl": instagramUrl,
    publishedAt,
    body,
    "socialMedia": *[_type == "settings"][0].socialMedia
  }
`;

/**
 * 4. QUERY ARRAY SLUG BERITA
 */
export const newsSlugsQuery = groq`
  *[_type == "news" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current
`;

/**
 * 5. QUERY AGENDA & KTA
 */
export const agendaQuery = groq`
  *[_type == "agenda"][0] {
    title,
    slogan,
    registrationLink
  }
`;

/**
 * 6. QUERY QUOTE KETUA UMUM
 */
export const quoteQuery = groq`
  *[_type == "quote"][0] {
    author,
    role,
    quoteText,
    "photo": photo.asset->url
  }
`;