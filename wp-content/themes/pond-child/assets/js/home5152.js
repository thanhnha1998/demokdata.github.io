jQuery(document).ready(function () {

    jQuery('#banner-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        lazy: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1024: {
                items: 1,
            },
        }
    });
    jQuery('#service-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1024: {
                items: 1,
            },
        }
    });
    jQuery('#testimonial-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1024: {
                items: 2,
            },
            1200: {
                items: 3,
            },
        }
    });
    jQuery('#project-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1024: {
                items: 1,
            },
        }
    });
    jQuery('#reason-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1024: {
                items: 1,
            },
        }
    });
    jQuery('#quy-trinh-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1024: {
                items: 1,
            },
        }
    });

});

// fix bug CLS
jQuery("#banner-carousel").on("initialized.owl.carousel", () => {
    setTimeout(() => {
        jQuery(".overlay-content").fadeIn();
    }, 1000);
});