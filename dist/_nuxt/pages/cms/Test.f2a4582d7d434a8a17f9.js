webpackJsonp([10],{"+vDl":function(t,e,a){"use strict";var o=a("/D7T"),n=a("xF7E"),s=!1;var i=function(t){s||a("Vd9l")},r=a("VU/8")(o.a,n.a,!1,i,null,null);r.options.__file="components/common/Modal.vue",e.a=r.exports},"/D7T":function(t,e,a){"use strict";e.a={name:"Modal",props:{show:{type:Boolean,required:!0,twoWay:!0},header:{type:String,default:"Tips"},body:{type:String,default:""},oktext:{type:String,default:"OK"},okcallback:{type:Function,default:function(){this.show=!1}},showcancel:{type:Boolean,default:!1},canceltext:{type:String,default:"Отмена"},cancelcallback:{type:Function,default:function(){this.show=!1}},duration:{type:Number,default:0},type:{type:String,default:"tip"}},data:function(){return{}},computed:{},methods:{}}},"8qSp":function(t,e,a){"use strict";var o=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container-test"},[e("modal",{attrs:{show:!0,header:"Test Header",body:"Произошла ошибка",type:"warning",showcancel:!0}})],1)};o._withStripped=!0;var n={render:o,staticRenderFns:[]};e.a=n},Ilk3:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".container-test{width:100%}",""])},LBC9:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".modal{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0,0,0,.5);top:0;left:0;width:100%;height:100%;z-index:15000;position:fixed}.modal,.modal__wrapper{-webkit-transition:opacity .3s ease;transition:opacity .3s ease}.modal__wrapper{width:320px;border-radius:5px;-webkit-box-shadow:0 5px 20px rgba(0,0,0,.15);box-shadow:0 5px 20px rgba(0,0,0,.15);text-align:center;background:#fff}.modal__header{padding:10px 20px;font-weight:700}.modal__header--tip{background:rgba(70,128,255,.1)}.modal__header--error{background:rgba(251,97,111,.1)}.modal__header--warning{background:rgba(254,182,77,.1)}.modal__body{padding:20px}.modal__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.modal__button{width:100%;font-weight:700;font-size:14px;cursor:pointer;padding:10px 20px}.modal__button:first-child{background:rgba(70,128,255,.1)}.modal__button:nth-child(2){background:rgba(251,97,111,.1)}",""])},MJug:function(t,e,a){var o=a("Ilk3");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("f13dc42a",o,!1,{sourceMap:!1})},TUns:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("oGNX"),n=a("8qSp"),s=!1;var i=function(t){s||a("MJug")},r=a("VU/8")(o.a,n.a,!1,i,null,null);r.options.__file="pages/cms/Test.vue",e.default=r.exports},Vd9l:function(t,e,a){var o=a("LBC9");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("390773ef",o,!1,{sourceMap:!1})},oGNX:function(t,e,a){"use strict";var o=a("+vDl");e.a={name:"Test",components:{Modal:o.a},props:["options"],data:function(){return{}},computed:{},methods:{}}},xF7E:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"modal",attrs:{transition:"modal"}},[a("div",{staticClass:"modal__wrapper"},[a("div",{staticClass:"modal__header",class:"modal__header--"+t.type},[t._v(t._s(t.header))]),a("div",{staticClass:"modal__body"},[t._v(t._s(t.body))]),a("div",{staticClass:"modal__buttons"},[a("div",{staticClass:"modal__button",on:{click:t.okcallback}},[t._v(t._s(t.oktext))]),t.showcancel?a("div",{staticClass:"modal__button",on:{click:t.cancelcallback}},[t._v(t._s(t.canceltext))]):t._e()])])])};o._withStripped=!0;var n={render:o,staticRenderFns:[]};e.a=n}});