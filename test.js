
const test = require('tape')
const rgba = require('.')

const red_obj   = {r:255, g:0,   b:0,   a:255}
const green_obj = {r:0,   g:255, b:0,   a:255}
const blue_obj  = {r:0,   g:0,   b:255, a:255}
const black_obj = {r:0,   g:0,   b:0,   a:255}
const white_obj = {r:255, g:255, b:255, a:255}
const trans_obj = {r:0,   g:0,   b:0,   a:0}

const red_arr   = [255,   0,   0, 255]
const green_arr = [0,   255,   0, 255]
const blue_arr  = [0,     0, 255, 255]
const black_arr = [0,     0,   0, 255]
const white_arr = [255, 255, 255, 255]
const trans_arr = [0,     0,   0, 0]

const red_css   = 'rgb(255, 0, 0)'
const green_css = 'rgb(0, 255, 0)'
const blue_css  = 'rgb(0, 0, 255)'
const trans_css = 'rgba(0, 0, 0, 0)'

// << 24 below are corrected
const red_num    = 4294901760 // 255 << 24 | 255 << 16 |   0 << 8 | 0
const green_num  = 4278255360 // 255 << 24 |   0 << 16 | 255 << 8 | 0
const blue_num   = 4278190335 // 255 << 24 |   0 << 16 |   0 << 8 | 255
const black_num  = 4278190080 // 255 << 24 |   0 << 16 |   0 << 8 | 0
const white_num  = 4294967295 // 255 << 24 | 255 << 16 | 255 << 8 | 255
const trans_num  = 0          //   0 << 24 |   0 << 16 |   0 << 8 | 0
const red128_num = 2164195328 // 128 << 24 | 255 << 16 |   0 << 8 | 0
const red64_num  = 1090453504 //  64 << 24 | 255 << 16 |   0 << 8 | 0
const red1_num   = 33488896   //   1 << 24 | 255 << 16 |   0 << 8 | 0
const red0_num   = 16711680   //   0 << 24 | 255 << 16 |   0 << 8 | 0

const skip = false

test('name', {skip:skip}, function (t) {

  t.deepEqual(rgba.arr('red'), red_arr)
  t.deepEqual(rgba('red'),     red_arr)
  t.deepEqual(rgba('green'),   green_arr)
  t.deepEqual(rgba('blue'),    blue_arr)
  t.deepEqual(rgba('black'),   black_arr)
  t.deepEqual(rgba('white'),   white_arr)

  //

  t.deepEqual(rgba.obj('red'),   red_obj)
  t.deepEqual(rgba.obj('green'), green_obj)
  t.deepEqual(rgba.obj('blue'),  blue_obj)
  t.deepEqual(rgba.obj('black'), black_obj)
  t.deepEqual(rgba.obj('white'), white_obj)
  t.deepEqual(rgba.obj('funk'),  black_obj)

  //

  t.deepEqual(rgba.css('red'),   red_css)
  t.deepEqual(rgba.css('green'), green_css)
  t.deepEqual(rgba.css('blue'),  blue_css)
  t.deepEqual(rgba.css('blues'), 'rgb(0, 0, 0)')

  //

  t.deepEqual(rgba.num('red'),   red_num)
  t.deepEqual(rgba.num('green'), green_num)
  t.deepEqual(rgba.num('blue'),  blue_num)
  t.deepEqual(rgba.num('blues'), black_num)

  t.end()
})

