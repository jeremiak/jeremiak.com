const cheerio = require('cheerio')
const striptags = require('striptags')

const host = 'https://www.jeremiak.com'

function encodeForHtml(s) {
    const $ = cheerio.load(s)
    $('embed').remove()
    $('script').remove()
    $('style').remove()
    const characterEntities = $('body').html().replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const replacedUrls = characterEntities.replace(/\/img\//g, `${host}/img/`).replace(/\/blog\//g, `${host}/blog/`).replace(/\/data\//g, `${host}/data/`)

    return replacedUrls
}

function dateToRfc822(d) {
    const date = new Date(d)
    return date.toUTCString()
}

function extractExcerpt(page) {
    // lifted from https://www.jonathanyeong.com/garden/excerpts-with-eleventy/
    if (!page.hasOwnProperty("templateContent")) {
        console.warn(
            'Failed to extract excerpt: Document has no property "templateContent".'
        );
        return null;
    }

    return striptags(page.templateContent)
        .substring(0, 200) // Cap at 200 characters
        .replace(/^\s+|\s+$|\s+(?=\s)/g, "")
        .trim()
        .concat("...");
}

function sortByOrder(values) {
    let vals = [...values]; // this *seems* to prevent collection mutation...
    return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
}

module.exports = function(eleventyConfig) {
    // Return your Object options:

    eleventyConfig.addFilter("byorder", sortByOrder);
    eleventyConfig.addFilter("dateToRfc822", dateToRfc822)
    eleventyConfig.addFilter("safe", encodeForHtml);
    eleventyConfig.addFilter("striptags", striptags)

    eleventyConfig.addPassthroughCopy("data");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("js");

    eleventyConfig.addShortcode("excerpt", extractExcerpt)

    eleventyConfig.setBrowserSyncConfig({
        files: './_site/css/*.css'
    });

    return {
        dir: {
            includes: '_includes',
        }
    }
};