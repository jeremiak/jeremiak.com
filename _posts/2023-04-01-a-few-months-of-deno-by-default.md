---
title: A few months of Deno
description: "Reflections after two and a half months of \"Deno by default\" for scrapers. TLDR: I think it's excellent!"
---

Back in January, I wrote [a post](/blog/deno-by-default/) about trying to replace [Node](https://nodejs.org/) with [Deno](https://deno.land/) as my default Javascript runtime for new projects. It's been a few months, and a few projects, so I wanted to reflect on that decision.

Turns out that the most common type of greenfield project to come across my desk is a web scraper - a robot to extract data from somewhere and put it into a file, usually JSON or a CSV.

Well, now I've got two public Deno based scrapers as a result. Both run frequently on Github Actions to keep the data up-to-date:

1. One scrapes the Sacramento Police Department's public activity log and compiles it into a single, continously updated file ([repo](https://github.com/jeremiak/sacramento-pd-daily-activity-log)).
2. The other scrapes public notifications for helicopters in Sacramento into a single, continously updated file ([repo](https://github.com/jeremiak/sacramento-helicopter-notifications)).

I've also got a few more in private repos for work, but we're not quite ready to share those.

## Things I like about Deno

The native support for `fetch` and `import`. I realize these things now exist in Node since version 18 but shrug, they're nice APIs and should be everywhere. Deno's very overt alignment with web standards is one of the reasons I'm intrigued by the project.

Even though `cheerio` has powered my scrapers for years I'm ready to abandon it in favor of [`deno_dom`](https://deno.land/x/deno_dom@v0.1.37), which has the same API as the DOM in the browser. Yay for `.querySelectorAll`! It feels refreshing to have an API I know so well available outside of a browser context. Another win for Deno's design principle of adhering to the standard specifications.

The recently added NPM support makes it easier to use Deno, it's an absolutely critical feature for my scripts. The `npm:` prefix means I can keep using [most of the tools](/blog/data-toolbelt/#web-scraping-tools) I already know so the learning curve is more shallow.

The `Deno` standard library took me a bit to grok, but it's nice to have access to `Deno.writeTextFile` out of the box. 

Also Typescript. Well, kinda. I _really_ like defining a specific `interface` for my data so that shape is consistent. And the type annotations can be cool but I haven't had the amazing auto-complete experience that I've read about. Maybe that's just because VS Code did a fair bit of that for me already. Eh.

Speaking of VS Code, the Deno support is great. The debugger works exactly as I would expect.

## Things I think are confusing about Deno

It isn't clear how I'm supposed to manage dependencies in a larger project. And, to be honest, I probably won't worry about this until I do have a larger project to work with. I know there's the [`deps.ts` file](https://deno.land/manual@v1.32.1/examples/manage_dependencies) but I just haven't tried it yet.

Also Typescript. I found myself adding a lot of extra `.?` prefixes to chained functions just to avoid the compiler freaking out even though I knew the code would run. I think I'll try out [Rich Harris' approach](https://twitter.com/Rich_Harris/status/1639344836766576640) of JSDoc type annotations and maybe the formal type annotations spec if/when it's standardized.

The flags are cool but kind of tedious. The read/write thing is annoying, I wish there was like a general `--allow-fs` that accepted a path for both reading and writing. I'm [out here](https://github.com/jeremiak/sacramento-helicopter-notifications/blob/main/.github/workflows/scrape.yml#L19) writing things like `--allow-read=notifications.json --allow-write=notifications.json`.

## Things I don't like about Deno

If I'm being greedy I'd love a few extra filesystem related APIs in the standard library; particularly `.readCsvFile()` and `.readJsonFile()` and their corresponding write versions. But it's not hard to find a library that I can use for some of those convenience functions if I need 'em.

So far I'm a fan and I'll keep trying to use Deno by default.