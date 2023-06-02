!function() {
    var e, n = {
        453: function() {
            document.addEventListener("DOMContentLoaded", (function() {
                var e, n, o = document.querySelector(".cookie-agree"), t = document.querySelector(".cookie");
                "true" !== (e = "cookieAreShown",
                (n = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"))) ? decodeURIComponent(n[1]) : void 0) && t.classList.add("is-show"),
                o.addEventListener("click", (function(e) {
                    e.preventDefault(),
                    t.classList.remove("is-show"),
                    setTimeout((function() {
                        !function(e, n, o) {
                            var t = new Date;
                            t.setDate(t.getDate() + o),
                            document.cookie = e + "=" + n + "; path=/; secure; expires=" + t.toUTCString()
                        }("cookieAreShown", "true", 30),
                        t.style.display = "none"
                    }
                    ), 1200)
                }
                ))
            }
            )),
            $((function() {
                $(".js-open-header-city__dropdown").on("click", (function(e) {
                    e.preventDefault(),
                    $(this).parents(".header-city").toggleClass("isOpened")
                }
                )),
                $(document).on("click", (function(e) {
                    0 === $(e.target).closest(".header-city").length && $(".header-city").removeClass("isOpened")
                }
                )),
                $(".js-open-support-service__dropdown").on("click", (function(e) {
                    e.preventDefault(),
                    $(this).parents(".support-service").toggleClass("isOpened")
                }
                )),
                $(document).on("click", (function(e) {
                    0 === $(e.target).closest(".support-service").length && $(".support-service").removeClass("isOpened")
                }
                )),
                $(".js-main-submenu-open").on("click", (function(e) {
                    e.preventDefault(),
                    $(".showroom-lazyload").each((function() {
                        var e = $(this)
                          , n = e.data("showroomsrc");
                        n && !e.attr("src") && e.attr("src", n)
                    }
                    ));
                    var n = $(this)
                      , o = n.next(".main-nav__dropdown");
                    o.slideToggle((function() {
                        n.hasClass("isOpened") && n.offset().top < $(window).scrollTop() && $(".main-nav").animate({
                            scrollTop: n.offset().top + $(".main-nav").scrollTop() - $(".header-main").outerHeight()
                        }, 500)
                    }
                    )),
                    n.toggleClass("isOpened"),
                    n.hasClass("isOpened") && $(window).outerWidth() >= 1263 ? $(".dd-overlay").addClass("active") : $(window).outerWidth() >= 1263 && $(".dd-overlay").removeClass("active"),
                    $(".main-nav__dropdown").not(o).slideUp().prev().removeClass("isOpened")
                }
                )),
                $(".js-main-submenu-close").on("click", (function(e) {
                    e.preventDefault(),
                    $(".js-main-submenu-open").removeClass("isOpened"),
                    $(".js-main-submenu-open").next(".main-nav__dropdown").slideUp(),
                    $(".dd-overlay").removeClass("active")
                }
                )),
                $(".dd-overlay").on("click", (function() {
                    $(window).outerWidth() >= 1263 ? ($(".js-main-submenu-open").removeClass("isOpened"),
                    $(".js-main-submenu-open").next(".main-nav__dropdown").slideUp(),
                    $(".dd-overlay").removeClass("active")) : ($(".main-nav").slideUp(),
                    $(".hamburger").removeClass("is-active"),
                    $(".dd-overlay").removeClass("active"))
                }
                )),
                $(".js-open-mobile-menu").on("click", (function(e) {
                    e.preventDefault(),
                    $(".main-nav").slideToggle(),
                    $(".hamburger").toggleClass("is-active"),
                    $(".hamburger").hasClass("is-active") && $(window).outerWidth() < 1263 ? $(".dd-overlay").addClass("active") : $(".dd-overlay").removeClass("active")
                }
                )),
                $(".js-dropdown-submenu-open").on("click", (function() {
                    var e = $(this)
                      , n = e.next(".df-dropdown__submenu");
                    n.slideToggle(),
                    e.toggleClass("isOpened"),
                    $(".df-dropdown__submenu").not(n).slideUp().prev().removeClass("isOpened")
                }
                ))
            }
            ))
        },
        417: function() {}
    }, o = {};
    function t(e) {
        var s = o[e];
        if (void 0 !== s)
            return s.exports;
        var i = o[e] = {
            exports: {}
        };
        return n[e](i, i.exports, t),
        i.exports
    }
    t.m = n,
    e = [],
    t.O = function(n, o, s, i) {
        if (!o) {
            var r = 1 / 0;
            for (l = 0; l < e.length; l++) {
                o = e[l][0],
                s = e[l][1],
                i = e[l][2];
                for (var a = !0, c = 0; c < o.length; c++)
                    (!1 & i || r >= i) && Object.keys(t.O).every((function(e) {
                        return t.O[e](o[c])
                    }
                    )) ? o.splice(c--, 1) : (a = !1,
                    i < r && (r = i));
                if (a) {
                    e.splice(l--, 1);
                    var d = s();
                    void 0 !== d && (n = d)
                }
            }
            return n
        }
        i = i || 0;
        for (var l = e.length; l > 0 && e[l - 1][2] > i; l--)
            e[l] = e[l - 1];
        e[l] = [o, s, i]
    }
    ,
    t.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }
    ,
    function() {
        var e = {
            773: 0,
            870: 0
        };
        t.O.j = function(n) {
            return 0 === e[n]
        }
        ;
        var n = function(n, o) {
            var s, i, r = o[0], a = o[1], c = o[2], d = 0;
            if (r.some((function(n) {
                return 0 !== e[n]
            }
            ))) {
                for (s in a)
                    t.o(a, s) && (t.m[s] = a[s]);
                if (c)
                    var l = c(t)
            }
            for (n && n(o); d < r.length; d++)
                i = r[d],
                t.o(e, i) && e[i] && e[i][0](),
                e[i] = 0;
            return t.O(l)
        }
          , o = self.webpackChunkhyundai_agat = self.webpackChunkhyundai_agat || [];
        o.forEach(n.bind(null, 0)),
        o.push = n.bind(null, o.push.bind(o))
    }(),
    t.O(void 0, [870], (function() {
        return t(453)
    }
    ));
    var s = t.O(void 0, [870], (function() {
        return t(417)
    }
    ));
    s = t.O(s)
}();

