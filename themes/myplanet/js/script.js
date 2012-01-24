(function($) { $("document").ready(function() {

	var openspeed = 850;
	var closespeed = 250;
	var easingtype = "easeOutElastic";
	
	/* Add custom classes to views items */
	$(".view").each(function() {
		var full_width = $(this).width();
		var item_width = $(this).find(".views-row").width();
		var columns_count = Math.floor(full_width / item_width);
		var items_count = $(this).find(".views-row").length;
		var last_line_item = Math.floor((items_count -1) / columns_count) * columns_count;
		$(this).find(".views-row").each(function(index) {
			$(this).addClass("my-col-" + (index % columns_count + 1));
			$(this).addClass("my-row-" + (Math.floor(index / columns_count) + 1));
			if ((index + 1) % columns_count == 0) {
				$(this).addClass("my-col-last");
			}
			if (index >= last_line_item) {
				$(this).addClass("my-row-last");
			}
		});
	});
	
	/* To Top */
	$(function(){$.fn.scrollToTop=function(){$(this).hide().removeAttr("href");if($(window).scrollTop()!="0"){$(this).fadeIn("fast","easeInOutExpo")}var scrollDiv=$(this);$(window).scroll(function(){if($(window).scrollTop()=="0"){$(scrollDiv).fadeOut("fast")}else{$(scrollDiv).fadeIn("fast")}});$(this).click(function(){$("html, body").animate({scrollTop:0},"slow", "easeInOutExpo")})}});

	$(function() { $(".to-top").css("display", "block").scrollToTop(); });
	
	$(".to-top .pane-content").hover(
		function() { $(this).stop().animate({ backgroundPositionY: "5px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPositionY: "12px" }, 250); }
	);
	
	/* Main Menu */
	$(".main-menu ul.menu li a").hover(
		function() { $(this).stop().animate({ backgroundPositionY: "-20px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPositionY: "-6px" }, 250); }
	);
	
	/* Footer */
	$(".footer .footer-4 .email a").hover(
		function() { $(this).stop().animate({ opacity: 0.5 }, 100, "easeOutCubic"); },
		function() { $(this).stop().animate({ opacity: 1 }, 100, "easeOutCubic"); }
	);
	
	$(".footer .footer-5 .links a").hover(
		function() {
			$(this).stop().animate({ opacity: 0.5 }, 100, "easeOutCubic", function() {
				if (parseInt($(this).css("background-position-x")) > -99) {
					$(this).css("background-position-x", parseInt($(this).css("background-position-x")) - 99);
				}
				$(this).animate({ opacity: 1 }, 100, "easeOutCubic");
			});
		},
		function() {
			$(this).stop().animate({ opacity: 0.5 }, 100, "easeOutCubic", function() {
				if (parseInt($(this).css("background-position-x")) <= -99) {
					$(this).css("background-position-x", parseInt($(this).css("background-position-x")) + 99);
				}
				$(this).animate({ opacity: 1 }, 100, "easeOutCubic");
			});
		}
	);
	
	/* Front Page Items */
	$(".front-items-view .views-row").hover(
		function() {
			$(this).find(".layer a").stop().animate({ opacity: 1 }, 100, "easeOutCubic");
			$(this).find(".link2").stop().animate({ backgroundPositionX: "24px" }, 850, "easeOutElastic");
		}, 
		function() {
			$(this).find(".layer a").stop().animate({ opacity: 0 }, 800, "easeOutCubic");
			$(this).find(".link2").stop().animate({ backgroundPositionX: "20px" }, 250);
		}
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

