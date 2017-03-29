(function($) {
    "use strict"; // Start of use strict


  $(document).ready(function() {
      $(window).trigger("resize");
      init_mobile_nav_toggle();
  });


  $(window).resize(function() {
      init_classic_menu_resize();
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






// Hamburger Menu - Toggle

function init_mobile_nav_toggle() {
  var hamburger = $('#js-mobile-menu').off();
  var desktop_nav = $('#js-navigation-menu');

  desktop_nav.removeClass('show');

  hamburger.on('click', function(e) {
    e.preventDefault();

    desktop_nav.slideToggle(function() {
      if ($(this).is(':hidden')) {
        $(this).removeAttr('style');
      }
    })
  })
};













})(jQuery); // End of use strict






















     
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
        







