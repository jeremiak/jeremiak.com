---
title: Heavyweight dependencies
description: A one-liner to tell you how much space all of your <code>node_modules</code> are taking up across your codebases - I've got gigabytes.
prism: true
---

I've always liked how Node installs project dependencies into a `node_modules` directory within each project.

It's cool because you can keep project dependencies separate. And, more than once it's been _very_ useful to add `debugger` statements into a project's dependency.

But it's not cool because it means you have a lot of extra code on your machine. Even if you use the same library across all of your projects it will be installed once for each of them.

I wanted to see just how much space its all taking up on my Mac for [yesterday's post](/blog/deno-by-default/). I changed into the directory where I keep all of my projects and ran:

```sh
find . -name "node_modules" -type d -prune -print | xargs du -chs
```

And the result:

```tsv
 23G	total
```