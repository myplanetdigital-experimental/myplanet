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
	
	var add_isotope = function(obj, visible_items, items_on_page, cur_page, sort_type, sort_field, speed, effect) {
		obj.find(".views-row").each(function() {
			$(this).css("display", "none");
		});

		var items_count = 0;
		if (items_on_page === false || cur_page === false) {
			items_count = visible_items.length;
		} else {
			items_count = visible_items.length >= items_on_page ? items_on_page : visible_items.length;
		}
		
		var item_width = visible_items[0].width();
		var margins_width = parseInt(visible_items[0].css("margin-left")) + parseInt(visible_items[0].css("margin-right")) + parseInt(visible_items[0].css("padding-left")) + parseInt(visible_items[0].css("padding-right"));
		
		var item_height = visible_items[0].height();
		var margins_height = parseInt(visible_items[0].css("margin-top")) + parseInt(visible_items[0].css("margin-bottom")) + parseInt(visible_items[0].css("padding-top")) + parseInt(visible_items[0].css("padding-bottom"));
		
		var columns_count = Math.floor((obj.width() + margins_width) / (item_width + margins_width));
		var rows_count = Math.ceil(items_count / columns_count);
		
		obj.css("position", "relative");
		obj.height(rows_count * (item_height + margins_height));
		
		var sorted_items = [];
		for (var i = 0; i < visible_items.length; i++) {
			if (sort_type === false || sort_field === false) {
				sorted_items.push([i]);
			} else {
				sorted_items.push([i, visible_items[i].find("." + sort_field + " .field-content").html()]);
			}
		}
		
		if (sort_type !== false && sort_field !== false) {
			sorted_items.sort(function(a, b) {
				return sort_type == "asc" ? (a[1] - b[1]) : (b[1] - a[1]);
			});
		}
	
		var row = 0;
		var column = 0;
		var random_width = (columns_count - 1) * (item_width + margins_width) + 1;
		var random_height = (rows_count - 1) * (item_height + margins_height) + 1;
		
		for (var i = 0; i < sorted_items.length; i++) {
			var item = visible_items[sorted_items[i][0]];
			
			if (items_on_page !== false && cur_page !== false &&
				(i < (cur_page - 1) * items_on_page || i >= cur_page * items_on_page)
			) {
				continue;
			}
			
			item.css("display", "list-item");
			item.css("position", "absolute");
			item.css("top", Math.floor(Math.random() * random_height));
			item.css("left", Math.floor(Math.random() * random_width));
			
			item.animate({ top : row * (item_height + margins_height), left : column * (item_width + margins_width) }, speed, effect);
			
			column++;
			if (column == columns_count) {
				column = 0;
				row++;
			}
		}
		
		if (items_on_page !== false && cur_page !== false) {
			obj.find("ul.pager").remove();
			
			var pages_count = Math.ceil(visible_items.length / items_on_page);
			
			if (pages_count > 1) {
				var pager = "";
				
				pager += '<ul class="pager">';
				for (var i = 0; i < pages_count; i++) {
					pager += '<li' + (i == cur_page - 1 ? ' class="active"' : '') + '>' + (i + 1) + '</li>';
				}
				pager += '</ul>';
				
				obj.append(pager);
				
				obj.find("ul.pager").css("top", Math.floor(Math.random() * random_height));
				obj.find("ul.pager").css("left", Math.floor(Math.random() * random_width));
				
				obj.find("ul.pager").animate({ top : obj.height(), left : Math.round((obj.width() - obj.find("ul.pager").width()) / 2) }, speed, effect);
				
				obj.find("ul.pager li").bind("click", function() {
					add_isotope(obj, visible_items, items_on_page, $(this).html(), sort_type, sort_field, speed, effect);
				});
			}
		}
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
		var visible_items = [];
		var items_on_page = 4;
		var sort_type = "desc";
		var sort_field = "h-date";
		var grid_type = "grid-2";
		var mc_filters = [];
		var sc_filters = [];
		
		root_view.css("display", "block");
		$(".pane-content > .resources-view .views-row:visible").each(function() {
			visible_items.push($(this));
		});

		add_isotope(root_view, visible_items, items_on_page , 1, sort_type, sort_field, 850, "easeInOutExpo");

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
			
			add_isotope(root_view, visible_items, items_on_page , 1, sort_type, sort_field, 850, "easeInOutExpo");
		});
		
		var apply_filters = function() {
			mc_filters = [];
			sc_filters = [];
			visible_items = [];
			
			$(".resources-main-category-menu-view .views-row .title.active").each(function() {
				mc_filters.push($(this).find(".field-content").html());
			});
			
			$(".resources-second-category-menu-view .views-row .title.active").each(function() {
				sc_filters.push($(this).find(".field-content").html());
			});

			root_view.find(".views-row." + grid_type).each(function() {
				var mc_visible = false;
				var sc_visible = false;
				var cur_mc = $(this).find(".h-mc .field-content").html();
				var cur_sc = $(this).find(".h-sc .field-content").html();
				
				if (mc_filters.length > 0) {
					for (var i = 0; i < mc_filters.length; i++) {
						if (mc_filters[i] == cur_mc) {
							mc_visible = true;
						}
					}
				} else {
					mc_visible = true;
				}
				
				if (sc_filters.length > 0) {
					for (var i = 0; i < sc_filters.length; i++) {
						if (sc_filters[i] == cur_sc) {
							sc_visible = true;
						}
					}
				} else {
					sc_visible = true;
				}
				
				if (mc_visible === true && sc_visible === true) {
					visible_items.push($(this));
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
			if ($(this).hasClass("active") === false) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");	
			}
			
			apply_filters();
			add_isotope(root_view, visible_items, items_on_page , 1, sort_type, sort_field, 850, "easeInOutExpo");
		});
		
		$(".resources-second-category-menu-view .views-row .title").click(function() {			
			if ($(this).hasClass("active") === false) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");	
			}
			
			apply_filters();
			add_isotope(root_view, visible_items, items_on_page , 1, sort_type, sort_field, 850, "easeInOutExpo");
		});
		
		$(".resources-tags-menu-view .views-row .title").click(function() {
			reset_filters();
			visible_items = [];
			
			var cur_tag = $(this).find(".field-content").html();
			root_view.find(".views-row." + grid_type).each(function() {
				var tags = ($(this).find(".h-tags .field-content").html()).split("+");
				
				var tags_visible = false;
				for (var i = 0; i < tags.length; i++) {
					if (tags[i] == cur_tag) {
						tags_visible = true;
					}
				}
				
				if (tags_visible === true) {
					visible_items.push($(this));
				}
			});

			add_isotope(root_view, visible_items, items_on_page , 1, sort_type, sort_field, 850, "easeInOutExpo");
		});
		
		$(".resources-archive-menu-view .views-summary a").click(function() {
			reset_filters();
			visible_items = [];

			var cur_date = $(this).html();
			root_view.find(".views-row." + grid_type).each(function() {
				if ($(this).find(".h-archive .field-content").html() == cur_date) {
					visible_items.push($(this));
				}
			});
			
			add_isotope(root_view, visible_items, items_on_page , 1, sort_type, sort_field, 850, "easeInOutExpo");
			return false;
		});
		
		var grid_clone_items = function(new_grid_type) {
			var new_visible_items = [];
			
			for (var i = 0; i < visible_items.length; i++) {
				var cur_nid = visible_items[i].find(".nid .field-content").html();
				
				root_view.find(".views-row." + new_grid_type).each(function() {
					if ($(this).find(".nid .field-content").html() == cur_nid) {
						new_visible_items.push($(this));
					}
				});
			}
			
			grid_type = new_grid_type;
			visible_items = new_visible_items;
		};
		
		$(".view-grid .grid-2").click(function() {
			items_on_page = 4;
			grid_clone_items("grid-2");
			add_isotope(root_view, visible_items, items_on_page , 1, sort_type, sort_field, 850, "easeInOutExpo");
		});
		
		$(".view-grid .grid-4").click(function() {
			items_on_page = 8;
			grid_clone_items("grid-4");
			add_isotope(root_view, visible_items, items_on_page , 1, sort_type, sort_field, 850, "easeInOutExpo");
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

