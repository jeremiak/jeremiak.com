---
title: Deno by default in 2023?
description: For the last 8 years I have been a nearly daily user of <a href="https://nodejs.org/">Node</a> but <a href="https://deno.land/">Deno</a> seems really neat and I want to use it more this year
prism: true
---

Javascript is great and is one of the most useful programming languages ever invented.

There. I said it. And I mean it.

Truthfully, it wasn’t love at first sight. I remember learning to write Javascript and struggling for ******months****** with the concepts of callbacks and promises (many thanks to [Marco](http://msecret.me/) and [Juno](https://juno.lol/) for helping me through that). It had so many gotchas compared to other programming languages I had used. In the rear view mirror, through affection tinted windows, I think this was because Javascript lets you do nearly anything, including dig a really deep hole that you can’t get out of.

Anyway, I write Javascript that runs both in browsers and out of browsers. Historically that second execution context has always been Node. I love being able to implement almost any programming pattern I can imagine while having the entirety of <a href="npmjs.com/">NPM</a> (the Node package registry) at my finger tips. It’s **intoxicatingly** fun.

But Node has issues and deviates from the browser in some really annoying ways: namely importing, fetching data, and security. I know many of these things are being worked on, but Deno seems to be going in a direction that I like better on all three of these fronts.

1. Deno uses the ECMAScript standardized `import` to get dependencies, but they’re not in your local project directory! They’re in a global folder and you install them using straight up URLs. That’s pretty fucking cool, because I currently have **23 gigabytes** worth of <code>node_modules</code> folders on my laptop right now!
2. I know that Node 18 just shipped with `fetch` but I want a server JS runtime that tries to be as similar to a browser as possible. The web is cool and advanced and I want to use more of it, not learn custom APIs. Deno agrees and says this straight up on their homepage: "A runtime that resembles the web, using browser APIs that work on the server." A-fucking-men.
3. It’s nothing short of a miracle that Node has worked as well as it has. We say "computer, install 23 gigabytes of other people’s code and let it just run on my computer please." That it hasn’t catastrophically failed doesn’t mean it’s a good system. It just means we’ve been lucky. I like the security-oriented mindset that the Deno folks have, you have to give access to the resources you **want** the script to use, be it the file system, network access, or anything else on your device. That’s cool!

I haven’t used any Javascript server runtimes besides Node but I think it’s time to try going Deno by default in 2023.