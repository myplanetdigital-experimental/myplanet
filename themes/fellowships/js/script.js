(function($) { $("document").ready(function() {

	$(".view").each(function() {
		var full_width = $(this).width();
		var item_width = $(this).find(".views-row").width();
		var columns_count = Math.floor(full_width / item_width);
		var items_count = $(this).find(".views-row").length;
		var last_line_item = Math.floor((items_count -1) / columns_count) * columns_count;
		$(this).find(".views-row").each(function(index) {
			$(this).addClass("my-col-" + (index % columns_count + 1));
			$(this).addClass("my-row-" + (Math.floor(index / columns_count) + 1));
			if ((index + 1) % columns_count == 0) {
				$(this).addClass("my-col-last");
			}
			if (index >= last_line_item) {
				$(this).addClass("my-row-last");
			}
		});
	});
	
}); })(jQuery);