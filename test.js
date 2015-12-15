
const test = require('tape')
const rgba = require('.')

const ored   = {r:255, g:0, b:0, a:255}
const ogreen = {r:0, g:255, b:0, a:255}
const oblue  = {r:0, g:0, b:255, a:255}
const oblack = {r:0, g:0, b:0, a:255}
const owhite = {r:255, g:255, b:255, a:255}

const ared   = [255, 0, 0, 255]
const agreen = [0, 255, 0, 255]
const ablue  = [0, 0, 255, 255]
const ablack = [0, 0, 0, 255]
const awhite = [255, 255, 255, 255]

const cred   = 'rgb(255, 0, 0)'
const cgreen = 'rgb(0, 255, 0)'
const cblue  = 'rgb(0, 0, 255)'

test('name', function (t) {

  t.deepEqual(rgba.arr('red'),   ared)

  t.deepEqual(rgba('red'),   ared)
  t.deepEqual(rgba('green'), agreen)
  t.deepEqual(rgba('blue'),  ablue)
  t.deepEqual(rgba('black'), ablack)
  t.deepEqual(rgba('white'), awhite)

  //

  t.deepEqual(rgba.obj('red'),   ored)
  t.deepEqual(rgba.obj('green'), ogreen)
  t.deepEqual(rgba.obj('blue'),  oblue)
  t.deepEqual(rgba.obj('black'), oblack)
  t.deepEqual(rgba.obj('white'), owhite)
  t.deepEqual(rgba.obj('funk'),  oblack)

  //

  t.deepEqual(rgba.css('red'),   cred)
  t.deepEqual(rgba.css('green'), cgreen)
  t.deepEqual(rgba.css('blue'),  cblue)
  t.deepEqual(rgba.css('weird blue'),  'rgb(0, 0, 0)')

  t.end()
})

test('short hexadecimal', function (t) {

  t.deepEqual(rgba.arr('f00'),  ared)

  t.deepEqual(rgba('f00'),  ared)
  t.deepEqual(rgba('0f0'),  agreen)
  t.deepEqual(rgba('00f'),  ablue)
  t.deepEqual(rgba('000'),  ablack)
  t.deepEqual(rgba('fff'),  awhite)
  t.deepEqual(rgba('fun'),  ablack)

  t.deepEqual(rgba('#f00'),  ared)
  t.deepEqual(rgba('#0f0'),  agreen)
  t.deepEqual(rgba('#00f'),  ablue)
  t.deepEqual(rgba('#000'),  ablack)
  t.deepEqual(rgba('#fff'),  awhite)
  t.deepEqual(rgba('#fun'),  ablack)

  t.deepEqual(rgba('f00f'),  ared)
  t.deepEqual(rgba('f000'),  [255, 0, 0, 0])
  t.deepEqual(rgba('f006'),  [255, 0, 0, 102])
  t.deepEqual(rgba('fu06'),  ablack)

  t.deepEqual(rgba('#f00f'),  ared)
  t.deepEqual(rgba('#f006'),  [255, 0, 0, 102])
  t.deepEqual(rgba('#fu06'),  ablack)

  //

  t.deepEqual(rgba.obj('f00'),  ored)
  t.deepEqual(rgba.obj('0f0'),  ogreen)
  t.deepEqual(rgba.obj('00f'),  oblue)
  t.deepEqual(rgba.obj('000'),  oblack)
  t.deepEqual(rgba.obj('fff'),  owhite)
  t.deepEqual(rgba.obj('fun'),  oblack)

  t.deepEqual(rgba.obj('#f00'),  ored)
  t.deepEqual(rgba.obj('#0f0'),  ogreen)
  t.deepEqual(rgba.obj('#00f'),  oblue)
  t.deepEqual(rgba.obj('#000'),  oblack)
  t.deepEqual(rgba.obj('#fff'),  owhite)
  t.deepEqual(rgba.obj('#fun'),  oblack)

  t.deepEqual(rgba.obj('f00f'),  ored)
  t.deepEqual(rgba.obj('f006'),  {r:255, g:0, b:0, a:102})
  t.deepEqual(rgba.obj('f000'),  {r:255, g:0, b:0, a:0})
  t.deepEqual(rgba.obj('fu06'),  oblack)

  t.deepEqual(rgba.obj('#f00f'),  ored)
  t.deepEqual(rgba.obj('#f006'),  {r:255, g:0, b:0, a:102})
  t.deepEqual(rgba.obj('#fu06'),  oblack)

  //

  t.deepEqual(rgba.css('#f00'), cred)
  t.deepEqual(rgba.css('0f0'),  cgreen)
  t.deepEqual(rgba.css('#00f'), cblue)

  t.deepEqual(rgba.css('f006'),  'rgba(255, 0, 0, .4)')
  t.deepEqual(rgba.css('g00'),  'rgb(0, 0, 0)')

  t.end()
})

