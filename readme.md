# rgba-convert

> Convert rgba values from and to various format

Accepted formats

| Format | Value |
| :------ | :------- |
| **array** | `[r, g, b]` or `[r, g, b, a]` |
| **object** | `{r, g, b}` or `{r, g, b, a}` or `{r}` ... |
| **hex string** | `#rgb` or `#rgba` or `#rrggbb` or `#rrggbbaa` |
| **css string** | `rgb(r, g, b)` or `rgba(r, g, b, a)` |
| **integer** | 4294967295 ≥ `integer` ≥ 0 |
| **css name** | `red` or `green` ... only basic names |

On parse error, return black with full opacity

## Install

```bash
npm i rgba-convert
```

## API

#### rgba(data)

Convert as `[r, g, b, a]` array

Note that `rgba.arr()` is an alias of `rgba()`

```js
const rgba = require('rgba-convert')

// [255, 0, 0, 255]
rgba('red')

// [255, 0, 0, 255]
rgba('f00')
rgba('#f00')

// [255, 0, 0, 102]
rgba('#f006')

// [0, 255, 0, 255]
rgba('00ff00')
rgba('#00ff00')

// [0, 255, 0, 128]
rgba('#00ff0080')

// [255, 0, 0, 255]
rgba({r:255})

// [0, 255, 0, 128]
rgba({green:255, a:128})

// [0, 0, 255, 255]
rgba('rgb(0, 0, 255)')

// [0, 0, 255, 128]
rgba('rgba(0, 0, 255, .5)')

// [0, 0, 255, 0]
rgba(255)

/*
on parse error, fallback on black
[0, 0, 0, 255]
*/
rgba('weird blue')
rgba('#fun')
rgba({r:256})
rgba('rgb(256, 0, 0)')
rgba('rgba(255, 0, 0, 1.1)')
```

#### rgba.obj(data)

Convert as `{r, g, b, a}` object

```js
const rgba = require('rgba-convert')

// {r:255, g:0, b:0, a:255}
rgba.obj('red')

// {r:255, g:0, b:0, a:255}
rgba.obj('#f00')

// {r:255, g:0, b:0, a:102}
rgba.obj('#f006')

// {r:0, g:255, b:0, a:255}
rgba.obj('#00ff00')

// {r:0, g:255, b:0, a:128}
rgba.obj('#00ff0080')

// {r:255, g:0, b:0, a:255}
rgba.obj({r:255})

// {r:0, g:255, b:0, a:128}
rgba.obj({green:255, a:128})

// {r:0, g:0, b:255, a:255}
rgba.obj('rgb(0, 0, 255)')

// {r:0, g:0, b:255, a:128}
rgba.obj('rgba(0, 0, 255, .5)')

// {r:0, g:0, b:255, a:0}
rgba.obj(255)

/*
on parse error, fallback on black
{r:0, g:0, b:0, a:255}
*/
rgba.obj('weird blue')
rgba.obj('#fun')
rgba.obj({r:256})
rgba.obj('rgb(256, 0, 0)')
rgba.obj('rgba(255, 0, 0, 1.1)')
```

#### rgba.css(data)

Convert as `rgb(r, g, b)` or `rgba(r, g, b, a)` string

```js
const rgba = require('rgba-convert')

// 'rgb(255, 0, 0)'
rgba.css('red')

// 'rgb(255, 0, 0)'
rgba.css('#f00')

// 'rgba(255, 0, 0, 0.4)'
rgba.css('#f006')

// 'rgb(0, 255, 0)'
rgba.css('#00ff00')

// 'rgba(0, 255, 0, .5019607843137255)'
rgba.css('#00ff0080')

// 'rgb(255, 0, 0)'
rgba.css({r:255})

// 'rgba(0, 255, 0, .5019607843137255)'
rgba.css({green:255, a:128})

// 'rgba(0, 0, 255, 0)'
rgba.css({b:255, a:0})

// 'rgb(0, 0, 255)'
rgba.css('rgb(0, 0, 255)')

// 'rgba(0, 0, 255, .5)'
rgba.css('rgba(0, 0, 255, .5)')

// 'rgba(0, 0, 255, 0)''
rgba.css(255)

/*
on parse error, fallback on black
'rgb(0, 0, 0)'
*/
rgba.css('weird blue')
rgba.css('#fun')
rgba.css({r:256})
rgba.css('rgb(256, 0, 0)')
rgba.css('rgba(255, 0, 0, 1.1)')
```

#### rgba.hex(data)

Convert as `#rgb` or `#rgba` or `#rrggbb` or `#rrggbbaa` string

```js
const rgba = require('rgba-convert')

// '#f00'
rgba.hex('red')

// '#f00'
rgba.hex('#f00')

// '#f006'
rgba.hex('#f006')

// '#0f0'
rgba.hex('#00ff00')

// '#00ff0080'
rgba.hex('#00ff0080')

// '#f00'
rgba.hex({r:255})

// '#00ff0080'
rgba.hex({green:255, a:128})

// '#00f0'
rgba.hex({b:255, a:0})

// '#00f'
rgba.hex('rgb(0, 0, 255)')

// '#0000ff80'
rgba.hex('rgba(0, 0, 255, .5)')

// '#00f0'
rgba.hex(255)

/*
on parse error, fallback on black
'#000'
*/
rgba.hex('weird blue')
rgba.hex('#fun')
rgba.hex({r:256})
rgba.hex('rgb(256, 0, 0)')
rgba.hex('rgba(255, 0, 0, 1.1)')
```

#### rgba.num(data)

Convert as 4294967295 ≥ `integer` ≥ 0 number

```js
const rgba = require('rgba-convert')

// 4294901760
rgba.num('red')

// 4294901760
rgba.num('#f00')

// 1727987712
rgba.num('#f006')

// 4278255360
rgba.num('#00ff00')

// 2147548928
rgba.num('#00ff0080')

// 4294901760
rgba.num({r:255})

// 2147548928
rgba.num({green:255, a:128})

// 255
rgba.num({b:255, a:0})

// 4278190335
rgba.num('rgb(0, 0, 255)')

// 2147483903
rgba.num('rgba(0, 0, 255, .5)')

// 255
rgba.num(255)

/*
on parse error, fallback on black
4278190080
*/
rgba.num('weird blue')
rgba.num('#fun')
rgba.num({r:256})
rgba.num('rgb(256, 0, 0)')
rgba.num('rgba(255, 0, 0, 1.1)')
```

## License

MIT
