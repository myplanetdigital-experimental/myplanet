(function($) {

$("document").ready(function() {
	
	add_custom_classes($(".projects-view"));
	add_custom_classes($(".related-view"));
	
	$(".projects-view .thumbnail").hover(
		function() { $(this).find(".link").stop().animate({ backgroundPositionX: "25px" }, 850, "easeOutElastic");	}, 
		function() { $(this).find(".link").stop().animate({ backgroundPositionX: "15px" }, 250); }
	);
	
});

})(jQuery);