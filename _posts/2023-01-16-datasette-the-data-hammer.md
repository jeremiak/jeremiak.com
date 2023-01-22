---
title: Datasette is my data hammer
description: If you're exploring or publishing data, you should give this open source tool a go.
---

> "When all you have is a hammer, everything looks a nail"
> 
> _English proverb_
    

> "Ok, but also a hammer is fucking useful"
> 
> _Me, sometimes_

[Datasette](https://datasette.io/) is an open source tool that takes an SQLite database and gives you an out-of-the-box, web-based UI built specifically for exploring data. Need an example? Here’s a [database of all of Motley Fool’s earning transcripts](https://motley-fool-earning-transcripts.fly.dev/transcripts/Transcript) that [I used to look for talk of their California campaign activity](https://www.jeremiak.com/blog/earnings-call-transcript-database/). And [here’s a bunch of other examples of Datasette](https://datasette.io/examples) from the official site.

And the thing is: I love Datasette. It [recently turned 5 years old](https://simonwillison.net/2022/Nov/13/datasette-birthday/) and I wanted to write down the thing that makes it an absolutely delightful data hammer. To strain the metaphor further, there’s no tool in my data worker’s toolbelt I use as often.  If I have data, it’s going into a SQLite database and I’m going to use Datasette to make it easy to explore and reproduce analysis, which I usually do in an Observable notebook.

But there are lots of data tools out there, what makes Datasette special? If I had to sum it up: URLs.

Datasette uses URLs to become an API for your data. And that kicks ass!

Every single query changes the URL of the page so you can always go back and look at the results of the same query. If the data hasn’t changed, the result won’t change either. And better yet, each query can return HTML for humans to look at or it can return JSON for other machines *just* by adding `.json` to the URL. At it’s most advanced, Datasette exposes an interface for running any SQL query you can think of and getting the results back as structured data with a persistent URL.

That might seem like a small thing but it means it’s super easy to:

- Find something interesting in the data you want to share with a colleague? Just send them the URL
- Need to document the exact query you used in your analysis? Just drop the link.
- Want to consume the data through some sort of other tool like a notebook? Well, I think you can see where this is going.

As if that isn't enough, Datasette also comes with a bunch of UI designed for regular humans. The tables are easy to sort and the queries don't require any SQL knowledge. Of course, if you like writing SQL it isn't going to get in your way.

Plus each query has a prominent link to download the data as a CSV file, meaning Datasette can be near the start of nearly limitless workflows.

Whew, this thing is some _fantastic_ open source software.

And we haven’t even started to cover [it’s majestic plugin ecosystem](https://datasette.io/plugins) which allows you to [see and query geospatial data](https://datasette.io/plugins/datasette-geojson-map), [visualize the data from your queries](https://datasette.io/plugins/datasette-vega), and even do super niche stuff like [run a secret santa group](https://datasette.io/plugins/datasette-secret-santa).

Next time you have structured data that you want to look through, give Datasette a try!