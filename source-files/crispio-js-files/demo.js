// ------------------------------------------------
// Project Name: Crispio - Coming Soon & Landing Page Template for Creatives
// Project Description: Crispio is bold and creative coming soon, personal portfolio and landing page HTML template and fits perfectly for everyone in the creative industry.
// Tags: mix_design, crispio, coming soon, under construction, template, coming soon page, landing page, one page, html5, css3
// Version: 2.0.1
// Build Date: April 2019
// Last Update: December 2022
// This product is available exclusively on Themeforest
// Author: mix_design
// Author URI: https://themeforest.net/user/mix_design
// File name: demo.js
// ------------------------------------------------

// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  1. Loader & Main Section Loading Animation
//  2. Background-attachment: fixed Solution for IE
//  3. SVG Fallback
//  4. Chrome Smooth Scroll
//  5. Images Moving Ban
//  6. Fullscreen Layout
//  7. Smooth Scroll To Top
//  8. Smooth Scroll To Section
//  6. Mailchimp Subscribition Form
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

$(window).on("load", function() {

  "use strict";

  // --------------------------------------------- //
  // Loader & Main Section Loading Animation Start
  // --------------------------------------------- //
  setTimeout(function(){
    $(".loader-logo").removeClass('animate-in').addClass('animate-out');
  },800);

  setTimeout(function(){
    $('body').removeClass('overflow-hidden').addClass('loaded');
    $(".loader").addClass('fade loaded');
  },1600);
  // --------------------------------------------- //
  // Loader & Main Section Loading Animation Start
  // --------------------------------------------- //

});

$(document).ready(function() {

  // ----------------------------------------------- //
  // Background-attachment: fixed Solution for IE Start
  // ----------------------------------------------- //
  if(navigator.userAgent.match(/Trident\/7\./)) {
    $('body').on("mousewheel", function () {
        event.preventDefault();

        var wheelDelta = event.wheelDelta;

        var currentScrollPosition = window.pageYOffset;
        window.scrollTo(0, currentScrollPosition - wheelDelta);
    });

    $('body').keydown(function (e) {
          e.preventDefault(); // prevent the default action (scroll / move caret)
          var currentScrollPosition = window.pageYOffset;

          switch (e.which) {

              case 38: // up
                  window.scrollTo(0, currentScrollPosition - 120);
                  break;

              case 40: // down
                  window.scrollTo(0, currentScrollPosition + 120);
                  break;

              default: return; // exit this handler for other keys
          }
      });
  }
  // --------------------------------------------- //
  // Background-attachment: fixed Solution for IE End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // SVG Fallback Start
  // --------------------------------------------- //
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };
  // --------------------------------------------- //
  // SVG Fallback End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Chrome Smooth Scroll Start
  // --------------------------------------------- //
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {
  };
  // --------------------------------------------- //
  // Chrome Smooth Scroll End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Images Moving Ban Start
  // --------------------------------------------- //
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });
  // --------------------------------------------- //
  // Images Moving Ban End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Fullscreen Layout Start
  // --------------------------------------------- //
  function fullscreenLayout() {
    $(".fullscreen").css({
        height: $(window).height()
    });
  };
  fullscreenLayout();
  $(window).resize(function(){
    fullscreenLayout();
  });
  // --------------------------------------------- //
  // Fullscreen Layout End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Smooth Scroll To Top Start
  // --------------------------------------------- //
  var offset = 300,
      offset_opacity = 1200,
      scroll_top_duration = 500,
      $back_to_top = $('.to-top');

	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('is-visible') : $back_to_top.removeClass('is-visible fade-out');
		if( $(this).scrollTop() > offset_opacity ) {
			$back_to_top.addClass('fade-out');
		}
	});

	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
  // --------------------------------------------- //
  // Smooth Scroll To Top End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Smooth Scroll To Section Start
  // --------------------------------------------- //
  var scrollToPreview = $('.scroll-to-preview');

  scrollToPreview.on('click', function(event){
    event.preventDefault();
    smoothScroll($(this.hash));
  });

  function smoothScroll(target){
    $('body,html').animate({
      scrollTop: target.offset().top,
    }, 500);
  };
  // --------------------------------------------- //
  // Smooth Scroll To Section End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Mailchimp Subscribition Form Start
  // --------------------------------------------- //
  $('.subscribe-form').ajaxChimp({
    callback: mailchimpCallback,
    url: 'https://besaba.us10.list-manage.com/subscribe/post?u=e8d650c0df90e716c22ae4778&amp;id=b382fff780'
  });

  function mailchimpCallback(resp) {
    if(resp.result === 'success') {
      $('.subscribe__container').find('.form').addClass('is-hidden');
      $('.subscribe__container').find('.subscription-ok').addClass('is-visible');
      setTimeout(function() {
        // Done Functions
        $('.subscribe__container').find('.subscription-ok').removeClass('is-visible');
        $('.subscribe__container').find('.form').delay(300).removeClass('is-hidden');
        $('.subscribe-form').trigger("reset");
      }, 5000);
    } else if(resp.result === 'error') {
      $('.subscribe__container').find('.form').addClass('is-hidden');
      $('.subscribe__container').find('.subscription-error').addClass('is-visible');
      setTimeout(function() {
        // Done Functions
        $('.subscribe__container').find('.subscription-error').removeClass('is-visible');
        $('.subscribe__container').find('.form').delay(300).removeClass('is-hidden');
        $('.subscribe-form').trigger("reset");
      }, 5000);
    }
  };
  // --------------------------------------------- //
  // Mailchimp Subscribition Form End
  // --------------------------------------------- //

});
