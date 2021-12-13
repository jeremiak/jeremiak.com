---
title: The California municipal campaign finance project
description: Announcing a public, updated database of municipal campaign finance filings from across California
---

Corporate campaign contributions are legalized bribery for elected officials. While necessary, transparency isn't enough to combat this type of corruption.

And yet, we have no single database of municipal and county level campaign finance filings in California; a state where nearly 40 million people's day-to-day lives are affected by the decisions of city councils, county supervisors, sheriffs, and district attorneys.

Today I am announcing the **California municipal campaign finance project** which is a public, updated database to enable research and reporting into how money is being spent in our local elections throughout the state.

<div class="center my3">
  <a 
  class="p1"
  href="https://ca-muni-camp-fin.herokuapp.com/">Search the database now</a>
</div>

In the wake of historic fires in California lots of folks are rightly pointing their fingers at global fossil fuel companies and their influence in politics at every level. We are asking questions like "which politicians are still taking money from oil companies", but it is impossible to answer that without a tremendous effort.  This database makes that kind of search possible. For example, we can see [those contributions](https://ca-muni-camp-fin.herokuapp.com/filings?sql=select%0D%0A++Tran_Date+as+contribution_date%2C%0D%0A++Tran_Amt1+as+contribution_amt%2C%0D%0A++Filer_ID+as+filer_id%2C%0D%0A++Filer_NamL+as+filer_name%2C%0D%0A++Tran_NamL+as+contributor_name%2C%0D%0A++Tran_City+as+contributor_city%2C%0D%0A++Tran_State+as+contributor_state%2C%0D%0A++Rpt_Date+as+report_date%2C%0D%0A++From_Date+as+reporting_period_starts%2C%0D%0A++Thru_Date+as+reporting_period_ends%2C%0D%0A++Tran_ID+as+transaction_id%2C%0D%0A++Entity_Cd+as+contributor_type%2C%0D%0A++entity%2C%0D%0A++year%2C%0D%0A++Elect_Date%0D%0Afrom%0D%0A++%5Ba-contributions%5D%0D%0Awhere%0D%0A++%22Entity_Cd%22+%21%3D+%3Ap0%0D%0A++and+%28%0D%0A++++%22Tran_NamL%22+like+%3Ap2%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap3%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap4%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap5%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap6%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap7%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap8%0D%0A++%29%0D%0Aorder+by%0D%0A++Tran_Date+DESC&p0=IND&p1=%25steinberg%25&p2=%25Oil+Marketers+%25&p3=%25exxon%25&p4=%25conoco%25&p5=%25chevron%25&p6=%25marathon%25&p7=%25valero%25&p8=%25koch%25) from oil companies in the cities and counties for which we have scraped and loaded data.

Is your mayor on that list? [Mine](https://ca-muni-camp-fin.herokuapp.com/filings?sql=select%0D%0A++Tran_Date+as+contribution_date%2C%0D%0A++Tran_Amt1+as+contribution_amt%2C%0D%0A++Filer_ID+as+filer_id%2C%0D%0A++Filer_NamL+as+filer_name%2C%0D%0A++Tran_NamL+as+contributor_name%2C%0D%0A++Tran_City+as+contributor_city%2C%0D%0A++Tran_State+as+contributor_state%2C%0D%0A++Rpt_Date+as+report_date%2C%0D%0A++From_Date+as+reporting_period_starts%2C%0D%0A++Thru_Date+as+reporting_period_ends%2C%0D%0A++Tran_ID+as+transaction_id%2C%0D%0A++Entity_Cd+as+contributor_type%2C%0D%0A++entity%2C%0D%0A++year%2C%0D%0A++Elect_Date%0D%0Afrom%0D%0A++%5Ba-contributions%5D%0D%0Awhere%0D%0A++%22Entity_Cd%22+%21%3D+%3Ap0%0D%0A++and+%22Filer_NamL%22+like+%3Ap1%0D%0A++and+%28%0D%0A++++%22Tran_NamL%22+like+%3Ap2%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap3%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap4%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap5%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap6%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap7%0D%0A++++OR+%22Tran_NamL%22+like+%3Ap8%0D%0A++%29%0D%0Aorder+by%0D%0A++Tran_Date+DESC&p0=IND&p1=%25steinberg%25&p2=%25Oil+Marketers+%25&p3=%25exxon%25&p4=%25conoco%25&p5=%25chevron%25&p6=%25marathon%25&p7=%25valero%25&p8=%25koch%25) sure is.

At the Federal level, the FEC provides a great resource for looking through campaign finance data at [their website](https://www.fec.gov) and the California Secretary of State  runs [a reasonable database](http://cal-access.sos.ca.gov/) for tracking state-level candidate campaign expenditures and contributions.

Until now no such resource exists for the cities and counties of the state. I have commissioned some [robots](https://github.com/jeremiak/ca-muni-camp-fin/) and made a bunch of phone calls to pull together this data and I invite you to use it and look up your local politicians.

No database can hold powerful people to account, but it can at least give us direction for our political action and ire.
