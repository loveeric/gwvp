/* global describe expect it MouseEvent */
const $ = require('jquery')
window.$ = $
const contextMenu = require('../contextMenu.js')

// create a contextMenu to test all
function resetDom () {
  $('body').html('<p id="test"></p>')
  $('body').append(`<div class="contextMenu">
    <ul>
      <li>hi</li>
      <li>hi</li>
    </ul>
  </div>`)
  return $('.contextMenu')
}
// jquery dom element reference

// prepare element appends styling and id to a dom element

describe('prepare Element', () => {
  let $contextMenu = resetDom()
  let ownContextMenu = {...contextMenu}
  ownContextMenu.prepareElement($contextMenu[0])

  it('should add a display none styling', () => {
    expect($contextMenu.attr('style')).toBe('display: none;')
  })

  it('should add a id(contextMenu)', () => {
    expect($contextMenu.attr('id')).toBe('contextMenu')
  })
})

describe('Initialize', () => {
  let $contextMenu = resetDom()
  let ownContextMenu = {...contextMenu}
  it('should not initialize if inputs are undefined', () => {
    ownContextMenu.init(document, null)
    expect(ownContextMenu.$domItem).toBe(undefined)
  })

  it('should initialize with working inputs', () => {
    ownContextMenu.init(document, $contextMenu[0])
    expect(ownContextMenu.$domItem).not.toBe(undefined)
  })
  // reset
  let ownContextMenu1 = {...contextMenu}

  it('should initialize with default values', () => {
    ownContextMenu1.init(null, $contextMenu[0])
    expect(ownContextMenu1.$domItem).not.toBe(undefined)
  })
})

describe('event bindings', () => {
  let $contextMenu = resetDom()
  let ownContextMenu = {...contextMenu}
  ownContextMenu.init(document, $contextMenu[0])

  it('should fire context menu', () => {
    let event = new MouseEvent('contextmenu')
    event.target = document.getElementById('test')
    document.dispatchEvent(event)
    expect($contextMenu.attr('style')).not.toBe('display: none;')
  })

  it('should fire close context menu', () => {
    let event = new MouseEvent('mousedown')
    event.force = true
    document.dispatchEvent(event)
    expect($contextMenu.attr('style')).toBe('display: none;')
  })
})

describe('getBestPoition', () => {
  let $contextMenu = resetDom()
  let ownContextMenu = {...contextMenu}
  ownContextMenu.init(document, $contextMenu[0])
  let cube = 100
  window.innerWidth = cube
  window.innerHeight = cube
  let tolerance = 25 // tolerance

  it('should return top left ', () => {
    let pos = ownContextMenu.getBestPosition(0, 0)
    expect(pos.x).toBe(0)
    expect(pos.y).toBe(0)
  })

  it('should return bottom right', () => {
    let pos = ownContextMenu.getBestPosition(100, 100)
    expect(pos.x).toBe(cube - tolerance)
    expect(pos.y).toBe(cube - tolerance)
  })

  it('should return top right', () => {
    let pos = ownContextMenu.getBestPosition(0, 100)
    expect(pos.x).toBe(0)
    expect(pos.y).toBe(cube - tolerance)
  })

  it('should return bottom left', () => {
    let pos = ownContextMenu.getBestPosition(100, 0)
    expect(pos.x).toBe(cube - tolerance)
    expect(pos.y).toBe(0)
  })
})
