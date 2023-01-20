---
title: Promises for more stability
description: Javascript Promises make it easy to add retry behavior to web scrapers so they crash less
prism: true
---

If you build enough web scrapers you’ll run into a situation where you have hundreds or thousands of URLs to churn through but the scraper breaks after hour 4 on page 1,387 because the request bailed for some reason and you didn’t catch the error. It’s a bummer, especially since it usually crushes that wonderful feeling of watching a robot do something repetitive on your behalf. _Sigh_.

I’ve found that using recursive Javascript promises to fetch data makes adding retry behavior a breeze, meaning your scraper is more stable. And patterns that lead to stable scrapers are worth sharing!

I don’t know if it’s because I’m usually scraping government websites but I oft find that a busted request is simply because something happened along the internet superhighway and not because the scraper actually ran into an error; if you turn it off and on again (which is what a retry basically is) it works! You can be nice and wait a little bit before you do so to avoid hammering the server, but I don’t always.

Promises have been around in Javascript for years at this point and provide a really nice way to retry the task/scrape again. Let’s go through a contrived example.

Here’s a function that does the scrape for us, I *love* using the `async` syntax because I think it makes the code more readable. Plus it means that the function will always return a promise, which makes the recursive behavior easier to reason about.

```js
async function scrape(url) {
	const response = await fetch(url)
	const html = await response.text()
	return html
}
```

And if we run that it should get us the HTML text from whatever URL we pass in. But if we’re using this function to scrape a few hundred URLs and one has an issue the entire script will crash. Let’s fix that.

```js
async function scrape(url) {
	try {
		const response = await fetch(url)
		const html = await response.text()
		return html
	} catch (e) {
		return scrape(url)
	}
}
```

This function will now keep trying to scrape the URL until it is successful and then return the HTML. The successful path code is wrapped in a `try/catch` block so that we can run the `catch` code if there’s an error. If there’s no error we just return the HTML, technically we return a resolved promise with the HTML as the value. If there is an error, then we return a recursive call to the same function which returns a promise that will hopefully resolve at some point.

This will just run for forever, or at least until the request is successful. But sometimes that’s just too much. Well, with recursion we can easily add a limit to the number of retry attempts - let’s cut it off at 3 tries.

```js
 async function scrape(url, count = 0) {
	const maxAttempts = 3
	try {
		const response = await fetch(url)
		const html = await response.text()
		return html
	} catch (e) {
		if (count === maxAttempts) return null
		return scrape(url, count + 1)
	}
}
```

Now we have a function that returns a promise that won’t error and will hopefully resolve with the HTML we want. but will only give it three shots before just giving up.

Put a recursive promise style function in your next Javascript scraper, and let me know what you think!
