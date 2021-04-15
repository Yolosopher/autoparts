// start init map
function initMap() {
    // The location of location
  var location = { lat: lattt, lng: longgg };
  // options
  const opts = {
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER,
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      },
      controlSize: 26,
      streetViewControl: true,
      fullscreenControl: true,

      center: location,
  };
  // The map, centered at location
    var map = new google.maps.Map(document.getElementById("map"), opts);
  // if (document.getElementById("map2")) {
  // var map2 = new google.maps.Map(document.getElementById("map2"), opts);
  // var marker2 = new google.maps.Marker({ position: location, map: map2 });
  // }
  // The marker, positioned at location
  var marker = new google.maps.Marker({ position: location, map: map });

}
// end init map