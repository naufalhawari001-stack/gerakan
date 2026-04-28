import { defineType, defineField } from 'sanity';
import { PlayCircle } from 'lucide-react'; // Icon untuk pemanis di Sanity Studio

export default defineType({
  name: 'news',
  title: 'Berita',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Berita',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      options: {
        hotspot: true,
      },
      // MENAMBAHKAN ALT TEXT UNTUK SEO GAMBAR
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Teks Alternatif (SEO)',
          description: 'Penting untuk aksesibilitas dan mesin pencari (Google Image).',
          validation: (Rule) => Rule.required(),
        }
      ],
    }),
    // FITUR BARU: YOUTUBE URL UNTUK THUMBNAIL OTOMATIS
    defineField({
      name: 'youtubeUrl',
      title: 'Link Video YouTube (Thumbnail)',
      type: 'url',
      description: 'Jika Gambar Utama dikosongkan, website akan otomatis mengambil thumbnail dari link ini.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan (Snippet)',
      type: 'text',
      rows: 3,
      description: 'Muncul di halaman depan daftar berita.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'body',
      title: 'Isi Berita',
      type: 'array',
      of: [
        { type: 'block' },
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Teks Alternatif',
              validation: (Rule) => Rule.required(),
            }
          ]
        },
        // FITUR BARU: EMBED YOUTUBE DI DALAM KONTEN
        {
          type: 'object',
          name: 'youtube',
          title: 'Embed Video YouTube',
          icon: PlayCircle,
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Link Video YouTube',
              validation: (Rule) => Rule.required(),
            }
          ],
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      youtube: 'youtubeUrl'
    },
    prepare(selection) {
      const { author, youtube } = selection;
      return { 
        ...selection, 
        subtitle: author ? `Oleh: ${author} ${youtube ? '(Video)' : ''}` : '' 
      };
    },
  },
});