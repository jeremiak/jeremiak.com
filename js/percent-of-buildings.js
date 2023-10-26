let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

let PMTILES_URL = "https://deploy-preview-45--jeremiak-com.netlify.app/data/percent-of-buildings/sacramento.pmtiles"

const p = new pmtiles.PMTiles(PMTILES_URL);
protocol.add(p);
p.getHeader().then((h) => {
  const map = new maplibregl.Map({
    container: "map",
    zoom: h.maxZoom - 2,
    center: [h.centerLon, h.centerLat],
    style: {
      version: 8,
      sources: {
        "example_source": {
          type: "vector",
          url: "pmtiles://" + PMTILES_URL,
          attribution:
            '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        },
      },
      layers: [
        {
          "id": "buildings",
          "source": "example_source",
          "source-layer": "landuse",
          "type": "fill",
          "paint": {
            "fill-color": "steelblue",
          },
        },
        {
          "id": "roads",
          "source": "example_source",
          "source-layer": "roads",
          "type": "line",
          "paint": {
            "line-color": "black",
          },
        },
        {
          "id": "mask",
          "source": "example_source",
          "source-layer": "mask",
          "type": "fill",
          "paint": {
            "fill-color": "white",
          },
        },
      ],
    },
  });
  map.showTileBoundaries = true;
});
