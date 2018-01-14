require('./style/main.scss')

const elementEvents = require('./js/elementManipulation/elementEvents') // all element events
const elementItems = require('./js/newElements/elementItems') // all element events
const navigation = require('./js/navigation') // standalone navigation
const menu = require('./js/menu/buildMenu')
const contextMenu = require('./js/interaction/contextMenu')
const keydown = require('./js/interaction/keydown')
const changeScreenSize = require('./js/elementManipulation/changeScreenSize')

document.addEventListener('DOMContentLoaded', () => {
  elementEvents.init()
  menu.build()
  contextMenu.init(document, document.getElementsByClassName('header-contextmenu')[0])
  keydown.addArray(menu.getKeyCodes())
  keydown.init(document)
  elementItems.init(elementEvents)
  navigation.init()
  changeScreenSize.init()

  // iframe ready
  document.getElementById('simulated').contentDocument.addEventListener('DOMContentLoaded', (event) => {
    elementEvents.initAfterFrame()
  })
  setTimeout(function () {
    elementEvents.initAfterFrame()
  }, 10)
})
