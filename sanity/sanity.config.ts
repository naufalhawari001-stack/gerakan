import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schema';

export default defineConfig({
  name: 'default',
  title: 'Gerakan Rakyat Admin',

  // Pakai ID yang ada di gambar kamu (image_d81db2.png)
  projectId: '01hs5q07', 
  dataset: 'production',

  basePath: '/studio',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schema.types,
  },
});