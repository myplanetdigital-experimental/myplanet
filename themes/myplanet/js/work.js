(function($) {

$("document").ready(function() {
	
	add_custom_classes($(".projects-view"));
	add_custom_classes($(".related-view"));
	
	$(".projects-view .thumbnail").hover(
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "25px -47px" }, 850, "easeOutElastic");	}, 
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "15px -47px" }, 250); }
	);
	
});

})(jQuery);