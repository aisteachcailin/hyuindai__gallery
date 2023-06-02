!function(e) {
    var n = {};
    function r(t) {
        if (n[t])
            return n[t].exports;
        var o = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, r),
        o.l = !0,
        o.exports
    }
    r.m = e,
    r.c = n,
    r.d = function(e, n, t) {
        r.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: t
        })
    }
    ,
    r.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return r.d(n, "a", n),
        n
    }
    ,
    r.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }
    ,
    r.p = "/",
    r(r.s = 39)
}({
    39: function(e, n, r) {
        e.exports = r("Y2sT")
    },
    Y2sT: function(e, n) {
        $(document).ready(function() {
            var e = new ScrollMagic.Controller
              , n = new ScrollMagic.Scene({
                triggerElement: ".nav",
                duration: "0",
                triggerHook: "0"
            }).setPin(".nav").addTo(e);
            function r() {
                $(window).outerWidth() < 1263 ? n.offset(-56) : n.offset(0)
            }
            function t(e) {
                return void 0 === e ? null : 1 === (e = "" + e).length ? "0" + e : e
            }
            $(window).on("resize", function() {
                r()
            }),
            r(),
            $("#gallery").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: !1,
                fade: !0,
                asNavFor: "#gallery-nav",
                infinite: !0,
                lazyLoad: "ondemand"
            }),
            $("#gallery-nav").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: "#gallery",
                dots: !1,
                centerMode: !0,
                focusOnSelect: !0
            }),
            $(".gallery__total").text(t($(".gallery__item").not(".slick-cloned").length)),
            $(".gallery__download").attr("href", $(".gallery__item.slick-current").data("image")),
            $("#gallery").on("afterChange", function(e, n, r, o) {
                $(".gallery__current").text(t(r + 1)),
                $(".gallery__download").attr("href", $(".gallery__item.slick-current").data("image"))
            })
        })
    }
});
