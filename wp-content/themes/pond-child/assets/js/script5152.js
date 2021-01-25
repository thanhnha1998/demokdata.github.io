/*-----------------------------------------------------------------------------------

   Script - All Custom frontend jQuery scripts & functions

-----------------------------------------------------------------------------------*/

/* safari issue when using the back button */
jQuery(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload()
    }
});

// SMOOTH SHOW FUNCION FOR ELEMENTS THAT TAKE ACTION WHEN VISIBLE (counter & animations & skills, etc)
function smoothShow() {


  /*----------------------------------------------
              B I G   L E T T E R
  ------------------------------------------------*/
  jQuery('h1[data-bigletter],h2[data-bigletter],h3[data-bigletter],h4[data-bigletter],h5[data-bigletter],h6[data-bigletter]').each(function() {
    if (jQuery(window).width() > 700) {
      var visible = jQuery(this).visible(false);
      if (visible) {
        if (jQuery(this).hasClass( "visible" )) {} else { jQuery(this).addClass("visible"); }
      } else {
        jQuery(this).removeClass("visible");
      }
    } else {
        jQuery(this).addClass("visible");
    }
  });




  /*----------------------------------------------
              C O U N T E R
  ------------------------------------------------*/
  jQuery('.counter-value').each(function() {
    if (jQuery(window).width() > 700) {
      var visible = jQuery(this).visible(false);
      if (jQuery(this).hasClass( "anim" )) {}
      else if (visible) {
        jQuery(this).addClass("anim");
        var from = parseInt(jQuery(this).attr('data-from'));
        var to = parseInt(jQuery(this).attr('data-to'));
        var speed = parseInt(jQuery(this).attr('data-speed'));
        jQuery(this).count(from, to, speed);
      }
    } else {
      var to = parseInt(jQuery(this).attr('data-to'));
      jQuery(this).html(to);
    }
  });




  /*----------------------------------------------
       G E N E R A L   A N I M A T I O N S
  ------------------------------------------------*/
  jQuery('.sr-animation').each(function() {
    if (jQuery(window).width() > 700) {
      var visible = jQuery(this).visible(true);
      var delay = jQuery(this).attr("data-delay");
      if (!delay) { delay = 0; }
      if (jQuery(this).hasClass( "animated" )) {}
      else if (visible) {
        jQuery(this).delay(delay).queue(function(){jQuery(this).addClass('animated')});
      }
    } else {
      jQuery(this).addClass('animated');
    }
  });


  /*----------------------------------------------
       S K I L L   A N I M A T I O N
  ------------------------------------------------*/
  jQuery('.skill').each(function() {
    var visible = jQuery(this).visible(true);
    var percent = jQuery(this).find('.skill-bar .skill-active ').attr('data-perc');
    if (jQuery(this).hasClass( "anim" )) {}
    else if (visible) {
      var randomval = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
      jQuery(this).addClass("anim");
      jQuery(this).find('.skill-bar .skill-active ').animate({'width': percent+'%',}, 2000, 'easeInOutQuart', function(){
        jQuery(this).find('.tooltip').delay(randomval).animate({'top':'-25px','right':'-8px','opacity':1}, 500);
      }).css('overflow', 'visible');
    }
  });


}


function splitSection() {

  var borderWidthHeight = parseInt(jQuery("#bodyborder-top").height());

  /*----------------------------------------------
      S P L I T   S E C T I O N
  ------------------------------------------------*/
  if (jQuery(".split-section").length > 0) {
    contentWidth =  jQuery(".wrapper").width();
    if(!contentWidth || contentWidth < 300) {
      contentWidth = 1080;
      if (jQuery(window).width() < 1281) { contentWidth = 900;  } else
      if (jQuery(window).width() < 1121) { contentWidth = 730; } else
      if (jQuery(window).width() < 861) { contentWidth = 280; }
    }
    contentThird =  Math.round(contentWidth/3);
    windowWidth =  jQuery(window).width()-(borderWidthHeight*2);
    difference = Math.round((windowWidth - contentWidth) /2);
    smallWidth = contentThird+difference+13;
    bigWidth = windowWidth-smallWidth;

    if (jQuery(window).width() < 861) {
      jQuery(".split-onethird, .split-onethird .split-bg, .split-twothird, .split-twothird .split-bg").css({"width": "100%"});
    } else {
      jQuery(".split-onethird, .split-onethird .split-bg").css({"width": smallWidth+"px"});
      jQuery(".split-twothird, .split-twothird .split-bg").css({"width": bigWidth+"px"});
    }

    setTimeout(function() {
      jQuery(".split-section .vertical-center").each(function(index, element) {
        var centerHeight =  jQuery(this).height();
        var padding =  parseInt(jQuery(this).css('padding-top')) + parseInt(jQuery(this).css('padding-bottom'));
        var fullHeight = centerHeight+padding;
        var splitHeight =  jQuery(this).parents(".split-section").height();
        if (fullHeight < splitHeight && jQuery(window).width() > 861) {
          var margin = (splitHeight-fullHeight)/2;
          jQuery(this).css({"marginTop": margin+"px"});
        } else {
          jQuery(this).css({"marginTop": "0px"});
        }
      });
    },500);
  }


  if (jQuery(window).width() < 861) {
    jQuery(".split-left, .split-right").each(function(index, element) {
      var thisHeight = jQuery(this).height();
      if (thisHeight < 50) {
        jQuery(this).css({"min-height": "300px"});
      }
    });
  }

}


