export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/fonts'
  ],
  icon: {
    serverBundle: 'remote',
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Auto Trendy | Veturat më të mira në Kosovë',
      meta: [
        { name: 'description', content: 'Auto Trendy - Shitblerje e veturave, Lipjan, Kosovë.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: 'public/logo.png' }
      ]
    }
  }
})