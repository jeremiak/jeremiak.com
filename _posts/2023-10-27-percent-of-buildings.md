---
title: What would it look like if 42% of the buildings in my city were gone?
description: An attempt to think about the level of destruction in Gaza right now with maps.
prism: true
---

I'll be honest: the last few weeks have been rough. For me, for the world, for the people in Palestine and Israel. Way worse than what I'm going through. Obviously.

There's been dead babies. And subsequent news cycles about how those babies died and who lied about it. And then a hospital got bombed and even more people died. And then news cycles about who did it but not about helping the people who survived it or who's families were shattered as a result.

War is horrible. It's uncontrollable. And for me, a person living in California who has never even been near a gunfight, it's pretty incomprehensible.

The photos and videos and news reports and fake news reports and unverified news reports just keep coming. I wish it would stop because war is terrible. For everybody. It's bad for journalists, it's bad for people who just want to live their one short life in the company of family and friends. It's more often than not bad for Jews. Right now it's unimaginably bad for the people being bombed in Gaza. It's bad for anybody who thinks it's paramount that we learn to live in peace with each other.

I read, days ago, that the [UN thinks that 42% of the residential buildings in Gaza](https://www.newarab.com/news/gaza-42-housing-units-destroyed-damaged-israel) have been destroyed. What does that even mean?

I have no idea. I've never been to Gaza, I don't know how many buildings are there. I've seen pictures of what was there before and I've seen pictures of the destruction since bombs rained from the sky. It's horrifying.

But I do know a few American cities pretty well, the ones I've lived in at least. That would be Sacramento, New York, and San Francisco.

Since I use data visualization to better understand the world all the time, I figured I could try and use it to see what would it look like if 42% of the buildings in those cities were gone.

<strong>Fuck.</strong>

Here's all the buildings in the parts of Sacramento I'm most familiar with and what it looks like when those buildings are removed. In case it wasn't apparent, I'm not a government or international agency so I don't have information about which buildings are residential and which aren't.

Instead I just made an assumption that residential buildings are smaller than commerical or industrial ones so any building with a footprint smaller than 10,000 square meters is "residential" for my purposes.

It goes without saying, but I'll say it, that this is not what it would actually look like. It's a visualization - it's sanitized, normalized along the horror axis. But it helps me. I guess.

Ceasefire now!

<h2>Sacramento</h2>
<div id="sac-map" style="height: 500px;"></div>

<h2>New York</h2>
<div id="nyc-map" style="height: 500px;"></div>

<h2>San Francisco</h2>
<div id="sf-map" style="height: 500px;"></div>

<details open>
  <summary>How I made it</summary>
  <div>
    <ol>
      <li>I downloaded the building footprints from <a href="https://github.com/Microsoft/USBuildingFootprints">Microsoft</a>.</li>
      <li>
        Next, I used Mapshaper to clip the GeoJSON to a much smaller size for each city. Sacramento for example:
        <pre><code class="language-sh">mapshaper-xl 15gb -i California.geojson -clip bbox=-121.573505,38.537022,-121.406479,38.622772 -o format=geojson sacramento-clipped.json</code></pre>
      </li>
      <li>
        After that, I generated a new GeoJSON file that has a <code>removed</code> attribute set to <code>true</code> or <code>false</code> using a script.
<pre><code class="language-js">import { promises as fs } from 'fs'
import area from '@turf/area'
import sacramento from './sacramento-clipped.json' assert { type: 'json' }
const { features } = sacramento
const percent = .42
const areaThreshold = 10000
const belowArea = features.filter(feature => {
    const a = area(feature)
    return a < areaThreshold
})
const l = belowArea.length * percent
let aboveOrEqualAreaCount = 0
const transformed = features.map((feature, i) => {
  const a = area(feature)
  feature.properties.removed = false
  if (a >= areaThreshold) {
    aboveOrEqualAreaCount += 1
  } else {
    let ii = i - aboveOrEqualAreaCount
    if (ii < l) {
      feature.properties.removed = true
    }
  }
  return feature
})
const featureCollection = { type: 'FeatureCollection', features: transformed }
await fs.writeFile('sacramento.json', JSON.stringify(featureCollection))
</code></pre>
      </li>
      <li>
        Finally, I used <code>tippecanoe</code> to generate <a href="https://github.com/protomaps/PMTiles">PMTiles</a> which are super easy to host and use.
        <pre><code class="language-sh">tippecanoe -o sacramento.pmtiles sacramento.json</code></pre>
      </li>
    </ol>
  </div>
</details>

<link rel="stylesheet" href="https://unpkg.com/maplibre-gl@3.3.1/dist/maplibre-gl.css">
<script src="https://unpkg.com/maplibre-gl@3.3.1/dist/maplibre-gl.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/pmtiles@2.11.0/dist/index.js"></script>

<script src="/js/percent-of-buildings.js"></script>