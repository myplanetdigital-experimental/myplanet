(function($) { $("document").ready(function() {

	var add_custom_classes = function(obj) {
		var full_width = obj.width();
		var items_count = obj.find(".views-row").length;
		
		var item_width = obj.find(".views-row").width();
		var margins = parseInt(obj.find(".views-row").css("margin-left")) + parseInt(obj.find(".views-row").css("margin-right")) + parseInt(obj.find(".views-row").css("padding-left")) + parseInt(obj.find(".views-row").css("padding-right"));
		
		var columns_count = Math.floor((full_width + margins) / (item_width + margins));
		var last_line_item = Math.floor((items_count -1) / columns_count) * columns_count;
		
		obj.find(".views-row").each(function(index) {
			$(this).addClass("my-col-" + (index % columns_count + 1));
			$(this).addClass("my-row-" + (Math.floor(index / columns_count) + 1));
			if ((index + 1) % columns_count == 0) {
				$(this).addClass("my-col-last");
			}
			if (index >= last_line_item) {
				$(this).addClass("my-row-last");
			}
		});
	};
	
	var add_isotope = function(obj, old_visible_items, new_visible_items, items_on_page, cur_page, sort_type, sort_field, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect) {
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
		
		if (sort_type !== false && sort_field !== false) {
			var sorted_items = [];
			
			for (var i = 0; i < new_visible_items.length; i++) {
				if (sort_type === false || sort_field === false) {
					sorted_items.push([new_visible_items[i]]);
				} else {
					sorted_items.push([new_visible_items[i], obj.find(".views-row").eq(new_visible_items[i]).find("." + sort_field + " .field-content").html()]);
				}
			}
			
			sorted_items.sort(function(a, b) {
				return sort_type == "asc" ? (a[1] - b[1]) : (b[1] - a[1]);
			});
			
			new_visible_items = [];
			for (var i = 0; i < sorted_items.length; i++) {
				new_visible_items.push(sorted_items[i][0]);
			}
		}

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
					add_isotope(obj, new_visible_items, new_visible_items, items_on_page, $(this).html(), sort_type, sort_field, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
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
	
	/* To Top */
	$(function(){$.fn.scrollToTop=function(){$(this).hide().removeAttr("href");if($(window).scrollTop()!="0"){$(this).fadeIn("fast","easeInOutExpo")}var scrollDiv=$(this);$(window).scroll(function(){if($(window).scrollTop()=="0"){$(scrollDiv).fadeOut("fast")}else{$(scrollDiv).fadeIn("fast")}});$(this).click(function(){$("html, body").animate({scrollTop:0},"slow", "easeInOutExpo")})}});

	$(function() { $(".to-top").css("display", "block").scrollToTop(); });
	
	$(".to-top .pane-content").hover(
		function() { $(this).stop().animate({ backgroundPositionY: "5px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPositionY: "12px" }, 250); }
	);
	
	/* Main Menu */
	$(".main-menu ul.menu li a").hover(
		function() { $(this).stop().animate({ backgroundPositionY: "-20px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPositionY: "-6px" }, 250); }
	);
	
	/* Footer */
	$(".footer .footer-4 .email a").hover(
		function() { $(this).stop().animate({ opacity: 0.5 }, 100, "easeOutCubic"); },
		function() { $(this).stop().animate({ opacity: 1 }, 100, "easeOutCubic"); }
	);
	
	$(".footer .footer-5 .links a").hover(
		function() {
			$(this).stop().animate({ opacity: 0.5 }, 100, "easeOutCubic", function() {
				if (parseInt($(this).css("background-position-x")) > -99) {
					$(this).css("background-position-x", parseInt($(this).css("background-position-x")) - 99);
				}
				$(this).animate({ opacity: 1 }, 100, "easeOutCubic");
			});
		},
		function() {
			$(this).stop().animate({ opacity: 0.5 }, 100, "easeOutCubic", function() {
				if (parseInt($(this).css("background-position-x")) <= -99) {
					$(this).css("background-position-x", parseInt($(this).css("background-position-x")) + 99);
				}
				$(this).animate({ opacity: 1 }, 100, "easeOutCubic");
			});
		}
	);
	
	/* Thumbnail */
	$(".thumbnail").hover(
		function() { $(this).find(".layer, .layer > .field-content > a").stop().animate({ opacity: 1 }, 100, "easeOutCubic"); }, 
		function() { $(this).find(".layer, .layer > .field-content > a").stop().animate({ opacity: 0 }, 800, "easeOutCubic"); }
	);
	
	/* Front Page */
	if ($(".front-page").html() !== null) {
		add_custom_classes($(".front-items-view"));
		
		$(".front-items-view .thumbnail").hover(
			function() { $(this).find(".link2").stop().animate({ backgroundPositionX: "24px" }, 850, "easeOutElastic");	}, 
			function() { $(this).find(".link2").stop().animate({ backgroundPositionX: "20px" }, 250); }
		);
	}
	
	/* About - Our Story Page */
	if ($(".ourstory_page").html() !== null) {
		add_custom_classes($(".our-team-view"));
	}
	
	/* Careers Page */
	if ($(".careers_page").html() !== null) {
		add_custom_classes($(".benefits-view"));
		add_custom_classes($(".related-view"));
	}
	
	/* Careers - Opportunities Page */
	if ($(".opportunities-page").html() !== null) {
		add_custom_classes($(".job-posts-view"));
		add_custom_classes($(".related-view"));
		
		if ($(".job-posts-menu-view ul li a.active").parent().parent().parent().find(".item-list").html() != null) {
			$(".job-posts-menu-view ul li a.active").parent().parent().parent().find(".item-list ul").css("display", "block");
		}
		
		if ($(".job-posts-menu-view ul li a.active").parent().parent().parent().parent().css("display") == "none") {
			$(".job-posts-menu-view ul li a.active").parent().parent().parent().parent().css("display", "block");
		}
		
		$(".opportunities .left-region .job-posts-menu-view ul li").hover(
			function() { $(this).stop().animate({ backgroundPositionX: "163px" }, 850, "easeOutElastic"); }, 
			function() { $(this).stop().animate({ backgroundPositionX: "153px" }, 250); }
		);
	}

	/* Resources Page */
	if ($(".resourses-page").html() !== null) {
		var root_view = $(".pane-content > .resources-view");
		var old_visible_items = [];
		var new_visible_items = [];
		var items_on_page = 4;
		var sort_type = "desc";
		var sort_field = "h-date";
		var grid_type = "grid-2";
		var mc_filters = [];
		var sc_filters = [];
		var fade_out_speed = 850;
		var fade_out_effect = "easeInOutExpo";
		var fade_in_speed = 850;
		var fade_in_effect = "easeInOutExpo";
		var move_speed = 850;
		var move_effect = "easeInOutExpo";
		
		root_view.css("display", "block");
		$(".resources-main-category-menu-view .views-row").eq(0).before('<li class="views-row"><div class="title all active"><div class="field-content">All Categories</div></div></li>');
		$(".resources-second-category-menu-view .views-row").eq(0).before('<li class="views-row"><div class="title all active"><div class="field-content">All Themes</div></div></li>');
		
		root_view.find(".views-row:visible").each(function(index) {
			new_visible_items.push(index);
		});

		add_isotope(root_view, old_visible_items, new_visible_items, items_on_page , 1, sort_type, sort_field, 0, fade_out_effect, 0, fade_in_effect, 0, move_effect);

		root_view.find(".thumbnail.grid-2").hover(
			function() { $(this).find(".link").stop().animate({ backgroundPositionX: "14px" }, 850, "easeOutElastic");	}, 
			function() { $(this).find(".link").stop().animate({ backgroundPositionX: "10px" }, 250); }
		);
		
		$("ul.sort li").click(function() {
			sort_field = $(this).attr("sort-field");		
			
			if ($(this).hasClass("active")) {
				if ($(this).hasClass("asc")) {
					sort_type = "desc";
					$(this).removeClass("asc");
					$(this).addClass("desc");
				} else {
					sort_type = "asc";
					$(this).removeClass("desc");
					$(this).addClass("asc");
				}
			} else {
				if ($(this).hasClass("asc")) {
					sort_type = "asc";
				} else {
					sort_type = "desc";
				}
			}
			
			$("ul.sort li.active").removeClass("active");
			$(this).addClass("active");
			
			old_visible_items = new_visible_items;
			
			add_isotope(root_view, old_visible_items, new_visible_items, items_on_page , 1, sort_type, sort_field, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
		});
		
		var apply_filters = function(parent, filter) {
			mc_filters = [];
			sc_filters = [];
		
			old_visible_items = new_visible_items;
			new_visible_items = [];
			
			if (filter.hasClass("active") === false) {
				filter.addClass("active");
			} else {
				filter.removeClass("active");	
			}
			
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
		
		var reset_filters = function() {
			$(".resources-main-category-menu-view .views-row .title.active").each(function() {
				$(this).removeClass("active");
			});
			
			$(".resources-second-category-menu-view .views-row .title.active").each(function() {
				$(this).removeClass("active");
			});
		};
		
		$(".resources-main-category-menu-view .views-row .title").click(function() {
			apply_filters($(".resources-main-category-menu-view"), $(this));
			add_isotope(root_view, old_visible_items, new_visible_items, items_on_page , 1, sort_type, sort_field, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
		});
		
		$(".resources-second-category-menu-view .views-row .title").click(function() {			
			apply_filters($(".resources-second-category-menu-view"), $(this));
			add_isotope(root_view, old_visible_items, new_visible_items, items_on_page , 1, sort_type, sort_field, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
		});
		
		$(".resources-tags-menu-view .views-row .title").click(function() {
			reset_filters();
			old_visible_items = new_visible_items;
			new_visible_items = [];
			
			var cur_tag = $(this).find(".field-content").html();
			root_view.find(".views-row." + grid_type).each(function(index) {
				var tags = ($(this).find(".h-tags .field-content").html()).split("+");
				
				var tags_visible = false;
				for (var i = 0; i < tags.length; i++) {
					if (tags[i] == cur_tag) {
						tags_visible = true;
					}
				}
				
				if (tags_visible === true) {
					new_visible_items.push(index);
				}
			});

			add_isotope(root_view, old_visible_items, new_visible_items, items_on_page , 1, sort_type, sort_field, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
		});
		
		$(".resources-archive-menu-view .views-summary a").click(function() {
			reset_filters();
			old_visible_items = new_visible_items;
			new_visible_items = [];

			var cur_date = $(this).html();
			root_view.find(".views-row." + grid_type).each(function(index) {
				if ($(this).find(".h-archive .field-content").html() == cur_date) {
					new_visible_items.push(index);
				}
			});
			
			add_isotope(root_view, old_visible_items, new_visible_items, items_on_page , 1, sort_type, sort_field, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect);
			return false;
		});
		
		var grid_clone_items = function(new_grid_type) {
			var visible_items = [];
			
			for (var i = 0; i < new_visible_items.length; i++) {
				var cur_nid = root_view.find('.views-row').eq(new_visible_items[i]).find(".nid .field-content").html();
				
				root_view.find(".views-row." + new_grid_type).each(function(index) {
					if ($(this).find(".nid .field-content").html() == cur_nid) {
						visible_items.push(index);
					}
				});
			}
			
			grid_type = new_grid_type;
			old_visible_items = [];
			new_visible_items = visible_items;
		};
		
		$(".view-grid .grid-2").click(function() {
			root_view.find(".views-row:visible").fadeOut(fade_out_speed, fade_out_effect);
			setTimeout(function() {
				root_view.find("ul.pager").remove();
				root_view = $(".pane-content > .resources-view");
				items_on_page = 4;
				grid_clone_items("grid-2");
				add_isotope(root_view, old_visible_items, new_visible_items, items_on_page , 1, sort_type, sort_field, fade_out_speed, fade_out_effect, 0, fade_in_effect, 0, move_effect);
			}, fade_out_speed);
		});
		
		$(".view-grid .grid-4").click(function() {
			root_view.find(".views-row:visible").fadeOut(fade_out_speed, fade_out_effect);
			setTimeout(function() {
				root_view.find("ul.pager").remove();
				root_view = $(".pane-content > .resources-view > .attachment > .resources-view");
				items_on_page = 8;
				grid_clone_items("grid-4");
				add_isotope(root_view, old_visible_items, new_visible_items, items_on_page , 1, sort_type, sort_field, fade_out_speed, fade_out_effect, 0, fade_in_effect, 0, move_effect);
			}, fade_out_speed);
		});
	}
	
	
	
	
	/* Blog Topics */
	$("#blog_topics a").hover(
		function() { $(this).stop().animate({ backgroundPositionX: "149px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPositionX: "137px" }, 250); }
	);
	
	/* Contact Form */
	$(".contact_page .webform-component").hover(
		function() { $(this).find("label").stop().animate({ marginLeft: "8px" }, 250).animate({ marginLeft: "0px"  }, 250); }
	);
	
	var form_default_values = [];
	$(".contact_page .webform-component input[type='text'], .contact_page .webform-component textarea").focusin(
		function() {
			if (form_default_values[$(this).attr("id")] === undefined) {
				form_default_values[$(this).attr("id")] = $(this).attr("value");
			}
			if ($(this).attr("value") == form_default_values[$(this).attr("id")]) {
				$(this).attr("value", "");
			}
		}
	);
	$(".contact_page .webform-component input[type='text'], .contact_page .webform-component textarea").focusout(
		function() {
			if ($(this).attr("value") == "") {
				$(this).attr("value", form_default_values[$(this).attr("id")]);
			}
		}
	);
	
	$(".focal-slideshow").serialScroll({
		target : ".slides",
		items : "li",				// Selector to the items ( relative to the matched elements, '#sections' in this case )
		prev : ".focal-prev",		// Selector to the 'prev' button (absolute!, meaning it's relative to the document)
		next : ".focal-next",		// Selector to the 'next' button (absolute too)
		axis : "xy",				// The default is 'y' scroll on both ways
		duration : 700,				// Length of the animation (if you scroll 2 axes and use queue, then each axis take half this time)
		force : true, 				// Force a scroll to the element specified by 'start' (some browsers don't reset on refreshes)
		easing : "easeInOutExpo", 
		//queue : false,			// We scroll on both axes, scroll both at the same time.
		//event : "click",			// On which event to react (click is the default, you probably won't need to specify it)
		//stop : false,				// Each click will stop any previous animations of the target. (false by default)
		//lock : true, 				// Ignore events if already animating (true by default)		
		//start : 0, 				// On which element (index) to begin ( 0 is the default, redundant in this case )		
		cycle : true,				// Cycle endlessly ( constant velocity, true is the default )
		//step : 1, 				// How many items to scroll each time ( 1 is the default, no need to specify )
		//jump : false, 			// If true, items become clickable (or w/e 'event' is, and when activated, the pane scrolls to them)
		//lazy : false,				// (default) if true, the plugin looks for the items on each event(allows AJAX or JS content, or reordering)
		interval : 8000 			// It's the number of milliseconds to automatically go to the next
		//constant : true, 			// constant speed
	});
	
}); })(jQuery);

