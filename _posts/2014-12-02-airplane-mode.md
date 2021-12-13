---
title: Airplane mode
---

Over the past few weeks I’ve found myself in a frustrating situation: 30,000 feet above the ground in a comfortable window seat, attempting to do some D3 visualizations of data returned by an HTTP API and, crucially, not having an internet connection. So obviously, I could’ve solved the problem by ponying up $30 a flight to make slow and unreliable requests over in-flight wifi. Gross.

[Louie](https://www.youtube.com/watch?v=KpUNA2nutbk), I’m aware of how technologically awesome in-flight wifi is, but it is just not good enough for development. Sorry.

Instead, I thought that I might build myself a quick, small tool to fit my particular use case of just needing an ajax request to return an HTTP response that had no real-time component. The result was airplane-mode.

The idea of caching HTTP responses is simple and definitely not new or unique, though I believe airplane-mode is a somewhat unique implementation. Quite simply, airplane-mode is a command-line utility that starts a cache and a web server. When a request is made against the app, it checks to see if it has stored that particular request before (currently based on the URL), and if it has it just returns the cached headers and body of the response.

There are a few testing/mock tools to do a similar thing for testing purposes but they require a bit more configuration than I was looking for. To get a specific API response I didn’t want to have to write a JSON description of the resource or response and I certainly didn’t want to have to start a local, bespoke app server to deliver it.

I just wanted to use URLs to easily cache responses. In this way, I can quickly activate the tool before I board my plane, open up a slew of URLs and automatically cache the responses. One of my absolute favorite API tool is the debug and testing tool called Runscope. The interface is particularly elegant to me, you preface the URL you want to request with a predictable pattern that proxies the request through Runscope. In practice, this has meant that I can just update the base URL in my code and take full advantage of the Runscope service.

airplane-mode’s interface is almost identical; you simply preface all of your URLs with http://0.0.0.0:PORT/, where PORT is determined and communicated when the tool starts. For example, if I am requesting the JSON document at http://developer.trade.gov/api.json and airplane-mode told me it was listening on port 3000, I would simply change the URL to http://0.0.0.0:3000/developer.trade.gov/api.json. I could quickly open that URL with my browser (or just easily with curl) and load it into the tool’s cache. Simply change the URL in my application code and I’m ready to do some offline development!

I published airplane-mode as an npm module all you need for installation is node and npm. Install with:
`npm install -g airplane-mode`

and run with a simple:
`airplane-mode`

I built this tool primarily for my own development workflow, but if it resonates with anybody else I’d love to hear your feedback! Feel free to open an [issue on Github](https://github.com/jeremiak/airplane-mode).
