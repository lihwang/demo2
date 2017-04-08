;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-shaixuan" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M921.6 686.08h-245.76c-10.24 0-20.48-10.24-20.48-20.48s10.24-20.48 20.48-20.48H921.6c10.24 0 20.48 10.24 20.48 20.48s-10.24 20.48-20.48 20.48z m0-122.88h-245.76c-10.24 0-20.48-10.24-20.48-20.48s10.24-20.48 20.48-20.48H921.6c10.24 0 20.48 10.24 20.48 20.48s-10.24 20.48-20.48 20.48z m-166.4-289.28c-2.56 2.56-243.2 227.84-243.2 227.84v389.12l-163.84-81.92v-307.2L112.64 281.6c-2.56-2.56-5.12-5.12-7.68-5.12-15.36-15.36-23.04-35.84-23.04-58.88 0-46.08 38.4-84.48 84.48-84.48h527.36c46.08 0 84.48 38.4 84.48 84.48 0 23.04-10.24 43.52-23.04 56.32zM693.76 179.2H166.4C145.92 179.2 128 197.12 128 217.6c0 10.24 2.56 20.48 10.24 25.6l2.56 2.56 227.84 215.04 15.36 12.8 2.56 25.6-2.56 273.92 81.92 40.96V473.6l15.36-12.8 230.4-212.48 2.56-2.56c7.68-7.68 10.24-15.36 10.24-25.6 7.68-23.04-10.24-40.96-30.72-40.96z m-17.92 588.8H921.6c10.24 0 20.48 10.24 20.48 20.48s-10.24 20.48-20.48 20.48h-245.76c-10.24 0-20.48-10.24-20.48-20.48 0-12.8 7.68-20.48 20.48-20.48z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)