function smoothtransistion(url) {
  jQuery("#page-loader").slideDown(800, 'easeInOutExpo', function() {
    setTimeout(function() { window.location = url; }, 300);
  });
  setTimeout(function() { jQuery("body").addClass("leave-page").removeClass("loading-end"); }, 400);
}

function reorganizeIsotope() {
  jQuery('.masonry[data-maxitemwidth]').each(function(){
    $container = jQuery(this);
    var maxitemwidth = $container.data('maxitemwidth');
    if (!maxitemwidth) { maxitemwidth = 370; }
    var containerwidth = Math.ceil((($container.width()+(parseInt($container.css('marginLeft'))*2)) / 113) * 100 - (parseInt($container.css('marginLeft'))*2));
    var itemmargin = parseInt($container.children('div').css('marginRight')) + parseInt($container.children('div').css('marginLeft'));
    var rows = Math.ceil(containerwidth/maxitemwidth);
    var marginperrow = (rows-1)*itemmargin;
    var newitemmargin = marginperrow / rows;
    var itemwidth = Math.floor((containerwidth/rows)-newitemmargin+1);
    $container.children('div').css({ 'width': itemwidth+'px' });

    if ($container.children('div').hasClass('masonry-item')) {
      $container.find('.masonry-item img').on('load',function(){
        $container.isotope('layout');
      });

      $container.find('.masonry-item a').each(function() {
        $container.isotope('layout');
      });
    }
  });
}

function hideResponsiveNav(){
  var fullheight = jQuery(window).height()-(parseInt(jQuery("#bodyborder-top").height())*2);

  if (fullheight < 400) {
    jQuery('.nav-inner').fadeOut(200);
  } else {
    jQuery('#main-nav').removeClass("nav-visible");
  }
  jQuery('.nav-inner').animate({marginTop: '0px', opacity: 0}, 100, 'easeInOutExpo', function(){
    jQuery('.scroll-down-message').css({'z-index':'101'});
  });
  jQuery('.open-nav span.hamburger').toggleClass('is-clicked');
  jQuery("#main-nav").delay(100).slideUp(100,'easeInOutExpo',function() { jQuery('.nav-inner').fadeIn(200); jQuery('#main-nav').removeClass("nav-visible"); });

}