test('short hexadecimal', {skip:skip}, function (t) {

  t.deepEqual(rgba.arr('f00'), red_arr)
  t.deepEqual(rgba('f00'),     red_arr)
  t.deepEqual(rgba('0f0'),     green_arr)
  t.deepEqual(rgba('00f'),     blue_arr)
  t.deepEqual(rgba('000'),     black_arr)
  t.deepEqual(rgba('fff'),     white_arr)
  t.deepEqual(rgba('fun'),     black_arr)

  t.deepEqual(rgba('#f00'), red_arr)
  t.deepEqual(rgba('#0f0'), green_arr)
  t.deepEqual(rgba('#00f'), blue_arr)
  t.deepEqual(rgba('#000'), black_arr)
  t.deepEqual(rgba('#fff'), white_arr)
  t.deepEqual(rgba('#fun'), black_arr)
  t.deepEqual(rgba('#666'), [102, 102, 102, 255])

  t.deepEqual(rgba('#f00f'), red_arr)
  t.deepEqual(rgba('6666'),  [102, 102, 102, 102])
  t.deepEqual(rgba('#6666'), [102, 102, 102, 102])
  t.deepEqual(rgba('#f006'), [255, 0, 0, 102])
  t.deepEqual(rgba('#0006'), [0,   0, 0, 102])
  t.deepEqual(rgba('#000f'), [0,   0, 0, 255])
  t.deepEqual(rgba('#600f'), [102, 0, 0, 255])
  t.deepEqual(rgba('#fu06'), black_arr)

  //

  t.deepEqual(rgba.obj('f00'), red_obj)
  t.deepEqual(rgba.obj('0f0'), green_obj)
  t.deepEqual(rgba.obj('00f'), blue_obj)
  t.deepEqual(rgba.obj('000'), black_obj)
  t.deepEqual(rgba.obj('fff'), white_obj)
  t.deepEqual(rgba.obj('fun'), black_obj)

  t.deepEqual(rgba.obj('#f00'), red_obj)
  t.deepEqual(rgba.obj('#0f0'), green_obj)
  t.deepEqual(rgba.obj('#00f'), blue_obj)
  t.deepEqual(rgba.obj('#000'), black_obj)
  t.deepEqual(rgba.obj('#fff'), white_obj)
  t.deepEqual(rgba.obj('#fun'), black_obj)

  t.deepEqual(rgba.obj('f00f'), red_obj)
  t.deepEqual(rgba.obj('0006'), {r:0,   g:0, b:0, a:102})
  t.deepEqual(rgba.obj('f006'), {r:255, g:0, b:0, a:102})
  t.deepEqual(rgba.obj('f000'), {r:255, g:0, b:0, a:0})
  t.deepEqual(rgba.obj('fu06'), black_obj)

  t.deepEqual(rgba.obj('#f00f'), red_obj)
  t.deepEqual(rgba.obj('#f006'), {r:255, g:0, b:0, a:102})
  t.deepEqual(rgba.obj('#fu06'), black_obj)

  //

  t.deepEqual(rgba.css('#f00'), red_css)
  t.deepEqual(rgba.css('0f0'),  green_css)
  t.deepEqual(rgba.css('#00f'), blue_css)

  t.deepEqual(rgba.css('0006'),  'rgba(0, 0, 0, .4)')
  t.deepEqual(rgba.css('f006'),  'rgba(255, 0, 0, .4)')
  t.deepEqual(rgba.css('g00'),   'rgb(0, 0, 0)')
  t.deepEqual(rgba.css('#0006'), 'rgba(0, 0, 0, .4)')
  t.deepEqual(rgba.css('#f006'), 'rgba(255, 0, 0, .4)')

  //

  t.deepEqual(rgba.num('#f00'),  red_num)
  t.deepEqual(rgba.num('#0f0'),  green_num)
  t.deepEqual(rgba.num('#00f'),  blue_num)
  t.deepEqual(rgba.num('#000'),  black_num)
  t.deepEqual(rgba.num('#fff'),  white_num)
  t.deepEqual(rgba.num('#0000'), trans_num)

  t.end()
})

