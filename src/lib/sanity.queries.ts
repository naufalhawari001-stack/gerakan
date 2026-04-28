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
 * PERBAIKAN: 
 * - Menambahkan filter !(_id in path("drafts.**")) agar berita yang muncul hanya yang sudah di-Publish.
 * - Menambahkan excerpt & authorImage agar tampilan list lebih lengkap.
 */
export const newsQuery = groq`
  *[_type == "news" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "author": author->name,
    "authorImage": author->image.asset->url,
    "mainImage": mainImage.asset->url,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..150], "") + "...",
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
    "author": author->name,
    "authorImage": author->image.asset->url,
    "mainImage": mainImage.asset->url,
    publishedAt,
    body 
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