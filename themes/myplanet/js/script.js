(function($) { $("document").ready(function() {

	var openspeed = 850;
	var closespeed = 250;
	var easingtype = "easeOutElastic";
	
	/* Thumbnail */
	$(".thumbnail, .thumbnail-new").hover(
		function() { $(this).find(".link").stop().animate({ opacity: 1 }, 100, "easeOutCubic"); }, 
		function() { $(this).find(".link").stop().animate({ opacity: 0 }, 800, "easeOutCubic"); }
	);
	
	$(".thumbnail, .thumbnail-new").hover(
		function() { $(this).find(".readmore").stop().animate({ backgroundPositionX: "24px" }, openspeed, easingtype); }, 
		function() { $(this).find(".readmore").stop().animate({ backgroundPositionX: "20px" }, openspeed); }
	);
	
	/* Related */
	$(".related .thumbnail").unbind();
	$(".related .readmore").hover(
		function() { $(this).stop().animate({ backgroundPosition: "0px 0px" }, openspeed, easingtype); }, 
		function() { $(this).stop().animate({ backgroundPosition: "-12px 0px" }, closespeed); }
	);
	
	/* Footer links */
	$("#footer a").hover(
		function() { $(this).stop().animate({ opacity: 0.5 }, closespeed); },
		function() { $(this).animate({ opacity: 1 }, closespeed); }
	);
	
	/* To Top */
	$(function(){$.fn.scrollToTop=function(){$(this).hide().removeAttr("href");if($(window).scrollTop()!="0"){$(this).fadeIn("fast","easeInOutExpo")}var scrollDiv=$(this);$(window).scroll(function(){if($(window).scrollTop()=="0"){$(scrollDiv).fadeOut("fast")}else{$(scrollDiv).fadeIn("fast")}});$(this).click(function(){$("html, body").animate({scrollTop:0},"slow", "easeInOutExpo")})}});

	$(function() { $("#to_top").scrollToTop(); });
	
	$("#to_top").hover(
		function() { $(this).stop().animate({ backgroundPositionY: "5px" }, openspeed, easingtype); }, 
		function() { $(this).stop().animate({ backgroundPositionY: "12px" }, closespeed); }
	);
	
	/* Main menu links */
	$("#main-menu ul li a").hover(
		function() { $(this).stop().animate({ backgroundPositionY: "-28px" }, openspeed, easingtype);}, 
		function() { $(this).stop().animate({ backgroundPositionY: "-14px" }, closespeed);}
	);

	
	
}); })(jQuery);

