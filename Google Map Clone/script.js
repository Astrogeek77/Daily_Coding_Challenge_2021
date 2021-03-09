// configuring access token for map box
mapboxgl.accessToken = 'pk.eyJ1IjoiYXN0cm9nZWVrNzciLCJhIjoiY2tseXgzNGc5MWM5NDJ3bXd2ejM3ZzA2MiJ9.9QnoavqMRkisnv2tHkdVgw';

// getting real time location with high accuracy
navigator.geolocation.getCurrentPosition(successLocation,
    errorLocation,
    {
        enableHighAccuracy: true
    });

function successLocation(position) {
    setUpMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    // Manchester - default
    setUpMap([-2.24, 53.38])
}

// implementing the map
function setUpMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 15
    })

    // adding controls for zoom and direction
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    // implemanting navigation
    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    });

    // controls for navigation
    map.addControl(directions, 'top-left');
}
