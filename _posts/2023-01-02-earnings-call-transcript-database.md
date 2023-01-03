---
title: Are companies talking about their California campaign cash on earnings calls with investors?
description: Yup. And with Github Actions and Datasette we can keep an eye on them.
---

Corporations are more involved with California ballot measures than ever, pouring hundreds of millions of dollars into each cycle. So: are any of them talking about it on their earnings calls?

To find out I built a web scraper and used a few other open-source data tools to throw all the content into a publicly available database.

But a scraper is worthless without good source data and for that I turned to [The Motley Fool's collection of earnings call transcripts](https://www.fool.com/earnings-call-transcripts/).

The conclusion: [Yes, executives and analysts](https://motley-fool-earning-transcripts.fly.dev/transcripts/Transcript?_sort=id&content__contains=california&content__contains=ballot) are talking about the campaign cash.

As [my CalMatters colleagues recently reported](https://calmatters.org/elections/2022/12/california-elections-industries-laws/), California ballot measures have become a series of choices about corporate regulation: should companies be allowed to sell flavored tobacco? Should online gambling companies be allowed? Should for-profit dialysis companies be required to have certain staff on site? Should companies like Lyft and Uber be allowed to classify their drivers as contractors?

It’s not going to change anytime soon. In 2024 we will vote on whether [oil companies can drill in people’s backyards (SB 1137)](https://www.bakersfield.com/news/oil-industry-hopes-to-put-contentious-setbacks-law-before-california-voters/article_7158540e-4be9-11ed-a83a-2f0256e41779.html) and [if fast food workers will be regulated by a new state run labor council (AB 257)](https://calmatters.org/commentary/2022/09/california-fast-food-law/).

And it happens because nearly anything can get on California’s ballot with enough signatures, and with a state of 40 million-ish people getting signatures is usually just a matter of spending enough money on professional gatherers.

*And* it happens because if the Legislature passes a bill, and that bill is subject to a referendum then the bill is effectively put on hold until the vote. Abstractly, this system *might* seem reasonable, but it does have the effect of allowing companies to stall regulation for a few years.

So, how can we monitor what these companies are telling their investors? I personally don’t put much stock in earnings call transcripts but theoretically if companies are spending millions of dollars their investors would want to know why management thinks it’s a good idea? Theoretically.

I used [a Javascript web scraper](https://github.com/jeremiak/motley-fool-earning-transcripts/blob/main/index.mjs), run and scheduled with [a Github Action](https://github.com/jeremiak/motley-fool-earning-transcripts/actions/workflows/scrape.yml), to pull the HTML content from The [Motley Fool’s earning transcripts](https://www.fool.com/earnings-call-transcripts/), a few of [Simon’s](https://simonwillison.net/) fantastic tools to manage and explore a SQLite database of the text.

Specifically, I used [`sqlite-utils`](https://sqlite-utils.datasette.io/en/stable/index.html) to put all the content into an SQLite database and then [`datasette`](datasette.io/) (truly my all-purpose hammer at this point) to search through it.

> If you’re reading this from the Motley Fool please know that I really appreciate all the work and money you’ve spent on making the earnings call transcripts public, it’s an extremely valuable resource! I hope you don't mind that I just wanted to look through them.

And there were a number of artifacts generated along the way!

1. If you want to see [the deployed database, that’s here](https://motley-fool-earning-transcripts.fly.dev/).
2. And [here’s the Github repo](https://github.com/jeremiak/motley-fool-earning-transcripts) where everything lives.
3. Including [the Action](https://github.com/jeremiak/motley-fool-earning-transcripts/actions/workflows/scrape.yml) that scrapes the site with `puppeteer`.
4. And [the other Action](https://github.com/jeremiak/motley-fool-earning-transcripts/actions/workflows/deploy.yml) that puts everything into a SQLite database and deploys it with `datasette` and Fly.io.