(function($){
'use strict';

setTimeout(function() { jQuery("body").addClass("loading"); },100); // Start loading animation

jQuery(window).load(function($) {

  splitSection();
  jQuery(window).resize(function() {
    splitSection();
  });


  /*----------------------------------------------
    H I D E   L I N E   I M A G E   L I N K S
  ------------------------------------------------*/
  jQuery("p a img").each(function(index, element) {
        jQuery(this).parent("a").addClass("hide-line");
    });


  /*----------------------------------------------
      H I D E   P A G E   L O A D E R  + S M O O T H   S H O W
  ------------------------------------------------*/
  var openSection = window.location.hash.substr(1);
  var borderWidthHeight = parseInt(jQuery("#bodyborder-top").height());
  jQuery("#page-loader .page-loader-inner").delay(500).fadeIn(10, function(){
    jQuery("body").addClass("loading-end");
    jQuery("#page-loader .page-loader-inner").fadeOut(1000, function(){
      if (openSection) {
        jQuery('html,body').animate({ scrollTop: jQuery( "#"+openSection ).offset().top-jQuery("header").height()+80}, 10, 'easeInOutExpo');
      }
    });
    jQuery("#page-loader").delay(1300).animate({top:(borderWidthHeight-2)+'px',height:(jQuery(window).height()-(borderWidthHeight*2)+3)+'px'},10).slideUp(1000, 'easeInOutExpo',function(){ jQuery("#page-loader").animate({top:'0',height:'100%'},10); });
  });

  // If no page loader
  if (jQuery('#page-loader').length < 1) { jQuery("body").addClass("loading-end"); }


  /*----------------------------------------------
       T R A N S I T I O N   (when leaving the page)
  ------------------------------------------------*/
  jQuery(window).unload(function() { });		// work-around for browser back button
  jQuery('.transition').click(function(e) {
    var href = jQuery(this).attr('href');
    if (href.charAt(0) !== '#') {
      if (jQuery('#page-loader').length > 0) {
        smoothtransistion(href);
        return false;
      }
    } else {
      return true;
    }
  });




  if( jQuery().isotope ) {

    /*----------------------------------------------
            C A L L   I S O T O P E
    ------------------------------------------------*/
    jQuery(".masonry").each(function () {
      var $container = jQuery(this);

      // bugfix for srcset since WP 4.4 (imageloaded doesn't support srcset)
      $container.find(".masonry-item img").attr("srcset", "");
      var layout = "masonry";
      if ($container.hasClass("fitrows")) {
        layout = "fitRows";
      }

      $container.isotope({
        layoutMode: layout,
        itemSelector: ".masonry-item",
        transformsEnabled: true, // Important for videos
      });
    });


    /*----------------------------------------------
           I S O T O P E : Filter
    ------------------------------------------------*/
/*		jQuery('.filter li a').click(function(){

      var parentul = jQuery(this).parents('ul.filter').data('related-grid');
      jQuery(this).parents('ul.filter').find('li a').removeClass('active');
      jQuery(this).addClass('active');

      var selector = jQuery(this).attr('data-option-value');
      jQuery('#'+parentul).isotope({ filter: selector }, function(){ });

      return(false);
    });
    */
    /*----------------------------------------------
         I S O T O P E : Load More
    ------------------------------------------------*/
    var load_more = jQuery('#load-more a'),
            origtext = load_more.text(),
            maxnumpage = jQuery('#load-more a').data('maxnumpage'),
            type = jQuery('#load-more a').data('type'),
            tax = jQuery('#load-more a').data('tax'),
            related = jQuery('#load-more a').data('related'),
            page = 1;

    load_more.click(function(){
      page++;
      jQuery('#load-more').addClass('loading');
      jQuery('#load-more a').html('loading...');

      jQuery.ajax({type:'POST', url:srvars.ajaxurl, data: { action:'sr_load_more', page:page, type:type, tax:tax }, success: function(response) {
        var $content = jQuery(response);
        $content.hide();

        jQuery($content).imagesLoaded(function() {
          jQuery('#'+related).append( $content );
          $content.show();
          reorganizeIsotope();
          setTimeout(function(){
            jQuery('#load-more').removeClass('loading');
            jQuery('#load-more a').html(origtext);
            jQuery('#'+related).isotope( 'appended', $content, function() {
              if(page >= maxnumpage) jQuery('#load-more').slideUp(500);
            });
          }, 1200);
        });

      }});
      return false;
    });

    reorganizeIsotope();

    jQuery(window).resize(function() {
      reorganizeIsotope();
    });


  } /* END if isotope */




  /*----------------------------------------------
       D R O P   D O W N   N A  V I
  ------------------------------------------------*/
  var timer = [];
     var timerout= [];
  jQuery("nav#traditional-nav li").each(function(index) {
        if (jQuery(this).find("ul").length > 0) {
            var element = jQuery(this);
            //show subnav on hover
            jQuery(this).mouseenter(function() {
        if(timer[index]) {
                  clearTimeout(timer[index]);
                  timer[index] = null;
                }
                timer[index] = setTimeout(function() {
                  jQuery(element).children('ul').fadeIn(200);
                }, 150)
            });
            //hide submenus on exit
            jQuery(this).mouseleave(function() {
        if(timer[index]) {
                  clearTimeout(timer[index]);
                  timer[index] = null;
              }
              timer[index] = setTimeout(function() {
                  jQuery(element).children('ul').fadeOut(200);
              }, 150)
            });
        }
    });

  jQuery('#menu nav#traditional-nav').on("click", "li", function() {
    if (jQuery(window).width() < 1025) {
      if (jQuery(this).find("ul").length > 0) {
        if (jQuery(this).find("ul").css('display') !== 'block') {
          jQuery(this).children("ul").fadeIn(200);
          return false;
        }
      }
    }
  });



  /*----------------------------------------------
       D R O P   D O W N   N A  V I   (Mobile) + SHARE CLICK
  ------------------------------------------------*/
  jQuery('body').on("click", "nav#main-nav ul li > a", function() {
    if (jQuery(window).width() < 1025) {
      if (jQuery(this).siblings("ul").length > 0) {
        if (!jQuery(this).parent("li").hasClass("hovered")) {
          jQuery(this).parent("li").addClass("hovered");
          // scroll to el
          var scrollEl = jQuery(this).parent("li").position().top;
          jQuery('nav#main-nav .nav-inner').animate({ scrollTop: (scrollEl)}, 100);
          return false;
        } else {
          jQuery(this).parent("li").removeClass("hovered");
          return true;
        }
      }
    }
    var href = jQuery(this).attr('href');
    var target = jQuery(this).attr('target');
    if (href.charAt(0) !== '#' && target !== '_blank') {
      if (jQuery('#page-loader').length > 0) {
        smoothtransistion(href);
        return false;
      }
    } else {
      hideResponsiveNav();
      return true;
    }
  });




  /*----------------------------------------------
           O P E N   N A V
  ------------------------------------------------*/
  jQuery('header').on("click", ".open-nav", function() {
    var hidden = jQuery('#main-nav').css('display');
    var borderWidthHeight = parseInt(jQuery("#page-content").css("padding-top"));
    var fullheight = jQuery(window).height()-(borderWidthHeight*2);

    if (hidden == 'block') {
      hideResponsiveNav();
    } else {

      if (fullheight < 400) {
        jQuery("nav#main-nav .nav-inner").css({'max-height':fullheight+'px'});
        jQuery("#main-nav .nav-logo").prependTo("#main-nav .nav-inner");
        jQuery("#main-nav .nav-social").appendTo("#main-nav .nav-inner");
      }

      jQuery('.scroll-down-message').css({'z-index':'inherit'});
      jQuery('.open-nav span.hamburger').toggleClass('is-clicked');
      jQuery('#main-nav').slideDown(200,'easeInOutExpo',function(){
        jQuery('#main-nav').addClass("nav-visible");
        var menuHeight = jQuery(".nav-inner").height();
        jQuery(".nav-inner").css({'max-height':menuHeight+'px'});
        if(menuHeight < fullheight) {
          var marginTop = parseInt((fullheight-menuHeight)/2);
        } else {
          var marginTop = 0;
        }
        jQuery(".nav-inner").animate({"marginTop": marginTop+'px', opacity: 1}, 200, 'easeInOutQuart');
      });
    }
    return false;
  });




  /*----------------------------------------------
      S H A R E   C L I C K  (MOBILE)
  ------------------------------------------------*/
  jQuery('body').on("click", ".show-share", function() {
    if (jQuery(window).width() < 1025) {
      if (parseInt(jQuery(this).siblings("ul").css('top')) < 0) {
        jQuery(this).parent("#social-share").addClass("hovered");
        return false;
      } else {
        jQuery(this).parent("#social-share").removeClass("hovered");
        return false;
      }
      return false;
    }
    return false;
  });




  /*----------------------------------------------
                T A B S
  ------------------------------------------------*/
  jQuery(".tabs").each(function(i) {
    jQuery(this).find('.tab-content').removeClass('active');
    var rel = jQuery(this).find('.active').attr('href');
    jQuery(this).find('.'+rel).addClass('active');
  });

  jQuery(".tab-nav").on("click", "a", function() {

    var parentdiv = jQuery(this).parent('li').parent('ul').parent('div');
    var rel = jQuery(this).attr('href');

    jQuery(parentdiv).find(".tab-nav a").removeClass("active");
    jQuery(this).addClass("active");

    jQuery(parentdiv).find(".tab-container .tab-content").hide().removeClass('active');
    jQuery(parentdiv).find(".tab-container ."+rel).fadeIn(500).addClass('active');

    return(false);

  });




  /*----------------------------------------------
      T O G G L E  &  A C C O R D I O N
  ------------------------------------------------*/
  jQuery(".toggle-item").each(function(i) {
    jQuery(this).find('.toggle-active').siblings('.toggle-inner').slideDown(300);
  });

  jQuery(".toggle-item").on("click", ".toggle-title", function() {

    var parentdiv = jQuery(this).parent('div').parent('div');
    var active = jQuery(this).parent('div').find('.toggle-inner').css('display');

    if (jQuery(parentdiv).attr('class') == 'accordion') {
      if (active !== 'none' ) {
        jQuery(parentdiv).find('.toggle-item .toggle-inner').slideUp(300);
        jQuery(this).toggleClass('toggle-active');
      } else {
        jQuery(parentdiv).find('.toggle-item .toggle-inner').slideUp(300);
        jQuery(parentdiv).find('.toggle-item .toggle-title').removeClass('toggle-active');

        jQuery(this).toggleClass('toggle-active');
        jQuery(this).siblings('.toggle-inner').slideDown(300);
      }
    } else {
      jQuery(this).toggleClass('toggle-active');
      jQuery(this).siblings('.toggle-inner').slideToggle(300);
    }

    return(false);
  });




  /*----------------------------------------------
       S C R O L L   D O W N   I N F O
  ------------------------------------------------*/
  jQuery('.scroll-down-message').click(function(){
    jQuery('html,body').animate({ scrollTop: jQuery("#page-body").offset().top}, 1000, 'easeInOutQuart');
    return false;
  });




  /*----------------------------------------------
         B A C K   T O P   T O P
  ------------------------------------------------*/
  jQuery('#backtotop').click(function(){
    jQuery('html, body').animate({scrollTop: 0}, 1000, 'easeInOutQuart');
    return false;
  });




  /*----------------------------------------------
      R E V O L U T I O N   S L I D E R
  ------------------------------------------------*/
  if(jQuery().revolution) {
    jQuery('.rev-slider').revolution({
      delay:10000,
      startheight: 500,
      startwidth: 1200,
      hideTimerBar: "on",
      onHoverStop:"on",
      navigationType:"bullet",
      hideThumbs:0,					// Bullets always visible
      navigationHAlign:"right",
           navigationVAlign:"center",
           navigationHOffset:20,
           navigationVOffset:0,
      navigationArrows:"none",
      fullWidth:"off",
      fullScreen:"on",
      fullScreenOffsetContainer: "#pseudo-header"
    });
  };


  /*----------------------------------------------
           O W L   C A R O U S E L
  ------------------------------------------------*/
  if(jQuery().owlCarousel) {

    /* for all owlslider classes (single item) */
    jQuery(".owlslider").owlCarousel({
      autoPlay : false,
      stopOnHover : true,
      navigation: false,
      navigationText : false,
      slideSpeed : 800,			// speed for mouseslide/touchslide
      paginationSpeed : 800,	// speed for autoPlay/pagination bullets
      singleItem : true,
      autoHeight : true
    });

    /* for all owlcarousel classes (multiple items) */
    jQuery(".owlcarousel").owlCarousel({
      items : 4,
      itemsDesktop:false,
      itemsDesktopSmall:false,
      itemsTablet: [860,2],
      itemsMobile: [640,1],
      autoplay: false,
      autoHeight : true,
      navigationText : false,
      rewindnav: false
    });

  }



  /*----------------------------------------------
              P A R A L L A X
  ------------------------------------------------*/
  if(jQuery().parallax) {
    jQuery('.parallax-section').parallax();
  }




  /*----------------------------------------------
              V I D E O   B G
  ------------------------------------------------*/
  if(jQuery().bgVideo) {
    setTimeout(function() {
      jQuery('.videobg-section').bgVideo();
    }, 1000);
  }



  /*----------------------------------------------
           F A N C Y B O X
  ------------------------------------------------*/
  if(jQuery().fancybox) {
    jQuery('.openfancybox').fancybox();
  }



  /*----------------------------------------------
           F I T   V I D E O S
  ------------------------------------------------*/
  if(jQuery().fitVids) {
    jQuery("#page-body, footer").fitVids();
  }



  /*----------------------------------------------
      R E S P O N S I V E   J P L A Y E R
  ------------------------------------------------*/
  if(jQuery().jPlayer && jQuery('.jp-interface').length){
    jQuery('.jp-interface').each(function(){
      var playerwidth = jQuery(this).width();
      var newwidth = playerwidth - 175;
      jQuery(this).find('.jp-progress-container').css({ width: newwidth+'px' });
    });
  }

  smoothShow();

});


jQuery( window ).scroll(function() {
  smoothShow();
});

jQuery(window).ready(function() {
  setTimeout(function(){
      jQuery("#fb-messenger-fake-button").show(200);
      jQuery(".call-now-bt").show(200);
  }, 2000);
});

})(jQuery)