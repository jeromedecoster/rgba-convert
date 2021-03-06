
module.exports     = arr
module.exports.arr = arr
module.exports.obj = obj
module.exports.css = css
module.exports.hex = hex
module.exports.num = num

function arr(data) {
  var a = parse(data)
  if (a.length == 3) {
    return a.concat(255)
  } else {
    a[3] = Math.round(a[3])
    return a
  }
}

function obj(data) {
  var a = parse(data)
  return {
    r: a[0],
    g: a[1],
    b: a[2],
    a: a.length == 3
      ? 255
      : Math.round(a[3])
  }
}

function css(data) {
  var a = parse(data)
  if (a.length == 3) a.push(255)

  return a[3] == 255
    ? 'rgb(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')'
    : a[3] == 0
      ? 'rgba(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', 0)'
      : 'rgba(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + String(a[3] / 255).substr(1) + ')'
}

function hex(data) {
  var a = parse(data)
  if (a.length == 3) a.push(255)
  var opaque = a[3] == 255
  var r = num2hex(a[0])
  var g = num2hex(a[1])
  var b = num2hex(a[2])
  var a = num2hex(Math.round(a[3]))
  var is = isshort(r, g, b, a)
  if (opaque) {
    return is
      ? '#' + r.charAt(0) + g.charAt(0) + b.charAt(0)
      : '#' + r + g + b
  }
  return is
    ? '#' + r.charAt(0) + g.charAt(0) + b.charAt(0) + a.charAt(0)
    : '#' + r + g + b + a
}

function num(data) {
  var a = parse(data)
  if (a.length == 3) a.push(255)
  else a[3] = Math.round(a[3])
  return ((a[3] << 24) >>> 0 | a[0] << 16 | a[1] << 8 | a[2]) >>> 0
}

function parse(data) {
  if (typeof data == 'string') {
    data = data.toLowerCase()
    return name(data)
      || hex3(data)
      || hex6(data)
      || rgb(data)
      || rgba(data)
      || [0, 0, 0, 255]
  }
  return object(data)
    || array(data)
    || number(data)
    || [0, 0, 0, 255]
}

function num2hex(num) {
  var s = num.toString(16)
  return s.length == 1
    ? '0' + s
    : s
}

function isshort(r, g, b, a) {
  var h = ['ff', '00', '11', '22', '33', '44', '55', '66',
           '77', '88', '99', 'aa', 'bb', 'cc', 'dd', 'ee']
  return h.indexOf(r) != -1
    && h.indexOf(g) != -1
    && h.indexOf(b) != -1
    && h.indexOf(a) != -1
}

function name(str) {
  if (str == 'red')     return [255, 0, 0]
  if (str == 'green')   return [0, 255, 0]
  if (str == 'blue')    return [0, 0, 255]
  if (str == 'black')   return [0, 0, 0]
  if (str == 'white')   return [255, 255, 255]
  if (str == 'cyan')    return [0, 255, 255]
  if (str == 'gray')    return [128, 128, 128]
  if (str == 'grey')    return [128, 128, 128]
  if (str == 'magenta') return [255, 0, 255]
  // ok, not the real css `pink` but my personal `magenta` alias
  // `pink` is simpler than `fuchsia`, whatever...
  if (str == 'pink')    return [255, 0, 255]
  if (str == 'yellow')  return [255, 255, 0]
}

function hex2num(str) {
  return str.length == 1
    ? parseInt(str + str, 16)
    : parseInt(str, 16)
}

function hex3(str) {
  var s = str.replace(/^#/,'')
  var l = s.length
  if (l == 3 || l == 4) {
    var r = hex2num(s[0])
    var g = hex2num(s[1])
    var b = hex2num(s[2])
    var a = l == 3
      ? 255
      : hex2num(s[3])

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return

    return [r, g, b, a]
  }
}

function hex6(str) {
  var s = str.replace(/^#/,'')
  var l = s.length
  if (l == 6 || l == 8) {
    var r = hex2num(s.slice(0, 2))
    var g = hex2num(s.slice(2, 4))
    var b = hex2num(s.slice(4, 6))
    var a = l == 6
      ? 255
      : hex2num(s.slice(6, 8))

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return

    return [r, g, b, a]
  }
}

function getnum(val, integer) {
  if (typeof val != 'number') return -1
  if (integer === true && Math.floor(val) !== val) return -1
  return val >= 0 && val <= 255
    ? val
    : -1
}

function object(obj) {
  if (Object.prototype.toString.call(obj) === '[object Object]'
    && Object.getPrototypeOf(obj) === Object.getPrototypeOf({})) {
    var r = getnum(obj.r != undefined ? obj.r : obj.red   != undefined ? obj.red   : 0,   true)
    var g = getnum(obj.g != undefined ? obj.g : obj.green != undefined ? obj.green : 0,   true)
    var b = getnum(obj.b != undefined ? obj.b : obj.blue  != undefined ? obj.blue  : 0,   true)
    var a = getnum(obj.a != undefined ? obj.a : obj.alpha != undefined ? obj.alpha : 255, true)
    if (r != -1 && g != -1 && b != -1 && a != -1) {
      return [r, g, b, a]
    }
  }
}

function array(arr) {
  if (Array.isArray(arr) && (arr.length == 3 || arr.length == 4)) {
    var r = getnum(arr[0],   true)
    var g = getnum(arr[1],   true)
    var b = getnum(arr[2],   true)
    var a = getnum(arr[3] != undefined ? arr[3] : 255, true)
    if (r != -1 && g != -1 && b != -1 && a != -1) {
      return [r, g, b, a]
    }
  }
}

function number(num) {
  if (typeof num == 'number' && Math.floor(num) == num && num <= 4294967295 && num >= 0) {
    var a = num >> 24 & 255
    var r = num >> 16 & 255
    var g = num >> 8  & 255
    var b = num & 255
    return [r, g, b, a]
  }
}

function rgb(str) {
  if (str.substr(0, 4) == 'rgb(') {
    str = str.match(/^rgb\(([^)]+)\)/)[1]
    var t = str.split(/ *, */).map(Number)
    var r = getnum(t[0], true)
    var g = getnum(t[1], true)
    var b = getnum(t[2], true)
    if (r != -1 && g != -1 && b != -1) {
      return [r, g, b, 255]
    }
  }
}

function rgba(str) {
  if (str.substr(0, 5) == 'rgba(') {
    str = str.match(/^rgba\(([^)]+)\)/)[1]
    var t = str.split(/ *, */).map(Number)
    var r = getnum(t[0], true)
    var g = getnum(t[1], true)
    var b = getnum(t[2], true)
    var a = getnum(t[3] * 255)
    if (r != -1 && g != -1 && b != -1 && a != -1) {
      return [r, g, b, a]
    }
  }
}
