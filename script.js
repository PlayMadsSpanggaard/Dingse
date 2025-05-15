// Initialize map centered on Aarhus, Denmark
const map = L.map('map').setView([56.1629, 10.2039], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Define five locations with coordinates, images, addresses, and descriptions
const locations = [
    {
        coords: [56.1567, 10.2108], // Aarhus Cathedral (approximate)
        image: 'images/storetorv.jpg',
        address: 'Store Torv 1, 8000 Aarhus',
        text: 'Aarhus Cathedral, a historic landmark from the 12th century.'
    },
    {
        coords: [56.1531, 10.2048], // ARoS Art Museum (approximate)
        image: 'images/navitas.jpg',
        address: 'Banegårdspladsen 1, 8000 Aarhus',
        text: 'ARoS Art Museum, known for its iconic rainbow panorama.'
    },
    {
        coords: [56.1591, 10.2017], // The Old Town (approximate)
        image: 'images/pv.jpg',
        address: 'Vestergade 27, 8000 Aarhus',
        text: 'The Old Town, an open-air museum of Danish history.'
    },
    {
        coords: [56.1366, 10.2133], // Marselisborg Palace (approximate)
        image: 'images/moelleparken.jpg',
        address: 'Kongevejen 100, 8000 Aarhus',
        text: 'Marselisborg Palace, the summer residence of the Danish royal family.'
    }
];

// Add markers to the map
locations.forEach(location => {
    const marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(`
        <div class="popup-content">
            <img src="${location.image}" alt="Location Image">
            <h3>${location.address}</h3>
            <p>${location.text}</p>
        </div>
    `);
});