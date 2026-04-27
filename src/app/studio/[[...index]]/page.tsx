'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity/sanity.config'

export default function StudioPage() {
  return (
    // Kita tambahkan z-index tinggi dan posisi fixed agar bersih
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-white">
      <NextStudio config={config} />
    </div>
  )
}