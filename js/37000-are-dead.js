let map;
const buttonEl = document.querySelector('#find');
const textEl = document.querySelector('#text');

// add the PMTiles plugin to the maplibregl global.
let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles",protocol.tile);

let PMTILES_URL = "https://github.com/jeremiak/jeremiak.com/raw/09b4429cc7fe9a0004cce0bb75c0d297f65211c2/data/tracts.pmtiles";

const p = new pmtiles.PMTiles(PMTILES_URL);

// this is so we share one instance across the JS code and the map renderer
protocol.add(p);

// we first fetch the header so we can get the center lon, lat of the map.
p.getHeader().then(h => {
    let loaded = false
    let location = null
    map = new maplibregl.Map({
        container: 'map',
        zoom: 4.8,
        center: [-119.23528811834979, 37.438993243476276],
        style: {
            version:8,
            sources: {
                "osm": {
                    type: "vector",
                    url: "pmtiles://https://data.source.coop/protomaps/openstreetmap/tiles/v3.pmtiles",
                    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>'
                },
                "tracts": {
                    type: "vector",
                    url: "pmtiles://" + PMTILES_URL
                }
            },
            layers: [
                {
                    "id": "osm-earth",
                    "source": "osm",
                    "source-layer": "earth",
                    "type": "fill",
                    "paint": {
                        "fill-color": "black"
                    }
                },
                {
                    "id": "osm-boundaries",
                    "source": "osm",
                    "source-layer": "boundaries",
                    "type": "line",
                    "paint": {
                        "line-color": "black"
                    }
                },
                {
                    "id": "osm-roads",
                    "source": "osm",
                    "source-layer": "roads",
                    "type": "line",
                    "paint": {
                        "line-color": "rgb(204, 235, 197)",
                        "line-opacity": .5
                    }
                },
                {
                    "id":"tracts",
                    "source": "tracts",
                    "source-layer":"tracts",
                    "type": "fill",
                    "paint": {
                        "fill-color": "green",
                        "fill-opacity": 0,
                    }
                },
                {
                    "id":"enough-tracts",
                    "source": "tracts",
                    "source-layer":"tracts",
                    "type": "fill",
                    "paint": {
                        "fill-color": "rgb(15, 143, 15)",
                        "fill-opacity": .8
                    },
                    "filter": [
                        "==", ["get", "GEOID"], ""
                    ]
                },
                {
                    "id":"tracts-line",
                    "source": "tracts",
                    "source-layer":"tracts",
                    "type": "line",
                    "paint": {
                        "line-color": "white",
                        "line-opacity": .3
                    }
                },
                {
                    "id": "osm-water",
                    "source": "osm",
                    "source-layer": "water",
                    "type": "fill",
                    "paint": {
                        "fill-color": "rgb(141, 211, 199)"
                    }
                },
            ]
        }
    });

    function updateMapForLocation(projected) {
        const features = map.queryRenderedFeatures(projected, {
            layers: [ 'tracts' ]
        });
        if (!features || features.length === 0) throw new Error('no features found');

        const { GEOID, enoughGeoIDs, enoughPopulation } = features[0].properties;
        const filter = [ "in", "GEOID", ...JSON.parse(enoughGeoIDs) ];

        console.log({ GEOID, enoughGeoIDs, enoughPopulation });
        console.log({ filter });

        map.setFilter('enough-tracts', filter);

        textEl.innerHTML = `<p>${enoughPopulation.toLocaleString('en-US')} people live in the highlighted area</p>`
    }
    
    map.on('load', () => {
        loaded = true
    })

    map.on('mousemove', e => {
        if (!loaded) return
        try {
            updateMapForLocation(e.point)
        } catch (err) {
            console.error(err.message)
        }
    });

    map.showTileBoundaries = false;

    function handleGetCurrentPosition(success, error) {
        if (error) {
            console.error(error)
            return
        }

        const { latitude, longitude } = success.coords
        location = { latitude, longitude }

        map.flyTo({ center: [ longitude, latitude ], zoom: 12 });

        const projected = map.project([ longitude, latitude ])
        updateMapForLocation(projected)
    }

    buttonEl.addEventListener('click', e => {
        e.preventDefault()
        if (!navigator.geolocation) {
            alert(`Sorry, your browser doesn't support this.`);
        } else {
            console.log('Checking location...');
            navigator.geolocation.getCurrentPosition(handleGetCurrentPosition);
        }
    })
})