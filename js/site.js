;(function () {
  function initPrintButton() {
    const btn = document.querySelector("#print")
    if (!btn) return

    btn.addEventListener("click", function (e) {
      e.preventDefault()
      window.print()
    })
  }

  window.onload = function () {
    const emoji = "🍕"
    const edge = emoji.repeat(5)
    console.log(emoji.repeat(29))
    console.log(edge + " ".repeat(34) + edge)
    console.log(edge + " nice to see you, old friend   :) " + edge)
    console.log(edge + " go ahead and try clicking around " + edge)
    console.log(edge + " ".repeat(34) + edge)
    console.log(emoji.repeat(29))

    initPrintButton()
  }
})()
