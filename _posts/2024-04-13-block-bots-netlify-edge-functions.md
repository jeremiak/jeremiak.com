---
date: 2024-04-13T12:00-07:00
title: Blockin' bots on Netlify
description: How I sniffed the user agent in an edge function to prevent some AI crawlers from accessing my site.
prism: true
---

Ethan Marcotte published a post yesterday called ["Blockin' bots."](https://ethanmarcotte.com/wrote/blockin-bots/) where he wrote about how to limit access to his site by AI bots and crawlers and lamented the fact that we even have to. His post might have been my introduction to the idea but he's not the first to write about it. Cory Dransfeldt published something similar in early March as a post called ["Go ahead and block AI web crawlers"](https://coryd.dev/posts/2024/go-ahead-and-block-ai-web-crawlers/).

All of these "AI" companies are sucking up any content they can get their hands on, regardless of copyright or ownership concerns.

There is the `robots.txt` file that's supposed to let website authors declare which bots can crawl the site for content but it depends on the bot authors actually caring - but they frequently don't.

The next best thing is to try and shut off access on the server side, where we have control. Ethan used an `.htaccesss` file and the `User-Agent` HTTP header's value to determine if the requester was a bot and then, if it was, he just doesn't return the content.

I wanted to do something similar though my personal site is hosted on Netlify which doesn't support having an `.htaccess` file. But I used their [edge functions](https://docs.netlify.com/edge-functions/overview/) feature to limit who can see my site based on the user agent. And it worked with only two extra files.

The first is the Netlify configuration file (`netlify.toml`) where I set up the edge function to intercept every request on every route.

<details>
<summary><code>netlify.toml</code></summary>

```toml
[[edge_functions]]
function = "block-bots"
path = "/*"
```

</details>

The second file is just a Javascript function (`block-bots.js`) that checks to see if the user agent is in a list of known bots and:

* If it is then access is blocked;
* And if it isn't, the site is returned like normal.

<details>
<summary><code>netlify/edge-functions/block-bots.js</code></summary>

```js
// inspired (and taken) from ethan marcotte's blog post
// https://ethanmarcotte.com/wrote/blockin-bots/
const botUas = [
  'AdsBot-Google',
  'Amazonbot',
  'anthropic-ai',
  'Applebot',
  'AwarioRssBot',
  'AwarioSmartBot',
  'Bytespider',
  'CCBot',
  'ChatGPT',
  'ChatGPT-User',
  'Claude-Web',
  'ClaudeBot',
  'cohere-ai',
  'DataForSeoBot',
  'Diffbot',
  'FacebookBot',
  'FacebookBot',
  'Google-Extended',
  'GPTBot',
  'ImagesiftBot',
  'magpie-crawler',
  'omgili',
  'Omgilibot',
  'peer39_crawler',
  'PerplexityBot',
  'YouBot'
]

export default async (request, context) => {
  const ua = request.headers.get('user-agent');

  let isBot = false

  botUas.forEach(u => {
    if (ua.toLowerCase().includes(u.toLowerCase())) {
      isBot = true
    }
  })

  const response = isBot ? new Response(null, { status: 401 }) : await context.next();
  return response
};
```

</details>

Good idea Ethan and Cory! I'm also bummed that we have to do this but it's still worth trying to opt out.