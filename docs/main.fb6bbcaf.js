// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/drawImage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function drawImage(canvas) {
  if (canvas.getContext) {
    var context = canvas.getContext('2d');
    var img = new Image();
    img.src = 'bg.jpg';

    img.onload = function () {
      return _onImageLoad(img, canvas, context);
    };
  }
}

function _onImageLoad(img, canvas, context) {
  var loadedImageWidth = img.width;
  var loadedImageHeight = img.height;
  var _ref = [loadedImageWidth + 88, loadedImageHeight + 132];
  canvas.width = _ref[0];
  canvas.height = _ref[1];
  // get the top left position of the image in order to center the image within the canvas
  var x = canvas.width / 2 - img.width / 2;
  var y = canvas.height / 2 - img.height / 2;
  context.drawImage(img, x, y, img.width, img.height);
}

exports.default = drawImage;
},{}],"js/utils.js":[function(require,module,exports) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTimeout = exports.rgbToHex = exports.getImgData = exports.rgb2hsl = void 0;

var rgb2hsl = function rgb2hsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h,
      s,
      l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
};

exports.rgb2hsl = rgb2hsl;

var getImgData = function getImgData(event, canvas) {
  var rect = event.target.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  var context = canvas.getContext('2d');
  var imgData = context.getImageData(x, y, 1, 1);

  var _imgData$data = _slicedToArray(imgData.data, 3),
      r = _imgData$data[0],
      g = _imgData$data[1],
      b = _imgData$data[2];

  return {
    x: x,
    y: y,
    r: r,
    g: g,
    b: b
  };
};

exports.getImgData = getImgData;

var rgbToHex = function rgbToHex(r, g, b) {
  var int2hex = function int2hex(num) {
    return (Math.round(num) < 16 ? '0' : '') + Math.round(num).toString(16);
  };

  return "#".concat(int2hex(r)).concat(int2hex(g)).concat(int2hex(b));
};

exports.rgbToHex = rgbToHex;

var createTimeout = function createTimeout(listener) {
  var id = setTimeout(listener, 700);
  return function () {
    clearTimeout(id);
  };
};

exports.createTimeout = createTimeout;
},{}],"js/colorSelected.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

function colorSelected(event, _ref) {
  var mainTag = _ref.mainTag,
      copyBtnText = _ref.copyBtnText,
      copyBtnShowBox = _ref.copyBtnShowBox,
      copyButton = _ref.copyButton,
      circle = _ref.circle,
      hexTextOnHover = _ref.hexTextOnHover;
  var _event$detail = event.detail,
      r = _event$detail.r,
      g = _event$detail.g,
      b = _event$detail.b;
  var hexText = (0, utils_1.rgbToHex)(r, g, b);
  copyBtnText.innerHTML = hexText;
  copyBtnShowBox.style.backgroundColor = hexText;
  circle.style.borderColor = 'transparent';
  copyButton.removeAttribute('disabled');
  hexTextOnHover.style.opacity = '0';
  hexTextOnHover.style.backgroundColor = '#dfe6e9';
  mainTag.setAttribute('tooltip', 'Color picked!');
  var mainTagTimeout = (0, utils_1.createTimeout)(function () {
    mainTag.removeAttribute('tooltip');
  });

  window.onbeforeunload = function () {
    mainTagTimeout();
  };
}

exports.default = colorSelected;
},{"./utils":"js/utils.js"}],"js/pickColor.js":[function(require,module,exports) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

function pickColor(event, _ref) {
  var canvas = _ref.canvas;

  var _ref2 = (0, utils_1.getImgData)(event, canvas),
      r = _ref2.r,
      g = _ref2.g,
      b = _ref2.b;

  var _ref3 = (0, utils_1.rgb2hsl)(r, g, b),
      _ref4 = _slicedToArray(_ref3, 3),
      h = _ref4[0],
      s = _ref4[1],
      l = _ref4[2];

  canvas.dispatchEvent(new CustomEvent('color-selected', {
    bubbles: true,
    detail: {
      r: r,
      g: g,
      b: b,
      h: h,
      s: s,
      l: l
    }
  }));
}

exports.default = pickColor;
},{"./utils":"js/utils.js"}],"js/renderPicker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

function renderPicker(event, _ref) {
  var canvas = _ref.canvas,
      circle = _ref.circle,
      hexTextOnHover = _ref.hexTextOnHover;

  var _ref2 = (0, utils_1.getImgData)(event, canvas),
      x = _ref2.x,
      y = _ref2.y,
      r = _ref2.r,
      g = _ref2.g,
      b = _ref2.b;

  hexTextOnHover.innerText = (0, utils_1.rgbToHex)(r, g, b);
  hexTextOnHover.style.opacity = '1';
  hexTextOnHover.style.top = y - 72 + 'px';
  hexTextOnHover.style.left = x - 42 + 'px';
  circle.style.top = y - 42 + 'px';
  circle.style.left = x - 42 + 'px';
  circle.style.borderColor = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
}

