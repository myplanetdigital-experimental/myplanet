var add_custom_classes = function(obj) {
	var full_width = obj.width();
	var items_count = obj.find(".views-row").length;
	
	var item_width = obj.find(".views-row").width();
	var margins = parseInt(obj.find(".views-row").css("margin-left")) + parseInt(obj.find(".views-row").css("margin-right")) + parseInt(obj.find(".views-row").css("padding-left")) + parseInt(obj.find(".views-row").css("padding-right"));
	
	var columns_count = Math.floor((full_width + margins) / (item_width + margins));
	var last_line_item = Math.floor((items_count -1) / columns_count) * columns_count;
		
	obj.find(".views-row").each(function(index) {
		jQuery(this).addClass("my-col-" + (index % columns_count + 1));
		jQuery(this).addClass("my-row-" + (Math.floor(index / columns_count) + 1));
		if ((index + 1) % columns_count == 0) {
			jQuery(this).addClass("my-col-last");
		}
		if (index >= last_line_item) {
			jQuery(this).addClass("my-row-last");
		}
	});
};