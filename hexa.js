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

var _text_attr = {
    'font-family': "Hiragino Sans CNS",
    'font-size': 35,
    'font-weight': 'bold',
    'text-anchor': 'middle',
    'dominant-baseline': 'central',
    'direction': 'rtl',
    'unicode-bidi': 'bidi-override'
}

// create canvas
var draw = SVG(document.documentElement)

// TODO: center canvas in the screen
draw.size(total_width, total_height)

function bar(num, text_arr){
    len = text_arr.length
    var rect = draw.rect(base_width * 64, base_height)
                    .attr({'stroke-width': 1, 'stroke': "black", 'fill': "black"})

    var line = draw.line(base_width*64, 0, 0, 0)
                    .attr({'stroke-width': base_height, 'stroke': "white"})
                    .attr({'stroke-dasharray': base_width*64/num})
                    .move(0, base_height/2)

    var group = draw.group()
    group.add(rect).add(line)

    for (let i = len; i > 0; i--) {
        // writing from right to left
        block = base_width*64/len
        position = block*i - block/2
        // set initial size to 0, to avoid move scale
        var text = draw.plain(text_arr[len-i]).font('size', 0).move(position, base_height/2).attr(_text_attr)
        if ((len-i) % 2 == 1){
            text.fill("white")
        }
        group.add(text)
    }

    return group
}

var gap = 2

bar(64, []).move(padding,(base_height+gap)*2)
bar(32, []).move(padding,(base_height+gap)*3)
bar(16, []).move(padding,(base_height+gap)*4)
bar(8, ["乾","兌","離","震","巽","坎","艮","坤"]).move(padding,(base_height+gap)*5)
bar(4, ["太陽","少陰","少陽","太陰"]).move(padding,(base_height+gap)*6)
bar(2, ["陽","陰"]).move(padding,(base_height+gap)*7)
bar(1, ["太 極"]).move(padding,(base_height+gap)*8)


console.log(draw.svg())
