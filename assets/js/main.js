//****************************************************************************/
//	Variables
//****************************************************************************/
var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))? true : false;



//****************************************************************************/
//    Main Document Ready
//****************************************************************************/
(function($){
	$(document).ready(function() {

		//*** Services Switcher: Keep page location between sites *************************//
		// $('.services-menu a').click(function(e){
		// 	var currentPath = window.location.pathname
		// 	var pathEnd = currentPath.split('/');
		// 	pathSlug = pathEnd[pathEnd.length-1];

		// 	if(pathSlug != 'index'){
		// 		e.preventDefault();
		// 		var newHref = $(this).attr('href').split('/');
		// 		var newSite = newHref[1];

		// 		window.location = window.location.origin + '/' + newSite + '/' + pathSlug;
		// 	}
		// });

		if(!mobile && $(window).width() >= 650){
			$('.services-menu-button').hover(function(){
				$('.services-menu').addClass('active');
			},function(){
				setTimeout(function(){
					$('.services-menu').removeClass('active');
				},700);
			});
		}else{
			$('.services-menu-button').click(function(){
				$('.services-menu').toggleClass('mobile-active');
				$('#menu-wrapper,#menu-icon').removeClass('active');
				$('#nav').css('display','none');
			});
		}
		
		// add chownow link to S3 Web Strategy
		$('.subpage.web #nav').append('<li class="menulink"><a href="#">Free Consult</a></li>');

		//*** Telephone holder *************************//
		var helper = $('.consultation-helper');
		$(window).scroll(function(){
			if($(this).scrollTop() >= 100 && !helper.hasClass('small')){
				helper.addClass('small');
			}else if($(this).scrollTop() < 100 && helper.hasClass('small')){
				helper.removeClass('small');
			}
		});

		//*** Scroller *************************//
		$('.scroll').click(function(e){
			e.preventDefault();
			var nextSection = $(this).parents('section').next();
			if(nextSection.length == 0){
				nextSection = $('.prefooter');
			}
			$.scrollTo(nextSection,800,{easing:'easeOutExpo'});
		});


		/* BX Slider */
		if( $('.flash-gallery li').length > 1 ){
			$('.flash-gallery').bxSlider({
			  mode: 'fade',
			  controls: true,
			  pager: true,
			  auto: true,
			  autoStart: true,
			  pause: 6000,
			  touchEnabled: false
			});
		}else{
			$('.flash-gallery').bxSlider({
			  mode: 'fade',
			  controls: false,
			  pager: false,
			  auto: false,
			  pause: 6000,
			  adaptiveHeight: true,
			  touchEnabled: false
			});
		}


		//*** Sections Height *************************//
		if(!mobile){
			$('.image-left,.image-right').fullViewport();
		}
		$('.image-center').fullViewport({bottom:60});
		

		/* StickyStack.js */
		if ((!mobile) && ( $('.menu-page').length === 0 ) && $('.events-section').length === 0 && $('.content').length === 0) {
			$('.main-content-wrapper').stickyStack();
		}

		/* Wrap youtube iframes in a fitvids wrapper automatically */
		$('iframe[src*="youtube"]').each(function() {
			$(this).wrap('<div class="fitvids" style="max-width: ' + $(this).width + 'px;"></div>');
		});


		/* equalHeightColumns */
		$('.column').equalHeightColumns();

		$('.image-circle, .image-circle-events').each(function(){
			$(this).find($('.left-content, .right-content')).equalHeightColumns();
		});

		//*** Parallax *************************//
		if(!mobile){
			$('.parallax-bg').parallaxBackground({speed:-.5});
		}
		

		//*** inview *************************//
		if (!mobile) {
			$('.main-content-wrapper section h1,.main-content-wrapper section h2').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			  if (isInView) {  
			  	$(this).parents('section').addClass('active');
			  } else {
			  	// $(this).parents('section').removeClass('active');
			    // element has gone out of viewport
			  }
			});
		}else {
			$('.main-content-wrapper section h1,.main-content-wrapper section h2').parents('section').addClass('active');
		}


		/* SplitIntoColumns() */
		if ( $('.menu-listing').length > 0 ) {
			$('.menu-listing').splitIntoColumns({count:2});
		}
		$('#brunch-brunch ul').splitIntoColumns({count:3});

		//*** Events List *************************//
		if(!mobile){
			$('.event').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			  if (isInView) {
			    $(this).addClass('active');
			  } else {
			    // element has gone out of viewport
			  }
			});
		}else{
			$('.event').addClass('active');
		}


		// porthole colorboxes
		$('.porthole-image').on('click', function() {
			$.colorbox({
				href: $(this).attr('data-original'),
				maxWidth: '96%',
				maxHeight: '96%'
			});
		});

		$('.cb').colorbox({
			iframe: true,
			width: '480px',
			height: '290px',
			maxWidth: '90%',
			maxHeight: '90%'
		});


		//*** FancyForm Submit *************************//
		var thankYou = '<div class="jotform-form" id="thank-you-msg"><h2 class="center">Thank You!</h2><p class="center">Thank you for sending your request. We look forward to seeing if this is a good fit.</p></div>'
		$('#simpleform .sendit').click(function(){
			var form = $(this).parents('#simpleform');
			form.before(thankYou);
			form.hide();
			$.scrollTo('#thank-you-msg',1000,{easing:"easeOutExpo",'axis':'y'});
		});



		/* Food Menu Links */
		// $('.menu-categories > li > a').on('click', function(e) {
		// 	e.preventDefault();

		// 	var fadeThisIn = $(this).attr('href');
		// 	fadeThisIn = fadeThisIn.substring(1, fadeThisIn.length);

		// 	console.info('fadethisin = ' + fadeThisIn);

		// 	$('.body-wrap').fadeOut();
		// 	console.info('.' + fadeThisIn);
		// 	$('.' + fadeThisIn + '-body-wrap').fadeIn();
		// });

		
		//*** Menu Nav Slide out under 1000px *************************//
		var menuFixed = $('.menu-fixed');
		if(menuFixed.length != 0){
			$('.link21,.link15,.link9').hover(function(){
				menuFixed.addClass('active');
			},function(){
				setTimeout(function(){
					menuFixed.removeClass('active');
				},200);
			});
			if(mobile){
				$('.link21,.link15,.link9').on('touchstart',function(e){
					e.preventDefault();
					menuFixed.toggleClass('active');
				});
			}
		}

		//*** Food Menu Slide out *************************//
		if(!mobile){
			$('.menu-fixed').hover(function(){
				$(this).addClass('active');
			},function(){
				$(this).removeClass('active')
			});
		}else{
			$('.menu-fixed').on('click',function(){
				$(this).toggleClass('active');
			});
		}


		//*** Slide menu out after the page has loaded to show that a menu exists *************************//
		if(menuFixed.length > 0){
			setTimeout(function(){
				menuFixed.removeClass('active');
			},1400);
		}

		//*** Show the Correct Section if Hash is in the url on pageload *************************//
		if($('.menu-categories').length > 0){
			var hash = window.location.hash;
			
			if(hash != ''){
				var sections = hash.split("/");
				var scrollId = sections[0]+sections[1];

				//remove active state from all menu nav items
				$('.menu-categories > li').removeClass('active');
				//find the hash of the main category in the menu nav (ex. lunch, dinner, daily specials);
				var activeSection = $('.menu-categories a[href="'+scrollId+'"]').parents('li').last();

				setMenuNavAndPanel(activeSection);

				scrollToMenuSection(scrollId);
			}
		}

		//*** Food Menu Links *************************//
		$('.menu-categories > li a').on('click',function(e){
			
			e.preventDefault();
			
			$('.menu-categories > li').removeClass('active');
			var activeSection = $(this).parents('li').last();

			setMenuNavAndPanel(activeSection);

			var activeId = $(this).attr('href');

			var sectionName = activeId.split('#');
			var hash = "#/"+sectionName[1];
			window.location.hash = hash;

			scrollToMenuSection(activeId);

			//Virtual Page View on Menu section click
			_gaq.push(['_trackPageview', window.location.href+hash]);
		});

		function setMenuNavAndPanel(activeSection){
				//This function sets the top level section in the menu nav as active and then displays the correct panel in the content area
				activeSection = $(activeSection);
				activeSection.addClass('active');
				var activeSectionId = activeSection.find('> a').attr('href');

				$('.body-wrap').removeClass('active');
				$(activeSectionId).addClass('active');
		}

		function scrollToMenuSection(scrollId){
			//scroll to the section in the menu
			//$.scrollTo(scrollId,2400,{easing:"easeOutExpo",'axis':'y'});

			var currentPos = $(window).scrollTop();
			var newPos = $(scrollId).offset().top;

			$(window).off('scroll.Menu');

			$('html,body').stop().animate({
				scrollTop : newPos+'px'
			},2400,'easeOutExpo',function(){
				$(window).off('scroll.Menu');
			});

			//Stop auto scrolling if scrolled in opposite direction
			var lastScrollTop = currentPos;
			$(window).on('scroll.Menu',function(event){
				var st = $(this).scrollTop();
		   		if(newPos > currentPos){ //auto scrolling down
		   			if (st < lastScrollTop){
				       	$('html,body').stop(); //stop if scrolled up
				   	}
		   		}else{ //auto scrolling up
		   			if (st > lastScrollTop){
				       	$('html,body').stop(); //stop if scrolled down
				   	}
		   		}
			   lastScrollTop = st;
			});

		}

		//*** Food Menu Hide Single Items *************************//
		$('.menu-categories > li').each(function(){
			if($(this).find('li').length == 1){
				$(this).find('ul').hide();
			}
		});

		//*** Move Prices onto multiple lines *************************//
		$('.food-item-price').each(function(){
			var price = $(this).html();
			var newPrice = price.replace(/\,|;/g,"<br/>");
			newPrice = newPrice.replace(/bottle/gi,"BTL");
			$(this).html(newPrice);
		});

		//*** Food Menu Images Inview *************************//
		if(!mobile){
			$('.section-image').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			  if (isInView) {
			    // element is now visible in the viewport
			    $(this).addClass('active');
			  } else {
			    // element has gone out of viewport
			    $(this).removeClass('active');
			  }
			});
		}else{
			$('.section-image').addClass('active');
		}
		


		//*** Food Menu Functions for mobile *************************//
		$('.menu-title').on('click',function(){
			$('.menu-fixed').toggleClass('slide-up');
		});
		$('.menu-fixed a').on('click',function(){
			$('.menu-fixed').removeClass('slide-up');
			$('.menu-fixed').scrollTo('0');
		});

	});
})(jQuery);



