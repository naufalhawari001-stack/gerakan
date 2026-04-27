import { type SchemaTypeDefinition } from 'sanity'

// Import semua skema yang telah dibuat
import news from './schemas/news'
import category from './schemas/category'
import author from './schemas/author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Daftarkan skema di sini agar muncul di dashboard Sanity Studio
    news,
    category,
    author
  ],
}