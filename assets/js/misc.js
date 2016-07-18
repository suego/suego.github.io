/*SO-Info: signal.1 */

/*******************
Package: ProgressBlocker - Suego
Version: 1.4.0
*******************/
/*
**********************************************************
ProgressBlocker.js

Author: 	Mike Zarandona
Version:	v1.4.0
Release:	April 20, 2014
			Added localStorage support for navigation persistance

Usage:		$.progressBlocker({
				width: 1200,
				frontpage: 'show',
				responsive: 'hide',
				ie: 'hide'
			});

			width [int]:			min-width of body
			frontpage [string]:		(show | hide) front-page design
			responsive [string]:	(show | hide) responsive web design
			ie [string]:			(show | hide) internet explorer validation

			Developer Mode:  ?dev=true
			Turn Off Dev:    ?dev=off
**********************************************************
*/

;(function($) {

	var defaults = {
		width: 1200,
		frontpage: 'hide',
		responsive: 'hide',
		ie: 'hide'
	};



	$.progressBlocker = function(options) {

		options = $.extend({}, defaults, options);

		// Test for mobile devices
		var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))? true : false;

		// Compiled & copied in from companion .less file
		var styles = '.dx-responsive-overlay{display:block !important;position:fixed;opacity:0;width:100%;height:100%;top:0;left:0;background-color:#000;background-color:rgba(0,0,0,0.8);font-family:"Open Sans";z-index:-9999;-webkit-transition:all 300ms;-moz-transition:all 300ms;-o-transition:all 300ms;transition:all 300ms}.dx-responsive-overlay.show{opacity:1;z-index:999999999}.dx-responsive-overlay.block{display:block !important;opacity:1 !important;z-index:999999999 !important}.dx-responsive-overlay.block .dx-message-wrapper{padding-left:1.5em;padding-right:1.5em}.dx-responsive-overlay.no-arrows .dx-message-wrapper .dx-pixel-counter:before,.dx-responsive-overlay.no-arrows .dx-message-wrapper .dx-pixel-counter:after{display:none}.dx-responsive-overlay .dx-message-wrapper{-webkit-transition:all 300ms;-moz-transition:all 300ms;-o-transition:all 300ms;transition:all 300ms;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;padding:5px 2.5em;border-radius:50%;background-color:#fff;color:#111;text-align:center;position:absolute;top:10%;left:50%;margin-left:-250px;height:500px;width:500px;-webkit-box-shadow:0 20px 0 rgba(0,0,0,0.33);-moz-box-shadow:0 20px 0 rgba(0,0,0,0.33);box-shadow:0 20px 0 rgba(0,0,0,0.33)}.dx-responsive-overlay .dx-message-wrapper h1{font:82px/1em "Open Sans Condensed";margin:0.25em auto;color:#999;font-weight:300;-webkit-transition:all 300ms;-moz-transition:all 300ms;-o-transition:all 300ms;transition:all 300ms}.dx-responsive-overlay .dx-message-wrapper p{text-align:left;font:16px/1.75em "Open Sans";-webkit-transition:all 300ms;-moz-transition:all 300ms;-o-transition:all 300ms;transition:all 300ms}.dx-responsive-overlay .dx-message-wrapper p.one{margin-bottom:0;text-align:center}.dx-responsive-overlay .dx-message-wrapper p.two{float:left;width:48%;text-align:right;margin-bottom:0.75em}.dx-responsive-overlay .dx-message-wrapper p.signed{clear:both;float:left;width:55%;text-align:right;font:300 32px/1em "Open Sans Condensed";margin:0.5em 0}.dx-responsive-overlay .dx-message-wrapper p a{color:#111}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter{position:absolute;height:200px;width:200px;right:5px;bottom:65px;border-radius:50%;background-color:#e15e00;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all 300ms;-moz-transition:all 300ms;-o-transition:all 300ms;transition:all 300ms;-webkit-box-shadow:0 20px 0 rgba(0,0,0,0.33);-moz-box-shadow:0 20px 0 rgba(0,0,0,0.33);box-shadow:0 20px 0 rgba(0,0,0,0.33);-webkit-animation:pulse 3s infinite;-moz-animation:pulse 3s infinite;-o-animation:pulse 3s infinite;animation:pulse 3s infinite}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter:before,.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter:after{content:"\\00AB";position:absolute;display:block;font:64px/1em "Open Sans";color:#fa6900;width:0.5em;height:1em;top:50%;right:100%;margin-top:-0.5em}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter:before{-webkit-animation:widerleft 3s infinite;-moz-animation:widerleft 3s infinite;-o-animation:widerleft 3s infinite;animation:widerleft 3s infinite}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter:after{content:"\\00BB";right:auto;left:100%;-webkit-animation:widerright 3s infinite;-moz-animation:widerright 3s infinite;-o-animation:widerright 3s infinite;animation:widerright 3s infinite}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter p{color:#fff;text-align:center;padding-top:0.3em;font:20px/1em "Open Sans";margin-bottom:0;-webkit-transition:all 300ms;-moz-transition:all 300ms;-o-transition:all 300ms;transition:all 300ms}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter span{color:#fff;font:300 102px/1em "Open Sans Condensed";-webkit-transition:all 300ms;-moz-transition:all 300ms;-o-transition:all 300ms;transition:all 300ms}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter .signed{font-family:"Open Sans Condensed";font-size:42px;margin-top:1.5em;width:100%}@media screen and (max-width:600px){.dx-responsive-overlay .dx-message-wrapper{height:400px;width:400px;margin-left:-200px}.dx-responsive-overlay .dx-message-wrapper h1{font-size:62px}.dx-responsive-overlay .dx-message-wrapper p{font-size:14px;line-height:1.25em}.dx-responsive-overlay .dx-message-wrapper p.signed{font-size:28px}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter{height:160px;width:160px;bottom:55px}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter:before,.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter:after{font-size:48px}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter p{font-size:16px}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter span{font-size:82px}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter .signed{margin-top:1.25em;font-size:38px}}@media screen and (max-width:480px){.dx-responsive-overlay .dx-message-wrapper{padding:5px 1em;height:300px;width:300px;margin-left:-150px}.dx-responsive-overlay .dx-message-wrapper h1{font-size:42px;margin-bottom:0}.dx-responsive-overlay .dx-message-wrapper p{font-size:12px;line-height:1.2em}.dx-responsive-overlay .dx-message-wrapper p.signed{font-size:22px}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter{height:135px;width:135px;bottom:25px}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter:before,.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter:after{font-size:32px}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter p{font-size:16px}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter span{font-size:62px}.dx-responsive-overlay .dx-message-wrapper .dx-pixel-counter .signed{margin-top:1.5em;font-size:30px}}@-webkit-keyframes widerleft{0,100%{right:100%}50%{right:105%}}@-moz-keyframes widerleft{0,100%{right:100%}50%{right:105%}}@-o-keyframes widerleft{0,100%{right:100%}50%{right:105%}}@keyframes widerleft{0,100%{right:100%}50%{right:105%}}@-webkit-keyframes widerright{0,100%{left:100%}50%{left:105%}}@-moz-keyframes widerright{0,100%{left:100%}50%{left:105%}}@-o-keyframes widerright{0,100%{left:100%}50%{left:105%}}@keyframes widerright{0,100%{left:100%}50%{left:105%}}@-webkit-keyframes pulse{0,100%{background-color:#c75400}50%{background-color:#fa6900}}@-moz-keyframes pulse{0,100%{background-color:#c75400}50%{background-color:#fa6900}}@-o-keyframes pulse{0,100%{background-color:#c75400}50%{background-color:#fa6900}}@keyframes pulse{0,100%{background-color:#c75400}50%{background-color:#fa6900}}/*# sourceMappingURL=jquery.progressblocker.css.map */';

		// The overlay content
		var overlayContent = '<div class="dx-responsive-overlay" style="display:none;"><div class="dx-message-wrapper"><h1>Hello!</h1><p class="one">This site is in development, and the "<a href="http://www.suego.co/responsive/" target="_blank">responsive</a>" component (what makes the site resize to fit every screen beautifully) is not yet in place.</p><p class="two">In the mean time, please expand the width of your browser.  As soon as you do, this message will leave and you can get to viewing the site!</p><p class="signed"><strong>-Suego</strong></p><div class="dx-pixel-counter"><p>Pixels Left<br />to Go</p><span>0</span></div><!--/.dx-pixel-counter--></div><!--/.dx-message-wrapper--></div><!--/.dx-responsive-overlay-->';

		// Add Google font and the default styles to the <head> of the document
		$('head')
			.append('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,700|Open+Sans+Condensed:300" />')
			.append('<style type="text/css">' + styles + '</style>');

		// (Mobile Only) If the meta "viewport" does not exist in the <head>, append it
		if (mobile) {
			if ($('meta[name=viewport]').length === 0) {
				$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
			}
		}

		// Variable to watch for block status and hold site parameter
		var blocked = false,
			siteVar = '';

		// Increment width to make the math a bit easier
		options.width++;



		/********************/
		/* TIME TO DO STUFF */
		/********************/

		// Check to see if the dev-mode parameter is set to 'off'
		if ( getURLParameter('dev') == 'off' ) {
			if ( testLocalStorage() ) {
				console.info('ProgressBlocker:  Dev mode status changed to OFF.');
				localStorage.clear();
			}
		}

		// Grab the url param 'site'
		if ( testLocalStorage() ) {
			var lsTest = localStorage.getItem( 'DXPB-' + getSiteParam() );

			// Alert the user that dev mode is stil on
			if (lsTest == 'true') {
				console.info('ProgressBlocker:  Dev mode ON.');
			}
		}

		// Block things ONLY if dev != true, and localStorage item is not set
		if ((getURLParameter('dev') != 'true') && (lsTest != 'true')) {

			// If we're blocking internet explorer
			if (options.ie == 'hide') {
				// IE <= 10
				if (/*@cc_on!@*/false) { blockIE(); }

				// IE 11
				var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
				if (isIE11) { blockIE(); }
			}

			function blockIE() {
				// Add overlay content to the <body>
				$('body').append(overlayContent);

				$('.dx-pixel-counter').html($('.dx-message-wrapper .signed'));
				$('body').css('min-width', options.width + 'px');
				$('.dx-responsive-overlay').addClass('block no-arrows');
				$('.dx-responsive-overlay').find('.one').html('This site is currently in development, and right now Internet Explorer is <u>temporarily</u> being hidden as it is not yet finished.  Please check back again soon!');
				$('.dx-responsive-overlay').find('.two').html('In the mean time, please try using a different browser such as <a href="http://www.google.com/chrome" target="_blank">Google Chrome</a> or <a href="http://getfirefox.com" target="_blank">Mozilla Firefox</a> to view your site in progress.');
				blocked = true;
			}



			// If we're blocking the front-page
			if ((options.frontpage == 'hide') && (!blocked)) {
				console.log($('#wrapper.page_1').length);
				if ($('#wrapper.page_1').length !== 0) {
					// Add overlay content to the <body>
					$('body').append(overlayContent);

					$('.dx-pixel-counter').html($('.dx-message-wrapper .signed'));
					$('body').css('min-width', options.width + 'px');
					$('.dx-responsive-overlay').addClass('block no-arrows');
					$('.dx-responsive-overlay').find('.one').html('This site is currently in development, and right now the <strong>front page</strong> is temporarily being hidden as it is not yet finished being built.  Please check back again soon!');
					$('.dx-responsive-overlay').find('.two').html('In the mean time, please feel free to <a href="https://suego.co/contact/" target="_blank">contact us</a> to start editing your content or to go to a secondary page to view the rest of your site in progress.');
					blocked = true;
				}
			}



			// If we're blocking responsive design
			if ((options.responsive == 'hide') && (!blocked)) {
				// Add overlay content to the <body>
				$('body').append(overlayContent);

				// If the width is less than our target width OR is a mobile device, show the overlay on load
				if ((window.innerWidth < options.width) || (mobile)) {
					$('.dx-responsive-overlay').addClass('show');
					$('body').css('min-width', options.width + 'px');
					$('.dx-pixel-counter span').html(options.width - window.innerWidth);
				}

				/* Bind to the window.resize event */
				$(window).on('resize', function() {
					if (window.innerWidth < options.width) {
						$('.dx-responsive-overlay').addClass('show');
						$('body').css('min-width', options.width + 'px');
						$('.dx-pixel-counter span').html(options.width - window.innerWidth);
					}
					else {
						$('.dx-responsive-overlay').removeClass('show');
						$('body').css('min-width', '0');
					}
				});
			}
		}
		else {
			if ( testLocalStorage() ) {
				localStorage.setItem('DXPB-' + getSiteParam(), 'true');
			}
		}



		// A test to see if localStorage and sessionStorage & error handling
		function testLocalStorage() {
			if ( typeof(Storage) !== void(0) ) { return true; }
			else {
				console.error('ProgressBlocker ERROR:  localStorage / sessionStorage NOT supported - dev mode will not persist on navigation.');
				return false;
			}
		}



		// Function to go get the url parameter 'site' without 'www.'
		function getSiteParam() {
			siteVar = getURLParameter('url');

			if (siteVar !== '') {
				siteVar = siteVar.replace('www.', '');
			}

			return siteVar;
		}



		// Helper function: get URL parameters (for development)
		function getURLParameter(name) {
			name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			var regexS = "[\\?&]"+name+"=([^&#]*)";
			var regex = new RegExp( regexS );
			var results = regex.exec( window.location.href );
			if( results === null )
				return "";
			else
				return results[1];
		}

	};
})(jQuery);

