#!/usr/bin/env node

// returns a window with a document and an svg root node
const { createSVGWindow } = require('svgdom')
const window = createSVGWindow()
const document = window.document
const { SVG, registerWindow } = require('@svgdotjs/svg.js')

// register window and document
registerWindow(window, document)

var draw = SVG(document.documentElement)

var style = draw.style()

style.rule('.xxx', {fill: 'blue'})
style.rule('.myClass', {fontSize: 16})

draw.circle().move(64, 64).radius(60).addClass('xxx')

console.log(draw.svg())
