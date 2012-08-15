(function($) {

$("document").ready(function() {
	
    $(".focal-slideshow").serialScroll({
		target : '.field', items : '.field-item', prev : '.previous', next : '.next', constant : false,
        axis : 'xy', duration : 700, force : true, easing : 'easeInOutExpo', interval : 8000
	});
	
});

})(jQuery);