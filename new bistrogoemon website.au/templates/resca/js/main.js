/**
 * @package Helix3 Framework
 * @author JoomShaper http://www.joomshaper.com
 * @copyright Copyright (c) 2010 - 2015 JoomShaper
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
 */
jQuery(function ($) {

	//Sticky Menu
	//var j = $.noConflict();
	//j("body.sticky-header").find('#sp-header').sticky({topSpacing: 0})

	//popup gallery & product
	if($(window).width()>1024) {
		$("a.example_group").colorbox({className: "box_gallery"});
		$(".pg-inline-popup").colorbox({inline:true, width:"60%", className: "box_inline"});
	} else {
		$("a.example_group").colorbox({className: "box_gallery", width:"90%",});
		$(".pg-inline-popup").colorbox({inline:true, width:"90%", className: "box_inline"});
	}

	//tabs detail product
	$('.productdetails .virtuemart-tabs ul.vm-tabs li a').click(function(){
		if(!$(this).hasClass('active')) {
			$('.productdetails ul.vm-tabs li.active').removeClass('active');
			$(this).parent().addClass('active');
			$('.productdetails .wc-tab.active').removeClass('active');
			$($(this).attr('href')).addClass('active');
		}
		return false;
	});

	//tabs on cart
	$('h3.title_header').click(function(){
		$(this).parent().find('.content_group').slideToggle();
	});

	var $body = $('body'),
		$wrapper = $('.body-innerwrapper'),
		$toggler = $('#offcanvas-toggler'),
		$close = $('.close-offcanvas'),
		$offCanvas = $('.offcanvas-menu');

	$toggler.on('click', function (event) {
		event.preventDefault();
		stopBubble(event);
		setTimeout(offCanvasShow, 50);
	});

	$close.on('click', function (event) {
		event.preventDefault();
		offCanvasClose();
	});

	var offCanvasShow = function () {
		$body.addClass('offcanvas');
		$wrapper.on('click', offCanvasClose);
		$close.on('click', offCanvasClose);
		$offCanvas.on('click', stopBubble);

	};

	var offCanvasClose = function () {
		$body.removeClass('offcanvas');
		$wrapper.off('click', offCanvasClose);
		$close.off('click', offCanvasClose);
		$offCanvas.off('click', stopBubble);
	};

	var stopBubble = function (e) {
		e.stopPropagation();
		return true;
	};

	//Mega Menu
	$('.sp-megamenu-wrapper').parent().parent().css('position', 'static').parent().css('position', 'relative');
	$('.sp-menu-full').each(function () {
		$(this).parent().addClass('menu-justify');
	});



	//Tooltip
	$('[data-toggle="tooltip"]').tooltip();

	$(document).on('click', '.sp-rating .star', function (event) {
		event.preventDefault();

		var data = {
			'action': 'voting',
			'user_rating': $(this).data('number'),
			'id': $(this).closest('.post_rating').attr('id')
		};

		var request = {
			'option': 'com_ajax',
			'plugin': 'helix3',
			'data': data,
			'format': 'json'
		};

		$.ajax({
			type: 'POST',
			data: request,
			beforeSend: function () {
				$('.post_rating .ajax-loader').show();
			},
			success: function (response) {
				var data = $.parseJSON(response.data);

				$('.post_rating .ajax-loader').hide();

				if (data.status == 'invalid') {
					$('.post_rating .voting-result').text('You have already rated this entry!').fadeIn('fast');
				} else if (data.status == 'false') {
					$('.post_rating .voting-result').text('Somethings wrong here, try again!').fadeIn('fast');
				} else if (data.status == 'true') {
					var rate = data.action;
					$('.voting-symbol').find('.star').each(function (i) {
						if (i < rate) {
							$(".star").eq(-(i + 1)).addClass('active');
						}
					});

					$('.post_rating .voting-result').text('Thank You!').fadeIn('fast');
				}

			},
			error: function () {
				$('.post_rating .ajax-loader').hide();
				$('.post_rating .voting-result').text('Failed to rate, try again!').fadeIn('fast');
			}
		});
	});



    $(window).scroll(function () {
		var $header = $('#sp-header');
        var $logo_site = $('#logo_after_scroll');
        if ($(this).scrollTop() > 2) {
            $header.addClass('affix_down');
            //$header.removeClass('affix-top');
            $logo_site.addClass('logo_after_scroll');
            $logo_site.removeClass('visible-xs');
        } else {
            $header.removeClass('affix_down');
            //$header.addClass('affix-top');
            $logo_site.addClass('visible-xs');
            $logo_site.removeClass('logo_after_scroll');
        }



    });

	/*-----------------------------------------------------------------------------------*/
	/* Parallax
	 /*-----------------------------------------------------------------------------------*/
	if($(window).width()>1200) {
		$('.sp-parallax').laxicon();
	}

	skrollr.init({
		forceHeight: false,
		mobileCheck: function(){
			if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
				//alert('mobile');
				//setScrollTop(0);
				//Where should I set setScrollTop(0); ???
			}
		}
	});

	if($(window).width()<=1200) {
		$('.sp-module.resca_cart').click(function () {
			$(this).find('.shopping_cart_content').toggleClass('active');
		});
		/*
		$('.vm-product-horizon .product__title form.product .sp-addtocart-button').click(function () {
			$(this).toggleClass('active');
		});
		*/

	}

	// Parallax for box banner title
	if($(window).width()>1200) {
		$('.parallax_box').css('background-image', 'url(' + $('.parallax_box').find('img').css('opacity','0').attr('src') + ')');
		$('.sp-page-title').css('background-image', 'url(' + $('.sp-page-title').find('img').css('opacity','0').attr('src') + ')');
	}

	// Parallax for carouse slider
	if($('.sp-parallax .carousel_parralax').length) {
		if($(window).width()>1200) {
			//$('.sp-parallax .carousel_parralax .sppb-item').height($(window).height());
			$('.sp-parallax .carousel_parralax').height($(window).height());
			$('.full_screen .sppb-carousel-inner > .sppb-item').height($(window).height());
		} else if($(window).width()>481) {
			//$('.sp-parallax .carousel_parralax .sppb-item').height(350);
			$('.sp-parallax .carousel_parralax').height(500);
		} else {
			$('.sp-parallax .carousel_parralax').height(350);
		}

		$(window).on('load resize scroll', function() {
			// constantly set variables for math
			windowHeight = $(window).height();
			winScrollTop = $(window).scrollTop();
			elemOffsetTop = $('.sp-parallax').offset().top;
			elemHeight = $('.sp-parallax').outerHeight();
			// if above or below viewport, stop
			if (elemOffsetTop + elemHeight <= winScrollTop || elemOffsetTop >= winScrollTop + windowHeight) {
				return;
			}
			$('.sp-parallax .carousel_parralax .carousel_wrap').css({
				top: (Math.round((winScrollTop - elemOffsetTop) * 0.15)) + 'px',
			});
		});
	}

	if($('.sppb-section.video_fullscreen').length) {
		if($(window).width()>1200) {
			$('.sppb-section.video_fullscreen').height($(window).height());
		}
	}



	$('input.ob_foobla_date').datepicker();

	if($('#video_back').length) {
		var video = document.getElementById('video_back');
		$('.bg-video-play').click(function(){
			if (video.paused) {
				video.play();
				$('.bg-video-play').addClass('bg-pause');
			} else {
				video.pause();
				$('.bg-video-play').removeClass('bg-pause');
			}
			return false;
		});
	}

	$('.onepage .offcanvas-inner ul li a').click(function(){
		$('.onepage.offcanvas').removeClass('offcanvas');
	});
	$('.onepage #sp-menu a, .onepage .offcanvas-inner ul li a').smoothScroll({
		speed: 800,
		offset: -70
	});

	if(jQuery('body').hasClass('onepage')) {
		jQuery('#sp-menu li:first-child').addClass('active');
	}
	$('.onepage #sp-menu ul').onePageNav({
		currentClass: 'active',
		filter: ':not(.external)'
	});

});

