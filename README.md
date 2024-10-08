Mapbox Geolocation and Directions Application

This project is a web-based geolocation application using Mapbox GL JS. 
It allows users to search for two locations, display markers for both, 
and calculate driving routes between them. The app also displays nearby restaurants and hotels around the searched locations.

Features

    Interactive Map Display: Uses Mapbox to render an interactive map with zoom and navigation controls.
    Location Search: Two search bars for entering and locating two different places on the map.
    Add Markers: Automatically places markers for searched locations.
    Route Calculation: Calculates driving directions between two locations using the Mapbox Directions API.
        Displays distance in kilometers.
        Provides driving time in minutes.
        Displays estimated walking and cycling times.
    Nearby Places: Displays a list of nearby restaurants and hotels for each searched location.
    Responsive Design: The interface adjusts according to screen size for optimal viewing on mobile, tablet, and desktop.

Technologies Used

    HTML5: Structuring the web page and layout.
    CSS3: Styling the application and implementing responsive design for various screen sizes.
    JavaScript (ES6+): Handling logic for map interactions, API calls, and DOM manipulation.
    Mapbox GL JS: Rendering the interactive map and integrating geolocation and route calculations.
    Mapbox Geocoder Plugin: Enables location searches within the map.
    Mapbox Directions API: Fetches driving route information between two locations.
    Mapbox Geocoding API: Retrieves nearby places like restaurants and hotels around the searched locations.

How to Use

    Open the application in any modern web browser.
    Use the first geocoder to search for the starting location (Location 1).
    Use the second geocoder to search for the destination (Location 2).
    Once both locations are set:
        Markers will appear on the map.
        Driving route, distance, and times (driving, walking, cycling) will be displayed.
        A list of nearby restaurants and hotels will be shown for both locations.


Dependencies

    Mapbox GL JS v3.7.0: Mapbox GL JS
    Mapbox Geocoder Plugin v5.0.0: Geocoder Plugin
    Mapbox Directions API: Directions API
    Mapbox Geocoding API: Geocoding API
