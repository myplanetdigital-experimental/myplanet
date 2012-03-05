(function($) {

$("document").ready(function() {
	
	add_custom_classes($(".front-items-view"));
	
	$(".front-items-view .thumbnail").hover(
		function() { $(this).find(".link2").stop().animate({ backgroundPositionX: "24px" }, 850, "easeOutElastic");	}, 
		function() { $(this).find(".link2").stop().animate({ backgroundPositionX: "20px" }, 250); }
	);
	
});

})(jQuery);