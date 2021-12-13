var svg = d3.select("svg#bg")

svg
  .classed("fixed", true)
  .style("left", 0)
  .style("top", 0)
  .style("width", "100%")
  .style("height", "100%")
  .style("z-index", "-1")

var centers = []
var interval
var body = d3.select(document.body)
var circles = svg.append("g")
var path = svg
  .append("path")
  .attr("fill", "none")
  .attr("stroke", "rgba(0, 0, 0, 0.5)")
  .attr("stroke-dasharray", "4 6")

var color = d3
  .scaleLinear()
  .domain([1, 200])
  .range(["#ffd700", "#5c415d"])
var radius = d3.scaleLinear().domain([1, 200]).range([1, 300])

var height = document.body.clientHeight
var width = document.body.clientWidth

var intervalCount = 0
var activeWithoutClickingInterval = setInterval(() => {
  intervalCount += 1
  if (intervalCount < 6 && intervalCount % 3 === 0) return
  if (intervalCount > 23) return
  triggerRandomDrawing()
}, 4123)

setInterval(adjustRandomCircle, 4123 / 2)

function adjustRandomCircle() {
  var duration = Math.floor(Math.random() * 700) + 200
  var sel = circles.selectAll("circle")
  var selNodes = sel.nodes()

  if (selNodes.length < 4) return
  
  var i = Math.floor(Math.random() * selNodes.length)
  var shouldShrink = Math.random() > 0.49
  var circle = d3.select(selNodes[i])
  var currentR = radius.invert(circle.attr("r"))
  var nextR = shouldShrink ? currentR / 2 : currentR * 2

  circle
    .transition()
    .duration(duration)
    .attr("r", nextR)
    .attr("fill", color(nextR))
}

function triggerRandomDrawing() {
  var mouseDownDuration = Math.floor(Math.random() * 900) + 10
  var x = Math.floor(Math.random() * width) + 1
  var y = Math.floor(Math.random() * height) + 1
  
  var mousedown = new MouseEvent("mousedown", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: x,
    clientY: y,
  })

  var el = document.elementFromPoint(x, y)
  el.dispatchEvent(mousedown)
  
  setTimeout(() => {
    var mouseUp = new MouseEvent("mouseup", {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    })
    el.dispatchEvent(mouseUp)
  }, mouseDownDuration)
}

body.on('click', () => {
  clearInterval(activeWithoutClickingInterval)
  activeWithoutClickingInterval = null
})

body.on("mousedown", () => {
  const { clientX: x, clientY: y } = d3.event
  let r = 1

  centers.push({ x, y })

  currentCircle = circles
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", r)
    .attr("stroke", "black")
    .attr("fill", "white")
    .attr("fill-opacity", 0.77)

  interval = setInterval(() => {
    r += 1
    currentCircle.transition().attr("r", radius(r)).attr("fill", color(r))
  }, 10)
})

body.on("mouseup", () => {
  clearInterval(interval)
  interval = null
})

function drawConnectingLine() {
  const d = centers.map((center, i) => {
    if (i === 0) return `M ${center.x} ${center.y}`
    return `L ${center.x} ${center.y}`
  })
  path.transition().attr("d", d.join(" "))
  window.requestAnimationFrame(drawConnectingLine)
}

window.requestAnimationFrame(drawConnectingLine)
adjustRandomCircle()