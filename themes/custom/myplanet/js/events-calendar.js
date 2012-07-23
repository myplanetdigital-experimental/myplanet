(function($) {

$("document").ready(function() {

	$(".events-calendar-view .pager li.date-prev a").hover(
		function() { $(this).stop().animate({ backgroundPosition: "-5px 0" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPosition: "0 0" }, 250); }
	);
	
	$(".events-calendar-view .pager li.date-next a").hover(
		function() { $(this).stop().animate({ backgroundPosition: "5px 0" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPosition: "0 0" }, 250); }
	);
	
});

})(jQuery);