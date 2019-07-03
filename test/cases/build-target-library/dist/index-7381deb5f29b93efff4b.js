!(function(t, e) {
  'object' === typeof exports && 'object' === typeof module
    ? (module.exports = e())
    : 'function' === typeof define && define.amd
    ? define([], e)
    : 'object' === typeof exports
    ? (exports.DEMO = e())
    : (t.DEMO = e())
})(this, function() {
  return (function(t) {
    function e(e) {
      for (var r, o, i = e[0], a = e[1], c = 0, f = []; c < i.length; c++)
        (o = i[c]), n[o] && f.push(n[o][0]), (n[o] = 0)
      for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r])
      for (u && u(e); f.length; ) f.shift()()
    }
    var r = {},
      n = { 0: 0 }
    function o(e) {
      if (r[e]) return r[e].exports
      var n = (r[e] = { i: e, l: !1, exports: {} })
      return t[e].call(n.exports, n, n.exports, o), (n.l = !0), n.exports
    }
    ;(o.e = function(t) {
      var e = [],
        r = n[t]
      if (0 !== r)
        if (r) e.push(r[2])
        else {
          var i = new Promise(function(e, o) {
            r = n[t] = [e, o]
          })
          e.push((r[2] = i))
          var a,
            c = document.createElement('script')
          ;(c.charset = 'utf-8'),
            (c.timeout = 120),
            o.nc && c.setAttribute('nonce', o.nc),
            (c.src = (function(t) {
              return o.p + '' + ({}[t] || t) + '.chunk-' + { 1: 'a98069b4a31dcface20f' }[t] + '.js'
            })(t))
          var u = new Error()
          a = function(e) {
            ;(c.onerror = c.onload = null), clearTimeout(f)
            var r = n[t]
            if (0 !== r) {
              if (r) {
                var o = e && ('load' === e.type ? 'missing' : e.type),
                  i = e && e.target && e.target.src
                ;(u.message = 'Loading chunk ' + t + ' failed.\n(' + o + ': ' + i + ')'),
                  (u.name = 'ChunkLoadError'),
                  (u.type = o),
                  (u.request = i),
                  r[1](u)
              }
              n[t] = void 0
            }
          }
          var f = setTimeout(function() {
            a({ type: 'timeout', target: c })
          }, 12e4)
          ;(c.onerror = c.onload = a), document.head.appendChild(c)
        }
      return Promise.all(e)
    }),
      (o.m = t),
      (o.c = r),
      (o.d = function(t, e, r) {
        o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r })
      }),
      (o.r = function(t) {
        'undefined' !== typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      }),
      (o.t = function(t, e) {
        if ((1 & e && (t = o(t)), 8 & e)) return t
        if (4 & e && 'object' === typeof t && t && t.__esModule) return t
        var r = Object.create(null)
        if ((o.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: t }), 2 & e && 'string' != typeof t))
          for (var n in t)
            o.d(
              r,
              n,
              function(e) {
                return t[e]
              }.bind(null, n)
            )
        return r
      }),
      (o.n = function(t) {
        var e =
          t && t.__esModule
            ? function() {
                return t.default
              }
            : function() {
                return t
              }
        return o.d(e, 'a', e), e
      }),
      (o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }),
      (o.p = 'http://127.0.0.1:9933/'),
      (o.oe = function(t) {
        throw (console.error(t), t)
      })
    var i = (this.webpackJsonpDEMO = this.webpackJsonpDEMO || []),
      a = i.push.bind(i)
    ;(i.push = e), (i = i.slice())
    for (var c = 0; c < i.length; c++) e(i[c])
    var u = a
    return o((o.s = 2))
  })([
    function(t, e, r) {
      t.exports = r(3)
    },
    function(t, e) {
      function r(t, e, r, n, o, i, a) {
        try {
          var c = t[i](a),
            u = c.value
        } catch (f) {
          return void r(f)
        }
        c.done ? e(u) : Promise.resolve(u).then(n, o)
      }
      t.exports = function(t) {
        return function() {
          var e = this,
            n = arguments
          return new Promise(function(o, i) {
            var a = t.apply(e, n)
            function c(t) {
              r(a, o, i, c, u, 'next', t)
            }
            function u(t) {
              r(a, o, i, c, u, 'throw', t)
            }
            c(void 0)
          })
        }
      }
    },
    function(t, e, r) {
      t.exports = r(4)
    },
    function(t, e, r) {
      var n = (function(t) {
        'use strict'
        var e,
          r = Object.prototype,
          n = r.hasOwnProperty,
          o = 'function' === typeof Symbol ? Symbol : {},
          i = o.iterator || '@@iterator',
          a = o.asyncIterator || '@@asyncIterator',
          c = o.toStringTag || '@@toStringTag'
        function u(t, e, r, n) {
          var o = e && e.prototype instanceof d ? e : d,
            i = Object.create(o.prototype),
            a = new P(n || [])
          return (
            (i._invoke = (function(t, e, r) {
              var n = s
              return function(o, i) {
                if (n === h) throw new Error('Generator is already running')
                if (n === p) {
                  if ('throw' === o) throw i
                  return S()
                }
                for (r.method = o, r.arg = i; ; ) {
                  var a = r.delegate
                  if (a) {
                    var c = L(a, r)
                    if (c) {
                      if (c === y) continue
                      return c
                    }
                  }
                  if ('next' === r.method) r.sent = r._sent = r.arg
                  else if ('throw' === r.method) {
                    if (n === s) throw ((n = p), r.arg)
                    r.dispatchException(r.arg)
                  } else 'return' === r.method && r.abrupt('return', r.arg)
                  n = h
                  var u = f(t, e, r)
                  if ('normal' === u.type) {
                    if (((n = r.done ? p : l), u.arg === y)) continue
                    return { value: u.arg, done: r.done }
                  }
                  'throw' === u.type && ((n = p), (r.method = 'throw'), (r.arg = u.arg))
                }
              }
            })(t, r, a)),
            i
          )
        }
        function f(t, e, r) {
          try {
            return { type: 'normal', arg: t.call(e, r) }
          } catch (n) {
            return { type: 'throw', arg: n }
          }
        }
        t.wrap = u
        var s = 'suspendedStart',
          l = 'suspendedYield',
          h = 'executing',
          p = 'completed',
          y = {}
        function d() {}
        function v() {}
        function g() {}
        var m = {}
        m[i] = function() {
          return this
        }
        var w = Object.getPrototypeOf,
          x = w && w(w(k([])))
        x && x !== r && n.call(x, i) && (m = x)
        var b = (g.prototype = d.prototype = Object.create(m))
        function E(t) {
          ;['next', 'throw', 'return'].forEach(function(e) {
            t[e] = function(t) {
              return this._invoke(e, t)
            }
          })
        }
        function O(t) {
          var e
          this._invoke = function(r, o) {
            function i() {
              return new Promise(function(e, i) {
                !(function e(r, o, i, a) {
                  var c = f(t[r], t, o)
                  if ('throw' !== c.type) {
                    var u = c.arg,
                      s = u.value
                    return s && 'object' === typeof s && n.call(s, '__await')
                      ? Promise.resolve(s.__await).then(
                          function(t) {
                            e('next', t, i, a)
                          },
                          function(t) {
                            e('throw', t, i, a)
                          }
                        )
                      : Promise.resolve(s).then(
                          function(t) {
                            ;(u.value = t), i(u)
                          },
                          function(t) {
                            return e('throw', t, i, a)
                          }
                        )
                  }
                  a(c.arg)
                })(r, o, e, i)
              })
            }
            return (e = e ? e.then(i, i) : i())
          }
        }
        function L(t, r) {
          var n = t.iterator[r.method]
          if (n === e) {
            if (((r.delegate = null), 'throw' === r.method)) {
              if (t.iterator.return && ((r.method = 'return'), (r.arg = e), L(t, r), 'throw' === r.method)) return y
              ;(r.method = 'throw'), (r.arg = new TypeError("The iterator does not provide a 'throw' method"))
            }
            return y
          }
          var o = f(n, t.iterator, r.arg)
          if ('throw' === o.type) return (r.method = 'throw'), (r.arg = o.arg), (r.delegate = null), y
          var i = o.arg
          return i
            ? i.done
              ? ((r[t.resultName] = i.value),
                (r.next = t.nextLoc),
                'return' !== r.method && ((r.method = 'next'), (r.arg = e)),
                (r.delegate = null),
                y)
              : i
            : ((r.method = 'throw'),
              (r.arg = new TypeError('iterator result is not an object')),
              (r.delegate = null),
              y)
        }
        function j(t) {
          var e = { tryLoc: t[0] }
          1 in t && (e.catchLoc = t[1]), 2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])), this.tryEntries.push(e)
        }
        function _(t) {
          var e = t.completion || {}
          ;(e.type = 'normal'), delete e.arg, (t.completion = e)
        }
        function P(t) {
          ;(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(j, this), this.reset(!0)
        }
        function k(t) {
          if (t) {
            var r = t[i]
            if (r) return r.call(t)
            if ('function' === typeof t.next) return t
            if (!isNaN(t.length)) {
              var o = -1,
                a = function r() {
                  for (; ++o < t.length; ) if (n.call(t, o)) return (r.value = t[o]), (r.done = !1), r
                  return (r.value = e), (r.done = !0), r
                }
              return (a.next = a)
            }
          }
          return { next: S }
        }
        function S() {
          return { value: e, done: !0 }
        }
        return (
          (v.prototype = b.constructor = g),
          (g.constructor = v),
          (g[c] = v.displayName = 'GeneratorFunction'),
          (t.isGeneratorFunction = function(t) {
            var e = 'function' === typeof t && t.constructor
            return !!e && (e === v || 'GeneratorFunction' === (e.displayName || e.name))
          }),
          (t.mark = function(t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, g)
                : ((t.__proto__ = g), c in t || (t[c] = 'GeneratorFunction')),
              (t.prototype = Object.create(b)),
              t
            )
          }),
          (t.awrap = function(t) {
            return { __await: t }
          }),
          E(O.prototype),
          (O.prototype[a] = function() {
            return this
          }),
          (t.AsyncIterator = O),
          (t.async = function(e, r, n, o) {
            var i = new O(u(e, r, n, o))
            return t.isGeneratorFunction(r)
              ? i
              : i.next().then(function(t) {
                  return t.done ? t.value : i.next()
                })
          }),
          E(b),
          (b[c] = 'Generator'),
          (b[i] = function() {
            return this
          }),
          (b.toString = function() {
            return '[object Generator]'
          }),
          (t.keys = function(t) {
            var e = []
            for (var r in t) e.push(r)
            return (
              e.reverse(),
              function r() {
                for (; e.length; ) {
                  var n = e.pop()
                  if (n in t) return (r.value = n), (r.done = !1), r
                }
                return (r.done = !0), r
              }
            )
          }),
          (t.values = k),
          (P.prototype = {
            constructor: P,
            reset: function(t) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = e),
                (this.done = !1),
                (this.delegate = null),
                (this.method = 'next'),
                (this.arg = e),
                this.tryEntries.forEach(_),
                !t)
              )
                for (var r in this) 't' === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
            },
            stop: function() {
              this.done = !0
              var t = this.tryEntries[0].completion
              if ('throw' === t.type) throw t.arg
              return this.rval
            },
            dispatchException: function(t) {
              if (this.done) throw t
              var r = this
              function o(n, o) {
                return (c.type = 'throw'), (c.arg = t), (r.next = n), o && ((r.method = 'next'), (r.arg = e)), !!o
              }
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var a = this.tryEntries[i],
                  c = a.completion
                if ('root' === a.tryLoc) return o('end')
                if (a.tryLoc <= this.prev) {
                  var u = n.call(a, 'catchLoc'),
                    f = n.call(a, 'finallyLoc')
                  if (u && f) {
                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                  } else if (u) {
                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                  } else {
                    if (!f) throw new Error('try statement without catch or finally')
                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                  }
                }
              }
            },
            abrupt: function(t, e) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var o = this.tryEntries[r]
                if (o.tryLoc <= this.prev && n.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
                  var i = o
                  break
                }
              }
              i && ('break' === t || 'continue' === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null)
              var a = i ? i.completion : {}
              return (
                (a.type = t),
                (a.arg = e),
                i ? ((this.method = 'next'), (this.next = i.finallyLoc), y) : this.complete(a)
              )
            },
            complete: function(t, e) {
              if ('throw' === t.type) throw t.arg
              return (
                'break' === t.type || 'continue' === t.type
                  ? (this.next = t.arg)
                  : 'return' === t.type
                  ? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
                  : 'normal' === t.type && e && (this.next = e),
                y
              )
            },
            finish: function(t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e]
                if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), _(r), y
              }
            },
            catch: function(t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e]
                if (r.tryLoc === t) {
                  var n = r.completion
                  if ('throw' === n.type) {
                    var o = n.arg
                    _(r)
                  }
                  return o
                }
              }
              throw new Error('illegal catch attempt')
            },
            delegateYield: function(t, r, n) {
              return (
                (this.delegate = { iterator: k(t), resultName: r, nextLoc: n }),
                'next' === this.method && (this.arg = e),
                y
              )
            }
          }),
          t
        )
      })(t.exports)
      try {
        regeneratorRuntime = n
      } catch (o) {
        Function('r', 'regeneratorRuntime = r')(n)
      }
    },
    function(t, e, r) {
      'use strict'
      r.r(e)
      var n = r(0),
        o = r.n(n),
        i = r(1),
        a = r.n(i),
        c = function() {
          console.log('SOMETHING IS dep_one.js')
        },
        u = function() {
          console.log('FOO IS HAPPENING HERE', 'FOO', 'FOO')
        }
      function f() {
        return c()
      }
      r.d(e, 'ss', function() {
        return f
      })
      e.default = function() {
        return console.log('----=-=-==---=-'), u()
      }
      function s() {
        return (s = a()(
          o.a.mark(function t() {
            var e
            return o.a.wrap(function(t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (t.next = 2), r.e(1).then(r.bind(null, 5))
                  case 2:
                    ;(e = t.sent).default(), console.log(e.hello())
                  case 5:
                  case 'end':
                    return t.stop()
                }
            }, t)
          })
        )).apply(this, arguments)
      }
      c(),
        u(),
        (function() {
          return s.apply(this, arguments)
        })().then(function() {
          console.log('done')
        })
    }
  ])
})
