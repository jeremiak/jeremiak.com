---
title: How long will that subway elevator be out of service?
---

The subways here in NYC, run by the MTA, are [routinely and rightly criticized for their lack of ADA compliance](https://ny.curbed.com/2017/9/21/16315042/nyc-subway-wheelchair-accessible-ada) and accessibility. The system does have some, though nowhere near enough, elevators which sometimes go out of service, wreaking havoc on some folks' commutes. The MTA [posts elevator outages to their website](http://advisory.mtanyct.info/EEoutage/EEOutageReport.aspx?StationID=All) along with the time the elevator will return to service. But how good of a guide are these estimates?

As of this post, my robots and I have scraped ~4300 elevator outages ([data](/data/mta-elevators/outages-estimated-returns.csv)) and the short answer is: **the estimates aren't terrible (but elevator outages are)**. The longer answer is that the estimates are usually accurate but that doesn't take into account how disruptive an outage can be.

First, a bit about the data that I scraped. The MTA posts elevator outages on their site as a table of outages with the estimated return to service time. When the elevator re-enters service, they take down the outage notice. My scraper runs every minute and makes a note of when a previously noticed outage is no longer there. I have characterized this as the "first miss" in my data. It isn't _really_ when the elevator re-entered service, but it is the best approximation from the public notices I could find. You can [read more about the project here](/projects/subway-elevators/).

Of the <span id="outage-count">~4300</span> outages I scraped since <span id="initial-scrape-date">February 2018</span>, in the best case the MTA beat their estimate by <span id="best-difference">~7.5 hours</span> and, in the worst case, missed their estimate by <span id="worst-difference">~45 days</span>. On average, elevators returned to service about <span id="average-difference">3 hours earlier</span> than the estimated time.

Each line below represents an elevator outage, plotted along the X axis according to when it went out of service (both by date and the time of day). The length of each line represents the difference between the estimated return time and the time at which it was removed from the outage website, and is measured in number of minutes. Lines that extend upwards from the center line represent outages where the elevator returned to service before the estimated time, and lines extending downward represent outages that returned to service later than expected.

<div class="chart-container no-js" id="outages-differences">
  <p class="no-js-msg">This article requires Javascript to generate charts.</p>
  <div class="chart"></div>
  <div class="caption mono"></div>
</div>

The reality is that even if the estimates are right, for the tens of thousands of people who rely on the MTA elevators to commute to their job, pick up their kids, or just run errands an out of service elevator can mean the difference between possible and not. This data doesn't (and can't) account for the elevator outages that are not reported on the MTA website. At the end of the day, public infrastructure needs to be accessible and reliable in order to be truly public, and to that end the MTA has got _quite a way_ to go.

I'm still exploring this dataset of elevator outages and the robots are hard at work scraping more information. If you have any questions that this data might be able to help answer don't hesitate to drop me a line.

<style>
  .no-js-msg {
    display: none;
  }
  .chart-container.no-js .no-js-msg {
    display: block;
  }
  .no-js .chart,
  .no-js .caption {
    display: none;
  }

  .outage line.selected {
    stroke: yellow;
  }

  .axis {
    font-family: monospace;
  }

  .y-axis line {
    stroke: grey;
    stroke-dasharray: 5 3;
  }

  .y-axis text {
    fill: grey;
    font-size: 10pt;
  }

  .caption {
    font-size: .75rem;
  }
</style>

<script src="/js/d3.v5.min.js"></script>
<script src="/js/util.js"></script>
<script src="/js/elevator-outage-estimates.js"></script>
<!-- <script src="/js/elevator-outages-frequent.js"></script> -->
