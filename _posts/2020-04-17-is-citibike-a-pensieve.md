---
title: Is Citibike a Pensieve?
description: Sometimes, reliving your memories is only a map or two away.
---

New York City is a wonderful, terrible, amazing, horrendous place. And for the last five years it has been my home. But it won't be as of next Monday because we're up and moving to Sacramento, CA; why and how is a whole other post (or at least it <i>could be</i>). As a sort of "farewell to all that", thought I'd try to do some data visualizations that illustrate part of my life here.

I've been riding Citibikes since I arrived in New York, and I've had a membership for nearly as long. I wrote a few scripts that pull my ride history data, get the bike route between the start and end station from Google Maps, and then put it all on a map.

When I loaded up the data in ([this Observable notebook](https://observablehq.com/@jeremiak/five-years-of-citibike)) I was surprised at how much I could recognize in the trips.

<style>
  div.flex > * {
    flex-grow: 1;
    flex-shrink: 1;
  }

  div.flex > div,
  div.flex > p {
    flex-basis: 50%;
  }

  div.flex > img {
    max-height: 300px;
    max-width: 300px;
  }

</style>

<img class="block col-12 md-col-6 mx-auto" src="/img/citibike/citibike-all.png">

<h2>Some notable memories</h2>

<div class="flex flex-column md-row-reverse mb2">
  <p class="mt0 pl0 md-pl2">Baby arrives in New York! At this point, we didn't have Citibike memberships and we mostly used it while we sublet an apartment near Washington Square Park during the middle of our first hot, humid, thunderstorm-filled summer. Also, I ate a ton of sliced mangos from a bodega down the street.</p>
  <img src="/img/citibike/citibike-2015.png" alt="Map of my rides on Citibike in 2015">
</div>

<div class="flex flex-column md-flex-row mb2">
  <div class="pl0 md-pr2">
    <p class="mt0">A year into living on the East Coast, we found ourselves comfortably situated in the Lower East Side, right across the street from a <i>wonderful</i> (if unregistered) farmer's market.</p>
    <p>We rode Citibikes all over, sometimes venturing over the Williamsburg Bridge. But mostly we just used it to get around the neighborhoods.</p>
    <p>And this trip from the West Village east across the island is from my trips to my favorite barber. That's funny to see.</p>
  </div>
  <img src="/img/citibike/citibike-2016.png"  alt="Map of my rides on Citibike in 2016">
</div>

<div class="flex flex-column md-row-reverse mb2">
  <div class="pl0 md-pl2">
    <p class="mt0">2017 was a really great year for me. Faye too, come to think of it! I was settled into my job at 18F as a software engineer, loving my sublet in the Lower East Side, and commuting via bike nearly every nice day to the World Trade Center.</p>
    <p>I see the time Faye and I rode Citibike's home from our friend's house in Hell's Kitchen down the West Side and into the LES. I remember the many trips we took up 1st Ave to eat Indian food. Oh, and it looks like I got a lot of haircuts too.</p>
    <p>In the fall, we moved across the river, which is why there's lots of activity in central Brooklyn.</p>
  </div>
  <img src="/img/citibike/citibike-2017.png" alt="Map of my rides on Citibike in 2017">
</div>

<div class="flex flex-column md-flex-row mb2">
  <div class="pl0 md-pr2">
    <p class="mt0">Big things happened in 2018. I started working at NBC News at 30 Rock in Midtown Manhattan. I didn't do all that much bike commuting, most Most of the biking between the boroughs was done over the Manhattan Bridge. Which, is nice and all, but the Williamsburg Bridge is my favorite.</p>
    <p>And I was rock climbing a lot more, hence the trips to Gowanus.</p>
  </div>
  <img src="/img/citibike/citibike-2018.png" alt="Map of my rides on Citibike in 2018">
</div>

<div class="flex flex-column md-row-reverse mb2">
  <div class="pl0 md-pl2">
  <p class="mt0">I tried bike commuting. Drivers and general road conditions are <i>rough</i> in New York, so I did it a number of times but at some point its just hard to fight with cars for your safety before you even get some coffee.</p>
  <p>But when I also figured out that the B/D trains were way more pleasant than the G, so I started using Citibike to quickly get to Atlantic Terminal.</p>
  <p>And a few of our friends moved up near Greenpoint, so we rode along the Navy Yard on what is a pretty nice bike path.</p>
  </div>
  <img src="/img/citibike/citibike-2019.png" alt="Map of my rides on Citibike in 2019">
</div>

<p>Of course, there are far too many cherished memories than can be expressed just through some surveillance of my bike habits. I suppose that just like no data set really offers you a full picture of... anything, this is just a fun angle on my time trying to make it in the Big City.

<p>👋 Bye bye, New York. Ride safe.</p>
