!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="./",r(r.s=1)}([function(e,t,r){var n=r(2),o=["fa","fb"];e.exports=function(){var e=new Worker(r.p+"6fe3ea111621cd756f8a.worker.js",{name:"[hash].worker.js"});return n(e,o),e}},function(e,t,r){"use strict";r.r(t),r.d(t,"aaaa",function(){return a}),r.d(t,"bbbb",function(){return u}),r.d(t,"cccc",function(){return i});var n=r(0),o={a:!1};function a(){Object(n.fa)()}function u(){Object(n.fb)().then(function(e){console.log("===========xxx")})}function i(){return o}addEventListener("message",function(e){var r,n=e.data,o=n.type,a=n.method,u=n.id,i=n.params;"RPC"===o&&a&&((r=t[a])?Promise.resolve().then(function(){return r.apply(t,i)}):Promise.reject("No such method")).then(function(e){postMessage({type:"RPC",id:u,result:e})}).catch(function(e){var t={message:e};e.stack&&(t.message=e.message,t.stack=e.stack,t.name=e.name),postMessage({type:"RPC",id:u,error:t})})}),postMessage({type:"RPC",method:"ready"})},function(e,t){e.exports=function(e,t){var r=0,n={};e.addEventListener("message",function(t){var r=t.data;if("RPC"===r.type)if(r.id){var o=n[r.id];o&&(delete n[r.id],r.error?o[1](Object.assign(Error(r.error.message),r.error)):o[0](r.result))}else{var a=document.createEvent("Event");a.initEvent(r.method,!1,!1),a.data=r.params,e.dispatchEvent(a)}}),t.forEach(function(t){e[t]=function(){for(var o=[],a=arguments.length;a--;)o[a]=arguments[a];return new Promise(function(a,u){var i=++r;n[i]=[a,u],e.postMessage({type:"RPC",id:i,method:t,params:o})})}})}}]);