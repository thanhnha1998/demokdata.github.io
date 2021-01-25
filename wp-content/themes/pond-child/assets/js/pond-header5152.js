/*-----------------------------------------------------------------------------------

 	Script - HEADER

-----------------------------------------------------------------------------------*/
(function ($) {
  "use strict";

  var headerHeight = jQuery("header").height();
  var headerTopPos = jQuery("header").offset().top;
  var headerStickyOnLoad = false;
  var footerStickyOnLoad = false;
  var headerOverlay = false;
  var borderWidthHeight = parseInt(jQuery("#page-content").css("padding-top"));
  if (jQuery(".scroll-down-message").length > 0) {
    var scrollDownOpacity = parseFloat(jQuery(".scroll-down-message").css("opacity").replace(",", ".").replace(" ", ""));
  }

  jQuery(window).load(function ($) {
    var headerHeight = jQuery("header").height();

    /* Check if sticky on load */
    if (jQuery(".sticky-header").length > 0) {
      headerStickyOnLoad = true;
    }
    if (jQuery(".sticky-footer").length > 0) {
      footerStickyOnLoad = true;
    }

    /* BUGFIX for revolutionslider when header shrinks */
    if (jQuery("#pseudo-header").length < 1) {
      jQuery("body").append('<div id="pseudo-header"></div>');
    }

    initHeader();
  });

  jQuery(window).resize(function () {
    initHeader();
  });

  function initHeader() {
    var headerHeight = jQuery("header").height();
    var borderWidthHeight = parseInt(jQuery("#page-content").css("padding-top"));

    if (jQuery(".non-overlay").length > 0) {
      jQuery("#pseudo-header").css({
        height: headerHeight + borderWidthHeight * 2 + "px",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0,
      });
    } else {
      jQuery("#pseudo-header").css({
        height: borderWidthHeight * 2 + "px",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0,
        "z-index": "-1",
      });
      if (jQuery("header.overlay-bottom").length > 0) {
        setTimeout(function () {
          var offsetTop = parseInt(jQuery("#page-content section").first().height() - headerHeight + borderWidthHeight);
          jQuery("header").css({ top: offsetTop + "px" });
        }, 500);
      }
      headerOverlay = true;
    }

    /* Bugfix for browser don't allow calc(100vh-**) */
    if (jQuery(".full-height").length > 0) {
      jQuery(".full-height").css({ "min-height": jQuery(window).height() - borderWidthHeight - borderWidthHeight + "px" });
    }
    if (jQuery(".fullscreen-slider-item").length > 0) {
      if (
        parseInt(jQuery(".fullscreen-slider-item").css("height")) > jQuery(window).height() - borderWidthHeight - borderWidthHeight + 1 ||
        parseInt(jQuery(".fullscreen-slider-item").css("height")) < jQuery(window).height() - borderWidthHeight - borderWidthHeight - 1
      ) {
        jQuery(".fullscreen-slider-item").css({ "min-height": jQuery(window).height() - borderWidthHeight - borderWidthHeight + "px" });
      }
    }

    /* Footer */
    if (jQuery(window).width() < 861) {
      jQuery("footer.sticky-light").removeClass("text-light");
    } else {
      jQuery("footer.sticky-light").addClass("text-light");
    }
  }

  jQuery(window).scroll(function () {
		fixHeader();
  });

  function fixHeader() {
    var scrollTopPos = jQuery(window).scrollTop();

    if (jQuery("header.non-sticky").length < 1 && jQuery("#page-loader").css("display") !== "block") {
      if (headerOverlay) {
        if (jQuery("header.overlay-bottom").length < 1) {
					headerTopPos = 0 + borderWidthHeight;
        } else {
					headerTopPos = jQuery("#page-content section").first().height() + borderWidthHeight - headerHeight;
        }
			} else {
				if (borderWidthHeight === 0) {
					headerTopPos = 0 + headerHeight;
				} else {
					headerTopPos = 0 + borderWidthHeight;
				}
			}

      if (scrollTopPos - borderWidthHeight >= headerTopPos) {
        jQuery("header").addClass("sticky-header");
        if (jQuery("#sticky-header-pseudo").length < 1 && !headerOverlay) {
          jQuery("header").before('<div id="sticky-header-pseudo"></div>');
          jQuery("#sticky-header-pseudo").css({
            height: headerHeight + "px",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            "z-index": "-1",
          });
        } else if (headerOverlay) {
          jQuery("#sticky-header-pseudo").remove();
        }

        // Animate Footer if border is active
        if (borderWidthHeight > 0 && !footerStickyOnLoad) {
          jQuery("footer").addClass("sticky-footer");
        }
      } else {
        jQuery("header").removeClass("sticky-header");
        //jQuery('header.overlay-bottom').css({ 'top':headerTopPos+'px' });
        if (jQuery("#sticky-header-pseudo").length > 0 && !headerOverlay) {
          jQuery("#sticky-header-pseudo").remove();
        }
        // Animate Footer if border is active
        if (borderWidthHeight > 0 && !footerStickyOnLoad) {
          jQuery("footer").removeClass("sticky-footer");
        }
      }
    } else if (jQuery("header.non-sticky").length > 0 || (headerStickyOnLoad && !footerStickyOnLoad && borderWidthHeight > 0)) {
      // Footer Sticky
      if (jQuery(window).scrollTop() > headerHeight + borderWidthHeight) {
        jQuery("footer").addClass("sticky-footer");
      } else {
        jQuery("footer").removeClass("sticky-footer");
      }
    }

    if (footerStickyOnLoad && borderWidthHeight > 0) {
      if (jQuery(window).scrollTop() > 400) {
        jQuery("footer #backtotop").addClass("show");
      } else {
        jQuery("footer #backtotop").removeClass("show");
      }
    }

    // Scroll Down Opacity
    if (jQuery(".scroll-down-message").length > 0) {
      if (scrollTopPos < 700) {
        var op = scrollTopPos / 1000;
        var op = scrollDownOpacity - op * 1.1;
        jQuery(".scroll-down-message").css({ opacity: op.toFixed(2) });
      } else {
        jQuery(".scroll-down-message").css({ opacity: 0 });
      }
    }
  }
})(jQuery);
