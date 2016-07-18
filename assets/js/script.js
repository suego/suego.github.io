$(document).ready(function() {
	"use strict";
// --------------Newsletter-----------------------

	$(".newsletter-signup").ajaxChimp({
		callback: mailchimpResponse,
		url: "//suego.us9.list-manage.com/subscribe/post?u=c1a6afec54227fe57019e1acb&amp;id=4ffbb4c286" 
	});

	function mailchimpResponse(resp) {
		 if(resp.result === 'success') {
		 
			$('.alert-success').html(resp.msg).fadeIn().delay(3000).fadeOut();
			
		} else if(resp.result === 'error') {
			$('.alert-warning').html(resp.msg).fadeIn().delay(3000).fadeOut();
		}  
	};
 });