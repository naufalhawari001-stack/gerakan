import { type SchemaTypeDefinition } from 'sanity'

// Import semua skema yang ada di folder schemas
import news from './schemas/news'
import category from './schemas/category'
import author from './schemas/author'
import agenda from './schemas/agenda'
import quote from './schemas/quote'
import settings from './schemas/settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Daftarkan semua di sini agar menu Sidebar Sanity Studio lengkap
    news,
    category,
    author,
    agenda,
    quote,
    settings
  ],
}