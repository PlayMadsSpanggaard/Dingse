// Initialize map centered on Aarhus, Denmark
const map = L.map('map').setView([56.1629, 10.2039], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Define five locations with coordinates, images, addresses, and descriptions
const locations = [
    {
        coords: [56.157570948453696, 10.208216412543132], 
        image: 'images/storetorv.jpg',
        address: 'Store Torv 1, 8000 Aarhus',
        text: 'Store Torv'
    },
    {
        coords: [56.15881351931754, 10.21551008185272], 
        image: 'images/navitas.jpg',
        address: 'Inge Lehmanns Gade 10, 8000 Aarhus',
        text: 'Navitas'
    },
    {
        coords: [56.15800939739154, 10.208610926034227], 
        image: 'images/pv.jpg',
        address: 'Pustervig Rosensgade 21. Aarhus 8000',
        text: 'Restaurant Pustevig'
    },
    {
        coords: [56.15607550916232, 10.200410394223178], 
        image: 'images/moelleparken.jpg',
        address: 'Møllegade 1, 8000 Aarhus',
        text: 'Mølleparken'
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