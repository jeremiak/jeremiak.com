const options = {
    dragging: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false,
}
const map = L.map('map', options).setView([37.166111, -119.449444], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const colorToHex = (color) => {
    const hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

const RGBtoHex = (red, green, blue) => {
    return "#" + colorToHex(red) + colorToHex(green) + colorToHex(blue);
}

fetch('/data/usfs-ca-fuel-moisture.json').then(async(response) => {
    const featureCollection = await response.json()

    L.geoJSON(featureCollection, {
        style: function(feature) {
            const [r, g, b] = feature.properties.rgb.split(', ')
            const color = RGBtoHex(+r, +g, +b)
            return {
                fill: true,
                fillColor: color,
                fillOpacity: feature.properties.rgb.includes('undefined') ? 0 : 1,
                stroke: false
            };
        }
    }).addTo(map);
})