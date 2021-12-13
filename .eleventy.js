const striptags = require('striptags')

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
  let vals = [...values];     // this *seems* to prevent collection mutation...
  return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
}

module.exports = function (eleventyConfig) {
  // Return your Object options:

  eleventyConfig.addFilter("byorder", sortByOrder);

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