/*******************
Package: equalHeightColumns - suego
Version: 1.3
*******************/
(function(e){jQuery.fn.equalHeightColumns=function(t,n){function o(o){newCount=n(t);var i,a=0;o.length,o.css({height:"auto"});var r=0;o.each(function(t){if(e(this).outerHeight()>a&&(i=e(this),a=e(this).outerHeight()),++r,r>=newCount||t==o.length-1){var n=t-(r-1);e(o).slice(n,t+1).css({height:a+"px"}),a=0,r=0}})}var i=this;return t=t?t:i.length,void 0==n&&(n=function(){return t}),o(this),e(window).on("resize.equalHeightColumns",function(){o(i)}),this.each(function(){return!0})}})(jQuery);
/*******************
Package: inView.js
Version: 1.0
*******************/
(function(d){var p={},e,a,h=document,i=window,f=h.documentElement,j=d.expando;d.event.special.inview={add:function(a){p[a.guid+"-"+this[j]]={data:a,$element:d(this)}},remove:function(a){try{delete p[a.guid+"-"+this[j]]}catch(d){}}};d(i).bind("scroll resize",function(){e=a=null});!f.addEventListener&&f.attachEvent&&f.attachEvent("onfocusin",function(){a=null});setInterval(function(){var k=d(),j,n=0;d.each(p,function(a,b){var c=b.data.selector,d=b.$element;k=k.add(c?d.find(c):d)});if(j=k.length){var b;
if(!(b=e)){var g={height:i.innerHeight,width:i.innerWidth};if(!g.height&&((b=h.compatMode)||!d.support.boxModel))b="CSS1Compat"===b?f:h.body,g={height:b.clientHeight,width:b.clientWidth};b=g}e=b;for(a=a||{top:i.pageYOffset||f.scrollTop||h.body.scrollTop,left:i.pageXOffset||f.scrollLeft||h.body.scrollLeft};n<j;n++)if(d.contains(f,k[n])){b=d(k[n]);var l=b.height(),m=b.width(),c=b.offset(),g=b.data("inview");if(!a||!e)break;c.top+l>a.top&&c.top<a.top+e.height&&c.left+m>a.left&&c.left<a.left+e.width?
(m=a.left>c.left?"right":a.left+e.width<c.left+m?"left":"both",l=a.top>c.top?"bottom":a.top+e.height<c.top+l?"top":"both",c=m+"-"+l,(!g||g!==c)&&b.data("inview",c).trigger("inview",[!0,m,l])):g&&b.data("inview",!1).trigger("inview",[!1])}}},250)})(jQuery);
/*******************
Package: scrollTo
Version: 1.4.6
*******************/
/**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.6
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,targ,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/*******************
Package: Analytics Events
Version: 1.0
*******************/
//****************************************************************************/
//	Suego Standard Analytics Events
//	Version 1.0
//	March 17, 2014
//****************************************************************************/
(function($){
	$(document).ready(function() {


		/*
			Track those spending a long time on a page
		*/
		window.elapsed_time = 0;
		setInterval(function(){
			window.elapsed_time += 1;
			var page_title = document.title;
			 if (window.elapsed_time == 180) {
				/* _gaq.push(['_trackEvent', 'Reading Article', '3 minutes', page_title]); */
				trackThis('Reading Article', '3 Minutes', page_title);
			} else if (window.elapsed_time == 300) {
				/* _gaq.push(['_trackEvent', 'Reading Article', '5 minutes', page_title]); */
				trackThis('Reading Article', '5 Minutes', page_title);
			} else if (window.elapsed_time == 420) {
				/* _gaq.push(['_trackEvent', 'Reading Article', '7 minutes', page_title]); */
				trackThis('Reading Article', '7 Minutes', page_title);
			} else if (window.elapsed_time == 540) {
				/* _gaq.push(['_trackEvent', 'Reading Article', '9 minutes', page_title]); */
				trackThis('Reading Article', '9 Minutes', page_title);
			} else if (window.elapsed_time == 660) {
				/* _gaq.push(['_trackEvent', 'Reading Article', '11 minutes', page_title]); */
				trackThis('Reading Article', '11 Minutes', page_title);
			}
		}, 1000);



		/* Track external links */
		$('a').on('click', function() {
			try {
				href = $(this).attr('href');
				if (href.match(/https?\:\/\//).length === 0) {
					return false;
				}
				/* Track telephone links */
				if (href.match(/^tel\:/).length > 0) {
					// _gaq.push(['_trackEvent', 'Click to call', $(this).text(), href]);
					trackThis('Click to Call', $(this).text(), href);
					return true;
				}
				if (href.indexOf(window.location['host']) < 0) {
					// _gaq.push(['_trackEvent', 'External link', $(this).text(), href]);
					trackThis('External link', $(this).text(), href);
					// console.log("External link");
				}
			} catch(err) {}
		});


		/* Track any time the .phone class is clicked */
		$('.phone').on('click', function(e) {
			// _gaq.push(['_trackEvent', 'Clicked phone number', $(this).text()]);
			trackThis('Clicked phone number', $(this).text(), window.location.href);
		});
		
		$('.tel').on('click', function(e) {
			// _gaq.push(['_trackEvent', 'Clicked phone number', $(this).text()]);
			trackThis('Clicked phone number', $(this).text(), window.location.href);
		});

		/* Track form submission */
		$('.sendit').on('click', function(e) {
			// _gaq.push(['_trackEvent', 'Form Submission', $(this).val()]);
			trackThis('Form Submission', $(this).val(), window.location.href);
		});


		/* Track any outbound links */
		$('a[href^="http://"]')
			.not('[href*="' + document.domain + '"]')
			.attr('target','_blank')
			.on('click', function(e) {

				var $this = $(this)
					,url = $this.attr('href')
					,newtab = ($this.attr('target') === '_blank' || e.metaKey || e.ctrlKey);

				window._gaq = window._gaq || [];

				try {
					if (!newtab) {
						e.preventDefault();
						setTimeout(function(){
							document.location = url;
						}, 100);
					}
				} catch (err){}

			});
	});
})(jQuery);



//****************************************************************************/
//	trackThis() | Helper function which tracks events
//				  for both anatlyics.js (new )and ga.js (old)
//****************************************************************************/
var googleAnalyticsVersion = 0;	// 0 = err, 1 = Universal (analytics.js), 2 = Classic (ga.js)

(function($){
	$(document).ready(function() {

		/* Universal | 1 */
		if (typeof ga === 'function') { googleAnalyticsVersion = 1; /*console.info('dx-ga: universal');*/ }

		/* Classic | 2 9*/
		if (typeof _gaq !== 'undefined' && typeof _gaq.push === 'function') { googleAnalyticsVersion = 2; /*console.info('dx-ga: classic');*/ }

	});
})(jQuery);

function trackThis(category, action, label, value) {
	// Catch any undefined values
	if (label === undefined) { label = ''; }

	// If the value is undefined, don't send it
	if (value === undefined) {
		if (googleAnalyticsVersion == 1) {
			ga('send', 'event', category, action, label);
		}
		else if (googleAnalyticsVersion == 2) {
			_gaq.push(['_trackEvent', category, action, label]);
		}
		else {
			console.log('Google Analytics event error.');
		}
	}
	else {
		if (googleAnalyticsVersion == 1) {
			ga('send', 'event', category, action, label, value);
		}
		else if (googleAnalyticsVersion == 2) {
			_gaq.push(['_trackEvent', category, action, label, value]);
		}
		else {
			console.log('Google Analytics event error.');
		}
	}
}

/*******************
Package: jQuery Easing
Version: 1.3
*******************/
eval(function(e,t,n,o,i,a){if(i=function(e){return(t>e?"":i(parseInt(e/t)))+((e%=t)>35?String.fromCharCode(e+29):e.toString(36))},!"".replace(/^/,String)){for(;n--;)a[i(n)]=o[n]||i(n);o=[function(e){return a[e]}],i=function(){return"\\w+"},n=1}for(;n--;)o[n]&&(e=e.replace(RegExp("\\b"+i(n)+"\\b","g"),o[n]));return e}("h.i['1a']=h.i['z'];h.O(h.i,{y:'D',z:9(x,t,b,c,d){6 h.i[h.i.y](x,t,b,c,d)},17:9(x,t,b,c,d){6 c*(t/=d)*t+b},D:9(x,t,b,c,d){6-c*(t/=d)*(t-2)+b},13:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},X:9(x,t,b,c,d){6 c*(t/=d)*t*t+b},U:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t+1)+b},R:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t+b;6 c/2*((t-=2)*t*t+2)+b},N:9(x,t,b,c,d){6 c*(t/=d)*t*t*t+b},M:9(x,t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},L:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},K:9(x,t,b,c,d){6 c*(t/=d)*t*t*t*t+b},J:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t*t*t+1)+b},I:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t*t+b;6 c/2*((t-=2)*t*t*t*t+2)+b},G:9(x,t,b,c,d){6-c*8.C(t/d*(8.g/2))+c+b},15:9(x,t,b,c,d){6 c*8.n(t/d*(8.g/2))+b},12:9(x,t,b,c,d){6-c/2*(8.C(8.g*t/d)-1)+b},Z:9(x,t,b,c,d){6(t==0)?b:c*8.j(2,10*(t/d-1))+b},Y:9(x,t,b,c,d){6(t==d)?b+c:c*(-8.j(2,-10*t/d)+1)+b},W:9(x,t,b,c,d){e(t==0)6 b;e(t==d)6 b+c;e((t/=d/2)<1)6 c/2*8.j(2,10*(t-1))+b;6 c/2*(-8.j(2,-10*--t)+2)+b},V:9(x,t,b,c,d){6-c*(8.o(1-(t/=d)*t)-1)+b},S:9(x,t,b,c,d){6 c*8.o(1-(t=t/d-1)*t)+b},Q:9(x,t,b,c,d){e((t/=d/2)<1)6-c/2*(8.o(1-t*t)-1)+b;6 c/2*(8.o(1-(t-=2)*t)+1)+b},P:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6-(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b},H:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6 a*8.j(2,-10*t)*8.n((t*d-s)*(2*8.g)/p)+c+b},T:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d/2)==2)6 b+c;e(!p)p=d*(.3*1.5);e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);e(t<1)6-.5*(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b;6 a*8.j(2,-10*(t-=1))*8.n((t*d-s)*(2*8.g)/p)*.5+c+b},F:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*(t/=d)*t*((s+1)*t-s)+b},E:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},16:9(x,t,b,c,d,s){e(s==u)s=1.l;e((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.B))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.B))+1)*t+s)+2)+b},A:9(x,t,b,c,d){6 c-h.i.v(x,d-t,0,c,d)+b},v:9(x,t,b,c,d){e((t/=d)<(1/2.k)){6 c*(7.q*t*t)+b}m e(t<(2/2.k)){6 c*(7.q*(t-=(1.5/2.k))*t+.k)+b}m e(t<(2.5/2.k)){6 c*(7.q*(t-=(2.14/2.k))*t+.11)+b}m{6 c*(7.q*(t-=(2.18/2.k))*t+.19)+b}},1b:9(x,t,b,c,d){e(t<d/2)6 h.i.A(x,t*2,0,c,d)*.5+b;6 h.i.v(x,t*2-d,0,c,d)*.5+c*.5+b}});",62,74,"||||||return||Math|function|||||if|var|PI|jQuery|easing|pow|75|70158|else|sin|sqrt||5625|asin|||undefined|easeOutBounce|abs||def|swing|easeInBounce|525|cos|easeOutQuad|easeOutBack|easeInBack|easeInSine|easeOutElastic|easeInOutQuint|easeOutQuint|easeInQuint|easeInOutQuart|easeOutQuart|easeInQuart|extend|easeInElastic|easeInOutCirc|easeInOutCubic|easeOutCirc|easeInOutElastic|easeOutCubic|easeInCirc|easeInOutExpo|easeInCubic|easeOutExpo|easeInExpo||9375|easeInOutSine|easeInOutQuad|25|easeOutSine|easeInOutBack|easeInQuad|625|984375|jswing|easeInOutBounce".split("|"),0,{}));
/*******************
Package: gaEvent
Version: 1.0.5
*******************/
/*********************************
 * jQuery.gaEvent
 * Description:		gaEvent makes it easy to write one-liner Google Event custom events.
 * Author:			Mike Zarandona
 * Version:			1.0.5
 *					Added support for passing in an event type
 *
 * Variables:		eventType [REQUIRED] [string] the Javascript event(s) on which to fire
 *					category  [REQUIRED] [string] the name supplied for the group of objects to track
 * 					action    [REQUIRED] [string] a unique user-action paired with each category, and commonly used to define the type of user interaction for the web object (this will usually be the same as the 'action')
 * 					label     [OPTIONAL] [string] optional field to provide additional dimension to the event data
 *										pageURL   | label = the current page's URL
 * 										pageTitle | label = the current page's title
 *										linkDest  | label = the referenced link's destination (reference an a tag)
 *										linkTitle | label = the referenced link's title (reference an a tag)
 * 					value    [OPTIONAL] [int] integer that can be used to provide numerical data about the user event
 *
 * Usage:			$('#logo img').gaEvent('click', 'Logo', 'Click', 'Home');
 *					$('a#atag').gaEvent('click', 'Header Link', 'Click', 'pageTitle');
 *					$('.some-thing').gaEvent('hover', 'Some Thing', 'Hover', 'pageURL');
 * 
 * Note: 			I STRONGLY recommend using the Google Analytics Debugger extension for Chrome (http://tinyurl.com/knv6kos) when implementing this plugin
*********************************/
!function($){jQuery.fn.gaEvent=function(eventType,category,action,label,value){return this.each(function(){var pageURL=window.location;"pageURL"==label&&(label=pageURL);var pageTitle=document.title;"pageTitle"==label&&(label=pageTitle);var linkDest=$(this).attr("href");"linkDest"==label&&(label=linkDest);var linkTitle=$(this).attr("title");"linkTitle"==label&&(label=linkTitle),void 0===label&&(label=""),"function"==typeof ga&&$(this).on(eventType,function(){ga("send","event",category,action,label,value)}),"undefined"!=typeof _gaq&&"function"==typeof _gaq.push&&$(this).on(eventType,function(){_gaq.push(["_trackEvent",category,action,label,value])})})}}(jQuery);
/*******************
Package: Placeholder
Version: 3.0.0
*******************/
/* Placeholders.js v3.0.0 */
(function(t){"use strict";function e(t,e,r){return t.addEventListener?t.addEventListener(e,r,!1):t.attachEvent?t.attachEvent("on"+e,r):void 0}function r(t,e){var r,n;for(r=0,n=t.length;n>r;r++)if(t[r]===e)return!0;return!1}function n(t,e){var r;t.createTextRange?(r=t.createTextRange(),r.move("character",e),r.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))}function a(t,e){try{return t.type=e,!0}catch(r){return!1}}t.Placeholders={Utils:{addEventListener:e,inArray:r,moveCaret:n,changeType:a}}})(this),function(t){"use strict";function e(){}function r(t,e){var r,n,a=!!e&&t.value!==e,u=t.value===t.getAttribute(V);return(a||u)&&"true"===t.getAttribute(P)?(t.removeAttribute(P),t.value=t.value.replace(t.getAttribute(V),""),t.className=t.className.replace(R,""),n=t.getAttribute(Q),n&&(t.setAttribute("maxLength",n),t.removeAttribute(Q)),r=t.getAttribute(D),r&&(t.type=r),!0):!1}function n(t){var e,r,n=t.getAttribute(V);return""===t.value&&n?(t.setAttribute(P,"true"),t.value=n,t.className+=" "+k,r=t.getAttribute(Q),r||(t.setAttribute(Q,t.maxLength),t.removeAttribute("maxLength")),e=t.getAttribute(D),e?t.type="text":"password"===t.type&&J.changeType(t,"text")&&t.setAttribute(D,"password"),!0):!1}function a(t,e){var r,n,a,u,i;if(t&&t.getAttribute(V))e(t);else for(r=t?t.getElementsByTagName("input"):p,n=t?t.getElementsByTagName("textarea"):h,i=0,u=r.length+n.length;u>i;i++)a=r.length>i?r[i]:n[i-r.length],e(a)}function u(t){a(t,r)}function i(t){a(t,n)}function l(t){return function(){m&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(P)?J.moveCaret(t,0):r(t)}}function o(t){return function(){n(t)}}function c(t){return function(e){return b=t.value,"true"===t.getAttribute(P)&&b===t.getAttribute(V)&&J.inArray(C,e.keyCode)?(e.preventDefault&&e.preventDefault(),!1):void 0}}function s(t){return function(){r(t,b),""===t.value&&(t.blur(),J.moveCaret(t,0))}}function d(t){return function(){t===document.activeElement&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(P)&&J.moveCaret(t,0)}}function g(t){return function(){u(t)}}function v(t){t.form&&(L=t.form,L.getAttribute(I)||(J.addEventListener(L,"submit",g(L)),L.setAttribute(I,"true"))),J.addEventListener(t,"focus",l(t)),J.addEventListener(t,"blur",o(t)),m&&(J.addEventListener(t,"keydown",c(t)),J.addEventListener(t,"keyup",s(t)),J.addEventListener(t,"click",d(t))),t.setAttribute(U,"true"),t.setAttribute(V,E),(m||t!==document.activeElement)&&n(t)}var p,h,m,f,b,A,y,E,x,L,T,S,N,w=["text","search","url","tel","email","password","number","textarea"],C=[27,33,34,35,36,37,38,39,40,8,46],B="#ccc",k="placeholdersjs",R=RegExp("(?:^|\\s)"+k+"(?!\\S)"),V="data-placeholder-value",P="data-placeholder-active",D="data-placeholder-type",I="data-placeholder-submit",U="data-placeholder-bound",j="data-placeholder-focus",q="data-placeholder-live",Q="data-placeholder-maxlength",z=document.createElement("input"),F=document.getElementsByTagName("head")[0],G=document.documentElement,H=t.Placeholders,J=H.Utils;if(H.nativeSupport=void 0!==z.placeholder,!H.nativeSupport){for(p=document.getElementsByTagName("input"),h=document.getElementsByTagName("textarea"),m="false"===G.getAttribute(j),f="false"!==G.getAttribute(q),A=document.createElement("style"),A.type="text/css",y=document.createTextNode("."+k+" { color:"+B+"; }"),A.styleSheet?A.styleSheet.cssText=y.nodeValue:A.appendChild(y),F.insertBefore(A,F.firstChild),N=0,S=p.length+h.length;S>N;N++)T=p.length>N?p[N]:h[N-p.length],E=T.attributes.placeholder,E&&(E=E.nodeValue,E&&J.inArray(w,T.type)&&v(T));x=setInterval(function(){for(N=0,S=p.length+h.length;S>N;N++)T=p.length>N?p[N]:h[N-p.length],E=T.attributes.placeholder,E?(E=E.nodeValue,E&&J.inArray(w,T.type)&&(T.getAttribute(U)||v(T),(E!==T.getAttribute(V)||"password"===T.type&&!T.getAttribute(D))&&("password"===T.type&&!T.getAttribute(D)&&J.changeType(T,"text")&&T.setAttribute(D,"password"),T.value===T.getAttribute(V)&&(T.value=E),T.setAttribute(V,E)))):T.getAttribute(P)&&(r(T),T.removeAttribute(V));f||clearInterval(x)},100)}H.disable=H.nativeSupport?e:u,H.enable=H.nativeSupport?e:i}(this),function(t){"use strict";var e=t.fn.val,r=t.fn.prop;Placeholders.nativeSupport||(t.fn.val=function(t){return void 0===t&&this.eq(0).data("placeholder-active")?"":e.apply(this,arguments)},t.fn.prop=function(t,e){return void 0===e&&this.eq(0).data("placeholder-active")&&"value"===t?"":r.apply(this,arguments)})}(jQuery);
/*******************
Package: MSG Sent
Version: 2.0
*******************/
(function(e){jQuery.fn.msgSent=function(t){var n={variable:"sent",message:"Thank you for contacting us! We look forward to helping you with your needs.<br/><br/><strong>We will contact you soon to discuss how we can help!</strong>",bgColor:"rgb(61, 80, 102)",bgColorAlpha:"rgba(61, 80, 102,.9)",borderRadius:"50%"},t=e.extend(n,t);return this.each(function(){function n(){var e={};return window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(t,n,o){e[n]=o}),e}function o(){var n='				<style type="text/css">				.dyn-page-mask{					position: absolute;					top: 0;					left: 0;					z-index:9999;					width: 100%;					height: 100%;					background: rgba(255,255,255,.5);					display: none;				}				.msgsent{				    display: block;				    position: absolute;				    z-index: 9999;				    width: 280px;				    height: 280px;				    top:-350px;				    left: 50%;				    margin-left: -147px;				    padding: 10px 5px;				    background: '+t.bgColor+";				    background: "+t.bgColorAlpha+";				    border: 2px solid white;				    color: white;				    -webkit-border-radius: "+t.borderRadius+";				       -moz-border-radius: "+t.borderRadius+";				            border-radius: "+t.borderRadius+";				    -webkit-box-shadow: 0 2px 10px rgba(0,0,0,.25);				       -moz-box-shadow: 0 2px 10px rgba(0,0,0,.25);				    	    box-shadow: 0 2px 10px rgba(0,0,0,.25);				}				.msgsent .msg-content{				    width: 75%;				    margin: 0 auto;				    padding: 70px 0 0;				    text-align: center;				    background: url(/images/confirm-mail-icon.png) no-repeat top center;				}				.msgsent .msg-content p{				    margin-bottom: 1em;				}				.msgsent .msg-content .close-icon{				    cursor: pointer;				    color: #FFFFFF;				    text-decoration: none;				}				.msgsent .msg-content .close-icon:hover{					color: #222222;				}				</style>",o=n.replace(/(\r\n|\n|\r|\t)/gm,"");e("head").append(o)}function i(e){var n='					<div class="dyn-page-mask '+t.variable+'"></div>					<div class="msgsent '+t.variable+'">				        <div class="msg-content '+t.variable+'">				        <p>'+t.message+'</p>				        <a class="close-icon '+t.variable+'">&#10006; close</a>				        </div>				    </div>				';e.prepend(n)}var a=e(this),r=n().msg;return r==t.variable&&(o(),i(a),e(".msgsent."+t.variable).length>0&&(e(".msgsent."+t.variable+" .close-icon").click(function(){e(".msgsent."+t.variable).stop().animate({top:"-350px"},600),e(".dyn-page-mask."+t.variable).stop().fadeOut(600)}),e(".msgsent."+t.variable).delay(600).animate({top:"75px"},600).delay(8e3).animate({top:"-350px"},600),e(".dyn-page-mask."+t.variable).delay(600).fadeIn(600).delay(8e3).fadeOut(600))),!0})}})(jQuery);
/*******************
Package: SplitIntoColumns
Version: 2.0
*******************/
(function(e){jQuery.fn.splitIntoColumns=function(t){var n={elementsToSplit:null,count:2,minItems:0,remainder:"start",onFinish:function(){}},t=e.extend(n,t);return this.each(function(){var n=e(this),o=t.elementsToSplit?n.find(t.elementsToSplit):n.children(),i=o.length;if(i>=t.minItems){if(n.addClass("dyn-split-into-columns"),"start"==t.remainder)var a=Math.ceil(i/t.count);else var a=Math.floor(i/t.count);o.wrapAll('<div class="dyn-columns-wrap"></div>');for(var r=1;t.count>=r;++r)r==t.count?e(".dyn-columns-wrap").children().not(e(".dyn-col")).wrapAll('<div class="dyn-col dyn-num-'+t.count+" dyn-col-"+r+'"></div>'):e(".dyn-columns-wrap").children().not(e(".dyn-col")).slice(0,a).wrapAll('<div class="dyn-col dyn-num-'+t.count+" dyn-col-"+r+'"></div>');t.onFinish()}return!0})}})(jQuery);
/*******************
Package: liveCss.js - suego
Version: 1.0
*******************/
(function(e){e(document).ready(function(){function t(e){for(var t=window.location.search.substring(1),n=t.split("&"),o=0;n.length>o;o++){var i=n[o].split("=");if(i[0]==e)return i[1]}return!1}var n=t("livecss");if(0!=n&&void 0!=n&&"false"!=n){"true"==n&&(n=500),console.log("LiveCss.js: Enabled at "+n+"ms Interval");var o=e('head link[href*="main.css"]'),i=o.attr("href");setInterval(function(){var t=e("head .dx-live-css");0==t.length?(e("head").append('<style type="text/css" class="dx-live-css"></style>'),t.load(i)):t.load(i)},n)}})})(jQuery);
/*******************
Package: Parallax Background
Version: 2.0
*******************/
(function(e){jQuery.fn.parallaxBackground=function(t){var n={speed:.5,ypos:0},t=e.extend(n,t);return this.each(function(){function n(){var n=e(window).scrollTop(),o=i.offset(),r=o.top-a,s=o.top+i.innerHeight();if(n>r&&s>n){n-=o.top;var l=-(n*t.speed)+t.ypos;i.css({"background-position":"50% "+l+"px"})}return l}var o=e(this),i=o;i.offset().top*t.speed+t.ypos,i.css({"background-attachment":"fixed","background-size":"cover"});var a=e(window).height();return setTimeout(function(){n()},300),e(window).scroll(function(){n()}),e(window).resize(function(){a=e(this).height(),n()}),!0})}})(jQuery);
/*******************
Package: MobileNav
Version: 4.5
*******************/
(function(e){jQuery.fn.mobileNav=function(t){function n(n){n.find("#menu").prepend('<h1 id="menu-icon">'+t.navText+"</h1>"),n.find("#menu-icon").click(function(){n.find("#nav").toggle(),e(this).toggleClass("active"),e(n).toggleClass("active")}),n.find("#nav > li ul, .submenu-wrapper").parents("li").addClass("parent-menu"),n.find("#nav > li ul").parents("li").addClass("parent").find("a:eq(0)").append('<span class="toggle">').find(".toggle").click(function(t){t.preventDefault(),e(this).parents("li").find("ul").toggleClass("open")})}function o(n){var o="#"+n.attr("id"),i=e("#nav").css("display"),a=t.breakPoint+1,r='			<style type="text/css">				@media screen and (min-width: '+a+"px){					#nav{display: "+i+" !important;}				  	.menubr,#menu-icon{display: none;}				}				@media screen and (max-width: "+t.breakPoint+"px){				  "+o+" {				    position: relative;				    display: block;				    top: 0;				    right: 0;				    width: 75%;				    clear: both;				    margin: 5px auto;				    padding: 0;				    border: none;				    background: none;				    -webkit-border-radius: 0;				    -moz-border-radius: 0;				    border-radius: 0;				  }				  "+o+" #menu {				    position: relative;				    width: 100%;				    display: block;				  }				  "+o+" #menu > div {				    line-height: 0;				  }				  "+o+" #menu #menu-icon {				    font-size: 16px;				    line-height: 1.5em;				    font-weight: normal;				    text-align: left;				    color: "+t.navTextColor+";				    position: relative;				    right: auto;				    width: auto !important;				    margin: 0;				    display: block !important;				    background: url("+t.navIcon+") no-repeat 7px -24px "+t.navBgColor+";				    background-size: 20px;				    padding: 6px 7px 7px 35px;				    -webkit-border-radius: 3px;				    -moz-border-radius: 3px;				    border-radius: 3px;				    cursor: pointer;				    border: 1px solid transparent;				    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);				    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);				    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);				  }				  "+o+" #menu #menu-icon:hover,				  "+o+" #menu #menu-icon.active {				    color: "+t.navTextColorHover+";				    background-color: "+t.navBgHover+";				  }				  "+o+' #menu #menu-icon:after {				    content: "";				    display: block;				    position: absolute;				    border: 6px solid transparent;				    border-top: 8px solid #ffffff;				    margin-top: -4px;				    top: 50%;				    right: 20px;				  }				  '+o+" #menu #nav {				    background: "+t.menuBgColor+";				    border-top: 4px solid "+t.menuDividerColor+";				    border-bottom: 4px solid "+t.menuDividerColor+";				    position: absolute;				    display: block;				    right: 0;				    left: auto;				    top: 96%;				    bottom: auto;				    width: 100%;				    float: none;				    margin: 0 0px 0 -1px;				    padding: 0;				    display: none;				    box-shadow: none;				    z-index: 9990;				    list-style: none;				    overflow: hidden;				    -webkit-border-radius: 0 0 2px 2px;				    -moz-border-radius: 0 0 2px 2px;				    border-radius: 0 0 2px 2px;				    -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);				    -moz-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);				    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);				    /*End of li */				  				  }				  "+o+" #menu #nav li {				    background: none;				    border: none;				    border-top: 1px dotted "+t.menuDividerColor+";				    display: block;				    position: relative;				    left: 0;				    top: 0;				    float: none;				    width: auto;				    text-align: left;				    padding: 4px;				    margin: 0;				    height: auto;				    clear: both;				  }				  "+o+" #menu #nav li:hover ul {				    display: none !important;				  }				  "+o+" #menu #nav li:hover .nav-inner > a,				  "+o+" #menu #nav li a:hover {				    background: "+t.menuBgHover+";				    color: "+t.menuTextColorHover+";				    border: none;				    text-shadow: none;				    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);				    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);				    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);				  }				  "+o+" #menu #nav li:after {				    display: none;				  }				  "+o+" #menu #nav li:first-child {				    border-top: none;				  }				  "+o+" #menu #nav li.parent-menu:hover:after {				    border-top-color: "+t.menuTextColorHover+";				  }				  "+o+" #menu #nav li.parent-menu .nav-inner a .toggle:after,				   "+o+" #menu #nav li.parent-menu > a .toggle:after{				    border-left: 6px solid transparent;				    border-right: 6px solid transparent;				    border-top: 8px solid "+t.menuDividerColor+';				    content: "";				    position: absolute;				    top: 50%;				    right: 50%;				    left: auto;				    margin-top: -4px;				    margin-right: -6px;				    background: none;				    display: block;				    width: 0;				    height: 0;				  }				  '+o+" #menu #nav li .nav-inner{						display: block;						margin: 0;						padding: 0;						width: auto;						height: auto;				  }				  "+o+" #menu #nav li a {				    color: "+t.menuTextColor+";				    position: relative;				    display: block;				    font-size: 14px;				    line-height: 1.25em;				    float: none;				    width: auto;				    height: auto;				    padding: 8px 40px 8px 8px;				    margin: 0;				    background: none;				    text-align: left;				    border: none;				    -webkit-border-radius: 2px;				    -moz-border-radius: 2px;				    border-radius: 2px;				    text-shadow: none;				  }				  "+o+" #menu #nav li a .toggle {				    position: absolute;				    top: 0;				    right: 0;				    display: block;				    height: 100%;				    width: 40px;				    border-left: 1px solid "+t.menuDividerColor+";				    cursor: pointer;				  }				  "+o+" #menu #nav li a .toggle:hover {				    background: rgba(0, 0, 0, .25);				  }				  "+o+" #menu #nav li a .toggle:hover:after {				    border-top-color: "+t.menuTextColorHover+";				  }				  "+o+" #menu #nav li ul {				    background: "+t.subMenuBgColor+";				    display: none;				    position: relative;				    top: 0;				    left: 0;				    margin: 0 0 4px;				    padding: 0;				    border: none;				    width: 100%;				    height: auto;				    float: left;				    border: none;				    -webkit-box-shadow: none;				    -moz-box-shadow: none;				    box-shadow: none;				    -webkit-border-radius: 0 0 3px 3px;				    -moz-border-radius: 0 0 3px 3px;				    border-radius: 0 0 3px 3px;				  }				  "+o+" #menu #nav > li > ul{				  	-webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.25);				    -moz-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.25);				    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.25);				  }				  "+o+" #menu #nav li ul.open {				    display: block !important;				  }				  "+o+" #menu #nav li ul:after {				    border: 5px solid transparent;				    border-bottom-color: #f0f4f9;				    border-top: none;				    top: -5px;				  }				  "+o+" #menu #nav li ul li {				    padding-left: 0;				    width: 96%;				    padding: 8px 2%;				    margin: 0;				  }				  "+o+" #menu #nav li ul li a {				    color: "+t.subMenuTextColor+";				  }				  "+o+" #menu #nav li:before,				  "+o+" #menu #nav li:after,				  "+o+" #menu #nav a:before,				  "+o+" #menu #nav a:after  {				    display: none !important;				  }			  </style>";r.replace(/(\r\n|\n|\r|\t)/gm,""),e("head").append(r)}var i={breakPoint:740,navText:"Navigation",navIcon:"/assets/images/mobile-menu-icon@2x.png",navBgColor:"rgb(185, 6, 0)",navBgHover:"rgb(1, 40, 124)",navTextColor:"white",navTextColorHover:"#ffffff",menuDividerColor:"rgb(221, 221, 221)",menuBgColor:"rgb(194, 124, 0)",menuBgHover:"rgb(71, 132, 193)",menuTextColor:"#ffffff",menuTextColorHover:"#ffffff",subMenuBgColor:"rgb(206, 230, 255)",subMenuTextColor:"#333333",addStyles:!0},t=e.extend(i,t);return this.each(function(){var i=e(this);return n(i),1==t.addStyles&&o(i),!0})}})(jQuery);
/*******************
Package: Colorbox
Version: 1.4.3
*******************/
/*!
	jQuery ColorBox v1.4.3 - 2013-02-18
	(c) 2013 Jack Moore - jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e,t,i){function o(i,o,n){var r=t.createElement(i);return o&&(r.id=Y+o),n&&(r.style.cssText=n),e(r)}function n(e){var t=T.length,i=(A+e)%t;return 0>i?t+i:i}function r(e,t){return Math.round((/%/.test(e)?("x"===t?k.width():k.height())/100:1)*parseInt(e,10))}function h(e,t){return e.photo||e.photoRegex.test(t)}function l(e,t){return e.retinaUrl&&i.devicePixelRatio>1?t.replace(e.photoRegex,e.retinaSuffix):t}function s(e){"contains"in w[0]&&!w[0].contains(e.target)&&(e.stopPropagation(),w.focus())}function a(){var t,i=e.data(N,V);null==i?(K=e.extend({},J),console&&console.log&&console.log("Error: cboxElement missing settings object")):K=e.extend({},i);for(t in K)e.isFunction(K[t])&&"on"!==t.slice(0,2)&&(K[t]=K[t].call(N));K.rel=K.rel||N.rel||e(N).data("rel")||"nofollow",K.href=K.href||e(N).attr("href"),K.title=K.title||N.title,"string"==typeof K.href&&(K.href=e.trim(K.href))}function d(i,o){e(t).trigger(i),at.trigger(i),e.isFunction(o)&&o.call(N)}function c(){var e,t,i,o,n,r=Y+"Slideshow_",h="click."+Y;K.slideshow&&T[1]?(t=function(){clearTimeout(e)},i=function(){(K.loop||T[A+1])&&(e=setTimeout(G.next,K.slideshowSpeed))},o=function(){M.html(K.slideshowStop).unbind(h).one(h,n),at.bind(it,i).bind(tt,t).bind(ot,n),w.removeClass(r+"off").addClass(r+"on")},n=function(){t(),at.unbind(it,i).unbind(tt,t).unbind(ot,n),M.html(K.slideshowStart).unbind(h).one(h,function(){G.next(),o()}),w.removeClass(r+"on").addClass(r+"off")},K.slideshowAuto?o():n()):w.removeClass(r+"off "+r+"on")}function u(i){U||(N=i,a(),T=e(N),A=0,"nofollow"!==K.rel&&(T=e("."+Z).filter(function(){var t,i=e.data(this,V);return i&&(t=e(this).data("rel")||i.rel||this.rel),t===K.rel}),A=T.index(N),-1===A&&(T=T.add(N),A=T.length-1)),m.css({opacity:parseFloat(K.opacity),cursor:K.overlayClose?"pointer":"auto",visibility:"visible"}).show(),j||(j=q=!0,w.css({visibility:"hidden",display:"block"}),E=o(dt,"LoadedContent","width:0; height:0; overflow:hidden").appendTo(v),_=x.height()+C.height()+v.outerHeight(!0)-v.height(),z=y.width()+b.width()+v.outerWidth(!0)-v.width(),D=E.outerHeight(!0),B=E.outerWidth(!0),K.w=r(K.initialWidth,"x"),K.h=r(K.initialHeight,"y"),G.position(),lt&&k.bind("resize."+st+" scroll."+st,function(){m.css({width:k.width(),height:k.height(),top:k.scrollTop(),left:k.scrollLeft()})}).trigger("resize."+st),c(),d(et,K.onOpen),P.add(W).hide(),R.html(K.close).show(),w.focus(),t.addEventListener&&(t.addEventListener("focus",s,!0),at.one(nt,function(){t.removeEventListener("focus",s,!0)})),K.returnFocus&&at.one(nt,function(){e(N).focus()})),G.load(!0))}function f(){!w&&t.body&&(X=!1,k=e(i),w=o(dt).attr({id:V,"class":ht?Y+(lt?"IE6":"IE"):"",role:"dialog",tabindex:"-1"}).hide(),m=o(dt,"Overlay",lt?"position:absolute":"").hide(),L=o(dt,"LoadingOverlay").add(o(dt,"LoadingGraphic")),g=o(dt,"Wrapper"),v=o(dt,"Content").append(W=o(dt,"Title"),H=o(dt,"Current"),F=o("button","Previous"),S=o("button","Next"),M=o("button","Slideshow"),L,R=o("button","Close")),g.append(o(dt).append(o(dt,"TopLeft"),x=o(dt,"TopCenter"),o(dt,"TopRight")),o(dt,!1,"clear:left").append(y=o(dt,"MiddleLeft"),v,b=o(dt,"MiddleRight")),o(dt,!1,"clear:left").append(o(dt,"BottomLeft"),C=o(dt,"BottomCenter"),o(dt,"BottomRight"))).find("div div").css({"float":"left"}),I=o(dt,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),P=S.add(F).add(H).add(M),e(t.body).append(m,w.append(g,I)))}function p(){function i(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||(e.preventDefault(),u(this))}return w?(X||(X=!0,S.click(function(){G.next()}),F.click(function(){G.prev()}),R.click(function(){G.close()}),m.click(function(){K.overlayClose&&G.close()}),e(t).bind("keydown."+Y,function(e){var t=e.keyCode;j&&K.escKey&&27===t&&(e.preventDefault(),G.close()),j&&K.arrowKey&&T[1]&&!e.altKey&&(37===t?(e.preventDefault(),F.click()):39===t&&(e.preventDefault(),S.click()))}),e.isFunction(e.fn.on)?e(t).on("click."+Y,"."+Z,i):e("."+Z).live("click."+Y,i)),!0):!1}var m,w,g,v,x,y,b,C,T,k,E,I,L,W,H,M,S,F,R,P,K,_,z,D,B,N,A,O,j,q,U,$,G,Q,X,J={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0},V="colorbox",Y="cbox",Z=Y+"Element",et=Y+"_open",tt=Y+"_load",it=Y+"_complete",ot=Y+"_cleanup",nt=Y+"_closed",rt=Y+"_purge",ht=!e.support.leadingWhitespace,lt=ht&&!i.XMLHttpRequest,st=Y+"_IE6",at=e({}),dt="div";e.colorbox||(e(f),G=e.fn[V]=e[V]=function(t,i){var o=this;if(t=t||{},f(),p()){if(e.isFunction(o))o=e("<a/>"),t.open=!0;else if(!o[0])return o;i&&(t.onComplete=i),o.each(function(){e.data(this,V,e.extend({},e.data(this,V)||J,t))}).addClass(Z),(e.isFunction(t.open)&&t.open.call(o)||t.open)&&u(o[0])}return o},G.position=function(e,t){function i(e){x[0].style.width=C[0].style.width=v[0].style.width=parseInt(e.style.width,10)-z+"px",v[0].style.height=y[0].style.height=b[0].style.height=parseInt(e.style.height,10)-_+"px"}var o,n,h,l=0,s=0,a=w.offset();k.unbind("resize."+Y),w.css({top:-9e4,left:-9e4}),n=k.scrollTop(),h=k.scrollLeft(),K.fixed&&!lt?(a.top-=n,a.left-=h,w.css({position:"fixed"})):(l=n,s=h,w.css({position:"absolute"})),s+=K.right!==!1?Math.max(k.width()-K.w-B-z-r(K.right,"x"),0):K.left!==!1?r(K.left,"x"):Math.round(Math.max(k.width()-K.w-B-z,0)/2),l+=K.bottom!==!1?Math.max(k.height()-K.h-D-_-r(K.bottom,"y"),0):K.top!==!1?r(K.top,"y"):Math.round(Math.max(k.height()-K.h-D-_,0)/2),w.css({top:a.top,left:a.left,visibility:"visible"}),e=w.width()===K.w+B&&w.height()===K.h+D?0:e||0,g[0].style.width=g[0].style.height="9999px",o={width:K.w+B+z,height:K.h+D+_,top:l,left:s},0===e&&w.css(o),w.dequeue().animate(o,{duration:e,complete:function(){i(this),q=!1,g[0].style.width=K.w+B+z+"px",g[0].style.height=K.h+D+_+"px",K.reposition&&setTimeout(function(){k.bind("resize."+Y,G.position)},1),t&&t()},step:function(){i(this)}})},G.resize=function(e){j&&(e=e||{},e.width&&(K.w=r(e.width,"x")-B-z),e.innerWidth&&(K.w=r(e.innerWidth,"x")),E.css({width:K.w}),e.height&&(K.h=r(e.height,"y")-D-_),e.innerHeight&&(K.h=r(e.innerHeight,"y")),e.innerHeight||e.height||(E.css({height:"auto"}),K.h=E.height()),E.css({height:K.h}),G.position("none"===K.transition?0:K.speed))},G.prep=function(t){function i(){return K.w=K.w||E.width(),K.w=K.mw&&K.mw<K.w?K.mw:K.w,K.w}function r(){return K.h=K.h||E.height(),K.h=K.mh&&K.mh<K.h?K.mh:K.h,K.h}if(j){var s,a="none"===K.transition?0:K.speed;E.empty().remove(),E=o(dt,"LoadedContent").append(t),E.hide().appendTo(I.show()).css({width:i(),overflow:K.scrolling?"auto":"hidden"}).css({height:r()}).prependTo(v),I.hide(),e(O).css({"float":"none"}),s=function(){function t(){ht&&w[0].style.removeAttribute("filter")}var i,r,s=T.length,c="frameBorder",u="allowTransparency";j&&(r=function(){clearTimeout($),L.hide(),d(it,K.onComplete)},ht&&O&&E.fadeIn(100),W.html(K.title).add(E).show(),s>1?("string"==typeof K.current&&H.html(K.current.replace("{current}",A+1).replace("{total}",s)).show(),S[K.loop||s-1>A?"show":"hide"]().html(K.next),F[K.loop||A?"show":"hide"]().html(K.previous),K.slideshow&&M.show(),K.preloading&&e.each([n(-1),n(1)],function(){var t,i,o=T[this],n=e.data(o,V);n&&n.href?(t=n.href,e.isFunction(t)&&(t=t.call(o))):t=e(o).attr("href"),t&&h(n,t)&&(t=l(n,t),i=new Image,i.src=t)})):P.hide(),K.iframe?(i=o("iframe")[0],c in i&&(i[c]=0),u in i&&(i[u]="true"),K.scrolling||(i.scrolling="no"),e(i).attr({src:K.href,name:(new Date).getTime(),"class":Y+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",r).appendTo(E),at.one(rt,function(){i.src="//about:blank"}),K.fastIframe&&e(i).trigger("load")):r(),"fade"===K.transition?w.fadeTo(a,1,t):t())},"fade"===K.transition?w.fadeTo(a,0,function(){G.position(0,s)}):G.position(a,s)}},G.load=function(t){var n,s,c,u=G.prep;q=!0,O=!1,N=T[A],t||a(),Q&&w.add(m).removeClass(Q),K.className&&w.add(m).addClass(K.className),Q=K.className,d(rt),d(tt,K.onLoad),K.h=K.height?r(K.height,"y")-D-_:K.innerHeight&&r(K.innerHeight,"y"),K.w=K.width?r(K.width,"x")-B-z:K.innerWidth&&r(K.innerWidth,"x"),K.mw=K.w,K.mh=K.h,K.maxWidth&&(K.mw=r(K.maxWidth,"x")-B-z,K.mw=K.w&&K.w<K.mw?K.w:K.mw),K.maxHeight&&(K.mh=r(K.maxHeight,"y")-D-_,K.mh=K.h&&K.h<K.mh?K.h:K.mh),n=K.href,$=setTimeout(function(){L.show()},100),K.inline?(c=o(dt).hide().insertBefore(e(n)[0]),at.one(rt,function(){c.replaceWith(E.children())}),u(e(n))):K.iframe?u(" "):K.html?u(K.html):h(K,n)?(n=l(K,n),e(O=new Image).addClass(Y+"Photo").bind("error",function(){K.title=!1,u(o(dt,"Error").html(K.imgError))}).one("load",function(){var e;K.retinaImage&&i.devicePixelRatio>1&&(O.height=O.height/i.devicePixelRatio,O.width=O.width/i.devicePixelRatio),K.scalePhotos&&(s=function(){O.height-=O.height*e,O.width-=O.width*e},K.mw&&O.width>K.mw&&(e=(O.width-K.mw)/O.width,s()),K.mh&&O.height>K.mh&&(e=(O.height-K.mh)/O.height,s())),K.h&&(O.style.marginTop=Math.max(K.mh-O.height,0)/2+"px"),T[1]&&(K.loop||T[A+1])&&(O.style.cursor="pointer",O.onclick=function(){G.next()}),ht&&(O.style.msInterpolationMode="bicubic"),setTimeout(function(){u(O)},1)}),setTimeout(function(){O.src=n},1)):n&&I.load(n,K.data,function(t,i){u("error"===i?o(dt,"Error").html(K.xhrError):e(this).contents())})},G.next=function(){!q&&T[1]&&(K.loop||T[A+1])&&(A=n(1),G.load())},G.prev=function(){!q&&T[1]&&(K.loop||A)&&(A=n(-1),G.load())},G.close=function(){j&&!U&&(U=!0,j=!1,d(ot,K.onCleanup),k.unbind("."+Y+" ."+st),m.fadeTo(200,0),w.stop().fadeTo(300,0,function(){w.add(m).css({opacity:1,cursor:"auto"}).hide(),d(rt),E.empty().remove(),setTimeout(function(){U=!1,d(nt,K.onClosed)},1)}))},G.remove=function(){e([]).add(w).add(m).remove(),w=null,e("."+Z).removeData(V).removeClass(Z),e(t).unbind("click."+Y)},G.element=function(){return e(N)},G.settings=J)})(jQuery,document,window);
/*******************
Package: StickyStack v1.1.2
Version: snippet
*******************/
/*
**********************************************************
* StickyStack.js
* 
* Version:    	v1.1.2
* Author:		Mike Zarandona
* Release:		June 03 2014
* 				Added a fix for sections that are taller than the screen
* 
* Reqs:			jQuery
* 
* Usage:		$('.main-content-wrapper').stickyStack({
*					containerElement:	'.main-content-wrapper',
*					stackingElement:	'section',
*					boxShadow:			'0 -3px 20px rgba(0, 0, 0, 0.25)'
*				});
**********************************************************
*/

