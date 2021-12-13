---
name: MTA elevator outages
href: /projects/subway-elevators
order: 20
---

The MTA (which runs the NYC subway, among other things) publishes elevator outage data to a website but doesn't provide much for folks looking to do analysis. It has no historical data available and does not provide users with a list of outages that have been resolved.

I wrote a scraper that keeps track of all the published elevator outages in the MTA system and adds a notion of when the elevator returned to service. In addition to getting the data, all known outages are published as a CSV once a day and a friendly bot [tweets out when there is a new outage](https://twitter.com/MtaOutages).