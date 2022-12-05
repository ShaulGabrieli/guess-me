'use strict'

function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase()
  }


  function PlaySound(sound) {
    var audio = new Audio('../sounds/' + sound + '.mp3')
    audio.play()
}