//****************************************************************************/
//	Suego Custom Analytics Events
//****************************************************************************/
(function($){
	$(document).ready(function() {

		/* main navigation services menu in header */
		// menu-web
		$('.menu-web').gaEvent('click', 'Service Switcher Menu', 'Click', 'Web');
		// menu-brand
		$('.menu-brand').gaEvent('click', 'Service Switcher Menu', 'Click', 'Brand');
		// menu-market
		$('.menu-market').gaEvent('click', 'Service Switcher Menu', 'Click', 'Market');
		// menu-corp
		$('.menu-corporate').gaEvent('click', 'Service Switcher Menu', 'Click', 'Corporate');


		/* homepage view menu buttons */
		// view menu web
		$('.page_1 .column.web .btn').gaEvent('click', 'Homepage View Menu Button', 'Click', 'Web');
		// view menu brand
		$('.page_1 .column.brand .btn').gaEvent('click', 'Homepage View Menu Button', 'Click', 'Brand');
		// view menu market
		$('.page_1 .column.market .btn').gaEvent('click', 'Homepage View Menu Button', 'Click', 'Market');


		/* badges on homepage */
		// ot-dc-badge
		$('.to-dc-badge').gaEvent('click', 'Web Search Logo', 'Click');
		// award city search
		$('.award-city-search').gaEvent('click', 'Web Search Logo', 'click');


		// partner network link
		$('.partner-network').gaEvent('click', 'Partner Network link', 'Click', 'pageURL');

		// afiliate program link
		$('.affiliate-program').gaEvent('click', 'Affiliate Program link', 'Click', 'pageURL');


		// floating "contact us" ghost button
		$('.ghost').gaEvent('click', 'Floating Contact Us Button Top Right', 'click', 'pageURL');


		// prefooter consultation links
		// web
		$('.prefooter .service a.web, .prefooter .web .btn').on('click', function(e) {
			e.preventDefault();

			_gaq.push(['_trackEvent', 'Service Link - Web', 'Click']);

			var newURL = $(this).attr('href');

			window.setTimeout(function() {
				window.location = newURL;
			}, 300);
		});

		// brand
		$('.prefooter .service a.brand, .prefooter .brand .btn').on('click', function(e) {
			e.preventDefault();

			_gaq.push(['_trackEvent', 'Consultation Link - Brand', 'Click']);

			var newURL = $(this).attr('href');

			window.setTimeout(function() {
				window.location = newURL;
			}, 300);
		});

		// market
		$('.prefooter .service a.market, .prefooter .market .btn').on('click', function(e) {
			e.preventDefault();

			_gaq.push(['_trackEvent', 'Consultation Link - Market', 'Click']);

			var newURL = $(this).attr('href');

			window.setTimeout(function() {
				window.location = newURL;
			}, 300);
		});

	});
})(jQuery);



