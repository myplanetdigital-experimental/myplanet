(function($) {

$("document").ready(function() {
	
	add_custom_classes($(".related-view"));
	
    var myLatlng = new google.maps.LatLng("43.8521041870117", "-79.3654251098633");
    var myOptions = { zoom : 15, center : myLatlng, mapTypeId : google.maps.MapTypeId.ROADMAP };
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    var marker = new google.maps.Marker({ position : myLatlng, map : map, title : "Myplanet Toronto", animation : google.maps.Animation.DROP }); 
	
});

})(jQuery);