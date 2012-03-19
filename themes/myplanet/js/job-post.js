(function($) {

$("document").ready(function() {
	
	add_custom_classes($(".related-view"));
	add_custom_classes($(".testimonials-job-post-page-view"));
	
	if ($(".job-posts-menu-view ul li a.active").parent().parent().parent().find(".item-list").html() != null) {
		$(".job-posts-menu-view ul li a.active").parent().parent().parent().find(".item-list ul").css("display", "block");
	}
	
	if ($(".job-posts-menu-view ul li a.active").parent().parent().parent().parent().css("display") == "none") {
		$(".job-posts-menu-view ul li a.active").parent().parent().parent().parent().css("display", "block");
	}
	
	$(".job-posts-menu-view ul li").hover(
		function() { $(this).stop().animate({ backgroundPosition: "163px 16px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPosition: "153px 16px" }, 250); }
	);
	
	$(".main-body .right-region .read-more a").hover(
		function() { $(this).stop().animate({ backgroundPosition: "151px -6px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPosition: "141px -6px" }, 250); }
	);
	
});

})(jQuery);