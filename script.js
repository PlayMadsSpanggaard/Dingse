// Initialize map centered on Aarhus, Denmark
const map = L.map('map').setView([56.1629, 10.2039], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Define five locations with coordinates, images, addresses, and descriptions
const locations = [
    {
        coords: [56.1567, 10.2108],
        image: 'images/aarhus_cathedral.jpg',
        address: 'Store Torv 1, 8000 Aarhus',
        text: 'Aarhus Cathedral, a historic landmark from the 12th century.'
    },
    {
        coords: [56.1531, 10.2048],
        image: 'images/aroos.jpg',
        address: 'Banegårdspladsen 1, 8000 Aarhus',
        text: 'ARoS Art Museum, known for its iconic rainbow panorama.'
    },
    {
        coords: [56.1591, 10.2017],
        image: 'images/old_town.jpg',
        address: 'Vestergade 27, 8000 Aarhus',
        text: 'The Old Town, an open-air museum of Danish history.'
    },
    {
        coords: [56.1366, 10.2133],
        image: 'images/marselisborg.jpg',
        address: 'Kongevejen 100, 8000 Aarhus',
        text: 'Marselisborg Palace, the summer residence of the Danish royal family.'
    },
    {
        coords: [56.1701, 10.1994],
        image: 'images/botanical_garden.jpg',
        address: 'Peter Holms Vej, 8000 Aarhus',
        text: 'Aarhus Botanical Garden, a serene green space.'
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