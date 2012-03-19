var old_visible_items = [];
var new_visible_items = [];

(function($) {
	
$("document").ready(function() {
	
	var article = $(".article-page").html() !== null ? true : false;
	
	var grid_type = $.cookies.get("resources_grid_type") !== null ? $.cookies.get("resources_grid_type") : "grid-2";
	
	var mc_filters = $.cookies.get("resources_mc_filters") !== null ? $.cookies.get("resources_mc_filters") : [];
	var sc_filters = $.cookies.get("resources_sc_filters") !== null ? $.cookies.get("resources_sc_filters") : [];
	var tags_filter = $.cookies.get("resources_tags_filters") !== null ? $.cookies.get("resources_tags_filters") : "";
	var archive_filter = $.cookies.get("resources_archive_filters") !== null ? $.cookies.get("resources_archive_filters") : "";

	var root_view_grid_2 = $(".pane-content > .resources-view");
	var root_view_grid_4 = $(".pane-content > .resources-view > .attachment > .resources-view");
	var root_view_article = $(".resources-hidden-view");
	var root_view = article === false ? (grid_type == "grid-2" ? root_view_grid_2 : root_view_grid_4) : root_view_article;

	var page_prefix = "resources";
	var cur_page = $.cookies.get(page_prefix + "_page") !== null ? $.cookies.get(page_prefix + "_page") : 1;
	
	var items_on_page_grid_2 = 4;
	var items_on_page_grid_4 = 8;
	var items_on_page = grid_type == "grid-2" ? items_on_page_grid_2 : items_on_page_grid_4;

	var sort_type = $.cookies.get("resources_sort_type") !== null ? $.cookies.get("resources_sort_type") : "desc";
	var sort_field = $.cookies.get("resources_sort_field") !== null ? $.cookies.get("resources_sort_field") : "h-date";

	var fade_out_speed = 850;
	var fade_out_effect = "easeInOutExpo";
	var fade_in_speed = 850;
	var fade_in_effect = "easeInOutExpo";
	var move_speed = 850;
	var move_effect = "easeInOutExpo";
		
	var update_filters_cookie = function() {
		$.cookies.set("resources_mc_filters", mc_filters);
		$.cookies.set("resources_sc_filters", sc_filters);
		$.cookies.set("resources_tags_filters", tags_filter);
		$.cookies.set("resources_archive_filters", archive_filter);
	};
	
	var build_categories_filters = function(parent, filter) {
		mc_filters = [];
		sc_filters = [];
		
		tags_filter = "";
		archive_filter = "";
				
		filter.hasClass("active") === false ? filter.addClass("active") : filter.removeClass("active");	
				
		if (parent.find(".views-row .title.active").length > 1 && parent.find(".views-row .title.all").hasClass("active") === true) {
			if (filter.hasClass("all") === false) {
				parent.find(".views-row .title.all").removeClass("active");
			} else {
				parent.find(".views-row .title.active").removeClass("active");
				filter.addClass("active");
			}
		}
				
		if (parent.find(".views-row .title.active").length == 0) {
			parent.find(".views-row .title.all").addClass("active");
		}

		if (parent.find(".views-row .title.all").hasClass("active")) {
			if ($(".resources-main-category-menu-view .views-row .title.active").length == 0) {
				$(".resources-main-category-menu-view .views-row .title.all").addClass("active");
			}
			if ($(".resources-second-category-menu-view .views-row .title.active").length == 0) {
				$(".resources-second-category-menu-view .views-row .title.all").addClass("active");
			}
		}
			
		$(".resources-main-category-menu-view .views-row .title.active").each(function() {
			if ($(this).hasClass("all") === false) {
				mc_filters.push($(this).find(".field-content").html());
			}
		});
		
		$(".resources-second-category-menu-view .views-row .title.active").each(function() {
			if ($(this).hasClass("all") === false) {
				sc_filters.push($(this).find(".field-content").html());
			}
		});
		
		update_filters_cookie();
	};
			
	var apply_categories_filters = function() {
		old_visible_items = new_visible_items;
		new_visible_items = [];
		
		root_view.find(".views-row." + grid_type).each(function(index) {
			var mc_visible = false;
			var sc_visible = false;
			
			var cur_mc = ($(this).find(".h-mc .field-content").html()).split("+");
			var cur_sc = ($(this).find(".h-sc .field-content").html()).split("+");
				
			if (mc_filters.length > 0) {
				for (var i = 0; i < mc_filters.length; i++) {
					for (var j = 0; j < cur_mc.length; j++) {
						if (cur_mc[j] == mc_filters[i]) {
							mc_visible = true;
						}
					}
				}
			} else {
				mc_visible = true;
			}
				
			if (sc_filters.length > 0) {
				for (var i = 0; i < sc_filters.length; i++) {
					for (var j = 0; j < cur_sc.length; j++) {
						if (cur_sc[j] == sc_filters[i]) {
							sc_visible = true;
						}
					}
					}
			} else {
				sc_visible = true;
			}
			
			if (mc_visible === true && sc_visible === true) {
				new_visible_items.push(index);
			}
		});
	};
		
	var apply_tags_filter = function() {
		old_visible_items = new_visible_items;
		new_visible_items = [];
		
		root_view.find(".views-row." + grid_type).each(function(index) {
			var tags = ($(this).find(".h-tags .field-content").html()).split("+");
			
			var tags_visible = false;
			for (var i = 0; i < tags.length; i++) {
				if (tags[i] == tags_filter) {
					tags_visible = true;
				}
			}
				
			if (tags_visible === true) {
				new_visible_items.push(index);
			}
		});
	};

	var apply_archive_filter = function() {
		old_visible_items = new_visible_items;
		new_visible_items = [];

		root_view.find(".views-row." + grid_type).each(function(index) {
			if ($(this).find(".h-archive .field-content").html() == archive_filter) {
				new_visible_items.push(index);
			}
		});
	};
	
	var apply_other_filters = function() {
		mc_filters = [];
		sc_filters = [];
		update_filters_cookie();
		$(".resources-main-category-menu-view .views-row .title.active").removeClass("active");
		$(".resources-second-category-menu-view .views-row .title.active").removeClass("active");
	};
	
	var apply_sorting = function() {
		var sorted_items = [];
			
		for (var i = 0; i < new_visible_items.length; i++) {
			sorted_items.push([new_visible_items[i], root_view.find(".views-row").eq(new_visible_items[i]).find("." + sort_field + " .field-content").html()]);
		}
			
		sorted_items.sort(function(a, b) {
			return sort_type == "asc" ? (a[1] - b[1]) : (b[1] - a[1]);
		});
			
		new_visible_items = [];
		for (var i = 0; i < sorted_items.length; i++) {
			new_visible_items.push(sorted_items[i][0]);
		}
	};
	
	var grid_clone_items = function(new_grid_type) {
		var visible_items = [];
		
		for (var i = 0; i < new_visible_items.length; i++) {
			var cur_nid = root_view.find('.views-row').eq(new_visible_items[i]).find(".nid .field-content").html();
			
			root_view.find(".views-row." + grid_type).each(function(index) {
				if ($(this).find(".nid .field-content").html() == cur_nid) {
					visible_items.push(index);
				}
			});
		}
			
		old_visible_items = [];
		new_visible_items = visible_items;
	};
	
	var init_category_filters = function(filters, parent) {
		if (filters.length > 0) {
			parent.find(".views-row .title.all").removeClass("active");
			for (var i = 0; i < filters.length; i++) {
				for (var j = 0; j < parent.find(".views-row .field-content").length; j++) {
					if (parent.find(".views-row .field-content").eq(j).html() == filters[i]) {
						parent.find(".views-row .field-content").eq(j).parent().addClass("active");
						break;
					}
				}
			}
		} else if (tags_filter != "" || archive_filter != "") {
			parent.find(".views-row .title.all").removeClass("active");
		}
	};
	
	$(".resources-main-category-menu-view .views-row").eq(0).before('<li class="views-row"><div class="title all active"><div class="field-content">All Categories</div></div></li>');
	$(".resources-second-category-menu-view .views-row").eq(0).before('<li class="views-row"><div class="title all active"><div class="field-content">All Themes</div></div></li>');
	
	$(".pane-content > .resources-view .thumbnail.grid-2").hover(
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "15px -47px" }, 850, "easeOutElastic"); }, 
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "5px -47px" }, 250); }
	);
	
	init_category_filters(mc_filters, $(".resources-main-category-menu-view"));
	init_category_filters(sc_filters, $(".resources-second-category-menu-view"));
	
	$("ul.sort li.active").removeClass("active");
	$("ul.sort li[sort-field='" + sort_field + "']").addClass("active").removeClass("asc").removeClass("desc").addClass(sort_type);
	
	$(".pane-content > .resources-view .views-row").css("display", "none");
	if (tags_filter == "" && archive_filter == "") { apply_categories_filters(); }
	if (tags_filter != "") { apply_tags_filter(); }
	if (archive_filter != "") { apply_archive_filter(); }

	apply_sorting();

	if (article === false) {
		add_isotope(root_view, old_visible_items, new_visible_items, items_on_page, cur_page, page_prefix, 0, fade_out_effect, 0, fade_in_effect, 0, move_effect);
	}
	
	$(".resources-main-category-menu-view .views-row .title").click(function() {
		build_categories_filters($(".resources-main-category-menu-view"), $(this));
		apply_categories_filters();
		apply_sorting();
		add_isotope(root_view, old_visible_items, new_visible_items, items_on_page, 1, page_prefix, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
	});
		
	$(".resources-second-category-menu-view .views-row .title").click(function() {			
		build_categories_filters($(".resources-second-category-menu-view"), $(this));
		apply_categories_filters();
		apply_sorting();
		add_isotope(root_view, old_visible_items, new_visible_items, items_on_page, 1, page_prefix, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
	});
		
	$(".resources-tags-menu-view .views-row .title").click(function() {
		tags_filter = $(this).find(".field-content").html();
		archive_filter = "";
		apply_other_filters();
		apply_tags_filter();
		apply_sorting();
		add_isotope(root_view, old_visible_items, new_visible_items, items_on_page, 1, page_prefix, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
	});
		
	$(".resources-archive-menu-view .views-summary a").click(function() {
		archive_filter = $(this).html();
		tags_filter = "";
		apply_other_filters();
		apply_archive_filter();
		apply_sorting();
		add_isotope(root_view, old_visible_items, new_visible_items, items_on_page, 1, page_prefix, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
		return false;
	});
	
	$("ul.sort li").click(function() {
		sort_field = $(this).attr("sort-field");		
		sort_type = (($(this).hasClass("active") === true && $(this).hasClass("asc") === true) || ($(this).hasClass("active") === false && $(this).hasClass("asc") === false)) ? "desc" : "asc";
		
		$.cookies.set("resources_sort_field", sort_field);
		$.cookies.set("resources_sort_type", sort_type);
			
		$("ul.sort li.active").removeClass("active");
		$("ul.sort li[sort-field=" + sort_field + "]").addClass("active").removeClass("asc").removeClass("desc").addClass(sort_type);
			
		old_visible_items = new_visible_items;
		apply_sorting();
		add_isotope(root_view, old_visible_items, new_visible_items, items_on_page, 1, page_prefix, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
	});
		
	$(".view-grid .grid-2").click(function() {
		grid_type = "grid-2";
		$.cookies.set("resources_grid_type", "grid-2");
		root_view.find(".views-row:visible").fadeOut(fade_out_speed, fade_out_effect);
		setTimeout(function() {
			root_view.find("ul.pager").remove();
			root_view.height(0);
			root_view = root_view_grid_2;
			items_on_page = items_on_page_grid_2;		
			grid_clone_items();
			apply_sorting();
			add_isotope(root_view, old_visible_items, new_visible_items, items_on_page, 1, page_prefix, fade_out_speed, fade_out_effect, 0, fade_in_effect, 0, move_effect);
		}, fade_out_speed);
	});
		
	$(".view-grid .grid-4").click(function() {
		grid_type = "grid-4";
		$.cookies.set("resources_grid_type", "grid-4");
		root_view.find(".views-row:visible").fadeOut(fade_out_speed, fade_out_effect);
		setTimeout(function() {
			root_view.find("ul.pager").remove();
			root_view.height(0);
			root_view = root_view_grid_4;
			items_on_page = items_on_page_grid_4;
			grid_clone_items();
			apply_sorting();
			add_isotope(root_view, old_visible_items, new_visible_items, items_on_page, 1, page_prefix, fade_out_speed, fade_out_effect, 0, fade_in_effect, 0, move_effect);
		}, fade_out_speed);
	});
	
});

})(jQuery);