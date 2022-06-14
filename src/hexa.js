#!/usr/bin/env node

// returns a window with a document and an svg root node
const { createSVGWindow } = require('svgdom')
const window = createSVGWindow()
const document = window.document
const { SVG, registerWindow } = require('@svgdotjs/svg.js')

// register window and document
registerWindow(window, document)

var base_height = 50
var base_width = 18
var padding = base_width
var total_width = base_width * 64 + padding * 3
var total_height = base_height * 10

var font = {
    'sans': "Hiragino Sans CNS",
    'serifs': "Hiragino Mincho ProN"
}

var _title = "伏羲六十四卦次序"

var _data = {
    "太極": ["太 極"],
    "兩儀": ["陽", "陰"],
    "四象": ["太陽", "少陰", "少陽", "太陰"],
    "八卦": ["乾", "兌", "離", "震", "巽", "坎", "艮", "坤"],
    "十六": [],
    "三十二": [],
    "六十四": ["乾", "夬", "大有", "大壯", "小畜", "需", "大畜", "泰",
        "履", "兌", "睽", "歸妹", "中孚", "節", "損", "臨",
        "同人", "革", "離", "豐", "家人", "既濟", "賁", "明夷",
        "無妄", "隨", "噬嗑", "震", "益", "屯", "頤", "複",
        "姤", "大過", "鼎", "恆", "巽", "井", "蠱", "升",
        "訟", "困", "未濟", "解", "渙", "坎", "蒙", "師",
        "遁", "咸", "旅", "小過", "漸", "蹇", "艮", "謙",
        "否", "萃", "晉", "豫", "觀", "比", "剝", "坤"
    ]
}

// create canvas
var draw = SVG(document.documentElement)

// TODO: center canvas in the screen
draw.size(total_width, total_height)

var style = draw.style()

style.rule('.title', {
    'font-family': font["sans"],
    'font-size': `${base_height}px`,
    'font-weight': 'bold',
    'text-anchor': 'middle',
    'dominant-baseline': 'central',
    'direction': 'rtl',
    'unicode-bidi': 'bidi-override'
})

style.rule('.text', {
    'font-family': font["sans"],
    'font-size': `${Math.round(0.72 * base_height)}px`,
    'font-weight': 'bold',
    'text-anchor': 'middle',
    'dominant-baseline': 'central',
    'direction': 'rtl',
    'unicode-bidi': 'bidi-override'
})

style.rule('.small_text', {
    'font-family': "Hiragino Sans CNS",
    'font-size': `${Math.round(0.81 * base_width)}px`,
    'writing-mode': 'vertical-lr',
    'text-anchor': 'middle'
})

function title(t) {
    var position = base_width * 32
    var rect = draw.rect(base_width * 64, base_height)
        .attr({ 'stroke-width': 1, 'stroke': "none", 'fill': "none" })
    var t = draw.plain(t.split('').join(' '))
        .font('size', 0)
        .move(position, base_height / 2)
        .addClass('title')

    var group = draw.group()
    group.add(rect).add(t)

    return group
}

function bar(num, item) {
    text_arr = _data[item]
    len = text_arr.length
    var rect = draw.rect(base_width * 64, base_height)
        .attr({ 'stroke-width': 1, 'stroke': "black", 'fill': "black" })

    var line = draw.line(base_width * 64, 0, 0, 0)
        .attr({ 'stroke-width': base_height, 'stroke': "white" })
        .attr({ 'stroke-dasharray': base_width * 64 / num })
        .move(0, base_height / 2)

    var group = draw.group()
    group.add(rect).add(line)

    for (let i = len; i > 0; i--) {
        // writing from right to left
        block = base_width * 64 / len
        position = block * i - block / 2

        // set initial size to 0, to avoid moving drift
        var text = draw.plain(text_arr[len - i]).font('size', 0)

        if (len == 64) {
            text.move(position, base_height / 2).addClass('small_text')
        } else {
            text.move(position, base_height / 2).addClass('text')
        }

        if ((len - i) % 2 == 1) {
            text.fill("white")
        }
        group.add(text)
    }

    // add text in the right most column
    if (item != "太極") {
        var text = draw.plain(item)
            .font('size', 0)
            .move(base_width * 65, base_height / 2)
            .addClass('small_text')
        group.add(text)
    }

    return group
}

var gap = 4

title(_title).move(padding, base_height / 2)

bar(64, "六十四").move(padding, (base_height + gap) * 2)
bar(32, "三十二").move(padding, (base_height + gap) * 3)
bar(16, "十六").move(padding, (base_height + gap) * 4)
bar(8, "八卦").move(padding, (base_height + gap) * 5)
bar(4, "四象").move(padding, (base_height + gap) * 6)
bar(2, "兩儀").move(padding, (base_height + gap) * 7)
bar(1, "太極").move(padding, (base_height + gap) * 8)

console.log(draw.svg())
