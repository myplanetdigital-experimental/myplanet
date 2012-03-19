(function($) {

$("document").ready(function() {
	
	add_custom_classes($(".events-featured-view"));
	add_custom_classes($(".related-view"));
	
	$(".events-calendar-view .calendar-calendar td.has-events a").click(function() { return false; });
	
	$(".main-body .right-region .link").hover(
		function() { $(this).find("a").stop().animate({ backgroundPosition: "150px -6px" }, 850, "easeOutElastic");	}, 
		function() { $(this).find("a").stop().animate({ backgroundPosition: "140px -6px" }, 250); }
	);
	
	var latlng = $(".main-body .center-region .latlng p").html().split(", ");
	var latitude = latlng[0].replace(/[^0-9\-.]/g, "");
	var longitude = latlng[1].replace(/[^0-9\-.]/g, "");
	
	var myLatlng = new google.maps.LatLng(latitude, longitude);
    var myOptions = { zoom : 16, center : myLatlng, mapTypeId : google.maps.MapTypeId.ROADMAP };
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    var marker = new google.maps.Marker({ position : myLatlng, map : map, animation : google.maps.Animation.DROP });
	
});

})(jQuery);