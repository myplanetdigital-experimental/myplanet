(function($) {

$("document").ready(function() {
	
	add_custom_classes($(".job-posts-view"));
	add_custom_classes($(".related-view"));
	
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
	
});

})(jQuery);