test('long hexadecimal', function (t) {

  t.deepEqual(rgba.arr('ff0000'),  ared)

  t.deepEqual(rgba('ff0000'),  ared)
  t.deepEqual(rgba('00ff00'),  agreen)
  t.deepEqual(rgba('0000ff'),  ablue)
  t.deepEqual(rgba('000000'),  ablack)
  t.deepEqual(rgba('ffffff'),  awhite)
  t.deepEqual(rgba('00g000'),  ablack)

  t.deepEqual(rgba('#ff0000'), ared)
  t.deepEqual(rgba('#00ff00'), agreen)
  t.deepEqual(rgba('#0000ff'), ablue)
  t.deepEqual(rgba('#000000'), ablack)
  t.deepEqual(rgba('#ffffff'), awhite)
  t.deepEqual(rgba('#00g000'), ablack)

  t.deepEqual(rgba('808080'),    [128, 128, 128, 255])
  t.deepEqual(rgba('#808080'),   [128, 128, 128, 255])
  t.deepEqual(rgba('80808080'),  [128, 128, 128, 128])
  t.deepEqual(rgba('#80808080'), [128, 128, 128, 128])
  t.deepEqual(rgba('#80808000'), [128, 128, 128, 0])

  //

  t.deepEqual(rgba.obj('ff0000'),  ored)
  t.deepEqual(rgba.obj('00ff00'),  ogreen)
  t.deepEqual(rgba.obj('0000ff'),  oblue)
  t.deepEqual(rgba.obj('000000'),  oblack)
  t.deepEqual(rgba.obj('ffffff'),  owhite)
  t.deepEqual(rgba.obj('00g000'),  oblack)

  t.deepEqual(rgba.obj('#ff0000'), ored)
  t.deepEqual(rgba.obj('#00ff00'), ogreen)
  t.deepEqual(rgba.obj('#0000ff'), oblue)
  t.deepEqual(rgba.obj('#000000'), oblack)
  t.deepEqual(rgba.obj('#ffffff'), owhite)
  t.deepEqual(rgba.obj('#00g000'), oblack)

  t.deepEqual(rgba.obj('808080'),    {r:128, g:128, b:128, a:255})
  t.deepEqual(rgba.obj('#808080'),   {r:128, g:128, b:128, a:255})
  t.deepEqual(rgba.obj('80808080'),  {r:128, g:128, b:128, a:128})
  t.deepEqual(rgba.obj('#80808080'), {r:128, g:128, b:128, a:128})
  t.deepEqual(rgba.obj('#80808000'), {r:128, g:128, b:128, a:0})

  //

  t.deepEqual(rgba.css('#ff0000'), cred)
  t.deepEqual(rgba.css('00ff00'),  cgreen)
  t.deepEqual(rgba.css('#0000ff'), cblue)

  t.deepEqual(rgba.css('#80808080'),  'rgba(128, 128, 128, .5019607843137255)')
  t.deepEqual(rgba.css('#80808000'),  'rgba(128, 128, 128, 0)')
  t.deepEqual(rgba.css('#gg8080'),  'rgb(0, 0, 0)')

  t.end()
})

