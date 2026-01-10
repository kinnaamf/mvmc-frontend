// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://telegram.org/js/telegram-web-app.js',
          async: true,
          defer: true
        }
      ],
      meta: [
        {
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self' https://telegram.org; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org; style-src 'self' 'unsafe-inline';"
        }
      ]
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.mvmc.work'
    }
  },

  modules: ['@nuxt/fonts', '@nuxtjs/tailwindcss'],

  css: ['@/assets/pcss/main.pcss'],
})