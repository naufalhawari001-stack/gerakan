import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
// PERBAIKAN: Jika file ini ada di dalam folder 'sanity', cukup panggil './schema'
import { schema } from './schema'; 

export default defineConfig({
  name: 'default',
  title: 'Gerakan Rakyat Admin',

  // Project ID sudah sesuai dengan gambar image_d81db2.png
  projectId: '01hs5q07', 
  dataset: 'production',

  basePath: '/studio',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schema.types,
  },
});