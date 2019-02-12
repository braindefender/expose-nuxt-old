webpackJsonp([10],{"0kha":function(t,e,a){"use strict";var i=a("wv2J"),n=a("hAWg"),o=!1;var r=function(t){o||a("fbrP")},s=a("VU/8")(i.a,n.a,!1,r,null,null);s.options.__file="components\\expose\\ExposeCard.vue",e.a=s.exports},"9xF5":function(t,e,a){"use strict";var i=a("dnmH"),n=a.n(i),o=a("0kha");e.a={name:"Catalogue",components:{ExposeCard:o.a},data:function(){return{cover:n.a,list:[],currentPage:1,pages:null}},mounted:function(){var t=this;this.$axios.$get("/catalogue/catalogue").then(function(e){console.log(e),t.list=e.catalogueList,t.pages=e.pages})},methods:{prevPage:function(){this.currentPage>1&&(this.currentPage-=1,this.fetchPage())},nextPage:function(){this.currentPage<this.pages&&(this.currentPage+=1,this.fetchPage())},fetchPage:function(){var t=this;this.$axios.$get("/catalogue/catalogue?page="+this.currentPage).then(function(e){t.$set(t,"list",e.catalogueList)})}}}},FwMi:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,'@-webkit-keyframes slide{0%{-webkit-transform:translateY(-15px);transform:translateY(-15px)}to{-webkit-transform:translateY(15px);transform:translateY(15px)}}@keyframes slide{0%{-webkit-transform:translateY(-15px);transform:translateY(-15px)}to{-webkit-transform:translateY(15px);transform:translateY(15px)}}.e-card{position:relative;background-color:#333;border-radius:.5em;cursor:pointer;width:540px;height:180px}.e-card:hover .e-card__shadow-blur{opacity:.8}.e-card__layer{position:absolute;top:0;left:0;right:0;bottom:0}.e-card__info{padding:1.5em;color:#fff}.e-card__info--catalogue{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.e-card__info--catalogue .e-card__title{max-width:90%;font-size:22px;line-height:25px;font-weight:700;white-space:pre-wrap}.e-card__info--catalogue .e-card__date{text-align:right;font-size:16px}.e-card__image{width:100%;overflow:hidden;border-radius:inherit;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-mask-image:-webkit-radial-gradient(#fff,#000)}.e-card__image img{width:100%}.e-card__image:after{position:absolute;top:0;left:0;right:0;bottom:0;content:"";background-color:rgba(0,0,0,.45)}.e-card__shadow-blur{filter:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="15" /></filter></svg>#filter\');-webkit-filter:blur(15px);filter:blur(15px);opacity:.4;border-radius:inherit;-webkit-transition:all .25s ease;transition:all .25s ease}.e-card__shadow-blur-container{overflow:hidden;position:absolute;top:10px;bottom:-10px;display:-webkit-box;display:-ms-flexbox;display:flex;border-radius:inherit;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.e-card__shadow-blur-container img{width:100%}@media only screen and (max-width:1024px){.e-card{width:452px;height:150px}.e-card__info--catalogue{padding:15px}.e-card__info--catalogue .e-card__title{max-width:100%;font-size:17px;line-height:20px;font-weight:700;white-space:pre-wrap}.e-card__info--catalogue .e-card__date{text-align:right;font-size:16px}}@media only screen and (max-width:425px){.e-card{width:385px;height:166.6px}.e-card__info--catalogue{padding:15px}.e-card__info--catalogue .e-card__title{max-width:100%;font-size:17px;line-height:20px;font-weight:700;white-space:pre-wrap}.e-card__info--catalogue .e-card__date{text-align:right;font-size:16px}}@media only screen and (max-width:375px){.e-card{width:335px;height:145px}.e-card__info--catalogue{padding:15px}.e-card__info--catalogue .e-card__title{max-width:100%;font-size:17px;line-height:20px;font-weight:700;white-space:pre-wrap}.e-card__info--catalogue .e-card__date{text-align:right;font-size:16px}}@media only screen and (max-width:320px){.e-card{width:300px;height:130px}.e-card__info--catalogue{padding:15px}.e-card__info--catalogue .e-card__title{max-width:100%;font-size:17px;line-height:20px;font-weight:700;white-space:pre-wrap}.e-card__info--catalogue .e-card__date{text-align:right;font-size:16px}}',""])},IPyK:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"@-webkit-keyframes slide{0%{-webkit-transform:translateY(-15px);transform:translateY(-15px)}to{-webkit-transform:translateY(15px);transform:translateY(15px)}}@keyframes slide{0%{-webkit-transform:translateY(-15px);transform:translateY(-15px)}to{-webkit-transform:translateY(15px);transform:translateY(15px)}}.main .cover-section{position:relative;height:0;width:100%;padding-top:25%;background:#333 50% no-repeat;background-size:cover;color:#fff}.main .cover-section__content{position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.25);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.main .cover-section__content h1{font-weight:700;font-size:2.5em}.main .content-section{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}@media only screen and (max-width:1024px){.main .cover-section__content h1{font-size:32px}}@media only screen and (max-width:425px){.main .cover-section__content{background-color:rgba(0,0,0,.5)}.main .cover-section__content h1{font-size:24px}}@media only screen and (max-width:375px){.main .cover-section__content{background-color:rgba(0,0,0,.5)}.main .cover-section__content h1{font-size:20px}}@media only screen and (max-width:320px){.main .cover-section__content{background-color:rgba(0,0,0,.5)}.main .cover-section__content h1{font-size:20px}}",""])},TU7K:function(t,e,a){var i=a("IPyK");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("6250276f",i,!1,{sourceMap:!1})},dnmH:function(t,e,a){t.exports=a.p+"img/alfons-morales-410757-unsplash.9e413f3.jpg"},fKWN:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("section",{staticClass:"cover-section",style:"background-image: url("+t.cover+")"},[t._m(0)]),a("section",{staticClass:"content-section"},[a("div",{staticClass:"cat-preview"},[a("div",{staticClass:"cat-layout"},[t._m(1),a("div",{staticClass:"cat-layout__content"},[a("div",{staticClass:"cat-layout__grid"},t._l(t.list,function(t,e){return a("expose-card",{key:e,attrs:{item:t}})}))]),a("div",{staticClass:"cat-layout__panel"},[a("button",{on:{click:t.prevPage}},[t._v("Prev")]),a("button",{on:{click:t.nextPage}},[t._v("Next")])])])])])])};i._withStripped=!0;var n={render:i,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cover-section__content"},[e("h1",[this._v("Каталог выставок ГПНТБ СО РАН")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cat-layout__panel"},[e("div",{staticClass:"cat-layout__title"},[this._v("Каталог выставок")]),e("div",{staticClass:"cat-layout__sort"},[e("button",{staticClass:"cat-layout__sort-button",attrs:{type:"button"}},[this._v("по алфавиту")]),e("button",{staticClass:"cat-layout__sort-button cat-layout__sort-button--active",attrs:{type:"button"}},[this._v("по дате обновления")])])])}]};e.a=n},fbrP:function(t,e,a){var i=a("FwMi");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("6ee8cfb4",i,!1,{sourceMap:!1})},hAWg:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"e-card",attrs:{href:t.link}},[a("div",{staticClass:"e-card__layer e-card__shadow-blur"},[a("div",{staticClass:"e-card__shadow-blur-container"},[a("img",{attrs:{src:t.image,alt:t.meta}})])]),a("div",{staticClass:"e-card__layer e-card__image"},[a("img",{attrs:{src:t.image,alt:t.meta}})]),a("div",{staticClass:"e-card__layer e-card__info e-card__info--catalogue",on:{click:t.redirect}},[a("div",{staticClass:"e-card__title"},[t._v(t._s(t.item.title))]),a("div",{staticClass:"e-card__date"},[t._v(t._s(t.prettyDate))])])])};i._withStripped=!0;var n={render:i,staticRenderFns:[]};e.a=n},uvfA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("9xF5"),n=a("fKWN"),o=!1;var r=function(t){o||a("TU7K")},s=a("VU/8")(i.a,n.a,!1,r,null,null);s.options.__file="pages\\Catalogue.vue",e.default=s.exports},wv2J:function(t,e,a){"use strict";e.a={name:"ExposeCard",props:{item:{type:Object,default:function(){}},options:{type:Object,default:function(){}}},computed:{prettyDate:function(){var t=new Date(this.item.dates.public),e=this.$store.state.static.months;return t.getDate()+" "+e[t.getMonth()]+", "+t.getFullYear()},meta:function(){return this.item.title+" - "+this.item.dates.from},image:function(){return this.item.image?this.item.image:this.$store.state.static.sourceList[this.item.source].image},link:function(){return this.options&&this.options.fromcms?"#":"/expose/"+this.item.title.split("\n").join("~").split(" ").join("_")+"-"+this.item.dates.create}},methods:{redirect:function(){var t=this;this.options&&this.options.fromcms&&this.$store.dispatch("fetchState",this.item._id).then(function(e){t.$router.push({name:"cms-Info",params:{fromcms:!0}})})}}}}});