import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { transformerMetaFocus } from './src/transformerMetaFocus'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://evstinik.github.io',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      // themes: {
      //   light: 'github-light',
      //   dark: 'github-dark'
      // },
      wrap: true,
      transformers: [transformerMetaFocus()]
    }
  }
})