test('long hexadecimal', {skip:skip}, function (t) {

  t.deepEqual(rgba.arr('ff0000'), red_arr)
  t.deepEqual(rgba('ff0000'),     red_arr)
  t.deepEqual(rgba('00ff00'),     green_arr)
  t.deepEqual(rgba('0000ff'),     blue_arr)
  t.deepEqual(rgba('000000'),     black_arr)
  t.deepEqual(rgba('ffffff'),     white_arr)
  t.deepEqual(rgba('00g000'),     black_arr)

  t.deepEqual(rgba('#ff0000'), red_arr)
  t.deepEqual(rgba('#00ff00'), green_arr)
  t.deepEqual(rgba('#0000ff'), blue_arr)
  t.deepEqual(rgba('#000000'), black_arr)
  t.deepEqual(rgba('#ffffff'), white_arr)
  t.deepEqual(rgba('#00g000'), black_arr)

  t.deepEqual(rgba('808080'),    [128, 128, 128, 255])
  t.deepEqual(rgba('#808080'),   [128, 128, 128, 255])
  t.deepEqual(rgba('80808080'),  [128, 128, 128, 128])
  t.deepEqual(rgba('#80808080'), [128, 128, 128, 128])
  t.deepEqual(rgba('#00808080'), [  0, 128, 128, 128])
  t.deepEqual(rgba('#00808000'), [  0, 128, 128, 0])
  t.deepEqual(rgba('#80808000'), [128, 128, 128, 0])

  //

  t.deepEqual(rgba.obj('ff0000'), red_obj)
  t.deepEqual(rgba.obj('00ff00'), green_obj)
  t.deepEqual(rgba.obj('0000ff'), blue_obj)
  t.deepEqual(rgba.obj('000000'), black_obj)
  t.deepEqual(rgba.obj('ffffff'), white_obj)
  t.deepEqual(rgba.obj('00g000'), black_obj)

  t.deepEqual(rgba.obj('#ff0000'), red_obj)
  t.deepEqual(rgba.obj('#00ff00'), green_obj)
  t.deepEqual(rgba.obj('#0000ff'), blue_obj)
  t.deepEqual(rgba.obj('#000000'), black_obj)
  t.deepEqual(rgba.obj('#ffffff'), white_obj)
  t.deepEqual(rgba.obj('#00g000'), black_obj)

  t.deepEqual(rgba.obj('808080'),    {r:128, g:128, b:128, a:255})
  t.deepEqual(rgba.obj('#808080'),   {r:128, g:128, b:128, a:255})
  t.deepEqual(rgba.obj('80808080'),  {r:128, g:128, b:128, a:128})
  t.deepEqual(rgba.obj('#80808080'), {r:128, g:128, b:128, a:128})
  t.deepEqual(rgba.obj('#80808000'), {r:128, g:128, b:128, a:0})

  //

  t.deepEqual(rgba.css('#ff0000'), red_css)
  t.deepEqual(rgba.css('00ff00'),  green_css)
  t.deepEqual(rgba.css('#0000ff'), blue_css)

  t.deepEqual(rgba.css('#80808080'), 'rgba(128, 128, 128, .5019607843137255)')
  t.deepEqual(rgba.css('#80808080'), 'rgba(128, 128, 128, ' + String(128/255).substr(1) + ')')
  t.deepEqual(rgba.css('#80808000'), 'rgba(128, 128, 128, 0)')
  t.deepEqual(rgba.css('#gg8080'),   'rgb(0, 0, 0)')

  //

  t.deepEqual(rgba.num('#ff0000'),   red_num)
  t.deepEqual(rgba.num('#00ff00'),   green_num)
  t.deepEqual(rgba.num('#0000ff'),   blue_num)
  t.deepEqual(rgba.num('#000000'),   black_num)
  t.deepEqual(rgba.num('#ffffff'),   white_num)
  t.deepEqual(rgba.num('#00000000'), trans_num)

  t.end()
})