//****************************************************************************/
//	Standard Suego JS
//****************************************************************************/
(function($){
	$(function() {

		// Add href to category menu links that do not have an href and prevent click event.
		$('#nav a').each(function(){
			if($(this).attr('href') === undefined){
				$(this).css({'cursor':'default'});
				$(this).attr('href','#').click(function(e){
					e.preventDefault();
				});
			}
		});

		// MobileNav
		$('#menu-wrapper').mobileNav({
			breakPoint:			650,

			navBgColor:			'rgb(60, 131, 159)',
			navBgHover:			'rgb(0, 20, 64)',

			menuBgColor:		'rgba(255, 255, 247,.95)',
			menuBgHover:		'rgb(60, 131, 159)',

			menuTextColor:		'rgb(49, 49, 49)',
			menuDividerColor:	'rgb(0, 20, 64)',

			subMenuBgColor:		'rgb(237, 237, 237)'
		});

		$('#menu-icon').on('click',function(){
			$('.services-menu').removeClass('mobile-active');
		});

		// Form Sent Success msg=sent
		$('body').msgSent({
			variable: 'sent',
			message : 'Thank you for sending your request. We look forward to seeing if this is a great fit.',
			bgColor: 'rgb(42, 42, 42)',
			bgColorAlpha: 'rgba(42, 42, 42,.9)',
			borderRadius: '50%'
		});

		$('body').msgSent({
			variable: 'survey',
			message : 'Thank you for completing our survey. <br/><strong>We look forward to reading your feedback.</strong>',
			bgColor: 'rgb(42, 42, 42)',
			bgColorAlpha: 'rgba(42, 42, 42,.9)',
			borderRadius: '50%'
		});

		// Add Phone number link
		if( !mobile ) {
			var telLink = $('a.tel');
			telLink.css('cursor','default');
			telLink.click(function(e){
				e.preventDefault();
			});
		}

	});
})(jQuery);


