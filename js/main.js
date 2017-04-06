(function($){
    "use strict"; // Start of use strict
    
    
    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */
    
  init_scroll_navigate();
  
  $(window).trigger("scroll");
  $(window).trigger("resize");


  $(document).ready(function() {
      $(window).trigger("resize");
      init_mobile_nav_toggle();
      init_classic_menu();
      // video_bg_init();
      initPageSliders();
      initSponsersSort();

  });


  $(window).resize(function() {
      init_classic_menu_resize();
      js_height_init();
  });

/* --------------------------------------------
 Platform detect
 --------------------------------------------- */
var mobileTest;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    mobileTest = true;
    $("html").addClass("mobile");
}
else {
    mobileTest = false;
    $("html").addClass("no-mobile");
}

var mozillaTest;
if (/mozilla/.test(navigator.userAgent)) {
    mozillaTest = true;
}
else {
    mozillaTest = false;
}
var safariTest;
if (/safari/.test(navigator.userAgent)) {
    safariTest = true;
}
else {
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
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    
    // Function for block height 100%
    function height_line(height_object, height_donor){
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }
    
    // Function equal height
    !function(a){
        a.fn.equalHeights = function(){
            var b = 0, c = a(this);
            return c.each(function(){
                var c = a(this).innerHeight();
                c > b && (b = c)
            }), c.css("height", b)
        }, a("[data-equal]").each(function(){
            var b = a(this), c = b.data("equal");
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
  } 
  else if ($(window).width() > 899) {
    $(".navigation").removeClass("mobile-on");
  }
}



function init_classic_menu(){

    // Navbar sticky
    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > $('.home-section').height()) {
            $('.navigation').sticky({
                topSpacing: 0
            });
        }
        else {
            $('.navigation').unstick();
        }
    });

            

}




// Hamburger Menu - Toggle

function init_mobile_nav_toggle() {
  var hamburger = $('#js-mobile-menu').off();
  var desktop_nav = $('#js-navigation-menu');

  desktop_nav.removeClass('show');

  hamburger.on('click', function(e) {
    e.preventDefault();
    (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");

    desktop_nav.slideToggle(function() {
      if ($(this).is(':hidden')) {
        $(this).removeAttr('style');
      }
    })
  })
};








})(jQuery); // End of use strict











// function video_bg_init(){
//   $('#video-bg').vide({
//     'mp4': 'video/newOrleans',
//     'webm': 'video/newOrleans',
//     'ogv': 'video/newOrleans',
//     'poster': 'video/newOrleans.jpg',
//     }, {
//     position: '50% 50%',
//     posterType: 'jpg'
//   });
// }

















function js_height_init(){
    (function($){
        $(".js-height-full").height($(window).height());
        $(".js-height-parent").each(function(){
            $(this).height($(this).parent().first().height());
        });
    })(jQuery);
}






     
        // Sub menu
        
        var mnHasSub = $(".mn-has-sub");
        var mnThisLi;
        
        $(".mobile-on .mn-has-sub").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down");
        
        mnHasSub.click(function(){
        
            if ($(".navigation").hasClass("mobile-on")) {
                mnThisLi = $(this).parent("li:first");
                if (mnThisLi.hasClass("js-opened")) {
                    mnThisLi.find(".submenu:first").slideUp(function(){
                        mnThisLi.removeClass("js-opened");
                        mnThisLi.find(".mn-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                    });
                }
                else {
                    $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                    mnThisLi.addClass("js-opened");
                    mnThisLi.find(".submenu:first").slideDown();
                }
                
                return false;
            }
            else {
                
            }
            
        });
        
        mnThisLi = mnHasSub.parent("li");
        mnThisLi.hover(function(){
        
            if (!($(".navigation").hasClass("mobile-on"))) {
            
                $(this).find(".submenu:first").stop(true, true).fadeIn("fast");
            }
            
        }, function(){
        
            if (!($(".navigation").hasClass("mobile-on"))) {
            
                $(this).find(".submenu:first").stop(true, true).delay(100).fadeOut("fast");
            }
            
        });
        




































// Countdown Init Init
$(document).ready(function(){
    
    var countdown = $(".countdown");
    var data_finish_date = countdown.attr("data-finish-date");
    var data_UTC = countdown.attr("data-UTC");
    var data_finish_message = countdown.attr("data-finish-message");
    
    countdown.downCount({
        date: data_finish_date,
        offset: data_UTC
    }, function(){
        alert(data_finish_message);
    });
    
});


/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {

    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
                date: null,
                offset: null
            }, options);

        // Throw error if date is not set
        if (!settings.date) {
            $.error('Date is not defined.');
        }

        // Throw error if date is set incorectly
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
        }

        // Save container
        var container = this;

        /**
         * Change client's local date to match offset timezone
         * @return {Object} Fixed Date object.
         */
        var currentDate = function () {
            // get client's current date
            var date = new Date();

            // turn date to utc
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

            // set new Date object
            var new_date = new Date(utc + (3600000*settings.offset))

            return new_date;
        };

        /**
         * Main downCount function that calculates everything
         */
        function countdown () {
            var target_date = new Date(settings.date), // set target date
                current_date = currentDate(); // get fixed current date

            // difference of dates
            var difference = target_date - current_date;

            // if difference is negative than it's pass the target date
            if (difference < 0) {
                // stop timer
                clearInterval(interval);

                if (callback && typeof callback === 'function') callback();

                return;
            }

            // basic math variables
            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            // calculate dates
            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);

                // fix dates so that it will show two digets
                days = (String(days).length >= 2) ? days : '0' + days;
                hours = (String(hours).length >= 2) ? hours : '0' + hours;
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            // based on the date change the refrence wording
            var ref_days = (days === 1) ? 'day' : 'days',
                ref_hours = (hours === 1) ? 'hour' : 'hours',
                ref_minutes = (minutes === 1) ? 'minute' : 'minutes',
                ref_seconds = (seconds === 1) ? 'second' : 'seconds';

            // set to DOM
            container.find('.days').text(days);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);

            container.find('.days_ref').text(ref_days);
            container.find('.hours_ref').text(ref_hours);
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds);
        };
        
        // start
        var interval = setInterval(countdown, 300);
    };

})(jQuery);








