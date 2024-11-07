
  hotkeys("m", function(event, handler) {
    event.preventDefault()
    if (!player.optHotkey) return
    buyall()
})

hotkeys("b", function(event, handler) {
  event.preventDefault()
  if (!player.optHotkey) return
  dimBoost()
})