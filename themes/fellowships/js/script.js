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
	
	add_custom_classes($(".fellow-front-items-view"));
	add_custom_classes($(".fellow-blogs-view"));
	
}); })(jQuery);