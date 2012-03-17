(function($) {

$("document").ready(function() {
	
	add_custom_classes($(".events-view"));
	add_custom_classes($(".related-view"));

	$(".events-calendar-view .calendar-calendar td.has-events a").click(function() { return false; });
	
});

})(jQuery);