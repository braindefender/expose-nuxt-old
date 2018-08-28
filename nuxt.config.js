module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'expose',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#4680ff' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
    vendor: ['vue-textarea-autosize', 'vue-picture-input', 'axios'],
  },
  axios: {
    baseURL: 'http://10.3.6.27:3333/api',
  },
  modules: ['@nuxtjs/axios'],
  plugins: [
    { src: '~plugins/vue-autosize', ssr: false },
    { src: '~plugins/vue-picture-input', ssr: false },
    { src: '~plugins/vue-affix', ssr: false },
  ],
};
