let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const PMTILES_URL =
  "https://deploy-preview-45--jeremiak-com.netlify.app/data/percent-of-buildings/sacramento.pmtiles";

const transitionLengthMs = 2300;
const p = new pmtiles.PMTiles(PMTILES_URL);
protocol.add(p);

const map = window.map = new maplibregl.Map({
  container: "map",
  zoom: 11.8,
  center: [-121.45412, 38.57809],
  style: {
    version: 8,
    sources: {
      "buildings": {
        type: "vector",
        url: "pmtiles://" + PMTILES_URL,
        attribution: "© Microsoft",
      },
    },
    layers: [
      {
        "id": "buildings-sometimes",
        "source": "buildings",
        "source-layer": "sacramentopost",
        "type": "fill",
        "paint": {
          "fill-color": "steelblue",
          "fill-opacity": 1,
        },
        "filter": ["==", ["get", "removed"], true],
      },
      {
        "id": "buildings-always",
        "source": "buildings",
        "source-layer": "sacramentopost",
        "type": "fill",
        "paint": {
          "fill-color": "steelblue",
        },
        "filter": ["==", ["get", "removed"], false],
      },
    ],
    transition: {
      duration: transitionLengthMs - 50,
      delay: 0,
    },
  },
});

setInterval(() => {
  const current = map.getPaintProperty("buildings-sometimes", "fill-opacity");
  const next = current === .15 ? 1 : .15;
  map.setPaintProperty("buildings-sometimes", "fill-opacity", next);
}, transitionLengthMs);