//****************************************************************************/
//	FitVids
//****************************************************************************/
!function(a){"use strict";a.fn.fitVids=function(b){var c={customSelector:null};if(!document.getElementById("fit-vids-style")){var d=document.createElement("div"),e=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0],f="&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>";d.className="fit-vids-style",d.id="fit-vids-style",d.style.display="none",d.innerHTML=f,e.parentNode.insertBefore(d,e)}return b&&a.extend(c,b),this.each(function(){var b=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];c.customSelector&&b.push(c.customSelector);var d=a(this).find(b.join(","));d=d.not("object object"),d.each(function(){var b=a(this);if(!("embed"===this.tagName.toLowerCase()&&b.parent("object").length||b.parent(".fluid-width-video-wrapper").length)){var c="object"===this.tagName.toLowerCase()||b.attr("height")&&!isNaN(parseInt(b.attr("height"),10))?parseInt(b.attr("height"),10):b.height(),d=isNaN(parseInt(b.attr("width"),10))?b.width():parseInt(b.attr("width"),10),e=c/d;if(!b.attr("id")){var f="fitvid"+Math.floor(999999*Math.random());b.attr("id",f)}b.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*e+"%"),b.removeAttr("height").removeAttr("width")}})})}}(window.jQuery||window.Zepto);

