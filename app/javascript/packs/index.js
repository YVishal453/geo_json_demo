// function initMap() {

// 	const map = new google.maps.Map(document.getElementById("map"), {
// 		center: { lat: 22.66215, lng: 75.9035 },
// 		zoom: 10,
// 	});
// 	const drawingManager = new google.maps.drawing.DrawingManager({
// 		drawingMode: google.maps.drawing.OverlayType.MARKER,
// 		drawingControl: true,
// 		drawingControlOptions: {
// 			position: google.maps.ControlPosition.TOP_CENTER,
// 			drawingModes: [
// 				google.maps.drawing.OverlayType.MARKER,
// 			//   google.maps.drawing.OverlayType.CIRCLE,
// 			//   google.maps.drawing.OverlayType.POLYGON,
// 				google.maps.drawing.OverlayType.POLYLINE,
// 			//   google.maps.drawing.OverlayType.RECTANGLE,
// 			],
// 		},
// 		markerOptions: {
// 			icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
// 		},
// 		circleOptions: {
// 			fillColor: "#ffff00",
// 			fillOpacity: 1,
// 			strokeWeight: 5,
// 			clickable: true,
// 			editable: true,
// 			zIndex: 1,
// 		},
// 	});

// 	drawingManager.setMap(map);
// }

// window.initMap = initMap; 


var map;
var infoWindow;
var listOfPolygons = [];

function initMap() {
  var locations =[
        [22.743150, 75.846360], //  bandaari hospital
        [22.751860, 75.893501], // MR 10 road
        [22.7323, 75.8895] // CHL hospital
    ];  
  var markers = [];
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(22.66215, 75.9035),
    zoom: 10,
    streetViewControl: false,
    mapTypeControl: false
  });
  //Drawing tool
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      
      position: google.maps.ControlPosition.LEFT_TOP,
      drawingModes: [
        // google.maps.drawing.OverlayType.MARKER,
        //google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        //google.maps.drawing.OverlayType.POLYLINE,
        // google.maps.drawing.OverlayType.RECTANGLE,
      ],
    },
    markerOptions: {
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    },
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    }
  });
  drawingManager.setMap(map);
  for (i = 0; i < locations.length; i++) {
    markers.push(
      new google.maps.Marker({
        position: {
          lat: locations[i][0],
          lng: locations[i][1]
        },
      })
    );
  }
  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
    var poly = event.overlay.getPath();
    if (event.type == 'polygon') {
      // hide polygon from DrawingManager
      event.overlay.setMap(null);
      listOfPolygons.push(new google.maps.Polygon({
        paths: event.overlay.getPath().getArray(),
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      }));
      for (var i = 0; i < markers.length; i++) {
        if (google.maps.geometry.poly.containsLocation(markers[i].getPosition(), listOfPolygons[listOfPolygons.length - 1])) {
          // show current marker
          markers[i].setMap(map);
        }
      }
      listOfPolygons[listOfPolygons.length - 1].setMap(map);
    }
  });
  
}

window.initMap = initMap; 
