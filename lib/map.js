var map, heatmap;
function initMap(filter, filterFn = getViolationData) {
  if (filter === undefined) filter = "Evidence of insects";
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.745, lng: -73.975 },
    zoom: 12,
    // styles: mapStyles,
    streetViewControl: false,
    mapTypeControl: false,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
  }
  
  
  );

  createHeatmap(filterFn, filter);
  
}

function createHeatmap(filterFn, filter, options = {}) {
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(filterFn, filter),
    map: map
  });
}


function getPoints(filterFn, filter) {
  let filteredData = filterFn(filter)
  let arr = []
  for (let i = 0; i < filteredData.length; i++) {
    if (filteredData[i][2] <= 13) {
      arr.push({
        location: new google.maps.LatLng(filteredData[i][0], filteredData[i][1]),
        weight: 1
      })
    } 
    else if (filteredData[i][2] <= 27) {
      arr.push({
        location: new google.maps.LatLng(filteredData[i][0], filteredData[i][1]),
        weight: filteredData[i][2] * 1.5
      })
    } 
    else {
      arr.push({
        location: new google.maps.LatLng(filteredData[i][0], filteredData[i][1]),
        weight: filteredData[i][2] * 2.0
      })
    }
  }
  return arr;
}

function clearHeatmap() {
  heatmap.setMap(null);
}