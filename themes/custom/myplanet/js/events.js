(function($) {

$("document").ready(function() {
	
	add_custom_classes($(".events-view"));

	$(".events-calendar-view .calendar-calendar td.has-events a").click(function() { return false; });
	
	$(".events-view .views-row").hover(
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "60px -7px" }, 850, "easeOutElastic"); },
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "50px -7px" }, 250, "easeOutElastic"); }
	);
	
});

})(jQuery);