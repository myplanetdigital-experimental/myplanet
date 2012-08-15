(function($) {

$("document").ready(function() {
	
    $(".search-form .form-text").attr("value", $.trim($(".search-form .search-phrase .pane-content").html()));
    
    $(".search-form .form-submit").click(function() {
        $.cookies.set("resources_mc_filters", null);
		$.cookies.set("resources_sc_filters", null);
		$.cookies.set("resources_tags_filters", null);
		$.cookies.set("resources_archive_filters", null);
        window.location = Drupal.settings.basePath + "resources/search/" + $(".search-form .form-text").attr("value");
        return false;
    });
	
});

})(jQuery);