(function() {
  let delegates = 50
  let lastDrawn = null

  const initialResults = [
    { name: 'Amy Klobuchar', votes: 100 },
    { name: 'Bernie Sanders', votes: 100 },
    { name: 'Elizabeth Warren', votes: 100 },
    { name: 'Joe Biden', votes: 100 },
    { name: 'Mike Bloomberg', votes: 100 },
    { name: 'Pete Buttigieg', votes: 100 },
  ]

  const columns = [
    { label: 'Name', key: 'name' },
    { label: 'Votes', key: 'votes' },
    { label: 'Percent', key: 'percent', format: value => {
      if (value > .15) return d3.format('.2%')(value)
      return (`${(value * 100)}`.slice(0, 5)) + '%'
    }},
    { label: 'Clears threshold', key: 'clearsThreshold', format: value => value ? 'Yes' : 'No' },
    { label: 'Delegates', key: 'pledgedDelegates' },
  ]

  function enrichResults (results) {
    const totalVotes = d3.sum(results, c => c.votes)
    const withPercent = results.map(result => {
      const percent = result.votes / totalVotes
      const clearsThreshold = percent >= .15
      return {
        ...result,
        percent,
        clearsThreshold,
      }
    })
    const aboveThreshold = withPercent.filter(result => result.percent >= 0.15)
    const totalVotesAboveThreshold = d3.sum(
      aboveThreshold,
      result => result.votes
    )
    const aboveThresholdWithRecalculatedPercent = aboveThreshold.map(result => {
      const recalculatedPercent = result.votes / totalVotesAboveThreshold
      const partialDelegates = delegates * recalculatedPercent
      const pledgedDelegates = parseInt(partialDelegates)
      const fractionalRemainder = partialDelegates % 1

      return {
        ...result,
        partialDelegates,
        pledgedDelegates,
        fractionalRemainder
      }
    })

    const maxFractionalRemainder = d3.max(
      aboveThresholdWithRecalculatedPercent,
      r => r.fractionalRemainder
    )
    const finalDelegateCounts = aboveThresholdWithRecalculatedPercent.map(
      result => {
        const { fractionalRemainder, pledgedDelegates } = result

        if (maxFractionalRemainder === 0) return result
        if (fractionalRemainder !== maxFractionalRemainder) return result

        return {
          ...result,
          pledgedDelegates: pledgedDelegates + 1
        }
      }
    )

    return withPercent.map(result => {
      const withDelegates = finalDelegateCounts.find(r => r.name === result.name)
      if (withDelegates) return withDelegates

      return {
        ...result,
        pledgedDelegates: 0
      }
    })
  }

  function draw(results) {
    lastDrawn = results
    const target = d3.select('#delegate-calculator')
    const enrichedResults = enrichResults(results)
    let calculator = target.select('table')
    const hasTable = calculator.nodes().length > 0

    if (!hasTable) {
      target.append('div').append('table')
      calculator = target.select('table')

      calculator
        .append('thead')
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text(d => d.label)

      calculator
        .append('tbody')
    }

    const rows = calculator.select('tbody')
      .selectAll('tr')
      .data(enrichedResults, d => d.name)

    rows
      .enter()
      .append('tr')
        .classed('bg-yellow', (d, i) => {
          if (i % 2 !== 0) return true
        })
      .merge(rows)
      .each(function(d) {
        const candidate = d.name
        const row = d3.select(this)
        const tds = row.selectAll('td')
          .data(columns)
        
        tds.enter()
          .append('td')
          .attr('data-column', d => d.label)
          .merge(tds)
          .each(function(c) {
            const td = d3.select(this)
            const value = d[c.key]

            if (c.key !== 'votes') {
              const formatted = c.format ? c.format(value) : value
              td.text(formatted)  
              return
            }
            
            const bound = td
              .selectAll('input')
              .data([1])
          
            bound.enter()
              .append('input')
              .attr('type', 'number')
              .merge(bound)
              .property('value', value) 
              .on('change', () => {
                const inputValue = d3.event.target.value
                const copy = enrichedResults.map(r => {
                  return {
                    ...r,
                    votes: r.name === candidate ? +inputValue : r.votes
                  }
                })

                draw(copy)
              })
          })
    })
  }

  draw(initialResults)

  d3.select('#load-bloomberg-scenario').on('click', () => {
    const copy = [ ...initialResults ]

    copy.forEach(r => {
      const isBloomberg = r.name.includes('Bloomberg')
      if (isBloomberg) r.votes = 33333
      else r.votes = 20000
    })

    draw(copy)
  })

  d3.select('#bloomberg-scenario-give-vote').on('click', () => {
    const copy = [ ...initialResults ]

    copy.forEach(r => {
      const isBloomberg = r.name.includes('Bloomberg')
      if (isBloomberg) r.votes = 33334
      else r.votes = 20000
    })

    draw(copy)
  })

  d3.select('#reset').on('click', () => {
    const copy = initialResults.map(row => {
      row.votes = 100

      return row
    })
    d3.select('#delegates').property('value', 50)
    delegates = 50

    draw(copy)
  })

  d3.select('#delegates').on('change', () => {
    const value = d3.event.target.value
    delegates = +value
    draw(lastDrawn)
  })
})()