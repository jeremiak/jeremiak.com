---
title: Prison parole hearing results as a dataset
description: A frequently updated JSON file of all of the Board of Parole Hearings' suitability hearing results.
---

The California state government doesn't release a comprehensive, machine-readable set of prison parole hearing results. So I am, in this [frequently updated JSON file](https://raw.githubusercontent.com/jeremiak/ca-bph-hearing-results/main/hearing-results.json).

The part of the government that determines if a person is released from prison is the Board of Parole Hearings. A major part of the process is the parole suitability hearing, which the Board publishes once a month. For example, [here are the results of all the of the hearings in February 2022](https://www.cdcr.ca.gov/bph/2022/03/16/hearing-results-march-2022/). Yes, it is confusing that the major title on that page includes the month "March" and not "February".

But the Board doesn't publish any comprehensive set of the results so that we might do queries such looking across the hearings for a particular person or to determine if the rate of granted parole requests has changed over time. Bummer.

But also, a great opportunity for a little robot. This scraper is written in Javascript and scheduled with Github Actions. You can check out [the code repository here](https://github.com/jeremiak/ca-bph-hearing-results), if you're into that sort of thing. 

Turns out that Actions are easy to configure and reverse engineering the report publishing schedule of the Board of Parole Hearings, well, ain't; so the bot runs every day to look for new data. 

If you end up finding value in this frequently updated, machine-readable version of the California Board of Parole Hearings data don't hesitate to let me know.