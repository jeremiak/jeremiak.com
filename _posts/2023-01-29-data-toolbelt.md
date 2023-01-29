---
title: Taking stock of my "data tool belt"
description: Twelve software projects and companies I use all the time as a working data journalist.
---

I’ve been doing data work for nearly a decade and, at this point, I’ve got a set of tools that I really enjoy and make me really productive. At least I feel that they do.

I wrote [a recent post where I gushed about Datasette](/blog/datasette-the-data-hammer/), a tool I use all the time. I likened it to my "data hammer" because it is always within reach of my work.

Well, now I want to talk about the other tools I use. In part to strain the metaphor and in part because I’ve never talked about the software I use day in and day out. There’s only one criteria for something to show up on this list: I have to use it all the time.

These tools are always close at hand because they’re *that* useful. But I also use these tools because they feel like magic. I can cast data alchemy spells with non-trivial geospatial analysis - the sort of feeling that hooks you, that makes you go “I guess computers aren’t all terrible.”

It’s a bit hyperbolic, but I love each and every software project on this list. And I’m super grateful to the hundreds of thousands of hours that have been put in to them.

I’ve broken my toolset into a few categories to provide some sort of organization. Also note that most of these tools are in the Javascript ecosystem. It is a language that is super expressive and jives with my brain, for better <strike>or worse</strike>.

<nav role="navigation" class="table-of-contents">
  <ol>
    <li><a href="#general-use-tools">General-use tools</a></li>
    <li><a href="#web-scraping-tools">Web scraping tools</a></li>
    <li><a href="#geospatial-tools">Geospatial tools</a></li>
    <li><a href="#website-tools">Website tools</a></li>
    <li><a href="#tools-that-are-also-companies">Tools that are also companies</a></li>
  </ol>
</nav>

<h2 id="general-use-tools">General-use tools</h2>

<h3 id="d3"><a href="https://d3js.org/">D3</a></h3>

Books have been written about how useful, and complicated, the D3 library is. And even though I don't use it so much for visualization anymore, it has some features that I just can't live without. Namely:

1. CSV parsing and serializing
2. Date and time parsing
3. Scales and interpolation
4. Basic math like sums and means

<h3 id="lodash"><a href="https://lodash.com/">lodash</a></h2>

This collection of utility functions is in nearly every one of my projects. I use it to <a href="https://lodash.com/docs/4.17.15#sortBy">sort data</a>, <a href="https://lodash.com/docs/4.17.15#uniqBy">ensure uniqueness</a>, and do <a href="https://lodash.com/docs/4.17.15#upperFirst">basic string manipulation</a>.

<h2 id="web-scraping-tools">Web scraping tools</h2>

<h3 id="p-queue"><a href="https://github.com/sindresorhus/p-queue">p-queue</a></h3>

The _thing_ for when I need promise based control flow. It makes it easy to run tasks in parallel and allows me to adjust the number of concurrent tasks going at once. Why is that cool? Because it means I can dramatically reduce the run time of some of my web scrapers.

<h3 id="cheerio"><a href="https://cheerio.js.org/">cheerio</a></h3>

A jQuery inspired API for parsing and manipulating HTML outside of a browser.

<h3 id="puppeteer"><a href="https://pptr.dev/">puppeteer</a></h3>

Scraping websites can mean you need to be able to automate a browser. There are a number of options to control browsers but I've found that I like puppeteer's API the most so it is the one I use.

<h2 id="geospatial-tools">Geospatial tools</h2>

<h3 id="mapshaper"><a href="https://mapshaper.org/">mapshaper</a></h3>

Need to convert geographic data between file formats? Need to simplify it in the process? Or filter out particular features that you don't want to include in a dataset?

Mapshaper does it all and because it's a command-line tool it's easy to integrate into data pipelines.

<h3 id="turfjs"><a href="https://turfjs.org">turfjs</a></h3>

This project is a _fucking_ gem; it enables me to conduct geospatial analysis from the comfort of Javascript and JSON. The most magical function of this library is called <a href="https://turfjs.org/docs/#booleanPointInPolygon">booleanPointInPolygon</a> which can tell you if a point is inside of a polygon.

Sounds simple but it turns out to be really powerful and is the crux of how I built <a href="https://calmatters.org/politics/2022/01/california-election-new-districts-lookup/">a tool</a> for California voters to see how redistricting affected their home address.

<h3 id="QGIS"><a href="https://www.qgis.org/">QGIS</a></h3>

And sometimes you just need a GUI to do... well, something. I'm just a novice when it comes to this open-source geospatial power house but I use it a lot to explore new data by putting it on a map.

<h2 id="website-tools">Website tools</h2>

<h3 id="sveltekit"><a href="https://kit.svelte.dev/">SvelteKit</a></h3>

If I'm making a website, SvelteKit is the first thing I'm going to reach for. Not only does it use the very popular component model for building interfaces, but it also makes it very easy to keep API/data fetching code and UI code in the same repository.

<h2 id="tools-that-are-also-companies">Tools that are also companies</h2>

<h3 id="observable-notebooks"><a href="https://observablehq.com/">Observable notebooks</a></h3>

Doing data analysis is hard and ensuring that it's repeatable and auditable is crucial. When possible, I use Observable notebooks to handle that. The major thing I like about this tool over other notebook options, besides that it's Javascript, is that I can just share a URL with a colleague. I love that.

<h3 id="github-actions"><a href="https://docs.github.com/en/actions">Github Actions</a></h3>

Github Actions are where all of my scrapers and recurring tasks run. It's easy to schedule scrapers, read the logs of the times they've succeeded and failed, and it can easily commit data to a repository.

<h3 id="netlify"><a href="https://www.netlify.com/">Netlify</a></h3>

I don't have the skill to run webservers, let alone the interest. I want my websites to be deployed whenever a change happens on Github and I want to be able to see when a deploy succeeded and when it fails. Netlify does it all.

Do you use any of these tools in your day to day work? Love them? Hate 'em? I'm super curious to hear from you.