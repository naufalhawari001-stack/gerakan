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
 * 2. QUERY DAFTAR BERITA
 * PERBAIKAN: Mengambil title kategori dan nama penulis menggunakan "->"
 */
export const newsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "author": author->name,
    "mainImage": mainImage.asset->url,
    publishedAt
  }
`;

/**
 * 3. QUERY DETAIL BERITA BERDASARKAN SLUG
 * PERBAIKAN: Dereference category & author agar body tidak error
 */
export const singleNewsQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "author": author->name,
    "mainImage": mainImage.asset->url,
    publishedAt,
    body 
  }
`;

/**
 * 4. QUERY ARRAY SLUG BERITA
 */
export const newsSlugsQuery = groq`
  *[_type == "news" && defined(slug.current)][].slug.current
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