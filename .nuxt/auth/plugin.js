import Auth from './auth'

import './middleware'

// Active chemes
import scheme_003d9a64 from './schemes/local.js'
import scheme_23514a38 from './schemes/oauth2.js'

export default function (ctx, inject) {
  // Options
  const options = {"resetOnError":false,"scopeKey":"scope","rewriteRedirects":true,"fullPathRedirect":false,"watchLoggedIn":true,"redirect":{"login":"/cms","logout":"/cms","home":"/cms/list","callback":"/cms"},"vuex":{"namespace":"auth"},"cookie":{"prefix":"auth.","options":{"path":"/"}},"localStorage":{"prefix":"auth."},"token":{"prefix":"_token."},"refresh_token":{"prefix":"_refresh_token."},"defaultStrategy":"local"}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Inject it to nuxt context as $auth
  inject('auth', $auth)

  // Register strategies

  // local
  $auth.registerStrategy('local', new scheme_003d9a64($auth, {"endpoints":{"login":{"url":"/auth/login","method":"post","propertyName":"token"},"logout":{"url":"/auth/logout","method":"post"},"user":{"url":"/auth/user","method":"get","propertyName":false}},"tokenRequired":true,"tokenType":"bearer","_name":"local"}))

  // social
  $auth.registerStrategy('social', new scheme_23514a38($auth, {"authorization_endpoint":"https://login.microsoftonline.com/common/oauth2/authorize","client_id":"5e1f8950-7cb1-4674-84dc-40e6013fe7da","redirect_uri":"https://expose.gpntbsib.ru/auth/callback","response_type":"code","scope":["profile"],"_name":"social"}))

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.browser) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}
