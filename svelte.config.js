import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ fallback: null, precompress: false, strict: true }),
    // относительные ссылки: сайт работает и на username.github.io/repo/, и на своём домене
    paths: { relative: true },
    prerender: { entries: ['*'] }
  }
};

export default config;
