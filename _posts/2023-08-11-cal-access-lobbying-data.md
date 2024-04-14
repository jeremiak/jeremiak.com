---
date: 2023-08-11T12:00-07:00
title: The lobbying data Cal-Access should be publishing
description: Getting structured data out of the Secretary of State's office about lobbying is much harder than it should be. I've got some new robots that scrape the site daily to generate JSON files that are ready-to-use for analysis.
---

Cal-Access was <a href="https://twitter.com/jeremiak/status/1597643400274071552">built during the Clinton administration</a> and was innovative for it's time: it provides a way for anybody to look up campaign finance and lobbying expenditure activity. Together, these two data sets represent a large part of the influence buying going on in California's government. It's a rickety yet useful website.

Starting with the positive, there are some things I adore about <a href="https://cal-access.sos.ca.gov/">Cal-Access</a>:

1. URLs are stable and meaningful.
2. The site is not interactive - HTML is returned from the server and rendered by the browser.
3. It gets updated frequently.

But there's something that really bothers me about the site with respect to lobbying information: it's _very_ hard to export the data for use in a subsequent workflow or tool.

The only SoS sanctioned option is a 4+ gigabyte collection of TSV files that are updated daily and available for [download](https://www.sos.ca.gov/campaign-lobbying/cal-access-resources/raw-data-campaign-finance-and-lobbying-activity). But it includes _all_ of the data in Cal-Access broken out across many tables. You have to be a subject matter expert to deciper the provided documentation and reconstitute the relationship between the different files. And even then, good luck.

But I've been [looking at lobbying stuff recently](https://calmatters.org/politics/2023/08/california-cities-lobbying/) and I needed to analyze all of the lobbying activity so far in 2023. I figured out a way to leverage the things I like about Cal-Access to fix the thing I don't and generate structured data: I wrote a few "git scraping" robots that crawl the site to extract and structure the data and save it as JSON files.

The Secretary of State breaks out lobbying activity into four main groups of data, which are visible in the left hand menu.

<figure>
  <img src="/img/cal-access-lobbying/screenshot.png" alt="Screenshot of the lobbying menu on Cal-Access">
  <figcaption>Screenshot of the <a href="https://cal-access.sos.ca.gov/Lobbying/">lobbying page on Cal-Access</a></figcaption>
</figure>

<dl>
   <dt>1. Lobbyists</dt>
   <dd>
   People who spend <a href="https://www.fppc.ca.gov/content/dam/fppc/NS-Documents/TAD/Lobbying/Lobbyist-Manual-Folder/Lobbying%20Manual%20-%20Chapter%201.pdf">at least 1/3</a> of their compensated time on direct lobbying of officials.
   </dd>
   <dt>2. Lobbying firms</dt>
   <dd>Companies that hire lobbyists to advocate on behalf of clients.</dd>
   <dt>3. Lobbyist employers</dt>
   <dd>Companies and organizations that employ lobbyists and/or lobbying firms.</dd>
   <dt>4. $5k+ payments to influence</dt>
   <dd>People and organizations that spend at least $5,000 to influence legislative or administrative action but don't employ a lobbyist or lobbying firm.</dd>
 </dl>

Made sense to me that I just copied their setup. I have four separate repos, one for each data category, that checks for new data daily and updates the JSON file so that it's always up-to-date and ready to use.

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Current year JSON file</th>
      <th>Scraper status <span>(green is good, red is bad)</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Lobbyists</td>
      <td>
        <a href="https://github.com/jeremiak/cal-access-lobbyists/blob/main/lobbyists-2023.json"><code>lobbyists-2023.json</code></a>
      </td>
      <td>
        <a href="https://github.com/jeremiak/cal-access-lobbyists/actions/workflows/scrape.yml">
          <img src="https://github.com/jeremiak/cal-access-lobbyists/actions/workflows/scrape.yml/badge.svg" alt="Scrape lobbyists">
        </a>
      </td>
    </tr>
    <tr>
      <td>
        Lobbying firms
      </td>
      <td>
        <a href="https://github.com/jeremiak/cal-access-lobbying-firms/blob/main/lobbying-firms-financial-activity-2023.json">
          <code>lobbying-firms-financial-activity-2023.json</code>
        </a>
      </td>
      <td>
        <a href="https://github.com/jeremiak/cal-access-lobbying-firms/actions/workflows/scrape.yml">
          <img src="https://github.com/jeremiak/cal-access-lobbying-firms/actions/workflows/scrape.yml/badge.svg" alt="Scrape lobbying firms">
        </a>
      </td>
    </tr>
    <tr>
      <td>Lobbyist employers</td>
      <td>
        <a href="https://github.com/jeremiak/cal-access-lobbyist-employers/blob/main/lobbyist-employers-financial-activity-2023.json">
          <code>lobbyist-employers-financial-activity-2023.json</code>
        </a>
      </td>
      <td>
        <a href="https://github.com/jeremiak/cal-access-lobbyist-employers/actions/workflows/scrape.yml">
          <img src="https://github.com/jeremiak/cal-access-lobbyist-employers/actions/workflows/scrape.yml/badge.svg" alt="Scrape lobbyist employers">
        </a>
      </td>
    </tr>
    <tr>
      <td>$5k+ payments to influence</td>
      <td>
        <a href="https://github.com/jeremiak/cal-access-lobbying-5k-filers/blob/main/5k-filers-financial-activity-2023.json">
          <code>5k-filers-financial-activity-2023.json</code>
        </a>
      </td>
      <td>
        <a href="https://github.com/jeremiak/cal-access-lobbying-5k-filers/actions/workflows/scrape.yml">
          <img src="https://github.com/jeremiak/cal-access-lobbying-5k-filers/actions/workflows/scrape.yml/badge.svg" alt="Scrape lobbyists">
        </a>
      </td>
    </tr>
  </tbody>
</table>

If you end up using this data, I'd love to hear about it. And if you find a mistake in it, you really ought to let me know.

<style>
  dt {
    font-weight: 600;
  }

  dd {
    margin-bottom: .5rem;
    margin-left: 0;
  }

  table {
    width: 100%;
  }

  th span {
    font-size: .8em;
    font-weight: 400;
  }

  a:has(img) {
    border: none !important;
    background-color: transparent !important;
    padding: 0 !important;
  }

  a:hover:has(img) {
    background-color: transparent !important;
    padding: 0 !important;
  }

  @media (max-width: 700px) {
    thead {
      display: none;
    }

    tbody tr {
      border: 1px solid var(--border-color);
      display: block;
      margin-bottom: .5rem;
    }

    tbody td {
      background-color: white;
      display: block;
      width: 100%;
    }

    tbody td:nth-child(odd) {
      background-color: var(--table-zebra-bg-color);
    }

    tbody td:before {
      font-size: .8em;
      font-weight: 600;
    }

    tbody td:nth-child(1):before {
      content: "Category: ";
    }

    tbody td:nth-child(2):before {
      content: "Current year JSON file: ";
    }

    tbody td:nth-child(3):before {
      content: "Scraper status: ";
    }
  }
</style>