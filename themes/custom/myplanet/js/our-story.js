var old_visible_items = [];
var new_visible_items = [];

(function($) {

$("document").ready(function() {
	
	var categories_filter = $.cookies.get("our_team_categories_filter") !== null ? $.cookies.get("our_team_categories_filter") : null;
	var root_view = $(".our-team-view");
	var page_prefix = "our_team";
	
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
			if (categories_filter === null || categories_filter == $(this).find(".category .field-content").html()) {
				new_visible_items.push(index);
			}
		});
	};
	
	$(".our-team-categories-menu .item-list ul li").eq(0).before('<li><div class="title all active"><div class="field-content">All</div></div></li>');
	root_view.find(".views-row").css("display", "none");
	apply_categories_filter();
	add_isotope(root_view, old_visible_items, new_visible_items, false, false, page_prefix, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect, true);
	
	$(".our-team-categories-menu .item-list ul li .title").click(function() {
		if ($(this).hasClass("all") === false) {
			categories_filter = $(this).find(".field-content").html();
		} else {
			categories_filter = null;
		}
		$.cookies.set("our_team_categories_filter", categories_filter);
		apply_categories_filter();
		add_isotope(root_view, old_visible_items, new_visible_items, false, false, page_prefix, fade_out_speed, fade_out_effect, fade_in_speed, fade_in_effect, move_speed, move_effect, false);
	});
	
});

})(jQuery);