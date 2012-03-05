var add_isotope = function(obj, old_visible_items, new_visible_items, items_on_page, cur_page, page_prefix, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect) {
	var items_count = 0;
	
	if (items_on_page === false || cur_page === false) {
		items_count = new_visible_items.length;
	} else {
		items_count = new_visible_items.length >= items_on_page ? items_on_page : new_visible_items.length;
	}

	var first_item = obj.find(".views-row").eq(new_visible_items[0]);
	var item_width = first_item.width();
	var margins_width = parseInt(first_item.css("margin-left")) + parseInt(first_item.css("margin-right")) + parseInt(first_item.css("padding-left")) + parseInt(first_item.css("padding-right"));
	
	var item_height = first_item.height();
	var margins_height = parseInt(first_item.css("margin-top")) + parseInt(first_item.css("margin-bottom")) + parseInt(first_item.css("padding-top")) + parseInt(first_item.css("padding-bottom"));
	
	var columns_count = Math.floor((obj.width() + margins_width) / (item_width + margins_width));
	var rows_count = Math.ceil(items_count / columns_count);
	
	obj.css("position", "relative");
	obj.height(rows_count * (item_height + margins_height));

	if (items_on_page !== false && cur_page !== false) {
		obj.find("ul.pager").remove();
		
		var pages_count = Math.ceil(new_visible_items.length / items_on_page);
		
		if (pages_count > 1) {
			var pager = "";
			
			pager += '<ul class="pager">';
			for (var i = 0; i < pages_count; i++) {
				pager += '<li' + (i == cur_page - 1 ? ' class="active"' : '') + '>' + (i + 1) + '</li>';
			}
			pager += '</ul>';
			
			obj.append(pager);
		
			obj.find("ul.pager").css("top", obj.height()).css("left", Math.round((obj.width() - obj.find("ul.pager").width()) / 2));
			
			obj.find("ul.pager li").bind("click", function() {
				jQuery.cookies.set(page_prefix + "_page", jQuery(this).html());
				add_isotope(obj, new_visible_items, new_visible_items, items_on_page, jQuery(this).html(), sort_type, sort_field, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
			});
		}
	}
	
	var page_new_visible_items = [];
	for (var i = 0; i < new_visible_items.length; i++) {
		if (items_on_page === false || cur_page === false ||
			(i >= (cur_page - 1) * items_on_page && i < cur_page * items_on_page)
		) {
			page_new_visible_items.push(new_visible_items[i]);
		}
	}
	
	var fade_out_items = [];
	for (var i = 0; i < old_visible_items.length; i++) {
		var exists = false;
		for (var j = 0; j < page_new_visible_items.length; j++) {
			if (page_new_visible_items[j] == old_visible_items[i]) {
				exists = true;
				break;
			}
		}
		if (exists === false) {
			fade_out_items.push(old_visible_items[i]);
		}
	}
		
	for (var i = 0; i < fade_out_items.length; i++) {
		obj.find(".views-row").eq(fade_out_items[i]).fadeOut(fade_out_speed, fade_out_effect);
	}
	
	if (fade_out_items.length == 0) {
		fade_out_speed = 0;
	}
	
	var fade_in_items = [];
	for (var i = 0; i < page_new_visible_items.length; i++) {
		var exists = false;
		for (var j = 0; j < old_visible_items.length; j++) {
			if (old_visible_items[j] == page_new_visible_items[i]) {
				exists = true;
				break;
			}
		}
		if (exists === false) {
			fade_in_items.push(page_new_visible_items[i]);
		}
	}
	
	setTimeout(function() {
		for (var i = 0; i < fade_in_items.length; i++) {
			obj.find(".views-row").eq(fade_in_items[i]).fadeIn(fade_in_speed, fade_in_effect);
		}
	}, fade_out_speed);
	
	if (fade_in_items.length == 0) {
		fade_in_speed = 0;
	}
	
	setTimeout(function() {
		var row = 0;
		var column = 0;
		
		for (var i = 0; i < new_visible_items.length; i++) {
			var item = obj.find(".views-row").eq(new_visible_items[i]);
			item.css("position", "absolute");
			
			if (items_on_page !== false && cur_page !== false &&
				(i < (cur_page - 1) * items_on_page || i >= cur_page * items_on_page)
			) {
				item.css("display", "none").css("top", row * (item_height + margins_height)).css("left", column * (item_width + margins_width));
			} else {
				item.css("display", "list-item");
				item.animate({ top : row * (item_height + margins_height), left : column * (item_width + margins_width) }, move_speed, move_effect);
			}
			
			column++;
			if (column == columns_count) {
				column = 0;
				row++;
				if (row == rows_count) {
					row = 0;
				}
			}
		}
	}, fade_out_speed + fade_in_speed);
};