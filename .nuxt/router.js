import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _72b3b496 = () => import('..\\pages\\404.vue' /* webpackChunkName: "pages_404" */).then(m => m.default || m)
const _1364ae7b = () => import('..\\pages\\cms\\index.vue' /* webpackChunkName: "pages_cms_index" */).then(m => m.default || m)
const _d6b48ab2 = () => import('..\\pages\\Catalogue.vue' /* webpackChunkName: "pages_Catalogue" */).then(m => m.default || m)
const _170a8bb0 = () => import('..\\pages\\Category.vue' /* webpackChunkName: "pages_Category" */).then(m => m.default || m)
const _390698ea = () => import('..\\pages\\cms\\Demo.vue' /* webpackChunkName: "pages_cms_Demo" */).then(m => m.default || m)
const _69053b25 = () => import('..\\pages\\cms\\Sort.vue' /* webpackChunkName: "pages_cms_Sort" */).then(m => m.default || m)
const _562c7625 = () => import('..\\pages\\cms\\List.vue' /* webpackChunkName: "pages_cms_List" */).then(m => m.default || m)
const _c0e6c202 = () => import('..\\pages\\auth\\callback.vue' /* webpackChunkName: "pages_auth_callback" */).then(m => m.default || m)
const _65749d91 = () => import('..\\pages\\cms\\Edit.vue' /* webpackChunkName: "pages_cms_Edit" */).then(m => m.default || m)
const _1092a235 = () => import('..\\pages\\cms\\Info.vue' /* webpackChunkName: "pages_cms_Info" */).then(m => m.default || m)
const _7cc61fce = () => import('..\\pages\\cms\\Test.vue' /* webpackChunkName: "pages_cms_Test" */).then(m => m.default || m)
const _d0e3ee36 = () => import('..\\pages\\expose\\_expose\\index.vue' /* webpackChunkName: "pages_expose__expose_index" */).then(m => m.default || m)
const _45322ff8 = () => import('..\\pages\\expose\\_expose\\book\\_id.vue' /* webpackChunkName: "pages_expose__expose_book__id" */).then(m => m.default || m)
const _8f62c4a0 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



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
			component: _72b3b496,
			name: "404"
		},
		{
			path: "/cms",
			component: _1364ae7b,
			name: "cms"
		},
		{
			path: "/Catalogue",
			component: _d6b48ab2,
			name: "Catalogue"
		},
		{
			path: "/Category",
			component: _170a8bb0,
			name: "Category"
		},
		{
			path: "/cms/Demo",
			component: _390698ea,
			name: "cms-Demo"
		},
		{
			path: "/cms/Sort",
			component: _69053b25,
			name: "cms-Sort"
		},
		{
			path: "/cms/List",
			component: _562c7625,
			name: "cms-List"
		},
		{
			path: "/auth/callback",
			component: _c0e6c202,
			name: "auth-callback"
		},
		{
			path: "/cms/Edit",
			component: _65749d91,
			name: "cms-Edit"
		},
		{
			path: "/cms/Info",
			component: _1092a235,
			name: "cms-Info"
		},
		{
			path: "/cms/Test",
			component: _7cc61fce,
			name: "cms-Test"
		},
		{
			path: "/expose/:expose?",
			component: _d0e3ee36,
			name: "expose-expose"
		},
		{
			path: "/expose/:expose?/book/:id?",
			component: _45322ff8,
			name: "expose-expose-book-id"
		},
		{
			path: "/",
			component: _8f62c4a0,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
