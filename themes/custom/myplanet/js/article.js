(function($) {

$("document").ready(function() {
	
	var prev_blog_index = 0;
	var next_blog_index = 0;
	var cur_blog_link = $.trim($(".main-content .center-region .link .pane-content").html());
	cur_blog_link = cur_blog_link.substr(cur_blog_link.indexOf("//") + 2);
	cur_blog_link = cur_blog_link.substr(cur_blog_link.indexOf("/"));

	for (var i = 0; i < new_visible_items.length; i++) {
		var blog_link = $(".resources-hidden-view .views-row:eq(" + new_visible_items[i] + ") .link a").attr("href");
		if (blog_link == cur_blog_link) {
			cur_blog_index = i;
			prev_blog_index = (i - 1) >= 0 ? (i - 1) : (new_visible_items.length - 1);
			next_blog_index = (i + 1) <= (new_visible_items.length - 1) ? (i + 1) : 0;
			break;
		}
	}
	
	$(".article-page .main-content .right-region .links .previous a").attr("href", $(".resources-hidden-view .views-row:eq(" + new_visible_items[prev_blog_index] + ") .link a").attr("href"));
	$(".article-page .main-content .right-region .links .next a").attr("href", $(".resources-hidden-view .views-row:eq(" + new_visible_items[next_blog_index] + ") .link a").attr("href"));
	
	$(".article-page .bottom-links .previous a").html($(".resources-hidden-view .views-row:eq(" + new_visible_items[prev_blog_index] + ") .title .field-content").html());
	$(".article-page .bottom-links .next a").html($(".resources-hidden-view .views-row:eq(" + new_visible_items[next_blog_index] + ") .title .field-content").html());
	$(".article-page .bottom-links .previous a").attr("href", $(".resources-hidden-view .views-row:eq(" + new_visible_items[prev_blog_index] + ") .link a").attr("href"));
	$(".article-page .bottom-links .next a").attr("href", $(".resources-hidden-view .views-row:eq(" + new_visible_items[next_blog_index] + ") .link a").attr("href"));
	
	var body_height = $(".main-content .center-region .body").height() + parseInt($(".main-content .center-region .body").css("margin-top")) + 20;
	var related_margin = parseInt($(".resources-realated-view .views-row").css("margin-bottom"));
	var related_height = $(".resources-realated-view .views-row").height() + related_margin;
	var related_count = Math.floor((body_height + related_margin) / related_height);
	
	$(".resources-realated-view .views-row:eq(" + (related_count - 1) + ")").css("margin-bottom", "0px");
	$(".resources-realated-view .views-row").each(function(index) {
		if (index > related_count - 1) {
			$(this).css("display", "none");
		}
	});
	
	$(".resources-realated-view .layer a").hover(
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "21px -47px" }, 850, "easeOutElastic"); }, 
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "11px -47px" }, 250); }
	);
	
});

})(jQuery);