(function ($, undefined) {
	$.fn.stickyStack = function (options) {

		/* Override defaults with specified options. */
		options = $.extend({}, $.fn.stickyStack.options, options);

		// Variables setup
		var $sections = $(options.containerElement + ' > ' + options.stackingElement),
			sectionsInfo = [],

		// Build the styles
			styles = 
				options.stackingElement + '{' +
					'box-sizing: border-box;' +
					'-moz-box-sizing: border-box;' +
					'position: relative;' +
					'z-index: 100;' +
				'}' +

				options.stackingElement + '.stuck {' +
					'position: fixed;' +
					'top: 0;' +
					'z-index: 0;' +
				'}' +

				options.stackingElement + '.stuck + ' + options.stackingElement + ':not(.stuck) {' +
					'box-shadow: ' + options.boxShadow + ';' +
				'}' +

				options.stackingElement + '.stuck.align-bottom {' +
					'top: auto !important;' +
					'bottom: 0 !important;' +
				'}';

		// Append the styles to the <head>
		$('head').append('<style id="sticky-stack-styles" type="text/css">' + styles + '</style>');



		// Document ready()
		$(document).ready(function() {

			buildSectionsInfo();

			// Fix the section width
			var origWidth = $sections.eq(0).outerWidth(true);
			$sections.css('width', origWidth + 'px');
		});



		// Window scroll()
		$(window).on('scroll', function() {

			// Current scroll position
			var windowScrollPos = $(window).scrollTop(),

			// Counter variable
				counter = 0;

			// Count how many sections should be stuck
			for (var t = 0; t < $sections.length; t++) {
				if ( windowScrollPos >= sectionsInfo[t][0] ) {
					counter++;
				}
			}

			setStickies(counter);
		});



		// Resize event to keep the site width fluid
		$(window).on('resize', function() {
			$sections.css('width', $(options.containerElement).width() + 'px');

			buildSectionsInfo();
		});



		function setStickies(howMany) {

			// Step 1:  Calculate how much padding the parent container should get
			var paddingTop = 0;

			// Total the amount of padding of stuck sections
			for (var p = 0; p < howMany; p++) {
				paddingTop += $sections.eq(p).outerHeight(true);
			}

			// Append that height to the parent wrapper
			$sections.eq(0).parent().css('padding-top', paddingTop);


			// Step 2:  Stick the sections to be stuck (heh)
			for (var s = 0; s < $sections.length; s++) {
				if (howMany > 0) {
					$sections.eq(s).addClass('stuck');
					howMany--;
				}
				else {
					$sections.eq(s).removeClass('stuck');
				}
			}
		}



		// Helper function which builds the array sectionsInfo[] which keeps track of all the section elements
		function buildSectionsInfo() {
			// Build an array of the sections
			//		sectionsInfo[i][0] = Position from top of document
			//		sectionsInfo[i][1] = Height of section
			//		sectionsInfo[i][2] = Scroll offset (if taller than viewport)
			var runningHeightCounter = 0;

			console.info( 'window height = ' + $(window).outerHeight(true) );
			console.info( 'viewport height = ' + $(document).outerHeight(true) );

			for (var i = 0; i < $sections.length; i++) {
				sectionsInfo[i] = [];

				// record the height of the section
				sectionsInfo[i][1] = $sections.eq(i).outerHeight(true);

				// write the data-scrollto
				$sections.eq(i).attr('data-scrollto', $sections.eq(i).offset().top);

				// if the section is stuck, calculate its .offset() based on preceeding section heights
				if ( $sections.eq(i).hasClass('stuck') ) {
					sectionsInfo[i][0] = runningHeightCounter;
					runningHeightCounter += sectionsInfo[i][1];
				}
				else {
					sectionsInfo[i][0] = $sections.eq(i).offset().top;
				}

				// Attach a data attribute to be used to scroll to sections
				$sections.eq(i).attr('data-scrollto', sectionsInfo[i][0]);
				$sections.eq(i).attr('data-height', sectionsInfo[i][1]);
			}
			console.log(runningHeightCounter);
		}

	};



	// Default the defaults
	$.fn.stickyStack.options = {
		containerElement:	'.main-content-wrapper',
		stackingElement:	'section',
		boxShadow:		'0 -3px 20px rgba(0, 0, 0, 0.25)'
	};
})(jQuery);