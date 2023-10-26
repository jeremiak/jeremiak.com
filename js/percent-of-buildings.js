const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
const transitionLengthMs = 2300;
const cities = [
  {
    id: "sacramento",
    center: [-121.47833458667179, 38.57466095849159],
    maxBounds: [[-121.5402508655722, 38.55375726273084], [
      -121.41641830777107,
      38.59555857341206,
    ]],
    zoom: 12.68,
  },
  {
    id: 'new-york-city',
    center: [-73.98931433718906,40.71828805659368],
    maxBounds: [[-74.043732,40.551374],[-73.857651,40.823163]],
    zoom: 10,
  },
  {
    id: "san-francisco",
    center: [-122.44352561124965, 37.76740173449599],
    maxBounds: [
      [-122.536011, 37.701207],
      [-122.362976, 37.816293],
    ],
    zoom: 9.3,
  },
];

const maps = cities.map((city) => {
  const url =
    `https://deploy-preview-45--jeremiak-com.netlify.app/data/percent-of-buildings/${city.id}.pmtiles`;
  const p = new pmtiles.PMTiles(url);
  protocol.add(p);

  const map = new maplibregl.Map({
    container: `${city.id}-map`,
    zoom: city.zoom,
    center: city.center,
    style: {
      version: 8,
      sources: {
        "buildings": {
          type: "vector",
          url: "pmtiles://" + url,
          attribution: "© Microsoft",
        },
      },
      layers: [
        {
          "id": "buildings-sometimes",
          "source": "buildings",
          "source-layer": city.id.replaceAll('-', ''),
          "type": "fill",
          "paint": {
            "fill-color": "#3d3d3d",
            "fill-opacity": 1,
          },
          "filter": ["==", ["get", "removed"], true],
        },
        {
          "id": "buildings-always",
          "source": "buildings",
          "source-layer": city.id.replaceAll('-', ''),
          "type": "fill",
          "paint": {
            "fill-color": "#3d3d3d",
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

  map.setMaxBounds(city.maxBounds);
  return map;
});

setInterval(() => {
  const current = maps[0].getPaintProperty(
    "buildings-sometimes",
    "fill-opacity",
  );
  const next = current === .15 ? 1 : .15;
  maps.forEach((map) => {
    map.setPaintProperty("buildings-sometimes", "fill-opacity", next);
  });
}, transitionLengthMs);

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "attributes") {
      const isDark = mutation.target.classList.contains("dark");

      if (isDark) {
        maps.forEach((map) => {
          map.setPaintProperty("buildings-always", "fill-color", "#ffffff");
          map.setPaintProperty("buildings-sometimes", "fill-color", "#ffffff");
        });
      } else {
        maps.forEach((map) => {
          map.setPaintProperty("buildings-always", "fill-color", "#3d3d3d");
          map.setPaintProperty("buildings-sometimes", "fill-color", "#3d3d3d");
        });
      }
    }
  });
});

observer.observe(document.body, {
  attributes: true,
});
