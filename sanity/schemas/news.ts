import { defineType, defineField } from 'sanity';
import { PlayCircle, Instagram } from 'lucide-react';

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
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Teks Alternatif (SEO)',
          description: 'Penting untuk aksesibilitas dan Google Image.',
          validation: (Rule) => Rule.required(),
        }
      ],
    }),
    
    // FIELD UNTUK THUMBNAIL OTOMATIS (YOUTUBE)
    defineField({
      name: 'youtubeUrl',
      title: 'Link Video YouTube (Thumbnail)',
      type: 'url',
      description: 'Gunakan jika ingin auto-thumbnail dari YouTube (jika Gambar Utama kosong).',
    }),

    // FIELD UNTUK THUMBNAIL OTOMATIS (INSTAGRAM) - BARU!
    defineField({
      name: 'instagramUrl',
      title: 'Link Post/Reels Instagram (Thumbnail)',
      type: 'url',
      description: 'Gunakan jika ingin auto-thumbnail dari Instagram (jika Gambar Utama kosong).',
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
          fields: [{ name: 'alt', type: 'string', title: 'Teks Alternatif' }]
        },
        // EMBED YOUTUBE DI DALAM ARTIKEL
        {
          type: 'object',
          name: 'youtube',
          title: 'Embed Video YouTube',
          icon: PlayCircle,
          fields: [
            { name: 'url', type: 'url', title: 'URL YouTube', validation: (Rule) => Rule.required() }
          ],
        },
        // EMBED INSTAGRAM DI DALAM ARTIKEL
        {
          type: 'object',
          name: 'instagram',
          title: 'Embed Instagram',
          icon: Instagram,
          fields: [
            { name: 'url', type: 'url', title: 'URL Instagram', validation: (Rule) => Rule.required() }
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
      youtube: 'youtubeUrl',
      instagram: 'instagramUrl'
    },
    prepare(selection) {
      const { author, youtube, instagram } = selection;
      let typeLabel = '';
      if (youtube) typeLabel = '(YT Video)';
      if (instagram) typeLabel = '(IG Post)';
      
      return { 
        ...selection, 
        subtitle: `${author ? `Oleh: ${author}` : 'Admin'} ${typeLabel}`
      };
    },
  },
});