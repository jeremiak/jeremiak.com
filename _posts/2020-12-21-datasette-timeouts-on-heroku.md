---
title: Configuring Datasette timeout options on Heroku
description: It isn't hard to configure, but I spent more than 15 minutes searching and fiddling so here is the blog post I wish I had come across.
---

[Datasette](https://datasette.io/) is great software and is easy to use. It lets me can focus on building up a database and gives me a searchable web UI _and_ an API for my data. But the defaults aren't always sufficient for deploying to Heroku. For example, I ran into an SQL timeout error pretty quickly.

<figure class="mx-auto" style="width: 50%;">
  <img src="/img/datasette-on-heroku/timeout.png" alt="SQL timeout error served by datasette on Heroku" style="width: 100%;">
  <figcaption class="h6 italic">The error I saw on Heroku</figcaption>
</figure>

I'm using datasette for the [California municipal campaign finance project](/blog/california-municipal-campaign-finance/) and was saw the timeout errors when I was just sorting some columns. So I wanted to up the timeout limit from the default [of 1 second](https://docs.datasette.io/en/latest/settings.html#sql-time-limit-ms) to 4 seconds.

Why 4 seconds? 🤷‍♂️ It's more than 1 and less than a lot?

The documentation is very clear about how to do this when running `datasette` locally:

```
datasette mydatabase.db --setting sql_time_limit_ms 4000
```

The documentation is less clear about how you might combine that setting with the `datasette publish` command so that the timeout takes effect on Heroku. Turns out the winning combination is the `--extra-options` flag with a quoted `--setting` flag.

I successfully increased the timeout on Heroku with:

```
datasette publish heroku \
  --name $HEROKU_APP_NAME \
  --extra-options \"--setting sql_time_limit_ms 4000\" \
  mydatabase.db
```