(function() {

  'use strict';

  /**
   * tabs
   *
   * @description The Tabs component.
   * @param {Object} options The options hash
   */
  var tabs = function(options) {

    var el = document.querySelector(options.el);
    var tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
    var tabContentContainers = el.querySelectorAll(options.tabContentContainers);
    var activeIndex = 0;
    var initCalled = false;

    /**
     * init
     *
     * @description Initializes the component by removing the no-js class from
     *   the component, and attaching event listeners to each of the nav items.
     *   Returns nothing.
     */
    var init = function() {
      if (!initCalled) {
        initCalled = true;
        el.classList.remove('no-js');
        
        for (var i = 0; i < tabNavigationLinks.length; i++) {
          var link = tabNavigationLinks[i];
          handleClick(link, i);
        }
      }
    };

    /**
     * handleClick
     *
     * @description Handles click event listeners on each of the links in the
     *   tab navigation. Returns nothing.
     * @param {HTMLElement} link The link to listen for events on
     * @param {Number} index The index of that link
     */
    var handleClick = function(link, index) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        goToTab(index);
      });
    };

    /**
     * goToTab
     *
     * @description Goes to a specific tab based on index. Returns nothing.
     * @param {Number} index The index of the tab to go to
     */
    var goToTab = function(index) {
      if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
        tabNavigationLinks[activeIndex].classList.remove('is-active');
        tabNavigationLinks[index].classList.add('is-active');
        tabContentContainers[activeIndex].classList.remove('is-active');
        tabContentContainers[index].classList.add('is-active');
        activeIndex = index;
      }
    };

    /**
     * Returns init and goToTab
     */
    return {
      init: init,
      goToTab: goToTab
    };

  };

  /**
   * Attach to global namespace
   */
  window.tabs = tabs;

})();

































    /* ---------------------------------------------
     Scroll navigation
     --------------------------------------------- */
    
    function init_scroll_navigate(){


$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});
        
    }
    












// $(document).ready(function(){
//   // Add smooth scrolling to all links
//   $("a").on('click', function(event) {

//     // Make sure this.hash has a value before overriding default behavior
//     if (this.hash !== "") {
//       // Prevent default anchor click behavior
//       event.preventDefault();

//       // Store hash
//       var hash = this.hash;

//       // Using jQuery's animate() method to add smooth page scroll
//       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//       $('html, body').animate({
//         scrollTop: $(hash).offset().top
//       }, 800, function(){
   
//         // Add hash (#) to URL when done scrolling (default click behavior)
//         window.location.hash = hash;
//       });
//     } // End if
//   });
// });










$(document).ready(function() {

  $(".video").fitVids();

});












$(document).ready(function() {
  if ($("#js-parallax-window").length) {
    parallax();
  }
});

$(window).scroll(function(e) {
  if ($("#js-parallax-window").length) {
    parallax();
  }
});

function parallax(){
  if( $("#js-parallax-window").length > 0 ) {
    var plxBackground = $("#js-parallax-background");
    var plxWindow = $("#js-parallax-window");

    var plxWindowTopToPageTop = $(plxWindow).offset().top;
    var windowTopToPageTop = $(window).scrollTop();
    var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

    var plxBackgroundTopToPageTop = $(plxBackground).offset().top;
    var windowInnerHeight = window.innerHeight;
    var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
    var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
    var plxSpeed = 0.35;

    plxBackground.css('top', - (plxWindowTopToWindowTop * plxSpeed) + 'px');
  }
}




/* ---------------------------------------------
 Sliders
 --------------------------------------------- */
function initPageSliders(){
    (function($){
        "use strict";

      // Landing Page - Blog Posts Slider
      $(".special-events__carousel").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: "<button class='owl-prev'><i class='fa fa-angle-left'></i></button>",
        nextArrow: "<button class='owl-next'><i class='fa fa-angle-right'></i></button>",
        responsive: [{
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        }, {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      });


    })(jQuery);
};

function initSponsersSort(){
    (function($){
        "use strict";

      var __sf = $(".sponsorsFooter ul span");
      var __sf_cont = $(".sponsorsFooter ul");
      var __title = $("#sponsorTitle");

      __sf.mouseenter(function() {
        $(this).addClass('hover');
        __sf_cont.addClass('enter');
        var __setTitle = $(this).attr("data-group-title");
        __title.html(__setTitle);
      }).mouseleave(function() {
        $(this).removeClass('hover');
        __sf_cont.removeClass('enter');
        var __setTitle = $(__title).attr("data-default-title");
        __title.html(__setTitle);
      });


    })(jQuery);
};
