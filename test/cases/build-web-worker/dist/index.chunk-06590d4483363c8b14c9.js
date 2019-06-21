(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


				var addMethods = __webpack_require__(2)
				var methods = []
				module.exports = function() {
					var w = new Worker(__webpack_require__.p + "bef1f90d9eaa2273989f.worker.js", { name: "[hash].worker.js" })
					addMethods(w, methods)
					
					return w
				}
			

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _a_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _a_worker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_a_worker__WEBPACK_IMPORTED_MODULE_0__);

var worker = new _a_worker__WEBPACK_IMPORTED_MODULE_0___default.a();
worker.postMessage({
  a: 1
});

worker.onmessage = function (event) {};

worker.addEventListener('message', function (e) {
  console.log(e.data);
}, false);
console.log(1);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function addMethods(worker, methods) {
    var c = 0;
    var callbacks = {};
    worker.addEventListener('message', function (e) {
        var d = e.data;
        if (d.type !== 'RPC') 
            { return; }
        if (d.id) {
            var f = callbacks[d.id];
            if (f) {
                delete callbacks[d.id];
                if (d.error) {
                    f[1](Object.assign(Error(d.error.message), d.error));
                } else {
                    f[0](d.result);
                }
            }
        } else {
            var evt = document.createEvent('Event');
            evt.initEvent(d.method, false, false);
            evt.data = d.params;
            worker.dispatchEvent(evt);
        }
    });
    methods.forEach(function (method) {
        worker[method] = (function () {
            var params = [], len = arguments.length;
            while ( len-- ) params[ len ] = arguments[ len ];

            return new Promise(function (a, b) {
            var id = ++c;
            callbacks[id] = [a,b];
            worker.postMessage({
                type: 'RPC',
                id: id,
                method: method,
                params: params
            });
        });
        });
    });
}

module.exports = addMethods;
//# sourceMappingURL=rpc-wrapper.js.map


/***/ })
],[[1,1]]]);