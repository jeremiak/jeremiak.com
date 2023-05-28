---
title: I wish it were easier to run command-line tools
description: Programs that are only available as a CLIs are often powerful but out of reach for less technical users. Maybe they should have configurable UIs?
prism: true
---

Command line tools are super powerful. They often do one thing and do it very well. But the lack of point-and-click style interface means that people who don't feel comfortable on the terminal can't use the program.

But what if the CLI tools had graphic user interfaces? CLIs with GUIs.

I'm not saying those developers should instead build web apps. I'm just wondering if there's a way we can bundle command line tools with something that allows more people to use it.

I've been wondering this for a while, since at least September 2019 when I created [`cli-gui`](https://github.com/jeremiak/cli-gui), though I never wrote about it.

And I started thinking about it again this week when two things happened:

1. A colleague needed some help downloading a copy of a website.
2. I read about [textual](https://textual.textualize.io/), a very cool Python library for building "text user interfaces".

There are _so many_ tools that are only available as CLI programs, here's a short and obviously unexhaustive list:

1. [`ffmpeg`](https://ffmpeg.org/) - All purpose video manipulation
2. [`sherlock`](https://sherlock-project.github.io/) - Searching user names across many social networks
3. [`youtube-dl`](http://ytdl-org.github.io/youtube-dl/) - Download videos from YouTube
4. [`mapshaper`](https://mapshaper.org/) - All purpose geographic data manipulation

I wonder if there is a way we can create a configuration file that would take any of these tools and allow an interface to be scaffolded? Even though these tools do widely different things they all work on similar principles: they take options and arguments and then output something, usually to standard out or to a file.

## More about this `cli-gui` thing

This project was my first attempt at a framework for wrapping command-line tools in more friendly form fields. It used a `config.js` file to determine what fields were created for specific tools and attempted to use Docker as a way to reliably and safely run scripts. I haven't really touched Docker since, and I'm not even sure it was a pefect tool for the job. Here's what the interface looks like for `sherlock`:

![Animated gif showing the cli-gui interface running the sherlock CLI to look for the username "sherlock"](https://github.com/jeremiak/cli-gui/raw/master/example.gif)

As you can see in the animated GIF above, `cli-gui` was set up to allow a user to provide a single parameter to `sherlock` with the label "Enter username for search query". Here's what the configuration looks like to generate that UI and the corresponding [documentation](https://github.com/jeremiak/cli-gui#adding-a-cli-tool):

```js
{
   id: 'sherlock',
   image: 'sherlock:latest',
   description: 'Sherlock is a tool for searching for a username across many social networks (<a href="https://github.com/sherlock-project/sherlock">website</a>)',
   fields: [
     {
       name: 'username',
       label: 'Enter username for search query',
       defaultValue: '',
       type: 'string',
     },
   ],
   format: (fields) => {
     const { username } = fields
     return username
   }
 }
 ```
