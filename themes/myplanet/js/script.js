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
	
	var add_isotope = function(obj, speed, effect, sort_type, sort_field) {
		var full_width = obj.width();
		var items_count = obj.find(".views-row:visible").length;
		
		var item_width = obj.find(".views-row:visible").width();
		var margins_width = parseInt(obj.find(".views-row:visible").css("margin-left")) + parseInt(obj.find(".views-row:visible").css("margin-right")) + parseInt(obj.find(".views-row:visible").css("padding-left")) + parseInt(obj.find(".views-row:visible").css("padding-right"));
		
		var item_height = obj.find(".views-row").height();
		var margins_height = parseInt(obj.find(".views-row:visible").css("margin-top")) + parseInt(obj.find(".views-row:visible").css("margin-bottom")) + parseInt(obj.find(".views-row:visible").css("padding-top")) + parseInt(obj.find(".views-row:visible").css("padding-bottom"));
		
		var columns_count = Math.floor((full_width + margins_width) / (item_width + margins_width));
		var rows_count = Math.ceil(items_count / columns_count);
		
		obj.css("position", "relative");
		obj.css("height", rows_count * (item_height + margins_height) + "px");
		
		var items = [];
		obj.find(".views-row:visible").each(function(index) {
			items.push([index, $(this).find("." + sort_field + " .field-content").html()]);
		});
		
		items.sort(function(a, b) {
			return sort_type == "asc" ? (a[1] - b[1]) : (b[1] - a[1]);
		});
	
		var row = 0;
		var column = 0;
		
		for (var i = 0; i < items.length; i++) {
			var item = obj.find(".views-row:visible").eq(items[i][0]);
			
			item.css("position", "absolute");
			
			item.animate({ top : row * (item_height + margins_height), left : column * (item_width + margins_width) }, speed, effect);
				
			column++;
			if (column == columns_count) {
				column = 0;
				row++;
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
	
	/* Front Page Items */
	$(".front-items-view .thumbnail").hover(
		function() { $(this).find(".link2").stop().animate({ backgroundPositionX: "24px" }, 850, "easeOutElastic");	}, 
		function() { $(this).find(".link2").stop().animate({ backgroundPositionX: "20px" }, 250); }
	);
	
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
		var sort_type = "desc";
		var sort_field = "h-date";
		var grid_type = "grid-2";
		var mc_filters = [];
		var sc_filters = [];
		
		add_isotope($(".resources-view"), 850, "easeOutCubic", sort_type, sort_field);

		$(".resources-view .thumbnail.grid-2").hover(
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
			
			add_isotope($(".resources-view"), 850, "easeOutCubic", sort_type, sort_field);
		});
		
		var apply_filters = function() {
			mc_filters = [];
			sc_filters = [];
			
			$(".resources-main-category-menu-view .views-row .title.active").each(function() {
				mc_filters.push($(this).find(".field-content").html());
			});
			
			$(".resources-second-category-menu-view .views-row .title.active").each(function() {
				sc_filters.push($(this).find(".field-content").html());
			});

			$(".resources-view .views-row." + grid_type).each(function() {
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
					$(this).css("display", "list-item");
				} else {
					$(this).css("display", "none");
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
			add_isotope($(".resources-view"), 850, "easeOutCubic", sort_type, sort_field);
		});
		
		$(".resources-second-category-menu-view .views-row .title").click(function() {			
			if ($(this).hasClass("active") === false) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");	
			}
			
			apply_filters();
			add_isotope($(".resources-view"), 850, "easeOutCubic", sort_type, sort_field);
		});
		
		$(".resources-tags-menu-view .views-row .title").click(function() {
			reset_filters();
			
			$(".resources-view .views-row." + grid_type).each(function() {
				$(this).css("display", "list-item");
			});
			
			var cur_tag = $(this).find(".field-content").html();
			$(".resources-view .views-row." + grid_type).each(function() {
				var tags = ($(this).find(".h-tags .field-content").html()).split("+");
				
				var tags_visible = false;
				for (var i = 0; i < tags.length; i++) {
					if (tags[i] == cur_tag) {
						tags_visible = true;
					}
				}
				
				if (tags_visible === true) {
					$(this).css("display", "list-item");
				} else {
					$(this).css("display", "none");
				}
			});

			add_isotope($(".resources-view"), 850, "easeOutCubic", sort_type, sort_field);
		});
		
		$(".resources-archive-menu-view .views-summary a").click(function() {
			reset_filters();
			
			$(".resources-view .views-row." + grid_type).each(function() {
				$(this).css("display", "list-item");
			});
			
			var cur_date = $(this).html();
			$(".resources-view .views-row." + grid_type).each(function() {
				if ($(this).find(".h-archive .field-content").html() == cur_date) {
					$(this).css("display", "list-item");
				} else {
					$(this).css("display", "none");
				}
			});
			
			add_isotope($(".resources-view"), 850, "easeOutCubic", sort_type, sort_field);
			return false;
		});
		
		$(".view .grid-2").click(function() {
			grid_type = "grid-2";
			
			$(".resources-view .views-row.grid-4").each(function(index) {
				if ($(this).css("display") != "none") {
					$(this).css("display", "none");
					$(".resources-view .views-row.grid-2").eq(index).css("display", "list-item");
				}
			});
			
			add_isotope($(".resources-view"), 850, "easeOutCubic", sort_type, sort_field);
		});
		
		$(".view .grid-4").click(function() {
			grid_type = "grid-4";
			
			$(".resources-view .views-row.grid-2").each(function(index) {
				if ($(this).css("display") != "none") {
					$(this).css("display", "none");
					$(".resources-view .views-row.grid-4").eq(index).css("display", "list-item");
				}
			});
			
			add_isotope($(".resources-view"), 850, "easeOutCubic", sort_type, sort_field);
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

