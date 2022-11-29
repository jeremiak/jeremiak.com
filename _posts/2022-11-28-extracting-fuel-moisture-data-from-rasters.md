---
title: Extracting California fuel moisture data from Forest Service rasters
description: Using open source Python and Javascript tools to extract data out of raster images and into GeoJSON files
---

The US Forest Service has a way of measuring dead fuel moisture across the country, which is an important input in the complicated equations to better understand wildfire behavior. They publish it as a raster image but I want machine-readable, geospatial data. Bummer.

Here's an example of how the USFS publishes the data:

![Fuel moisture raster image from the US Forest Service for November 26, 2022](https://github.com/jeremiak/usfs-dead-fuel-moisture/blob/main/images/2022-11-26-fuel-moisture-us-10h.png?raw=true)

[They publish a version of this image every single day](https://www.wfas.net/index.php/dead-fuel-moisture-moisture--drought-38) - it's their 10-hour fuel moisture model for the lower 48 states. There's clearly lots of data _somewhere_ but from my perspective it's locked away inside this raster image.

What I want is a way to turn pixels into to polygons. While I lack any sort of advanced geospatial training, I _do_ have a bunch of open source spells.

Turns out that the digital humanities have this sort of problem all the time: they need to take old maps and "georeference" them so they can be digitally analyzed. Koko Alberti wrote [this fantastic blog post about digitizing old maps](https://kokoalberti.com/articles/georeferencing-and-digitizing-old-maps-with-gdal/) that provided much of the inspiration and instructions for this process.

The first step was to add "ground control points", which are points on the image that are used to map the X and Y location of pixels into a latitude and longitude location on a map. And the open source tool [QGIS](https://www.qgis.org/en/site/), a vertiable geospatial kitchen sink, has [a useful plugin](https://docs.qgis.org/3.22/en/docs/user_manual/working_with_raster/georeferencer.html?highlight=georef) for generating this set of data.

I am focused on California so I added nine references GCPs that are easy to identify in the image and to get the coordinates of: places like the six corners of the state, the western most tip of the Catalina Islands, San Francisco, and the Four Corners monument in the southwest for good measure.

<figure>

![A screenshot from QGIS that shows California with a few points at easy to reference parts of the state (like the two northern corners and the bend in Lake Tahoe) called "ground control points" or "gcp"](/img/fuel-moisture-maps/california-with-ground-control-points.png)

<figcaption>A screenshot of the ground control points and the shape of California</figcaption>

</figure>

With my set of reference points I leveraged another open source package called `gdal` to combine the raster image and reference points into a GeoTIFF image, which is a raster image that also has geospatial data. In this case I used `gdal_translate`:

```
gdal_translate -of GTiff \
  -gcp 233.635 318.095 -109.04 36.995 \
  -gcp 146.048 341.81 -114.633 35.0019 \
  -gcp 82.8982 255.131 -119.999 38.999 \
  -gcp 95.626 199.034 -119.999 41.995 \
  -gcp 55.1768 341.957 -120.433 34.043 \
  -gcp 41.6714 267.238 -122.503 37.7796 \
  -gcp 39.7202 183.238 -124.211 41.999 \
  -gcp 100.57 380.498 -117.123 32.5342 \
  -gcp 137.856 383.976 -114.719 32.7193 \
  10-hour-fuel-moisture.png \
  10-hour-fuel-moisture-translated.tif
```

And then the next step reprojected the image into WGS84.

```
gdalwarp -r near \
  -tps \
  -co COMPRESS=NONE \
  -t_srs EPSG:4326 \
  10-hour-fuel-moisture-translated.tif \
  10-hour-fuel-moisture-warped.tif
```

I had a raster image that has embedded geography into it _and_ is properly projected. Well on my way at this point! Woot.

But I also needed a strategy to go through the image and extract each RGB pixel value and store it along with the projected geographic coordinates. I'd love to hear of a better way to do this but here's how I approached it:

1. Generate polygons for each color band where pixels of similar values are grouped together. For example, if two neighboring pixels have the same red band value they should be included in the same polygon.
2. Clip out California.
3. Reconsititute RGB values for each polygon by using the three color band specific files.

I, still, cannot get over how powerful `gdal` is. It's a toolbelt with all these incredibly useful, sophisticated components.

Take `gdal_polygonize.py`, which can do _all_ of step 1 for me. At the end of this I had three files, one for each color band.

```
gdal_polygonize.py 10-hour-fuel-moisture-warped.tif \
  -b 1 \
  -f GeoJSON polygon-1.json

gdal_polygonize.py 10-hour-fuel-moisture-warped.tif \
  -b 2 \
  -f GeoJSON polygon-2.json

gdal_polygonize.py 10-hour-fuel-moisture-warped.tif \
  -b 3 \
  -f GeoJSON polygon-3.json
```

And then I used `mapshaper` to clip out all the data that isn't in California. This whole approach _should_ be generalizable to the whole country but that's more work and I'm focused on just my home state.

```
npx mapshaper -i polygon-1.json \
  -clip California.json \
  -o polygon-1-clipped.json

npx mapshaper -i polygon-2.json \
  -clip California.json \
  -o polygon-2-clipped.json

npx mapshaper -i polygon-3.json \
  -clip California.json \
  -o polygon-3-clipped.json
```

Finally, I had three GeoJSON files that all contain polygons. Now to reconstruct the RGB values since the source map uses visible color to encode moisture data. In order to accomplish that I turned to another open source geospatial tool: [turfjs](https://turfjs.org/).

I needed to find the polygons that represent intersections of all three files - just because a bunch of nearby pixels have the same red value doesn't mean they also have the same green or blue values. I wrote a script to do this but here are the basic steps:

1. Go through all of the red polygons and for each shape, find the intersections it has with every green polygon.
2. If a red shape has no intersections with any green polygons we can just move on.
3. If there is an intersection, take that new shape and see if it intersects with any blue polygons.
4. If there are no intersections, we can just move on again.
5. When there is an intersection, store that shape with the reconstitute RGB value (taken from each of the source polygons that contributed to the intersection) in a `FeatureCollection`

And then I ran it. After all, what else are scripts for?

```
node determine-rgb-values-for-polygons.mjs
```

<details>
  <summary>
    See the above script's code
  </summary>
  <div>
    <script src="https://gist.github.com/jeremiak/0504d26e05dabc5d70838481fd809ef4.js"></script>
  </div>
</details>

What does the final GeoJSON data look like on a map? Here it is with each polygon colored according to the recreated RGB value.


<noscript>
  <img src="/img/fuel-moisture-maps/screenshot-leaflet.png" alt="Screenshot of the GeoJSON data on a Leaflet map that looks very similar to the source image">
  <style>
    #map {
      display: none !important;
    }
  </style>
</noscript>

<div id="map"></div>

I mean, that's pretty fucking good! Just in case you forget where we started (and so you can compare against the generated data), here's the `.png` image published each day by the Forest Service:

![Fuel moisture raster image from the US Forest Service for November 26, 2022](https://github.com/jeremiak/usfs-dead-fuel-moisture/blob/main/images/2022-11-26-fuel-moisture-us-10h.png?raw=true)

In the main the data looks pretty close to the source image. There are some minor differences and I'm think those are related to my cooky methodology for recombining the RGB values from the three polygon files. Any ideas for making this process more accurate? I'd really love it if you got in touch!

Interested in checking out the data? You can [download the GeoJSON data here](/data/usfs-ca-fuel-moisture-data.json).

Relatedly, I'm building up [an archive of these fuel moisture images](https://github.com/jeremiak/usfs-dead-fuel-moisture) as it seems that only the current day's raster is available. But I'd love to let that robot retire so if you know of a reliable way to get the historical images, I'm all ears.

Happy georeferencing!

<link
rel="stylesheet"
href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
crossorigin=""
/>
<style>
  table.js-code-nav-container tbody tr:nth-child(odd) {
    background-color: var(--color-canvas-default) !important;
  }
  img {
    display: block;
    margin: 0 auto;
    /* max-width: 700px; */
  }
  #map {
    height: 350px;
    margin: 0 auto;
    max-width: 700px;
  }
  .gist a,
  #map .leaflet-control-attribution a {
    background-color: unset;
  }
</style>
<script
src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
crossorigin=""
></script>

<script src="/js/usfs-ca-fuel-moisture.js"></script>