test('rgb', function (t) {

  t.deepEqual(rgba.arr('rgb(255, 0, 0)'),   ared)

  t.deepEqual(rgba('rgb(255, 0, 0)'),   ared)
  t.deepEqual(rgba('rgb(0, 255, 0)'), agreen)
  t.deepEqual(rgba('rgb(0, 0, 255)'),  ablue)

  t.deepEqual(rgba('rgb(0, 0, 256)'),  ablack)
  t.deepEqual(rgba('rgb(0, 0, -1)'),   ablack)
  t.deepEqual(rgba('rgb(0, 0, "12")'), ablack)
  t.deepEqual(rgba('rgba(250, 240, 230, 0.5)'), [250, 240, 230, Math.round(0.5 * 255)])
  t.deepEqual(rgba('rgba(250, 240, 230, .5)'),  [250, 240, 230, Math.round(0.5 * 255)])
  t.deepEqual(rgba('rgba(250, 240, 230, 0)'),   [250, 240, 230, 0])

  t.deepEqual(rgba.obj('rgb(255, 0, 0)'),  ored)
  t.deepEqual(rgba.obj('rgb(0, 255, 0)'),  ogreen)
  t.deepEqual(rgba.obj('rgb(0, 0, 255)'),  oblue)
  t.deepEqual(rgba.obj('rgba(250, 240, 230, .5)'),  {r:250, g:240, b:230, a:Math.round(0.5 * 255)})
  t.deepEqual(rgba.obj('rgba(250, 240, 230, 0)'),   {r:250, g:240, b:230, a:0})

  t.deepEqual(rgba('rgba(255, 0, 0, 1)'),        ared)
  t.deepEqual(rgba('rgba(255, 0, 0, .5)'), [255, 0, 0, Math.round(.5 * 255)])
  t.deepEqual(rgba('rgba(250, 240, 230, .123)'),  [250, 240, 230, Math.round(.123 * 255)])
  t.deepEqual(rgba('rgba(250, 240, 230, 0.123)'), [250, 240, 230, Math.round(.123 * 255)])
  t.deepEqual(rgba('rgba(250, 240, 230, 0)'), [250, 240, 230, 0])
  t.deepEqual(rgba('rgba(256, 240, 230, 1)'),    ablack)
  t.deepEqual(rgba('rgba(250, 240, 230, -.1)'),  ablack)

  //

  t.deepEqual(rgba.css('rgb(255, 0, 0)'), cred)
  t.deepEqual(rgba.css('rgb(0, 255, 0)'), cgreen)
  t.deepEqual(rgba.css('rgb(0, 0, 255)'), cblue)

  t.deepEqual(rgba.css('rgba(250, 240, 230, .123)'),  'rgba(250, 240, 230, .123)')
  t.deepEqual(rgba.css('rgba(250, 240, 230, 0)'),  'rgba(250, 240, 230, 0)')
  t.deepEqual(rgba.css('rgba(256, 240, 230, 0)'),  'rgb(0, 0, 0)')

  t.end()
})

test('object', function (t) {

  t.deepEqual(rgba.arr({r:255}),     ared)

  t.deepEqual(rgba({r:255}),     ared)
  t.deepEqual(rgba({red:255}),   ared)
  t.deepEqual(rgba({g:255}),     agreen)
  t.deepEqual(rgba({green:255}), agreen)
  t.deepEqual(rgba({b:255}),     ablue)
  t.deepEqual(rgba({blue:255}),  ablue)
  t.deepEqual(rgba({a:128}),     [0, 0, 0, 128])
  t.deepEqual(rgba({alpha:128}), [0, 0, 0, 128])

  t.deepEqual(rgba({r:250, g:240, b:230, a:220}),  [250, 240, 230, 220])

  t.deepEqual(rgba({r:256}),  ablack)
  t.deepEqual(rgba({r:-12}),  ablack)
  t.deepEqual(rgba({r:'12'}), ablack)
  t.deepEqual(rgba({r:null}), ablack)
  t.deepEqual(rgba({r:true}), ablack)

  //

  t.deepEqual(rgba.obj({r:255}),     ored)
  t.deepEqual(rgba.obj({red:255}),   ored)
  t.deepEqual(rgba.obj({g:255}),     ogreen)
  t.deepEqual(rgba.obj({green:255}), ogreen)
  t.deepEqual(rgba.obj({b:255}),     oblue)
  t.deepEqual(rgba.obj({blue:255}),  oblue)
  t.deepEqual(rgba.obj({a:128}),     {r:0, g:0, b:0, a:128})
  t.deepEqual(rgba.obj({alpha:128}), {r:0, g:0, b:0, a:128})

  t.deepEqual(rgba.obj({r:250, g:240, b:230, a:220}),  {r:250, g:240, b:230, a:220})

  t.deepEqual(rgba.obj({r:256}),  oblack)
  t.deepEqual(rgba.obj({r:-12}),  oblack)
  t.deepEqual(rgba.obj({r:'12'}), oblack)
  t.deepEqual(rgba.obj({r:null}), oblack)
  t.deepEqual(rgba.obj({r:true}), oblack)

  //

  t.deepEqual(rgba.css({r:255}), cred)
  t.deepEqual(rgba.css({g:255}), cgreen)
  t.deepEqual(rgba.css({b:255}), cblue)
  t.deepEqual(rgba.css({a:128}), 'rgba(0, 0, 0, .5019607843137255)')
  t.deepEqual(rgba.css({r:255, a:255}), 'rgb(255, 0, 0)')
  t.deepEqual(rgba.css({r:255, a:0}), 'rgba(255, 0, 0, 0)')
  t.deepEqual(rgba.css({a:0}), 'rgba(0, 0, 0, 0)')
  t.deepEqual(rgba.css({x:0}), 'rgb(0, 0, 0)')

  t.end()
})

