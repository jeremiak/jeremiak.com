---
title: Git scraping municipal data
description: "Four new datasets about Sacramento: police logs, helicopter notifications, city managed trees, and campaign finance data. All locally made, crafted by hand and maintained with some robot assistance."
---

Sacramento has [an open data website](https://data.cityofsacramento.org/) that is nice when it works but frequently misses the mark - many datasets seem abandoned and even more are just missing. I'm still looking for you, fatality and injury data that's required to evaluate [the city's Vision Zero program](https://www.cityofsacramento.org/Public-Works/Transportation/Programs-and-Services/Vision-Zero).

Other websites in the city's portfolio provide limited access to pieces of municipal data, though almost never in a machine-readable form which facilitates analysis such as a CSV. So I've been making small git scrapers that publish the information as a text file with a public URL. _What_ a hobby.

Here are four recent scrapers and datasets I've been working on:

1. [A dataset](https://github.com/jeremiak/sacramento-pd-daily-activity-log) scraped from the "Sacramento Police Department's Daily Activity Log".

2. [A timeseries dataset](https://github.com/jeremiak/sacramento-city-trees) of the trees managed by the city government.

3. [A dataset](https://github.com/jeremiak/sacramento-helicopter-notifications) of helicopter notifications in the city.

4. [A dataset](https://github.com/jeremiak/sacramento-campaign-finance/) of City and County elected official campaign finance activity.

These four repos have made it clear to me that there are (at least) three things I really like about using the "git scraping" method for creating, releasing, and maintaining datasets:

1. The output is machine-readable and available via a URL. That means it can be hooked up to other automated data pipelines or notebooks for analysis.
2. The scheduling and debugging is top-notch; it isn't hard to figure out when the last successful scrape ran with the Github Actions UI plus you get emails when there are failed runs. Set-and-forget scrapers are just the best.
3. It generates two datasets at once: the original data and a time series dataset of updates. This means you can use really weird/cool tools like [`git-history`](https://datasette.io/tools/git-history) to look at changes over time. I've noticed that very few public datasets are versioned, usually the only latest one is available, so generating a history of the dataset can be original and useful by itself.

Github Actions has really changed my scraping game and I've now got [eight public git scraping repos](https://github.com/search?q=git-scraping+user%3Ajeremiak&type=Repositories&ref=advsearch&l=&l=). They're so easy to set up and "maintain", I've even been able to set up [at least one](https://github.com/jeremiak/usfs-dead-fuel-moisture) of those scrapers by creating and editing files in the Github web interface.