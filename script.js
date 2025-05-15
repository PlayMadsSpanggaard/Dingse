// Initialize map with improved settings
const map = L.map('map', {
    zoomControl: false,        // We'll create custom zoom controls
    attributionControl: false, // Hide attribution initially for cleaner look
    minZoom: 12,               // Prevent zooming out too far
    maxZoom: 18,               // Prevent excessive zooming
    zoomSnap: 0.5,             // Allow for smoother zoom levels
    zoomDelta: 0.5,            // Smaller steps when zooming
    doubleClickZoom: true,     // Disable double click zoom to prevent accidental browser zoom
    wheelDebounceTime: 100,    // Debounce wheel events
    wheelPxPerZoomLevel: 100   // More scrolling needed per zoom level
}).setView([56.1629, 10.2039], 14);

// Add attribution control in a better position
L.control.attribution({
    position: 'bottomright'
}).addAttribution('© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, © Esri').addTo(map);

// Add custom zoom controls with clearer buttons
const zoomControl = L.control.zoom({
    position: 'topright',
    zoomInTitle: 'Zoom in',
    zoomOutTitle: 'Zoom out'
}).addTo(map);

// Add custom CSS to improve zoom control appearance
const styleZoomControls = document.createElement('style');
styleZoomControls.innerHTML = `
    .leaflet-control-zoom {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    .leaflet-control-zoom a {
        width: 40px !important;
        height: 40px !important;
        line-height: 40px !important;
        font-size: 20px !important;
        color: #333;
        background-color: white;
    }
    .leaflet-control-zoom a:hover {
        background-color: #f0f0f0;
        color: #3498db;
    }
`;
document.head.appendChild(styleZoomControls);

// Add ESRI World Imagery (satellite) layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: '© Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

// Improve zoom control touch-friendliness
const touchZoomStyles = document.createElement('style');
touchZoomStyles.innerHTML = `
    /* Make the zoom controls more touch-friendly */
    @media (pointer: coarse) {
        .leaflet-control-zoom a {
            width: 44px !important;
            height: 44px !important;
            line-height: 44px !important;
            font-size: 24px !important;
        }
    }
    
    /* Add active state for better touch feedback */
    .leaflet-control-zoom a:active {
        background-color: #3498db !important;
        color: white !important;
    }
`;
document.head.appendChild(touchZoomStyles);

// Improve map touch sensitivity
map.options.tap = true;
map.options.touchZoom = true;
map.options.bounceAtZoomLimits = false;

// Prevent browser zoom on double-tap
document.addEventListener('dblclick', function(e) {
    e.preventDefault();
});

// Prevent pinch zoom on the browser
document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Ensure wheel events are captured by the map
document.getElementById('map').addEventListener('wheel', function(e) {
    e.stopPropagation();
}, { passive: false });

// Define locations with enhanced data
const locations = [
    {
        coords: [56.157570948453696, 10.208216412543132], 
        image: 'images/storetorv.jpg',
        address: 'Store Torv 1, 8000 Aarhus',
        text: 'Store Torv',
        description: 'Historic town square in the heart of Aarhus, surrounded by beautiful architecture and lively atmosphere.',
        icon: 'landmark'
    },
    {
        coords: [56.15881351931754, 10.21551008185272], 
        image: 'images/navitas.jpg',
        address: 'Inge Lehmanns Gade 10, 8000 Aarhus',
        text: 'Navitas',
        description: 'Modern sustainable building housing Aarhus University\'s engineering programs and energy research facilities.',
        icon: 'building'
    },
    {
        coords: [56.15800939739154, 10.208610926034227], 
        image: 'images/pv.jpg',
        address: 'Pustervig Rosensgade 21, 8000 Aarhus',
        text: 'Restaurant Pustevig',
        description: 'Popular restaurant offering a variety of delicious meals in a cozy atmosphere in central Aarhus.',
        icon: 'utensils'
    },
    {
        coords: [56.15607550916232, 10.200410394223178], 
        image: 'images/moelleparken.jpg',
        address: 'Møllegade 1, 8000 Aarhus',
        text: 'Mølleparken',
        description: 'Beautiful park next to the Aarhus River, offering green spaces and relaxation in the city center.',
        icon: 'tree'
    }
];

