---
title: Dizzying Democratic delegate... math
description: A short rant about Democratic delegates and a calculator tool to go along with it.
---

Elections in the U.S. are weird. So many of them aren't measured in the number of people who vote for a candidate but instead are measured in how many points a campaign can score.

The most famous example of this is the Electoral College. But we're well into the Democratic presidential primary, and it has its own set of points: "delegates".

The goal for each campaign is still to get the most votes possible but the winner isn't as simple as that. The winner is the person who can get to 1,991 delegates, which would give them 50%+ at the Democratic National Convention later this year in Wisconsin. Having a majority of delegates means the candidate gets the party's nomination.

Delegates are _mostly_ based on vote counts, but there are some sharp edges to the delegate math. For example any candidate with less than 15% gets 0 delegates.

So small fluctuations within an election can matter for the eventual delegate count. I wanted to see the allocation algorithim in action so I made a small tool to determine how delegates are awarded within a single jurisdiction. Delegates are awarded at multiple jurisdications, such as the state level and generally the Congressional district level, though depends on the state.

<style>
  button {
    background-color: gold;
    border-color: transparent;
    border-style: solid;
    border-width: 3px;
    color: black;
    cursor: pointer;
    display: block;
    font-family: serif;
    font-size: 1.1rem;
    margin: 0 auto;
    text-decoration: none;
  }

  button:hover {
    background-color: transparent;
    border: 3px dashed gold;
  }

  details {
    background-color: #ebebeb;
    margin-bottom: 1rem;
    padding: .4rem;
  }

  summary {
    cursor: pointer;
  }

  details p {
    margin-bottom: 1rem;
  }

  input {
    font-family: monospace;
    font-size: 1.1rem;
    width: 50%;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th {
    display: none;
    text-align: left;
    width: 100%;
  }

  td {
    border-bottom: 2px dashed #ebebeb;
    display: flex;
    font-size: .9rem;
    justify-content: space-between;
    padding-left: .2rem;
    padding-right: .2rem;
    padding-top: .2rem;
    padding-bottom: .2rem;
  }

  td:last-child {
    border-bottom: 2px solid black;
  }

  td::before {
    content: attr(data-column);
    display: inline-block;
    font-size: .7rem;
    font-weight: 700;
    padding-top: .2rem;
  }

  table input {
    background: transparent;
    border: none;
    text-align: right;
    width: 75%;
  }

  @media screen and (min-width: 1000px) {
    th {
      display: table-cell;
      width: 20%;
    }

    td::before {
      display: none;
    }

    td {
      display: table-cell;
      font-size: 1rem;
    }

    td:last-child {
      border-bottom: 2px dashed #ebebeb;
    }

    table input {
      text-align: left;
      width: 100%;
    }
  }
</style>

We're starting with an assumption that each candidate got 100 votes and that there are 50 delegates available in the jurisdiction. You can change either of those assumptions below. When you change any of the fields below, the delegate count will update.

<details>
<summary>If you're done playing around or looking for a place to start, expand this section to see something I find interesting.</summary>

<p>Let's assume that everybody's doing reasonably well and getting 20,000 votes. Except one candidate is clearly leading. Imagine that Bloomberg bought enough ad space and paid enough influencers to garner 33,333 votes.</p>

<button class="db p1" id="load-bloomberg-scenario">Make it so!</button>

<p>Well, that's all well and good and everybody's getting some delegates, though Mike is winning in the vote count and therefore is also winning in the delegate race. He gets 12 while everybody else is getting 8.</p>

<p>But what if he gets just one more vote? What if one of his supporters got their neighbor to come with them to the polls and cast that 33,334th vote for El Bloombito?</p>

<button class="db p1" id="bloomberg-scenario-give-vote">Give Bloomberg one more vote</button>

<p>That one vote throws everybody else below the 15% threshold and all the delegates go to a single candidate. In the calculator, Bloomberg's percentage doesn't change with just one vote because of rounding.</p>

<p>Now, of course there's going to be a point that triggers the threshold. This isn't to argue the merits of a 15% threshold, just showing one consequential effect of it.</p>
</details>

<div class="flex items-center justify-between mb2 sm-col-12 lg-col-6">
  <label class="bold" for="delegates">Delegates</label>
  <input id="delegates" type="number" min="0" value="50">
</div>

<div id="delegate-calculator"></div>
<button class="p1" id="reset">Reset</button>

## Methodology

I used the algorithim presented on [The Green Papers](http://www.thegreenpapers.com/P20/D-Math.phtml) website. As I understand it, (which is also how the calculator works), delegate allocation is as follows:

1. Take all the candidates and calculate their percentage of the vote
2. Drop all of the candidates (and associated votes) if they do not clear the threshold, which is generally 15%
3. Recalculate the percentage of the remaining vote that each candidate got
4. Multiply the percentage by the total number of delegates for that jurisdiction
5. Take note of the fractional remainders, if any, but remove them to determine the number of delegates awarded
6. Give a single delegate to the candidate who had the highest fractional remainder

<script src="/js/d3.v5.min.js"></script>
<script src="/js/democratic-delegate-math-calculator.js"></script>
