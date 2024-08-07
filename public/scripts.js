let jsonData = null;
let map;
let markers = [];
let directionsRenderer;

function initMap(location = { lat: -34.397, lng: 150.644 }) {
  const mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    zoom: 15,
    center: location
  });
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

function updateMap(location) {
  map.setCenter(location);
  clearMarkers();
  const marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

async function geocode() {
  const address = document.getElementById('address').value;
  const response = await fetch(`/api/maps/geocode?address=${address}`);
  const data = await response.json();
  jsonData = data;
  showStatus();
  if (data.results && data.results.length > 0) {
    const location = data.results[0].geometry.location;
    updateMap(location);
  }
}

async function getDirections() {
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const response = await fetch(`/api/maps/directions?origin=${origin}&destination=${destination}`);
  const data = await response.json();
  jsonData = data;
  showStatus();
  if (data.routes && data.routes.length > 0) {
    const directions = data.routes[0].legs[0];
    showDirections(directions);
  }
}

function showDirections(directions) {
  directionsRenderer.setMap(null);
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  const request = {
    origin: directions.start_address,
    destination: directions.end_address,
    travelMode: google.maps.TravelMode.DRIVING
  };

  const directionsService = new google.maps.DirectionsService();
  directionsService.route(request, (response, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

async function findRestaurants() {
  const response = await fetch(`/api/maps/restaurants`);
  const data = await response.json();
  jsonData = data;
  showStatus();
  if (data.results && data.results.length > 0) {
    const restaurants = data.results;
    const location = { lat: -0.1806532, lng: -78.4678382 };
    map.setCenter(location);
    clearMarkers();
    restaurants.forEach(restaurant => {
      const marker = new google.maps.Marker({
        position: restaurant.geometry.location,
        map: map,
        title: restaurant.name
      });
      markers.push(marker);
    });
  }
}

async function findRestaurantsGuayaquil() {
  const response = await fetch(`/api/maps/restaurantsGYE`);
  const data = await response.json();
  jsonData = data;
  showStatus();
  if (data.results && data.results.length > 0) {
    const restaurants = data.results;
    const location = { lat: -2.1850615, lng: -80.0489018 };
    map.setCenter(location);
    clearMarkers();
    restaurants.forEach(restaurant => {
      const marker = new google.maps.Marker({
        position: restaurant.geometry.location,
        map: map,
        title: restaurant.name
      });
      markers.push(marker);
    });
  }
}

function showStatus() {
  const statusDiv = document.getElementById('status');
  statusDiv.classList.remove('hidden');
}

function exportToJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "data.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
