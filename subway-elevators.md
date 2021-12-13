---
layout: layouts/project.html
title: New York City MTA elevator outage data
permalink: /projects/subway-elevators/
---

The MTA reports elevator and escalator outages on [their outage reporting site](https://advisory.mtanyct.info/EEoutage/EEOutageReport.aspx?StationID=All) but it isn't very extensible. There is no way to download the data in bulk and there is no real notion of an elevator/escalator returning to service. As best as I can tell, the outage is simply removed from the site.

This data set only contains information about elevators and has no notion of escalator outages. The scraper frequently checks on the outage reporting site and publishes data to S3 once a day.

**Note**: The data contains a large gap from February 2019 until late August of 2020 because [the scraper had stopped and I didn't notice](https://twitter.com/jeremiak/status/1299051108300513280) :(

## Data
The data is available as a CSV and contains a row for each observed elevator outage.

<div class="center">
  <a 
  class="p1"
  href="https://s3.amazonaws.com/nyc-mta-elevator-outages/mta_elevator_outages.csv">Download the CSV</a>
  <p class="h6 italic" id="js-data-last-updated"></p>
</div>


### Data dictionary
* `elevator_mta_id` - Elevator ID used on outage reporting site
* `elevator_location` - Text description of elevator location
* `reason` - Stated initial reason for the elevator going out of service (this does not get updated in subsequent scrapes)
* `out_of_service` - Time reported on the outage reporting site
* `estimated_return` - Time reported on the outage reporting site
* `first_missed` - Time of scrape that first noticed the outage was removed from the reporting site
* `station_name` - Name of station for the elevator
* `station_line` - The lines that are served by that station


### Methodology
Most of the data is pulled directly from the MTA outage reporting site. However, we try to add a notion of when the elevator returned to service. To do this, we take note when a previously observed outage is no longer on the site and we add the `first_missed` time stamp to represent our best guess of when an outage ends.

The scraper runs once a minute.

## License
Please use this data! Its basically pulled straight from the MTA elevator outage reporting site with the small addition of `first_missed`. If you use the data, please let me know about it!

<a class="no-hover" rel="license" href="http://creativecommons.org/licenses/by/4.0/" style="background-color: transparent; padding: 0;">
  <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
</a>

This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.

<script>
  var updatedEl = document.querySelector('#js-data-last-updated')
  var url = 'https://s3.amazonaws.com/nyc-mta-elevator-outages/mta_elevator_outages.csv'
  fetch(url, { method: 'HEAD' }).then(response => {
    var lastModifiedHeader = response.headers.get('Last-Modified')
    var lastModifiedDate = new Date(lastModifiedHeader)
    var lastModified = lastModifiedDate.toLocaleDateString('en-us')
    updatedEl.innerText = 'Last updated on ' + lastModified
  })
</script>
