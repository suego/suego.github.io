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
// File name: app.js
// ------------------------------------------------

// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  1. SVG Fallback
//  2. Chrome Smooth Scroll
//  3. Images moving ban
//  4. PhotoSwipe Gallery Images Replace
//  5. Menu Images Hover Function
//  6. Main Menu & Sections Behavior
//  7. Popups Behavior
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

$(function() {

  // SVG Fallback
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {
  };

  // Images moving ban
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });

  // PhotoSwipe Gallery Images Replace
  $('.my-gallery__link')
    // Background set up
    .each(function(){
    $(this)
    // Add a photo container
    .append('<div class="picture"></div>')
    // Set up a background image for each link based on data-image attribute
    .children('.picture').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
  });

  // Menu Images Hover Function
  hoverPhoto();
  photoMenu();
  function hoverPhoto() {
    $(".navigation li a").on("mouseenter", function() {
      var ref = $(this).data("ref"),
        menuPhoto = $('.photo-hover[data-ref="' + ref + '"]');
      $(".navigation li a").removeClass("active");
      $(this).addClass("active");
      $(".photo-hover").removeClass("active");
      menuPhoto.addClass("active");
    });
  }
  function photoMenu() {
    $("[data-bg]").each(function() {
      var bg = $(this).data("bg");
      $(this).css({
        "background-image": 'url(' + bg + ')',
        "background-position": "center center",
        "background-size": "cover"
      });
    });
  }

  // Main Menu & Sections Behavior
  // Declaring Variables
  var menuTrigger              = $('#menu-trigger'),
      menuClose                = $('#menu-close'),
      menu                     = $('#menu'),
      homeTrigger              = $('#home-trigger'),
      homeSection              = $('#main'),
      aboutSection             = $('#about'),
      aboutTrigger             = $('#about-trigger'),
      aboutClose               = $('#about-close'),
      servicesSection          = $('#services'),
      servicesTrigger          = $('#services-trigger'),
      servicesClose            = $('#services-close'),
      portfolioSection         = $('#portfolio'),
      portfolioTrigger         = $('#portfolio-trigger'),
      portfolioClose           = $('#portfolio-close'),
      contactSection           = $('#contact'),
      contactTrigger           = $('#contact-trigger'),
      contactClose             = $('#contact-close'),
      notify                   = $('#notify'),
      notifyTrigger            = $('#notify-trigger'),
      notifyClose              = $('#notify-close'),
      writealine               = $('#writealine'),
      writealineTrigger        = $('#writealine-trigger'),
      writealineTriggerContact = $('#writealine-trigger-contact'),
      writealineClose          = $('#writealine-close');

  // Menu Open
  menuTrigger.on('click', function(event){
    event.preventDefault();
    menu.addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      menuClose.addClass('is-visible');
    });
    if($('html').hasClass('no-csstransitions')) {
      menuClose.addClass('is-visible');
    }
  });

  // Menu Close
  menuClose.on('click', function(event){
    event.preventDefault();
    menuClose.removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      menu.removeClass('is-visible');
    });
    if($('html').hasClass('no-csstransitions')) {
      menu.removeClass('is-visible');
    }
  });

  // Home Trigger Action (Close the Menu)
  homeTrigger.on('click', function(event){
    event.preventDefault();
    $('.visible-section').removeClass('animate-in visible-section is-visible animate-out');
    menuClose.removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      menu.removeClass('is-visible');
    });
    if($('html').hasClass('no-csstransitions')) {
      menu.removeClass('is-visible');
    }
  });

  // About Section Open
  aboutTrigger.on('click', function(event) {
    event.preventDefault();
    $('.visible-section').removeClass('animate-in is-visible animate-out');
    $('.visible-section').removeClass('visible-section');
    menuClose.removeClass('is-visible');
    setTimeout(function(){
      aboutSection.addClass('visible-section is-visible animate-in');
      menu.removeClass('is-visible');
    }, 100);
  });

  // About Section Close
  aboutClose.on('click', function(event) {
    event.preventDefault();
    aboutSection.addClass('animate-out');
    setTimeout(function(){
      aboutSection.removeClass('animate-out visible-section is-visible animate-in');
      $('.photo-hover, .navigation li a').removeClass('active');
      $('.photo-home, #home-trigger').addClass('active');
    }, 600);
  });

  // Services Section Open
  servicesTrigger.on('click', function(event) {
    event.preventDefault();
    $('.visible-section').removeClass('animate-in is-visible animate-out');
    $('.visible-section').removeClass('visible-section');
    menuClose.removeClass('is-visible');
    setTimeout(function(){
      servicesSection.addClass('visible-section is-visible animate-in');
      menu.removeClass('is-visible');
    }, 100);
  });

  // Services Section Close
  servicesClose.on('click', function(event) {
    event.preventDefault();
    servicesSection.addClass('animate-out');
    setTimeout(function(){
      servicesSection.removeClass('animate-out visible-section is-visible animate-in');
      $('.photo-hover, .navigation li a').removeClass('active');
      $('.photo-home, #home-trigger').addClass('active');
    }, 600);
  });

  // Portfolio Section Open
  portfolioTrigger.on('click', function(event) {
    event.preventDefault();
    $('.visible-section').removeClass('animate-in is-visible animate-out');
    $('.visible-section').removeClass('visible-section');
    menuClose.removeClass('is-visible');
    setTimeout(function(){
      portfolioSection.addClass('visible-section is-visible animate-in');
      menu.removeClass('is-visible');
    }, 100);
  });

  // Portfolio Section Close
  portfolioClose.on('click', function(event) {
    event.preventDefault();
    portfolioSection.addClass('animate-out');
    setTimeout(function(){
      portfolioSection.removeClass('animate-out visible-section is-visible animate-in');
      $('.photo-hover, .navigation li a').removeClass('active');
      $('.photo-home, #home-trigger').addClass('active');
    }, 600);
  });

  // Contact Section Open
  contactTrigger.on('click', function(event) {
    event.preventDefault();
    $('.visible-section').removeClass('animate-in is-visible animate-out');
    $('.visible-section').removeClass('visible-section');
    menuClose.removeClass('is-visible');
    setTimeout(function(){
      contactSection.addClass('visible-section is-visible animate-in');
      menu.removeClass('is-visible');
    }, 100);
  });

  // Contact Section Close
  contactClose.on('click', function(event) {
    event.preventDefault();
    contactSection.addClass('animate-out');
    setTimeout(function(){
      contactSection.removeClass('animate-out visible-section is-visible animate-in');
      $('.photo-hover, .navigation li a').removeClass('active');
      $('.photo-home, #home-trigger').addClass('active');
    }, 600);
  });

  // Popups Behavior
  notifyTrigger.on('click', function(event) {
    event.preventDefault();
    notify.addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      notifyClose.addClass('is-visible');
    });
  });

  notifyClose.on('click', function(event) {
    event.preventDefault();
    notifyClose.removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      notify.removeClass('is-visible');
    });
  });

  writealineTrigger.on('click', function(event) {
    event.preventDefault();
    writealine.addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      writealineClose.addClass('is-visible');
    });
  });

  writealineTriggerContact.on('click', function(event) {
    event.preventDefault();
    writealine.addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      writealineClose.addClass('is-visible');
    });
  });

  writealineClose.on('click', function(event) {
    event.preventDefault();
    writealineClose.removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      writealine.removeClass('is-visible');
    });
  });

});
