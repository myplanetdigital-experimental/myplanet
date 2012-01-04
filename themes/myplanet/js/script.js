/* Views Column Divider */
var views_columns = function(parent_id, columns_count) {
	var items_count = jQuery("#" + parent_id + " .views-row").length;
	var last_line_item = Math.floor(items_count / columns_count) * columns_count;
	jQuery("#" + parent_id + " .views-row").each(function(index) {
		jQuery(this).addClass("views-col-" + (index % columns_count + 1));
		jQuery(this).addClass("views-line-" + (Math.floor(index / columns_count) + 1));
		if ((index + 1) % columns_count == 0) {
			jQuery(this).addClass("views-col-last");
		}
		if (index >= last_line_item) {
			jQuery(this).addClass("views-line-last");
		}
	});
};
	
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
	$(".related_region .thumbnail").unbind();
	$(".related_region .readmore").hover(
		function() { $(this).stop().animate({ backgroundPosition: "0px 0px" }, openspeed, easingtype); }, 
		function() { $(this).stop().animate({ backgroundPosition: "-12px 0px" }, closespeed); }
	);
	
	/* Related */
	$("#area_interest .thumbnail").unbind();
	$("#area_interest .readmore").hover(
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
	
	/* Blog Topics */
	$("#blog_topics a").hover(
		function() { $(this).stop().animate({ backgroundPositionX: "149px" }, openspeed, easingtype); }, 
		function() { $(this).stop().animate({ backgroundPositionX: "137px" }, closespeed); }
	);
	
	/* Contact Form */
	$(".contact_page .webform-component").hover(
		function() { $(this).find("label").stop().animate({ marginLeft: "8px" }, closespeed).animate({ marginLeft: "0px"  }, closespeed); }
	);
	
	var form_default_values = [];
	$(".contact_page .webform-component input[type='text'], .contact_page .webform-component textarea").focusin(
		function() {
			if (form_default_values[$(this).attr("id")] === undefined) {
				form_default_values[$(this).attr("id")] = $(this).attr("value");
			}
			if ($(this).attr("value") == form_default_values[$(this).attr("id")]) {
				$(this).attr("value", "");
			}
		}
	);
	$(".contact_page .webform-component input[type='text'], .contact_page .webform-component textarea").focusout(
		function() {
			if ($(this).attr("value") == "") {
				$(this).attr("value", form_default_values[$(this).attr("id")]);
			}
		}
	);
	
	$("#focal").serialScroll({
		target : "#slides",
		items : "li",				// Selector to the items ( relative to the matched elements, '#sections' in this case )
		prev : "#prev",				// Selector to the 'prev' button (absolute!, meaning it's relative to the document)
		next : "#next",				// Selector to the 'next' button (absolute too)
		axis : "xy",				// The default is 'y' scroll on both ways
		duration : 700,				// Length of the animation (if you scroll 2 axes and use queue, then each axis take half this time)
		force : true, 				// Force a scroll to the element specified by 'start' (some browsers don't reset on refreshes)
		easing : "easeInOutExpo", 
		//queue : false,			// We scroll on both axes, scroll both at the same time.
		//event : "click",			// On which event to react (click is the default, you probably won't need to specify it)
		//stop : false,				// Each click will stop any previous animations of the target. (false by default)
		//lock : true, 				// Ignore events if already animating (true by default)		
		//start : 0, 				// On which element (index) to begin ( 0 is the default, redundant in this case )		
		cycle : true,				// Cycle endlessly ( constant velocity, true is the default )
		//step : 1, 				// How many items to scroll each time ( 1 is the default, no need to specify )
		//jump : false, 			// If true, items become clickable (or w/e 'event' is, and when activated, the pane scrolls to them)
		//lazy : false,				// (default) if true, the plugin looks for the items on each event(allows AJAX or JS content, or reordering)
		interval : 8000 			// It's the number of milliseconds to automatically go to the next
		//constant : true, 			// constant speed
	});
	
}); })(jQuery);

