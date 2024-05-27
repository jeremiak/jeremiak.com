---
date: 2024-05-26T12:00-07:00
title: Look at just the properties of a GeoJSON feature collection with <code>jq</code>
description: It can be annoying to look at lots of JSON in the terminal, especially if there is geometry data.
prism: true
---

You can look at the properties of a GeoJSON feature collection with:

```sh
jq '.features[].properties' YOURFILE.json
```

This is one of those write-it-so-_I_-can-find-it-again kind of posts. It's mostly for me. But if you're here I hope it's useful.
