(function($) {

$("document").ready(function() {
	
	add_custom_classes($(".front-items-view"));
	
	$(".front-items-view .thumbnail").hover(
		function() { $(this).find(".link2").stop().animate({ backgroundPosition: "15px -47px" }, 850, "easeOutElastic"); }, 
		function() { $(this).find(".link2").stop().animate({ backgroundPosition: "5px -47px" }, 250); }
	);
	
});

})(jQuery);