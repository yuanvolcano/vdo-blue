export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  var classList = el.className.split(' ')
  classList.push(className)
  el.className = classList.join(' ')
}

export function removeClass (el, className) {
  if (!hasClass(el, className)) {
    return
  }
  var classList = el.className.split(' ')
  let index = classList.findIndex(item => item === className)
  classList.splice(index, 1);
  el.className = classList.join(' ')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function getData (el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style

let verder = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    o: 'oTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle (style) {
  if (verder === false) {
    return false
  }
  if (verder === 'standard') {
    return style
  }
  return verder + style.charAt(0).toUpperCase() + style.substr(1)
}
