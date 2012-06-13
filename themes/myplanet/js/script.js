(function($) { $("document").ready(function() {

	/* To Top */
	$(".to-top").click(function() {
		$("html, body").animate({ scrollTop : 0 }, 800, "easeInOutExpo");
	});
	
	$(window).scroll(function() {
		if ($(this).scrollTop() > 0) {
			if ($(".to-top").css("display") != "none") return;
			$(".to-top").fadeIn(500, "easeInOutExpo");
		} else {
			if ($(".to-top").css("display") == "none") return;
			$(".to-top").fadeOut(300, "easeInOutExpo");
		}
	});
	
	$("a[href=" + $("link[rel='canonical']").attr("href") + "]").addClass("active");
	
	$(".logo > .pane-content, .footer-columns .footer-columns-1 .image").click(function() {
		window.location = Drupal.settings.basePath;
	});
	
	var oldAnim = $.fn.animate;
	var oldBackPos = "";
    $.fn.animate = function(prop) {
    	oldBackPos = this.css("backgroundPosition");
    	if (oldBackPos === undefined) oldBackPos = this.css("backgroundPositionX") + " " + this.css("backgroundPositionY");
        return oldAnim.apply(this, arguments);
    };
    
	$.fx.step.backgroundPosition = function(fx) {
		if (!fx.bgPosReady) {
			var startPair = oldBackPos.split(" ");
			fx.start = [startPair[0], startPair[1]];
			var endPair = fx.options.curAnim.backgroundPosition.split(" ");
			fx.end = [endPair[0], endPair[1]];
			fx.bgPosReady = true;
		}
		var nowPosX = "";
		if (fx.start[0].indexOf("%") == -1 && fx.end[0].indexOf("%") == -1) {
			nowPosX = ((parseInt(fx.end[0]) - parseInt(fx.start[0])) * fx.pos) + parseInt(fx.start[0]) + "px";
		} else { nowPosX = fx.end[0]; }
		var nowPosY = "";
		if (fx.start[1].indexOf("%") == -1 && fx.end[1].indexOf("%") == -1) {
			nowPosY = ((parseInt(fx.end[1]) - parseInt(fx.start[1])) * fx.pos) + parseInt(fx.start[1]) + "px";
		} else { nowPosY = fx.end[1]; }
        fx.elem.style.backgroundPosition = nowPosX + " " + nowPosY;
	};
    
	$(".to-top .pane-content").hover(
		function() { $(this).stop().animate({ backgroundPosition: "24px 5px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPosition: "24px 12px" }, 250); }
	);
	
	/* Log In */
	$(".user-login input.form-submit").attr("value", "Go");
	var mouse_over_loginbox = false;
	if ($(".user-login input").html() !== null) {
		$(".top-menu ul li").eq($(".top-menu ul li").length - 1).remove();
		
		$(".top-menu ul li:last a").click(function() { return false; });
		
		$(".top-menu ul li:last a").hover(
			function() {
				$(".user-login > .pane-content").height(128);
				$(".user-login > .pane-content").stop().slideDown(500, "easeOutElastic");
			},
			function() {
				setTimeout(function() {
					if (mouse_over_loginbox === false) {
						$(".user-login > .pane-content").stop().slideUp(100, "easeOutCubic");
					}
				}, 1);
			}
		);
		
		$(".user-login > .pane-content").hover(
			function() {
				mouse_over_loginbox = true;
			},
			function() {
				mouse_over_loginbox = false;
				$(".user-login > .pane-content").stop().slideUp(200, "easeOutCubic");
			}
		);
		
		$(".user-login input[name='name']").attr("value", "");
		$(".user-login input[name='name']").attr("placeholder", "Username");
		$(".user-login input[name='name']").placeholder();
		
		$(".user-login input[name='pass']").attr("value", "");
		$(".user-login input[name='pass']").attr("placeholder", "Password");
		$(".user-login input[name='pass']").placeholder();
		
		$(".user-login input.form-text").hover(function() {
			$(this).stop().animate({ backgroundPosition: "-5px -7px" }, 250, "easeOutCubic", function() {
				$(this).animate({ backgroundPosition: "-10px -7px" }, 250, "easeOutCubic", function() {
					$(this).animate({ backgroundPosition: "-5px -7px" }, 250, "easeOutCubic", function() {
						$(this).animate({ backgroundPosition: "-10px -7px" }, 250, "easeOutCubic");
					});
				});
			});
		});
	} else {
		$(".top-menu ul li").eq($(".top-menu ul li").length - 2).remove();
	}
	
	/* Main Site Menu */
	$(".main-site-menu ul li a").hover(
		function() { $(this).stop().animate({ backgroundPosition: "50% -20px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPosition: "50% -6px" }, 250); }
	);
	
	/* Search Form */
	$(".search-form input.form-text").attr("placeholder", "Mmm resources...").placeholder();
	$(".search-form input.form-submit").attr("value", "Go").css("color", "#fff");
	
	/* Resources Mega Menu */
	var mouse_over_megamenu = false;
	$(".main-site-menu .pane-content ul li a:last").hover(
		function() {
			$(".resources-mega-menu").stop().height(215).css("padding-top", "20px").css("padding-bottom", "33px").slideDown(500, "easeOutCubic", function() {
				$(".resources-mega-menu > .inside").stop().css("opacity", 1).fadeIn(500, "easeOutCubic");
			});
		},
		function() {
			setTimeout(function() {
				if (mouse_over_megamenu === false) {
					hide_mega_menu();
				}
			}, 1);
		}
	);
	$(".resources-mega-menu").hover(
			function() {
				mouse_over_megamenu = true;
			},
			function() {
				mouse_over_megamenu = false;
				hide_mega_menu();
			}
	);
	var hide_mega_menu = function() {
		$(".resources-mega-menu > .inside").stop().fadeOut(500, "easeOutCubic", function() {
			$(".resources-mega-menu").stop().slideUp(100, "easeOutCubic");
		});
	};
	$(".resources-mega-menu .resources-main-category-menu .title .field-content, .resources-mega-menu-popular-view .main-category .field-content").click(function() {
		$.cookies.set("resources_mc_filters", [$(this).html()]);
		$.cookies.set("resources_sc_filters", null);
		$.cookies.set("resources_tags_filters", null);
		$.cookies.set("resources_archive_filters", null);
		window.location = Drupal.settings.basePath + "resources";
	});
	$(".resources-mega-menu .resources-second-category-menu .title .field-content").click(function() {
		$.cookies.set("resources_mc_filters", null);
		$.cookies.set("resources_sc_filters", [$(this).html()]);
		$.cookies.set("resources_tags_filters", null);
		$.cookies.set("resources_archive_filters", null);
		window.location = Drupal.settings.basePath + "resources";
	});
	
	/* Breadcrumb */
	if ($(".site-breadcrumb").html() !== null) {
		var temp_breadcrumb = $(".site-breadcrumb").html().replace(/ \» /g, "");
		$(".site-breadcrumb").html(temp_breadcrumb);
		$(".site-breadcrumb a").each(function(index) {
			if (index == $(".site-breadcrumb a").length - 1) return;
			$(this).after("<div class='arrow'></div>");
		});
	}
	
	/* Thumbnail */
	$(".thumbnail").hover(
		function() { $(this).find(".layer, .layer > .field-content > a").stop().animate({ opacity: 1 }, 100, "easeOutCubic"); }, 
		function() { $(this).find(".layer, .layer > .field-content > a").stop().animate({ opacity: 0 }, 800, "easeOutCubic"); }
	);
	
	// Images
	var images = [];
	var cur_image_index = -1;
	
	$(window).resize(function() {
		$(".image-viewer .image img").css("max-width", $(window).width());
	});
	
	$("img").click(function() {
		if (check_no_img($(this)) === true) return;
		
		images = [];
		var cur_image_path = $(this).attr("src");
		
		var index = 0;
		$("img").each(function() {
			if (check_no_img($(this)) === true) return;
			
			var original_path = $(this).attr("src");
			files_path = original_path.substr(0, original_path.indexOf("files") + 5);
			
			if (original_path == cur_image_path) {
				cur_image_index = index;
			}
			
			if ($(this).attr("src").indexOf("files/styles") != -1) {
				original_path = $(this).attr("src");
				original_path = original_path.substr(original_path.indexOf("/public/") + 8);
				original_path = files_path + "/" + original_path;
			}
			
			if ($(this).attr("src").indexOf("files/resize") != -1) {
				original_path = $(this).attr("src");
				original_path = original_path.substr(original_path.indexOf("files/resize") + 13);
				original_path = original_path.substr(0, original_path.lastIndexOf("-")) + original_path.substr(original_path.lastIndexOf("."));
				original_path = files_path + "/" + original_path;
			}
			
			images.push({ obj : $(this), path : original_path });
			index++;
		});

		$(".image-viewer > .inside").css("padding-top", $(window).scrollTop());
		update_image_viewer_image();
		$(".image-viewer").fadeIn(500, "easeOutCubic");
		
		return false;
	});
	
	var check_no_img = function(obj) {
		while (obj.hasClass("html") !== true) {
			if (obj.hasClass("no-img")) return true;
			obj = obj.parent();
		}
		return false;
	};
	
	var update_image_viewer_image = function() {
		$(".image-viewer .image").html("<img class='no-img' src='" + images[cur_image_index]["path"] + "' />");
		$(".image-viewer .title .pane-content").html(images[cur_image_index]["obj"].attr("title"));
		$(".image-viewer .summary .pane-content").html(images[cur_image_index]["obj"].attr("alt"));
		$(".image-viewer .summary").css("padding-left", ($(".image-viewer .title").offset().left + 4) + "px");
		$(".image-viewer .image img").css("max-width", $(window).width());
	};
	
	$(".image-viewer .back, .image-viewer .image, .image-viewer .close").click(function() {
		$(".image-viewer").fadeOut(500, "easeOutCubic");
	});
	
	$(".image-viewer .previous").click(function() {
		cur_image_index--;
		
		if (cur_image_index == -1) {
			cur_image_index = images.length - 1;
		}
		
		update_image_viewer_image();
	});
	
	$(".image-viewer .next").click(function() {
		cur_image_index++;
		
		if (cur_image_index == images.length) {
			cur_image_index = 0;
		}
		
		update_image_viewer_image();
	});
	
	$(".image-viewer .previous").hover(
		function() { $(this).find(".pane-content").stop().animate({ backgroundPosition: "10px 20px" }, 850, "easeOutElastic"); }, 
		function() { $(this).find(".pane-content").stop().animate({ backgroundPosition: "20px 20px" }, 250); }
	);
	
	$(".image-viewer .next").hover(
		function() { $(this).find(".pane-content").stop().animate({ backgroundPosition: "30px 20px" }, 850, "easeOutElastic"); }, 
		function() { $(this).find(".pane-content").stop().animate({ backgroundPosition: "20px 20px" }, 250); }
	);
	
	/* Related Content */
	add_custom_classes($(".related-content-view"));
	
	$(".related-content-view .views-row").hover(
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "60px -7px" }, 850, "easeOutElastic"); },
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "50px -7px" }, 250, "easeOutElastic"); }
	);
	
}); })(jQuery);