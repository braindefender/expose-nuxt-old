import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _13109a0e = () => import('../pages/404.vue' /* webpackChunkName: "pages/404" */).then(m => m.default || m)
const _4407ba6c = () => import('../pages/Catalogue.vue' /* webpackChunkName: "pages/Catalogue" */).then(m => m.default || m)
const _e5f5d9a6 = () => import('../pages/Category.vue' /* webpackChunkName: "pages/Category" */).then(m => m.default || m)
const _3c5e1ce6 = () => import('../pages/cms/index.vue' /* webpackChunkName: "pages/cms/index" */).then(m => m.default || m)
const _1787614d = () => import('../pages/auth/callback.vue' /* webpackChunkName: "pages/auth/callback" */).then(m => m.default || m)
const _1546a8d0 = () => import('../pages/cms/Demo.vue' /* webpackChunkName: "pages/cms/Demo" */).then(m => m.default || m)
const _21cab03f = () => import('../pages/cms/Edit.vue' /* webpackChunkName: "pages/cms/Edit" */).then(m => m.default || m)
const _662e963a = () => import('../pages/cms/Info.vue' /* webpackChunkName: "pages/cms/Info" */).then(m => m.default || m)
const _128288d3 = () => import('../pages/cms/List.vue' /* webpackChunkName: "pages/cms/List" */).then(m => m.default || m)
const _255b4dd3 = () => import('../pages/cms/Sort.vue' /* webpackChunkName: "pages/cms/Sort" */).then(m => m.default || m)
const _7df302c7 = () => import('../pages/cms/Test.vue' /* webpackChunkName: "pages/cms/Test" */).then(m => m.default || m)
const _783c2aaa = () => import('../pages/expose/_expose/index.vue' /* webpackChunkName: "pages/expose/_expose/index" */).then(m => m.default || m)
const _b9cb7428 = () => import('../pages/expose/_expose/book/_id.vue' /* webpackChunkName: "pages/expose/_expose/book/_id" */).then(m => m.default || m)
const _5b0c8f53 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/404",
			component: _13109a0e,
			name: "404"
		},
		{
			path: "/Catalogue",
			component: _4407ba6c,
			name: "Catalogue"
		},
		{
			path: "/Category",
			component: _e5f5d9a6,
			name: "Category"
		},
		{
			path: "/cms",
			component: _3c5e1ce6,
			name: "cms"
		},
		{
			path: "/auth/callback",
			component: _1787614d,
			name: "auth-callback"
		},
		{
			path: "/cms/Demo",
			component: _1546a8d0,
			name: "cms-Demo"
		},
		{
			path: "/cms/Edit",
			component: _21cab03f,
			name: "cms-Edit"
		},
		{
			path: "/cms/Info",
			component: _662e963a,
			name: "cms-Info"
		},
		{
			path: "/cms/List",
			component: _128288d3,
			name: "cms-List"
		},
		{
			path: "/cms/Sort",
			component: _255b4dd3,
			name: "cms-Sort"
		},
		{
			path: "/cms/Test",
			component: _7df302c7,
			name: "cms-Test"
		},
		{
			path: "/expose/:expose?",
			component: _783c2aaa,
			name: "expose-expose"
		},
		{
			path: "/expose/:expose?/book/:id?",
			component: _b9cb7428,
			name: "expose-expose-book-id"
		},
		{
			path: "/",
			component: _5b0c8f53,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
