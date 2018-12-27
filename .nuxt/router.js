import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _41c11130 = () => import('..\\pages\\Catalogue.vue' /* webpackChunkName: "pages_Catalogue" */).then(m => m.default || m)
const _1290e5df = () => import('..\\pages\\404.vue' /* webpackChunkName: "pages_404" */).then(m => m.default || m)
const _19547ff2 = () => import('..\\pages\\Category.vue' /* webpackChunkName: "pages_Category" */).then(m => m.default || m)
const _d44213d4 = () => import('..\\pages\\auth\\callback.vue' /* webpackChunkName: "pages_auth_callback" */).then(m => m.default || m)
const _a0814e08 = () => import('..\\pages\\expose\\_expose\\index.vue' /* webpackChunkName: "pages_expose__expose_index" */).then(m => m.default || m)
const _449756ca = () => import('..\\pages\\expose\\_expose\\book\\_id.vue' /* webpackChunkName: "pages_expose__expose_book__id" */).then(m => m.default || m)
const _54b6be8e = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)
const _bda7ec1a = () => import('..\\pages\\_cms.vue' /* webpackChunkName: "pages__cms" */).then(m => m.default || m)
const _09b42912 = () => import('..\\pages\\cms\\index.vue' /* webpackChunkName: "pages_cms_index" */).then(m => m.default || m)
const _6eb846a2 = () => import('..\\pages\\cms\\Test.vue' /* webpackChunkName: "pages_cms_Test" */).then(m => m.default || m)
const _0347ccae = () => import('..\\pages\\cms\\List.vue' /* webpackChunkName: "pages_cms_List" */).then(m => m.default || m)
const _33bc211a = () => import('..\\pages\\cms\\Demo.vue' /* webpackChunkName: "pages_cms_Demo" */).then(m => m.default || m)
const _128ff41a = () => import('..\\pages\\cms\\Edit.vue' /* webpackChunkName: "pages_cms_Edit" */).then(m => m.default || m)
const _84a40e84 = () => import('..\\pages\\cms\\Info.vue' /* webpackChunkName: "pages_cms_Info" */).then(m => m.default || m)
const _162091ae = () => import('..\\pages\\cms\\Sort.vue' /* webpackChunkName: "pages_cms_Sort" */).then(m => m.default || m)



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
			component: _41c11130,
			name: "Catalogue"
		},
		{
			path: "/404",
			component: _1290e5df,
			name: "404"
		},
		{
			path: "/Category",
			component: _19547ff2,
			name: "Category"
		},
		{
			path: "/auth/callback",
			component: _d44213d4,
			name: "auth-callback"
		},
		{
			path: "/expose/:expose?",
			component: _a0814e08,
			name: "expose-expose"
		},
		{
			path: "/expose/:expose?/book/:id?",
			component: _449756ca,
			name: "expose-expose-book-id"
		},
		{
			path: "/",
			component: _54b6be8e,
			name: "index"
		},
		{
			path: "/:cms",
			component: _bda7ec1a,
			children: [
				{
					path: "",
					component: _09b42912,
					name: "cms"
				},
				{
					path: "Test",
					component: _6eb846a2,
					name: "cms-Test"
				},
				{
					path: "List",
					component: _0347ccae,
					name: "cms-List"
				},
				{
					path: "Demo",
					component: _33bc211a,
					name: "cms-Demo"
				},
				{
					path: "Edit",
					component: _128ff41a,
					name: "cms-Edit"
				},
				{
					path: "Info",
					component: _84a40e84,
					name: "cms-Info"
				},
				{
					path: "Sort",
					component: _162091ae,
					name: "cms-Sort"
				}
			]
		}
    ],
    
    
    fallback: false
  })
}
