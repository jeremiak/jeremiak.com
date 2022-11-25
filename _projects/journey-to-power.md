---
name: "Journey to power: The history of black voters, 1976 to 2020"
href: https://www.nbcnews.com/politics/2020-election/journey-power-history-black-voters-1976-2020-n1029581
order: 38
---

I designed and developed the data graphics for this nine part piece by Steve Kornacki. It is a look at how the importance of black voters has grown within the Democratic party by looking at each contested presidential primary since 1976.

<style>
  .journey-to-power-images {
    margin: 0 auto;
  }

  .journey-to-power-images img {
    margin-bottom: 1rem;
  }

  [src$="-power-bar.png"] {
    width: 100%;
  }

  @media screen and (min-width: 700px) {
    .journey-to-power-images {
      display: grid;
      grid-column-gap: 1rem;
      grid-template-columns: 50% 50%;
      grid-template-rows: 400px 400px;
    }

    .journey-to-power-images img {
      margin: 0;
    }

    [src$="-power-76-table.png"] {
      grid-column: 1;
      grid-row: 1;
    }

    [src$="-power-bar.png"] {
      grid-column: 1;
      grid-row: 2;
      width: auto;
      height: 100%;
    }

    [src$="-power-small-multiples.png"] {
      align-self: center;
      grid-column-start: 2;
      grid-row-start: 1;
      grid-row-end: span 2;
      justify-self: center;
      height: 100%;
      width: auto;
    }
  }
</style>

<!-- <style>
  .journey-to-power-images {

  }
</style> -->

<div class="journey-to-power-images">
    <img src="/img/projects/nbc-journey-to-power-small-multiples.png" height="auto" width="100%">
    <img src="/img/projects/nbc-journey-to-power-76-table.png" height="auto" width="100%">
    <img src="/img/projects/nbc-journey-to-power-bar.png">
</div>