hotkeys("*", function(event) {
    event.preventDefault()
    if (!player.optHotkey) return
  })
hotkeys("m", function(event, handler) {
    event.preventDefault()
    if (!player.optHotkey) return
    buyall()
})