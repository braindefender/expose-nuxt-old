const serverAPI = 'http://10.3.6.27:3333/api';
const redirect_uri = 'http://localhost:3000/auth/callback';
const client_id = '5e1f8950-7cb1-4674-84dc-40e6013fe7da';

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
    vendor: [
      'vue-textarea-autosize',
      'vue-multiselect',
      'vue-picture-input',
      'axios',
    ],
  },
  auth: {
    redirect: {
      login: '/cms',
      logout: '/cms',
      callback: '/cms',
      home: '/cms/list',
    },
    strategies: {
      social: {
        _scheme: 'oauth2',
        authorization_endpoint:
          'https://login.microsoftonline.com/common/oauth2/authorize',
        client_id: client_id,
        redirect_uri: redirect_uri,
        response_type: 'code',
        scope: ['profile'],
      },
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: false },
        },
        tokenRequired: true,
        tokenType: 'bearer',
      },
    },
  },
  axios: {
    baseURL: serverAPI,
  },
  router: {},
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],
  plugins: [
    { src: '~plugins/vue-autosize', ssr: false },
    { src: '~plugins/vue-picture-input', ssr: false },
    { src: '~plugins/vue-affix', ssr: false },
    { src: '~plugins/vue-scrollactive', ssr: false },
    { src: '~plugins/vue-multiselect', ssr: false },
    { src: '~plugins/vue-awesome-swiper', ssr: false },
    { src: '~plugins/vue-tooltip' },
  ],
};
