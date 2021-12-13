(function(window) {
  const csv = '/data/mta-elevators/outages-estimated-returns.csv'
  // const $diffContainer = d3.select('#outages-differences')
  // $diffContainer.classed('no-js', false)

  d3.csv(csv).then(data => (
    data.filter(d => d['difference (min)'] !== 'NaN').map(d => {
      return Object.assign({}, d, {
        out_of_service: new Date(d.out_of_service),
        first_missed: new Date(d.first_missed),
        estimated_return: new Date(d.estimated_return),
        ['difference (min)']: +d['difference (min)'],
        ['duration (min)']: +d['duration (min)']
      })
    })
  )).then(data => {
    const grouped = d3.nest()
      .key(d => d.elevator)
      .rollup(d => ({
        outageCount: d.length,
        meanDuration: d3.mean(d, dd => dd['duration (min)']),
        sumDuration: d3.sum(d, dd => dd['duration (min)'])
      }))
      .entries(data)

    const mostToLeast = grouped.sort((a, b) => a.outageCount - b.outageCount)

    window.app.grouped = mostToLeast
  })
})(window)
