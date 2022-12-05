'use strict'

const STORAGE_KEY = 'questDB'
var gQuestsTree 
var gCurrQuest = loadFromStorage(STORAGE_KEY)
var gPrevQuest = null

function createQuestsTree() {
  if(gCurrQuest) {
    gQuestsTree = loadFromStorage(STORAGE_KEY)
    setFirstQuest()
    return
  }
  gQuestsTree = createQuest('Male?')
  gQuestsTree.yes = createQuest('Gandhi')
  gQuestsTree.no = createQuest('Rita')
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
  // TODO: update the gPrevQuest, gCurrQuest global vars
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  gPrevQuest[lastRes] = createQuest(newQuestTxt+'?')
  var newQuest = gPrevQuest[lastRes]
  newQuest.no = gCurrQuest
  newQuest.yes = createQuest(newGuessTxt)
  gCurrQuest = gQuestsTree
  _saveQuestsToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}



function setFirstQuest(){
  gCurrQuest = gQuestsTree
}

function _saveQuestsToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}