test('rgb', {skip:skip}, function (t) {

  t.deepEqual(rgba.arr('rgb(255, 0, 0)'), red_arr)
  t.deepEqual(rgba('rgb(255, 0, 0)'),     red_arr)
  t.deepEqual(rgba('rgb(0, 255, 0)'),     green_arr)
  t.deepEqual(rgba('rgb(0, 0, 255)'),     blue_arr)
  t.deepEqual(rgba('rgb(0, 0, 256)'),     black_arr)
  t.deepEqual(rgba('rgb(0, 0, -1)'),      black_arr)
  t.deepEqual(rgba('rgb(0, 0, "12")'),    black_arr)

  t.deepEqual(rgba('rgba(250, 240, 230, 0.5)'), [250, 240, 230, Math.round(0.5 * 255)])
  t.deepEqual(rgba('rgba(250, 240, 230, .5)'),  [250, 240, 230, Math.round(0.5 * 255)])
  t.deepEqual(rgba('rgba(250, 240, 230, 0)'),   [250, 240, 230, 0])
  t.deepEqual(rgba('rgba(250, 240, 230, 1)'),   [250, 240, 230, 255])
  t.deepEqual(rgba('rgba(250, 240, 230, 1.0)'), [250, 240, 230, 255])
  t.deepEqual(rgba('rgba(250, 240, 230, 1.1)'), black_arr)

  t.deepEqual(rgba.obj('rgb(255, 0, 0)'), red_obj)
  t.deepEqual(rgba.obj('rgb(0, 255, 0)'), green_obj)
  t.deepEqual(rgba.obj('rgb(0, 0, 255)'), blue_obj)

  t.deepEqual(rgba.obj('rgba(250, 240, 230, .5)'), {r:250, g:240, b:230, a:Math.round(0.5 * 255)})
  t.deepEqual(rgba.obj('rgba(250, 240, 230, 0)'),  {r:250, g:240, b:230, a:0})
  t.deepEqual(rgba.obj('rgba(250, 240, 230, 1)'),  {r:250, g:240, b:230, a:255})
  t.deepEqual(rgba.obj('rgba(0, 0, 0, 1)'),        {r:0,   g:0,   b:0,   a:255})
  t.deepEqual(rgba.obj('rgba(0, 0, 0, 0)'),        {r:0,   g:0,   b:0,   a:0})

  t.deepEqual(rgba('rgba(255, 0, 0, 1)'),         red_arr)
  t.deepEqual(rgba('rgba(250, 0, 0, 0)'),         [250, 0, 0, 0])
  t.deepEqual(rgba('rgba(255, 0, 0, .5)'),        [255, 0, 0, Math.round(.5 * 255)])
  t.deepEqual(rgba('rgba(250, 240, 230, .123)'),  [250, 240, 230, Math.round(.123 * 255)])
  t.deepEqual(rgba('rgba(250, 240, 230, 0.123)'), [250, 240, 230, Math.round(.123 * 255)])
  t.deepEqual(rgba('rgba(250, 240, 230, 0)'),     [250, 240, 230, 0])
  t.deepEqual(rgba('rgba(256, 240, 230, 1)'),     black_arr)
  t.deepEqual(rgba('rgba(250, 240, 230, -.1)'),   black_arr)

  //

  t.deepEqual(rgba.css('rgb(255, 0, 0)'), red_css)
  t.deepEqual(rgba.css('rgb(0, 255, 0)'), green_css)
  t.deepEqual(rgba.css('rgb(0, 0, 255)'), blue_css)

  t.deepEqual(rgba.css('rgba(250, 240, 230, .123)'), 'rgba(250, 240, 230, .123)')
  t.deepEqual(rgba.css('rgba(250, 240, 230, 0)'),    'rgba(250, 240, 230, 0)')
  t.deepEqual(rgba.css('rgba(0, 240, 230, 0)'),      'rgba(0, 240, 230, 0)')
  t.deepEqual(rgba.css('rgba(0, 240, 230, .9)'),     'rgba(0, 240, 230, .9)')
  t.deepEqual(rgba.css('rgba(256, 240, 230, 0)'),    'rgb(0, 0, 0)')

  //

  t.deepEqual(rgba.num('rgb(255, 0, 0)'),     red_num)
  t.deepEqual(rgba.num('rgb(0, 255, 0)'),     green_num)
  t.deepEqual(rgba.num('rgb(0, 0, 255)'),     blue_num)
  t.deepEqual(rgba.num('rgb(0, 0, 0)'),       black_num)
  t.deepEqual(rgba.num('rgb(255, 255, 255)'), white_num)
  t.deepEqual(rgba.num('rgba(0, 0, 0, 0)'),   trans_num)

  t.end()
})