test('hex', function (t) {

  t.deepEqual(rgba.hex('red'),   '#f00')
  t.deepEqual(rgba.hex('green'), '#0f0')
  t.deepEqual(rgba.hex('blue'),  '#00f')
  t.deepEqual(rgba.hex('black'), '#000')
  t.deepEqual(rgba.hex('white'), '#fff')

  t.deepEqual(rgba.hex('#f006'), '#f006')
  t.deepEqual(rgba.hex('#808080ff'), '#808080')
  t.deepEqual(rgba.hex('#80808000'), '#80808000')
  t.deepEqual(rgba.hex('#80808080'), '#80808080')
  t.deepEqual(rgba.hex('#f006'), '#f006')
  t.deepEqual(rgba.hex('#00ff0080'), '#00ff0080')
  t.deepEqual(rgba.hex({green:255, a:128}), '#00ff0080')
  t.deepEqual(rgba.hex({b:255, a:0}), '#00f0')
  t.deepEqual(rgba.hex('rgba(0, 0, 255, .5)'), '#0000ff80')

  t.deepEqual(rgba.hex({r:255}), '#f00')
  t.deepEqual(rgba.hex('rgba(250, 240, 230, .123)'),  '#faf0e61f')

  t.deepEqual(rgba.hex('weird blue'), '#000')
  t.deepEqual(rgba.hex('#fun'), '#000')
  t.deepEqual(rgba.hex({r:256}), '#000')
  t.deepEqual(rgba.hex({r:252.5}), '#000')
  t.deepEqual(rgba.hex({a:252.5}), '#000')
  t.deepEqual(rgba.hex('rgb(256, 0, 0)'), '#000')
  t.deepEqual(rgba.hex('rgb(252.5, 0, 0)'), '#000')
  t.deepEqual(rgba.hex('rgba(255, 0, 0, 1.1)'), '#000')
  t.deepEqual(rgba.hex('rgba(252.5, 0, 0, 1)'), '#000')

  t.end()
})

test('array', function (t) {

  t.deepEqual(rgba([255, 0, 0]),   ared)
  t.deepEqual(rgba([0, 255, 0]), agreen)
  t.deepEqual(rgba([0, 0, 255]),  ablue)

  t.deepEqual(rgba.obj([255, 0, 0]),   ored)
  t.deepEqual(rgba.obj([0, 255, 0]), ogreen)
  t.deepEqual(rgba.obj([0, 0, 255]),  oblue)

  t.deepEqual(rgba.hex([255, 0, 0]),   '#f00')
  t.deepEqual(rgba.hex([0, 255, 0]),   '#0f0')
  t.deepEqual(rgba.hex([0, 0, 255]),   '#00f')
  t.deepEqual(rgba.hex([0, 0, 0]),     '#000')
  t.deepEqual(rgba.hex([0, 0, 0, 255]),'#000')

  t.deepEqual(rgba.css([0, 255, 0, 255]), 'rgb(0, 255, 0)')
  t.deepEqual(rgba.css([0, 0, 0, 128]),   'rgba(0, 0, 0, .5019607843137255)')

  t.deepEqual(rgba([0, 0, 252.5]), ablack)
  t.deepEqual(rgba([0, 0, 256]),   ablack)
  t.deepEqual(rgba([0, 0]),        ablack)
  t.deepEqual(rgba([0, '255', 0]), ablack)

  t.end()
})

test('wrong values', function (t) {

  t.deepEqual(rgba(undefined), ablack)
  t.deepEqual(rgba(null),      ablack)
  t.deepEqual(rgba(""),        ablack)
  t.deepEqual(rgba(12),        ablack)
  t.deepEqual(rgba(12.3),      ablack)
  t.deepEqual(rgba(true),      ablack)
  t.deepEqual(rgba(false),     ablack)

  t.end()
})