(function($){
	$(window).load(function() {

		$('.fitvids').fitVids();

	});
})(jQuery);



//****************************************************************************/
//	BxSlider v4.1.1
//****************************************************************************/
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),f(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:v()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:50,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return i(),void 0;var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(p()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",B),o.settings.auto&&o.settings.autoStart&&H(),o.settings.ticker&&L(),o.settings.pager&&I(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&O()},p=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),e},v=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width();t=Math.floor(o.viewport.width()/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=o.children.length/m();else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),N()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),N()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.delegate("a","click",q)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",y),o.controls.prev.bind("click",z),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.delegate(".bx-start","click",k),o.controls.autoEl.delegate(".bx-stop","click",M),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},y=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},k=function(t){r.startAuto(),t.preventDefault()},M=function(t){r.stopAuto(),t.preventDefault()},q=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget),s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()},I=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}),void 0)},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),"horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0)}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));N(n)}),N()},N=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",X)},X=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",Y),o.viewport.bind("touchend",V)}},Y=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},V=function(t){o.viewport.unbind("touchmove",Y);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",V)},B=function(){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider())};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&I(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",51).fadeIn(o.settings.speed,function(){t(this).css("zIndex",50),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",p()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),I(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",B))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);


/*********************************
jQuery fullViewport
Author: Matthew Peach
version: 1.0
Description: Makes the section equal to the height of the viewport by adding padding to the top and bottom
*********************************/
(function($){
	jQuery.fn.fullViewport = function(options){

		//defaults
	    var defaults = {
	    	top: 0,
	    	bottom: 0,
	    	marginTop: 20,
	    	marginBottom: 20,
	    }
	    //Combine specified options with defaults.
	    var options = $.extend(defaults, options);
    
    	//Begin function on each specified item.
		return this.each(function(){
			var obj = $(this);

			setPadding(obj);
			$(window).resize(function(){
				setPadding(obj);
			})

			return true;
		});

		function setPadding(section){
			section = $(section);
			var viewportH = $(window).height();
			var difference = viewportH - section.height();
			if(options.top == 0 && options.bottom == 0){
				var top = (difference/2 > options.marginTop)? difference/2 : options.marginTop;
				var bottom = (difference/2 > options.marginBottom)? difference/2 : options.marginbottom;

				section.css({
					'padding-top' : top+'px',
					'padding-bottom' : bottom+'px'
				})
			}else if(options.top != 0){
				section.css({
					'padding-top' : options.top+'px',
					'padding-bottom' : (difference - options.top)+'px'
				})
			}else if(options.bottom != 0){
				section.css({
					'padding-top' : (difference - options.bottom)+'px',
					'padding-bottom' : options.bottom+'px'
				})
			}

		}
	};
})(jQuery);




// /* BackgroundCheck
//    http://kennethcachia.com/background-check
//    v1.2.2 */

// !function(a,b){"function"==typeof define&&define.amd?define(b):a.BackgroundCheck=b(a)}(this,function(){"use strict";function a(a){if(void 0===a||void 0===a.targets)throw"Missing attributes";H.debug=d(a.debug,!1),H.debugOverlay=d(a.debugOverlay,!1),H.targets=g(a.targets),H.images=g(a.images||"img",!0),H.changeParent=d(a.changeParent,!1),H.threshold=d(a.threshold,50),H.minComplexity=d(a.minComplexity,30),H.minOverlap=d(a.minOverlap,50),H.windowEvents=d(a.windowEvents,!0),H.maxDuration=d(a.maxDuration,500),H.mask=d(a.mask,{r:0,g:255,b:0}),H.classes=d(a.classes,{dark:"background--dark",light:"background--light",complex:"background--complex"}),void 0===B&&(h(),B&&(C.style.position="fixed",C.style.top="0px",C.style.left="0px",C.style.width="100%",C.style.height="100%",window.addEventListener(G,x.bind(null,function(){k(),w()})),window.addEventListener("scroll",x.bind(null,w)),k(),w()))}function b(){B=null,C=null,D=null,H={},E&&clearTimeout(E)}function c(a){z("debug")&&console.log(a)}function d(a,b){return e(a,typeof b),void 0===a?b:a}function e(a,b){if(void 0!==a&&typeof a!==b)throw"Incorrect attribute type"}function f(a){for(var b,d,e=[],f=0;f<a.length;f++)if(b=a[f],e.push(b),"IMG"!==b.tagName){if(d=window.getComputedStyle(b).backgroundImage,d.split(/,url|, url/).length>1)throw"Multiple backgrounds are not supported";if(!d||"none"===d)throw"Element is not an <img> but does not have a background-image";e[f]={img:new Image,el:e[f]},d=d.slice(4,-1),d=d.replace(/"/g,""),e[f].img.src=d,c("CSS Image - "+d)}return e}function g(a,b){var c=a;if("string"==typeof a?c=document.querySelectorAll(a):a&&1===a.nodeType&&(c=[a]),!c||0===c.length||void 0===c.length)throw"Elements not found";return b&&(c=f(c)),c=Array.prototype.slice.call(c)}function h(){C=document.createElement("canvas"),C&&C.getContext?(D=C.getContext("2d"),B=!0):B=!1,i()}function i(){z("debugOverlay")?(C.style.opacity=.5,C.style.pointerEvents="none",document.body.appendChild(C)):C.parentNode&&C.parentNode.removeChild(C)}function j(a){var d=(new Date).getTime()-a;c("Duration: "+d+"ms"),d>z("maxDuration")&&(console.log("BackgroundCheck - Killed"),q(),b())}function k(){F={left:0,top:0,right:document.body.clientWidth,bottom:window.innerHeight},C.width=document.body.clientWidth,C.height=window.innerHeight}function l(a,b,c){var d,e;return-1!==a.indexOf("px")?d=parseFloat(a):-1!==a.indexOf("%")?(d=parseFloat(a),e=d/100,d=e*b,c&&(d-=c*e)):d=b,d}function m(a){var b=window.getComputedStyle(a.el);a.el.style.backgroundRepeat="no-repeat",a.el.style.backgroundOrigin="padding-box";var c=b.backgroundSize.split(" "),d=c[0],e=void 0===c[1]?"auto":c[1],f=a.el.clientWidth/a.el.clientHeight,g=a.img.naturalWidth/a.img.naturalHeight;"cover"===d?f>=g?(d="100%",e="auto"):(d="auto",c[0]="auto",e="100%"):"contain"===d&&(1/g>1/f?(d="auto",c[0]="auto",e="100%"):(d="100%",e="auto")),d="auto"===d?a.img.naturalWidth:l(d,a.el.clientWidth),e="auto"===e?d/a.img.naturalWidth*a.img.naturalHeight:l(e,a.el.clientHeight),"auto"===c[0]&&"auto"!==c[1]&&(d=e/a.img.naturalHeight*a.img.naturalWidth);var h=b.backgroundPosition;"top"===h?h="50% 0%":"left"===h?h="0% 50%":"right"===h?h="100% 50%":"bottom"===h?h="50% 100%":"center"===h&&(h="50% 50%"),h=h.split(" ");var i,j;return 4===h.length?(i=h[1],j=h[3]):(i=h[0],j=h[1]),j=j||"50%",i=l(i,a.el.clientWidth,d),j=l(j,a.el.clientHeight,e),4===h.length&&("right"===h[0]&&(i=a.el.clientWidth-a.img.naturalWidth-i),"bottom"===h[2]&&(j=a.el.clientHeight-a.img.naturalHeight-j)),i+=a.el.getBoundingClientRect().left,j+=a.el.getBoundingClientRect().top,{left:Math.floor(i),right:Math.floor(i+d),top:Math.floor(j),bottom:Math.floor(j+e),width:Math.floor(d),height:Math.floor(e)}}function n(a){var b,c,d;if(a.nodeType){var e=a.getBoundingClientRect();b={left:e.left,right:e.right,top:e.top,bottom:e.bottom,width:e.width,height:e.height},d=a.parentNode,c=a}else b=m(a),d=a.el,c=a.img;d=d.getBoundingClientRect(),b.imageTop=0,b.imageLeft=0,b.imageWidth=c.naturalWidth,b.imageHeight=c.naturalHeight;var f,g=b.imageHeight/b.height;return b.top<d.top&&(f=d.top-b.top,b.imageTop=g*f,b.imageHeight-=g*f,b.top+=f,b.height-=f),b.left<d.left&&(f=d.left-b.left,b.imageLeft+=g*f,b.imageWidth-=g*f,b.width-=f,b.left+=f),b.bottom>d.bottom&&(f=b.bottom-d.bottom,b.imageHeight-=g*f,b.height-=f),b.right>d.right&&(f=b.right-d.right,b.imageWidth-=g*f,b.width-=f),b.imageTop=Math.floor(b.imageTop),b.imageLeft=Math.floor(b.imageLeft),b.imageHeight=Math.floor(b.imageHeight),b.imageWidth=Math.floor(b.imageWidth),b}function o(a){var b=n(a);a=a.nodeType?a:a.img,b.imageWidth>0&&b.imageHeight>0&&b.width>0&&b.height>0?D.drawImage(a,b.imageLeft,b.imageTop,b.imageWidth,b.imageHeight,b.left,b.top,b.width,b.height):c("Skipping image - "+a.src+" - area too small")}function p(a,b,c){var d=a.className;switch(c){case"add":d+=" "+b;break;case"remove":var e=new RegExp("(?:^|\\s)"+b+"(?!\\S)","g");d=d.replace(e,"")}a.className=d.trim()}function q(a){for(var b,c=a?[a]:z("targets"),d=0;d<c.length;d++)b=c[d],b=z("changeParent")?b.parentNode:b,p(b,z("classes").light,"remove"),p(b,z("classes").dark,"remove"),p(b,z("classes").complex,"remove")}function r(a){var b,d,e,f,g=a.getBoundingClientRect(),h=0,i=0,j=0,k=0,l=z("mask");if(g.width>0&&g.height>0){q(a),a=z("changeParent")?a.parentNode:a,d=D.getImageData(g.left,g.top,g.width,g.height).data;for(var m=0;m<d.length;m+=4)d[m]===l.r&&d[m+1]===l.g&&d[m+2]===l.b?k++:(h++,b=.2126*d[m]+.7152*d[m+1]+.0722*d[m+2],e=b-j,i+=e*e,j+=e/h);k<=d.length/4*(1-z("minOverlap")/100)&&(f=Math.sqrt(i/h)/255,j/=255,c("Target: "+a.className+" lum: "+j+" var: "+f),p(a,j<=z("threshold")/100?z("classes").dark:z("classes").light,"add"),f>z("minComplexity")/100&&p(a,z("classes").complex,"add"))}}function s(a,b){return a=(a.nodeType?a:a.el).getBoundingClientRect(),b=b===F?b:(b.nodeType?b:b.el).getBoundingClientRect(),!(a.right<b.left||a.left>b.right||a.top>b.bottom||a.bottom<b.top)}function t(a){for(var b,c=(new Date).getTime(),d=a&&("IMG"===a.tagName||a.img)?"image":"targets",e=a?!1:!0,f=z("targets").length,g=0;f>g;g++)b=z("targets")[g],s(b,F)&&("targets"!==d||a&&a!==b?"image"===d&&s(b,a)&&r(b):(e=!0,r(b)));if("targets"===d&&!e)throw a+" is not a target";j(c)}function u(a){var b=function(a){var b=0;return"static"!==window.getComputedStyle(a).position&&(b=parseInt(window.getComputedStyle(a).zIndex,10)||0,b>=0&&b++),b},c=a.parentNode,d=c?b(c):0,e=b(a);return 1e5*d+e}function v(a){var b=!1;return a.sort(function(a,c){a=a.nodeType?a:a.el,c=c.nodeType?c:c.el;var d=a.compareDocumentPosition(c),e=0;return a=u(a),c=u(c),a>c&&(b=!0),a===c&&2===d?e=1:a===c&&4===d&&(e=-1),e||a-c}),c("Sorted: "+b),b&&c(a),b}function w(a,b,d){if(B){var e=z("mask");c("--- BackgroundCheck ---"),c("onLoad event: "+(d&&d.src)),b!==!0&&(D.clearRect(0,0,C.width,C.height),D.fillStyle="rgb("+e.r+", "+e.g+", "+e.b+")",D.fillRect(0,0,C.width,C.height));for(var f,g,h=d?[d]:z("images"),i=v(h),j=!1,k=0;k<h.length;k++)f=h[k],s(f,F)&&(g=f.nodeType?f:f.img,0===g.naturalWidth?(j=!0,c("Loading... "+f.src),g.removeEventListener("load",w),i?g.addEventListener("load",w.bind(null,null,!1,null)):g.addEventListener("load",w.bind(null,a,!0,f))):(c("Drawing: "+f.src),o(f)));d||j?d&&t(d):t(a)}}function x(a){z("windowEvents")===!0&&(E&&clearTimeout(E),E=setTimeout(a,200))}function y(a,b){if(void 0===H[a])throw"Unknown property - "+a;if(void 0===b)throw"Missing value for "+a;if("targets"===a||"images"===a)try{b=g("images"!==a||b?b:"img","images"===a?!0:!1)}catch(c){throw b=[],c}else e(b,typeof H[a]);q(),H[a]=b,w(),"debugOverlay"===a&&i()}function z(a){if(void 0===H[a])throw"Unknown property - "+a;return H[a]}function A(){for(var a,b=z("images"),c=[],d=0;d<b.length;d++)a=n(b[d]),c.push(a);return c}var B,C,D,E,F,G=void 0!==window.orientation?"orientationchange":"resize",H={};return{init:a,destroy:b,refresh:w,set:y,get:z,getImageData:A}});


// jQuery(document).ready(function() {
// 	BackgroundCheck.init({
// 		targets: '.consultation-helper'
// 	});
// });


// (function($){
// 	$(document).ready(function() {

// 		$(document).on('scroll', function() {
// 			BackgroundCheck.refresh();
// 		});
// 	});
// })(jQuery);