test('object', {skip:skip}, function (t) {

  t.deepEqual(rgba.arr({r:255}), red_arr)
  t.deepEqual(rgba({r:255}),     red_arr)
  t.deepEqual(rgba({red:255}),   red_arr)
  t.deepEqual(rgba({g:255}),     green_arr)
  t.deepEqual(rgba({green:255}), green_arr)
  t.deepEqual(rgba({b:255}),     blue_arr)
  t.deepEqual(rgba({blue:255}),  blue_arr)
  t.deepEqual(rgba({a:0}),       [0, 0, 0, 0])
  t.deepEqual(rgba({a:128}),     [0, 0, 0, 128])
  t.deepEqual(rgba({alpha:0}),   [0, 0, 0, 0])
  t.deepEqual(rgba({alpha:128}), [0, 0, 0, 128])

  t.deepEqual(rgba({r:250, g:240, b:230, a:220}),  [250, 240, 230, 220])

  t.deepEqual(rgba({r:256}),  black_arr)
  t.deepEqual(rgba({r:-12}),  black_arr)
  t.deepEqual(rgba({r:'12'}), black_arr)
  t.deepEqual(rgba({r:null}), black_arr)
  t.deepEqual(rgba({r:true}), black_arr)
  t.deepEqual(rgba({y:12}),   black_arr)

  //

  t.deepEqual(rgba.obj({r:255}),     red_obj)
  t.deepEqual(rgba.obj({red:255}),   red_obj)
  t.deepEqual(rgba.obj({g:255}),     green_obj)
  t.deepEqual(rgba.obj({green:255}), green_obj)
  t.deepEqual(rgba.obj({b:255}),     blue_obj)
  t.deepEqual(rgba.obj({blue:255}),  blue_obj)
  t.deepEqual(rgba.obj({a:128}),     {r:0, g:0, b:0, a:128})
  t.deepEqual(rgba.obj({alpha:128}), {r:0, g:0, b:0, a:128})

  t.deepEqual(rgba.obj({r:250, g:240, b:230, a:220}),  {r:250, g:240, b:230, a:220})

  t.deepEqual(rgba.obj({r:256}),  black_obj)
  t.deepEqual(rgba.obj({r:-12}),  black_obj)
  t.deepEqual(rgba.obj({r:'12'}), black_obj)
  t.deepEqual(rgba.obj({r:null}), black_obj)
  t.deepEqual(rgba.obj({r:true}), black_obj)

  //

  t.deepEqual(rgba.css({r:255}), red_css)
  t.deepEqual(rgba.css({g:255}), green_css)
  t.deepEqual(rgba.css({b:255}), blue_css)
  t.deepEqual(rgba.css({a:128}), 'rgba(0, 0, 0, .5019607843137255)')
  t.deepEqual(rgba.css({a:128}), 'rgba(0, 0, 0, ' + String(128/255).substr(1) + ')')
  t.deepEqual(rgba.css({a:0}),   'rgba(0, 0, 0, 0)')
  t.deepEqual(rgba.css({x:0}),   'rgb(0, 0, 0)')
  t.deepEqual(rgba.css({r:255, a:255}), 'rgb(255, 0, 0)')
  t.deepEqual(rgba.css({r:255, a:0}),   'rgba(255, 0, 0, 0)')

  //

  t.deepEqual(rgba.num({r:255}), red_num)
  t.deepEqual(rgba.num({g:255}), green_num)
  t.deepEqual(rgba.num({b:255}), blue_num)
  t.deepEqual(rgba.num({r:0}),   black_num)
  t.deepEqual(rgba.num({a:0}),   trans_num)
  t.deepEqual(rgba.num({r:255, g:255, b:255}), white_num)

  t.end()
})

test('hex', {skip:skip}, function (t) {

  t.deepEqual(rgba.hex('red'),   '#f00')
  t.deepEqual(rgba.hex('green'), '#0f0')
  t.deepEqual(rgba.hex('blue'),  '#00f')
  t.deepEqual(rgba.hex('black'), '#000')
  t.deepEqual(rgba.hex('white'), '#fff')

  t.deepEqual(rgba.hex('#f006'),     '#f006')
  t.deepEqual(rgba.hex('#808080ff'), '#808080')
  t.deepEqual(rgba.hex('#80808000'), '#80808000')
  t.deepEqual(rgba.hex('#80808080'), '#80808080')
  t.deepEqual(rgba.hex('#f006'),     '#f006')
  t.deepEqual(rgba.hex('#00ff0080'), '#00ff0080')
  t.deepEqual(rgba.hex({green:255, a:128}),    '#00ff0080')
  t.deepEqual(rgba.hex({b:255, a:0}),          '#00f0')
  t.deepEqual(rgba.hex('rgba(0, 0, 255, .5)'), '#0000ff80')
  t.deepEqual(rgba.hex('rgba(0, 0, 255, 1)'), '#00f')
  t.deepEqual(rgba.hex('rgba(0, 0, 255, 0)'), '#00f0')
  t.deepEqual(rgba.hex('rgba(0, 0, 128, 1)'), '#000080')
  t.deepEqual(rgba.hex('rgba(0, 0, 128, 0)'), '#00008000')

  t.deepEqual(rgba.hex({r:255}), '#f00')
  t.deepEqual(rgba.hex('rgba(250, 240, 230, .123)'), '#faf0e61f')

  t.deepEqual(rgba.hex('blues'),   '#000')
  t.deepEqual(rgba.hex('#fun'),    '#000')
  t.deepEqual(rgba.hex({r:256}),   '#000')
  t.deepEqual(rgba.hex({r:252.5}), '#000')
  t.deepEqual(rgba.hex({a:252.5}), '#000')
  t.deepEqual(rgba.hex('rgb(256, 0, 0)'),       '#000')
  t.deepEqual(rgba.hex('rgb(252.5, 0, 0)'),     '#000')
  t.deepEqual(rgba.hex('rgba(255, 0, 0, 1.1)'), '#000')
  t.deepEqual(rgba.hex('rgba(252.5, 0, 0, 1)'), '#000')

  t.end()
})

