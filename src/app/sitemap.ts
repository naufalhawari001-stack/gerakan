import { MetadataRoute } from 'next';
import { getAllNewsSlugs } from '@/lib/sanity.fetch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gerakanrakyatbms.com';

  // 1. Ambil semua slug berita dari Sanity secara otomatis
  const slugs = await getAllNewsSlugs();
  
  // 2. Format menjadi URL lengkap untuk sitemap
  const newsEntries = slugs.map((slug: string) => ({
    url: `${baseUrl}/berita/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 3. Gabungkan dengan halaman utama (Statis)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...newsEntries,
  ];
}