// Custom marker icons
const createCustomIcon = (iconName) => {
    return L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: #3498db; color: white; border-radius: 50%; width: 36px; height: 36px; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
                <i class="fas fa-${iconName}"></i>
              </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
    });
};

// Create markers and add them to the map
const markers = [];
locations.forEach(location => {
    const marker = L.marker(location.coords, {
        icon: createCustomIcon(location.icon)
    }).addTo(map);
    
    // Create enhanced popup content
    marker.bindPopup(`
        <div class="popup-content">
            <img src="${location.image}" alt="${location.text}">
            <div class="popup-text">
                <h3>${location.text}</h3>
                <p>${location.description}</p>
                <p style="font-size: 0.8rem; margin-top: 5px;">${location.address}</p>
                <button class="directions-button" onclick="openDirections([${location.coords}])">
                    <i class="fas fa-directions"></i> Get Directions
                </button>
            </div>
        </div>
    `);
    
    markers.push(marker);
});

// Populate the location panel with items
const locationItems = document.getElementById('location-items');
let activeLocationItem = null;

locations.forEach((location, index) => {
    const locationItem = document.createElement('div');
    locationItem.className = 'location-item';
    locationItem.setAttribute('data-index', index);
    locationItem.innerHTML = `
        <div class="location-icon">
            <i class="fas fa-${location.icon}"></i>
        </div>
        <div class="location-info">
            <h3>${location.text}</h3>
            <p>${location.address}</p>
        </div>
    `;
    
    // Add click event to fly to location, open popup and highlight the selected item
    locationItem.addEventListener('click', () => {
        // Remove active class from previous item
        if (activeLocationItem) {
            activeLocationItem.classList.remove('active');
        }
        
        // Add active class to this item
        locationItem.classList.add('active');
        activeLocationItem = locationItem;
        
        // Fly to location with smooth animation
        map.flyTo(location.coords, 17, {
            duration: 1.5,
            easeLinearity: 0.25
        });
        
        // Open popup after a short delay to let the animation finish
        setTimeout(() => {
            markers[index].openPopup();
        }, 1500);
        
        // On mobile, close the panel after selecting a location
        if (window.innerWidth < 768) {
            document.getElementById('locations-panel').classList.remove('expanded');
        }
    });
    
    locationItems.appendChild(locationItem);
});

// Add toggle functionality for the locations panel
const locationsPanel = document.getElementById('locations-panel');
const panelToggle = document.getElementById('panel-toggle');

panelToggle.addEventListener('click', () => {
    locationsPanel.classList.toggle('expanded');
});

// On initial load, expand the panel after a short delay on larger screens
setTimeout(() => {
    if (window.innerWidth >= 768) {
        locationsPanel.classList.add('expanded');
    }
}, 1000);

// Function to open directions in Google Maps
function openDirections(coords) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}&travelmode=walking`, '_blank');
}

// Make the function globally accessible
window.openDirections = openDirections;

// Add geolocation control
L.control.locate({
    position: 'topright',
    strings: {
        title: 'Show me where I am'
    },
    locateOptions: {
        maxZoom: 16
    }
}).addTo(map);

// Handle responsiveness
function handleResize() {
    if (window.innerWidth < 600) {
        map.setZoom(13);
        
        // Close panel on small screens when resizing
        locationsPanel.classList.remove('expanded');
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on initial load

// Add some animation to markers to highlight them without moving them
function pulseMarkers() {
    // Add a CSS class to the head to define the pulse animation
    if (!document.getElementById('pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.innerHTML = `
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(52, 152, 219, 0); }
                100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
            }
            .marker-pulse {
                animation: pulse 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }

    markers.forEach(marker => {
        const icon = marker.getElement();
        if (icon) {
            const innerDiv = icon.querySelector('div');
            if (innerDiv) {
                innerDiv.classList.add('marker-pulse');
            }
        }
    });
}

// Start the marker pulsing effect after a delay
setTimeout(pulseMarkers, 3000);