test('array', {skip:skip}, function (t) {

  t.deepEqual(rgba([255, 0, 0]), red_arr)
  t.deepEqual(rgba([0, 255, 0]), green_arr)
  t.deepEqual(rgba([0, 0, 255]), blue_arr)

  t.deepEqual(rgba.obj([255, 0, 0]),   red_obj)
  t.deepEqual(rgba.obj([0, 255, 0]), green_obj)
  t.deepEqual(rgba.obj([0, 0, 255]),  blue_obj)

  t.deepEqual(rgba.hex([255, 0, 0]),    '#f00')
  t.deepEqual(rgba.hex([0, 255, 0]),    '#0f0')
  t.deepEqual(rgba.hex([0, 0, 255]),    '#00f')
  t.deepEqual(rgba.hex([0, 0, 0]),      '#000')
  t.deepEqual(rgba.hex([0, 0, 0, 255]), '#000')

  t.deepEqual(rgba.css([0, 255, 0, 255]), 'rgb(0, 255, 0)')
  t.deepEqual(rgba.css([0, 0, 0, 128]),   'rgba(0, 0, 0, .5019607843137255)')
  t.deepEqual(rgba.css([0, 0, 0, 128]),   'rgba(0, 0, 0, ' + String(128/255).substr(1) + ')')

  t.deepEqual(rgba([0, 0, 252.5]), black_arr)
  t.deepEqual(rgba([0, 0, 256]),   black_arr)
  t.deepEqual(rgba([0, 0]),        black_arr)
  t.deepEqual(rgba([0, '255', 0]), black_arr)

  t.deepEqual(rgba(red_num),    red_arr)
  t.deepEqual(rgba(green_num),  green_arr)
  t.deepEqual(rgba(blue_num),   blue_arr)
  t.deepEqual(rgba(black_num),  black_arr)
  t.deepEqual(rgba(white_num),  white_arr)
  t.deepEqual(rgba(trans_num),  trans_arr)
  t.deepEqual(rgba(red128_num), [255, 0, 0, 128])
  t.deepEqual(rgba(red64_num),  [255, 0, 0, 64])
  t.deepEqual(rgba(red1_num),   [255, 0, 0, 1])
  t.deepEqual(rgba(red0_num),   [255, 0, 0, 0])

  //

  t.deepEqual(rgba.num([255, 0, 0]),  red_num)
  t.deepEqual(rgba.num([0, 255, 0]),  green_num)
  t.deepEqual(rgba.num([0, 0, 255]),  blue_num)
  t.deepEqual(rgba.num([0, 0, 0]),    black_num)
  t.deepEqual(rgba.num([0, 0, 0, 0]), trans_num)
  t.deepEqual(rgba.num([255, 255, 255]), white_num)

  t.end()
})

test('num', {skip:skip}, function (t) {

  t.deepEqual(rgba.num([255, 0, 0]),      red_num)
  t.deepEqual(rgba.num([0, 255, 0]),      green_num)
  t.deepEqual(rgba.num([0, 0, 255]),      blue_num)
  t.deepEqual(rgba.num([0, 0, 0]),        black_num)
  t.deepEqual(rgba.num([255,  255, 255]), white_num)
  t.deepEqual(rgba.num([0, 0, 0, 0]),     trans_num)
  t.deepEqual(rgba.num([255, 0, 0, 128]), red128_num)
  t.deepEqual(rgba.num([255, 0, 0,  64]), red64_num)
  t.deepEqual(rgba.num([255, 0, 0,  1]),  red1_num)
  t.deepEqual(rgba.num([255, 0, 0,  0]),  red0_num)

  t.end()
})

test('wrong values', {skip:skip}, function (t) {

  t.deepEqual(rgba(undefined), black_arr)
  t.deepEqual(rgba(null),      black_arr)
  t.deepEqual(rgba(''),        black_arr)
  t.deepEqual(rgba(12.3),      black_arr)
  t.deepEqual(rgba(true),      black_arr)
  t.deepEqual(rgba(false),     black_arr)

  t.end()
})

