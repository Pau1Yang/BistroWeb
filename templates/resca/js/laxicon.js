/*!
 * laxicon.js v1.4
 * Crazy simple parallaxing
 * Jeannie Stevenson
 * @JSDesign (github)
 * Licensed under the MIT license
 */

(function($) {

    'use strict';

    $.fn.laxicon = function(options) {

        // declare default options
        var settings = $.extend({
            speed: 0.15,
            //bgImgPath: 'https://download.unsplash.com/photo-1434145175661-472d90344c15',
            bgXPos: 'center',
            bgSize: 'inherit',
            bgRepeat: 'no-repeat',
            overlay: false,
            overlayType: 'shade',
            overlayPatternPath: 'http://16secondstare.com/admin/wp-content/themes/rockit1/images/pattern/pattern5-bg.png',
            breakpoint: 769
        }, options);

        return this.each( function() {
            // set "this" to a variable
            var $element = $(this);
            // initialize some empty variables
            var xPos,
                windowHeight,
                winScrollTop,
                elemOffsetTop,
                elemHeight,
                bgImage;

            // set xPos variable to default background x position setting
            xPos = settings.bgXPos;

            if ($(window).width() >= settings.breakpoint) {

                $(window).on('load resize scroll', function() {

                    // constantly set variables for math
                    windowHeight = $(window).height();
                    winScrollTop = $(window).scrollTop();
                    elemOffsetTop = $element.offset().top;
                    elemHeight = $element.outerHeight();

                    // if above or below viewport, stop
                    if (elemOffsetTop + elemHeight <= winScrollTop || elemOffsetTop >= winScrollTop + windowHeight) {
                        return;
                    }

                    // css for tint, shade, or none
                    function setCSS1() {
                        $element.css({
                            //backgroundImage: bgImage,
                            backgroundPosition: xPos + ' ' + (Math.round((elemOffsetTop - winScrollTop) * settings.speed)) + 'px',
                            //backgroundSize: settings.bgSize,
                            backgroundRepeat: settings.bgRepeat,
                            backgroundAttachment: 'fixed'
                        });
                    }

                    // css for pattern
                    function setCSS2() {
                        $element.css({
                            //backgroundImage: bgImage,
                            backgroundPosition: 'top left, ' + xPos + ' ' + (Math.round((elemOffsetTop - winScrollTop) * settings.speed)) + 'px',
                            //backgroundSize: 'auto, ' + settings.bgSize,
                            backgroundRepeat: 'repeat, ' + settings.bgRepeat,
                            backgroundAttachment: 'fixed'
                        });
                    }

                    // if overlay
                    if (settings.overlay === true) {
                        if (settings.overlayType === 'shade') {
                            bgImage = 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(' + settings.bgImgPath + ')';
                            setCSS1();
                        } else if (settings.overlayType === 'tint') {
                            bgImage = 'linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.6) 100%), url(' + settings.bgImgPath + ')';
                            setCSS1();
                        } else if (settings.overlayType === 'pattern') {
                            bgImage = 'url(' + settings.overlayPatternPath + '), url(' + settings.bgImgPath + ')';
                            setCSS2();
                        }
                    } else {
                        bgImage = 'url(' + settings.bgImgPath + ')';
                        setCSS1();
                    }

                });

            } else {

                $(window).on('load resize scroll', function() {

                   // constantly set variables for math
                    windowHeight = $(window).height();
                    winScrollTop = $(window).scrollTop();
                    elemOffsetTop = $element.offset().top;
                    elemHeight = $element.outerHeight();

                    // if above or below viewport, stop
                    if (elemOffsetTop + elemHeight <= winScrollTop || elemOffsetTop >= winScrollTop + windowHeight) {
                        return;
                    }

                    // css for tint, shade, or none
                    function setCSS3() {
                        $element.css({
                            //backgroundImage: bgImage,
                            backgroundPosition: xPos + ' top',
                            backgroundSize: 'auto 100%',
                            backgroundRepeat: settings.bgRepeat,
                            // for now :(
                            backgroundAttachment: 'scroll'
                        });
                    }

                    // css for pattern
                    function setCSS4() {
                        $element.css({
                            //backgroundImage: bgImage,
                            backgroundPosition: 'top left, ' + xPos + ' top',
                            backgroundSize: 'auto, auto 100%',
                            backgroundRepeat: 'repeat, ' + settings.bgRepeat,
                            // for now :(
                            backgroundAttachment: 'scroll'
                        });
                    }

                    // if overlay
                    if (settings.overlay === true) {
                        if (settings.overlayType === 'shade') {
                            bgImage = 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(' + settings.bgImgPath + ')';
                            setCSS3();
                        } else if (settings.overlayType === 'tint') {
                            bgImage = 'linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.6) 100%), url(' + settings.bgImgPath + ')';
                            setCSS3();
                        } else if (settings.overlayType === 'pattern') {
                            bgImage = 'url(' + settings.overlayPatternPath + '), url(' + settings.bgImgPath + ')';
                            setCSS4();
                        }
                    } else {
                        bgImage = 'url(' + settings.bgImgPath + ')';
                        setCSS3();
                    }

                });

            }

        }); // end plugin loop

    }; // end plugin function

}(jQuery));
