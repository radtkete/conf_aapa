(function($) {
    "use strict"; // Start of use strict


  $(document).ready(function() {
      $(window).trigger("resize");
      init_mobile_nav_toggle();
      init_classic_menu();
      video_bg_init();

  });


  $(window).resize(function() {
      init_classic_menu_resize();
      js_height_init();
  });




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











function video_bg_init(){
  $('#video-bg').vide({
    'mp4': 'video/newOrleans',
    'webm': 'video/newOrleans',
    'ogv': 'video/newOrleans',
    'poster': 'video/newOrleans.jpg',
    }, {
    position: '50% 50%',
    posterType: 'jpg'
  });
}

















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