exports.default = renderPicker;
},{"./utils":"js/utils.js"}],"js/copyText.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

function copyText(_ref) {
  var copyBtnText = _ref.copyBtnText,
      copyButton = _ref.copyButton;

  if (copyBtnText === null || copyBtnText === void 0 ? void 0 : copyBtnText.innerText) {
    navigator.clipboard.writeText(copyBtnText.innerText).then(function () {
      copyButton.setAttribute('tooltip', 'Copied!');
    }, function () {
      console.log('Something went wrong when trying to copy to clipboard.');
    });
    var copyButtonTimeout = (0, utils_1.createTimeout)(function () {
      copyButton.removeAttribute('tooltip');
    });

    window.onbeforeunload = function () {
      copyButtonTimeout();
    };
  }
}

exports.default = copyText;
},{"./utils":"js/utils.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var drawImage_1 = require("./drawImage");

var colorSelected_1 = require("./colorSelected");

var pickColor_1 = require("./pickColor");

var renderPicker_1 = require("./renderPicker");

var copyText_1 = require("./copyText");

function init() {
  var allElements = Object.assign(Object.assign({}, _selectElements()), _createElements());
  var container = allElements.container,
      circle = allElements.circle,
      canvas = allElements.canvas,
      hexTextOnHover = allElements.hexTextOnHover,
      copyButton = allElements.copyButton,
      pickerBtn = allElements.pickerBtn;

  var clickListener = function clickListener(e) {
    return (0, pickColor_1.default)(e, allElements);
  };

  var mouseMoveListener = function mouseMoveListener(e) {
    return (0, renderPicker_1.default)(e, allElements);
  };

  container.style.position = 'relative';
  circle.classList.add('circle');
  container.appendChild(circle);
  container.appendChild(hexTextOnHover);
  container.appendChild(canvas);
  pickerBtn.addEventListener('click', function () {
    return _startColorPicking(mouseMoveListener, clickListener, allElements);
  });
  copyButton.addEventListener('click', function () {
    return (0, copyText_1.default)(allElements);
  });
  canvas.addEventListener('color-selected', function () {
    return _stopColorPicking(mouseMoveListener, clickListener, allElements);
  });
  canvas.addEventListener('color-selected', function (e) {
    return (0, colorSelected_1.default)(e, allElements);
  });
  (0, drawImage_1.default)(canvas);
}

function _selectElements() {
  var container = document.querySelector('.color-picker-wrapper');
  var pickerBtn = document.querySelector('.btn-picker');
  var pickerBtnGlow = document.querySelector('.btn-picker-glow');
  var copyBtnText = document.querySelector('.btn-copy-text');
  var copyBtnShowBox = document.querySelector('.btn-copy-color-show-box');
  var copyButton = document.querySelector('.btn-copy');
  var mainTag = document.querySelector('main');

  if (copyBtnText === null || copyBtnText === void 0 ? void 0 : copyBtnText.innerText) {
    copyButton.disabled = true;
  }

  return {
    container: container,
    copyBtnText: copyBtnText,
    copyBtnShowBox: copyBtnShowBox,
    pickerBtn: pickerBtn,
    pickerBtnGlow: pickerBtnGlow,
    copyButton: copyButton,
    mainTag: mainTag
  };
}

function _createElements() {
  var canvas = document.createElement('canvas');
  var circle = document.createElement('div');
  var hexTextOnHover = document.createElement('span');
  hexTextOnHover.classList.add('text');
  return {
    canvas: canvas,
    circle: circle,
    hexTextOnHover: hexTextOnHover
  };
}

function _startColorPicking(mouseMoveListener, clickListener, _ref) {
  var canvas = _ref.canvas,
      pickerBtnGlow = _ref.pickerBtnGlow;
  canvas.addEventListener('click', clickListener);
  canvas.addEventListener('mousemove', mouseMoveListener);
  pickerBtnGlow.classList.add('active');
}

function _stopColorPicking(mouseMoveListener, clickListener, _ref2) {
  var canvas = _ref2.canvas,
      pickerBtnGlow = _ref2.pickerBtnGlow;
  canvas.removeEventListener('mousemove', mouseMoveListener);
  canvas.removeEventListener('click', clickListener);
  pickerBtnGlow.classList.remove('active');
}

init();
},{"./drawImage":"js/drawImage.js","./colorSelected":"js/colorSelected.js","./pickColor":"js/pickColor.js","./renderPicker":"js/renderPicker.js","./copyText":"js/copyText.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55398" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map
