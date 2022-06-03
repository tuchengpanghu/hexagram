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
var total_height = base_height * 10

// create canvas
var draw = SVG(document.documentElement)
// draw pink square
draw.size(total_width, total_height)

function bar(num){
    var line = draw.line(base_width*64, 0, 0, 0)
    .attr({'stroke-width': base_height, 'stroke': "white"})
    .attr({'stroke-dasharray': base_width*64/num})
    .move(0, base_height/2)

    var rect = draw.rect(base_width * 64, base_height)
                    .attr({'stroke-width': 1, 'stroke': "black", 'fill': "black"})

    var group = draw.group()
    group.add(rect).add(line)

    return group
}

bar(64).move(padding,(base_height+2)*2)
bar(32).move(padding,(base_height+2)*3)
bar(16).move(padding,(base_height+2)*4)
bar(8).move(padding,(base_height+2)*5)
bar(4).move(padding,(base_height+2)*6)
bar(2).move(padding,(base_height+2)*7)
bar(1).move(padding,(base_height+2)*8)

console.log(draw.svg())