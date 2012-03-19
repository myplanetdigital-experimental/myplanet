var add_custom_classes = function(obj) {
	var full_width = obj.width();
	var items_count = obj.find(".views-row").length;
	
	var item_width = obj.find(".views-row").width();
	var margins = parseInt(obj.find(".views-row").css("margin-left")) + parseInt(obj.find(".views-row").css("margin-right")) + parseInt(obj.find(".views-row").css("padding-left")) + parseInt(obj.find(".views-row").css("padding-right"));
	
	var columns_count = Math.floor((full_width + margins) / (item_width + margins));
	var last_line_item = Math.floor((items_count -1) / columns_count) * columns_count;
		
	obj.find(".views-row").each(function(index) {
		jQuery(this).addClass("my-col-" + (index % columns_count + 1));
		jQuery(this).addClass("my-row-" + (Math.floor(index / columns_count) + 1));
		if ((index + 1) % columns_count == 0) {
			jQuery(this).addClass("my-col-last");
		}
		if (index >= last_line_item) {
			jQuery(this).addClass("my-row-last");
		}
	});
};
	
(function($) { $("document").ready(function() {

	/* To Top */
	$(function(){$.fn.scrollToTop=function(){$(this).hide().removeAttr("href");if($(window).scrollTop()!="0"){$(this).fadeIn("fast","easeInOutExpo")}var scrollDiv=$(this);$(window).scroll(function(){if($(window).scrollTop()=="0"){$(scrollDiv).fadeOut("fast")}else{$(scrollDiv).fadeIn("fast")}});$(this).click(function(){$("html, body").animate({scrollTop:0},"slow", "easeInOutExpo")})}});

	$(function() { $(".to-top").css("display", "block").scrollToTop(); });
	
	$(window).resize(function() {
		$(".image-viewer .image img").css("max-width", $(window).width());
	});
	
	$(".to-top .pane-content").hover(
		function() { $(this).stop().animate({ backgroundPositionY: "5px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPositionY: "12px" }, 250); }
	);
	
	/* Main Menu */
	$(".main-menu ul.menu li a").hover(
		function() { $(this).stop().animate({ backgroundPositionY: "-20px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPositionY: "-6px" }, 250); }
	);
	
	/* Breadcrumb */
	var temp_breadcrumb = $(".breadcrumb").html().replace(/ \» /g, "");
	$(".breadcrumb").html(temp_breadcrumb);
	$(".breadcrumb a:last").css("background", "none");
	
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
	
	/* Thumbnail */
	$(".thumbnail").hover(
		function() { $(this).find(".layer, .layer > .field-content > a").stop().animate({ opacity: 1 }, 100, "easeOutCubic"); }, 
		function() { $(this).find(".layer, .layer > .field-content > a").stop().animate({ opacity: 0 }, 800, "easeOutCubic"); }
	);
	
	$(".focal-slideshow").serialScroll({
		target : ".slides",
		items : "li",				// Selector to the items ( relative to the matched elements, '#sections' in this case )
		prev : ".focal-prev",		// Selector to the 'prev' button (absolute!, meaning it's relative to the document)
		next : ".focal-next",		// Selector to the 'next' button (absolute too)
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
	
	// Images
	var images = [];
	var cur_image_index = -1;
	
	$("img").click(function() {
		images = [];
		var cur_image_path = $(this).attr("src");
		
		var index = 0;
		$("img").each(function() {
			if ($(this).hasClass("no-img")) return;
			
			var original_path = $(this).attr("src");
			files_path = original_path.substr(0, original_path.indexOf("files") + 5);
			
			if (original_path == cur_image_path) {
				cur_image_index = index;
			}
			
			if ($(this).attr("src").indexOf("files/styles") != -1) {
				original_path = $(this).attr("src");
				original_path = original_path.substr(original_path.indexOf("/public/") + 8);
				original_path = files_path + "/" + original_path;
			}
			
			if ($(this).attr("src").indexOf("files/resize") != -1) {
				original_path = $(this).attr("src");
				original_path = original_path.substr(original_path.indexOf("files/resize") + 13);
				original_path = original_path.substr(0, original_path.lastIndexOf("-")) + original_path.substr(original_path.lastIndexOf("."));
				original_path = files_path + "/" + original_path;
			}
			
			images.push({ obj : $(this), path : original_path });
			index++;
		});

		$("#layer-wrapper").css("display", "block");
		$(".image-viewer").css("padding-top", $(window).scrollTop());
		update_image_viewer_image();
		$("#layer-wrapper").fadeIn(500, "easeOutCubic");
		
		return false;
	});
	
	var update_image_viewer_image = function() {
		$(".image-viewer .image").html("<img class='no-img' src='" + images[cur_image_index]["path"] + "' />");
		$(".image-viewer .title .pane-content").html(images[cur_image_index]["obj"].attr("title"));
		$(".image-viewer .summary .pane-content").html(images[cur_image_index]["obj"].attr("alt"));
		$(".image-viewer .summary").css("padding-left", ($(".image-viewer .title").offset().left + 4) + "px");
		$(".image-viewer .image img").css("max-width", $(window).width());
	};
	
	$(".image-viewer .back, .image-viewer .image, .image-viewer .close").click(function() {
		$("#layer-wrapper").fadeOut(800, "easeOutCubic");
	});
	
	$(".image-viewer .previous").click(function() {
		cur_image_index--;
		
		if (cur_image_index == -1) {
			cur_image_index = images.length - 1;
		}
		
		update_image_viewer_image();
	});
	
	$(".image-viewer .next").click(function() {
		cur_image_index++;
		
		if (cur_image_index == images.length) {
			cur_image_index = 0;
		}
		
		update_image_viewer_image();
	});
	
	$(".image-viewer .previous").hover(
		function() { $(this).find(".pane-content").stop().animate({ backgroundPositionX: "10px" }, 850, "easeOutElastic"); }, 
		function() { $(this).find(".pane-content").stop().animate({ backgroundPositionX: "20px" }, 250); }
	);
	
	$(".image-viewer .next").hover(
		function() { $(this).find(".pane-content").stop().animate({ backgroundPositionX: "30px" }, 850, "easeOutElastic"); }, 
		function() { $(this).find(".pane-content").stop().animate({ backgroundPositionX: "20px" }, 250); }
	);
	
}); })(jQuery);