let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const PMTILES_URL = "https://deploy-preview-45--jeremiak-com.netlify.app/data/percent-of-buildings/sacramento.pmtiles"

const p = new pmtiles.PMTiles(PMTILES_URL);
protocol.add(p);
p.getHeader().then((h) => {
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
          attribution:
            '© Microsoft',
        },
      },
      layers: [
        {
          "id": "buildings",
          "source": "buildings",
          "source-layer": "sacramentopost",
          "type": "fill",
          "paint": {
            "fill-color": "steelblue",
          },
        }
      ],
    },
  });
  map.showTileBoundaries = true;
});
