// returns a window with a document and an svg root node

const { createSVGWindow } = require('svgdom')
const window = createSVGWindow()
const document = window.document
const { SVG, registerWindow } = require('@svgdotjs/svg.js')

// register window and document
registerWindow(window, document)

var base_height = 50
var base_width = 22
var padding = base_width
var total_width = base_width * 64 + padding * 3
var total_height = base_height * 8

// create canvas
var draw = SVG(document.documentElement)
// draw pink square
draw.size(total_width, total_height)

function bar(step){
    var line = draw.line(0, 0, base_width*64, 0)
    .attr({'stroke-width': base_height, 'stroke': "black"})
    .attr({'stroke-dasharray': base_width*step})
    .move(0, base_height/2)

    var rect = draw.rect(base_width * 64, base_height)
                    .attr({'stroke-width': 1, 'stroke': "black", 'fill': "none"})

    var group = draw.group()
    group.add(line).add(rect)

    return group
}

bar(1).move(padding,10)

console.log(draw.svg())
