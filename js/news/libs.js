/*! selectize.js - v0.12.4 | https://github.com/selectize/selectize.js | Apache License (v2) */
!function(a, b) {
    "function" == typeof define && define.amd ? define("sifter", b) : "object" == typeof exports ? module.exports = b() : a.Sifter = b()
}(this, function() {
    var a = function(a, b) {
        this.items = a,
        this.settings = b || {
            diacritics: !0
        }
    };
    a.prototype.tokenize = function(a) {
        if (a = e(String(a || "").toLowerCase()),
        !a || !a.length)
            return [];
        var b, c, d, g, i = [], j = a.split(/ +/);
        for (b = 0,
        c = j.length; b < c; b++) {
            if (d = f(j[b]),
            this.settings.diacritics)
                for (g in h)
                    h.hasOwnProperty(g) && (d = d.replace(new RegExp(g,"g"), h[g]));
            i.push({
                string: j[b],
                regex: new RegExp(d,"i")
            })
        }
        return i
    }
    ,
    a.prototype.iterator = function(a, b) {
        var c;
        c = g(a) ? Array.prototype.forEach || function(a) {
            for (var b = 0, c = this.length; b < c; b++)
                a(this[b], b, this)
        }
        : function(a) {
            for (var b in this)
                this.hasOwnProperty(b) && a(this[b], b, this)
        }
        ,
        c.apply(a, [b])
    }
    ,
    a.prototype.getScoreFunction = function(a, b) {
        var c, e, f, g, h;
        c = this,
        a = c.prepareSearch(a, b),
        f = a.tokens,
        e = a.options.fields,
        g = f.length,
        h = a.options.nesting;
        var i = function(a, b) {
            var c, d;
            return a ? (a = String(a || ""),
            d = a.search(b.regex),
            d === -1 ? 0 : (c = b.string.length / a.length,
            0 === d && (c += .5),
            c)) : 0
        }
          , j = function() {
            var a = e.length;
            return a ? 1 === a ? function(a, b) {
                return i(d(b, e[0], h), a)
            }
            : function(b, c) {
                for (var f = 0, g = 0; f < a; f++)
                    g += i(d(c, e[f], h), b);
                return g / a
            }
            : function() {
                return 0
            }
        }();
        return g ? 1 === g ? function(a) {
            return j(f[0], a)
        }
        : "and" === a.options.conjunction ? function(a) {
            for (var b, c = 0, d = 0; c < g; c++) {
                if (b = j(f[c], a),
                b <= 0)
                    return 0;
                d += b
            }
            return d / g
        }
        : function(a) {
            for (var b = 0, c = 0; b < g; b++)
                c += j(f[b], a);
            return c / g
        }
        : function() {
            return 0
        }
    }
    ,
    a.prototype.getSortFunction = function(a, c) {
        var e, f, g, h, i, j, k, l, m, n, o;
        if (g = this,
        a = g.prepareSearch(a, c),
        o = !a.query && c.sort_empty || c.sort,
        m = function(a, b) {
            return "$score" === a ? b.score : d(g.items[b.id], a, c.nesting)
        }
        ,
        i = [],
        o)
            for (e = 0,
            f = o.length; e < f; e++)
                (a.query || "$score" !== o[e].field) && i.push(o[e]);
        if (a.query) {
            for (n = !0,
            e = 0,
            f = i.length; e < f; e++)
                if ("$score" === i[e].field) {
                    n = !1;
                    break
                }
            n && i.unshift({
                field: "$score",
                direction: "desc"
            })
        } else
            for (e = 0,
            f = i.length; e < f; e++)
                if ("$score" === i[e].field) {
                    i.splice(e, 1);
                    break
                }
        for (l = [],
        e = 0,
        f = i.length; e < f; e++)
            l.push("desc" === i[e].direction ? -1 : 1);
        return j = i.length,
        j ? 1 === j ? (h = i[0].field,
        k = l[0],
        function(a, c) {
            return k * b(m(h, a), m(h, c))
        }
        ) : function(a, c) {
            var d, e, f;
            for (d = 0; d < j; d++)
                if (f = i[d].field,
                e = l[d] * b(m(f, a), m(f, c)))
                    return e;
            return 0
        }
        : null
    }
    ,
    a.prototype.prepareSearch = function(a, b) {
        if ("object" == typeof a)
            return a;
        b = c({}, b);
        var d = b.fields
          , e = b.sort
          , f = b.sort_empty;
        return d && !g(d) && (b.fields = [d]),
        e && !g(e) && (b.sort = [e]),
        f && !g(f) && (b.sort_empty = [f]),
        {
            options: b,
            query: String(a || "").toLowerCase(),
            tokens: this.tokenize(a),
            total: 0,
            items: []
        }
    }
    ,
    a.prototype.search = function(a, b) {
        var c, d, e, f, g = this;
        return d = this.prepareSearch(a, b),
        b = d.options,
        a = d.query,
        f = b.score || g.getScoreFunction(d),
        a.length ? g.iterator(g.items, function(a, e) {
            c = f(a),
            (b.filter === !1 || c > 0) && d.items.push({
                score: c,
                id: e
            })
        }) : g.iterator(g.items, function(a, b) {
            d.items.push({
                score: 1,
                id: b
            })
        }),
        e = g.getSortFunction(d, b),
        e && d.items.sort(e),
        d.total = d.items.length,
        "number" == typeof b.limit && (d.items = d.items.slice(0, b.limit)),
        d
    }
    ;
    var b = function(a, b) {
        return "number" == typeof a && "number" == typeof b ? a > b ? 1 : a < b ? -1 : 0 : (a = i(String(a || "")),
        b = i(String(b || "")),
        a > b ? 1 : b > a ? -1 : 0)
    }
      , c = function(a, b) {
        var c, d, e, f;
        for (c = 1,
        d = arguments.length; c < d; c++)
            if (f = arguments[c])
                for (e in f)
                    f.hasOwnProperty(e) && (a[e] = f[e]);
        return a
    }
      , d = function(a, b, c) {
        if (a && b) {
            if (!c)
                return a[b];
            for (var d = b.split("."); d.length && (a = a[d.shift()]); )
                ;
            return a
        }
    }
      , e = function(a) {
        return (a + "").replace(/^\s+|\s+$|/g, "")
    }
      , f = function(a) {
        return (a + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    }
      , g = Array.isArray || "undefined" != typeof $ && $.isArray || function(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }
      , h = {
        a: "[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]",
        b: "[b␢βΒB฿𐌁ᛒ]",
        c: "[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]",
        d: "[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]",
        e: "[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]",
        f: "[fƑƒḞḟ]",
        g: "[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]",
        h: "[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]",
        i: "[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]",
        j: "[jȷĴĵɈɉʝɟʲ]",
        k: "[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]",
        l: "[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]",
        n: "[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]",
        o: "[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]",
        p: "[pṔṕṖṗⱣᵽƤƥᵱ]",
        q: "[qꝖꝗʠɊɋꝘꝙq̃]",
        r: "[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]",
        s: "[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]",
        t: "[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]",
        u: "[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]",
        v: "[vṼṽṾṿƲʋꝞꝟⱱʋ]",
        w: "[wẂẃẀẁŴŵẄẅẆẇẈẉ]",
        x: "[xẌẍẊẋχ]",
        y: "[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]",
        z: "[zŹźẐẑŽžŻżẒẓẔẕƵƶ]"
    }
      , i = function() {
        var a, b, c, d, e = "", f = {};
        for (c in h)
            if (h.hasOwnProperty(c))
                for (d = h[c].substring(2, h[c].length - 1),
                e += d,
                a = 0,
                b = d.length; a < b; a++)
                    f[d.charAt(a)] = c;
        var g = new RegExp("[" + e + "]","g");
        return function(a) {
            return a.replace(g, function(a) {
                return f[a]
            }).toLowerCase()
        }
    }();
    return a
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("microplugin", b) : "object" == typeof exports ? module.exports = b() : a.MicroPlugin = b()
}(this, function() {
    var a = {};
    a.mixin = function(a) {
        a.plugins = {},
        a.prototype.initializePlugins = function(a) {
            var c, d, e, f = this, g = [];
            if (f.plugins = {
                names: [],
                settings: {},
                requested: {},
                loaded: {}
            },
            b.isArray(a))
                for (c = 0,
                d = a.length; c < d; c++)
                    "string" == typeof a[c] ? g.push(a[c]) : (f.plugins.settings[a[c].name] = a[c].options,
                    g.push(a[c].name));
            else if (a)
                for (e in a)
                    a.hasOwnProperty(e) && (f.plugins.settings[e] = a[e],
                    g.push(e));
            for (; g.length; )
                f.require(g.shift())
        }
        ,
        a.prototype.loadPlugin = function(b) {
            var c = this
              , d = c.plugins
              , e = a.plugins[b];
            if (!a.plugins.hasOwnProperty(b))
                throw new Error('Unable to find "' + b + '" plugin');
            d.requested[b] = !0,
            d.loaded[b] = e.fn.apply(c, [c.plugins.settings[b] || {}]),
            d.names.push(b)
        }
        ,
        a.prototype.require = function(a) {
            var b = this
              , c = b.plugins;
            if (!b.plugins.loaded.hasOwnProperty(a)) {
                if (c.requested[a])
                    throw new Error('Plugin has circular dependency ("' + a + '")');
                b.loadPlugin(a)
            }
            return c.loaded[a]
        }
        ,
        a.define = function(b, c) {
            a.plugins[b] = {
                name: b,
                fn: c
            }
        }
    }
    ;
    var b = {
        isArray: Array.isArray || function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }
    };
    return a
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("selectize", ["jquery", "sifter", "microplugin"], b) : "object" == typeof exports ? module.exports = b(require("jquery"), require("sifter"), require("microplugin")) : a.Selectize = b(a.jQuery, a.Sifter, a.MicroPlugin)
}(this, function(a, b, c) {
    "use strict";
    var d = function(a, b) {
        if ("string" != typeof b || b.length) {
            var c = "string" == typeof b ? new RegExp(b,"i") : b
              , d = function(a) {
                var b = 0;
                if (3 === a.nodeType) {
                    var e = a.data.search(c);
                    if (e >= 0 && a.data.length > 0) {
                        var f = a.data.match(c)
                          , g = document.createElement("span");
                        g.className = "highlight";
                        var h = a.splitText(e)
                          , i = (h.splitText(f[0].length),
                        h.cloneNode(!0));
                        g.appendChild(i),
                        h.parentNode.replaceChild(g, h),
                        b = 1
                    }
                } else if (1 === a.nodeType && a.childNodes && !/(script|style)/i.test(a.tagName))
                    for (var j = 0; j < a.childNodes.length; ++j)
                        j += d(a.childNodes[j]);
                return b
            };
            return a.each(function() {
                d(this)
            })
        }
    };
    a.fn.removeHighlight = function() {
        return this.find("span.highlight").each(function() {
            this.parentNode.firstChild.nodeName;
            var a = this.parentNode;
            a.replaceChild(this.firstChild, this),
            a.normalize()
        }).end()
    }
    ;
    var e = function() {};
    e.prototype = {
        on: function(a, b) {
            this._events = this._events || {},
            this._events[a] = this._events[a] || [],
            this._events[a].push(b)
        },
        off: function(a, b) {
            var c = arguments.length;
            return 0 === c ? delete this._events : 1 === c ? delete this._events[a] : (this._events = this._events || {},
            void (a in this._events != !1 && this._events[a].splice(this._events[a].indexOf(b), 1)))
        },
        trigger: function(a) {
            if (this._events = this._events || {},
            a in this._events != !1)
                for (var b = 0; b < this._events[a].length; b++)
                    this._events[a][b].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    },
    e.mixin = function(a) {
        for (var b = ["on", "off", "trigger"], c = 0; c < b.length; c++)
            a.prototype[b[c]] = e.prototype[b[c]]
    }
    ;
    var f = /Mac/.test(navigator.userAgent)
      , g = 65
      , h = 13
      , i = 27
      , j = 37
      , k = 38
      , l = 80
      , m = 39
      , n = 40
      , o = 78
      , p = 8
      , q = 46
      , r = 16
      , s = f ? 91 : 17
      , t = f ? 18 : 17
      , u = 9
      , v = 1
      , w = 2
      , x = !/android/i.test(window.navigator.userAgent) && !!document.createElement("input").validity
      , y = function(a) {
        return "undefined" != typeof a
    }
      , z = function(a) {
        return "undefined" == typeof a || null === a ? null : "boolean" == typeof a ? a ? "1" : "0" : a + ""
    }
      , A = function(a) {
        return (a + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }
      , B = {};
    B.before = function(a, b, c) {
        var d = a[b];
        a[b] = function() {
            return c.apply(a, arguments),
            d.apply(a, arguments)
        }
    }
    ,
    B.after = function(a, b, c) {
        var d = a[b];
        a[b] = function() {
            var b = d.apply(a, arguments);
            return c.apply(a, arguments),
            b
        }
    }
    ;
    var C = function(a) {
        var b = !1;
        return function() {
            b || (b = !0,
            a.apply(this, arguments))
        }
    }
      , D = function(a, b) {
        var c;
        return function() {
            var d = this
              , e = arguments;
            window.clearTimeout(c),
            c = window.setTimeout(function() {
                a.apply(d, e)
            }, b)
        }
    }
      , E = function(a, b, c) {
        var d, e = a.trigger, f = {};
        a.trigger = function() {
            var c = arguments[0];
            return b.indexOf(c) === -1 ? e.apply(a, arguments) : void (f[c] = arguments)
        }
        ,
        c.apply(a, []),
        a.trigger = e;
        for (d in f)
            f.hasOwnProperty(d) && e.apply(a, f[d])
    }
      , F = function(a, b, c, d) {
        a.on(b, c, function(b) {
            for (var c = b.target; c && c.parentNode !== a[0]; )
                c = c.parentNode;
            return b.currentTarget = c,
            d.apply(this, [b])
        })
    }
      , G = function(a) {
        var b = {};
        if ("selectionStart"in a)
            b.start = a.selectionStart,
            b.length = a.selectionEnd - b.start;
        else if (document.selection) {
            a.focus();
            var c = document.selection.createRange()
              , d = document.selection.createRange().text.length;
            c.moveStart("character", -a.value.length),
            b.start = c.text.length - d,
            b.length = d
        }
        return b
    }
      , H = function(a, b, c) {
        var d, e, f = {};
        if (c)
            for (d = 0,
            e = c.length; d < e; d++)
                f[c[d]] = a.css(c[d]);
        else
            f = a.css();
        b.css(f)
    }
      , I = function(b, c) {
        if (!b)
            return 0;
        var d = a("<test>").css({
            position: "absolute",
            top: -99999,
            left: -99999,
            width: "auto",
            padding: 0,
            whiteSpace: "pre"
        }).text(b).appendTo("body");
        H(c, d, ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]);
        var e = d.width();
        return d.remove(),
        e
    }
      , J = function(a) {
        var b = null
          , c = function(c, d) {
            var e, f, g, h, i, j, k, l;
            c = c || window.event || {},
            d = d || {},
            c.metaKey || c.altKey || (d.force || a.data("grow") !== !1) && (e = a.val(),
            c.type && "keydown" === c.type.toLowerCase() && (f = c.keyCode,
            g = f >= 97 && f <= 122 || f >= 65 && f <= 90 || f >= 48 && f <= 57 || 32 === f,
            f === q || f === p ? (l = G(a[0]),
            l.length ? e = e.substring(0, l.start) + e.substring(l.start + l.length) : f === p && l.start ? e = e.substring(0, l.start - 1) + e.substring(l.start + 1) : f === q && "undefined" != typeof l.start && (e = e.substring(0, l.start) + e.substring(l.start + 1))) : g && (j = c.shiftKey,
            k = String.fromCharCode(c.keyCode),
            k = j ? k.toUpperCase() : k.toLowerCase(),
            e += k)),
            h = a.attr("placeholder"),
            !e && h && (e = h),
            i = I(e, a) + 4,
            i !== b && (b = i,
            a.width(i),
            a.triggerHandler("resize")))
        };
        a.on("keydown keyup update blur", c),
        c()
    }
      , K = function(a) {
        var b = document.createElement("div");
        return b.appendChild(a.cloneNode(!0)),
        b.innerHTML
    }
      , L = function(a, b) {
        b || (b = {});
        var c = "Selectize";
        console.error(c + ": " + a),
        b.explanation && (console.group && console.group(),
        console.error(b.explanation),
        console.group && console.groupEnd())
    }
      , M = function(c, d) {
        var e, f, g, h, i = this;
        h = c[0],
        h.selectize = i;
        var j = window.getComputedStyle && window.getComputedStyle(h, null);
        if (g = j ? j.getPropertyValue("direction") : h.currentStyle && h.currentStyle.direction,
        g = g || c.parents("[dir]:first").attr("dir") || "",
        a.extend(i, {
            order: 0,
            settings: d,
            $input: c,
            tabIndex: c.attr("tabindex") || "",
            tagType: "select" === h.tagName.toLowerCase() ? v : w,
            rtl: /rtl/i.test(g),
            eventNS: ".selectize" + ++M.count,
            highlightedValue: null,
            isOpen: !1,
            isDisabled: !1,
            isRequired: c.is("[required]"),
            isInvalid: !1,
            isLocked: !1,
            isFocused: !1,
            isInputHidden: !1,
            isSetup: !1,
            isShiftDown: !1,
            isCmdDown: !1,
            isCtrlDown: !1,
            ignoreFocus: !1,
            ignoreBlur: !1,
            ignoreHover: !1,
            hasOptions: !1,
            currentResults: null,
            lastValue: "",
            caretPos: 0,
            loading: 0,
            loadedSearches: {},
            $activeOption: null,
            $activeItems: [],
            optgroups: {},
            options: {},
            userOptions: {},
            items: [],
            renderCache: {},
            onSearchChange: null === d.loadThrottle ? i.onSearchChange : D(i.onSearchChange, d.loadThrottle)
        }),
        i.sifter = new b(this.options,{
            diacritics: d.diacritics
        }),
        i.settings.options) {
            for (e = 0,
            f = i.settings.options.length; e < f; e++)
                i.registerOption(i.settings.options[e]);
            delete i.settings.options
        }
        if (i.settings.optgroups) {
            for (e = 0,
            f = i.settings.optgroups.length; e < f; e++)
                i.registerOptionGroup(i.settings.optgroups[e]);
            delete i.settings.optgroups
        }
        i.settings.mode = i.settings.mode || (1 === i.settings.maxItems ? "single" : "multi"),
        "boolean" != typeof i.settings.hideSelected && (i.settings.hideSelected = "multi" === i.settings.mode),
        i.initializePlugins(i.settings.plugins),
        i.setupCallbacks(),
        i.setupTemplates(),
        i.setup()
    };
    return e.mixin(M),
    "undefined" != typeof c ? c.mixin(M) : L("Dependency MicroPlugin is missing", {
        explanation: 'Make sure you either: (1) are using the "standalone" version of Selectize, or (2) require MicroPlugin before you load Selectize.'
    }),
    a.extend(M.prototype, {
        setup: function() {
            var b, c, d, e, g, h, i, j, k, l, m = this, n = m.settings, o = m.eventNS, p = a(window), q = a(document), u = m.$input;
            if (i = m.settings.mode,
            j = u.attr("class") || "",
            b = a("<div>").addClass(n.wrapperClass).addClass(j).addClass(i),
            c = a("<div>").addClass(n.inputClass).addClass("items").appendTo(b),
            d = a('<input type="text" autocomplete="off" />').appendTo(c).attr("tabindex", u.is(":disabled") ? "-1" : m.tabIndex),
            h = a(n.dropdownParent || b),
            e = a("<div>").addClass(n.dropdownClass).addClass(i).hide().appendTo(h),
            g = a("<div>").addClass(n.dropdownContentClass).appendTo(e),
            (l = u.attr("id")) && (d.attr("id", l + "-selectized"),
            a("label[for='" + l + "']").attr("for", l + "-selectized")),
            m.settings.copyClassesToDropdown && e.addClass(j),
            b.css({
                width: u[0].style.width
            }),
            m.plugins.names.length && (k = "plugin-" + m.plugins.names.join(" plugin-"),
            b.addClass(k),
            e.addClass(k)),
            (null === n.maxItems || n.maxItems > 1) && m.tagType === v && u.attr("multiple", "multiple"),
            m.settings.placeholder && d.attr("placeholder", n.placeholder),
            !m.settings.splitOn && m.settings.delimiter) {
                var w = m.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                m.settings.splitOn = new RegExp("\\s*" + w + "+\\s*")
            }
            u.attr("autocorrect") && d.attr("autocorrect", u.attr("autocorrect")),
            u.attr("autocapitalize") && d.attr("autocapitalize", u.attr("autocapitalize")),
            m.$wrapper = b,
            m.$control = c,
            m.$control_input = d,
            m.$dropdown = e,
            m.$dropdown_content = g,
            e.on("mouseenter", "[data-selectable]", function() {
                return m.onOptionHover.apply(m, arguments)
            }),
            e.on("mousedown click", "[data-selectable]", function() {
                return m.onOptionSelect.apply(m, arguments)
            }),
            F(c, "mousedown", "*:not(input)", function() {
                return m.onItemSelect.apply(m, arguments)
            }),
            J(d),
            c.on({
                mousedown: function() {
                    return m.onMouseDown.apply(m, arguments)
                },
                click: function() {
                    return m.onClick.apply(m, arguments)
                }
            }),
            d.on({
                mousedown: function(a) {
                    a.stopPropagation()
                },
                keydown: function() {
                    return m.onKeyDown.apply(m, arguments)
                },
                keyup: function() {
                    return m.onKeyUp.apply(m, arguments)
                },
                keypress: function() {
                    return m.onKeyPress.apply(m, arguments)
                },
                resize: function() {
                    m.positionDropdown.apply(m, [])
                },
                blur: function() {
                    return m.onBlur.apply(m, arguments)
                },
                focus: function() {
                    return m.ignoreBlur = !1,
                    m.onFocus.apply(m, arguments)
                },
                paste: function() {
                    return m.onPaste.apply(m, arguments)
                }
            }),
            q.on("keydown" + o, function(a) {
                m.isCmdDown = a[f ? "metaKey" : "ctrlKey"],
                m.isCtrlDown = a[f ? "altKey" : "ctrlKey"],
                m.isShiftDown = a.shiftKey
            }),
            q.on("keyup" + o, function(a) {
                a.keyCode === t && (m.isCtrlDown = !1),
                a.keyCode === r && (m.isShiftDown = !1),
                a.keyCode === s && (m.isCmdDown = !1)
            }),
            q.on("mousedown" + o, function(a) {
                if (m.isFocused) {
                    if (a.target === m.$dropdown[0] || a.target.parentNode === m.$dropdown[0])
                        return !1;
                    m.$control.has(a.target).length || a.target === m.$control[0] || m.blur(a.target)
                }
            }),
            p.on(["scroll" + o, "resize" + o].join(" "), function() {
                m.isOpen && m.positionDropdown.apply(m, arguments)
            }),
            p.on("mousemove" + o, function() {
                m.ignoreHover = !1
            }),
            this.revertSettings = {
                $children: u.children().detach(),
                tabindex: u.attr("tabindex")
            },
            u.attr("tabindex", -1).hide().after(m.$wrapper),
            a.isArray(n.items) && (m.setValue(n.items),
            delete n.items),
            x && u.on("invalid" + o, function(a) {
                a.preventDefault(),
                m.isInvalid = !0,
                m.refreshState()
            }),
            m.updateOriginalInput(),
            m.refreshItems(),
            m.refreshState(),
            m.updatePlaceholder(),
            m.isSetup = !0,
            u.is(":disabled") && m.disable(),
            m.on("change", this.onChange),
            u.data("selectize", m),
            u.addClass("selectized"),
            m.trigger("initialize"),
            n.preload === !0 && m.onSearchChange("")
        },
        setupTemplates: function() {
            var b = this
              , c = b.settings.labelField
              , d = b.settings.optgroupLabelField
              , e = {
                optgroup: function(a) {
                    return '<div class="optgroup">' + a.html + "</div>"
                },
                optgroup_header: function(a, b) {
                    return '<div class="optgroup-header">' + b(a[d]) + "</div>"
                },
                option: function(a, b) {
                    return '<div class="option">' + b(a[c]) + "</div>"
                },
                item: function(a, b) {
                    return '<div class="item">' + b(a[c]) + "</div>"
                },
                option_create: function(a, b) {
                    return '<div class="create">Add <strong>' + b(a.input) + "</strong>&hellip;</div>"
                }
            };
            b.settings.render = a.extend({}, e, b.settings.render)
        },
        setupCallbacks: function() {
            var a, b, c = {
                initialize: "onInitialize",
                change: "onChange",
                item_add: "onItemAdd",
                item_remove: "onItemRemove",
                clear: "onClear",
                option_add: "onOptionAdd",
                option_remove: "onOptionRemove",
                option_clear: "onOptionClear",
                optgroup_add: "onOptionGroupAdd",
                optgroup_remove: "onOptionGroupRemove",
                optgroup_clear: "onOptionGroupClear",
                dropdown_open: "onDropdownOpen",
                dropdown_close: "onDropdownClose",
                type: "onType",
                load: "onLoad",
                focus: "onFocus",
                blur: "onBlur"
            };
            for (a in c)
                c.hasOwnProperty(a) && (b = this.settings[c[a]],
                b && this.on(a, b))
        },
        onClick: function(a) {
            var b = this;
            b.isFocused || (b.focus(),
            a.preventDefault())
        },
        onMouseDown: function(b) {
            var c = this
              , d = b.isDefaultPrevented();
            a(b.target);
            if (c.isFocused) {
                if (b.target !== c.$control_input[0])
                    return "single" === c.settings.mode ? c.isOpen ? c.close() : c.open() : d || c.setActiveItem(null),
                    !1
            } else
                d || window.setTimeout(function() {
                    c.focus()
                }, 0)
        },
        onChange: function() {
            this.$input.trigger("change")
        },
        onPaste: function(b) {
            var c = this;
            return c.isFull() || c.isInputHidden || c.isLocked ? void b.preventDefault() : void (c.settings.splitOn && setTimeout(function() {
                var b = c.$control_input.val();
                if (b.match(c.settings.splitOn))
                    for (var d = a.trim(b).split(c.settings.splitOn), e = 0, f = d.length; e < f; e++)
                        c.createItem(d[e])
            }, 0))
        },
        onKeyPress: function(a) {
            if (this.isLocked)
                return a && a.preventDefault();
            var b = String.fromCharCode(a.keyCode || a.which);
            return this.settings.create && "multi" === this.settings.mode && b === this.settings.delimiter ? (this.createItem(),
            a.preventDefault(),
            !1) : void 0
        },
        onKeyDown: function(a) {
            var b = (a.target === this.$control_input[0],
            this);
            if (b.isLocked)
                return void (a.keyCode !== u && a.preventDefault());
            switch (a.keyCode) {
            case g:
                if (b.isCmdDown)
                    return void b.selectAll();
                break;
            case i:
                return void (b.isOpen && (a.preventDefault(),
                a.stopPropagation(),
                b.close()));
            case o:
                if (!a.ctrlKey || a.altKey)
                    break;
            case n:
                if (!b.isOpen && b.hasOptions)
                    b.open();
                else if (b.$activeOption) {
                    b.ignoreHover = !0;
                    var c = b.getAdjacentOption(b.$activeOption, 1);
                    c.length && b.setActiveOption(c, !0, !0)
                }
                return void a.preventDefault();
            case l:
                if (!a.ctrlKey || a.altKey)
                    break;
            case k:
                if (b.$activeOption) {
                    b.ignoreHover = !0;
                    var d = b.getAdjacentOption(b.$activeOption, -1);
                    d.length && b.setActiveOption(d, !0, !0)
                }
                return void a.preventDefault();
            case h:
                return void (b.isOpen && b.$activeOption && (b.onOptionSelect({
                    currentTarget: b.$activeOption
                }),
                a.preventDefault()));
            case j:
                return void b.advanceSelection(-1, a);
            case m:
                return void b.advanceSelection(1, a);
            case u:
                return b.settings.selectOnTab && b.isOpen && b.$activeOption && (b.onOptionSelect({
                    currentTarget: b.$activeOption
                }),
                b.isFull() || a.preventDefault()),
                void (b.settings.create && b.createItem() && a.preventDefault());
            case p:
            case q:
                return void b.deleteSelection(a)
            }
            return !b.isFull() && !b.isInputHidden || (f ? a.metaKey : a.ctrlKey) ? void 0 : void a.preventDefault()
        },
        onKeyUp: function(a) {
            var b = this;
            if (b.isLocked)
                return a && a.preventDefault();
            var c = b.$control_input.val() || "";
            b.lastValue !== c && (b.lastValue = c,
            b.onSearchChange(c),
            b.refreshOptions(),
            b.trigger("type", c))
        },
        onSearchChange: function(a) {
            var b = this
              , c = b.settings.load;
            c && (b.loadedSearches.hasOwnProperty(a) || (b.loadedSearches[a] = !0,
            b.load(function(d) {
                c.apply(b, [a, d])
            })))
        },
        onFocus: function(a) {
            var b = this
              , c = b.isFocused;
            return b.isDisabled ? (b.blur(),
            a && a.preventDefault(),
            !1) : void (b.ignoreFocus || (b.isFocused = !0,
            "focus" === b.settings.preload && b.onSearchChange(""),
            c || b.trigger("focus"),
            b.$activeItems.length || (b.showInput(),
            b.setActiveItem(null),
            b.refreshOptions(!!b.settings.openOnFocus)),
            b.refreshState()))
        },
        onBlur: function(a, b) {
            var c = this;
            if (c.isFocused && (c.isFocused = !1,
            !c.ignoreFocus)) {
                if (!c.ignoreBlur && document.activeElement === c.$dropdown_content[0])
                    return c.ignoreBlur = !0,
                    void c.onFocus(a);
                var d = function() {
                    c.close(),
                    c.setTextboxValue(""),
                    c.setActiveItem(null),
                    c.setActiveOption(null),
                    c.setCaret(c.items.length),
                    c.refreshState(),
                    b && b.focus && b.focus(),
                    c.ignoreFocus = !1,
                    c.trigger("blur")
                };
                c.ignoreFocus = !0,
                c.settings.create && c.settings.createOnBlur ? c.createItem(null, !1, d) : d()
            }
        },
        onOptionHover: function(a) {
            this.ignoreHover || this.setActiveOption(a.currentTarget, !1)
        },
        onOptionSelect: function(b) {
            var c, d, e = this;
            b.preventDefault && (b.preventDefault(),
            b.stopPropagation()),
            d = a(b.currentTarget),
            d.hasClass("create") ? e.createItem(null, function() {
                e.settings.closeAfterSelect && e.close()
            }) : (c = d.attr("data-value"),
            "undefined" != typeof c && (e.lastQuery = null,
            e.setTextboxValue(""),
            e.addItem(c),
            e.settings.closeAfterSelect ? e.close() : !e.settings.hideSelected && b.type && /mouse/.test(b.type) && e.setActiveOption(e.getOption(c))))
        },
        onItemSelect: function(a) {
            var b = this;
            b.isLocked || "multi" === b.settings.mode && (a.preventDefault(),
            b.setActiveItem(a.currentTarget, a))
        },
        load: function(a) {
            var b = this
              , c = b.$wrapper.addClass(b.settings.loadingClass);
            b.loading++,
            a.apply(b, [function(a) {
                b.loading = Math.max(b.loading - 1, 0),
                a && a.length && (b.addOption(a),
                b.refreshOptions(b.isFocused && !b.isInputHidden)),
                b.loading || c.removeClass(b.settings.loadingClass),
                b.trigger("load", a)
            }
            ])
        },
        setTextboxValue: function(a) {
            var b = this.$control_input
              , c = b.val() !== a;
            c && (b.val(a).triggerHandler("update"),
            this.lastValue = a)
        },
        getValue: function() {
            return this.tagType === v && this.$input.attr("multiple") ? this.items : this.items.join(this.settings.delimiter)
        },
        setValue: function(a, b) {
            var c = b ? [] : ["change"];
            E(this, c, function() {
                this.clear(b),
                this.addItems(a, b)
            })
        },
        setActiveItem: function(b, c) {
            var d, e, f, g, h, i, j, k, l = this;
            if ("single" !== l.settings.mode) {
                if (b = a(b),
                !b.length)
                    return a(l.$activeItems).removeClass("active"),
                    l.$activeItems = [],
                    void (l.isFocused && l.showInput());
                if (d = c && c.type.toLowerCase(),
                "mousedown" === d && l.isShiftDown && l.$activeItems.length) {
                    for (k = l.$control.children(".active:last"),
                    g = Array.prototype.indexOf.apply(l.$control[0].childNodes, [k[0]]),
                    h = Array.prototype.indexOf.apply(l.$control[0].childNodes, [b[0]]),
                    g > h && (j = g,
                    g = h,
                    h = j),
                    e = g; e <= h; e++)
                        i = l.$control[0].childNodes[e],
                        l.$activeItems.indexOf(i) === -1 && (a(i).addClass("active"),
                        l.$activeItems.push(i));
                    c.preventDefault()
                } else
                    "mousedown" === d && l.isCtrlDown || "keydown" === d && this.isShiftDown ? b.hasClass("active") ? (f = l.$activeItems.indexOf(b[0]),
                    l.$activeItems.splice(f, 1),
                    b.removeClass("active")) : l.$activeItems.push(b.addClass("active")[0]) : (a(l.$activeItems).removeClass("active"),
                    l.$activeItems = [b.addClass("active")[0]]);
                l.hideInput(),
                this.isFocused || l.focus()
            }
        },
        setActiveOption: function(b, c, d) {
            var e, f, g, h, i, j = this;
            j.$activeOption && j.$activeOption.removeClass("active"),
            j.$activeOption = null,
            b = a(b),
            b.length && (j.$activeOption = b.addClass("active"),
            !c && y(c) || (e = j.$dropdown_content.height(),
            f = j.$activeOption.outerHeight(!0),
            c = j.$dropdown_content.scrollTop() || 0,
            g = j.$activeOption.offset().top - j.$dropdown_content.offset().top + c,
            h = g,
            i = g - e + f,
            g + f > e + c ? j.$dropdown_content.stop().animate({
                scrollTop: i
            }, d ? j.settings.scrollDuration : 0) : g < c && j.$dropdown_content.stop().animate({
                scrollTop: h
            }, d ? j.settings.scrollDuration : 0)))
        },
        selectAll: function() {
            var a = this;
            "single" !== a.settings.mode && (a.$activeItems = Array.prototype.slice.apply(a.$control.children(":not(input)").addClass("active")),
            a.$activeItems.length && (a.hideInput(),
            a.close()),
            a.focus())
        },
        hideInput: function() {
            var a = this;
            a.setTextboxValue(""),
            a.$control_input.css({
                opacity: 0,
                position: "absolute",
                left: a.rtl ? 1e4 : -1e4
            }),
            a.isInputHidden = !0
        },
        showInput: function() {
            this.$control_input.css({
                opacity: 1,
                position: "relative",
                left: 0
            }),
            this.isInputHidden = !1
        },
        focus: function() {
            var a = this;
            a.isDisabled || (a.ignoreFocus = !0,
            a.$control_input[0].focus(),
            window.setTimeout(function() {
                a.ignoreFocus = !1,
                a.onFocus()
            }, 0))
        },
        blur: function(a) {
            this.$control_input[0].blur(),
            this.onBlur(null, a)
        },
        getScoreFunction: function(a) {
            return this.sifter.getScoreFunction(a, this.getSearchOptions())
        },
        getSearchOptions: function() {
            var a = this.settings
              , b = a.sortField;
            return "string" == typeof b && (b = [{
                field: b
            }]),
            {
                fields: a.searchField,
                conjunction: a.searchConjunction,
                sort: b
            }
        },
        search: function(b) {
            var c, d, e, f = this, g = f.settings, h = this.getSearchOptions();
            if (g.score && (e = f.settings.score.apply(this, [b]),
            "function" != typeof e))
                throw new Error('Selectize "score" setting must be a function that returns a function');
            if (b !== f.lastQuery ? (f.lastQuery = b,
            d = f.sifter.search(b, a.extend(h, {
                score: e
            })),
            f.currentResults = d) : d = a.extend(!0, {}, f.currentResults),
            g.hideSelected)
                for (c = d.items.length - 1; c >= 0; c--)
                    f.items.indexOf(z(d.items[c].id)) !== -1 && d.items.splice(c, 1);
            return d
        },
        refreshOptions: function(b) {
            var c, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
            "undefined" == typeof b && (b = !0);
            var t = this
              , u = a.trim(t.$control_input.val())
              , v = t.search(u)
              , w = t.$dropdown_content
              , x = t.$activeOption && z(t.$activeOption.attr("data-value"));
            for (g = v.items.length,
            "number" == typeof t.settings.maxOptions && (g = Math.min(g, t.settings.maxOptions)),
            h = {},
            i = [],
            c = 0; c < g; c++)
                for (j = t.options[v.items[c].id],
                k = t.render("option", j),
                l = j[t.settings.optgroupField] || "",
                m = a.isArray(l) ? l : [l],
                e = 0,
                f = m && m.length; e < f; e++)
                    l = m[e],
                    t.optgroups.hasOwnProperty(l) || (l = ""),
                    h.hasOwnProperty(l) || (h[l] = document.createDocumentFragment(),
                    i.push(l)),
                    h[l].appendChild(k);
            for (this.settings.lockOptgroupOrder && i.sort(function(a, b) {
                var c = t.optgroups[a].$order || 0
                  , d = t.optgroups[b].$order || 0;
                return c - d
            }),
            n = document.createDocumentFragment(),
            c = 0,
            g = i.length; c < g; c++)
                l = i[c],
                t.optgroups.hasOwnProperty(l) && h[l].childNodes.length ? (o = document.createDocumentFragment(),
                o.appendChild(t.render("optgroup_header", t.optgroups[l])),
                o.appendChild(h[l]),
                n.appendChild(t.render("optgroup", a.extend({}, t.optgroups[l], {
                    html: K(o),
                    dom: o
                })))) : n.appendChild(h[l]);
            if (w.html(n),
            t.settings.highlight && v.query.length && v.tokens.length)
                for (w.removeHighlight(),
                c = 0,
                g = v.tokens.length; c < g; c++)
                    d(w, v.tokens[c].regex);
            if (!t.settings.hideSelected)
                for (c = 0,
                g = t.items.length; c < g; c++)
                    t.getOption(t.items[c]).addClass("selected");
            p = t.canCreate(u),
            p && (w.prepend(t.render("option_create", {
                input: u
            })),
            s = a(w[0].childNodes[0])),
            t.hasOptions = v.items.length > 0 || p,
            t.hasOptions ? (v.items.length > 0 ? (r = x && t.getOption(x),
            r && r.length ? q = r : "single" === t.settings.mode && t.items.length && (q = t.getOption(t.items[0])),
            q && q.length || (q = s && !t.settings.addPrecedence ? t.getAdjacentOption(s, 1) : w.find("[data-selectable]:first"))) : q = s,
            t.setActiveOption(q),
            b && !t.isOpen && t.open()) : (t.setActiveOption(null),
            b && t.isOpen && t.close())
        },
        addOption: function(b) {
            var c, d, e, f = this;
            if (a.isArray(b))
                for (c = 0,
                d = b.length; c < d; c++)
                    f.addOption(b[c]);
            else
                (e = f.registerOption(b)) && (f.userOptions[e] = !0,
                f.lastQuery = null,
                f.trigger("option_add", e, b))
        },
        registerOption: function(a) {
            var b = z(a[this.settings.valueField]);
            return "undefined" != typeof b && null !== b && !this.options.hasOwnProperty(b) && (a.$order = a.$order || ++this.order,
            this.options[b] = a,
            b)
        },
        registerOptionGroup: function(a) {
            var b = z(a[this.settings.optgroupValueField]);
            return !!b && (a.$order = a.$order || ++this.order,
            this.optgroups[b] = a,
            b)
        },
        addOptionGroup: function(a, b) {
            b[this.settings.optgroupValueField] = a,
            (a = this.registerOptionGroup(b)) && this.trigger("optgroup_add", a, b)
        },
        removeOptionGroup: function(a) {
            this.optgroups.hasOwnProperty(a) && (delete this.optgroups[a],
            this.renderCache = {},
            this.trigger("optgroup_remove", a))
        },
        clearOptionGroups: function() {
            this.optgroups = {},
            this.renderCache = {},
            this.trigger("optgroup_clear")
        },
        updateOption: function(b, c) {
            var d, e, f, g, h, i, j, k = this;
            if (b = z(b),
            f = z(c[k.settings.valueField]),
            null !== b && k.options.hasOwnProperty(b)) {
                if ("string" != typeof f)
                    throw new Error("Value must be set in option data");
                j = k.options[b].$order,
                f !== b && (delete k.options[b],
                g = k.items.indexOf(b),
                g !== -1 && k.items.splice(g, 1, f)),
                c.$order = c.$order || j,
                k.options[f] = c,
                h = k.renderCache.item,
                i = k.renderCache.option,
                h && (delete h[b],
                delete h[f]),
                i && (delete i[b],
                delete i[f]),
                k.items.indexOf(f) !== -1 && (d = k.getItem(b),
                e = a(k.render("item", c)),
                d.hasClass("active") && e.addClass("active"),
                d.replaceWith(e)),
                k.lastQuery = null,
                k.isOpen && k.refreshOptions(!1)
            }
        },
        removeOption: function(a, b) {
            var c = this;
            a = z(a);
            var d = c.renderCache.item
              , e = c.renderCache.option;
            d && delete d[a],
            e && delete e[a],
            delete c.userOptions[a],
            delete c.options[a],
            c.lastQuery = null,
            c.trigger("option_remove", a),
            c.removeItem(a, b)
        },
        clearOptions: function() {
            var a = this;
            a.loadedSearches = {},
            a.userOptions = {},
            a.renderCache = {},
            a.options = a.sifter.items = {},
            a.lastQuery = null,
            a.trigger("option_clear"),
            a.clear()
        },
        getOption: function(a) {
            return this.getElementWithValue(a, this.$dropdown_content.find("[data-selectable]"))
        },
        getAdjacentOption: function(b, c) {
            var d = this.$dropdown.find("[data-selectable]")
              , e = d.index(b) + c;
            return e >= 0 && e < d.length ? d.eq(e) : a()
        },
        getElementWithValue: function(b, c) {
            if (b = z(b),
            "undefined" != typeof b && null !== b)
                for (var d = 0, e = c.length; d < e; d++)
                    if (c[d].getAttribute("data-value") === b)
                        return a(c[d]);
            return a()
        },
        getItem: function(a) {
            return this.getElementWithValue(a, this.$control.children())
        },
        addItems: function(b, c) {
            for (var d = a.isArray(b) ? b : [b], e = 0, f = d.length; e < f; e++)
                this.isPending = e < f - 1,
                this.addItem(d[e], c)
        },
        addItem: function(b, c) {
            var d = c ? [] : ["change"];
            E(this, d, function() {
                var d, e, f, g, h, i = this, j = i.settings.mode;
                return b = z(b),
                i.items.indexOf(b) !== -1 ? void ("single" === j && i.close()) : void (i.options.hasOwnProperty(b) && ("single" === j && i.clear(c),
                "multi" === j && i.isFull() || (d = a(i.render("item", i.options[b])),
                h = i.isFull(),
                i.items.splice(i.caretPos, 0, b),
                i.insertAtCaret(d),
                (!i.isPending || !h && i.isFull()) && i.refreshState(),
                i.isSetup && (f = i.$dropdown_content.find("[data-selectable]"),
                i.isPending || (e = i.getOption(b),
                g = i.getAdjacentOption(e, 1).attr("data-value"),
                i.refreshOptions(i.isFocused && "single" !== j),
                g && i.setActiveOption(i.getOption(g))),
                !f.length || i.isFull() ? i.close() : i.positionDropdown(),
                i.updatePlaceholder(),
                i.trigger("item_add", b, d),
                i.updateOriginalInput({
                    silent: c
                })))))
            })
        },
        removeItem: function(b, c) {
            var d, e, f, g = this;
            d = b instanceof a ? b : g.getItem(b),
            b = z(d.attr("data-value")),
            e = g.items.indexOf(b),
            e !== -1 && (d.remove(),
            d.hasClass("active") && (f = g.$activeItems.indexOf(d[0]),
            g.$activeItems.splice(f, 1)),
            g.items.splice(e, 1),
            g.lastQuery = null,
            !g.settings.persist && g.userOptions.hasOwnProperty(b) && g.removeOption(b, c),
            e < g.caretPos && g.setCaret(g.caretPos - 1),
            g.refreshState(),
            g.updatePlaceholder(),
            g.updateOriginalInput({
                silent: c
            }),
            g.positionDropdown(),
            g.trigger("item_remove", b, d))
        },
        createItem: function(b, c) {
            var d = this
              , e = d.caretPos;
            b = b || a.trim(d.$control_input.val() || "");
            var f = arguments[arguments.length - 1];
            if ("function" != typeof f && (f = function() {}
            ),
            "boolean" != typeof c && (c = !0),
            !d.canCreate(b))
                return f(),
                !1;
            d.lock();
            var g = "function" == typeof d.settings.create ? this.settings.create : function(a) {
                var b = {};
                return b[d.settings.labelField] = a,
                b[d.settings.valueField] = a,
                b
            }
              , h = C(function(a) {
                if (d.unlock(),
                !a || "object" != typeof a)
                    return f();
                var b = z(a[d.settings.valueField]);
                return "string" != typeof b ? f() : (d.setTextboxValue(""),
                d.addOption(a),
                d.setCaret(e),
                d.addItem(b),
                d.refreshOptions(c && "single" !== d.settings.mode),
                void f(a))
            })
              , i = g.apply(this, [b, h]);
            return "undefined" != typeof i && h(i),
            !0
        },
        refreshItems: function() {
            this.lastQuery = null,
            this.isSetup && this.addItem(this.items),
            this.refreshState(),
            this.updateOriginalInput()
        },
        refreshState: function() {
            this.refreshValidityState(),
            this.refreshClasses()
        },
        refreshValidityState: function() {
            if (!this.isRequired)
                return !1;
            var a = !this.items.length;
            this.isInvalid = a,
            this.$control_input.prop("required", a),
            this.$input.prop("required", !a)
        },
        refreshClasses: function() {
            var b = this
              , c = b.isFull()
              , d = b.isLocked;
            b.$wrapper.toggleClass("rtl", b.rtl),
            b.$control.toggleClass("focus", b.isFocused).toggleClass("disabled", b.isDisabled).toggleClass("required", b.isRequired).toggleClass("invalid", b.isInvalid).toggleClass("locked", d).toggleClass("full", c).toggleClass("not-full", !c).toggleClass("input-active", b.isFocused && !b.isInputHidden).toggleClass("dropdown-active", b.isOpen).toggleClass("has-options", !a.isEmptyObject(b.options)).toggleClass("has-items", b.items.length > 0),
            b.$control_input.data("grow", !c && !d)
        },
        isFull: function() {
            return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems
        },
        updateOriginalInput: function(a) {
            var b, c, d, e, f = this;
            if (a = a || {},
            f.tagType === v) {
                for (d = [],
                b = 0,
                c = f.items.length; b < c; b++)
                    e = f.options[f.items[b]][f.settings.labelField] || "",
                    d.push('<option value="' + A(f.items[b]) + '" selected="selected">' + A(e) + "</option>");
                d.length || this.$input.attr("multiple") || d.push('<option value="" selected="selected"></option>'),
                f.$input.html(d.join(""))
            } else
                f.$input.val(f.getValue()),
                f.$input.attr("value", f.$input.val());
            f.isSetup && (a.silent || f.trigger("change", f.$input.val()))
        },
        updatePlaceholder: function() {
            if (this.settings.placeholder) {
                var a = this.$control_input;
                this.items.length ? a.removeAttr("placeholder") : a.attr("placeholder", this.settings.placeholder),
                a.triggerHandler("update", {
                    force: !0
                })
            }
        },
        open: function() {
            var a = this;
            a.isLocked || a.isOpen || "multi" === a.settings.mode && a.isFull() || (a.focus(),
            a.isOpen = !0,
            a.refreshState(),
            a.$dropdown.css({
                visibility: "hidden",
                display: "block"
            }),
            a.positionDropdown(),
            a.$dropdown.css({
                visibility: "visible"
            }),
            a.trigger("dropdown_open", a.$dropdown))
        },
        close: function() {
            var a = this
              , b = a.isOpen;
            "single" === a.settings.mode && a.items.length && (a.hideInput(),
            a.$control_input.blur()),
            a.isOpen = !1,
            a.$dropdown.hide(),
            a.setActiveOption(null),
            a.refreshState(),
            b && a.trigger("dropdown_close", a.$dropdown)
        },
        positionDropdown: function() {
            var a = this.$control
              , b = "body" === this.settings.dropdownParent ? a.offset() : a.position();
            b.top += a.outerHeight(!0),
            this.$dropdown.css({
                width: a.outerWidth(),
                top: b.top,
                left: b.left
            })
        },
        clear: function(a) {
            var b = this;
            b.items.length && (b.$control.children(":not(input)").remove(),
            b.items = [],
            b.lastQuery = null,
            b.setCaret(0),
            b.setActiveItem(null),
            b.updatePlaceholder(),
            b.updateOriginalInput({
                silent: a
            }),
            b.refreshState(),
            b.showInput(),
            b.trigger("clear"))
        },
        insertAtCaret: function(b) {
            var c = Math.min(this.caretPos, this.items.length);
            0 === c ? this.$control.prepend(b) : a(this.$control[0].childNodes[c]).before(b),
            this.setCaret(c + 1)
        },
        deleteSelection: function(b) {
            var c, d, e, f, g, h, i, j, k, l = this;
            if (e = b && b.keyCode === p ? -1 : 1,
            f = G(l.$control_input[0]),
            l.$activeOption && !l.settings.hideSelected && (i = l.getAdjacentOption(l.$activeOption, -1).attr("data-value")),
            g = [],
            l.$activeItems.length) {
                for (k = l.$control.children(".active:" + (e > 0 ? "last" : "first")),
                h = l.$control.children(":not(input)").index(k),
                e > 0 && h++,
                c = 0,
                d = l.$activeItems.length; c < d; c++)
                    g.push(a(l.$activeItems[c]).attr("data-value"));
                b && (b.preventDefault(),
                b.stopPropagation())
            } else
                (l.isFocused || "single" === l.settings.mode) && l.items.length && (e < 0 && 0 === f.start && 0 === f.length ? g.push(l.items[l.caretPos - 1]) : e > 0 && f.start === l.$control_input.val().length && g.push(l.items[l.caretPos]));
            if (!g.length || "function" == typeof l.settings.onDelete && l.settings.onDelete.apply(l, [g]) === !1)
                return !1;
            for ("undefined" != typeof h && l.setCaret(h); g.length; )
                l.removeItem(g.pop());
            return l.showInput(),
            l.positionDropdown(),
            l.refreshOptions(!0),
            i && (j = l.getOption(i),
            j.length && l.setActiveOption(j)),
            !0
        },
        advanceSelection: function(a, b) {
            var c, d, e, f, g, h, i = this;
            0 !== a && (i.rtl && (a *= -1),
            c = a > 0 ? "last" : "first",
            d = G(i.$control_input[0]),
            i.isFocused && !i.isInputHidden ? (f = i.$control_input.val().length,
            g = a < 0 ? 0 === d.start && 0 === d.length : d.start === f,
            g && !f && i.advanceCaret(a, b)) : (h = i.$control.children(".active:" + c),
            h.length && (e = i.$control.children(":not(input)").index(h),
            i.setActiveItem(null),
            i.setCaret(a > 0 ? e + 1 : e))))
        },
        advanceCaret: function(a, b) {
            var c, d, e = this;
            0 !== a && (c = a > 0 ? "next" : "prev",
            e.isShiftDown ? (d = e.$control_input[c](),
            d.length && (e.hideInput(),
            e.setActiveItem(d),
            b && b.preventDefault())) : e.setCaret(e.caretPos + a))
        },
        setCaret: function(b) {
            var c = this;
            if (b = "single" === c.settings.mode ? c.items.length : Math.max(0, Math.min(c.items.length, b)),
            !c.isPending) {
                var d, e, f, g;
                for (f = c.$control.children(":not(input)"),
                d = 0,
                e = f.length; d < e; d++)
                    g = a(f[d]).detach(),
                    d < b ? c.$control_input.before(g) : c.$control.append(g)
            }
            c.caretPos = b
        },
        lock: function() {
            this.close(),
            this.isLocked = !0,
            this.refreshState()
        },
        unlock: function() {
            this.isLocked = !1,
            this.refreshState()
        },
        disable: function() {
            var a = this;
            a.$input.prop("disabled", !0),
            a.$control_input.prop("disabled", !0).prop("tabindex", -1),
            a.isDisabled = !0,
            a.lock()
        },
        enable: function() {
            var a = this;
            a.$input.prop("disabled", !1),
            a.$control_input.prop("disabled", !1).prop("tabindex", a.tabIndex),
            a.isDisabled = !1,
            a.unlock()
        },
        destroy: function() {
            var b = this
              , c = b.eventNS
              , d = b.revertSettings;
            b.trigger("destroy"),
            b.off(),
            b.$wrapper.remove(),
            b.$dropdown.remove(),
            b.$input.html("").append(d.$children).removeAttr("tabindex").removeClass("selectized").attr({
                tabindex: d.tabindex
            }).show(),
            b.$control_input.removeData("grow"),
            b.$input.removeData("selectize"),
            a(window).off(c),
            a(document).off(c),
            a(document.body).off(c),
            delete b.$input[0].selectize
        },
        render: function(b, c) {
            var d, e, f = "", g = !1, h = this;
            return "option" !== b && "item" !== b || (d = z(c[h.settings.valueField]),
            g = !!d),
            g && (y(h.renderCache[b]) || (h.renderCache[b] = {}),
            h.renderCache[b].hasOwnProperty(d)) ? h.renderCache[b][d] : (f = a(h.settings.render[b].apply(this, [c, A])),
            "option" === b || "option_create" === b ? f.attr("data-selectable", "") : "optgroup" === b && (e = c[h.settings.optgroupValueField] || "",
            f.attr("data-group", e)),
            "option" !== b && "item" !== b || f.attr("data-value", d || ""),
            g && (h.renderCache[b][d] = f[0]),
            f[0])
        },
        clearCache: function(a) {
            var b = this;
            "undefined" == typeof a ? b.renderCache = {} : delete b.renderCache[a]
        },
        canCreate: function(a) {
            var b = this;
            if (!b.settings.create)
                return !1;
            var c = b.settings.createFilter;
            return a.length && ("function" != typeof c || c.apply(b, [a])) && ("string" != typeof c || new RegExp(c).test(a)) && (!(c instanceof RegExp) || c.test(a))
        }
    }),
    M.count = 0,
    M.defaults = {
        options: [],
        optgroups: [],
        plugins: [],
        delimiter: ",",
        splitOn: null,
        persist: !0,
        diacritics: !0,
        create: !1,
        createOnBlur: !1,
        createFilter: null,
        highlight: !0,
        openOnFocus: !0,
        maxOptions: 1e3,
        maxItems: null,
        hideSelected: null,
        addPrecedence: !1,
        selectOnTab: !1,
        preload: !1,
        allowEmptyOption: !1,
        closeAfterSelect: !1,
        scrollDuration: 60,
        loadThrottle: 300,
        loadingClass: "loading",
        dataAttr: "data-data",
        optgroupField: "optgroup",
        valueField: "value",
        labelField: "text",
        optgroupLabelField: "label",
        optgroupValueField: "value",
        lockOptgroupOrder: !1,
        sortField: "$order",
        searchField: ["text"],
        searchConjunction: "and",
        mode: null,
        wrapperClass: "selectize-control",
        inputClass: "selectize-input",
        dropdownClass: "selectize-dropdown",
        dropdownContentClass: "selectize-dropdown-content",
        dropdownParent: null,
        copyClassesToDropdown: !0,
        render: {}
    },
    a.fn.selectize = function(b) {
        var c = a.fn.selectize.defaults
          , d = a.extend({}, c, b)
          , e = d.dataAttr
          , f = d.labelField
          , g = d.valueField
          , h = d.optgroupField
          , i = d.optgroupLabelField
          , j = d.optgroupValueField
          , k = function(b, c) {
            var h, i, j, k, l = b.attr(e);
            if (l)
                for (c.options = JSON.parse(l),
                h = 0,
                i = c.options.length; h < i; h++)
                    c.items.push(c.options[h][g]);
            else {
                var m = a.trim(b.val() || "");
                if (!d.allowEmptyOption && !m.length)
                    return;
                for (j = m.split(d.delimiter),
                h = 0,
                i = j.length; h < i; h++)
                    k = {},
                    k[f] = j[h],
                    k[g] = j[h],
                    c.options.push(k);
                c.items = j
            }
        }
          , l = function(b, c) {
            var k, l, m, n, o = c.options, p = {}, q = function(a) {
                var b = e && a.attr(e);
                return "string" == typeof b && b.length ? JSON.parse(b) : null
            }, r = function(b, e) {
                b = a(b);
                var i = z(b.val());
                if (i || d.allowEmptyOption)
                    if (p.hasOwnProperty(i)) {
                        if (e) {
                            var j = p[i][h];
                            j ? a.isArray(j) ? j.push(e) : p[i][h] = [j, e] : p[i][h] = e
                        }
                    } else {
                        var k = q(b) || {};
                        k[f] = k[f] || b.text(),
                        k[g] = k[g] || i,
                        k[h] = k[h] || e,
                        p[i] = k,
                        o.push(k),
                        b.is(":selected") && c.items.push(i)
                    }
            }, s = function(b) {
                var d, e, f, g, h;
                for (b = a(b),
                f = b.attr("label"),
                f && (g = q(b) || {},
                g[i] = f,
                g[j] = f,
                c.optgroups.push(g)),
                h = a("option", b),
                d = 0,
                e = h.length; d < e; d++)
                    r(h[d], f)
            };
            for (c.maxItems = b.attr("multiple") ? null : 1,
            n = b.children(),
            k = 0,
            l = n.length; k < l; k++)
                m = n[k].tagName.toLowerCase(),
                "optgroup" === m ? s(n[k]) : "option" === m && r(n[k])
        };
        return this.each(function() {
            if (!this.selectize) {
                var e, f = a(this), g = this.tagName.toLowerCase(), h = f.attr("placeholder") || f.attr("data-placeholder");
                h || d.allowEmptyOption || (h = f.children('option[value=""]').text());
                var i = {
                    placeholder: h,
                    options: [],
                    optgroups: [],
                    items: []
                };
                "select" === g ? l(f, i) : k(f, i),
                e = new M(f,a.extend(!0, {}, c, i, b))
            }
        })
    }
    ,
    a.fn.selectize.defaults = M.defaults,
    a.fn.selectize.support = {
        validity: x
    },
    M.define("drag_drop", function(b) {
        if (!a.fn.sortable)
            throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
        if ("multi" === this.settings.mode) {
            var c = this;
            c.lock = function() {
                var a = c.lock;
                return function() {
                    var b = c.$control.data("sortable");
                    return b && b.disable(),
                    a.apply(c, arguments)
                }
            }(),
            c.unlock = function() {
                var a = c.unlock;
                return function() {
                    var b = c.$control.data("sortable");
                    return b && b.enable(),
                    a.apply(c, arguments)
                }
            }(),
            c.setup = function() {
                var b = c.setup;
                return function() {
                    b.apply(this, arguments);
                    var d = c.$control.sortable({
                        items: "[data-value]",
                        forcePlaceholderSize: !0,
                        disabled: c.isLocked,
                        start: function(a, b) {
                            b.placeholder.css("width", b.helper.css("width")),
                            d.css({
                                overflow: "visible"
                            })
                        },
                        stop: function() {
                            d.css({
                                overflow: "hidden"
                            });
                            var b = c.$activeItems ? c.$activeItems.slice() : null
                              , e = [];
                            d.children("[data-value]").each(function() {
                                e.push(a(this).attr("data-value"))
                            }),
                            c.setValue(e),
                            c.setActiveItem(b)
                        }
                    })
                }
            }()
        }
    }),
    M.define("dropdown_header", function(b) {
        var c = this;
        b = a.extend({
            title: "Untitled",
            headerClass: "selectize-dropdown-header",
            titleRowClass: "selectize-dropdown-header-title",
            labelClass: "selectize-dropdown-header-label",
            closeClass: "selectize-dropdown-header-close",
            html: function(a) {
                return '<div class="' + a.headerClass + '"><div class="' + a.titleRowClass + '"><span class="' + a.labelClass + '">' + a.title + '</span><a href="javascript:void(0)" class="' + a.closeClass + '">&times;</a></div></div>'
            }
        }, b),
        c.setup = function() {
            var d = c.setup;
            return function() {
                d.apply(c, arguments),
                c.$dropdown_header = a(b.html(b)),
                c.$dropdown.prepend(c.$dropdown_header)
            }
        }()
    }),
    M.define("optgroup_columns", function(b) {
        var c = this;
        b = a.extend({
            equalizeWidth: !0,
            equalizeHeight: !0
        }, b),
        this.getAdjacentOption = function(b, c) {
            var d = b.closest("[data-group]").find("[data-selectable]")
              , e = d.index(b) + c;
            return e >= 0 && e < d.length ? d.eq(e) : a()
        }
        ,
        this.onKeyDown = function() {
            var a = c.onKeyDown;
            return function(b) {
                var d, e, f, g;
                return !this.isOpen || b.keyCode !== j && b.keyCode !== m ? a.apply(this, arguments) : (c.ignoreHover = !0,
                g = this.$activeOption.closest("[data-group]"),
                d = g.find("[data-selectable]").index(this.$activeOption),
                g = b.keyCode === j ? g.prev("[data-group]") : g.next("[data-group]"),
                f = g.find("[data-selectable]"),
                e = f.eq(Math.min(f.length - 1, d)),
                void (e.length && this.setActiveOption(e)))
            }
        }();
        var d = function() {
            var a, b = d.width, c = document;
            return "undefined" == typeof b && (a = c.createElement("div"),
            a.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>',
            a = a.firstChild,
            c.body.appendChild(a),
            b = d.width = a.offsetWidth - a.clientWidth,
            c.body.removeChild(a)),
            b
        }
          , e = function() {
            var e, f, g, h, i, j, k;
            if (k = a("[data-group]", c.$dropdown_content),
            f = k.length,
            f && c.$dropdown_content.width()) {
                if (b.equalizeHeight) {
                    for (g = 0,
                    e = 0; e < f; e++)
                        g = Math.max(g, k.eq(e).height());
                    k.css({
                        height: g
                    })
                }
                b.equalizeWidth && (j = c.$dropdown_content.innerWidth() - d(),
                h = Math.round(j / f),
                k.css({
                    width: h
                }),
                f > 1 && (i = j - h * (f - 1),
                k.eq(f - 1).css({
                    width: i
                })))
            }
        };
        (b.equalizeHeight || b.equalizeWidth) && (B.after(this, "positionDropdown", e),
        B.after(this, "refreshOptions", e))
    }),
    M.define("remove_button", function(b) {
        b = a.extend({
            label: "&times;",
            title: "Remove",
            className: "remove",
            append: !0
        }, b);
        var c = function(b, c) {
            c.className = "remove-single";
            var d = b
              , e = '<a href="javascript:void(0)" class="' + c.className + '" tabindex="-1" title="' + A(c.title) + '">' + c.label + "</a>"
              , f = function(a, b) {
                return a + b
            };
            b.setup = function() {
                var g = d.setup;
                return function() {
                    if (c.append) {
                        var h = a(d.$input.context).attr("id")
                          , i = (a("#" + h),
                        d.settings.render.item);
                        d.settings.render.item = function(a) {
                            return f(i.apply(b, arguments), e)
                        }
                    }
                    g.apply(b, arguments),
                    b.$control.on("click", "." + c.className, function(a) {
                        a.preventDefault(),
                        d.isLocked || d.clear()
                    })
                }
            }()
        }
          , d = function(b, c) {
            var d = b
              , e = '<a href="javascript:void(0)" class="' + c.className + '" tabindex="-1" title="' + A(c.title) + '">' + c.label + "</a>"
              , f = function(a, b) {
                var c = a.search(/(<\/[^>]+>\s*)$/);
                return a.substring(0, c) + b + a.substring(c)
            };
            b.setup = function() {
                var g = d.setup;
                return function() {
                    if (c.append) {
                        var h = d.settings.render.item;
                        d.settings.render.item = function(a) {
                            return f(h.apply(b, arguments), e)
                        }
                    }
                    g.apply(b, arguments),
                    b.$control.on("click", "." + c.className, function(b) {
                        if (b.preventDefault(),
                        !d.isLocked) {
                            var c = a(b.currentTarget).parent();
                            d.setActiveItem(c),
                            d.deleteSelection() && d.setCaret(d.items.length)
                        }
                    })
                }
            }()
        };
        return "single" === this.settings.mode ? void c(this, b) : void d(this, b)
    }),
    M.define("restore_on_backspace", function(a) {
        var b = this;
        a.text = a.text || function(a) {
            return a[this.settings.labelField]
        }
        ,
        this.onKeyDown = function() {
            var c = b.onKeyDown;
            return function(b) {
                var d, e;
                return b.keyCode === p && "" === this.$control_input.val() && !this.$activeItems.length && (d = this.caretPos - 1,
                d >= 0 && d < this.items.length) ? (e = this.options[this.items[d]],
                this.deleteSelection(b) && (this.setTextboxValue(a.text.apply(this, [e])),
                this.refreshOptions(!0)),
                void b.preventDefault()) : c.apply(this, arguments)
            }
        }()
    }),
    M
});
/*!
 * perfect-scrollbar v1.3.0
 * (c) 2017 Hyunje Jun
 * @license MIT
 */
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.PerfectScrollbar = e()
}(this, function() {
    "use strict";
    function t(t) {
        return getComputedStyle(t)
    }
    function e(t, e) {
        for (var i in e) {
            var r = e[i];
            "number" == typeof r && (r += "px"),
            t.style[i] = r
        }
        return t
    }
    function i(t) {
        var e = document.createElement("div");
        return e.className = t,
        e
    }
    function r(t, e) {
        if (!v)
            throw new Error("No element matching method supported");
        return v.call(t, e)
    }
    function l(t) {
        t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
    }
    function n(t, e) {
        return Array.prototype.filter.call(t.children, function(t) {
            return r(t, e)
        })
    }
    function o(t, e) {
        var i = t.element.classList
          , r = m.state.scrolling(e);
        i.contains(r) ? clearTimeout(Y[e]) : i.add(r)
    }
    function s(t, e) {
        Y[e] = setTimeout(function() {
            return t.isAlive && t.element.classList.remove(m.state.scrolling(e))
        }, t.settings.scrollingThreshold)
    }
    function a(t, e) {
        o(t, e),
        s(t, e)
    }
    function c(t) {
        if ("function" == typeof window.CustomEvent)
            return new CustomEvent(t);
        var e = document.createEvent("CustomEvent");
        return e.initCustomEvent(t, !1, !1, void 0),
        e
    }
    function h(t, e, i, r, l) {
        var n = i[0]
          , o = i[1]
          , s = i[2]
          , h = i[3]
          , u = i[4]
          , d = i[5];
        void 0 === r && (r = !0),
        void 0 === l && (l = !1);
        var f = t.element;
        t.reach[h] = null,
        f[s] < 1 && (t.reach[h] = "start"),
        f[s] > t[n] - t[o] - 1 && (t.reach[h] = "end"),
        e && (f.dispatchEvent(c("ps-scroll-" + h)),
        e < 0 ? f.dispatchEvent(c("ps-scroll-" + u)) : e > 0 && f.dispatchEvent(c("ps-scroll-" + d)),
        r && a(t, h)),
        t.reach[h] && (e || l) && f.dispatchEvent(c("ps-" + h + "-reach-" + t.reach[h]))
    }
    function u(t) {
        return parseInt(t, 10) || 0
    }
    function d(t) {
        return r(t, "input,[contenteditable]") || r(t, "select,[contenteditable]") || r(t, "textarea,[contenteditable]") || r(t, "button,[contenteditable]")
    }
    function f(e) {
        var i = t(e);
        return u(i.width) + u(i.paddingLeft) + u(i.paddingRight) + u(i.borderLeftWidth) + u(i.borderRightWidth)
    }
    function p(t, e) {
        return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)),
        t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)),
        e
    }
    function b(t, i) {
        var r = {
            width: i.railXWidth
        };
        i.isRtl ? r.left = i.negativeScrollAdjustment + t.scrollLeft + i.containerWidth - i.contentWidth : r.left = t.scrollLeft,
        i.isScrollbarXUsingBottom ? r.bottom = i.scrollbarXBottom - t.scrollTop : r.top = i.scrollbarXTop + t.scrollTop,
        e(i.scrollbarXRail, r);
        var l = {
            top: t.scrollTop,
            height: i.railYHeight
        };
        i.isScrollbarYUsingRight ? i.isRtl ? l.right = i.contentWidth - (i.negativeScrollAdjustment + t.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth : l.right = i.scrollbarYRight - t.scrollLeft : i.isRtl ? l.left = i.negativeScrollAdjustment + t.scrollLeft + 2 * i.containerWidth - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth : l.left = i.scrollbarYLeft + t.scrollLeft,
        e(i.scrollbarYRail, l),
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
            p[d] = b + v * (e[a] - g),
            o(t, f),
            T(t),
            e.stopPropagation(),
            e.preventDefault()
        }
        function r() {
            s(t, f),
            t.event.unbind(t.ownerDocument, "mousemove", i)
        }
        var l = e[0]
          , n = e[1]
          , a = e[2]
          , c = e[3]
          , h = e[4]
          , u = e[5]
          , d = e[6]
          , f = e[7]
          , p = t.element
          , b = null
          , g = null
          , v = null;
        t.event.bind(t[h], "mousedown", function(e) {
            b = p[d],
            g = e[a],
            v = (t[n] - t[l]) / (t[c] - t[u]),
            t.event.bind(t.ownerDocument, "mousemove", i),
            t.event.once(t.ownerDocument, "mouseup", r),
            e.stopPropagation(),
            e.preventDefault()
        })
    }
    var v = "undefined" != typeof Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector)
      , m = {
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
      , Y = {
        x: null,
        y: null
    }
      , X = function(t) {
        this.element = t,
        this.handlers = {}
    }
      , w = {
        isEmpty: {
            configurable: !0
        }
    };
    X.prototype.bind = function(t, e) {
        void 0 === this.handlers[t] && (this.handlers[t] = []),
        this.handlers[t].push(e),
        this.element.addEventListener(t, e, !1)
    }
    ,
    X.prototype.unbind = function(t, e) {
        var i = this;
        this.handlers[t] = this.handlers[t].filter(function(r) {
            return !(!e || r === e) || (i.element.removeEventListener(t, r, !1),
            !1)
        })
    }
    ,
    X.prototype.unbindAll = function() {
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
    Object.defineProperties(X.prototype, w);
    var y = function() {
        this.eventElements = []
    };
    y.prototype.eventElement = function(t) {
        var e = this.eventElements.filter(function(e) {
            return e.element === t
        })[0];
        return e || (e = new X(t),
        this.eventElements.push(e)),
        e
    }
    ,
    y.prototype.bind = function(t, e, i) {
        this.eventElement(t).bind(e, i)
    }
    ,
    y.prototype.unbind = function(t, e, i) {
        var r = this.eventElement(t);
        r.unbind(e, i),
        r.isEmpty && this.eventElements.splice(this.eventElements.indexOf(r), 1)
    }
    ,
    y.prototype.unbindAll = function() {
        this.eventElements.forEach(function(t) {
            return t.unbindAll()
        }),
        this.eventElements = []
    }
    ,
    y.prototype.once = function(t, e, i) {
        var r = this.eventElement(t)
          , l = function(t) {
            r.unbind(e, l),
            i(t)
        };
        r.bind(e, l)
    }
    ;
    var W = function(t, e, i, r, l) {
        void 0 === r && (r = !0),
        void 0 === l && (l = !1);
        var n;
        if ("top" === e)
            n = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];
        else {
            if ("left" !== e)
                throw new Error("A proper axis should be provided");
            n = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"]
        }
        h(t, i, n, r, l)
    }
      , L = {
        isWebKit: "undefined" != typeof document && "WebkitAppearance"in document.documentElement.style,
        supportsTouch: "undefined" != typeof window && ("ontouchstart"in window || window.DocumentTouch && document instanceof window.DocumentTouch),
        supportsIePointer: "undefined" != typeof navigator && navigator.msMaxTouchPoints,
        isChrome: "undefined" != typeof navigator && /Chrome/i.test(navigator && navigator.userAgent)
    }
      , T = function(t) {
        var e = t.element;
        t.containerWidth = e.clientWidth,
        t.containerHeight = e.clientHeight,
        t.contentWidth = e.scrollWidth,
        t.contentHeight = e.scrollHeight,
        e.contains(t.scrollbarXRail) || (n(e, m.element.rail("x")).forEach(function(t) {
            return l(t)
        }),
        e.appendChild(t.scrollbarXRail)),
        e.contains(t.scrollbarYRail) || (n(e, m.element.rail("y")).forEach(function(t) {
            return l(t)
        }),
        e.appendChild(t.scrollbarYRail)),
        !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth ? (t.scrollbarXActive = !0,
        t.railXWidth = t.containerWidth - t.railXMarginWidth,
        t.railXRatio = t.containerWidth / t.railXWidth,
        t.scrollbarXWidth = p(t, u(t.railXWidth * t.containerWidth / t.contentWidth)),
        t.scrollbarXLeft = u((t.negativeScrollAdjustment + e.scrollLeft) * (t.railXWidth - t.scrollbarXWidth) / (t.contentWidth - t.containerWidth))) : t.scrollbarXActive = !1,
        !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight ? (t.scrollbarYActive = !0,
        t.railYHeight = t.containerHeight - t.railYMarginHeight,
        t.railYRatio = t.containerHeight / t.railYHeight,
        t.scrollbarYHeight = p(t, u(t.railYHeight * t.containerHeight / t.contentHeight)),
        t.scrollbarYTop = u(e.scrollTop * (t.railYHeight - t.scrollbarYHeight) / (t.contentHeight - t.containerHeight))) : t.scrollbarYActive = !1,
        t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth),
        t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight),
        b(e, t),
        t.scrollbarXActive ? e.classList.add(m.state.active("x")) : (e.classList.remove(m.state.active("x")),
        t.scrollbarXWidth = 0,
        t.scrollbarXLeft = 0,
        e.scrollLeft = 0),
        t.scrollbarYActive ? e.classList.add(m.state.active("y")) : (e.classList.remove(m.state.active("y")),
        t.scrollbarYHeight = 0,
        t.scrollbarYTop = 0,
        e.scrollTop = 0)
    }
      , R = {
        "click-rail": function(t) {
            t.event.bind(t.scrollbarY, "mousedown", function(t) {
                return t.stopPropagation()
            }),
            t.event.bind(t.scrollbarYRail, "mousedown", function(e) {
                var i = e.pageY - window.pageYOffset - t.scrollbarYRail.getBoundingClientRect().top > t.scrollbarYTop ? 1 : -1;
                t.element.scrollTop += i * t.containerHeight,
                T(t),
                e.stopPropagation()
            }),
            t.event.bind(t.scrollbarX, "mousedown", function(t) {
                return t.stopPropagation()
            }),
            t.event.bind(t.scrollbarXRail, "mousedown", function(e) {
                var i = e.pageX - window.pageXOffset - t.scrollbarXRail.getBoundingClientRect().left > t.scrollbarXLeft ? 1 : -1;
                t.element.scrollLeft += i * t.containerWidth,
                T(t),
                e.stopPropagation()
            })
        },
        "drag-thumb": function(t) {
            g(t, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x"]),
            g(t, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y"])
        },
        keyboard: function(t) {
            function e(e, r) {
                var l = i.scrollTop;
                if (0 === e) {
                    if (!t.scrollbarYActive)
                        return !1;
                    if (0 === l && r > 0 || l >= t.contentHeight - t.containerHeight && r < 0)
                        return !t.settings.wheelPropagation
                }
                var n = i.scrollLeft;
                if (0 === r) {
                    if (!t.scrollbarXActive)
                        return !1;
                    if (0 === n && e < 0 || n >= t.contentWidth - t.containerWidth && e > 0)
                        return !t.settings.wheelPropagation
                }
                return !0
            }
            var i = t.element
              , l = function() {
                return r(i, ":hover")
            }
              , n = function() {
                return r(t.scrollbarX, ":focus") || r(t.scrollbarY, ":focus")
            };
            t.event.bind(t.ownerDocument, "keydown", function(r) {
                if (!(r.isDefaultPrevented && r.isDefaultPrevented() || r.defaultPrevented) && (l() || n())) {
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
                    var s = 0
                      , a = 0;
                    switch (r.which) {
                    case 37:
                        s = r.metaKey ? -t.contentWidth : r.altKey ? -t.containerWidth : -30;
                        break;
                    case 38:
                        a = r.metaKey ? t.contentHeight : r.altKey ? t.containerHeight : 30;
                        break;
                    case 39:
                        s = r.metaKey ? t.contentWidth : r.altKey ? t.containerWidth : 30;
                        break;
                    case 40:
                        a = r.metaKey ? -t.contentHeight : r.altKey ? -t.containerHeight : -30;
                        break;
                    case 32:
                        a = r.shiftKey ? t.containerHeight : -t.containerHeight;
                        break;
                    case 33:
                        a = t.containerHeight;
                        break;
                    case 34:
                        a = -t.containerHeight;
                        break;
                    case 36:
                        a = t.contentHeight;
                        break;
                    case 35:
                        a = -t.contentHeight;
                        break;
                    default:
                        return
                    }
                    t.settings.suppressScrollX && 0 !== s || t.settings.suppressScrollY && 0 !== a || (i.scrollTop -= a,
                    i.scrollLeft += s,
                    T(t),
                    e(s, a) && r.preventDefault())
                }
            })
        },
        wheel: function(e) {
            function i(t, i) {
                var r = 0 === o.scrollTop
                  , l = o.scrollTop + o.offsetHeight === o.scrollHeight
                  , n = 0 === o.scrollLeft
                  , s = o.scrollLeft + o.offsetWidth === o.offsetWidth;
                return !(Math.abs(i) > Math.abs(t) ? r || l : n || s) || !e.settings.wheelPropagation
            }
            function r(t) {
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
            function l(e, i, r) {
                if (!L.isWebKit && o.querySelector("select:focus"))
                    return !0;
                if (!o.contains(e))
                    return !1;
                for (var l = e; l && l !== o; ) {
                    if (l.classList.contains(m.element.consuming))
                        return !0;
                    var n = t(l);
                    if ([n.overflow, n.overflowX, n.overflowY].join("").match(/(scroll|auto)/)) {
                        var s = l.scrollHeight - l.clientHeight;
                        if (s > 0 && !(0 === l.scrollTop && r > 0 || l.scrollTop === s && r < 0))
                            return !0;
                        var a = l.scrollLeft - l.clientWidth;
                        if (a > 0 && !(0 === l.scrollLeft && i < 0 || l.scrollLeft === a && i > 0))
                            return !0
                    }
                    l = l.parentNode
                }
                return !1
            }
            function n(t) {
                var n = r(t)
                  , s = n[0]
                  , a = n[1];
                if (!l(t.target, s, a)) {
                    var c = !1;
                    e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (a ? o.scrollTop -= a * e.settings.wheelSpeed : o.scrollTop += s * e.settings.wheelSpeed,
                    c = !0) : e.scrollbarXActive && !e.scrollbarYActive && (s ? o.scrollLeft += s * e.settings.wheelSpeed : o.scrollLeft -= a * e.settings.wheelSpeed,
                    c = !0) : (o.scrollTop -= a * e.settings.wheelSpeed,
                    o.scrollLeft += s * e.settings.wheelSpeed),
                    T(e),
                    (c = c || i(s, a)) && !t.ctrlKey && (t.stopPropagation(),
                    t.preventDefault())
                }
            }
            var o = e.element;
            void 0 !== window.onwheel ? e.event.bind(o, "wheel", n) : void 0 !== window.onmousewheel && e.event.bind(o, "mousewheel", n)
        },
        touch: function(e) {
            function i(t, i) {
                var r = h.scrollTop
                  , l = h.scrollLeft
                  , n = Math.abs(t)
                  , o = Math.abs(i);
                if (o > n) {
                    if (i < 0 && r === e.contentHeight - e.containerHeight || i > 0 && 0 === r)
                        return 0 === window.scrollY && i > 0 && L.isChrome
                } else if (n > o && (t < 0 && l === e.contentWidth - e.containerWidth || t > 0 && 0 === l))
                    return !0;
                return !0
            }
            function r(t, i) {
                h.scrollTop -= i,
                h.scrollLeft -= t,
                T(e)
            }
            function l(t) {
                return t.targetTouches ? t.targetTouches[0] : t
            }
            function n(t) {
                return !(t.pointerType && "pen" === t.pointerType && 0 === t.buttons || (!t.targetTouches || 1 !== t.targetTouches.length) && (!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE))
            }
            function o(t) {
                if (n(t)) {
                    var e = l(t);
                    u.pageX = e.pageX,
                    u.pageY = e.pageY,
                    d = (new Date).getTime(),
                    null !== p && clearInterval(p)
                }
            }
            function s(e, i, r) {
                if (!h.contains(e))
                    return !1;
                for (var l = e; l && l !== h; ) {
                    if (l.classList.contains(m.element.consuming))
                        return !0;
                    var n = t(l);
                    if ([n.overflow, n.overflowX, n.overflowY].join("").match(/(scroll|auto)/)) {
                        var o = l.scrollHeight - l.clientHeight;
                        if (o > 0 && !(0 === l.scrollTop && r > 0 || l.scrollTop === o && r < 0))
                            return !0;
                        var s = l.scrollLeft - l.clientWidth;
                        if (s > 0 && !(0 === l.scrollLeft && i < 0 || l.scrollLeft === s && i > 0))
                            return !0
                    }
                    l = l.parentNode
                }
                return !1
            }
            function a(t) {
                if (n(t)) {
                    var e = l(t)
                      , o = {
                        pageX: e.pageX,
                        pageY: e.pageY
                    }
                      , a = o.pageX - u.pageX
                      , c = o.pageY - u.pageY;
                    if (s(t.target, a, c))
                        return;
                    r(a, c),
                    u = o;
                    var h = (new Date).getTime()
                      , p = h - d;
                    p > 0 && (f.x = a / p,
                    f.y = c / p,
                    d = h),
                    i(a, c) && t.preventDefault()
                }
            }
            function c() {
                e.settings.swipeEasing && (clearInterval(p),
                p = setInterval(function() {
                    e.isInitialized ? clearInterval(p) : f.x || f.y ? Math.abs(f.x) < .01 && Math.abs(f.y) < .01 ? clearInterval(p) : (r(30 * f.x, 30 * f.y),
                    f.x *= .8,
                    f.y *= .8) : clearInterval(p)
                }, 10))
            }
            if (L.supportsTouch || L.supportsIePointer) {
                var h = e.element
                  , u = {}
                  , d = 0
                  , f = {}
                  , p = null;
                L.supportsTouch ? (e.event.bind(h, "touchstart", o),
                e.event.bind(h, "touchmove", a),
                e.event.bind(h, "touchend", c)) : L.supportsIePointer && (window.PointerEvent ? (e.event.bind(h, "pointerdown", o),
                e.event.bind(h, "pointermove", a),
                e.event.bind(h, "pointerup", c)) : window.MSPointerEvent && (e.event.bind(h, "MSPointerDown", o),
                e.event.bind(h, "MSPointerMove", a),
                e.event.bind(h, "MSPointerUp", c)))
            }
        }
    }
      , H = function(r, l) {
        var n = this;
        if (void 0 === l && (l = {}),
        "string" == typeof r && (r = document.querySelector(r)),
        !r || !r.nodeName)
            throw new Error("no element is specified to initialize PerfectScrollbar");
        this.element = r,
        r.classList.add(m.main),
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
        for (var o in l)
            n.settings[o] = l[o];
        this.containerWidth = null,
        this.containerHeight = null,
        this.contentWidth = null,
        this.contentHeight = null;
        var s = function() {
            return r.classList.add(m.state.focus)
        }
          , a = function() {
            return r.classList.remove(m.state.focus)
        };
        this.isRtl = "rtl" === t(r).direction,
        this.isNegativeScroll = function() {
            var t = r.scrollLeft
              , e = null;
            return r.scrollLeft = -1,
            e = r.scrollLeft < 0,
            r.scrollLeft = t,
            e
        }(),
        this.negativeScrollAdjustment = this.isNegativeScroll ? r.scrollWidth - r.clientWidth : 0,
        this.event = new y,
        this.ownerDocument = r.ownerDocument || document,
        this.scrollbarXRail = i(m.element.rail("x")),
        r.appendChild(this.scrollbarXRail),
        this.scrollbarX = i(m.element.thumb("x")),
        this.scrollbarXRail.appendChild(this.scrollbarX),
        this.scrollbarX.setAttribute("tabindex", 0),
        this.event.bind(this.scrollbarX, "focus", s),
        this.event.bind(this.scrollbarX, "blur", a),
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
        this.scrollbarYRail = i(m.element.rail("y")),
        r.appendChild(this.scrollbarYRail),
        this.scrollbarY = i(m.element.thumb("y")),
        this.scrollbarYRail.appendChild(this.scrollbarY),
        this.scrollbarY.setAttribute("tabindex", 0),
        this.event.bind(this.scrollbarY, "focus", s),
        this.event.bind(this.scrollbarY, "blur", a),
        this.scrollbarYActive = null,
        this.scrollbarYHeight = null,
        this.scrollbarYTop = null;
        var h = t(this.scrollbarYRail);
        this.scrollbarYRight = parseInt(h.right, 10),
        isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1,
        this.scrollbarYLeft = u(h.left)) : this.isScrollbarYUsingRight = !0,
        this.scrollbarYOuterWidth = this.isRtl ? f(this.scrollbarY) : null,
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
            x: r.scrollLeft <= 0 ? "start" : r.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
            y: r.scrollTop <= 0 ? "start" : r.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
        },
        this.isAlive = !0,
        this.settings.handlers.forEach(function(t) {
            return R[t](n)
        }),
        this.lastScrollTop = r.scrollTop,
        this.lastScrollLeft = r.scrollLeft,
        this.event.bind(this.element, "scroll", function(t) {
            return n.onScroll(t)
        }),
        T(this)
    };
    return H.prototype.update = function() {
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
        T(this),
        W(this, "top", 0, !1, !0),
        W(this, "left", 0, !1, !0),
        e(this.scrollbarXRail, {
            display: ""
        }),
        e(this.scrollbarYRail, {
            display: ""
        }))
    }
    ,
    H.prototype.onScroll = function(t) {
        this.isAlive && (T(this),
        W(this, "top", this.element.scrollTop - this.lastScrollTop),
        W(this, "left", this.element.scrollLeft - this.lastScrollLeft),
        this.lastScrollTop = this.element.scrollTop,
        this.lastScrollLeft = this.element.scrollLeft)
    }
    ,
    H.prototype.destroy = function() {
        this.isAlive && (this.event.unbindAll(),
        l(this.scrollbarX),
        l(this.scrollbarY),
        l(this.scrollbarXRail),
        l(this.scrollbarYRail),
        this.removePsClasses(),
        this.element = null,
        this.scrollbarX = null,
        this.scrollbarY = null,
        this.scrollbarXRail = null,
        this.scrollbarYRail = null,
        this.isAlive = !1)
    }
    ,
    H.prototype.removePsClasses = function() {
        this.element.className = this.element.className.split(" ").filter(function(t) {
            return !t.match(/^ps([-_].+|)$/)
        }).join(" ")
    }
    ,
    H
});
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
}(this, function() {
    "use strict";
    var e, i;
    function c() {
        return e.apply(null, arguments)
    }
    function o(e) {
        return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
    }
    function u(e) {
        return null != e && "[object Object]" === Object.prototype.toString.call(e)
    }
    function l(e) {
        return void 0 === e
    }
    function h(e) {
        return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
    }
    function d(e) {
        return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
    }
    function f(e, t) {
        var n, s = [];
        for (n = 0; n < e.length; ++n)
            s.push(t(e[n], n));
        return s
    }
    function m(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    function _(e, t) {
        for (var n in t)
            m(t, n) && (e[n] = t[n]);
        return m(t, "toString") && (e.toString = t.toString),
        m(t, "valueOf") && (e.valueOf = t.valueOf),
        e
    }
    function y(e, t, n, s) {
        return Tt(e, t, n, s, !0).utc()
    }
    function g(e) {
        return null == e._pf && (e._pf = {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: !1,
            weekdayMismatch: !1
        }),
        e._pf
    }
    function v(e) {
        if (null == e._isValid) {
            var t = g(e)
              , n = i.call(t.parsedDateParts, function(e) {
                return null != e
            })
              , s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
            if (e._strict && (s = s && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour),
            null != Object.isFrozen && Object.isFrozen(e))
                return s;
            e._isValid = s
        }
        return e._isValid
    }
    function p(e) {
        var t = y(NaN);
        return null != e ? _(g(t), e) : g(t).userInvalidated = !0,
        t
    }
    i = Array.prototype.some ? Array.prototype.some : function(e) {
        for (var t = Object(this), n = t.length >>> 0, s = 0; s < n; s++)
            if (s in t && e.call(this, t[s], s, t))
                return !0;
        return !1
    }
    ;
    var r = c.momentProperties = [];
    function w(e, t) {
        var n, s, i;
        if (l(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
        l(t._i) || (e._i = t._i),
        l(t._f) || (e._f = t._f),
        l(t._l) || (e._l = t._l),
        l(t._strict) || (e._strict = t._strict),
        l(t._tzm) || (e._tzm = t._tzm),
        l(t._isUTC) || (e._isUTC = t._isUTC),
        l(t._offset) || (e._offset = t._offset),
        l(t._pf) || (e._pf = g(t)),
        l(t._locale) || (e._locale = t._locale),
        0 < r.length)
            for (n = 0; n < r.length; n++)
                l(i = t[s = r[n]]) || (e[s] = i);
        return e
    }
    var t = !1;
    function M(e) {
        w(this, e),
        this._d = new Date(null != e._d ? e._d.getTime() : NaN),
        this.isValid() || (this._d = new Date(NaN)),
        !1 === t && (t = !0,
        c.updateOffset(this),
        t = !1)
    }
    function k(e) {
        return e instanceof M || null != e && null != e._isAMomentObject
    }
    function S(e) {
        return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
    }
    function D(e) {
        var t = +e
          , n = 0;
        return 0 !== t && isFinite(t) && (n = S(t)),
        n
    }
    function a(e, t, n) {
        var s, i = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), a = 0;
        for (s = 0; s < i; s++)
            (n && e[s] !== t[s] || !n && D(e[s]) !== D(t[s])) && a++;
        return a + r
    }
    function Y(e) {
        !1 === c.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
    }
    function n(i, r) {
        var a = !0;
        return _(function() {
            if (null != c.deprecationHandler && c.deprecationHandler(null, i),
            a) {
                for (var e, t = [], n = 0; n < arguments.length; n++) {
                    if (e = "",
                    "object" == typeof arguments[n]) {
                        for (var s in e += "\n[" + n + "] ",
                        arguments[0])
                            e += s + ": " + arguments[0][s] + ", ";
                        e = e.slice(0, -2)
                    } else
                        e = arguments[n];
                    t.push(e)
                }
                Y(i + "\nArguments: " + Array.prototype.slice.call(t).join("") + "\n" + (new Error).stack),
                a = !1
            }
            return r.apply(this, arguments)
        }, r)
    }
    var s, O = {};
    function T(e, t) {
        null != c.deprecationHandler && c.deprecationHandler(e, t),
        O[e] || (Y(t),
        O[e] = !0)
    }
    function b(e) {
        return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
    }
    function x(e, t) {
        var n, s = _({}, e);
        for (n in t)
            m(t, n) && (u(e[n]) && u(t[n]) ? (s[n] = {},
            _(s[n], e[n]),
            _(s[n], t[n])) : null != t[n] ? s[n] = t[n] : delete s[n]);
        for (n in e)
            m(e, n) && !m(t, n) && u(e[n]) && (s[n] = _({}, s[n]));
        return s
    }
    function P(e) {
        null != e && this.set(e)
    }
    c.suppressDeprecationWarnings = !1,
    c.deprecationHandler = null,
    s = Object.keys ? Object.keys : function(e) {
        var t, n = [];
        for (t in e)
            m(e, t) && n.push(t);
        return n
    }
    ;
    var W = {};
    function C(e, t) {
        var n = e.toLowerCase();
        W[n] = W[n + "s"] = W[t] = e
    }
    function H(e) {
        return "string" == typeof e ? W[e] || W[e.toLowerCase()] : void 0
    }
    function R(e) {
        var t, n, s = {};
        for (n in e)
            m(e, n) && (t = H(n)) && (s[t] = e[n]);
        return s
    }
    var U = {};
    function F(e, t) {
        U[e] = t
    }
    function L(e, t, n) {
        var s = "" + Math.abs(e)
          , i = t - s.length;
        return (0 <= e ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, i)).toString().substr(1) + s
    }
    var N = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g
      , G = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g
      , V = {}
      , E = {};
    function I(e, t, n, s) {
        var i = s;
        "string" == typeof s && (i = function() {
            return this[s]()
        }
        ),
        e && (E[e] = i),
        t && (E[t[0]] = function() {
            return L(i.apply(this, arguments), t[1], t[2])
        }
        ),
        n && (E[n] = function() {
            return this.localeData().ordinal(i.apply(this, arguments), e)
        }
        )
    }
    function A(e, t) {
        return e.isValid() ? (t = j(t, e.localeData()),
        V[t] = V[t] || function(s) {
            var e, i, t, r = s.match(N);
            for (e = 0,
            i = r.length; e < i; e++)
                E[r[e]] ? r[e] = E[r[e]] : r[e] = (t = r[e]).match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
            return function(e) {
                var t, n = "";
                for (t = 0; t < i; t++)
                    n += b(r[t]) ? r[t].call(e, s) : r[t];
                return n
            }
        }(t),
        V[t](e)) : e.localeData().invalidDate()
    }
    function j(e, t) {
        var n = 5;
        function s(e) {
            return t.longDateFormat(e) || e
        }
        for (G.lastIndex = 0; 0 <= n && G.test(e); )
            e = e.replace(G, s),
            G.lastIndex = 0,
            n -= 1;
        return e
    }
    var Z = /\d/
      , z = /\d\d/
      , $ = /\d{3}/
      , q = /\d{4}/
      , J = /[+-]?\d{6}/
      , B = /\d\d?/
      , Q = /\d\d\d\d?/
      , X = /\d\d\d\d\d\d?/
      , K = /\d{1,3}/
      , ee = /\d{1,4}/
      , te = /[+-]?\d{1,6}/
      , ne = /\d+/
      , se = /[+-]?\d+/
      , ie = /Z|[+-]\d\d:?\d\d/gi
      , re = /Z|[+-]\d\d(?::?\d\d)?/gi
      , ae = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i
      , oe = {};
    function ue(e, n, s) {
        oe[e] = b(n) ? n : function(e, t) {
            return e && s ? s : n
        }
    }
    function le(e, t) {
        return m(oe, e) ? oe[e](t._strict, t._locale) : new RegExp(he(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, s, i) {
            return t || n || s || i
        })))
    }
    function he(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    var de = {};
    function ce(e, n) {
        var t, s = n;
        for ("string" == typeof e && (e = [e]),
        h(n) && (s = function(e, t) {
            t[n] = D(e)
        }
        ),
        t = 0; t < e.length; t++)
            de[e[t]] = s
    }
    function fe(e, i) {
        ce(e, function(e, t, n, s) {
            n._w = n._w || {},
            i(e, n._w, n, s)
        })
    }
    var me = 0
      , _e = 1
      , ye = 2
      , ge = 3
      , ve = 4
      , pe = 5
      , we = 6
      , Me = 7
      , ke = 8;
    function Se(e) {
        return De(e) ? 366 : 365
    }
    function De(e) {
        return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
    }
    I("Y", 0, 0, function() {
        var e = this.year();
        return e <= 9999 ? "" + e : "+" + e
    }),
    I(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }),
    I(0, ["YYYY", 4], 0, "year"),
    I(0, ["YYYYY", 5], 0, "year"),
    I(0, ["YYYYYY", 6, !0], 0, "year"),
    C("year", "y"),
    F("year", 1),
    ue("Y", se),
    ue("YY", B, z),
    ue("YYYY", ee, q),
    ue("YYYYY", te, J),
    ue("YYYYYY", te, J),
    ce(["YYYYY", "YYYYYY"], me),
    ce("YYYY", function(e, t) {
        t[me] = 2 === e.length ? c.parseTwoDigitYear(e) : D(e)
    }),
    ce("YY", function(e, t) {
        t[me] = c.parseTwoDigitYear(e)
    }),
    ce("Y", function(e, t) {
        t[me] = parseInt(e, 10)
    }),
    c.parseTwoDigitYear = function(e) {
        return D(e) + (68 < D(e) ? 1900 : 2e3)
    }
    ;
    var Ye, Oe = Te("FullYear", !0);
    function Te(t, n) {
        return function(e) {
            return null != e ? (xe(this, t, e),
            c.updateOffset(this, n),
            this) : be(this, t)
        }
    }
    function be(e, t) {
        return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
    }
    function xe(e, t, n) {
        e.isValid() && !isNaN(n) && ("FullYear" === t && De(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](n, e.month(), Pe(n, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n))
    }
    function Pe(e, t) {
        if (isNaN(e) || isNaN(t))
            return NaN;
        var n, s = (t % (n = 12) + n) % n;
        return e += (t - s) / 12,
        1 === s ? De(e) ? 29 : 28 : 31 - s % 7 % 2
    }
    Ye = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
        var t;
        for (t = 0; t < this.length; ++t)
            if (this[t] === e)
                return t;
        return -1
    }
    ,
    I("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }),
    I("MMM", 0, 0, function(e) {
        return this.localeData().monthsShort(this, e)
    }),
    I("MMMM", 0, 0, function(e) {
        return this.localeData().months(this, e)
    }),
    C("month", "M"),
    F("month", 8),
    ue("M", B),
    ue("MM", B, z),
    ue("MMM", function(e, t) {
        return t.monthsShortRegex(e)
    }),
    ue("MMMM", function(e, t) {
        return t.monthsRegex(e)
    }),
    ce(["M", "MM"], function(e, t) {
        t[_e] = D(e) - 1
    }),
    ce(["MMM", "MMMM"], function(e, t, n, s) {
        var i = n._locale.monthsParse(e, s, n._strict);
        null != i ? t[_e] = i : g(n).invalidMonth = e
    });
    var We = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/
      , Ce = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
    var He = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
    function Re(e, t) {
        var n;
        if (!e.isValid())
            return e;
        if ("string" == typeof t)
            if (/^\d+$/.test(t))
                t = D(t);
            else if (!h(t = e.localeData().monthsParse(t)))
                return e;
        return n = Math.min(e.date(), Pe(e.year(), t)),
        e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n),
        e
    }
    function Ue(e) {
        return null != e ? (Re(this, e),
        c.updateOffset(this, !0),
        this) : be(this, "Month")
    }
    var Fe = ae;
    var Le = ae;
    function Ne() {
        function e(e, t) {
            return t.length - e.length
        }
        var t, n, s = [], i = [], r = [];
        for (t = 0; t < 12; t++)
            n = y([2e3, t]),
            s.push(this.monthsShort(n, "")),
            i.push(this.months(n, "")),
            r.push(this.months(n, "")),
            r.push(this.monthsShort(n, ""));
        for (s.sort(e),
        i.sort(e),
        r.sort(e),
        t = 0; t < 12; t++)
            s[t] = he(s[t]),
            i[t] = he(i[t]);
        for (t = 0; t < 24; t++)
            r[t] = he(r[t]);
        this._monthsRegex = new RegExp("^(" + r.join("|") + ")","i"),
        this._monthsShortRegex = this._monthsRegex,
        this._monthsStrictRegex = new RegExp("^(" + i.join("|") + ")","i"),
        this._monthsShortStrictRegex = new RegExp("^(" + s.join("|") + ")","i")
    }
    function Ge(e) {
        var t;
        if (e < 100 && 0 <= e) {
            var n = Array.prototype.slice.call(arguments);
            n[0] = e + 400,
            t = new Date(Date.UTC.apply(null, n)),
            isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)
        } else
            t = new Date(Date.UTC.apply(null, arguments));
        return t
    }
    function Ve(e, t, n) {
        var s = 7 + t - n;
        return -((7 + Ge(e, 0, s).getUTCDay() - t) % 7) + s - 1
    }
    function Ee(e, t, n, s, i) {
        var r, a, o = 1 + 7 * (t - 1) + (7 + n - s) % 7 + Ve(e, s, i);
        return a = o <= 0 ? Se(r = e - 1) + o : o > Se(e) ? (r = e + 1,
        o - Se(e)) : (r = e,
        o),
        {
            year: r,
            dayOfYear: a
        }
    }
    function Ie(e, t, n) {
        var s, i, r = Ve(e.year(), t, n), a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
        return a < 1 ? s = a + Ae(i = e.year() - 1, t, n) : a > Ae(e.year(), t, n) ? (s = a - Ae(e.year(), t, n),
        i = e.year() + 1) : (i = e.year(),
        s = a),
        {
            week: s,
            year: i
        }
    }
    function Ae(e, t, n) {
        var s = Ve(e, t, n)
          , i = Ve(e + 1, t, n);
        return (Se(e) - s + i) / 7
    }
    I("w", ["ww", 2], "wo", "week"),
    I("W", ["WW", 2], "Wo", "isoWeek"),
    C("week", "w"),
    C("isoWeek", "W"),
    F("week", 5),
    F("isoWeek", 5),
    ue("w", B),
    ue("ww", B, z),
    ue("W", B),
    ue("WW", B, z),
    fe(["w", "ww", "W", "WW"], function(e, t, n, s) {
        t[s.substr(0, 1)] = D(e)
    });
    function je(e, t) {
        return e.slice(t, 7).concat(e.slice(0, t))
    }
    I("d", 0, "do", "day"),
    I("dd", 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e)
    }),
    I("ddd", 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e)
    }),
    I("dddd", 0, 0, function(e) {
        return this.localeData().weekdays(this, e)
    }),
    I("e", 0, 0, "weekday"),
    I("E", 0, 0, "isoWeekday"),
    C("day", "d"),
    C("weekday", "e"),
    C("isoWeekday", "E"),
    F("day", 11),
    F("weekday", 11),
    F("isoWeekday", 11),
    ue("d", B),
    ue("e", B),
    ue("E", B),
    ue("dd", function(e, t) {
        return t.weekdaysMinRegex(e)
    }),
    ue("ddd", function(e, t) {
        return t.weekdaysShortRegex(e)
    }),
    ue("dddd", function(e, t) {
        return t.weekdaysRegex(e)
    }),
    fe(["dd", "ddd", "dddd"], function(e, t, n, s) {
        var i = n._locale.weekdaysParse(e, s, n._strict);
        null != i ? t.d = i : g(n).invalidWeekday = e
    }),
    fe(["d", "e", "E"], function(e, t, n, s) {
        t[s] = D(e)
    });
    var Ze = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
    var ze = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
    var $e = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    var qe = ae;
    var Je = ae;
    var Be = ae;
    function Qe() {
        function e(e, t) {
            return t.length - e.length
        }
        var t, n, s, i, r, a = [], o = [], u = [], l = [];
        for (t = 0; t < 7; t++)
            n = y([2e3, 1]).day(t),
            s = this.weekdaysMin(n, ""),
            i = this.weekdaysShort(n, ""),
            r = this.weekdays(n, ""),
            a.push(s),
            o.push(i),
            u.push(r),
            l.push(s),
            l.push(i),
            l.push(r);
        for (a.sort(e),
        o.sort(e),
        u.sort(e),
        l.sort(e),
        t = 0; t < 7; t++)
            o[t] = he(o[t]),
            u[t] = he(u[t]),
            l[t] = he(l[t]);
        this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")","i"),
        this._weekdaysShortRegex = this._weekdaysRegex,
        this._weekdaysMinRegex = this._weekdaysRegex,
        this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")","i"),
        this._weekdaysShortStrictRegex = new RegExp("^(" + o.join("|") + ")","i"),
        this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")","i")
    }
    function Xe() {
        return this.hours() % 12 || 12
    }
    function Ke(e, t) {
        I(e, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), t)
        })
    }
    function et(e, t) {
        return t._meridiemParse
    }
    I("H", ["HH", 2], 0, "hour"),
    I("h", ["hh", 2], 0, Xe),
    I("k", ["kk", 2], 0, function() {
        return this.hours() || 24
    }),
    I("hmm", 0, 0, function() {
        return "" + Xe.apply(this) + L(this.minutes(), 2)
    }),
    I("hmmss", 0, 0, function() {
        return "" + Xe.apply(this) + L(this.minutes(), 2) + L(this.seconds(), 2)
    }),
    I("Hmm", 0, 0, function() {
        return "" + this.hours() + L(this.minutes(), 2)
    }),
    I("Hmmss", 0, 0, function() {
        return "" + this.hours() + L(this.minutes(), 2) + L(this.seconds(), 2)
    }),
    Ke("a", !0),
    Ke("A", !1),
    C("hour", "h"),
    F("hour", 13),
    ue("a", et),
    ue("A", et),
    ue("H", B),
    ue("h", B),
    ue("k", B),
    ue("HH", B, z),
    ue("hh", B, z),
    ue("kk", B, z),
    ue("hmm", Q),
    ue("hmmss", X),
    ue("Hmm", Q),
    ue("Hmmss", X),
    ce(["H", "HH"], ge),
    ce(["k", "kk"], function(e, t, n) {
        var s = D(e);
        t[ge] = 24 === s ? 0 : s
    }),
    ce(["a", "A"], function(e, t, n) {
        n._isPm = n._locale.isPM(e),
        n._meridiem = e
    }),
    ce(["h", "hh"], function(e, t, n) {
        t[ge] = D(e),
        g(n).bigHour = !0
    }),
    ce("hmm", function(e, t, n) {
        var s = e.length - 2;
        t[ge] = D(e.substr(0, s)),
        t[ve] = D(e.substr(s)),
        g(n).bigHour = !0
    }),
    ce("hmmss", function(e, t, n) {
        var s = e.length - 4
          , i = e.length - 2;
        t[ge] = D(e.substr(0, s)),
        t[ve] = D(e.substr(s, 2)),
        t[pe] = D(e.substr(i)),
        g(n).bigHour = !0
    }),
    ce("Hmm", function(e, t, n) {
        var s = e.length - 2;
        t[ge] = D(e.substr(0, s)),
        t[ve] = D(e.substr(s))
    }),
    ce("Hmmss", function(e, t, n) {
        var s = e.length - 4
          , i = e.length - 2;
        t[ge] = D(e.substr(0, s)),
        t[ve] = D(e.substr(s, 2)),
        t[pe] = D(e.substr(i))
    });
    var tt, nt = Te("Hours", !0), st = {
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        longDateFormat: {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        },
        invalidDate: "Invalid date",
        ordinal: "%d",
        dayOfMonthOrdinalParse: /\d{1,2}/,
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        months: Ce,
        monthsShort: He,
        week: {
            dow: 0,
            doy: 6
        },
        weekdays: Ze,
        weekdaysMin: $e,
        weekdaysShort: ze,
        meridiemParse: /[ap]\.?m?\.?/i
    }, it = {}, rt = {};
    function at(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
    }
    function ot(e) {
        var t = null;
        if (!it[e] && "undefined" != typeof module && module && module.exports)
            try {
                t = tt._abbr,
                require("./locale/" + e),
                ut(t)
            } catch (e) {}
        return it[e]
    }
    function ut(e, t) {
        var n;
        return e && ((n = l(t) ? ht(e) : lt(e, t)) ? tt = n : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")),
        tt._abbr
    }
    function lt(e, t) {
        if (null === t)
            return delete it[e],
            null;
        var n, s = st;
        if (t.abbr = e,
        null != it[e])
            T("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),
            s = it[e]._config;
        else if (null != t.parentLocale)
            if (null != it[t.parentLocale])
                s = it[t.parentLocale]._config;
            else {
                if (null == (n = ot(t.parentLocale)))
                    return rt[t.parentLocale] || (rt[t.parentLocale] = []),
                    rt[t.parentLocale].push({
                        name: e,
                        config: t
                    }),
                    null;
                s = n._config
            }
        return it[e] = new P(x(s, t)),
        rt[e] && rt[e].forEach(function(e) {
            lt(e.name, e.config)
        }),
        ut(e),
        it[e]
    }
    function ht(e) {
        var t;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr),
        !e)
            return tt;
        if (!o(e)) {
            if (t = ot(e))
                return t;
            e = [e]
        }
        return function(e) {
            for (var t, n, s, i, r = 0; r < e.length; ) {
                for (t = (i = at(e[r]).split("-")).length,
                n = (n = at(e[r + 1])) ? n.split("-") : null; 0 < t; ) {
                    if (s = ot(i.slice(0, t).join("-")))
                        return s;
                    if (n && n.length >= t && a(i, n, !0) >= t - 1)
                        break;
                    t--
                }
                r++
            }
            return tt
        }(e)
    }
    function dt(e) {
        var t, n = e._a;
        return n && -2 === g(e).overflow && (t = n[_e] < 0 || 11 < n[_e] ? _e : n[ye] < 1 || n[ye] > Pe(n[me], n[_e]) ? ye : n[ge] < 0 || 24 < n[ge] || 24 === n[ge] && (0 !== n[ve] || 0 !== n[pe] || 0 !== n[we]) ? ge : n[ve] < 0 || 59 < n[ve] ? ve : n[pe] < 0 || 59 < n[pe] ? pe : n[we] < 0 || 999 < n[we] ? we : -1,
        g(e)._overflowDayOfYear && (t < me || ye < t) && (t = ye),
        g(e)._overflowWeeks && -1 === t && (t = Me),
        g(e)._overflowWeekday && -1 === t && (t = ke),
        g(e).overflow = t),
        e
    }
    function ct(e, t, n) {
        return null != e ? e : null != t ? t : n
    }
    function ft(e) {
        var t, n, s, i, r, a = [];
        if (!e._d) {
            var o, u;
            for (o = e,
            u = new Date(c.now()),
            s = o._useUTC ? [u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate()] : [u.getFullYear(), u.getMonth(), u.getDate()],
            e._w && null == e._a[ye] && null == e._a[_e] && function(e) {
                var t, n, s, i, r, a, o, u;
                if (null != (t = e._w).GG || null != t.W || null != t.E)
                    r = 1,
                    a = 4,
                    n = ct(t.GG, e._a[me], Ie(bt(), 1, 4).year),
                    s = ct(t.W, 1),
                    ((i = ct(t.E, 1)) < 1 || 7 < i) && (u = !0);
                else {
                    r = e._locale._week.dow,
                    a = e._locale._week.doy;
                    var l = Ie(bt(), r, a);
                    n = ct(t.gg, e._a[me], l.year),
                    s = ct(t.w, l.week),
                    null != t.d ? ((i = t.d) < 0 || 6 < i) && (u = !0) : null != t.e ? (i = t.e + r,
                    (t.e < 0 || 6 < t.e) && (u = !0)) : i = r
                }
                s < 1 || s > Ae(n, r, a) ? g(e)._overflowWeeks = !0 : null != u ? g(e)._overflowWeekday = !0 : (o = Ee(n, s, i, r, a),
                e._a[me] = o.year,
                e._dayOfYear = o.dayOfYear)
            }(e),
            null != e._dayOfYear && (r = ct(e._a[me], s[me]),
            (e._dayOfYear > Se(r) || 0 === e._dayOfYear) && (g(e)._overflowDayOfYear = !0),
            n = Ge(r, 0, e._dayOfYear),
            e._a[_e] = n.getUTCMonth(),
            e._a[ye] = n.getUTCDate()),
            t = 0; t < 3 && null == e._a[t]; ++t)
                e._a[t] = a[t] = s[t];
            for (; t < 7; t++)
                e._a[t] = a[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            24 === e._a[ge] && 0 === e._a[ve] && 0 === e._a[pe] && 0 === e._a[we] && (e._nextDay = !0,
            e._a[ge] = 0),
            e._d = (e._useUTC ? Ge : function(e, t, n, s, i, r, a) {
                var o;
                return e < 100 && 0 <= e ? (o = new Date(e + 400,t,n,s,i,r,a),
                isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e,t,n,s,i,r,a),
                o
            }
            ).apply(null, a),
            i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(),
            null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
            e._nextDay && (e._a[ge] = 24),
            e._w && void 0 !== e._w.d && e._w.d !== i && (g(e).weekdayMismatch = !0)
        }
    }
    var mt = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/
      , _t = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/
      , yt = /Z|[+-]\d\d(?::?\d\d)?/
      , gt = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]]
      , vt = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]]
      , pt = /^\/?Date\((\-?\d+)/i;
    function wt(e) {
        var t, n, s, i, r, a, o = e._i, u = mt.exec(o) || _t.exec(o);
        if (u) {
            for (g(e).iso = !0,
            t = 0,
            n = gt.length; t < n; t++)
                if (gt[t][1].exec(u[1])) {
                    i = gt[t][0],
                    s = !1 !== gt[t][2];
                    break
                }
            if (null == i)
                return void (e._isValid = !1);
            if (u[3]) {
                for (t = 0,
                n = vt.length; t < n; t++)
                    if (vt[t][1].exec(u[3])) {
                        r = (u[2] || " ") + vt[t][0];
                        break
                    }
                if (null == r)
                    return void (e._isValid = !1)
            }
            if (!s && null != r)
                return void (e._isValid = !1);
            if (u[4]) {
                if (!yt.exec(u[4]))
                    return void (e._isValid = !1);
                a = "Z"
            }
            e._f = i + (r || "") + (a || ""),
            Yt(e)
        } else
            e._isValid = !1
    }
    var Mt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
    function kt(e, t, n, s, i, r) {
        var a = [function(e) {
            var t = parseInt(e, 10);
            {
                if (t <= 49)
                    return 2e3 + t;
                if (t <= 999)
                    return 1900 + t
            }
            return t
        }(e), He.indexOf(t), parseInt(n, 10), parseInt(s, 10), parseInt(i, 10)];
        return r && a.push(parseInt(r, 10)),
        a
    }
    var St = {
        UT: 0,
        GMT: 0,
        EDT: -240,
        EST: -300,
        CDT: -300,
        CST: -360,
        MDT: -360,
        MST: -420,
        PDT: -420,
        PST: -480
    };
    function Dt(e) {
        var t, n, s, i = Mt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
        if (i) {
            var r = kt(i[4], i[3], i[2], i[5], i[6], i[7]);
            if (t = i[1],
            n = r,
            s = e,
            t && ze.indexOf(t) !== new Date(n[0],n[1],n[2]).getDay() && (g(s).weekdayMismatch = !0,
            !(s._isValid = !1)))
                return;
            e._a = r,
            e._tzm = function(e, t, n) {
                if (e)
                    return St[e];
                if (t)
                    return 0;
                var s = parseInt(n, 10)
                  , i = s % 100;
                return (s - i) / 100 * 60 + i
            }(i[8], i[9], i[10]),
            e._d = Ge.apply(null, e._a),
            e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
            g(e).rfc2822 = !0
        } else
            e._isValid = !1
    }
    function Yt(e) {
        if (e._f !== c.ISO_8601)
            if (e._f !== c.RFC_2822) {
                e._a = [],
                g(e).empty = !0;
                var t, n, s, i, r, a, o, u, l = "" + e._i, h = l.length, d = 0;
                for (s = j(e._f, e._locale).match(N) || [],
                t = 0; t < s.length; t++)
                    i = s[t],
                    (n = (l.match(le(i, e)) || [])[0]) && (0 < (r = l.substr(0, l.indexOf(n))).length && g(e).unusedInput.push(r),
                    l = l.slice(l.indexOf(n) + n.length),
                    d += n.length),
                    E[i] ? (n ? g(e).empty = !1 : g(e).unusedTokens.push(i),
                    a = i,
                    u = e,
                    null != (o = n) && m(de, a) && de[a](o, u._a, u, a)) : e._strict && !n && g(e).unusedTokens.push(i);
                g(e).charsLeftOver = h - d,
                0 < l.length && g(e).unusedInput.push(l),
                e._a[ge] <= 12 && !0 === g(e).bigHour && 0 < e._a[ge] && (g(e).bigHour = void 0),
                g(e).parsedDateParts = e._a.slice(0),
                g(e).meridiem = e._meridiem,
                e._a[ge] = function(e, t, n) {
                    var s;
                    if (null == n)
                        return t;
                    return null != e.meridiemHour ? e.meridiemHour(t, n) : (null != e.isPM && ((s = e.isPM(n)) && t < 12 && (t += 12),
                    s || 12 !== t || (t = 0)),
                    t)
                }(e._locale, e._a[ge], e._meridiem),
                ft(e),
                dt(e)
            } else
                Dt(e);
        else
            wt(e)
    }
    function Ot(e) {
        var t, n, s, i, r = e._i, a = e._f;
        return e._locale = e._locale || ht(e._l),
        null === r || void 0 === a && "" === r ? p({
            nullInput: !0
        }) : ("string" == typeof r && (e._i = r = e._locale.preparse(r)),
        k(r) ? new M(dt(r)) : (d(r) ? e._d = r : o(a) ? function(e) {
            var t, n, s, i, r;
            if (0 === e._f.length)
                return g(e).invalidFormat = !0,
                e._d = new Date(NaN);
            for (i = 0; i < e._f.length; i++)
                r = 0,
                t = w({}, e),
                null != e._useUTC && (t._useUTC = e._useUTC),
                t._f = e._f[i],
                Yt(t),
                v(t) && (r += g(t).charsLeftOver,
                r += 10 * g(t).unusedTokens.length,
                g(t).score = r,
                (null == s || r < s) && (s = r,
                n = t));
            _(e, n || t)
        }(e) : a ? Yt(e) : l(n = (t = e)._i) ? t._d = new Date(c.now()) : d(n) ? t._d = new Date(n.valueOf()) : "string" == typeof n ? (s = t,
        null === (i = pt.exec(s._i)) ? (wt(s),
        !1 === s._isValid && (delete s._isValid,
        Dt(s),
        !1 === s._isValid && (delete s._isValid,
        c.createFromInputFallback(s)))) : s._d = new Date(+i[1])) : o(n) ? (t._a = f(n.slice(0), function(e) {
            return parseInt(e, 10)
        }),
        ft(t)) : u(n) ? function(e) {
            if (!e._d) {
                var t = R(e._i);
                e._a = f([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function(e) {
                    return e && parseInt(e, 10)
                }),
                ft(e)
            }
        }(t) : h(n) ? t._d = new Date(n) : c.createFromInputFallback(t),
        v(e) || (e._d = null),
        e))
    }
    function Tt(e, t, n, s, i) {
        var r, a = {};
        return !0 !== n && !1 !== n || (s = n,
        n = void 0),
        (u(e) && function(e) {
            if (Object.getOwnPropertyNames)
                return 0 === Object.getOwnPropertyNames(e).length;
            var t;
            for (t in e)
                if (e.hasOwnProperty(t))
                    return !1;
            return !0
        }(e) || o(e) && 0 === e.length) && (e = void 0),
        a._isAMomentObject = !0,
        a._useUTC = a._isUTC = i,
        a._l = n,
        a._i = e,
        a._f = t,
        a._strict = s,
        (r = new M(dt(Ot(a))))._nextDay && (r.add(1, "d"),
        r._nextDay = void 0),
        r
    }
    function bt(e, t, n, s) {
        return Tt(e, t, n, s, !1)
    }
    c.createFromInputFallback = n("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
        e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
    }),
    c.ISO_8601 = function() {}
    ,
    c.RFC_2822 = function() {}
    ;
    var xt = n("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var e = bt.apply(null, arguments);
        return this.isValid() && e.isValid() ? e < this ? this : e : p()
    })
      , Pt = n("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var e = bt.apply(null, arguments);
        return this.isValid() && e.isValid() ? this < e ? this : e : p()
    });
    function Wt(e, t) {
        var n, s;
        if (1 === t.length && o(t[0]) && (t = t[0]),
        !t.length)
            return bt();
        for (n = t[0],
        s = 1; s < t.length; ++s)
            t[s].isValid() && !t[s][e](n) || (n = t[s]);
        return n
    }
    var Ct = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
    function Ht(e) {
        var t = R(e)
          , n = t.year || 0
          , s = t.quarter || 0
          , i = t.month || 0
          , r = t.week || t.isoWeek || 0
          , a = t.day || 0
          , o = t.hour || 0
          , u = t.minute || 0
          , l = t.second || 0
          , h = t.millisecond || 0;
        this._isValid = function(e) {
            for (var t in e)
                if (-1 === Ye.call(Ct, t) || null != e[t] && isNaN(e[t]))
                    return !1;
            for (var n = !1, s = 0; s < Ct.length; ++s)
                if (e[Ct[s]]) {
                    if (n)
                        return !1;
                    parseFloat(e[Ct[s]]) !== D(e[Ct[s]]) && (n = !0)
                }
            return !0
        }(t),
        this._milliseconds = +h + 1e3 * l + 6e4 * u + 1e3 * o * 60 * 60,
        this._days = +a + 7 * r,
        this._months = +i + 3 * s + 12 * n,
        this._data = {},
        this._locale = ht(),
        this._bubble()
    }
    function Rt(e) {
        return e instanceof Ht
    }
    function Ut(e) {
        return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)
    }
    function Ft(e, n) {
        I(e, 0, 0, function() {
            var e = this.utcOffset()
              , t = "+";
            return e < 0 && (e = -e,
            t = "-"),
            t + L(~~(e / 60), 2) + n + L(~~e % 60, 2)
        })
    }
    Ft("Z", ":"),
    Ft("ZZ", ""),
    ue("Z", re),
    ue("ZZ", re),
    ce(["Z", "ZZ"], function(e, t, n) {
        n._useUTC = !0,
        n._tzm = Nt(re, e)
    });
    var Lt = /([\+\-]|\d\d)/gi;
    function Nt(e, t) {
        var n = (t || "").match(e);
        if (null === n)
            return null;
        var s = ((n[n.length - 1] || []) + "").match(Lt) || ["-", 0, 0]
          , i = 60 * s[1] + D(s[2]);
        return 0 === i ? 0 : "+" === s[0] ? i : -i
    }
    function Gt(e, t) {
        var n, s;
        return t._isUTC ? (n = t.clone(),
        s = (k(e) || d(e) ? e.valueOf() : bt(e).valueOf()) - n.valueOf(),
        n._d.setTime(n._d.valueOf() + s),
        c.updateOffset(n, !1),
        n) : bt(e).local()
    }
    function Vt(e) {
        return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
    }
    function Et() {
        return !!this.isValid() && (this._isUTC && 0 === this._offset)
    }
    c.updateOffset = function() {}
    ;
    var It = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/
      , At = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function jt(e, t) {
        var n, s, i, r = e, a = null;
        return Rt(e) ? r = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : h(e) ? (r = {},
        t ? r[t] = e : r.milliseconds = e) : (a = It.exec(e)) ? (n = "-" === a[1] ? -1 : 1,
        r = {
            y: 0,
            d: D(a[ye]) * n,
            h: D(a[ge]) * n,
            m: D(a[ve]) * n,
            s: D(a[pe]) * n,
            ms: D(Ut(1e3 * a[we])) * n
        }) : (a = At.exec(e)) ? (n = "-" === a[1] ? -1 : 1,
        r = {
            y: Zt(a[2], n),
            M: Zt(a[3], n),
            w: Zt(a[4], n),
            d: Zt(a[5], n),
            h: Zt(a[6], n),
            m: Zt(a[7], n),
            s: Zt(a[8], n)
        }) : null == r ? r = {} : "object" == typeof r && ("from"in r || "to"in r) && (i = function(e, t) {
            var n;
            if (!e.isValid() || !t.isValid())
                return {
                    milliseconds: 0,
                    months: 0
                };
            t = Gt(t, e),
            e.isBefore(t) ? n = zt(e, t) : ((n = zt(t, e)).milliseconds = -n.milliseconds,
            n.months = -n.months);
            return n
        }(bt(r.from), bt(r.to)),
        (r = {}).ms = i.milliseconds,
        r.M = i.months),
        s = new Ht(r),
        Rt(e) && m(e, "_locale") && (s._locale = e._locale),
        s
    }
    function Zt(e, t) {
        var n = e && parseFloat(e.replace(",", "."));
        return (isNaN(n) ? 0 : n) * t
    }
    function zt(e, t) {
        var n = {};
        return n.months = t.month() - e.month() + 12 * (t.year() - e.year()),
        e.clone().add(n.months, "M").isAfter(t) && --n.months,
        n.milliseconds = +t - +e.clone().add(n.months, "M"),
        n
    }
    function $t(s, i) {
        return function(e, t) {
            var n;
            return null === t || isNaN(+t) || (T(i, "moment()." + i + "(period, number) is deprecated. Please use moment()." + i + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),
            n = e,
            e = t,
            t = n),
            qt(this, jt(e = "string" == typeof e ? +e : e, t), s),
            this
        }
    }
    function qt(e, t, n, s) {
        var i = t._milliseconds
          , r = Ut(t._days)
          , a = Ut(t._months);
        e.isValid() && (s = null == s || s,
        a && Re(e, be(e, "Month") + a * n),
        r && xe(e, "Date", be(e, "Date") + r * n),
        i && e._d.setTime(e._d.valueOf() + i * n),
        s && c.updateOffset(e, r || a))
    }
    jt.fn = Ht.prototype,
    jt.invalid = function() {
        return jt(NaN)
    }
    ;
    var Jt = $t(1, "add")
      , Bt = $t(-1, "subtract");
    function Qt(e, t) {
        var n = 12 * (t.year() - e.year()) + (t.month() - e.month())
          , s = e.clone().add(n, "months");
        return -(n + (t - s < 0 ? (t - s) / (s - e.clone().add(n - 1, "months")) : (t - s) / (e.clone().add(n + 1, "months") - s))) || 0
    }
    function Xt(e) {
        var t;
        return void 0 === e ? this._locale._abbr : (null != (t = ht(e)) && (this._locale = t),
        this)
    }
    c.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ",
    c.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    var Kt = n("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
        return void 0 === e ? this.localeData() : this.locale(e)
    });
    function en() {
        return this._locale
    }
    var tn = 126227808e5;
    function nn(e, t) {
        return (e % t + t) % t
    }
    function sn(e, t, n) {
        return e < 100 && 0 <= e ? new Date(e + 400,t,n) - tn : new Date(e,t,n).valueOf()
    }
    function rn(e, t, n) {
        return e < 100 && 0 <= e ? Date.UTC(e + 400, t, n) - tn : Date.UTC(e, t, n)
    }
    function an(e, t) {
        I(0, [e, e.length], 0, t)
    }
    function on(e, t, n, s, i) {
        var r;
        return null == e ? Ie(this, s, i).year : ((r = Ae(e, s, i)) < t && (t = r),
        function(e, t, n, s, i) {
            var r = Ee(e, t, n, s, i)
              , a = Ge(r.year, 0, r.dayOfYear);
            return this.year(a.getUTCFullYear()),
            this.month(a.getUTCMonth()),
            this.date(a.getUTCDate()),
            this
        }
        .call(this, e, t, n, s, i))
    }
    I(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }),
    I(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }),
    an("gggg", "weekYear"),
    an("ggggg", "weekYear"),
    an("GGGG", "isoWeekYear"),
    an("GGGGG", "isoWeekYear"),
    C("weekYear", "gg"),
    C("isoWeekYear", "GG"),
    F("weekYear", 1),
    F("isoWeekYear", 1),
    ue("G", se),
    ue("g", se),
    ue("GG", B, z),
    ue("gg", B, z),
    ue("GGGG", ee, q),
    ue("gggg", ee, q),
    ue("GGGGG", te, J),
    ue("ggggg", te, J),
    fe(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, n, s) {
        t[s.substr(0, 2)] = D(e)
    }),
    fe(["gg", "GG"], function(e, t, n, s) {
        t[s] = c.parseTwoDigitYear(e)
    }),
    I("Q", 0, "Qo", "quarter"),
    C("quarter", "Q"),
    F("quarter", 7),
    ue("Q", Z),
    ce("Q", function(e, t) {
        t[_e] = 3 * (D(e) - 1)
    }),
    I("D", ["DD", 2], "Do", "date"),
    C("date", "D"),
    F("date", 9),
    ue("D", B),
    ue("DD", B, z),
    ue("Do", function(e, t) {
        return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient
    }),
    ce(["D", "DD"], ye),
    ce("Do", function(e, t) {
        t[ye] = D(e.match(B)[0])
    });
    var un = Te("Date", !0);
    I("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
    C("dayOfYear", "DDD"),
    F("dayOfYear", 4),
    ue("DDD", K),
    ue("DDDD", $),
    ce(["DDD", "DDDD"], function(e, t, n) {
        n._dayOfYear = D(e)
    }),
    I("m", ["mm", 2], 0, "minute"),
    C("minute", "m"),
    F("minute", 14),
    ue("m", B),
    ue("mm", B, z),
    ce(["m", "mm"], ve);
    var ln = Te("Minutes", !1);
    I("s", ["ss", 2], 0, "second"),
    C("second", "s"),
    F("second", 15),
    ue("s", B),
    ue("ss", B, z),
    ce(["s", "ss"], pe);
    var hn, dn = Te("Seconds", !1);
    for (I("S", 0, 0, function() {
        return ~~(this.millisecond() / 100)
    }),
    I(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10)
    }),
    I(0, ["SSS", 3], 0, "millisecond"),
    I(0, ["SSSS", 4], 0, function() {
        return 10 * this.millisecond()
    }),
    I(0, ["SSSSS", 5], 0, function() {
        return 100 * this.millisecond()
    }),
    I(0, ["SSSSSS", 6], 0, function() {
        return 1e3 * this.millisecond()
    }),
    I(0, ["SSSSSSS", 7], 0, function() {
        return 1e4 * this.millisecond()
    }),
    I(0, ["SSSSSSSS", 8], 0, function() {
        return 1e5 * this.millisecond()
    }),
    I(0, ["SSSSSSSSS", 9], 0, function() {
        return 1e6 * this.millisecond()
    }),
    C("millisecond", "ms"),
    F("millisecond", 16),
    ue("S", K, Z),
    ue("SS", K, z),
    ue("SSS", K, $),
    hn = "SSSS"; hn.length <= 9; hn += "S")
        ue(hn, ne);
    function cn(e, t) {
        t[we] = D(1e3 * ("0." + e))
    }
    for (hn = "S"; hn.length <= 9; hn += "S")
        ce(hn, cn);
    var fn = Te("Milliseconds", !1);
    I("z", 0, 0, "zoneAbbr"),
    I("zz", 0, 0, "zoneName");
    var mn = M.prototype;
    function _n(e) {
        return e
    }
    mn.add = Jt,
    mn.calendar = function(e, t) {
        var n = e || bt()
          , s = Gt(n, this).startOf("day")
          , i = c.calendarFormat(this, s) || "sameElse"
          , r = t && (b(t[i]) ? t[i].call(this, n) : t[i]);
        return this.format(r || this.localeData().calendar(i, this, bt(n)))
    }
    ,
    mn.clone = function() {
        return new M(this)
    }
    ,
    mn.diff = function(e, t, n) {
        var s, i, r;
        if (!this.isValid())
            return NaN;
        if (!(s = Gt(e, this)).isValid())
            return NaN;
        switch (i = 6e4 * (s.utcOffset() - this.utcOffset()),
        t = H(t)) {
        case "year":
            r = Qt(this, s) / 12;
            break;
        case "month":
            r = Qt(this, s);
            break;
        case "quarter":
            r = Qt(this, s) / 3;
            break;
        case "second":
            r = (this - s) / 1e3;
            break;
        case "minute":
            r = (this - s) / 6e4;
            break;
        case "hour":
            r = (this - s) / 36e5;
            break;
        case "day":
            r = (this - s - i) / 864e5;
            break;
        case "week":
            r = (this - s - i) / 6048e5;
            break;
        default:
            r = this - s
        }
        return n ? r : S(r)
    }
    ,
    mn.endOf = function(e) {
        var t;
        if (void 0 === (e = H(e)) || "millisecond" === e || !this.isValid())
            return this;
        var n = this._isUTC ? rn : sn;
        switch (e) {
        case "year":
            t = n(this.year() + 1, 0, 1) - 1;
            break;
        case "quarter":
            t = n(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
            break;
        case "month":
            t = n(this.year(), this.month() + 1, 1) - 1;
            break;
        case "week":
            t = n(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
            break;
        case "isoWeek":
            t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
            break;
        case "day":
        case "date":
            t = n(this.year(), this.month(), this.date() + 1) - 1;
            break;
        case "hour":
            t = this._d.valueOf(),
            t += 36e5 - nn(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) - 1;
            break;
        case "minute":
            t = this._d.valueOf(),
            t += 6e4 - nn(t, 6e4) - 1;
            break;
        case "second":
            t = this._d.valueOf(),
            t += 1e3 - nn(t, 1e3) - 1;
            break
        }
        return this._d.setTime(t),
        c.updateOffset(this, !0),
        this
    }
    ,
    mn.format = function(e) {
        e || (e = this.isUtc() ? c.defaultFormatUtc : c.defaultFormat);
        var t = A(this, e);
        return this.localeData().postformat(t)
    }
    ,
    mn.from = function(e, t) {
        return this.isValid() && (k(e) && e.isValid() || bt(e).isValid()) ? jt({
            to: this,
            from: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }
    ,
    mn.fromNow = function(e) {
        return this.from(bt(), e)
    }
    ,
    mn.to = function(e, t) {
        return this.isValid() && (k(e) && e.isValid() || bt(e).isValid()) ? jt({
            from: this,
            to: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }
    ,
    mn.toNow = function(e) {
        return this.to(bt(), e)
    }
    ,
    mn.get = function(e) {
        return b(this[e = H(e)]) ? this[e]() : this
    }
    ,
    mn.invalidAt = function() {
        return g(this).overflow
    }
    ,
    mn.isAfter = function(e, t) {
        var n = k(e) ? e : bt(e);
        return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = H(t) || "millisecond") ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf())
    }
    ,
    mn.isBefore = function(e, t) {
        var n = k(e) ? e : bt(e);
        return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = H(t) || "millisecond") ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf())
    }
    ,
    mn.isBetween = function(e, t, n, s) {
        var i = k(e) ? e : bt(e)
          , r = k(t) ? t : bt(t);
        return !!(this.isValid() && i.isValid() && r.isValid()) && ("(" === (s = s || "()")[0] ? this.isAfter(i, n) : !this.isBefore(i, n)) && (")" === s[1] ? this.isBefore(r, n) : !this.isAfter(r, n))
    }
    ,
    mn.isSame = function(e, t) {
        var n, s = k(e) ? e : bt(e);
        return !(!this.isValid() || !s.isValid()) && ("millisecond" === (t = H(t) || "millisecond") ? this.valueOf() === s.valueOf() : (n = s.valueOf(),
        this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()))
    }
    ,
    mn.isSameOrAfter = function(e, t) {
        return this.isSame(e, t) || this.isAfter(e, t)
    }
    ,
    mn.isSameOrBefore = function(e, t) {
        return this.isSame(e, t) || this.isBefore(e, t)
    }
    ,
    mn.isValid = function() {
        return v(this)
    }
    ,
    mn.lang = Kt,
    mn.locale = Xt,
    mn.localeData = en,
    mn.max = Pt,
    mn.min = xt,
    mn.parsingFlags = function() {
        return _({}, g(this))
    }
    ,
    mn.set = function(e, t) {
        if ("object" == typeof e)
            for (var n = function(e) {
                var t = [];
                for (var n in e)
                    t.push({
                        unit: n,
                        priority: U[n]
                    });
                return t.sort(function(e, t) {
                    return e.priority - t.priority
                }),
                t
            }(e = R(e)), s = 0; s < n.length; s++)
                this[n[s].unit](e[n[s].unit]);
        else if (b(this[e = H(e)]))
            return this[e](t);
        return this
    }
    ,
    mn.startOf = function(e) {
        var t;
        if (void 0 === (e = H(e)) || "millisecond" === e || !this.isValid())
            return this;
        var n = this._isUTC ? rn : sn;
        switch (e) {
        case "year":
            t = n(this.year(), 0, 1);
            break;
        case "quarter":
            t = n(this.year(), this.month() - this.month() % 3, 1);
            break;
        case "month":
            t = n(this.year(), this.month(), 1);
            break;
        case "week":
            t = n(this.year(), this.month(), this.date() - this.weekday());
            break;
        case "isoWeek":
            t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
            break;
        case "day":
        case "date":
            t = n(this.year(), this.month(), this.date());
            break;
        case "hour":
            t = this._d.valueOf(),
            t -= nn(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5);
            break;
        case "minute":
            t = this._d.valueOf(),
            t -= nn(t, 6e4);
            break;
        case "second":
            t = this._d.valueOf(),
            t -= nn(t, 1e3);
            break
        }
        return this._d.setTime(t),
        c.updateOffset(this, !0),
        this
    }
    ,
    mn.subtract = Bt,
    mn.toArray = function() {
        var e = this;
        return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
    }
    ,
    mn.toObject = function() {
        var e = this;
        return {
            years: e.year(),
            months: e.month(),
            date: e.date(),
            hours: e.hours(),
            minutes: e.minutes(),
            seconds: e.seconds(),
            milliseconds: e.milliseconds()
        }
    }
    ,
    mn.toDate = function() {
        return new Date(this.valueOf())
    }
    ,
    mn.toISOString = function(e) {
        if (!this.isValid())
            return null;
        var t = !0 !== e
          , n = t ? this.clone().utc() : this;
        return n.year() < 0 || 9999 < n.year() ? A(n, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : b(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", A(n, "Z")) : A(n, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
    }
    ,
    mn.inspect = function() {
        if (!this.isValid())
            return "moment.invalid(/* " + this._i + " */)";
        var e = "moment"
          , t = "";
        this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone",
        t = "Z");
        var n = "[" + e + '("]'
          , s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"
          , i = t + '[")]';
        return this.format(n + s + "-MM-DD[T]HH:mm:ss.SSS" + i)
    }
    ,
    mn.toJSON = function() {
        return this.isValid() ? this.toISOString() : null
    }
    ,
    mn.toString = function() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }
    ,
    mn.unix = function() {
        return Math.floor(this.valueOf() / 1e3)
    }
    ,
    mn.valueOf = function() {
        return this._d.valueOf() - 6e4 * (this._offset || 0)
    }
    ,
    mn.creationData = function() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        }
    }
    ,
    mn.year = Oe,
    mn.isLeapYear = function() {
        return De(this.year())
    }
    ,
    mn.weekYear = function(e) {
        return on.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }
    ,
    mn.isoWeekYear = function(e) {
        return on.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
    }
    ,
    mn.quarter = mn.quarters = function(e) {
        return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
    }
    ,
    mn.month = Ue,
    mn.daysInMonth = function() {
        return Pe(this.year(), this.month())
    }
    ,
    mn.week = mn.weeks = function(e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d")
    }
    ,
    mn.isoWeek = mn.isoWeeks = function(e) {
        var t = Ie(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d")
    }
    ,
    mn.weeksInYear = function() {
        var e = this.localeData()._week;
        return Ae(this.year(), e.dow, e.doy)
    }
    ,
    mn.isoWeeksInYear = function() {
        return Ae(this.year(), 1, 4)
    }
    ,
    mn.date = un,
    mn.day = mn.days = function(e) {
        if (!this.isValid())
            return null != e ? this : NaN;
        var t, n, s = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e ? (t = e,
        n = this.localeData(),
        e = "string" != typeof t ? t : isNaN(t) ? "number" == typeof (t = n.weekdaysParse(t)) ? t : null : parseInt(t, 10),
        this.add(e - s, "d")) : s
    }
    ,
    mn.weekday = function(e) {
        if (!this.isValid())
            return null != e ? this : NaN;
        var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == e ? t : this.add(e - t, "d")
    }
    ,
    mn.isoWeekday = function(e) {
        if (!this.isValid())
            return null != e ? this : NaN;
        if (null == e)
            return this.day() || 7;
        var t, n, s = (t = e,
        n = this.localeData(),
        "string" == typeof t ? n.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t);
        return this.day(this.day() % 7 ? s : s - 7)
    }
    ,
    mn.dayOfYear = function(e) {
        var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == e ? t : this.add(e - t, "d")
    }
    ,
    mn.hour = mn.hours = nt,
    mn.minute = mn.minutes = ln,
    mn.second = mn.seconds = dn,
    mn.millisecond = mn.milliseconds = fn,
    mn.utcOffset = function(e, t, n) {
        var s, i = this._offset || 0;
        if (!this.isValid())
            return null != e ? this : NaN;
        if (null == e)
            return this._isUTC ? i : Vt(this);
        if ("string" == typeof e) {
            if (null === (e = Nt(re, e)))
                return this
        } else
            Math.abs(e) < 16 && !n && (e *= 60);
        return !this._isUTC && t && (s = Vt(this)),
        this._offset = e,
        this._isUTC = !0,
        null != s && this.add(s, "m"),
        i !== e && (!t || this._changeInProgress ? qt(this, jt(e - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
        c.updateOffset(this, !0),
        this._changeInProgress = null)),
        this
    }
    ,
    mn.utc = function(e) {
        return this.utcOffset(0, e)
    }
    ,
    mn.local = function(e) {
        return this._isUTC && (this.utcOffset(0, e),
        this._isUTC = !1,
        e && this.subtract(Vt(this), "m")),
        this
    }
    ,
    mn.parseZone = function() {
        if (null != this._tzm)
            this.utcOffset(this._tzm, !1, !0);
        else if ("string" == typeof this._i) {
            var e = Nt(ie, this._i);
            null != e ? this.utcOffset(e) : this.utcOffset(0, !0)
        }
        return this
    }
    ,
    mn.hasAlignedHourOffset = function(e) {
        return !!this.isValid() && (e = e ? bt(e).utcOffset() : 0,
        (this.utcOffset() - e) % 60 == 0)
    }
    ,
    mn.isDST = function() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }
    ,
    mn.isLocal = function() {
        return !!this.isValid() && !this._isUTC
    }
    ,
    mn.isUtcOffset = function() {
        return !!this.isValid() && this._isUTC
    }
    ,
    mn.isUtc = Et,
    mn.isUTC = Et,
    mn.zoneAbbr = function() {
        return this._isUTC ? "UTC" : ""
    }
    ,
    mn.zoneName = function() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }
    ,
    mn.dates = n("dates accessor is deprecated. Use date instead.", un),
    mn.months = n("months accessor is deprecated. Use month instead", Ue),
    mn.years = n("years accessor is deprecated. Use year instead", Oe),
    mn.zone = n("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, t) {
        return null != e ? ("string" != typeof e && (e = -e),
        this.utcOffset(e, t),
        this) : -this.utcOffset()
    }),
    mn.isDSTShifted = n("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
        if (!l(this._isDSTShifted))
            return this._isDSTShifted;
        var e = {};
        if (w(e, this),
        (e = Ot(e))._a) {
            var t = e._isUTC ? y(e._a) : bt(e._a);
            this._isDSTShifted = this.isValid() && 0 < a(e._a, t.toArray())
        } else
            this._isDSTShifted = !1;
        return this._isDSTShifted
    });
    var yn = P.prototype;
    function gn(e, t, n, s) {
        var i = ht()
          , r = y().set(s, t);
        return i[n](r, e)
    }
    function vn(e, t, n) {
        if (h(e) && (t = e,
        e = void 0),
        e = e || "",
        null != t)
            return gn(e, t, n, "month");
        var s, i = [];
        for (s = 0; s < 12; s++)
            i[s] = gn(e, s, n, "month");
        return i
    }
    function pn(e, t, n, s) {
        t = ("boolean" == typeof e ? h(t) && (n = t,
        t = void 0) : (t = e,
        e = !1,
        h(n = t) && (n = t,
        t = void 0)),
        t || "");
        var i, r = ht(), a = e ? r._week.dow : 0;
        if (null != n)
            return gn(t, (n + a) % 7, s, "day");
        var o = [];
        for (i = 0; i < 7; i++)
            o[i] = gn(t, (i + a) % 7, s, "day");
        return o
    }
    yn.calendar = function(e, t, n) {
        var s = this._calendar[e] || this._calendar.sameElse;
        return b(s) ? s.call(t, n) : s
    }
    ,
    yn.longDateFormat = function(e) {
        var t = this._longDateFormat[e]
          , n = this._longDateFormat[e.toUpperCase()];
        return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
            return e.slice(1)
        }),
        this._longDateFormat[e])
    }
    ,
    yn.invalidDate = function() {
        return this._invalidDate
    }
    ,
    yn.ordinal = function(e) {
        return this._ordinal.replace("%d", e)
    }
    ,
    yn.preparse = _n,
    yn.postformat = _n,
    yn.relativeTime = function(e, t, n, s) {
        var i = this._relativeTime[n];
        return b(i) ? i(e, t, n, s) : i.replace(/%d/i, e)
    }
    ,
    yn.pastFuture = function(e, t) {
        var n = this._relativeTime[0 < e ? "future" : "past"];
        return b(n) ? n(t) : n.replace(/%s/i, t)
    }
    ,
    yn.set = function(e) {
        var t, n;
        for (n in e)
            b(t = e[n]) ? this[n] = t : this["_" + n] = t;
        this._config = e,
        this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
    }
    ,
    yn.months = function(e, t) {
        return e ? o(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || We).test(t) ? "format" : "standalone"][e.month()] : o(this._months) ? this._months : this._months.standalone
    }
    ,
    yn.monthsShort = function(e, t) {
        return e ? o(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[We.test(t) ? "format" : "standalone"][e.month()] : o(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
    }
    ,
    yn.monthsParse = function(e, t, n) {
        var s, i, r;
        if (this._monthsParseExact)
            return function(e, t, n) {
                var s, i, r, a = e.toLocaleLowerCase();
                if (!this._monthsParse)
                    for (this._monthsParse = [],
                    this._longMonthsParse = [],
                    this._shortMonthsParse = [],
                    s = 0; s < 12; ++s)
                        r = y([2e3, s]),
                        this._shortMonthsParse[s] = this.monthsShort(r, "").toLocaleLowerCase(),
                        this._longMonthsParse[s] = this.months(r, "").toLocaleLowerCase();
                return n ? "MMM" === t ? -1 !== (i = Ye.call(this._shortMonthsParse, a)) ? i : null : -1 !== (i = Ye.call(this._longMonthsParse, a)) ? i : null : "MMM" === t ? -1 !== (i = Ye.call(this._shortMonthsParse, a)) ? i : -1 !== (i = Ye.call(this._longMonthsParse, a)) ? i : null : -1 !== (i = Ye.call(this._longMonthsParse, a)) ? i : -1 !== (i = Ye.call(this._shortMonthsParse, a)) ? i : null
            }
            .call(this, e, t, n);
        for (this._monthsParse || (this._monthsParse = [],
        this._longMonthsParse = [],
        this._shortMonthsParse = []),
        s = 0; s < 12; s++) {
            if (i = y([2e3, s]),
            n && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp("^" + this.months(i, "").replace(".", "") + "$","i"),
            this._shortMonthsParse[s] = new RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$","i")),
            n || this._monthsParse[s] || (r = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""),
            this._monthsParse[s] = new RegExp(r.replace(".", ""),"i")),
            n && "MMMM" === t && this._longMonthsParse[s].test(e))
                return s;
            if (n && "MMM" === t && this._shortMonthsParse[s].test(e))
                return s;
            if (!n && this._monthsParse[s].test(e))
                return s
        }
    }
    ,
    yn.monthsRegex = function(e) {
        return this._monthsParseExact ? (m(this, "_monthsRegex") || Ne.call(this),
        e ? this._monthsStrictRegex : this._monthsRegex) : (m(this, "_monthsRegex") || (this._monthsRegex = Le),
        this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
    }
    ,
    yn.monthsShortRegex = function(e) {
        return this._monthsParseExact ? (m(this, "_monthsRegex") || Ne.call(this),
        e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (m(this, "_monthsShortRegex") || (this._monthsShortRegex = Fe),
        this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
    }
    ,
    yn.week = function(e) {
        return Ie(e, this._week.dow, this._week.doy).week
    }
    ,
    yn.firstDayOfYear = function() {
        return this._week.doy
    }
    ,
    yn.firstDayOfWeek = function() {
        return this._week.dow
    }
    ,
    yn.weekdays = function(e, t) {
        var n = o(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
        return !0 === e ? je(n, this._week.dow) : e ? n[e.day()] : n
    }
    ,
    yn.weekdaysMin = function(e) {
        return !0 === e ? je(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin
    }
    ,
    yn.weekdaysShort = function(e) {
        return !0 === e ? je(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort
    }
    ,
    yn.weekdaysParse = function(e, t, n) {
        var s, i, r;
        if (this._weekdaysParseExact)
            return function(e, t, n) {
                var s, i, r, a = e.toLocaleLowerCase();
                if (!this._weekdaysParse)
                    for (this._weekdaysParse = [],
                    this._shortWeekdaysParse = [],
                    this._minWeekdaysParse = [],
                    s = 0; s < 7; ++s)
                        r = y([2e3, 1]).day(s),
                        this._minWeekdaysParse[s] = this.weekdaysMin(r, "").toLocaleLowerCase(),
                        this._shortWeekdaysParse[s] = this.weekdaysShort(r, "").toLocaleLowerCase(),
                        this._weekdaysParse[s] = this.weekdays(r, "").toLocaleLowerCase();
                return n ? "dddd" === t ? -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : null : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : null : "dddd" === t ? -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : null : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : null
            }
            .call(this, e, t, n);
        for (this._weekdaysParse || (this._weekdaysParse = [],
        this._minWeekdaysParse = [],
        this._shortWeekdaysParse = [],
        this._fullWeekdaysParse = []),
        s = 0; s < 7; s++) {
            if (i = y([2e3, 1]).day(s),
            n && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp("^" + this.weekdays(i, "").replace(".", "\\.?") + "$","i"),
            this._shortWeekdaysParse[s] = new RegExp("^" + this.weekdaysShort(i, "").replace(".", "\\.?") + "$","i"),
            this._minWeekdaysParse[s] = new RegExp("^" + this.weekdaysMin(i, "").replace(".", "\\.?") + "$","i")),
            this._weekdaysParse[s] || (r = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""),
            this._weekdaysParse[s] = new RegExp(r.replace(".", ""),"i")),
            n && "dddd" === t && this._fullWeekdaysParse[s].test(e))
                return s;
            if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e))
                return s;
            if (n && "dd" === t && this._minWeekdaysParse[s].test(e))
                return s;
            if (!n && this._weekdaysParse[s].test(e))
                return s
        }
    }
    ,
    yn.weekdaysRegex = function(e) {
        return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Qe.call(this),
        e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (m(this, "_weekdaysRegex") || (this._weekdaysRegex = qe),
        this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
    }
    ,
    yn.weekdaysShortRegex = function(e) {
        return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Qe.call(this),
        e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (m(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Je),
        this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    }
    ,
    yn.weekdaysMinRegex = function(e) {
        return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Qe.call(this),
        e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (m(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Be),
        this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    }
    ,
    yn.isPM = function(e) {
        return "p" === (e + "").toLowerCase().charAt(0)
    }
    ,
    yn.meridiem = function(e, t, n) {
        return 11 < e ? n ? "pm" : "PM" : n ? "am" : "AM"
    }
    ,
    ut("en", {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 === D(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        }
    }),
    c.lang = n("moment.lang is deprecated. Use moment.locale instead.", ut),
    c.langData = n("moment.langData is deprecated. Use moment.localeData instead.", ht);
    var wn = Math.abs;
    function Mn(e, t, n, s) {
        var i = jt(t, n);
        return e._milliseconds += s * i._milliseconds,
        e._days += s * i._days,
        e._months += s * i._months,
        e._bubble()
    }
    function kn(e) {
        return e < 0 ? Math.floor(e) : Math.ceil(e)
    }
    function Sn(e) {
        return 4800 * e / 146097
    }
    function Dn(e) {
        return 146097 * e / 4800
    }
    function Yn(e) {
        return function() {
            return this.as(e)
        }
    }
    var On = Yn("ms")
      , Tn = Yn("s")
      , bn = Yn("m")
      , xn = Yn("h")
      , Pn = Yn("d")
      , Wn = Yn("w")
      , Cn = Yn("M")
      , Hn = Yn("Q")
      , Rn = Yn("y");
    function Un(e) {
        return function() {
            return this.isValid() ? this._data[e] : NaN
        }
    }
    var Fn = Un("milliseconds")
      , Ln = Un("seconds")
      , Nn = Un("minutes")
      , Gn = Un("hours")
      , Vn = Un("days")
      , En = Un("months")
      , In = Un("years");
    var An = Math.round
      , jn = {
        ss: 44,
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    };
    var Zn = Math.abs;
    function zn(e) {
        return (0 < e) - (e < 0) || +e
    }
    function $n() {
        if (!this.isValid())
            return this.localeData().invalidDate();
        var e, t, n = Zn(this._milliseconds) / 1e3, s = Zn(this._days), i = Zn(this._months);
        t = S((e = S(n / 60)) / 60),
        n %= 60,
        e %= 60;
        var r = S(i / 12)
          , a = i %= 12
          , o = s
          , u = t
          , l = e
          , h = n ? n.toFixed(3).replace(/\.?0+$/, "") : ""
          , d = this.asSeconds();
        if (!d)
            return "P0D";
        var c = d < 0 ? "-" : ""
          , f = zn(this._months) !== zn(d) ? "-" : ""
          , m = zn(this._days) !== zn(d) ? "-" : ""
          , _ = zn(this._milliseconds) !== zn(d) ? "-" : "";
        return c + "P" + (r ? f + r + "Y" : "") + (a ? f + a + "M" : "") + (o ? m + o + "D" : "") + (u || l || h ? "T" : "") + (u ? _ + u + "H" : "") + (l ? _ + l + "M" : "") + (h ? _ + h + "S" : "")
    }
    var qn = Ht.prototype;
    return qn.isValid = function() {
        return this._isValid
    }
    ,
    qn.abs = function() {
        var e = this._data;
        return this._milliseconds = wn(this._milliseconds),
        this._days = wn(this._days),
        this._months = wn(this._months),
        e.milliseconds = wn(e.milliseconds),
        e.seconds = wn(e.seconds),
        e.minutes = wn(e.minutes),
        e.hours = wn(e.hours),
        e.months = wn(e.months),
        e.years = wn(e.years),
        this
    }
    ,
    qn.add = function(e, t) {
        return Mn(this, e, t, 1)
    }
    ,
    qn.subtract = function(e, t) {
        return Mn(this, e, t, -1)
    }
    ,
    qn.as = function(e) {
        if (!this.isValid())
            return NaN;
        var t, n, s = this._milliseconds;
        if ("month" === (e = H(e)) || "quarter" === e || "year" === e)
            switch (t = this._days + s / 864e5,
            n = this._months + Sn(t),
            e) {
            case "month":
                return n;
            case "quarter":
                return n / 3;
            case "year":
                return n / 12
            }
        else
            switch (t = this._days + Math.round(Dn(this._months)),
            e) {
            case "week":
                return t / 7 + s / 6048e5;
            case "day":
                return t + s / 864e5;
            case "hour":
                return 24 * t + s / 36e5;
            case "minute":
                return 1440 * t + s / 6e4;
            case "second":
                return 86400 * t + s / 1e3;
            case "millisecond":
                return Math.floor(864e5 * t) + s;
            default:
                throw new Error("Unknown unit " + e)
            }
    }
    ,
    qn.asMilliseconds = On,
    qn.asSeconds = Tn,
    qn.asMinutes = bn,
    qn.asHours = xn,
    qn.asDays = Pn,
    qn.asWeeks = Wn,
    qn.asMonths = Cn,
    qn.asQuarters = Hn,
    qn.asYears = Rn,
    qn.valueOf = function() {
        return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * D(this._months / 12) : NaN
    }
    ,
    qn._bubble = function() {
        var e, t, n, s, i, r = this._milliseconds, a = this._days, o = this._months, u = this._data;
        return 0 <= r && 0 <= a && 0 <= o || r <= 0 && a <= 0 && o <= 0 || (r += 864e5 * kn(Dn(o) + a),
        o = a = 0),
        u.milliseconds = r % 1e3,
        e = S(r / 1e3),
        u.seconds = e % 60,
        t = S(e / 60),
        u.minutes = t % 60,
        n = S(t / 60),
        u.hours = n % 24,
        o += i = S(Sn(a += S(n / 24))),
        a -= kn(Dn(i)),
        s = S(o / 12),
        o %= 12,
        u.days = a,
        u.months = o,
        u.years = s,
        this
    }
    ,
    qn.clone = function() {
        return jt(this)
    }
    ,
    qn.get = function(e) {
        return e = H(e),
        this.isValid() ? this[e + "s"]() : NaN
    }
    ,
    qn.milliseconds = Fn,
    qn.seconds = Ln,
    qn.minutes = Nn,
    qn.hours = Gn,
    qn.days = Vn,
    qn.weeks = function() {
        return S(this.days() / 7)
    }
    ,
    qn.months = En,
    qn.years = In,
    qn.humanize = function(e) {
        if (!this.isValid())
            return this.localeData().invalidDate();
        var t, n, s, i, r, a, o, u, l, h, d, c = this.localeData(), f = (n = !e,
        s = c,
        i = jt(t = this).abs(),
        r = An(i.as("s")),
        a = An(i.as("m")),
        o = An(i.as("h")),
        u = An(i.as("d")),
        l = An(i.as("M")),
        h = An(i.as("y")),
        (d = r <= jn.ss && ["s", r] || r < jn.s && ["ss", r] || a <= 1 && ["m"] || a < jn.m && ["mm", a] || o <= 1 && ["h"] || o < jn.h && ["hh", o] || u <= 1 && ["d"] || u < jn.d && ["dd", u] || l <= 1 && ["M"] || l < jn.M && ["MM", l] || h <= 1 && ["y"] || ["yy", h])[2] = n,
        d[3] = 0 < +t,
        d[4] = s,
        function(e, t, n, s, i) {
            return i.relativeTime(t || 1, !!n, e, s)
        }
        .apply(null, d));
        return e && (f = c.pastFuture(+this, f)),
        c.postformat(f)
    }
    ,
    qn.toISOString = $n,
    qn.toString = $n,
    qn.toJSON = $n,
    qn.locale = Xt,
    qn.localeData = en,
    qn.toIsoString = n("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", $n),
    qn.lang = Kt,
    I("X", 0, 0, "unix"),
    I("x", 0, 0, "valueOf"),
    ue("x", se),
    ue("X", /[+-]?\d+(\.\d{1,3})?/),
    ce("X", function(e, t, n) {
        n._d = new Date(1e3 * parseFloat(e, 10))
    }),
    ce("x", function(e, t, n) {
        n._d = new Date(D(e))
    }),
    c.version = "2.24.0",
    e = bt,
    c.fn = mn,
    c.min = function() {
        return Wt("isBefore", [].slice.call(arguments, 0))
    }
    ,
    c.max = function() {
        return Wt("isAfter", [].slice.call(arguments, 0))
    }
    ,
    c.now = function() {
        return Date.now ? Date.now() : +new Date
    }
    ,
    c.utc = y,
    c.unix = function(e) {
        return bt(1e3 * e)
    }
    ,
    c.months = function(e, t) {
        return vn(e, t, "months")
    }
    ,
    c.isDate = d,
    c.locale = ut,
    c.invalid = p,
    c.duration = jt,
    c.isMoment = k,
    c.weekdays = function(e, t, n) {
        return pn(e, t, n, "weekdays")
    }
    ,
    c.parseZone = function() {
        return bt.apply(null, arguments).parseZone()
    }
    ,
    c.localeData = ht,
    c.isDuration = Rt,
    c.monthsShort = function(e, t) {
        return vn(e, t, "monthsShort")
    }
    ,
    c.weekdaysMin = function(e, t, n) {
        return pn(e, t, n, "weekdaysMin")
    }
    ,
    c.defineLocale = lt,
    c.updateLocale = function(e, t) {
        if (null != t) {
            var n, s, i = st;
            null != (s = ot(e)) && (i = s._config),
            (n = new P(t = x(i, t))).parentLocale = it[e],
            it[e] = n,
            ut(e)
        } else
            null != it[e] && (null != it[e].parentLocale ? it[e] = it[e].parentLocale : null != it[e] && delete it[e]);
        return it[e]
    }
    ,
    c.locales = function() {
        return s(it)
    }
    ,
    c.weekdaysShort = function(e, t, n) {
        return pn(e, t, n, "weekdaysShort")
    }
    ,
    c.normalizeUnits = H,
    c.relativeTimeRounding = function(e) {
        return void 0 === e ? An : "function" == typeof e && (An = e,
        !0)
    }
    ,
    c.relativeTimeThreshold = function(e, t) {
        return void 0 !== jn[e] && (void 0 === t ? jn[e] : (jn[e] = t,
        "s" === e && (jn.ss = t - 1),
        !0))
    }
    ,
    c.calendarFormat = function(e, t) {
        var n = e.diff(t, "days", !0);
        return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
    }
    ,
    c.prototype = mn,
    c.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        DATE: "YYYY-MM-DD",
        TIME: "HH:mm",
        TIME_SECONDS: "HH:mm:ss",
        TIME_MS: "HH:mm:ss.SSS",
        WEEK: "GGGG-[W]WW",
        MONTH: "YYYY-MM"
    },
    c
});
/**
 * jquery-date-range-picker
 * @version v0.20.0
 * @link https://github.com/longbill/jquery-date-range-picker
 * @license MIT
 */
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "moment"], e) : "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("jquery"), require("moment")) : e(jQuery, moment)
}(function(Z, Q) {
    "use strict";
    Z.dateRangePickerLanguages = {
        default: {
            selected: "Selected:",
            day: "Day",
            days: "Days",
            apply: "Close",
            "week-1": "mo",
            "week-2": "tu",
            "week-3": "we",
            "week-4": "th",
            "week-5": "fr",
            "week-6": "sa",
            "week-7": "su",
            "week-number": "W",
            "month-name": ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
            shortcuts: "Shortcuts",
            "custom-values": "Custom Values",
            past: "Past",
            following: "Following",
            previous: "Previous",
            "prev-week": "Week",
            "prev-month": "Month",
            "prev-year": "Year",
            next: "Next",
            "next-week": "Week",
            "next-month": "Month",
            "next-year": "Year",
            "less-than": "Date range should not be more than %d days",
            "more-than": "Date range should not be less than %d days",
            "default-more": "Please select a date range longer than %d days",
            "default-single": "Please select a date",
            "default-less": "Please select a date range less than %d days",
            "default-range": "Please select a date range between %d and %d days",
            "default-default": "Please select a date range",
            time: "Time",
            hour: "Hour",
            minute: "Minute"
        },
        id: {
            selected: "Terpilih:",
            day: "Hari",
            days: "Hari",
            apply: "Tutup",
            "week-1": "sen",
            "week-2": "sel",
            "week-3": "rab",
            "week-4": "kam",
            "week-5": "jum",
            "week-6": "sab",
            "week-7": "min",
            "week-number": "W",
            "month-name": ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"],
            shortcuts: "Pintas",
            "custom-values": "Nilai yang ditentukan",
            past: "Yang Lalu",
            following: "Mengikuti",
            previous: "Sebelumnya",
            "prev-week": "Minggu",
            "prev-month": "Bulan",
            "prev-year": "Tahun",
            next: "Selanjutnya",
            "next-week": "Minggu",
            "next-month": "Bulan",
            "next-year": "Tahun",
            "less-than": "Tanggal harus lebih dari %d hari",
            "more-than": "Tanggal harus kurang dari %d hari",
            "default-more": "Jarak tanggal harus lebih lama dari %d hari",
            "default-single": "Silakan pilih tanggal",
            "default-less": "Jarak rentang tanggal tidak boleh lebih lama dari %d hari",
            "default-range": "Rentang tanggal harus antara %d dan %d hari",
            "default-default": "Silakan pilih rentang tanggal",
            time: "Waktu",
            hour: "Jam",
            minute: "Menit"
        },
        az: {
            selected: "Seçildi:",
            day: " gün",
            days: " gün",
            apply: "tətbiq",
            "week-1": "1",
            "week-2": "2",
            "week-3": "3",
            "week-4": "4",
            "week-5": "5",
            "week-6": "6",
            "week-7": "7",
            "month-name": ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"],
            shortcuts: "Qısayollar",
            past: "Keçmiş",
            following: "Növbəti",
            previous: "&nbsp;&nbsp;&nbsp;",
            "prev-week": "Öncəki həftə",
            "prev-month": "Öncəki ay",
            "prev-year": "Öncəki il",
            next: "&nbsp;&nbsp;&nbsp;",
            "next-week": "Növbəti həftə",
            "next-month": "Növbəti ay",
            "next-year": "Növbəti il",
            "less-than": "Tarix aralığı %d gündən çox olmamalıdır",
            "more-than": "Tarix aralığı %d gündən az olmamalıdır",
            "default-more": "%d gündən çox bir tarix seçin",
            "default-single": "Tarix seçin",
            "default-less": "%d gündən az bir tarix seçin",
            "default-range": "%d və %d gün aralığında tarixlər seçin",
            "default-default": "Tarix aralığı seçin"
        },
        bg: {
            selected: "Избрано:",
            day: "Ден",
            days: "Дни",
            apply: "Затвори",
            "week-1": "пн",
            "week-2": "вт",
            "week-3": "ср",
            "week-4": "чт",
            "week-5": "пт",
            "week-6": "сб",
            "week-7": "нд",
            "week-number": "С",
            "month-name": ["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември"],
            shortcuts: "Преки пътища",
            "custom-values": "Персонализирани стойности",
            past: "Минал",
            following: "Следващ",
            previous: "Предишен",
            "prev-week": "Седмица",
            "prev-month": "Месец",
            "prev-year": "Година",
            next: "Следващ",
            "next-week": "Седмица",
            "next-month": "Месец",
            "next-year": "Година",
            "less-than": "Периодът от време не трябва да е повече от %d дни",
            "more-than": "Периодът от време не трябва да е по-малко от %d дни",
            "default-more": "Моля изберете период по-дълъг от %d дни",
            "default-single": "Моля изберете дата",
            "default-less": "Моля изберете период по-къс от %d дни",
            "default-range": "Моля изберете период между %d и %d дни",
            "default-default": "Моля изберете период",
            time: "Време",
            hour: "Час",
            minute: "Минута"
        },
        cn: {
            selected: "已选择:",
            day: "天",
            days: "天",
            apply: "确定",
            "week-1": "一",
            "week-2": "二",
            "week-3": "三",
            "week-4": "四",
            "week-5": "五",
            "week-6": "六",
            "week-7": "日",
            "week-number": "周",
            "month-name": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            shortcuts: "快捷选择",
            past: "过去",
            following: "将来",
            previous: "&nbsp;&nbsp;&nbsp;",
            "prev-week": "上周",
            "prev-month": "上个月",
            "prev-year": "去年",
            next: "&nbsp;&nbsp;&nbsp;",
            "next-week": "下周",
            "next-month": "下个月",
            "next-year": "明年",
            "less-than": "所选日期范围不能大于%d天",
            "more-than": "所选日期范围不能小于%d天",
            "default-more": "请选择大于%d天的日期范围",
            "default-less": "请选择小于%d天的日期范围",
            "default-range": "请选择%d天到%d天的日期范围",
            "default-single": "请选择一个日期",
            "default-default": "请选择一个日期范围",
            time: "时间",
            hour: "小时",
            minute: "分钟"
        },
        cz: {
            selected: "Vybráno:",
            day: "Den",
            days: "Dny",
            apply: "Zavřít",
            "week-1": "po",
            "week-2": "út",
            "week-3": "st",
            "week-4": "čt",
            "week-5": "pá",
            "week-6": "so",
            "week-7": "ne",
            "month-name": ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"],
            shortcuts: "Zkratky",
            past: "po",
            following: "následující",
            previous: "předchozí",
            "prev-week": "týden",
            "prev-month": "měsíc",
            "prev-year": "rok",
            next: "další",
            "next-week": "týden",
            "next-month": "měsíc",
            "next-year": "rok",
            "less-than": "Rozsah data by neměl být větší než %d dnů",
            "more-than": "Rozsah data by neměl být menší než %d dnů",
            "default-more": "Prosím zvolte rozsah data větší než %d dnů",
            "default-single": "Prosím zvolte datum",
            "default-less": "Prosím zvolte rozsah data menší než %d dnů",
            "default-range": "Prosím zvolte rozsah data mezi %d a %d dny",
            "default-default": "Prosím zvolte rozsah data"
        },
        de: {
            selected: "Auswahl:",
            day: "Tag",
            days: "Tage",
            apply: "Schließen",
            "week-1": "mo",
            "week-2": "di",
            "week-3": "mi",
            "week-4": "do",
            "week-5": "fr",
            "week-6": "sa",
            "week-7": "so",
            "month-name": ["januar", "februar", "märz", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "dezember"],
            shortcuts: "Schnellwahl",
            past: "Vorherige",
            following: "Folgende",
            previous: "Vorherige",
            "prev-week": "Woche",
            "prev-month": "Monat",
            "prev-year": "Jahr",
            next: "Nächste",
            "next-week": "Woche",
            "next-month": "Monat",
            "next-year": "Jahr",
            "less-than": "Datumsbereich darf nicht größer sein als %d Tage",
            "more-than": "Datumsbereich darf nicht kleiner sein als %d Tage",
            "default-more": "Bitte mindestens %d Tage auswählen",
            "default-single": "Bitte ein Datum auswählen",
            "default-less": "Bitte weniger als %d Tage auswählen",
            "default-range": "Bitte einen Datumsbereich zwischen %d und %d Tagen auswählen",
            "default-default": "Bitte ein Start- und Enddatum auswählen",
            Time: "Zeit",
            hour: "Stunde",
            minute: "Minute"
        },
        es: {
            selected: "Seleccionado:",
            day: "Día",
            days: "Días",
            apply: "Cerrar",
            "week-1": "lu",
            "week-2": "ma",
            "week-3": "mi",
            "week-4": "ju",
            "week-5": "vi",
            "week-6": "sa",
            "week-7": "do",
            "month-name": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            shortcuts: "Accesos directos",
            past: "Pasado",
            following: "Siguiente",
            previous: "Anterior",
            "prev-week": "Semana",
            "prev-month": "Mes",
            "prev-year": "Año",
            next: "Siguiente",
            "next-week": "Semana",
            "next-month": "Mes",
            "next-year": "Año",
            "less-than": "El rango no debería ser mayor de %d días",
            "more-than": "El rango no debería ser menor de %d días",
            "default-more": "Por favor selecciona un rango mayor a %d días",
            "default-single": "Por favor selecciona un día",
            "default-less": "Por favor selecciona un rango menor a %d días",
            "default-range": "Por favor selecciona un rango entre %d y %d días",
            "default-default": "Por favor selecciona un rango de fechas."
        },
        fr: {
            selected: "Sélection:",
            day: "Jour",
            days: "Jours",
            apply: "Fermer",
            "week-1": "lu",
            "week-2": "ma",
            "week-3": "me",
            "week-4": "je",
            "week-5": "ve",
            "week-6": "sa",
            "week-7": "di",
            "month-name": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
            shortcuts: "Raccourcis",
            past: "Passé",
            following: "Suivant",
            previous: "Précédent",
            "prev-week": "Semaine",
            "prev-month": "Mois",
            "prev-year": "Année",
            next: "Suivant",
            "next-week": "Semaine",
            "next-month": "Mois",
            "next-year": "Année",
            "less-than": "L'intervalle ne doit pas être supérieure à %d jours",
            "more-than": "L'intervalle ne doit pas être inférieure à %d jours",
            "default-more": "Merci de choisir une intervalle supérieure à %d jours",
            "default-single": "Merci de choisir une date",
            "default-less": "Merci de choisir une intervalle inférieure %d jours",
            "default-range": "Merci de choisir une intervalle comprise entre %d et %d jours",
            "default-default": "Merci de choisir une date"
        },
        hu: {
            selected: "Kiválasztva:",
            day: "Nap",
            days: "Nap",
            apply: "Ok",
            "week-1": "h",
            "week-2": "k",
            "week-3": "sz",
            "week-4": "cs",
            "week-5": "p",
            "week-6": "sz",
            "week-7": "v",
            "month-name": ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
            shortcuts: "Gyorsválasztó",
            past: "Múlt",
            following: "Következő",
            previous: "Előző",
            "prev-week": "Hét",
            "prev-month": "Hónap",
            "prev-year": "Év",
            next: "Következő",
            "next-week": "Hét",
            "next-month": "Hónap",
            "next-year": "Év",
            "less-than": "A kiválasztás nem lehet több %d napnál",
            "more-than": "A kiválasztás nem lehet több %d napnál",
            "default-more": "Válassz ki egy időszakot ami hosszabb mint %d nap",
            "default-single": "Válassz egy napot",
            "default-less": "Válassz ki egy időszakot ami rövidebb mint %d nap",
            "default-range": "Válassz ki egy %d - %d nap hosszú időszakot",
            "default-default": "Válassz ki egy időszakot"
        },
        it: {
            selected: "Selezionati:",
            day: "Giorno",
            days: "Giorni",
            apply: "Chiudi",
            "week-1": "lu",
            "week-2": "ma",
            "week-3": "me",
            "week-4": "gi",
            "week-5": "ve",
            "week-6": "sa",
            "week-7": "do",
            "month-name": ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
            shortcuts: "Scorciatoie",
            past: "Scorso",
            following: "Successivo",
            previous: "Precedente",
            "prev-week": "Settimana",
            "prev-month": "Mese",
            "prev-year": "Anno",
            next: "Prossimo",
            "next-week": "Settimana",
            "next-month": "Mese",
            "next-year": "Anno",
            "less-than": "L'intervallo non dev'essere maggiore di %d giorni",
            "more-than": "L'intervallo non dev'essere minore di %d giorni",
            "default-more": "Seleziona un intervallo maggiore di %d giorni",
            "default-single": "Seleziona una data",
            "default-less": "Seleziona un intervallo minore di %d giorni",
            "default-range": "Seleziona un intervallo compreso tra i %d e i %d giorni",
            "default-default": "Seleziona un intervallo di date"
        },
        ko: {
            selected: "기간:",
            day: "일",
            days: "일간",
            apply: "닫기",
            "week-1": "월",
            "week-2": "화",
            "week-3": "수",
            "week-4": "목",
            "week-5": "금",
            "week-6": "토",
            "week-7": "일",
            "week-number": "주",
            "month-name": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            shortcuts: "단축키들",
            past: "지난(오늘기준)",
            following: "이후(오늘기준)",
            previous: "이전",
            "prev-week": "1주",
            "prev-month": "1달",
            "prev-year": "1년",
            next: "다음",
            "next-week": "1주",
            "next-month": "1달",
            "next-year": "1년",
            "less-than": "날짜 범위는 %d 일보다 많을 수 없습니다",
            "more-than": "날짜 범위는 %d 일보다 작을 수 없습니다",
            "default-more": "날짜 범위를 %d 일보다 길게 선택해 주세요",
            "default-single": "날짜를 선택해 주세요",
            "default-less": "%d 일보다 작은 날짜를 선택해 주세요",
            "default-range": "%d와 %d 일 사이의 날짜 범위를 선택해 주세요",
            "default-default": "날짜 범위를 선택해 주세요",
            time: "시각",
            hour: "시",
            minute: "분"
        },
        no: {
            selected: "Valgt:",
            day: "Dag",
            days: "Dager",
            apply: "Lukk",
            "week-1": "ma",
            "week-2": "ti",
            "week-3": "on",
            "week-4": "to",
            "week-5": "fr",
            "week-6": "lø",
            "week-7": "sø",
            "month-name": ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
            shortcuts: "Snarveier",
            "custom-values": "Egendefinerte Verdier",
            past: "Over",
            following: "Følger",
            previous: "Forrige",
            "prev-week": "Uke",
            "prev-month": "Måned",
            "prev-year": "År",
            next: "Neste",
            "next-week": "Uke",
            "next-month": "Måned",
            "next-year": "År",
            "less-than": "Datoperioden skal ikkje være lengre enn %d dager",
            "more-than": "Datoperioden skal ikkje være kortere enn %d dager",
            "default-more": "Vennligst velg ein datoperiode lengre enn %d dager",
            "default-single": "Vennligst velg ein dato",
            "default-less": "Vennligst velg ein datoperiode mindre enn %d dager",
            "default-range": "Vennligst velg ein datoperiode mellom %d og %d dager",
            "default-default": "Vennligst velg ein datoperiode",
            time: "Tid",
            hour: "Time",
            minute: "Minutter"
        },
        nl: {
            selected: "Geselecteerd:",
            day: "Dag",
            days: "Dagen",
            apply: "Ok",
            "week-1": "ma",
            "week-2": "di",
            "week-3": "wo",
            "week-4": "do",
            "week-5": "vr",
            "week-6": "za",
            "week-7": "zo",
            "month-name": ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
            shortcuts: "Snelkoppelingen",
            "custom-values": "Aangepaste waarden",
            past: "Verleden",
            following: "Komend",
            previous: "Vorige",
            "prev-week": "Week",
            "prev-month": "Maand",
            "prev-year": "Jaar",
            next: "Volgende",
            "next-week": "Week",
            "next-month": "Maand",
            "next-year": "Jaar",
            "less-than": "Interval moet langer dan %d dagen zijn",
            "more-than": "Interval mag niet minder dan %d dagen zijn",
            "default-more": "Selecteer een interval langer dan %dagen",
            "default-single": "Selecteer een datum",
            "default-less": "Selecteer een interval minder dan %d dagen",
            "default-range": "Selecteer een interval tussen %d en %d dagen",
            "default-default": "Selecteer een interval",
            time: "Tijd",
            hour: "Uur",
            minute: "Minuut"
        },
        ru: {
            selected: "Выбрано:",
            day: "День",
            days: "Дней",
            apply: "Применить",
            "week-1": "пн",
            "week-2": "вт",
            "week-3": "ср",
            "week-4": "чт",
            "week-5": "пт",
            "week-6": "сб",
            "week-7": "вс",
            "month-name": ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
            shortcuts: "Быстрый выбор",
            "custom-values": "Пользовательские значения",
            past: "Прошедшие",
            following: "Следующие",
            previous: "&nbsp;&nbsp;&nbsp;",
            "prev-week": "Неделя",
            "prev-month": "Месяц",
            "prev-year": "Год",
            next: "&nbsp;&nbsp;&nbsp;",
            "next-week": "Неделя",
            "next-month": "Месяц",
            "next-year": "Год",
            "less-than": "Диапазон не может быть больше %d дней",
            "more-than": "Диапазон не может быть меньше %d дней",
            "default-more": "Пожалуйста выберите диапазон больше %d дней",
            "default-single": "Пожалуйста выберите дату",
            "default-less": "Пожалуйста выберите диапазон меньше %d дней",
            "default-range": "Пожалуйста выберите диапазон между %d и %d днями",
            "default-default": "Пожалуйста выберите диапазон",
            time: "Время",
            hour: "Часы",
            minute: "Минуты"
        },
        uk: {
            selected: "Вибрано:",
            day: "День",
            days: "Днів",
            apply: "Застосувати",
            "week-1": "пн",
            "week-2": "вт",
            "week-3": "ср",
            "week-4": "чт",
            "week-5": "пт",
            "week-6": "сб",
            "week-7": "нд",
            "month-name": ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"],
            shortcuts: "Швидкий вибір",
            "custom-values": "Значення користувача",
            past: "Минулі",
            following: "Наступні",
            previous: "&nbsp;&nbsp;&nbsp;",
            "prev-week": "Тиждень",
            "prev-month": "Місяць",
            "prev-year": "Рік",
            next: "&nbsp;&nbsp;&nbsp;",
            "next-week": "Тиждень",
            "next-month": "Місяць",
            "next-year": "Рік",
            "less-than": "Діапазон не може бути більш ніж %d днів",
            "more-than": "Діапазон не може бути меньш ніж %d днів",
            "default-more": "Будь ласка виберіть діапазон більше %d днів",
            "default-single": "Будь ласка виберіть дату",
            "default-less": "Будь ласка виберіть діапазон менше %d днів",
            "default-range": "Будь ласка виберіть діапазон між %d та %d днями",
            "default-default": "Будь ласка виберіть діапазон",
            time: "Час",
            hour: "Години",
            minute: "Хвилини"
        },
        pl: {
            selected: "Wybrany:",
            day: "Dzień",
            days: "Dni",
            apply: "Zamknij",
            "week-1": "pon",
            "week-2": "wt",
            "week-3": "śr",
            "week-4": "czw",
            "week-5": "pt",
            "week-6": "so",
            "week-7": "nd",
            "month-name": ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"],
            shortcuts: "Skróty",
            "custom-values": "Niestandardowe wartości",
            past: "Przeszłe",
            following: "Następne",
            previous: "Poprzednie",
            "prev-week": "tydzień",
            "prev-month": "miesiąc",
            "prev-year": "rok",
            next: "Następny",
            "next-week": "tydzień",
            "next-month": "miesiąc",
            "next-year": "rok",
            "less-than": "Okres nie powinien być dłuższy niż %d dni",
            "more-than": "Okres nie powinien być krótszy niż  %d ni",
            "default-more": "Wybierz okres dłuższy niż %d dni",
            "default-single": "Wybierz datę",
            "default-less": "Wybierz okres krótszy niż %d dni",
            "default-range": "Wybierz okres trwający od %d do %d dni",
            "default-default": "Wybierz okres",
            time: "Czas",
            hour: "Godzina",
            minute: "Minuta"
        },
        se: {
            selected: "Vald:",
            day: "dag",
            days: "dagar",
            apply: "godkänn",
            "week-1": "ma",
            "week-2": "ti",
            "week-3": "on",
            "week-4": "to",
            "week-5": "fr",
            "week-6": "lö",
            "week-7": "sö",
            "month-name": ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
            shortcuts: "genvägar",
            "custom-values": "Anpassade värden",
            past: "över",
            following: "följande",
            previous: "förra",
            "prev-week": "vecka",
            "prev-month": "månad",
            "prev-year": "år",
            next: "nästa",
            "next-week": "vecka",
            "next-month": "måned",
            "next-year": "år",
            "less-than": "Datumintervall bör inte vara mindre än %d dagar",
            "more-than": "Datumintervall bör inte vara mer än %d dagar",
            "default-more": "Välj ett datumintervall längre än %d dagar",
            "default-single": "Välj ett datum",
            "default-less": "Välj ett datumintervall mindre än %d dagar",
            "default-range": "Välj ett datumintervall mellan %d och %d dagar",
            "default-default": "Välj ett datumintervall",
            time: "tid",
            hour: "timme",
            minute: "minut"
        },
        pt: {
            selected: "Selecionado:",
            day: "Dia",
            days: "Dias",
            apply: "Fechar",
            "week-1": "seg",
            "week-2": "ter",
            "week-3": "qua",
            "week-4": "qui",
            "week-5": "sex",
            "week-6": "sab",
            "week-7": "dom",
            "week-number": "N",
            "month-name": ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
            shortcuts: "Atalhos",
            "custom-values": "Valores Personalizados",
            past: "Passado",
            following: "Seguinte",
            previous: "Anterior",
            "prev-week": "Semana",
            "prev-month": "Mês",
            "prev-year": "Ano",
            next: "Próximo",
            "next-week": "Próxima Semana",
            "next-month": "Próximo Mês",
            "next-year": "Próximo Ano",
            "less-than": "O período selecionado não deve ser maior que %d dias",
            "more-than": "O período selecionado não deve ser menor que %d dias",
            "default-more": "Selecione um período superior a %d dias",
            "default-single": "Selecione uma data",
            "default-less": "Selecione um período inferior a %d dias",
            "default-range": "Selecione um período de %d a %d dias",
            "default-default": "Selecione um período",
            time: "Tempo",
            hour: "Hora",
            minute: "Minuto"
        },
        tc: {
            selected: "已選擇:",
            day: "天",
            days: "天",
            apply: "確定",
            "week-1": "一",
            "week-2": "二",
            "week-3": "三",
            "week-4": "四",
            "week-5": "五",
            "week-6": "六",
            "week-7": "日",
            "week-number": "周",
            "month-name": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            shortcuts: "快速選擇",
            past: "過去",
            following: "將來",
            previous: "&nbsp;&nbsp;&nbsp;",
            "prev-week": "上週",
            "prev-month": "上個月",
            "prev-year": "去年",
            next: "&nbsp;&nbsp;&nbsp;",
            "next-week": "下周",
            "next-month": "下個月",
            "next-year": "明年",
            "less-than": "所選日期範圍不能大於%d天",
            "more-than": "所選日期範圍不能小於%d天",
            "default-more": "請選擇大於%d天的日期範圍",
            "default-less": "請選擇小於%d天的日期範圍",
            "default-range": "請選擇%d天到%d天的日期範圍",
            "default-single": "請選擇一個日期",
            "default-default": "請選擇一個日期範圍",
            time: "日期",
            hour: "小時",
            minute: "分鐘"
        },
        ja: {
            selected: "選択しました:",
            day: "日",
            days: "日々",
            apply: "閉じる",
            "week-1": "月",
            "week-2": "火",
            "week-3": "水",
            "week-4": "木",
            "week-5": "金",
            "week-6": "土",
            "week-7": "日",
            "month-name": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            shortcuts: "クイック選択",
            past: "過去",
            following: "将来",
            previous: "&nbsp;&nbsp;&nbsp;",
            "prev-week": "先週、",
            "prev-month": "先月",
            "prev-year": "昨年",
            next: "&nbsp;&nbsp;&nbsp;",
            "next-week": "来週",
            "next-month": "来月",
            "next-year": "来年",
            "less-than": "日付の範囲は ％d 日以上にすべきではありません",
            "more-than": "日付の範囲は ％d 日を下回ってはいけません",
            "default-more": "％d 日よりも長い期間を選択してください",
            "default-less": "％d 日未満の期間を選択してください",
            "default-range": "％d と％ d日の間の日付範囲を選択してください",
            "default-single": "日付を選択してください",
            "default-default": "日付範囲を選択してください",
            time: "時間",
            hour: "時間",
            minute: "分"
        },
        da: {
            selected: "Valgt:",
            day: "Dag",
            days: "Dage",
            apply: "Luk",
            "week-1": "ma",
            "week-2": "ti",
            "week-3": "on",
            "week-4": "to",
            "week-5": "fr",
            "week-6": "lö",
            "week-7": "sö",
            "month-name": ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"],
            shortcuts: "genveje",
            "custom-values": "Brugerdefinerede værdier",
            past: "Forbi",
            following: "Følgende",
            previous: "Forrige",
            "prev-week": "uge",
            "prev-month": "månad",
            "prev-year": "år",
            next: "Næste",
            "next-week": "Næste uge",
            "next-month": "Næste måned",
            "next-year": "Næste år",
            "less-than": "Dato interval bør ikke være med end %d dage",
            "more-than": "Dato interval bør ikke være mindre end %d dage",
            "default-more": "Vælg datointerval længere end %d dage",
            "default-single": "Vælg dato",
            "default-less": "Vælg datointerval mindre end %d dage",
            "default-range": "Vælg datointerval mellem %d og %d dage",
            "default-default": "Vælg datointerval",
            time: "tid",
            hour: "time",
            minute: "minut"
        },
        fi: {
            selected: "Valittu:",
            day: "Päivä",
            days: "Päivää",
            apply: "Sulje",
            "week-1": "ma",
            "week-2": "ti",
            "week-3": "ke",
            "week-4": "to",
            "week-5": "pe",
            "week-6": "la",
            "week-7": "su",
            "week-number": "V",
            "month-name": ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
            shortcuts: "Pikavalinnat",
            "custom-values": "Mukautetut Arvot",
            past: "Menneet",
            following: "Tulevat",
            previous: "Edellinen",
            "prev-week": "Viikko",
            "prev-month": "Kuukausi",
            "prev-year": "Vuosi",
            next: "Seuraava",
            "next-week": "Viikko",
            "next-month": "Kuukausi",
            "next-year": "Vuosi",
            "less-than": "Aikajakson tulisi olla vähemmän kuin %d päivää",
            "more-than": "Aikajakson ei tulisi olla vähempää kuin %d päivää",
            "default-more": "Valitse pidempi aikajakso kuin %d päivää",
            "default-single": "Valitse päivä",
            "default-less": "Valitse lyhyempi aikajakso kuin %d päivää",
            "default-range": "Valitse aikajakso %d ja %d päivän väliltä",
            "default-default": "Valitse aikajakso",
            time: "Aika",
            hour: "Tunti",
            minute: "Minuutti"
        },
        cat: {
            selected: "Seleccionats:",
            day: "Dia",
            days: "Dies",
            apply: "Tanca",
            "week-1": "Dl",
            "week-2": "Dm",
            "week-3": "Dc",
            "week-4": "Dj",
            "week-5": "Dv",
            "week-6": "Ds",
            "week-7": "Dg",
            "week-number": "S",
            "month-name": ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
            shortcuts: "Dreçeres",
            "custom-values": "Valors personalitzats",
            past: "Passat",
            following: "Futur",
            previous: "Anterior",
            "prev-week": "Setmana",
            "prev-month": "Mes",
            "prev-year": "Any",
            next: "Següent",
            "next-week": "Setmana",
            "next-month": "Mes",
            "next-year": "Any",
            "less-than": "El període no hauria de ser de més de %d dies",
            "more-than": "El període no hauria de ser de menys de %d dies",
            "default-more": "Perfavor selecciona un període més gran de %d dies",
            "default-single": "Perfavor selecciona una data",
            "default-less": "Perfavor selecciona un període de menys de %d dies",
            "default-range": "Perfavor selecciona un període d'entre %d i %d dies",
            "default-default": "Perfavor selecciona un període",
            time: "Temps",
            hour: "Hora",
            minute: "Minut"
        }
    },
    Z.fn.dateRangePicker = function(p) {
        p || (p = {}),
        (p = Z.extend(!0, {
            autoClose: !1,
            format: "YYYY-MM-DD",
            separator: " to ",
            language: "auto",
            startOfWeek: "sunday",
            getValue: function() {
                return Z(this).val()
            },
            setValue: function(e) {
                Z(this).attr("readonly") || Z(this).is(":disabled") || e == Z(this).val() || Z(this).val(e)
            },
            startDate: !1,
            endDate: !1,
            time: {
                enabled: !1
            },
            minDays: 0,
            maxDays: 0,
            showShortcuts: !1,
            shortcuts: {},
            customShortcuts: [],
            inline: !1,
            container: "body",
            alwaysOpen: !1,
            singleDate: !1,
            lookBehind: !1,
            batchMode: !1,
            duration: 200,
            stickyMonths: !1,
            dayDivAttrs: [],
            dayTdAttrs: [],
            selectForward: !1,
            selectBackward: !1,
            applyBtnClass: "",
            singleMonth: "auto",
            hoveringTooltip: function(e, t, a) {
                return 1 < e ? e + " " + K("days") : ""
            },
            showTopbar: !0,
            swapTime: !1,
            showWeekNumbers: !1,
            getWeekNumber: function(e) {
                return Q(e).format("w")
            },
            customOpenAnimation: null,
            customCloseAnimation: null,
            customArrowPrevSymbol: null,
            customArrowNextSymbol: null,
            monthSelect: !1,
            yearSelect: !1
        }, p)).start = !1,
        p.end = !1,
        p.startWeek = !1,
        p.isTouchDevice = "ontouchstart"in window || navigator.msMaxTouchPoints,
        p.isTouchDevice && (p.hoveringTooltip = !1),
        "auto" == p.singleMonth && (p.singleMonth = Z(window).width() < 480),
        p.singleMonth && (p.stickyMonths = !1),
        p.showTopbar || (p.autoClose = !0),
        p.startDate && "string" == typeof p.startDate && (p.startDate = Q(p.startDate, p.format).toDate()),
        p.endDate && "string" == typeof p.endDate && (p.endDate = Q(p.endDate, p.format).toDate()),
        p.yearSelect && "boolean" == typeof p.yearSelect && (p.yearSelect = function(e) {
            return [e - 5, e + 5]
        }
        );
        var m, e, r = function() {
            {
                if ("auto" == p.language) {
                    var e = navigator.language ? navigator.language : navigator.browserLanguage;
                    return e && (e = e.toLowerCase())in Z.dateRangePickerLanguages ? Z.dateRangePickerLanguages[e] : Z.dateRangePickerLanguages.default
                }
                return p.language && p.language in Z.dateRangePickerLanguages ? Z.dateRangePickerLanguages[p.language] : Z.dateRangePickerLanguages.default
            }
        }(), s = !1, n = this, i = Z(n).get(0);
        return Z(this).off(".datepicker").on("click.datepicker", function(e) {
            m.is(":visible") || t(p.duration)
        }).on("change.datepicker", function(e) {
            a()
        }).on("keyup.datepicker", function() {
            try {
                clearTimeout(e)
            } catch (e) {}
            e = setTimeout(function() {
                a()
            }, 2e3)
        }),
        function() {
            var t = this;
            if (Z(this).data("date-picker-opened"))
                return void N();
            Z(this).data("date-picker-opened", !0),
            (m = function() {
                var e, t = '<div class="date-picker-wrapper';
                p.extraClass && (t += " " + p.extraClass + " "),
                p.singleDate && (t += " single-date "),
                p.showShortcuts || (t += " no-shortcuts "),
                p.showTopbar || (t += " no-topbar "),
                p.customTopBar && (t += " custom-topbar "),
                t += '">',
                p.showTopbar && (t += '<div class="drp_top-bar">',
                p.customTopBar ? ("function" == typeof p.customTopBar && (p.customTopBar = p.customTopBar()),
                t += '<div class="custom-top">' + p.customTopBar + "</div>") : (t += '<div class="normal-top"><span class="selection-top">' + K("selected") + ' </span> <b class="start-day">...</b>',
                p.singleDate || (t += ' <span class="separator-day">' + p.separator + '</span> <b class="end-day">...</b> <i class="selected-days">(<span class="selected-days-num">3</span> ' + K("days") + ")</i>"),
                t += "</div>",
                t += '<div class="error-top">error</div><div class="default-top">default</div>'),
                t += '<input type="button" class="apply-btn disabled' + (!(e = "") === p.autoClose && (e += " hide"),
                "" !== p.applyBtnClass && (e += " " + p.applyBtnClass),
                e) + '" value="' + K("apply") + '" />',
                t += "</div>");
                var a = p.showWeekNumbers ? 6 : 5
                  , n = "&lt;";
                p.customArrowPrevSymbol && (n = p.customArrowPrevSymbol);
                var r = "&gt;";
                if (p.customArrowNextSymbol && (r = p.customArrowNextSymbol),
                t += '<div class="month-wrapper">   <table class="month1" cellspacing="0" border="0" cellpadding="0">       <thead>           <tr class="caption">               <th>                   <span class="prev">' + n + '                   </span>               </th>               <th colspan="' + a + '" class="month-name">               </th>               <th>' + (p.singleDate || !p.stickyMonths ? '<span class="next">' + r + "</span>" : "") + '               </th>           </tr>           <tr class="week-name">' + E() + "       </thead>       <tbody></tbody>   </table>",
                p.singleMonth || (t += '<div class="gap">' + function() {
                    for (var e = ['<div class="gap-top-mask"></div><div class="gap-bottom-mask"></div><div class="gap-lines">'], t = 0; t < 20; t++)
                        e.push('<div class="gap-line"><div class="gap-1"></div><div class="gap-2"></div><div class="gap-3"></div></div>');
                    return e.push("</div>"),
                    e.join("")
                }() + '</div><table class="month2" cellspacing="0" border="0" cellpadding="0">   <thead>   <tr class="caption">       <th>' + (p.stickyMonths ? "" : '<span class="prev">' + n + "</span>") + '       </th>       <th colspan="' + a + '" class="month-name">       </th>       <th>           <span class="next">' + r + '</span>       </th>   </tr>   <tr class="week-name">' + E() + "   </thead>   <tbody></tbody></table>"),
                t += '<div class="dp-clearfix"></div><div class="time"><div class="time1"></div>',
                p.singleDate || (t += '<div class="time2"></div>'),
                t += '</div><div class="dp-clearfix"></div></div>',
                t += '<div class="footer">',
                p.showShortcuts) {
                    t += '<div class="shortcuts"><b>' + K("shortcuts") + "</b>";
                    var s = p.shortcuts;
                    if (s) {
                        var i;
                        if (s["prev-days"] && 0 < s["prev-days"].length) {
                            t += '&nbsp;<span class="prev-days">' + K("past");
                            for (var o = 0; o < s["prev-days"].length; o++)
                                i = s["prev-days"][o],
                                i += 1 < s["prev-days"][o] ? K("days") : K("day"),
                                t += ' <a href="javascript:;" shortcut="day,-' + s["prev-days"][o] + '">' + i + "</a>";
                            t += "</span>"
                        }
                        if (s["next-days"] && 0 < s["next-days"].length) {
                            t += '&nbsp;<span class="next-days">' + K("following");
                            for (var o = 0; o < s["next-days"].length; o++)
                                i = s["next-days"][o],
                                i += 1 < s["next-days"][o] ? K("days") : K("day"),
                                t += ' <a href="javascript:;" shortcut="day,' + s["next-days"][o] + '">' + i + "</a>";
                            t += "</span>"
                        }
                        if (s.prev && 0 < s.prev.length) {
                            t += '&nbsp;<span class="prev-buttons">' + K("previous");
                            for (var o = 0; o < s.prev.length; o++)
                                i = K("prev-" + s.prev[o]),
                                t += ' <a href="javascript:;" shortcut="prev,' + s.prev[o] + '">' + i + "</a>";
                            t += "</span>"
                        }
                        if (s.next && 0 < s.next.length) {
                            t += '&nbsp;<span class="next-buttons">' + K("next");
                            for (var o = 0; o < s.next.length; o++)
                                i = K("next-" + s.next[o]),
                                t += ' <a href="javascript:;" shortcut="next,' + s.next[o] + '">' + i + "</a>";
                            t += "</span>"
                        }
                    }
                    if (p.customShortcuts)
                        for (var o = 0; o < p.customShortcuts.length; o++) {
                            var d = p.customShortcuts[o];
                            t += '&nbsp;<span class="custom-shortcut"><a href="javascript:;" shortcut="custom">' + d.name + "</a></span>"
                        }
                    t += "</div>"
                }
                if (p.showCustomValues && (t += '<div class="customValues"><b>' + (p.customValueLabel || K("custom-values")) + "</b>",
                p.customValues))
                    for (var o = 0; o < p.customValues.length; o++) {
                        var l = p.customValues[o];
                        t += '&nbsp;<span class="custom-value"><a href="javascript:;" custom="' + l.value + '">' + l.name + "</a></span>"
                    }
                return Z(t += "</div></div>")
            }().hide()).append('<div class="date-range-length-tip"></div>'),
            Z(p.container).append(m),
            p.inline ? m.addClass("inline-wrapper") : o();
            p.alwaysOpen && m.find(".apply-btn").hide();
            var e = _();
            if (G(e),
            p.time.enabled)
                if (p.startDate && p.endDate || p.start && p.end)
                    Y(Q(p.start || p.startDate).toDate(), "time1"),
                    Y(Q(p.end || p.endDate).toDate(), "time2");
                else {
                    var a = p.defaultEndTime ? p.defaultEndTime : e;
                    Y(e, "time1"),
                    Y(a, "time2")
                }
            var n = "";
            n = p.singleDate ? K("default-single") : p.minDays && p.maxDays ? K("default-range") : p.minDays ? K("default-more") : p.maxDays ? K("default-less") : K("default-default");
            m.find(".default-top").html(n.replace(/\%d/, p.minDays).replace(/\%d/, p.maxDays)),
            p.singleMonth ? m.addClass("single-month") : m.addClass("two-months");
            setTimeout(function() {
                l(),
                s = !0
            }, 0),
            m.click(function(e) {
                e.stopPropagation()
            }),
            Z(document).on("click.datepicker", U),
            m.find(".next").click(function() {
                p.stickyMonths ? function(e) {
                    var t = H(p.month1)
                      , a = H(p.month2);
                    if (q(a))
                        return;
                    if (!p.singleDate && 0 <= L(t, a))
                        return;
                    z(t, "month1"),
                    z(a, "month2"),
                    j()
                }() : function(e) {
                    var t = Z(e).parents("table").hasClass("month2")
                      , a = t ? p.month2 : p.month1;
                    if (a = H(a),
                    !p.singleMonth && !p.singleDate && !t && 0 <= L(a, p.month2) || q(a))
                        return;
                    z(a, t ? "month2" : "month1"),
                    I()
                }(this)
            }),
            m.find(".prev").click(function() {
                p.stickyMonths ? function(e) {
                    var t = R(p.month1)
                      , a = R(p.month2);
                    if (q(t))
                        return;
                    if (!p.singleDate && L(a, t) <= 0)
                        return;
                    z(a, "month2"),
                    z(t, "month1"),
                    j()
                }() : function(e) {
                    var t = Z(e).parents("table").hasClass("month2")
                      , a = t ? p.month2 : p.month1;
                    if (a = R(a),
                    t && L(a, p.month1) <= 0 || q(a))
                        return;
                    z(a, t ? "month2" : "month1"),
                    I()
                }(this)
            }),
            m.attr("unselectable", "on").css("user-select", "none").on("selectstart", function(e) {
                return e.preventDefault(),
                !1
            }),
            m.find(".apply-btn").click(function() {
                N();
                var e = W(new Date(p.start)) + p.separator + W(new Date(p.end));
                Z(t).trigger("datepicker-apply", {
                    value: e,
                    date1: new Date(p.start),
                    date2: new Date(p.end)
                })
            }),
            m.find("[custom]").click(function() {
                var e = Z(this).attr("custom");
                p.start = !1,
                p.end = !1,
                m.find(".day.checked").removeClass("checked"),
                p.setValue.call(i, e),
                M(),
                S(!0),
                j(),
                p.autoClose && N()
            }),
            m.find("[shortcut]").click(function() {
                var e, t = Z(this).attr("shortcut"), a = new Date, n = !1;
                if (-1 != t.indexOf("day")) {
                    var r = parseInt(t.split(",", 2)[1], 10);
                    n = new Date((new Date).getTime() + 864e5 * r),
                    a = new Date(a.getTime() + 864e5 * (0 < r ? 1 : -1))
                } else if (-1 != t.indexOf("week")) {
                    var s;
                    for (e = -1 != t.indexOf("prev,") ? -1 : 1,
                    s = 1 == e ? "monday" == p.startOfWeek ? 1 : 0 : "monday" == p.startOfWeek ? 0 : 6,
                    a = new Date(a.getTime() - 864e5); a.getDay() != s; )
                        a = new Date(a.getTime() + 864e5 * e);
                    n = new Date(a.getTime() + 864e5 * e * 6)
                } else if (-1 != t.indexOf("month"))
                    e = -1 != t.indexOf("prev,") ? -1 : 1,
                    (n = 1 == e ? H(a) : R(a)).setDate(1),
                    (a = H(n)).setDate(1),
                    a = new Date(a.getTime() - 864e5);
                else if (-1 != t.indexOf("year"))
                    e = -1 != t.indexOf("prev,") ? -1 : 1,
                    (n = new Date).setFullYear(a.getFullYear() + e),
                    n.setMonth(0),
                    n.setDate(1),
                    a.setFullYear(a.getFullYear() + e),
                    a.setMonth(11),
                    a.setDate(31);
                else if ("custom" == t) {
                    var i = Z(this).html();
                    if (p.customShortcuts && 0 < p.customShortcuts.length)
                        for (var o = 0; o < p.customShortcuts.length; o++) {
                            var d = p.customShortcuts[o];
                            if (d.name == i) {
                                var l = [];
                                if ((l = d.dates.call()) && 2 == l.length && (n = l[0],
                                a = l[1]),
                                l && 1 == l.length) {
                                    var u = l[0];
                                    z(u, "month1"),
                                    z(H(u), "month2"),
                                    I()
                                }
                                break
                            }
                        }
                }
                n && a && (T(n, a),
                M())
            }),
            m.find(".time1 input[type=range]").on("change touchmove", function(e) {
                var t = e.target
                  , a = "hour" == t.name ? Z(t).val().replace(/^(\d{1})$/, "0$1") : void 0
                  , n = "minute" == t.name ? Z(t).val().replace(/^(\d{1})$/, "0$1") : void 0;
                c("time1", a, n)
            }),
            m.find(".time2 input[type=range]").on("change touchmove", function(e) {
                var t = e.target
                  , a = "hour" == t.name ? Z(t).val().replace(/^(\d{1})$/, "0$1") : void 0
                  , n = "minute" == t.name ? Z(t).val().replace(/^(\d{1})$/, "0$1") : void 0;
                c("time2", a, n)
            })
        }
        .call(this),
        p.alwaysOpen && t(0),
        Z(this).data("dateRangePicker", {
            setStart: function(e) {
                return "string" == typeof e && (e = Q(e, p.format).toDate()),
                p.end = !1,
                C(e),
                this
            },
            setEnd: function(e, t) {
                var a = new Date;
                return a.setTime(p.start),
                "string" == typeof e && (e = Q(e, p.format).toDate()),
                T(a, e, t),
                this
            },
            setDateRange: function(e, t, a) {
                "string" == typeof e && "string" == typeof t && (e = Q(e, p.format).toDate(),
                t = Q(t, p.format).toDate()),
                T(e, t, a)
            },
            clear: function() {
                p.start = !1,
                p.end = !1,
                m.find(".day.checked").removeClass("checked"),
                m.find(".day.last-date-selected").removeClass("last-date-selected"),
                m.find(".day.first-date-selected").removeClass("first-date-selected"),
                p.setValue.call(i, ""),
                M(),
                S(),
                j()
            },
            close: N,
            open: t,
            redraw: B,
            getDatePicker: function() {
                return m
            },
            resetMonthsView: G,
            destroy: function() {
                Z(n).off(".datepicker"),
                Z(n).data("dateRangePicker", ""),
                Z(n).data("date-picker-opened", null),
                m.remove(),
                Z(window).off("resize.datepicker", o),
                Z(document).off("click.datepicker", U)
            }
        }),
        Z(window).on("resize.datepicker", o),
        this;
        function o() {
            if (!p.inline) {
                var e = Z(n).offset();
                if ("relative" == Z(p.container).css("position")) {
                    var t = Z(p.container).offset()
                      , a = Math.max(0, e.left + m.outerWidth() - Z("body").width() + 16);
                    m.css({
                        top: e.top - t.top + Z(n).outerHeight() + 4,
                        left: e.left - t.left - a
                    })
                } else
                    e.left < 460 ? m.css({
                        top: e.top + Z(n).outerHeight() + parseInt(Z("body").css("border-top") || 0, 10),
                        left: e.left
                    }) : m.css({
                        top: e.top + Z(n).outerHeight() + parseInt(Z("body").css("border-top") || 0, 10),
                        left: e.left + Z(n).width() - m.width() - 16
                    })
            }
        }
        function t(e) {
            B(),
            a(),
            p.customOpenAnimation ? p.customOpenAnimation.call(m.get(0), function() {
                Z(n).trigger("datepicker-opened", {
                    relatedTarget: m
                })
            }) : m.slideDown(e, function() {
                Z(n).trigger("datepicker-opened", {
                    relatedTarget: m
                })
            }),
            Z(n).trigger("datepicker-open", {
                relatedTarget: m
            }),
            I(),
            l(),
            o()
        }
        function a() {
            var e = p.getValue.call(i)
              , t = e ? e.split(p.separator) : "";
            if (t && (1 == t.length && p.singleDate || 2 <= t.length)) {
                var a = p.format;
                a.match(/Do/) && (a = a.replace(/Do/, "D"),
                t[0] = t[0].replace(/(\d+)(th|nd|st)/, "$1"),
                2 <= t.length && (t[1] = t[1].replace(/(\d+)(th|nd|st)/, "$1"))),
                s = !1,
                2 <= t.length ? T(d(t[0], a, Q.locale(p.language)), d(t[1], a, Q.locale(p.language))) : 1 == t.length && p.singleDate && C(d(t[0], a, Q.locale(p.language))),
                s = !0
            }
        }
        function d(e, t, a) {
            return Q(e, t, a).isValid() ? Q(e, t, a).toDate() : Q().toDate()
        }
        function l() {
            var e = m.find(".gap").css("margin-left");
            e && (e = parseInt(e));
            var t = m.find(".month1").width()
              , a = m.find(".gap").width() + (e ? 2 * e : 0)
              , n = m.find(".month2").width();
            m.find(".month-wrapper").width(t + a + n)
        }
        function u(e, t) {
            m.find("." + e + " input[type=range].hour-range").val(Q(t).hours()),
            m.find("." + e + " input[type=range].minute-range").val(Q(t).minutes()),
            c(e, Q(t).format("HH"), Q(t).format("mm"))
        }
        function h(e, t) {
            p[e] = parseInt(Q(parseInt(t)).startOf("day").add(Q(p[e + "Time"]).format("HH"), "h").add(Q(p[e + "Time"]).format("mm"), "m").valueOf())
        }
        function c(e, r, s) {
            switch (r && m.find("." + e + " .hour-val").text(r),
            s && m.find("." + e + " .minute-val").text(s),
            e) {
            case "time1":
                p.start && t("start", Q(p.start)),
                t("startTime", Q(p.startTime || Q().valueOf()));
                break;
            case "time2":
                p.end && t("end", Q(p.end)),
                t("endTime", Q(p.endTime || Q().valueOf()))
            }
            function t(e, t) {
                var a = t.format("HH")
                  , n = t.format("mm");
                p[e] = t.startOf("day").add(r || a, "h").add(s || n, "m").valueOf()
            }
            M(),
            S(),
            j()
        }
        function f(e) {
            var t = e;
            return "week-range" === p.batchMode ? t = "monday" === p.startOfWeek ? Q(parseInt(e)).startOf("isoweek").valueOf() : Q(parseInt(e)).startOf("week").valueOf() : "month-range" === p.batchMode && (t = Q(parseInt(e)).startOf("month").valueOf()),
            t
        }
        function v(e) {
            var t = e;
            return "week-range" === p.batchMode ? t = "monday" === p.startOfWeek ? Q(parseInt(e)).endOf("isoweek").valueOf() : Q(parseInt(e)).endOf("week").valueOf() : "month-range" === p.batchMode && (t = Q(parseInt(e)).endOf("month").valueOf()),
            t
        }
        function g(e) {
            if (!e.hasClass("invalid")) {
                var t = e.attr("time");
                if (e.addClass("checked"),
                p.singleDate ? (p.start = t,
                p.end = !1) : "week" === p.batchMode ? "monday" === p.startOfWeek ? (p.start = Q(parseInt(t)).startOf("isoweek").valueOf(),
                p.end = Q(parseInt(t)).endOf("isoweek").valueOf()) : (p.end = Q(parseInt(t)).endOf("week").valueOf(),
                p.start = Q(parseInt(t)).startOf("week").valueOf()) : "workweek" === p.batchMode ? (p.start = Q(parseInt(t)).day(1).valueOf(),
                p.end = Q(parseInt(t)).day(5).valueOf()) : "weekend" === p.batchMode ? (p.start = Q(parseInt(t)).day(6).valueOf(),
                p.end = Q(parseInt(t)).day(7).valueOf()) : "month" === p.batchMode ? (p.start = Q(parseInt(t)).startOf("month").valueOf(),
                p.end = Q(parseInt(t)).endOf("month").valueOf()) : p.start && p.end || !p.start && !p.end ? (p.start = f(t),
                p.end = !1) : p.start && (p.end = v(t),
                p.time.enabled && h("end", p.end)),
                p.time.enabled && (p.start && h("start", p.start),
                p.end && h("end", p.end)),
                !p.singleDate && p.start && p.end && p.start > p.end) {
                    var a = p.end;
                    p.end = v(p.start),
                    p.start = f(a),
                    p.time.enabled && p.swapTime && (u("time1", p.start),
                    u("time2", p.end))
                }
                p.start = parseInt(p.start),
                p.end = parseInt(p.end),
                b(),
                p.start && !p.end && (Z(n).trigger("datepicker-first-date-selected", {
                    date1: new Date(p.start)
                }),
                y(e)),
                w(),
                M(),
                S(),
                j(),
                x()
            }
        }
        function k(e) {
            if (e = parseInt(e, 10),
            p.startDate && F(e, p.startDate) < 0)
                return !1;
            if (p.endDate && 0 < F(e, p.endDate))
                return !1;
            if (p.start && !p.end && !p.singleDate) {
                if (0 < p.maxDays && O(e, p.start) > p.maxDays)
                    return !1;
                if (0 < p.minDays && O(e, p.start) < p.minDays)
                    return !1;
                if (p.selectForward && e < p.start)
                    return !1;
                if (p.selectBackward && e > p.start)
                    return !1;
                if (p.beforeShowDay && "function" == typeof p.beforeShowDay) {
                    for (var t = !0, a = e; 1 < O(a, p.start); ) {
                        if (!p.beforeShowDay(new Date(a))[0]) {
                            t = !1;
                            break
                        }
                        if (Math.abs(a - p.start) < 864e5)
                            break;
                        a > p.start && (a -= 864e5),
                        a < p.start && (a += 864e5)
                    }
                    if (!t)
                        return !1
                }
            }
            return !0
        }
        function w() {
            return m.find(".day.invalid.tmp").removeClass("tmp invalid").addClass("valid"),
            p.start && !p.end && m.find(".day.toMonth.valid").each(function() {
                k(parseInt(Z(this).attr("time"), 10)) ? Z(this).addClass("valid tmp").removeClass("invalid") : Z(this).addClass("invalid tmp").removeClass("valid")
            }),
            !0
        }
        function y(e) {
            var t = parseInt(e.attr("time"))
              , a = "";
            if (e.hasClass("has-tooltip") && e.attr("data-tooltip"))
                a = '<span class="tooltip-content">' + e.attr("data-tooltip") + "</span>";
            else if (!e.hasClass("invalid"))
                if (p.singleDate)
                    m.find(".day.hovering").removeClass("hovering"),
                    e.addClass("hovering");
                else if (m.find(".day").each(function() {
                    var e = parseInt(Z(this).attr("time"));
                    p.start,
                    p.end;
                    e == t ? Z(this).addClass("hovering") : Z(this).removeClass("hovering"),
                    p.start && !p.end && (p.start < e && e <= t || p.start > e && t <= e) ? Z(this).addClass("hovering") : Z(this).removeClass("hovering")
                }),
                p.start && !p.end) {
                    var n = O(t, p.start);
                    p.hoveringTooltip && ("function" == typeof p.hoveringTooltip ? a = p.hoveringTooltip(n, p.start, t) : !0 === p.hoveringTooltip && 1 < n && (a = n + " " + K("days")))
                }
            if (a) {
                var r = e.offset()
                  , s = m.offset()
                  , i = r.left - s.left
                  , o = r.top - s.top;
                i += e.width() / 2;
                var d = m.find(".date-range-length-tip")
                  , l = d.css({
                    visibility: "hidden",
                    display: "none"
                }).html(a).width()
                  , u = d.height();
                i -= l / 2,
                o -= u,
                setTimeout(function() {
                    d.css({
                        left: i,
                        top: o,
                        display: "block",
                        visibility: "visible"
                    })
                }, 10)
            } else
                m.find(".date-range-length-tip").hide()
        }
        function b() {
            m.find(".day.hovering").removeClass("hovering"),
            m.find(".date-range-length-tip").hide()
        }
        function D(e) {
            var t = e.val()
              , a = e.attr("name")
              , n = e.parents("table").hasClass("month1") ? "month1" : "month2"
              , r = "month1" === n ? "month2" : "month1"
              , s = !!p.startDate && Q(p.startDate)
              , i = !!p.endDate && Q(p.endDate)
              , o = Q(p[n])[a](t);
            s && o.isSameOrBefore(s) && (o = s.add("month2" === n ? 1 : 0, "month")),
            i && o.isSameOrAfter(i) && (o = i.add(p.singleMonth || "month1" !== n ? 0 : -1, "month")),
            z(o, n),
            "month1" === n ? (p.stickyMonths || Q(o).isSameOrAfter(p[r], "month")) && z(Q(o).add(1, "month"), r) : (p.stickyMonths || Q(o).isSameOrBefore(p[r], "month")) && z(Q(o).add(-1, "month"), r),
            I()
        }
        function x() {
            !0 === p.singleDate ? s && p.start && p.autoClose && N() : s && p.start && p.end && p.autoClose && N()
        }
        function M() {
            var e = Math.ceil((p.end - p.start) / 864e5) + 1;
            p.singleDate ? p.start && !p.end ? m.find(".drp_top-bar").removeClass("error").addClass("normal") : m.find(".drp_top-bar").removeClass("error").removeClass("normal") : p.maxDays && e > p.maxDays ? (p.start = !1,
            p.end = !1,
            m.find(".day").removeClass("checked"),
            m.find(".drp_top-bar").removeClass("normal").addClass("error").find(".error-top").html(K("less-than").replace("%d", p.maxDays))) : p.minDays && e < p.minDays ? (p.start = !1,
            p.end = !1,
            m.find(".day").removeClass("checked"),
            m.find(".drp_top-bar").removeClass("normal").addClass("error").find(".error-top").html(K("more-than").replace("%d", p.minDays))) : p.start || p.end ? m.find(".drp_top-bar").removeClass("error").addClass("normal") : m.find(".drp_top-bar").removeClass("error").removeClass("normal"),
            p.singleDate && p.start && !p.end || !p.singleDate && p.start && p.end ? m.find(".apply-btn").removeClass("disabled") : m.find(".apply-btn").addClass("disabled"),
            p.batchMode && (p.start && p.startDate && F(p.start, p.startDate) < 0 || p.end && p.endDate && 0 < F(p.end, p.endDate)) && (p.start = !1,
            p.end = !1,
            m.find(".day").removeClass("checked"))
        }
        function S(e, t) {
            var a;
            m.find(".start-day").html("..."),
            m.find(".end-day").html("..."),
            m.find(".selected-days").hide(),
            p.start && m.find(".start-day").html(W(new Date(parseInt(p.start)))),
            p.end && m.find(".end-day").html(W(new Date(parseInt(p.end)))),
            p.start && p.singleDate ? (m.find(".apply-btn").removeClass("disabled"),
            a = W(new Date(p.start)),
            p.setValue.call(i, a, W(new Date(p.start)), W(new Date(p.end))),
            s && !t && Z(n).trigger("datepicker-change", {
                value: a,
                date1: new Date(p.start)
            })) : p.start && p.end ? (m.find(".selected-days").show().find(".selected-days-num").html(O(p.end, p.start)),
            m.find(".apply-btn").removeClass("disabled"),
            a = W(new Date(p.start)) + p.separator + W(new Date(p.end)),
            p.setValue.call(i, a, W(new Date(p.start)), W(new Date(p.end))),
            s && !t && Z(n).trigger("datepicker-change", {
                value: a,
                date1: new Date(p.start),
                date2: new Date(p.end)
            })) : e ? m.find(".apply-btn").removeClass("disabled") : m.find(".apply-btn").addClass("disabled")
        }
        function O(e, t) {
            return Math.abs(Q(e).diff(Q(t), "d")) + 1
        }
        function T(e, t, a) {
            if (e.getTime() > t.getTime()) {
                var n = t;
                t = e,
                e = n,
                n = null
            }
            var r = !0;
            if (p.startDate && F(e, p.startDate) < 0 && (r = !1),
            p.endDate && 0 < F(t, p.endDate) && (r = !1),
            !r)
                return z(p.startDate, "month1"),
                z(H(p.startDate), "month2"),
                void I();
            p.start = e.getTime(),
            p.end = t.getTime(),
            p.time.enabled && (u("time1", e),
            u("time2", t)),
            (p.stickyMonths || 0 < F(e, t) && 0 === L(e, t)) && (p.lookBehind ? e = R(t) : t = H(e)),
            p.stickyMonths && !1 !== p.endDate && 0 < L(t, p.endDate) && (e = R(e),
            t = R(t)),
            p.stickyMonths || 0 === L(e, t) && (p.lookBehind ? e = R(t) : t = H(e)),
            z(e, "month1"),
            z(t, "month2"),
            I(),
            M(),
            S(!1, a),
            x()
        }
        function C(e) {
            var t = !0;
            if (p.startDate && F(e, p.startDate) < 0 && (t = !1),
            p.endDate && 0 < F(e, p.endDate) && (t = !1),
            t) {
                if (p.start = e.getTime(),
                p.time.enabled && u("time1", e),
                z(e, "month1"),
                !0 !== p.singleMonth)
                    z(H(e), "month2");
                I(),
                S(),
                x()
            } else
                z(p.startDate, "month1")
        }
        function j() {
            (p.start || p.end) && (m.find(".day").each(function() {
                var e = parseInt(Z(this).attr("time"))
                  , t = p.start
                  , a = p.end;
                p.time.enabled && (e = Q(e).startOf("day").valueOf(),
                t = Q(t || Q().valueOf()).startOf("day").valueOf(),
                a = Q(a || Q().valueOf()).startOf("day").valueOf()),
                p.start && p.end && e <= a && t <= e || p.start && !p.end && Q(t).format("YYYY-MM-DD") == Q(e).format("YYYY-MM-DD") ? Z(this).addClass("checked") : Z(this).removeClass("checked"),
                p.start && Q(t).format("YYYY-MM-DD") == Q(e).format("YYYY-MM-DD") ? Z(this).addClass("first-date-selected") : Z(this).removeClass("first-date-selected"),
                p.end && Q(a).format("YYYY-MM-DD") == Q(e).format("YYYY-MM-DD") ? Z(this).addClass("last-date-selected") : Z(this).removeClass("last-date-selected")
            }),
            m.find(".week-number").each(function() {
                Z(this).attr("data-start-time") == p.startWeek && Z(this).addClass("week-number-selected")
            }))
        }
        function z(e, t) {
            var a = function(e, t) {
                var a = (e = Q(e)).get("month")
                  , n = '<div class="month-element">' + A(a) + "</div>";
                if (!p.monthSelect)
                    return n;
                var r = !!p.startDate && Q(p.startDate).add(p.singleMonth || "month2" !== t ? 0 : 1, "month")
                  , s = !!p.endDate && Q(p.endDate).add(p.singleMonth || "month1" !== t ? 0 : -1, "month")
                  , i = r && e.isSame(r, "year") ? r.get("month") : 0
                  , o = s && e.isSame(s, "year") ? s.get("month") : 11
                  , d = Math.min(i, a)
                  , l = Math.max(o, a);
                if (d === l)
                    return n;
                return P("month", V({
                    minSelectable: i,
                    maxSelectable: o,
                    minVisible: d,
                    maxVisible: l
                }, a, function(e) {
                    return A(e)
                }))
            }(e = Q(e).toDate(), t)
              , n = function(e, t) {
                var a = (e = Q(e)).get("year")
                  , n = '<div class="month-element">' + a + "</div>";
                if (!p.yearSelect)
                    return n;
                var r = p.yearSelect && "function" == typeof p.yearSelect
                  , s = !!p.startDate && Q(p.startDate).add(p.singleMonth || "month2" !== t ? 0 : 1, "month")
                  , i = !!p.endDate && Q(p.endDate).add(p.singleMonth || "month1" !== t ? 0 : -1, "month")
                  , o = r ? p.yearSelect(a) : p.yearSelect.slice()
                  , d = s ? Math.max(o[0], s.get("year")) : Math.min(o[0], a)
                  , l = i ? Math.min(o[1], i.get("year")) : Math.max(o[1], a)
                  , u = Math.min(d, a)
                  , m = Math.max(l, a);
                if (u === m)
                    return n;
                return P("year", V({
                    minSelectable: d,
                    maxSelectable: l,
                    minVisible: u,
                    maxVisible: m
                }, a))
            }(e, t);
            m.find("." + t + " .month-name").html(a + " " + n),
            m.find("." + t + " tbody").html(function(e) {
                var t = [];
                e.setDate(1);
                new Date(e.getTime() - 864e5);
                var a, n, r = new Date, s = e.getDay();
                0 === s && "monday" === p.startOfWeek && (s = 7);
                if (0 < s)
                    for (var i = s; 0 < i; i--) {
                        var o = new Date(e.getTime() - 864e5 * i);
                        n = k(o.getTime()),
                        p.startDate && F(o, p.startDate) < 0 && (n = !1),
                        p.endDate && 0 < F(o, p.endDate) && (n = !1),
                        t.push({
                            date: o,
                            type: "lastMonth",
                            day: o.getDate(),
                            time: o.getTime(),
                            valid: n
                        })
                    }
                for (var d = e.getMonth(), i = 0; i < 40; i++)
                    a = Q(e).add(i, "days").toDate(),
                    n = k(a.getTime()),
                    p.startDate && F(a, p.startDate) < 0 && (n = !1),
                    p.endDate && 0 < F(a, p.endDate) && (n = !1),
                    t.push({
                        date: a,
                        type: a.getMonth() == d ? "toMonth" : "nextMonth",
                        day: a.getDate(),
                        time: a.getTime(),
                        valid: n
                    });
                for (var l = [], u = 0; u < 6 && "nextMonth" != t[7 * u].type; u++) {
                    l.push("<tr>");
                    for (var o = 0; o < 7; o++) {
                        var m = "monday" == p.startOfWeek ? o + 1 : o;
                        a = t[7 * u + m];
                        var h = Q(a.time).format("L") == Q(r).format("L");
                        if (a.extraClass = "",
                        a.tooltip = "",
                        a.valid && p.beforeShowDay && "function" == typeof p.beforeShowDay) {
                            var c = p.beforeShowDay(Q(a.time).toDate());
                            a.valid = c[0],
                            a.extraClass = c[1] || "",
                            a.tooltip = c[2] || "",
                            "" !== a.tooltip && (a.extraClass += " has-tooltip ")
                        }
                        var f = {
                            time: a.time,
                            "data-tooltip": a.tooltip,
                            class: "day " + a.type + " " + a.extraClass + " " + (a.valid ? "valid" : "invalid") + " " + (h ? "real-today" : "")
                        };
                        0 === o && p.showWeekNumbers && l.push('<td><div class="week-number" data-start-time="' + a.time + '">' + p.getWeekNumber(a.date) + "</div></td>"),
                        l.push("<td " + $({}, p.dayTdAttrs, a) + "><div " + $(f, p.dayDivAttrs, a) + ">" + J(a.time, a.day) + "</div></td>")
                    }
                    l.push("</tr>")
                }
                return l.join("")
            }(e)),
            p[t] = e,
            w(),
            m.find(".day").off("click").click(function(e) {
                g(Z(this))
            }),
            m.find(".day").off("mouseenter").mouseenter(function(e) {
                y(Z(this))
            }),
            m.find(".day").off("mouseleave").mouseleave(function(e) {
                m.find(".date-range-length-tip").hide(),
                p.singleDate && b()
            }),
            m.find(".week-number").off("click").click(function(e) {
                var t, a, n, r;
                t = Z(this),
                r = parseInt(t.attr("data-start-time"), 10),
                p.startWeek ? (m.find(".week-number-selected").removeClass("week-number-selected"),
                a = new Date(r < p.startWeek ? r : p.startWeek),
                n = new Date(r < p.startWeek ? p.startWeek : r),
                p.startWeek = !1,
                p.start = Q(a).day("monday" == p.startOfWeek ? 1 : 0).valueOf(),
                p.end = Q(n).day("monday" == p.startOfWeek ? 7 : 6).valueOf()) : (p.startWeek = r,
                t.addClass("week-number-selected"),
                a = new Date(r),
                p.start = Q(a).day("monday" == p.startOfWeek ? 1 : 0).valueOf(),
                p.end = Q(a).day("monday" == p.startOfWeek ? 7 : 6).valueOf()),
                w(),
                M(),
                S(),
                j(),
                x()
            }),
            m.find(".month").off("change").change(function(e) {
                D(Z(this))
            }),
            m.find(".year").off("change").change(function(e) {
                D(Z(this))
            })
        }
        function V(e, t, a) {
            var n = [];
            a = a || function(e) {
                return e
            }
            ;
            for (var r = e.minVisible; r <= e.maxVisible; r++)
                n.push({
                    value: r,
                    text: a(r),
                    selected: r === t,
                    disabled: r < e.minSelectable || r > e.maxSelectable
                });
            return n
        }
        function P(e, t) {
            for (var a, n = '<div class="select-wrapper"><select class="' + e + '" name="' + e + '">', r = 0, s = t.length; r < s; r++) {
                var i = t[r];
                n += '<option value="' + i.value + '"' + (i.selected ? " selected" : "") + (i.disabled ? " disabled" : "") + ">" + i.text + "</option>",
                i.selected && (a = i.text)
            }
            return n += "</select>" + a + "</div>"
        }
        function Y(e, t) {
            m.find("." + t).append("<div><span>" + K("Time") + ': <span class="hour-val">00</span>:<span class="minute-val">00</span></span></div><div class="hour"><label>' + K("Hour") + ': <input type="range" class="hour-range" name="hour" min="0" max="23"></label></div><div class="minute"><label>' + K("Minute") + ': <input type="range" class="minute-range" name="minute" min="0" max="59"></label></div>'),
            u(t, e)
        }
        function A(e) {
            return K("month-name")[e]
        }
        function W(e) {
            return Q(e).format(p.format)
        }
        function I() {
            j();
            var e = parseInt(Q(p.month1).format("YYYYMM"))
              , t = parseInt(Q(p.month2).format("YYYYMM"))
              , a = Math.abs(e - t);
            1 < a && 89 != a ? m.addClass("has-gap").removeClass("no-gap").find(".gap").css("visibility", "visible") : m.removeClass("has-gap").addClass("no-gap").find(".gap").css("visibility", "hidden");
            var n = m.find("table.month1").height()
              , r = m.find("table.month2").height();
            m.find(".gap").height(Math.max(n, r) + 10)
        }
        function N() {
            if (!p.alwaysOpen) {
                var e = function() {
                    Z(n).data("date-picker-opened", !1),
                    Z(n).trigger("datepicker-closed", {
                        relatedTarget: m
                    })
                };
                p.customCloseAnimation ? p.customCloseAnimation.call(m.get(0), e) : Z(m).slideUp(p.duration, e),
                Z(n).trigger("datepicker-close", {
                    relatedTarget: m
                })
            }
        }
        function B() {
            z(p.month1, "month1"),
            z(p.month2, "month2")
        }
        function L(e, t) {
            var a = parseInt(Q(e).format("YYYYMM")) - parseInt(Q(t).format("YYYYMM"));
            return 0 < a ? 1 : 0 === a ? 0 : -1
        }
        function F(e, t) {
            var a = parseInt(Q(e).format("YYYYMMDD")) - parseInt(Q(t).format("YYYYMMDD"));
            return 0 < a ? 1 : 0 === a ? 0 : -1
        }
        function H(e) {
            return Q(e).add(1, "months").toDate()
        }
        function R(e) {
            return Q(e).add(-1, "months").toDate()
        }
        function E() {
            var e = p.showWeekNumbers ? "<th>" + K("week-number") + "</th>" : "";
            return "monday" == p.startOfWeek ? e + "<th>" + K("week-1") + "</th><th>" + K("week-2") + "</th><th>" + K("week-3") + "</th><th>" + K("week-4") + "</th><th>" + K("week-5") + "</th><th>" + K("week-6") + "</th><th>" + K("week-7") + "</th>" : e + "<th>" + K("week-7") + "</th><th>" + K("week-1") + "</th><th>" + K("week-2") + "</th><th>" + K("week-3") + "</th><th>" + K("week-4") + "</th><th>" + K("week-5") + "</th><th>" + K("week-6") + "</th>"
        }
        function q(e) {
            return e = Q(e),
            !(!p.startDate || !e.endOf("month").isBefore(p.startDate)) || !(!p.endDate || !e.startOf("month").isAfter(p.endDate))
        }
        function $(e, t, r) {
            var s = Z.extend(!0, {}, e);
            Z.each(t, function(e, t) {
                var a = t(r);
                for (var n in a)
                    s.hasOwnProperty(n) ? s[n] += a[n] : s[n] = a[n]
            });
            var a = "";
            for (var n in s)
                s.hasOwnProperty(n) && (a += n + '="' + s[n] + '" ');
            return a
        }
        function J(e, t) {
            return p.showDateFilter && "function" == typeof p.showDateFilter ? p.showDateFilter(e, t) : t
        }
        function K(e) {
            var t = e.toLowerCase()
              , a = e in r ? r[e] : t in r ? r[t] : null
              , n = Z.dateRangePickerLanguages.default;
            return null == a && (a = e in n ? n[e] : t in n ? n[t] : ""),
            a
        }
        function _() {
            var e = p.defaultTime ? p.defaultTime : new Date;
            return p.lookBehind ? (p.startDate && L(e, p.startDate) < 0 && (e = H(Q(p.startDate).toDate())),
            p.endDate && 0 < L(e, p.endDate) && (e = Q(p.endDate).toDate())) : (p.startDate && L(e, p.startDate) < 0 && (e = Q(p.startDate).toDate()),
            p.endDate && 0 < L(H(e), p.endDate) && (e = R(Q(p.endDate).toDate()))),
            p.singleDate && (p.startDate && L(e, p.startDate) < 0 && (e = Q(p.startDate).toDate()),
            p.endDate && 0 < L(e, p.endDate) && (e = Q(p.endDate).toDate())),
            e
        }
        function G(e) {
            e || (e = _()),
            p.lookBehind ? (z(R(e), "month1"),
            z(e, "month2")) : (z(e, "month1"),
            z(H(e), "month2")),
            p.singleDate && z(e, "month1"),
            j(),
            I()
        }
        function U(e) {
            var t, a;
            t = e,
            (a = n[0]).contains(t.target) || t.target == a || null != a.childNodes && 0 <= Z.inArray(t.target, a.childNodes) || m.is(":visible") && N()
        }
    }
});
