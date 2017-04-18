(function($) {
    "use strict"; // Start of use strict


    /* ---------------------------------------------
    Scripts initialization
    --------------------------------------------- */
    $(window).on('load', function(event) {
      event.preventDefault();
      $(window).trigger("scroll");
      $(window).trigger("resize");
    });


    $(document).ready(function() {
        $(window).trigger("resize");
        init_classic_menu();
        init_mobile_nav_toggle();
    });


    $(window).on('resize', function(event) {
        event.preventDefault();
        init_classic_menu_resize();
    });

    /* --------------------------------------------
    Platform detect
    --------------------------------------------- */
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    } else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }

    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    } else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    } else {
        safariTest = false;
    }

    // Detect touch devices    
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }




    /* ---------------------------------------------
    Sections helpers
    --------------------------------------------- */

    // Sections backgrounds

    var pageSection = $(".home-section, .page-section, .small-section, .split-section");
    pageSection.each(function(indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    // Function for block height 100%
    function height_line(height_object, height_donor) {
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }

    // Function equal height
    ! function(a) {
        a.fn.equalHeights = function() {
            var b = 0,
                c = a(this);
            return c.each(function() {
                var c = a(this).innerHeight();
                c > b && (b = c)
            }), c.css("height", b)
        }, a("[data-equal]").each(function() {
            var b = a(this),
                c = b.data("equal");
            b.find(c).equalHeights()
        })
    }(jQuery);




    /* ---------------------------------------------
    Nav panel classic
    --------------------------------------------- */




    function init_classic_menu_resize() {
        // Mobile menu style toggle
        if ($(window).width() <= 899) {
            $(".navigation").addClass("mobile-on");
        } else if ($(window).width() > 899) {
            $(".navigation").removeClass("mobile-on");
        }
    }





    // Hamburger Menu - Toggle

    function init_mobile_nav_toggle() {
        var hamburger = $('#js-mobile-menu').off();
        var desktop_nav = $('#js-navigation-menu');

        desktop_nav.removeClass('show');

        hamburger.on('click', function(e) {
            e.preventDefault();
            (this.classList.contains("is-active") === true) ? this.classList.remove("is-active"): this.classList.add("is-active");

            desktop_nav.slideToggle(function() {
                if ($(this).is(':hidden')) {
                    $(this).removeAttr('style');
                }
            })
        })
    };







function init_classic_menu(){



  // height_line($(".nav-link"), $(".navigation"));
  // height_line($("#js-mobile-menu"), $(".navigation"));
  // height_line($(".logo"), $(".navigation"));
  // height_line($(".button-wrapper"), $(".navigation"));
  
  // Sub menu

  var mnHasSub = $(".mn-has-sub");
  var mnThisLi;

  $(".mobile-on .mn-has-sub").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down");

  mnHasSub.click(function() {

      if ($(".navigation").hasClass("mobile-on")) {
          mnThisLi = $(this).parent("li:first");
          if (mnThisLi.hasClass("js-opened")) {
              mnThisLi.find(".submenu:first").slideUp(function() {
                  mnThisLi.removeClass("js-opened");
                  mnThisLi.find(".mn-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
              });
          } else {
              $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
              mnThisLi.addClass("js-opened");
              mnThisLi.find(".submenu:first").slideDown();
          }

          return false;
      } else {

      }

  });

  mnThisLi = mnHasSub.parent("li");
  mnThisLi.hover(function() {

      if (!($(".navigation").hasClass("mobile-on"))) {

          $(this).find(".submenu:first").stop(true, true).fadeIn("fast");
      }

  }, function() {

      if (!($(".navigation").hasClass("mobile-on"))) {

          $(this).find(".submenu:first").stop(true, true).delay(100).fadeOut("fast");
      }

  });




};









})(jQuery); // End of use strict




