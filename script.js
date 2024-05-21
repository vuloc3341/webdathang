// mapboxgl.accessToken =
//   "pk.eyJ1IjoibGV0bWVsdXZ1IiwiYSI6ImNsdjVldXhtMTAyaTYyaW9iajIya2w4NHoifQ.ucxrpFqEEuax32oOhhjqEg"

// navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
//   enableHighAccuracy: true
// })

// function successLocation(position) {
//   setupMap([position.coords.longitude, position.coords.latitude])
// }

// function errorLocation() {
//   setupMap([-2.24, 53.48])
// }

// function setupMap(center) {
//   const map = new mapboxgl.Map({
//     container: "map",
//     style: "mapbox://styles/mapbox/streets-v11",
//     center: center,
//     zoom: 15
//   })

//   const nav = new mapboxgl.NavigationControl()
//   map.addControl(nav)

//   var directions = new MapboxDirections({
//     accessToken: mapboxgl.accessToken
//   })

//   map.addControl(directions, "top-left")
// }
// map.on('load', function() {
//   map.addLayer({
//     id: 'flight-routes',
//     type: 'line',
//     source: {
//       type: 'geojson',
//       data: '106.65413,10.79946' // URL đến tệp GeoJSON chứa đường chim bay
//     },
//     layout: {
//       'line-cap': 'round',
//       'line-join': 'round'
//     },
//     paint: {
//       'line-color': '#FF0000',
//       'line-width': 2
//     }
//   });
// })
mapboxgl.accessToken = 'pk.eyJ1IjoibGV0bWVsdXZ1IiwiYSI6ImNsdjVldXhtMTAyaTYyaW9iajIya2w4NHoifQ.ucxrpFqEEuax32oOhhjqEg';

// Lấy vị trí hiện tại của người dùng
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
});

function successLocation(position) {
  var longitude = position.coords.longitude;
  var latitude = position.coords.latitude;
  var center = [longitude, latitude];

  setupMap(center);
}

function errorLocation() {
  var center = [0, 0]; // Tọa độ mặc định nếu không thể lấy vị trí người dùng

  setupMap(center);
}

function setupMap(center) {
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 14
  });

  //Thêm biểu tượng điểm bắt đầu và điểm kết thúc
var startMarker = new mapboxgl.Marker({ color: '#00FF00' })
.setLngLat(center)
.addTo(map);

var endMarker = new mapboxgl.Marker({ color: '#FF0000' })
.setLngLat([106.64826, 10.80144]) // Tọa độ điểm kết thúc
.addTo(map);


    var flightRoutes = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                // [106.65413, 10.79946], // Tọa độ điểm bắt đầu
                center,
                [106.64826, 10.80144] // Tọa độ điểm kết thúc
              ]
            },
            properties: {
              flightNumber: 'ABC123',
              airline: 'Airline XYZ'
            }
          },
          // Các đường chim bay khác...
        ]
      };
    
      // Thêm lớp đường chim bay
      map.on('load', function() {
        map.addLayer({
          id: 'flight-routes',
          type: 'line',
          source: {
            type: 'geojson',
            data: flightRoutes
          },
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-color': '#FF0000',
            'line-width': 2
          }
        });
    
      });
    
}