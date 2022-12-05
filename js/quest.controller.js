'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

function init() {
    console.log('Started...')
    createQuestsTree()
}

function onStartGuessing() {
    PlaySound('click-21156')
    // TODO: hide the game-start section
    $('.game-start').hide()
    renderQuest()
    // TODO: show the quest section
    $('.quest').show()
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update
    // its text by the currQuest text
    var currQuest = getCurrQuest()
    $('.quest h2').text(titleCase(currQuest.txt))
}

function onUserResponse(ev) {
    PlaySound('click-21156')
    console.log('ev', ev)
    var res = ev.data.ans
    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            // TODO: improve UX
            PlaySound('winfantasia-6912')
            $('.alert-pop').text('Yes, I knew it!').show()
            setTimeout(() => {
                $('.alert-pop').hide()
            }, 2000)
            setFirstQuest()
            $('.quest').hide()
            $('.game-start').show()
            gLastRes = null
        } else {
            PlaySound('negative_beeps-6008')
            $('.alert-pop').text('I dont know...teach me!').show()
            setTimeout(() => {
                $('.alert-pop').hide()
            }, 2000)
            // TODO: hide and show new-quest section
            $('.quest').hide()
            $('.new-quest').show()
        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res
        moveToNextQuest(res)
        renderQuest()
    }
}

function onAddGuess(ev) {
    PlaySound('click-21156')
    ev.preventDefault()
    // TODO: Get the inputs' values
    var newGuess = $('#newGuess').val()
    var newQuest = $('#newQuest').val()
    // TODO: Call the service addGuess
    if (!newGuess || !newGuess) {
        setFirstQuest()
        onRestartGame()
        return
    }
    addGuess(newQuest, newGuess, gLastRes)
    onRestartGame()
}

function onRestartGame() {
    $('.new-quest').hide()
    $('.game-start').show()
    gLastRes = null
}
