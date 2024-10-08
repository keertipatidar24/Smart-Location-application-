mapboxgl.accessToken = 'pk.eyJ1Ijoia2VlcnRpcGF0aWRhcjI0IiwiYSI6ImNtMXVjcXYzbzBjMTQyanF1NWQzZXNtc2MifQ.q4K4jm00o3MOX4tXFfoKOg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    projection: 'globe',
    zoom: 1,
    center: [30, 15]
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

map.on('style.load', () => {
    map.setFog({});
});

let coords1, coords2;
let routeLayerAdded = false;

function addMarker(coordinates) {
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    map.flyTo({
        center: coordinates,
        essential: true,
        zoom: 10
    });
}

function calculateRoute(coords1, coords2) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords1[0]},${coords1[1]};${coords2[0]},${coords2[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const route = data.routes[0].geometry;

            const distance = (data.routes[0].distance / 1000).toFixed(2);
            const duration = (data.routes[0].duration / 60).toFixed(2);
            const walkingTime = (distance / 5).toFixed(2);
             const cyclingTime = (distance / 15).toFixed(2);

            document.getElementById('info').innerHTML = `
                <strong>Distance:</strong> ${distance} km<br>
                <strong>Driving Time:</strong> ${duration} mins<br>
                <strong>Walking Time:</strong> ${walkingTime} mins<br>
                <strong>Cycling Time:</strong> ${cyclingTime} mins
            `;

            if (routeLayerAdded) {
                map.removeLayer('route');
                map.removeSource('route');
            }

            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': route
                }
            });

            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
            },
                'paint': {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });

            routeLayerAdded = true;
        });
}

function findNearbyPlaces(coordinates) {
    const placesUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant,hotel.json?proximity=${coordinates[0]},${coordinates[1]}&access_token=${mapboxgl.accessToken}`;

    fetch(placesUrl)
        .then(response => response.json())
        .then(data => {
            const placesList = document.getElementById('places-list');
            placesList.innerHTML = ''; 
            if (data.features.length > 0) {
                document.getElementById('places').style.display = 'block';
            } else {
                document.getElementById('places').style.display = 'none'; 
            }

            data.features.forEach(place => {
                const placeItem = document.createElement('li');
                placeItem.textContent = place.text;
                placesList.appendChild(placeItem);
            });
        });
}

const geocoder1 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Search Location 1'
});
document.getElementById('geocoder1').appendChild(geocoder1.onAdd(map));

const geocoder2 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Search Location 2'
});
document.getElementById('geocoder2').appendChild(geocoder2.onAdd(map));

geocoder1.on('result', (event) => {
    coords1 = event.result.geometry.coordinates;
    addMarker(coords1);
    findNearbyPlaces(coords1);
    if (coords1 && coords2) {
        calculateRoute(coords1, coords2);
    }
});

geocoder2.on('result', (event) => {
    coords2 = event.result.geometry.coordinates;
    addMarker(coords2);
    findNearbyPlaces(coords2);
    if (coords1 && coords2) {
        calculateRoute(coords1, coords2);
    }
});
