import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _c6aba064 = () => import('..\\pages\\Catalogue.vue' /* webpackChunkName: "pages_Catalogue" */).then(m => m.default || m)
const _c0365a06 = () => import('..\\pages\\404.vue' /* webpackChunkName: "pages_404" */).then(m => m.default || m)
const _619f55a9 = () => import('..\\pages\\Category.vue' /* webpackChunkName: "pages_Category" */).then(m => m.default || m)
const _38d36b90 = () => import('..\\pages\\auth\\callback.vue' /* webpackChunkName: "pages_auth_callback" */).then(m => m.default || m)
const _7bf96b1e = () => import('..\\pages\\expose\\_expose\\index.vue' /* webpackChunkName: "pages_expose__expose_index" */).then(m => m.default || m)
const _0716f486 = () => import('..\\pages\\expose\\_expose\\book\\_id.vue' /* webpackChunkName: "pages_expose__expose_book__id" */).then(m => m.default || m)
const _5db1be57 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)
const _83547ed6 = () => import('..\\pages\\_cms.vue' /* webpackChunkName: "pages__cms" */).then(m => m.default || m)
const _0beede34 = () => import('..\\pages\\cms\\index.vue' /* webpackChunkName: "pages_cms_index" */).then(m => m.default || m)
const _6cbd3580 = () => import('..\\pages\\cms\\Test.vue' /* webpackChunkName: "pages_cms_Test" */).then(m => m.default || m)
const _5e30eb4c = () => import('..\\pages\\cms\\List.vue' /* webpackChunkName: "pages_cms_List" */).then(m => m.default || m)
const _410b0e11 = () => import('..\\pages\\cms\\Demo.vue' /* webpackChunkName: "pages_cms_Demo" */).then(m => m.default || m)
const _6d7912b8 = () => import('..\\pages\\cms\\Edit.vue' /* webpackChunkName: "pages_cms_Edit" */).then(m => m.default || m)
const _1897175c = () => import('..\\pages\\cms\\Info.vue' /* webpackChunkName: "pages_cms_Info" */).then(m => m.default || m)
const _7109b04c = () => import('..\\pages\\cms\\Sort.vue' /* webpackChunkName: "pages_cms_Sort" */).then(m => m.default || m)



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
			path: "/Catalogue",
			component: _c6aba064,
			name: "Catalogue"
		},
		{
			path: "/404",
			component: _c0365a06,
			name: "404"
		},
		{
			path: "/Category",
			component: _619f55a9,
			name: "Category"
		},
		{
			path: "/auth/callback",
			component: _38d36b90,
			name: "auth-callback"
		},
		{
			path: "/expose/:expose?",
			component: _7bf96b1e,
			name: "expose-expose"
		},
		{
			path: "/expose/:expose?/book/:id?",
			component: _0716f486,
			name: "expose-expose-book-id"
		},
		{
			path: "/",
			component: _5db1be57,
			name: "index"
		},
		{
			path: "/:cms",
			component: _83547ed6,
			children: [
				{
					path: "",
					component: _0beede34,
					name: "cms"
				},
				{
					path: "Test",
					component: _6cbd3580,
					name: "cms-Test"
				},
				{
					path: "List",
					component: _5e30eb4c,
					name: "cms-List"
				},
				{
					path: "Demo",
					component: _410b0e11,
					name: "cms-Demo"
				},
				{
					path: "Edit",
					component: _6d7912b8,
					name: "cms-Edit"
				},
				{
					path: "Info",
					component: _1897175c,
					name: "cms-Info"
				},
				{
					path: "Sort",
					component: _7109b04c,
					name: "cms-Sort"
				}
			]
		}
    ],
    
    
    fallback: false
  })
}
