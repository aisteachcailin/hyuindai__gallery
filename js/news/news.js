!function(e) {
    var t = {};
    function n(o) {
        if (t[o])
            return t[o].exports;
        var r = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, n),
            r.l = !0,
            r.exports
    }
    n.m = e,
        n.c = t,
        n.d = function(e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: o
            })
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                        return e.default
                    }
                    : function() {
                        return e
                    }
            ;
            return n.d(t, "a", t),
                t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "/",
        n(n.s = 14)
}({
    14: function(e, t, n) {
        e.exports = n("ViOF")
    },
    ViOF: function(e, t) {
        $(function() {
            $("#datepicker-range").dateRangePicker({
                format: "DD.MM.YYYY",
                separator: " - ",
                language: "ru",
                singleMonth: !0,
                showShortcuts: !1,
                showTopbar: !1,
                hoveringTooltip: !1,
                startOfWeek: "monday",
                selectForward: !1,
                selectBackward: !1,
                customArrowPrevSymbol: '<div class="datePrev"></div>',
                customArrowNextSymbol: '<div class="dateNext"></div>'
            }).bind("datepicker-change", function(e, t) {
                console.log(t)
            }),
                $(".caption th").eq(2).append($(".caption th").eq(0).find(".prev")),
                $(".caption th").eq(0).remove(),
                $(".caption th").eq(0).attr("colspan", 6),
                $("#datepicker-range").on("input", function() {
                    "" === $(this).val() && $(".js-clear-button").removeClass("active")
                })
        })
    }
});
