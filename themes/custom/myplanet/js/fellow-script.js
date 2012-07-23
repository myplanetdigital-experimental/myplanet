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
	
	$(".logo > .pane-content").click(function() {
		window.location = Drupal.settings.basePath + "fellowships";
	});
	
	$(".footer-logo > .pane-content").click(function() {
		window.location = Drupal.settings.basePath;
	});
	
	add_custom_classes($(".fellow-blogs-view"));
	
}); })(jQuery);