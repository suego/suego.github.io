jQuery(document).ready(function($) {

      // Main Layout Animating Js
      var animating = false;

      function menuToggle() {
        $(".angels-wrapper_page, .main-content, .angels-wrapper_menu").toggleClass("menu-active");
        $(".js-menuBtn").toggleClass("m--btn");
        $(document).off("click", ".angels-wrapper_content", closeNotFocusedMenu);
      }

      function closeNotFocusedMenu(e) {
        if (!$(e.target).closest(".angels-wrapper_menu").length) {
         menuToggle();
       }
     }

     $(document).on("click", ".js-menuBtn", function() {
      if (animating) return;
      menuToggle();
      $(document).on("click", ".angels-wrapper_content", closeNotFocusedMenu);
    });

     $(document).on("click", ".angels-menu-item:not(.js-menuBtn)", function() {
      animating = true;
      var $this = $(this);
      var page = +$this.data("page");
      $(".js-menuBtn").removeClass("js-menuBtn");
      $(".angels-wrapper_page.active").removeClass("active");
      $this.addClass("js-menuBtn m--btn");
      $(".angels-wrapper_page-" + page).addClass("active");
      $(".angels-wrapper_page, .main-content, .angels-wrapper_menu").removeClass("menu-active");
      $(document).off("click", ".angels-wrapper_content", closeNotFocusedMenu);
      setTimeout(function() {
       $(".angels-wrapper_menu")[0].className = $(".angels-wrapper_menu")[0].className.replace(/\bpage-active-.*\b/gi, "");
       $(".angels-wrapper_menu").addClass("page-active-" + page);
       animating = false;
     }, 1000);
    });

   });