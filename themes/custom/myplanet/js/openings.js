var old_visible_items = [];
var new_visible_items = [];

(function($) {

$("document").ready(function() {
	
	$(".job-posts-categories-menu .item-list ul li ul li .title").addClass("child");
	
	$(".job-posts-categories-menu .item-list ul li:eq(0)").before('<li><div class="title all active"><div class="field-content">All</div></div></li>');
	
	$(".job-posts-categories-menu .item-list ul li").hover(
		function() { $(this).stop().animate({ backgroundPosition: "163px 16px" }, 850, "easeOutElastic"); }, 
		function() { $(this).stop().animate({ backgroundPosition: "153px 16px" }, 250); }
	);
			
	$(".job-posts-view .views-row").hover(
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "60px -7px" }, 850, "easeOutElastic"); }, 
		function() { $(this).find(".link").stop().animate({ backgroundPosition: "50px -7px" }, 250); }
	);

	var categories_filter = $.cookies.get("job_posts_categories_filter");
	var child_categories_filter = $.cookies.get("job_posts_child_categories_filter");
	
	var root_view = $(".job-posts-view");
	var page_prefix = "job_posts";
	
	var fade_out_speed = 850;
	var fade_out_effect = "easeInOutExpo";
	var fade_in_speed = 850;
	var fade_in_effect = "easeInOutExpo";
	var move_speed = 850;
	var move_effect = "easeInOutExpo";
	
	var apply_categories_filter = function() {
		old_visible_items = new_visible_items;
		new_visible_items = [];

		root_view.find(".views-row").each(function(index) {
			if (categories_filter === null) {
				new_visible_items.push(index);
			}
			if (categories_filter !== null && child_categories_filter === null && categories_filter == $(this).find(".category .field-content").html()) {
				new_visible_items.push(index);
			}
			if (categories_filter !== null && child_categories_filter !== null
				&& categories_filter == $(this).find(".category .field-content").html() && child_categories_filter == $(this).find(".child-category .field-content").html())
			{
				new_visible_items.push(index);
			}
		});
	};

	root_view.find(".views-row").css("display", "none");
	apply_categories_filter();
	add_isotope(root_view, old_visible_items, new_visible_items, false, false, page_prefix, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect, true);
	
	$(".job-posts-categories-menu .title").click(function() {
		if ($(this).hasClass("all") === false) {
			if ($(this).hasClass("child") === false) {
				categories_filter = $(this).find(".field-content").html();
				child_categories_filter = null;
			} else {
				child_categories_filter = $(this).find(".field-content").html();
				categories_filter = $(this).parent().parent().parent().parent().find(".title:eq(0) .field-content").html();
			}
			
		} else {
			categories_filter = null;
			child_categories_filter = null;
		}
		$.cookies.set("job_posts_categories_filter", categories_filter);
		$.cookies.set("job_posts_child_categories_filter", child_categories_filter);
		apply_categories_filter();
		add_isotope(root_view, old_visible_items, new_visible_items, false, false, page_prefix, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect, false);
	});
	
});

})(jQuery);