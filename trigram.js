#!/usr/bin/env node

// returns a window with a document and an svg root node
const { createSVGWindow } = require('svgdom')
const window = createSVGWindow()
const document = window.document
const { SVG, registerWindow } = require('@svgdotjs/svg.js')

// register window and document
registerWindow(window, document)

var total_width = 1280
var total_height = 1280
var text_size = 35

var font = {
    'sans': "Hiragino Sans CNS",
    'icon': "DejaVu Sans"
}

var _text_attr = {
    'font-family': font["sans"],
    'font-size': text_size,
    'font-weight': 'bold',
    'text-anchor': 'end',
    'writing-mode': 'vertical-lr'
}

var _text2_attr = {
    'font-family': 'DejaVu Sans',
    'font-size': text_size,
    'font-weight': 'bold',
    'text-anchor': 'end',
    'writing-mode': 'vertical-lr'
  }

var _square_attr = {
    'font-family': font["icon"],
    'font-size': 45,
    'font-weight': 'bold',
    'text-anchor': 'middle'
}

var _data = ["乾", "夬", "大有", "大壯", "小畜", "需", "大畜", "泰",
        "履", "兌", "睽", "歸妹", "中孚", "節", "損", "臨",
        "同人", "革", "離", "豐", "家人", "既濟", "賁", "明夷",
        "無妄", "隨", "噬嗑", "震", "益", "屯", "頤", "複",
        "姤", "大過", "鼎", "恆", "巽", "井", "蠱", "升",
        "訟", "困", "未濟", "解", "渙", "坎", "蒙", "師",
        "遁", "咸", "旅", "小過", "漸", "蹇", "艮", "謙",
        "否", "萃", "晉", "豫", "觀", "比", "剝", "坤"
    ]

var _data2 = ["䷀","䷪","䷍","䷡","䷈","䷄","䷙","䷊",
"䷉","䷹","䷥","䷵","䷼","䷻","䷨","䷒",
"䷌","䷰","䷝","䷶","䷤","䷾","䷕","䷣",
"䷘","䷐","䷔","䷲","䷩","䷂","䷚","䷗",
"䷫","䷛","䷱","䷟","䷸","䷯","䷑","䷭",
"䷅","䷮","䷿","䷧","䷺","䷜","䷃","䷆",
"䷠","䷞","䷷","䷽","䷴","䷦","䷳","䷎",
"䷋","䷬","䷢","䷏","䷓","䷇","䷖","䷁"]

var draw = SVG(document.documentElement)

draw.size(total_width, total_height)

// guide lines
draw.circle().move(640, 640).radius(2).fill("black")
draw.line(0, 640, 1280, 640).attr({'stroke': "black", 'stroke-width': 1})
draw.line(640, 0, 640, 1280).attr({'stroke': "black", 'stroke-width': 1})
draw.line(0, 0, 1280, 1280).attr({'stroke': "gray", 'stroke-width': 1})
draw.line(1280, 0, 0, 1280).attr({'stroke': "gray", 'stroke-width': 1})

function reorder_data(arr) {
    const middleIndex = Math.ceil(arr.length / 2)
    const clone_arr = arr.slice();
    const firstHalf = clone_arr.splice(0, middleIndex)
    const secondHalf = clone_arr.splice(-middleIndex)

    return firstHalf.concat(secondHalf.reverse())
}

function symbol_circle (arr, r, attr){
    ordered_arr = reorder_data(arr)
    len = ordered_arr.length

    for (let i=0; i<len; i++){
        var angle = -360 * i/64
        draw.plain(ordered_arr[i]).font('size', 0).rotate(angle, 640, 640).move(640-text_size/2, r).attr(attr)
    }
}

function symbol_square(arr, attr){
    var len = arr.length
    var size = attr["font-size"]
    for (let i=0; i<len; i++){
        offset_x = 3.5 - i%8
        offset_y = 3.5 - parseInt(i/8)
        draw.plain(arr[i]).font('size', 0).move(640+offset_x*(size+5), 640+offset_y*(size+5)+12).attr(attr)
    }
}

symbol_circle(_data, 250, _text_attr)
symbol_circle(_data2, 300, _text2_attr)
symbol_square(_data2, _square_attr)

console.log(draw.svg())
