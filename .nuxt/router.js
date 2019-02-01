import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _15d4ffef = () => import('..\\pages\\404.vue' /* webpackChunkName: "pages_404" */).then(m => m.default || m)
const _22dcc5fc = () => import('..\\pages\\cms\\index.vue' /* webpackChunkName: "pages_cms_index" */).then(m => m.default || m)
const _726d5f40 = () => import('..\\pages\\Catalogue.vue' /* webpackChunkName: "pages_Catalogue" */).then(m => m.default || m)
const _58412012 = () => import('..\\pages\\Category.vue' /* webpackChunkName: "pages_Category" */).then(m => m.default || m)
const _16ce3d83 = () => import('..\\pages\\cms\\Demo.vue' /* webpackChunkName: "pages_cms_Demo" */).then(m => m.default || m)
const _46ccdfbe = () => import('..\\pages\\cms\\Sort.vue' /* webpackChunkName: "pages_cms_Sort" */).then(m => m.default || m)
const _33f41abe = () => import('..\\pages\\cms\\List.vue' /* webpackChunkName: "pages_cms_List" */).then(m => m.default || m)
const _2600f206 = () => import('..\\pages\\auth\\callback.vue' /* webpackChunkName: "pages_auth_callback" */).then(m => m.default || m)
const _433c422a = () => import('..\\pages\\cms\\Edit.vue' /* webpackChunkName: "pages_cms_Edit" */).then(m => m.default || m)
const _234b7264 = () => import('..\\pages\\cms\\Info.vue' /* webpackChunkName: "pages_cms_Info" */).then(m => m.default || m)
const _c136d69c = () => import('..\\pages\\cms\\Test.vue' /* webpackChunkName: "pages_cms_Test" */).then(m => m.default || m)
const _b0433628 = () => import('..\\pages\\expose\\_expose\\index.vue' /* webpackChunkName: "pages_expose__expose_index" */).then(m => m.default || m)
const _568be88b = () => import('..\\pages\\expose\\_expose\\book\\_id.vue' /* webpackChunkName: "pages_expose__expose_book__id" */).then(m => m.default || m)
const _184a76c9 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



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
			component: _15d4ffef,
			name: "404"
		},
		{
			path: "/cms",
			component: _22dcc5fc,
			name: "cms"
		},
		{
			path: "/Catalogue",
			component: _726d5f40,
			name: "Catalogue"
		},
		{
			path: "/Category",
			component: _58412012,
			name: "Category"
		},
		{
			path: "/cms/Demo",
			component: _16ce3d83,
			name: "cms-Demo"
		},
		{
			path: "/cms/Sort",
			component: _46ccdfbe,
			name: "cms-Sort"
		},
		{
			path: "/cms/List",
			component: _33f41abe,
			name: "cms-List"
		},
		{
			path: "/auth/callback",
			component: _2600f206,
			name: "auth-callback"
		},
		{
			path: "/cms/Edit",
			component: _433c422a,
			name: "cms-Edit"
		},
		{
			path: "/cms/Info",
			component: _234b7264,
			name: "cms-Info"
		},
		{
			path: "/cms/Test",
			component: _c136d69c,
			name: "cms-Test"
		},
		{
			path: "/expose/:expose?",
			component: _b0433628,
			name: "expose-expose"
		},
		{
			path: "/expose/:expose?/book/:id?",
			component: _568be88b,
			name: "expose-expose-book-id"
		},
		{
			path: "/",
			component: _184a76c9,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
