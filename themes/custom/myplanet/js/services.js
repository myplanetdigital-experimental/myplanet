(function($) {

$("document").ready(function() {
	
	add_custom_classes($(".disciplines-view"));
	add_custom_classes($(".areas-of-expertise-view"));
	
	$(".disciplines-view .title .field-content").each(function() {
		var words = $(this).html().split(" ");
		if (words.length > 1) {
			$(this).css("padding-top", "51px");
		}
	});
	
});

})(jQuery);