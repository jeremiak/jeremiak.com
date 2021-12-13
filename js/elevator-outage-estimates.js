(function(window) {
  const csv = '/data/mta-elevators/outages-estimated-returns.csv'
  const $diffContainer = d3.select('#outages-differences')
  $diffContainer.classed('no-js', false)

  d3.csv(csv).then(data => (
    data.filter(d => d['difference (min)'] !== 'NaN').map(d => {
      return Object.assign({}, d, {
        out_of_service: new Date(d.out_of_service),
        first_missed: new Date(d.first_missed),
        estimated_return: new Date(d.estimated_return),
        ['difference (min)']: +d['difference (min)']
      })
    })
  )).then(data => {
    const dates = []
    const differences = []
    data.forEach(d => {
      dates.push(d.out_of_service)
      dates.push(d.first_missed)
      dates.push(d.estimated_return)

      differences.push(d['difference (min)'])
    })
    const diffExtent = d3.extent(differences)
    const diffMean = d3.mean(differences)
    const initialScrape = data[0].out_of_service
    const outageCount = data.length

    d3.select('#outage-count').text(formatNumber(outageCount))
    d3.select('#initial-scrape-date').text(formatDate(initialScrape))
    d3.select('#best-difference').text(formatTimeAmount(diffExtent[0]))
    d3.select('#worst-difference').text(formatTimeAmount(diffExtent[1]))
    d3.select('#average-difference').text(`${formatTimeAmount(diffMean)} ${diffMean < 0 ? 'earlier': 'later'}`)

    const initialWidth = $diffContainer.node().offsetWidth
    const height = 350
    const padding = 30
    const xScale = d3.scaleTime()
      .domain(d3.extent(dates))
      .range([0, initialWidth - (2 * padding)])
    const yScale = d3.scaleLinear()
      .domain(diffExtent)
      .range([0, height - 2 * padding])

    const $caption = $diffContainer.select('.caption')
    const $svg = $diffContainer.select('.chart')
      .append('svg')
        .attr('height', height)
        .attr('width', initialWidth)
        .attr('preserveAspectRatio','xMinYMid')
        .attr('viewbox', `0 0 ${initialWidth} ${height}`)
    const $main = $svg.append('g')
        .attr('id', 'main')
        .attr('transform', `translate(${padding * 2}, 0)`)
    const $midline = $svg.append('g')
      .append('line')
        .attr('x1', padding)
        .attr('x2', xScale(d3.max(dates)))
        .attr('y1', yScale(0))
        .attr('y2', yScale(0))
        .attr('class', 'stroke-black')
    const $xAxis = $main.append('g')
      .attr('transform', `translate(0, ${height - (padding * 1.6)})`)
      .attr('class', 'axis x-axis')

    const $yAxisLines = $svg.append('g')
      .attr('class', 'axis y-axis')

    const yAxisDays = [5, 10, 15, 20, 25, 30, 35, 40, 45]

    const yAxisText = $yAxisLines.append('g')
      .attr('transform', `translate(10, ${yScale(5 * 24 * 60)})`)

    yAxisText.append('text')
      .attr('transform', 'rotate(270)')
      .text('Days')

    yAxisText.append('text')
      .attr('transform', 'translate(0, -100) rotate(270)')
      .text('Early')

    yAxisText.append('text')
      .attr('transform', 'translate(0, 110) rotate(270)')
      .text('Late')

    yAxisDays.forEach(day => {
      const yPlus = yScale(day * 60 * 24)
      const yNeg = yScale(-day * 60 * 24)

      $yAxisLines.append('line')
        .attr('x1', padding * 2)
        .attr('x2', xScale(d3.max(dates)) + padding * 2)
        .attr('y1', yPlus)
        .attr('y2', yPlus)

      $yAxisLines.append('text')
        .attr('x', 30)
        .attr('y', yPlus + 5)
        .text(`${day}`)

      if (day < 40) {
      $yAxisLines.append('line')
        .attr('x1', padding * 2)
        .attr('x2', xScale(d3.max(dates)) + padding * 2)
        .attr('y1', yNeg)
        .attr('y2', yNeg)

      $yAxisLines.append('text')
        .attr('x', 30)
        .attr('y', yNeg + 5)
        .text(`${day}`)
      }
    })

    const updateCaption = d => {
      const html = `
        Elevator <strong>${d.elevator}</strong> went out of service
        on <strong>${formatDate(d.out_of_service)}</strong> at
        <strong>${formatTime(d.out_of_service)}</strong>. It was
        estimated to return to service at
        <strong>${formatTime(d.estimated_return)}</strong> on
        <strong>${formatDate(d.estimated_return)}</strong> but actually
        went back online at <strong>${formatTime(d.first_missed)}</strong>
        on <strong>${formatDate(d.first_missed)}</strong>, which was
        <strong>${formatTimeAmount(d['difference (min)'])}
        ${d['difference (min)'] > 0 ? 'late' : 'early'}</strong>.
      `
      $caption.html(html)
    }

    const updateChart = data => {
      const width = $diffContainer.node().offsetWidth

      // for responsive charts
      xScale.range([0, width])
      yScale.range([0, height - (2 * padding)])

      $svg.attr('width', width)

      $midline.attr('x2', xScale(d3.max(dates)))
      $xAxis.call(d3.axisBottom(xScale))

      const selection = $main.selectAll('g').data(data)

      selection.select('line')
        .attr('x1', d => xScale(d.out_of_service))
        .attr('y1', yScale(0))
        .attr('x2', d => xScale(d.out_of_service))
        .attr('y2', d => yScale(d['difference (min)']))

      selection
        .enter()
          .append('g')
              .attr('class', 'outage')
            .append('line')
              .attr('x1', d => xScale(d.out_of_service))
              .attr('y1', yScale(0))
              .attr('x2', d => xScale(d.out_of_service))
              .attr('y2', d => yScale(d['difference (min)']))
              .attr('class', 'pointer stroke-black')
              .on('mouseover', d => {
                d3.select(d3.event.target).classed('stroke-gold', true)
                updateCaption(d)
              })
              .on('mouseout', d => {
                d3.select(d3.event.target).classed('stroke-gold', false)
              })
    }

    updateChart(data)

    window.addEventListener('resize', e => {
      updateChart(data)
    })
  })
})(window)
