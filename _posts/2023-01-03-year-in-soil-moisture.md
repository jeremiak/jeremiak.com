---
title: How to turn a directory full of images into an animated GIF
description: I used ImageMagick and a a daily image published by NOAA to look at 2022's soil moisture.
prism: true
---

It's been raining a lot here in Sacramento and soil moisture is something people are talking to each other about. It's weird. And wet.

Last January I started a ["git scraping"](https://simonwillison.net/2020/Oct/9/git-scraping/) [repo to collect images](https://github.com/jeremiak/noaa-cpc-map-scraper) that [the National Weather Service publishes](https://www.cpc.ncep.noaa.gov/products/Soilmst_Monitoring/US/Soilmst/Soilmst.shtml#) everyday of "calculated" soil moisture across the lower 48 and wanted to animate them together in sequence. No real reason, just wanted to see 2022 measured by wet dirt.

Here's the animated GIF, by the way:

<div style="display: flex; justify-content: center;">

![An animated amp of the lower 48 US states where each frame is a sequential day in 2022, starting with Jan 17, 2022 and ending on January 2, 2023.](/img/year-in-soil-moisture/soil-moisture-mm-daily.gif)

</div>

The scraper puts all of the [images in a single directory](https://github.com/jeremiak/noaa-cpc-map-scraper/tree/main/images) and names them in the format of `YYYY-MM-DD-soil-moisture-mm-daily.gif`. Even though it has a `.gif` file extension these source images aren't animated at all. I'm just choosing to keep the source file extension used by NOAA.

I ran the `convert` command installed by [ImageMagick](https://imagemagick.org/script/convert.php) from within the images directory and out came the animated GIF you see above.

```sh
convert -loop 0 *-soil-moisture-mm-daily.gif soil-moisture-mm-daily.gif
```
