function loadJS(t) {
    var e = document.getElementsByTagName("script")[0]
      , i = document.createElement("script");
    i.src = t,
    e.parentNode.insertBefore(i, e)
}
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.ES6Promise = e()
}(this, function() {
    "use strict";
    function t(t) {
        var e = typeof t;
        return null !== t && ("object" === e || "function" === e)
    }
    function e(t) {
        return "function" == typeof t
    }
    function i(t) {
        F = t
    }
    function n(t) {
        Y = t
    }
    function r() {
        return void 0 !== I ? function() {
            I(o)
        }
        : s()
    }
    function s() {
        var t = setTimeout;
        return function() {
            return t(o, 1)
        }
    }
    function o() {
        for (var t = 0; t < X; t += 2) {
            (0,
            q[t])(q[t + 1]),
            q[t] = void 0,
            q[t + 1] = void 0
        }
        X = 0
    }
    function a(t, e) {
        var i = this
          , n = new this.constructor(c);
        void 0 === n[G] && P(n);
        var r = i._state;
        if (r) {
            var s = arguments[r - 1];
            Y(function() {
                return S(r, n, s, i._result)
            })
        } else
            w(i, n, t, e);
        return n
    }
    function l(t) {
        var e = this;
        if (t && "object" == typeof t && t.constructor === e)
            return t;
        var i = new e(c);
        return _(i, t),
        i
    }
    function c() {}
    function h() {
        return new TypeError("You cannot resolve a promise with itself")
    }
    function u() {
        return new TypeError("A promises callback cannot return that same promise.")
    }
    function d(t) {
        try {
            return t.then
        } catch (t) {
            return K.error = t,
            K
        }
    }
    function p(t, e, i, n) {
        try {
            t.call(e, i, n)
        } catch (t) {
            return t
        }
    }
    function f(t, e, i) {
        Y(function(t) {
            var n = !1
              , r = p(i, e, function(i) {
                n || (n = !0,
                e !== i ? _(t, i) : y(t, i))
            }, function(e) {
                n || (n = !0,
                b(t, e))
            }, "Settle: " + (t._label || " unknown promise"));
            !n && r && (n = !0,
            b(t, r))
        }, t)
    }
    function m(t, e) {
        e._state === Z ? y(t, e._result) : e._state === Q ? b(t, e._result) : w(e, void 0, function(e) {
            return _(t, e)
        }, function(e) {
            return b(t, e)
        })
    }
    function g(t, i, n) {
        i.constructor === t.constructor && n === a && i.constructor.resolve === l ? m(t, i) : n === K ? (b(t, K.error),
        K.error = null) : void 0 === n ? y(t, i) : e(n) ? f(t, i, n) : y(t, i)
    }
    function _(e, i) {
        e === i ? b(e, h()) : t(i) ? g(e, i, d(i)) : y(e, i)
    }
    function v(t) {
        t._onerror && t._onerror(t._result),
        T(t)
    }
    function y(t, e) {
        t._state === V && (t._result = e,
        t._state = Z,
        0 !== t._subscribers.length && Y(T, t))
    }
    function b(t, e) {
        t._state === V && (t._state = Q,
        t._result = e,
        Y(v, t))
    }
    function w(t, e, i, n) {
        var r = t._subscribers
          , s = r.length;
        t._onerror = null,
        r[s] = e,
        r[s + Z] = i,
        r[s + Q] = n,
        0 === s && t._state && Y(T, t)
    }
    function T(t) {
        var e = t._subscribers
          , i = t._state;
        if (0 !== e.length) {
            for (var n = void 0, r = void 0, s = t._result, o = 0; o < e.length; o += 3)
                n = e[o],
                r = e[o + i],
                n ? S(i, n, r, s) : r(s);
            t._subscribers.length = 0
        }
    }
    function x(t, e) {
        try {
            return t(e)
        } catch (t) {
            return K.error = t,
            K
        }
    }
    function S(t, i, n, r) {
        var s = e(n)
          , o = void 0
          , a = void 0
          , l = void 0
          , c = void 0;
        if (s) {
            if (o = x(n, r),
            o === K ? (c = !0,
            a = o.error,
            o.error = null) : l = !0,
            i === o)
                return void b(i, u())
        } else
            o = r,
            l = !0;
        i._state !== V || (s && l ? _(i, o) : c ? b(i, a) : t === Z ? y(i, o) : t === Q && b(i, o))
    }
    function k(t, e) {
        try {
            e(function(e) {
                _(t, e)
            }, function(e) {
                b(t, e)
            })
        } catch (e) {
            b(t, e)
        }
    }
    function C() {
        return J++
    }
    function P(t) {
        t[G] = J++,
        t._state = void 0,
        t._result = void 0,
        t._subscribers = []
    }
    function A() {
        return new Error("Array Methods must be provided an Array")
    }
    function O(t) {
        return new tt(this,t).promise
    }
    function E(t) {
        var e = this;
        return new e(D(t) ? function(i, n) {
            for (var r = t.length, s = 0; s < r; s++)
                e.resolve(t[s]).then(i, n)
        }
        : function(t, e) {
            return e(new TypeError("You must pass an array to race."))
        }
        )
    }
    function z(t) {
        var e = this
          , i = new e(c);
        return b(i, t),
        i
    }
    function R() {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
    }
    function M() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
    }
    function L() {
        var t = void 0;
        if ("undefined" != typeof global)
            t = global;
        else if ("undefined" != typeof self)
            t = self;
        else
            try {
                t = Function("return this")()
            } catch (t) {
                throw new Error("polyfill failed because global object is unavailable in this environment")
            }
        var e = t.Promise;
        if (e) {
            var i = null;
            try {
                i = Object.prototype.toString.call(e.resolve())
            } catch (t) {}
            if ("[object Promise]" === i && !e.cast)
                return
        }
        t.Promise = et
    }
    var $ = void 0;
    $ = Array.isArray ? Array.isArray : function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    ;
    var D = $
      , X = 0
      , I = void 0
      , F = void 0
      , Y = function(t, e) {
        q[X] = t,
        q[X + 1] = e,
        2 === (X += 2) && (F ? F(o) : U())
    }
      , H = "undefined" != typeof window ? window : void 0
      , N = H || {}
      , W = N.MutationObserver || N.WebKitMutationObserver
      , j = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process)
      , B = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel
      , q = new Array(1e3)
      , U = void 0;
    U = j ? function() {
        return function() {
            return process.nextTick(o)
        }
    }() : W ? function() {
        var t = 0
          , e = new W(o)
          , i = document.createTextNode("");
        return e.observe(i, {
            characterData: !0
        }),
        function() {
            i.data = t = ++t % 2
        }
    }() : B ? function() {
        var t = new MessageChannel;
        return t.port1.onmessage = o,
        function() {
            return t.port2.postMessage(0)
        }
    }() : void 0 === H && "function" == typeof require ? function() {
        try {
            var t = Function("return this")().require("vertx");
            return I = t.runOnLoop || t.runOnContext,
            r()
        } catch (t) {
            return s()
        }
    }() : s();
    var G = Math.random().toString(36).substring(2)
      , V = void 0
      , Z = 1
      , Q = 2
      , K = {
        error: null
    }
      , J = 0
      , tt = function() {
        function t(t, e) {
            this._instanceConstructor = t,
            this.promise = new t(c),
            this.promise[G] || P(this.promise),
            D(e) ? (this.length = e.length,
            this._remaining = e.length,
            this._result = new Array(this.length),
            0 === this.length ? y(this.promise, this._result) : (this.length = this.length || 0,
            this._enumerate(e),
            0 === this._remaining && y(this.promise, this._result))) : b(this.promise, A())
        }
        return t.prototype._enumerate = function(t) {
            for (var e = 0; this._state === V && e < t.length; e++)
                this._eachEntry(t[e], e)
        }
        ,
        t.prototype._eachEntry = function(t, e) {
            var i = this._instanceConstructor
              , n = i.resolve;
            if (n === l) {
                var r = d(t);
                if (r === a && t._state !== V)
                    this._settledAt(t._state, e, t._result);
                else if ("function" != typeof r)
                    this._remaining--,
                    this._result[e] = t;
                else if (i === et) {
                    var s = new i(c);
                    g(s, t, r),
                    this._willSettleAt(s, e)
                } else
                    this._willSettleAt(new i(function(e) {
                        return e(t)
                    }
                    ), e)
            } else
                this._willSettleAt(n(t), e)
        }
        ,
        t.prototype._settledAt = function(t, e, i) {
            var n = this.promise;
            n._state === V && (this._remaining--,
            t === Q ? b(n, i) : this._result[e] = i),
            0 === this._remaining && y(n, this._result)
        }
        ,
        t.prototype._willSettleAt = function(t, e) {
            var i = this;
            w(t, void 0, function(t) {
                return i._settledAt(Z, e, t)
            }, function(t) {
                return i._settledAt(Q, e, t)
            })
        }
        ,
        t
    }()
      , et = function() {
        function t(e) {
            this[G] = C(),
            this._result = this._state = void 0,
            this._subscribers = [],
            c !== e && ("function" != typeof e && R(),
            this instanceof t ? k(this, e) : M())
        }
        return t.prototype.catch = function(t) {
            return this.then(null, t)
        }
        ,
        t.prototype.finally = function(t) {
            var e = this
              , i = e.constructor;
            return e.then(function(e) {
                return i.resolve(t()).then(function() {
                    return e
                })
            }, function(e) {
                return i.resolve(t()).then(function() {
                    throw e
                })
            })
        }
        ,
        t
    }();
    return et.prototype.then = a,
    et.all = O,
    et.race = E,
    et.resolve = l,
    et.reject = z,
    et._setScheduler = i,
    et._setAsap = n,
    et._asap = Y,
    et.polyfill = L,
    et.Promise = et,
    et.polyfill(),
    et
});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
        var n = function(t) {
            var e, i = [], n = t.length;
            for (e = 0; e !== n; i.push(t[e++]))
                ;
            return i
        }
          , r = function(t, e, i) {
            var n, r, s = t.cycle;
            for (n in s)
                r = s[n],
                t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
            delete t.cycle
        }
          , s = function(t, e, n) {
            i.call(this, t, e, n),
            this._cycle = 0,
            this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._repeat && this._uncache(!0),
            this.render = s.prototype.render
        }
          , o = 1e-10
          , a = i._internals
          , l = a.isSelector
          , c = a.isArray
          , h = s.prototype = i.to({}, .1, {})
          , u = [];
        s.version = "2.0.1",
        h.constructor = s,
        h.kill()._gc = !1,
        s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf,
        s.getTweensOf = i.getTweensOf,
        s.lagSmoothing = i.lagSmoothing,
        s.ticker = i.ticker,
        s.render = i.render,
        h.invalidate = function() {
            return this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._yoyoEase = null,
            this._uncache(!0),
            i.prototype.invalidate.call(this)
        }
        ,
        h.updateTo = function(t, e) {
            var n, r = this.ratio, s = this.vars.immediateRender || t.immediateRender;
            e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time,
            this._uncache(!1),
            this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (n in t)
                this.vars[n] = t[n];
            if (this._initted || s)
                if (e)
                    this._initted = !1,
                    s && this.render(0, !0, !0);
                else if (this._gc && this._enabled(!0, !1),
                this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this),
                this._time / this._duration > .998) {
                    var o = this._totalTime;
                    this.render(0, !0, !1),
                    this._initted = !1,
                    this.render(o, !0, !1)
                } else if (this._initted = !1,
                this._init(),
                this._time > 0 || s)
                    for (var a, l = 1 / (1 - r), c = this._firstPT; c; )
                        a = c.s + c.c,
                        c.c *= l,
                        c.s = a - c.c,
                        c = c._next;
            return this
        }
        ,
        h.render = function(t, e, n) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var r, s, l, c, h, u, d, p, f, m = this._dirty ? this.totalDuration() : this._totalDuration, g = this._time, _ = this._totalTime, v = this._cycle, y = this._duration, b = this._rawPrevTime;
            if (t >= m - 1e-7 && t >= 0 ? (this._totalTime = m,
            this._cycle = this._repeat,
            this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = y,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
            this._reversed || (r = !0,
            s = "onComplete",
            n = n || this._timeline.autoRemoveChildren),
            0 === y && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (t = 0),
            (0 > b || 0 >= t && t >= -1e-7 || b === o && "isPause" !== this.data) && b !== t && (n = !0,
            b > o && (s = "onReverseComplete")),
            this._rawPrevTime = p = !e || t || b === t ? t : o)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
            (0 !== _ || 0 === y && b > 0) && (s = "onReverseComplete",
            r = this._reversed),
            0 > t && (this._active = !1,
            0 === y && (this._initted || !this.vars.lazy || n) && (b >= 0 && (n = !0),
            this._rawPrevTime = p = !e || t || b === t ? t : o)),
            this._initted || (n = !0)) : (this._totalTime = this._time = t,
            0 !== this._repeat && (c = y + this._repeatDelay,
            this._cycle = this._totalTime / c >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / c && t >= _ && this._cycle--,
            this._time = this._totalTime - this._cycle * c,
            this._yoyo && 0 != (1 & this._cycle) && (this._time = y - this._time,
            (f = this._yoyoEase || this.vars.yoyoEase) && (this._yoyoEase || (!0 !== f || this._initted ? this._yoyoEase = f = !0 === f ? this._ease : f instanceof Ease ? f : Ease.map[f] : (f = this.vars.ease,
            this._yoyoEase = f = f ? f instanceof Ease ? f : "function" == typeof f ? new Ease(f,this.vars.easeParams) : Ease.map[f] || i.defaultEase : i.defaultEase)),
            this.ratio = f ? 1 - f.getRatio((y - this._time) / y) : 0)),
            this._time > y ? this._time = y : this._time < 0 && (this._time = 0)),
            this._easeType && !f ? (h = this._time / y,
            u = this._easeType,
            d = this._easePower,
            (1 === u || 3 === u && h >= .5) && (h = 1 - h),
            3 === u && (h *= 2),
            1 === d ? h *= h : 2 === d ? h *= h * h : 3 === d ? h *= h * h * h : 4 === d && (h *= h * h * h * h),
            1 === u ? this.ratio = 1 - h : 2 === u ? this.ratio = h : this._time / y < .5 ? this.ratio = h / 2 : this.ratio = 1 - h / 2) : f || (this.ratio = this._ease.getRatio(this._time / y))),
            g === this._time && !n && v === this._cycle)
                return void (_ !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
            if (!this._initted) {
                if (this._init(),
                !this._initted || this._gc)
                    return;
                if (!n && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration))
                    return this._time = g,
                    this._totalTime = _,
                    this._rawPrevTime = b,
                    this._cycle = v,
                    a.lazyTweens.push(this),
                    void (this._lazy = [t, e]);
                !this._time || r || f ? r && this._ease._calcEnd && !f && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / y)
            }
            for (!1 !== this._lazy && (this._lazy = !1),
            this._active || !this._paused && this._time !== g && t >= 0 && (this._active = !0),
            0 === _ && (2 === this._initted && t > 0 && this._init(),
            this._startAt && (t >= 0 ? this._startAt.render(t, !0, n) : s || (s = "_dummyGS")),
            this.vars.onStart && (0 !== this._totalTime || 0 === y) && (e || this._callback("onStart"))),
            l = this._firstPT; l; )
                l.f ? l.t[l.p](l.c * this.ratio + l.s) : l.t[l.p] = l.c * this.ratio + l.s,
                l = l._next;
            this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, !0, n),
            e || (this._totalTime !== _ || s) && this._callback("onUpdate")),
            this._cycle !== v && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")),
            s && (!this._gc || n) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, !0, n),
            r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !e && this.vars[s] && this._callback(s),
            0 === y && this._rawPrevTime === o && p !== o && (this._rawPrevTime = 0))
        }
        ,
        s.to = function(t, e, i) {
            return new s(t,e,i)
        }
        ,
        s.from = function(t, e, i) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            new s(t,e,i)
        }
        ,
        s.fromTo = function(t, e, i, n) {
            return n.startAt = i,
            n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender,
            new s(t,e,n)
        }
        ,
        s.staggerTo = s.allTo = function(t, e, o, a, h, d, p) {
            a = a || 0;
            var f, m, g, _, v = 0, y = [], b = function() {
                o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments),
                h.apply(p || o.callbackScope || this, d || u)
            }, w = o.cycle, T = o.startAt && o.startAt.cycle;
            for (c(t) || ("string" == typeof t && (t = i.selector(t) || t),
            l(t) && (t = n(t))),
            t = t || [],
            0 > a && (t = n(t),
            t.reverse(),
            a *= -1),
            f = t.length - 1,
            g = 0; f >= g; g++) {
                m = {};
                for (_ in o)
                    m[_] = o[_];
                if (w && (r(m, t, g),
                null != m.duration && (e = m.duration,
                delete m.duration)),
                T) {
                    T = m.startAt = {};
                    for (_ in o.startAt)
                        T[_] = o.startAt[_];
                    r(m.startAt, t, g)
                }
                m.delay = v + (m.delay || 0),
                g === f && h && (m.onComplete = b),
                y[g] = new s(t[g],e,m),
                v += a
            }
            return y
        }
        ,
        s.staggerFrom = s.allFrom = function(t, e, i, n, r, o, a) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            s.staggerTo(t, e, i, n, r, o, a)
        }
        ,
        s.staggerFromTo = s.allFromTo = function(t, e, i, n, r, o, a, l) {
            return n.startAt = i,
            n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender,
            s.staggerTo(t, e, n, r, o, a, l)
        }
        ,
        s.delayedCall = function(t, e, i, n, r) {
            return new s(e,0,{
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                callbackScope: n,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                immediateRender: !1,
                useFrames: r,
                overwrite: 0
            })
        }
        ,
        s.set = function(t, e) {
            return new s(t,0,e)
        }
        ,
        s.isTweening = function(t) {
            return i.getTweensOf(t, !0).length > 0
        }
        ;
        var d = function(t, e) {
            for (var n = [], r = 0, s = t._first; s; )
                s instanceof i ? n[r++] = s : (e && (n[r++] = s),
                n = n.concat(d(s, e)),
                r = n.length),
                s = s._next;
            return n
        }
          , p = s.getAllTweens = function(e) {
            return d(t._rootTimeline, e).concat(d(t._rootFramesTimeline, e))
        }
        ;
        s.killAll = function(t, i, n, r) {
            null == i && (i = !0),
            null == n && (n = !0);
            var s, o, a, l = p(0 != r), c = l.length, h = i && n && r;
            for (a = 0; c > a; a++)
                o = l[a],
                (h || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
        }
        ,
        s.killChildTweensOf = function(t, e) {
            if (null != t) {
                var r, o, h, u, d, p = a.tweenLookup;
                if ("string" == typeof t && (t = i.selector(t) || t),
                l(t) && (t = n(t)),
                c(t))
                    for (u = t.length; --u > -1; )
                        s.killChildTweensOf(t[u], e);
                else {
                    r = [];
                    for (h in p)
                        for (o = p[h].target.parentNode; o; )
                            o === t && (r = r.concat(p[h].tweens)),
                            o = o.parentNode;
                    for (d = r.length,
                    u = 0; d > u; u++)
                        e && r[u].totalTime(r[u].totalDuration()),
                        r[u]._enabled(!1, !1)
                }
            }
        }
        ;
        var f = function(t, i, n, r) {
            i = !1 !== i,
            n = !1 !== n,
            r = !1 !== r;
            for (var s, o, a = p(r), l = i && n && r, c = a.length; --c > -1; )
                o = a[c],
                (l || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && o.paused(t)
        };
        return s.pauseAll = function(t, e, i) {
            f(!0, t, e, i)
        }
        ,
        s.resumeAll = function(t, e, i) {
            f(!1, t, e, i)
        }
        ,
        s.globalTimeScale = function(e) {
            var n = t._rootTimeline
              , r = i.ticker.time;
            return arguments.length ? (e = e || o,
            n._startTime = r - (r - n._startTime) * n._timeScale / e,
            n = t._rootFramesTimeline,
            r = i.ticker.frame,
            n._startTime = r - (r - n._startTime) * n._timeScale / e,
            n._timeScale = t._rootTimeline._timeScale = e,
            e) : n._timeScale
        }
        ,
        h.progress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
        }
        ,
        h.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
        }
        ,
        h.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            t > this._duration && (t = this._duration),
            this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(t, e)) : this._time
        }
        ,
        h.duration = function(e) {
            return arguments.length ? t.prototype.duration.call(this, e) : this._duration
        }
        ,
        h.totalDuration = function(t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat,
            this._dirty = !1),
            this._totalDuration)
        }
        ,
        h.repeat = function(t) {
            return arguments.length ? (this._repeat = t,
            this._uncache(!0)) : this._repeat
        }
        ,
        h.repeatDelay = function(t) {
            return arguments.length ? (this._repeatDelay = t,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        h.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t,
            this) : this._yoyo
        }
        ,
        s
    }, !0),
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
        var n = function(t) {
            e.call(this, t),
            this._labels = {},
            this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren,
            this.smoothChildTiming = !0 === this.vars.smoothChildTiming,
            this._sortChildren = !0,
            this._onUpdate = this.vars.onUpdate;
            var i, n, r = this.vars;
            for (n in r)
                i = r[n],
                l(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
            l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
        }
          , r = 1e-10
          , s = i._internals
          , o = n._internals = {}
          , a = s.isSelector
          , l = s.isArray
          , c = s.lazyTweens
          , h = s.lazyRender
          , u = _gsScope._gsDefine.globals
          , d = function(t) {
            var e, i = {};
            for (e in t)
                i[e] = t[e];
            return i
        }
          , p = function(t, e, i) {
            var n, r, s = t.cycle;
            for (n in s)
                r = s[n],
                t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
            delete t.cycle
        }
          , f = o.pauseCallback = function() {}
          , m = function(t) {
            var e, i = [], n = t.length;
            for (e = 0; e !== n; i.push(t[e++]))
                ;
            return i
        }
          , g = n.prototype = new e;
        return n.version = "2.0.1",
        g.constructor = n,
        g.kill()._gc = g._forcingPlayhead = g._hasPause = !1,
        g.to = function(t, e, n, r) {
            var s = n.repeat && u.TweenMax || i;
            return e ? this.add(new s(t,e,n), r) : this.set(t, n, r)
        }
        ,
        g.from = function(t, e, n, r) {
            return this.add((n.repeat && u.TweenMax || i).from(t, e, n), r)
        }
        ,
        g.fromTo = function(t, e, n, r, s) {
            var o = r.repeat && u.TweenMax || i;
            return e ? this.add(o.fromTo(t, e, n, r), s) : this.set(t, r, s)
        }
        ,
        g.staggerTo = function(t, e, r, s, o, l, c, h) {
            var u, f, g = new n({
                onComplete: l,
                onCompleteParams: c,
                callbackScope: h,
                smoothChildTiming: this.smoothChildTiming
            }), _ = r.cycle;
            for ("string" == typeof t && (t = i.selector(t) || t),
            t = t || [],
            a(t) && (t = m(t)),
            s = s || 0,
            0 > s && (t = m(t),
            t.reverse(),
            s *= -1),
            f = 0; f < t.length; f++)
                u = d(r),
                u.startAt && (u.startAt = d(u.startAt),
                u.startAt.cycle && p(u.startAt, t, f)),
                _ && (p(u, t, f),
                null != u.duration && (e = u.duration,
                delete u.duration)),
                g.to(t[f], e, u, f * s);
            return this.add(g, o)
        }
        ,
        g.staggerFrom = function(t, e, i, n, r, s, o, a) {
            return i.immediateRender = 0 != i.immediateRender,
            i.runBackwards = !0,
            this.staggerTo(t, e, i, n, r, s, o, a)
        }
        ,
        g.staggerFromTo = function(t, e, i, n, r, s, o, a, l) {
            return n.startAt = i,
            n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender,
            this.staggerTo(t, e, n, r, s, o, a, l)
        }
        ,
        g.call = function(t, e, n, r) {
            return this.add(i.delayedCall(0, t, e, n), r)
        }
        ,
        g.set = function(t, e, n) {
            return n = this._parseTimeOrLabel(n, 0, !0),
            null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused),
            this.add(new i(t,0,e), n)
        }
        ,
        n.exportRoot = function(t, e) {
            t = t || {},
            null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var r, s, o, a, l = new n(t), c = l._timeline;
            for (null == e && (e = !0),
            c._remove(l, !0),
            l._startTime = 0,
            l._rawPrevTime = l._time = l._totalTime = c._time,
            o = c._first; o; )
                a = o._next,
                e && o instanceof i && o.target === o.vars.onComplete || (s = o._startTime - o._delay,
                0 > s && (r = 1),
                l.add(o, s)),
                o = a;
            return c.add(l, 0),
            r && l.totalDuration(),
            l
        }
        ,
        g.add = function(r, s, o, a) {
            var c, h, u, d, p, f;
            if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)),
            !(r instanceof t)) {
                if (r instanceof Array || r && r.push && l(r)) {
                    for (o = o || "normal",
                    a = a || 0,
                    c = s,
                    h = r.length,
                    u = 0; h > u; u++)
                        l(d = r[u]) && (d = new n({
                            tweens: d
                        })),
                        this.add(d, c),
                        "string" != typeof d && "function" != typeof d && ("sequence" === o ? c = d._startTime + d.totalDuration() / d._timeScale : "start" === o && (d._startTime -= d.delay())),
                        c += a;
                    return this._uncache(!0)
                }
                if ("string" == typeof r)
                    return this.addLabel(r, s);
                if ("function" != typeof r)
                    throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = i.delayedCall(0, r)
            }
            if (e.prototype.add.call(this, r, s),
            r._time && r.render((this.rawTime() - r._startTime) * r._timeScale, !1, !1),
            (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (p = this,
                f = p.rawTime() > r._startTime; p._timeline; )
                    f && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1),
                    p = p._timeline;
            return this
        }
        ,
        g.remove = function(e) {
            if (e instanceof t) {
                this._remove(e, !1);
                var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale,
                this
            }
            if (e instanceof Array || e && e.push && l(e)) {
                for (var n = e.length; --n > -1; )
                    this.remove(e[n]);
                return this
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
        }
        ,
        g._remove = function(t, i) {
            return e.prototype._remove.call(this, t, i),
            this._last ? this._time > this.duration() && (this._time = this._duration,
            this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
            this
        }
        ,
        g.append = function(t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }
        ,
        g.insert = g.insertMultiple = function(t, e, i, n) {
            return this.add(t, e || 0, i, n)
        }
        ,
        g.appendMultiple = function(t, e, i, n) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
        }
        ,
        g.addLabel = function(t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e),
            this
        }
        ,
        g.addPause = function(t, e, n, r) {
            var s = i.delayedCall(0, f, n, r || this);
            return s.vars.onComplete = s.vars.onReverseComplete = e,
            s.data = "isPause",
            this._hasPause = !0,
            this.add(s, t)
        }
        ,
        g.removeLabel = function(t) {
            return delete this._labels[t],
            this
        }
        ,
        g.getLabelTime = function(t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }
        ,
        g._parseTimeOrLabel = function(e, i, n, r) {
            var s, o;
            if (r instanceof t && r.timeline === this)
                this.remove(r);
            else if (r && (r instanceof Array || r.push && l(r)))
                for (o = r.length; --o > -1; )
                    r[o]instanceof t && r[o].timeline === this && this.remove(r[o]);
            if (s = "number" != typeof e || i ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0,
            "string" == typeof i)
                return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - s : 0, n);
            if (i = i || 0,
            "string" != typeof e || !isNaN(e) && null == this._labels[e])
                null == e && (e = s);
            else {
                if (-1 === (o = e.indexOf("=")))
                    return null == this._labels[e] ? n ? this._labels[e] = s + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1)),
                e = o > 1 ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, n) : s
            }
            return Number(e) + i
        }
        ,
        g.seek = function(t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
        }
        ,
        g.stop = function() {
            return this.paused(!0)
        }
        ,
        g.gotoAndPlay = function(t, e) {
            return this.play(t, e)
        }
        ,
        g.gotoAndStop = function(t, e) {
            return this.pause(t, e)
        }
        ,
        g.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var n, s, o, a, l, u, d, p = this._time, f = this._dirty ? this.totalDuration() : this._totalDuration, m = this._startTime, g = this._timeScale, _ = this._paused;
            if (p !== this._time && (t += this._time - p),
            t >= f - 1e-7 && t >= 0)
                this._totalTime = this._time = f,
                this._reversed || this._hasPausedChild() || (s = !0,
                a = "onComplete",
                l = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 >= t && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0,
                this._rawPrevTime > r && (a = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r,
                t = f + 1e-4;
            else if (1e-7 > t)
                if (this._totalTime = this._time = 0,
                (0 !== p || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (a = "onReverseComplete",
                s = this._reversed),
                0 > t)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0,
                    a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0),
                    this._rawPrevTime = t;
                else {
                    if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r,
                    0 === t && s)
                        for (n = this._first; n && 0 === n._startTime; )
                            n._duration || (s = !1),
                            n = n._next;
                    t = 0,
                    this._initted || (l = !0)
                }
            else {
                if (this._hasPause && !this._forcingPlayhead && !e) {
                    if (t >= p)
                        for (n = this._first; n && n._startTime <= t && !u; )
                            n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (u = n),
                            n = n._next;
                    else
                        for (n = this._last; n && n._startTime >= t && !u; )
                            n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (u = n),
                            n = n._prev;
                    u && (this._time = t = u._startTime,
                    this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = t
            }
            if (this._time !== p && this._first || i || l || u) {
                if (this._initted || (this._initted = !0),
                this._active || !this._paused && this._time !== p && t > 0 && (this._active = !0),
                0 === p && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")),
                (d = this._time) >= p)
                    for (n = this._first; n && (o = n._next,
                    d === this._time && (!this._paused || _)); )
                        (n._active || n._startTime <= d && !n._paused && !n._gc) && (u === n && this.pause(),
                        n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)),
                        n = o;
                else
                    for (n = this._last; n && (o = n._prev,
                    d === this._time && (!this._paused || _)); ) {
                        if (n._active || n._startTime <= p && !n._paused && !n._gc) {
                            if (u === n) {
                                for (u = n._prev; u && u.endTime() > this._time; )
                                    u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i),
                                    u = u._prev;
                                u = null,
                                this.pause()
                            }
                            n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                        }
                        n = o
                    }
                this._onUpdate && (e || (c.length && h(),
                this._callback("onUpdate"))),
                a && (this._gc || (m === this._startTime || g !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (s && (c.length && h(),
                this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !e && this.vars[a] && this._callback(a)))
            }
        }
        ,
        g._hasPausedChild = function() {
            for (var t = this._first; t; ) {
                if (t._paused || t instanceof n && t._hasPausedChild())
                    return !0;
                t = t._next
            }
            return !1
        }
        ,
        g.getChildren = function(t, e, n, r) {
            r = r || -9999999999;
            for (var s = [], o = this._first, a = 0; o; )
                o._startTime < r || (o instanceof i ? !1 !== e && (s[a++] = o) : (!1 !== n && (s[a++] = o),
                !1 !== t && (s = s.concat(o.getChildren(!0, e, n)),
                a = s.length))),
                o = o._next;
            return s
        }
        ,
        g.getTweensOf = function(t, e) {
            var n, r, s = this._gc, o = [], a = 0;
            for (s && this._enabled(!0, !0),
            n = i.getTweensOf(t),
            r = n.length; --r > -1; )
                (n[r].timeline === this || e && this._contains(n[r])) && (o[a++] = n[r]);
            return s && this._enabled(!1, !0),
            o
        }
        ,
        g.recent = function() {
            return this._recent
        }
        ,
        g._contains = function(t) {
            for (var e = t.timeline; e; ) {
                if (e === this)
                    return !0;
                e = e.timeline
            }
            return !1
        }
        ,
        g.shiftChildren = function(t, e, i) {
            i = i || 0;
            for (var n, r = this._first, s = this._labels; r; )
                r._startTime >= i && (r._startTime += t),
                r = r._next;
            if (e)
                for (n in s)
                    s[n] >= i && (s[n] += t);
            return this._uncache(!0)
        }
        ,
        g._kill = function(t, e) {
            if (!t && !e)
                return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1; )
                i[n]._kill(t, e) && (r = !0);
            return r
        }
        ,
        g.clear = function(t) {
            var e = this.getChildren(!1, !0, !0)
              , i = e.length;
            for (this._time = this._totalTime = 0; --i > -1; )
                e[i]._enabled(!1, !1);
            return !1 !== t && (this._labels = {}),
            this._uncache(!0)
        }
        ,
        g.invalidate = function() {
            for (var e = this._first; e; )
                e.invalidate(),
                e = e._next;
            return t.prototype.invalidate.call(this)
        }
        ,
        g._enabled = function(t, i) {
            if (t === this._gc)
                for (var n = this._first; n; )
                    n._enabled(t, !0),
                    n = n._next;
            return e.prototype._enabled.call(this, t, i)
        }
        ,
        g.totalTime = function(e, i, n) {
            this._forcingPlayhead = !0;
            var r = t.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1,
            r
        }
        ,
        g.duration = function(t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t),
            this) : (this._dirty && this.totalDuration(),
            this._duration)
        }
        ,
        g.totalDuration = function(t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, n = 0, r = this._last, s = 999999999999; r; )
                        e = r._prev,
                        r._dirty && r.totalDuration(),
                        r._startTime > s && this._sortChildren && !r._paused && !this._calculatingDuration ? (this._calculatingDuration = 1,
                        this.add(r, r._startTime - r._delay),
                        this._calculatingDuration = 0) : s = r._startTime,
                        r._startTime < 0 && !r._paused && (n -= r._startTime,
                        this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale,
                        this._time -= r._startTime,
                        this._totalTime -= r._startTime,
                        this._rawPrevTime -= r._startTime),
                        this.shiftChildren(-r._startTime, !1, -9999999999),
                        s = 0),
                        i = r._startTime + r._totalDuration / r._timeScale,
                        i > n && (n = i),
                        r = e;
                    this._duration = this._totalDuration = n,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
        }
        ,
        g.paused = function(e) {
            if (!e)
                for (var i = this._first, n = this._time; i; )
                    i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0),
                    i = i._next;
            return t.prototype.paused.apply(this, arguments)
        }
        ,
        g.usesFrames = function() {
            for (var e = this._timeline; e._timeline; )
                e = e._timeline;
            return e === t._rootFramesTimeline
        }
        ,
        g.rawTime = function(t) {
            return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
        }
        ,
        n
    }, !0),
    _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
        var n = function(e) {
            t.call(this, e),
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._cycle = 0,
            this._yoyo = !0 === this.vars.yoyo,
            this._dirty = !0
        }
          , r = 1e-10
          , s = e._internals
          , o = s.lazyTweens
          , a = s.lazyRender
          , l = _gsScope._gsDefine.globals
          , c = new i(null,null,1,0)
          , h = n.prototype = new t;
        return h.constructor = n,
        h.kill()._gc = !1,
        n.version = "2.0.1",
        h.invalidate = function() {
            return this._yoyo = !0 === this.vars.yoyo,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            t.prototype.invalidate.call(this)
        }
        ,
        h.addCallback = function(t, i, n, r) {
            return this.add(e.delayedCall(0, t, n, r), i)
        }
        ,
        h.removeCallback = function(t, e) {
            if (t)
                if (null == e)
                    this._kill(null, t);
                else
                    for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1; )
                        i[n]._startTime === r && i[n]._enabled(!1, !1);
            return this
        }
        ,
        h.removePause = function(e) {
            return this.removeCallback(t._internals.pauseCallback, e)
        }
        ,
        h.tweenTo = function(t, i) {
            i = i || {};
            var n, r, s, o = {
                ease: c,
                useFrames: this.usesFrames(),
                immediateRender: !1,
                lazy: !1
            }, a = i.repeat && l.TweenMax || e;
            for (r in i)
                o[r] = i[r];
            return o.time = this._parseTimeOrLabel(t),
            n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001,
            s = new a(this,n,o),
            o.onStart = function() {
                s.target.paused(!0),
                s.vars.time === s.target.time() || n !== s.duration() || s.isFromTo || s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale).render(s.time(), !0, !0),
                i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
            }
            ,
            s
        }
        ,
        h.tweenFromTo = function(t, e, i) {
            i = i || {},
            t = this._parseTimeOrLabel(t),
            i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                callbackScope: this
            },
            i.immediateRender = !1 !== i.immediateRender;
            var n = this.tweenTo(e, i);
            return n.isFromTo = 1,
            n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
        }
        ,
        h.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var n, s, l, c, h, u, d, p, f = this._time, m = this._dirty ? this.totalDuration() : this._totalDuration, g = this._duration, _ = this._totalTime, v = this._startTime, y = this._timeScale, b = this._rawPrevTime, w = this._paused, T = this._cycle;
            if (f !== this._time && (t += this._time - f),
            t >= m - 1e-7 && t >= 0)
                this._locked || (this._totalTime = m,
                this._cycle = this._repeat),
                this._reversed || this._hasPausedChild() || (s = !0,
                c = "onComplete",
                h = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 >= t && t >= -1e-7 || 0 > b || b === r) && b !== t && this._first && (h = !0,
                b > r && (c = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r,
                this._yoyo && 0 != (1 & this._cycle) ? this._time = t = 0 : (this._time = g,
                t = g + 1e-4);
            else if (1e-7 > t)
                if (this._locked || (this._totalTime = this._cycle = 0),
                this._time = 0,
                (0 !== f || 0 === g && b !== r && (b > 0 || 0 > t && b >= 0) && !this._locked) && (c = "onReverseComplete",
                s = this._reversed),
                0 > t)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (h = s = !0,
                    c = "onReverseComplete") : b >= 0 && this._first && (h = !0),
                    this._rawPrevTime = t;
                else {
                    if (this._rawPrevTime = g || !e || t || this._rawPrevTime === t ? t : r,
                    0 === t && s)
                        for (n = this._first; n && 0 === n._startTime; )
                            n._duration || (s = !1),
                            n = n._next;
                    t = 0,
                    this._initted || (h = !0)
                }
            else if (0 === g && 0 > b && (h = !0),
            this._time = this._rawPrevTime = t,
            this._locked || (this._totalTime = t,
            0 !== this._repeat && (u = g + this._repeatDelay,
            this._cycle = this._totalTime / u >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / u && t >= _ && this._cycle--,
            this._time = this._totalTime - this._cycle * u,
            this._yoyo && 0 != (1 & this._cycle) && (this._time = g - this._time),
            this._time > g ? (this._time = g,
            t = g + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)),
            this._hasPause && !this._forcingPlayhead && !e) {
                if ((t = this._time) >= f || this._repeat && T !== this._cycle)
                    for (n = this._first; n && n._startTime <= t && !d; )
                        n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (d = n),
                        n = n._next;
                else
                    for (n = this._last; n && n._startTime >= t && !d; )
                        n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (d = n),
                        n = n._prev;
                d && d._startTime < g && (this._time = t = d._startTime,
                this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== T && !this._locked) {
                var x = this._yoyo && 0 != (1 & T)
                  , S = x === (this._yoyo && 0 != (1 & this._cycle))
                  , k = this._totalTime
                  , C = this._cycle
                  , P = this._rawPrevTime
                  , A = this._time;
                if (this._totalTime = T * g,
                this._cycle < T ? x = !x : this._totalTime += g,
                this._time = f,
                this._rawPrevTime = 0 === g ? b - 1e-4 : b,
                this._cycle = T,
                this._locked = !0,
                f = x ? 0 : g,
                this.render(f, e, 0 === g),
                e || this._gc || this.vars.onRepeat && (this._cycle = C,
                this._locked = !1,
                this._callback("onRepeat")),
                f !== this._time)
                    return;
                if (S && (this._cycle = T,
                this._locked = !0,
                f = x ? g + 1e-4 : -1e-4,
                this.render(f, !0, !1)),
                this._locked = !1,
                this._paused && !w)
                    return;
                this._time = A,
                this._totalTime = k,
                this._cycle = C,
                this._rawPrevTime = P
            }
            if (!(this._time !== f && this._first || i || h || d))
                return void (_ !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
            if (this._initted || (this._initted = !0),
            this._active || !this._paused && this._totalTime !== _ && t > 0 && (this._active = !0),
            0 === _ && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")),
            (p = this._time) >= f)
                for (n = this._first; n && (l = n._next,
                p === this._time && (!this._paused || w)); )
                    (n._active || n._startTime <= this._time && !n._paused && !n._gc) && (d === n && this.pause(),
                    n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)),
                    n = l;
            else
                for (n = this._last; n && (l = n._prev,
                p === this._time && (!this._paused || w)); ) {
                    if (n._active || n._startTime <= f && !n._paused && !n._gc) {
                        if (d === n) {
                            for (d = n._prev; d && d.endTime() > this._time; )
                                d.render(d._reversed ? d.totalDuration() - (t - d._startTime) * d._timeScale : (t - d._startTime) * d._timeScale, e, i),
                                d = d._prev;
                            d = null,
                            this.pause()
                        }
                        n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                    }
                    n = l
                }
            this._onUpdate && (e || (o.length && a(),
            this._callback("onUpdate"))),
            c && (this._locked || this._gc || (v === this._startTime || y !== this._timeScale) && (0 === this._time || m >= this.totalDuration()) && (s && (o.length && a(),
            this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !e && this.vars[c] && this._callback(c)))
        }
        ,
        h.getActive = function(t, e, i) {
            null == t && (t = !0),
            null == e && (e = !0),
            null == i && (i = !1);
            var n, r, s = [], o = this.getChildren(t, e, i), a = 0, l = o.length;
            for (n = 0; l > n; n++)
                r = o[n],
                r.isActive() && (s[a++] = r);
            return s
        }
        ,
        h.getLabelAfter = function(t) {
            t || 0 !== t && (t = this._time);
            var e, i = this.getLabelsArray(), n = i.length;
            for (e = 0; n > e; e++)
                if (i[e].time > t)
                    return i[e].name;
            return null
        }
        ,
        h.getLabelBefore = function(t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1; )
                if (e[i].time < t)
                    return e[i].name;
            return null
        }
        ,
        h.getLabelsArray = function() {
            var t, e = [], i = 0;
            for (t in this._labels)
                e[i++] = {
                    time: this._labels[t],
                    name: t
                };
            return e.sort(function(t, e) {
                return t.time - e.time
            }),
            e
        }
        ,
        h.invalidate = function() {
            return this._locked = !1,
            t.prototype.invalidate.call(this)
        }
        ,
        h.progress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration() || 0
        }
        ,
        h.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration() || 0
        }
        ,
        h.totalDuration = function(e) {
            return arguments.length ? -1 !== this._repeat && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this),
            this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat),
            this._totalDuration)
        }
        ,
        h.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            t > this._duration && (t = this._duration),
            this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(t, e)) : this._time
        }
        ,
        h.repeat = function(t) {
            return arguments.length ? (this._repeat = t,
            this._uncache(!0)) : this._repeat
        }
        ,
        h.repeatDelay = function(t) {
            return arguments.length ? (this._repeatDelay = t,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        h.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t,
            this) : this._yoyo
        }
        ,
        h.currentLabel = function(t) {
            return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
        }
        ,
        n
    }, !0),
    function() {
        var t = 180 / Math.PI
          , e = []
          , i = []
          , n = []
          , r = {}
          , s = _gsScope._gsDefine.globals
          , o = function(t, e, i, n) {
            i === n && (i = n - (n - e) / 1e6),
            t === e && (e = t + (i - t) / 1e6),
            this.a = t,
            this.b = e,
            this.c = i,
            this.d = n,
            this.da = n - t,
            this.ca = i - t,
            this.ba = e - t
        }
          , a = function(t, e, i, n) {
            var r = {
                a: t
            }
              , s = {}
              , o = {}
              , a = {
                c: n
            }
              , l = (t + e) / 2
              , c = (e + i) / 2
              , h = (i + n) / 2
              , u = (l + c) / 2
              , d = (c + h) / 2
              , p = (d - u) / 8;
            return r.b = l + (t - l) / 4,
            s.b = u + p,
            r.c = s.a = (r.b + s.b) / 2,
            s.c = o.a = (u + d) / 2,
            o.b = d - p,
            a.b = h + (n - h) / 4,
            o.c = a.a = (o.b + a.b) / 2,
            [r, s, o, a]
        }
          , l = function(t, r, s, o, l) {
            var c, h, u, d, p, f, m, g, _, v, y, b, w, T = t.length - 1, x = 0, S = t[0].a;
            for (c = 0; T > c; c++)
                p = t[x],
                h = p.a,
                u = p.d,
                d = t[x + 1].d,
                l ? (y = e[c],
                b = i[c],
                w = (b + y) * r * .25 / (o ? .5 : n[c] || .5),
                f = u - (u - h) * (o ? .5 * r : 0 !== y ? w / y : 0),
                m = u + (d - u) * (o ? .5 * r : 0 !== b ? w / b : 0),
                g = u - (f + ((m - f) * (3 * y / (y + b) + .5) / 4 || 0))) : (f = u - (u - h) * r * .5,
                m = u + (d - u) * r * .5,
                g = u - (f + m) / 2),
                f += g,
                m += g,
                p.c = _ = f,
                p.b = 0 !== c ? S : S = p.a + .6 * (p.c - p.a),
                p.da = u - h,
                p.ca = _ - h,
                p.ba = S - h,
                s ? (v = a(h, S, _, u),
                t.splice(x, 1, v[0], v[1], v[2], v[3]),
                x += 4) : x++,
                S = m;
            p = t[x],
            p.b = S,
            p.c = S + .4 * (p.d - S),
            p.da = p.d - p.a,
            p.ca = p.c - p.a,
            p.ba = S - p.a,
            s && (v = a(p.a, S, p.c, p.d),
            t.splice(x, 1, v[0], v[1], v[2], v[3]))
        }
          , c = function(t, n, r, s) {
            var a, l, c, h, u, d, p = [];
            if (s)
                for (t = [s].concat(t),
                l = t.length; --l > -1; )
                    "string" == typeof (d = t[l][n]) && "=" === d.charAt(1) && (t[l][n] = s[n] + Number(d.charAt(0) + d.substr(2)));
            if (0 > (a = t.length - 2))
                return p[0] = new o(t[0][n],0,0,t[0][n]),
                p;
            for (l = 0; a > l; l++)
                c = t[l][n],
                h = t[l + 1][n],
                p[l] = new o(c,0,0,h),
                r && (u = t[l + 2][n],
                e[l] = (e[l] || 0) + (h - c) * (h - c),
                i[l] = (i[l] || 0) + (u - h) * (u - h));
            return p[l] = new o(t[l][n],0,0,t[l + 1][n]),
            p
        }
          , h = function(t, s, o, a, h, u) {
            var d, p, f, m, g, _, v, y, b = {}, w = [], T = u || t[0];
            h = "string" == typeof h ? "," + h + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            null == s && (s = 1);
            for (p in t[0])
                w.push(p);
            if (t.length > 1) {
                for (y = t[t.length - 1],
                v = !0,
                d = w.length; --d > -1; )
                    if (p = w[d],
                    Math.abs(T[p] - y[p]) > .05) {
                        v = !1;
                        break
                    }
                v && (t = t.concat(),
                u && t.unshift(u),
                t.push(t[1]),
                u = t[t.length - 3])
            }
            for (e.length = i.length = n.length = 0,
            d = w.length; --d > -1; )
                p = w[d],
                r[p] = -1 !== h.indexOf("," + p + ","),
                b[p] = c(t, p, r[p], u);
            for (d = e.length; --d > -1; )
                e[d] = Math.sqrt(e[d]),
                i[d] = Math.sqrt(i[d]);
            if (!a) {
                for (d = w.length; --d > -1; )
                    if (r[p])
                        for (f = b[w[d]],
                        _ = f.length - 1,
                        m = 0; _ > m; m++)
                            g = f[m + 1].da / i[m] + f[m].da / e[m] || 0,
                            n[m] = (n[m] || 0) + g * g;
                for (d = n.length; --d > -1; )
                    n[d] = Math.sqrt(n[d])
            }
            for (d = w.length,
            m = o ? 4 : 1; --d > -1; )
                p = w[d],
                f = b[p],
                l(f, s, o, a, r[p]),
                v && (f.splice(0, m),
                f.splice(f.length - m, m));
            return b
        }
          , u = function(t, e, i) {
            e = e || "soft";
            var n, r, s, a, l, c, h, u, d, p, f, m = {}, g = "cubic" === e ? 3 : 2, _ = "soft" === e, v = [];
            if (_ && i && (t = [i].concat(t)),
            null == t || t.length < g + 1)
                throw "invalid Bezier data";
            for (d in t[0])
                v.push(d);
            for (c = v.length; --c > -1; ) {
                for (d = v[c],
                m[d] = l = [],
                p = 0,
                u = t.length,
                h = 0; u > h; h++)
                    n = null == i ? t[h][d] : "string" == typeof (f = t[h][d]) && "=" === f.charAt(1) ? i[d] + Number(f.charAt(0) + f.substr(2)) : Number(f),
                    _ && h > 1 && u - 1 > h && (l[p++] = (n + l[p - 2]) / 2),
                    l[p++] = n;
                for (u = p - g + 1,
                p = 0,
                h = 0; u > h; h += g)
                    n = l[h],
                    r = l[h + 1],
                    s = l[h + 2],
                    a = 2 === g ? 0 : l[h + 3],
                    l[p++] = f = 3 === g ? new o(n,r,s,a) : new o(n,(2 * r + n) / 3,(2 * r + s) / 3,s);
                l.length = p
            }
            return m
        }
          , d = function(t, e, i) {
            for (var n, r, s, o, a, l, c, h, u, d, p, f = 1 / i, m = t.length; --m > -1; )
                for (d = t[m],
                s = d.a,
                o = d.d - s,
                a = d.c - s,
                l = d.b - s,
                n = r = 0,
                h = 1; i >= h; h++)
                    c = f * h,
                    u = 1 - c,
                    n = r - (r = (c * c * o + 3 * u * (c * a + u * l)) * c),
                    p = m * i + h - 1,
                    e[p] = (e[p] || 0) + n * n
        }
          , p = function(t, e) {
            e = e >> 0 || 6;
            var i, n, r, s, o = [], a = [], l = 0, c = 0, h = e - 1, u = [], p = [];
            for (i in t)
                d(t[i], o, e);
            for (r = o.length,
            n = 0; r > n; n++)
                l += Math.sqrt(o[n]),
                s = n % e,
                p[s] = l,
                s === h && (c += l,
                s = n / e >> 0,
                u[s] = p,
                a[s] = c,
                l = 0,
                p = []);
            return {
                length: c,
                lengths: a,
                segments: u
            }
        }
          , f = _gsScope._gsDefine.plugin({
            propName: "bezier",
            priority: -1,
            version: "1.3.8",
            API: 2,
            global: !0,
            init: function(t, e, i) {
                this._target = t,
                e instanceof Array && (e = {
                    values: e
                }),
                this._func = {},
                this._mod = {},
                this._props = [],
                this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                var n, r, s, o, a, l = e.values || [], c = {}, d = l[0], f = e.autoRotate || i.vars.orientToBezier;
                this._autoRotate = f ? f instanceof Array ? f : [["x", "y", "rotation", !0 === f ? 0 : Number(f) || 0]] : null;
                for (n in d)
                    this._props.push(n);
                for (s = this._props.length; --s > -1; )
                    n = this._props[s],
                    this._overwriteProps.push(n),
                    r = this._func[n] = "function" == typeof t[n],
                    c[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]),
                    a || c[n] !== l[0][n] && (a = c);
                if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? h(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : u(l, e.type, c),
                this._segCount = this._beziers[n].length,
                this._timeRes) {
                    var m = p(this._beziers, this._timeRes);
                    this._length = m.length,
                    this._lengths = m.lengths,
                    this._segments = m.segments,
                    this._l1 = this._li = this._s1 = this._si = 0,
                    this._l2 = this._lengths[0],
                    this._curSeg = this._segments[0],
                    this._s2 = this._curSeg[0],
                    this._prec = 1 / this._curSeg.length
                }
                if (f = this._autoRotate)
                    for (this._initialRotations = [],
                    f[0]instanceof Array || (this._autoRotate = f = [f]),
                    s = f.length; --s > -1; ) {
                        for (o = 0; 3 > o; o++)
                            n = f[s][o],
                            this._func[n] = "function" == typeof t[n] && t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)];
                        n = f[s][2],
                        this._initialRotations[s] = (this._func[n] ? this._func[n].call(this._target) : this._target[n]) || 0,
                        this._overwriteProps.push(n)
                    }
                return this._startRatio = i.vars.runBackwards ? 1 : 0,
                !0
            },
            set: function(e) {
                var i, n, r, s, o, a, l, c, h, u, d = this._segCount, p = this._func, f = this._target, m = e !== this._startRatio;
                if (this._timeRes) {
                    if (h = this._lengths,
                    u = this._curSeg,
                    e *= this._length,
                    r = this._li,
                    e > this._l2 && d - 1 > r) {
                        for (c = d - 1; c > r && (this._l2 = h[++r]) <= e; )
                            ;
                        this._l1 = h[r - 1],
                        this._li = r,
                        this._curSeg = u = this._segments[r],
                        this._s2 = u[this._s1 = this._si = 0]
                    } else if (e < this._l1 && r > 0) {
                        for (; r > 0 && (this._l1 = h[--r]) >= e; )
                            ;
                        0 === r && e < this._l1 ? this._l1 = 0 : r++,
                        this._l2 = h[r],
                        this._li = r,
                        this._curSeg = u = this._segments[r],
                        this._s1 = u[(this._si = u.length - 1) - 1] || 0,
                        this._s2 = u[this._si]
                    }
                    if (i = r,
                    e -= this._l1,
                    r = this._si,
                    e > this._s2 && r < u.length - 1) {
                        for (c = u.length - 1; c > r && (this._s2 = u[++r]) <= e; )
                            ;
                        this._s1 = u[r - 1],
                        this._si = r
                    } else if (e < this._s1 && r > 0) {
                        for (; r > 0 && (this._s1 = u[--r]) >= e; )
                            ;
                        0 === r && e < this._s1 ? this._s1 = 0 : r++,
                        this._s2 = u[r],
                        this._si = r
                    }
                    a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                } else
                    i = 0 > e ? 0 : e >= 1 ? d - 1 : d * e >> 0,
                    a = (e - i * (1 / d)) * d;
                for (n = 1 - a,
                r = this._props.length; --r > -1; )
                    s = this._props[r],
                    o = this._beziers[s][i],
                    l = (a * a * o.da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a,
                    this._mod[s] && (l = this._mod[s](l, f)),
                    p[s] ? f[s](l) : f[s] = l;
                if (this._autoRotate) {
                    var g, _, v, y, b, w, T, x = this._autoRotate;
                    for (r = x.length; --r > -1; )
                        s = x[r][2],
                        w = x[r][3] || 0,
                        T = !0 === x[r][4] ? 1 : t,
                        o = this._beziers[x[r][0]],
                        g = this._beziers[x[r][1]],
                        o && g && (o = o[i],
                        g = g[i],
                        _ = o.a + (o.b - o.a) * a,
                        y = o.b + (o.c - o.b) * a,
                        _ += (y - _) * a,
                        y += (o.c + (o.d - o.c) * a - y) * a,
                        v = g.a + (g.b - g.a) * a,
                        b = g.b + (g.c - g.b) * a,
                        v += (b - v) * a,
                        b += (g.c + (g.d - g.c) * a - b) * a,
                        l = m ? Math.atan2(b - v, y - _) * T + w : this._initialRotations[r],
                        this._mod[s] && (l = this._mod[s](l, f)),
                        p[s] ? f[s](l) : f[s] = l)
                }
            }
        })
          , m = f.prototype;
        f.bezierThrough = h,
        f.cubicToQuadratic = a,
        f._autoCSS = !0,
        f.quadraticToCubic = function(t, e, i) {
            return new o(t,(2 * e + t) / 3,(2 * e + i) / 3,i)
        }
        ,
        f._cssRegister = function() {
            var t = s.CSSPlugin;
            if (t) {
                var e = t._internals
                  , i = e._parseToProxy
                  , n = e._setPluginRatio
                  , r = e.CSSPropTween;
                e._registerComplexSpecialProp("bezier", {
                    parser: function(t, e, s, o, a, l) {
                        e instanceof Array && (e = {
                            values: e
                        }),
                        l = new f;
                        var c, h, u, d = e.values, p = d.length - 1, m = [], g = {};
                        if (0 > p)
                            return a;
                        for (c = 0; p >= c; c++)
                            u = i(t, d[c], o, a, l, p !== c),
                            m[c] = u.end;
                        for (h in e)
                            g[h] = e[h];
                        return g.values = m,
                        a = new r(t,"bezier",0,0,u.pt,2),
                        a.data = u,
                        a.plugin = l,
                        a.setRatio = n,
                        0 === g.autoRotate && (g.autoRotate = !0),
                        !g.autoRotate || g.autoRotate instanceof Array || (c = !0 === g.autoRotate ? 0 : Number(g.autoRotate),
                        g.autoRotate = null != u.end.left ? [["left", "top", "rotation", c, !1]] : null != u.end.x && [["x", "y", "rotation", c, !1]]),
                        g.autoRotate && (o._transform || o._enableTransforms(!1),
                        u.autoRotate = o._target._gsTransform,
                        u.proxy.rotation = u.autoRotate.rotation || 0,
                        o._overwriteProps.push("rotation")),
                        l._onInitTween(u.proxy, g, o._tween),
                        a
                    }
                })
            }
        }
        ,
        m._mod = function(t) {
            for (var e, i = this._overwriteProps, n = i.length; --n > -1; )
                (e = t[i[n]]) && "function" == typeof e && (this._mod[i[n]] = e)
        }
        ,
        m._kill = function(t) {
            var e, i, n = this._props;
            for (e in this._beziers)
                if (e in t)
                    for (delete this._beziers[e],
                    delete this._func[e],
                    i = n.length; --i > -1; )
                        n[i] === e && n.splice(i, 1);
            if (n = this._autoRotate)
                for (i = n.length; --i > -1; )
                    t[n[i][2]] && n.splice(i, 1);
            return this._super._kill.call(this, t)
        }
    }(),
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
        var i, n, r, s, o = function() {
            t.call(this, "css"),
            this._overwriteProps.length = 0,
            this.setRatio = o.prototype.setRatio
        }, a = _gsScope._gsDefine.globals, l = {}, c = o.prototype = new t("css");
        c.constructor = o,
        o.version = "1.20.5",
        o.API = 2,
        o.defaultTransformPerspective = 0,
        o.defaultSkewType = "compensated",
        o.defaultSmoothOrigin = !0,
        c = "px",
        o.suffixMap = {
            top: c,
            right: c,
            bottom: c,
            left: c,
            width: c,
            height: c,
            fontSize: c,
            padding: c,
            margin: c,
            perspective: c,
            lineHeight: ""
        };
        var h, u, d, p, f, m, g, _, v = /(?:\-|\.|\b)(\d|\.|e\-)+/g, y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, b = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, w = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, T = /(?:\d|\-|\+|=|#|\.)*/g, x = /opacity *= *([^)]*)/i, S = /opacity:([^;]*)/i, k = /alpha\(opacity *=.+?\)/i, C = /^(rgb|hsl)/, P = /([A-Z])/g, A = /-([a-z])/gi, O = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, E = function(t, e) {
            return e.toUpperCase()
        }, z = /(?:Left|Right|Width)/i, R = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, L = /,(?=[^\)]*(?:\(|$))/gi, $ = /[\s,\(]/i, D = Math.PI / 180, X = 180 / Math.PI, I = {}, F = {
            style: {}
        }, Y = _gsScope.document || {
            createElement: function() {
                return F
            }
        }, H = function(t, e) {
            return Y.createElementNS ? Y.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : Y.createElement(t)
        }, N = H("div"), W = H("img"), j = o._internals = {
            _specialProps: l
        }, B = (_gsScope.navigator || {}).userAgent || "", q = function() {
            var t = B.indexOf("Android")
              , e = H("a");
            return d = -1 !== B.indexOf("Safari") && -1 === B.indexOf("Chrome") && (-1 === t || parseFloat(B.substr(t + 8, 2)) > 3),
            f = d && parseFloat(B.substr(B.indexOf("Version/") + 8, 2)) < 6,
            p = -1 !== B.indexOf("Firefox"),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(B) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(B)) && (m = parseFloat(RegExp.$1)),
            !!e && (e.style.cssText = "top:1px;opacity:.55;",
            /^0.55/.test(e.style.opacity))
        }(), U = function(t) {
            return x.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        }, G = function(t) {
            _gsScope.console && console.log(t)
        }, V = "", Z = "", Q = function(t, e) {
            e = e || N;
            var i, n, r = e.style;
            if (void 0 !== r[t])
                return t;
            for (t = t.charAt(0).toUpperCase() + t.substr(1),
            i = ["O", "Moz", "ms", "Ms", "Webkit"],
            n = 5; --n > -1 && void 0 === r[i[n] + t]; )
                ;
            return n >= 0 ? (Z = 3 === n ? "ms" : i[n],
            V = "-" + Z.toLowerCase() + "-",
            Z + t) : null
        }, K = ("undefined" != typeof window ? window : Y.defaultView || {
            getComputedStyle: function() {}
        }).getComputedStyle, J = o.getStyle = function(t, e, i, n, r) {
            var s;
            return q || "opacity" !== e ? (!n && t.style[e] ? s = t.style[e] : (i = i || K(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(P, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]),
            null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : U(t)
        }
        , tt = j.convertToPixels = function(t, i, n, r, s) {
            if ("px" === r || !r && "lineHeight" !== i)
                return n;
            if ("auto" === r || !n)
                return 0;
            var a, l, c, h = z.test(i), u = t, d = N.style, p = 0 > n, f = 1 === n;
            if (p && (n = -n),
            f && (n *= 100),
            "lineHeight" !== i || r)
                if ("%" === r && -1 !== i.indexOf("border"))
                    a = n / 100 * (h ? t.clientWidth : t.clientHeight);
                else {
                    if (d.cssText = "border:0 solid red;position:" + J(t, "position") + ";line-height:0;",
                    "%" !== r && u.appendChild && "v" !== r.charAt(0) && "rem" !== r)
                        d[h ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                    else {
                        if (u = t.parentNode || Y.body,
                        -1 !== J(u, "display").indexOf("flex") && (d.position = "absolute"),
                        l = u._gsCache,
                        c = e.ticker.frame,
                        l && h && l.time === c)
                            return l.width * n / 100;
                        d[h ? "width" : "height"] = n + r
                    }
                    u.appendChild(N),
                    a = parseFloat(N[h ? "offsetWidth" : "offsetHeight"]),
                    u.removeChild(N),
                    h && "%" === r && !1 !== o.cacheWidths && (l = u._gsCache = u._gsCache || {},
                    l.time = c,
                    l.width = a / n * 100),
                    0 !== a || s || (a = tt(t, i, n, r, !0))
                }
            else
                l = K(t).lineHeight,
                t.style.lineHeight = n,
                a = parseFloat(K(t).lineHeight),
                t.style.lineHeight = l;
            return f && (a /= 100),
            p ? -a : a
        }
        , et = j.calculateOffset = function(t, e, i) {
            if ("absolute" !== J(t, "position", i))
                return 0;
            var n = "left" === e ? "Left" : "Top"
              , r = J(t, "margin" + n, i);
            return t["offset" + n] - (tt(t, e, parseFloat(r), r.replace(T, "")) || 0)
        }
        , it = function(t, e) {
            var i, n, r, s = {};
            if (e = e || K(t, null))
                if (i = e.length)
                    for (; --i > -1; )
                        r = e[i],
                        (-1 === r.indexOf("-transform") || Ot === r) && (s[r.replace(A, E)] = e.getPropertyValue(r));
                else
                    for (i in e)
                        (-1 === i.indexOf("Transform") || At === i) && (s[i] = e[i]);
            else if (e = t.currentStyle || t.style)
                for (i in e)
                    "string" == typeof i && void 0 === s[i] && (s[i.replace(A, E)] = e[i]);
            return q || (s.opacity = U(t)),
            n = Wt(t, e, !1),
            s.rotation = n.rotation,
            s.skewX = n.skewX,
            s.scaleX = n.scaleX,
            s.scaleY = n.scaleY,
            s.x = n.x,
            s.y = n.y,
            zt && (s.z = n.z,
            s.rotationX = n.rotationX,
            s.rotationY = n.rotationY,
            s.scaleZ = n.scaleZ),
            s.filters && delete s.filters,
            s
        }, nt = function(t, e, i, n, r) {
            var s, o, a, l = {}, c = t.style;
            for (o in i)
                "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (s = i[o]) || r && r[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[o] || "" === e[o].replace(w, "") ? s : 0 : et(t, o),
                void 0 !== c[o] && (a = new vt(c,o,c[o],a)));
            if (n)
                for (o in n)
                    "className" !== o && (l[o] = n[o]);
            return {
                difs: l,
                firstMPT: a
            }
        }, rt = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        }, st = ["marginLeft", "marginRight", "marginTop", "marginBottom"], ot = function(t, e, i) {
            if ("svg" === (t.nodeName + "").toLowerCase())
                return (i || K(t))[e] || 0;
            if (t.getCTM && Yt(t))
                return t.getBBox()[e] || 0;
            var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight)
              , r = rt[e]
              , s = r.length;
            for (i = i || K(t, null); --s > -1; )
                n -= parseFloat(J(t, "padding" + r[s], i, !0)) || 0,
                n -= parseFloat(J(t, "border" + r[s] + "Width", i, !0)) || 0;
            return n
        }, at = function(t, e) {
            if ("contain" === t || "auto" === t || "auto auto" === t)
                return t + " ";
            (null == t || "" === t) && (t = "0 0");
            var i, n = t.split(" "), r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : n[0], s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : n[1];
            if (n.length > 3 && !e) {
                for (n = t.split(", ").join(",").split(","),
                t = [],
                i = 0; i < n.length; i++)
                    t.push(at(n[i]));
                return t.join(",")
            }
            return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"),
            ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"),
            t = r + " " + s + (n.length > 2 ? " " + n[2] : ""),
            e && (e.oxp = -1 !== r.indexOf("%"),
            e.oyp = -1 !== s.indexOf("%"),
            e.oxr = "=" === r.charAt(1),
            e.oyr = "=" === s.charAt(1),
            e.ox = parseFloat(r.replace(w, "")),
            e.oy = parseFloat(s.replace(w, "")),
            e.v = t),
            e || t
        }, lt = function(t, e) {
            return "function" == typeof t && (t = t(_, g)),
            "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0
        }, ct = function(t, e) {
            return "function" == typeof t && (t = t(_, g)),
            null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0
        }, ht = function(t, e, i, n) {
            var r, s, o, a, l;
            return "function" == typeof t && (t = t(_, g)),
            null == t ? a = e : "number" == typeof t ? a = t : (r = 360,
            s = t.split("_"),
            l = "=" === t.charAt(1),
            o = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : X) - (l ? 0 : e),
            s.length && (n && (n[i] = e + o),
            -1 !== t.indexOf("short") && (o %= r) !== o % (r / 2) && (o = 0 > o ? o + r : o - r),
            -1 !== t.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : -1 !== t.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)),
            a = e + o),
            1e-6 > a && a > -1e-6 && (a = 0),
            a
        }, ut = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        }, dt = function(t, e, i) {
            return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t,
            255 * (1 > 6 * t ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
        }, pt = o.parseColor = function(t, e) {
            var i, n, r, s, o, a, l, c, h, u, d;
            if (t)
                if ("number" == typeof t)
                    i = [t >> 16, t >> 8 & 255, 255 & t];
                else {
                    if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)),
                    ut[t])
                        i = ut[t];
                    else if ("#" === t.charAt(0))
                        4 === t.length && (n = t.charAt(1),
                        r = t.charAt(2),
                        s = t.charAt(3),
                        t = "#" + n + n + r + r + s + s),
                        t = parseInt(t.substr(1), 16),
                        i = [t >> 16, t >> 8 & 255, 255 & t];
                    else if ("hsl" === t.substr(0, 3))
                        if (i = d = t.match(v),
                        e) {
                            if (-1 !== t.indexOf("="))
                                return t.match(y)
                        } else
                            o = Number(i[0]) % 360 / 360,
                            a = Number(i[1]) / 100,
                            l = Number(i[2]) / 100,
                            r = .5 >= l ? l * (a + 1) : l + a - l * a,
                            n = 2 * l - r,
                            i.length > 3 && (i[3] = Number(i[3])),
                            i[0] = dt(o + 1 / 3, n, r),
                            i[1] = dt(o, n, r),
                            i[2] = dt(o - 1 / 3, n, r);
                    else
                        i = t.match(v) || ut.transparent;
                    i[0] = Number(i[0]),
                    i[1] = Number(i[1]),
                    i[2] = Number(i[2]),
                    i.length > 3 && (i[3] = Number(i[3]))
                }
            else
                i = ut.black;
            return e && !d && (n = i[0] / 255,
            r = i[1] / 255,
            s = i[2] / 255,
            c = Math.max(n, r, s),
            h = Math.min(n, r, s),
            l = (c + h) / 2,
            c === h ? o = a = 0 : (u = c - h,
            a = l > .5 ? u / (2 - c - h) : u / (c + h),
            o = c === n ? (r - s) / u + (s > r ? 6 : 0) : c === r ? (s - n) / u + 2 : (n - r) / u + 4,
            o *= 60),
            i[0] = o + .5 | 0,
            i[1] = 100 * a + .5 | 0,
            i[2] = 100 * l + .5 | 0),
            i
        }
        , ft = function(t, e) {
            var i, n, r, s = t.match(mt) || [], o = 0, a = "";
            if (!s.length)
                return t;
            for (i = 0; i < s.length; i++)
                n = s[i],
                r = t.substr(o, t.indexOf(n, o) - o),
                o += r.length + n.length,
                n = pt(n, e),
                3 === n.length && n.push(1),
                a += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
            return a + t.substr(o)
        }, mt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (c in ut)
            mt += "|" + c + "\\b";
        mt = new RegExp(mt + ")","gi"),
        o.colorStringFilter = function(t) {
            var e, i = t[0] + " " + t[1];
            mt.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("),
            t[0] = ft(t[0], e),
            t[1] = ft(t[1], e)),
            mt.lastIndex = 0
        }
        ,
        e.defaultStringFilter || (e.defaultStringFilter = o.colorStringFilter);
        var gt = function(t, e, i, n) {
            if (null == t)
                return function(t) {
                    return t
                }
                ;
            var r, s = e ? (t.match(mt) || [""])[0] : "", o = t.split(s).join("").match(b) || [], a = t.substr(0, t.indexOf(o[0])), l = ")" === t.charAt(t.length - 1) ? ")" : "", c = -1 !== t.indexOf(" ") ? " " : ",", h = o.length, u = h > 0 ? o[0].replace(v, "") : "";
            return h ? r = e ? function(t) {
                var e, d, p, f;
                if ("number" == typeof t)
                    t += u;
                else if (n && L.test(t)) {
                    for (f = t.replace(L, "|").split("|"),
                    p = 0; p < f.length; p++)
                        f[p] = r(f[p]);
                    return f.join(",")
                }
                if (e = (t.match(mt) || [s])[0],
                d = t.split(e).join("").match(b) || [],
                p = d.length,
                h > p--)
                    for (; ++p < h; )
                        d[p] = i ? d[(p - 1) / 2 | 0] : o[p];
                return a + d.join(c) + c + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
            }
            : function(t) {
                var e, s, d;
                if ("number" == typeof t)
                    t += u;
                else if (n && L.test(t)) {
                    for (s = t.replace(L, "|").split("|"),
                    d = 0; d < s.length; d++)
                        s[d] = r(s[d]);
                    return s.join(",")
                }
                if (e = t.match(b) || [],
                d = e.length,
                h > d--)
                    for (; ++d < h; )
                        e[d] = i ? e[(d - 1) / 2 | 0] : o[d];
                return a + e.join(c) + l
            }
            : function(t) {
                return t
            }
        }
          , _t = function(t) {
            return t = t.split(","),
            function(e, i, n, r, s, o, a) {
                var l, c = (i + "").split(" ");
                for (a = {},
                l = 0; 4 > l; l++)
                    a[t[l]] = c[l] = c[l] || c[(l - 1) / 2 >> 0];
                return r.parse(e, a, s, o)
            }
        }
          , vt = (j._setPluginRatio = function(t) {
            this.plugin.setRatio(t);
            for (var e, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT; l; )
                e = a[l.v],
                l.r ? e = l.r(e) : 1e-6 > e && e > -1e-6 && (e = 0),
                l.t[l.p] = e,
                l = l._next;
            if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod.call(this._tween, a.rotation, this.t, this._tween) : a.rotation),
            1 === t || 0 === t)
                for (l = o.firstMPT,
                s = 1 === t ? "e" : "b"; l; ) {
                    if (i = l.t,
                    i.type) {
                        if (1 === i.type) {
                            for (r = i.xs0 + i.s + i.xs1,
                            n = 1; n < i.l; n++)
                                r += i["xn" + n] + i["xs" + (n + 1)];
                            i[s] = r
                        }
                    } else
                        i[s] = i.s + i.xs0;
                    l = l._next
                }
        }
        ,
        function(t, e, i, n, r) {
            this.t = t,
            this.p = e,
            this.v = i,
            this.r = r,
            n && (n._prev = this,
            this._next = n)
        }
        )
          , yt = (j._parseToProxy = function(t, e, i, n, r, s) {
            var o, a, l, c, h, u = n, d = {}, p = {}, f = i._transform, m = I;
            for (i._transform = null,
            I = e,
            n = h = i.parse(t, e, n, r),
            I = m,
            s && (i._transform = f,
            u && (u._prev = null,
            u._prev && (u._prev._next = null))); n && n !== u; ) {
                if (n.type <= 1 && (a = n.p,
                p[a] = n.s + n.c,
                d[a] = n.s,
                s || (c = new vt(n,"s",a,c,n.r),
                n.c = 0),
                1 === n.type))
                    for (o = n.l; --o > 0; )
                        l = "xn" + o,
                        a = n.p + "_" + l,
                        p[a] = n.data[l],
                        d[a] = n[l],
                        s || (c = new vt(n,l,a,c,n.rxp[l]));
                n = n._next
            }
            return {
                proxy: d,
                end: p,
                firstMPT: c,
                pt: h
            }
        }
        ,
        j.CSSPropTween = function(t, e, n, r, o, a, l, c, h, u, d) {
            this.t = t,
            this.p = e,
            this.s = n,
            this.c = r,
            this.n = l || e,
            t instanceof yt || s.push(this.n),
            this.r = c ? "function" == typeof c ? c : Math.round : c,
            this.type = a || 0,
            h && (this.pr = h,
            i = !0),
            this.b = void 0 === u ? n : u,
            this.e = void 0 === d ? n + r : d,
            o && (this._next = o,
            o._prev = this)
        }
        )
          , bt = function(t, e, i, n, r, s) {
            var o = new yt(t,e,i,n - i,r,-1,s);
            return o.b = i,
            o.e = o.xs0 = n,
            o
        }
          , wt = o.parseComplex = function(t, e, i, n, r, s, a, l, c, u) {
            i = i || s || "",
            "function" == typeof n && (n = n(_, g)),
            a = new yt(t,e,0,0,a,u ? 2 : 1,null,!1,l,i,n),
            n += "",
            r && mt.test(n + i) && (n = [i, n],
            o.colorStringFilter(n),
            i = n[0],
            n = n[1]);
            var d, p, f, m, b, w, T, x, S, k, C, P, A, O = i.split(", ").join(",").split(" "), E = n.split(", ").join(",").split(" "), z = O.length, R = !1 !== h;
            for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (-1 !== (n + i).indexOf("rgb") || -1 !== (n + i).indexOf("hsl") ? (O = O.join(" ").replace(L, ", ").split(" "),
            E = E.join(" ").replace(L, ", ").split(" ")) : (O = O.join(" ").split(",").join(", ").split(" "),
            E = E.join(" ").split(",").join(", ").split(" ")),
            z = O.length),
            z !== E.length && (O = (s || "").split(" "),
            z = O.length),
            a.plugin = c,
            a.setRatio = u,
            mt.lastIndex = 0,
            d = 0; z > d; d++)
                if (m = O[d],
                b = E[d] + "",
                (x = parseFloat(m)) || 0 === x)
                    a.appendXtra("", x, lt(b, x), b.replace(y, ""), !(!R || -1 === b.indexOf("px")) && Math.round, !0);
                else if (r && mt.test(m))
                    P = b.indexOf(")") + 1,
                    P = ")" + (P ? b.substr(P) : ""),
                    A = -1 !== b.indexOf("hsl") && q,
                    k = b,
                    m = pt(m, A),
                    b = pt(b, A),
                    S = m.length + b.length > 6,
                    S && !q && 0 === b[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent",
                    a.e = a.e.split(E[d]).join("transparent")) : (q || (S = !1),
                    A ? a.appendXtra(k.substr(0, k.indexOf("hsl")) + (S ? "hsla(" : "hsl("), m[0], lt(b[0], m[0]), ",", !1, !0).appendXtra("", m[1], lt(b[1], m[1]), "%,", !1).appendXtra("", m[2], lt(b[2], m[2]), S ? "%," : "%" + P, !1) : a.appendXtra(k.substr(0, k.indexOf("rgb")) + (S ? "rgba(" : "rgb("), m[0], b[0] - m[0], ",", Math.round, !0).appendXtra("", m[1], b[1] - m[1], ",", Math.round).appendXtra("", m[2], b[2] - m[2], S ? "," : P, Math.round),
                    S && (m = m.length < 4 ? 1 : m[3],
                    a.appendXtra("", m, (b.length < 4 ? 1 : b[3]) - m, P, !1))),
                    mt.lastIndex = 0;
                else if (w = m.match(v)) {
                    if (!(T = b.match(y)) || T.length !== w.length)
                        return a;
                    for (f = 0,
                    p = 0; p < w.length; p++)
                        C = w[p],
                        k = m.indexOf(C, f),
                        a.appendXtra(m.substr(f, k - f), Number(C), lt(T[p], C), "", !(!R || "px" !== m.substr(k + C.length, 2)) && Math.round, 0 === p),
                        f = k + C.length;
                    a["xs" + a.l] += m.substr(f)
                } else
                    a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + b : b;
            if (-1 !== n.indexOf("=") && a.data) {
                for (P = a.xs0 + a.data.s,
                d = 1; d < a.l; d++)
                    P += a["xs" + d] + a.data["xn" + d];
                a.e = P + a["xs" + d]
            }
            return a.l || (a.type = -1,
            a.xs0 = a.e),
            a.xfirst || a
        }
          , Tt = 9;
        for (c = yt.prototype,
        c.l = c.pr = 0; --Tt > 0; )
            c["xn" + Tt] = 0,
            c["xs" + Tt] = "";
        c.xs0 = "",
        c._next = c._prev = c.xfirst = c.data = c.plugin = c.setRatio = c.rxp = null,
        c.appendXtra = function(t, e, i, n, r, s) {
            var o = this
              , a = o.l;
            return o["xs" + a] += s && (a || o["xs" + a]) ? " " + t : t || "",
            i || 0 === a || o.plugin ? (o.l++,
            o.type = o.setRatio ? 2 : 1,
            o["xs" + o.l] = n || "",
            a > 0 ? (o.data["xn" + a] = e + i,
            o.rxp["xn" + a] = r,
            o["xn" + a] = e,
            o.plugin || (o.xfirst = new yt(o,"xn" + a,e,i,o.xfirst || o,0,o.n,r,o.pr),
            o.xfirst.xs0 = 0),
            o) : (o.data = {
                s: e + i
            },
            o.rxp = {},
            o.s = e,
            o.c = i,
            o.r = r,
            o)) : (o["xs" + a] += e + (n || ""),
            o)
        }
        ;
        var xt = function(t, e) {
            e = e || {},
            this.p = e.prefix ? Q(t) || t : t,
            l[t] = l[this.p] = this,
            this.format = e.formatter || gt(e.defaultValue, e.color, e.collapsible, e.multi),
            e.parser && (this.parse = e.parser),
            this.clrs = e.color,
            this.multi = e.multi,
            this.keyword = e.keyword,
            this.dflt = e.defaultValue,
            this.pr = e.priority || 0
        }
          , St = j._registerComplexSpecialProp = function(t, e, i) {
            "object" != typeof e && (e = {
                parser: i
            });
            var n, r = t.split(","), s = e.defaultValue;
            for (i = i || [s],
            n = 0; n < r.length; n++)
                e.prefix = 0 === n && e.prefix,
                e.defaultValue = i[n] || s,
                new xt(r[n],e)
        }
          , kt = j._registerPluginProp = function(t) {
            if (!l[t]) {
                var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                St(t, {
                    parser: function(t, i, n, r, s, o, c) {
                        var h = a.com.greensock.plugins[e];
                        return h ? (h._cssRegister(),
                        l[n].parse(t, i, n, r, s, o, c)) : (G("Error: " + e + " js file not loaded."),
                        s)
                    }
                })
            }
        }
        ;
        c = xt.prototype,
        c.parseComplex = function(t, e, i, n, r, s) {
            var o, a, l, c, h, u, d = this.keyword;
            if (this.multi && (L.test(i) || L.test(e) ? (a = e.replace(L, "|").split("|"),
            l = i.replace(L, "|").split("|")) : d && (a = [e],
            l = [i])),
            l) {
                for (c = l.length > a.length ? l.length : a.length,
                o = 0; c > o; o++)
                    e = a[o] = a[o] || this.dflt,
                    i = l[o] = l[o] || this.dflt,
                    d && (h = e.indexOf(d),
                    u = i.indexOf(d),
                    h !== u && (-1 === u ? a[o] = a[o].split(d).join("") : -1 === h && (a[o] += " " + d)));
                e = a.join(", "),
                i = l.join(", ")
            }
            return wt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, s)
        }
        ,
        c.parse = function(t, e, i, n, s, o, a) {
            return this.parseComplex(t.style, this.format(J(t, this.p, r, !1, this.dflt)), this.format(e), s, o)
        }
        ,
        o.registerSpecialProp = function(t, e, i) {
            St(t, {
                parser: function(t, n, r, s, o, a, l) {
                    var c = new yt(t,r,0,0,o,2,r,!1,i);
                    return c.plugin = a,
                    c.setRatio = e(t, n, s._tween, r),
                    c
                },
                priority: i
            })
        }
        ,
        o.useSVGTransformAttr = !0;
        var Ct, Pt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), At = Q("transform"), Ot = V + "transform", Et = Q("transformOrigin"), zt = null !== Q("perspective"), Rt = j.Transform = function() {
            this.perspective = parseFloat(o.defaultTransformPerspective) || 0,
            this.force3D = !(!1 === o.defaultForce3D || !zt) && (o.defaultForce3D || "auto")
        }
        , Mt = _gsScope.SVGElement, Lt = function(t, e, i) {
            var n, r = Y.createElementNS("http://www.w3.org/2000/svg", t), s = /([a-z])([A-Z])/g;
            for (n in i)
                r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
            return e.appendChild(r),
            r
        }, $t = Y.documentElement || {}, Dt = function() {
            var t, e, i, n = m || /Android/i.test(B) && !_gsScope.chrome;
            return Y.createElementNS && !n && (t = Lt("svg", $t),
            e = Lt("rect", t, {
                width: 100,
                height: 50,
                x: 100
            }),
            i = e.getBoundingClientRect().width,
            e.style[Et] = "50% 50%",
            e.style[At] = "scaleX(0.5)",
            n = i === e.getBoundingClientRect().width && !(p && zt),
            $t.removeChild(t)),
            n
        }(), Xt = function(t, e, i, n, r, s) {
            var a, l, c, h, u, d, p, f, m, g, _, v, y, b, w = t._gsTransform, T = Nt(t, !0);
            w && (y = w.xOrigin,
            b = w.yOrigin),
            (!n || (a = n.split(" ")).length < 2) && (p = t.getBBox(),
            0 === p.x && 0 === p.y && p.width + p.height === 0 && (p = {
                x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
                y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
                width: 0,
                height: 0
            }),
            e = at(e).split(" "),
            a = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * p.width : parseFloat(e[0])) + p.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * p.height : parseFloat(e[1])) + p.y]),
            i.xOrigin = h = parseFloat(a[0]),
            i.yOrigin = u = parseFloat(a[1]),
            n && T !== Ht && (d = T[0],
            p = T[1],
            f = T[2],
            m = T[3],
            g = T[4],
            _ = T[5],
            (v = d * m - p * f) && (l = h * (m / v) + u * (-f / v) + (f * _ - m * g) / v,
            c = h * (-p / v) + u * (d / v) - (d * _ - p * g) / v,
            h = i.xOrigin = a[0] = l,
            u = i.yOrigin = a[1] = c)),
            w && (s && (i.xOffset = w.xOffset,
            i.yOffset = w.yOffset,
            w = i),
            r || !1 !== r && !1 !== o.defaultSmoothOrigin ? (l = h - y,
            c = u - b,
            w.xOffset += l * T[0] + c * T[2] - l,
            w.yOffset += l * T[1] + c * T[3] - c) : w.xOffset = w.yOffset = 0),
            s || t.setAttribute("data-svg-origin", a.join(" "))
        }, It = function(t) {
            var e, i = H("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = this.parentNode, r = this.nextSibling, s = this.style.cssText;
            if ($t.appendChild(i),
            i.appendChild(this),
            this.style.display = "block",
            t)
                try {
                    e = this.getBBox(),
                    this._originalGetBBox = this.getBBox,
                    this.getBBox = It
                } catch (t) {}
            else
                this._originalGetBBox && (e = this._originalGetBBox());
            return r ? n.insertBefore(this, r) : n.appendChild(this),
            $t.removeChild(i),
            this.style.cssText = s,
            e
        }, Ft = function(t) {
            try {
                return t.getBBox()
            } catch (e) {
                return It.call(t, !0)
            }
        }, Yt = function(t) {
            return !(!Mt || !t.getCTM || t.parentNode && !t.ownerSVGElement || !Ft(t))
        }, Ht = [1, 0, 0, 1, 0, 0], Nt = function(t, e) {
            var i, n, r, s, o, a, l = t._gsTransform || new Rt, c = t.style;
            if (At ? n = J(t, Ot, null, !0) : t.currentStyle && (n = t.currentStyle.filter.match(R),
            n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""),
            i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n,
            !At || !(a = !K(t) || "none" === K(t).display) && t.parentNode || (a && (s = c.display,
            c.display = "block"),
            t.parentNode || (o = 1,
            $t.appendChild(t)),
            n = J(t, Ot, null, !0),
            i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n,
            s ? c.display = s : a && Ut(c, "display"),
            o && $t.removeChild(t)),
            (l.svg || t.getCTM && Yt(t)) && (i && -1 !== (c[At] + "").indexOf("matrix") && (n = c[At],
            i = 0),
            r = t.getAttribute("transform"),
            i && r && (r = t.transform.baseVal.consolidate().matrix,
            n = "matrix(" + r.a + "," + r.b + "," + r.c + "," + r.d + "," + r.e + "," + r.f + ")",
            i = 0)),
            i)
                return Ht;
            for (r = (n || "").match(v) || [],
            Tt = r.length; --Tt > -1; )
                s = Number(r[Tt]),
                r[Tt] = (o = s - (s |= 0)) ? (1e5 * o + (0 > o ? -.5 : .5) | 0) / 1e5 + s : s;
            return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
        }, Wt = j.getTransform = function(t, i, n, r) {
            if (t._gsTransform && n && !r)
                return t._gsTransform;
            var s, a, l, c, h, u, d = n ? t._gsTransform || new Rt : new Rt, p = d.scaleX < 0, f = 2e-5, m = 1e5, g = zt ? parseFloat(J(t, Et, i, !1, "0 0 0").split(" ")[2]) || d.zOrigin || 0 : 0, _ = parseFloat(o.defaultTransformPerspective) || 0;
            if (d.svg = !(!t.getCTM || !Yt(t)),
            d.svg && (Xt(t, J(t, Et, i, !1, "50% 50%") + "", d, t.getAttribute("data-svg-origin")),
            Ct = o.useSVGTransformAttr || Dt),
            (s = Nt(t)) !== Ht) {
                if (16 === s.length) {
                    var v, y, b, w, T, x = s[0], S = s[1], k = s[2], C = s[3], P = s[4], A = s[5], O = s[6], E = s[7], z = s[8], R = s[9], M = s[10], L = s[12], $ = s[13], D = s[14], I = s[11], F = Math.atan2(O, M);
                    d.zOrigin && (D = -d.zOrigin,
                    L = z * D - s[12],
                    $ = R * D - s[13],
                    D = M * D + d.zOrigin - s[14]),
                    d.rotationX = F * X,
                    F && (w = Math.cos(-F),
                    T = Math.sin(-F),
                    v = P * w + z * T,
                    y = A * w + R * T,
                    b = O * w + M * T,
                    z = P * -T + z * w,
                    R = A * -T + R * w,
                    M = O * -T + M * w,
                    I = E * -T + I * w,
                    P = v,
                    A = y,
                    O = b),
                    F = Math.atan2(-k, M),
                    d.rotationY = F * X,
                    F && (w = Math.cos(-F),
                    T = Math.sin(-F),
                    v = x * w - z * T,
                    y = S * w - R * T,
                    b = k * w - M * T,
                    R = S * T + R * w,
                    M = k * T + M * w,
                    I = C * T + I * w,
                    x = v,
                    S = y,
                    k = b),
                    F = Math.atan2(S, x),
                    d.rotation = F * X,
                    F && (w = Math.cos(F),
                    T = Math.sin(F),
                    v = x * w + S * T,
                    y = P * w + A * T,
                    b = z * w + R * T,
                    S = S * w - x * T,
                    A = A * w - P * T,
                    R = R * w - z * T,
                    x = v,
                    P = y,
                    z = b),
                    d.rotationX && Math.abs(d.rotationX) + Math.abs(d.rotation) > 359.9 && (d.rotationX = d.rotation = 0,
                    d.rotationY = 180 - d.rotationY),
                    F = Math.atan2(P, A),
                    d.scaleX = (Math.sqrt(x * x + S * S + k * k) * m + .5 | 0) / m,
                    d.scaleY = (Math.sqrt(A * A + O * O) * m + .5 | 0) / m,
                    d.scaleZ = (Math.sqrt(z * z + R * R + M * M) * m + .5 | 0) / m,
                    x /= d.scaleX,
                    P /= d.scaleY,
                    S /= d.scaleX,
                    A /= d.scaleY,
                    Math.abs(F) > f ? (d.skewX = F * X,
                    P = 0,
                    "simple" !== d.skewType && (d.scaleY *= 1 / Math.cos(F))) : d.skewX = 0,
                    d.perspective = I ? 1 / (0 > I ? -I : I) : 0,
                    d.x = L,
                    d.y = $,
                    d.z = D,
                    d.svg && (d.x -= d.xOrigin - (d.xOrigin * x - d.yOrigin * P),
                    d.y -= d.yOrigin - (d.yOrigin * S - d.xOrigin * A))
                } else if (!zt || r || !s.length || d.x !== s[4] || d.y !== s[5] || !d.rotationX && !d.rotationY) {
                    var Y = s.length >= 6
                      , H = Y ? s[0] : 1
                      , N = s[1] || 0
                      , W = s[2] || 0
                      , j = Y ? s[3] : 1;
                    d.x = s[4] || 0,
                    d.y = s[5] || 0,
                    l = Math.sqrt(H * H + N * N),
                    c = Math.sqrt(j * j + W * W),
                    h = H || N ? Math.atan2(N, H) * X : d.rotation || 0,
                    u = W || j ? Math.atan2(W, j) * X + h : d.skewX || 0,
                    d.scaleX = l,
                    d.scaleY = c,
                    d.rotation = h,
                    d.skewX = u,
                    zt && (d.rotationX = d.rotationY = d.z = 0,
                    d.perspective = _,
                    d.scaleZ = 1),
                    d.svg && (d.x -= d.xOrigin - (d.xOrigin * H + d.yOrigin * W),
                    d.y -= d.yOrigin - (d.xOrigin * N + d.yOrigin * j))
                }
                Math.abs(d.skewX) > 90 && Math.abs(d.skewX) < 270 && (p ? (d.scaleX *= -1,
                d.skewX += d.rotation <= 0 ? 180 : -180,
                d.rotation += d.rotation <= 0 ? 180 : -180) : (d.scaleY *= -1,
                d.skewX += d.skewX <= 0 ? 180 : -180)),
                d.zOrigin = g;
                for (a in d)
                    d[a] < f && d[a] > -f && (d[a] = 0)
            }
            return n && (t._gsTransform = d,
            d.svg && (Ct && t.style[At] ? e.delayedCall(.001, function() {
                Ut(t.style, At)
            }) : !Ct && t.getAttribute("transform") && e.delayedCall(.001, function() {
                t.removeAttribute("transform")
            }))),
            d
        }
        , jt = function(t) {
            var e, i, n = this.data, r = -n.rotation * D, s = r + n.skewX * D, o = 1e5, a = (Math.cos(r) * n.scaleX * o | 0) / o, l = (Math.sin(r) * n.scaleX * o | 0) / o, c = (Math.sin(s) * -n.scaleY * o | 0) / o, h = (Math.cos(s) * n.scaleY * o | 0) / o, u = this.t.style, d = this.t.currentStyle;
            if (d) {
                i = l,
                l = -c,
                c = -i,
                e = d.filter,
                u.filter = "";
                var p, f, g = this.t.offsetWidth, _ = this.t.offsetHeight, v = "absolute" !== d.position, y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + c + ", M22=" + h, b = n.x + g * n.xPercent / 100, w = n.y + _ * n.yPercent / 100;
                if (null != n.ox && (p = (n.oxp ? g * n.ox * .01 : n.ox) - g / 2,
                f = (n.oyp ? _ * n.oy * .01 : n.oy) - _ / 2,
                b += p - (p * a + f * l),
                w += f - (p * c + f * h)),
                v ? (p = g / 2,
                f = _ / 2,
                y += ", Dx=" + (p - (p * a + f * l) + b) + ", Dy=" + (f - (p * c + f * h) + w) + ")") : y += ", sizingMethod='auto expand')",
                -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? u.filter = e.replace(M, y) : u.filter = y + " " + e,
                (0 === t || 1 === t) && 1 === a && 0 === l && 0 === c && 1 === h && (v && -1 === y.indexOf("Dx=0, Dy=0") || x.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && u.removeAttribute("filter")),
                !v) {
                    var S, k, C, P = 8 > m ? 1 : -1;
                    for (p = n.ieOffsetX || 0,
                    f = n.ieOffsetY || 0,
                    n.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > l ? -l : l) * _)) / 2 + b),
                    n.ieOffsetY = Math.round((_ - ((0 > h ? -h : h) * _ + (0 > c ? -c : c) * g)) / 2 + w),
                    Tt = 0; 4 > Tt; Tt++)
                        k = st[Tt],
                        S = d[k],
                        i = -1 !== S.indexOf("px") ? parseFloat(S) : tt(this.t, k, parseFloat(S), S.replace(T, "")) || 0,
                        C = i !== n[k] ? 2 > Tt ? -n.ieOffsetX : -n.ieOffsetY : 2 > Tt ? p - n.ieOffsetX : f - n.ieOffsetY,
                        u[k] = (n[k] = Math.round(i - C * (0 === Tt || 2 === Tt ? 1 : P))) + "px"
                }
            }
        }, Bt = j.set3DTransformRatio = j.setTransformRatio = function(t) {
            var e, i, n, r, s, o, a, l, c, h, u, d, f, m, g, _, v, y, b, w, T, x, S, k = this.data, C = this.t.style, P = k.rotation, A = k.rotationX, O = k.rotationY, E = k.scaleX, z = k.scaleY, R = k.scaleZ, M = k.x, L = k.y, $ = k.z, X = k.svg, I = k.perspective, F = k.force3D, Y = k.skewY, H = k.skewX;
            if (Y && (H += Y,
            P += Y),
            ((1 === t || 0 === t) && "auto" === F && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !F) && !$ && !I && !O && !A && 1 === R || Ct && X || !zt)
                return void (P || H || X ? (P *= D,
                x = H * D,
                S = 1e5,
                i = Math.cos(P) * E,
                s = Math.sin(P) * E,
                n = Math.sin(P - x) * -z,
                o = Math.cos(P - x) * z,
                x && "simple" === k.skewType && (e = Math.tan(x - Y * D),
                e = Math.sqrt(1 + e * e),
                n *= e,
                o *= e,
                Y && (e = Math.tan(Y * D),
                e = Math.sqrt(1 + e * e),
                i *= e,
                s *= e)),
                X && (M += k.xOrigin - (k.xOrigin * i + k.yOrigin * n) + k.xOffset,
                L += k.yOrigin - (k.xOrigin * s + k.yOrigin * o) + k.yOffset,
                Ct && (k.xPercent || k.yPercent) && (g = this.t.getBBox(),
                M += .01 * k.xPercent * g.width,
                L += .01 * k.yPercent * g.height),
                g = 1e-6,
                g > M && M > -g && (M = 0),
                g > L && L > -g && (L = 0)),
                b = (i * S | 0) / S + "," + (s * S | 0) / S + "," + (n * S | 0) / S + "," + (o * S | 0) / S + "," + M + "," + L + ")",
                X && Ct ? this.t.setAttribute("transform", "matrix(" + b) : C[At] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + b) : C[At] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + z + "," + M + "," + L + ")");
            if (p && (g = 1e-4,
            g > E && E > -g && (E = R = 2e-5),
            g > z && z > -g && (z = R = 2e-5),
            !I || k.z || k.rotationX || k.rotationY || (I = 0)),
            P || H)
                P *= D,
                _ = i = Math.cos(P),
                v = s = Math.sin(P),
                H && (P -= H * D,
                _ = Math.cos(P),
                v = Math.sin(P),
                "simple" === k.skewType && (e = Math.tan((H - Y) * D),
                e = Math.sqrt(1 + e * e),
                _ *= e,
                v *= e,
                k.skewY && (e = Math.tan(Y * D),
                e = Math.sqrt(1 + e * e),
                i *= e,
                s *= e))),
                n = -v,
                o = _;
            else {
                if (!(O || A || 1 !== R || I || X))
                    return void (C[At] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) translate3d(" : "translate3d(") + M + "px," + L + "px," + $ + "px)" + (1 !== E || 1 !== z ? " scale(" + E + "," + z + ")" : ""));
                i = o = 1,
                n = s = 0
            }
            h = 1,
            r = a = l = c = u = d = 0,
            f = I ? -1 / I : 0,
            m = k.zOrigin,
            g = 1e-6,
            w = ",",
            T = "0",
            P = O * D,
            P && (_ = Math.cos(P),
            v = Math.sin(P),
            l = -v,
            u = f * -v,
            r = i * v,
            a = s * v,
            h = _,
            f *= _,
            i *= _,
            s *= _),
            P = A * D,
            P && (_ = Math.cos(P),
            v = Math.sin(P),
            e = n * _ + r * v,
            y = o * _ + a * v,
            c = h * v,
            d = f * v,
            r = n * -v + r * _,
            a = o * -v + a * _,
            h *= _,
            f *= _,
            n = e,
            o = y),
            1 !== R && (r *= R,
            a *= R,
            h *= R,
            f *= R),
            1 !== z && (n *= z,
            o *= z,
            c *= z,
            d *= z),
            1 !== E && (i *= E,
            s *= E,
            l *= E,
            u *= E),
            (m || X) && (m && (M += r * -m,
            L += a * -m,
            $ += h * -m + m),
            X && (M += k.xOrigin - (k.xOrigin * i + k.yOrigin * n) + k.xOffset,
            L += k.yOrigin - (k.xOrigin * s + k.yOrigin * o) + k.yOffset),
            g > M && M > -g && (M = T),
            g > L && L > -g && (L = T),
            g > $ && $ > -g && ($ = 0)),
            b = k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix3d(" : "matrix3d(",
            b += (g > i && i > -g ? T : i) + w + (g > s && s > -g ? T : s) + w + (g > l && l > -g ? T : l),
            b += w + (g > u && u > -g ? T : u) + w + (g > n && n > -g ? T : n) + w + (g > o && o > -g ? T : o),
            A || O || 1 !== R ? (b += w + (g > c && c > -g ? T : c) + w + (g > d && d > -g ? T : d) + w + (g > r && r > -g ? T : r),
            b += w + (g > a && a > -g ? T : a) + w + (g > h && h > -g ? T : h) + w + (g > f && f > -g ? T : f) + w) : b += ",0,0,0,0,1,0,",
            b += M + w + L + w + $ + w + (I ? 1 + -$ / I : 1) + ")",
            C[At] = b
        }
        ;
        c = Rt.prototype,
        c.x = c.y = c.z = c.skewX = c.skewY = c.rotation = c.rotationX = c.rotationY = c.zOrigin = c.xPercent = c.yPercent = c.xOffset = c.yOffset = 0,
        c.scaleX = c.scaleY = c.scaleZ = 1,
        St("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function(t, e, i, n, s, a, l) {
                if (n._lastParsedTransform === l)
                    return s;
                n._lastParsedTransform = l;
                var c, h = l.scale && "function" == typeof l.scale ? l.scale : 0;
                "function" == typeof l[i] && (c = l[i],
                l[i] = e),
                h && (l.scale = h(_, t));
                var u, d, p, f, m, v, y, b, w, T = t._gsTransform, x = t.style, S = Pt.length, k = l, C = {}, P = "transformOrigin", A = Wt(t, r, !0, k.parseTransform), O = k.transform && ("function" == typeof k.transform ? k.transform(_, g) : k.transform);
                if (A.skewType = k.skewType || A.skewType || o.defaultSkewType,
                n._transform = A,
                O && "string" == typeof O && At)
                    d = N.style,
                    d[At] = O,
                    d.display = "block",
                    d.position = "absolute",
                    -1 !== O.indexOf("%") && (d.width = J(t, "width"),
                    d.height = J(t, "height")),
                    Y.body.appendChild(N),
                    u = Wt(N, null, !1),
                    "simple" === A.skewType && (u.scaleY *= Math.cos(u.skewX * D)),
                    A.svg && (v = A.xOrigin,
                    y = A.yOrigin,
                    u.x -= A.xOffset,
                    u.y -= A.yOffset,
                    (k.transformOrigin || k.svgOrigin) && (O = {},
                    Xt(t, at(k.transformOrigin), O, k.svgOrigin, k.smoothOrigin, !0),
                    v = O.xOrigin,
                    y = O.yOrigin,
                    u.x -= O.xOffset - A.xOffset,
                    u.y -= O.yOffset - A.yOffset),
                    (v || y) && (b = Nt(N, !0),
                    u.x -= v - (v * b[0] + y * b[2]),
                    u.y -= y - (v * b[1] + y * b[3]))),
                    Y.body.removeChild(N),
                    u.perspective || (u.perspective = A.perspective),
                    null != k.xPercent && (u.xPercent = ct(k.xPercent, A.xPercent)),
                    null != k.yPercent && (u.yPercent = ct(k.yPercent, A.yPercent));
                else if ("object" == typeof k) {
                    if (u = {
                        scaleX: ct(null != k.scaleX ? k.scaleX : k.scale, A.scaleX),
                        scaleY: ct(null != k.scaleY ? k.scaleY : k.scale, A.scaleY),
                        scaleZ: ct(k.scaleZ, A.scaleZ),
                        x: ct(k.x, A.x),
                        y: ct(k.y, A.y),
                        z: ct(k.z, A.z),
                        xPercent: ct(k.xPercent, A.xPercent),
                        yPercent: ct(k.yPercent, A.yPercent),
                        perspective: ct(k.transformPerspective, A.perspective)
                    },
                    null != (m = k.directionalRotation))
                        if ("object" == typeof m)
                            for (d in m)
                                k[d] = m[d];
                        else
                            k.rotation = m;
                    "string" == typeof k.x && -1 !== k.x.indexOf("%") && (u.x = 0,
                    u.xPercent = ct(k.x, A.xPercent)),
                    "string" == typeof k.y && -1 !== k.y.indexOf("%") && (u.y = 0,
                    u.yPercent = ct(k.y, A.yPercent)),
                    u.rotation = ht("rotation"in k ? k.rotation : "shortRotation"in k ? k.shortRotation + "_short" : "rotationZ"in k ? k.rotationZ : A.rotation, A.rotation, "rotation", C),
                    zt && (u.rotationX = ht("rotationX"in k ? k.rotationX : "shortRotationX"in k ? k.shortRotationX + "_short" : A.rotationX || 0, A.rotationX, "rotationX", C),
                    u.rotationY = ht("rotationY"in k ? k.rotationY : "shortRotationY"in k ? k.shortRotationY + "_short" : A.rotationY || 0, A.rotationY, "rotationY", C)),
                    u.skewX = ht(k.skewX, A.skewX),
                    u.skewY = ht(k.skewY, A.skewY)
                }
                for (zt && null != k.force3D && (A.force3D = k.force3D,
                f = !0),
                (p = A.force3D || A.z || A.rotationX || A.rotationY || u.z || u.rotationX || u.rotationY || u.perspective) || null == k.scale || (u.scaleZ = 1); --S > -1; )
                    w = Pt[S],
                    ((O = u[w] - A[w]) > 1e-6 || -1e-6 > O || null != k[w] || null != I[w]) && (f = !0,
                    s = new yt(A,w,A[w],O,s),
                    w in C && (s.e = C[w]),
                    s.xs0 = 0,
                    s.plugin = a,
                    n._overwriteProps.push(s.n));
                return O = k.transformOrigin,
                A.svg && (O || k.svgOrigin) && (v = A.xOffset,
                y = A.yOffset,
                Xt(t, at(O), u, k.svgOrigin, k.smoothOrigin),
                s = bt(A, "xOrigin", (T ? A : u).xOrigin, u.xOrigin, s, P),
                s = bt(A, "yOrigin", (T ? A : u).yOrigin, u.yOrigin, s, P),
                (v !== A.xOffset || y !== A.yOffset) && (s = bt(A, "xOffset", T ? v : A.xOffset, A.xOffset, s, P),
                s = bt(A, "yOffset", T ? y : A.yOffset, A.yOffset, s, P)),
                O = "0px 0px"),
                (O || zt && p && A.zOrigin) && (At ? (f = !0,
                w = Et,
                O = (O || J(t, w, r, !1, "50% 50%")) + "",
                s = new yt(x,w,0,0,s,-1,P),
                s.b = x[w],
                s.plugin = a,
                zt ? (d = A.zOrigin,
                O = O.split(" "),
                A.zOrigin = (O.length > 2 && (0 === d || "0px" !== O[2]) ? parseFloat(O[2]) : d) || 0,
                s.xs0 = s.e = O[0] + " " + (O[1] || "50%") + " 0px",
                s = new yt(A,"zOrigin",0,0,s,-1,s.n),
                s.b = d,
                s.xs0 = s.e = A.zOrigin) : s.xs0 = s.e = O) : at(O + "", A)),
                f && (n._transformType = A.svg && Ct || !p && 3 !== this._transformType ? 2 : 3),
                c && (l[i] = c),
                h && (l.scale = h),
                s
            },
            prefix: !0
        }),
        St("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }),
        St("borderRadius", {
            defaultValue: "0px",
            parser: function(t, e, i, s, o, a) {
                e = this.format(e);
                var l, c, h, u, d, p, f, m, g, _, v, y, b, w, T, x, S = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], k = t.style;
                for (g = parseFloat(t.offsetWidth),
                _ = parseFloat(t.offsetHeight),
                l = e.split(" "),
                c = 0; c < S.length; c++)
                    this.p.indexOf("border") && (S[c] = Q(S[c])),
                    d = u = J(t, S[c], r, !1, "0px"),
                    -1 !== d.indexOf(" ") && (u = d.split(" "),
                    d = u[0],
                    u = u[1]),
                    p = h = l[c],
                    f = parseFloat(d),
                    y = d.substr((f + "").length),
                    b = "=" === p.charAt(1),
                    b ? (m = parseInt(p.charAt(0) + "1", 10),
                    p = p.substr(2),
                    m *= parseFloat(p),
                    v = p.substr((m + "").length - (0 > m ? 1 : 0)) || "") : (m = parseFloat(p),
                    v = p.substr((m + "").length)),
                    "" === v && (v = n[i] || y),
                    v !== y && (w = tt(t, "borderLeft", f, y),
                    T = tt(t, "borderTop", f, y),
                    "%" === v ? (d = w / g * 100 + "%",
                    u = T / _ * 100 + "%") : "em" === v ? (x = tt(t, "borderLeft", 1, "em"),
                    d = w / x + "em",
                    u = T / x + "em") : (d = w + "px",
                    u = T + "px"),
                    b && (p = parseFloat(d) + m + v,
                    h = parseFloat(u) + m + v)),
                    o = wt(k, S[c], d + " " + u, p + " " + h, !1, "0px", o);
                return o
            },
            prefix: !0,
            formatter: gt("0px 0px 0px 0px", !1, !0)
        }),
        St("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
            defaultValue: "0px",
            parser: function(t, e, i, n, s, o) {
                return wt(t.style, i, this.format(J(t, i, r, !1, "0px 0px")), this.format(e), !1, "0px", s)
            },
            prefix: !0,
            formatter: gt("0px 0px", !1, !0)
        }),
        St("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(t, e, i, n, s, o) {
                var a, l, c, h, u, d, p = "background-position", f = r || K(t, null), g = this.format((f ? m ? f.getPropertyValue(p + "-x") + " " + f.getPropertyValue(p + "-y") : f.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), _ = this.format(e);
                if (-1 !== g.indexOf("%") != (-1 !== _.indexOf("%")) && _.split(",").length < 2 && (d = J(t, "backgroundImage").replace(O, "")) && "none" !== d) {
                    for (a = g.split(" "),
                    l = _.split(" "),
                    W.setAttribute("src", d),
                    c = 2; --c > -1; )
                        g = a[c],
                        (h = -1 !== g.indexOf("%")) !== (-1 !== l[c].indexOf("%")) && (u = 0 === c ? t.offsetWidth - W.width : t.offsetHeight - W.height,
                        a[c] = h ? parseFloat(g) / 100 * u + "px" : parseFloat(g) / u * 100 + "%");
                    g = a.join(" ")
                }
                return this.parseComplex(t.style, g, _, s, o)
            },
            formatter: at
        }),
        St("backgroundSize", {
            defaultValue: "0 0",
            formatter: function(t) {
                return t += "",
                "co" === t.substr(0, 2) ? t : at(-1 === t.indexOf(" ") ? t + " " + t : t)
            }
        }),
        St("perspective", {
            defaultValue: "0px",
            prefix: !0
        }),
        St("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }),
        St("transformStyle", {
            prefix: !0
        }),
        St("backfaceVisibility", {
            prefix: !0
        }),
        St("userSelect", {
            prefix: !0
        }),
        St("margin", {
            parser: _t("marginTop,marginRight,marginBottom,marginLeft")
        }),
        St("padding", {
            parser: _t("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }),
        St("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(t, e, i, n, s, o) {
                var a, l, c;
                return 9 > m ? (l = t.currentStyle,
                c = 8 > m ? " " : ",",
                a = "rect(" + l.clipTop + c + l.clipRight + c + l.clipBottom + c + l.clipLeft + ")",
                e = this.format(e).split(",").join(c)) : (a = this.format(J(t, this.p, r, !1, this.dflt)),
                e = this.format(e)),
                this.parseComplex(t.style, a, e, s, o)
            }
        }),
        St("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }),
        St("autoRound,strictUnits", {
            parser: function(t, e, i, n, r) {
                return r
            }
        }),
        St("border", {
            defaultValue: "0px solid #000",
            parser: function(t, e, i, n, s, o) {
                var a = J(t, "borderTopWidth", r, !1, "0px")
                  , l = this.format(e).split(" ")
                  , c = l[0].replace(T, "");
                return "px" !== c && (a = parseFloat(a) / tt(t, "borderTopWidth", 1, c) + c),
                this.parseComplex(t.style, this.format(a + " " + J(t, "borderTopStyle", r, !1, "solid") + " " + J(t, "borderTopColor", r, !1, "#000")), l.join(" "), s, o)
            },
            color: !0,
            formatter: function(t) {
                var e = t.split(" ");
                return e[0] + " " + (e[1] || "solid") + " " + (t.match(mt) || ["#000"])[0]
            }
        }),
        St("borderWidth", {
            parser: _t("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }),
        St("float,cssFloat,styleFloat", {
            parser: function(t, e, i, n, r, s) {
                var o = t.style
                  , a = "cssFloat"in o ? "cssFloat" : "styleFloat";
                return new yt(o,a,0,0,r,-1,i,!1,0,o[a],e)
            }
        });
        var qt = function(t) {
            var e, i = this.t, n = i.filter || J(this.data, "filter") || "", r = this.s + this.c * t | 0;
            100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"),
            e = !J(this.data, "filter")) : (i.filter = n.replace(k, ""),
            e = !0)),
            e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"),
            -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(x, "opacity=" + r))
        };
        St("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(t, e, i, n, s, o) {
                var a = parseFloat(J(t, "opacity", r, !1, "1"))
                  , l = t.style
                  , c = "autoAlpha" === i;
                return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a),
                c && 1 === a && "hidden" === J(t, "visibility", r) && 0 !== e && (a = 0),
                q ? s = new yt(l,"opacity",a,e - a,s) : (s = new yt(l,"opacity",100 * a,100 * (e - a),s),
                s.xn1 = c ? 1 : 0,
                l.zoom = 1,
                s.type = 2,
                s.b = "alpha(opacity=" + s.s + ")",
                s.e = "alpha(opacity=" + (s.s + s.c) + ")",
                s.data = t,
                s.plugin = o,
                s.setRatio = qt),
                c && (s = new yt(l,"visibility",0,0,s,-1,null,!1,0,0 !== a ? "inherit" : "hidden",0 === e ? "hidden" : "inherit"),
                s.xs0 = "inherit",
                n._overwriteProps.push(s.n),
                n._overwriteProps.push(i)),
                s
            }
        });
        var Ut = function(t, e) {
            e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e),
            t.removeProperty(e.replace(P, "-$1").toLowerCase())) : t.removeAttribute(e))
        }
          , Gt = function(t) {
            if (this.t._gsClassPT = this,
            1 === t || 0 === t) {
                this.t.setAttribute("class", 0 === t ? this.b : this.e);
                for (var e = this.data, i = this.t.style; e; )
                    e.v ? i[e.p] = e.v : Ut(i, e.p),
                    e = e._next;
                1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else
                this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        St("className", {
            parser: function(t, e, n, s, o, a, l) {
                var c, h, u, d, p, f = t.getAttribute("class") || "", m = t.style.cssText;
                if (o = s._classNamePT = new yt(t,n,0,0,o,2),
                o.setRatio = Gt,
                o.pr = -11,
                i = !0,
                o.b = f,
                h = it(t, r),
                u = t._gsClassPT) {
                    for (d = {},
                    p = u.data; p; )
                        d[p.p] = 1,
                        p = p._next;
                    u.setRatio(1)
                }
                return t._gsClassPT = o,
                o.e = "=" !== e.charAt(1) ? e : f.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""),
                t.setAttribute("class", o.e),
                c = nt(t, h, it(t), l, d),
                t.setAttribute("class", f),
                o.data = c.firstMPT,
                t.style.cssText = m,
                o = o.xfirst = s.parse(t, c.difs, o, a)
            }
        });
        var Vt = function(t) {
            if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var e, i, n, r, s, o = this.t.style, a = l.transform.parse;
                if ("all" === this.e)
                    o.cssText = "",
                    r = !0;
                else
                    for (e = this.e.split(" ").join("").split(","),
                    n = e.length; --n > -1; )
                        i = e[n],
                        l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Et : l[i].p),
                        Ut(o, i);
                r && (Ut(o, At),
                (s = this.t._gsTransform) && (s.svg && (this.t.removeAttribute("data-svg-origin"),
                this.t.removeAttribute("transform")),
                delete this.t._gsTransform))
            }
        };
        for (St("clearProps", {
            parser: function(t, e, n, r, s) {
                return s = new yt(t,n,0,0,s,2),
                s.setRatio = Vt,
                s.e = e,
                s.pr = -10,
                s.data = r._tween,
                i = !0,
                s
            }
        }),
        c = "bezier,throwProps,physicsProps,physics2D".split(","),
        Tt = c.length; Tt--; )
            kt(c[Tt]);
        c = o.prototype,
        c._firstPT = c._lastParsedTransform = c._transform = null,
        c._onInitTween = function(t, e, a, c) {
            if (!t.nodeType)
                return !1;
            this._target = g = t,
            this._tween = a,
            this._vars = e,
            _ = c,
            h = e.autoRound,
            i = !1,
            n = e.suffixMap || o.suffixMap,
            r = K(t, ""),
            s = this._overwriteProps;
            var p, m, v, y, b, w, T, x, k, C = t.style;
            if (u && "" === C.zIndex && ("auto" === (p = J(t, "zIndex", r)) || "" === p) && this._addLazySet(C, "zIndex", 0),
            "string" == typeof e && (y = C.cssText,
            p = it(t, r),
            C.cssText = y + ";" + e,
            p = nt(t, p, it(t)).difs,
            !q && S.test(e) && (p.opacity = parseFloat(RegExp.$1)),
            e = p,
            C.cssText = y),
            e.className ? this._firstPT = m = l.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = m = this.parse(t, e, null),
            this._transformType) {
                for (k = 3 === this._transformType,
                At ? d && (u = !0,
                "" === C.zIndex && ("auto" === (T = J(t, "zIndex", r)) || "" === T) && this._addLazySet(C, "zIndex", 0),
                f && this._addLazySet(C, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (k ? "visible" : "hidden"))) : C.zoom = 1,
                v = m; v && v._next; )
                    v = v._next;
                x = new yt(t,"transform",0,0,null,2),
                this._linkCSSP(x, null, v),
                x.setRatio = At ? Bt : jt,
                x.data = this._transform || Wt(t, r, !0),
                x.tween = a,
                x.pr = -1,
                s.pop()
            }
            if (i) {
                for (; m; ) {
                    for (w = m._next,
                    v = y; v && v.pr > m.pr; )
                        v = v._next;
                    (m._prev = v ? v._prev : b) ? m._prev._next = m : y = m,
                    (m._next = v) ? v._prev = m : b = m,
                    m = w
                }
                this._firstPT = y
            }
            return !0
        }
        ,
        c.parse = function(t, e, i, s) {
            var o, a, c, u, d, p, f, m, v, y, b = t.style;
            for (o in e) {
                if (p = e[o],
                "function" == typeof p && (p = p(_, g)),
                a = l[o])
                    i = a.parse(t, p, o, this, i, s, e);
                else {
                    if ("--" === o.substr(0, 2)) {
                        this._tween._propLookup[o] = this._addTween.call(this._tween, t.style, "setProperty", K(t).getPropertyValue(o) + "", p + "", o, !1, o);
                        continue
                    }
                    d = J(t, o, r) + "",
                    v = "string" == typeof p,
                    "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || v && C.test(p) ? (v || (p = pt(p),
                    p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"),
                    i = wt(b, o, d, p, !0, "transparent", i, 0, s)) : v && $.test(p) ? i = wt(b, o, d, p, !0, null, i, 0, s) : (c = parseFloat(d),
                    f = c || 0 === c ? d.substr((c + "").length) : "",
                    ("" === d || "auto" === d) && ("width" === o || "height" === o ? (c = ot(t, o, r),
                    f = "px") : "left" === o || "top" === o ? (c = et(t, o, r),
                    f = "px") : (c = "opacity" !== o ? 0 : 1,
                    f = "")),
                    y = v && "=" === p.charAt(1),
                    y ? (u = parseInt(p.charAt(0) + "1", 10),
                    p = p.substr(2),
                    u *= parseFloat(p),
                    m = p.replace(T, "")) : (u = parseFloat(p),
                    m = v ? p.replace(T, "") : ""),
                    "" === m && (m = o in n ? n[o] : f),
                    p = u || 0 === u ? (y ? u + c : u) + m : e[o],
                    f !== m && ("" !== m || "lineHeight" === o) && (u || 0 === u) && c && (c = tt(t, o, c, f),
                    "%" === m ? (c /= tt(t, o, 100, "%") / 100,
                    !0 !== e.strictUnits && (d = c + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? c /= tt(t, o, 1, m) : "px" !== m && (u = tt(t, o, u, m),
                    m = "px"),
                    y && (u || 0 === u) && (p = u + c + m)),
                    y && (u += c),
                    !c && 0 !== c || !u && 0 !== u ? void 0 !== b[o] && (p || p + "" != "NaN" && null != p) ? (i = new yt(b,o,u || c || 0,0,i,-1,o,!1,0,d,p),
                    i.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : d) : G("invalid " + o + " tween value: " + e[o]) : (i = new yt(b,o,c,u - c,i,0,o,!1 !== h && ("px" === m || "zIndex" === o),0,d,p),
                    i.xs0 = m))
                }
                s && i && !i.plugin && (i.plugin = s)
            }
            return i
        }
        ,
        c.setRatio = function(t) {
            var e, i, n, r = this._firstPT;
            if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime)
                    for (; r; ) {
                        if (e = r.c * t + r.s,
                        r.r ? e = r.r(e) : 1e-6 > e && e > -1e-6 && (e = 0),
                        r.type)
                            if (1 === r.type)
                                if (2 === (n = r.l))
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                else if (3 === n)
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === n)
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === n)
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1,
                                    n = 1; n < r.l; n++)
                                        i += r["xn" + n] + r["xs" + (n + 1)];
                                    r.t[r.p] = i
                                }
                            else
                                -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                        else
                            r.t[r.p] = e + r.xs0;
                        r = r._next
                    }
                else
                    for (; r; )
                        2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t),
                        r = r._next;
            else
                for (; r; ) {
                    if (2 !== r.type)
                        if (r.r && -1 !== r.type)
                            if (e = r.r(r.s + r.c),
                            r.type) {
                                if (1 === r.type) {
                                    for (n = r.l,
                                    i = r.xs0 + e + r.xs1,
                                    n = 1; n < r.l; n++)
                                        i += r["xn" + n] + r["xs" + (n + 1)];
                                    r.t[r.p] = i
                                }
                            } else
                                r.t[r.p] = e + r.xs0;
                        else
                            r.t[r.p] = r.e;
                    else
                        r.setRatio(t);
                    r = r._next
                }
        }
        ,
        c._enableTransforms = function(t) {
            this._transform = this._transform || Wt(this._target, r, !0),
            this._transformType = this._transform.svg && Ct || !t && 3 !== this._transformType ? 2 : 3
        }
        ;
        var Zt = function(t) {
            this.t[this.p] = this.e,
            this.data._linkCSSP(this, this._next, null, !0)
        };
        c._addLazySet = function(t, e, i) {
            var n = this._firstPT = new yt(t,e,0,0,this._firstPT,2);
            n.e = i,
            n.setRatio = Zt,
            n.data = this
        }
        ,
        c._linkCSSP = function(t, e, i, n) {
            return t && (e && (e._prev = t),
            t._next && (t._next._prev = t._prev),
            t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next,
            n = !0),
            i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t),
            t._next = e,
            t._prev = i),
            t
        }
        ,
        c._mod = function(t) {
            for (var e = this._firstPT; e; )
                "function" == typeof t[e.p] && (e.r = t[e.p]),
                e = e._next
        }
        ,
        c._kill = function(e) {
            var i, n, r, s = e;
            if (e.autoAlpha || e.alpha) {
                s = {};
                for (n in e)
                    s[n] = e[n];
                s.opacity = 1,
                s.autoAlpha && (s.visibility = 1)
            }
            for (e.className && (i = this._classNamePT) && (r = i.xfirst,
            r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next),
            i._next && this._linkCSSP(i._next, i._next._next, r._prev),
            this._classNamePT = null),
            i = this._firstPT; i; )
                i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(e),
                n = i.plugin),
                i = i._next;
            return t.prototype._kill.call(this, s)
        }
        ;
        var Qt = function(t, e, i) {
            var n, r, s, o;
            if (t.slice)
                for (r = t.length; --r > -1; )
                    Qt(t[r], e, i);
            else
                for (n = t.childNodes,
                r = n.length; --r > -1; )
                    s = n[r],
                    o = s.type,
                    s.style && (e.push(it(s)),
                    i && i.push(s)),
                    1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Qt(s, e, i)
        };
        return o.cascadeTo = function(t, i, n) {
            var r, s, o, a, l = e.to(t, i, n), c = [l], h = [], u = [], d = [], p = e._internals.reservedProps;
            for (t = l._targets || l.target,
            Qt(t, h, d),
            l.render(i, !0, !0),
            Qt(t, u),
            l.render(0, !0, !0),
            l._enabled(!0),
            r = d.length; --r > -1; )
                if (s = nt(d[r], h[r], u[r]),
                s.firstMPT) {
                    s = s.difs;
                    for (o in n)
                        p[o] && (s[o] = n[o]);
                    a = {};
                    for (o in s)
                        a[o] = h[r][o];
                    c.push(e.fromTo(d[r], i, a, s))
                }
            return c
        }
        ,
        t.activate([o]),
        o
    }, !0),
    function() {
        var t = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.7.0",
            priority: -1,
            API: 2,
            init: function(t, e, i) {
                return this._tween = i,
                !0
            }
        })
          , e = function(t) {
            var e = 1 > t ? Math.pow(10, (t + "").length - 2) : 1;
            return function(i) {
                return (Math.round(i / t) * t * e | 0) / e
            }
        }
          , i = function(t, e) {
            for (; t; )
                t.f || t.blob || (t.m = e || Math.round),
                t = t._next
        }
          , n = t.prototype;
        n._onInitAllProps = function() {
            var t, n, r, s, o = this._tween, a = o.vars.roundProps, l = {}, c = o._propLookup.roundProps;
            if ("object" != typeof a || a.push)
                for ("string" == typeof a && (a = a.split(",")),
                r = a.length; --r > -1; )
                    l[a[r]] = Math.round;
            else
                for (s in a)
                    l[s] = e(a[s]);
            for (s in l)
                for (t = o._firstPT; t; )
                    n = t._next,
                    t.pg ? t.t._mod(l) : t.n === s && (2 === t.f && t.t ? i(t.t._firstPT, l[s]) : (this._add(t.t, s, t.s, t.c, l[s]),
                    n && (n._prev = t._prev),
                    t._prev ? t._prev._next = n : o._firstPT === t && (o._firstPT = n),
                    t._next = t._prev = null,
                    o._propLookup[s] = c)),
                    t = n;
            return !1
        }
        ,
        n._add = function(t, e, i, n, r) {
            this._addTween(t, e, i, i + n, e, r || Math.round),
            this._overwriteProps.push(e)
        }
    }(),
    function() {
        _gsScope._gsDefine.plugin({
            propName: "attr",
            API: 2,
            version: "0.6.1",
            init: function(t, e, i, n) {
                var r, s;
                if ("function" != typeof t.setAttribute)
                    return !1;
                for (r in e)
                    s = e[r],
                    "function" == typeof s && (s = s(n, t)),
                    this._addTween(t, "setAttribute", t.getAttribute(r) + "", s + "", r, !1, r),
                    this._overwriteProps.push(r);
                return !0
            }
        })
    }(),
    _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.3.1",
        API: 2,
        init: function(t, e, i, n) {
            "object" != typeof e && (e = {
                rotation: e
            }),
            this.finals = {};
            var r, s, o, a, l, c, h = !0 === e.useRadians ? 2 * Math.PI : 360;
            for (r in e)
                "useRadians" !== r && (a = e[r],
                "function" == typeof a && (a = a(n, t)),
                c = (a + "").split("_"),
                s = c[0],
                o = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]()),
                a = this.finals[r] = "string" == typeof s && "=" === s.charAt(1) ? o + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0,
                l = a - o,
                c.length && (s = c.join("_"),
                -1 !== s.indexOf("short") && (l %= h) !== l % (h / 2) && (l = 0 > l ? l + h : l - h),
                -1 !== s.indexOf("_cw") && 0 > l ? l = (l + 9999999999 * h) % h - (l / h | 0) * h : -1 !== s.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * h) % h - (l / h | 0) * h)),
                (l > 1e-6 || -1e-6 > l) && (this._addTween(t, r, o, o + l, r),
                this._overwriteProps.push(r)));
            return !0
        },
        set: function(t) {
            var e;
            if (1 !== t)
                this._super.setRatio.call(this, t);
            else
                for (e = this._firstPT; e; )
                    e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p],
                    e = e._next
        }
    })._autoCSS = !0,
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
        var e, i, n, r, s = _gsScope.GreenSockGlobals || _gsScope, o = s.com.greensock, a = 2 * Math.PI, l = Math.PI / 2, c = o._class, h = function(e, i) {
            var n = c("easing." + e, function() {}, !0)
              , r = n.prototype = new t;
            return r.constructor = n,
            r.getRatio = i,
            n
        }, u = t.register || function() {}
        , d = function(t, e, i, n, r) {
            var s = c("easing." + t, {
                easeOut: new e,
                easeIn: new i,
                easeInOut: new n
            }, !0);
            return u(s, t),
            s
        }, p = function(t, e, i) {
            this.t = t,
            this.v = e,
            i && (this.next = i,
            i.prev = this,
            this.c = i.v - e,
            this.gap = i.t - t)
        }, f = function(e, i) {
            var n = c("easing." + e, function(t) {
                this._p1 = t || 0 === t ? t : 1.70158,
                this._p2 = 1.525 * this._p1
            }, !0)
              , r = n.prototype = new t;
            return r.constructor = n,
            r.getRatio = i,
            r.config = function(t) {
                return new n(t)
            }
            ,
            n
        }, m = d("Back", f("BackOut", function(t) {
            return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
        }), f("BackIn", function(t) {
            return t * t * ((this._p1 + 1) * t - this._p1)
        }), f("BackInOut", function(t) {
            return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
        })), g = c("easing.SlowMo", function(t, e, i) {
            e = e || 0 === e ? e : .7,
            null == t ? t = .7 : t > 1 && (t = 1),
            this._p = 1 !== t ? e : 0,
            this._p1 = (1 - t) / 2,
            this._p2 = t,
            this._p3 = this._p1 + this._p2,
            this._calcEnd = !0 === i
        }, !0), _ = g.prototype = new t;
        return _.constructor = g,
        _.getRatio = function(t) {
            var e = t + (.5 - t) * this._p;
            return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 === t ? 0 : 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }
        ,
        g.ease = new g(.7,.7),
        _.config = g.config = function(t, e, i) {
            return new g(t,e,i)
        }
        ,
        e = c("easing.SteppedEase", function(t, e) {
            t = t || 1,
            this._p1 = 1 / t,
            this._p2 = t + (e ? 0 : 1),
            this._p3 = e ? 1 : 0
        }, !0),
        _ = e.prototype = new t,
        _.constructor = e,
        _.getRatio = function(t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999),
            ((this._p2 * t | 0) + this._p3) * this._p1
        }
        ,
        _.config = e.config = function(t, i) {
            return new e(t,i)
        }
        ,
        i = c("easing.ExpoScaleEase", function(t, e, i) {
            this._p1 = Math.log(e / t),
            this._p2 = e - t,
            this._p3 = t,
            this._ease = i
        }, !0),
        _ = i.prototype = new t,
        _.constructor = i,
        _.getRatio = function(t) {
            return this._ease && (t = this._ease.getRatio(t)),
            (this._p3 * Math.exp(this._p1 * t) - this._p3) / this._p2
        }
        ,
        _.config = i.config = function(t, e, n) {
            return new i(t,e,n)
        }
        ,
        n = c("easing.RoughEase", function(e) {
            e = e || {};
            for (var i, n, r, s, o, a, l = e.taper || "none", c = [], h = 0, u = 0 | (e.points || 20), d = u, f = !1 !== e.randomize, m = !0 === e.clamp, g = e.template instanceof t ? e.template : null, _ = "number" == typeof e.strength ? .4 * e.strength : .4; --d > -1; )
                i = f ? Math.random() : 1 / u * d,
                n = g ? g.getRatio(i) : i,
                "none" === l ? r = _ : "out" === l ? (s = 1 - i,
                r = s * s * _) : "in" === l ? r = i * i * _ : .5 > i ? (s = 2 * i,
                r = s * s * .5 * _) : (s = 2 * (1 - i),
                r = s * s * .5 * _),
                f ? n += Math.random() * r - .5 * r : d % 2 ? n += .5 * r : n -= .5 * r,
                m && (n > 1 ? n = 1 : 0 > n && (n = 0)),
                c[h++] = {
                    x: i,
                    y: n
                };
            for (c.sort(function(t, e) {
                return t.x - e.x
            }),
            a = new p(1,1,null),
            d = u; --d > -1; )
                o = c[d],
                a = new p(o.x,o.y,a);
            this._prev = new p(0,0,0 !== a.t ? a : a.next)
        }, !0),
        _ = n.prototype = new t,
        _.constructor = n,
        _.getRatio = function(t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t; )
                    e = e.next;
                e = e.prev
            } else
                for (; e.prev && t <= e.t; )
                    e = e.prev;
            return this._prev = e,
            e.v + (t - e.t) / e.gap * e.c
        }
        ,
        _.config = function(t) {
            return new n(t)
        }
        ,
        n.ease = new n,
        d("Bounce", h("BounceOut", function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), h("BounceIn", function(t) {
            return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), h("BounceInOut", function(t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1,
            t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375,
            e ? .5 * (1 - t) : .5 * t + .5
        })),
        d("Circ", h("CircOut", function(t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), h("CircIn", function(t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), h("CircInOut", function(t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })),
        r = function(e, i, n) {
            var r = c("easing." + e, function(t, e) {
                this._p1 = t >= 1 ? t : 1,
                this._p2 = (e || n) / (1 > t ? t : 1),
                this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0),
                this._p2 = a / this._p2
            }, !0)
              , s = r.prototype = new t;
            return s.constructor = r,
            s.getRatio = i,
            s.config = function(t, e) {
                return new r(t,e)
            }
            ,
            r
        }
        ,
        d("Elastic", r("ElasticOut", function(t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
        }, .3), r("ElasticIn", function(t) {
            return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
        }, .3), r("ElasticInOut", function(t) {
            return (t *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
        }, .45)),
        d("Expo", h("ExpoOut", function(t) {
            return 1 - Math.pow(2, -10 * t)
        }), h("ExpoIn", function(t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), h("ExpoInOut", function(t) {
            return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })),
        d("Sine", h("SineOut", function(t) {
            return Math.sin(t * l)
        }), h("SineIn", function(t) {
            return 1 - Math.cos(t * l)
        }), h("SineInOut", function(t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })),
        c("easing.EaseLookup", {
            find: function(e) {
                return t.map[e]
            }
        }, !0),
        u(s.SlowMo, "SlowMo", "ease,"),
        u(n, "RoughEase", "ease,"),
        u(e, "SteppedEase", "ease,"),
        m
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(t, e) {
    "use strict";
    var i = {}
      , n = t.document
      , r = t.GreenSockGlobals = t.GreenSockGlobals || t
      , s = r[e];
    if (s)
        return "undefined" != typeof module && module.exports && (module.exports = s),
        s;
    var o, a, l, c, h, u = function(t) {
        var e, i = t.split("."), n = r;
        for (e = 0; e < i.length; e++)
            n[i[e]] = n = n[i[e]] || {};
        return n
    }, d = u("com.greensock"), p = 1e-10, f = function(t) {
        var e, i = [], n = t.length;
        for (e = 0; e !== n; i.push(t[e++]))
            ;
        return i
    }, m = function() {}, g = function() {
        var t = Object.prototype.toString
          , e = t.call([]);
        return function(i) {
            return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
        }
    }(), _ = {}, v = function(n, s, o, a) {
        this.sc = _[n] ? _[n].sc : [],
        _[n] = this,
        this.gsClass = null,
        this.func = o;
        var l = [];
        this.check = function(c) {
            for (var h, d, p, f, m = s.length, g = m; --m > -1; )
                (h = _[s[m]] || new v(s[m],[])).gsClass ? (l[m] = h.gsClass,
                g--) : c && h.sc.push(this);
            if (0 === g && o) {
                if (d = ("com.greensock." + n).split("."),
                p = d.pop(),
                f = u(d.join("."))[p] = this.gsClass = o.apply(o, l),
                a)
                    if (r[p] = i[p] = f,
                    "undefined" != typeof module && module.exports)
                        if (n === e) {
                            module.exports = i[e] = f;
                            for (m in i)
                                f[m] = i[m]
                        } else
                            i[e] && (i[e][p] = f);
                    else
                        "function" == typeof define && define.amd && define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                            return f
                        });
                for (m = 0; m < this.sc.length; m++)
                    this.sc[m].check()
            }
        }
        ,
        this.check(!0)
    }, y = t._gsDefine = function(t, e, i, n) {
        return new v(t,e,i,n)
    }
    , b = d._class = function(t, e, i) {
        return e = e || function() {}
        ,
        y(t, [], function() {
            return e
        }, i),
        e
    }
    ;
    y.globals = r;
    var w = [0, 0, 1, 1]
      , T = b("easing.Ease", function(t, e, i, n) {
        this._func = t,
        this._type = i || 0,
        this._power = n || 0,
        this._params = e ? w.concat(e) : w
    }, !0)
      , x = T.map = {}
      , S = T.register = function(t, e, i, n) {
        for (var r, s, o, a, l = e.split(","), c = l.length, h = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1; )
            for (s = l[c],
            r = n ? b("easing." + s, null, !0) : d.easing[s] || {},
            o = h.length; --o > -1; )
                a = h[o],
                x[s + "." + a] = x[a + s] = r[a] = t.getRatio ? t : t[a] || new t
    }
    ;
    for (l = T.prototype,
    l._calcEnd = !1,
    l.getRatio = function(t) {
        if (this._func)
            return this._params[0] = t,
            this._func.apply(null, this._params);
        var e = this._type
          , i = this._power
          , n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
        return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n),
        1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2
    }
    ,
    o = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
    a = o.length; --a > -1; )
        l = o[a] + ",Power" + a,
        S(new T(null,null,1,a), l, "easeOut", !0),
        S(new T(null,null,2,a), l, "easeIn" + (0 === a ? ",easeNone" : "")),
        S(new T(null,null,3,a), l, "easeInOut");
    x.linear = d.easing.Linear.easeIn,
    x.swing = d.easing.Quad.easeInOut;
    var k = b("events.EventDispatcher", function(t) {
        this._listeners = {},
        this._eventTarget = t || this
    });
    l = k.prototype,
    l.addEventListener = function(t, e, i, n, r) {
        r = r || 0;
        var s, o, a = this._listeners[t], l = 0;
        for (this !== c || h || c.wake(),
        null == a && (this._listeners[t] = a = []),
        o = a.length; --o > -1; )
            s = a[o],
            s.c === e && s.s === i ? a.splice(o, 1) : 0 === l && s.pr < r && (l = o + 1);
        a.splice(l, 0, {
            c: e,
            s: i,
            up: n,
            pr: r
        })
    }
    ,
    l.removeEventListener = function(t, e) {
        var i, n = this._listeners[t];
        if (n)
            for (i = n.length; --i > -1; )
                if (n[i].c === e)
                    return void n.splice(i, 1)
    }
    ,
    l.dispatchEvent = function(t) {
        var e, i, n, r = this._listeners[t];
        if (r)
            for (e = r.length,
            e > 1 && (r = r.slice(0)),
            i = this._eventTarget; --e > -1; )
                (n = r[e]) && (n.up ? n.c.call(n.s || i, {
                    type: t,
                    target: i
                }) : n.c.call(n.s || i))
    }
    ;
    var C = t.requestAnimationFrame
      , P = t.cancelAnimationFrame
      , A = Date.now || function() {
        return (new Date).getTime()
    }
      , O = A();
    for (o = ["ms", "moz", "webkit", "o"],
    a = o.length; --a > -1 && !C; )
        C = t[o[a] + "RequestAnimationFrame"],
        P = t[o[a] + "CancelAnimationFrame"] || t[o[a] + "CancelRequestAnimationFrame"];
    b("Ticker", function(t, e) {
        var i, r, s, o, a, l = this, u = A(), d = !(!1 === e || !C) && "auto", f = 500, g = 33, _ = function(t) {
            var e, n, c = A() - O;
            c > f && (u += c - g),
            O += c,
            l.time = (O - u) / 1e3,
            e = l.time - a,
            (!i || e > 0 || !0 === t) && (l.frame++,
            a += e + (e >= o ? .004 : o - e),
            n = !0),
            !0 !== t && (s = r(_)),
            n && l.dispatchEvent("tick")
        };
        k.call(l),
        l.time = l.frame = 0,
        l.tick = function() {
            _(!0)
        }
        ,
        l.lagSmoothing = function(t, e) {
            return arguments.length ? (f = t || 1 / p,
            void (g = Math.min(e, f, 0))) : 1 / p > f
        }
        ,
        l.sleep = function() {
            null != s && (d && P ? P(s) : clearTimeout(s),
            r = m,
            s = null,
            l === c && (h = !1))
        }
        ,
        l.wake = function(t) {
            null !== s ? l.sleep() : t ? u += -O + (O = A()) : l.frame > 10 && (O = A() - f + 5),
            r = 0 === i ? m : d && C ? C : function(t) {
                return setTimeout(t, 1e3 * (a - l.time) + 1 | 0)
            }
            ,
            l === c && (h = !0),
            _(2)
        }
        ,
        l.fps = function(t) {
            return arguments.length ? (i = t,
            o = 1 / (i || 60),
            a = this.time + o,
            void l.wake()) : i
        }
        ,
        l.useRAF = function(t) {
            return arguments.length ? (l.sleep(),
            d = t,
            void l.fps(i)) : d
        }
        ,
        l.fps(t),
        setTimeout(function() {
            "auto" === d && l.frame < 5 && "hidden" !== (n || {}).visibilityState && l.useRAF(!1)
        }, 1500)
    }),
    l = d.Ticker.prototype = new d.events.EventDispatcher,
    l.constructor = d.Ticker;
    var E = b("core.Animation", function(t, e) {
        if (this.vars = e = e || {},
        this._duration = this._totalDuration = t || 0,
        this._delay = Number(e.delay) || 0,
        this._timeScale = 1,
        this._active = !0 === e.immediateRender,
        this.data = e.data,
        this._reversed = !0 === e.reversed,
        Z) {
            h || c.wake();
            var i = this.vars.useFrames ? V : Z;
            i.add(this, i._time),
            this.vars.paused && this.paused(!0)
        }
    });
    c = E.ticker = new d.Ticker,
    l = E.prototype,
    l._dirty = l._gc = l._initted = l._paused = !1,
    l._totalTime = l._time = 0,
    l._rawPrevTime = -1,
    l._next = l._last = l._onUpdate = l._timeline = l.timeline = null,
    l._paused = !1;
    var z = function() {
        h && A() - O > 2e3 && ("hidden" !== (n || {}).visibilityState || !c.lagSmoothing()) && c.wake();
        var t = setTimeout(z, 2e3);
        t.unref && t.unref()
    };
    z(),
    l.play = function(t, e) {
        return null != t && this.seek(t, e),
        this.reversed(!1).paused(!1)
    }
    ,
    l.pause = function(t, e) {
        return null != t && this.seek(t, e),
        this.paused(!0)
    }
    ,
    l.resume = function(t, e) {
        return null != t && this.seek(t, e),
        this.paused(!1)
    }
    ,
    l.seek = function(t, e) {
        return this.totalTime(Number(t), !1 !== e)
    }
    ,
    l.restart = function(t, e) {
        return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
    }
    ,
    l.reverse = function(t, e) {
        return null != t && this.seek(t || this.totalDuration(), e),
        this.reversed(!0).paused(!1)
    }
    ,
    l.render = function(t, e, i) {}
    ,
    l.invalidate = function() {
        return this._time = this._totalTime = 0,
        this._initted = this._gc = !1,
        this._rawPrevTime = -1,
        (this._gc || !this.timeline) && this._enabled(!0),
        this
    }
    ,
    l.isActive = function() {
        var t, e = this._timeline, i = this._startTime;
        return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-7
    }
    ,
    l._enabled = function(t, e) {
        return h || c.wake(),
        this._gc = !t,
        this._active = this.isActive(),
        !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)),
        !1
    }
    ,
    l._kill = function(t, e) {
        return this._enabled(!1, !1)
    }
    ,
    l.kill = function(t, e) {
        return this._kill(t, e),
        this
    }
    ,
    l._uncache = function(t) {
        for (var e = t ? this : this.timeline; e; )
            e._dirty = !0,
            e = e.timeline;
        return this
    }
    ,
    l._swapSelfInParams = function(t) {
        for (var e = t.length, i = t.concat(); --e > -1; )
            "{self}" === t[e] && (i[e] = this);
        return i
    }
    ,
    l._callback = function(t) {
        var e = this.vars
          , i = e[t]
          , n = e[t + "Params"]
          , r = e[t + "Scope"] || e.callbackScope || this;
        switch (n ? n.length : 0) {
        case 0:
            i.call(r);
            break;
        case 1:
            i.call(r, n[0]);
            break;
        case 2:
            i.call(r, n[0], n[1]);
            break;
        default:
            i.apply(r, n)
        }
    }
    ,
    l.eventCallback = function(t, e, i, n) {
        if ("on" === (t || "").substr(0, 2)) {
            var r = this.vars;
            if (1 === arguments.length)
                return r[t];
            null == e ? delete r[t] : (r[t] = e,
            r[t + "Params"] = g(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i,
            r[t + "Scope"] = n),
            "onUpdate" === t && (this._onUpdate = e)
        }
        return this
    }
    ,
    l.delay = function(t) {
        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay),
        this._delay = t,
        this) : this._delay
    }
    ,
    l.duration = function(t) {
        return arguments.length ? (this._duration = this._totalDuration = t,
        this._uncache(!0),
        this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0),
        this) : (this._dirty = !1,
        this._duration)
    }
    ,
    l.totalDuration = function(t) {
        return this._dirty = !1,
        arguments.length ? this.duration(t) : this._totalDuration
    }
    ,
    l.time = function(t, e) {
        return arguments.length ? (this._dirty && this.totalDuration(),
        this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
    }
    ,
    l.totalTime = function(t, e, i) {
        if (h || c.wake(),
        !arguments.length)
            return this._totalTime;
        if (this._timeline) {
            if (0 > t && !i && (t += this.totalDuration()),
            this._timeline.smoothChildTiming) {
                this._dirty && this.totalDuration();
                var n = this._totalDuration
                  , r = this._timeline;
                if (t > n && !i && (t = n),
                this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale,
                r._dirty || this._uncache(!1),
                r._timeline)
                    for (; r._timeline; )
                        r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0),
                        r = r._timeline
            }
            this._gc && this._enabled(!0, !1),
            (this._totalTime !== t || 0 === this._duration) && (D.length && K(),
            this.render(t, e, !1),
            D.length && K())
        }
        return this
    }
    ,
    l.progress = l.totalProgress = function(t, e) {
        var i = this.duration();
        return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
    }
    ,
    l.startTime = function(t) {
        return arguments.length ? (t !== this._startTime && (this._startTime = t,
        this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)),
        this) : this._startTime
    }
    ,
    l.endTime = function(t) {
        return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
    }
    ,
    l.timeScale = function(t) {
        if (!arguments.length)
            return this._timeScale;
        var e, i;
        for (t = t || p,
        this._timeline && this._timeline.smoothChildTiming && (e = this._pauseTime,
        i = e || 0 === e ? e : this._timeline.totalTime(),
        this._startTime = i - (i - this._startTime) * this._timeScale / t),
        this._timeScale = t,
        i = this.timeline; i && i.timeline; )
            i._dirty = !0,
            i.totalDuration(),
            i = i.timeline;
        return this
    }
    ,
    l.reversed = function(t) {
        return arguments.length ? (t != this._reversed && (this._reversed = t,
        this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
        this) : this._reversed
    }
    ,
    l.paused = function(t) {
        if (!arguments.length)
            return this._paused;
        var e, i, n = this._timeline;
        return t != this._paused && n && (h || t || c.wake(),
        e = n.rawTime(),
        i = e - this._pauseTime,
        !t && n.smoothChildTiming && (this._startTime += i,
        this._uncache(!1)),
        this._pauseTime = t ? e : null,
        this._paused = t,
        this._active = this.isActive(),
        !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale,
        this.render(e, e === this._totalTime, !0))),
        this._gc && !t && this._enabled(!0, !1),
        this
    }
    ;
    var R = b("core.SimpleTimeline", function(t) {
        E.call(this, 0, t),
        this.autoRemoveChildren = this.smoothChildTiming = !0
    });
    l = R.prototype = new E,
    l.constructor = R,
    l.kill()._gc = !1,
    l._first = l._last = l._recent = null,
    l._sortChildren = !1,
    l.add = l.insert = function(t, e, i, n) {
        var r, s;
        if (t._startTime = Number(e || 0) + t._delay,
        t._paused && this !== t._timeline && (t._pauseTime = this.rawTime() - (t._timeline.rawTime() - t._pauseTime)),
        t.timeline && t.timeline._remove(t, !0),
        t.timeline = t._timeline = this,
        t._gc && t._enabled(!0, !0),
        r = this._last,
        this._sortChildren)
            for (s = t._startTime; r && r._startTime > s; )
                r = r._prev;
        return r ? (t._next = r._next,
        r._next = t) : (t._next = this._first,
        this._first = t),
        t._next ? t._next._prev = t : this._last = t,
        t._prev = r,
        this._recent = t,
        this._timeline && this._uncache(!0),
        this
    }
    ,
    l._remove = function(t, e) {
        return t.timeline === this && (e || t._enabled(!1, !0),
        t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next),
        t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev),
        t._next = t._prev = t.timeline = null,
        t === this._recent && (this._recent = this._last),
        this._timeline && this._uncache(!0)),
        this
    }
    ,
    l.render = function(t, e, i) {
        var n, r = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = t; r; )
            n = r._next,
            (r._active || t >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)),
            r = n
    }
    ,
    l.rawTime = function() {
        return h || c.wake(),
        this._totalTime
    }
    ;
    var M = b("TweenLite", function(e, i, n) {
        if (E.call(this, i, n),
        this.render = M.prototype.render,
        null == e)
            throw "Cannot tween a null target.";
        this.target = e = "string" != typeof e ? e : M.selector(e) || e;
        var r, s, o, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType), l = this.vars.overwrite;
        if (this._overwrite = l = null == l ? G[M.defaultOverwrite] : "number" == typeof l ? l >> 0 : G[l],
        (a || e instanceof Array || e.push && g(e)) && "number" != typeof e[0])
            for (this._targets = o = f(e),
            this._propLookup = [],
            this._siblings = [],
            r = 0; r < o.length; r++)
                s = o[r],
                s ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1),
                this._targets = o = o.concat(f(s))) : (this._siblings[r] = J(s, this, !1),
                1 === l && this._siblings[r].length > 1 && et(s, this, null, 1, this._siblings[r])) : "string" == typeof (s = o[r--] = M.selector(s)) && o.splice(r + 1, 1) : o.splice(r--, 1);
        else
            this._propLookup = {},
            this._siblings = J(e, this, !1),
            1 === l && this._siblings.length > 1 && et(e, this, null, 1, this._siblings);
        (this.vars.immediateRender || 0 === i && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -p,
        this.render(Math.min(0, -this._delay)))
    }, !0)
      , L = function(e) {
        return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
    }
      , $ = function(t, e) {
        var i, n = {};
        for (i in t)
            U[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!j[i] || j[i] && j[i]._autoCSS) || (n[i] = t[i],
            delete t[i]);
        t.css = n
    };
    l = M.prototype = new E,
    l.constructor = M,
    l.kill()._gc = !1,
    l.ratio = 0,
    l._firstPT = l._targets = l._overwrittenProps = l._startAt = null,
    l._notifyPluginsOfEnabled = l._lazy = !1,
    M.version = "2.0.1",
    M.defaultEase = l._ease = new T(null,null,1,1),
    M.defaultOverwrite = "auto",
    M.ticker = c,
    M.autoSleep = 120,
    M.lagSmoothing = function(t, e) {
        c.lagSmoothing(t, e)
    }
    ,
    M.selector = t.$ || t.jQuery || function(e) {
        var i = t.$ || t.jQuery;
        return i ? (M.selector = i,
        i(e)) : (n || (n = t.document),
        n ? n.querySelectorAll ? n.querySelectorAll(e) : n.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e)
    }
    ;
    var D = []
      , X = {}
      , I = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
      , F = /[\+-]=-?[\.\d]/
      , Y = function(t) {
        for (var e, i = this._firstPT; i; )
            e = i.blob ? 1 === t && null != this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s,
            i.m ? e = i.m.call(this._tween, e, this._target || i.t, this._tween) : 1e-6 > e && e > -1e-6 && !i.blob && (e = 0),
            i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e,
            i = i._next
    }
      , H = function(t, e, i, n) {
        var r, s, o, a, l, c, h, u = [], d = 0, p = "", f = 0;
        for (u.start = t,
        u.end = e,
        t = u[0] = t + "",
        e = u[1] = e + "",
        i && (i(u),
        t = u[0],
        e = u[1]),
        u.length = 0,
        r = t.match(I) || [],
        s = e.match(I) || [],
        n && (n._next = null,
        n.blob = 1,
        u._firstPT = u._applyPT = n),
        l = s.length,
        a = 0; l > a; a++)
            h = s[a],
            c = e.substr(d, e.indexOf(h, d) - d),
            p += c || !a ? c : ",",
            d += c.length,
            f ? f = (f + 1) % 5 : "rgba(" === c.substr(-5) && (f = 1),
            h === r[a] || r.length <= a ? p += h : (p && (u.push(p),
            p = ""),
            o = parseFloat(r[a]),
            u.push(o),
            u._firstPT = {
                _next: u._firstPT,
                t: u,
                p: u.length - 1,
                s: o,
                c: ("=" === h.charAt(1) ? parseInt(h.charAt(0) + "1", 10) * parseFloat(h.substr(2)) : parseFloat(h) - o) || 0,
                f: 0,
                m: f && 4 > f ? Math.round : 0
            }),
            d += h.length;
        return p += e.substr(d),
        p && u.push(p),
        u.setRatio = Y,
        F.test(e) && (u.end = null),
        u
    }
      , N = function(t, e, i, n, r, s, o, a, l) {
        "function" == typeof n && (n = n(l || 0, t));
        var c, h = typeof t[e], u = "function" !== h ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3), d = "get" !== i ? i : u ? o ? t[u](o) : t[u]() : t[e], p = "string" == typeof n && "=" === n.charAt(1), f = {
            t: t,
            p: e,
            s: d,
            f: "function" === h,
            pg: 0,
            n: r || e,
            m: s ? "function" == typeof s ? s : Math.round : 0,
            pr: 0,
            c: p ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - d || 0
        };
        return ("number" != typeof d || "number" != typeof n && !p) && (o || isNaN(d) || !p && isNaN(n) || "boolean" == typeof d || "boolean" == typeof n ? (f.fp = o,
        c = H(d, p ? parseFloat(f.s) + f.c + (f.s + "").replace(/[0-9\-\.]/g, "") : n, a || M.defaultStringFilter, f),
        f = {
            t: c,
            p: "setRatio",
            s: 0,
            c: 1,
            f: 2,
            pg: 0,
            n: r || e,
            pr: 0,
            m: 0
        }) : (f.s = parseFloat(d),
        p || (f.c = parseFloat(n) - f.s || 0))),
        f.c ? ((f._next = this._firstPT) && (f._next._prev = f),
        this._firstPT = f,
        f) : void 0
    }
      , W = M._internals = {
        isArray: g,
        isSelector: L,
        lazyTweens: D,
        blobDif: H
    }
      , j = M._plugins = {}
      , B = W.tweenLookup = {}
      , q = 0
      , U = W.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
        yoyoEase: 1
    }
      , G = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0
    }
      , V = E._rootFramesTimeline = new R
      , Z = E._rootTimeline = new R
      , Q = 30
      , K = W.lazyRender = function() {
        var t, e = D.length;
        for (X = {}; --e > -1; )
            (t = D[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0),
            t._lazy = !1);
        D.length = 0
    }
    ;
    Z._startTime = c.time,
    V._startTime = c.frame,
    Z._active = V._active = !0,
    setTimeout(K, 1),
    E._updateRoot = M.render = function() {
        var t, e, i;
        if (D.length && K(),
        Z.render((c.time - Z._startTime) * Z._timeScale, !1, !1),
        V.render((c.frame - V._startTime) * V._timeScale, !1, !1),
        D.length && K(),
        c.frame >= Q) {
            Q = c.frame + (parseInt(M.autoSleep, 10) || 120);
            for (i in B) {
                for (e = B[i].tweens,
                t = e.length; --t > -1; )
                    e[t]._gc && e.splice(t, 1);
                0 === e.length && delete B[i]
            }
            if ((!(i = Z._first) || i._paused) && M.autoSleep && !V._first && 1 === c._listeners.tick.length) {
                for (; i && i._paused; )
                    i = i._next;
                i || c.sleep()
            }
        }
    }
    ,
    c.addEventListener("tick", E._updateRoot);
    var J = function(t, e, i) {
        var n, r, s = t._gsTweenID;
        if (B[s || (t._gsTweenID = s = "t" + q++)] || (B[s] = {
            target: t,
            tweens: []
        }),
        e && (n = B[s].tweens,
        n[r = n.length] = e,
        i))
            for (; --r > -1; )
                n[r] === e && n.splice(r, 1);
        return B[s].tweens
    }
      , tt = function(t, e, i, n) {
        var r, s, o = t.vars.onOverwrite;
        return o && (r = o(t, e, i, n)),
        o = M.onOverwrite,
        o && (s = o(t, e, i, n)),
        !1 !== r && !1 !== s
    }
      , et = function(t, e, i, n, r) {
        var s, o, a, l;
        if (1 === n || n >= 4) {
            for (l = r.length,
            s = 0; l > s; s++)
                if ((a = r[s]) !== e)
                    a._gc || a._kill(null, t, e) && (o = !0);
                else if (5 === n)
                    break;
            return o
        }
        var c, h = e._startTime + p, u = [], d = 0, f = 0 === e._duration;
        for (s = r.length; --s > -1; )
            (a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (c = c || it(e, 0, f),
            0 === it(a, c, f) && (u[d++] = a)) : a._startTime <= h && a._startTime + a.totalDuration() / a._timeScale > h && ((f || !a._initted) && h - a._startTime <= 2e-10 || (u[d++] = a)));
        for (s = d; --s > -1; )
            if (a = u[s],
            2 === n && a._kill(i, t, e) && (o = !0),
            2 !== n || !a._firstPT && a._initted) {
                if (2 !== n && !tt(a, e))
                    continue;
                a._enabled(!1, !1) && (o = !0)
            }
        return o
    }
      , it = function(t, e, i) {
        for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline; ) {
            if (s += n._startTime,
            r *= n._timeScale,
            n._paused)
                return -100;
            n = n._timeline
        }
        return s /= r,
        s > e ? s - e : i && s === e || !t._initted && 2 * p > s - e ? p : (s += t.totalDuration() / t._timeScale / r) > e + p ? 0 : s - e - p
    };
    l._init = function() {
        var t, e, i, n, r, s, o = this.vars, a = this._overwrittenProps, l = this._duration, c = !!o.immediateRender, h = o.ease;
        if (o.startAt) {
            this._startAt && (this._startAt.render(-1, !0),
            this._startAt.kill()),
            r = {};
            for (n in o.startAt)
                r[n] = o.startAt[n];
            if (r.data = "isStart",
            r.overwrite = !1,
            r.immediateRender = !0,
            r.lazy = c && !1 !== o.lazy,
            r.startAt = r.delay = null,
            r.onUpdate = o.onUpdate,
            r.onUpdateParams = o.onUpdateParams,
            r.onUpdateScope = o.onUpdateScope || o.callbackScope || this,
            this._startAt = M.to(this.target || {}, 0, r),
            c)
                if (this._time > 0)
                    this._startAt = null;
                else if (0 !== l)
                    return
        } else if (o.runBackwards && 0 !== l)
            if (this._startAt)
                this._startAt.render(-1, !0),
                this._startAt.kill(),
                this._startAt = null;
            else {
                0 !== this._time && (c = !1),
                i = {};
                for (n in o)
                    U[n] && "autoCSS" !== n || (i[n] = o[n]);
                if (i.overwrite = 0,
                i.data = "isFromStart",
                i.lazy = c && !1 !== o.lazy,
                i.immediateRender = c,
                this._startAt = M.to(this.target, 0, i),
                c) {
                    if (0 === this._time)
                        return
                } else
                    this._startAt._init(),
                    this._startAt._enabled(!1),
                    this.vars.immediateRender && (this._startAt = null)
            }
        if (this._ease = h = h ? h instanceof T ? h : "function" == typeof h ? new T(h,o.easeParams) : x[h] || M.defaultEase : M.defaultEase,
        o.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, o.easeParams)),
        this._easeType = this._ease._type,
        this._easePower = this._ease._power,
        this._firstPT = null,
        this._targets)
            for (s = this._targets.length,
            t = 0; s > t; t++)
                this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0);
        else
            e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
        if (e && M._onPluginEvent("_onInitAllProps", this),
        a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
        o.runBackwards)
            for (i = this._firstPT; i; )
                i.s += i.c,
                i.c = -i.c,
                i = i._next;
        this._onUpdate = o.onUpdate,
        this._initted = !0
    }
    ,
    l._initProps = function(e, i, n, r, s) {
        var o, a, l, c, h, u;
        if (null == e)
            return !1;
        X[e._gsTweenID] && K(),
        this.vars.css || e.style && e !== t && e.nodeType && j.css && !1 !== this.vars.autoCSS && $(this.vars, e);
        for (o in this.vars)
            if (u = this.vars[o],
            U[o])
                u && (u instanceof Array || u.push && g(u)) && -1 !== u.join("").indexOf("{self}") && (this.vars[o] = u = this._swapSelfInParams(u, this));
            else if (j[o] && (c = new j[o])._onInitTween(e, this.vars[o], this, s)) {
                for (this._firstPT = h = {
                    _next: this._firstPT,
                    t: c,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 1,
                    n: o,
                    pg: 1,
                    pr: c._priority,
                    m: 0
                },
                a = c._overwriteProps.length; --a > -1; )
                    i[c._overwriteProps[a]] = this._firstPT;
                (c._priority || c._onInitAllProps) && (l = !0),
                (c._onDisable || c._onEnable) && (this._notifyPluginsOfEnabled = !0),
                h._next && (h._next._prev = h)
            } else
                i[o] = N.call(this, e, o, "get", u, o, 0, null, this.vars.stringFilter, s);
        return r && this._kill(r, e) ? this._initProps(e, i, n, r, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && et(e, this, i, this._overwrite, n) ? (this._kill(i, e),
        this._initProps(e, i, n, r, s)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (X[e._gsTweenID] = !0),
        l)
    }
    ,
    l.render = function(t, e, i) {
        var n, r, s, o, a = this._time, l = this._duration, c = this._rawPrevTime;
        if (t >= l - 1e-7 && t >= 0)
            this._totalTime = this._time = l,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
            this._reversed || (n = !0,
            r = "onComplete",
            i = i || this._timeline.autoRemoveChildren),
            0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0),
            (0 > c || 0 >= t && t >= -1e-7 || c === p && "isPause" !== this.data) && c !== t && (i = !0,
            c > p && (r = "onReverseComplete")),
            this._rawPrevTime = o = !e || t || c === t ? t : p);
        else if (1e-7 > t)
            this._totalTime = this._time = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
            (0 !== a || 0 === l && c > 0) && (r = "onReverseComplete",
            n = this._reversed),
            0 > t && (this._active = !1,
            0 === l && (this._initted || !this.vars.lazy || i) && (c >= 0 && (c !== p || "isPause" !== this.data) && (i = !0),
            this._rawPrevTime = o = !e || t || c === t ? t : p)),
            (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
        else if (this._totalTime = this._time = t,
        this._easeType) {
            var h = t / l
              , u = this._easeType
              , d = this._easePower;
            (1 === u || 3 === u && h >= .5) && (h = 1 - h),
            3 === u && (h *= 2),
            1 === d ? h *= h : 2 === d ? h *= h * h : 3 === d ? h *= h * h * h : 4 === d && (h *= h * h * h * h),
            this.ratio = 1 === u ? 1 - h : 2 === u ? h : .5 > t / l ? h / 2 : 1 - h / 2
        } else
            this.ratio = this._ease.getRatio(t / l);
        if (this._time !== a || i) {
            if (!this._initted) {
                if (this._init(),
                !this._initted || this._gc)
                    return;
                if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration))
                    return this._time = this._totalTime = a,
                    this._rawPrevTime = c,
                    D.push(this),
                    void (this._lazy = [t, e]);
                this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (!1 !== this._lazy && (this._lazy = !1),
            this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0),
            0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, !0, i) : r || (r = "_dummyGS")),
            this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))),
            s = this._firstPT; s; )
                s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s,
                s = s._next;
            this._onUpdate && (0 > t && this._startAt && -1e-4 !== t && this._startAt.render(t, !0, i),
            e || (this._time !== a || n || i) && this._callback("onUpdate")),
            r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, !0, i),
            n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !e && this.vars[r] && this._callback(r),
            0 === l && this._rawPrevTime === p && o !== p && (this._rawPrevTime = 0))
        }
    }
    ,
    l._kill = function(t, e, i) {
        if ("all" === t && (t = null),
        null == t && (null == e || e === this.target))
            return this._lazy = !1,
            this._enabled(!1, !1);
        e = "string" != typeof e ? e || this._targets || this.target : M.selector(e) || e;
        var n, r, s, o, a, l, c, h, u, d = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
        if ((g(e) || L(e)) && "number" != typeof e[0])
            for (n = e.length; --n > -1; )
                this._kill(t, e[n], i) && (l = !0);
        else {
            if (this._targets) {
                for (n = this._targets.length; --n > -1; )
                    if (e === this._targets[n]) {
                        a = this._propLookup[n] || {},
                        this._overwrittenProps = this._overwrittenProps || [],
                        r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                        break
                    }
            } else {
                if (e !== this.target)
                    return !1;
                a = this._propLookup,
                r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
            }
            if (a) {
                if (c = t || a,
                h = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill),
                i && (M.onOverwrite || this.vars.onOverwrite)) {
                    for (s in c)
                        a[s] && (u || (u = []),
                        u.push(s));
                    if ((u || !t) && !tt(this, i, e, u))
                        return !1
                }
                for (s in c)
                    (o = a[s]) && (d && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s,
                    l = !0),
                    o.pg && o.t._kill(c) && (l = !0),
                    o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next),
                    o._next && (o._next._prev = o._prev),
                    o._next = o._prev = null),
                    delete a[s]),
                    h && (r[s] = 1);
                !this._firstPT && this._initted && this._enabled(!1, !1)
            }
        }
        return l
    }
    ,
    l.invalidate = function() {
        return this._notifyPluginsOfEnabled && M._onPluginEvent("_onDisable", this),
        this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null,
        this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
        this._propLookup = this._targets ? {} : [],
        E.prototype.invalidate.call(this),
        this.vars.immediateRender && (this._time = -p,
        this.render(Math.min(0, -this._delay))),
        this
    }
    ,
    l._enabled = function(t, e) {
        if (h || c.wake(),
        t && this._gc) {
            var i, n = this._targets;
            if (n)
                for (i = n.length; --i > -1; )
                    this._siblings[i] = J(n[i], this, !0);
            else
                this._siblings = J(this.target, this, !0)
        }
        return E.prototype._enabled.call(this, t, e),
        !(!this._notifyPluginsOfEnabled || !this._firstPT) && M._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
    }
    ,
    M.to = function(t, e, i) {
        return new M(t,e,i)
    }
    ,
    M.from = function(t, e, i) {
        return i.runBackwards = !0,
        i.immediateRender = 0 != i.immediateRender,
        new M(t,e,i)
    }
    ,
    M.fromTo = function(t, e, i, n) {
        return n.startAt = i,
        n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender,
        new M(t,e,n)
    }
    ,
    M.delayedCall = function(t, e, i, n, r) {
        return new M(e,0,{
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            callbackScope: n,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            immediateRender: !1,
            lazy: !1,
            useFrames: r,
            overwrite: 0
        })
    }
    ,
    M.set = function(t, e) {
        return new M(t,0,e)
    }
    ,
    M.getTweensOf = function(t, e) {
        if (null == t)
            return [];
        t = "string" != typeof t ? t : M.selector(t) || t;
        var i, n, r, s;
        if ((g(t) || L(t)) && "number" != typeof t[0]) {
            for (i = t.length,
            n = []; --i > -1; )
                n = n.concat(M.getTweensOf(t[i], e));
            for (i = n.length; --i > -1; )
                for (s = n[i],
                r = i; --r > -1; )
                    s === n[r] && n.splice(i, 1)
        } else if (t._gsTweenID)
            for (n = J(t).concat(),
            i = n.length; --i > -1; )
                (n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
        return n || []
    }
    ,
    M.killTweensOf = M.killDelayedCallsTo = function(t, e, i) {
        "object" == typeof e && (i = e,
        e = !1);
        for (var n = M.getTweensOf(t, e), r = n.length; --r > -1; )
            n[r]._kill(i, t)
    }
    ;
    var nt = b("plugins.TweenPlugin", function(t, e) {
        this._overwriteProps = (t || "").split(","),
        this._propName = this._overwriteProps[0],
        this._priority = e || 0,
        this._super = nt.prototype
    }, !0);
    if (l = nt.prototype,
    nt.version = "1.19.0",
    nt.API = 2,
    l._firstPT = null,
    l._addTween = N,
    l.setRatio = Y,
    l._kill = function(t) {
        var e, i = this._overwriteProps, n = this._firstPT;
        if (null != t[this._propName])
            this._overwriteProps = [];
        else
            for (e = i.length; --e > -1; )
                null != t[i[e]] && i.splice(e, 1);
        for (; n; )
            null != t[n.n] && (n._next && (n._next._prev = n._prev),
            n._prev ? (n._prev._next = n._next,
            n._prev = null) : this._firstPT === n && (this._firstPT = n._next)),
            n = n._next;
        return !1
    }
    ,
    l._mod = l._roundProps = function(t) {
        for (var e, i = this._firstPT; i; )
            e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")],
            e && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e),
            i = i._next
    }
    ,
    M._onPluginEvent = function(t, e) {
        var i, n, r, s, o, a = e._firstPT;
        if ("_onInitAllProps" === t) {
            for (; a; ) {
                for (o = a._next,
                n = r; n && n.pr > a.pr; )
                    n = n._next;
                (a._prev = n ? n._prev : s) ? a._prev._next = a : r = a,
                (a._next = n) ? n._prev = a : s = a,
                a = o
            }
            a = e._firstPT = r
        }
        for (; a; )
            a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0),
            a = a._next;
        return i
    }
    ,
    nt.activate = function(t) {
        for (var e = t.length; --e > -1; )
            t[e].API === nt.API && (j[(new t[e])._propName] = t[e]);
        return !0
    }
    ,
    y.plugin = function(t) {
        if (!(t && t.propName && t.init && t.API))
            throw "illegal plugin definition.";
        var e, i = t.propName, n = t.priority || 0, r = t.overwriteProps, s = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_mod",
            mod: "_mod",
            initAll: "_onInitAllProps"
        }, o = b("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
            nt.call(this, i, n),
            this._overwriteProps = r || []
        }, !0 === t.global), a = o.prototype = new nt(i);
        a.constructor = o,
        o.API = t.API;
        for (e in s)
            "function" == typeof t[e] && (a[s[e]] = t[e]);
        return o.version = t.version,
        nt.activate([o]),
        o
    }
    ,
    o = t._gsQueue) {
        for (a = 0; a < o.length; a++)
            o[a]();
        for (l in _)
            _[l].func || t.console.log("GSAP encountered missing dependency: " + l)
    }
    h = !1
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"),
function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.ScrollMagic = e()
}(this, function() {
    "use strict";
    var t = function() {};
    t.version = "2.0.5",
    window.addEventListener("mousewheel", function() {});
    var e = "data-scrollmagic-pin-spacer";
    t.Controller = function(n) {
        var s, o, a = "REVERSE", l = "PAUSED", c = i.defaults, h = this, u = r.extend({}, c, n), d = [], p = !1, f = 0, m = l, g = !0, _ = 0, v = !0, y = function() {
            u.refreshInterval > 0 && (o = window.setTimeout(C, u.refreshInterval))
        }, b = function() {
            return u.vertical ? r.get.scrollTop(u.container) : r.get.scrollLeft(u.container)
        }, w = function() {
            return u.vertical ? r.get.height(u.container) : r.get.width(u.container)
        }, T = this._setScrollPos = function(t) {
            u.vertical ? g ? window.scrollTo(r.get.scrollLeft(), t) : u.container.scrollTop = t : g ? window.scrollTo(t, r.get.scrollTop()) : u.container.scrollLeft = t
        }
        , x = function() {
            if (v && p) {
                var t = r.type.Array(p) ? p : d.slice(0);
                p = !1;
                var e = f;
                f = h.scrollPos();
                var i = f - e;
                0 !== i && (m = i > 0 ? "FORWARD" : a),
                m === a && t.reverse(),
                t.forEach(function(t) {
                    t.update(!0)
                })
            }
        }, S = function() {
            s = r.rAF(x)
        }, k = function(t) {
            "resize" == t.type && (_ = w(),
            m = l),
            !0 !== p && (p = !0,
            S())
        }, C = function() {
            if (!g && _ != w()) {
                var t;
                try {
                    t = new Event("resize",{
                        bubbles: !1,
                        cancelable: !1
                    })
                } catch (e) {
                    t = document.createEvent("Event"),
                    t.initEvent("resize", !1, !1)
                }
                u.container.dispatchEvent(t)
            }
            d.forEach(function(t) {
                t.refresh()
            }),
            y()
        };
        this._options = u;
        var P = function(t) {
            if (t.length <= 1)
                return t;
            var e = t.slice(0);
            return e.sort(function(t, e) {
                return t.scrollOffset() > e.scrollOffset() ? 1 : -1
            }),
            e
        };
        return this.addScene = function(e) {
            if (r.type.Array(e))
                e.forEach(function(t) {
                    h.addScene(t)
                });
            else if (e instanceof t.Scene)
                if (e.controller() !== h)
                    e.addTo(h);
                else if (d.indexOf(e) < 0) {
                    d.push(e),
                    d = P(d),
                    e.on("shift.controller_sort", function() {
                        d = P(d)
                    });
                    for (var i in u.globalSceneOptions)
                        e[i] && e[i].call(e, u.globalSceneOptions[i])
                }
            return h
        }
        ,
        this.removeScene = function(t) {
            if (r.type.Array(t))
                t.forEach(function(t) {
                    h.removeScene(t)
                });
            else {
                var e = d.indexOf(t);
                e > -1 && (t.off("shift.controller_sort"),
                d.splice(e, 1),
                t.remove())
            }
            return h
        }
        ,
        this.updateScene = function(e, i) {
            return r.type.Array(e) ? e.forEach(function(t) {
                h.updateScene(t, i)
            }) : i ? e.update(!0) : !0 !== p && e instanceof t.Scene && (p = p || [],
            -1 == p.indexOf(e) && p.push(e),
            p = P(p),
            S()),
            h
        }
        ,
        this.update = function(t) {
            return k({
                type: "resize"
            }),
            t && x(),
            h
        }
        ,
        this.scrollTo = function(i, n) {
            if (r.type.Number(i))
                T.call(u.container, i, n);
            else if (i instanceof t.Scene)
                i.controller() === h && h.scrollTo(i.scrollOffset(), n);
            else if (r.type.Function(i))
                T = i;
            else {
                var s = r.get.elements(i)[0];
                if (s) {
                    for (; s.parentNode.hasAttribute(e); )
                        s = s.parentNode;
                    var o = u.vertical ? "top" : "left"
                      , a = r.get.offset(u.container)
                      , l = r.get.offset(s);
                    g || (a[o] -= h.scrollPos()),
                    h.scrollTo(l[o] - a[o], n)
                }
            }
            return h
        }
        ,
        this.scrollPos = function(t) {
            return arguments.length ? (r.type.Function(t) && (b = t),
            h) : b.call(h)
        }
        ,
        this.info = function(t) {
            var e = {
                size: _,
                vertical: u.vertical,
                scrollPos: f,
                scrollDirection: m,
                container: u.container,
                isDocument: g
            };
            return arguments.length ? void 0 !== e[t] ? e[t] : void 0 : e
        }
        ,
        this.loglevel = function() {
            return h
        }
        ,
        this.enabled = function(t) {
            return arguments.length ? (v != t && (v = !!t,
            h.updateScene(d, !0)),
            h) : v
        }
        ,
        this.destroy = function(t) {
            window.clearTimeout(o);
            for (var e = d.length; e--; )
                d[e].destroy(t);
            return u.container.removeEventListener("resize", k),
            u.container.removeEventListener("scroll", k),
            r.cAF(s),
            null
        }
        ,
        function() {
            for (var t in u)
                c.hasOwnProperty(t) || delete u[t];
            if (u.container = r.get.elements(u.container)[0],
            !u.container)
                throw "ScrollMagic.Controller init failed.";
            g = u.container === window || u.container === document.body || !document.body.contains(u.container),
            g && (u.container = window),
            _ = w(),
            u.container.addEventListener("resize", k),
            u.container.addEventListener("scroll", k),
            u.refreshInterval = parseInt(u.refreshInterval) || c.refreshInterval,
            y()
        }(),
        h
    }
    ;
    var i = {
        defaults: {
            container: window,
            vertical: !0,
            globalSceneOptions: {},
            loglevel: 2,
            refreshInterval: 100
        }
    };
    t.Controller.addOption = function(t, e) {
        i.defaults[t] = e
    }
    ,
    t.Controller.extend = function(e) {
        var i = this;
        t.Controller = function() {
            return i.apply(this, arguments),
            this.$super = r.extend({}, this),
            e.apply(this, arguments) || this
        }
        ,
        r.extend(t.Controller, i),
        t.Controller.prototype = i.prototype,
        t.Controller.prototype.constructor = t.Controller
    }
    ,
    t.Scene = function(i) {
        var s, o, a = "BEFORE", l = "DURING", c = "AFTER", h = n.defaults, u = this, d = r.extend({}, h, i), p = a, f = 0, m = {
            start: 0,
            end: 0
        }, g = 0, _ = !0, v = {};
        this.on = function(t, e) {
            return r.type.Function(e) && (t = t.trim().split(" "),
            t.forEach(function(t) {
                var i = t.split(".")
                  , n = i[0]
                  , r = i[1];
                "*" != n && (v[n] || (v[n] = []),
                v[n].push({
                    namespace: r || "",
                    callback: e
                }))
            })),
            u
        }
        ,
        this.off = function(t, e) {
            return t ? (t = t.trim().split(" "),
            t.forEach(function(t) {
                var i = t.split(".")
                  , n = i[0]
                  , r = i[1] || "";
                ("*" === n ? Object.keys(v) : [n]).forEach(function(t) {
                    for (var i = v[t] || [], n = i.length; n--; ) {
                        var s = i[n];
                        !s || r !== s.namespace && "*" !== r || e && e != s.callback || i.splice(n, 1)
                    }
                    i.length || delete v[t]
                })
            }),
            u) : u
        }
        ,
        this.trigger = function(e, i) {
            if (e) {
                var n = e.trim().split(".")
                  , r = n[0]
                  , s = n[1]
                  , o = v[r];
                o && o.forEach(function(e) {
                    s && s !== e.namespace || e.callback.call(u, new t.Event(r,e.namespace,u,i))
                })
            }
            return u
        }
        ,
        u.on("change.internal", function(t) {
            "loglevel" !== t.what && "tweenChanges" !== t.what && ("triggerElement" === t.what ? w() : "reverse" === t.what && u.update())
        }).on("shift.internal", function() {
            y(),
            u.update()
        }),
        this.addTo = function(e) {
            return e instanceof t.Controller && o != e && (o && o.removeScene(u),
            o = e,
            S(),
            b(!0),
            w(!0),
            y(),
            o.info("container").addEventListener("resize", T),
            e.addScene(u),
            u.trigger("add", {
                controller: o
            }),
            u.update()),
            u
        }
        ,
        this.enabled = function(t) {
            return arguments.length ? (_ != t && (_ = !!t,
            u.update(!0)),
            u) : _
        }
        ,
        this.remove = function() {
            if (o) {
                o.info("container").removeEventListener("resize", T);
                var t = o;
                o = void 0,
                t.removeScene(u),
                u.trigger("remove")
            }
            return u
        }
        ,
        this.destroy = function(t) {
            return u.trigger("destroy", {
                reset: t
            }),
            u.remove(),
            u.off("*.*"),
            null
        }
        ,
        this.update = function(t) {
            if (o)
                if (t)
                    if (o.enabled() && _) {
                        var e, i = o.info("scrollPos");
                        e = d.duration > 0 ? (i - m.start) / (m.end - m.start) : i >= m.start ? 1 : 0,
                        u.trigger("update", {
                            startPos: m.start,
                            endPos: m.end,
                            scrollPos: i
                        }),
                        u.progress(e)
                    } else
                        P && p === l && O(!0);
                else
                    o.updateScene(u, !1);
            return u
        }
        ,
        this.refresh = function() {
            return b(),
            w(),
            u
        }
        ,
        this.progress = function(t) {
            if (arguments.length) {
                var e = !1
                  , i = p
                  , n = o ? o.info("scrollDirection") : "PAUSED"
                  , r = d.reverse || t >= f;
                if (0 === d.duration ? (e = f != t,
                f = 1 > t && r ? 0 : 1,
                p = 0 === f ? a : l) : 0 > t && p !== a && r ? (f = 0,
                p = a,
                e = !0) : t >= 0 && 1 > t && r ? (f = t,
                p = l,
                e = !0) : t >= 1 && p !== c ? (f = 1,
                p = c,
                e = !0) : p !== l || r || O(),
                e) {
                    var s = {
                        progress: f,
                        state: p,
                        scrollDirection: n
                    }
                      , h = p != i
                      , m = function(t) {
                        u.trigger(t, s)
                    };
                    h && i !== l && (m("enter"),
                    m(i === a ? "start" : "end")),
                    m("progress"),
                    h && p !== l && (m(p === a ? "start" : "end"),
                    m("leave"))
                }
                return u
            }
            return f
        }
        ;
        var y = function() {
            m = {
                start: g + d.offset
            },
            o && d.triggerElement && (m.start -= o.info("size") * d.triggerHook),
            m.end = m.start + d.duration
        }
          , b = function(t) {
            if (s) {
                var e = "duration";
                k(e, s.call(u)) && !t && (u.trigger("change", {
                    what: e,
                    newval: d[e]
                }),
                u.trigger("shift", {
                    reason: e
                }))
            }
        }
          , w = function(t) {
            var i = 0
              , n = d.triggerElement;
            if (o && n) {
                for (var s = o.info(), a = r.get.offset(s.container), l = s.vertical ? "top" : "left"; n.parentNode.hasAttribute(e); )
                    n = n.parentNode;
                var c = r.get.offset(n);
                s.isDocument || (a[l] -= o.scrollPos()),
                i = c[l] - a[l]
            }
            var h = i != g;
            g = i,
            h && !t && u.trigger("shift", {
                reason: "triggerElementPosition"
            })
        }
          , T = function() {
            d.triggerHook > 0 && u.trigger("shift", {
                reason: "containerResize"
            })
        }
          , x = r.extend(n.validate, {
            duration: function(t) {
                if (r.type.String(t) && t.match(/^(\.|\d)*\d+%$/)) {
                    var e = parseFloat(t) / 100;
                    t = function() {
                        return o ? o.info("size") * e : 0
                    }
                }
                if (r.type.Function(t)) {
                    s = t;
                    try {
                        t = parseFloat(s())
                    } catch (e) {
                        t = -1
                    }
                }
                if (t = parseFloat(t),
                !r.type.Number(t) || 0 > t)
                    throw s ? (s = void 0,
                    0) : 0;
                return t
            }
        })
          , S = function(t) {
            t = arguments.length ? [t] : Object.keys(x),
            t.forEach(function(t) {
                var e;
                if (x[t])
                    try {
                        e = x[t](d[t])
                    } catch (i) {
                        e = h[t]
                    } finally {
                        d[t] = e
                    }
            })
        }
          , k = function(t, e) {
            var i = !1
              , n = d[t];
            return d[t] != e && (d[t] = e,
            S(t),
            i = n != d[t]),
            i
        }
          , C = function(t) {
            u[t] || (u[t] = function(e) {
                return arguments.length ? ("duration" === t && (s = void 0),
                k(t, e) && (u.trigger("change", {
                    what: t,
                    newval: d[t]
                }),
                n.shifts.indexOf(t) > -1 && u.trigger("shift", {
                    reason: t
                })),
                u) : d[t]
            }
            )
        };
        this.controller = function() {
            return o
        }
        ,
        this.state = function() {
            return p
        }
        ,
        this.scrollOffset = function() {
            return m.start
        }
        ,
        this.triggerPosition = function() {
            var t = d.offset;
            return o && (t += d.triggerElement ? g : o.info("size") * u.triggerHook()),
            t
        }
        ;
        var P, A;
        u.on("shift.internal", function(t) {
            var e = "duration" === t.reason;
            (p === c && e || p === l && 0 === d.duration) && O(),
            e && E()
        }).on("progress.internal", function() {
            O()
        }).on("add.internal", function() {
            E()
        }).on("destroy.internal", function(t) {
            u.removePin(t.reset)
        });
        var O = function(t) {
            if (P && o) {
                var e = o.info()
                  , i = A.spacer.firstChild;
                if (t || p !== l) {
                    var n = {
                        position: A.inFlow ? "relative" : "absolute",
                        top: 0,
                        left: 0
                    }
                      , s = r.css(i, "position") != n.position;
                    A.pushFollowers ? d.duration > 0 && (p === c && 0 === parseFloat(r.css(A.spacer, "padding-top")) ? s = !0 : p === a && 0 === parseFloat(r.css(A.spacer, "padding-bottom")) && (s = !0)) : n[e.vertical ? "top" : "left"] = d.duration * f,
                    r.css(i, n),
                    s && E()
                } else {
                    "fixed" != r.css(i, "position") && (r.css(i, {
                        position: "fixed"
                    }),
                    E());
                    var h = r.get.offset(A.spacer, !0)
                      , u = d.reverse || 0 === d.duration ? e.scrollPos - m.start : Math.round(f * d.duration * 10) / 10;
                    h[e.vertical ? "top" : "left"] += u,
                    r.css(A.spacer.firstChild, {
                        top: h.top,
                        left: h.left
                    })
                }
            }
        }
          , E = function() {
            if (P && o && A.inFlow) {
                var t = p === l
                  , e = o.info("vertical")
                  , i = A.spacer.firstChild
                  , n = r.isMarginCollapseType(r.css(A.spacer, "display"))
                  , s = {};
                A.relSize.width || A.relSize.autoFullWidth ? t ? r.css(P, {
                    width: r.get.width(A.spacer)
                }) : r.css(P, {
                    width: "100%"
                }) : (s["min-width"] = r.get.width(e ? P : i, !0, !0),
                s.width = t ? s["min-width"] : "auto"),
                A.relSize.height ? t ? r.css(P, {
                    height: r.get.height(A.spacer) - (A.pushFollowers ? d.duration : 0)
                }) : r.css(P, {
                    height: "100%"
                }) : (s["min-height"] = r.get.height(e ? i : P, !0, !n),
                s.height = t ? s["min-height"] : "auto"),
                A.pushFollowers && (s["padding" + (e ? "Top" : "Left")] = d.duration * f,
                s["padding" + (e ? "Bottom" : "Right")] = d.duration * (1 - f)),
                r.css(A.spacer, s)
            }
        }
          , z = function() {
            o && P && p === l && !o.info("isDocument") && O()
        }
          , R = function() {
            o && P && p === l && ((A.relSize.width || A.relSize.autoFullWidth) && r.get.width(window) != r.get.width(A.spacer.parentNode) || A.relSize.height && r.get.height(window) != r.get.height(A.spacer.parentNode)) && E()
        }
          , M = function(t) {
            o && P && p === l && !o.info("isDocument") && (t.preventDefault(),
            o._setScrollPos(o.info("scrollPos") - ((t.wheelDelta || t[o.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -t.detail)))
        };
        this.setPin = function(t, i) {
            var n = {
                pushFollowers: !0,
                spacerClass: "scrollmagic-pin-spacer"
            };
            if (i = r.extend({}, n, i),
            !(t = r.get.elements(t)[0]))
                return u;
            if ("fixed" === r.css(t, "position"))
                return u;
            if (P) {
                if (P === t)
                    return u;
                u.removePin()
            }
            P = t;
            var s = P.parentNode.style.display
              , o = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            P.parentNode.style.display = "none";
            var a = "absolute" != r.css(P, "position")
              , l = r.css(P, o.concat(["display"]))
              , c = r.css(P, ["width", "height"]);
            P.parentNode.style.display = s,
            !a && i.pushFollowers && (i.pushFollowers = !1);
            var h = P.parentNode.insertBefore(document.createElement("div"), P)
              , d = r.extend(l, {
                position: a ? "relative" : "absolute",
                boxSizing: "content-box",
                mozBoxSizing: "content-box",
                webkitBoxSizing: "content-box"
            });
            if (a || r.extend(d, r.css(P, ["width", "height"])),
            r.css(h, d),
            h.setAttribute(e, ""),
            r.addClass(h, i.spacerClass),
            A = {
                spacer: h,
                relSize: {
                    width: "%" === c.width.slice(-1),
                    height: "%" === c.height.slice(-1),
                    autoFullWidth: "auto" === c.width && a && r.isMarginCollapseType(l.display)
                },
                pushFollowers: i.pushFollowers,
                inFlow: a
            },
            !P.___origStyle) {
                P.___origStyle = {};
                var p = P.style;
                o.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]).forEach(function(t) {
                    P.___origStyle[t] = p[t] || ""
                })
            }
            return A.relSize.width && r.css(h, {
                width: c.width
            }),
            A.relSize.height && r.css(h, {
                height: c.height
            }),
            h.appendChild(P),
            r.css(P, {
                position: a ? "relative" : "absolute",
                margin: "auto",
                top: "auto",
                left: "auto",
                bottom: "auto",
                right: "auto"
            }),
            (A.relSize.width || A.relSize.autoFullWidth) && r.css(P, {
                boxSizing: "border-box",
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box"
            }),
            window.addEventListener("scroll", z),
            window.addEventListener("resize", z),
            window.addEventListener("resize", R),
            P.addEventListener("mousewheel", M),
            P.addEventListener("DOMMouseScroll", M),
            O(),
            u
        }
        ,
        this.removePin = function(t) {
            if (P) {
                if (p === l && O(!0),
                t || !o) {
                    var i = A.spacer.firstChild;
                    if (i.hasAttribute(e)) {
                        var n = A.spacer.style
                          , s = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
                        margins = {},
                        s.forEach(function(t) {
                            margins[t] = n[t] || ""
                        }),
                        r.css(i, margins)
                    }
                    A.spacer.parentNode.insertBefore(i, A.spacer),
                    A.spacer.parentNode.removeChild(A.spacer),
                    P.parentNode.hasAttribute(e) || (r.css(P, P.___origStyle),
                    delete P.___origStyle)
                }
                window.removeEventListener("scroll", z),
                window.removeEventListener("resize", z),
                window.removeEventListener("resize", R),
                P.removeEventListener("mousewheel", M),
                P.removeEventListener("DOMMouseScroll", M),
                P = void 0
            }
            return u
        }
        ;
        var L, $ = [];
        return u.on("destroy.internal", function(t) {
            u.removeClassToggle(t.reset)
        }),
        this.setClassToggle = function(t, e) {
            var i = r.get.elements(t);
            return 0 !== i.length && r.type.String(e) ? ($.length > 0 && u.removeClassToggle(),
            L = e,
            $ = i,
            u.on("enter.internal_class leave.internal_class", function(t) {
                var e = "enter" === t.type ? r.addClass : r.removeClass;
                $.forEach(function(t) {
                    e(t, L)
                })
            }),
            u) : u
        }
        ,
        this.removeClassToggle = function(t) {
            return t && $.forEach(function(t) {
                r.removeClass(t, L)
            }),
            u.off("start.internal_class end.internal_class"),
            L = void 0,
            $ = [],
            u
        }
        ,
        function() {
            for (var t in d)
                h.hasOwnProperty(t) || delete d[t];
            for (var e in h)
                C(e);
            S()
        }(),
        u
    }
    ;
    var n = {
        defaults: {
            duration: 0,
            offset: 0,
            triggerElement: void 0,
            triggerHook: .5,
            reverse: !0,
            loglevel: 2
        },
        validate: {
            offset: function(t) {
                if (t = parseFloat(t),
                !r.type.Number(t))
                    throw 0;
                return t
            },
            triggerElement: function(t) {
                if (t = t || void 0) {
                    var e = r.get.elements(t)[0];
                    if (!e)
                        throw 0;
                    t = e
                }
                return t
            },
            triggerHook: function(t) {
                var e = {
                    onCenter: .5,
                    onEnter: 1,
                    onLeave: 0
                };
                if (r.type.Number(t))
                    t = Math.max(0, Math.min(parseFloat(t), 1));
                else {
                    if (!(t in e))
                        throw 0;
                    t = e[t]
                }
                return t
            },
            reverse: function(t) {
                return !!t
            }
        },
        shifts: ["duration", "offset", "triggerHook"]
    };
    t.Scene.addOption = function(t, e, i, r) {
        t in n.defaults || (n.defaults[t] = e,
        n.validate[t] = i,
        r && n.shifts.push(t))
    }
    ,
    t.Scene.extend = function(e) {
        var i = this;
        t.Scene = function() {
            return i.apply(this, arguments),
            this.$super = r.extend({}, this),
            e.apply(this, arguments) || this
        }
        ,
        r.extend(t.Scene, i),
        t.Scene.prototype = i.prototype,
        t.Scene.prototype.constructor = t.Scene
    }
    ,
    t.Event = function(t, e, i, n) {
        n = n || {};
        for (var r in n)
            this[r] = n[r];
        return this.type = t,
        this.target = this.currentTarget = i,
        this.namespace = e || "",
        this.timeStamp = this.timestamp = Date.now(),
        this
    }
    ;
    var r = t._util = function(t) {
        var e, i = {}, n = function(t) {
            return parseFloat(t) || 0
        }, r = function(e) {
            return e.currentStyle ? e.currentStyle : t.getComputedStyle(e)
        }, s = function(e, i, s, o) {
            if ((i = i === document ? t : i) === t)
                o = !1;
            else if (!u.DomElement(i))
                return 0;
            e = e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
            var a = (s ? i["offset" + e] || i["outer" + e] : i["client" + e] || i["inner" + e]) || 0;
            if (s && o) {
                var l = r(i);
                a += "Height" === e ? n(l.marginTop) + n(l.marginBottom) : n(l.marginLeft) + n(l.marginRight)
            }
            return a
        }, o = function(t) {
            return t.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function(t) {
                return t[1].toUpperCase()
            })
        };
        i.extend = function(t) {
            for (t = t || {},
            e = 1; e < arguments.length; e++)
                if (arguments[e])
                    for (var i in arguments[e])
                        arguments[e].hasOwnProperty(i) && (t[i] = arguments[e][i]);
            return t
        }
        ,
        i.isMarginCollapseType = function(t) {
            return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(t) > -1
        }
        ;
        var a = 0
          , l = ["ms", "moz", "webkit", "o"]
          , c = t.requestAnimationFrame
          , h = t.cancelAnimationFrame;
        for (e = 0; !c && e < l.length; ++e)
            c = t[l[e] + "RequestAnimationFrame"],
            h = t[l[e] + "CancelAnimationFrame"] || t[l[e] + "CancelRequestAnimationFrame"];
        c || (c = function(e) {
            var i = (new Date).getTime()
              , n = Math.max(0, 16 - (i - a))
              , r = t.setTimeout(function() {
                e(i + n)
            }, n);
            return a = i + n,
            r
        }
        ),
        h || (h = function(e) {
            t.clearTimeout(e)
        }
        ),
        i.rAF = c.bind(t),
        i.cAF = h.bind(t);
        var u = i.type = function(t) {
            return Object.prototype.toString.call(t).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
        }
        ;
        u.String = function(t) {
            return "string" === u(t)
        }
        ,
        u.Function = function(t) {
            return "function" === u(t)
        }
        ,
        u.Array = function(t) {
            return Array.isArray(t)
        }
        ,
        u.Number = function(t) {
            return !u.Array(t) && t - parseFloat(t) + 1 >= 0
        }
        ,
        u.DomElement = function(t) {
            return "object" == typeof HTMLElement ? t instanceof HTMLElement : t && "object" == typeof t && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName
        }
        ;
        var d = i.get = {};
        return d.elements = function(e) {
            var i = [];
            if (u.String(e))
                try {
                    e = document.querySelectorAll(e)
                } catch (t) {
                    return i
                }
            if ("nodelist" === u(e) || u.Array(e))
                for (var n = 0, r = i.length = e.length; r > n; n++) {
                    var s = e[n];
                    i[n] = u.DomElement(s) ? s : d.elements(s)
                }
            else
                (u.DomElement(e) || e === document || e === t) && (i = [e]);
            return i
        }
        ,
        d.scrollTop = function(e) {
            return e && "number" == typeof e.scrollTop ? e.scrollTop : t.pageYOffset || 0
        }
        ,
        d.scrollLeft = function(e) {
            return e && "number" == typeof e.scrollLeft ? e.scrollLeft : t.pageXOffset || 0
        }
        ,
        d.width = function(t, e, i) {
            return s("width", t, e, i)
        }
        ,
        d.height = function(t, e, i) {
            return s("height", t, e, i)
        }
        ,
        d.offset = function(t, e) {
            var i = {
                top: 0,
                left: 0
            };
            if (t && t.getBoundingClientRect) {
                var n = t.getBoundingClientRect();
                i.top = n.top,
                i.left = n.left,
                e || (i.top += d.scrollTop(),
                i.left += d.scrollLeft())
            }
            return i
        }
        ,
        i.addClass = function(t, e) {
            e && (t.classList ? t.classList.add(e) : t.className += " " + e)
        }
        ,
        i.removeClass = function(t, e) {
            e && (t.classList ? t.classList.remove(e) : t.className = t.className.replace(RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " "))
        }
        ,
        i.css = function(t, e) {
            if (u.String(e))
                return r(t)[o(e)];
            if (u.Array(e)) {
                var i = {}
                  , n = r(t);
                return e.forEach(function(t) {
                    i[t] = n[o(t)]
                }),
                i
            }
            for (var s in e) {
                var a = e[s];
                a == parseFloat(a) && (a += "px"),
                t.style[o(s)] = a
            }
        }
        ,
        i
    }(window || {});
    return t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["ScrollMagic"], e) : e("object" == typeof exports ? require("scrollmagic") : t.ScrollMagic || t.jQuery && t.jQuery.ScrollMagic)
}(this, function(t) {
    "use strict";
    var e = "0.85em"
      , i = "9999"
      , n = t._util
      , r = 0;
    t.Scene.extend(function() {
        var t, e = this;
        e.addIndicators = function(i) {
            if (!t) {
                var o = {
                    name: "",
                    indent: 0,
                    parent: void 0,
                    colorStart: "green",
                    colorEnd: "red",
                    colorTrigger: "blue"
                };
                i = n.extend({}, o, i),
                r++,
                t = new s(e,i),
                e.on("add.plugin_addIndicators", t.add),
                e.on("remove.plugin_addIndicators", t.remove),
                e.on("destroy.plugin_addIndicators", e.removeIndicators),
                e.controller() && t.add()
            }
            return e
        }
        ,
        e.removeIndicators = function() {
            return t && (t.remove(),
            this.off("*.plugin_addIndicators"),
            t = void 0),
            e
        }
    }),
    t.Controller.addOption("addIndicators", !1),
    t.Controller.extend(function() {
        var e = this
          , i = e.info()
          , r = i.container
          , s = i.isDocument
          , o = i.vertical
          , a = {
            groups: []
        };
        this._indicators = a;
        var l = function() {
            a.updateBoundsPositions()
        }
          , c = function() {
            a.updateTriggerGroupPositions()
        };
        return r.addEventListener("resize", c),
        s || (window.addEventListener("resize", c),
        window.addEventListener("scroll", c)),
        r.addEventListener("resize", l),
        r.addEventListener("scroll", l),
        this._indicators.updateBoundsPositions = function(t) {
            for (var e, i, s, l = t ? [n.extend({}, t.triggerGroup, {
                members: [t]
            })] : a.groups, c = l.length, h = {}, u = o ? "left" : "top", d = o ? "width" : "height", p = o ? n.get.scrollLeft(r) + n.get.width(r) - 15 : n.get.scrollTop(r) + n.get.height(r) - 15; c--; )
                for (s = l[c],
                e = s.members.length,
                i = n.get[d](s.element.firstChild); e--; )
                    h[u] = p - i,
                    n.css(s.members[e].bounds, h)
        }
        ,
        this._indicators.updateTriggerGroupPositions = function(t) {
            for (var i, l, c, h, u, d = t ? [t] : a.groups, p = d.length, f = s ? document.body : r, m = s ? {
                top: 0,
                left: 0
            } : n.get.offset(f, !0), g = o ? n.get.width(r) - 15 : n.get.height(r) - 15, _ = o ? "width" : "height", v = o ? "Y" : "X"; p--; )
                i = d[p],
                l = i.element,
                c = i.triggerHook * e.info("size"),
                h = n.get[_](l.firstChild.firstChild),
                u = c > h ? "translate" + v + "(-100%)" : "",
                n.css(l, {
                    top: m.top + (o ? c : g - i.members[0].options.indent),
                    left: m.left + (o ? g - i.members[0].options.indent : c)
                }),
                n.css(l.firstChild.firstChild, {
                    "-ms-transform": u,
                    "-webkit-transform": u,
                    transform: u
                })
        }
        ,
        this._indicators.updateTriggerGroupLabel = function(t) {
            var e = "trigger" + (t.members.length > 1 ? "" : " " + t.members[0].options.name)
              , i = t.element.firstChild.firstChild;
            i.textContent !== e && (i.textContent = e,
            o && a.updateBoundsPositions())
        }
        ,
        this.addScene = function(i) {
            this._options.addIndicators && i instanceof t.Scene && i.controller() === e && i.addIndicators(),
            this.$super.addScene.apply(this, arguments)
        }
        ,
        this.destroy = function() {
            r.removeEventListener("resize", c),
            s || (window.removeEventListener("resize", c),
            window.removeEventListener("scroll", c)),
            r.removeEventListener("resize", l),
            r.removeEventListener("scroll", l),
            this.$super.destroy.apply(this, arguments)
        }
        ,
        e
    });
    var s = function(t, e) {
        var i, s, a = this, l = o.bounds(), c = o.start(e.colorStart), h = o.end(e.colorEnd), u = e.parent && n.get.elements(e.parent)[0];
        e.name = e.name || r,
        c.firstChild.textContent += " " + e.name,
        h.textContent += " " + e.name,
        l.appendChild(c),
        l.appendChild(h),
        a.options = e,
        a.bounds = l,
        a.triggerGroup = void 0,
        this.add = function() {
            s = t.controller(),
            i = s.info("vertical");
            var e = s.info("isDocument");
            u || (u = e ? document.body : s.info("container")),
            e || "static" !== n.css(u, "position") || n.css(u, {
                position: "relative"
            }),
            t.on("change.plugin_addIndicators", p),
            t.on("shift.plugin_addIndicators", d),
            y(),
            g(),
            setTimeout(function() {
                s._indicators.updateBoundsPositions(a)
            }, 0)
        }
        ,
        this.remove = function() {
            if (a.triggerGroup) {
                if (t.off("change.plugin_addIndicators", p),
                t.off("shift.plugin_addIndicators", d),
                a.triggerGroup.members.length > 1) {
                    var e = a.triggerGroup;
                    e.members.splice(e.members.indexOf(a), 1),
                    s._indicators.updateTriggerGroupLabel(e),
                    s._indicators.updateTriggerGroupPositions(e),
                    a.triggerGroup = void 0
                } else
                    v();
                m()
            }
        }
        ;
        var d = function() {
            g()
        }
          , p = function(t) {
            "triggerHook" === t.what && y()
        }
          , f = function() {
            var t = s.info("vertical");
            n.css(c.firstChild, {
                "border-bottom-width": t ? 1 : 0,
                "border-right-width": t ? 0 : 1,
                bottom: t ? -1 : e.indent,
                right: t ? e.indent : -1,
                padding: t ? "0 8px" : "2px 4px"
            }),
            n.css(h, {
                "border-top-width": t ? 1 : 0,
                "border-left-width": t ? 0 : 1,
                top: t ? "100%" : "",
                right: t ? e.indent : "",
                bottom: t ? "" : e.indent,
                left: t ? "" : "100%",
                padding: t ? "0 8px" : "2px 4px"
            }),
            u.appendChild(l)
        }
          , m = function() {
            l.parentNode.removeChild(l)
        }
          , g = function() {
            l.parentNode !== u && f();
            var e = {};
            e[i ? "top" : "left"] = t.triggerPosition(),
            e[i ? "height" : "width"] = t.duration(),
            n.css(l, e),
            n.css(h, {
                display: t.duration() > 0 ? "" : "none"
            })
        }
          , _ = function() {
            var r = o.trigger(e.colorTrigger)
              , l = {};
            l[i ? "right" : "bottom"] = 0,
            l[i ? "border-top-width" : "border-left-width"] = 1,
            n.css(r.firstChild, l),
            n.css(r.firstChild.firstChild, {
                padding: i ? "0 8px 3px 8px" : "3px 4px"
            }),
            document.body.appendChild(r);
            var c = {
                triggerHook: t.triggerHook(),
                element: r,
                members: [a]
            };
            s._indicators.groups.push(c),
            a.triggerGroup = c,
            s._indicators.updateTriggerGroupLabel(c),
            s._indicators.updateTriggerGroupPositions(c)
        }
          , v = function() {
            s._indicators.groups.splice(s._indicators.groups.indexOf(a.triggerGroup), 1),
            a.triggerGroup.element.parentNode.removeChild(a.triggerGroup.element),
            a.triggerGroup = void 0
        }
          , y = function() {
            var e = t.triggerHook();
            if (!(a.triggerGroup && Math.abs(a.triggerGroup.triggerHook - e) < 1e-4)) {
                for (var i, n = s._indicators.groups, r = n.length; r--; )
                    if (i = n[r],
                    Math.abs(i.triggerHook - e) < 1e-4)
                        return a.triggerGroup && (1 === a.triggerGroup.members.length ? v() : (a.triggerGroup.members.splice(a.triggerGroup.members.indexOf(a), 1),
                        s._indicators.updateTriggerGroupLabel(a.triggerGroup),
                        s._indicators.updateTriggerGroupPositions(a.triggerGroup))),
                        i.members.push(a),
                        a.triggerGroup = i,
                        void s._indicators.updateTriggerGroupLabel(i);
                if (a.triggerGroup) {
                    if (1 === a.triggerGroup.members.length)
                        return a.triggerGroup.triggerHook = e,
                        void s._indicators.updateTriggerGroupPositions(a.triggerGroup);
                    a.triggerGroup.members.splice(a.triggerGroup.members.indexOf(a), 1),
                    s._indicators.updateTriggerGroupLabel(a.triggerGroup),
                    s._indicators.updateTriggerGroupPositions(a.triggerGroup),
                    a.triggerGroup = void 0
                }
                _()
            }
        }
    }
      , o = {
        start: function(t) {
            var e = document.createElement("div");
            e.textContent = "start",
            n.css(e, {
                position: "absolute",
                overflow: "visible",
                "border-width": 0,
                "border-style": "solid",
                color: t,
                "border-color": t
            });
            var i = document.createElement("div");
            return n.css(i, {
                position: "absolute",
                overflow: "visible",
                width: 0,
                height: 0
            }),
            i.appendChild(e),
            i
        },
        end: function(t) {
            var e = document.createElement("div");
            return e.textContent = "end",
            n.css(e, {
                position: "absolute",
                overflow: "visible",
                "border-width": 0,
                "border-style": "solid",
                color: t,
                "border-color": t
            }),
            e
        },
        bounds: function() {
            var t = document.createElement("div");
            return n.css(t, {
                position: "absolute",
                overflow: "visible",
                "white-space": "nowrap",
                "pointer-events": "none",
                "font-size": e
            }),
            t.style.zIndex = i,
            t
        },
        trigger: function(t) {
            var r = document.createElement("div");
            r.textContent = "trigger",
            n.css(r, {
                position: "relative"
            });
            var s = document.createElement("div");
            n.css(s, {
                position: "absolute",
                overflow: "visible",
                "border-width": 0,
                "border-style": "solid",
                color: t,
                "border-color": t
            }),
            s.appendChild(r);
            var o = document.createElement("div");
            return n.css(o, {
                position: "fixed",
                overflow: "visible",
                "white-space": "nowrap",
                "pointer-events": "none",
                "font-size": e
            }),
            o.style.zIndex = i,
            o.appendChild(s),
            o
        }
    }
}),
function(t, e, i, n) {
    function r(t, e) {
        return t[e] === n ? y[e] : t[e]
    }
    function s() {
        var t = e.pageYOffset;
        return t === n ? _.scrollTop : t
    }
    function o(t, e) {
        var i = y["on" + t];
        i && (T(i) ? i.call(e[0]) : (i.addClass && e.addClass(i.addClass),
        i.removeClass && e.removeClass(i.removeClass))),
        e.trigger("lazy" + t, [e]),
        h()
    }
    function a(e) {
        o(e.type, t(this).off(m, a))
    }
    function l(i) {
        if (k.length) {
            i = i || y.forceLoad,
            C = 1 / 0;
            var n, r, l = s(), c = e.innerHeight || _.clientHeight, h = e.innerWidth || _.clientWidth;
            for (n = 0,
            r = k.length; r > n; n++) {
                var u, d = k[n], g = d[0], v = d[p], b = !1, w = i || S(g, f) < 0;
                if (t.contains(_, g)) {
                    if (i || !v.visibleOnly || g.offsetWidth || g.offsetHeight) {
                        if (!w) {
                            var x = g.getBoundingClientRect()
                              , P = v.edgeX
                              , A = v.edgeY;
                            u = x.top + l - A - c,
                            w = l >= u && x.bottom > -A && x.left <= h + P && x.right > -P
                        }
                        if (w) {
                            d.on(m, a),
                            o("show", d);
                            var O = v.srcAttr
                              , E = T(O) ? O(d) : g.getAttribute(O);
                            E && (g.src = E),
                            b = !0
                        } else
                            C > u && (C = u)
                    }
                } else
                    b = !0;
                b && (S(g, f, 0),
                k.splice(n--, 1),
                r--)
            }
            r || o("complete", t(_))
        }
    }
    function c() {
        P > 1 ? (P = 1,
        l(),
        setTimeout(c, y.throttle)) : P = 0
    }
    function h(t) {
        k.length && (t && "scroll" === t.type && t.currentTarget === e && C >= s() || (P || setTimeout(c, 0),
        P = 2))
    }
    function u() {
        w.lazyLoadXT()
    }
    function d() {
        l(!0)
    }
    var p = "lazyLoadXT"
      , f = "lazied"
      , m = "load error"
      , g = "lazy-hidden"
      , _ = i.documentElement || i.body
      , v = e.onscroll === n || !!e.operamini || !_.getBoundingClientRect
      , y = {
        autoInit: !0,
        selector: "img[data-src]",
        blankImage: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        throttle: 99,
        forceLoad: v,
        loadEvent: "pageshow",
        updateEvent: "load orientationchange resize scroll touchmove focus",
        forceEvent: "lazyloadall",
        oninit: {
            removeClass: "lazy"
        },
        onshow: {
            addClass: g
        },
        onload: {
            removeClass: g,
            addClass: "lazy-loaded"
        },
        onerror: {
            removeClass: g
        },
        checkDuplicates: !0
    }
      , b = {
        srcAttr: "data-src",
        edgeX: 0,
        edgeY: 0,
        visibleOnly: !0
    }
      , w = t(e)
      , T = t.isFunction
      , x = t.extend
      , S = t.data || function(e, i) {
        return t(e).data(i)
    }
      , k = []
      , C = 0
      , P = 0;
    t[p] = x(y, b, t[p]),
    t.fn[p] = function(i) {
        i = i || {};
        var n, s = r(i, "blankImage"), a = r(i, "checkDuplicates"), l = r(i, "scrollContainer"), c = r(i, "show"), u = {};
        t(l).on("scroll", h);
        for (n in b)
            u[n] = r(i, n);
        return this.each(function(n, r) {
            if (r === e)
                t(y.selector).lazyLoadXT(i);
            else {
                var l = a && S(r, f)
                  , d = t(r).data(f, c ? -1 : 1);
                if (l)
                    return void h();
                s && "IMG" === r.tagName && !r.src && (r.src = s),
                d[p] = x({}, u),
                o("init", d),
                k.push(d),
                h()
            }
        })
    }
    ,
    t(i).ready(function() {
        o("start", w),
        w.on(y.updateEvent, h).on(y.forceEvent, d),
        t(i).on(y.updateEvent, h),
        y.autoInit && (w.on(y.loadEvent, u),
        u())
    })
}(window.jQuery || window.Zepto || window.$, window, document),
function(t) {
    var e = t.lazyLoadXT
      , i = e.bgAttr || "data-bg";
    e.selector += ",[" + i + "]",
    t(document).on("lazyshow", function(e) {
        var n = t(e.target)
          , r = n.attr(i);
        r && n.css("background-image", "url('" + r + "')").removeAttr(i).triggerHandler("load")
    })
}(window.jQuery || window.Zepto || window.$),
function(t) {
    var e = t.lazyLoadXT;
    e.selector += ",video,iframe[data-src]",
    e.videoPoster = "data-poster",
    t(document).on("lazyshow", "video", function(i, n) {
        var r = n.lazyLoadXT.srcAttr
          , s = t.isFunction(r)
          , o = !1;
        n.attr("poster", n.attr(e.videoPoster)),
        n.children("source,track").each(function(e, i) {
            var n = t(i)
              , a = s ? r(n) : n.attr(r);
            a && (n.attr("src", a),
            o = !0)
        }),
        o && this.load()
    })
}(window.jQuery || window.Zepto || window.$),
window.HTMLPictureElement || loadJS("https://afarkas.github.io/lazysizes/plugins/respimg/ls.respimg.min.js"),
function(t, e) {
    var i = function() {
        e(t.lazySizes),
        t.removeEventListener("lazyunveilread", i, !0)
    };
    e = e.bind(null, t, t.document),
    "object" == typeof module && module.exports ? e(require("lazysizes")) : t.lazySizes ? i() : t.addEventListener("lazyunveilread", i, !0)
}(window, function(t, e, i) {
    "use strict";
    if (t.addEventListener) {
        var n = i.cfg
          , r = /\s+/g
          , s = /\s*\|\s+|\s+\|\s*/g
          , o = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/
          , a = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/
          , l = /\(|\)|'/
          , c = {
            contain: 1,
            cover: 1
        }
          , h = function(t) {
            var e = i.gW(t, t.parentNode);
            return (!t._lazysizesWidth || e > t._lazysizesWidth) && (t._lazysizesWidth = e),
            t._lazysizesWidth
        }
          , u = function(t) {
            var e;
            return e = (getComputedStyle(t) || {
                getPropertyValue: function() {}
            }).getPropertyValue("background-size"),
            !c[e] && c[t.style.backgroundSize] && (e = t.style.backgroundSize),
            e
        }
          , d = function(t, e) {
            if (e) {
                var i = e.match(a);
                i && i[1] ? t.setAttribute("type", i[1]) : t.setAttribute("media", n.customMedia[e] || e)
            }
        }
          , p = function(t, i, a) {
            var l = e.createElement("picture")
              , c = i.getAttribute(n.sizesAttr)
              , h = i.getAttribute("data-ratio")
              , u = i.getAttribute("data-optimumx");
            i._lazybgset && i._lazybgset.parentNode == i && i.removeChild(i._lazybgset),
            Object.defineProperty(a, "_lazybgset", {
                value: i,
                writable: !0
            }),
            Object.defineProperty(i, "_lazybgset", {
                value: l,
                writable: !0
            }),
            t = t.replace(r, " ").split(s),
            l.style.display = "none",
            a.className = n.lazyClass,
            1 != t.length || c || (c = "auto"),
            t.forEach(function(t) {
                var i, r = e.createElement("source");
                c && "auto" != c && r.setAttribute("sizes", c),
                (i = t.match(o)) ? (r.setAttribute(n.srcsetAttr, i[1]),
                d(r, i[2]),
                d(r, i[3])) : r.setAttribute(n.srcsetAttr, t),
                l.appendChild(r)
            }),
            c && (a.setAttribute(n.sizesAttr, c),
            i.removeAttribute(n.sizesAttr),
            i.removeAttribute("sizes")),
            u && a.setAttribute("data-optimumx", u),
            h && a.setAttribute("data-ratio", h),
            l.appendChild(a),
            i.appendChild(l)
        }
          , f = function(t) {
            if (t.target._lazybgset) {
                var e = t.target
                  , n = e._lazybgset
                  , r = e.currentSrc || e.src;
                if (r) {
                    var s = i.fire(n, "bgsetproxy", {
                        src: r,
                        useSrc: l.test(r) ? JSON.stringify(r) : r
                    });
                    s.defaultPrevented || (n.style.backgroundImage = "url(" + s.detail.useSrc + ")")
                }
                e._lazybgsetLoading && (i.fire(n, "_lazyloaded", {}, !1, !0),
                delete e._lazybgsetLoading)
            }
        };
        addEventListener("lazybeforeunveil", function(t) {
            var n, r, s;
            !t.defaultPrevented && (n = t.target.getAttribute("data-bgset")) && (s = t.target,
            r = e.createElement("img"),
            r.alt = "",
            r._lazybgsetLoading = !0,
            t.detail.firesLoad = !0,
            p(n, s, r),
            setTimeout(function() {
                i.loader.unveil(r),
                i.rAF(function() {
                    i.fire(r, "_lazyloaded", {}, !0, !0),
                    r.complete && f({
                        target: r
                    })
                })
            }))
        }),
        e.addEventListener("load", f, !0),
        t.addEventListener("lazybeforesizes", function(t) {
            if (t.detail.instance == i && t.target._lazybgset && t.detail.dataAttr) {
                var e = t.target._lazybgset
                  , n = u(e);
                c[n] && (t.target._lazysizesParentFit = n,
                i.rAF(function() {
                    t.target.setAttribute("data-parent-fit", n),
                    t.target._lazysizesParentFit && delete t.target._lazysizesParentFit
                }))
            }
        }, !0),
        e.documentElement.addEventListener("lazybeforesizes", function(t) {
            !t.defaultPrevented && t.target._lazybgset && t.detail.instance == i && (t.detail.width = h(t.target._lazybgset))
        })
    }
}),
function(t, e) {
    var i = function(t, e) {
        "use strict";
        var i, n;
        if (function() {
            var e, i = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125
            };
            n = t.lazySizesConfig || t.lazysizesConfig || {};
            for (e in i)
                e in n || (n[e] = i[e])
        }(),
        !e || !e.getElementsByClassName)
            return {
                init: function() {},
                cfg: n,
                noSupport: !0
            };
        var r = e.documentElement
          , s = t.Date
          , o = t.HTMLPictureElement
          , a = "addEventListener"
          , l = "getAttribute"
          , c = t[a]
          , h = t.setTimeout
          , u = t.requestAnimationFrame || h
          , d = t.requestIdleCallback
          , p = /^picture$/i
          , f = ["load", "error", "lazyincluded", "_lazyloaded"]
          , m = {}
          , g = Array.prototype.forEach
          , _ = function(t, e) {
            return m[e] || (m[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")),
            m[e].test(t[l]("class") || "") && m[e]
        }
          , v = function(t, e) {
            _(t, e) || t.setAttribute("class", (t[l]("class") || "").trim() + " " + e)
        }
          , y = function(t, e) {
            var i;
            (i = _(t, e)) && t.setAttribute("class", (t[l]("class") || "").replace(i, " "))
        }
          , b = function(t, e, i) {
            var n = i ? a : "removeEventListener";
            i && b(t, e),
            f.forEach(function(i) {
                t[n](i, e)
            })
        }
          , w = function(t, n, r, s, o) {
            var a = e.createEvent("Event");
            return r || (r = {}),
            r.instance = i,
            a.initEvent(n, !s, !o),
            a.detail = r,
            t.dispatchEvent(a),
            a
        }
          , T = function(e, i) {
            var r;
            !o && (r = t.picturefill || n.pf) ? (i && i.src && !e[l]("srcset") && e.setAttribute("srcset", i.src),
            r({
                reevaluate: !0,
                elements: [e]
            })) : i && i.src && (e.src = i.src)
        }
          , x = function(t, e) {
            return (getComputedStyle(t, null) || {})[e]
        }
          , S = function(t, e, i) {
            for (i = i || t.offsetWidth; i < n.minSize && e && !t._lazysizesWidth; )
                i = e.offsetWidth,
                e = e.parentNode;
            return i
        }
          , k = function() {
            var t, i, n = [], r = [], s = n, o = function() {
                var e = s;
                for (s = n.length ? r : n,
                t = !0,
                i = !1; e.length; )
                    e.shift()();
                t = !1
            }, a = function(n, r) {
                t && !r ? n.apply(this, arguments) : (s.push(n),
                i || (i = !0,
                (e.hidden ? h : u)(o)))
            };
            return a._lsFlush = o,
            a
        }()
          , C = function(t, e) {
            return e ? function() {
                k(t)
            }
            : function() {
                var e = this
                  , i = arguments;
                k(function() {
                    t.apply(e, i)
                })
            }
        }
          , P = function(t) {
            var e, i = 0, r = n.throttleDelay, o = n.ricTimeout, a = function() {
                e = !1,
                i = s.now(),
                t()
            }, l = d && o > 49 ? function() {
                d(a, {
                    timeout: o
                }),
                o !== n.ricTimeout && (o = n.ricTimeout)
            }
            : C(function() {
                h(a)
            }, !0);
            return function(t) {
                var n;
                (t = !0 === t) && (o = 33),
                e || (e = !0,
                n = r - (s.now() - i),
                n < 0 && (n = 0),
                t || n < 9 ? l() : h(l, n))
            }
        }
          , A = function(t) {
            var e, i, n = function() {
                e = null,
                t()
            }, r = function() {
                var t = s.now() - i;
                t < 99 ? h(r, 99 - t) : (d || n)(n)
            };
            return function() {
                i = s.now(),
                e || (e = h(r, 99))
            }
        }
          , O = function() {
            var o, u, d, f, m, S, O, z, R, M, L, $, D = /^img$/i, X = /^iframe$/i, I = "onscroll"in t && !/(gle|ing)bot/.test(navigator.userAgent), F = 0, Y = 0, H = -1, N = function(t) {
                Y--,
                (!t || Y < 0 || !t.target) && (Y = 0)
            }, W = function(t) {
                return null == $ && ($ = "hidden" == x(e.body, "visibility")),
                $ || "hidden" != x(t.parentNode, "visibility") && "hidden" != x(t, "visibility")
            }, j = function(t, i) {
                var n, s = t, o = W(t);
                for (z -= i,
                L += i,
                R -= i,
                M += i; o && (s = s.offsetParent) && s != e.body && s != r; )
                    (o = (x(s, "opacity") || 1) > 0) && "visible" != x(s, "overflow") && (n = s.getBoundingClientRect(),
                    o = M > n.left && R < n.right && L > n.top - 1 && z < n.bottom + 1);
                return o
            }, B = function() {
                var t, s, a, c, h, d, p, m, g, _, v, y, b = i.elements;
                if ((f = n.loadMode) && Y < 8 && (t = b.length)) {
                    for (s = 0,
                    H++; s < t; s++)
                        if (b[s] && !b[s]._lazyRace)
                            if (!I || i.prematureUnveil && i.prematureUnveil(b[s]))
                                J(b[s]);
                            else if ((m = b[s][l]("data-expand")) && (d = 1 * m) || (d = F),
                            _ || (_ = !n.expand || n.expand < 1 ? r.clientHeight > 500 && r.clientWidth > 500 ? 500 : 370 : n.expand,
                            i._defEx = _,
                            v = _ * n.expFactor,
                            y = n.hFac,
                            $ = null,
                            F < v && Y < 1 && H > 2 && f > 2 && !e.hidden ? (F = v,
                            H = 0) : F = f > 1 && H > 1 && Y < 6 ? _ : 0),
                            g !== d && (S = innerWidth + d * y,
                            O = innerHeight + d,
                            p = -1 * d,
                            g = d),
                            a = b[s].getBoundingClientRect(),
                            (L = a.bottom) >= p && (z = a.top) <= O && (M = a.right) >= p * y && (R = a.left) <= S && (L || M || R || z) && (n.loadHidden || W(b[s])) && (u && Y < 3 && !m && (f < 3 || H < 4) || j(b[s], d))) {
                                if (J(b[s]),
                                h = !0,
                                Y > 9)
                                    break
                            } else
                                !h && u && !c && Y < 4 && H < 4 && f > 2 && (o[0] || n.preloadAfterLoad) && (o[0] || !m && (L || M || R || z || "auto" != b[s][l](n.sizesAttr))) && (c = o[0] || b[s]);
                    c && !h && J(c)
                }
            }, q = P(B), U = function(t) {
                var e = t.target;
                if (e._lazyCache)
                    return void delete e._lazyCache;
                N(t),
                v(e, n.loadedClass),
                y(e, n.loadingClass),
                b(e, V),
                w(e, "lazyloaded")
            }, G = C(U), V = function(t) {
                G({
                    target: t.target
                })
            }, Z = function(t, e) {
                try {
                    t.contentWindow.location.replace(e)
                } catch (i) {
                    t.src = e
                }
            }, Q = function(t) {
                var e, i = t[l](n.srcsetAttr);
                (e = n.customMedia[t[l]("data-media") || t[l]("media")]) && t.setAttribute("media", e),
                i && t.setAttribute("srcset", i)
            }, K = C(function(t, e, i, r, s) {
                var o, a, c, u, f, m;
                (f = w(t, "lazybeforeunveil", e)).defaultPrevented || (r && (i ? v(t, n.autosizesClass) : t.setAttribute("sizes", r)),
                a = t[l](n.srcsetAttr),
                o = t[l](n.srcAttr),
                s && (c = t.parentNode,
                u = c && p.test(c.nodeName || "")),
                m = e.firesLoad || "src"in t && (a || o || u),
                f = {
                    target: t
                },
                v(t, n.loadingClass),
                m && (clearTimeout(d),
                d = h(N, 2500),
                b(t, V, !0)),
                u && g.call(c.getElementsByTagName("source"), Q),
                a ? t.setAttribute("srcset", a) : o && !u && (X.test(t.nodeName) ? Z(t, o) : t.src = o),
                s && (a || u) && T(t, {
                    src: o
                })),
                t._lazyRace && delete t._lazyRace,
                y(t, n.lazyClass),
                k(function() {
                    var e = t.complete && t.naturalWidth > 1;
                    m && !e || (e && v(t, "ls-is-cached"),
                    U(f),
                    t._lazyCache = !0,
                    h(function() {
                        "_lazyCache"in t && delete t._lazyCache
                    }, 9)),
                    "lazy" == t.loading && Y--
                }, !0)
            }), J = function(t) {
                if (!t._lazyRace) {
                    var e, i = D.test(t.nodeName), r = i && (t[l](n.sizesAttr) || t[l]("sizes")), s = "auto" == r;
                    (!s && u || !i || !t[l]("src") && !t.srcset || t.complete || _(t, n.errorClass) || !_(t, n.lazyClass)) && (e = w(t, "lazyunveilread").detail,
                    s && E.updateElem(t, !0, t.offsetWidth),
                    t._lazyRace = !0,
                    Y++,
                    K(t, e, s, r, i))
                }
            }, tt = A(function() {
                n.loadMode = 3,
                q()
            }), et = function() {
                3 == n.loadMode && (n.loadMode = 2),
                tt()
            }, it = function() {
                if (!u) {
                    if (s.now() - m < 999)
                        return void h(it, 999);
                    u = !0,
                    n.loadMode = 3,
                    q(),
                    c("scroll", et, !0)
                }
            };
            return {
                _: function() {
                    m = s.now(),
                    i.elements = e.getElementsByClassName(n.lazyClass),
                    o = e.getElementsByClassName(n.lazyClass + " " + n.preloadClass),
                    c("scroll", q, !0),
                    c("resize", q, !0),
                    t.MutationObserver ? new MutationObserver(q).observe(r, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    }) : (r[a]("DOMNodeInserted", q, !0),
                    r[a]("DOMAttrModified", q, !0),
                    setInterval(q, 999)),
                    c("hashchange", q, !0),
                    ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(t) {
                        e[a](t, q, !0)
                    }),
                    /d$|^c/.test(e.readyState) ? it() : (c("load", it),
                    e[a]("DOMContentLoaded", q),
                    h(it, 2e4)),
                    i.elements.length ? (B(),
                    k._lsFlush()) : q()
                },
                checkElems: q,
                unveil: J,
                _aLSL: et
            }
        }()
          , E = function() {
            var t, i = C(function(t, e, i, n) {
                var r, s, o;
                if (t._lazysizesWidth = n,
                n += "px",
                t.setAttribute("sizes", n),
                p.test(e.nodeName || ""))
                    for (r = e.getElementsByTagName("source"),
                    s = 0,
                    o = r.length; s < o; s++)
                        r[s].setAttribute("sizes", n);
                i.detail.dataAttr || T(t, i.detail)
            }), r = function(t, e, n) {
                var r, s = t.parentNode;
                s && (n = S(t, s, n),
                r = w(t, "lazybeforesizes", {
                    width: n,
                    dataAttr: !!e
                }),
                r.defaultPrevented || (n = r.detail.width) && n !== t._lazysizesWidth && i(t, s, r, n))
            }, s = function() {
                var e, i = t.length;
                if (i)
                    for (e = 0; e < i; e++)
                        r(t[e])
            }, o = A(s);
            return {
                _: function() {
                    t = e.getElementsByClassName(n.autosizesClass),
                    c("resize", o)
                },
                checkElems: o,
                updateElem: r
            }
        }()
          , z = function() {
            !z.i && e.getElementsByClassName && (z.i = !0,
            E._(),
            O._())
        };
        return h(function() {
            n.init && z()
        }),
        i = {
            cfg: n,
            autoSizer: E,
            loader: O,
            init: z,
            uP: T,
            aC: v,
            rC: y,
            hC: _,
            fire: w,
            gW: S,
            rAF: k
        }
    }(t, t.document);
    t.lazySizes = i,
    "object" == typeof module && module.exports && (module.exports = i)
}("undefined" != typeof window ? window : {}),
function(t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.Rellax = e()
}("undefined" != typeof window ? window : global, function() {
    var t = function(e, i) {
        var n = Object.create(t.prototype)
          , r = 0
          , s = 0
          , o = 0
          , a = 0
          , l = []
          , c = !0
          , h = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(t) {
            return setTimeout(t, 1e3 / 60)
        }
          , u = null
          , d = window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout
          , p = window.transformProp || function() {
            var t = document.createElement("div");
            if (null === t.style.transform) {
                var e, i = ["Webkit", "Moz", "ms"];
                for (e in i)
                    if (void 0 !== t.style[i[e] + "Transform"])
                        return i[e] + "Transform"
            }
            return "transform"
        }();
        n.options = {
            speed: -2,
            center: !1,
            wrapper: null,
            relativeToWrapper: !1,
            round: !0,
            vertical: !0,
            horizontal: !1,
            callback: function() {}
        },
        i && Object.keys(i).forEach(function(t) {
            n.options[t] = i[t]
        }),
        e || (e = ".rellax");
        var f = "string" == typeof e ? document.querySelectorAll(e) : [e];
        if (!(0 < f.length))
            throw Error("The elements you're trying to select don't exist.");
        if (n.elems = f,
        n.options.wrapper && !n.options.wrapper.nodeType) {
            if (!(f = document.querySelector(n.options.wrapper)))
                throw Error("The wrapper you're trying to use don't exist.");
            n.options.wrapper = f
        }
        var m = function() {
            for (var t = 0; t < l.length; t++)
                n.elems[t].style.cssText = l[t].style;
            for (l = [],
            s = window.innerHeight,
            a = window.innerWidth,
            g(),
            t = 0; t < n.elems.length; t++) {
                var e = n.elems[t]
                  , i = e.getAttribute("data-rellax-percentage")
                  , r = e.getAttribute("data-rellax-speed")
                  , o = e.getAttribute("data-rellax-zindex") || 0
                  , h = e.getAttribute("data-rellax-min")
                  , u = e.getAttribute("data-rellax-max")
                  , d = n.options.wrapper ? n.options.wrapper.scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                n.options.relativeToWrapper && (d = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) - n.options.wrapper.offsetTop);
                var p = n.options.vertical && (i || n.options.center) ? d : 0
                  , f = n.options.horizontal && (i || n.options.center) ? window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft : 0;
                d = p + e.getBoundingClientRect().top;
                var v = e.clientHeight || e.offsetHeight || e.scrollHeight
                  , b = f + e.getBoundingClientRect().left
                  , w = e.clientWidth || e.offsetWidth || e.scrollWidth;
                p = i || (p - d + s) / (v + s),
                i = i || (f - b + a) / (w + a),
                n.options.center && (p = i = .5),
                r = r || n.options.speed,
                i = _(i, p, r),
                e = e.style.cssText,
                p = "",
                0 <= e.indexOf("transform") && (p = e.indexOf("transform"),
                p = e.slice(p),
                p = (f = p.indexOf(";")) ? " " + p.slice(11, f).replace(/\s/g, "") : " " + p.slice(11).replace(/\s/g, "")),
                l.push({
                    baseX: i.x,
                    baseY: i.y,
                    top: d,
                    left: b,
                    height: v,
                    width: w,
                    speed: r,
                    style: e,
                    transform: p,
                    zindex: o,
                    min: h,
                    max: u
                })
            }
            c && (window.addEventListener("resize", m),
            c = !1),
            y()
        }
          , g = function() {
            var t = r
              , e = o;
            return r = n.options.wrapper ? n.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset,
            o = n.options.wrapper ? n.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset,
            n.options.relativeToWrapper && (r = ((document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset) - n.options.wrapper.offsetTop),
            !!(t != r && n.options.vertical || e != o && n.options.horizontal)
        }
          , _ = function(t, e, i) {
            var r = {};
            return t = 100 * i * (1 - t),
            e = 100 * i * (1 - e),
            r.x = n.options.round ? Math.round(t) : Math.round(100 * t) / 100,
            r.y = n.options.round ? Math.round(e) : Math.round(100 * e) / 100,
            r
        }
          , v = function() {
            g() && !1 === c && y(),
            u = h(v)
        }
          , y = function() {
            for (var t, e = 0; e < n.elems.length; e++) {
                t = _((o - l[e].left + a) / (l[e].width + a), (r - l[e].top + s) / (l[e].height + s), l[e].speed);
                var i = t.y - l[e].baseY
                  , c = t.x - l[e].baseX;
                null !== l[e].min && (n.options.vertical && !n.options.horizontal && (i = i <= l[e].min ? l[e].min : i),
                n.options.horizontal && !n.options.vertical && (c = c <= l[e].min ? l[e].min : c)),
                null !== l[e].max && (n.options.vertical && !n.options.horizontal && (i = i >= l[e].max ? l[e].max : i),
                n.options.horizontal && !n.options.vertical && (c = c >= l[e].max ? l[e].max : c)),
                n.elems[e].style[p] = "translate3d(" + (n.options.horizontal ? c : "0") + "px," + (n.options.vertical ? i : "0") + "px," + l[e].zindex + "px) " + l[e].transform
            }
            n.options.callback(t)
        };
        return n.destroy = function() {
            for (var t = 0; t < n.elems.length; t++)
                n.elems[t].style.cssText = l[t].style;
            c || (window.removeEventListener("resize", m),
            c = !0),
            d(u),
            u = null
        }
        ,
        m(),
        v(),
        n.refresh = m,
        n
    };
    return t
}),
function(t, e, i, n) {
    "use strict";
    function r(t, e, i) {
        return setTimeout(c(t, i), e)
    }
    function s(t, e, i) {
        return !!Array.isArray(t) && (o(t, i[e], i),
        !0)
    }
    function o(t, e, i) {
        var r;
        if (t)
            if (t.forEach)
                t.forEach(e, i);
            else if (t.length !== n)
                for (r = 0; r < t.length; )
                    e.call(i, t[r], r, t),
                    r++;
            else
                for (r in t)
                    t.hasOwnProperty(r) && e.call(i, t[r], r, t)
    }
    function a(e, i, n) {
        var r = "DEPRECATED METHOD: " + i + "\n" + n + " AT \n";
        return function() {
            var i = new Error("get-stack-trace")
              , n = i && i.stack ? i.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace"
              , s = t.console && (t.console.warn || t.console.log);
            return s && s.call(t.console, r, n),
            e.apply(this, arguments)
        }
    }
    function l(t, e, i) {
        var n, r = e.prototype;
        n = t.prototype = Object.create(r),
        n.constructor = t,
        n._super = r,
        i && ht(n, i)
    }
    function c(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    function h(t, e) {
        return typeof t == pt ? t.apply(e ? e[0] || n : n, e) : t
    }
    function u(t, e) {
        return t === n ? e : t
    }
    function d(t, e, i) {
        o(g(e), function(e) {
            t.addEventListener(e, i, !1)
        })
    }
    function p(t, e, i) {
        o(g(e), function(e) {
            t.removeEventListener(e, i, !1)
        })
    }
    function f(t, e) {
        for (; t; ) {
            if (t == e)
                return !0;
            t = t.parentNode
        }
        return !1
    }
    function m(t, e) {
        return t.indexOf(e) > -1
    }
    function g(t) {
        return t.trim().split(/\s+/g)
    }
    function _(t, e, i) {
        if (t.indexOf && !i)
            return t.indexOf(e);
        for (var n = 0; n < t.length; ) {
            if (i && t[n][i] == e || !i && t[n] === e)
                return n;
            n++
        }
        return -1
    }
    function v(t) {
        return Array.prototype.slice.call(t, 0)
    }
    function y(t, e, i) {
        for (var n = [], r = [], s = 0; s < t.length; ) {
            var o = e ? t[s][e] : t[s];
            _(r, o) < 0 && n.push(t[s]),
            r[s] = o,
            s++
        }
        return i && (n = e ? n.sort(function(t, i) {
            return t[e] > i[e]
        }) : n.sort()),
        n
    }
    function b(t, e) {
        for (var i, r, s = e[0].toUpperCase() + e.slice(1), o = 0; o < ut.length; ) {
            if (i = ut[o],
            (r = i ? i + s : e)in t)
                return r;
            o++
        }
        return n
    }
    function w() {
        return yt++
    }
    function T(e) {
        var i = e.ownerDocument || e;
        return i.defaultView || i.parentWindow || t
    }
    function x(t, e) {
        var i = this;
        this.manager = t,
        this.callback = e,
        this.element = t.element,
        this.target = t.options.inputTarget,
        this.domHandler = function(e) {
            h(t.options.enable, [t]) && i.handler(e)
        }
        ,
        this.init()
    }
    function S(t) {
        var e = t.options.inputClass;
        return new (e || (Tt ? I : xt ? H : wt ? W : X))(t,k)
    }
    function k(t, e, i) {
        var n = i.pointers.length
          , r = i.changedPointers.length
          , s = e & Pt && n - r == 0
          , o = e & (Ot | Et) && n - r == 0;
        i.isFirst = !!s,
        i.isFinal = !!o,
        s && (t.session = {}),
        i.eventType = e,
        C(t, i),
        t.emit("hammer.input", i),
        t.recognize(i),
        t.session.prevInput = i
    }
    function C(t, e) {
        var i = t.session
          , n = e.pointers
          , r = n.length;
        i.firstInput || (i.firstInput = O(e)),
        r > 1 && !i.firstMultiple ? i.firstMultiple = O(e) : 1 === r && (i.firstMultiple = !1);
        var s = i.firstInput
          , o = i.firstMultiple
          , a = o ? o.center : s.center
          , l = e.center = E(n);
        e.timeStamp = gt(),
        e.deltaTime = e.timeStamp - s.timeStamp,
        e.angle = L(a, l),
        e.distance = M(a, l),
        P(i, e),
        e.offsetDirection = R(e.deltaX, e.deltaY);
        var c = z(e.deltaTime, e.deltaX, e.deltaY);
        e.overallVelocityX = c.x,
        e.overallVelocityY = c.y,
        e.overallVelocity = mt(c.x) > mt(c.y) ? c.x : c.y,
        e.scale = o ? D(o.pointers, n) : 1,
        e.rotation = o ? $(o.pointers, n) : 0,
        e.maxPointers = i.prevInput ? e.pointers.length > i.prevInput.maxPointers ? e.pointers.length : i.prevInput.maxPointers : e.pointers.length,
        A(i, e);
        var h = t.element;
        f(e.srcEvent.target, h) && (h = e.srcEvent.target),
        e.target = h
    }
    function P(t, e) {
        var i = e.center
          , n = t.offsetDelta || {}
          , r = t.prevDelta || {}
          , s = t.prevInput || {};
        e.eventType !== Pt && s.eventType !== Ot || (r = t.prevDelta = {
            x: s.deltaX || 0,
            y: s.deltaY || 0
        },
        n = t.offsetDelta = {
            x: i.x,
            y: i.y
        }),
        e.deltaX = r.x + (i.x - n.x),
        e.deltaY = r.y + (i.y - n.y)
    }
    function A(t, e) {
        var i, r, s, o, a = t.lastInterval || e, l = e.timeStamp - a.timeStamp;
        if (e.eventType != Et && (l > Ct || a.velocity === n)) {
            var c = e.deltaX - a.deltaX
              , h = e.deltaY - a.deltaY
              , u = z(l, c, h);
            r = u.x,
            s = u.y,
            i = mt(u.x) > mt(u.y) ? u.x : u.y,
            o = R(c, h),
            t.lastInterval = e
        } else
            i = a.velocity,
            r = a.velocityX,
            s = a.velocityY,
            o = a.direction;
        e.velocity = i,
        e.velocityX = r,
        e.velocityY = s,
        e.direction = o
    }
    function O(t) {
        for (var e = [], i = 0; i < t.pointers.length; )
            e[i] = {
                clientX: ft(t.pointers[i].clientX),
                clientY: ft(t.pointers[i].clientY)
            },
            i++;
        return {
            timeStamp: gt(),
            pointers: e,
            center: E(e),
            deltaX: t.deltaX,
            deltaY: t.deltaY
        }
    }
    function E(t) {
        var e = t.length;
        if (1 === e)
            return {
                x: ft(t[0].clientX),
                y: ft(t[0].clientY)
            };
        for (var i = 0, n = 0, r = 0; e > r; )
            i += t[r].clientX,
            n += t[r].clientY,
            r++;
        return {
            x: ft(i / e),
            y: ft(n / e)
        }
    }
    function z(t, e, i) {
        return {
            x: e / t || 0,
            y: i / t || 0
        }
    }
    function R(t, e) {
        return t === e ? zt : mt(t) >= mt(e) ? 0 > t ? Rt : Mt : 0 > e ? Lt : $t
    }
    function M(t, e, i) {
        i || (i = Ft);
        var n = e[i[0]] - t[i[0]]
          , r = e[i[1]] - t[i[1]];
        return Math.sqrt(n * n + r * r)
    }
    function L(t, e, i) {
        i || (i = Ft);
        var n = e[i[0]] - t[i[0]]
          , r = e[i[1]] - t[i[1]];
        return 180 * Math.atan2(r, n) / Math.PI
    }
    function $(t, e) {
        return L(e[1], e[0], Yt) + L(t[1], t[0], Yt)
    }
    function D(t, e) {
        return M(e[0], e[1], Yt) / M(t[0], t[1], Yt)
    }
    function X() {
        this.evEl = Nt,
        this.evWin = Wt,
        this.pressed = !1,
        x.apply(this, arguments)
    }
    function I() {
        this.evEl = qt,
        this.evWin = Ut,
        x.apply(this, arguments),
        this.store = this.manager.session.pointerEvents = []
    }
    function F() {
        this.evTarget = Vt,
        this.evWin = Zt,
        this.started = !1,
        x.apply(this, arguments)
    }
    function Y(t, e) {
        var i = v(t.touches)
          , n = v(t.changedTouches);
        return e & (Ot | Et) && (i = y(i.concat(n), "identifier", !0)),
        [i, n]
    }
    function H() {
        this.evTarget = Kt,
        this.targetIds = {},
        x.apply(this, arguments)
    }
    function N(t, e) {
        var i = v(t.touches)
          , n = this.targetIds;
        if (e & (Pt | At) && 1 === i.length)
            return n[i[0].identifier] = !0,
            [i, i];
        var r, s, o = v(t.changedTouches), a = [], l = this.target;
        if (s = i.filter(function(t) {
            return f(t.target, l)
        }),
        e === Pt)
            for (r = 0; r < s.length; )
                n[s[r].identifier] = !0,
                r++;
        for (r = 0; r < o.length; )
            n[o[r].identifier] && a.push(o[r]),
            e & (Ot | Et) && delete n[o[r].identifier],
            r++;
        return a.length ? [y(s.concat(a), "identifier", !0), a] : void 0
    }
    function W() {
        x.apply(this, arguments);
        var t = c(this.handler, this);
        this.touch = new H(this.manager,t),
        this.mouse = new X(this.manager,t),
        this.primaryTouch = null,
        this.lastTouches = []
    }
    function j(t, e) {
        t & Pt ? (this.primaryTouch = e.changedPointers[0].identifier,
        B.call(this, e)) : t & (Ot | Et) && B.call(this, e)
    }
    function B(t) {
        var e = t.changedPointers[0];
        if (e.identifier === this.primaryTouch) {
            var i = {
                x: e.clientX,
                y: e.clientY
            };
            this.lastTouches.push(i);
            var n = this.lastTouches
              , r = function() {
                var t = n.indexOf(i);
                t > -1 && n.splice(t, 1)
            };
            setTimeout(r, Jt)
        }
    }
    function q(t) {
        for (var e = t.srcEvent.clientX, i = t.srcEvent.clientY, n = 0; n < this.lastTouches.length; n++) {
            var r = this.lastTouches[n]
              , s = Math.abs(e - r.x)
              , o = Math.abs(i - r.y);
            if (te >= s && te >= o)
                return !0
        }
        return !1
    }
    function U(t, e) {
        this.manager = t,
        this.set(e)
    }
    function G(t) {
        if (m(t, oe))
            return oe;
        var e = m(t, ae)
          , i = m(t, le);
        return e && i ? oe : e || i ? e ? ae : le : m(t, se) ? se : re
    }
    function V(t) {
        this.options = ht({}, this.defaults, t || {}),
        this.id = w(),
        this.manager = null,
        this.options.enable = u(this.options.enable, !0),
        this.state = he,
        this.simultaneous = {},
        this.requireFail = []
    }
    function Z(t) {
        return t & me ? "cancel" : t & pe ? "end" : t & de ? "move" : t & ue ? "start" : ""
    }
    function Q(t) {
        return t == $t ? "down" : t == Lt ? "up" : t == Rt ? "left" : t == Mt ? "right" : ""
    }
    function K(t, e) {
        var i = e.manager;
        return i ? i.get(t) : t
    }
    function J() {
        V.apply(this, arguments)
    }
    function tt() {
        J.apply(this, arguments),
        this.pX = null,
        this.pY = null
    }
    function et() {
        J.apply(this, arguments)
    }
    function it() {
        V.apply(this, arguments),
        this._timer = null,
        this._input = null
    }
    function nt() {
        J.apply(this, arguments)
    }
    function rt() {
        J.apply(this, arguments)
    }
    function st() {
        V.apply(this, arguments),
        this.pTime = !1,
        this.pCenter = !1,
        this._timer = null,
        this._input = null,
        this.count = 0
    }
    function ot(t, e) {
        return e = e || {},
        e.recognizers = u(e.recognizers, ot.defaults.preset),
        new at(t,e)
    }
    function at(t, e) {
        this.options = ht({}, ot.defaults, e || {}),
        this.options.inputTarget = this.options.inputTarget || t,
        this.handlers = {},
        this.session = {},
        this.recognizers = [],
        this.oldCssProps = {},
        this.element = t,
        this.input = S(this),
        this.touchAction = new U(this,this.options.touchAction),
        lt(this, !0),
        o(this.options.recognizers, function(t) {
            var e = this.add(new t[0](t[1]));
            t[2] && e.recognizeWith(t[2]),
            t[3] && e.requireFailure(t[3])
        }, this)
    }
    function lt(t, e) {
        var i = t.element;
        if (i.style) {
            var n;
            o(t.options.cssProps, function(r, s) {
                n = b(i.style, s),
                e ? (t.oldCssProps[n] = i.style[n],
                i.style[n] = r) : i.style[n] = t.oldCssProps[n] || ""
            }),
            e || (t.oldCssProps = {})
        }
    }
    function ct(t, i) {
        var n = e.createEvent("Event");
        n.initEvent(t, !0, !0),
        n.gesture = i,
        i.target.dispatchEvent(n)
    }
    var ht, ut = ["", "webkit", "Moz", "MS", "ms", "o"], dt = e.createElement("div"), pt = "function", ft = Math.round, mt = Math.abs, gt = Date.now;
    ht = "function" != typeof Object.assign ? function(t) {
        if (t === n || null === t)
            throw new TypeError("Cannot convert undefined or null to object");
        for (var e = Object(t), i = 1; i < arguments.length; i++) {
            var r = arguments[i];
            if (r !== n && null !== r)
                for (var s in r)
                    r.hasOwnProperty(s) && (e[s] = r[s])
        }
        return e
    }
    : Object.assign;
    var _t = a(function(t, e, i) {
        for (var r = Object.keys(e), s = 0; s < r.length; )
            (!i || i && t[r[s]] === n) && (t[r[s]] = e[r[s]]),
            s++;
        return t
    }, "extend", "Use `assign`.")
      , vt = a(function(t, e) {
        return _t(t, e, !0)
    }, "merge", "Use `assign`.")
      , yt = 1
      , bt = /mobile|tablet|ip(ad|hone|od)|android/i
      , wt = "ontouchstart"in t
      , Tt = b(t, "PointerEvent") !== n
      , xt = wt && bt.test(navigator.userAgent)
      , St = "touch"
      , kt = "mouse"
      , Ct = 25
      , Pt = 1
      , At = 2
      , Ot = 4
      , Et = 8
      , zt = 1
      , Rt = 2
      , Mt = 4
      , Lt = 8
      , $t = 16
      , Dt = Rt | Mt
      , Xt = Lt | $t
      , It = Dt | Xt
      , Ft = ["x", "y"]
      , Yt = ["clientX", "clientY"];
    x.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && d(this.element, this.evEl, this.domHandler),
            this.evTarget && d(this.target, this.evTarget, this.domHandler),
            this.evWin && d(T(this.element), this.evWin, this.domHandler)
        },
        destroy: function() {
            this.evEl && p(this.element, this.evEl, this.domHandler),
            this.evTarget && p(this.target, this.evTarget, this.domHandler),
            this.evWin && p(T(this.element), this.evWin, this.domHandler)
        }
    };
    var Ht = {
        mousedown: Pt,
        mousemove: At,
        mouseup: Ot
    }
      , Nt = "mousedown"
      , Wt = "mousemove mouseup";
    l(X, x, {
        handler: function(t) {
            var e = Ht[t.type];
            e & Pt && 0 === t.button && (this.pressed = !0),
            e & At && 1 !== t.which && (e = Ot),
            this.pressed && (e & Ot && (this.pressed = !1),
            this.callback(this.manager, e, {
                pointers: [t],
                changedPointers: [t],
                pointerType: kt,
                srcEvent: t
            }))
        }
    });
    var jt = {
        pointerdown: Pt,
        pointermove: At,
        pointerup: Ot,
        pointercancel: Et,
        pointerout: Et
    }
      , Bt = {
        2: St,
        3: "pen",
        4: kt,
        5: "kinect"
    }
      , qt = "pointerdown"
      , Ut = "pointermove pointerup pointercancel";
    t.MSPointerEvent && !t.PointerEvent && (qt = "MSPointerDown",
    Ut = "MSPointerMove MSPointerUp MSPointerCancel"),
    l(I, x, {
        handler: function(t) {
            var e = this.store
              , i = !1
              , n = t.type.toLowerCase().replace("ms", "")
              , r = jt[n]
              , s = Bt[t.pointerType] || t.pointerType
              , o = s == St
              , a = _(e, t.pointerId, "pointerId");
            r & Pt && (0 === t.button || o) ? 0 > a && (e.push(t),
            a = e.length - 1) : r & (Ot | Et) && (i = !0),
            0 > a || (e[a] = t,
            this.callback(this.manager, r, {
                pointers: e,
                changedPointers: [t],
                pointerType: s,
                srcEvent: t
            }),
            i && e.splice(a, 1))
        }
    });
    var Gt = {
        touchstart: Pt,
        touchmove: At,
        touchend: Ot,
        touchcancel: Et
    }
      , Vt = "touchstart"
      , Zt = "touchstart touchmove touchend touchcancel";
    l(F, x, {
        handler: function(t) {
            var e = Gt[t.type];
            if (e === Pt && (this.started = !0),
            this.started) {
                var i = Y.call(this, t, e);
                e & (Ot | Et) && i[0].length - i[1].length == 0 && (this.started = !1),
                this.callback(this.manager, e, {
                    pointers: i[0],
                    changedPointers: i[1],
                    pointerType: St,
                    srcEvent: t
                })
            }
        }
    });
    var Qt = {
        touchstart: Pt,
        touchmove: At,
        touchend: Ot,
        touchcancel: Et
    }
      , Kt = "touchstart touchmove touchend touchcancel";
    l(H, x, {
        handler: function(t) {
            var e = Qt[t.type]
              , i = N.call(this, t, e);
            i && this.callback(this.manager, e, {
                pointers: i[0],
                changedPointers: i[1],
                pointerType: St,
                srcEvent: t
            })
        }
    });
    var Jt = 2500
      , te = 25;
    l(W, x, {
        handler: function(t, e, i) {
            var n = i.pointerType == St
              , r = i.pointerType == kt;
            if (!(r && i.sourceCapabilities && i.sourceCapabilities.firesTouchEvents)) {
                if (n)
                    j.call(this, e, i);
                else if (r && q.call(this, i))
                    return;
                this.callback(t, e, i)
            }
        },
        destroy: function() {
            this.touch.destroy(),
            this.mouse.destroy()
        }
    });
    var ee = b(dt.style, "touchAction")
      , ie = ee !== n
      , ne = "compute"
      , re = "auto"
      , se = "manipulation"
      , oe = "none"
      , ae = "pan-x"
      , le = "pan-y"
      , ce = function() {
        if (!ie)
            return !1;
        var e = {}
          , i = t.CSS && t.CSS.supports;
        return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(n) {
            e[n] = !i || t.CSS.supports("touch-action", n)
        }),
        e
    }();
    U.prototype = {
        set: function(t) {
            t == ne && (t = this.compute()),
            ie && this.manager.element.style && ce[t] && (this.manager.element.style[ee] = t),
            this.actions = t.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var t = [];
            return o(this.manager.recognizers, function(e) {
                h(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
            }),
            G(t.join(" "))
        },
        preventDefaults: function(t) {
            var e = t.srcEvent
              , i = t.offsetDirection;
            if (this.manager.session.prevented)
                return void e.preventDefault();
            var n = this.actions
              , r = m(n, oe) && !ce[oe]
              , s = m(n, le) && !ce[le]
              , o = m(n, ae) && !ce[ae];
            if (r) {
                var a = 1 === t.pointers.length
                  , l = t.distance < 2
                  , c = t.deltaTime < 250;
                if (a && l && c)
                    return
            }
            return o && s ? void 0 : r || s && i & Dt || o && i & Xt ? this.preventSrc(e) : void 0
        },
        preventSrc: function(t) {
            this.manager.session.prevented = !0,
            t.preventDefault()
        }
    };
    var he = 1
      , ue = 2
      , de = 4
      , pe = 8
      , fe = pe
      , me = 16;
    V.prototype = {
        defaults: {},
        set: function(t) {
            return ht(this.options, t),
            this.manager && this.manager.touchAction.update(),
            this
        },
        recognizeWith: function(t) {
            if (s(t, "recognizeWith", this))
                return this;
            var e = this.simultaneous;
            return t = K(t, this),
            e[t.id] || (e[t.id] = t,
            t.recognizeWith(this)),
            this
        },
        dropRecognizeWith: function(t) {
            return s(t, "dropRecognizeWith", this) ? this : (t = K(t, this),
            delete this.simultaneous[t.id],
            this)
        },
        requireFailure: function(t) {
            if (s(t, "requireFailure", this))
                return this;
            var e = this.requireFail;
            return t = K(t, this),
            -1 === _(e, t) && (e.push(t),
            t.requireFailure(this)),
            this
        },
        dropRequireFailure: function(t) {
            if (s(t, "dropRequireFailure", this))
                return this;
            t = K(t, this);
            var e = _(this.requireFail, t);
            return e > -1 && this.requireFail.splice(e, 1),
            this
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function(t) {
            return !!this.simultaneous[t.id]
        },
        emit: function(t) {
            function e(e) {
                i.manager.emit(e, t)
            }
            var i = this
              , n = this.state;
            pe > n && e(i.options.event + Z(n)),
            e(i.options.event),
            t.additionalEvent && e(t.additionalEvent),
            n >= pe && e(i.options.event + Z(n))
        },
        tryEmit: function(t) {
            return this.canEmit() ? this.emit(t) : void (this.state = 32)
        },
        canEmit: function() {
            for (var t = 0; t < this.requireFail.length; ) {
                if (!(this.requireFail[t].state & (32 | he)))
                    return !1;
                t++
            }
            return !0
        },
        recognize: function(t) {
            var e = ht({}, t);
            return h(this.options.enable, [this, e]) ? (this.state & (fe | me | 32) && (this.state = he),
            this.state = this.process(e),
            void (this.state & (ue | de | pe | me) && this.tryEmit(e))) : (this.reset(),
            void (this.state = 32))
        },
        process: function(t) {},
        getTouchAction: function() {},
        reset: function() {}
    },
    l(J, V, {
        defaults: {
            pointers: 1
        },
        attrTest: function(t) {
            var e = this.options.pointers;
            return 0 === e || t.pointers.length === e
        },
        process: function(t) {
            var e = this.state
              , i = t.eventType
              , n = e & (ue | de)
              , r = this.attrTest(t);
            return n && (i & Et || !r) ? e | me : n || r ? i & Ot ? e | pe : e & ue ? e | de : ue : 32
        }
    }),
    l(tt, J, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: It
        },
        getTouchAction: function() {
            var t = this.options.direction
              , e = [];
            return t & Dt && e.push(le),
            t & Xt && e.push(ae),
            e
        },
        directionTest: function(t) {
            var e = this.options
              , i = !0
              , n = t.distance
              , r = t.direction
              , s = t.deltaX
              , o = t.deltaY;
            return r & e.direction || (e.direction & Dt ? (r = 0 === s ? zt : 0 > s ? Rt : Mt,
            i = s != this.pX,
            n = Math.abs(t.deltaX)) : (r = 0 === o ? zt : 0 > o ? Lt : $t,
            i = o != this.pY,
            n = Math.abs(t.deltaY))),
            t.direction = r,
            i && n > e.threshold && r & e.direction
        },
        attrTest: function(t) {
            return J.prototype.attrTest.call(this, t) && (this.state & ue || !(this.state & ue) && this.directionTest(t))
        },
        emit: function(t) {
            this.pX = t.deltaX,
            this.pY = t.deltaY;
            var e = Q(t.direction);
            e && (t.additionalEvent = this.options.event + e),
            this._super.emit.call(this, t)
        }
    }),
    l(et, J, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [oe]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & ue)
        },
        emit: function(t) {
            if (1 !== t.scale) {
                var e = t.scale < 1 ? "in" : "out";
                t.additionalEvent = this.options.event + e
            }
            this._super.emit.call(this, t)
        }
    }),
    l(it, V, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 251,
            threshold: 9
        },
        getTouchAction: function() {
            return [re]
        },
        process: function(t) {
            var e = this.options
              , i = t.pointers.length === e.pointers
              , n = t.distance < e.threshold
              , s = t.deltaTime > e.time;
            if (this._input = t,
            !n || !i || t.eventType & (Ot | Et) && !s)
                this.reset();
            else if (t.eventType & Pt)
                this.reset(),
                this._timer = r(function() {
                    this.state = fe,
                    this.tryEmit()
                }, e.time, this);
            else if (t.eventType & Ot)
                return fe;
            return 32
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(t) {
            this.state === fe && (t && t.eventType & Ot ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = gt(),
            this.manager.emit(this.options.event, this._input)))
        }
    }),
    l(nt, J, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [oe]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & ue)
        }
    }),
    l(rt, J, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .3,
            direction: Dt | Xt,
            pointers: 1
        },
        getTouchAction: function() {
            return tt.prototype.getTouchAction.call(this)
        },
        attrTest: function(t) {
            var e, i = this.options.direction;
            return i & (Dt | Xt) ? e = t.overallVelocity : i & Dt ? e = t.overallVelocityX : i & Xt && (e = t.overallVelocityY),
            this._super.attrTest.call(this, t) && i & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && mt(e) > this.options.velocity && t.eventType & Ot
        },
        emit: function(t) {
            var e = Q(t.offsetDirection);
            e && this.manager.emit(this.options.event + e, t),
            this.manager.emit(this.options.event, t)
        }
    }),
    l(st, V, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [se]
        },
        process: function(t) {
            var e = this.options
              , i = t.pointers.length === e.pointers
              , n = t.distance < e.threshold
              , s = t.deltaTime < e.time;
            if (this.reset(),
            t.eventType & Pt && 0 === this.count)
                return this.failTimeout();
            if (n && s && i) {
                if (t.eventType != Ot)
                    return this.failTimeout();
                var o = !this.pTime || t.timeStamp - this.pTime < e.interval
                  , a = !this.pCenter || M(this.pCenter, t.center) < e.posThreshold;
                this.pTime = t.timeStamp,
                this.pCenter = t.center,
                a && o ? this.count += 1 : this.count = 1,
                this._input = t;
                if (0 === this.count % e.taps)
                    return this.hasRequireFailures() ? (this._timer = r(function() {
                        this.state = fe,
                        this.tryEmit()
                    }, e.interval, this),
                    ue) : fe
            }
            return 32
        },
        failTimeout: function() {
            return this._timer = r(function() {
                this.state = 32
            }, this.options.interval, this),
            32
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            this.state == fe && (this._input.tapCount = this.count,
            this.manager.emit(this.options.event, this._input))
        }
    }),
    ot.VERSION = "2.0.8",
    ot.defaults = {
        domEvents: !1,
        touchAction: ne,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [[nt, {
            enable: !1
        }], [et, {
            enable: !1
        }, ["rotate"]], [rt, {
            direction: Dt
        }], [tt, {
            direction: Dt
        }, ["swipe"]], [st], [st, {
            event: "doubletap",
            taps: 2
        }, ["tap"]], [it]],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    at.prototype = {
        set: function(t) {
            return ht(this.options, t),
            t.touchAction && this.touchAction.update(),
            t.inputTarget && (this.input.destroy(),
            this.input.target = t.inputTarget,
            this.input.init()),
            this
        },
        stop: function(t) {
            this.session.stopped = t ? 2 : 1
        },
        recognize: function(t) {
            var e = this.session;
            if (!e.stopped) {
                this.touchAction.preventDefaults(t);
                var i, n = this.recognizers, r = e.curRecognizer;
                (!r || r && r.state & fe) && (r = e.curRecognizer = null);
                for (var s = 0; s < n.length; )
                    i = n[s],
                    2 === e.stopped || r && i != r && !i.canRecognizeWith(r) ? i.reset() : i.recognize(t),
                    !r && i.state & (ue | de | pe) && (r = e.curRecognizer = i),
                    s++
            }
        },
        get: function(t) {
            if (t instanceof V)
                return t;
            for (var e = this.recognizers, i = 0; i < e.length; i++)
                if (e[i].options.event == t)
                    return e[i];
            return null
        },
        add: function(t) {
            if (s(t, "add", this))
                return this;
            var e = this.get(t.options.event);
            return e && this.remove(e),
            this.recognizers.push(t),
            t.manager = this,
            this.touchAction.update(),
            t
        },
        remove: function(t) {
            if (s(t, "remove", this))
                return this;
            if (t = this.get(t)) {
                var e = this.recognizers
                  , i = _(e, t);
                -1 !== i && (e.splice(i, 1),
                this.touchAction.update())
            }
            return this
        },
        on: function(t, e) {
            if (t !== n && e !== n) {
                var i = this.handlers;
                return o(g(t), function(t) {
                    i[t] = i[t] || [],
                    i[t].push(e)
                }),
                this
            }
        },
        off: function(t, e) {
            if (t !== n) {
                var i = this.handlers;
                return o(g(t), function(t) {
                    e ? i[t] && i[t].splice(_(i[t], e), 1) : delete i[t]
                }),
                this
            }
        },
        emit: function(t, e) {
            this.options.domEvents && ct(t, e);
            var i = this.handlers[t] && this.handlers[t].slice();
            if (i && i.length) {
                e.type = t,
                e.preventDefault = function() {
                    e.srcEvent.preventDefault()
                }
                ;
                for (var n = 0; n < i.length; )
                    i[n](e),
                    n++
            }
        },
        destroy: function() {
            this.element && lt(this, !1),
            this.handlers = {},
            this.session = {},
            this.input.destroy(),
            this.element = null
        }
    },
    ht(ot, {
        INPUT_START: Pt,
        INPUT_MOVE: At,
        INPUT_END: Ot,
        INPUT_CANCEL: Et,
        STATE_POSSIBLE: he,
        STATE_BEGAN: ue,
        STATE_CHANGED: de,
        STATE_ENDED: pe,
        STATE_RECOGNIZED: fe,
        STATE_CANCELLED: me,
        STATE_FAILED: 32,
        DIRECTION_NONE: zt,
        DIRECTION_LEFT: Rt,
        DIRECTION_RIGHT: Mt,
        DIRECTION_UP: Lt,
        DIRECTION_DOWN: $t,
        DIRECTION_HORIZONTAL: Dt,
        DIRECTION_VERTICAL: Xt,
        DIRECTION_ALL: It,
        Manager: at,
        Input: x,
        TouchAction: U,
        TouchInput: H,
        MouseInput: X,
        PointerEventInput: I,
        TouchMouseInput: W,
        SingleTouchInput: F,
        Recognizer: V,
        AttrRecognizer: J,
        Tap: st,
        Pan: tt,
        Swipe: rt,
        Pinch: et,
        Rotate: nt,
        Press: it,
        on: d,
        off: p,
        each: o,
        merge: vt,
        extend: _t,
        assign: ht,
        inherit: l,
        bindFn: c,
        prefixed: b
    }),
    (void 0 !== t ? t : "undefined" != typeof self ? self : {}).Hammer = ot,
    "function" == typeof define && define.amd ? define(function() {
        return ot
    }) : "undefined" != typeof module && module.exports ? module.exports = ot : t.Hammer = ot
}(window, document),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(i, n) {
            var r, s = this;
            s.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: t(i),
                appendDots: t(i),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, i) {
                    return t('<button type="button" />').text(i + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            s.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            t.extend(s, s.initials),
            s.activeBreakpoint = null,
            s.animType = null,
            s.animProp = null,
            s.breakpoints = [],
            s.breakpointSettings = [],
            s.cssTransitions = !1,
            s.focussed = !1,
            s.interrupted = !1,
            s.hidden = "hidden",
            s.paused = !0,
            s.positionProp = null,
            s.respondTo = null,
            s.rowCount = 1,
            s.shouldClick = !0,
            s.$slider = t(i),
            s.$slidesCache = null,
            s.transformType = null,
            s.transitionType = null,
            s.visibilityChange = "visibilitychange",
            s.windowWidth = 0,
            s.windowTimer = null,
            r = t(i).data("slick") || {},
            s.options = t.extend({}, s.defaults, n, r),
            s.currentSlide = s.options.initialSlide,
            s.originalSettings = s.options,
            void 0 !== document.mozHidden ? (s.hidden = "mozHidden",
            s.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (s.hidden = "webkitHidden",
            s.visibilityChange = "webkitvisibilitychange"),
            s.autoPlay = t.proxy(s.autoPlay, s),
            s.autoPlayClear = t.proxy(s.autoPlayClear, s),
            s.autoPlayIterator = t.proxy(s.autoPlayIterator, s),
            s.changeSlide = t.proxy(s.changeSlide, s),
            s.clickHandler = t.proxy(s.clickHandler, s),
            s.selectHandler = t.proxy(s.selectHandler, s),
            s.setPosition = t.proxy(s.setPosition, s),
            s.swipeHandler = t.proxy(s.swipeHandler, s),
            s.dragHandler = t.proxy(s.dragHandler, s),
            s.keyHandler = t.proxy(s.keyHandler, s),
            s.instanceUid = e++,
            s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            s.registerBreakpoints(),
            s.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    e.prototype.addSlide = e.prototype.slickAdd = function(e, i, n) {
        var r = this;
        if ("boolean" == typeof i)
            n = i,
            i = null;
        else if (i < 0 || i >= r.slideCount)
            return !1;
        r.unload(),
        "number" == typeof i ? 0 === i && 0 === r.$slides.length ? t(e).appendTo(r.$slideTrack) : n ? t(e).insertBefore(r.$slides.eq(i)) : t(e).insertAfter(r.$slides.eq(i)) : !0 === n ? t(e).prependTo(r.$slideTrack) : t(e).appendTo(r.$slideTrack),
        r.$slides = r.$slideTrack.children(this.options.slide),
        r.$slideTrack.children(this.options.slide).detach(),
        r.$slideTrack.append(r.$slides),
        r.$slides.each(function(e, i) {
            t(i).attr("data-slick-index", e)
        }),
        r.$slidesCache = r.$slides,
        r.reinit()
    }
    ,
    e.prototype.animateHeight = function() {
        var t = this;
        if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.animate({
                height: e
            }, t.options.speed)
        }
    }
    ,
    e.prototype.animateSlide = function(e, i) {
        var n = {}
          , r = this;
        r.animateHeight(),
        !0 === r.options.rtl && !1 === r.options.vertical && (e = -e),
        !1 === r.transformsEnabled ? !1 === r.options.vertical ? r.$slideTrack.animate({
            left: e
        }, r.options.speed, r.options.easing, i) : r.$slideTrack.animate({
            top: e
        }, r.options.speed, r.options.easing, i) : !1 === r.cssTransitions ? (!0 === r.options.rtl && (r.currentLeft = -r.currentLeft),
        t({
            animStart: r.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: r.options.speed,
            easing: r.options.easing,
            step: function(t) {
                t = Math.ceil(t),
                !1 === r.options.vertical ? (n[r.animType] = "translate(" + t + "px, 0px)",
                r.$slideTrack.css(n)) : (n[r.animType] = "translate(0px," + t + "px)",
                r.$slideTrack.css(n))
            },
            complete: function() {
                i && i.call()
            }
        })) : (r.applyTransition(),
        e = Math.ceil(e),
        !1 === r.options.vertical ? n[r.animType] = "translate3d(" + e + "px, 0px, 0px)" : n[r.animType] = "translate3d(0px," + e + "px, 0px)",
        r.$slideTrack.css(n),
        i && setTimeout(function() {
            r.disableTransition(),
            i.call()
        }, r.options.speed))
    }
    ,
    e.prototype.getNavTarget = function() {
        var e = this
          , i = e.options.asNavFor;
        return i && null !== i && (i = t(i).not(e.$slider)),
        i
    }
    ,
    e.prototype.asNavFor = function(e) {
        var i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var i = t(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }
    ,
    e.prototype.applyTransition = function(t) {
        var e = this
          , i = {};
        !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
        !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }
    ,
    e.prototype.autoPlay = function() {
        var t = this;
        t.autoPlayClear(),
        t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
    }
    ,
    e.prototype.autoPlayClear = function() {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer)
    }
    ,
    e.prototype.autoPlayIterator = function() {
        var t = this
          , e = t.currentSlide + t.options.slidesToScroll;
        t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll,
        t.currentSlide - 1 == 0 && (t.direction = 1))),
        t.slideHandler(e))
    }
    ,
    e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"),
        e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"),
        e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
        e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
        !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    e.prototype.buildDots = function() {
        var e, i, n = this;
        if (!0 === n.options.dots) {
            for (n.$slider.addClass("slick-dotted"),
            i = t("<ul />").addClass(n.options.dotsClass),
            e = 0; e <= n.getDotCount(); e += 1)
                i.append(t("<li />").append(n.options.customPaging.call(this, n, e)));
            n.$dots = i.appendTo(n.options.appendDots),
            n.$dots.find("li").first().addClass("slick-active")
        }
    }
    ,
    e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.$slides.each(function(e, i) {
            t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
        }),
        e.$slider.addClass("slick-slider"),
        e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(),
        e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(),
        e.$slideTrack.css("opacity", 0),
        !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1),
        t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        !0 === e.options.draggable && e.$list.addClass("draggable")
    }
    ,
    e.prototype.buildRows = function() {
        var t, e, i, n, r, s, o, a = this;
        if (n = document.createDocumentFragment(),
        s = a.$slider.children(),
        a.options.rows > 1) {
            for (o = a.options.slidesPerRow * a.options.rows,
            r = Math.ceil(s.length / o),
            t = 0; t < r; t++) {
                var l = document.createElement("div");
                for (e = 0; e < a.options.rows; e++) {
                    var c = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var h = t * o + (e * a.options.slidesPerRow + i);
                        s.get(h) && c.appendChild(s.get(h))
                    }
                    l.appendChild(c)
                }
                n.appendChild(l)
            }
            a.$slider.empty().append(n),
            a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    e.prototype.checkResponsive = function(e, i) {
        var n, r, s, o = this, a = !1, l = o.$slider.width(), c = window.innerWidth || t(window).width();
        if ("window" === o.respondTo ? s = c : "slider" === o.respondTo ? s = l : "min" === o.respondTo && (s = Math.min(c, l)),
        o.options.responsive && o.options.responsive.length && null !== o.options.responsive) {
            r = null;
            for (n in o.breakpoints)
                o.breakpoints.hasOwnProperty(n) && (!1 === o.originalSettings.mobileFirst ? s < o.breakpoints[n] && (r = o.breakpoints[n]) : s > o.breakpoints[n] && (r = o.breakpoints[n]));
            null !== r ? null !== o.activeBreakpoint ? (r !== o.activeBreakpoint || i) && (o.activeBreakpoint = r,
            "unslick" === o.breakpointSettings[r] ? o.unslick(r) : (o.options = t.extend({}, o.originalSettings, o.breakpointSettings[r]),
            !0 === e && (o.currentSlide = o.options.initialSlide),
            o.refresh(e)),
            a = r) : (o.activeBreakpoint = r,
            "unslick" === o.breakpointSettings[r] ? o.unslick(r) : (o.options = t.extend({}, o.originalSettings, o.breakpointSettings[r]),
            !0 === e && (o.currentSlide = o.options.initialSlide),
            o.refresh(e)),
            a = r) : null !== o.activeBreakpoint && (o.activeBreakpoint = null,
            o.options = o.originalSettings,
            !0 === e && (o.currentSlide = o.options.initialSlide),
            o.refresh(e),
            a = r),
            e || !1 === a || o.$slider.trigger("breakpoint", [o, a])
        }
    }
    ,
    e.prototype.changeSlide = function(e, i) {
        var n, r, s, o = this, a = t(e.currentTarget);
        switch (a.is("a") && e.preventDefault(),
        a.is("li") || (a = a.closest("li")),
        s = o.slideCount % o.options.slidesToScroll != 0,
        n = s ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll,
        e.data.message) {
        case "previous":
            r = 0 === n ? o.options.slidesToScroll : o.options.slidesToShow - n,
            o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - r, !1, i);
            break;
        case "next":
            r = 0 === n ? o.options.slidesToScroll : n,
            o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + r, !1, i);
            break;
        case "index":
            var l = 0 === e.data.index ? 0 : e.data.index || a.index() * o.options.slidesToScroll;
            o.slideHandler(o.checkNavigable(l), !1, i),
            a.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    e.prototype.checkNavigable = function(t) {
        var e, i;
        if (e = this.getNavigableIndexes(),
        i = 0,
        t > e[e.length - 1])
            t = e[e.length - 1];
        else
            for (var n in e) {
                if (t < e[n]) {
                    t = i;
                    break
                }
                i = e[n]
            }
        return t
    }
    ,
    e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
        !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
        e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        t(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler),
        t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
        t(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
        t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }
    ,
    e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.cleanUpRows = function() {
        var t, e = this;
        e.options.rows > 1 && ((t = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(t))
    }
    ,
    e.prototype.clickHandler = function(t) {
        !1 === this.shouldClick && (t.stopImmediatePropagation(),
        t.stopPropagation(),
        t.preventDefault())
    }
    ,
    e.prototype.destroy = function(e) {
        var i = this;
        i.autoPlayClear(),
        i.touchObject = {},
        i.cleanUpEvents(),
        t(".slick-cloned", i.$slider).detach(),
        i.$dots && i.$dots.remove(),
        i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
        i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
        i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            t(this).attr("style", t(this).data("originalStyling"))
        }),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slideTrack.detach(),
        i.$list.detach(),
        i.$slider.append(i.$slides)),
        i.cleanUpRows(),
        i.$slider.removeClass("slick-slider"),
        i.$slider.removeClass("slick-initialized"),
        i.$slider.removeClass("slick-dotted"),
        i.unslicked = !0,
        e || i.$slider.trigger("destroy", [i])
    }
    ,
    e.prototype.disableTransition = function(t) {
        var e = this
          , i = {};
        i[e.transitionType] = "",
        !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }
    ,
    e.prototype.fadeSlide = function(t, e) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(t).css({
            zIndex: i.options.zIndex
        }),
        i.$slides.eq(t).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t),
        i.$slides.eq(t).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }),
        e && setTimeout(function() {
            i.disableTransition(t),
            e.call()
        }, i.options.speed))
    }
    ,
    e.prototype.fadeSlideOut = function(t) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(t).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(t),
        e.$slides.eq(t).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }
    ,
    e.prototype.filterSlides = e.prototype.slickFilter = function(t) {
        var e = this;
        null !== t && (e.$slidesCache = e.$slides,
        e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.filter(t).appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(i) {
            i.stopImmediatePropagation();
            var n = t(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = n.is(":focus"),
                e.autoPlay())
            }, 0)
        })
    }
    ,
    e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }
    ,
    e.prototype.getDotCount = function() {
        var t = this
          , e = 0
          , i = 0
          , n = 0;
        if (!0 === t.options.infinite)
            if (t.slideCount <= t.options.slidesToShow)
                ++n;
            else
                for (; e < t.slideCount; )
                    ++n,
                    e = i + t.options.slidesToScroll,
                    i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        else if (!0 === t.options.centerMode)
            n = t.slideCount;
        else if (t.options.asNavFor)
            for (; e < t.slideCount; )
                ++n,
                e = i + t.options.slidesToScroll,
                i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        else
            n = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
        return n - 1
    }
    ,
    e.prototype.getLeft = function(t) {
        var e, i, n, r, s = this, o = 0;
        return s.slideOffset = 0,
        i = s.$slides.first().outerHeight(!0),
        !0 === s.options.infinite ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1,
        r = -1,
        !0 === s.options.vertical && !0 === s.options.centerMode && (2 === s.options.slidesToShow ? r = -1.5 : 1 === s.options.slidesToShow && (r = -2)),
        o = i * s.options.slidesToShow * r),
        s.slideCount % s.options.slidesToScroll != 0 && t + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (t > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (t - s.slideCount)) * s.slideWidth * -1,
        o = (s.options.slidesToShow - (t - s.slideCount)) * i * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1,
        o = s.slideCount % s.options.slidesToScroll * i * -1))) : t + s.options.slidesToShow > s.slideCount && (s.slideOffset = (t + s.options.slidesToShow - s.slideCount) * s.slideWidth,
        o = (t + s.options.slidesToShow - s.slideCount) * i),
        s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0,
        o = 0),
        !0 === s.options.centerMode && s.slideCount <= s.options.slidesToShow ? s.slideOffset = s.slideWidth * Math.floor(s.options.slidesToShow) / 2 - s.slideWidth * s.slideCount / 2 : !0 === s.options.centerMode && !0 === s.options.infinite ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : !0 === s.options.centerMode && (s.slideOffset = 0,
        s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)),
        e = !1 === s.options.vertical ? t * s.slideWidth * -1 + s.slideOffset : t * i * -1 + o,
        !0 === s.options.variableWidth && (n = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow),
        e = !0 === s.options.rtl ? n[0] ? -1 * (s.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0,
        !0 === s.options.centerMode && (n = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow + 1),
        e = !0 === s.options.rtl ? n[0] ? -1 * (s.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0,
        e += (s.$list.width() - n.outerWidth()) / 2)),
        e
    }
    ,
    e.prototype.getOption = e.prototype.slickGetOption = function(t) {
        return this.options[t]
    }
    ,
    e.prototype.getNavigableIndexes = function() {
        var t, e = this, i = 0, n = 0, r = [];
        for (!1 === e.options.infinite ? t = e.slideCount : (i = -1 * e.options.slidesToScroll,
        n = -1 * e.options.slidesToScroll,
        t = 2 * e.slideCount); i < t; )
            r.push(i),
            i = n + e.options.slidesToScroll,
            n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return r
    }
    ,
    e.prototype.getSlick = function() {
        return this
    }
    ,
    e.prototype.getSlideCount = function() {
        var e, i, n = this;
        return i = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0,
        !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(r, s) {
            if (s.offsetLeft - i + t(s).outerWidth() / 2 > -1 * n.swipeLeft)
                return e = s,
                !1
        }),
        Math.abs(t(e).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }
    ,
    e.prototype.goTo = e.prototype.slickGoTo = function(t, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(t)
            }
        }, e)
    }
    ,
    e.prototype.init = function(e) {
        var i = this;
        t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"),
        i.buildRows(),
        i.buildOut(),
        i.setProps(),
        i.startLoad(),
        i.loadSlider(),
        i.initializeEvents(),
        i.updateArrows(),
        i.updateDots(),
        i.checkResponsive(!0),
        i.focusHandler()),
        e && i.$slider.trigger("init", [i]),
        !0 === i.options.accessibility && i.initADA(),
        i.options.autoplay && (i.paused = !1,
        i.autoPlay())
    }
    ,
    e.prototype.initADA = function() {
        var e = this
          , i = Math.ceil(e.slideCount / e.options.slidesToShow)
          , n = e.getNavigableIndexes().filter(function(t) {
            return t >= 0 && t < e.slideCount
        });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(i) {
            var r = n.indexOf(i);
            t(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + i,
                tabindex: -1
            }),
            -1 !== r && t(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + r
            })
        }),
        e.$dots.attr("role", "tablist").find("li").each(function(r) {
            var s = n[r];
            t(this).attr({
                role: "presentation"
            }),
            t(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + r,
                "aria-controls": "slick-slide" + e.instanceUid + s,
                "aria-label": r + 1 + " of " + i,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var r = e.currentSlide, s = r + e.options.slidesToShow; r < s; r++)
            e.$slides.eq(r).attr("tabindex", 0);
        e.activateADA()
    }
    ,
    e.prototype.initArrowEvents = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, t.changeSlide),
        t.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, t.changeSlide),
        !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler),
        t.$nextArrow.on("keydown.slick", t.keyHandler)))
    }
    ,
    e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (t("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide),
        !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
    }
    ,
    e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler),
        e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler),
        e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("click.slick", e.clickHandler),
        t(document).on(e.visibilityChange, t.proxy(e.visibility, e)),
        !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler),
        t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)),
        t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)),
        t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        t(e.setPosition)
    }
    ,
    e.prototype.initUI = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(),
        t.$nextArrow.show()),
        !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
    }
    ,
    e.prototype.keyHandler = function(t) {
        var e = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }
    ,
    e.prototype.lazyLoad = function() {
        function e(e) {
            t("img[data-lazy]", e).each(function() {
                var e = t(this)
                  , i = t(this).attr("data-lazy")
                  , n = t(this).attr("data-srcset")
                  , r = t(this).attr("data-sizes") || s.$slider.attr("data-sizes")
                  , o = document.createElement("img");
                o.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        n && (e.attr("srcset", n),
                        r && e.attr("sizes", r)),
                        e.attr("src", i).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }),
                        s.$slider.trigger("lazyLoaded", [s, e, i])
                    })
                }
                ,
                o.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    s.$slider.trigger("lazyLoadError", [s, e, i])
                }
                ,
                o.src = i
            })
        }
        var i, n, r, s = this;
        if (!0 === s.options.centerMode ? !0 === s.options.infinite ? r = (n = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (n = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)),
        r = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (n = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide,
        r = Math.ceil(n + s.options.slidesToShow),
        !0 === s.options.fade && (n > 0 && n--,
        r <= s.slideCount && r++)),
        i = s.$slider.find(".slick-slide").slice(n, r),
        "anticipated" === s.options.lazyLoad)
            for (var o = n - 1, a = r, l = s.$slider.find(".slick-slide"), c = 0; c < s.options.slidesToScroll; c++)
                o < 0 && (o = s.slideCount - 1),
                i = (i = i.add(l.eq(o))).add(l.eq(a)),
                o--,
                a++;
        e(i),
        s.slideCount <= s.options.slidesToShow ? e(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? e(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && e(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow))
    }
    ,
    e.prototype.loadSlider = function() {
        var t = this;
        t.setPosition(),
        t.$slideTrack.css({
            opacity: 1
        }),
        t.$slider.removeClass("slick-loading"),
        t.initUI(),
        "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
    }
    ,
    e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    e.prototype.orientationChange = function() {
        var t = this;
        t.checkResponsive(),
        t.setPosition()
    }
    ,
    e.prototype.pause = e.prototype.slickPause = function() {
        var t = this;
        t.autoPlayClear(),
        t.paused = !0
    }
    ,
    e.prototype.play = e.prototype.slickPlay = function() {
        var t = this;
        t.autoPlay(),
        t.options.autoplay = !0,
        t.paused = !1,
        t.focussed = !1,
        t.interrupted = !1
    }
    ,
    e.prototype.postSlide = function(e) {
        var i = this;
        i.unslicked || (i.$slider.trigger("afterChange", [i, e]),
        i.animating = !1,
        i.slideCount > i.options.slidesToShow && i.setPosition(),
        i.swipeLeft = null,
        i.options.autoplay && i.autoPlay(),
        !0 === i.options.accessibility && (i.initADA(),
        i.options.focusOnChange && t(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
    }
    ,
    e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    e.prototype.preventDefault = function(t) {
        t.preventDefault()
    }
    ,
    e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var i, n, r, s, o, a = this, l = t("img[data-lazy]", a.$slider);
        l.length ? (i = l.first(),
        n = i.attr("data-lazy"),
        r = i.attr("data-srcset"),
        s = i.attr("data-sizes") || a.$slider.attr("data-sizes"),
        (o = document.createElement("img")).onload = function() {
            r && (i.attr("srcset", r),
            s && i.attr("sizes", s)),
            i.attr("src", n).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
            !0 === a.options.adaptiveHeight && a.setPosition(),
            a.$slider.trigger("lazyLoaded", [a, i, n]),
            a.progressiveLazyLoad()
        }
        ,
        o.onerror = function() {
            e < 3 ? setTimeout(function() {
                a.progressiveLazyLoad(e + 1)
            }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            a.$slider.trigger("lazyLoadError", [a, i, n]),
            a.progressiveLazyLoad())
        }
        ,
        o.src = n) : a.$slider.trigger("allImagesLoaded", [a])
    }
    ,
    e.prototype.refresh = function(e) {
        var i, n, r = this;
        n = r.slideCount - r.options.slidesToShow,
        !r.options.infinite && r.currentSlide > n && (r.currentSlide = n),
        r.slideCount <= r.options.slidesToShow && (r.currentSlide = 0),
        i = r.currentSlide,
        r.destroy(!0),
        t.extend(r, r.initials, {
            currentSlide: i
        }),
        r.init(),
        e || r.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }
    ,
    e.prototype.registerBreakpoints = function() {
        var e, i, n, r = this, s = r.options.responsive || null;
        if ("array" === t.type(s) && s.length) {
            r.respondTo = r.options.respondTo || "window";
            for (e in s)
                if (n = r.breakpoints.length - 1,
                s.hasOwnProperty(e)) {
                    for (i = s[e].breakpoint; n >= 0; )
                        r.breakpoints[n] && r.breakpoints[n] === i && r.breakpoints.splice(n, 1),
                        n--;
                    r.breakpoints.push(i),
                    r.breakpointSettings[i] = s[e].settings
                }
            r.breakpoints.sort(function(t, e) {
                return r.options.mobileFirst ? t - e : e - t
            })
        }
    }
    ,
    e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        e.setPosition(),
        e.focusHandler(),
        e.paused = !e.options.autoplay,
        e.autoPlay(),
        e.$slider.trigger("reInit", [e])
    }
    ,
    e.prototype.resize = function() {
        var e = this;
        t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay),
        e.windowDelay = window.setTimeout(function() {
            e.windowWidth = t(window).width(),
            e.checkResponsive(),
            e.unslicked || e.setPosition()
        }, 50))
    }
    ,
    e.prototype.removeSlide = e.prototype.slickRemove = function(t, e, i) {
        var n = this;
        if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : n.slideCount - 1 : !0 === e ? --t : t,
        n.slideCount < 1 || t < 0 || t > n.slideCount - 1)
            return !1;
        n.unload(),
        !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(),
        n.$slides = n.$slideTrack.children(this.options.slide),
        n.$slideTrack.children(this.options.slide).detach(),
        n.$slideTrack.append(n.$slides),
        n.$slidesCache = n.$slides,
        n.reinit()
    }
    ,
    e.prototype.setCSS = function(t) {
        var e, i, n = this, r = {};
        !0 === n.options.rtl && (t = -t),
        e = "left" == n.positionProp ? Math.ceil(t) + "px" : "0px",
        i = "top" == n.positionProp ? Math.ceil(t) + "px" : "0px",
        r[n.positionProp] = t,
        !1 === n.transformsEnabled ? n.$slideTrack.css(r) : (r = {},
        !1 === n.cssTransitions ? (r[n.animType] = "translate(" + e + ", " + i + ")",
        n.$slideTrack.css(r)) : (r[n.animType] = "translate3d(" + e + ", " + i + ", 0px)",
        n.$slideTrack.css(r)))
    }
    ,
    e.prototype.setDimensions = function() {
        var t = this;
        !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
            padding: "0px " + t.options.centerPadding
        }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow),
        !0 === t.options.centerMode && t.$list.css({
            padding: t.options.centerPadding + " 0px"
        })),
        t.listWidth = t.$list.width(),
        t.listHeight = t.$list.height(),
        !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow),
        t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth),
        t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
    }
    ,
    e.prototype.setFade = function() {
        var e, i = this;
        i.$slides.each(function(n, r) {
            e = i.slideWidth * n * -1,
            !0 === i.options.rtl ? t(r).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : t(r).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }),
        i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    e.prototype.setHeight = function() {
        var t = this;
        if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.css("height", e)
        }
    }
    ,
    e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, i, n, r, s, o = this, a = !1;
        if ("object" === t.type(arguments[0]) ? (n = arguments[0],
        a = arguments[1],
        s = "multiple") : "string" === t.type(arguments[0]) && (n = arguments[0],
        r = arguments[1],
        a = arguments[2],
        "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")),
        "single" === s)
            o.options[n] = r;
        else if ("multiple" === s)
            t.each(n, function(t, e) {
                o.options[t] = e
            });
        else if ("responsive" === s)
            for (i in r)
                if ("array" !== t.type(o.options.responsive))
                    o.options.responsive = [r[i]];
                else {
                    for (e = o.options.responsive.length - 1; e >= 0; )
                        o.options.responsive[e].breakpoint === r[i].breakpoint && o.options.responsive.splice(e, 1),
                        e--;
                    o.options.responsive.push(r[i])
                }
        a && (o.unload(),
        o.reinit())
    }
    ,
    e.prototype.setPosition = function() {
        var t = this;
        t.setDimensions(),
        t.setHeight(),
        !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(),
        t.$slider.trigger("setPosition", [t])
    }
    ,
    e.prototype.setProps = function() {
        var t = this
          , e = document.body.style;
        t.positionProp = !0 === t.options.vertical ? "top" : "left",
        "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"),
        void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0),
        t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex),
        void 0 !== e.OTransform && (t.animType = "OTransform",
        t.transformType = "-o-transform",
        t.transitionType = "OTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
        void 0 !== e.MozTransform && (t.animType = "MozTransform",
        t.transformType = "-moz-transform",
        t.transitionType = "MozTransition",
        void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)),
        void 0 !== e.webkitTransform && (t.animType = "webkitTransform",
        t.transformType = "-webkit-transform",
        t.transitionType = "webkitTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
        void 0 !== e.msTransform && (t.animType = "msTransform",
        t.transformType = "-ms-transform",
        t.transitionType = "msTransition",
        void 0 === e.msTransform && (t.animType = !1)),
        void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform",
        t.transformType = "transform",
        t.transitionType = "transition"),
        t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
    }
    ,
    e.prototype.setSlideClasses = function(t) {
        var e, i, n, r, s = this;
        if (i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        s.$slides.eq(t).addClass("slick-current"),
        !0 === s.options.centerMode) {
            var o = s.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(s.options.slidesToShow / 2),
            !0 === s.options.infinite && (t >= e && t <= s.slideCount - 1 - e ? s.$slides.slice(t - e + o, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = s.options.slidesToShow + t,
            i.slice(n - e + 1 + o, n + e + 2).addClass("slick-active").attr("aria-hidden", "false")),
            0 === t ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")),
            s.$slides.eq(t).addClass("slick-center")
        } else
            t >= 0 && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (r = s.slideCount % s.options.slidesToShow,
            n = !0 === s.options.infinite ? s.options.slidesToShow + t : t,
            s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? i.slice(n - (s.options.slidesToShow - r), n + r).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== s.options.lazyLoad && "anticipated" !== s.options.lazyLoad || s.lazyLoad()
    }
    ,
    e.prototype.setupInfinite = function() {
        var e, i, n, r = this;
        if (!0 === r.options.fade && (r.options.centerMode = !1),
        !0 === r.options.infinite && !1 === r.options.fade && (i = null,
        r.slideCount > r.options.slidesToShow)) {
            for (n = !0 === r.options.centerMode ? r.options.slidesToShow + 1 : r.options.slidesToShow,
            e = r.slideCount; e > r.slideCount - n; e -= 1)
                i = e - 1,
                t(r.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - r.slideCount).prependTo(r.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < n + r.slideCount; e += 1)
                i = e,
                t(r.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + r.slideCount).appendTo(r.$slideTrack).addClass("slick-cloned");
            r.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                t(this).attr("id", "")
            })
        }
    }
    ,
    e.prototype.interrupt = function(t) {
        var e = this;
        t || e.autoPlay(),
        e.interrupted = t
    }
    ,
    e.prototype.selectHandler = function(e) {
        var i = this
          , n = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide")
          , r = parseInt(n.attr("data-slick-index"));
        r || (r = 0),
        i.slideCount <= i.options.slidesToShow ? i.slideHandler(r, !1, !0) : i.slideHandler(r)
    }
    ,
    e.prototype.slideHandler = function(t, e, i) {
        var n, r, s, o, a, l = null, c = this;
        if (e = e || !1,
        !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === t))
            if (!1 === e && c.asNavFor(t),
            n = t,
            l = c.getLeft(n),
            o = c.getLeft(c.currentSlide),
            c.currentLeft = null === c.swipeLeft ? o : c.swipeLeft,
            !1 === c.options.infinite && !1 === c.options.centerMode && (t < 0 || t > c.getDotCount() * c.options.slidesToScroll))
                !1 === c.options.fade && (n = c.currentSlide,
                !0 !== i ? c.animateSlide(o, function() {
                    c.postSlide(n)
                }) : c.postSlide(n));
            else if (!1 === c.options.infinite && !0 === c.options.centerMode && (t < 0 || t > c.slideCount - c.options.slidesToScroll))
                !1 === c.options.fade && (n = c.currentSlide,
                !0 !== i ? c.animateSlide(o, function() {
                    c.postSlide(n)
                }) : c.postSlide(n));
            else {
                if (c.options.autoplay && clearInterval(c.autoPlayTimer),
                r = n < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + n : n >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : n - c.slideCount : n,
                c.animating = !0,
                c.$slider.trigger("beforeChange", [c, c.currentSlide, r]),
                s = c.currentSlide,
                c.currentSlide = r,
                c.setSlideClasses(c.currentSlide),
                c.options.asNavFor && (a = (a = c.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide),
                c.updateDots(),
                c.updateArrows(),
                !0 === c.options.fade)
                    return !0 !== i ? (c.fadeSlideOut(s),
                    c.fadeSlide(r, function() {
                        c.postSlide(r)
                    })) : c.postSlide(r),
                    void c.animateHeight();
                !0 !== i ? c.animateSlide(l, function() {
                    c.postSlide(r)
                }) : c.postSlide(r)
            }
    }
    ,
    e.prototype.startLoad = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(),
        t.$nextArrow.hide()),
        !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(),
        t.$slider.addClass("slick-loading")
    }
    ,
    e.prototype.swipeDirection = function() {
        var t, e, i, n, r = this;
        return t = r.touchObject.startX - r.touchObject.curX,
        e = r.touchObject.startY - r.touchObject.curY,
        i = Math.atan2(e, t),
        (n = Math.round(180 * i / Math.PI)) < 0 && (n = 360 - Math.abs(n)),
        n <= 45 && n >= 0 ? !1 === r.options.rtl ? "left" : "right" : n <= 360 && n >= 315 ? !1 === r.options.rtl ? "left" : "right" : n >= 135 && n <= 225 ? !1 === r.options.rtl ? "right" : "left" : !0 === r.options.verticalSwiping ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
    }
    ,
    e.prototype.swipeEnd = function(t) {
        var e, i, n = this;
        if (n.dragging = !1,
        n.swiping = !1,
        n.scrolling)
            return n.scrolling = !1,
            !1;
        if (n.interrupted = !1,
        n.shouldClick = !(n.touchObject.swipeLength > 10),
        void 0 === n.touchObject.curX)
            return !1;
        if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]),
        n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            switch (i = n.swipeDirection()) {
            case "left":
            case "down":
                e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(),
                n.currentDirection = 0;
                break;
            case "right":
            case "up":
                e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(),
                n.currentDirection = 1
            }
            "vertical" != i && (n.slideHandler(e),
            n.touchObject = {},
            n.$slider.trigger("swipe", [n, i]))
        } else
            n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide),
            n.touchObject = {})
    }
    ,
    e.prototype.swipeHandler = function(t) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend"in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse")))
            switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1,
            e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold,
            !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
            t.data.action) {
            case "start":
                e.swipeStart(t);
                break;
            case "move":
                e.swipeMove(t);
                break;
            case "end":
                e.swipeEnd(t)
            }
    }
    ,
    e.prototype.swipeMove = function(t) {
        var e, i, n, r, s, o, a = this;
        return s = void 0 !== t.originalEvent ? t.originalEvent.touches : null,
        !(!a.dragging || a.scrolling || s && 1 !== s.length) && (e = a.getLeft(a.currentSlide),
        a.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX,
        a.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY,
        a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))),
        o = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))),
        !a.options.verticalSwiping && !a.swiping && o > 4 ? (a.scrolling = !0,
        !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = o),
        i = a.swipeDirection(),
        void 0 !== t.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0,
        t.preventDefault()),
        r = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1),
        !0 === a.options.verticalSwiping && (r = a.touchObject.curY > a.touchObject.startY ? 1 : -1),
        n = a.touchObject.swipeLength,
        a.touchObject.edgeHit = !1,
        !1 === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (n = a.touchObject.swipeLength * a.options.edgeFriction,
        a.touchObject.edgeHit = !0),
        !1 === a.options.vertical ? a.swipeLeft = e + n * r : a.swipeLeft = e + n * (a.$list.height() / a.listWidth) * r,
        !0 === a.options.verticalSwiping && (a.swipeLeft = e + n * r),
        !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null,
        !1) : void a.setCSS(a.swipeLeft))))
    }
    ,
    e.prototype.swipeStart = function(t) {
        var e, i = this;
        if (i.interrupted = !0,
        1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow)
            return i.touchObject = {},
            !1;
        void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]),
        i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX,
        i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY,
        i.dragging = !0
    }
    ,
    e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var t = this;
        null !== t.$slidesCache && (t.unload(),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slidesCache.appendTo(t.$slideTrack),
        t.reinit())
    }
    ,
    e.prototype.unload = function() {
        var e = this;
        t(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
        e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
        e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    e.prototype.unslick = function(t) {
        var e = this;
        e.$slider.trigger("unslick", [e, t]),
        e.destroy()
    }
    ,
    e.prototype.updateArrows = function() {
        var t = this;
        Math.floor(t.options.slidesToShow / 2),
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    e.prototype.updateDots = function() {
        var t = this;
        null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").end(),
        t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
    }
    ,
    e.prototype.visibility = function() {
        var t = this;
        t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
    }
    ,
    t.fn.slick = function() {
        var t, i, n = this, r = arguments[0], s = Array.prototype.slice.call(arguments, 1), o = n.length;
        for (t = 0; t < o; t++)
            if ("object" == typeof r || void 0 === r ? n[t].slick = new e(n[t],r) : i = n[t].slick[r].apply(n[t].slick, s),
            void 0 !== i)
                return i;
        return n
    }
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.PerfectScrollbar = e()
}(this, function() {
    "use strict";
    function t(t) {
        return getComputedStyle(t)
    }
    function e(t, e) {
        for (var i in e) {
            var n = e[i];
            "number" == typeof n && (n += "px"),
            t.style[i] = n
        }
        return t
    }
    function i(t) {
        var e = document.createElement("div");
        return e.className = t,
        e
    }
    function n(t, e) {
        if (!_)
            throw new Error("No element matching method supported");
        return _.call(t, e)
    }
    function r(t) {
        t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
    }
    function s(t, e) {
        return Array.prototype.filter.call(t.children, function(t) {
            return n(t, e)
        })
    }
    function o(t, e) {
        var i = t.element.classList
          , n = v.state.scrolling(e);
        i.contains(n) ? clearTimeout(y[e]) : i.add(n)
    }
    function a(t, e) {
        y[e] = setTimeout(function() {
            return t.isAlive && t.element.classList.remove(v.state.scrolling(e))
        }, t.settings.scrollingThreshold)
    }
    function l(t, e) {
        o(t, e),
        a(t, e)
    }
    function c(t) {
        if ("function" == typeof window.CustomEvent)
            return new CustomEvent(t);
        var e = document.createEvent("CustomEvent");
        return e.initCustomEvent(t, !1, !1, void 0),
        e
    }
    function h(t, e, i, n, r) {
        var s = i[0]
          , o = i[1]
          , a = i[2]
          , h = i[3]
          , u = i[4]
          , d = i[5];
        void 0 === n && (n = !0),
        void 0 === r && (r = !1);
        var p = t.element;
        t.reach[h] = null,
        p[a] < 1 && (t.reach[h] = "start"),
        p[a] > t[s] - t[o] - 1 && (t.reach[h] = "end"),
        e && (p.dispatchEvent(c("ps-scroll-" + h)),
        e < 0 ? p.dispatchEvent(c("ps-scroll-" + u)) : e > 0 && p.dispatchEvent(c("ps-scroll-" + d)),
        n && l(t, h)),
        t.reach[h] && (e || r) && p.dispatchEvent(c("ps-" + h + "-reach-" + t.reach[h]))
    }
    function u(t) {
        return parseInt(t, 10) || 0
    }
    function d(t) {
        return n(t, "input,[contenteditable]") || n(t, "select,[contenteditable]") || n(t, "textarea,[contenteditable]") || n(t, "button,[contenteditable]")
    }
    function p(e) {
        var i = t(e);
        return u(i.width) + u(i.paddingLeft) + u(i.paddingRight) + u(i.borderLeftWidth) + u(i.borderRightWidth)
    }
    function f(t, e) {
        return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)),
        t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)),
        e
    }
    function m(t, i) {
        var n = {
            width: i.railXWidth
        };
        i.isRtl ? n.left = i.negativeScrollAdjustment + t.scrollLeft + i.containerWidth - i.contentWidth : n.left = t.scrollLeft,
        i.isScrollbarXUsingBottom ? n.bottom = i.scrollbarXBottom - t.scrollTop : n.top = i.scrollbarXTop + t.scrollTop,
        e(i.scrollbarXRail, n);
        var r = {
            top: t.scrollTop,
            height: i.railYHeight
        };
        i.isScrollbarYUsingRight ? i.isRtl ? r.right = i.contentWidth - (i.negativeScrollAdjustment + t.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth : r.right = i.scrollbarYRight - t.scrollLeft : i.isRtl ? r.left = i.negativeScrollAdjustment + t.scrollLeft + 2 * i.containerWidth - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth : r.left = i.scrollbarYLeft + t.scrollLeft,
        e(i.scrollbarYRail, r),
        e(i.scrollbarX, {
            left: i.scrollbarXLeft,
            width: i.scrollbarXWidth - i.railBorderXWidth
        }),
        e(i.scrollbarY, {
            top: i.scrollbarYTop,
            height: i.scrollbarYHeight - i.railBorderYWidth
        })
    }
    function g(t, e) {
        function i(e) {
            f[d] = m + _ * (e[l] - g),
            o(t, p),
            k(t),
            e.stopPropagation(),
            e.preventDefault()
        }
        function n() {
            a(t, p),
            t.event.unbind(t.ownerDocument, "mousemove", i)
        }
        var r = e[0]
          , s = e[1]
          , l = e[2]
          , c = e[3]
          , h = e[4]
          , u = e[5]
          , d = e[6]
          , p = e[7]
          , f = t.element
          , m = null
          , g = null
          , _ = null;
        t.event.bind(t[h], "mousedown", function(e) {
            m = f[d],
            g = e[l],
            _ = (t[s] - t[r]) / (t[c] - t[u]),
            t.event.bind(t.ownerDocument, "mousemove", i),
            t.event.once(t.ownerDocument, "mouseup", n),
            e.stopPropagation(),
            e.preventDefault()
        })
    }
    var _ = "undefined" != typeof Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector)
      , v = {
        main: "ps",
        element: {
            thumb: function(t) {
                return "ps__thumb-" + t
            },
            rail: function(t) {
                return "ps__rail-" + t
            },
            consuming: "ps__child--consume"
        },
        state: {
            focus: "ps--focus",
            active: function(t) {
                return "ps--active-" + t
            },
            scrolling: function(t) {
                return "ps--scrolling-" + t
            }
        }
    }
      , y = {
        x: null,
        y: null
    }
      , b = function(t) {
        this.element = t,
        this.handlers = {}
    }
      , w = {
        isEmpty: {
            configurable: !0
        }
    };
    b.prototype.bind = function(t, e) {
        void 0 === this.handlers[t] && (this.handlers[t] = []),
        this.handlers[t].push(e),
        this.element.addEventListener(t, e, !1)
    }
    ,
    b.prototype.unbind = function(t, e) {
        var i = this;
        this.handlers[t] = this.handlers[t].filter(function(n) {
            return !(!e || n === e) || (i.element.removeEventListener(t, n, !1),
            !1)
        })
    }
    ,
    b.prototype.unbindAll = function() {
        var t = this;
        for (var e in t.handlers)
            t.unbind(e)
    }
    ,
    w.isEmpty.get = function() {
        var t = this;
        return Object.keys(this.handlers).every(function(e) {
            return 0 === t.handlers[e].length
        })
    }
    ,
    Object.defineProperties(b.prototype, w);
    var T = function() {
        this.eventElements = []
    };
    T.prototype.eventElement = function(t) {
        var e = this.eventElements.filter(function(e) {
            return e.element === t
        })[0];
        return e || (e = new b(t),
        this.eventElements.push(e)),
        e
    }
    ,
    T.prototype.bind = function(t, e, i) {
        this.eventElement(t).bind(e, i)
    }
    ,
    T.prototype.unbind = function(t, e, i) {
        var n = this.eventElement(t);
        n.unbind(e, i),
        n.isEmpty && this.eventElements.splice(this.eventElements.indexOf(n), 1)
    }
    ,
    T.prototype.unbindAll = function() {
        this.eventElements.forEach(function(t) {
            return t.unbindAll()
        }),
        this.eventElements = []
    }
    ,
    T.prototype.once = function(t, e, i) {
        var n = this.eventElement(t)
          , r = function(t) {
            n.unbind(e, r),
            i(t)
        };
        n.bind(e, r)
    }
    ;
    var x = function(t, e, i, n, r) {
        void 0 === n && (n = !0),
        void 0 === r && (r = !1);
        var s;
        if ("top" === e)
            s = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];
        else {
            if ("left" !== e)
                throw new Error("A proper axis should be provided");
            s = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"]
        }
        h(t, i, s, n, r)
    }
      , S = {
        isWebKit: "undefined" != typeof document && "WebkitAppearance"in document.documentElement.style,
        supportsTouch: "undefined" != typeof window && ("ontouchstart"in window || window.DocumentTouch && document instanceof window.DocumentTouch),
        supportsIePointer: "undefined" != typeof navigator && navigator.msMaxTouchPoints,
        isChrome: "undefined" != typeof navigator && /Chrome/i.test(navigator && navigator.userAgent)
    }
      , k = function(t) {
        var e = t.element;
        t.containerWidth = e.clientWidth,
        t.containerHeight = e.clientHeight,
        t.contentWidth = e.scrollWidth,
        t.contentHeight = e.scrollHeight,
        e.contains(t.scrollbarXRail) || (s(e, v.element.rail("x")).forEach(function(t) {
            return r(t)
        }),
        e.appendChild(t.scrollbarXRail)),
        e.contains(t.scrollbarYRail) || (s(e, v.element.rail("y")).forEach(function(t) {
            return r(t)
        }),
        e.appendChild(t.scrollbarYRail)),
        !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth ? (t.scrollbarXActive = !0,
        t.railXWidth = t.containerWidth - t.railXMarginWidth,
        t.railXRatio = t.containerWidth / t.railXWidth,
        t.scrollbarXWidth = f(t, u(t.railXWidth * t.containerWidth / t.contentWidth)),
        t.scrollbarXLeft = u((t.negativeScrollAdjustment + e.scrollLeft) * (t.railXWidth - t.scrollbarXWidth) / (t.contentWidth - t.containerWidth))) : t.scrollbarXActive = !1,
        !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight ? (t.scrollbarYActive = !0,
        t.railYHeight = t.containerHeight - t.railYMarginHeight,
        t.railYRatio = t.containerHeight / t.railYHeight,
        t.scrollbarYHeight = f(t, u(t.railYHeight * t.containerHeight / t.contentHeight)),
        t.scrollbarYTop = u(e.scrollTop * (t.railYHeight - t.scrollbarYHeight) / (t.contentHeight - t.containerHeight))) : t.scrollbarYActive = !1,
        t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth),
        t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight),
        m(e, t),
        t.scrollbarXActive ? e.classList.add(v.state.active("x")) : (e.classList.remove(v.state.active("x")),
        t.scrollbarXWidth = 0,
        t.scrollbarXLeft = 0,
        e.scrollLeft = 0),
        t.scrollbarYActive ? e.classList.add(v.state.active("y")) : (e.classList.remove(v.state.active("y")),
        t.scrollbarYHeight = 0,
        t.scrollbarYTop = 0,
        e.scrollTop = 0)
    }
      , C = {
        "click-rail": function(t) {
            t.event.bind(t.scrollbarY, "mousedown", function(t) {
                return t.stopPropagation()
            }),
            t.event.bind(t.scrollbarYRail, "mousedown", function(e) {
                var i = e.pageY - window.pageYOffset - t.scrollbarYRail.getBoundingClientRect().top > t.scrollbarYTop ? 1 : -1;
                t.element.scrollTop += i * t.containerHeight,
                k(t),
                e.stopPropagation()
            }),
            t.event.bind(t.scrollbarX, "mousedown", function(t) {
                return t.stopPropagation()
            }),
            t.event.bind(t.scrollbarXRail, "mousedown", function(e) {
                var i = e.pageX - window.pageXOffset - t.scrollbarXRail.getBoundingClientRect().left > t.scrollbarXLeft ? 1 : -1;
                t.element.scrollLeft += i * t.containerWidth,
                k(t),
                e.stopPropagation()
            })
        },
        "drag-thumb": function(t) {
            g(t, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x"]),
            g(t, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y"])
        },
        keyboard: function(t) {
            function e(e, n) {
                var r = i.scrollTop;
                if (0 === e) {
                    if (!t.scrollbarYActive)
                        return !1;
                    if (0 === r && n > 0 || r >= t.contentHeight - t.containerHeight && n < 0)
                        return !t.settings.wheelPropagation
                }
                var s = i.scrollLeft;
                if (0 === n) {
                    if (!t.scrollbarXActive)
                        return !1;
                    if (0 === s && e < 0 || s >= t.contentWidth - t.containerWidth && e > 0)
                        return !t.settings.wheelPropagation
                }
                return !0
            }
            var i = t.element
              , r = function() {
                return n(i, ":hover")
            }
              , s = function() {
                return n(t.scrollbarX, ":focus") || n(t.scrollbarY, ":focus")
            };
            t.event.bind(t.ownerDocument, "keydown", function(n) {
                if (!(n.isDefaultPrevented && n.isDefaultPrevented() || n.defaultPrevented) && (r() || s())) {
                    var o = document.activeElement ? document.activeElement : t.ownerDocument.activeElement;
                    if (o) {
                        if ("IFRAME" === o.tagName)
                            o = o.contentDocument.activeElement;
                        else
                            for (; o.shadowRoot; )
                                o = o.shadowRoot.activeElement;
                        if (d(o))
                            return
                    }
                    var a = 0
                      , l = 0;
                    switch (n.which) {
                    case 37:
                        a = n.metaKey ? -t.contentWidth : n.altKey ? -t.containerWidth : -30;
                        break;
                    case 38:
                        l = n.metaKey ? t.contentHeight : n.altKey ? t.containerHeight : 30;
                        break;
                    case 39:
                        a = n.metaKey ? t.contentWidth : n.altKey ? t.containerWidth : 30;
                        break;
                    case 40:
                        l = n.metaKey ? -t.contentHeight : n.altKey ? -t.containerHeight : -30;
                        break;
                    case 32:
                        l = n.shiftKey ? t.containerHeight : -t.containerHeight;
                        break;
                    case 33:
                        l = t.containerHeight;
                        break;
                    case 34:
                        l = -t.containerHeight;
                        break;
                    case 36:
                        l = t.contentHeight;
                        break;
                    case 35:
                        l = -t.contentHeight;
                        break;
                    default:
                        return
                    }
                    t.settings.suppressScrollX && 0 !== a || t.settings.suppressScrollY && 0 !== l || (i.scrollTop -= l,
                    i.scrollLeft += a,
                    k(t),
                    e(a, l) && n.preventDefault())
                }
            })
        },
        wheel: function(e) {
            function i(t, i) {
                var n = 0 === o.scrollTop
                  , r = o.scrollTop + o.offsetHeight === o.scrollHeight
                  , s = 0 === o.scrollLeft
                  , a = o.scrollLeft + o.offsetWidth === o.offsetWidth;
                return !(Math.abs(i) > Math.abs(t) ? n || r : s || a) || !e.settings.wheelPropagation
            }
            function n(t) {
                var e = t.deltaX
                  , i = -1 * t.deltaY;
                return void 0 !== e && void 0 !== i || (e = -1 * t.wheelDeltaX / 6,
                i = t.wheelDeltaY / 6),
                t.deltaMode && 1 === t.deltaMode && (e *= 10,
                i *= 10),
                e !== e && i !== i && (e = 0,
                i = t.wheelDelta),
                t.shiftKey ? [-i, -e] : [e, i]
            }
            function r(e, i, n) {
                if (!S.isWebKit && o.querySelector("select:focus"))
                    return !0;
                if (!o.contains(e))
                    return !1;
                for (var r = e; r && r !== o; ) {
                    if (r.classList.contains(v.element.consuming))
                        return !0;
                    var s = t(r);
                    if ([s.overflow, s.overflowX, s.overflowY].join("").match(/(scroll|auto)/)) {
                        var a = r.scrollHeight - r.clientHeight;
                        if (a > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === a && n < 0))
                            return !0;
                        var l = r.scrollLeft - r.clientWidth;
                        if (l > 0 && !(0 === r.scrollLeft && i < 0 || r.scrollLeft === l && i > 0))
                            return !0
                    }
                    r = r.parentNode
                }
                return !1
            }
            function s(t) {
                var s = n(t)
                  , a = s[0]
                  , l = s[1];
                if (!r(t.target, a, l)) {
                    var c = !1;
                    e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (l ? o.scrollTop -= l * e.settings.wheelSpeed : o.scrollTop += a * e.settings.wheelSpeed,
                    c = !0) : e.scrollbarXActive && !e.scrollbarYActive && (a ? o.scrollLeft += a * e.settings.wheelSpeed : o.scrollLeft -= l * e.settings.wheelSpeed,
                    c = !0) : (o.scrollTop -= l * e.settings.wheelSpeed,
                    o.scrollLeft += a * e.settings.wheelSpeed),
                    k(e),
                    (c = c || i(a, l)) && !t.ctrlKey && (t.stopPropagation(),
                    t.preventDefault())
                }
            }
            var o = e.element;
            void 0 !== window.onwheel ? e.event.bind(o, "wheel", s) : void 0 !== window.onmousewheel && e.event.bind(o, "mousewheel", s)
        },
        touch: function(e) {
            function i(t, i) {
                var n = h.scrollTop
                  , r = h.scrollLeft
                  , s = Math.abs(t)
                  , o = Math.abs(i);
                if (o > s) {
                    if (i < 0 && n === e.contentHeight - e.containerHeight || i > 0 && 0 === n)
                        return 0 === window.scrollY && i > 0 && S.isChrome
                } else if (s > o && (t < 0 && r === e.contentWidth - e.containerWidth || t > 0 && 0 === r))
                    return !0;
                return !0
            }
            function n(t, i) {
                h.scrollTop -= i,
                h.scrollLeft -= t,
                k(e)
            }
            function r(t) {
                return t.targetTouches ? t.targetTouches[0] : t
            }
            function s(t) {
                return !(t.pointerType && "pen" === t.pointerType && 0 === t.buttons || (!t.targetTouches || 1 !== t.targetTouches.length) && (!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE))
            }
            function o(t) {
                if (s(t)) {
                    var e = r(t);
                    u.pageX = e.pageX,
                    u.pageY = e.pageY,
                    d = (new Date).getTime(),
                    null !== f && clearInterval(f)
                }
            }
            function a(e, i, n) {
                if (!h.contains(e))
                    return !1;
                for (var r = e; r && r !== h; ) {
                    if (r.classList.contains(v.element.consuming))
                        return !0;
                    var s = t(r);
                    if ([s.overflow, s.overflowX, s.overflowY].join("").match(/(scroll|auto)/)) {
                        var o = r.scrollHeight - r.clientHeight;
                        if (o > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === o && n < 0))
                            return !0;
                        var a = r.scrollLeft - r.clientWidth;
                        if (a > 0 && !(0 === r.scrollLeft && i < 0 || r.scrollLeft === a && i > 0))
                            return !0
                    }
                    r = r.parentNode
                }
                return !1
            }
            function l(t) {
                if (s(t)) {
                    var e = r(t)
                      , o = {
                        pageX: e.pageX,
                        pageY: e.pageY
                    }
                      , l = o.pageX - u.pageX
                      , c = o.pageY - u.pageY;
                    if (a(t.target, l, c))
                        return;
                    n(l, c),
                    u = o;
                    var h = (new Date).getTime()
                      , f = h - d;
                    f > 0 && (p.x = l / f,
                    p.y = c / f,
                    d = h),
                    i(l, c) && t.preventDefault()
                }
            }
            function c() {
                e.settings.swipeEasing && (clearInterval(f),
                f = setInterval(function() {
                    e.isInitialized ? clearInterval(f) : p.x || p.y ? Math.abs(p.x) < .01 && Math.abs(p.y) < .01 ? clearInterval(f) : (n(30 * p.x, 30 * p.y),
                    p.x *= .8,
                    p.y *= .8) : clearInterval(f)
                }, 10))
            }
            if (S.supportsTouch || S.supportsIePointer) {
                var h = e.element
                  , u = {}
                  , d = 0
                  , p = {}
                  , f = null;
                S.supportsTouch ? (e.event.bind(h, "touchstart", o),
                e.event.bind(h, "touchmove", l),
                e.event.bind(h, "touchend", c)) : S.supportsIePointer && (window.PointerEvent ? (e.event.bind(h, "pointerdown", o),
                e.event.bind(h, "pointermove", l),
                e.event.bind(h, "pointerup", c)) : window.MSPointerEvent && (e.event.bind(h, "MSPointerDown", o),
                e.event.bind(h, "MSPointerMove", l),
                e.event.bind(h, "MSPointerUp", c)))
            }
        }
    }
      , P = function(n, r) {
        var s = this;
        if (void 0 === r && (r = {}),
        "string" == typeof n && (n = document.querySelector(n)),
        !n || !n.nodeName)
            throw new Error("no element is specified to initialize PerfectScrollbar");
        this.element = n,
        n.classList.add(v.main),
        this.settings = {
            handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollingThreshold: 1e3,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            swipeEasing: !0,
            useBothWheelAxes: !1,
            wheelPropagation: !1,
            wheelSpeed: 1
        };
        for (var o in r)
            s.settings[o] = r[o];
        this.containerWidth = null,
        this.containerHeight = null,
        this.contentWidth = null,
        this.contentHeight = null;
        var a = function() {
            return n.classList.add(v.state.focus)
        }
          , l = function() {
            return n.classList.remove(v.state.focus)
        };
        this.isRtl = "rtl" === t(n).direction,
        this.isNegativeScroll = function() {
            var t = n.scrollLeft
              , e = null;
            return n.scrollLeft = -1,
            e = n.scrollLeft < 0,
            n.scrollLeft = t,
            e
        }(),
        this.negativeScrollAdjustment = this.isNegativeScroll ? n.scrollWidth - n.clientWidth : 0,
        this.event = new T,
        this.ownerDocument = n.ownerDocument || document,
        this.scrollbarXRail = i(v.element.rail("x")),
        n.appendChild(this.scrollbarXRail),
        this.scrollbarX = i(v.element.thumb("x")),
        this.scrollbarXRail.appendChild(this.scrollbarX),
        this.scrollbarX.setAttribute("tabindex", 0),
        this.event.bind(this.scrollbarX, "focus", a),
        this.event.bind(this.scrollbarX, "blur", l),
        this.scrollbarXActive = null,
        this.scrollbarXWidth = null,
        this.scrollbarXLeft = null;
        var c = t(this.scrollbarXRail);
        this.scrollbarXBottom = parseInt(c.bottom, 10),
        isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1,
        this.scrollbarXTop = u(c.top)) : this.isScrollbarXUsingBottom = !0,
        this.railBorderXWidth = u(c.borderLeftWidth) + u(c.borderRightWidth),
        e(this.scrollbarXRail, {
            display: "block"
        }),
        this.railXMarginWidth = u(c.marginLeft) + u(c.marginRight),
        e(this.scrollbarXRail, {
            display: ""
        }),
        this.railXWidth = null,
        this.railXRatio = null,
        this.scrollbarYRail = i(v.element.rail("y")),
        n.appendChild(this.scrollbarYRail),
        this.scrollbarY = i(v.element.thumb("y")),
        this.scrollbarYRail.appendChild(this.scrollbarY),
        this.scrollbarY.setAttribute("tabindex", 0),
        this.event.bind(this.scrollbarY, "focus", a),
        this.event.bind(this.scrollbarY, "blur", l),
        this.scrollbarYActive = null,
        this.scrollbarYHeight = null,
        this.scrollbarYTop = null;
        var h = t(this.scrollbarYRail);
        this.scrollbarYRight = parseInt(h.right, 10),
        isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1,
        this.scrollbarYLeft = u(h.left)) : this.isScrollbarYUsingRight = !0,
        this.scrollbarYOuterWidth = this.isRtl ? p(this.scrollbarY) : null,
        this.railBorderYWidth = u(h.borderTopWidth) + u(h.borderBottomWidth),
        e(this.scrollbarYRail, {
            display: "block"
        }),
        this.railYMarginHeight = u(h.marginTop) + u(h.marginBottom),
        e(this.scrollbarYRail, {
            display: ""
        }),
        this.railYHeight = null,
        this.railYRatio = null,
        this.reach = {
            x: n.scrollLeft <= 0 ? "start" : n.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
            y: n.scrollTop <= 0 ? "start" : n.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
        },
        this.isAlive = !0,
        this.settings.handlers.forEach(function(t) {
            return C[t](s)
        }),
        this.lastScrollTop = n.scrollTop,
        this.lastScrollLeft = n.scrollLeft,
        this.event.bind(this.element, "scroll", function(t) {
            return s.onScroll(t)
        }),
        k(this)
    };
    return P.prototype.update = function() {
        this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0,
        e(this.scrollbarXRail, {
            display: "block"
        }),
        e(this.scrollbarYRail, {
            display: "block"
        }),
        this.railXMarginWidth = u(t(this.scrollbarXRail).marginLeft) + u(t(this.scrollbarXRail).marginRight),
        this.railYMarginHeight = u(t(this.scrollbarYRail).marginTop) + u(t(this.scrollbarYRail).marginBottom),
        e(this.scrollbarXRail, {
            display: "none"
        }),
        e(this.scrollbarYRail, {
            display: "none"
        }),
        k(this),
        x(this, "top", 0, !1, !0),
        x(this, "left", 0, !1, !0),
        e(this.scrollbarXRail, {
            display: ""
        }),
        e(this.scrollbarYRail, {
            display: ""
        }))
    }
    ,
    P.prototype.onScroll = function(t) {
        this.isAlive && (k(this),
        x(this, "top", this.element.scrollTop - this.lastScrollTop),
        x(this, "left", this.element.scrollLeft - this.lastScrollLeft),
        this.lastScrollTop = this.element.scrollTop,
        this.lastScrollLeft = this.element.scrollLeft)
    }
    ,
    P.prototype.destroy = function() {
        this.isAlive && (this.event.unbindAll(),
        r(this.scrollbarX),
        r(this.scrollbarY),
        r(this.scrollbarXRail),
        r(this.scrollbarYRail),
        this.removePsClasses(),
        this.element = null,
        this.scrollbarX = null,
        this.scrollbarY = null,
        this.scrollbarXRail = null,
        this.scrollbarYRail = null,
        this.isAlive = !1)
    }
    ,
    P.prototype.removePsClasses = function() {
        this.element.className = this.element.className.split(" ").filter(function(t) {
            return !t.match(/^ps([-_].+|)$/)
        }).join(" ")
    }
    ,
    P
});
