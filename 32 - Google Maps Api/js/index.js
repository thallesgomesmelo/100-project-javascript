// Set map
function initialize() {
  const options = {
    // Zoom of map on start
    zoom: 19,
    // Initial center cordinates on start (Praça Sete de Setembro)
    center: new google.maps.LatLng(-19.91917, -43.93863),

    // Type of map (ROADMAP, SATELLITE, HYBRID, TERRAIN)
    mapyTypeId: google.maps.MapTypeId.ROADMAP,

    // Minimum zoom of map
    minZoom: 2
  };

  // Create a new map instance using provided options
  const map = new google.maps.Map(document.getElementById("map"), options);

  // Create an info window to display location info
  const infoWindow = new google.maps.InfoWindow();

  // Create a marker for example : Brazil, Belo Horizonte
  const marker = new google.maps.Marker({
    // Cordinates for Belo Horizonte, Praça Sete de Setembro
    position: new google.maps.LatLng(-19.91917, -43.93863),

    // Attach the marker
    map: map,

    // Tooltip on hover
    title: "Belo Horizonte, Praça Sete de Setembro"
  });

  // Add click event listener for marker
  marker.addListener("click", () => {
    infoWindow.setContent(marker.title);
    infoWindow.open(map, marker);
  });

  // Adjust map center when the window is resized
  google.maps.event.addDomListener(window, "resize", () => {
    map.setCenter(options.center);
  });
}

google.maps.event.addDomListener(window, "load", initialize);
