(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _menu = require('./modules/menu');

var _menu2 = _interopRequireDefault(_menu);

var _form = require('./modules/form');

var _form2 = _interopRequireDefault(_form);

var _pageTransitions = require('./modules/pageTransitions');

var _pageTransitions2 = _interopRequireDefault(_pageTransitions);

var _webfontLoader = require('./modules/webfont-loader');

var _webfontLoader2 = _interopRequireDefault(_webfontLoader);

var _parallax = require('./modules/parallax');

var _parallax2 = _interopRequireDefault(_parallax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.require = require;

},{"./modules/form":2,"./modules/menu":3,"./modules/pageTransitions":4,"./modules/parallax":5,"./modules/webfont-loader":9}],2:[function(require,module,exports){
'use strict';

var $input = $('.form__input');

function checkForInput(element) {
    var $label = $(element).siblings('label');

    if ($(element).val().length > 0) {
        $label.addClass('has-value');
    } else {
        $label.removeClass('has-value');
    }
}

// The lines below are executed on page load
$input.each(function () {
    checkForInput(this);
});

// The lines below (inside) are executed on change & keyup
$input.on('change keyup', function () {
    checkForInput(this);
});

},{}],3:[function(require,module,exports){
'use strict';

var _multiple = require('multiple.js');

var _multiple2 = _interopRequireDefault(_multiple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $body = $('body'),
    $hamburger = $('.menu__hamburger'),
    $mask = $('.menu__mask'),
    $checkbox = $('.menu__checkbox'),
    $menuLink = $('.menu__link'),
    $menuList = $('.menu__list'),
    activeMenuClass = 'menu-is-active',
    activeClass = 'is-active';

// Hamburger click event
$hamburger.click(function () {
    if ($body.hasClass(activeMenuClass)) {
        $body.removeClass(activeMenuClass);
    } else {
        $body.addClass(activeMenuClass);
    }
});

// Link click event
$menuLink.click(function (e) {
    $body.removeClass(activeMenuClass);
    $checkbox.prop('checked', false);
    $menuLink.removeClass(activeClass);
    $(this).addClass(activeClass);
});

// Mask click event
$mask.click(function () {
    if ($body.hasClass(activeMenuClass)) {
        $body.removeClass(activeMenuClass);
        $checkbox.prop('checked', false);
    } else {
        $body.addClass(activeMenuClass);
    }
});

$menuLink.hover(function () {
    var data = $(this).data('title');
    $menuList.attr('data-title', data);
    $menuList.toggleClass('is-hovered');
});

// Sticky header
// function sticky() {

//     const $header = $('.header')
//     const $window = $(window)
//     const stickyClass = 'is-sticky'
//     const top = $header.offset().top + 1

//     $window.scroll(function() {
//         if ($window.scrollTop() >= top) {
//             $header.addClass(stickyClass)
//         } else {
//             $header.removeClass(stickyClass)
//         }
//     })


//     // Adding active states on scroll
//     const sections = $('.js-content-section')
//     const nav = $('nav')
//     const nav_height = nav.outerHeight()

//     $(window).on('scroll', function () {

//         // current position
//         const cur_pos = $(this).scrollTop()

//         // iterate over each of the sections
//         sections.each(function() {
//             const top = $(this).offset().top - nav_height
//             const bottom = top + $(this).outerHeight()

//             if (cur_pos >= top && cur_pos <= bottom) {
//                 nav.find('a').removeClass('is-active')
//                 sections.removeClass('is-active')

//                 $(this).addClass('is-active')
//                 nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('is-active')
//             } else {
//                 $(this).removeClass('is-active')
//                 nav.find('a[href="#'+$(this).attr('id')+'"]').removeClass('is-active')
//             }
//         })
//     })

// }

// export default { sticky }

},{"multiple.js":11}],4:[function(require,module,exports){
'use strict';

var _barba = require('barba.js');

var _barba2 = _interopRequireDefault(_barba);

var _scrollReveal = require('./scrollReveal.js');

var _scrollReveal2 = _interopRequireDefault(_scrollReveal);

var _smoothScrolling = require('./smoothScrolling.js');

var _smoothScrolling2 = _interopRequireDefault(_smoothScrolling);

var _social = require('./social.js');

var _social2 = _interopRequireDefault(_social);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FadeTransition = _barba2.default.BaseTransition.extend({
  start: function start() {
    Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
  },

  fadeOut: function fadeOut() {
    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function fadeIn() {

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    $(window).scrollTop(0); // scroll to top here

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility: 'visible',
      opacity: 0
    });

    $el.animate({ opacity: 1 }, 400, function () {
      _this.done();
    });
  }
});

_barba2.default.Dispatcher.on('transitionCompleted', function (container) {
  //revealFunction.reveal()
  _social2.default.social();
  _smoothScrolling2.default.scroll();
});

_barba2.default.Pjax.getTransition = function () {
  return FadeTransition;
};

_barba2.default.Prefetch.init();
_barba2.default.Pjax.start();

},{"./scrollReveal.js":6,"./smoothScrolling.js":7,"./social.js":8,"barba.js":10}],5:[function(require,module,exports){
// import { TweenLite, Elastic, CSSPlugin, TimelineLite } from "gsap"

// // Elements
// const $vertical = $('.js-p-vertical')

// // Timeline
// const tl = new TimelineLite({paused:true})

// $vertical.each(function(i, box){
//     var $element = $(box);
//     TweenLite.staggerTo($element, 0.3, {css:{ y:500 }, ease:Back.easeOut})
// })

// $(window).scroll(function(e){
//     const scrollTop = $(window).scrollTop()
//     const docHeight = $(document).height()
//     const winHeight = $(window).height()
//     const scrollPercent = (scrollTop) / (docHeight - winHeight)

//     tl.progress( scrollPercent ).pause()
// })
"use strict";

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _skrollr = require('skrollr');

var _skrollr2 = _interopRequireDefault(_skrollr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reveal() {
    (function ($) {
        var s = _skrollr2.default.init({
            render: function render(data) {
                //Debugging - Log the current scroll position.
                console.log(data.curTop);
            }
        });
    });
}

exports.default = { reveal: reveal };

},{"skrollr":12}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function scroll() {
  var $anchor = $('.js-smooth-scroll');
  var nav = $('.header');
  var nav_height = nav.outerHeight();

  $anchor.on('click', function (event) {
    var href = $(this).attr('href');

    if (this.hash !== "") {
      if (!href.charAt(0) == '#') {
        event.preventDefault();
      }

      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - nav_height
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });

  // $(window).on("load", function () {
  //   var urlHash = window.location.href.split("#")[1]
  //   $('html,body').animate({
  //       scrollTop: $('#' + urlHash).offset().top
  //   }, 4000)
  // })
}

exports.default = { scroll: scroll };

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function social() {
    var $socialWindow = $('.js-social-window');

    $socialWindow.on('click', function () {
        console.log('clicked');
        window.open(this.href, "Social", "width=800, height=600");
        return false;
    });
}

exports.default = { social: social };

},{}],9:[function(require,module,exports){
'use strict';

var _webfontloader = require('webfontloader');

var _webfontloader2 = _interopRequireDefault(_webfontloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_webfontloader2.default.load({
    google: {
        families: ['Montserrat:400,500,700']
    }
});

},{"webfontloader":13}],10:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Barba", [], factory);
	else if(typeof exports === 'object')
		exports["Barba"] = factory();
	else
		root["Barba"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8080/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//Promise polyfill https://github.com/taylorhakes/promise-polyfill
	
	if (typeof Promise !== 'function') {
	 window.Promise = __webpack_require__(1);
	}
	
	var Barba = {
	  version: '1.0.0',
	  BaseTransition: __webpack_require__(4),
	  BaseView: __webpack_require__(6),
	  BaseCache: __webpack_require__(8),
	  Dispatcher: __webpack_require__(7),
	  HistoryManager: __webpack_require__(9),
	  Pjax: __webpack_require__(10),
	  Prefetch: __webpack_require__(13),
	  Utils: __webpack_require__(5)
	};
	
	module.exports = Barba;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {
	
	  // Store setTimeout reference so promise-polyfill will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var setTimeoutFunc = setTimeout;
	
	  function noop() {
	  }
	
	  // Use polyfill for setImmediate for performance gains
	  var asap = (typeof setImmediate === 'function' && setImmediate) ||
	    function (fn) {
	      setTimeoutFunc(fn, 0);
	    };
	
	  var onUnhandledRejection = function onUnhandledRejection(err) {
	    if (typeof console !== 'undefined' && console) {
	      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
	    }
	  };
	
	  // Polyfill for Function.prototype.bind
	  function bind(fn, thisArg) {
	    return function () {
	      fn.apply(thisArg, arguments);
	    };
	  }
	
	  function Promise(fn) {
	    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
	    if (typeof fn !== 'function') throw new TypeError('not a function');
	    this._state = 0;
	    this._handled = false;
	    this._value = undefined;
	    this._deferreds = [];
	
	    doResolve(fn, this);
	  }
	
	  function handle(self, deferred) {
	    while (self._state === 3) {
	      self = self._value;
	    }
	    if (self._state === 0) {
	      self._deferreds.push(deferred);
	      return;
	    }
	    self._handled = true;
	    asap(function () {
	      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
	      if (cb === null) {
	        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
	        return;
	      }
	      var ret;
	      try {
	        ret = cb(self._value);
	      } catch (e) {
	        reject(deferred.promise, e);
	        return;
	      }
	      resolve(deferred.promise, ret);
	    });
	  }
	
	  function resolve(self, newValue) {
	    try {
	      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
	      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
	        var then = newValue.then;
	        if (newValue instanceof Promise) {
	          self._state = 3;
	          self._value = newValue;
	          finale(self);
	          return;
	        } else if (typeof then === 'function') {
	          doResolve(bind(then, newValue), self);
	          return;
	        }
	      }
	      self._state = 1;
	      self._value = newValue;
	      finale(self);
	    } catch (e) {
	      reject(self, e);
	    }
	  }
	
	  function reject(self, newValue) {
	    self._state = 2;
	    self._value = newValue;
	    finale(self);
	  }
	
	  function finale(self) {
	    if (self._state === 2 && self._deferreds.length === 0) {
	      asap(function() {
	        if (!self._handled) {
	          onUnhandledRejection(self._value);
	        }
	      });
	    }
	
	    for (var i = 0, len = self._deferreds.length; i < len; i++) {
	      handle(self, self._deferreds[i]);
	    }
	    self._deferreds = null;
	  }
	
	  function Handler(onFulfilled, onRejected, promise) {
	    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	    this.promise = promise;
	  }
	
	  /**
	   * Take a potentially misbehaving resolver function and make sure
	   * onFulfilled and onRejected are only called once.
	   *
	   * Makes no guarantees about asynchrony.
	   */
	  function doResolve(fn, self) {
	    var done = false;
	    try {
	      fn(function (value) {
	        if (done) return;
	        done = true;
	        resolve(self, value);
	      }, function (reason) {
	        if (done) return;
	        done = true;
	        reject(self, reason);
	      });
	    } catch (ex) {
	      if (done) return;
	      done = true;
	      reject(self, ex);
	    }
	  }
	
	  Promise.prototype['catch'] = function (onRejected) {
	    return this.then(null, onRejected);
	  };
	
	  Promise.prototype.then = function (onFulfilled, onRejected) {
	    var prom = new (this.constructor)(noop);
	
	    handle(this, new Handler(onFulfilled, onRejected, prom));
	    return prom;
	  };
	
	  Promise.all = function (arr) {
	    var args = Array.prototype.slice.call(arr);
	
	    return new Promise(function (resolve, reject) {
	      if (args.length === 0) return resolve([]);
	      var remaining = args.length;
	
	      function res(i, val) {
	        try {
	          if (val && (typeof val === 'object' || typeof val === 'function')) {
	            var then = val.then;
	            if (typeof then === 'function') {
	              then.call(val, function (val) {
	                res(i, val);
	              }, reject);
	              return;
	            }
	          }
	          args[i] = val;
	          if (--remaining === 0) {
	            resolve(args);
	          }
	        } catch (ex) {
	          reject(ex);
	        }
	      }
	
	      for (var i = 0; i < args.length; i++) {
	        res(i, args[i]);
	      }
	    });
	  };
	
	  Promise.resolve = function (value) {
	    if (value && typeof value === 'object' && value.constructor === Promise) {
	      return value;
	    }
	
	    return new Promise(function (resolve) {
	      resolve(value);
	    });
	  };
	
	  Promise.reject = function (value) {
	    return new Promise(function (resolve, reject) {
	      reject(value);
	    });
	  };
	
	  Promise.race = function (values) {
	    return new Promise(function (resolve, reject) {
	      for (var i = 0, len = values.length; i < len; i++) {
	        values[i].then(resolve, reject);
	      }
	    });
	  };
	
	  /**
	   * Set the immediate function to execute callbacks
	   * @param fn {function} Function to execute
	   * @private
	   */
	  Promise._setImmediateFn = function _setImmediateFn(fn) {
	    asap = fn;
	  };
	
	  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
	    onUnhandledRejection = fn;
	  };
	
	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = Promise;
	  } else if (!root.Promise) {
	    root.Promise = Promise;
	  }
	
	})(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(3).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, __webpack_require__(2).clearImmediate))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	
	/**
	 * BaseTransition to extend
	 *
	 * @namespace Barba.BaseTransition
	 * @type {Object}
	 */
	var BaseTransition = {
	  /**
	   * @memberOf Barba.BaseTransition
	   * @type {HTMLElement}
	   */
	  oldContainer: undefined,
	
	  /**
	   * @memberOf Barba.BaseTransition
	   * @type {HTMLElement}
	   */
	  newContainer: undefined,
	
	  /**
	   * @memberOf Barba.BaseTransition
	   * @type {Promise}
	   */
	  newContainerLoading: undefined,
	
	  /**
	   * Helper to extend the object
	   *
	   * @memberOf Barba.BaseTransition
	   * @param  {Object} newObject
	   * @return {Object} newInheritObject
	   */
	  extend: function(obj){
	    return Utils.extend(this, obj);
	  },
	
	  /**
	   * This function is called from Pjax module to initialize
	   * the transition.
	   *
	   * @memberOf Barba.BaseTransition
	   * @private
	   * @param  {HTMLElement} oldContainer
	   * @param  {Promise} newContainer
	   * @return {Promise}
	   */
	  init: function(oldContainer, newContainer) {
	    var _this = this;
	
	    this.oldContainer = oldContainer;
	    this._newContainerPromise = newContainer;
	
	    this.deferred = Utils.deferred();
	    this.newContainerReady = Utils.deferred();
	    this.newContainerLoading = this.newContainerReady.promise;
	
	    this.start();
	
	    this._newContainerPromise.then(function(newContainer) {
	      _this.newContainer = newContainer;
	      _this.newContainerReady.resolve();
	    });
	
	    return this.deferred.promise;
	  },
	
	  /**
	   * This function needs to be called as soon the Transition is finished
	   *
	   * @memberOf Barba.BaseTransition
	   */
	  done: function() {
	    this.oldContainer.parentNode.removeChild(this.oldContainer);
	    this.newContainer.style.visibility = 'visible';
	    this.deferred.resolve();
	  },
	
	  /**
	   * Constructor for your Transition
	   *
	   * @memberOf Barba.BaseTransition
	   * @abstract
	   */
	  start: function() {},
	};
	
	module.exports = BaseTransition;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Just an object with some helpful functions
	 *
	 * @type {Object}
	 * @namespace Barba.Utils
	 */
	var Utils = {
	  /**
	   * Return the current url
	   *
	   * @memberOf Barba.Utils
	   * @return {String} currentUrl
	   */
	  getCurrentUrl: function() {
	    return window.location.protocol + '//' +
	           window.location.host +
	           window.location.pathname +
	           window.location.search;
	  },
	
	  /**
	   * Given an url, return it without the hash
	   *
	   * @memberOf Barba.Utils
	   * @private
	   * @param  {String} url
	   * @return {String} newCleanUrl
	   */
	  cleanLink: function(url) {
	    return url.replace(/#.*/, '');
	  },
	
	  /**
	   * Time in millisecond after the xhr request goes in timeout
	   *
	   * @memberOf Barba.Utils
	   * @type {Number}
	   * @default
	   */
	  xhrTimeout: 5000,
	
	  /**
	   * Start an XMLHttpRequest() and return a Promise
	   *
	   * @memberOf Barba.Utils
	   * @param  {String} url
	   * @return {Promise}
	   */
	  xhr: function(url) {
	    var deferred = this.deferred();
	    var req = new XMLHttpRequest();
	
	    req.onreadystatechange = function() {
	      if (req.readyState === 4) {
	        if (req.status === 200) {
	          return deferred.resolve(req.responseText);
	        } else {
	          return deferred.reject(new Error('xhr: HTTP code is not 200'));
	        }
	      }
	    };
	
	    req.ontimeout = function() {
	      return deferred.reject(new Error('xhr: Timeout exceeded'));
	    };
	
	    req.open('GET', url);
	    req.timeout = this.xhrTimeout;
	    req.setRequestHeader('x-barba', 'yes');
	    req.send();
	
	    return deferred.promise;
	  },
	
	  /**
	   * Get obj and props and return a new object with the property merged
	   *
	   * @memberOf Barba.Utils
	   * @param  {object} obj
	   * @param  {object} props
	   * @return {object}
	   */
	  extend: function(obj, props) {
	    var newObj = Object.create(obj);
	
	    for(var prop in props) {
	      if(props.hasOwnProperty(prop)) {
	        newObj[prop] = props[prop];
	      }
	    }
	
	    return newObj;
	  },
	
	  /**
	   * Return a new "Deferred" object
	   * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
	   *
	   * @memberOf Barba.Utils
	   * @return {Deferred}
	   */
	  deferred: function() {
	    return new function() {
	      this.resolve = null;
	      this.reject = null;
	
	      this.promise = new Promise(function(resolve, reject) {
	        this.resolve = resolve;
	        this.reject = reject;
	      }.bind(this));
	    };
	  },
	
	  /**
	   * Return the port number normalized, eventually you can pass a string to be normalized.
	   *
	   * @memberOf Barba.Utils
	   * @private
	   * @param  {String} p
	   * @return {Int} port
	   */
	  getPort: function(p) {
	    var port = typeof p !== 'undefined' ? p : window.location.port;
	    var protocol = window.location.protocol;
	
	    if (port != '')
	      return parseInt(port);
	
	    if (protocol === 'http:')
	      return 80;
	
	    if (protocol === 'https:')
	      return 443;
	  }
	};
	
	module.exports = Utils;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Dispatcher = __webpack_require__(7);
	var Utils = __webpack_require__(5);
	
	/**
	 * BaseView to be extended
	 *
	 * @namespace Barba.BaseView
	 * @type {Object}
	 */
	var BaseView  = {
	  /**
	   * Namespace of the view.
	   * (need to be associated with the data-namespace of the container)
	   *
	   * @memberOf Barba.BaseView
	   * @type {String}
	   */
	  namespace: null,
	
	  /**
	   * Helper to extend the object
	   *
	   * @memberOf Barba.BaseView
	   * @param  {Object} newObject
	   * @return {Object} newInheritObject
	   */
	  extend: function(obj){
	    return Utils.extend(this, obj);
	  },
	
	  /**
	   * Init the view.
	   * P.S. Is suggested to init the view before starting Barba.Pjax.start(),
	   * in this way .onEnter() and .onEnterCompleted() will be fired for the current
	   * container when the page is loaded.
	   *
	   * @memberOf Barba.BaseView
	   */
	  init: function() {
	    var _this = this;
	
	    Dispatcher.on('initStateChange',
	      function(newStatus, oldStatus) {
	        if (oldStatus && oldStatus.namespace === _this.namespace)
	          _this.onLeave();
	      }
	    );
	
	    Dispatcher.on('newPageReady',
	      function(newStatus, oldStatus, container) {
	        _this.container = container;
	
	        if (newStatus.namespace === _this.namespace)
	          _this.onEnter();
	      }
	    );
	
	    Dispatcher.on('transitionCompleted',
	      function(newStatus, oldStatus) {
	        if (newStatus.namespace === _this.namespace)
	          _this.onEnterCompleted();
	
	        if (oldStatus && oldStatus.namespace === _this.namespace)
	          _this.onLeaveCompleted();
	      }
	    );
	  },
	
	 /**
	  * This function will be fired when the container
	  * is ready and attached to the DOM.
	  *
	  * @memberOf Barba.BaseView
	  * @abstract
	  */
	  onEnter: function() {},
	
	  /**
	   * This function will be fired when the transition
	   * to this container has just finished.
	   *
	   * @memberOf Barba.BaseView
	   * @abstract
	   */
	  onEnterCompleted: function() {},
	
	  /**
	   * This function will be fired when the transition
	   * to a new container has just started.
	   *
	   * @memberOf Barba.BaseView
	   * @abstract
	   */
	  onLeave: function() {},
	
	  /**
	   * This function will be fired when the container
	   * has just been removed from the DOM.
	   *
	   * @memberOf Barba.BaseView
	   * @abstract
	   */
	  onLeaveCompleted: function() {}
	}
	
	module.exports = BaseView;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Little Dispatcher inspired by MicroEvent.js
	 *
	 * @namespace Barba.Dispatcher
	 * @type {Object}
	 */
	var Dispatcher = {
	  /**
	   * Object that keeps all the events
	   *
	   * @memberOf Barba.Dispatcher
	   * @readOnly
	   * @type {Object}
	   */
	  events: {},
	
	  /**
	   * Bind a callback to an event
	   *
	   * @memberOf Barba.Dispatcher
	   * @param  {String} eventName
	   * @param  {Function} function
	   */
	  on: function(e, f) {
	    this.events[e] = this.events[e] || [];
	    this.events[e].push(f);
	  },
	
	  /**
	   * Unbind event
	   *
	   * @memberOf Barba.Dispatcher
	   * @param  {String} eventName
	   * @param  {Function} function
	   */
	  off: function(e, f) {
	    if(e in this.events === false)
	      return;
	
	    this.events[e].splice(this.events[e].indexOf(f), 1);
	  },
	
	  /**
	   * Fire the event running all the event associated to it
	   *
	   * @memberOf Barba.Dispatcher
	   * @param  {String} eventName
	   * @param  {...*} args
	   */
	  trigger: function(e) {//e, ...args
	    if (e in this.events === false)
	      return;
	
	    for(var i = 0; i < this.events[e].length; i++){
	      this.events[e][i].apply(this, Array.prototype.slice.call(arguments, 1));
	    }
	  }
	};
	
	module.exports = Dispatcher;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	
	/**
	 * BaseCache it's a simple static cache
	 *
	 * @namespace Barba.BaseCache
	 * @type {Object}
	 */
	var BaseCache = {
	  /**
	   * The Object that keeps all the key value information
	   *
	   * @memberOf Barba.BaseCache
	   * @type {Object}
	   */
	  data: {},
	
	  /**
	   * Helper to extend this object
	   *
	   * @memberOf Barba.BaseCache
	   * @private
	   * @param  {Object} newObject
	   * @return {Object} newInheritObject
	   */
	  extend: function(obj) {
	    return Utils.extend(this, obj);
	  },
	
	  /**
	   * Set a key and value data, mainly Barba is going to save promises
	   *
	   * @memberOf Barba.BaseCache
	   * @param {String} key
	   * @param {*} value
	   */
	  set: function(key, val) {
	    this.data[key] = val;
	  },
	
	  /**
	   * Retrieve the data using the key
	   *
	   * @memberOf Barba.BaseCache
	   * @param  {String} key
	   * @return {*}
	   */
	  get: function(key) {
	    return this.data[key];
	  },
	
	  /**
	   * Flush the cache
	   *
	   * @memberOf Barba.BaseCache
	   */
	  reset: function() {
	    this.data = {};
	  }
	};
	
	module.exports = BaseCache;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * HistoryManager helps to keep track of the navigation
	 *
	 * @namespace Barba.HistoryManager
	 * @type {Object}
	 */
	var HistoryManager = {
	  /**
	   * Keep track of the status in historic order
	   *
	   * @memberOf Barba.HistoryManager
	   * @readOnly
	   * @type {Array}
	   */
	  history: [],
	
	  /**
	   * Add a new set of url and namespace
	   *
	   * @memberOf Barba.HistoryManager
	   * @param {String} url
	   * @param {String} namespace
	   * @private
	   */
	  add: function(url, namespace) {
	    if (!namespace)
	      namespace = undefined;
	
	    this.history.push({
	      url: url,
	      namespace: namespace
	    });
	  },
	
	  /**
	   * Return information about the current status
	   *
	   * @memberOf Barba.HistoryManager
	   * @return {Object}
	   */
	  currentStatus: function() {
	    return this.history[this.history.length - 1];
	  },
	
	  /**
	   * Return information about the previous status
	   *
	   * @memberOf Barba.HistoryManager
	   * @return {Object}
	   */
	  prevStatus: function() {
	    var history = this.history;
	
	    if (history.length < 2)
	      return null;
	
	    return history[history.length - 2];
	  }
	};
	
	module.exports = HistoryManager;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	var Dispatcher = __webpack_require__(7);
	var HideShowTransition = __webpack_require__(11);
	var BaseCache = __webpack_require__(8);
	
	var HistoryManager = __webpack_require__(9);
	var Dom = __webpack_require__(12);
	
	/**
	 * Pjax is a static object with main function
	 *
	 * @namespace Barba.Pjax
	 * @borrows Dom as Dom
	 * @type {Object}
	 */
	var Pjax = {
	  Dom: Dom,
	  History: HistoryManager,
	  Cache: BaseCache,
	
	  /**
	   * Indicate wether or not use the cache
	   *
	   * @memberOf Barba.Pjax
	   * @type {Boolean}
	   * @default
	   */
	  cacheEnabled: true,
	
	  /**
	   * Indicate if there is an animation in progress
	   *
	   * @memberOf Barba.Pjax
	   * @readOnly
	   * @type {Boolean}
	   */
	  transitionProgress: false,
	
	  /**
	   * Class name used to ignore links
	   *
	   * @memberOf Barba.Pjax
	   * @type {String}
	   * @default
	   */
	  ignoreClassLink: 'no-barba',
	
	  /**
	   * Function to be called to start Pjax
	   *
	   * @memberOf Barba.Pjax
	   */
	  start: function() {
	    this.init();
	  },
	
	  /**
	   * Init the events
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  init: function() {
	    var container = this.Dom.getContainer();
	    var wrapper = this.Dom.getWrapper();
	
	    wrapper.setAttribute('aria-live', 'polite');
	
	    this.History.add(
	      this.getCurrentUrl(),
	      this.Dom.getNamespace(container)
	    );
	
	    //Fire for the current view.
	    Dispatcher.trigger('initStateChange', this.History.currentStatus());
	    Dispatcher.trigger('newPageReady',
	      this.History.currentStatus(),
	      {},
	      container,
	      this.Dom.currentHTML
	    );
	    Dispatcher.trigger('transitionCompleted', this.History.currentStatus());
	
	    this.bindEvents();
	  },
	
	  /**
	   * Attach the eventlisteners
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  bindEvents: function() {
	    document.addEventListener('click',
	      this.onLinkClick.bind(this)
	    );
	
	    window.addEventListener('popstate',
	      this.onStateChange.bind(this)
	    );
	  },
	
	  /**
	   * Return the currentURL cleaned
	   *
	   * @memberOf Barba.Pjax
	   * @return {String} currentUrl
	   */
	  getCurrentUrl: function() {
	    return Utils.cleanLink(
	      Utils.getCurrentUrl()
	    );
	  },
	
	  /**
	   * Change the URL with pushstate and trigger the state change
	   *
	   * @memberOf Barba.Pjax
	   * @param {String} newUrl
	   */
	  goTo: function(url) {
	    window.history.pushState(null, null, url);
	    this.onStateChange();
	  },
	
	  /**
	   * Force the browser to go to a certain url
	   *
	   * @memberOf Barba.Pjax
	   * @param {String} url
	   * @private
	   */
	  forceGoTo: function(url) {
	    window.location = url;
	  },
	
	  /**
	   * Load an url, will start an xhr request or load from the cache
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   * @param  {String} url
	   * @return {Promise}
	   */
	  load: function(url) {
	    var deferred = Utils.deferred();
	    var _this = this;
	    var xhr;
	
	    xhr = this.Cache.get(url);
	
	    if (!xhr) {
	      xhr = Utils.xhr(url);
	      this.Cache.set(url, xhr);
	    }
	
	    xhr.then(
	      function(data) {
	        var container = _this.Dom.parseResponse(data);
	
	        _this.Dom.putContainer(container);
	
	        if (!_this.cacheEnabled)
	          _this.Cache.reset();
	
	        deferred.resolve(container);
	      },
	      function() {
	        //Something went wrong (timeout, 404, 505...)
	        _this.forceGoTo(url);
	
	        deferred.reject();
	      }
	    );
	
	    return deferred.promise;
	  },
	
	  /**
	   * Get the .href parameter out of an element
	   * and handle special cases (like xlink:href)
	   *
	   * @private
	   * @memberOf Barba.Pjax
	   * @param  {HTMLElement} el
	   * @return {String} href
	   */
	  getHref: function(el) {
	    if (!el) {
	      return undefined;
	    }
	
	    if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
	      return el.getAttribute('xlink:href');
	    }
	
	    if (typeof el.href === 'string') {
	      return el.href;
	    }
	
	    return undefined;
	  },
	
	  /**
	   * Callback called from click event
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   * @param {MouseEvent} evt
	   */
	  onLinkClick: function(evt) {
	    var el = evt.target;
	
	    //Go up in the nodelist until we
	    //find something with an href
	    while (el && !this.getHref(el)) {
	      el = el.parentNode;
	    }
	
	    if (this.preventCheck(evt, el)) {
	      evt.stopPropagation();
	      evt.preventDefault();
	
	      Dispatcher.trigger('linkClicked', el, evt);
	
	      var href = this.getHref(el);
	      this.goTo(href);
	    }
	  },
	
	  /**
	   * Determine if the link should be followed
	   *
	   * @memberOf Barba.Pjax
	   * @param  {MouseEvent} evt
	   * @param  {HTMLElement} element
	   * @return {Boolean}
	   */
	  preventCheck: function(evt, element) {
	    if (!window.history.pushState)
	      return false;
	
	    var href = this.getHref(element);
	
	    //User
	    if (!element || !href)
	      return false;
	
	    //Middle click, cmd click, and ctrl click
	    if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey)
	      return false;
	
	    //Ignore target with _blank target
	    if (element.target && element.target === '_blank')
	      return false;
	
	    //Check if it's the same domain
	    if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname)
	      return false;
	
	    //Check if the port is the same
	    if (Utils.getPort() !== Utils.getPort(element.port))
	      return false;
	
	    //Ignore case when a hash is being tacked on the current URL
	    if (href.indexOf('#') > -1)
	      return false;
	
	    //Ignore case where there is download attribute
	    if (element.getAttribute && typeof element.getAttribute('download') === 'string')
	      return false;
	
	    //In case you're trying to load the same page
	    if (Utils.cleanLink(href) == Utils.cleanLink(location.href))
	      return false;
	
	    if (element.classList.contains(this.ignoreClassLink))
	      return false;
	
	    return true;
	  },
	
	  /**
	   * Return a transition object
	   *
	   * @memberOf Barba.Pjax
	   * @return {Barba.Transition} Transition object
	   */
	  getTransition: function() {
	    //User customizable
	    return HideShowTransition;
	  },
	
	  /**
	   * Method called after a 'popstate' or from .goTo()
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  onStateChange: function() {
	    var newUrl = this.getCurrentUrl();
	
	    if (this.transitionProgress)
	      this.forceGoTo(newUrl);
	
	    if (this.History.currentStatus().url === newUrl)
	      return false;
	
	    this.History.add(newUrl);
	
	    var newContainer = this.load(newUrl);
	    var transition = Object.create(this.getTransition());
	
	    this.transitionProgress = true;
	
	    Dispatcher.trigger('initStateChange',
	      this.History.currentStatus(),
	      this.History.prevStatus()
	    );
	
	    var transitionInstance = transition.init(
	      this.Dom.getContainer(),
	      newContainer
	    );
	
	    newContainer.then(
	      this.onNewContainerLoaded.bind(this)
	    );
	
	    transitionInstance.then(
	      this.onTransitionEnd.bind(this)
	    );
	  },
	
	  /**
	   * Function called as soon the new container is ready
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   * @param {HTMLElement} container
	   */
	  onNewContainerLoaded: function(container) {
	    var currentStatus = this.History.currentStatus();
	    currentStatus.namespace = this.Dom.getNamespace(container);
	
	    Dispatcher.trigger('newPageReady',
	      this.History.currentStatus(),
	      this.History.prevStatus(),
	      container,
	      this.Dom.currentHTML
	    );
	  },
	
	  /**
	   * Function called as soon the transition is finished
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  onTransitionEnd: function() {
	    this.transitionProgress = false;
	
	    Dispatcher.trigger('transitionCompleted',
	      this.History.currentStatus(),
	      this.History.prevStatus()
	    );
	  }
	};
	
	module.exports = Pjax;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var BaseTransition = __webpack_require__(4);
	
	/**
	 * Basic Transition object, wait for the new Container to be ready,
	 * scroll top, and finish the transition (removing the old container and displaying the new one)
	 *
	 * @private
	 * @namespace Barba.HideShowTransition
	 * @augments Barba.BaseTransition
	 */
	var HideShowTransition = BaseTransition.extend({
	  start: function() {
	    this.newContainerLoading.then(this.finish.bind(this));
	  },
	
	  finish: function() {
	    document.body.scrollTop = 0;
	    this.done();
	  }
	});
	
	module.exports = HideShowTransition;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Object that is going to deal with DOM parsing/manipulation
	 *
	 * @namespace Barba.Pjax.Dom
	 * @type {Object}
	 */
	var Dom = {
	  /**
	   * The name of the data attribute on the container
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   * @default
	   */
	  dataNamespace: 'namespace',
	
	  /**
	   * Id of the main wrapper
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   * @default
	   */
	  wrapperId: 'barba-wrapper',
	
	  /**
	   * Class name used to identify the containers
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   * @default
	   */
	  containerClass: 'barba-container',
	
	  /**
	   * Full HTML String of the current page.
	   * By default is the innerHTML of the initial loaded page.
	   *
	   * Each time a new page is loaded, the value is the response of the xhr call.
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   */
	  currentHTML: document.documentElement.innerHTML,
	
	  /**
	   * Parse the responseText obtained from the xhr call
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {String} responseText
	   * @return {HTMLElement}
	   */
	  parseResponse: function(responseText) {
	    this.currentHTML = responseText;
	
	    var wrapper = document.createElement('div');
	    wrapper.innerHTML = responseText;
	
	    var titleEl = wrapper.querySelector('title');
	
	    if (titleEl)
	      document.title = titleEl.textContent;
	
	    return this.getContainer(wrapper);
	  },
	
	  /**
	   * Get the main barba wrapper by the ID `wrapperId`
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @return {HTMLElement} element
	   */
	  getWrapper: function() {
	    var wrapper = document.getElementById(this.wrapperId);
	
	    if (!wrapper)
	      throw new Error('Barba.js: wrapper not found!');
	
	    return wrapper;
	  },
	
	  /**
	   * Get the container on the current DOM,
	   * or from an HTMLElement passed via argument
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   * @return {HTMLElement}
	   */
	  getContainer: function(element) {
	    if (!element)
	      element = document.body;
	
	    if (!element)
	      throw new Error('Barba.js: DOM not ready!');
	
	    var container = this.parseContainer(element);
	
	    if (container && container.jquery)
	      container = container[0];
	
	    if (!container)
	      throw new Error('Barba.js: no container found');
	
	    return container;
	  },
	
	  /**
	   * Get the namespace of the container
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   * @return {String}
	   */
	  getNamespace: function(element) {
	    if (element && element.dataset) {
	      return element.dataset[this.dataNamespace];
	    } else if (element) {
	      return element.getAttribute('data-' + this.dataNamespace);
	    }
	
	    return null;
	  },
	
	  /**
	   * Put the container on the page
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   */
	  putContainer: function(element) {
	    element.style.visibility = 'hidden';
	
	    var wrapper = this.getWrapper();
	    wrapper.appendChild(element);
	  },
	
	  /**
	   * Get container selector
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   * @return {HTMLElement} element
	   */
	  parseContainer: function(element) {
	    return element.querySelector('.' + this.containerClass);
	  }
	};
	
	module.exports = Dom;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	var Pjax = __webpack_require__(10);
	
	/**
	 * Prefetch
	 *
	 * @namespace Barba.Prefetch
	 * @type {Object}
	 */
	var Prefetch = {
	  /**
	   * Class name used to ignore prefetch on links
	   *
	   * @memberOf Barba.Prefetch
	   * @type {String}
	   * @default
	   */
	  ignoreClassLink: 'no-barba-prefetch',
	
	  /**
	   * Init the event listener on mouseover and touchstart
	   * for the prefetch
	   *
	   * @memberOf Barba.Prefetch
	   */
	  init: function() {
	    if (!window.history.pushState) {
	      return false;
	    }
	
	    document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
	    document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
	  },
	
	  /**
	   * Callback for the mousehover/touchstart
	   *
	   * @memberOf Barba.Prefetch
	   * @private
	   * @param  {Object} evt
	   */
	  onLinkEnter: function(evt) {
	    var el = evt.target;
	
	    while (el && !Pjax.getHref(el)) {
	      el = el.parentNode;
	    }
	
	    if (!el || el.classList.contains(this.ignoreClassLink)) {
	      return;
	    }
	
	    var url = Pjax.getHref(el);
	
	    //Check if the link is elegible for Pjax
	    if (Pjax.preventCheck(evt, el) && !Pjax.Cache.get(url)) {
	      var xhr = Utils.xhr(url);
	      Pjax.Cache.set(url, xhr);
	    }
	  }
	};
	
	module.exports = Prefetch;


/***/ }
/******/ ])
});
;

},{}],11:[function(require,module,exports){
/*! Multiple.js - v0.0.1 - 2016-04-09
* http://NeXTs.github.com/Multiple.js/
* Copyright (c) 2015 Denis Lukov; Licensed MIT */

;(function(root, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else root['Multiple'] = definition();
}(this, function() {
	"use strict"

	// http://stackoverflow.com/a/4819886/1221082
	var isMobile = 'ontouchstart' in window || navigator.maxTouchPoints;
	// http://stackoverflow.com/a/12625907/1221082
	var isWebkit = 'WebkitAppearance' in document.documentElement.style;

	// Force webkit repaint on resize
	isWebkit && window.addEventListener('resize', function(e){
		document.body.style.visibility = 'hidden';
		e = document.body.offsetHeight;
		document.body.style.visibility = '';
	});

	var Multiple = function(options) {
		if( ! (this instanceof Multiple)) return new Multiple(options);

		['selector', 'background', 'affectText', 'opacity'].forEach(function(option) {
			this[option] = options[option];
		}.bind(this));

		this.className = 'multiple-' + (isMobile ? 'mobile' : 'desktop') + (this.affectText ? '-text' : '');
		this.update(this.background);
	}

	Multiple.prototype = {
		constructor: Multiple,
		each: function(select, callback, nodes) {
			Array.prototype.slice.call(nodes ? select : document.querySelectorAll(select)).forEach(callback.bind(this));
		},
		// #f95 or #ff9955 or rgb(255,153,85) -> rgba(255,102,0,0.666)
		setOpacity: function(styles) {
			return styles.replace(/#\b([a-f\d]{3}|[a-f\d]{6})\b/gi, function(full, hex) {
			  	var rgb = hex.match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) });
				return 'rgb(' + rgb.join(',') + ')';
			}).replace(/rgb\((.[^\)]*)\)/gi, function(full, rgb) {
				var min, a = (255 - (min = Math.min.apply(Math, (rgb = rgb.split(','))))) / 255,
					rgba = this.opacity === true
						? rgb.map(function(channel) { return 0 | (channel - min) / a }).concat((0|1000*a)/1000)
						: rgb.concat(this.opacity);
				return 'rgba(' + rgba.join(',') + ')';
			}.bind(this));
		},
		// linear-gradient(#fff, #000) -> -webkit-*, -moz-*, -ms-*, -o-*
		setVendors: function(styles, textMode) {
			var result = textMode ? [] : [styles];
			if(/-gradient\(/i.test(styles) || textMode) ['webkit', 'moz', 'ms', 'o'].forEach(function(vendor, i) {
				if(textMode && i) return;
				result.unshift((textMode ? '-webkit-linear-gradient(transparent,transparent),' : '') + styles.replace(/([^,\s]*-gradient\()/gi, '-' + vendor + '-$1'));
	  		});
			return result;
		},
		setStyles: function(selector, styles, textMode) {
			if(this.opacity) styles = this.setOpacity(styles);
			this.styleTag.innerHTML = selector + '{background-image:' + this.setVendors(styles, textMode).join(';\nbackground-image:') + '}';
		},
		renderTag: function(className) {
			var tag = document.createElement('div');
			tag.className = className;
			return tag;
		},
		update: function(styles) {
			this.each(this.selector, function(elem) {
				if(elem.getAttribute('data-multiple')) return;
				if( ! isMobile || this.affectText) return elem.classList.add(this.className);

				var wrapperTag = this.renderTag(this.className + '-wrapper'),
					contentTag = this.renderTag(this.className + '-content');
				this.each(elem.childNodes, function(child) { contentTag.appendChild(child) }, true);
				elem.appendChild(wrapperTag);
				wrapperTag.appendChild(this.renderTag(this.className));
				wrapperTag.appendChild(contentTag);
				elem.setAttribute('data-multiple', true);
			});

			if( ! styles) return;
			if( ! this.styleTag) document.head.appendChild(this.styleTag = document.createElement('style'));
			if( ! isMobile || ! this.affectText) this.setStyles(this.selector + (isMobile ? ' ' : '') + '.' + this.className + (isMobile ? ':before' : ''), styles, this.affectText);
			if(this.affectText) this.styleTag.innerHTML += this.selector + '.' + this.className + '{color:' + this.affectText + '}';
		},
		destroy: function() {
			this.styleTag.parentNode && this.styleTag.parentNode.removeChild(this.styleTag) && delete this.styleTag;
			this.each(this.selector, function(elem) {
				elem.classList.remove(this.className);
				elem.removeAttribute('data-multiple');

				if( ! isMobile || this.affectText) return;
				this.each(elem.children[0].children[1].childNodes, function(child) { elem.appendChild(child) }, true);
				elem.removeChild(elem.children[0]);
			});
		}
	}

	return Multiple;
}));
},{}],12:[function(require,module,exports){
/*! skrollr 0.6.26 (2014-06-08) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function(e,t,r){"use strict";function n(r){if(o=t.documentElement,a=t.body,K(),it=this,r=r||{},ut=r.constants||{},r.easing)for(var n in r.easing)U[n]=r.easing[n];yt=r.edgeStrategy||"set",ct={beforerender:r.beforerender,render:r.render,keyframe:r.keyframe},ft=r.forceHeight!==!1,ft&&(Vt=r.scale||1),mt=r.mobileDeceleration||x,dt=r.smoothScrolling!==!1,gt=r.smoothScrollingDuration||E,vt={targetTop:it.getScrollTop()},Gt=(r.mobileCheck||function(){return/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent||navigator.vendor||e.opera)})(),Gt?(st=t.getElementById("skrollr-body"),st&&at(),X(),Dt(o,[y,S],[T])):Dt(o,[y,b],[T]),it.refresh(),St(e,"resize orientationchange",function(){var e=o.clientWidth,t=o.clientHeight;(t!==$t||e!==Mt)&&($t=t,Mt=e,_t=!0)});var i=Y();return function l(){Z(),bt=i(l)}(),it}var o,a,i={get:function(){return it},init:function(e){return it||new n(e)},VERSION:"0.6.26"},l=Object.prototype.hasOwnProperty,s=e.Math,c=e.getComputedStyle,f="touchstart",u="touchmove",m="touchcancel",p="touchend",d="skrollable",g=d+"-before",v=d+"-between",h=d+"-after",y="skrollr",T="no-"+y,b=y+"-desktop",S=y+"-mobile",k="linear",w=1e3,x=.004,E=200,A="start",F="end",C="center",D="bottom",H="___skrollable_id",I=/^(?:input|textarea|button|select)$/i,P=/^\s+|\s+$/g,N=/^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,O=/\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,V=/^(@?[a-z\-]+)\[(\w+)\]$/,z=/-([a-z0-9_])/g,q=function(e,t){return t.toUpperCase()},L=/[\-+]?[\d]*\.?[\d]+/g,M=/\{\?\}/g,$=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,_=/[a-z\-]+-gradient/g,B="",G="",K=function(){var e=/^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;if(c){var t=c(a,null);for(var n in t)if(B=n.match(e)||+n==n&&t[n].match(e))break;if(!B)return B=G="",r;B=B[0],"-"===B.slice(0,1)?(G=B,B={"-webkit-":"webkit","-moz-":"Moz","-ms-":"ms","-o-":"O"}[B]):G="-"+B.toLowerCase()+"-"}},Y=function(){var t=e.requestAnimationFrame||e[B.toLowerCase()+"RequestAnimationFrame"],r=Pt();return(Gt||!t)&&(t=function(t){var n=Pt()-r,o=s.max(0,1e3/60-n);return e.setTimeout(function(){r=Pt(),t()},o)}),t},R=function(){var t=e.cancelAnimationFrame||e[B.toLowerCase()+"CancelAnimationFrame"];return(Gt||!t)&&(t=function(t){return e.clearTimeout(t)}),t},U={begin:function(){return 0},end:function(){return 1},linear:function(e){return e},quadratic:function(e){return e*e},cubic:function(e){return e*e*e},swing:function(e){return-s.cos(e*s.PI)/2+.5},sqrt:function(e){return s.sqrt(e)},outCubic:function(e){return s.pow(e-1,3)+1},bounce:function(e){var t;if(.5083>=e)t=3;else if(.8489>=e)t=9;else if(.96208>=e)t=27;else{if(!(.99981>=e))return 1;t=91}return 1-s.abs(3*s.cos(1.028*e*t)/t)}};n.prototype.refresh=function(e){var n,o,a=!1;for(e===r?(a=!0,lt=[],Bt=0,e=t.getElementsByTagName("*")):e.length===r&&(e=[e]),n=0,o=e.length;o>n;n++){var i=e[n],l=i,s=[],c=dt,f=yt,u=!1;if(a&&H in i&&delete i[H],i.attributes){for(var m=0,p=i.attributes.length;p>m;m++){var g=i.attributes[m];if("data-anchor-target"!==g.name)if("data-smooth-scrolling"!==g.name)if("data-edge-strategy"!==g.name)if("data-emit-events"!==g.name){var v=g.name.match(N);if(null!==v){var h={props:g.value,element:i,eventType:g.name.replace(z,q)};s.push(h);var y=v[1];y&&(h.constant=y.substr(1));var T=v[2];/p$/.test(T)?(h.isPercentage=!0,h.offset=(0|T.slice(0,-1))/100):h.offset=0|T;var b=v[3],S=v[4]||b;b&&b!==A&&b!==F?(h.mode="relative",h.anchors=[b,S]):(h.mode="absolute",b===F?h.isEnd=!0:h.isPercentage||(h.offset=h.offset*Vt))}}else u=!0;else f=g.value;else c="off"!==g.value;else if(l=t.querySelector(g.value),null===l)throw'Unable to find anchor target "'+g.value+'"'}if(s.length){var k,w,x;!a&&H in i?(x=i[H],k=lt[x].styleAttr,w=lt[x].classAttr):(x=i[H]=Bt++,k=i.style.cssText,w=Ct(i)),lt[x]={element:i,styleAttr:k,classAttr:w,anchorTarget:l,keyFrames:s,smoothScrolling:c,edgeStrategy:f,emitEvents:u,lastFrameIndex:-1},Dt(i,[d],[])}}}for(Et(),n=0,o=e.length;o>n;n++){var E=lt[e[n][H]];E!==r&&(J(E),et(E))}return it},n.prototype.relativeToAbsolute=function(e,t,r){var n=o.clientHeight,a=e.getBoundingClientRect(),i=a.top,l=a.bottom-a.top;return t===D?i-=n:t===C&&(i-=n/2),r===D?i+=l:r===C&&(i+=l/2),i+=it.getScrollTop(),0|i+.5},n.prototype.animateTo=function(e,t){t=t||{};var n=Pt(),o=it.getScrollTop();return pt={startTop:o,topDiff:e-o,targetTop:e,duration:t.duration||w,startTime:n,endTime:n+(t.duration||w),easing:U[t.easing||k],done:t.done},pt.topDiff||(pt.done&&pt.done.call(it,!1),pt=r),it},n.prototype.stopAnimateTo=function(){pt&&pt.done&&pt.done.call(it,!0),pt=r},n.prototype.isAnimatingTo=function(){return!!pt},n.prototype.isMobile=function(){return Gt},n.prototype.setScrollTop=function(t,r){return ht=r===!0,Gt?Kt=s.min(s.max(t,0),Ot):e.scrollTo(0,t),it},n.prototype.getScrollTop=function(){return Gt?Kt:e.pageYOffset||o.scrollTop||a.scrollTop||0},n.prototype.getMaxScrollTop=function(){return Ot},n.prototype.on=function(e,t){return ct[e]=t,it},n.prototype.off=function(e){return delete ct[e],it},n.prototype.destroy=function(){var e=R();e(bt),wt(),Dt(o,[T],[y,b,S]);for(var t=0,n=lt.length;n>t;t++)ot(lt[t].element);o.style.overflow=a.style.overflow="",o.style.height=a.style.height="",st&&i.setStyle(st,"transform","none"),it=r,st=r,ct=r,ft=r,Ot=0,Vt=1,ut=r,mt=r,zt="down",qt=-1,Mt=0,$t=0,_t=!1,pt=r,dt=r,gt=r,vt=r,ht=r,Bt=0,yt=r,Gt=!1,Kt=0,Tt=r};var X=function(){var n,i,l,c,d,g,v,h,y,T,b,S;St(o,[f,u,m,p].join(" "),function(e){var o=e.changedTouches[0];for(c=e.target;3===c.nodeType;)c=c.parentNode;switch(d=o.clientY,g=o.clientX,T=e.timeStamp,I.test(c.tagName)||e.preventDefault(),e.type){case f:n&&n.blur(),it.stopAnimateTo(),n=c,i=v=d,l=g,y=T;break;case u:I.test(c.tagName)&&t.activeElement!==c&&e.preventDefault(),h=d-v,S=T-b,it.setScrollTop(Kt-h,!0),v=d,b=T;break;default:case m:case p:var a=i-d,k=l-g,w=k*k+a*a;if(49>w){if(!I.test(n.tagName)){n.focus();var x=t.createEvent("MouseEvents");x.initMouseEvent("click",!0,!0,e.view,1,o.screenX,o.screenY,o.clientX,o.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null),n.dispatchEvent(x)}return}n=r;var E=h/S;E=s.max(s.min(E,3),-3);var A=s.abs(E/mt),F=E*A+.5*mt*A*A,C=it.getScrollTop()-F,D=0;C>Ot?(D=(Ot-C)/F,C=Ot):0>C&&(D=-C/F,C=0),A*=1-D,it.animateTo(0|C+.5,{easing:"outCubic",duration:A})}}),e.scrollTo(0,0),o.style.overflow=a.style.overflow="hidden"},j=function(){var e,t,r,n,a,i,l,c,f,u,m,p=o.clientHeight,d=At();for(c=0,f=lt.length;f>c;c++)for(e=lt[c],t=e.element,r=e.anchorTarget,n=e.keyFrames,a=0,i=n.length;i>a;a++)l=n[a],u=l.offset,m=d[l.constant]||0,l.frame=u,l.isPercentage&&(u*=p,l.frame=u),"relative"===l.mode&&(ot(t),l.frame=it.relativeToAbsolute(r,l.anchors[0],l.anchors[1])-u,ot(t,!0)),l.frame+=m,ft&&!l.isEnd&&l.frame>Ot&&(Ot=l.frame);for(Ot=s.max(Ot,Ft()),c=0,f=lt.length;f>c;c++){for(e=lt[c],n=e.keyFrames,a=0,i=n.length;i>a;a++)l=n[a],m=d[l.constant]||0,l.isEnd&&(l.frame=Ot-l.offset+m);e.keyFrames.sort(Nt)}},W=function(e,t){for(var r=0,n=lt.length;n>r;r++){var o,a,s=lt[r],c=s.element,f=s.smoothScrolling?e:t,u=s.keyFrames,m=u.length,p=u[0],y=u[u.length-1],T=p.frame>f,b=f>y.frame,S=T?p:y,k=s.emitEvents,w=s.lastFrameIndex;if(T||b){if(T&&-1===s.edge||b&&1===s.edge)continue;switch(T?(Dt(c,[g],[h,v]),k&&w>-1&&(xt(c,p.eventType,zt),s.lastFrameIndex=-1)):(Dt(c,[h],[g,v]),k&&m>w&&(xt(c,y.eventType,zt),s.lastFrameIndex=m)),s.edge=T?-1:1,s.edgeStrategy){case"reset":ot(c);continue;case"ease":f=S.frame;break;default:case"set":var x=S.props;for(o in x)l.call(x,o)&&(a=nt(x[o].value),0===o.indexOf("@")?c.setAttribute(o.substr(1),a):i.setStyle(c,o,a));continue}}else 0!==s.edge&&(Dt(c,[d,v],[g,h]),s.edge=0);for(var E=0;m-1>E;E++)if(f>=u[E].frame&&u[E+1].frame>=f){var A=u[E],F=u[E+1];for(o in A.props)if(l.call(A.props,o)){var C=(f-A.frame)/(F.frame-A.frame);C=A.props[o].easing(C),a=rt(A.props[o].value,F.props[o].value,C),a=nt(a),0===o.indexOf("@")?c.setAttribute(o.substr(1),a):i.setStyle(c,o,a)}k&&w!==E&&("down"===zt?xt(c,A.eventType,zt):xt(c,F.eventType,zt),s.lastFrameIndex=E);break}}},Z=function(){_t&&(_t=!1,Et());var e,t,n=it.getScrollTop(),o=Pt();if(pt)o>=pt.endTime?(n=pt.targetTop,e=pt.done,pt=r):(t=pt.easing((o-pt.startTime)/pt.duration),n=0|pt.startTop+t*pt.topDiff),it.setScrollTop(n,!0);else if(!ht){var a=vt.targetTop-n;a&&(vt={startTop:qt,topDiff:n-qt,targetTop:n,startTime:Lt,endTime:Lt+gt}),vt.endTime>=o&&(t=U.sqrt((o-vt.startTime)/gt),n=0|vt.startTop+t*vt.topDiff)}if(Gt&&st&&i.setStyle(st,"transform","translate(0, "+-Kt+"px) "+Tt),ht||qt!==n){zt=n>qt?"down":qt>n?"up":zt,ht=!1;var l={curTop:n,lastTop:qt,maxTop:Ot,direction:zt},s=ct.beforerender&&ct.beforerender.call(it,l);s!==!1&&(W(n,it.getScrollTop()),qt=n,ct.render&&ct.render.call(it,l)),e&&e.call(it,!1)}Lt=o},J=function(e){for(var t=0,r=e.keyFrames.length;r>t;t++){for(var n,o,a,i,l=e.keyFrames[t],s={};null!==(i=O.exec(l.props));)a=i[1],o=i[2],n=a.match(V),null!==n?(a=n[1],n=n[2]):n=k,o=o.indexOf("!")?Q(o):[o.slice(1)],s[a]={value:o,easing:U[n]};l.props=s}},Q=function(e){var t=[];return $.lastIndex=0,e=e.replace($,function(e){return e.replace(L,function(e){return 100*(e/255)+"%"})}),G&&(_.lastIndex=0,e=e.replace(_,function(e){return G+e})),e=e.replace(L,function(e){return t.push(+e),"{?}"}),t.unshift(e),t},et=function(e){var t,r,n={};for(t=0,r=e.keyFrames.length;r>t;t++)tt(e.keyFrames[t],n);for(n={},t=e.keyFrames.length-1;t>=0;t--)tt(e.keyFrames[t],n)},tt=function(e,t){var r;for(r in t)l.call(e.props,r)||(e.props[r]=t[r]);for(r in e.props)t[r]=e.props[r]},rt=function(e,t,r){var n,o=e.length;if(o!==t.length)throw"Can't interpolate between \""+e[0]+'" and "'+t[0]+'"';var a=[e[0]];for(n=1;o>n;n++)a[n]=e[n]+(t[n]-e[n])*r;return a},nt=function(e){var t=1;return M.lastIndex=0,e[0].replace(M,function(){return e[t++]})},ot=function(e,t){e=[].concat(e);for(var r,n,o=0,a=e.length;a>o;o++)n=e[o],r=lt[n[H]],r&&(t?(n.style.cssText=r.dirtyStyleAttr,Dt(n,r.dirtyClassAttr)):(r.dirtyStyleAttr=n.style.cssText,r.dirtyClassAttr=Ct(n),n.style.cssText=r.styleAttr,Dt(n,r.classAttr)))},at=function(){Tt="translateZ(0)",i.setStyle(st,"transform",Tt);var e=c(st),t=e.getPropertyValue("transform"),r=e.getPropertyValue(G+"transform"),n=t&&"none"!==t||r&&"none"!==r;n||(Tt="")};i.setStyle=function(e,t,r){var n=e.style;if(t=t.replace(z,q).replace("-",""),"zIndex"===t)n[t]=isNaN(r)?r:""+(0|r);else if("float"===t)n.styleFloat=n.cssFloat=r;else try{B&&(n[B+t.slice(0,1).toUpperCase()+t.slice(1)]=r),n[t]=r}catch(o){}};var it,lt,st,ct,ft,ut,mt,pt,dt,gt,vt,ht,yt,Tt,bt,St=i.addEvent=function(t,r,n){var o=function(t){return t=t||e.event,t.target||(t.target=t.srcElement),t.preventDefault||(t.preventDefault=function(){t.returnValue=!1,t.defaultPrevented=!0}),n.call(this,t)};r=r.split(" ");for(var a,i=0,l=r.length;l>i;i++)a=r[i],t.addEventListener?t.addEventListener(a,n,!1):t.attachEvent("on"+a,o),Yt.push({element:t,name:a,listener:n})},kt=i.removeEvent=function(e,t,r){t=t.split(" ");for(var n=0,o=t.length;o>n;n++)e.removeEventListener?e.removeEventListener(t[n],r,!1):e.detachEvent("on"+t[n],r)},wt=function(){for(var e,t=0,r=Yt.length;r>t;t++)e=Yt[t],kt(e.element,e.name,e.listener);Yt=[]},xt=function(e,t,r){ct.keyframe&&ct.keyframe.call(it,e,t,r)},Et=function(){var e=it.getScrollTop();Ot=0,ft&&!Gt&&(a.style.height=""),j(),ft&&!Gt&&(a.style.height=Ot+o.clientHeight+"px"),Gt?it.setScrollTop(s.min(it.getScrollTop(),Ot)):it.setScrollTop(e,!0),ht=!0},At=function(){var e,t,r=o.clientHeight,n={};for(e in ut)t=ut[e],"function"==typeof t?t=t.call(it):/p$/.test(t)&&(t=t.slice(0,-1)/100*r),n[e]=t;return n},Ft=function(){var e=st&&st.offsetHeight||0,t=s.max(e,a.scrollHeight,a.offsetHeight,o.scrollHeight,o.offsetHeight,o.clientHeight);return t-o.clientHeight},Ct=function(t){var r="className";return e.SVGElement&&t instanceof e.SVGElement&&(t=t[r],r="baseVal"),t[r]},Dt=function(t,n,o){var a="className";if(e.SVGElement&&t instanceof e.SVGElement&&(t=t[a],a="baseVal"),o===r)return t[a]=n,r;for(var i=t[a],l=0,s=o.length;s>l;l++)i=It(i).replace(It(o[l])," ");i=Ht(i);for(var c=0,f=n.length;f>c;c++)-1===It(i).indexOf(It(n[c]))&&(i+=" "+n[c]);t[a]=Ht(i)},Ht=function(e){return e.replace(P,"")},It=function(e){return" "+e+" "},Pt=Date.now||function(){return+new Date},Nt=function(e,t){return e.frame-t.frame},Ot=0,Vt=1,zt="down",qt=-1,Lt=Pt(),Mt=0,$t=0,_t=!1,Bt=0,Gt=!1,Kt=0,Yt=[];"function"==typeof define&&define.amd?define("skrollr",function(){return i}):"undefined"!=typeof module&&module.exports?module.exports=i:e.skrollr=i})(window,document);
},{}],13:[function(require,module,exports){
/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.o=b||a;this.c=this.o.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function ea(a){return a.o.location.hostname||a.a.location.hostname}function z(a,b,c){function d(){m&&e&&f&&(m(g),m=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,m=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
function A(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function B(){this.a=0;this.c=null}function C(a){a.a++;return function(){a.a--;D(a)}}function E(a,b){a.c=b;D(a)}function D(a){0==a.a&&a.c&&(a.c(),a.c=null)};function F(a){this.a=a||"-"}F.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function G(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return H(a)+" "+(a.f+"00")+" 300px "+I(a.c)}function I(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function J(a){return a.a+a.f}function H(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.o.document.documentElement;this.h=b;this.a=new F("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);K(a,"loading")}function L(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}K(a,"inactive")}function K(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,J(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function M(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function N(a){u(a.c,"body",a.a)}function O(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+I(a.c)+";"+("font-style:"+H(a)+";font-weight:"+(a.f+"00")+";")};function P(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}P.prototype.start=function(){var a=this.c.o.document,b=this,c=q(),d=new Promise(function(d,e){function f(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(f,25)},function(){e()})}f()}),e=null,f=new Promise(function(a,d){e=setTimeout(d,b.f)});Promise.race([f,d]).then(function(){e&&(clearTimeout(e),e=null);b.g(b.a)},function(){b.j(b.a)})};function Q(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.m=this.j=this.h=this.g=null;this.g=new M(this.c,this.s);this.h=new M(this.c,this.s);this.j=new M(this.c,this.s);this.m=new M(this.c,this.s);a=new G(this.a.c+",serif",J(this.a));a=O(a);this.g.a.style.cssText=a;a=new G(this.a.c+",sans-serif",J(this.a));a=O(a);this.h.a.style.cssText=a;a=new G("serif",J(this.a));a=O(a);this.j.a.style.cssText=a;a=new G("sans-serif",J(this.a));a=
O(a);this.m.a.style.cssText=a;N(this.g);N(this.h);N(this.j);N(this.m)}var R={D:"serif",C:"sans-serif"},S=null;function T(){if(null===S){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return S}Q.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.m.a.offsetWidth;this.A=q();U(this)};
function la(a,b,c){for(var d in R)if(R.hasOwnProperty(d)&&b===a.f[R[d]]&&c===a.f[R[d]])return!0;return!1}function U(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=T()&&la(a,b,c));d?q()-a.A>=a.w?T()&&la(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):ma(a):V(a,a.v)}function ma(a){setTimeout(p(function(){U(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.m=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,J(a).toString(),"active")],[b.a.c("wf",a.c,J(a).toString(),"loading"),b.a.c("wf",a.c,J(a).toString(),"inactive")]);K(b,"fontactive",a);this.m=!0;na(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,J(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,J(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,J(a).toString(),"inactive"));w(b.f,d,e)}K(b,"fontinactive",a);na(this)};function na(a){0==--a.f&&a.j&&(a.m?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),K(a,"active")):L(a.a))};function oa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}oa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;pa(this,new ha(this.c,a),a)};
function qa(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,m=d||null||{};if(0===c.length&&f)L(b.a);else{b.f+=c.length;f&&(b.j=f);var h,l=[];for(h=0;h<c.length;h++){var k=c[h],n=m[k.c],r=b.a,x=k;r.g&&w(r.f,[r.a.c("wf",x.c,J(x).toString(),"loading")]);K(r,"fontloading",x);r=null;if(null===X)if(window.FontFace){var x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),xa=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);
X=x?42<parseInt(x[1],10):xa?!1:!0}else X=!1;X?r=new P(p(b.g,b),p(b.h,b),b.c,k,b.s,n):r=new Q(p(b.g,b),p(b.h,b),b.c,k,b.s,a,n);l.push(r)}for(h=0;h<l.length;h++)l[h].start()}},0)}function pa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){qa(a,f,b,d,c)})};function ra(a,b){this.c=a;this.a=b}
ra.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var l=0;l<c.length;l++){var k=c[l].fontfamily;void 0!=c[l].fontStyle&&void 0!=c[l].fontWeight?(h=c[l].fontStyle+c[l].fontWeight,e.push(new G(k,h))):e.push(new G(k))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.o;A(this.c,(c.a.api||"https://fast.fonts.net/jsapi")+"/"+d+".js"+(e?"?v="+e:""),function(e){e?a([]):(f["__MonotypeConfiguration__"+
d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+d}else a([])};function sa(a,b){this.c=a;this.a=b}sa.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new B;b=0;for(c=d.length;b<c;b++)z(this.c,d[b],C(g));var m=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),l=0;l<h.length;l+=1)m.push(new G(d[0],h[l]));else m.push(new G(d[0]));E(g,function(){a(m,f)})};function ta(a,b){a?this.c=a:this.c=ua;this.a=[];this.f=[];this.g=b||""}var ua="https://fonts.googleapis.com/css";function va(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function wa(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function ya(a){this.f=a;this.a=[];this.c={}}
var za={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Aa={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ba={i:"i",italic:"i",n:"n",normal:"n"},
Ca=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Da(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var m=d[1];g=[];if(m)for(var m=m.split(","),h=m.length,l=0;l<h;l++){var k;k=m[l];if(k.match(/^[\w-]+$/)){var n=Ca.exec(k.toLowerCase());if(null==n)k="";else{k=n[2];k=null==k||""==k?"n":Ba[k];n=n[1];if(null==n||""==n)n="4";else var r=Aa[n],n=r?r:isNaN(n)?"4":n.substr(0,1);k=[k,n].join("")}}else k="";k&&g.push(k)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=za[d[0]])&&(a.c[e]=d))}a.c[e]||(d=za[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new G(e,f[d]))}};function Ea(a,b){this.c=a;this.a=b}var Fa={Arimo:!0,Cousine:!0,Tinos:!0};Ea.prototype.load=function(a){var b=new B,c=this.c,d=new ta(this.a.api,this.a.text),e=this.a.families;va(d,e);var f=new ya(e);Da(f);z(c,wa(d),C(b));E(b,function(){a(f.a,f.c,Fa)})};function Ga(a,b){this.c=a;this.a=b}Ga.prototype.load=function(a){var b=this.a.id,c=this.c.o;b?A(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],m=b[f+1],h=0;h<m.length;h++)e.push(new G(g,m[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(l){}a(e)}},2E3):a([])};function Ha(a,b){this.c=a;this.f=b;this.a=[]}Ha.prototype.load=function(a){var b=this.f.id,c=this.c.o,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,m=c.fonts.length;g<m;++g){var h=c.fonts[g];d.a.push(new G(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},A(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new oa(window);Y.a.c.custom=function(a,b){return new sa(b,a)};Y.a.c.fontdeck=function(a,b){return new Ha(b,a)};Y.a.c.monotype=function(a,b){return new ra(b,a)};Y.a.c.typekit=function(a,b){return new Ga(b,a)};Y.a.c.google=function(a,b){return new Ea(b,a)};var Z={load:p(Y.load,Y)};"function"===typeof define&&define.amd?define(function(){return Z}):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());

},{}]},{},[1])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfYXNzZXRzL2pzL2FwcC5qcyIsIl9hc3NldHMvanMvbW9kdWxlcy9mb3JtLmpzIiwiX2Fzc2V0cy9qcy9tb2R1bGVzL21lbnUuanMiLCJfYXNzZXRzL2pzL21vZHVsZXMvcGFnZVRyYW5zaXRpb25zLmpzIiwiX2Fzc2V0cy9qcy9tb2R1bGVzL3BhcmFsbGF4LmpzIiwiX2Fzc2V0cy9qcy9tb2R1bGVzL3Njcm9sbFJldmVhbC5qcyIsIl9hc3NldHMvanMvbW9kdWxlcy9zbW9vdGhTY3JvbGxpbmcuanMiLCJfYXNzZXRzL2pzL21vZHVsZXMvc29jaWFsLmpzIiwiX2Fzc2V0cy9qcy9tb2R1bGVzL3dlYmZvbnQtbG9hZGVyLmpzIiwibm9kZV9tb2R1bGVzL2JhcmJhLmpzL2Rpc3QvYmFyYmEuanMiLCJub2RlX21vZHVsZXMvbXVsdGlwbGUuanMvbXVsdGlwbGUuanMiLCJub2RlX21vZHVsZXMvc2tyb2xsci9kaXN0L3Nrcm9sbHIubWluLmpzIiwibm9kZV9tb2R1bGVzL3dlYmZvbnRsb2FkZXIvd2ViZm9udGxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBTkEsT0FBTyxPQUFQLEdBQWlCLE9BQWpCOzs7OztBQ0FBLElBQU0sU0FBUyxFQUFFLGNBQUYsQ0FBZjs7QUFFQSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0M7QUFDNUIsUUFBTSxTQUFTLEVBQUUsT0FBRixFQUFXLFFBQVgsQ0FBb0IsT0FBcEIsQ0FBZjs7QUFFQSxRQUFJLEVBQUUsT0FBRixFQUFXLEdBQVgsR0FBaUIsTUFBakIsR0FBMEIsQ0FBOUIsRUFBaUM7QUFDN0IsZUFBTyxRQUFQLENBQWdCLFdBQWhCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsZUFBTyxXQUFQLENBQW1CLFdBQW5CO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLE9BQU8sSUFBUCxDQUFZLFlBQVc7QUFDbkIsa0JBQWMsSUFBZDtBQUNILENBRkQ7O0FBSUE7QUFDQSxPQUFPLEVBQVAsQ0FBVSxjQUFWLEVBQTBCLFlBQVc7QUFDakMsa0JBQWMsSUFBZDtBQUNILENBRkQ7Ozs7O0FDbEJBOzs7Ozs7QUFFQSxJQUFNLFFBQVEsRUFBRSxNQUFGLENBQWQ7QUFBQSxJQUNBLGFBQWEsRUFBRSxrQkFBRixDQURiO0FBQUEsSUFFQSxRQUFRLEVBQUUsYUFBRixDQUZSO0FBQUEsSUFHQSxZQUFZLEVBQUUsaUJBQUYsQ0FIWjtBQUFBLElBSUEsWUFBWSxFQUFFLGFBQUYsQ0FKWjtBQUFBLElBS0EsWUFBWSxFQUFFLGFBQUYsQ0FMWjtBQUFBLElBTUEsa0JBQWtCLGdCQU5sQjtBQUFBLElBT0EsY0FBYyxXQVBkOztBQVNBO0FBQ0EsV0FBVyxLQUFYLENBQWlCLFlBQVc7QUFDeEIsUUFBSSxNQUFNLFFBQU4sQ0FBZSxlQUFmLENBQUosRUFBcUM7QUFDakMsY0FBTSxXQUFOLENBQWtCLGVBQWxCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsY0FBTSxRQUFOLENBQWUsZUFBZjtBQUNIO0FBQ0osQ0FORDs7QUFRQTtBQUNBLFVBQVUsS0FBVixDQUFnQixVQUFTLENBQVQsRUFBWTtBQUN4QixVQUFNLFdBQU4sQ0FBa0IsZUFBbEI7QUFDQSxjQUFVLElBQVYsQ0FBZSxTQUFmLEVBQTBCLEtBQTFCO0FBQ0EsY0FBVSxXQUFWLENBQXNCLFdBQXRCO0FBQ0EsTUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixXQUFqQjtBQUNILENBTEQ7O0FBT0E7QUFDQSxNQUFNLEtBQU4sQ0FBWSxZQUFXO0FBQ25CLFFBQUksTUFBTSxRQUFOLENBQWUsZUFBZixDQUFKLEVBQXFDO0FBQ2pDLGNBQU0sV0FBTixDQUFrQixlQUFsQjtBQUNBLGtCQUFVLElBQVYsQ0FBZSxTQUFmLEVBQTBCLEtBQTFCO0FBQ0gsS0FIRCxNQUdPO0FBQ0gsY0FBTSxRQUFOLENBQWUsZUFBZjtBQUNIO0FBQ0osQ0FQRDs7QUFTQSxVQUFVLEtBQVYsQ0FBZ0IsWUFBVztBQUN2QixRQUFJLE9BQU8sRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsQ0FBWDtBQUNBLGNBQVUsSUFBVixDQUFlLFlBQWYsRUFBNkIsSUFBN0I7QUFDQSxjQUFVLFdBQVYsQ0FBc0IsWUFBdEI7QUFDSCxDQUpEOztBQVFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7O0FDN0ZBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLGlCQUFpQixnQkFBTSxjQUFOLENBQXFCLE1BQXJCLENBQTRCO0FBQy9DLFNBQU8saUJBQVc7QUFDaEIsWUFDRyxHQURILENBQ08sQ0FBQyxLQUFLLG1CQUFOLEVBQTJCLEtBQUssT0FBTCxFQUEzQixDQURQLEVBRUcsSUFGSCxDQUVRLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FGUjtBQUdELEdBTDhDOztBQU8vQyxXQUFTLG1CQUFXO0FBQ2xCLFdBQU8sRUFBRSxLQUFLLFlBQVAsRUFBcUIsT0FBckIsQ0FBNkIsRUFBRSxTQUFTLENBQVgsRUFBN0IsRUFBNkMsT0FBN0MsRUFBUDtBQUNELEdBVDhDOztBQVcvQyxVQUFRLGtCQUFXOztBQUVqQixRQUFJLHVCQUF1QixPQUEzQixFQUFvQztBQUNsQyxjQUFRLGlCQUFSLEdBQTRCLFFBQTVCO0FBQ0Q7O0FBRUQsTUFBRSxNQUFGLEVBQVUsU0FBVixDQUFvQixDQUFwQixFQU5pQixDQU1POztBQUV4QixRQUFJLFFBQVEsSUFBWjtBQUNBLFFBQUksTUFBTSxFQUFFLEtBQUssWUFBUCxDQUFWOztBQUVBLE1BQUUsS0FBSyxZQUFQLEVBQXFCLElBQXJCOztBQUVBLFFBQUksR0FBSixDQUFRO0FBQ04sa0JBQVksU0FETjtBQUVOLGVBQVM7QUFGSCxLQUFSOztBQUtBLFFBQUksT0FBSixDQUFZLEVBQUUsU0FBUyxDQUFYLEVBQVosRUFBNEIsR0FBNUIsRUFBaUMsWUFBVztBQUMxQyxZQUFNLElBQU47QUFDRCxLQUZEO0FBSUQ7QUFqQzhDLENBQTVCLENBQXJCOztBQW9DQSxnQkFBTSxVQUFOLENBQWlCLEVBQWpCLENBQW9CLHFCQUFwQixFQUEyQyxVQUFTLFNBQVQsRUFBb0I7QUFDN0Q7QUFDQSxtQkFBYSxNQUFiO0FBQ0EsNEJBQWEsTUFBYjtBQUNELENBSkQ7O0FBTUEsZ0JBQU0sSUFBTixDQUFXLGFBQVgsR0FBMkIsWUFBVztBQUNwQyxTQUFPLGNBQVA7QUFDRCxDQUZEOztBQUlBLGdCQUFNLFFBQU4sQ0FBZSxJQUFmO0FBQ0EsZ0JBQU0sSUFBTixDQUFXLEtBQVg7OztBQ3BEQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDcEJBOzs7Ozs7QUFFQSxTQUFTLE1BQVQsR0FBa0I7QUFDZCxLQUFDLFVBQVMsQ0FBVCxFQUFZO0FBQ1QsWUFBTSxJQUFJLGtCQUFRLElBQVIsQ0FBYTtBQUNuQixvQkFBUSxnQkFBUyxJQUFULEVBQWU7QUFDbkI7QUFDQSx3QkFBUSxHQUFSLENBQVksS0FBSyxNQUFqQjtBQUNIO0FBSmtCLFNBQWIsQ0FBVjtBQU1ILEtBUEQ7QUFRSDs7a0JBRWMsRUFBRSxjQUFGLEU7Ozs7Ozs7O0FDYmYsU0FBUyxNQUFULEdBQWtCO0FBQ2hCLE1BQU0sVUFBVSxFQUFFLG1CQUFGLENBQWhCO0FBQ0EsTUFBTSxNQUFNLEVBQUUsU0FBRixDQUFaO0FBQ0EsTUFBTSxhQUFhLElBQUksV0FBSixFQUFuQjs7QUFFQSxVQUFRLEVBQVIsQ0FBVyxPQUFYLEVBQW9CLFVBQVMsS0FBVCxFQUFnQjtBQUNsQyxRQUFNLE9BQU8sRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE1BQWIsQ0FBYjs7QUFFQSxRQUFJLEtBQUssSUFBTCxLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLFVBQUksQ0FBQyxLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQUQsSUFBbUIsR0FBdkIsRUFBNEI7QUFDMUIsY0FBTSxjQUFOO0FBQ0Q7O0FBRUQsVUFBTSxPQUFPLEtBQUssSUFBbEI7QUFDQSxRQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIsbUJBQVcsRUFBRSxJQUFGLEVBQVEsTUFBUixHQUFpQixHQUFqQixHQUF1QjtBQURaLE9BQXhCLEVBRUcsR0FGSCxFQUVRLFlBQVU7QUFDaEIsZUFBTyxRQUFQLENBQWdCLElBQWhCLEdBQXVCLElBQXZCO0FBQ0QsT0FKRDtBQUtEO0FBQ0YsR0FmRDs7QUFpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7O2tCQUVjLEVBQUUsY0FBRixFOzs7Ozs7OztBQzlCZixTQUFTLE1BQVQsR0FBa0I7QUFDZCxRQUFNLGdCQUFnQixFQUFFLG1CQUFGLENBQXRCOztBQUVBLGtCQUFjLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsWUFBVztBQUNqQyxnQkFBUSxHQUFSLENBQVksU0FBWjtBQUNBLGVBQU8sSUFBUCxDQUFZLEtBQUssSUFBakIsRUFBdUIsUUFBdkIsRUFBaUMsdUJBQWpDO0FBQ0EsZUFBTyxLQUFQO0FBQ0gsS0FKRDtBQUtIOztrQkFFYyxFQUFFLGNBQUYsRTs7Ozs7QUNWZjs7Ozs7O0FBRUEsd0JBQVEsSUFBUixDQUFhO0FBQ1QsWUFBUTtBQUNKLGtCQUFVLENBQUMsd0JBQUQ7QUFETjtBQURDLENBQWI7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3cURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwid2luZG93LnJlcXVpcmUgPSByZXF1aXJlXG5cbmltcG9ydCBtZW51IGZyb20gJy4vbW9kdWxlcy9tZW51J1xuaW1wb3J0IGZvcm0gZnJvbSAnLi9tb2R1bGVzL2Zvcm0nXG5pbXBvcnQgcGFnZVRyYW5zaXRpb25zIGZyb20gJy4vbW9kdWxlcy9wYWdlVHJhbnNpdGlvbnMnXG5pbXBvcnQgd2ViZm9udExvYWRlciBmcm9tICcuL21vZHVsZXMvd2ViZm9udC1sb2FkZXInXG5pbXBvcnQgcGFyYWxsYXggZnJvbSAnLi9tb2R1bGVzL3BhcmFsbGF4JyIsImNvbnN0ICRpbnB1dCA9ICQoJy5mb3JtX19pbnB1dCcpXG5cbmZ1bmN0aW9uIGNoZWNrRm9ySW5wdXQoZWxlbWVudCkge1xuICAgIGNvbnN0ICRsYWJlbCA9ICQoZWxlbWVudCkuc2libGluZ3MoJ2xhYmVsJylcblxuICAgIGlmICgkKGVsZW1lbnQpLnZhbCgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJGxhYmVsLmFkZENsYXNzKCdoYXMtdmFsdWUnKVxuICAgIH0gZWxzZSB7XG4gICAgICAgICRsYWJlbC5yZW1vdmVDbGFzcygnaGFzLXZhbHVlJylcbiAgICB9XG59XG4gIFxuLy8gVGhlIGxpbmVzIGJlbG93IGFyZSBleGVjdXRlZCBvbiBwYWdlIGxvYWRcbiRpbnB1dC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNoZWNrRm9ySW5wdXQodGhpcylcbn0pXG5cbi8vIFRoZSBsaW5lcyBiZWxvdyAoaW5zaWRlKSBhcmUgZXhlY3V0ZWQgb24gY2hhbmdlICYga2V5dXBcbiRpbnB1dC5vbignY2hhbmdlIGtleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgY2hlY2tGb3JJbnB1dCh0aGlzKVxufSkiLCJpbXBvcnQgbXVsdGlwbGVKcyBmcm9tICdtdWx0aXBsZS5qcydcblxuY29uc3QgJGJvZHkgPSAkKCdib2R5JyksXG4kaGFtYnVyZ2VyID0gJCgnLm1lbnVfX2hhbWJ1cmdlcicpLFxuJG1hc2sgPSAkKCcubWVudV9fbWFzaycpLFxuJGNoZWNrYm94ID0gJCgnLm1lbnVfX2NoZWNrYm94JyksXG4kbWVudUxpbmsgPSAkKCcubWVudV9fbGluaycpLFxuJG1lbnVMaXN0ID0gJCgnLm1lbnVfX2xpc3QnKSxcbmFjdGl2ZU1lbnVDbGFzcyA9ICdtZW51LWlzLWFjdGl2ZScsXG5hY3RpdmVDbGFzcyA9ICdpcy1hY3RpdmUnXG5cbi8vIEhhbWJ1cmdlciBjbGljayBldmVudFxuJGhhbWJ1cmdlci5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAoJGJvZHkuaGFzQ2xhc3MoYWN0aXZlTWVudUNsYXNzKSkge1xuICAgICAgICAkYm9keS5yZW1vdmVDbGFzcyhhY3RpdmVNZW51Q2xhc3MpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgJGJvZHkuYWRkQ2xhc3MoYWN0aXZlTWVudUNsYXNzKVxuICAgIH1cbn0pXG5cbi8vIExpbmsgY2xpY2sgZXZlbnRcbiRtZW51TGluay5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgJGJvZHkucmVtb3ZlQ2xhc3MoYWN0aXZlTWVudUNsYXNzKVxuICAgICRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpXG4gICAgJG1lbnVMaW5rLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKVxuICAgICQodGhpcykuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpXG59KVxuXG4vLyBNYXNrIGNsaWNrIGV2ZW50XG4kbWFzay5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAoJGJvZHkuaGFzQ2xhc3MoYWN0aXZlTWVudUNsYXNzKSkge1xuICAgICAgICAkYm9keS5yZW1vdmVDbGFzcyhhY3RpdmVNZW51Q2xhc3MpXG4gICAgICAgICRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgJGJvZHkuYWRkQ2xhc3MoYWN0aXZlTWVudUNsYXNzKVxuICAgIH1cbn0pXG5cbiRtZW51TGluay5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICBsZXQgZGF0YSA9ICQodGhpcykuZGF0YSgndGl0bGUnKVxuICAgICRtZW51TGlzdC5hdHRyKCdkYXRhLXRpdGxlJywgZGF0YSlcbiAgICAkbWVudUxpc3QudG9nZ2xlQ2xhc3MoJ2lzLWhvdmVyZWQnKVxufSlcblxuXG5cbi8vIFN0aWNreSBoZWFkZXJcbi8vIGZ1bmN0aW9uIHN0aWNreSgpIHtcblxuLy8gICAgIGNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJylcbi8vICAgICBjb25zdCAkd2luZG93ID0gJCh3aW5kb3cpXG4vLyAgICAgY29uc3Qgc3RpY2t5Q2xhc3MgPSAnaXMtc3RpY2t5J1xuLy8gICAgIGNvbnN0IHRvcCA9ICRoZWFkZXIub2Zmc2V0KCkudG9wICsgMVxuXG4vLyAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgIGlmICgkd2luZG93LnNjcm9sbFRvcCgpID49IHRvcCkge1xuLy8gICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhzdGlja3lDbGFzcylcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3Moc3RpY2t5Q2xhc3MpXG4vLyAgICAgICAgIH1cbi8vICAgICB9KVxuXG5cbi8vICAgICAvLyBBZGRpbmcgYWN0aXZlIHN0YXRlcyBvbiBzY3JvbGxcbi8vICAgICBjb25zdCBzZWN0aW9ucyA9ICQoJy5qcy1jb250ZW50LXNlY3Rpb24nKVxuLy8gICAgIGNvbnN0IG5hdiA9ICQoJ25hdicpXG4vLyAgICAgY29uc3QgbmF2X2hlaWdodCA9IG5hdi5vdXRlckhlaWdodCgpXG5cbi8vICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICAgICAvLyBjdXJyZW50IHBvc2l0aW9uXG4vLyAgICAgICAgIGNvbnN0IGN1cl9wb3MgPSAkKHRoaXMpLnNjcm9sbFRvcCgpXG5cbi8vICAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggb2YgdGhlIHNlY3Rpb25zXG4vLyAgICAgICAgIHNlY3Rpb25zLmVhY2goZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICBjb25zdCB0b3AgPSAkKHRoaXMpLm9mZnNldCgpLnRvcCAtIG5hdl9oZWlnaHRcbi8vICAgICAgICAgICAgIGNvbnN0IGJvdHRvbSA9IHRvcCArICQodGhpcykub3V0ZXJIZWlnaHQoKVxuXG4vLyAgICAgICAgICAgICBpZiAoY3VyX3BvcyA+PSB0b3AgJiYgY3VyX3BvcyA8PSBib3R0b20pIHtcbi8vICAgICAgICAgICAgICAgICBuYXYuZmluZCgnYScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKVxuLy8gICAgICAgICAgICAgICAgIHNlY3Rpb25zLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKVxuXG4vLyAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJylcbi8vICAgICAgICAgICAgICAgICBuYXYuZmluZCgnYVtocmVmPVwiIycrJCh0aGlzKS5hdHRyKCdpZCcpKydcIl0nKS5hZGRDbGFzcygnaXMtYWN0aXZlJylcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcbi8vICAgICAgICAgICAgICAgICBuYXYuZmluZCgnYVtocmVmPVwiIycrJCh0aGlzKS5hdHRyKCdpZCcpKydcIl0nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSlcbi8vICAgICB9KVxuXG4vLyB9XG5cbi8vIGV4cG9ydCBkZWZhdWx0IHsgc3RpY2t5IH0iLCJpbXBvcnQgQmFyYmEgZnJvbSAnYmFyYmEuanMnXG5pbXBvcnQgcmV2ZWFsRnVuY3Rpb24gZnJvbSAnLi9zY3JvbGxSZXZlYWwuanMnXG5pbXBvcnQgc21vb3RoU2Nyb2xsIGZyb20gJy4vc21vb3RoU2Nyb2xsaW5nLmpzJ1xuaW1wb3J0IHNvY2lhbFdpbmRvdyBmcm9tICcuL3NvY2lhbC5qcydcblxudmFyIEZhZGVUcmFuc2l0aW9uID0gQmFyYmEuQmFzZVRyYW5zaXRpb24uZXh0ZW5kKHtcbiAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgIFByb21pc2VcbiAgICAgIC5hbGwoW3RoaXMubmV3Q29udGFpbmVyTG9hZGluZywgdGhpcy5mYWRlT3V0KCldKVxuICAgICAgLnRoZW4odGhpcy5mYWRlSW4uYmluZCh0aGlzKSlcbiAgfSxcblxuICBmYWRlT3V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJCh0aGlzLm9sZENvbnRhaW5lcikuYW5pbWF0ZSh7IG9wYWNpdHk6IDAgfSkucHJvbWlzZSgpXG4gIH0sXG5cbiAgZmFkZUluOiBmdW5jdGlvbigpIHtcblxuICAgIGlmICgnc2Nyb2xsUmVzdG9yYXRpb24nIGluIGhpc3RvcnkpIHtcbiAgICAgIGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSAnbWFudWFsJztcbiAgICB9XG5cbiAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKDApOyAvLyBzY3JvbGwgdG8gdG9wIGhlcmVcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyICRlbCA9ICQodGhpcy5uZXdDb250YWluZXIpO1xuXG4gICAgJCh0aGlzLm9sZENvbnRhaW5lcikuaGlkZSgpO1xuXG4gICAgJGVsLmNzcyh7XG4gICAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgICBvcGFjaXR5OiAwXG4gICAgfSlcblxuICAgICRlbC5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCA0MDAsIGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuZG9uZSgpXG4gICAgfSlcblxuICB9XG59KVxuXG5CYXJiYS5EaXNwYXRjaGVyLm9uKCd0cmFuc2l0aW9uQ29tcGxldGVkJywgZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gIC8vcmV2ZWFsRnVuY3Rpb24ucmV2ZWFsKClcbiAgc29jaWFsV2luZG93LnNvY2lhbCgpXG4gIHNtb290aFNjcm9sbC5zY3JvbGwoKVxufSlcblxuQmFyYmEuUGpheC5nZXRUcmFuc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBGYWRlVHJhbnNpdGlvblxufVxuXG5CYXJiYS5QcmVmZXRjaC5pbml0KClcbkJhcmJhLlBqYXguc3RhcnQoKSIsIi8vIGltcG9ydCB7IFR3ZWVuTGl0ZSwgRWxhc3RpYywgQ1NTUGx1Z2luLCBUaW1lbGluZUxpdGUgfSBmcm9tIFwiZ3NhcFwiXG5cbi8vIC8vIEVsZW1lbnRzXG4vLyBjb25zdCAkdmVydGljYWwgPSAkKCcuanMtcC12ZXJ0aWNhbCcpXG5cbi8vIC8vIFRpbWVsaW5lXG4vLyBjb25zdCB0bCA9IG5ldyBUaW1lbGluZUxpdGUoe3BhdXNlZDp0cnVlfSlcblxuLy8gJHZlcnRpY2FsLmVhY2goZnVuY3Rpb24oaSwgYm94KXtcbi8vICAgICB2YXIgJGVsZW1lbnQgPSAkKGJveCk7XG4vLyAgICAgVHdlZW5MaXRlLnN0YWdnZXJUbygkZWxlbWVudCwgMC4zLCB7Y3NzOnsgeTo1MDAgfSwgZWFzZTpCYWNrLmVhc2VPdXR9KVxuLy8gfSlcblxuLy8gJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbihlKXtcbi8vICAgICBjb25zdCBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKClcbi8vICAgICBjb25zdCBkb2NIZWlnaHQgPSAkKGRvY3VtZW50KS5oZWlnaHQoKVxuLy8gICAgIGNvbnN0IHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKVxuLy8gICAgIGNvbnN0IHNjcm9sbFBlcmNlbnQgPSAoc2Nyb2xsVG9wKSAvIChkb2NIZWlnaHQgLSB3aW5IZWlnaHQpXG5cbi8vICAgICB0bC5wcm9ncmVzcyggc2Nyb2xsUGVyY2VudCApLnBhdXNlKClcbi8vIH0pIiwiaW1wb3J0IHNrcm9sbHIgZnJvbSAnc2tyb2xscidcblxuZnVuY3Rpb24gcmV2ZWFsKCkge1xuICAgIChmdW5jdGlvbigkKSB7XG4gICAgICAgIGNvbnN0IHMgPSBza3JvbGxyLmluaXQoe1xuICAgICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy9EZWJ1Z2dpbmcgLSBMb2cgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uLlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuY3VyVG9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCB7IHJldmVhbCB9IiwiZnVuY3Rpb24gc2Nyb2xsKCkge1xuICBjb25zdCAkYW5jaG9yID0gJCgnLmpzLXNtb290aC1zY3JvbGwnKVxuICBjb25zdCBuYXYgPSAkKCcuaGVhZGVyJylcbiAgY29uc3QgbmF2X2hlaWdodCA9IG5hdi5vdXRlckhlaWdodCgpXG5cbiAgJGFuY2hvci5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKVxuXG4gICAgaWYgKHRoaXMuaGFzaCAhPT0gXCJcIikge1xuICAgICAgaWYgKCFocmVmLmNoYXJBdCgwKSA9PSAnIycpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoYXNoID0gdGhpcy5oYXNoXG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJChoYXNoKS5vZmZzZXQoKS50b3AgLSBuYXZfaGVpZ2h0XG4gICAgICB9LCA4MDAsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaDtcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIC8vICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAvLyAgIHZhciB1cmxIYXNoID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCIjXCIpWzFdXG4gIC8vICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7XG4gIC8vICAgICAgIHNjcm9sbFRvcDogJCgnIycgKyB1cmxIYXNoKS5vZmZzZXQoKS50b3BcbiAgLy8gICB9LCA0MDAwKVxuICAvLyB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCB7IHNjcm9sbCB9IiwiZnVuY3Rpb24gc29jaWFsKCkge1xuICAgIGNvbnN0ICRzb2NpYWxXaW5kb3cgPSAkKCcuanMtc29jaWFsLXdpbmRvdycpXG5cbiAgICAkc29jaWFsV2luZG93Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcpXG4gICAgICAgIHdpbmRvdy5vcGVuKHRoaXMuaHJlZiwgXCJTb2NpYWxcIiwgXCJ3aWR0aD04MDAsIGhlaWdodD02MDBcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgc29jaWFsIH0iLCJpbXBvcnQgV2ViRm9udCBmcm9tICd3ZWJmb250bG9hZGVyJ1xuXG5XZWJGb250LmxvYWQoe1xuICAgIGdvb2dsZToge1xuICAgICAgICBmYW1pbGllczogWydNb250c2VycmF0OjQwMCw1MDAsNzAwJ11cbiAgICB9XG59KVxuIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJCYXJiYVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJCYXJiYVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJCYXJiYVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9kaXN0XCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvL1Byb21pc2UgcG9seWZpbGwgaHR0cHM6Ly9naXRodWIuY29tL3RheWxvcmhha2VzL3Byb21pc2UtcG9seWZpbGxcblx0XG5cdGlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgd2luZG93LlByb21pc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXHR9XG5cdFxuXHR2YXIgQmFyYmEgPSB7XG5cdCAgdmVyc2lvbjogJzEuMC4wJyxcblx0ICBCYXNlVHJhbnNpdGlvbjogX193ZWJwYWNrX3JlcXVpcmVfXyg0KSxcblx0ICBCYXNlVmlldzogX193ZWJwYWNrX3JlcXVpcmVfXyg2KSxcblx0ICBCYXNlQ2FjaGU6IF9fd2VicGFja19yZXF1aXJlX18oOCksXG5cdCAgRGlzcGF0Y2hlcjogX193ZWJwYWNrX3JlcXVpcmVfXyg3KSxcblx0ICBIaXN0b3J5TWFuYWdlcjogX193ZWJwYWNrX3JlcXVpcmVfXyg5KSxcblx0ICBQamF4OiBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKSxcblx0ICBQcmVmZXRjaDogX193ZWJwYWNrX3JlcXVpcmVfXygxMyksXG5cdCAgVXRpbHM6IF9fd2VicGFja19yZXF1aXJlX18oNSlcblx0fTtcblx0XG5cdG1vZHVsZS5leHBvcnRzID0gQmFyYmE7XG5cblxuLyoqKi8gfSxcbi8qIDEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqLyhmdW5jdGlvbihzZXRJbW1lZGlhdGUpIHsoZnVuY3Rpb24gKHJvb3QpIHtcblx0XG5cdCAgLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gcHJvbWlzZS1wb2x5ZmlsbCB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcblx0ICAvLyBvdGhlciBjb2RlIG1vZGlmeWluZyBzZXRUaW1lb3V0IChsaWtlIHNpbm9uLnVzZUZha2VUaW1lcnMoKSlcblx0ICB2YXIgc2V0VGltZW91dEZ1bmMgPSBzZXRUaW1lb3V0O1xuXHRcblx0ICBmdW5jdGlvbiBub29wKCkge1xuXHQgIH1cblx0XG5cdCAgLy8gVXNlIHBvbHlmaWxsIGZvciBzZXRJbW1lZGlhdGUgZm9yIHBlcmZvcm1hbmNlIGdhaW5zXG5cdCAgdmFyIGFzYXAgPSAodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBzZXRJbW1lZGlhdGUpIHx8XG5cdCAgICBmdW5jdGlvbiAoZm4pIHtcblx0ICAgICAgc2V0VGltZW91dEZ1bmMoZm4sIDApO1xuXHQgICAgfTtcblx0XG5cdCAgdmFyIG9uVW5oYW5kbGVkUmVqZWN0aW9uID0gZnVuY3Rpb24gb25VbmhhbmRsZWRSZWplY3Rpb24oZXJyKSB7XG5cdCAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUpIHtcblx0ICAgICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246JywgZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdCAgICB9XG5cdCAgfTtcblx0XG5cdCAgLy8gUG9seWZpbGwgZm9yIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5cdCAgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcblx0ICAgIH07XG5cdCAgfVxuXHRcblx0ICBmdW5jdGlvbiBQcm9taXNlKGZuKSB7XG5cdCAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdvYmplY3QnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcblx0ICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIGZ1bmN0aW9uJyk7XG5cdCAgICB0aGlzLl9zdGF0ZSA9IDA7XG5cdCAgICB0aGlzLl9oYW5kbGVkID0gZmFsc2U7XG5cdCAgICB0aGlzLl92YWx1ZSA9IHVuZGVmaW5lZDtcblx0ICAgIHRoaXMuX2RlZmVycmVkcyA9IFtdO1xuXHRcblx0ICAgIGRvUmVzb2x2ZShmbiwgdGhpcyk7XG5cdCAgfVxuXHRcblx0ICBmdW5jdGlvbiBoYW5kbGUoc2VsZiwgZGVmZXJyZWQpIHtcblx0ICAgIHdoaWxlIChzZWxmLl9zdGF0ZSA9PT0gMykge1xuXHQgICAgICBzZWxmID0gc2VsZi5fdmFsdWU7XG5cdCAgICB9XG5cdCAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDApIHtcblx0ICAgICAgc2VsZi5fZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpO1xuXHQgICAgICByZXR1cm47XG5cdCAgICB9XG5cdCAgICBzZWxmLl9oYW5kbGVkID0gdHJ1ZTtcblx0ICAgIGFzYXAoZnVuY3Rpb24gKCkge1xuXHQgICAgICB2YXIgY2IgPSBzZWxmLl9zdGF0ZSA9PT0gMSA/IGRlZmVycmVkLm9uRnVsZmlsbGVkIDogZGVmZXJyZWQub25SZWplY3RlZDtcblx0ICAgICAgaWYgKGNiID09PSBudWxsKSB7XG5cdCAgICAgICAgKHNlbGYuX3N0YXRlID09PSAxID8gcmVzb2x2ZSA6IHJlamVjdCkoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fdmFsdWUpO1xuXHQgICAgICAgIHJldHVybjtcblx0ICAgICAgfVxuXHQgICAgICB2YXIgcmV0O1xuXHQgICAgICB0cnkge1xuXHQgICAgICAgIHJldCA9IGNiKHNlbGYuX3ZhbHVlKTtcblx0ICAgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICAgIHJlamVjdChkZWZlcnJlZC5wcm9taXNlLCBlKTtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICAgIH1cblx0ICAgICAgcmVzb2x2ZShkZWZlcnJlZC5wcm9taXNlLCByZXQpO1xuXHQgICAgfSk7XG5cdCAgfVxuXHRcblx0ICBmdW5jdGlvbiByZXNvbHZlKHNlbGYsIG5ld1ZhbHVlKSB7XG5cdCAgICB0cnkge1xuXHQgICAgICAvLyBQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlOiBodHRwczovL2dpdGh1Yi5jb20vcHJvbWlzZXMtYXBsdXMvcHJvbWlzZXMtc3BlYyN0aGUtcHJvbWlzZS1yZXNvbHV0aW9uLXByb2NlZHVyZVxuXHQgICAgICBpZiAobmV3VmFsdWUgPT09IHNlbGYpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZSBjYW5ub3QgYmUgcmVzb2x2ZWQgd2l0aCBpdHNlbGYuJyk7XG5cdCAgICAgIGlmIChuZXdWYWx1ZSAmJiAodHlwZW9mIG5ld1ZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpKSB7XG5cdCAgICAgICAgdmFyIHRoZW4gPSBuZXdWYWx1ZS50aGVuO1xuXHQgICAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcblx0ICAgICAgICAgIHNlbGYuX3N0YXRlID0gMztcblx0ICAgICAgICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG5cdCAgICAgICAgICBmaW5hbGUoc2VsZik7XG5cdCAgICAgICAgICByZXR1cm47XG5cdCAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgZG9SZXNvbHZlKGJpbmQodGhlbiwgbmV3VmFsdWUpLCBzZWxmKTtcblx0ICAgICAgICAgIHJldHVybjtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgc2VsZi5fc3RhdGUgPSAxO1xuXHQgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuXHQgICAgICBmaW5hbGUoc2VsZik7XG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgIHJlamVjdChzZWxmLCBlKTtcblx0ICAgIH1cblx0ICB9XG5cdFxuXHQgIGZ1bmN0aW9uIHJlamVjdChzZWxmLCBuZXdWYWx1ZSkge1xuXHQgICAgc2VsZi5fc3RhdGUgPSAyO1xuXHQgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcblx0ICAgIGZpbmFsZShzZWxmKTtcblx0ICB9XG5cdFxuXHQgIGZ1bmN0aW9uIGZpbmFsZShzZWxmKSB7XG5cdCAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICBhc2FwKGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIGlmICghc2VsZi5faGFuZGxlZCkge1xuXHQgICAgICAgICAgb25VbmhhbmRsZWRSZWplY3Rpb24oc2VsZi5fdmFsdWUpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfSk7XG5cdCAgICB9XG5cdFxuXHQgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYuX2RlZmVycmVkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICBoYW5kbGUoc2VsZiwgc2VsZi5fZGVmZXJyZWRzW2ldKTtcblx0ICAgIH1cblx0ICAgIHNlbGYuX2RlZmVycmVkcyA9IG51bGw7XG5cdCAgfVxuXHRcblx0ICBmdW5jdGlvbiBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKSB7XG5cdCAgICB0aGlzLm9uRnVsZmlsbGVkID0gdHlwZW9mIG9uRnVsZmlsbGVkID09PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiBudWxsO1xuXHQgICAgdGhpcy5vblJlamVjdGVkID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicgPyBvblJlamVjdGVkIDogbnVsbDtcblx0ICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG5cdCAgfVxuXHRcblx0ICAvKipcblx0ICAgKiBUYWtlIGEgcG90ZW50aWFsbHkgbWlzYmVoYXZpbmcgcmVzb2x2ZXIgZnVuY3Rpb24gYW5kIG1ha2Ugc3VyZVxuXHQgICAqIG9uRnVsZmlsbGVkIGFuZCBvblJlamVjdGVkIGFyZSBvbmx5IGNhbGxlZCBvbmNlLlxuXHQgICAqXG5cdCAgICogTWFrZXMgbm8gZ3VhcmFudGVlcyBhYm91dCBhc3luY2hyb255LlxuXHQgICAqL1xuXHQgIGZ1bmN0aW9uIGRvUmVzb2x2ZShmbiwgc2VsZikge1xuXHQgICAgdmFyIGRvbmUgPSBmYWxzZTtcblx0ICAgIHRyeSB7XG5cdCAgICAgIGZuKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgICAgIGlmIChkb25lKSByZXR1cm47XG5cdCAgICAgICAgZG9uZSA9IHRydWU7XG5cdCAgICAgICAgcmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG5cdCAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcblx0ICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuXHQgICAgICAgIGRvbmUgPSB0cnVlO1xuXHQgICAgICAgIHJlamVjdChzZWxmLCByZWFzb24pO1xuXHQgICAgICB9KTtcblx0ICAgIH0gY2F0Y2ggKGV4KSB7XG5cdCAgICAgIGlmIChkb25lKSByZXR1cm47XG5cdCAgICAgIGRvbmUgPSB0cnVlO1xuXHQgICAgICByZWplY3Qoc2VsZiwgZXgpO1xuXHQgICAgfVxuXHQgIH1cblx0XG5cdCAgUHJvbWlzZS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuXHQgICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcblx0ICB9O1xuXHRcblx0ICBQcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG5cdCAgICB2YXIgcHJvbSA9IG5ldyAodGhpcy5jb25zdHJ1Y3Rvcikobm9vcCk7XG5cdFxuXHQgICAgaGFuZGxlKHRoaXMsIG5ldyBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9tKSk7XG5cdCAgICByZXR1cm4gcHJvbTtcblx0ICB9O1xuXHRcblx0ICBQcm9taXNlLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcblx0ICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcblx0XG5cdCAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHQgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKFtdKTtcblx0ICAgICAgdmFyIHJlbWFpbmluZyA9IGFyZ3MubGVuZ3RoO1xuXHRcblx0ICAgICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICBpZiAodmFsICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSkge1xuXHQgICAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xuXHQgICAgICAgICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICB0aGVuLmNhbGwodmFsLCBmdW5jdGlvbiAodmFsKSB7XG5cdCAgICAgICAgICAgICAgICByZXMoaSwgdmFsKTtcblx0ICAgICAgICAgICAgICB9LCByZWplY3QpO1xuXHQgICAgICAgICAgICAgIHJldHVybjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgfVxuXHQgICAgICAgICAgYXJnc1tpXSA9IHZhbDtcblx0ICAgICAgICAgIGlmICgtLXJlbWFpbmluZyA9PT0gMCkge1xuXHQgICAgICAgICAgICByZXNvbHZlKGFyZ3MpO1xuXHQgICAgICAgICAgfVxuXHQgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG5cdCAgICAgICAgICByZWplY3QoZXgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHRcblx0ICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgcmVzKGksIGFyZ3NbaV0pO1xuXHQgICAgICB9XG5cdCAgICB9KTtcblx0ICB9O1xuXHRcblx0ICBQcm9taXNlLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlKSB7XG5cdCAgICAgIHJldHVybiB2YWx1ZTtcblx0ICAgIH1cblx0XG5cdCAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblx0ICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG5cdCAgICB9KTtcblx0ICB9O1xuXHRcblx0ICBQcm9taXNlLnJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblx0ICAgICAgcmVqZWN0KHZhbHVlKTtcblx0ICAgIH0pO1xuXHQgIH07XG5cdFxuXHQgIFByb21pc2UucmFjZSA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcblx0ICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdCAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWx1ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgICB2YWx1ZXNbaV0udGhlbihyZXNvbHZlLCByZWplY3QpO1xuXHQgICAgICB9XG5cdCAgICB9KTtcblx0ICB9O1xuXHRcblx0ICAvKipcblx0ICAgKiBTZXQgdGhlIGltbWVkaWF0ZSBmdW5jdGlvbiB0byBleGVjdXRlIGNhbGxiYWNrc1xuXHQgICAqIEBwYXJhbSBmbiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRvIGV4ZWN1dGVcblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqL1xuXHQgIFByb21pc2UuX3NldEltbWVkaWF0ZUZuID0gZnVuY3Rpb24gX3NldEltbWVkaWF0ZUZuKGZuKSB7XG5cdCAgICBhc2FwID0gZm47XG5cdCAgfTtcblx0XG5cdCAgUHJvbWlzZS5fc2V0VW5oYW5kbGVkUmVqZWN0aW9uRm4gPSBmdW5jdGlvbiBfc2V0VW5oYW5kbGVkUmVqZWN0aW9uRm4oZm4pIHtcblx0ICAgIG9uVW5oYW5kbGVkUmVqZWN0aW9uID0gZm47XG5cdCAgfTtcblx0XG5cdCAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdCAgICBtb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG5cdCAgfSBlbHNlIGlmICghcm9vdC5Qcm9taXNlKSB7XG5cdCAgICByb290LlByb21pc2UgPSBQcm9taXNlO1xuXHQgIH1cblx0XG5cdH0pKHRoaXMpO1xuXHRcblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovfS5jYWxsKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18oMikuc2V0SW1tZWRpYXRlKSlcblxuLyoqKi8gfSxcbi8qIDIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqLyhmdW5jdGlvbihzZXRJbW1lZGlhdGUsIGNsZWFySW1tZWRpYXRlKSB7dmFyIG5leHRUaWNrID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKS5uZXh0VGljaztcblx0dmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXHR2YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cdHZhciBpbW1lZGlhdGVJZHMgPSB7fTtcblx0dmFyIG5leHRJbW1lZGlhdGVJZCA9IDA7XG5cdFxuXHQvLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXHRcblx0ZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG5cdCAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xuXHR9O1xuXHRleHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG5cdCAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG5cdH07XG5cdGV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cblx0ZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkgeyB0aW1lb3V0LmNsb3NlKCk7IH07XG5cdFxuXHRmdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG5cdCAgdGhpcy5faWQgPSBpZDtcblx0ICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcblx0fVxuXHRUaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5cdFRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG5cdCAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xuXHR9O1xuXHRcblx0Ly8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5cdGV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcblx0ICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cdCAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcblx0fTtcblx0XG5cdGV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG5cdCAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXHQgIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG5cdH07XG5cdFxuXHRleHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuXHQgIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblx0XG5cdCAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG5cdCAgaWYgKG1zZWNzID49IDApIHtcblx0ICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcblx0ICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcblx0ICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcblx0ICAgIH0sIG1zZWNzKTtcblx0ICB9XG5cdH07XG5cdFxuXHQvLyBUaGF0J3Mgbm90IGhvdyBub2RlLmpzIGltcGxlbWVudHMgaXQgYnV0IHRoZSBleHBvc2VkIGFwaSBpcyB0aGUgc2FtZS5cblx0ZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBmdW5jdGlvbihmbikge1xuXHQgIHZhciBpZCA9IG5leHRJbW1lZGlhdGVJZCsrO1xuXHQgIHZhciBhcmdzID0gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBmYWxzZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblx0XG5cdCAgaW1tZWRpYXRlSWRzW2lkXSA9IHRydWU7XG5cdFxuXHQgIG5leHRUaWNrKGZ1bmN0aW9uIG9uTmV4dFRpY2soKSB7XG5cdCAgICBpZiAoaW1tZWRpYXRlSWRzW2lkXSkge1xuXHQgICAgICAvLyBmbi5jYWxsKCkgaXMgZmFzdGVyIHNvIHdlIG9wdGltaXplIGZvciB0aGUgY29tbW9uIHVzZS1jYXNlXG5cdCAgICAgIC8vIEBzZWUgaHR0cDovL2pzcGVyZi5jb20vY2FsbC1hcHBseS1zZWd1XG5cdCAgICAgIGlmIChhcmdzKSB7XG5cdCAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncyk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgZm4uY2FsbChudWxsKTtcblx0ICAgICAgfVxuXHQgICAgICAvLyBQcmV2ZW50IGlkcyBmcm9tIGxlYWtpbmdcblx0ICAgICAgZXhwb3J0cy5jbGVhckltbWVkaWF0ZShpZCk7XG5cdCAgICB9XG5cdCAgfSk7XG5cdFxuXHQgIHJldHVybiBpZDtcblx0fTtcblx0XG5cdGV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSB0eXBlb2YgY2xlYXJJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IGNsZWFySW1tZWRpYXRlIDogZnVuY3Rpb24oaWQpIHtcblx0ICBkZWxldGUgaW1tZWRpYXRlSWRzW2lkXTtcblx0fTtcblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovfS5jYWxsKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18oMikuc2V0SW1tZWRpYXRlLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpLmNsZWFySW1tZWRpYXRlKSlcblxuLyoqKi8gfSxcbi8qIDMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXHRcblx0dmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXHRcblx0Ly8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG5cdC8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuXHQvLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG5cdC8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cdFxuXHR2YXIgY2FjaGVkU2V0VGltZW91dDtcblx0dmFyIGNhY2hlZENsZWFyVGltZW91dDtcblx0XG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgdHJ5IHtcblx0ICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuXHQgIH0gY2F0Y2ggKGUpIHtcblx0ICAgIGNhY2hlZFNldFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuXHQgICAgfVxuXHQgIH1cblx0ICB0cnkge1xuXHQgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuXHQgIH0gY2F0Y2ggKGUpIHtcblx0ICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcblx0ICAgIH1cblx0ICB9XG5cdH0gKCkpXG5cdHZhciBxdWV1ZSA9IFtdO1xuXHR2YXIgZHJhaW5pbmcgPSBmYWxzZTtcblx0dmFyIGN1cnJlbnRRdWV1ZTtcblx0dmFyIHF1ZXVlSW5kZXggPSAtMTtcblx0XG5cdGZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcblx0ICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuXHQgICAgICAgIHJldHVybjtcblx0ICAgIH1cblx0ICAgIGRyYWluaW5nID0gZmFsc2U7XG5cdCAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuXHQgICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcblx0ICAgIH1cblx0ICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcblx0ICAgICAgICBkcmFpblF1ZXVlKCk7XG5cdCAgICB9XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG5cdCAgICBpZiAoZHJhaW5pbmcpIHtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICB9XG5cdCAgICB2YXIgdGltZW91dCA9IGNhY2hlZFNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcblx0ICAgIGRyYWluaW5nID0gdHJ1ZTtcblx0XG5cdCAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuXHQgICAgd2hpbGUobGVuKSB7XG5cdCAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG5cdCAgICAgICAgcXVldWUgPSBbXTtcblx0ICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG5cdCAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcblx0ICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG5cdCAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuXHQgICAgfVxuXHQgICAgY3VycmVudFF1ZXVlID0gbnVsbDtcblx0ICAgIGRyYWluaW5nID0gZmFsc2U7XG5cdCAgICBjYWNoZWRDbGVhclRpbWVvdXQodGltZW91dCk7XG5cdH1cblx0XG5cdHByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG5cdCAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG5cdCAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuXHQgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcblx0ICAgICAgICBjYWNoZWRTZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuXHQgICAgfVxuXHR9O1xuXHRcblx0Ly8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuXHRmdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcblx0ICAgIHRoaXMuZnVuID0gZnVuO1xuXHQgICAgdGhpcy5hcnJheSA9IGFycmF5O1xuXHR9XG5cdEl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xuXHR9O1xuXHRwcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xuXHRwcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xuXHRwcm9jZXNzLmVudiA9IHt9O1xuXHRwcm9jZXNzLmFyZ3YgPSBbXTtcblx0cHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5cdHByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblx0XG5cdGZ1bmN0aW9uIG5vb3AoKSB7fVxuXHRcblx0cHJvY2Vzcy5vbiA9IG5vb3A7XG5cdHByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xuXHRwcm9jZXNzLm9uY2UgPSBub29wO1xuXHRwcm9jZXNzLm9mZiA9IG5vb3A7XG5cdHByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xuXHRwcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5cdHByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cdFxuXHRwcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuXHQgICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xuXHR9O1xuXHRcblx0cHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcblx0cHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcblx0ICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG5cdH07XG5cdHByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuLyoqKi8gfSxcbi8qIDQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBVdGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cdFxuXHQvKipcblx0ICogQmFzZVRyYW5zaXRpb24gdG8gZXh0ZW5kXG5cdCAqXG5cdCAqIEBuYW1lc3BhY2UgQmFyYmEuQmFzZVRyYW5zaXRpb25cblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHZhciBCYXNlVHJhbnNpdGlvbiA9IHtcblx0ICAvKipcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuQmFzZVRyYW5zaXRpb25cblx0ICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG5cdCAgICovXG5cdCAgb2xkQ29udGFpbmVyOiB1bmRlZmluZWQsXG5cdFxuXHQgIC8qKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVHJhbnNpdGlvblxuXHQgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cblx0ICAgKi9cblx0ICBuZXdDb250YWluZXI6IHVuZGVmaW5lZCxcblx0XG5cdCAgLyoqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VUcmFuc2l0aW9uXG5cdCAgICogQHR5cGUge1Byb21pc2V9XG5cdCAgICovXG5cdCAgbmV3Q29udGFpbmVyTG9hZGluZzogdW5kZWZpbmVkLFxuXHRcblx0ICAvKipcblx0ICAgKiBIZWxwZXIgdG8gZXh0ZW5kIHRoZSBvYmplY3Rcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVHJhbnNpdGlvblxuXHQgICAqIEBwYXJhbSAge09iamVjdH0gbmV3T2JqZWN0XG5cdCAgICogQHJldHVybiB7T2JqZWN0fSBuZXdJbmhlcml0T2JqZWN0XG5cdCAgICovXG5cdCAgZXh0ZW5kOiBmdW5jdGlvbihvYmope1xuXHQgICAgcmV0dXJuIFV0aWxzLmV4dGVuZCh0aGlzLCBvYmopO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGZyb20gUGpheCBtb2R1bGUgdG8gaW5pdGlhbGl6ZVxuXHQgICAqIHRoZSB0cmFuc2l0aW9uLlxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VUcmFuc2l0aW9uXG5cdCAgICogQHByaXZhdGVcblx0ICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gb2xkQ29udGFpbmVyXG5cdCAgICogQHBhcmFtICB7UHJvbWlzZX0gbmV3Q29udGFpbmVyXG5cdCAgICogQHJldHVybiB7UHJvbWlzZX1cblx0ICAgKi9cblx0ICBpbml0OiBmdW5jdGlvbihvbGRDb250YWluZXIsIG5ld0NvbnRhaW5lcikge1xuXHQgICAgdmFyIF90aGlzID0gdGhpcztcblx0XG5cdCAgICB0aGlzLm9sZENvbnRhaW5lciA9IG9sZENvbnRhaW5lcjtcblx0ICAgIHRoaXMuX25ld0NvbnRhaW5lclByb21pc2UgPSBuZXdDb250YWluZXI7XG5cdFxuXHQgICAgdGhpcy5kZWZlcnJlZCA9IFV0aWxzLmRlZmVycmVkKCk7XG5cdCAgICB0aGlzLm5ld0NvbnRhaW5lclJlYWR5ID0gVXRpbHMuZGVmZXJyZWQoKTtcblx0ICAgIHRoaXMubmV3Q29udGFpbmVyTG9hZGluZyA9IHRoaXMubmV3Q29udGFpbmVyUmVhZHkucHJvbWlzZTtcblx0XG5cdCAgICB0aGlzLnN0YXJ0KCk7XG5cdFxuXHQgICAgdGhpcy5fbmV3Q29udGFpbmVyUHJvbWlzZS50aGVuKGZ1bmN0aW9uKG5ld0NvbnRhaW5lcikge1xuXHQgICAgICBfdGhpcy5uZXdDb250YWluZXIgPSBuZXdDb250YWluZXI7XG5cdCAgICAgIF90aGlzLm5ld0NvbnRhaW5lclJlYWR5LnJlc29sdmUoKTtcblx0ICAgIH0pO1xuXHRcblx0ICAgIHJldHVybiB0aGlzLmRlZmVycmVkLnByb21pc2U7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogVGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSBjYWxsZWQgYXMgc29vbiB0aGUgVHJhbnNpdGlvbiBpcyBmaW5pc2hlZFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VUcmFuc2l0aW9uXG5cdCAgICovXG5cdCAgZG9uZTogZnVuY3Rpb24oKSB7XG5cdCAgICB0aGlzLm9sZENvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMub2xkQ29udGFpbmVyKTtcblx0ICAgIHRoaXMubmV3Q29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG5cdCAgICB0aGlzLmRlZmVycmVkLnJlc29sdmUoKTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBDb25zdHJ1Y3RvciBmb3IgeW91ciBUcmFuc2l0aW9uXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuQmFzZVRyYW5zaXRpb25cblx0ICAgKiBAYWJzdHJhY3Rcblx0ICAgKi9cblx0ICBzdGFydDogZnVuY3Rpb24oKSB7fSxcblx0fTtcblx0XG5cdG1vZHVsZS5leHBvcnRzID0gQmFzZVRyYW5zaXRpb247XG5cblxuLyoqKi8gfSxcbi8qIDUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qKlxuXHQgKiBKdXN0IGFuIG9iamVjdCB3aXRoIHNvbWUgaGVscGZ1bCBmdW5jdGlvbnNcblx0ICpcblx0ICogQHR5cGUge09iamVjdH1cblx0ICogQG5hbWVzcGFjZSBCYXJiYS5VdGlsc1xuXHQgKi9cblx0dmFyIFV0aWxzID0ge1xuXHQgIC8qKlxuXHQgICAqIFJldHVybiB0aGUgY3VycmVudCB1cmxcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5VdGlsc1xuXHQgICAqIEByZXR1cm4ge1N0cmluZ30gY3VycmVudFVybFxuXHQgICAqL1xuXHQgIGdldEN1cnJlbnRVcmw6IGZ1bmN0aW9uKCkge1xuXHQgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgK1xuXHQgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcblx0ICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuXHQgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogR2l2ZW4gYW4gdXJsLCByZXR1cm4gaXQgd2l0aG91dCB0aGUgaGFzaFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlV0aWxzXG5cdCAgICogQHByaXZhdGVcblx0ICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybFxuXHQgICAqIEByZXR1cm4ge1N0cmluZ30gbmV3Q2xlYW5Vcmxcblx0ICAgKi9cblx0ICBjbGVhbkxpbms6IGZ1bmN0aW9uKHVybCkge1xuXHQgICAgcmV0dXJuIHVybC5yZXBsYWNlKC8jLiovLCAnJyk7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogVGltZSBpbiBtaWxsaXNlY29uZCBhZnRlciB0aGUgeGhyIHJlcXVlc3QgZ29lcyBpbiB0aW1lb3V0XG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuVXRpbHNcblx0ICAgKiBAdHlwZSB7TnVtYmVyfVxuXHQgICAqIEBkZWZhdWx0XG5cdCAgICovXG5cdCAgeGhyVGltZW91dDogNTAwMCxcblx0XG5cdCAgLyoqXG5cdCAgICogU3RhcnQgYW4gWE1MSHR0cFJlcXVlc3QoKSBhbmQgcmV0dXJuIGEgUHJvbWlzZVxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlV0aWxzXG5cdCAgICogQHBhcmFtICB7U3RyaW5nfSB1cmxcblx0ICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuXHQgICAqL1xuXHQgIHhocjogZnVuY3Rpb24odXJsKSB7XG5cdCAgICB2YXIgZGVmZXJyZWQgPSB0aGlzLmRlZmVycmVkKCk7XG5cdCAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFxuXHQgICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT09IDQpIHtcblx0ICAgICAgICBpZiAocmVxLnN0YXR1cyA9PT0gMjAwKSB7XG5cdCAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVzb2x2ZShyZXEucmVzcG9uc2VUZXh0KTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlamVjdChuZXcgRXJyb3IoJ3hocjogSFRUUCBjb2RlIGlzIG5vdCAyMDAnKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIHJlcS5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgcmV0dXJuIGRlZmVycmVkLnJlamVjdChuZXcgRXJyb3IoJ3hocjogVGltZW91dCBleGNlZWRlZCcpKTtcblx0ICAgIH07XG5cdFxuXHQgICAgcmVxLm9wZW4oJ0dFVCcsIHVybCk7XG5cdCAgICByZXEudGltZW91dCA9IHRoaXMueGhyVGltZW91dDtcblx0ICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCd4LWJhcmJhJywgJ3llcycpO1xuXHQgICAgcmVxLnNlbmQoKTtcblx0XG5cdCAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBHZXQgb2JqIGFuZCBwcm9wcyBhbmQgcmV0dXJuIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0eSBtZXJnZWRcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5VdGlsc1xuXHQgICAqIEBwYXJhbSAge29iamVjdH0gb2JqXG5cdCAgICogQHBhcmFtICB7b2JqZWN0fSBwcm9wc1xuXHQgICAqIEByZXR1cm4ge29iamVjdH1cblx0ICAgKi9cblx0ICBleHRlbmQ6IGZ1bmN0aW9uKG9iaiwgcHJvcHMpIHtcblx0ICAgIHZhciBuZXdPYmogPSBPYmplY3QuY3JlYXRlKG9iaik7XG5cdFxuXHQgICAgZm9yKHZhciBwcm9wIGluIHByb3BzKSB7XG5cdCAgICAgIGlmKHByb3BzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG5cdCAgICAgICAgbmV3T2JqW3Byb3BdID0gcHJvcHNbcHJvcF07XG5cdCAgICAgIH1cblx0ICAgIH1cblx0XG5cdCAgICByZXR1cm4gbmV3T2JqO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIFJldHVybiBhIG5ldyBcIkRlZmVycmVkXCIgb2JqZWN0XG5cdCAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Nb3ppbGxhL0phdmFTY3JpcHRfY29kZV9tb2R1bGVzL1Byb21pc2UuanNtL0RlZmVycmVkXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuVXRpbHNcblx0ICAgKiBAcmV0dXJuIHtEZWZlcnJlZH1cblx0ICAgKi9cblx0ICBkZWZlcnJlZDogZnVuY3Rpb24oKSB7XG5cdCAgICByZXR1cm4gbmV3IGZ1bmN0aW9uKCkge1xuXHQgICAgICB0aGlzLnJlc29sdmUgPSBudWxsO1xuXHQgICAgICB0aGlzLnJlamVjdCA9IG51bGw7XG5cdFxuXHQgICAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0ICAgICAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuXHQgICAgICAgIHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuXHQgICAgICB9LmJpbmQodGhpcykpO1xuXHQgICAgfTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBSZXR1cm4gdGhlIHBvcnQgbnVtYmVyIG5vcm1hbGl6ZWQsIGV2ZW50dWFsbHkgeW91IGNhbiBwYXNzIGEgc3RyaW5nIHRvIGJlIG5vcm1hbGl6ZWQuXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuVXRpbHNcblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqIEBwYXJhbSAge1N0cmluZ30gcFxuXHQgICAqIEByZXR1cm4ge0ludH0gcG9ydFxuXHQgICAqL1xuXHQgIGdldFBvcnQ6IGZ1bmN0aW9uKHApIHtcblx0ICAgIHZhciBwb3J0ID0gdHlwZW9mIHAgIT09ICd1bmRlZmluZWQnID8gcCA6IHdpbmRvdy5sb2NhdGlvbi5wb3J0O1xuXHQgICAgdmFyIHByb3RvY29sID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuXHRcblx0ICAgIGlmIChwb3J0ICE9ICcnKVxuXHQgICAgICByZXR1cm4gcGFyc2VJbnQocG9ydCk7XG5cdFxuXHQgICAgaWYgKHByb3RvY29sID09PSAnaHR0cDonKVxuXHQgICAgICByZXR1cm4gODA7XG5cdFxuXHQgICAgaWYgKHByb3RvY29sID09PSAnaHR0cHM6Jylcblx0ICAgICAgcmV0dXJuIDQ0Mztcblx0ICB9XG5cdH07XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IFV0aWxzO1xuXG5cbi8qKiovIH0sXG4vKiA2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgRGlzcGF0Y2hlciA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cdHZhciBVdGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cdFxuXHQvKipcblx0ICogQmFzZVZpZXcgdG8gYmUgZXh0ZW5kZWRcblx0ICpcblx0ICogQG5hbWVzcGFjZSBCYXJiYS5CYXNlVmlld1xuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0dmFyIEJhc2VWaWV3ICA9IHtcblx0ICAvKipcblx0ICAgKiBOYW1lc3BhY2Ugb2YgdGhlIHZpZXcuXG5cdCAgICogKG5lZWQgdG8gYmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBkYXRhLW5hbWVzcGFjZSBvZiB0aGUgY29udGFpbmVyKVxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VWaWV3XG5cdCAgICogQHR5cGUge1N0cmluZ31cblx0ICAgKi9cblx0ICBuYW1lc3BhY2U6IG51bGwsXG5cdFxuXHQgIC8qKlxuXHQgICAqIEhlbHBlciB0byBleHRlbmQgdGhlIG9iamVjdFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VWaWV3XG5cdCAgICogQHBhcmFtICB7T2JqZWN0fSBuZXdPYmplY3Rcblx0ICAgKiBAcmV0dXJuIHtPYmplY3R9IG5ld0luaGVyaXRPYmplY3Rcblx0ICAgKi9cblx0ICBleHRlbmQ6IGZ1bmN0aW9uKG9iail7XG5cdCAgICByZXR1cm4gVXRpbHMuZXh0ZW5kKHRoaXMsIG9iaik7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogSW5pdCB0aGUgdmlldy5cblx0ICAgKiBQLlMuIElzIHN1Z2dlc3RlZCB0byBpbml0IHRoZSB2aWV3IGJlZm9yZSBzdGFydGluZyBCYXJiYS5QamF4LnN0YXJ0KCksXG5cdCAgICogaW4gdGhpcyB3YXkgLm9uRW50ZXIoKSBhbmQgLm9uRW50ZXJDb21wbGV0ZWQoKSB3aWxsIGJlIGZpcmVkIGZvciB0aGUgY3VycmVudFxuXHQgICAqIGNvbnRhaW5lciB3aGVuIHRoZSBwYWdlIGlzIGxvYWRlZC5cblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVmlld1xuXHQgICAqL1xuXHQgIGluaXQ6IGZ1bmN0aW9uKCkge1xuXHQgICAgdmFyIF90aGlzID0gdGhpcztcblx0XG5cdCAgICBEaXNwYXRjaGVyLm9uKCdpbml0U3RhdGVDaGFuZ2UnLFxuXHQgICAgICBmdW5jdGlvbihuZXdTdGF0dXMsIG9sZFN0YXR1cykge1xuXHQgICAgICAgIGlmIChvbGRTdGF0dXMgJiYgb2xkU3RhdHVzLm5hbWVzcGFjZSA9PT0gX3RoaXMubmFtZXNwYWNlKVxuXHQgICAgICAgICAgX3RoaXMub25MZWF2ZSgpO1xuXHQgICAgICB9XG5cdCAgICApO1xuXHRcblx0ICAgIERpc3BhdGNoZXIub24oJ25ld1BhZ2VSZWFkeScsXG5cdCAgICAgIGZ1bmN0aW9uKG5ld1N0YXR1cywgb2xkU3RhdHVzLCBjb250YWluZXIpIHtcblx0ICAgICAgICBfdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cdFxuXHQgICAgICAgIGlmIChuZXdTdGF0dXMubmFtZXNwYWNlID09PSBfdGhpcy5uYW1lc3BhY2UpXG5cdCAgICAgICAgICBfdGhpcy5vbkVudGVyKCk7XG5cdCAgICAgIH1cblx0ICAgICk7XG5cdFxuXHQgICAgRGlzcGF0Y2hlci5vbigndHJhbnNpdGlvbkNvbXBsZXRlZCcsXG5cdCAgICAgIGZ1bmN0aW9uKG5ld1N0YXR1cywgb2xkU3RhdHVzKSB7XG5cdCAgICAgICAgaWYgKG5ld1N0YXR1cy5uYW1lc3BhY2UgPT09IF90aGlzLm5hbWVzcGFjZSlcblx0ICAgICAgICAgIF90aGlzLm9uRW50ZXJDb21wbGV0ZWQoKTtcblx0XG5cdCAgICAgICAgaWYgKG9sZFN0YXR1cyAmJiBvbGRTdGF0dXMubmFtZXNwYWNlID09PSBfdGhpcy5uYW1lc3BhY2UpXG5cdCAgICAgICAgICBfdGhpcy5vbkxlYXZlQ29tcGxldGVkKCk7XG5cdCAgICAgIH1cblx0ICAgICk7XG5cdCAgfSxcblx0XG5cdCAvKipcblx0ICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBmaXJlZCB3aGVuIHRoZSBjb250YWluZXJcblx0ICAqIGlzIHJlYWR5IGFuZCBhdHRhY2hlZCB0byB0aGUgRE9NLlxuXHQgICpcblx0ICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVmlld1xuXHQgICogQGFic3RyYWN0XG5cdCAgKi9cblx0ICBvbkVudGVyOiBmdW5jdGlvbigpIHt9LFxuXHRcblx0ICAvKipcblx0ICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgZmlyZWQgd2hlbiB0aGUgdHJhbnNpdGlvblxuXHQgICAqIHRvIHRoaXMgY29udGFpbmVyIGhhcyBqdXN0IGZpbmlzaGVkLlxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VWaWV3XG5cdCAgICogQGFic3RyYWN0XG5cdCAgICovXG5cdCAgb25FbnRlckNvbXBsZXRlZDogZnVuY3Rpb24oKSB7fSxcblx0XG5cdCAgLyoqXG5cdCAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGZpcmVkIHdoZW4gdGhlIHRyYW5zaXRpb25cblx0ICAgKiB0byBhIG5ldyBjb250YWluZXIgaGFzIGp1c3Qgc3RhcnRlZC5cblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlVmlld1xuXHQgICAqIEBhYnN0cmFjdFxuXHQgICAqL1xuXHQgIG9uTGVhdmU6IGZ1bmN0aW9uKCkge30sXG5cdFxuXHQgIC8qKlxuXHQgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBmaXJlZCB3aGVuIHRoZSBjb250YWluZXJcblx0ICAgKiBoYXMganVzdCBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgRE9NLlxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VWaWV3XG5cdCAgICogQGFic3RyYWN0XG5cdCAgICovXG5cdCAgb25MZWF2ZUNvbXBsZXRlZDogZnVuY3Rpb24oKSB7fVxuXHR9XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IEJhc2VWaWV3O1xuXG5cbi8qKiovIH0sXG4vKiA3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogTGl0dGxlIERpc3BhdGNoZXIgaW5zcGlyZWQgYnkgTWljcm9FdmVudC5qc1xuXHQgKlxuXHQgKiBAbmFtZXNwYWNlIEJhcmJhLkRpc3BhdGNoZXJcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHZhciBEaXNwYXRjaGVyID0ge1xuXHQgIC8qKlxuXHQgICAqIE9iamVjdCB0aGF0IGtlZXBzIGFsbCB0aGUgZXZlbnRzXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuRGlzcGF0Y2hlclxuXHQgICAqIEByZWFkT25seVxuXHQgICAqIEB0eXBlIHtPYmplY3R9XG5cdCAgICovXG5cdCAgZXZlbnRzOiB7fSxcblx0XG5cdCAgLyoqXG5cdCAgICogQmluZCBhIGNhbGxiYWNrIHRvIGFuIGV2ZW50XG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuRGlzcGF0Y2hlclxuXHQgICAqIEBwYXJhbSAge1N0cmluZ30gZXZlbnROYW1lXG5cdCAgICogQHBhcmFtICB7RnVuY3Rpb259IGZ1bmN0aW9uXG5cdCAgICovXG5cdCAgb246IGZ1bmN0aW9uKGUsIGYpIHtcblx0ICAgIHRoaXMuZXZlbnRzW2VdID0gdGhpcy5ldmVudHNbZV0gfHwgW107XG5cdCAgICB0aGlzLmV2ZW50c1tlXS5wdXNoKGYpO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIFVuYmluZCBldmVudFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkRpc3BhdGNoZXJcblx0ICAgKiBAcGFyYW0gIHtTdHJpbmd9IGV2ZW50TmFtZVxuXHQgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmdW5jdGlvblxuXHQgICAqL1xuXHQgIG9mZjogZnVuY3Rpb24oZSwgZikge1xuXHQgICAgaWYoZSBpbiB0aGlzLmV2ZW50cyA9PT0gZmFsc2UpXG5cdCAgICAgIHJldHVybjtcblx0XG5cdCAgICB0aGlzLmV2ZW50c1tlXS5zcGxpY2UodGhpcy5ldmVudHNbZV0uaW5kZXhPZihmKSwgMSk7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogRmlyZSB0aGUgZXZlbnQgcnVubmluZyBhbGwgdGhlIGV2ZW50IGFzc29jaWF0ZWQgdG8gaXRcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5EaXNwYXRjaGVyXG5cdCAgICogQHBhcmFtICB7U3RyaW5nfSBldmVudE5hbWVcblx0ICAgKiBAcGFyYW0gIHsuLi4qfSBhcmdzXG5cdCAgICovXG5cdCAgdHJpZ2dlcjogZnVuY3Rpb24oZSkgey8vZSwgLi4uYXJnc1xuXHQgICAgaWYgKGUgaW4gdGhpcy5ldmVudHMgPT09IGZhbHNlKVxuXHQgICAgICByZXR1cm47XG5cdFxuXHQgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRzW2VdLmxlbmd0aDsgaSsrKXtcblx0ICAgICAgdGhpcy5ldmVudHNbZV1baV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG5cdCAgICB9XG5cdCAgfVxuXHR9O1xuXHRcblx0bW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGVyO1xuXG5cbi8qKiovIH0sXG4vKiA4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgVXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXHRcblx0LyoqXG5cdCAqIEJhc2VDYWNoZSBpdCdzIGEgc2ltcGxlIHN0YXRpYyBjYWNoZVxuXHQgKlxuXHQgKiBAbmFtZXNwYWNlIEJhcmJhLkJhc2VDYWNoZVxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0dmFyIEJhc2VDYWNoZSA9IHtcblx0ICAvKipcblx0ICAgKiBUaGUgT2JqZWN0IHRoYXQga2VlcHMgYWxsIHRoZSBrZXkgdmFsdWUgaW5mb3JtYXRpb25cblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5CYXNlQ2FjaGVcblx0ICAgKiBAdHlwZSB7T2JqZWN0fVxuXHQgICAqL1xuXHQgIGRhdGE6IHt9LFxuXHRcblx0ICAvKipcblx0ICAgKiBIZWxwZXIgdG8gZXh0ZW5kIHRoaXMgb2JqZWN0XG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuQmFzZUNhY2hlXG5cdCAgICogQHByaXZhdGVcblx0ICAgKiBAcGFyYW0gIHtPYmplY3R9IG5ld09iamVjdFxuXHQgICAqIEByZXR1cm4ge09iamVjdH0gbmV3SW5oZXJpdE9iamVjdFxuXHQgICAqL1xuXHQgIGV4dGVuZDogZnVuY3Rpb24ob2JqKSB7XG5cdCAgICByZXR1cm4gVXRpbHMuZXh0ZW5kKHRoaXMsIG9iaik7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogU2V0IGEga2V5IGFuZCB2YWx1ZSBkYXRhLCBtYWlubHkgQmFyYmEgaXMgZ29pbmcgdG8gc2F2ZSBwcm9taXNlc1xuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VDYWNoZVxuXHQgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICAgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAgICovXG5cdCAgc2V0OiBmdW5jdGlvbihrZXksIHZhbCkge1xuXHQgICAgdGhpcy5kYXRhW2tleV0gPSB2YWw7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogUmV0cmlldmUgdGhlIGRhdGEgdXNpbmcgdGhlIGtleVxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VDYWNoZVxuXHQgICAqIEBwYXJhbSAge1N0cmluZ30ga2V5XG5cdCAgICogQHJldHVybiB7Kn1cblx0ICAgKi9cblx0ICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuXHQgICAgcmV0dXJuIHRoaXMuZGF0YVtrZXldO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEZsdXNoIHRoZSBjYWNoZVxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkJhc2VDYWNoZVxuXHQgICAqL1xuXHQgIHJlc2V0OiBmdW5jdGlvbigpIHtcblx0ICAgIHRoaXMuZGF0YSA9IHt9O1xuXHQgIH1cblx0fTtcblx0XG5cdG1vZHVsZS5leHBvcnRzID0gQmFzZUNhY2hlO1xuXG5cbi8qKiovIH0sXG4vKiA5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogSGlzdG9yeU1hbmFnZXIgaGVscHMgdG8ga2VlcCB0cmFjayBvZiB0aGUgbmF2aWdhdGlvblxuXHQgKlxuXHQgKiBAbmFtZXNwYWNlIEJhcmJhLkhpc3RvcnlNYW5hZ2VyXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHR2YXIgSGlzdG9yeU1hbmFnZXIgPSB7XG5cdCAgLyoqXG5cdCAgICogS2VlcCB0cmFjayBvZiB0aGUgc3RhdHVzIGluIGhpc3RvcmljIG9yZGVyXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuSGlzdG9yeU1hbmFnZXJcblx0ICAgKiBAcmVhZE9ubHlcblx0ICAgKiBAdHlwZSB7QXJyYXl9XG5cdCAgICovXG5cdCAgaGlzdG9yeTogW10sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEFkZCBhIG5ldyBzZXQgb2YgdXJsIGFuZCBuYW1lc3BhY2Vcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5IaXN0b3J5TWFuYWdlclxuXHQgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcblx0ICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCAgICogQHByaXZhdGVcblx0ICAgKi9cblx0ICBhZGQ6IGZ1bmN0aW9uKHVybCwgbmFtZXNwYWNlKSB7XG5cdCAgICBpZiAoIW5hbWVzcGFjZSlcblx0ICAgICAgbmFtZXNwYWNlID0gdW5kZWZpbmVkO1xuXHRcblx0ICAgIHRoaXMuaGlzdG9yeS5wdXNoKHtcblx0ICAgICAgdXJsOiB1cmwsXG5cdCAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlXG5cdCAgICB9KTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBSZXR1cm4gaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnQgc3RhdHVzXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuSGlzdG9yeU1hbmFnZXJcblx0ICAgKiBAcmV0dXJuIHtPYmplY3R9XG5cdCAgICovXG5cdCAgY3VycmVudFN0YXR1czogZnVuY3Rpb24oKSB7XG5cdCAgICByZXR1cm4gdGhpcy5oaXN0b3J5W3RoaXMuaGlzdG9yeS5sZW5ndGggLSAxXTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBSZXR1cm4gaW5mb3JtYXRpb24gYWJvdXQgdGhlIHByZXZpb3VzIHN0YXR1c1xuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLkhpc3RvcnlNYW5hZ2VyXG5cdCAgICogQHJldHVybiB7T2JqZWN0fVxuXHQgICAqL1xuXHQgIHByZXZTdGF0dXM6IGZ1bmN0aW9uKCkge1xuXHQgICAgdmFyIGhpc3RvcnkgPSB0aGlzLmhpc3Rvcnk7XG5cdFxuXHQgICAgaWYgKGhpc3RvcnkubGVuZ3RoIDwgMilcblx0ICAgICAgcmV0dXJuIG51bGw7XG5cdFxuXHQgICAgcmV0dXJuIGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSAyXTtcblx0ICB9XG5cdH07XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IEhpc3RvcnlNYW5hZ2VyO1xuXG5cbi8qKiovIH0sXG4vKiAxMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIFV0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblx0dmFyIERpc3BhdGNoZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xuXHR2YXIgSGlkZVNob3dUcmFuc2l0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XG5cdHZhciBCYXNlQ2FjaGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXHRcblx0dmFyIEhpc3RvcnlNYW5hZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcblx0dmFyIERvbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpO1xuXHRcblx0LyoqXG5cdCAqIFBqYXggaXMgYSBzdGF0aWMgb2JqZWN0IHdpdGggbWFpbiBmdW5jdGlvblxuXHQgKlxuXHQgKiBAbmFtZXNwYWNlIEJhcmJhLlBqYXhcblx0ICogQGJvcnJvd3MgRG9tIGFzIERvbVxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0dmFyIFBqYXggPSB7XG5cdCAgRG9tOiBEb20sXG5cdCAgSGlzdG9yeTogSGlzdG9yeU1hbmFnZXIsXG5cdCAgQ2FjaGU6IEJhc2VDYWNoZSxcblx0XG5cdCAgLyoqXG5cdCAgICogSW5kaWNhdGUgd2V0aGVyIG9yIG5vdCB1c2UgdGhlIGNhY2hlXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheFxuXHQgICAqIEB0eXBlIHtCb29sZWFufVxuXHQgICAqIEBkZWZhdWx0XG5cdCAgICovXG5cdCAgY2FjaGVFbmFibGVkOiB0cnVlLFxuXHRcblx0ICAvKipcblx0ICAgKiBJbmRpY2F0ZSBpZiB0aGVyZSBpcyBhbiBhbmltYXRpb24gaW4gcHJvZ3Jlc3Ncblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICogQHJlYWRPbmx5XG5cdCAgICogQHR5cGUge0Jvb2xlYW59XG5cdCAgICovXG5cdCAgdHJhbnNpdGlvblByb2dyZXNzOiBmYWxzZSxcblx0XG5cdCAgLyoqXG5cdCAgICogQ2xhc3MgbmFtZSB1c2VkIHRvIGlnbm9yZSBsaW5rc1xuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXhcblx0ICAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICAqIEBkZWZhdWx0XG5cdCAgICovXG5cdCAgaWdub3JlQ2xhc3NMaW5rOiAnbm8tYmFyYmEnLFxuXHRcblx0ICAvKipcblx0ICAgKiBGdW5jdGlvbiB0byBiZSBjYWxsZWQgdG8gc3RhcnQgUGpheFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXhcblx0ICAgKi9cblx0ICBzdGFydDogZnVuY3Rpb24oKSB7XG5cdCAgICB0aGlzLmluaXQoKTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBJbml0IHRoZSBldmVudHNcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICogQHByaXZhdGVcblx0ICAgKi9cblx0ICBpbml0OiBmdW5jdGlvbigpIHtcblx0ICAgIHZhciBjb250YWluZXIgPSB0aGlzLkRvbS5nZXRDb250YWluZXIoKTtcblx0ICAgIHZhciB3cmFwcGVyID0gdGhpcy5Eb20uZ2V0V3JhcHBlcigpO1xuXHRcblx0ICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCAncG9saXRlJyk7XG5cdFxuXHQgICAgdGhpcy5IaXN0b3J5LmFkZChcblx0ICAgICAgdGhpcy5nZXRDdXJyZW50VXJsKCksXG5cdCAgICAgIHRoaXMuRG9tLmdldE5hbWVzcGFjZShjb250YWluZXIpXG5cdCAgICApO1xuXHRcblx0ICAgIC8vRmlyZSBmb3IgdGhlIGN1cnJlbnQgdmlldy5cblx0ICAgIERpc3BhdGNoZXIudHJpZ2dlcignaW5pdFN0YXRlQ2hhbmdlJywgdGhpcy5IaXN0b3J5LmN1cnJlbnRTdGF0dXMoKSk7XG5cdCAgICBEaXNwYXRjaGVyLnRyaWdnZXIoJ25ld1BhZ2VSZWFkeScsXG5cdCAgICAgIHRoaXMuSGlzdG9yeS5jdXJyZW50U3RhdHVzKCksXG5cdCAgICAgIHt9LFxuXHQgICAgICBjb250YWluZXIsXG5cdCAgICAgIHRoaXMuRG9tLmN1cnJlbnRIVE1MXG5cdCAgICApO1xuXHQgICAgRGlzcGF0Y2hlci50cmlnZ2VyKCd0cmFuc2l0aW9uQ29tcGxldGVkJywgdGhpcy5IaXN0b3J5LmN1cnJlbnRTdGF0dXMoKSk7XG5cdFxuXHQgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogQXR0YWNoIHRoZSBldmVudGxpc3RlbmVyc1xuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXhcblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqL1xuXHQgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuXHQgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuXHQgICAgICB0aGlzLm9uTGlua0NsaWNrLmJpbmQodGhpcylcblx0ICAgICk7XG5cdFxuXHQgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJyxcblx0ICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlLmJpbmQodGhpcylcblx0ICAgICk7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogUmV0dXJuIHRoZSBjdXJyZW50VVJMIGNsZWFuZWRcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICogQHJldHVybiB7U3RyaW5nfSBjdXJyZW50VXJsXG5cdCAgICovXG5cdCAgZ2V0Q3VycmVudFVybDogZnVuY3Rpb24oKSB7XG5cdCAgICByZXR1cm4gVXRpbHMuY2xlYW5MaW5rKFxuXHQgICAgICBVdGlscy5nZXRDdXJyZW50VXJsKClcblx0ICAgICk7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogQ2hhbmdlIHRoZSBVUkwgd2l0aCBwdXNoc3RhdGUgYW5kIHRyaWdnZXIgdGhlIHN0YXRlIGNoYW5nZVxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXhcblx0ICAgKiBAcGFyYW0ge1N0cmluZ30gbmV3VXJsXG5cdCAgICovXG5cdCAgZ29UbzogZnVuY3Rpb24odXJsKSB7XG5cdCAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdXJsKTtcblx0ICAgIHRoaXMub25TdGF0ZUNoYW5nZSgpO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEZvcmNlIHRoZSBicm93c2VyIHRvIGdvIHRvIGEgY2VydGFpbiB1cmxcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuXHQgICAqIEBwcml2YXRlXG5cdCAgICovXG5cdCAgZm9yY2VHb1RvOiBmdW5jdGlvbih1cmwpIHtcblx0ICAgIHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBMb2FkIGFuIHVybCwgd2lsbCBzdGFydCBhbiB4aHIgcmVxdWVzdCBvciBsb2FkIGZyb20gdGhlIGNhY2hlXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheFxuXHQgICAqIEBwcml2YXRlXG5cdCAgICogQHBhcmFtICB7U3RyaW5nfSB1cmxcblx0ICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuXHQgICAqL1xuXHQgIGxvYWQ6IGZ1bmN0aW9uKHVybCkge1xuXHQgICAgdmFyIGRlZmVycmVkID0gVXRpbHMuZGVmZXJyZWQoKTtcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cdCAgICB2YXIgeGhyO1xuXHRcblx0ICAgIHhociA9IHRoaXMuQ2FjaGUuZ2V0KHVybCk7XG5cdFxuXHQgICAgaWYgKCF4aHIpIHtcblx0ICAgICAgeGhyID0gVXRpbHMueGhyKHVybCk7XG5cdCAgICAgIHRoaXMuQ2FjaGUuc2V0KHVybCwgeGhyKTtcblx0ICAgIH1cblx0XG5cdCAgICB4aHIudGhlbihcblx0ICAgICAgZnVuY3Rpb24oZGF0YSkge1xuXHQgICAgICAgIHZhciBjb250YWluZXIgPSBfdGhpcy5Eb20ucGFyc2VSZXNwb25zZShkYXRhKTtcblx0XG5cdCAgICAgICAgX3RoaXMuRG9tLnB1dENvbnRhaW5lcihjb250YWluZXIpO1xuXHRcblx0ICAgICAgICBpZiAoIV90aGlzLmNhY2hlRW5hYmxlZClcblx0ICAgICAgICAgIF90aGlzLkNhY2hlLnJlc2V0KCk7XG5cdFxuXHQgICAgICAgIGRlZmVycmVkLnJlc29sdmUoY29udGFpbmVyKTtcblx0ICAgICAgfSxcblx0ICAgICAgZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgLy9Tb21ldGhpbmcgd2VudCB3cm9uZyAodGltZW91dCwgNDA0LCA1MDUuLi4pXG5cdCAgICAgICAgX3RoaXMuZm9yY2VHb1RvKHVybCk7XG5cdFxuXHQgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xuXHQgICAgICB9XG5cdCAgICApO1xuXHRcblx0ICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEdldCB0aGUgLmhyZWYgcGFyYW1ldGVyIG91dCBvZiBhbiBlbGVtZW50XG5cdCAgICogYW5kIGhhbmRsZSBzcGVjaWFsIGNhc2VzIChsaWtlIHhsaW5rOmhyZWYpXG5cdCAgICpcblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsXG5cdCAgICogQHJldHVybiB7U3RyaW5nfSBocmVmXG5cdCAgICovXG5cdCAgZ2V0SHJlZjogZnVuY3Rpb24oZWwpIHtcblx0ICAgIGlmICghZWwpIHtcblx0ICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcblx0ICAgIH1cblx0XG5cdCAgICBpZiAoZWwuZ2V0QXR0cmlidXRlICYmIHR5cGVvZiBlbC5nZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnKSA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgneGxpbms6aHJlZicpO1xuXHQgICAgfVxuXHRcblx0ICAgIGlmICh0eXBlb2YgZWwuaHJlZiA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgcmV0dXJuIGVsLmhyZWY7XG5cdCAgICB9XG5cdFxuXHQgICAgcmV0dXJuIHVuZGVmaW5lZDtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBDYWxsYmFjayBjYWxsZWQgZnJvbSBjbGljayBldmVudFxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXhcblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZ0XG5cdCAgICovXG5cdCAgb25MaW5rQ2xpY2s6IGZ1bmN0aW9uKGV2dCkge1xuXHQgICAgdmFyIGVsID0gZXZ0LnRhcmdldDtcblx0XG5cdCAgICAvL0dvIHVwIGluIHRoZSBub2RlbGlzdCB1bnRpbCB3ZVxuXHQgICAgLy9maW5kIHNvbWV0aGluZyB3aXRoIGFuIGhyZWZcblx0ICAgIHdoaWxlIChlbCAmJiAhdGhpcy5nZXRIcmVmKGVsKSkge1xuXHQgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG5cdCAgICB9XG5cdFxuXHQgICAgaWYgKHRoaXMucHJldmVudENoZWNrKGV2dCwgZWwpKSB7XG5cdCAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcblx0ICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFxuXHQgICAgICBEaXNwYXRjaGVyLnRyaWdnZXIoJ2xpbmtDbGlja2VkJywgZWwsIGV2dCk7XG5cdFxuXHQgICAgICB2YXIgaHJlZiA9IHRoaXMuZ2V0SHJlZihlbCk7XG5cdCAgICAgIHRoaXMuZ29UbyhocmVmKTtcblx0ICAgIH1cblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBEZXRlcm1pbmUgaWYgdGhlIGxpbmsgc2hvdWxkIGJlIGZvbGxvd2VkXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheFxuXHQgICAqIEBwYXJhbSAge01vdXNlRXZlbnR9IGV2dFxuXHQgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50XG5cdCAgICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICAgKi9cblx0ICBwcmV2ZW50Q2hlY2s6IGZ1bmN0aW9uKGV2dCwgZWxlbWVudCkge1xuXHQgICAgaWYgKCF3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0XG5cdCAgICB2YXIgaHJlZiA9IHRoaXMuZ2V0SHJlZihlbGVtZW50KTtcblx0XG5cdCAgICAvL1VzZXJcblx0ICAgIGlmICghZWxlbWVudCB8fCAhaHJlZilcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHRcblx0ICAgIC8vTWlkZGxlIGNsaWNrLCBjbWQgY2xpY2ssIGFuZCBjdHJsIGNsaWNrXG5cdCAgICBpZiAoZXZ0LndoaWNoID4gMSB8fCBldnQubWV0YUtleSB8fCBldnQuY3RybEtleSB8fCBldnQuc2hpZnRLZXkgfHwgZXZ0LmFsdEtleSlcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHRcblx0ICAgIC8vSWdub3JlIHRhcmdldCB3aXRoIF9ibGFuayB0YXJnZXRcblx0ICAgIGlmIChlbGVtZW50LnRhcmdldCAmJiBlbGVtZW50LnRhcmdldCA9PT0gJ19ibGFuaycpXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0XG5cdCAgICAvL0NoZWNrIGlmIGl0J3MgdGhlIHNhbWUgZG9tYWluXG5cdCAgICBpZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSBlbGVtZW50LnByb3RvY29sIHx8IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSAhPT0gZWxlbWVudC5ob3N0bmFtZSlcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHRcblx0ICAgIC8vQ2hlY2sgaWYgdGhlIHBvcnQgaXMgdGhlIHNhbWVcblx0ICAgIGlmIChVdGlscy5nZXRQb3J0KCkgIT09IFV0aWxzLmdldFBvcnQoZWxlbWVudC5wb3J0KSlcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHRcblx0ICAgIC8vSWdub3JlIGNhc2Ugd2hlbiBhIGhhc2ggaXMgYmVpbmcgdGFja2VkIG9uIHRoZSBjdXJyZW50IFVSTFxuXHQgICAgaWYgKGhyZWYuaW5kZXhPZignIycpID4gLTEpXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0XG5cdCAgICAvL0lnbm9yZSBjYXNlIHdoZXJlIHRoZXJlIGlzIGRvd25sb2FkIGF0dHJpYnV0ZVxuXHQgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlICYmIHR5cGVvZiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZG93bmxvYWQnKSA9PT0gJ3N0cmluZycpXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0XG5cdCAgICAvL0luIGNhc2UgeW91J3JlIHRyeWluZyB0byBsb2FkIHRoZSBzYW1lIHBhZ2Vcblx0ICAgIGlmIChVdGlscy5jbGVhbkxpbmsoaHJlZikgPT0gVXRpbHMuY2xlYW5MaW5rKGxvY2F0aW9uLmhyZWYpKVxuXHQgICAgICByZXR1cm4gZmFsc2U7XG5cdFxuXHQgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuaWdub3JlQ2xhc3NMaW5rKSlcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHRcblx0ICAgIHJldHVybiB0cnVlO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIFJldHVybiBhIHRyYW5zaXRpb24gb2JqZWN0XG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheFxuXHQgICAqIEByZXR1cm4ge0JhcmJhLlRyYW5zaXRpb259IFRyYW5zaXRpb24gb2JqZWN0XG5cdCAgICovXG5cdCAgZ2V0VHJhbnNpdGlvbjogZnVuY3Rpb24oKSB7XG5cdCAgICAvL1VzZXIgY3VzdG9taXphYmxlXG5cdCAgICByZXR1cm4gSGlkZVNob3dUcmFuc2l0aW9uO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIE1ldGhvZCBjYWxsZWQgYWZ0ZXIgYSAncG9wc3RhdGUnIG9yIGZyb20gLmdvVG8oKVxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXhcblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqL1xuXHQgIG9uU3RhdGVDaGFuZ2U6IGZ1bmN0aW9uKCkge1xuXHQgICAgdmFyIG5ld1VybCA9IHRoaXMuZ2V0Q3VycmVudFVybCgpO1xuXHRcblx0ICAgIGlmICh0aGlzLnRyYW5zaXRpb25Qcm9ncmVzcylcblx0ICAgICAgdGhpcy5mb3JjZUdvVG8obmV3VXJsKTtcblx0XG5cdCAgICBpZiAodGhpcy5IaXN0b3J5LmN1cnJlbnRTdGF0dXMoKS51cmwgPT09IG5ld1VybClcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHRcblx0ICAgIHRoaXMuSGlzdG9yeS5hZGQobmV3VXJsKTtcblx0XG5cdCAgICB2YXIgbmV3Q29udGFpbmVyID0gdGhpcy5sb2FkKG5ld1VybCk7XG5cdCAgICB2YXIgdHJhbnNpdGlvbiA9IE9iamVjdC5jcmVhdGUodGhpcy5nZXRUcmFuc2l0aW9uKCkpO1xuXHRcblx0ICAgIHRoaXMudHJhbnNpdGlvblByb2dyZXNzID0gdHJ1ZTtcblx0XG5cdCAgICBEaXNwYXRjaGVyLnRyaWdnZXIoJ2luaXRTdGF0ZUNoYW5nZScsXG5cdCAgICAgIHRoaXMuSGlzdG9yeS5jdXJyZW50U3RhdHVzKCksXG5cdCAgICAgIHRoaXMuSGlzdG9yeS5wcmV2U3RhdHVzKClcblx0ICAgICk7XG5cdFxuXHQgICAgdmFyIHRyYW5zaXRpb25JbnN0YW5jZSA9IHRyYW5zaXRpb24uaW5pdChcblx0ICAgICAgdGhpcy5Eb20uZ2V0Q29udGFpbmVyKCksXG5cdCAgICAgIG5ld0NvbnRhaW5lclxuXHQgICAgKTtcblx0XG5cdCAgICBuZXdDb250YWluZXIudGhlbihcblx0ICAgICAgdGhpcy5vbk5ld0NvbnRhaW5lckxvYWRlZC5iaW5kKHRoaXMpXG5cdCAgICApO1xuXHRcblx0ICAgIHRyYW5zaXRpb25JbnN0YW5jZS50aGVuKFxuXHQgICAgICB0aGlzLm9uVHJhbnNpdGlvbkVuZC5iaW5kKHRoaXMpXG5cdCAgICApO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEZ1bmN0aW9uIGNhbGxlZCBhcyBzb29uIHRoZSBuZXcgY29udGFpbmVyIGlzIHJlYWR5XG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheFxuXHQgICAqIEBwcml2YXRlXG5cdCAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGFpbmVyXG5cdCAgICovXG5cdCAgb25OZXdDb250YWluZXJMb2FkZWQ6IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHQgICAgdmFyIGN1cnJlbnRTdGF0dXMgPSB0aGlzLkhpc3RvcnkuY3VycmVudFN0YXR1cygpO1xuXHQgICAgY3VycmVudFN0YXR1cy5uYW1lc3BhY2UgPSB0aGlzLkRvbS5nZXROYW1lc3BhY2UoY29udGFpbmVyKTtcblx0XG5cdCAgICBEaXNwYXRjaGVyLnRyaWdnZXIoJ25ld1BhZ2VSZWFkeScsXG5cdCAgICAgIHRoaXMuSGlzdG9yeS5jdXJyZW50U3RhdHVzKCksXG5cdCAgICAgIHRoaXMuSGlzdG9yeS5wcmV2U3RhdHVzKCksXG5cdCAgICAgIGNvbnRhaW5lcixcblx0ICAgICAgdGhpcy5Eb20uY3VycmVudEhUTUxcblx0ICAgICk7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogRnVuY3Rpb24gY2FsbGVkIGFzIHNvb24gdGhlIHRyYW5zaXRpb24gaXMgZmluaXNoZWRcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4XG5cdCAgICogQHByaXZhdGVcblx0ICAgKi9cblx0ICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uKCkge1xuXHQgICAgdGhpcy50cmFuc2l0aW9uUHJvZ3Jlc3MgPSBmYWxzZTtcblx0XG5cdCAgICBEaXNwYXRjaGVyLnRyaWdnZXIoJ3RyYW5zaXRpb25Db21wbGV0ZWQnLFxuXHQgICAgICB0aGlzLkhpc3RvcnkuY3VycmVudFN0YXR1cygpLFxuXHQgICAgICB0aGlzLkhpc3RvcnkucHJldlN0YXR1cygpXG5cdCAgICApO1xuXHQgIH1cblx0fTtcblx0XG5cdG1vZHVsZS5leHBvcnRzID0gUGpheDtcblxuXG4vKioqLyB9LFxuLyogMTEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBCYXNlVHJhbnNpdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cdFxuXHQvKipcblx0ICogQmFzaWMgVHJhbnNpdGlvbiBvYmplY3QsIHdhaXQgZm9yIHRoZSBuZXcgQ29udGFpbmVyIHRvIGJlIHJlYWR5LFxuXHQgKiBzY3JvbGwgdG9wLCBhbmQgZmluaXNoIHRoZSB0cmFuc2l0aW9uIChyZW1vdmluZyB0aGUgb2xkIGNvbnRhaW5lciBhbmQgZGlzcGxheWluZyB0aGUgbmV3IG9uZSlcblx0ICpcblx0ICogQHByaXZhdGVcblx0ICogQG5hbWVzcGFjZSBCYXJiYS5IaWRlU2hvd1RyYW5zaXRpb25cblx0ICogQGF1Z21lbnRzIEJhcmJhLkJhc2VUcmFuc2l0aW9uXG5cdCAqL1xuXHR2YXIgSGlkZVNob3dUcmFuc2l0aW9uID0gQmFzZVRyYW5zaXRpb24uZXh0ZW5kKHtcblx0ICBzdGFydDogZnVuY3Rpb24oKSB7XG5cdCAgICB0aGlzLm5ld0NvbnRhaW5lckxvYWRpbmcudGhlbih0aGlzLmZpbmlzaC5iaW5kKHRoaXMpKTtcblx0ICB9LFxuXHRcblx0ICBmaW5pc2g6IGZ1bmN0aW9uKCkge1xuXHQgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuXHQgICAgdGhpcy5kb25lKCk7XG5cdCAgfVxuXHR9KTtcblx0XG5cdG1vZHVsZS5leHBvcnRzID0gSGlkZVNob3dUcmFuc2l0aW9uO1xuXG5cbi8qKiovIH0sXG4vKiAxMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyoqXG5cdCAqIE9iamVjdCB0aGF0IGlzIGdvaW5nIHRvIGRlYWwgd2l0aCBET00gcGFyc2luZy9tYW5pcHVsYXRpb25cblx0ICpcblx0ICogQG5hbWVzcGFjZSBCYXJiYS5QamF4LkRvbVxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0dmFyIERvbSA9IHtcblx0ICAvKipcblx0ICAgKiBUaGUgbmFtZSBvZiB0aGUgZGF0YSBhdHRyaWJ1dGUgb24gdGhlIGNvbnRhaW5lclxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXguRG9tXG5cdCAgICogQHR5cGUge1N0cmluZ31cblx0ICAgKiBAZGVmYXVsdFxuXHQgICAqL1xuXHQgIGRhdGFOYW1lc3BhY2U6ICduYW1lc3BhY2UnLFxuXHRcblx0ICAvKipcblx0ICAgKiBJZCBvZiB0aGUgbWFpbiB3cmFwcGVyXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheC5Eb21cblx0ICAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICAqIEBkZWZhdWx0XG5cdCAgICovXG5cdCAgd3JhcHBlcklkOiAnYmFyYmEtd3JhcHBlcicsXG5cdFxuXHQgIC8qKlxuXHQgICAqIENsYXNzIG5hbWUgdXNlZCB0byBpZGVudGlmeSB0aGUgY29udGFpbmVyc1xuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXguRG9tXG5cdCAgICogQHR5cGUge1N0cmluZ31cblx0ICAgKiBAZGVmYXVsdFxuXHQgICAqL1xuXHQgIGNvbnRhaW5lckNsYXNzOiAnYmFyYmEtY29udGFpbmVyJyxcblx0XG5cdCAgLyoqXG5cdCAgICogRnVsbCBIVE1MIFN0cmluZyBvZiB0aGUgY3VycmVudCBwYWdlLlxuXHQgICAqIEJ5IGRlZmF1bHQgaXMgdGhlIGlubmVySFRNTCBvZiB0aGUgaW5pdGlhbCBsb2FkZWQgcGFnZS5cblx0ICAgKlxuXHQgICAqIEVhY2ggdGltZSBhIG5ldyBwYWdlIGlzIGxvYWRlZCwgdGhlIHZhbHVlIGlzIHRoZSByZXNwb25zZSBvZiB0aGUgeGhyIGNhbGwuXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheC5Eb21cblx0ICAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICAqL1xuXHQgIGN1cnJlbnRIVE1MOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MLFxuXHRcblx0ICAvKipcblx0ICAgKiBQYXJzZSB0aGUgcmVzcG9uc2VUZXh0IG9idGFpbmVkIGZyb20gdGhlIHhociBjYWxsXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUGpheC5Eb21cblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqIEBwYXJhbSAge1N0cmluZ30gcmVzcG9uc2VUZXh0XG5cdCAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG5cdCAgICovXG5cdCAgcGFyc2VSZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2VUZXh0KSB7XG5cdCAgICB0aGlzLmN1cnJlbnRIVE1MID0gcmVzcG9uc2VUZXh0O1xuXHRcblx0ICAgIHZhciB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdCAgICB3cmFwcGVyLmlubmVySFRNTCA9IHJlc3BvbnNlVGV4dDtcblx0XG5cdCAgICB2YXIgdGl0bGVFbCA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcigndGl0bGUnKTtcblx0XG5cdCAgICBpZiAodGl0bGVFbClcblx0ICAgICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZUVsLnRleHRDb250ZW50O1xuXHRcblx0ICAgIHJldHVybiB0aGlzLmdldENvbnRhaW5lcih3cmFwcGVyKTtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBHZXQgdGhlIG1haW4gYmFyYmEgd3JhcHBlciBieSB0aGUgSUQgYHdyYXBwZXJJZGBcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4LkRvbVxuXHQgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBlbGVtZW50XG5cdCAgICovXG5cdCAgZ2V0V3JhcHBlcjogZnVuY3Rpb24oKSB7XG5cdCAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMud3JhcHBlcklkKTtcblx0XG5cdCAgICBpZiAoIXdyYXBwZXIpXG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignQmFyYmEuanM6IHdyYXBwZXIgbm90IGZvdW5kIScpO1xuXHRcblx0ICAgIHJldHVybiB3cmFwcGVyO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEdldCB0aGUgY29udGFpbmVyIG9uIHRoZSBjdXJyZW50IERPTSxcblx0ICAgKiBvciBmcm9tIGFuIEhUTUxFbGVtZW50IHBhc3NlZCB2aWEgYXJndW1lbnRcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4LkRvbVxuXHQgICAqIEBwcml2YXRlXG5cdCAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcblx0ICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cblx0ICAgKi9cblx0ICBnZXRDb250YWluZXI6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0ICAgIGlmICghZWxlbWVudClcblx0ICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG5cdFxuXHQgICAgaWYgKCFlbGVtZW50KVxuXHQgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhcmJhLmpzOiBET00gbm90IHJlYWR5IScpO1xuXHRcblx0ICAgIHZhciBjb250YWluZXIgPSB0aGlzLnBhcnNlQ29udGFpbmVyKGVsZW1lbnQpO1xuXHRcblx0ICAgIGlmIChjb250YWluZXIgJiYgY29udGFpbmVyLmpxdWVyeSlcblx0ICAgICAgY29udGFpbmVyID0gY29udGFpbmVyWzBdO1xuXHRcblx0ICAgIGlmICghY29udGFpbmVyKVxuXHQgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhcmJhLmpzOiBubyBjb250YWluZXIgZm91bmQnKTtcblx0XG5cdCAgICByZXR1cm4gY29udGFpbmVyO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIEdldCB0aGUgbmFtZXNwYWNlIG9mIHRoZSBjb250YWluZXJcblx0ICAgKlxuXHQgICAqIEBtZW1iZXJPZiBCYXJiYS5QamF4LkRvbVxuXHQgICAqIEBwcml2YXRlXG5cdCAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcblx0ICAgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAgICovXG5cdCAgZ2V0TmFtZXNwYWNlOiBmdW5jdGlvbihlbGVtZW50KSB7XG5cdCAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmRhdGFzZXQpIHtcblx0ICAgICAgcmV0dXJuIGVsZW1lbnQuZGF0YXNldFt0aGlzLmRhdGFOYW1lc3BhY2VdO1xuXHQgICAgfSBlbHNlIGlmIChlbGVtZW50KSB7XG5cdCAgICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgdGhpcy5kYXRhTmFtZXNwYWNlKTtcblx0ICAgIH1cblx0XG5cdCAgICByZXR1cm4gbnVsbDtcblx0ICB9LFxuXHRcblx0ICAvKipcblx0ICAgKiBQdXQgdGhlIGNvbnRhaW5lciBvbiB0aGUgcGFnZVxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXguRG9tXG5cdCAgICogQHByaXZhdGVcblx0ICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuXHQgICAqL1xuXHQgIHB1dENvbnRhaW5lcjogZnVuY3Rpb24oZWxlbWVudCkge1xuXHQgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cdFxuXHQgICAgdmFyIHdyYXBwZXIgPSB0aGlzLmdldFdyYXBwZXIoKTtcblx0ICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cdCAgfSxcblx0XG5cdCAgLyoqXG5cdCAgICogR2V0IGNvbnRhaW5lciBzZWxlY3RvclxuXHQgICAqXG5cdCAgICogQG1lbWJlck9mIEJhcmJhLlBqYXguRG9tXG5cdCAgICogQHByaXZhdGVcblx0ICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuXHQgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBlbGVtZW50XG5cdCAgICovXG5cdCAgcGFyc2VDb250YWluZXI6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0ICAgIHJldHVybiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5jb250YWluZXJDbGFzcyk7XG5cdCAgfVxuXHR9O1xuXHRcblx0bW9kdWxlLmV4cG9ydHMgPSBEb207XG5cblxuLyoqKi8gfSxcbi8qIDEzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgVXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXHR2YXIgUGpheCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuXHRcblx0LyoqXG5cdCAqIFByZWZldGNoXG5cdCAqXG5cdCAqIEBuYW1lc3BhY2UgQmFyYmEuUHJlZmV0Y2hcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHZhciBQcmVmZXRjaCA9IHtcblx0ICAvKipcblx0ICAgKiBDbGFzcyBuYW1lIHVzZWQgdG8gaWdub3JlIHByZWZldGNoIG9uIGxpbmtzXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUHJlZmV0Y2hcblx0ICAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICAqIEBkZWZhdWx0XG5cdCAgICovXG5cdCAgaWdub3JlQ2xhc3NMaW5rOiAnbm8tYmFyYmEtcHJlZmV0Y2gnLFxuXHRcblx0ICAvKipcblx0ICAgKiBJbml0IHRoZSBldmVudCBsaXN0ZW5lciBvbiBtb3VzZW92ZXIgYW5kIHRvdWNoc3RhcnRcblx0ICAgKiBmb3IgdGhlIHByZWZldGNoXG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUHJlZmV0Y2hcblx0ICAgKi9cblx0ICBpbml0OiBmdW5jdGlvbigpIHtcblx0ICAgIGlmICghd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKSB7XG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgIH1cblx0XG5cdCAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rRW50ZXIuYmluZCh0aGlzKSk7XG5cdCAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uTGlua0VudGVyLmJpbmQodGhpcykpO1xuXHQgIH0sXG5cdFxuXHQgIC8qKlxuXHQgICAqIENhbGxiYWNrIGZvciB0aGUgbW91c2Vob3Zlci90b3VjaHN0YXJ0XG5cdCAgICpcblx0ICAgKiBAbWVtYmVyT2YgQmFyYmEuUHJlZmV0Y2hcblx0ICAgKiBAcHJpdmF0ZVxuXHQgICAqIEBwYXJhbSAge09iamVjdH0gZXZ0XG5cdCAgICovXG5cdCAgb25MaW5rRW50ZXI6IGZ1bmN0aW9uKGV2dCkge1xuXHQgICAgdmFyIGVsID0gZXZ0LnRhcmdldDtcblx0XG5cdCAgICB3aGlsZSAoZWwgJiYgIVBqYXguZ2V0SHJlZihlbCkpIHtcblx0ICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuXHQgICAgfVxuXHRcblx0ICAgIGlmICghZWwgfHwgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuaWdub3JlQ2xhc3NMaW5rKSkge1xuXHQgICAgICByZXR1cm47XG5cdCAgICB9XG5cdFxuXHQgICAgdmFyIHVybCA9IFBqYXguZ2V0SHJlZihlbCk7XG5cdFxuXHQgICAgLy9DaGVjayBpZiB0aGUgbGluayBpcyBlbGVnaWJsZSBmb3IgUGpheFxuXHQgICAgaWYgKFBqYXgucHJldmVudENoZWNrKGV2dCwgZWwpICYmICFQamF4LkNhY2hlLmdldCh1cmwpKSB7XG5cdCAgICAgIHZhciB4aHIgPSBVdGlscy54aHIodXJsKTtcblx0ICAgICAgUGpheC5DYWNoZS5zZXQodXJsLCB4aHIpO1xuXHQgICAgfVxuXHQgIH1cblx0fTtcblx0XG5cdG1vZHVsZS5leHBvcnRzID0gUHJlZmV0Y2g7XG5cblxuLyoqKi8gfVxuLyoqKioqKi8gXSlcbn0pO1xuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFyYmEuanMubWFwIiwiLyohIE11bHRpcGxlLmpzIC0gdjAuMC4xIC0gMjAxNi0wNC0wOVxyXG4qIGh0dHA6Ly9OZVhUcy5naXRodWIuY29tL011bHRpcGxlLmpzL1xyXG4qIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBMdWtvdjsgTGljZW5zZWQgTUlUICovXHJcblxyXG47KGZ1bmN0aW9uKHJvb3QsIGRlZmluaXRpb24pIHtcclxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKTtcclxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JykgZGVmaW5lKGRlZmluaXRpb24pO1xyXG4gICAgZWxzZSByb290WydNdWx0aXBsZSddID0gZGVmaW5pdGlvbigpO1xyXG59KHRoaXMsIGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiXHJcblxyXG5cdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ4MTk4ODYvMTIyMTA4MlxyXG5cdHZhciBpc01vYmlsZSA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM7XHJcblx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTI2MjU5MDcvMTIyMTA4MlxyXG5cdHZhciBpc1dlYmtpdCA9ICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XHJcblxyXG5cdC8vIEZvcmNlIHdlYmtpdCByZXBhaW50IG9uIHJlc2l6ZVxyXG5cdGlzV2Via2l0ICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbihlKXtcclxuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG5cdFx0ZSA9IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS52aXNpYmlsaXR5ID0gJyc7XHJcblx0fSk7XHJcblxyXG5cdHZhciBNdWx0aXBsZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdGlmKCAhICh0aGlzIGluc3RhbmNlb2YgTXVsdGlwbGUpKSByZXR1cm4gbmV3IE11bHRpcGxlKG9wdGlvbnMpO1xyXG5cclxuXHRcdFsnc2VsZWN0b3InLCAnYmFja2dyb3VuZCcsICdhZmZlY3RUZXh0JywgJ29wYWNpdHknXS5mb3JFYWNoKGZ1bmN0aW9uKG9wdGlvbikge1xyXG5cdFx0XHR0aGlzW29wdGlvbl0gPSBvcHRpb25zW29wdGlvbl07XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHRoaXMuY2xhc3NOYW1lID0gJ211bHRpcGxlLScgKyAoaXNNb2JpbGUgPyAnbW9iaWxlJyA6ICdkZXNrdG9wJykgKyAodGhpcy5hZmZlY3RUZXh0ID8gJy10ZXh0JyA6ICcnKTtcclxuXHRcdHRoaXMudXBkYXRlKHRoaXMuYmFja2dyb3VuZCk7XHJcblx0fVxyXG5cclxuXHRNdWx0aXBsZS5wcm90b3R5cGUgPSB7XHJcblx0XHRjb25zdHJ1Y3RvcjogTXVsdGlwbGUsXHJcblx0XHRlYWNoOiBmdW5jdGlvbihzZWxlY3QsIGNhbGxiYWNrLCBub2Rlcykge1xyXG5cdFx0XHRBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub2RlcyA/IHNlbGVjdCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0KSkuZm9yRWFjaChjYWxsYmFjay5iaW5kKHRoaXMpKTtcclxuXHRcdH0sXHJcblx0XHQvLyAjZjk1IG9yICNmZjk5NTUgb3IgcmdiKDI1NSwxNTMsODUpIC0+IHJnYmEoMjU1LDEwMiwwLDAuNjY2KVxyXG5cdFx0c2V0T3BhY2l0eTogZnVuY3Rpb24oc3R5bGVzKSB7XHJcblx0XHRcdHJldHVybiBzdHlsZXMucmVwbGFjZSgvI1xcYihbYS1mXFxkXXszfXxbYS1mXFxkXXs2fSlcXGIvZ2ksIGZ1bmN0aW9uKGZ1bGwsIGhleCkge1xyXG5cdFx0XHQgIFx0dmFyIHJnYiA9IGhleC5tYXRjaChuZXcgUmVnRXhwKCcoLnsnICsgaGV4Lmxlbmd0aC8zICsgJ30pJywgJ2cnKSkubWFwKGZ1bmN0aW9uKGwpIHsgcmV0dXJuIHBhcnNlSW50KGhleC5sZW5ndGglMiA/IGwrbCA6IGwsIDE2KSB9KTtcclxuXHRcdFx0XHRyZXR1cm4gJ3JnYignICsgcmdiLmpvaW4oJywnKSArICcpJztcclxuXHRcdFx0fSkucmVwbGFjZSgvcmdiXFwoKC5bXlxcKV0qKVxcKS9naSwgZnVuY3Rpb24oZnVsbCwgcmdiKSB7XHJcblx0XHRcdFx0dmFyIG1pbiwgYSA9ICgyNTUgLSAobWluID0gTWF0aC5taW4uYXBwbHkoTWF0aCwgKHJnYiA9IHJnYi5zcGxpdCgnLCcpKSkpKSAvIDI1NSxcclxuXHRcdFx0XHRcdHJnYmEgPSB0aGlzLm9wYWNpdHkgPT09IHRydWVcclxuXHRcdFx0XHRcdFx0PyByZ2IubWFwKGZ1bmN0aW9uKGNoYW5uZWwpIHsgcmV0dXJuIDAgfCAoY2hhbm5lbCAtIG1pbikgLyBhIH0pLmNvbmNhdCgoMHwxMDAwKmEpLzEwMDApXHJcblx0XHRcdFx0XHRcdDogcmdiLmNvbmNhdCh0aGlzLm9wYWNpdHkpO1xyXG5cdFx0XHRcdHJldHVybiAncmdiYSgnICsgcmdiYS5qb2luKCcsJykgKyAnKSc7XHJcblx0XHRcdH0uYmluZCh0aGlzKSk7XHJcblx0XHR9LFxyXG5cdFx0Ly8gbGluZWFyLWdyYWRpZW50KCNmZmYsICMwMDApIC0+IC13ZWJraXQtKiwgLW1vei0qLCAtbXMtKiwgLW8tKlxyXG5cdFx0c2V0VmVuZG9yczogZnVuY3Rpb24oc3R5bGVzLCB0ZXh0TW9kZSkge1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gdGV4dE1vZGUgPyBbXSA6IFtzdHlsZXNdO1xyXG5cdFx0XHRpZigvLWdyYWRpZW50XFwoL2kudGVzdChzdHlsZXMpIHx8IHRleHRNb2RlKSBbJ3dlYmtpdCcsICdtb3onLCAnbXMnLCAnbyddLmZvckVhY2goZnVuY3Rpb24odmVuZG9yLCBpKSB7XHJcblx0XHRcdFx0aWYodGV4dE1vZGUgJiYgaSkgcmV0dXJuO1xyXG5cdFx0XHRcdHJlc3VsdC51bnNoaWZ0KCh0ZXh0TW9kZSA/ICctd2Via2l0LWxpbmVhci1ncmFkaWVudCh0cmFuc3BhcmVudCx0cmFuc3BhcmVudCksJyA6ICcnKSArIHN0eWxlcy5yZXBsYWNlKC8oW14sXFxzXSotZ3JhZGllbnRcXCgpL2dpLCAnLScgKyB2ZW5kb3IgKyAnLSQxJykpO1xyXG5cdCAgXHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fSxcclxuXHRcdHNldFN0eWxlczogZnVuY3Rpb24oc2VsZWN0b3IsIHN0eWxlcywgdGV4dE1vZGUpIHtcclxuXHRcdFx0aWYodGhpcy5vcGFjaXR5KSBzdHlsZXMgPSB0aGlzLnNldE9wYWNpdHkoc3R5bGVzKTtcclxuXHRcdFx0dGhpcy5zdHlsZVRhZy5pbm5lckhUTUwgPSBzZWxlY3RvciArICd7YmFja2dyb3VuZC1pbWFnZTonICsgdGhpcy5zZXRWZW5kb3JzKHN0eWxlcywgdGV4dE1vZGUpLmpvaW4oJztcXG5iYWNrZ3JvdW5kLWltYWdlOicpICsgJ30nO1xyXG5cdFx0fSxcclxuXHRcdHJlbmRlclRhZzogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XHJcblx0XHRcdHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0dGFnLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuXHRcdFx0cmV0dXJuIHRhZztcclxuXHRcdH0sXHJcblx0XHR1cGRhdGU6IGZ1bmN0aW9uKHN0eWxlcykge1xyXG5cdFx0XHR0aGlzLmVhY2godGhpcy5zZWxlY3RvciwgZnVuY3Rpb24oZWxlbSkge1xyXG5cdFx0XHRcdGlmKGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLW11bHRpcGxlJykpIHJldHVybjtcclxuXHRcdFx0XHRpZiggISBpc01vYmlsZSB8fCB0aGlzLmFmZmVjdFRleHQpIHJldHVybiBlbGVtLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc05hbWUpO1xyXG5cclxuXHRcdFx0XHR2YXIgd3JhcHBlclRhZyA9IHRoaXMucmVuZGVyVGFnKHRoaXMuY2xhc3NOYW1lICsgJy13cmFwcGVyJyksXHJcblx0XHRcdFx0XHRjb250ZW50VGFnID0gdGhpcy5yZW5kZXJUYWcodGhpcy5jbGFzc05hbWUgKyAnLWNvbnRlbnQnKTtcclxuXHRcdFx0XHR0aGlzLmVhY2goZWxlbS5jaGlsZE5vZGVzLCBmdW5jdGlvbihjaGlsZCkgeyBjb250ZW50VGFnLmFwcGVuZENoaWxkKGNoaWxkKSB9LCB0cnVlKTtcclxuXHRcdFx0XHRlbGVtLmFwcGVuZENoaWxkKHdyYXBwZXJUYWcpO1xyXG5cdFx0XHRcdHdyYXBwZXJUYWcuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJUYWcodGhpcy5jbGFzc05hbWUpKTtcclxuXHRcdFx0XHR3cmFwcGVyVGFnLmFwcGVuZENoaWxkKGNvbnRlbnRUYWcpO1xyXG5cdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLW11bHRpcGxlJywgdHJ1ZSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYoICEgc3R5bGVzKSByZXR1cm47XHJcblx0XHRcdGlmKCAhIHRoaXMuc3R5bGVUYWcpIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGhpcy5zdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJykpO1xyXG5cdFx0XHRpZiggISBpc01vYmlsZSB8fCAhIHRoaXMuYWZmZWN0VGV4dCkgdGhpcy5zZXRTdHlsZXModGhpcy5zZWxlY3RvciArIChpc01vYmlsZSA/ICcgJyA6ICcnKSArICcuJyArIHRoaXMuY2xhc3NOYW1lICsgKGlzTW9iaWxlID8gJzpiZWZvcmUnIDogJycpLCBzdHlsZXMsIHRoaXMuYWZmZWN0VGV4dCk7XHJcblx0XHRcdGlmKHRoaXMuYWZmZWN0VGV4dCkgdGhpcy5zdHlsZVRhZy5pbm5lckhUTUwgKz0gdGhpcy5zZWxlY3RvciArICcuJyArIHRoaXMuY2xhc3NOYW1lICsgJ3tjb2xvcjonICsgdGhpcy5hZmZlY3RUZXh0ICsgJ30nO1xyXG5cdFx0fSxcclxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLnN0eWxlVGFnLnBhcmVudE5vZGUgJiYgdGhpcy5zdHlsZVRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc3R5bGVUYWcpICYmIGRlbGV0ZSB0aGlzLnN0eWxlVGFnO1xyXG5cdFx0XHR0aGlzLmVhY2godGhpcy5zZWxlY3RvciwgZnVuY3Rpb24oZWxlbSkge1xyXG5cdFx0XHRcdGVsZW0uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzTmFtZSk7XHJcblx0XHRcdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtbXVsdGlwbGUnKTtcclxuXHJcblx0XHRcdFx0aWYoICEgaXNNb2JpbGUgfHwgdGhpcy5hZmZlY3RUZXh0KSByZXR1cm47XHJcblx0XHRcdFx0dGhpcy5lYWNoKGVsZW0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uY2hpbGROb2RlcywgZnVuY3Rpb24oY2hpbGQpIHsgZWxlbS5hcHBlbmRDaGlsZChjaGlsZCkgfSwgdHJ1ZSk7XHJcblx0XHRcdFx0ZWxlbS5yZW1vdmVDaGlsZChlbGVtLmNoaWxkcmVuWzBdKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gTXVsdGlwbGU7XHJcbn0pKTsiLCIvKiEgc2tyb2xsciAwLjYuMjYgKDIwMTQtMDYtMDgpIHwgQWxleGFuZGVyIFByaW56aG9ybiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9Qcmluemhvcm4vc2tyb2xsciB8IEZyZWUgdG8gdXNlIHVuZGVyIHRlcm1zIG9mIE1JVCBsaWNlbnNlICovXG4oZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4ocil7aWYobz10LmRvY3VtZW50RWxlbWVudCxhPXQuYm9keSxLKCksaXQ9dGhpcyxyPXJ8fHt9LHV0PXIuY29uc3RhbnRzfHx7fSxyLmVhc2luZylmb3IodmFyIG4gaW4gci5lYXNpbmcpVVtuXT1yLmVhc2luZ1tuXTt5dD1yLmVkZ2VTdHJhdGVneXx8XCJzZXRcIixjdD17YmVmb3JlcmVuZGVyOnIuYmVmb3JlcmVuZGVyLHJlbmRlcjpyLnJlbmRlcixrZXlmcmFtZTpyLmtleWZyYW1lfSxmdD1yLmZvcmNlSGVpZ2h0IT09ITEsZnQmJihWdD1yLnNjYWxlfHwxKSxtdD1yLm1vYmlsZURlY2VsZXJhdGlvbnx8eCxkdD1yLnNtb290aFNjcm9sbGluZyE9PSExLGd0PXIuc21vb3RoU2Nyb2xsaW5nRHVyYXRpb258fEUsdnQ9e3RhcmdldFRvcDppdC5nZXRTY3JvbGxUb3AoKX0sR3Q9KHIubW9iaWxlQ2hlY2t8fGZ1bmN0aW9uKCl7cmV0dXJuL0FuZHJvaWR8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50fHxuYXZpZ2F0b3IudmVuZG9yfHxlLm9wZXJhKX0pKCksR3Q/KHN0PXQuZ2V0RWxlbWVudEJ5SWQoXCJza3JvbGxyLWJvZHlcIiksc3QmJmF0KCksWCgpLER0KG8sW3ksU10sW1RdKSk6RHQobyxbeSxiXSxbVF0pLGl0LnJlZnJlc2goKSxTdChlLFwicmVzaXplIG9yaWVudGF0aW9uY2hhbmdlXCIsZnVuY3Rpb24oKXt2YXIgZT1vLmNsaWVudFdpZHRoLHQ9by5jbGllbnRIZWlnaHQ7KHQhPT0kdHx8ZSE9PU10KSYmKCR0PXQsTXQ9ZSxfdD0hMCl9KTt2YXIgaT1ZKCk7cmV0dXJuIGZ1bmN0aW9uIGwoKXtaKCksYnQ9aShsKX0oKSxpdH12YXIgbyxhLGk9e2dldDpmdW5jdGlvbigpe3JldHVybiBpdH0saW5pdDpmdW5jdGlvbihlKXtyZXR1cm4gaXR8fG5ldyBuKGUpfSxWRVJTSU9OOlwiMC42LjI2XCJ9LGw9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxzPWUuTWF0aCxjPWUuZ2V0Q29tcHV0ZWRTdHlsZSxmPVwidG91Y2hzdGFydFwiLHU9XCJ0b3VjaG1vdmVcIixtPVwidG91Y2hjYW5jZWxcIixwPVwidG91Y2hlbmRcIixkPVwic2tyb2xsYWJsZVwiLGc9ZCtcIi1iZWZvcmVcIix2PWQrXCItYmV0d2VlblwiLGg9ZCtcIi1hZnRlclwiLHk9XCJza3JvbGxyXCIsVD1cIm5vLVwiK3ksYj15K1wiLWRlc2t0b3BcIixTPXkrXCItbW9iaWxlXCIsaz1cImxpbmVhclwiLHc9MWUzLHg9LjAwNCxFPTIwMCxBPVwic3RhcnRcIixGPVwiZW5kXCIsQz1cImNlbnRlclwiLEQ9XCJib3R0b21cIixIPVwiX19fc2tyb2xsYWJsZV9pZFwiLEk9L14oPzppbnB1dHx0ZXh0YXJlYXxidXR0b258c2VsZWN0KSQvaSxQPS9eXFxzK3xcXHMrJC9nLE49L15kYXRhKD86LShfXFx3KykpPyg/Oi0/KC0/XFxkKlxcLj9cXGQrcD8pKT8oPzotPyhzdGFydHxlbmR8dG9wfGNlbnRlcnxib3R0b20pKT8oPzotPyh0b3B8Y2VudGVyfGJvdHRvbSkpPyQvLE89L1xccyooQD9bXFx3XFwtXFxbXFxdXSspXFxzKjpcXHMqKC4rPylcXHMqKD86O3wkKS9naSxWPS9eKEA/W2EtelxcLV0rKVxcWyhcXHcrKVxcXSQvLHo9Ly0oW2EtejAtOV9dKS9nLHE9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC50b1VwcGVyQ2FzZSgpfSxMPS9bXFwtK10/W1xcZF0qXFwuP1tcXGRdKy9nLE09L1xce1xcP1xcfS9nLCQ9L3JnYmE/XFwoXFxzKi0/XFxkK1xccyosXFxzKi0/XFxkK1xccyosXFxzKi0/XFxkKy9nLF89L1thLXpcXC1dKy1ncmFkaWVudC9nLEI9XCJcIixHPVwiXCIsSz1mdW5jdGlvbigpe3ZhciBlPS9eKD86T3xNb3p8d2Via2l0fG1zKXwoPzotKD86b3xtb3p8d2Via2l0fG1zKS0pLztpZihjKXt2YXIgdD1jKGEsbnVsbCk7Zm9yKHZhciBuIGluIHQpaWYoQj1uLm1hdGNoKGUpfHwrbj09biYmdFtuXS5tYXRjaChlKSlicmVhaztpZighQilyZXR1cm4gQj1HPVwiXCIscjtCPUJbMF0sXCItXCI9PT1CLnNsaWNlKDAsMSk/KEc9QixCPXtcIi13ZWJraXQtXCI6XCJ3ZWJraXRcIixcIi1tb3otXCI6XCJNb3pcIixcIi1tcy1cIjpcIm1zXCIsXCItby1cIjpcIk9cIn1bQl0pOkc9XCItXCIrQi50b0xvd2VyQ2FzZSgpK1wiLVwifX0sWT1mdW5jdGlvbigpe3ZhciB0PWUucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxlW0IudG9Mb3dlckNhc2UoKStcIlJlcXVlc3RBbmltYXRpb25GcmFtZVwiXSxyPVB0KCk7cmV0dXJuKEd0fHwhdCkmJih0PWZ1bmN0aW9uKHQpe3ZhciBuPVB0KCktcixvPXMubWF4KDAsMWUzLzYwLW4pO3JldHVybiBlLnNldFRpbWVvdXQoZnVuY3Rpb24oKXtyPVB0KCksdCgpfSxvKX0pLHR9LFI9ZnVuY3Rpb24oKXt2YXIgdD1lLmNhbmNlbEFuaW1hdGlvbkZyYW1lfHxlW0IudG9Mb3dlckNhc2UoKStcIkNhbmNlbEFuaW1hdGlvbkZyYW1lXCJdO3JldHVybihHdHx8IXQpJiYodD1mdW5jdGlvbih0KXtyZXR1cm4gZS5jbGVhclRpbWVvdXQodCl9KSx0fSxVPXtiZWdpbjpmdW5jdGlvbigpe3JldHVybiAwfSxlbmQ6ZnVuY3Rpb24oKXtyZXR1cm4gMX0sbGluZWFyOmZ1bmN0aW9uKGUpe3JldHVybiBlfSxxdWFkcmF0aWM6ZnVuY3Rpb24oZSl7cmV0dXJuIGUqZX0sY3ViaWM6ZnVuY3Rpb24oZSl7cmV0dXJuIGUqZSplfSxzd2luZzpmdW5jdGlvbihlKXtyZXR1cm4tcy5jb3MoZSpzLlBJKS8yKy41fSxzcXJ0OmZ1bmN0aW9uKGUpe3JldHVybiBzLnNxcnQoZSl9LG91dEN1YmljOmZ1bmN0aW9uKGUpe3JldHVybiBzLnBvdyhlLTEsMykrMX0sYm91bmNlOmZ1bmN0aW9uKGUpe3ZhciB0O2lmKC41MDgzPj1lKXQ9MztlbHNlIGlmKC44NDg5Pj1lKXQ9OTtlbHNlIGlmKC45NjIwOD49ZSl0PTI3O2Vsc2V7aWYoISguOTk5ODE+PWUpKXJldHVybiAxO3Q9OTF9cmV0dXJuIDEtcy5hYnMoMypzLmNvcygxLjAyOCplKnQpL3QpfX07bi5wcm90b3R5cGUucmVmcmVzaD1mdW5jdGlvbihlKXt2YXIgbixvLGE9ITE7Zm9yKGU9PT1yPyhhPSEwLGx0PVtdLEJ0PTAsZT10LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSk6ZS5sZW5ndGg9PT1yJiYoZT1bZV0pLG49MCxvPWUubGVuZ3RoO28+bjtuKyspe3ZhciBpPWVbbl0sbD1pLHM9W10sYz1kdCxmPXl0LHU9ITE7aWYoYSYmSCBpbiBpJiZkZWxldGUgaVtIXSxpLmF0dHJpYnV0ZXMpe2Zvcih2YXIgbT0wLHA9aS5hdHRyaWJ1dGVzLmxlbmd0aDtwPm07bSsrKXt2YXIgZz1pLmF0dHJpYnV0ZXNbbV07aWYoXCJkYXRhLWFuY2hvci10YXJnZXRcIiE9PWcubmFtZSlpZihcImRhdGEtc21vb3RoLXNjcm9sbGluZ1wiIT09Zy5uYW1lKWlmKFwiZGF0YS1lZGdlLXN0cmF0ZWd5XCIhPT1nLm5hbWUpaWYoXCJkYXRhLWVtaXQtZXZlbnRzXCIhPT1nLm5hbWUpe3ZhciB2PWcubmFtZS5tYXRjaChOKTtpZihudWxsIT09dil7dmFyIGg9e3Byb3BzOmcudmFsdWUsZWxlbWVudDppLGV2ZW50VHlwZTpnLm5hbWUucmVwbGFjZSh6LHEpfTtzLnB1c2goaCk7dmFyIHk9dlsxXTt5JiYoaC5jb25zdGFudD15LnN1YnN0cigxKSk7dmFyIFQ9dlsyXTsvcCQvLnRlc3QoVCk/KGguaXNQZXJjZW50YWdlPSEwLGgub2Zmc2V0PSgwfFQuc2xpY2UoMCwtMSkpLzEwMCk6aC5vZmZzZXQ9MHxUO3ZhciBiPXZbM10sUz12WzRdfHxiO2ImJmIhPT1BJiZiIT09Rj8oaC5tb2RlPVwicmVsYXRpdmVcIixoLmFuY2hvcnM9W2IsU10pOihoLm1vZGU9XCJhYnNvbHV0ZVwiLGI9PT1GP2guaXNFbmQ9ITA6aC5pc1BlcmNlbnRhZ2V8fChoLm9mZnNldD1oLm9mZnNldCpWdCkpfX1lbHNlIHU9ITA7ZWxzZSBmPWcudmFsdWU7ZWxzZSBjPVwib2ZmXCIhPT1nLnZhbHVlO2Vsc2UgaWYobD10LnF1ZXJ5U2VsZWN0b3IoZy52YWx1ZSksbnVsbD09PWwpdGhyb3cnVW5hYmxlIHRvIGZpbmQgYW5jaG9yIHRhcmdldCBcIicrZy52YWx1ZSsnXCInfWlmKHMubGVuZ3RoKXt2YXIgayx3LHg7IWEmJkggaW4gaT8oeD1pW0hdLGs9bHRbeF0uc3R5bGVBdHRyLHc9bHRbeF0uY2xhc3NBdHRyKTooeD1pW0hdPUJ0Kyssaz1pLnN0eWxlLmNzc1RleHQsdz1DdChpKSksbHRbeF09e2VsZW1lbnQ6aSxzdHlsZUF0dHI6ayxjbGFzc0F0dHI6dyxhbmNob3JUYXJnZXQ6bCxrZXlGcmFtZXM6cyxzbW9vdGhTY3JvbGxpbmc6YyxlZGdlU3RyYXRlZ3k6ZixlbWl0RXZlbnRzOnUsbGFzdEZyYW1lSW5kZXg6LTF9LER0KGksW2RdLFtdKX19fWZvcihFdCgpLG49MCxvPWUubGVuZ3RoO28+bjtuKyspe3ZhciBFPWx0W2Vbbl1bSF1dO0UhPT1yJiYoSihFKSxldChFKSl9cmV0dXJuIGl0fSxuLnByb3RvdHlwZS5yZWxhdGl2ZVRvQWJzb2x1dGU9ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPW8uY2xpZW50SGVpZ2h0LGE9ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxpPWEudG9wLGw9YS5ib3R0b20tYS50b3A7cmV0dXJuIHQ9PT1EP2ktPW46dD09PUMmJihpLT1uLzIpLHI9PT1EP2krPWw6cj09PUMmJihpKz1sLzIpLGkrPWl0LmdldFNjcm9sbFRvcCgpLDB8aSsuNX0sbi5wcm90b3R5cGUuYW5pbWF0ZVRvPWZ1bmN0aW9uKGUsdCl7dD10fHx7fTt2YXIgbj1QdCgpLG89aXQuZ2V0U2Nyb2xsVG9wKCk7cmV0dXJuIHB0PXtzdGFydFRvcDpvLHRvcERpZmY6ZS1vLHRhcmdldFRvcDplLGR1cmF0aW9uOnQuZHVyYXRpb258fHcsc3RhcnRUaW1lOm4sZW5kVGltZTpuKyh0LmR1cmF0aW9ufHx3KSxlYXNpbmc6VVt0LmVhc2luZ3x8a10sZG9uZTp0LmRvbmV9LHB0LnRvcERpZmZ8fChwdC5kb25lJiZwdC5kb25lLmNhbGwoaXQsITEpLHB0PXIpLGl0fSxuLnByb3RvdHlwZS5zdG9wQW5pbWF0ZVRvPWZ1bmN0aW9uKCl7cHQmJnB0LmRvbmUmJnB0LmRvbmUuY2FsbChpdCwhMCkscHQ9cn0sbi5wcm90b3R5cGUuaXNBbmltYXRpbmdUbz1mdW5jdGlvbigpe3JldHVybiEhcHR9LG4ucHJvdG90eXBlLmlzTW9iaWxlPWZ1bmN0aW9uKCl7cmV0dXJuIEd0fSxuLnByb3RvdHlwZS5zZXRTY3JvbGxUb3A9ZnVuY3Rpb24odCxyKXtyZXR1cm4gaHQ9cj09PSEwLEd0P0t0PXMubWluKHMubWF4KHQsMCksT3QpOmUuc2Nyb2xsVG8oMCx0KSxpdH0sbi5wcm90b3R5cGUuZ2V0U2Nyb2xsVG9wPWZ1bmN0aW9uKCl7cmV0dXJuIEd0P0t0OmUucGFnZVlPZmZzZXR8fG8uc2Nyb2xsVG9wfHxhLnNjcm9sbFRvcHx8MH0sbi5wcm90b3R5cGUuZ2V0TWF4U2Nyb2xsVG9wPWZ1bmN0aW9uKCl7cmV0dXJuIE90fSxuLnByb3RvdHlwZS5vbj1mdW5jdGlvbihlLHQpe3JldHVybiBjdFtlXT10LGl0fSxuLnByb3RvdHlwZS5vZmY9ZnVuY3Rpb24oZSl7cmV0dXJuIGRlbGV0ZSBjdFtlXSxpdH0sbi5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3ZhciBlPVIoKTtlKGJ0KSx3dCgpLER0KG8sW1RdLFt5LGIsU10pO2Zvcih2YXIgdD0wLG49bHQubGVuZ3RoO24+dDt0Kyspb3QobHRbdF0uZWxlbWVudCk7by5zdHlsZS5vdmVyZmxvdz1hLnN0eWxlLm92ZXJmbG93PVwiXCIsby5zdHlsZS5oZWlnaHQ9YS5zdHlsZS5oZWlnaHQ9XCJcIixzdCYmaS5zZXRTdHlsZShzdCxcInRyYW5zZm9ybVwiLFwibm9uZVwiKSxpdD1yLHN0PXIsY3Q9cixmdD1yLE90PTAsVnQ9MSx1dD1yLG10PXIsenQ9XCJkb3duXCIscXQ9LTEsTXQ9MCwkdD0wLF90PSExLHB0PXIsZHQ9cixndD1yLHZ0PXIsaHQ9cixCdD0wLHl0PXIsR3Q9ITEsS3Q9MCxUdD1yfTt2YXIgWD1mdW5jdGlvbigpe3ZhciBuLGksbCxjLGQsZyx2LGgseSxULGIsUztTdChvLFtmLHUsbSxwXS5qb2luKFwiIFwiKSxmdW5jdGlvbihlKXt2YXIgbz1lLmNoYW5nZWRUb3VjaGVzWzBdO2ZvcihjPWUudGFyZ2V0OzM9PT1jLm5vZGVUeXBlOyljPWMucGFyZW50Tm9kZTtzd2l0Y2goZD1vLmNsaWVudFksZz1vLmNsaWVudFgsVD1lLnRpbWVTdGFtcCxJLnRlc3QoYy50YWdOYW1lKXx8ZS5wcmV2ZW50RGVmYXVsdCgpLGUudHlwZSl7Y2FzZSBmOm4mJm4uYmx1cigpLGl0LnN0b3BBbmltYXRlVG8oKSxuPWMsaT12PWQsbD1nLHk9VDticmVhaztjYXNlIHU6SS50ZXN0KGMudGFnTmFtZSkmJnQuYWN0aXZlRWxlbWVudCE9PWMmJmUucHJldmVudERlZmF1bHQoKSxoPWQtdixTPVQtYixpdC5zZXRTY3JvbGxUb3AoS3QtaCwhMCksdj1kLGI9VDticmVhaztkZWZhdWx0OmNhc2UgbTpjYXNlIHA6dmFyIGE9aS1kLGs9bC1nLHc9ayprK2EqYTtpZig0OT53KXtpZighSS50ZXN0KG4udGFnTmFtZSkpe24uZm9jdXMoKTt2YXIgeD10LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7eC5pbml0TW91c2VFdmVudChcImNsaWNrXCIsITAsITAsZS52aWV3LDEsby5zY3JlZW5YLG8uc2NyZWVuWSxvLmNsaWVudFgsby5jbGllbnRZLGUuY3RybEtleSxlLmFsdEtleSxlLnNoaWZ0S2V5LGUubWV0YUtleSwwLG51bGwpLG4uZGlzcGF0Y2hFdmVudCh4KX1yZXR1cm59bj1yO3ZhciBFPWgvUztFPXMubWF4KHMubWluKEUsMyksLTMpO3ZhciBBPXMuYWJzKEUvbXQpLEY9RSpBKy41Km10KkEqQSxDPWl0LmdldFNjcm9sbFRvcCgpLUYsRD0wO0M+T3Q/KEQ9KE90LUMpL0YsQz1PdCk6MD5DJiYoRD0tQy9GLEM9MCksQSo9MS1ELGl0LmFuaW1hdGVUbygwfEMrLjUse2Vhc2luZzpcIm91dEN1YmljXCIsZHVyYXRpb246QX0pfX0pLGUuc2Nyb2xsVG8oMCwwKSxvLnN0eWxlLm92ZXJmbG93PWEuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIn0saj1mdW5jdGlvbigpe3ZhciBlLHQscixuLGEsaSxsLGMsZix1LG0scD1vLmNsaWVudEhlaWdodCxkPUF0KCk7Zm9yKGM9MCxmPWx0Lmxlbmd0aDtmPmM7YysrKWZvcihlPWx0W2NdLHQ9ZS5lbGVtZW50LHI9ZS5hbmNob3JUYXJnZXQsbj1lLmtleUZyYW1lcyxhPTAsaT1uLmxlbmd0aDtpPmE7YSsrKWw9blthXSx1PWwub2Zmc2V0LG09ZFtsLmNvbnN0YW50XXx8MCxsLmZyYW1lPXUsbC5pc1BlcmNlbnRhZ2UmJih1Kj1wLGwuZnJhbWU9dSksXCJyZWxhdGl2ZVwiPT09bC5tb2RlJiYob3QodCksbC5mcmFtZT1pdC5yZWxhdGl2ZVRvQWJzb2x1dGUocixsLmFuY2hvcnNbMF0sbC5hbmNob3JzWzFdKS11LG90KHQsITApKSxsLmZyYW1lKz1tLGZ0JiYhbC5pc0VuZCYmbC5mcmFtZT5PdCYmKE90PWwuZnJhbWUpO2ZvcihPdD1zLm1heChPdCxGdCgpKSxjPTAsZj1sdC5sZW5ndGg7Zj5jO2MrKyl7Zm9yKGU9bHRbY10sbj1lLmtleUZyYW1lcyxhPTAsaT1uLmxlbmd0aDtpPmE7YSsrKWw9blthXSxtPWRbbC5jb25zdGFudF18fDAsbC5pc0VuZCYmKGwuZnJhbWU9T3QtbC5vZmZzZXQrbSk7ZS5rZXlGcmFtZXMuc29ydChOdCl9fSxXPWZ1bmN0aW9uKGUsdCl7Zm9yKHZhciByPTAsbj1sdC5sZW5ndGg7bj5yO3IrKyl7dmFyIG8sYSxzPWx0W3JdLGM9cy5lbGVtZW50LGY9cy5zbW9vdGhTY3JvbGxpbmc/ZTp0LHU9cy5rZXlGcmFtZXMsbT11Lmxlbmd0aCxwPXVbMF0seT11W3UubGVuZ3RoLTFdLFQ9cC5mcmFtZT5mLGI9Zj55LmZyYW1lLFM9VD9wOnksaz1zLmVtaXRFdmVudHMsdz1zLmxhc3RGcmFtZUluZGV4O2lmKFR8fGIpe2lmKFQmJi0xPT09cy5lZGdlfHxiJiYxPT09cy5lZGdlKWNvbnRpbnVlO3N3aXRjaChUPyhEdChjLFtnXSxbaCx2XSksayYmdz4tMSYmKHh0KGMscC5ldmVudFR5cGUsenQpLHMubGFzdEZyYW1lSW5kZXg9LTEpKTooRHQoYyxbaF0sW2csdl0pLGsmJm0+dyYmKHh0KGMseS5ldmVudFR5cGUsenQpLHMubGFzdEZyYW1lSW5kZXg9bSkpLHMuZWRnZT1UPy0xOjEscy5lZGdlU3RyYXRlZ3kpe2Nhc2VcInJlc2V0XCI6b3QoYyk7Y29udGludWU7Y2FzZVwiZWFzZVwiOmY9Uy5mcmFtZTticmVhaztkZWZhdWx0OmNhc2VcInNldFwiOnZhciB4PVMucHJvcHM7Zm9yKG8gaW4geClsLmNhbGwoeCxvKSYmKGE9bnQoeFtvXS52YWx1ZSksMD09PW8uaW5kZXhPZihcIkBcIik/Yy5zZXRBdHRyaWJ1dGUoby5zdWJzdHIoMSksYSk6aS5zZXRTdHlsZShjLG8sYSkpO2NvbnRpbnVlfX1lbHNlIDAhPT1zLmVkZ2UmJihEdChjLFtkLHZdLFtnLGhdKSxzLmVkZ2U9MCk7Zm9yKHZhciBFPTA7bS0xPkU7RSsrKWlmKGY+PXVbRV0uZnJhbWUmJnVbRSsxXS5mcmFtZT49Zil7dmFyIEE9dVtFXSxGPXVbRSsxXTtmb3IobyBpbiBBLnByb3BzKWlmKGwuY2FsbChBLnByb3BzLG8pKXt2YXIgQz0oZi1BLmZyYW1lKS8oRi5mcmFtZS1BLmZyYW1lKTtDPUEucHJvcHNbb10uZWFzaW5nKEMpLGE9cnQoQS5wcm9wc1tvXS52YWx1ZSxGLnByb3BzW29dLnZhbHVlLEMpLGE9bnQoYSksMD09PW8uaW5kZXhPZihcIkBcIik/Yy5zZXRBdHRyaWJ1dGUoby5zdWJzdHIoMSksYSk6aS5zZXRTdHlsZShjLG8sYSl9ayYmdyE9PUUmJihcImRvd25cIj09PXp0P3h0KGMsQS5ldmVudFR5cGUsenQpOnh0KGMsRi5ldmVudFR5cGUsenQpLHMubGFzdEZyYW1lSW5kZXg9RSk7YnJlYWt9fX0sWj1mdW5jdGlvbigpe190JiYoX3Q9ITEsRXQoKSk7dmFyIGUsdCxuPWl0LmdldFNjcm9sbFRvcCgpLG89UHQoKTtpZihwdClvPj1wdC5lbmRUaW1lPyhuPXB0LnRhcmdldFRvcCxlPXB0LmRvbmUscHQ9cik6KHQ9cHQuZWFzaW5nKChvLXB0LnN0YXJ0VGltZSkvcHQuZHVyYXRpb24pLG49MHxwdC5zdGFydFRvcCt0KnB0LnRvcERpZmYpLGl0LnNldFNjcm9sbFRvcChuLCEwKTtlbHNlIGlmKCFodCl7dmFyIGE9dnQudGFyZ2V0VG9wLW47YSYmKHZ0PXtzdGFydFRvcDpxdCx0b3BEaWZmOm4tcXQsdGFyZ2V0VG9wOm4sc3RhcnRUaW1lOkx0LGVuZFRpbWU6THQrZ3R9KSx2dC5lbmRUaW1lPj1vJiYodD1VLnNxcnQoKG8tdnQuc3RhcnRUaW1lKS9ndCksbj0wfHZ0LnN0YXJ0VG9wK3QqdnQudG9wRGlmZil9aWYoR3QmJnN0JiZpLnNldFN0eWxlKHN0LFwidHJhbnNmb3JtXCIsXCJ0cmFuc2xhdGUoMCwgXCIrLUt0K1wicHgpIFwiK1R0KSxodHx8cXQhPT1uKXt6dD1uPnF0P1wiZG93blwiOnF0Pm4/XCJ1cFwiOnp0LGh0PSExO3ZhciBsPXtjdXJUb3A6bixsYXN0VG9wOnF0LG1heFRvcDpPdCxkaXJlY3Rpb246enR9LHM9Y3QuYmVmb3JlcmVuZGVyJiZjdC5iZWZvcmVyZW5kZXIuY2FsbChpdCxsKTtzIT09ITEmJihXKG4saXQuZ2V0U2Nyb2xsVG9wKCkpLHF0PW4sY3QucmVuZGVyJiZjdC5yZW5kZXIuY2FsbChpdCxsKSksZSYmZS5jYWxsKGl0LCExKX1MdD1vfSxKPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0wLHI9ZS5rZXlGcmFtZXMubGVuZ3RoO3I+dDt0Kyspe2Zvcih2YXIgbixvLGEsaSxsPWUua2V5RnJhbWVzW3RdLHM9e307bnVsbCE9PShpPU8uZXhlYyhsLnByb3BzKSk7KWE9aVsxXSxvPWlbMl0sbj1hLm1hdGNoKFYpLG51bGwhPT1uPyhhPW5bMV0sbj1uWzJdKTpuPWssbz1vLmluZGV4T2YoXCIhXCIpP1Eobyk6W28uc2xpY2UoMSldLHNbYV09e3ZhbHVlOm8sZWFzaW5nOlVbbl19O2wucHJvcHM9c319LFE9ZnVuY3Rpb24oZSl7dmFyIHQ9W107cmV0dXJuICQubGFzdEluZGV4PTAsZT1lLnJlcGxhY2UoJCxmdW5jdGlvbihlKXtyZXR1cm4gZS5yZXBsYWNlKEwsZnVuY3Rpb24oZSl7cmV0dXJuIDEwMCooZS8yNTUpK1wiJVwifSl9KSxHJiYoXy5sYXN0SW5kZXg9MCxlPWUucmVwbGFjZShfLGZ1bmN0aW9uKGUpe3JldHVybiBHK2V9KSksZT1lLnJlcGxhY2UoTCxmdW5jdGlvbihlKXtyZXR1cm4gdC5wdXNoKCtlKSxcIns/fVwifSksdC51bnNoaWZ0KGUpLHR9LGV0PWZ1bmN0aW9uKGUpe3ZhciB0LHIsbj17fTtmb3IodD0wLHI9ZS5rZXlGcmFtZXMubGVuZ3RoO3I+dDt0KyspdHQoZS5rZXlGcmFtZXNbdF0sbik7Zm9yKG49e30sdD1lLmtleUZyYW1lcy5sZW5ndGgtMTt0Pj0wO3QtLSl0dChlLmtleUZyYW1lc1t0XSxuKX0sdHQ9ZnVuY3Rpb24oZSx0KXt2YXIgcjtmb3IociBpbiB0KWwuY2FsbChlLnByb3BzLHIpfHwoZS5wcm9wc1tyXT10W3JdKTtmb3IociBpbiBlLnByb3BzKXRbcl09ZS5wcm9wc1tyXX0scnQ9ZnVuY3Rpb24oZSx0LHIpe3ZhciBuLG89ZS5sZW5ndGg7aWYobyE9PXQubGVuZ3RoKXRocm93XCJDYW4ndCBpbnRlcnBvbGF0ZSBiZXR3ZWVuIFxcXCJcIitlWzBdKydcIiBhbmQgXCInK3RbMF0rJ1wiJzt2YXIgYT1bZVswXV07Zm9yKG49MTtvPm47bisrKWFbbl09ZVtuXSsodFtuXS1lW25dKSpyO3JldHVybiBhfSxudD1mdW5jdGlvbihlKXt2YXIgdD0xO3JldHVybiBNLmxhc3RJbmRleD0wLGVbMF0ucmVwbGFjZShNLGZ1bmN0aW9uKCl7cmV0dXJuIGVbdCsrXX0pfSxvdD1mdW5jdGlvbihlLHQpe2U9W10uY29uY2F0KGUpO2Zvcih2YXIgcixuLG89MCxhPWUubGVuZ3RoO2E+bztvKyspbj1lW29dLHI9bHRbbltIXV0sciYmKHQ/KG4uc3R5bGUuY3NzVGV4dD1yLmRpcnR5U3R5bGVBdHRyLER0KG4sci5kaXJ0eUNsYXNzQXR0cikpOihyLmRpcnR5U3R5bGVBdHRyPW4uc3R5bGUuY3NzVGV4dCxyLmRpcnR5Q2xhc3NBdHRyPUN0KG4pLG4uc3R5bGUuY3NzVGV4dD1yLnN0eWxlQXR0cixEdChuLHIuY2xhc3NBdHRyKSkpfSxhdD1mdW5jdGlvbigpe1R0PVwidHJhbnNsYXRlWigwKVwiLGkuc2V0U3R5bGUoc3QsXCJ0cmFuc2Zvcm1cIixUdCk7dmFyIGU9YyhzdCksdD1lLmdldFByb3BlcnR5VmFsdWUoXCJ0cmFuc2Zvcm1cIikscj1lLmdldFByb3BlcnR5VmFsdWUoRytcInRyYW5zZm9ybVwiKSxuPXQmJlwibm9uZVwiIT09dHx8ciYmXCJub25lXCIhPT1yO258fChUdD1cIlwiKX07aS5zZXRTdHlsZT1mdW5jdGlvbihlLHQscil7dmFyIG49ZS5zdHlsZTtpZih0PXQucmVwbGFjZSh6LHEpLnJlcGxhY2UoXCItXCIsXCJcIiksXCJ6SW5kZXhcIj09PXQpblt0XT1pc05hTihyKT9yOlwiXCIrKDB8cik7ZWxzZSBpZihcImZsb2F0XCI9PT10KW4uc3R5bGVGbG9hdD1uLmNzc0Zsb2F0PXI7ZWxzZSB0cnl7QiYmKG5bQit0LnNsaWNlKDAsMSkudG9VcHBlckNhc2UoKSt0LnNsaWNlKDEpXT1yKSxuW3RdPXJ9Y2F0Y2gobyl7fX07dmFyIGl0LGx0LHN0LGN0LGZ0LHV0LG10LHB0LGR0LGd0LHZ0LGh0LHl0LFR0LGJ0LFN0PWkuYWRkRXZlbnQ9ZnVuY3Rpb24odCxyLG4pe3ZhciBvPWZ1bmN0aW9uKHQpe3JldHVybiB0PXR8fGUuZXZlbnQsdC50YXJnZXR8fCh0LnRhcmdldD10LnNyY0VsZW1lbnQpLHQucHJldmVudERlZmF1bHR8fCh0LnByZXZlbnREZWZhdWx0PWZ1bmN0aW9uKCl7dC5yZXR1cm5WYWx1ZT0hMSx0LmRlZmF1bHRQcmV2ZW50ZWQ9ITB9KSxuLmNhbGwodGhpcyx0KX07cj1yLnNwbGl0KFwiIFwiKTtmb3IodmFyIGEsaT0wLGw9ci5sZW5ndGg7bD5pO2krKylhPXJbaV0sdC5hZGRFdmVudExpc3RlbmVyP3QuYWRkRXZlbnRMaXN0ZW5lcihhLG4sITEpOnQuYXR0YWNoRXZlbnQoXCJvblwiK2EsbyksWXQucHVzaCh7ZWxlbWVudDp0LG5hbWU6YSxsaXN0ZW5lcjpufSl9LGt0PWkucmVtb3ZlRXZlbnQ9ZnVuY3Rpb24oZSx0LHIpe3Q9dC5zcGxpdChcIiBcIik7Zm9yKHZhciBuPTAsbz10Lmxlbmd0aDtvPm47bisrKWUucmVtb3ZlRXZlbnRMaXN0ZW5lcj9lLnJlbW92ZUV2ZW50TGlzdGVuZXIodFtuXSxyLCExKTplLmRldGFjaEV2ZW50KFwib25cIit0W25dLHIpfSx3dD1mdW5jdGlvbigpe2Zvcih2YXIgZSx0PTAscj1ZdC5sZW5ndGg7cj50O3QrKyllPVl0W3RdLGt0KGUuZWxlbWVudCxlLm5hbWUsZS5saXN0ZW5lcik7WXQ9W119LHh0PWZ1bmN0aW9uKGUsdCxyKXtjdC5rZXlmcmFtZSYmY3Qua2V5ZnJhbWUuY2FsbChpdCxlLHQscil9LEV0PWZ1bmN0aW9uKCl7dmFyIGU9aXQuZ2V0U2Nyb2xsVG9wKCk7T3Q9MCxmdCYmIUd0JiYoYS5zdHlsZS5oZWlnaHQ9XCJcIiksaigpLGZ0JiYhR3QmJihhLnN0eWxlLmhlaWdodD1PdCtvLmNsaWVudEhlaWdodCtcInB4XCIpLEd0P2l0LnNldFNjcm9sbFRvcChzLm1pbihpdC5nZXRTY3JvbGxUb3AoKSxPdCkpOml0LnNldFNjcm9sbFRvcChlLCEwKSxodD0hMH0sQXQ9ZnVuY3Rpb24oKXt2YXIgZSx0LHI9by5jbGllbnRIZWlnaHQsbj17fTtmb3IoZSBpbiB1dCl0PXV0W2VdLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dD10LmNhbGwoaXQpOi9wJC8udGVzdCh0KSYmKHQ9dC5zbGljZSgwLC0xKS8xMDAqciksbltlXT10O3JldHVybiBufSxGdD1mdW5jdGlvbigpe3ZhciBlPXN0JiZzdC5vZmZzZXRIZWlnaHR8fDAsdD1zLm1heChlLGEuc2Nyb2xsSGVpZ2h0LGEub2Zmc2V0SGVpZ2h0LG8uc2Nyb2xsSGVpZ2h0LG8ub2Zmc2V0SGVpZ2h0LG8uY2xpZW50SGVpZ2h0KTtyZXR1cm4gdC1vLmNsaWVudEhlaWdodH0sQ3Q9ZnVuY3Rpb24odCl7dmFyIHI9XCJjbGFzc05hbWVcIjtyZXR1cm4gZS5TVkdFbGVtZW50JiZ0IGluc3RhbmNlb2YgZS5TVkdFbGVtZW50JiYodD10W3JdLHI9XCJiYXNlVmFsXCIpLHRbcl19LER0PWZ1bmN0aW9uKHQsbixvKXt2YXIgYT1cImNsYXNzTmFtZVwiO2lmKGUuU1ZHRWxlbWVudCYmdCBpbnN0YW5jZW9mIGUuU1ZHRWxlbWVudCYmKHQ9dFthXSxhPVwiYmFzZVZhbFwiKSxvPT09cilyZXR1cm4gdFthXT1uLHI7Zm9yKHZhciBpPXRbYV0sbD0wLHM9by5sZW5ndGg7cz5sO2wrKylpPUl0KGkpLnJlcGxhY2UoSXQob1tsXSksXCIgXCIpO2k9SHQoaSk7Zm9yKHZhciBjPTAsZj1uLmxlbmd0aDtmPmM7YysrKS0xPT09SXQoaSkuaW5kZXhPZihJdChuW2NdKSkmJihpKz1cIiBcIituW2NdKTt0W2FdPUh0KGkpfSxIdD1mdW5jdGlvbihlKXtyZXR1cm4gZS5yZXBsYWNlKFAsXCJcIil9LEl0PWZ1bmN0aW9uKGUpe3JldHVyblwiIFwiK2UrXCIgXCJ9LFB0PURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybituZXcgRGF0ZX0sTnQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5mcmFtZS10LmZyYW1lfSxPdD0wLFZ0PTEsenQ9XCJkb3duXCIscXQ9LTEsTHQ9UHQoKSxNdD0wLCR0PTAsX3Q9ITEsQnQ9MCxHdD0hMSxLdD0wLFl0PVtdO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJza3JvbGxyXCIsZnVuY3Rpb24oKXtyZXR1cm4gaX0pOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWk6ZS5za3JvbGxyPWl9KSh3aW5kb3csZG9jdW1lbnQpOyIsIi8qIFdlYiBGb250IExvYWRlciB2MS42LjI4IC0gKGMpIEFkb2JlIFN5c3RlbXMsIEdvb2dsZS4gTGljZW5zZTogQXBhY2hlIDIuMCAqLyhmdW5jdGlvbigpe2Z1bmN0aW9uIGFhKGEsYixjKXtyZXR1cm4gYS5jYWxsLmFwcGx5KGEuYmluZCxhcmd1bWVudHMpfWZ1bmN0aW9uIGJhKGEsYixjKXtpZighYSl0aHJvdyBFcnJvcigpO2lmKDI8YXJndW1lbnRzLmxlbmd0aCl7dmFyIGQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDIpO3JldHVybiBmdW5jdGlvbigpe3ZhciBjPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7QXJyYXkucHJvdG90eXBlLnVuc2hpZnQuYXBwbHkoYyxkKTtyZXR1cm4gYS5hcHBseShiLGMpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gYS5hcHBseShiLGFyZ3VtZW50cyl9fWZ1bmN0aW9uIHAoYSxiLGMpe3A9RnVuY3Rpb24ucHJvdG90eXBlLmJpbmQmJi0xIT1GdW5jdGlvbi5wcm90b3R5cGUuYmluZC50b1N0cmluZygpLmluZGV4T2YoXCJuYXRpdmUgY29kZVwiKT9hYTpiYTtyZXR1cm4gcC5hcHBseShudWxsLGFyZ3VtZW50cyl9dmFyIHE9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuK25ldyBEYXRlfTtmdW5jdGlvbiBjYShhLGIpe3RoaXMuYT1hO3RoaXMubz1ifHxhO3RoaXMuYz10aGlzLm8uZG9jdW1lbnR9dmFyIGRhPSEhd2luZG93LkZvbnRGYWNlO2Z1bmN0aW9uIHQoYSxiLGMsZCl7Yj1hLmMuY3JlYXRlRWxlbWVudChiKTtpZihjKWZvcih2YXIgZSBpbiBjKWMuaGFzT3duUHJvcGVydHkoZSkmJihcInN0eWxlXCI9PWU/Yi5zdHlsZS5jc3NUZXh0PWNbZV06Yi5zZXRBdHRyaWJ1dGUoZSxjW2VdKSk7ZCYmYi5hcHBlbmRDaGlsZChhLmMuY3JlYXRlVGV4dE5vZGUoZCkpO3JldHVybiBifWZ1bmN0aW9uIHUoYSxiLGMpe2E9YS5jLmdldEVsZW1lbnRzQnlUYWdOYW1lKGIpWzBdO2F8fChhPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7YS5pbnNlcnRCZWZvcmUoYyxhLmxhc3RDaGlsZCl9ZnVuY3Rpb24gdihhKXthLnBhcmVudE5vZGUmJmEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhKX1cbmZ1bmN0aW9uIHcoYSxiLGMpe2I9Ynx8W107Yz1jfHxbXTtmb3IodmFyIGQ9YS5jbGFzc05hbWUuc3BsaXQoL1xccysvKSxlPTA7ZTxiLmxlbmd0aDtlKz0xKXtmb3IodmFyIGY9ITEsZz0wO2c8ZC5sZW5ndGg7Zys9MSlpZihiW2VdPT09ZFtnXSl7Zj0hMDticmVha31mfHxkLnB1c2goYltlXSl9Yj1bXTtmb3IoZT0wO2U8ZC5sZW5ndGg7ZSs9MSl7Zj0hMTtmb3IoZz0wO2c8Yy5sZW5ndGg7Zys9MSlpZihkW2VdPT09Y1tnXSl7Zj0hMDticmVha31mfHxiLnB1c2goZFtlXSl9YS5jbGFzc05hbWU9Yi5qb2luKFwiIFwiKS5yZXBsYWNlKC9cXHMrL2csXCIgXCIpLnJlcGxhY2UoL15cXHMrfFxccyskLyxcIlwiKX1mdW5jdGlvbiB5KGEsYil7Zm9yKHZhciBjPWEuY2xhc3NOYW1lLnNwbGl0KC9cXHMrLyksZD0wLGU9Yy5sZW5ndGg7ZDxlO2QrKylpZihjW2RdPT1iKXJldHVybiEwO3JldHVybiExfVxuZnVuY3Rpb24gZWEoYSl7cmV0dXJuIGEuby5sb2NhdGlvbi5ob3N0bmFtZXx8YS5hLmxvY2F0aW9uLmhvc3RuYW1lfWZ1bmN0aW9uIHooYSxiLGMpe2Z1bmN0aW9uIGQoKXttJiZlJiZmJiYobShnKSxtPW51bGwpfWI9dChhLFwibGlua1wiLHtyZWw6XCJzdHlsZXNoZWV0XCIsaHJlZjpiLG1lZGlhOlwiYWxsXCJ9KTt2YXIgZT0hMSxmPSEwLGc9bnVsbCxtPWN8fG51bGw7ZGE/KGIub25sb2FkPWZ1bmN0aW9uKCl7ZT0hMDtkKCl9LGIub25lcnJvcj1mdW5jdGlvbigpe2U9ITA7Zz1FcnJvcihcIlN0eWxlc2hlZXQgZmFpbGVkIHRvIGxvYWRcIik7ZCgpfSk6c2V0VGltZW91dChmdW5jdGlvbigpe2U9ITA7ZCgpfSwwKTt1KGEsXCJoZWFkXCIsYil9XG5mdW5jdGlvbiBBKGEsYixjLGQpe3ZhciBlPWEuYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07aWYoZSl7dmFyIGY9dChhLFwic2NyaXB0XCIse3NyYzpifSksZz0hMTtmLm9ubG9hZD1mLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2d8fHRoaXMucmVhZHlTdGF0ZSYmXCJsb2FkZWRcIiE9dGhpcy5yZWFkeVN0YXRlJiZcImNvbXBsZXRlXCIhPXRoaXMucmVhZHlTdGF0ZXx8KGc9ITAsYyYmYyhudWxsKSxmLm9ubG9hZD1mLm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLFwiSEVBRFwiPT1mLnBhcmVudE5vZGUudGFnTmFtZSYmZS5yZW1vdmVDaGlsZChmKSl9O2UuYXBwZW5kQ2hpbGQoZik7c2V0VGltZW91dChmdW5jdGlvbigpe2d8fChnPSEwLGMmJmMoRXJyb3IoXCJTY3JpcHQgbG9hZCB0aW1lb3V0XCIpKSl9LGR8fDVFMyk7cmV0dXJuIGZ9cmV0dXJuIG51bGx9O2Z1bmN0aW9uIEIoKXt0aGlzLmE9MDt0aGlzLmM9bnVsbH1mdW5jdGlvbiBDKGEpe2EuYSsrO3JldHVybiBmdW5jdGlvbigpe2EuYS0tO0QoYSl9fWZ1bmN0aW9uIEUoYSxiKXthLmM9YjtEKGEpfWZ1bmN0aW9uIEQoYSl7MD09YS5hJiZhLmMmJihhLmMoKSxhLmM9bnVsbCl9O2Z1bmN0aW9uIEYoYSl7dGhpcy5hPWF8fFwiLVwifUYucHJvdG90eXBlLmM9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPVtdLGM9MDtjPGFyZ3VtZW50cy5sZW5ndGg7YysrKWIucHVzaChhcmd1bWVudHNbY10ucmVwbGFjZSgvW1xcV19dKy9nLFwiXCIpLnRvTG93ZXJDYXNlKCkpO3JldHVybiBiLmpvaW4odGhpcy5hKX07ZnVuY3Rpb24gRyhhLGIpe3RoaXMuYz1hO3RoaXMuZj00O3RoaXMuYT1cIm5cIjt2YXIgYz0oYnx8XCJuNFwiKS5tYXRjaCgvXihbbmlvXSkoWzEtOV0pJC9pKTtjJiYodGhpcy5hPWNbMV0sdGhpcy5mPXBhcnNlSW50KGNbMl0sMTApKX1mdW5jdGlvbiBmYShhKXtyZXR1cm4gSChhKStcIiBcIisoYS5mK1wiMDBcIikrXCIgMzAwcHggXCIrSShhLmMpfWZ1bmN0aW9uIEkoYSl7dmFyIGI9W107YT1hLnNwbGl0KC8sXFxzKi8pO2Zvcih2YXIgYz0wO2M8YS5sZW5ndGg7YysrKXt2YXIgZD1hW2NdLnJlcGxhY2UoL1snXCJdL2csXCJcIik7LTEhPWQuaW5kZXhPZihcIiBcIil8fC9eXFxkLy50ZXN0KGQpP2IucHVzaChcIidcIitkK1wiJ1wiKTpiLnB1c2goZCl9cmV0dXJuIGIuam9pbihcIixcIil9ZnVuY3Rpb24gSihhKXtyZXR1cm4gYS5hK2EuZn1mdW5jdGlvbiBIKGEpe3ZhciBiPVwibm9ybWFsXCI7XCJvXCI9PT1hLmE/Yj1cIm9ibGlxdWVcIjpcImlcIj09PWEuYSYmKGI9XCJpdGFsaWNcIik7cmV0dXJuIGJ9XG5mdW5jdGlvbiBnYShhKXt2YXIgYj00LGM9XCJuXCIsZD1udWxsO2EmJigoZD1hLm1hdGNoKC8obm9ybWFsfG9ibGlxdWV8aXRhbGljKS9pKSkmJmRbMV0mJihjPWRbMV0uc3Vic3RyKDAsMSkudG9Mb3dlckNhc2UoKSksKGQ9YS5tYXRjaCgvKFsxLTldMDB8bm9ybWFsfGJvbGQpL2kpKSYmZFsxXSYmKC9ib2xkL2kudGVzdChkWzFdKT9iPTc6L1sxLTldMDAvLnRlc3QoZFsxXSkmJihiPXBhcnNlSW50KGRbMV0uc3Vic3RyKDAsMSksMTApKSkpO3JldHVybiBjK2J9O2Z1bmN0aW9uIGhhKGEsYil7dGhpcy5jPWE7dGhpcy5mPWEuby5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7dGhpcy5oPWI7dGhpcy5hPW5ldyBGKFwiLVwiKTt0aGlzLmo9ITEhPT1iLmV2ZW50czt0aGlzLmc9ITEhPT1iLmNsYXNzZXN9ZnVuY3Rpb24gaWEoYSl7YS5nJiZ3KGEuZixbYS5hLmMoXCJ3ZlwiLFwibG9hZGluZ1wiKV0pO0soYSxcImxvYWRpbmdcIil9ZnVuY3Rpb24gTChhKXtpZihhLmcpe3ZhciBiPXkoYS5mLGEuYS5jKFwid2ZcIixcImFjdGl2ZVwiKSksYz1bXSxkPVthLmEuYyhcIndmXCIsXCJsb2FkaW5nXCIpXTtifHxjLnB1c2goYS5hLmMoXCJ3ZlwiLFwiaW5hY3RpdmVcIikpO3coYS5mLGMsZCl9SyhhLFwiaW5hY3RpdmVcIil9ZnVuY3Rpb24gSyhhLGIsYyl7aWYoYS5qJiZhLmhbYl0paWYoYylhLmhbYl0oYy5jLEooYykpO2Vsc2UgYS5oW2JdKCl9O2Z1bmN0aW9uIGphKCl7dGhpcy5jPXt9fWZ1bmN0aW9uIGthKGEsYixjKXt2YXIgZD1bXSxlO2ZvcihlIGluIGIpaWYoYi5oYXNPd25Qcm9wZXJ0eShlKSl7dmFyIGY9YS5jW2VdO2YmJmQucHVzaChmKGJbZV0sYykpfXJldHVybiBkfTtmdW5jdGlvbiBNKGEsYil7dGhpcy5jPWE7dGhpcy5mPWI7dGhpcy5hPXQodGhpcy5jLFwic3BhblwiLHtcImFyaWEtaGlkZGVuXCI6XCJ0cnVlXCJ9LHRoaXMuZil9ZnVuY3Rpb24gTihhKXt1KGEuYyxcImJvZHlcIixhLmEpfWZ1bmN0aW9uIE8oYSl7cmV0dXJuXCJkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDotOTk5OXB4O2xlZnQ6LTk5OTlweDtmb250LXNpemU6MzAwcHg7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bztsaW5lLWhlaWdodDpub3JtYWw7bWFyZ2luOjA7cGFkZGluZzowO2ZvbnQtdmFyaWFudDpub3JtYWw7d2hpdGUtc3BhY2U6bm93cmFwO2ZvbnQtZmFtaWx5OlwiK0koYS5jKStcIjtcIisoXCJmb250LXN0eWxlOlwiK0goYSkrXCI7Zm9udC13ZWlnaHQ6XCIrKGEuZitcIjAwXCIpK1wiO1wiKX07ZnVuY3Rpb24gUChhLGIsYyxkLGUsZil7dGhpcy5nPWE7dGhpcy5qPWI7dGhpcy5hPWQ7dGhpcy5jPWM7dGhpcy5mPWV8fDNFMzt0aGlzLmg9Znx8dm9pZCAwfVAucHJvdG90eXBlLnN0YXJ0PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5jLm8uZG9jdW1lbnQsYj10aGlzLGM9cSgpLGQ9bmV3IFByb21pc2UoZnVuY3Rpb24oZCxlKXtmdW5jdGlvbiBmKCl7cSgpLWM+PWIuZj9lKCk6YS5mb250cy5sb2FkKGZhKGIuYSksYi5oKS50aGVuKGZ1bmN0aW9uKGEpezE8PWEubGVuZ3RoP2QoKTpzZXRUaW1lb3V0KGYsMjUpfSxmdW5jdGlvbigpe2UoKX0pfWYoKX0pLGU9bnVsbCxmPW5ldyBQcm9taXNlKGZ1bmN0aW9uKGEsZCl7ZT1zZXRUaW1lb3V0KGQsYi5mKX0pO1Byb21pc2UucmFjZShbZixkXSkudGhlbihmdW5jdGlvbigpe2UmJihjbGVhclRpbWVvdXQoZSksZT1udWxsKTtiLmcoYi5hKX0sZnVuY3Rpb24oKXtiLmooYi5hKX0pfTtmdW5jdGlvbiBRKGEsYixjLGQsZSxmLGcpe3RoaXMudj1hO3RoaXMuQj1iO3RoaXMuYz1jO3RoaXMuYT1kO3RoaXMucz1nfHxcIkJFU2Jzd3lcIjt0aGlzLmY9e307dGhpcy53PWV8fDNFMzt0aGlzLnU9Znx8bnVsbDt0aGlzLm09dGhpcy5qPXRoaXMuaD10aGlzLmc9bnVsbDt0aGlzLmc9bmV3IE0odGhpcy5jLHRoaXMucyk7dGhpcy5oPW5ldyBNKHRoaXMuYyx0aGlzLnMpO3RoaXMuaj1uZXcgTSh0aGlzLmMsdGhpcy5zKTt0aGlzLm09bmV3IE0odGhpcy5jLHRoaXMucyk7YT1uZXcgRyh0aGlzLmEuYytcIixzZXJpZlwiLEoodGhpcy5hKSk7YT1PKGEpO3RoaXMuZy5hLnN0eWxlLmNzc1RleHQ9YTthPW5ldyBHKHRoaXMuYS5jK1wiLHNhbnMtc2VyaWZcIixKKHRoaXMuYSkpO2E9TyhhKTt0aGlzLmguYS5zdHlsZS5jc3NUZXh0PWE7YT1uZXcgRyhcInNlcmlmXCIsSih0aGlzLmEpKTthPU8oYSk7dGhpcy5qLmEuc3R5bGUuY3NzVGV4dD1hO2E9bmV3IEcoXCJzYW5zLXNlcmlmXCIsSih0aGlzLmEpKTthPVxuTyhhKTt0aGlzLm0uYS5zdHlsZS5jc3NUZXh0PWE7Tih0aGlzLmcpO04odGhpcy5oKTtOKHRoaXMuaik7Tih0aGlzLm0pfXZhciBSPXtEOlwic2VyaWZcIixDOlwic2Fucy1zZXJpZlwifSxTPW51bGw7ZnVuY3Rpb24gVCgpe2lmKG51bGw9PT1TKXt2YXIgYT0vQXBwbGVXZWJLaXRcXC8oWzAtOV0rKSg/OlxcLihbMC05XSspKS8uZXhlYyh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7Uz0hIWEmJig1MzY+cGFyc2VJbnQoYVsxXSwxMCl8fDUzNj09PXBhcnNlSW50KGFbMV0sMTApJiYxMT49cGFyc2VJbnQoYVsyXSwxMCkpfXJldHVybiBTfVEucHJvdG90eXBlLnN0YXJ0PWZ1bmN0aW9uKCl7dGhpcy5mLnNlcmlmPXRoaXMuai5hLm9mZnNldFdpZHRoO3RoaXMuZltcInNhbnMtc2VyaWZcIl09dGhpcy5tLmEub2Zmc2V0V2lkdGg7dGhpcy5BPXEoKTtVKHRoaXMpfTtcbmZ1bmN0aW9uIGxhKGEsYixjKXtmb3IodmFyIGQgaW4gUilpZihSLmhhc093blByb3BlcnR5KGQpJiZiPT09YS5mW1JbZF1dJiZjPT09YS5mW1JbZF1dKXJldHVybiEwO3JldHVybiExfWZ1bmN0aW9uIFUoYSl7dmFyIGI9YS5nLmEub2Zmc2V0V2lkdGgsYz1hLmguYS5vZmZzZXRXaWR0aCxkOyhkPWI9PT1hLmYuc2VyaWYmJmM9PT1hLmZbXCJzYW5zLXNlcmlmXCJdKXx8KGQ9VCgpJiZsYShhLGIsYykpO2Q/cSgpLWEuQT49YS53P1QoKSYmbGEoYSxiLGMpJiYobnVsbD09PWEudXx8YS51Lmhhc093blByb3BlcnR5KGEuYS5jKSk/VihhLGEudik6VihhLGEuQik6bWEoYSk6VihhLGEudil9ZnVuY3Rpb24gbWEoYSl7c2V0VGltZW91dChwKGZ1bmN0aW9uKCl7VSh0aGlzKX0sYSksNTApfWZ1bmN0aW9uIFYoYSxiKXtzZXRUaW1lb3V0KHAoZnVuY3Rpb24oKXt2KHRoaXMuZy5hKTt2KHRoaXMuaC5hKTt2KHRoaXMuai5hKTt2KHRoaXMubS5hKTtiKHRoaXMuYSl9LGEpLDApfTtmdW5jdGlvbiBXKGEsYixjKXt0aGlzLmM9YTt0aGlzLmE9Yjt0aGlzLmY9MDt0aGlzLm09dGhpcy5qPSExO3RoaXMucz1jfXZhciBYPW51bGw7Vy5wcm90b3R5cGUuZz1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmE7Yi5nJiZ3KGIuZixbYi5hLmMoXCJ3ZlwiLGEuYyxKKGEpLnRvU3RyaW5nKCksXCJhY3RpdmVcIildLFtiLmEuYyhcIndmXCIsYS5jLEooYSkudG9TdHJpbmcoKSxcImxvYWRpbmdcIiksYi5hLmMoXCJ3ZlwiLGEuYyxKKGEpLnRvU3RyaW5nKCksXCJpbmFjdGl2ZVwiKV0pO0soYixcImZvbnRhY3RpdmVcIixhKTt0aGlzLm09ITA7bmEodGhpcyl9O1xuVy5wcm90b3R5cGUuaD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmE7aWYoYi5nKXt2YXIgYz15KGIuZixiLmEuYyhcIndmXCIsYS5jLEooYSkudG9TdHJpbmcoKSxcImFjdGl2ZVwiKSksZD1bXSxlPVtiLmEuYyhcIndmXCIsYS5jLEooYSkudG9TdHJpbmcoKSxcImxvYWRpbmdcIildO2N8fGQucHVzaChiLmEuYyhcIndmXCIsYS5jLEooYSkudG9TdHJpbmcoKSxcImluYWN0aXZlXCIpKTt3KGIuZixkLGUpfUsoYixcImZvbnRpbmFjdGl2ZVwiLGEpO25hKHRoaXMpfTtmdW5jdGlvbiBuYShhKXswPT0tLWEuZiYmYS5qJiYoYS5tPyhhPWEuYSxhLmcmJncoYS5mLFthLmEuYyhcIndmXCIsXCJhY3RpdmVcIildLFthLmEuYyhcIndmXCIsXCJsb2FkaW5nXCIpLGEuYS5jKFwid2ZcIixcImluYWN0aXZlXCIpXSksSyhhLFwiYWN0aXZlXCIpKTpMKGEuYSkpfTtmdW5jdGlvbiBvYShhKXt0aGlzLmo9YTt0aGlzLmE9bmV3IGphO3RoaXMuaD0wO3RoaXMuZj10aGlzLmc9ITB9b2EucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYSl7dGhpcy5jPW5ldyBjYSh0aGlzLmosYS5jb250ZXh0fHx0aGlzLmopO3RoaXMuZz0hMSE9PWEuZXZlbnRzO3RoaXMuZj0hMSE9PWEuY2xhc3NlcztwYSh0aGlzLG5ldyBoYSh0aGlzLmMsYSksYSl9O1xuZnVuY3Rpb24gcWEoYSxiLGMsZCxlKXt2YXIgZj0wPT0tLWEuaDsoYS5mfHxhLmcpJiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dmFyIGE9ZXx8bnVsbCxtPWR8fG51bGx8fHt9O2lmKDA9PT1jLmxlbmd0aCYmZilMKGIuYSk7ZWxzZXtiLmYrPWMubGVuZ3RoO2YmJihiLmo9Zik7dmFyIGgsbD1bXTtmb3IoaD0wO2g8Yy5sZW5ndGg7aCsrKXt2YXIgaz1jW2hdLG49bVtrLmNdLHI9Yi5hLHg9aztyLmcmJncoci5mLFtyLmEuYyhcIndmXCIseC5jLEooeCkudG9TdHJpbmcoKSxcImxvYWRpbmdcIildKTtLKHIsXCJmb250bG9hZGluZ1wiLHgpO3I9bnVsbDtpZihudWxsPT09WClpZih3aW5kb3cuRm9udEZhY2Upe3ZhciB4PS9HZWNrby4qRmlyZWZveFxcLyhcXGQrKS8uZXhlYyh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkseGE9L09TIFguKlZlcnNpb25cXC8xMFxcLi4qU2FmYXJpLy5leGVjKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSYmL0FwcGxlLy5leGVjKHdpbmRvdy5uYXZpZ2F0b3IudmVuZG9yKTtcblg9eD80MjxwYXJzZUludCh4WzFdLDEwKTp4YT8hMTohMH1lbHNlIFg9ITE7WD9yPW5ldyBQKHAoYi5nLGIpLHAoYi5oLGIpLGIuYyxrLGIucyxuKTpyPW5ldyBRKHAoYi5nLGIpLHAoYi5oLGIpLGIuYyxrLGIucyxhLG4pO2wucHVzaChyKX1mb3IoaD0wO2g8bC5sZW5ndGg7aCsrKWxbaF0uc3RhcnQoKX19LDApfWZ1bmN0aW9uIHBhKGEsYixjKXt2YXIgZD1bXSxlPWMudGltZW91dDtpYShiKTt2YXIgZD1rYShhLmEsYyxhLmMpLGY9bmV3IFcoYS5jLGIsZSk7YS5oPWQubGVuZ3RoO2I9MDtmb3IoYz1kLmxlbmd0aDtiPGM7YisrKWRbYl0ubG9hZChmdW5jdGlvbihiLGQsYyl7cWEoYSxmLGIsZCxjKX0pfTtmdW5jdGlvbiByYShhLGIpe3RoaXMuYz1hO3RoaXMuYT1ifVxucmEucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYigpe2lmKGZbXCJfX210aV9mbnRMc3RcIitkXSl7dmFyIGM9ZltcIl9fbXRpX2ZudExzdFwiK2RdKCksZT1bXSxoO2lmKGMpZm9yKHZhciBsPTA7bDxjLmxlbmd0aDtsKyspe3ZhciBrPWNbbF0uZm9udGZhbWlseTt2b2lkIDAhPWNbbF0uZm9udFN0eWxlJiZ2b2lkIDAhPWNbbF0uZm9udFdlaWdodD8oaD1jW2xdLmZvbnRTdHlsZStjW2xdLmZvbnRXZWlnaHQsZS5wdXNoKG5ldyBHKGssaCkpKTplLnB1c2gobmV3IEcoaykpfWEoZSl9ZWxzZSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YigpfSw1MCl9dmFyIGM9dGhpcyxkPWMuYS5wcm9qZWN0SWQsZT1jLmEudmVyc2lvbjtpZihkKXt2YXIgZj1jLmMubztBKHRoaXMuYywoYy5hLmFwaXx8XCJodHRwczovL2Zhc3QuZm9udHMubmV0L2pzYXBpXCIpK1wiL1wiK2QrXCIuanNcIisoZT9cIj92PVwiK2U6XCJcIiksZnVuY3Rpb24oZSl7ZT9hKFtdKTooZltcIl9fTW9ub3R5cGVDb25maWd1cmF0aW9uX19cIitcbmRdPWZ1bmN0aW9uKCl7cmV0dXJuIGMuYX0sYigpKX0pLmlkPVwiX19Nb25vdHlwZUFQSVNjcmlwdF9fXCIrZH1lbHNlIGEoW10pfTtmdW5jdGlvbiBzYShhLGIpe3RoaXMuYz1hO3RoaXMuYT1ifXNhLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKGEpe3ZhciBiLGMsZD10aGlzLmEudXJsc3x8W10sZT10aGlzLmEuZmFtaWxpZXN8fFtdLGY9dGhpcy5hLnRlc3RTdHJpbmdzfHx7fSxnPW5ldyBCO2I9MDtmb3IoYz1kLmxlbmd0aDtiPGM7YisrKXoodGhpcy5jLGRbYl0sQyhnKSk7dmFyIG09W107Yj0wO2ZvcihjPWUubGVuZ3RoO2I8YztiKyspaWYoZD1lW2JdLnNwbGl0KFwiOlwiKSxkWzFdKWZvcih2YXIgaD1kWzFdLnNwbGl0KFwiLFwiKSxsPTA7bDxoLmxlbmd0aDtsKz0xKW0ucHVzaChuZXcgRyhkWzBdLGhbbF0pKTtlbHNlIG0ucHVzaChuZXcgRyhkWzBdKSk7RShnLGZ1bmN0aW9uKCl7YShtLGYpfSl9O2Z1bmN0aW9uIHRhKGEsYil7YT90aGlzLmM9YTp0aGlzLmM9dWE7dGhpcy5hPVtdO3RoaXMuZj1bXTt0aGlzLmc9Ynx8XCJcIn12YXIgdWE9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzc1wiO2Z1bmN0aW9uIHZhKGEsYil7Zm9yKHZhciBjPWIubGVuZ3RoLGQ9MDtkPGM7ZCsrKXt2YXIgZT1iW2RdLnNwbGl0KFwiOlwiKTszPT1lLmxlbmd0aCYmYS5mLnB1c2goZS5wb3AoKSk7dmFyIGY9XCJcIjsyPT1lLmxlbmd0aCYmXCJcIiE9ZVsxXSYmKGY9XCI6XCIpO2EuYS5wdXNoKGUuam9pbihmKSl9fVxuZnVuY3Rpb24gd2EoYSl7aWYoMD09YS5hLmxlbmd0aCl0aHJvdyBFcnJvcihcIk5vIGZvbnRzIHRvIGxvYWQhXCIpO2lmKC0xIT1hLmMuaW5kZXhPZihcImtpdD1cIikpcmV0dXJuIGEuYztmb3IodmFyIGI9YS5hLmxlbmd0aCxjPVtdLGQ9MDtkPGI7ZCsrKWMucHVzaChhLmFbZF0ucmVwbGFjZSgvIC9nLFwiK1wiKSk7Yj1hLmMrXCI/ZmFtaWx5PVwiK2Muam9pbihcIiU3Q1wiKTswPGEuZi5sZW5ndGgmJihiKz1cIiZzdWJzZXQ9XCIrYS5mLmpvaW4oXCIsXCIpKTswPGEuZy5sZW5ndGgmJihiKz1cIiZ0ZXh0PVwiK2VuY29kZVVSSUNvbXBvbmVudChhLmcpKTtyZXR1cm4gYn07ZnVuY3Rpb24geWEoYSl7dGhpcy5mPWE7dGhpcy5hPVtdO3RoaXMuYz17fX1cbnZhciB6YT17bGF0aW46XCJCRVNic3d5XCIsXCJsYXRpbi1leHRcIjpcIlxcdTAwZTdcXHUwMGY2XFx1MDBmY1xcdTAxMWZcXHUwMTVmXCIsY3lyaWxsaWM6XCJcXHUwNDM5XFx1MDQ0ZlxcdTA0MTZcIixncmVlazpcIlxcdTAzYjFcXHUwM2IyXFx1MDNhM1wiLGtobWVyOlwiXFx1MTc4MFxcdTE3ODFcXHUxNzgyXCIsSGFudW1hbjpcIlxcdTE3ODBcXHUxNzgxXFx1MTc4MlwifSxBYT17dGhpbjpcIjFcIixleHRyYWxpZ2h0OlwiMlwiLFwiZXh0cmEtbGlnaHRcIjpcIjJcIix1bHRyYWxpZ2h0OlwiMlwiLFwidWx0cmEtbGlnaHRcIjpcIjJcIixsaWdodDpcIjNcIixyZWd1bGFyOlwiNFwiLGJvb2s6XCI0XCIsbWVkaXVtOlwiNVwiLFwic2VtaS1ib2xkXCI6XCI2XCIsc2VtaWJvbGQ6XCI2XCIsXCJkZW1pLWJvbGRcIjpcIjZcIixkZW1pYm9sZDpcIjZcIixib2xkOlwiN1wiLFwiZXh0cmEtYm9sZFwiOlwiOFwiLGV4dHJhYm9sZDpcIjhcIixcInVsdHJhLWJvbGRcIjpcIjhcIix1bHRyYWJvbGQ6XCI4XCIsYmxhY2s6XCI5XCIsaGVhdnk6XCI5XCIsbDpcIjNcIixyOlwiNFwiLGI6XCI3XCJ9LEJhPXtpOlwiaVwiLGl0YWxpYzpcImlcIixuOlwiblwiLG5vcm1hbDpcIm5cIn0sXG5DYT0vXih0aGlufCg/Oig/OmV4dHJhfHVsdHJhKS0/KT9saWdodHxyZWd1bGFyfGJvb2t8bWVkaXVtfCg/Oig/OnNlbWl8ZGVtaXxleHRyYXx1bHRyYSktPyk/Ym9sZHxibGFja3xoZWF2eXxsfHJ8YnxbMS05XTAwKT8obnxpfG5vcm1hbHxpdGFsaWMpPyQvO1xuZnVuY3Rpb24gRGEoYSl7Zm9yKHZhciBiPWEuZi5sZW5ndGgsYz0wO2M8YjtjKyspe3ZhciBkPWEuZltjXS5zcGxpdChcIjpcIiksZT1kWzBdLnJlcGxhY2UoL1xcKy9nLFwiIFwiKSxmPVtcIm40XCJdO2lmKDI8PWQubGVuZ3RoKXt2YXIgZzt2YXIgbT1kWzFdO2c9W107aWYobSlmb3IodmFyIG09bS5zcGxpdChcIixcIiksaD1tLmxlbmd0aCxsPTA7bDxoO2wrKyl7dmFyIGs7az1tW2xdO2lmKGsubWF0Y2goL15bXFx3LV0rJC8pKXt2YXIgbj1DYS5leGVjKGsudG9Mb3dlckNhc2UoKSk7aWYobnVsbD09bilrPVwiXCI7ZWxzZXtrPW5bMl07az1udWxsPT1rfHxcIlwiPT1rP1wiblwiOkJhW2tdO249blsxXTtpZihudWxsPT1ufHxcIlwiPT1uKW49XCI0XCI7ZWxzZSB2YXIgcj1BYVtuXSxuPXI/cjppc05hTihuKT9cIjRcIjpuLnN1YnN0cigwLDEpO2s9W2ssbl0uam9pbihcIlwiKX19ZWxzZSBrPVwiXCI7ayYmZy5wdXNoKGspfTA8Zy5sZW5ndGgmJihmPWcpOzM9PWQubGVuZ3RoJiYoZD1kWzJdLGc9W10sZD1kP2Quc3BsaXQoXCIsXCIpOlxuZywwPGQubGVuZ3RoJiYoZD16YVtkWzBdXSkmJihhLmNbZV09ZCkpfWEuY1tlXXx8KGQ9emFbZV0pJiYoYS5jW2VdPWQpO2ZvcihkPTA7ZDxmLmxlbmd0aDtkKz0xKWEuYS5wdXNoKG5ldyBHKGUsZltkXSkpfX07ZnVuY3Rpb24gRWEoYSxiKXt0aGlzLmM9YTt0aGlzLmE9Yn12YXIgRmE9e0FyaW1vOiEwLENvdXNpbmU6ITAsVGlub3M6ITB9O0VhLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKGEpe3ZhciBiPW5ldyBCLGM9dGhpcy5jLGQ9bmV3IHRhKHRoaXMuYS5hcGksdGhpcy5hLnRleHQpLGU9dGhpcy5hLmZhbWlsaWVzO3ZhKGQsZSk7dmFyIGY9bmV3IHlhKGUpO0RhKGYpO3ooYyx3YShkKSxDKGIpKTtFKGIsZnVuY3Rpb24oKXthKGYuYSxmLmMsRmEpfSl9O2Z1bmN0aW9uIEdhKGEsYil7dGhpcy5jPWE7dGhpcy5hPWJ9R2EucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5hLmlkLGM9dGhpcy5jLm87Yj9BKHRoaXMuYywodGhpcy5hLmFwaXx8XCJodHRwczovL3VzZS50eXBla2l0Lm5ldFwiKStcIi9cIitiK1wiLmpzXCIsZnVuY3Rpb24oYil7aWYoYilhKFtdKTtlbHNlIGlmKGMuVHlwZWtpdCYmYy5UeXBla2l0LmNvbmZpZyYmYy5UeXBla2l0LmNvbmZpZy5mbil7Yj1jLlR5cGVraXQuY29uZmlnLmZuO2Zvcih2YXIgZT1bXSxmPTA7ZjxiLmxlbmd0aDtmKz0yKWZvcih2YXIgZz1iW2ZdLG09YltmKzFdLGg9MDtoPG0ubGVuZ3RoO2grKyllLnB1c2gobmV3IEcoZyxtW2hdKSk7dHJ5e2MuVHlwZWtpdC5sb2FkKHtldmVudHM6ITEsY2xhc3NlczohMSxhc3luYzohMH0pfWNhdGNoKGwpe31hKGUpfX0sMkUzKTphKFtdKX07ZnVuY3Rpb24gSGEoYSxiKXt0aGlzLmM9YTt0aGlzLmY9Yjt0aGlzLmE9W119SGEucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5mLmlkLGM9dGhpcy5jLm8sZD10aGlzO2I/KGMuX193ZWJmb250Zm9udGRlY2ttb2R1bGVfX3x8KGMuX193ZWJmb250Zm9udGRlY2ttb2R1bGVfXz17fSksYy5fX3dlYmZvbnRmb250ZGVja21vZHVsZV9fW2JdPWZ1bmN0aW9uKGIsYyl7Zm9yKHZhciBnPTAsbT1jLmZvbnRzLmxlbmd0aDtnPG07KytnKXt2YXIgaD1jLmZvbnRzW2ddO2QuYS5wdXNoKG5ldyBHKGgubmFtZSxnYShcImZvbnQtd2VpZ2h0OlwiK2gud2VpZ2h0K1wiO2ZvbnQtc3R5bGU6XCIraC5zdHlsZSkpKX1hKGQuYSl9LEEodGhpcy5jLCh0aGlzLmYuYXBpfHxcImh0dHBzOi8vZi5mb250ZGVjay5jb20vcy9jc3MvanMvXCIpK2VhKHRoaXMuYykrXCIvXCIrYitcIi5qc1wiLGZ1bmN0aW9uKGIpe2ImJmEoW10pfSkpOmEoW10pfTt2YXIgWT1uZXcgb2Eod2luZG93KTtZLmEuYy5jdXN0b209ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbmV3IHNhKGIsYSl9O1kuYS5jLmZvbnRkZWNrPWZ1bmN0aW9uKGEsYil7cmV0dXJuIG5ldyBIYShiLGEpfTtZLmEuYy5tb25vdHlwZT1mdW5jdGlvbihhLGIpe3JldHVybiBuZXcgcmEoYixhKX07WS5hLmMudHlwZWtpdD1mdW5jdGlvbihhLGIpe3JldHVybiBuZXcgR2EoYixhKX07WS5hLmMuZ29vZ2xlPWZ1bmN0aW9uKGEsYil7cmV0dXJuIG5ldyBFYShiLGEpfTt2YXIgWj17bG9hZDpwKFkubG9hZCxZKX07XCJmdW5jdGlvblwiPT09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gWn0pOlwidW5kZWZpbmVkXCIhPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1aOih3aW5kb3cuV2ViRm9udD1aLHdpbmRvdy5XZWJGb250Q29uZmlnJiZZLmxvYWQod2luZG93LldlYkZvbnRDb25maWcpKTt9KCkpO1xuIl0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpY205M2MyVnlMWEJoWTJzdlgzQnlaV3gxWkdVdWFuTWlMQ0pmWVhOelpYUnpMMnB6TDJGd2NDNXFjeUlzSWw5aGMzTmxkSE12YW5NdmJXOWtkV3hsY3k5bWIzSnRMbXB6SWl3aVgyRnpjMlYwY3k5cWN5OXRiMlIxYkdWekwyMWxiblV1YW5NaUxDSmZZWE56WlhSekwycHpMMjF2WkhWc1pYTXZjR0ZuWlZSeVlXNXphWFJwYjI1ekxtcHpJaXdpWDJGemMyVjBjeTlxY3k5dGIyUjFiR1Z6TDNCaGNtRnNiR0Y0TG1weklpd2lYMkZ6YzJWMGN5OXFjeTl0YjJSMWJHVnpMM05qY205c2JGSmxkbVZoYkM1cWN5SXNJbDloYzNObGRITXZhbk12Ylc5a2RXeGxjeTl6Ylc5dmRHaFRZM0p2Ykd4cGJtY3Vhbk1pTENKZllYTnpaWFJ6TDJwekwyMXZaSFZzWlhNdmMyOWphV0ZzTG1weklpd2lYMkZ6YzJWMGN5OXFjeTl0YjJSMWJHVnpMM2RsWW1admJuUXRiRzloWkdWeUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwySmhjbUpoTG1wekwyUnBjM1F2WW1GeVltRXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZiWFZzZEdsd2JHVXVhbk12YlhWc2RHbHdiR1V1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12YzJ0eWIyeHNjaTlrYVhOMEwzTnJjbTlzYkhJdWJXbHVMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMM2RsWW1admJuUnNiMkZrWlhJdmQyVmlabTl1ZEd4dllXUmxjaTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFUczdPMEZEUlVFN096czdRVUZEUVRzN096dEJRVU5CT3pzN08wRkJRMEU3T3pzN1FVRkRRVHM3T3pzN08wRkJUa0VzVDBGQlR5eFBRVUZRTEVkQlFXbENMRTlCUVdwQ096czdPenRCUTBGQkxFbEJRVTBzVTBGQlV5eEZRVUZGTEdOQlFVWXNRMEZCWmpzN1FVRkZRU3hUUVVGVExHRkJRVlFzUTBGQmRVSXNUMEZCZGtJc1JVRkJaME03UVVGRE5VSXNVVUZCVFN4VFFVRlRMRVZCUVVVc1QwRkJSaXhGUVVGWExGRkJRVmdzUTBGQmIwSXNUMEZCY0VJc1EwRkJaanM3UVVGRlFTeFJRVUZKTEVWQlFVVXNUMEZCUml4RlFVRlhMRWRCUVZnc1IwRkJhVUlzVFVGQmFrSXNSMEZCTUVJc1EwRkJPVUlzUlVGQmFVTTdRVUZETjBJc1pVRkJUeXhSUVVGUUxFTkJRV2RDTEZkQlFXaENPMEZCUTBnc1MwRkdSQ3hOUVVWUE8wRkJRMGdzWlVGQlR5eFhRVUZRTEVOQlFXMUNMRmRCUVc1Q08wRkJRMGc3UVVGRFNqczdRVUZGUkR0QlFVTkJMRTlCUVU4c1NVRkJVQ3hEUVVGWkxGbEJRVmM3UVVGRGJrSXNhMEpCUVdNc1NVRkJaRHRCUVVOSUxFTkJSa1E3TzBGQlNVRTdRVUZEUVN4UFFVRlBMRVZCUVZBc1EwRkJWU3hqUVVGV0xFVkJRVEJDTEZsQlFWYzdRVUZEYWtNc2EwSkJRV01zU1VGQlpEdEJRVU5JTEVOQlJrUTdPenM3TzBGRGJFSkJPenM3T3pzN1FVRkZRU3hKUVVGTkxGRkJRVkVzUlVGQlJTeE5RVUZHTEVOQlFXUTdRVUZCUVN4SlFVTkJMR0ZCUVdFc1JVRkJSU3hyUWtGQlJpeERRVVJpTzBGQlFVRXNTVUZGUVN4UlFVRlJMRVZCUVVVc1lVRkJSaXhEUVVaU08wRkJRVUVzU1VGSFFTeFpRVUZaTEVWQlFVVXNhVUpCUVVZc1EwRklXanRCUVVGQkxFbEJTVUVzV1VGQldTeEZRVUZGTEdGQlFVWXNRMEZLV2p0QlFVRkJMRWxCUzBFc1dVRkJXU3hGUVVGRkxHRkJRVVlzUTBGTVdqdEJRVUZCTEVsQlRVRXNhMEpCUVd0Q0xHZENRVTVzUWp0QlFVRkJMRWxCVDBFc1kwRkJZeXhYUVZCa096dEJRVk5CTzBGQlEwRXNWMEZCVnl4TFFVRllMRU5CUVdsQ0xGbEJRVmM3UVVGRGVFSXNVVUZCU1N4TlFVRk5MRkZCUVU0c1EwRkJaU3hsUVVGbUxFTkJRVW9zUlVGQmNVTTdRVUZEYWtNc1kwRkJUU3hYUVVGT0xFTkJRV3RDTEdWQlFXeENPMEZCUTBnc1MwRkdSQ3hOUVVWUE8wRkJRMGdzWTBGQlRTeFJRVUZPTEVOQlFXVXNaVUZCWmp0QlFVTklPMEZCUTBvc1EwRk9SRHM3UVVGUlFUdEJRVU5CTEZWQlFWVXNTMEZCVml4RFFVRm5RaXhWUVVGVExFTkJRVlFzUlVGQldUdEJRVU40UWl4VlFVRk5MRmRCUVU0c1EwRkJhMElzWlVGQmJFSTdRVUZEUVN4alFVRlZMRWxCUVZZc1EwRkJaU3hUUVVGbUxFVkJRVEJDTEV0QlFURkNPMEZCUTBFc1kwRkJWU3hYUVVGV0xFTkJRWE5DTEZkQlFYUkNPMEZCUTBFc1RVRkJSU3hKUVVGR0xFVkJRVkVzVVVGQlVpeERRVUZwUWl4WFFVRnFRanRCUVVOSUxFTkJURVE3TzBGQlQwRTdRVUZEUVN4TlFVRk5MRXRCUVU0c1EwRkJXU3haUVVGWE8wRkJRMjVDTEZGQlFVa3NUVUZCVFN4UlFVRk9MRU5CUVdVc1pVRkJaaXhEUVVGS0xFVkJRWEZETzBGQlEycERMR05CUVUwc1YwRkJUaXhEUVVGclFpeGxRVUZzUWp0QlFVTkJMR3RDUVVGVkxFbEJRVllzUTBGQlpTeFRRVUZtTEVWQlFUQkNMRXRCUVRGQ08wRkJRMGdzUzBGSVJDeE5RVWRQTzBGQlEwZ3NZMEZCVFN4UlFVRk9MRU5CUVdVc1pVRkJaanRCUVVOSU8wRkJRMG9zUTBGUVJEczdRVUZUUVN4VlFVRlZMRXRCUVZZc1EwRkJaMElzV1VGQlZ6dEJRVU4yUWl4UlFVRkpMRTlCUVU4c1JVRkJSU3hKUVVGR0xFVkJRVkVzU1VGQlVpeERRVUZoTEU5QlFXSXNRMEZCV0R0QlFVTkJMR05CUVZVc1NVRkJWaXhEUVVGbExGbEJRV1lzUlVGQk5rSXNTVUZCTjBJN1FVRkRRU3hqUVVGVkxGZEJRVllzUTBGQmMwSXNXVUZCZEVJN1FVRkRTQ3hEUVVwRU96dEJRVkZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN096czdPMEZETjBaQk96czdPMEZCUTBFN096czdRVUZEUVRzN096dEJRVU5CT3pzN096czdRVUZGUVN4SlFVRkpMR2xDUVVGcFFpeG5Ra0ZCVFN4alFVRk9MRU5CUVhGQ0xFMUJRWEpDTEVOQlFUUkNPMEZCUXk5RExGTkJRVThzYVVKQlFWYzdRVUZEYUVJc1dVRkRSeXhIUVVSSUxFTkJRMDhzUTBGQlF5eExRVUZMTEcxQ1FVRk9MRVZCUVRKQ0xFdEJRVXNzVDBGQlRDeEZRVUV6UWl4RFFVUlFMRVZCUlVjc1NVRkdTQ3hEUVVWUkxFdEJRVXNzVFVGQlRDeERRVUZaTEVsQlFWb3NRMEZCYVVJc1NVRkJha0lzUTBGR1VqdEJRVWRFTEVkQlREaERPenRCUVU4dlF5eFhRVUZUTEcxQ1FVRlhPMEZCUTJ4Q0xGZEJRVThzUlVGQlJTeExRVUZMTEZsQlFWQXNSVUZCY1VJc1QwRkJja0lzUTBGQk5rSXNSVUZCUlN4VFFVRlRMRU5CUVZnc1JVRkJOMElzUlVGQk5rTXNUMEZCTjBNc1JVRkJVRHRCUVVORUxFZEJWRGhET3p0QlFWY3ZReXhWUVVGUkxHdENRVUZYT3p0QlFVVnFRaXhSUVVGSkxIVkNRVUYxUWl4UFFVRXpRaXhGUVVGdlF6dEJRVU5zUXl4alFVRlJMR2xDUVVGU0xFZEJRVFJDTEZGQlFUVkNPMEZCUTBRN08wRkJSVVFzVFVGQlJTeE5RVUZHTEVWQlFWVXNVMEZCVml4RFFVRnZRaXhEUVVGd1FpeEZRVTVwUWl4RFFVMVBPenRCUVVWNFFpeFJRVUZKTEZGQlFWRXNTVUZCV2p0QlFVTkJMRkZCUVVrc1RVRkJUU3hGUVVGRkxFdEJRVXNzV1VGQlVDeERRVUZXT3p0QlFVVkJMRTFCUVVVc1MwRkJTeXhaUVVGUUxFVkJRWEZDTEVsQlFYSkNPenRCUVVWQkxGRkJRVWtzUjBGQlNpeERRVUZSTzBGQlEwNHNhMEpCUVZrc1UwRkVUanRCUVVWT0xHVkJRVk03UVVGR1NDeExRVUZTT3p0QlFVdEJMRkZCUVVrc1QwRkJTaXhEUVVGWkxFVkJRVVVzVTBGQlV5eERRVUZZTEVWQlFWb3NSVUZCTkVJc1IwRkJOVUlzUlVGQmFVTXNXVUZCVnp0QlFVTXhReXhaUVVGTkxFbEJRVTQ3UVVGRFJDeExRVVpFTzBGQlNVUTdRVUZxUXpoRExFTkJRVFZDTEVOQlFYSkNPenRCUVc5RFFTeG5Ra0ZCVFN4VlFVRk9MRU5CUVdsQ0xFVkJRV3BDTEVOQlFXOUNMSEZDUVVGd1FpeEZRVUV5UXl4VlFVRlRMRk5CUVZRc1JVRkJiMEk3UVVGRE4wUTdRVUZEUVN4dFFrRkJZU3hOUVVGaU8wRkJRMEVzTkVKQlFXRXNUVUZCWWp0QlFVTkVMRU5CU2tRN08wRkJUVUVzWjBKQlFVMHNTVUZCVGl4RFFVRlhMR0ZCUVZnc1IwRkJNa0lzV1VGQlZ6dEJRVU53UXl4VFFVRlBMR05CUVZBN1FVRkRSQ3hEUVVaRU96dEJRVWxCTEdkQ1FVRk5MRkZCUVU0c1EwRkJaU3hKUVVGbU8wRkJRMEVzWjBKQlFVMHNTVUZCVGl4RFFVRlhMRXRCUVZnN096dEJRM0JFUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3pzN096czdPenM3TzBGRGNFSkJPenM3T3pzN1FVRkZRU3hUUVVGVExFMUJRVlFzUjBGQmEwSTdRVUZEWkN4TFFVRkRMRlZCUVZNc1EwRkJWQ3hGUVVGWk8wRkJRMVFzV1VGQlRTeEpRVUZKTEd0Q1FVRlJMRWxCUVZJc1EwRkJZVHRCUVVOdVFpeHZRa0ZCVVN4blFrRkJVeXhKUVVGVUxFVkJRV1U3UVVGRGJrSTdRVUZEUVN4M1FrRkJVU3hIUVVGU0xFTkJRVmtzUzBGQlN5eE5RVUZxUWp0QlFVTklPMEZCU210Q0xGTkJRV0lzUTBGQlZqdEJRVTFJTEV0QlVFUTdRVUZSU0RzN2EwSkJSV01zUlVGQlJTeGpRVUZHTEVVN096czdPenM3TzBGRFltWXNVMEZCVXl4TlFVRlVMRWRCUVd0Q08wRkJRMmhDTEUxQlFVMHNWVUZCVlN4RlFVRkZMRzFDUVVGR0xFTkJRV2hDTzBGQlEwRXNUVUZCVFN4TlFVRk5MRVZCUVVVc1UwRkJSaXhEUVVGYU8wRkJRMEVzVFVGQlRTeGhRVUZoTEVsQlFVa3NWMEZCU2l4RlFVRnVRanM3UVVGRlFTeFZRVUZSTEVWQlFWSXNRMEZCVnl4UFFVRllMRVZCUVc5Q0xGVkJRVk1zUzBGQlZDeEZRVUZuUWp0QlFVTnNReXhSUVVGTkxFOUJRVThzUlVGQlJTeEpRVUZHTEVWQlFWRXNTVUZCVWl4RFFVRmhMRTFCUVdJc1EwRkJZanM3UVVGRlFTeFJRVUZKTEV0QlFVc3NTVUZCVEN4TFFVRmpMRVZCUVd4Q0xFVkJRWE5DTzBGQlEzQkNMRlZCUVVrc1EwRkJReXhMUVVGTExFMUJRVXdzUTBGQldTeERRVUZhTEVOQlFVUXNTVUZCYlVJc1IwRkJka0lzUlVGQk5FSTdRVUZETVVJc1kwRkJUU3hqUVVGT08wRkJRMFE3TzBGQlJVUXNWVUZCVFN4UFFVRlBMRXRCUVVzc1NVRkJiRUk3UVVGRFFTeFJRVUZGTEZsQlFVWXNSVUZCWjBJc1QwRkJhRUlzUTBGQmQwSTdRVUZEZEVJc2JVSkJRVmNzUlVGQlJTeEpRVUZHTEVWQlFWRXNUVUZCVWl4SFFVRnBRaXhIUVVGcVFpeEhRVUYxUWp0QlFVUmFMRTlCUVhoQ0xFVkJSVWNzUjBGR1NDeEZRVVZSTEZsQlFWVTdRVUZEYUVJc1pVRkJUeXhSUVVGUUxFTkJRV2RDTEVsQlFXaENMRWRCUVhWQ0xFbEJRWFpDTzBGQlEwUXNUMEZLUkR0QlFVdEVPMEZCUTBZc1IwRm1SRHM3UVVGcFFrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMFE3TzJ0Q1FVVmpMRVZCUVVVc1kwRkJSaXhGT3pzN096czdPenRCUXpsQ1ppeFRRVUZUTEUxQlFWUXNSMEZCYTBJN1FVRkRaQ3hSUVVGTkxHZENRVUZuUWl4RlFVRkZMRzFDUVVGR0xFTkJRWFJDT3p0QlFVVkJMR3RDUVVGakxFVkJRV1FzUTBGQmFVSXNUMEZCYWtJc1JVRkJNRUlzV1VGQlZ6dEJRVU5xUXl4blFrRkJVU3hIUVVGU0xFTkJRVmtzVTBGQldqdEJRVU5CTEdWQlFVOHNTVUZCVUN4RFFVRlpMRXRCUVVzc1NVRkJha0lzUlVGQmRVSXNVVUZCZGtJc1JVRkJhVU1zZFVKQlFXcERPMEZCUTBFc1pVRkJUeXhMUVVGUU8wRkJRMGdzUzBGS1JEdEJRVXRJT3p0clFrRkZZeXhGUVVGRkxHTkJRVVlzUlRzN096czdRVU5XWmpzN096czdPMEZCUlVFc2QwSkJRVkVzU1VGQlVpeERRVUZoTzBGQlExUXNXVUZCVVR0QlFVTktMR3RDUVVGVkxFTkJRVU1zZDBKQlFVUTdRVUZFVGp0QlFVUkRMRU5CUVdJN096dEJRMFpCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU0zY1VSQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEZGtkQk8wRkJRMEU3TzBGRFJFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW9ablZ1WTNScGIyNGdaU2gwTEc0c2NpbDdablZ1WTNScGIyNGdjeWh2TEhVcGUybG1LQ0Z1VzI5ZEtYdHBaaWdoZEZ0dlhTbDdkbUZ5SUdFOWRIbHdaVzltSUhKbGNYVnBjbVU5UFZ3aVpuVnVZM1JwYjI1Y0lpWW1jbVZ4ZFdseVpUdHBaaWdoZFNZbVlTbHlaWFIxY200Z1lTaHZMQ0V3S1R0cFppaHBLWEpsZEhWeWJpQnBLRzhzSVRBcE8zWmhjaUJtUFc1bGR5QkZjbkp2Y2loY0lrTmhibTV2ZENCbWFXNWtJRzF2WkhWc1pTQW5YQ0lyYnl0Y0lpZGNJaWs3ZEdoeWIzY2daaTVqYjJSbFBWd2lUVTlFVlV4RlgwNVBWRjlHVDFWT1JGd2lMR1o5ZG1GeUlHdzlibHR2WFQxN1pYaHdiM0owY3pwN2ZYMDdkRnR2WFZzd1hTNWpZV3hzS0d3dVpYaHdiM0owY3l4bWRXNWpkR2x2YmlobEtYdDJZWElnYmoxMFcyOWRXekZkVzJWZE8zSmxkSFZ5YmlCektHNC9ianBsS1gwc2JDeHNMbVY0Y0c5eWRITXNaU3gwTEc0c2NpbDljbVYwZFhKdUlHNWJiMTB1Wlhod2IzSjBjMzEyWVhJZ2FUMTBlWEJsYjJZZ2NtVnhkV2x5WlQwOVhDSm1kVzVqZEdsdmJsd2lKaVp5WlhGMWFYSmxPMlp2Y2loMllYSWdiejB3TzI4OGNpNXNaVzVuZEdnN2J5c3JLWE1vY2x0dlhTazdjbVYwZFhKdUlITjlLU0lzSW5kcGJtUnZkeTV5WlhGMWFYSmxJRDBnY21WeGRXbHlaVnh1WEc1cGJYQnZjblFnYldWdWRTQm1jbTl0SUNjdUwyMXZaSFZzWlhNdmJXVnVkU2RjYm1sdGNHOXlkQ0JtYjNKdElHWnliMjBnSnk0dmJXOWtkV3hsY3k5bWIzSnRKMXh1YVcxd2IzSjBJSEJoWjJWVWNtRnVjMmwwYVc5dWN5Qm1jbTl0SUNjdUwyMXZaSFZzWlhNdmNHRm5aVlJ5WVc1emFYUnBiMjV6SjF4dWFXMXdiM0owSUhkbFltWnZiblJNYjJGa1pYSWdabkp2YlNBbkxpOXRiMlIxYkdWekwzZGxZbVp2Ym5RdGJHOWhaR1Z5SjF4dWFXMXdiM0owSUhCaGNtRnNiR0Y0SUdaeWIyMGdKeTR2Ylc5a2RXeGxjeTl3WVhKaGJHeGhlQ2NpTENKamIyNXpkQ0FrYVc1d2RYUWdQU0FrS0NjdVptOXliVjlmYVc1d2RYUW5LVnh1WEc1bWRXNWpkR2x2YmlCamFHVmphMFp2Y2tsdWNIVjBLR1ZzWlcxbGJuUXBJSHRjYmlBZ0lDQmpiMjV6ZENBa2JHRmlaV3dnUFNBa0tHVnNaVzFsYm5RcExuTnBZbXhwYm1kektDZHNZV0psYkNjcFhHNWNiaUFnSUNCcFppQW9KQ2hsYkdWdFpXNTBLUzUyWVd3b0tTNXNaVzVuZEdnZ1BpQXdLU0I3WEc0Z0lDQWdJQ0FnSUNSc1lXSmxiQzVoWkdSRGJHRnpjeWduYUdGekxYWmhiSFZsSnlsY2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FrYkdGaVpXd3VjbVZ0YjNabFEyeGhjM01vSjJoaGN5MTJZV3gxWlNjcFhHNGdJQ0FnZlZ4dWZWeHVJQ0JjYmk4dklGUm9aU0JzYVc1bGN5QmlaV3h2ZHlCaGNtVWdaWGhsWTNWMFpXUWdiMjRnY0dGblpTQnNiMkZrWEc0a2FXNXdkWFF1WldGamFDaG1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQmphR1ZqYTBadmNrbHVjSFYwS0hSb2FYTXBYRzU5S1Z4dVhHNHZMeUJVYUdVZ2JHbHVaWE1nWW1Wc2IzY2dLR2x1YzJsa1pTa2dZWEpsSUdWNFpXTjFkR1ZrSUc5dUlHTm9ZVzVuWlNBbUlHdGxlWFZ3WEc0a2FXNXdkWFF1YjI0b0oyTm9ZVzVuWlNCclpYbDFjQ2NzSUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUdOb1pXTnJSbTl5U1c1d2RYUW9kR2hwY3lsY2JuMHBJaXdpYVcxd2IzSjBJRzExYkhScGNHeGxTbk1nWm5KdmJTQW5iWFZzZEdsd2JHVXVhbk1uWEc1Y2JtTnZibk4wSUNSaWIyUjVJRDBnSkNnblltOWtlU2NwTEZ4dUpHaGhiV0oxY21kbGNpQTlJQ1FvSnk1dFpXNTFYMTlvWVcxaWRYSm5aWEluS1N4Y2JpUnRZWE5ySUQwZ0pDZ25MbTFsYm5WZlgyMWhjMnNuS1N4Y2JpUmphR1ZqYTJKdmVDQTlJQ1FvSnk1dFpXNTFYMTlqYUdWamEySnZlQ2NwTEZ4dUpHMWxiblZNYVc1cklEMGdKQ2duTG0xbGJuVmZYMnhwYm1zbktTeGNiaVJ0Wlc1MVRHbHpkQ0E5SUNRb0p5NXRaVzUxWDE5c2FYTjBKeWtzWEc1aFkzUnBkbVZOWlc1MVEyeGhjM01nUFNBbmJXVnVkUzFwY3kxaFkzUnBkbVVuTEZ4dVlXTjBhWFpsUTJ4aGMzTWdQU0FuYVhNdFlXTjBhWFpsSjF4dVhHNHZMeUJJWVcxaWRYSm5aWElnWTJ4cFkyc2daWFpsYm5SY2JpUm9ZVzFpZFhKblpYSXVZMnhwWTJzb1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ2FXWWdLQ1JpYjJSNUxtaGhjME5zWVhOektHRmpkR2wyWlUxbGJuVkRiR0Z6Y3lrcElIdGNiaUFnSUNBZ0lDQWdKR0p2WkhrdWNtVnRiM1psUTJ4aGMzTW9ZV04wYVhabFRXVnVkVU5zWVhOektWeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNSaWIyUjVMbUZrWkVOc1lYTnpLR0ZqZEdsMlpVMWxiblZEYkdGemN5bGNiaUFnSUNCOVhHNTlLVnh1WEc0dkx5Qk1hVzVySUdOc2FXTnJJR1YyWlc1MFhHNGtiV1Z1ZFV4cGJtc3VZMnhwWTJzb1puVnVZM1JwYjI0b1pTa2dlMXh1SUNBZ0lDUmliMlI1TG5KbGJXOTJaVU5zWVhOektHRmpkR2wyWlUxbGJuVkRiR0Z6Y3lsY2JpQWdJQ0FrWTJobFkydGliM2d1Y0hKdmNDZ25ZMmhsWTJ0bFpDY3NJR1poYkhObEtWeHVJQ0FnSUNSdFpXNTFUR2x1YXk1eVpXMXZkbVZEYkdGemN5aGhZM1JwZG1WRGJHRnpjeWxjYmlBZ0lDQWtLSFJvYVhNcExtRmtaRU5zWVhOektHRmpkR2wyWlVOc1lYTnpLVnh1ZlNsY2JseHVMeThnVFdGemF5QmpiR2xqYXlCbGRtVnVkRnh1SkcxaGMyc3VZMnhwWTJzb1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ2FXWWdLQ1JpYjJSNUxtaGhjME5zWVhOektHRmpkR2wyWlUxbGJuVkRiR0Z6Y3lrcElIdGNiaUFnSUNBZ0lDQWdKR0p2WkhrdWNtVnRiM1psUTJ4aGMzTW9ZV04wYVhabFRXVnVkVU5zWVhOektWeHVJQ0FnSUNBZ0lDQWtZMmhsWTJ0aWIzZ3VjSEp2Y0NnblkyaGxZMnRsWkNjc0lHWmhiSE5sS1Z4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ1JpYjJSNUxtRmtaRU5zWVhOektHRmpkR2wyWlUxbGJuVkRiR0Z6Y3lsY2JpQWdJQ0I5WEc1OUtWeHVYRzRrYldWdWRVeHBibXN1YUc5MlpYSW9ablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdiR1YwSUdSaGRHRWdQU0FrS0hSb2FYTXBMbVJoZEdFb0ozUnBkR3hsSnlsY2JpQWdJQ0FrYldWdWRVeHBjM1F1WVhSMGNpZ25aR0YwWVMxMGFYUnNaU2NzSUdSaGRHRXBYRzRnSUNBZ0pHMWxiblZNYVhOMExuUnZaMmRzWlVOc1lYTnpLQ2RwY3kxb2IzWmxjbVZrSnlsY2JuMHBYRzVjYmx4dVhHNHZMeUJUZEdsamEza2dhR1ZoWkdWeVhHNHZMeUJtZFc1amRHbHZiaUJ6ZEdsamEza29LU0I3WEc1Y2JpOHZJQ0FnSUNCamIyNXpkQ0FrYUdWaFpHVnlJRDBnSkNnbkxtaGxZV1JsY2ljcFhHNHZMeUFnSUNBZ1kyOXVjM1FnSkhkcGJtUnZkeUE5SUNRb2QybHVaRzkzS1Z4dUx5OGdJQ0FnSUdOdmJuTjBJSE4wYVdOcmVVTnNZWE56SUQwZ0oybHpMWE4wYVdOcmVTZGNiaTh2SUNBZ0lDQmpiMjV6ZENCMGIzQWdQU0FrYUdWaFpHVnlMbTltWm5ObGRDZ3BMblJ2Y0NBcklERmNibHh1THk4Z0lDQWdJQ1IzYVc1a2IzY3VjMk55YjJ4c0tHWjFibU4wYVc5dUtDa2dlMXh1THk4Z0lDQWdJQ0FnSUNCcFppQW9KSGRwYm1SdmR5NXpZM0p2Ykd4VWIzQW9LU0ErUFNCMGIzQXBJSHRjYmk4dklDQWdJQ0FnSUNBZ0lDQWdJQ1JvWldGa1pYSXVZV1JrUTJ4aGMzTW9jM1JwWTJ0NVEyeGhjM01wWEc0dkx5QWdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNHZMeUFnSUNBZ0lDQWdJQ0FnSUNBa2FHVmhaR1Z5TG5KbGJXOTJaVU5zWVhOektITjBhV05yZVVOc1lYTnpLVnh1THk4Z0lDQWdJQ0FnSUNCOVhHNHZMeUFnSUNBZ2ZTbGNibHh1WEc0dkx5QWdJQ0FnTHk4Z1FXUmthVzVuSUdGamRHbDJaU0J6ZEdGMFpYTWdiMjRnYzJOeWIyeHNYRzR2THlBZ0lDQWdZMjl1YzNRZ2MyVmpkR2x2Ym5NZ1BTQWtLQ2N1YW5NdFkyOXVkR1Z1ZEMxelpXTjBhVzl1SnlsY2JpOHZJQ0FnSUNCamIyNXpkQ0J1WVhZZ1BTQWtLQ2R1WVhZbktWeHVMeThnSUNBZ0lHTnZibk4wSUc1aGRsOW9aV2xuYUhRZ1BTQnVZWFl1YjNWMFpYSklaV2xuYUhRb0tWeHVYRzR2THlBZ0lDQWdKQ2gzYVc1a2IzY3BMbTl1S0NkelkzSnZiR3duTENCbWRXNWpkR2x2YmlBb0tTQjdYRzVjYmk4dklDQWdJQ0FnSUNBZ0x5OGdZM1Z5Y21WdWRDQndiM05wZEdsdmJseHVMeThnSUNBZ0lDQWdJQ0JqYjI1emRDQmpkWEpmY0c5eklEMGdKQ2gwYUdsektTNXpZM0p2Ykd4VWIzQW9LVnh1WEc0dkx5QWdJQ0FnSUNBZ0lDOHZJR2wwWlhKaGRHVWdiM1psY2lCbFlXTm9JRzltSUhSb1pTQnpaV04wYVc5dWMxeHVMeThnSUNBZ0lDQWdJQ0J6WldOMGFXOXVjeTVsWVdOb0tHWjFibU4wYVc5dUtDa2dlMXh1THk4Z0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2RHOXdJRDBnSkNoMGFHbHpLUzV2Wm1aelpYUW9LUzUwYjNBZ0xTQnVZWFpmYUdWcFoyaDBYRzR2THlBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCaWIzUjBiMjBnUFNCMGIzQWdLeUFrS0hSb2FYTXBMbTkxZEdWeVNHVnBaMmgwS0NsY2JseHVMeThnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR04xY2w5d2IzTWdQajBnZEc5d0lDWW1JR04xY2w5d2IzTWdQRDBnWW05MGRHOXRLU0I3WEc0dkx5QWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JtRjJMbVpwYm1Rb0oyRW5LUzV5WlcxdmRtVkRiR0Z6Y3lnbmFYTXRZV04wYVhabEp5bGNiaTh2SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6WldOMGFXOXVjeTV5WlcxdmRtVkRiR0Z6Y3lnbmFYTXRZV04wYVhabEp5bGNibHh1THk4Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNRb2RHaHBjeWt1WVdSa1EyeGhjM01vSjJsekxXRmpkR2wyWlNjcFhHNHZMeUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdibUYyTG1acGJtUW9KMkZiYUhKbFpqMWNJaU1uS3lRb2RHaHBjeWt1WVhSMGNpZ25hV1FuS1NzblhDSmRKeWt1WVdSa1EyeGhjM01vSjJsekxXRmpkR2wyWlNjcFhHNHZMeUFnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUx5OGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9kR2hwY3lrdWNtVnRiM1psUTJ4aGMzTW9KMmx6TFdGamRHbDJaU2NwWEc0dkx5QWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JtRjJMbVpwYm1Rb0oyRmJhSEpsWmoxY0lpTW5LeVFvZEdocGN5a3VZWFIwY2lnbmFXUW5LU3NuWENKZEp5a3VjbVZ0YjNabFEyeGhjM01vSjJsekxXRmpkR2wyWlNjcFhHNHZMeUFnSUNBZ0lDQWdJQ0FnSUNCOVhHNHZMeUFnSUNBZ0lDQWdJSDBwWEc0dkx5QWdJQ0FnZlNsY2JseHVMeThnZlZ4dVhHNHZMeUJsZUhCdmNuUWdaR1ZtWVhWc2RDQjdJSE4wYVdOcmVTQjlJaXdpYVcxd2IzSjBJRUpoY21KaElHWnliMjBnSjJKaGNtSmhMbXB6SjF4dWFXMXdiM0owSUhKbGRtVmhiRVoxYm1OMGFXOXVJR1p5YjIwZ0p5NHZjMk55YjJ4c1VtVjJaV0ZzTG1wekoxeHVhVzF3YjNKMElITnRiMjkwYUZOamNtOXNiQ0JtY205dElDY3VMM050YjI5MGFGTmpjbTlzYkdsdVp5NXFjeWRjYm1sdGNHOXlkQ0J6YjJOcFlXeFhhVzVrYjNjZ1puSnZiU0FuTGk5emIyTnBZV3d1YW5NblhHNWNiblpoY2lCR1lXUmxWSEpoYm5OcGRHbHZiaUE5SUVKaGNtSmhMa0poYzJWVWNtRnVjMmwwYVc5dUxtVjRkR1Z1WkNoN1hHNGdJSE4wWVhKME9pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQlFjbTl0YVhObFhHNGdJQ0FnSUNBdVlXeHNLRnQwYUdsekxtNWxkME52Ym5SaGFXNWxja3h2WVdScGJtY3NJSFJvYVhNdVptRmtaVTkxZENncFhTbGNiaUFnSUNBZ0lDNTBhR1Z1S0hSb2FYTXVabUZrWlVsdUxtSnBibVFvZEdocGN5a3BYRzRnSUgwc1hHNWNiaUFnWm1Ga1pVOTFkRG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnY21WMGRYSnVJQ1FvZEdocGN5NXZiR1JEYjI1MFlXbHVaWElwTG1GdWFXMWhkR1VvZXlCdmNHRmphWFI1T2lBd0lIMHBMbkJ5YjIxcGMyVW9LVnh1SUNCOUxGeHVYRzRnSUdaaFpHVkpiam9nWm5WdVkzUnBiMjRvS1NCN1hHNWNiaUFnSUNCcFppQW9KM05qY205c2JGSmxjM1J2Y21GMGFXOXVKeUJwYmlCb2FYTjBiM0o1S1NCN1hHNGdJQ0FnSUNCb2FYTjBiM0o1TG5OamNtOXNiRkpsYzNSdmNtRjBhVzl1SUQwZ0oyMWhiblZoYkNjN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnSkNoM2FXNWtiM2NwTG5OamNtOXNiRlJ2Y0Nnd0tUc2dMeThnYzJOeWIyeHNJSFJ2SUhSdmNDQm9aWEpsWEc1Y2JpQWdJQ0IyWVhJZ1gzUm9hWE1nUFNCMGFHbHpPMXh1SUNBZ0lIWmhjaUFrWld3Z1BTQWtLSFJvYVhNdWJtVjNRMjl1ZEdGcGJtVnlLVHRjYmx4dUlDQWdJQ1FvZEdocGN5NXZiR1JEYjI1MFlXbHVaWElwTG1ocFpHVW9LVHRjYmx4dUlDQWdJQ1JsYkM1amMzTW9lMXh1SUNBZ0lDQWdkbWx6YVdKcGJHbDBlVG9nSjNacGMybGliR1VuTEZ4dUlDQWdJQ0FnYjNCaFkybDBlVG9nTUZ4dUlDQWdJSDBwWEc1Y2JpQWdJQ0FrWld3dVlXNXBiV0YwWlNoN0lHOXdZV05wZEhrNklERWdmU3dnTkRBd0xDQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJRjkwYUdsekxtUnZibVVvS1Z4dUlDQWdJSDBwWEc1Y2JpQWdmVnh1ZlNsY2JseHVRbUZ5WW1FdVJHbHpjR0YwWTJobGNpNXZiaWduZEhKaGJuTnBkR2x2YmtOdmJYQnNaWFJsWkNjc0lHWjFibU4wYVc5dUtHTnZiblJoYVc1bGNpa2dlMXh1SUNBdkwzSmxkbVZoYkVaMWJtTjBhVzl1TG5KbGRtVmhiQ2dwWEc0Z0lITnZZMmxoYkZkcGJtUnZkeTV6YjJOcFlXd29LVnh1SUNCemJXOXZkR2hUWTNKdmJHd3VjMk55YjJ4c0tDbGNibjBwWEc1Y2JrSmhjbUpoTGxCcVlYZ3VaMlYwVkhKaGJuTnBkR2x2YmlBOUlHWjFibU4wYVc5dUtDa2dlMXh1SUNCeVpYUjFjbTRnUm1Ga1pWUnlZVzV6YVhScGIyNWNibjFjYmx4dVFtRnlZbUV1VUhKbFptVjBZMmd1YVc1cGRDZ3BYRzVDWVhKaVlTNVFhbUY0TG5OMFlYSjBLQ2tpTENJdkx5QnBiWEJ2Y25RZ2V5QlVkMlZsYmt4cGRHVXNJRVZzWVhOMGFXTXNJRU5UVTFCc2RXZHBiaXdnVkdsdFpXeHBibVZNYVhSbElIMGdabkp2YlNCY0ltZHpZWEJjSWx4dVhHNHZMeUF2THlCRmJHVnRaVzUwYzF4dUx5OGdZMjl1YzNRZ0pIWmxjblJwWTJGc0lEMGdKQ2duTG1wekxYQXRkbVZ5ZEdsallXd25LVnh1WEc0dkx5QXZMeUJVYVcxbGJHbHVaVnh1THk4Z1kyOXVjM1FnZEd3Z1BTQnVaWGNnVkdsdFpXeHBibVZNYVhSbEtIdHdZWFZ6WldRNmRISjFaWDBwWEc1Y2JpOHZJQ1IyWlhKMGFXTmhiQzVsWVdOb0tHWjFibU4wYVc5dUtHa3NJR0p2ZUNsN1hHNHZMeUFnSUNBZ2RtRnlJQ1JsYkdWdFpXNTBJRDBnSkNoaWIzZ3BPMXh1THk4Z0lDQWdJRlIzWldWdVRHbDBaUzV6ZEdGbloyVnlWRzhvSkdWc1pXMWxiblFzSURBdU15d2dlMk56Y3pwN0lIazZOVEF3SUgwc0lHVmhjMlU2UW1GamF5NWxZWE5sVDNWMGZTbGNiaTh2SUgwcFhHNWNiaTh2SUNRb2QybHVaRzkzS1M1elkzSnZiR3dvWm5WdVkzUnBiMjRvWlNsN1hHNHZMeUFnSUNBZ1kyOXVjM1FnYzJOeWIyeHNWRzl3SUQwZ0pDaDNhVzVrYjNjcExuTmpjbTlzYkZSdmNDZ3BYRzR2THlBZ0lDQWdZMjl1YzNRZ1pHOWpTR1ZwWjJoMElEMGdKQ2hrYjJOMWJXVnVkQ2t1YUdWcFoyaDBLQ2xjYmk4dklDQWdJQ0JqYjI1emRDQjNhVzVJWldsbmFIUWdQU0FrS0hkcGJtUnZkeWt1YUdWcFoyaDBLQ2xjYmk4dklDQWdJQ0JqYjI1emRDQnpZM0p2Ykd4UVpYSmpaVzUwSUQwZ0tITmpjbTlzYkZSdmNDa2dMeUFvWkc5alNHVnBaMmgwSUMwZ2QybHVTR1ZwWjJoMEtWeHVYRzR2THlBZ0lDQWdkR3d1Y0hKdlozSmxjM01vSUhOamNtOXNiRkJsY21ObGJuUWdLUzV3WVhWelpTZ3BYRzR2THlCOUtTSXNJbWx0Y0c5eWRDQnphM0p2Ykd4eUlHWnliMjBnSjNOcmNtOXNiSEluWEc1Y2JtWjFibU4wYVc5dUlISmxkbVZoYkNncElIdGNiaUFnSUNBb1puVnVZM1JwYjI0b0pDa2dlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQnpJRDBnYzJ0eWIyeHNjaTVwYm1sMEtIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGJtUmxjam9nWm5WdVkzUnBiMjRvWkdGMFlTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2UkdWaWRXZG5hVzVuSUMwZ1RHOW5JSFJvWlNCamRYSnlaVzUwSUhOamNtOXNiQ0J3YjNOcGRHbHZiaTVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emIyeGxMbXh2Wnloa1lYUmhMbU4xY2xSdmNDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMHBYRzRnSUNBZ2ZTbGNibjFjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnZXlCeVpYWmxZV3dnZlNJc0ltWjFibU4wYVc5dUlITmpjbTlzYkNncElIdGNiaUFnWTI5dWMzUWdKR0Z1WTJodmNpQTlJQ1FvSnk1cWN5MXpiVzl2ZEdndGMyTnliMnhzSnlsY2JpQWdZMjl1YzNRZ2JtRjJJRDBnSkNnbkxtaGxZV1JsY2ljcFhHNGdJR052Ym5OMElHNWhkbDlvWldsbmFIUWdQU0J1WVhZdWIzVjBaWEpJWldsbmFIUW9LVnh1WEc0Z0lDUmhibU5vYjNJdWIyNG9KMk5zYVdOckp5d2dablZ1WTNScGIyNG9aWFpsYm5RcElIdGNiaUFnSUNCamIyNXpkQ0JvY21WbUlEMGdKQ2gwYUdsektTNWhkSFJ5S0Nkb2NtVm1KeWxjYmx4dUlDQWdJR2xtSUNoMGFHbHpMbWhoYzJnZ0lUMDlJRndpWENJcElIdGNiaUFnSUNBZ0lHbG1JQ2doYUhKbFppNWphR0Z5UVhRb01Da2dQVDBnSnlNbktTQjdYRzRnSUNBZ0lDQWdJR1YyWlc1MExuQnlaWFpsYm5SRVpXWmhkV3gwS0NsY2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ1kyOXVjM1FnYUdGemFDQTlJSFJvYVhNdWFHRnphRnh1SUNBZ0lDQWdKQ2duYUhSdGJDd2dZbTlrZVNjcExtRnVhVzFoZEdVb2UxeHVJQ0FnSUNBZ0lDQnpZM0p2Ykd4VWIzQTZJQ1FvYUdGemFDa3ViMlptYzJWMEtDa3VkRzl3SUMwZ2JtRjJYMmhsYVdkb2RGeHVJQ0FnSUNBZ2ZTd2dPREF3TENCbWRXNWpkR2x2YmlncGUxeHVJQ0FnSUNBZ0lDQjNhVzVrYjNjdWJHOWpZWFJwYjI0dWFHRnphQ0E5SUdoaGMyZzdYRzRnSUNBZ0lDQjlLVnh1SUNBZ0lIMWNiaUFnZlNsY2JseHVJQ0F2THlBa0tIZHBibVJ2ZHlrdWIyNG9YQ0pzYjJGa1hDSXNJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdMeThnSUNCMllYSWdkWEpzU0dGemFDQTlJSGRwYm1SdmR5NXNiMk5oZEdsdmJpNW9jbVZtTG5Od2JHbDBLRndpSTF3aUtWc3hYVnh1SUNBdkx5QWdJQ1FvSjJoMGJXd3NZbTlrZVNjcExtRnVhVzFoZEdVb2UxeHVJQ0F2THlBZ0lDQWdJQ0J6WTNKdmJHeFViM0E2SUNRb0p5TW5JQ3NnZFhKc1NHRnphQ2t1YjJabWMyVjBLQ2t1ZEc5d1hHNGdJQzh2SUNBZ2ZTd2dOREF3TUNsY2JpQWdMeThnZlNsY2JuMWNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdleUJ6WTNKdmJHd2dmU0lzSW1aMWJtTjBhVzl1SUhOdlkybGhiQ2dwSUh0Y2JpQWdJQ0JqYjI1emRDQWtjMjlqYVdGc1YybHVaRzkzSUQwZ0pDZ25MbXB6TFhOdlkybGhiQzEzYVc1a2IzY25LVnh1WEc0Z0lDQWdKSE52WTJsaGJGZHBibVJ2ZHk1dmJpZ25ZMnhwWTJzbkxDQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMyOXNaUzVzYjJjb0oyTnNhV05yWldRbktWeHVJQ0FnSUNBZ0lDQjNhVzVrYjNjdWIzQmxiaWgwYUdsekxtaHlaV1lzSUZ3aVUyOWphV0ZzWENJc0lGd2lkMmxrZEdnOU9EQXdMQ0JvWldsbmFIUTlOakF3WENJcFhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ0lDQjlLVnh1ZlZ4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCN0lITnZZMmxoYkNCOUlpd2lhVzF3YjNKMElGZGxZa1p2Ym5RZ1puSnZiU0FuZDJWaVptOXVkR3h2WVdSbGNpZGNibHh1VjJWaVJtOXVkQzVzYjJGa0tIdGNiaUFnSUNCbmIyOW5iR1U2SUh0Y2JpQWdJQ0FnSUNBZ1ptRnRhV3hwWlhNNklGc25UVzl1ZEhObGNuSmhkRG8wTURBc05UQXdMRGN3TUNkZFhHNGdJQ0FnZlZ4dWZTbGNiaUlzSWlobWRXNWpkR2x2YmlCM1pXSndZV05yVlc1cGRtVnljMkZzVFc5a2RXeGxSR1ZtYVc1cGRHbHZiaWh5YjI5MExDQm1ZV04wYjNKNUtTQjdYRzVjZEdsbUtIUjVjR1Z2WmlCbGVIQnZjblJ6SUQwOVBTQW5iMkpxWldOMEp5QW1KaUIwZVhCbGIyWWdiVzlrZFd4bElEMDlQU0FuYjJKcVpXTjBKeWxjYmx4MFhIUnRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWmhZM1J2Y25rb0tUdGNibHgwWld4elpTQnBaaWgwZVhCbGIyWWdaR1ZtYVc1bElEMDlQU0FuWm5WdVkzUnBiMjRuSUNZbUlHUmxabWx1WlM1aGJXUXBYRzVjZEZ4MFpHVm1hVzVsS0Z3aVFtRnlZbUZjSWl3Z1cxMHNJR1poWTNSdmNua3BPMXh1WEhSbGJITmxJR2xtS0hSNWNHVnZaaUJsZUhCdmNuUnpJRDA5UFNBbmIySnFaV04wSnlsY2JseDBYSFJsZUhCdmNuUnpXMXdpUW1GeVltRmNJbDBnUFNCbVlXTjBiM0o1S0NrN1hHNWNkR1ZzYzJWY2JseDBYSFJ5YjI5MFcxd2lRbUZ5WW1GY0lsMGdQU0JtWVdOMGIzSjVLQ2s3WEc1OUtTaDBhR2x6TENCbWRXNWpkR2x2YmlncElIdGNibkpsZEhWeWJpQXZLaW9xS2lvcUx5QW9ablZ1WTNScGIyNG9iVzlrZFd4bGN5a2dleUF2THlCM1pXSndZV05yUW05dmRITjBjbUZ3WEc0dktpb3FLaW9xTHlCY2RDOHZJRlJvWlNCdGIyUjFiR1VnWTJGamFHVmNiaThxS2lvcUtpb3ZJRngwZG1GeUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhNZ1BTQjdmVHRjYmk4cUtpb3FLaW92WEc0dktpb3FLaW9xTHlCY2RDOHZJRlJvWlNCeVpYRjFhWEpsSUdaMWJtTjBhVzl1WEc0dktpb3FLaW9xTHlCY2RHWjFibU4wYVc5dUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9iVzlrZFd4bFNXUXBJSHRjYmk4cUtpb3FLaW92WEc0dktpb3FLaW9xTHlCY2RGeDBMeThnUTJobFkyc2dhV1lnYlc5a2RXeGxJR2x6SUdsdUlHTmhZMmhsWEc0dktpb3FLaW9xTHlCY2RGeDBhV1lvYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBwWEc0dktpb3FLaW9xTHlCY2RGeDBYSFJ5WlhSMWNtNGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVaWGh3YjNKMGN6dGNiaThxS2lvcUtpb3ZYRzR2S2lvcUtpb3FMeUJjZEZ4MEx5OGdRM0psWVhSbElHRWdibVYzSUcxdlpIVnNaU0FvWVc1a0lIQjFkQ0JwZENCcGJuUnZJSFJvWlNCallXTm9aU2xjYmk4cUtpb3FLaW92SUZ4MFhIUjJZWElnYlc5a2RXeGxJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBnUFNCN1hHNHZLaW9xS2lvcUx5QmNkRngwWEhSbGVIQnZjblJ6T2lCN2ZTeGNiaThxS2lvcUtpb3ZJRngwWEhSY2RHbGtPaUJ0YjJSMWJHVkpaQ3hjYmk4cUtpb3FLaW92SUZ4MFhIUmNkR3h2WVdSbFpEb2dabUZzYzJWY2JpOHFLaW9xS2lvdklGeDBYSFI5TzF4dUx5b3FLaW9xS2k5Y2JpOHFLaW9xS2lvdklGeDBYSFF2THlCRmVHVmpkWFJsSUhSb1pTQnRiMlIxYkdVZ1puVnVZM1JwYjI1Y2JpOHFLaW9xS2lvdklGeDBYSFJ0YjJSMWJHVnpXMjF2WkhWc1pVbGtYUzVqWVd4c0tHMXZaSFZzWlM1bGVIQnZjblJ6TENCdGIyUjFiR1VzSUcxdlpIVnNaUzVsZUhCdmNuUnpMQ0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS1R0Y2JpOHFLaW9xS2lvdlhHNHZLaW9xS2lvcUx5QmNkRngwTHk4Z1JteGhaeUIwYUdVZ2JXOWtkV3hsSUdGeklHeHZZV1JsWkZ4dUx5b3FLaW9xS2k4Z1hIUmNkRzF2WkhWc1pTNXNiMkZrWldRZ1BTQjBjblZsTzF4dUx5b3FLaW9xS2k5Y2JpOHFLaW9xS2lvdklGeDBYSFF2THlCU1pYUjFjbTRnZEdobElHVjRjRzl5ZEhNZ2IyWWdkR2hsSUcxdlpIVnNaVnh1THlvcUtpb3FLaThnWEhSY2RISmxkSFZ5YmlCdGIyUjFiR1V1Wlhod2IzSjBjenRjYmk4cUtpb3FLaW92SUZ4MGZWeHVMeW9xS2lvcUtpOWNiaThxS2lvcUtpb3ZYRzR2S2lvcUtpb3FMeUJjZEM4dklHVjRjRzl6WlNCMGFHVWdiVzlrZFd4bGN5QnZZbXBsWTNRZ0tGOWZkMlZpY0dGamExOXRiMlIxYkdWelgxOHBYRzR2S2lvcUtpb3FMeUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJTQTlJRzF2WkhWc1pYTTdYRzR2S2lvcUtpb3FMMXh1THlvcUtpb3FLaThnWEhRdkx5QmxlSEJ2YzJVZ2RHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUx5b3FLaW9xS2k4Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbU1nUFNCcGJuTjBZV3hzWldSTmIyUjFiR1Z6TzF4dUx5b3FLaW9xS2k5Y2JpOHFLaW9xS2lvdklGeDBMeThnWDE5M1pXSndZV05yWDNCMVlteHBZMTl3WVhSb1gxOWNiaThxS2lvcUtpb3ZJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1d0lEMGdYQ0pvZEhSd09pOHZiRzlqWVd4b2IzTjBPamd3T0RBdlpHbHpkRndpTzF4dUx5b3FLaW9xS2k5Y2JpOHFLaW9xS2lvdklGeDBMeThnVEc5aFpDQmxiblJ5ZVNCdGIyUjFiR1VnWVc1a0lISmxkSFZ5YmlCbGVIQnZjblJ6WEc0dktpb3FLaW9xTHlCY2RISmxkSFZ5YmlCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktEQXBPMXh1THlvcUtpb3FLaThnZlNsY2JpOHFLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3ZYRzR2S2lvcUtpb3FMeUFvVzF4dUx5b2dNQ0FxTDF4dUx5b3FLaThnWm5WdVkzUnBiMjRvYlc5a2RXeGxMQ0JsZUhCdmNuUnpMQ0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS1NCN1hHNWNibHgwTHk5UWNtOXRhWE5sSUhCdmJIbG1hV3hzSUdoMGRIQnpPaTh2WjJsMGFIVmlMbU52YlM5MFlYbHNiM0pvWVd0bGN5OXdjbTl0YVhObExYQnZiSGxtYVd4c1hHNWNkRnh1WEhScFppQW9kSGx3Wlc5bUlGQnliMjFwYzJVZ0lUMDlJQ2RtZFc1amRHbHZiaWNwSUh0Y2JseDBJSGRwYm1SdmR5NVFjbTl0YVhObElEMGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWd4S1R0Y2JseDBmVnh1WEhSY2JseDBkbUZ5SUVKaGNtSmhJRDBnZTF4dVhIUWdJSFpsY25OcGIyNDZJQ2N4TGpBdU1DY3NYRzVjZENBZ1FtRnpaVlJ5WVc1emFYUnBiMjQ2SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b05Da3NYRzVjZENBZ1FtRnpaVlpwWlhjNklGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9OaWtzWEc1Y2RDQWdRbUZ6WlVOaFkyaGxPaUJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0RncExGeHVYSFFnSUVScGMzQmhkR05vWlhJNklGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9OeWtzWEc1Y2RDQWdTR2x6ZEc5eWVVMWhibUZuWlhJNklGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9PU2tzWEc1Y2RDQWdVR3BoZURvZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5Z3hNQ2tzWEc1Y2RDQWdVSEpsWm1WMFkyZzZJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvTVRNcExGeHVYSFFnSUZWMGFXeHpPaUJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0RVcFhHNWNkSDA3WEc1Y2RGeHVYSFJ0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRUpoY21KaE8xeHVYRzVjYmk4cUtpb3ZJSDBzWEc0dktpQXhJQ292WEc0dktpb3FMeUJtZFc1amRHbHZiaWh0YjJSMWJHVXNJR1Y0Y0c5eWRITXNJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThwSUh0Y2JseHVYSFF2S2lCWFJVSlFRVU5MSUZaQlVpQkpUa3BGUTFSSlQwNGdLaThvWm5WdVkzUnBiMjRvYzJWMFNXMXRaV1JwWVhSbEtTQjdLR1oxYm1OMGFXOXVJQ2h5YjI5MEtTQjdYRzVjZEZ4dVhIUWdJQzh2SUZOMGIzSmxJSE5sZEZScGJXVnZkWFFnY21WbVpYSmxibU5sSUhOdklIQnliMjFwYzJVdGNHOXNlV1pwYkd3Z2QybHNiQ0JpWlNCMWJtRm1abVZqZEdWa0lHSjVYRzVjZENBZ0x5OGdiM1JvWlhJZ1kyOWtaU0J0YjJScFpubHBibWNnYzJWMFZHbHRaVzkxZENBb2JHbHJaU0J6YVc1dmJpNTFjMlZHWVd0bFZHbHRaWEp6S0NrcFhHNWNkQ0FnZG1GeUlITmxkRlJwYldWdmRYUkdkVzVqSUQwZ2MyVjBWR2x0Wlc5MWREdGNibHgwWEc1Y2RDQWdablZ1WTNScGIyNGdibTl2Y0NncElIdGNibHgwSUNCOVhHNWNkRnh1WEhRZ0lDOHZJRlZ6WlNCd2IyeDVabWxzYkNCbWIzSWdjMlYwU1cxdFpXUnBZWFJsSUdadmNpQndaWEptYjNKdFlXNWpaU0JuWVdsdWMxeHVYSFFnSUhaaGNpQmhjMkZ3SUQwZ0tIUjVjR1Z2WmlCelpYUkpiVzFsWkdsaGRHVWdQVDA5SUNkbWRXNWpkR2x2YmljZ0ppWWdjMlYwU1cxdFpXUnBZWFJsS1NCOGZGeHVYSFFnSUNBZ1puVnVZM1JwYjI0Z0tHWnVLU0I3WEc1Y2RDQWdJQ0FnSUhObGRGUnBiV1Z2ZFhSR2RXNWpLR1p1TENBd0tUdGNibHgwSUNBZ0lIMDdYRzVjZEZ4dVhIUWdJSFpoY2lCdmJsVnVhR0Z1Wkd4bFpGSmxhbVZqZEdsdmJpQTlJR1oxYm1OMGFXOXVJRzl1Vlc1b1lXNWtiR1ZrVW1WcVpXTjBhVzl1S0dWeWNpa2dlMXh1WEhRZ0lDQWdhV1lnS0hSNWNHVnZaaUJqYjI1emIyeGxJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5QW1KaUJqYjI1emIyeGxLU0I3WEc1Y2RDQWdJQ0FnSUdOdmJuTnZiR1V1ZDJGeWJpZ25VRzl6YzJsaWJHVWdWVzVvWVc1a2JHVmtJRkJ5YjIxcGMyVWdVbVZxWldOMGFXOXVPaWNzSUdWeWNpazdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMV3hwYm1VZ2JtOHRZMjl1YzI5c1pWeHVYSFFnSUNBZ2ZWeHVYSFFnSUgwN1hHNWNkRnh1WEhRZ0lDOHZJRkJ2YkhsbWFXeHNJR1p2Y2lCR2RXNWpkR2x2Ymk1d2NtOTBiM1I1Y0dVdVltbHVaRnh1WEhRZ0lHWjFibU4wYVc5dUlHSnBibVFvWm00c0lIUm9hWE5CY21jcElIdGNibHgwSUNBZ0lISmxkSFZ5YmlCbWRXNWpkR2x2YmlBb0tTQjdYRzVjZENBZ0lDQWdJR1p1TG1Gd2NHeDVLSFJvYVhOQmNtY3NJR0Z5WjNWdFpXNTBjeWs3WEc1Y2RDQWdJQ0I5TzF4dVhIUWdJSDFjYmx4MFhHNWNkQ0FnWm5WdVkzUnBiMjRnVUhKdmJXbHpaU2htYmlrZ2UxeHVYSFFnSUNBZ2FXWWdLSFI1Y0dWdlppQjBhR2x6SUNFOVBTQW5iMkpxWldOMEp5a2dkR2h5YjNjZ2JtVjNJRlI1Y0dWRmNuSnZjaWduVUhKdmJXbHpaWE1nYlhWemRDQmlaU0JqYjI1emRISjFZM1JsWkNCMmFXRWdibVYzSnlrN1hHNWNkQ0FnSUNCcFppQW9kSGx3Wlc5bUlHWnVJQ0U5UFNBblpuVnVZM1JwYjI0bktTQjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLQ2R1YjNRZ1lTQm1kVzVqZEdsdmJpY3BPMXh1WEhRZ0lDQWdkR2hwY3k1ZmMzUmhkR1VnUFNBd08xeHVYSFFnSUNBZ2RHaHBjeTVmYUdGdVpHeGxaQ0E5SUdaaGJITmxPMXh1WEhRZ0lDQWdkR2hwY3k1ZmRtRnNkV1VnUFNCMWJtUmxabWx1WldRN1hHNWNkQ0FnSUNCMGFHbHpMbDlrWldabGNuSmxaSE1nUFNCYlhUdGNibHgwWEc1Y2RDQWdJQ0JrYjFKbGMyOXNkbVVvWm00c0lIUm9hWE1wTzF4dVhIUWdJSDFjYmx4MFhHNWNkQ0FnWm5WdVkzUnBiMjRnYUdGdVpHeGxLSE5sYkdZc0lHUmxabVZ5Y21Wa0tTQjdYRzVjZENBZ0lDQjNhR2xzWlNBb2MyVnNaaTVmYzNSaGRHVWdQVDA5SURNcElIdGNibHgwSUNBZ0lDQWdjMlZzWmlBOUlITmxiR1l1WDNaaGJIVmxPMXh1WEhRZ0lDQWdmVnh1WEhRZ0lDQWdhV1lnS0hObGJHWXVYM04wWVhSbElEMDlQU0F3S1NCN1hHNWNkQ0FnSUNBZ0lITmxiR1l1WDJSbFptVnljbVZrY3k1d2RYTm9LR1JsWm1WeWNtVmtLVHRjYmx4MElDQWdJQ0FnY21WMGRYSnVPMXh1WEhRZ0lDQWdmVnh1WEhRZ0lDQWdjMlZzWmk1ZmFHRnVaR3hsWkNBOUlIUnlkV1U3WEc1Y2RDQWdJQ0JoYzJGd0tHWjFibU4wYVc5dUlDZ3BJSHRjYmx4MElDQWdJQ0FnZG1GeUlHTmlJRDBnYzJWc1ppNWZjM1JoZEdVZ1BUMDlJREVnUHlCa1pXWmxjbkpsWkM1dmJrWjFiR1pwYkd4bFpDQTZJR1JsWm1WeWNtVmtMbTl1VW1WcVpXTjBaV1E3WEc1Y2RDQWdJQ0FnSUdsbUlDaGpZaUE5UFQwZ2JuVnNiQ2tnZTF4dVhIUWdJQ0FnSUNBZ0lDaHpaV3htTGw5emRHRjBaU0E5UFQwZ01TQS9JSEpsYzI5c2RtVWdPaUJ5WldwbFkzUXBLR1JsWm1WeWNtVmtMbkJ5YjIxcGMyVXNJSE5sYkdZdVgzWmhiSFZsS1R0Y2JseDBJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNWNkQ0FnSUNBZ0lIMWNibHgwSUNBZ0lDQWdkbUZ5SUhKbGREdGNibHgwSUNBZ0lDQWdkSEo1SUh0Y2JseDBJQ0FnSUNBZ0lDQnlaWFFnUFNCallpaHpaV3htTGw5MllXeDFaU2s3WEc1Y2RDQWdJQ0FnSUgwZ1kyRjBZMmdnS0dVcElIdGNibHgwSUNBZ0lDQWdJQ0J5WldwbFkzUW9aR1ZtWlhKeVpXUXVjSEp2YldselpTd2daU2s3WEc1Y2RDQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dVhIUWdJQ0FnSUNCOVhHNWNkQ0FnSUNBZ0lISmxjMjlzZG1Vb1pHVm1aWEp5WldRdWNISnZiV2x6WlN3Z2NtVjBLVHRjYmx4MElDQWdJSDBwTzF4dVhIUWdJSDFjYmx4MFhHNWNkQ0FnWm5WdVkzUnBiMjRnY21WemIyeDJaU2h6Wld4bUxDQnVaWGRXWVd4MVpTa2dlMXh1WEhRZ0lDQWdkSEo1SUh0Y2JseDBJQ0FnSUNBZ0x5OGdVSEp2YldselpTQlNaWE52YkhWMGFXOXVJRkJ5YjJObFpIVnlaVG9nYUhSMGNITTZMeTluYVhSb2RXSXVZMjl0TDNCeWIyMXBjMlZ6TFdGd2JIVnpMM0J5YjIxcGMyVnpMWE53WldNamRHaGxMWEJ5YjIxcGMyVXRjbVZ6YjJ4MWRHbHZiaTF3Y205alpXUjFjbVZjYmx4MElDQWdJQ0FnYVdZZ0tHNWxkMVpoYkhWbElEMDlQU0J6Wld4bUtTQjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLQ2RCSUhCeWIyMXBjMlVnWTJGdWJtOTBJR0psSUhKbGMyOXNkbVZrSUhkcGRHZ2dhWFJ6Wld4bUxpY3BPMXh1WEhRZ0lDQWdJQ0JwWmlBb2JtVjNWbUZzZFdVZ0ppWWdLSFI1Y0dWdlppQnVaWGRXWVd4MVpTQTlQVDBnSjI5aWFtVmpkQ2NnZkh3Z2RIbHdaVzltSUc1bGQxWmhiSFZsSUQwOVBTQW5ablZ1WTNScGIyNG5LU2tnZTF4dVhIUWdJQ0FnSUNBZ0lIWmhjaUIwYUdWdUlEMGdibVYzVm1Gc2RXVXVkR2hsYmp0Y2JseDBJQ0FnSUNBZ0lDQnBaaUFvYm1WM1ZtRnNkV1VnYVc1emRHRnVZMlZ2WmlCUWNtOXRhWE5sS1NCN1hHNWNkQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxsOXpkR0YwWlNBOUlETTdYRzVjZENBZ0lDQWdJQ0FnSUNCelpXeG1MbDkyWVd4MVpTQTlJRzVsZDFaaGJIVmxPMXh1WEhRZ0lDQWdJQ0FnSUNBZ1ptbHVZV3hsS0hObGJHWXBPMXh1WEhRZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dVhIUWdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9kSGx3Wlc5bUlIUm9aVzRnUFQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmx4MElDQWdJQ0FnSUNBZ0lHUnZVbVZ6YjJ4MlpTaGlhVzVrS0hSb1pXNHNJRzVsZDFaaGJIVmxLU3dnYzJWc1ppazdYRzVjZENBZ0lDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc1Y2RDQWdJQ0FnSUNBZ2ZWeHVYSFFnSUNBZ0lDQjlYRzVjZENBZ0lDQWdJSE5sYkdZdVgzTjBZWFJsSUQwZ01UdGNibHgwSUNBZ0lDQWdjMlZzWmk1ZmRtRnNkV1VnUFNCdVpYZFdZV3gxWlR0Y2JseDBJQ0FnSUNBZ1ptbHVZV3hsS0hObGJHWXBPMXh1WEhRZ0lDQWdmU0JqWVhSamFDQW9aU2tnZTF4dVhIUWdJQ0FnSUNCeVpXcGxZM1FvYzJWc1ppd2daU2s3WEc1Y2RDQWdJQ0I5WEc1Y2RDQWdmVnh1WEhSY2JseDBJQ0JtZFc1amRHbHZiaUJ5WldwbFkzUW9jMlZzWml3Z2JtVjNWbUZzZFdVcElIdGNibHgwSUNBZ0lITmxiR1l1WDNOMFlYUmxJRDBnTWp0Y2JseDBJQ0FnSUhObGJHWXVYM1poYkhWbElEMGdibVYzVm1Gc2RXVTdYRzVjZENBZ0lDQm1hVzVoYkdVb2MyVnNaaWs3WEc1Y2RDQWdmVnh1WEhSY2JseDBJQ0JtZFc1amRHbHZiaUJtYVc1aGJHVW9jMlZzWmlrZ2UxeHVYSFFnSUNBZ2FXWWdLSE5sYkdZdVgzTjBZWFJsSUQwOVBTQXlJQ1ltSUhObGJHWXVYMlJsWm1WeWNtVmtjeTVzWlc1bmRHZ2dQVDA5SURBcElIdGNibHgwSUNBZ0lDQWdZWE5oY0NobWRXNWpkR2x2YmlncElIdGNibHgwSUNBZ0lDQWdJQ0JwWmlBb0lYTmxiR1l1WDJoaGJtUnNaV1FwSUh0Y2JseDBJQ0FnSUNBZ0lDQWdJRzl1Vlc1b1lXNWtiR1ZrVW1WcVpXTjBhVzl1S0hObGJHWXVYM1poYkhWbEtUdGNibHgwSUNBZ0lDQWdJQ0I5WEc1Y2RDQWdJQ0FnSUgwcE8xeHVYSFFnSUNBZ2ZWeHVYSFJjYmx4MElDQWdJR1p2Y2lBb2RtRnlJR2tnUFNBd0xDQnNaVzRnUFNCelpXeG1MbDlrWldabGNuSmxaSE11YkdWdVozUm9PeUJwSUR3Z2JHVnVPeUJwS3lzcElIdGNibHgwSUNBZ0lDQWdhR0Z1Wkd4bEtITmxiR1lzSUhObGJHWXVYMlJsWm1WeWNtVmtjMXRwWFNrN1hHNWNkQ0FnSUNCOVhHNWNkQ0FnSUNCelpXeG1MbDlrWldabGNuSmxaSE1nUFNCdWRXeHNPMXh1WEhRZ0lIMWNibHgwWEc1Y2RDQWdablZ1WTNScGIyNGdTR0Z1Wkd4bGNpaHZia1oxYkdacGJHeGxaQ3dnYjI1U1pXcGxZM1JsWkN3Z2NISnZiV2x6WlNrZ2UxeHVYSFFnSUNBZ2RHaHBjeTV2YmtaMWJHWnBiR3hsWkNBOUlIUjVjR1Z2WmlCdmJrWjFiR1pwYkd4bFpDQTlQVDBnSjJaMWJtTjBhVzl1SnlBL0lHOXVSblZzWm1sc2JHVmtJRG9nYm5Wc2JEdGNibHgwSUNBZ0lIUm9hWE11YjI1U1pXcGxZM1JsWkNBOUlIUjVjR1Z2WmlCdmJsSmxhbVZqZEdWa0lEMDlQU0FuWm5WdVkzUnBiMjRuSUQ4Z2IyNVNaV3BsWTNSbFpDQTZJRzUxYkd3N1hHNWNkQ0FnSUNCMGFHbHpMbkJ5YjIxcGMyVWdQU0J3Y205dGFYTmxPMXh1WEhRZ0lIMWNibHgwWEc1Y2RDQWdMeW9xWEc1Y2RDQWdJQ29nVkdGclpTQmhJSEJ2ZEdWdWRHbGhiR3g1SUcxcGMySmxhR0YyYVc1bklISmxjMjlzZG1WeUlHWjFibU4wYVc5dUlHRnVaQ0J0WVd0bElITjFjbVZjYmx4MElDQWdLaUJ2YmtaMWJHWnBiR3hsWkNCaGJtUWdiMjVTWldwbFkzUmxaQ0JoY21VZ2IyNXNlU0JqWVd4c1pXUWdiMjVqWlM1Y2JseDBJQ0FnS2x4dVhIUWdJQ0FxSUUxaGEyVnpJRzV2SUdkMVlYSmhiblJsWlhNZ1lXSnZkWFFnWVhONWJtTm9jbTl1ZVM1Y2JseDBJQ0FnS2k5Y2JseDBJQ0JtZFc1amRHbHZiaUJrYjFKbGMyOXNkbVVvWm00c0lITmxiR1lwSUh0Y2JseDBJQ0FnSUhaaGNpQmtiMjVsSUQwZ1ptRnNjMlU3WEc1Y2RDQWdJQ0IwY25rZ2UxeHVYSFFnSUNBZ0lDQm1iaWhtZFc1amRHbHZiaUFvZG1Gc2RXVXBJSHRjYmx4MElDQWdJQ0FnSUNCcFppQW9aRzl1WlNrZ2NtVjBkWEp1TzF4dVhIUWdJQ0FnSUNBZ0lHUnZibVVnUFNCMGNuVmxPMXh1WEhRZ0lDQWdJQ0FnSUhKbGMyOXNkbVVvYzJWc1ppd2dkbUZzZFdVcE8xeHVYSFFnSUNBZ0lDQjlMQ0JtZFc1amRHbHZiaUFvY21WaGMyOXVLU0I3WEc1Y2RDQWdJQ0FnSUNBZ2FXWWdLR1J2Ym1VcElISmxkSFZ5Ymp0Y2JseDBJQ0FnSUNBZ0lDQmtiMjVsSUQwZ2RISjFaVHRjYmx4MElDQWdJQ0FnSUNCeVpXcGxZM1FvYzJWc1ppd2djbVZoYzI5dUtUdGNibHgwSUNBZ0lDQWdmU2s3WEc1Y2RDQWdJQ0I5SUdOaGRHTm9JQ2hsZUNrZ2UxeHVYSFFnSUNBZ0lDQnBaaUFvWkc5dVpTa2djbVYwZFhKdU8xeHVYSFFnSUNBZ0lDQmtiMjVsSUQwZ2RISjFaVHRjYmx4MElDQWdJQ0FnY21WcVpXTjBLSE5sYkdZc0lHVjRLVHRjYmx4MElDQWdJSDFjYmx4MElDQjlYRzVjZEZ4dVhIUWdJRkJ5YjIxcGMyVXVjSEp2ZEc5MGVYQmxXeWRqWVhSamFDZGRJRDBnWm5WdVkzUnBiMjRnS0c5dVVtVnFaV04wWldRcElIdGNibHgwSUNBZ0lISmxkSFZ5YmlCMGFHbHpMblJvWlc0b2JuVnNiQ3dnYjI1U1pXcGxZM1JsWkNrN1hHNWNkQ0FnZlR0Y2JseDBYRzVjZENBZ1VISnZiV2x6WlM1d2NtOTBiM1I1Y0dVdWRHaGxiaUE5SUdaMWJtTjBhVzl1SUNodmJrWjFiR1pwYkd4bFpDd2diMjVTWldwbFkzUmxaQ2tnZTF4dVhIUWdJQ0FnZG1GeUlIQnliMjBnUFNCdVpYY2dLSFJvYVhNdVkyOXVjM1J5ZFdOMGIzSXBLRzV2YjNBcE8xeHVYSFJjYmx4MElDQWdJR2hoYm1Sc1pTaDBhR2x6TENCdVpYY2dTR0Z1Wkd4bGNpaHZia1oxYkdacGJHeGxaQ3dnYjI1U1pXcGxZM1JsWkN3Z2NISnZiU2twTzF4dVhIUWdJQ0FnY21WMGRYSnVJSEJ5YjIwN1hHNWNkQ0FnZlR0Y2JseDBYRzVjZENBZ1VISnZiV2x6WlM1aGJHd2dQU0JtZFc1amRHbHZiaUFvWVhKeUtTQjdYRzVjZENBZ0lDQjJZWElnWVhKbmN5QTlJRUZ5Y21GNUxuQnliM1J2ZEhsd1pTNXpiR2xqWlM1allXeHNLR0Z5Y2lrN1hHNWNkRnh1WEhRZ0lDQWdjbVYwZFhKdUlHNWxkeUJRY205dGFYTmxLR1oxYm1OMGFXOXVJQ2h5WlhOdmJIWmxMQ0J5WldwbFkzUXBJSHRjYmx4MElDQWdJQ0FnYVdZZ0tHRnlaM011YkdWdVozUm9JRDA5UFNBd0tTQnlaWFIxY200Z2NtVnpiMngyWlNoYlhTazdYRzVjZENBZ0lDQWdJSFpoY2lCeVpXMWhhVzVwYm1jZ1BTQmhjbWR6TG14bGJtZDBhRHRjYmx4MFhHNWNkQ0FnSUNBZ0lHWjFibU4wYVc5dUlISmxjeWhwTENCMllXd3BJSHRjYmx4MElDQWdJQ0FnSUNCMGNua2dlMXh1WEhRZ0lDQWdJQ0FnSUNBZ2FXWWdLSFpoYkNBbUppQW9kSGx3Wlc5bUlIWmhiQ0E5UFQwZ0oyOWlhbVZqZENjZ2ZId2dkSGx3Wlc5bUlIWmhiQ0E5UFQwZ0oyWjFibU4wYVc5dUp5a3BJSHRjYmx4MElDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhSb1pXNGdQU0IyWVd3dWRHaGxianRjYmx4MElDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUIwYUdWdUlEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNWNkQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaGxiaTVqWVd4c0tIWmhiQ3dnWm5WdVkzUnBiMjRnS0haaGJDa2dlMXh1WEhRZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WektHa3NJSFpoYkNrN1hHNWNkQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZTd2djbVZxWldOMEtUdGNibHgwSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNWNkQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JseDBJQ0FnSUNBZ0lDQWdJSDFjYmx4MElDQWdJQ0FnSUNBZ0lHRnlaM05iYVYwZ1BTQjJZV3c3WEc1Y2RDQWdJQ0FnSUNBZ0lDQnBaaUFvTFMxeVpXMWhhVzVwYm1jZ1BUMDlJREFwSUh0Y2JseDBJQ0FnSUNBZ0lDQWdJQ0FnY21WemIyeDJaU2hoY21kektUdGNibHgwSUNBZ0lDQWdJQ0FnSUgxY2JseDBJQ0FnSUNBZ0lDQjlJR05oZEdOb0lDaGxlQ2tnZTF4dVhIUWdJQ0FnSUNBZ0lDQWdjbVZxWldOMEtHVjRLVHRjYmx4MElDQWdJQ0FnSUNCOVhHNWNkQ0FnSUNBZ0lIMWNibHgwWEc1Y2RDQWdJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z1lYSm5jeTVzWlc1bmRHZzdJR2tyS3lrZ2UxeHVYSFFnSUNBZ0lDQWdJSEpsY3locExDQmhjbWR6VzJsZEtUdGNibHgwSUNBZ0lDQWdmVnh1WEhRZ0lDQWdmU2s3WEc1Y2RDQWdmVHRjYmx4MFhHNWNkQ0FnVUhKdmJXbHpaUzV5WlhOdmJIWmxJRDBnWm5WdVkzUnBiMjRnS0haaGJIVmxLU0I3WEc1Y2RDQWdJQ0JwWmlBb2RtRnNkV1VnSmlZZ2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmIySnFaV04wSnlBbUppQjJZV3gxWlM1amIyNXpkSEoxWTNSdmNpQTlQVDBnVUhKdmJXbHpaU2tnZTF4dVhIUWdJQ0FnSUNCeVpYUjFjbTRnZG1Gc2RXVTdYRzVjZENBZ0lDQjlYRzVjZEZ4dVhIUWdJQ0FnY21WMGRYSnVJRzVsZHlCUWNtOXRhWE5sS0daMWJtTjBhVzl1SUNoeVpYTnZiSFpsS1NCN1hHNWNkQ0FnSUNBZ0lISmxjMjlzZG1Vb2RtRnNkV1VwTzF4dVhIUWdJQ0FnZlNrN1hHNWNkQ0FnZlR0Y2JseDBYRzVjZENBZ1VISnZiV2x6WlM1eVpXcGxZM1FnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VwSUh0Y2JseDBJQ0FnSUhKbGRIVnliaUJ1WlhjZ1VISnZiV2x6WlNobWRXNWpkR2x2YmlBb2NtVnpiMngyWlN3Z2NtVnFaV04wS1NCN1hHNWNkQ0FnSUNBZ0lISmxhbVZqZENoMllXeDFaU2s3WEc1Y2RDQWdJQ0I5S1R0Y2JseDBJQ0I5TzF4dVhIUmNibHgwSUNCUWNtOXRhWE5sTG5KaFkyVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVnpLU0I3WEc1Y2RDQWdJQ0J5WlhSMWNtNGdibVYzSUZCeWIyMXBjMlVvWm5WdVkzUnBiMjRnS0hKbGMyOXNkbVVzSUhKbGFtVmpkQ2tnZTF4dVhIUWdJQ0FnSUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnYkdWdUlEMGdkbUZzZFdWekxteGxibWQwYURzZ2FTQThJR3hsYmpzZ2FTc3JLU0I3WEc1Y2RDQWdJQ0FnSUNBZ2RtRnNkV1Z6VzJsZExuUm9aVzRvY21WemIyeDJaU3dnY21WcVpXTjBLVHRjYmx4MElDQWdJQ0FnZlZ4dVhIUWdJQ0FnZlNrN1hHNWNkQ0FnZlR0Y2JseDBYRzVjZENBZ0x5b3FYRzVjZENBZ0lDb2dVMlYwSUhSb1pTQnBiVzFsWkdsaGRHVWdablZ1WTNScGIyNGdkRzhnWlhobFkzVjBaU0JqWVd4c1ltRmphM05jYmx4MElDQWdLaUJBY0dGeVlXMGdabTRnZTJaMWJtTjBhVzl1ZlNCR2RXNWpkR2x2YmlCMGJ5QmxlR1ZqZFhSbFhHNWNkQ0FnSUNvZ1FIQnlhWFpoZEdWY2JseDBJQ0FnS2k5Y2JseDBJQ0JRY205dGFYTmxMbDl6WlhSSmJXMWxaR2xoZEdWR2JpQTlJR1oxYm1OMGFXOXVJRjl6WlhSSmJXMWxaR2xoZEdWR2JpaG1iaWtnZTF4dVhIUWdJQ0FnWVhOaGNDQTlJR1p1TzF4dVhIUWdJSDA3WEc1Y2RGeHVYSFFnSUZCeWIyMXBjMlV1WDNObGRGVnVhR0Z1Wkd4bFpGSmxhbVZqZEdsdmJrWnVJRDBnWm5WdVkzUnBiMjRnWDNObGRGVnVhR0Z1Wkd4bFpGSmxhbVZqZEdsdmJrWnVLR1p1S1NCN1hHNWNkQ0FnSUNCdmJsVnVhR0Z1Wkd4bFpGSmxhbVZqZEdsdmJpQTlJR1p1TzF4dVhIUWdJSDA3WEc1Y2RGeHVYSFFnSUdsbUlDaDBlWEJsYjJZZ2JXOWtkV3hsSUNFOVBTQW5kVzVrWldacGJtVmtKeUFtSmlCdGIyUjFiR1V1Wlhod2IzSjBjeWtnZTF4dVhIUWdJQ0FnYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0JRY205dGFYTmxPMXh1WEhRZ0lIMGdaV3h6WlNCcFppQW9JWEp2YjNRdVVISnZiV2x6WlNrZ2UxeHVYSFFnSUNBZ2NtOXZkQzVRY205dGFYTmxJRDBnVUhKdmJXbHpaVHRjYmx4MElDQjlYRzVjZEZ4dVhIUjlLU2gwYUdsektUdGNibHgwWEc1Y2RDOHFJRmRGUWxCQlEwc2dWa0ZTSUVsT1NrVkRWRWxQVGlBcUwzMHVZMkZzYkNobGVIQnZjblJ6TENCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktESXBMbk5sZEVsdGJXVmthV0YwWlNrcFhHNWNiaThxS2lvdklIMHNYRzR2S2lBeUlDb3ZYRzR2S2lvcUx5Qm1kVzVqZEdsdmJpaHRiMlIxYkdVc0lHVjRjRzl5ZEhNc0lGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHBJSHRjYmx4dVhIUXZLaUJYUlVKUVFVTkxJRlpCVWlCSlRrcEZRMVJKVDA0Z0tpOG9ablZ1WTNScGIyNG9jMlYwU1cxdFpXUnBZWFJsTENCamJHVmhja2x0YldWa2FXRjBaU2tnZTNaaGNpQnVaWGgwVkdsamF5QTlJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvTXlrdWJtVjRkRlJwWTJzN1hHNWNkSFpoY2lCaGNIQnNlU0E5SUVaMWJtTjBhVzl1TG5CeWIzUnZkSGx3WlM1aGNIQnNlVHRjYmx4MGRtRnlJSE5zYVdObElEMGdRWEp5WVhrdWNISnZkRzkwZVhCbExuTnNhV05sTzF4dVhIUjJZWElnYVcxdFpXUnBZWFJsU1dSeklEMGdlMzA3WEc1Y2RIWmhjaUJ1WlhoMFNXMXRaV1JwWVhSbFNXUWdQU0F3TzF4dVhIUmNibHgwTHk4Z1JFOU5JRUZRU1hNc0lHWnZjaUJqYjIxd2JHVjBaVzVsYzNOY2JseDBYRzVjZEdWNGNHOXlkSE11YzJWMFZHbHRaVzkxZENBOUlHWjFibU4wYVc5dUtDa2dlMXh1WEhRZ0lISmxkSFZ5YmlCdVpYY2dWR2x0Wlc5MWRDaGhjSEJzZVM1allXeHNLSE5sZEZScGJXVnZkWFFzSUhkcGJtUnZkeXdnWVhKbmRXMWxiblJ6S1N3Z1kyeGxZWEpVYVcxbGIzVjBLVHRjYmx4MGZUdGNibHgwWlhod2IzSjBjeTV6WlhSSmJuUmxjblpoYkNBOUlHWjFibU4wYVc5dUtDa2dlMXh1WEhRZ0lISmxkSFZ5YmlCdVpYY2dWR2x0Wlc5MWRDaGhjSEJzZVM1allXeHNLSE5sZEVsdWRHVnlkbUZzTENCM2FXNWtiM2NzSUdGeVozVnRaVzUwY3lrc0lHTnNaV0Z5U1c1MFpYSjJZV3dwTzF4dVhIUjlPMXh1WEhSbGVIQnZjblJ6TG1Oc1pXRnlWR2x0Wlc5MWRDQTlYRzVjZEdWNGNHOXlkSE11WTJ4bFlYSkpiblJsY25aaGJDQTlJR1oxYm1OMGFXOXVLSFJwYldWdmRYUXBJSHNnZEdsdFpXOTFkQzVqYkc5elpTZ3BPeUI5TzF4dVhIUmNibHgwWm5WdVkzUnBiMjRnVkdsdFpXOTFkQ2hwWkN3Z1kyeGxZWEpHYmlrZ2UxeHVYSFFnSUhSb2FYTXVYMmxrSUQwZ2FXUTdYRzVjZENBZ2RHaHBjeTVmWTJ4bFlYSkdiaUE5SUdOc1pXRnlSbTQ3WEc1Y2RIMWNibHgwVkdsdFpXOTFkQzV3Y205MGIzUjVjR1V1ZFc1eVpXWWdQU0JVYVcxbGIzVjBMbkJ5YjNSdmRIbHdaUzV5WldZZ1BTQm1kVzVqZEdsdmJpZ3BJSHQ5TzF4dVhIUlVhVzFsYjNWMExuQnliM1J2ZEhsd1pTNWpiRzl6WlNBOUlHWjFibU4wYVc5dUtDa2dlMXh1WEhRZ0lIUm9hWE11WDJOc1pXRnlSbTR1WTJGc2JDaDNhVzVrYjNjc0lIUm9hWE11WDJsa0tUdGNibHgwZlR0Y2JseDBYRzVjZEM4dklFUnZaWE1nYm05MElITjBZWEowSUhSb1pTQjBhVzFsTENCcWRYTjBJSE5sZEhNZ2RYQWdkR2hsSUcxbGJXSmxjbk1nYm1WbFpHVmtMbHh1WEhSbGVIQnZjblJ6TG1WdWNtOXNiQ0E5SUdaMWJtTjBhVzl1S0dsMFpXMHNJRzF6WldOektTQjdYRzVjZENBZ1kyeGxZWEpVYVcxbGIzVjBLR2wwWlcwdVgybGtiR1ZVYVcxbGIzVjBTV1FwTzF4dVhIUWdJR2wwWlcwdVgybGtiR1ZVYVcxbGIzVjBJRDBnYlhObFkzTTdYRzVjZEgwN1hHNWNkRnh1WEhSbGVIQnZjblJ6TG5WdVpXNXliMnhzSUQwZ1puVnVZM1JwYjI0b2FYUmxiU2tnZTF4dVhIUWdJR05zWldGeVZHbHRaVzkxZENocGRHVnRMbDlwWkd4bFZHbHRaVzkxZEVsa0tUdGNibHgwSUNCcGRHVnRMbDlwWkd4bFZHbHRaVzkxZENBOUlDMHhPMXh1WEhSOU8xeHVYSFJjYmx4MFpYaHdiM0owY3k1ZmRXNXlaV1pCWTNScGRtVWdQU0JsZUhCdmNuUnpMbUZqZEdsMlpTQTlJR1oxYm1OMGFXOXVLR2wwWlcwcElIdGNibHgwSUNCamJHVmhjbFJwYldWdmRYUW9hWFJsYlM1ZmFXUnNaVlJwYldWdmRYUkpaQ2s3WEc1Y2RGeHVYSFFnSUhaaGNpQnRjMlZqY3lBOUlHbDBaVzB1WDJsa2JHVlVhVzFsYjNWME8xeHVYSFFnSUdsbUlDaHRjMlZqY3lBK1BTQXdLU0I3WEc1Y2RDQWdJQ0JwZEdWdExsOXBaR3hsVkdsdFpXOTFkRWxrSUQwZ2MyVjBWR2x0Wlc5MWRDaG1kVzVqZEdsdmJpQnZibFJwYldWdmRYUW9LU0I3WEc1Y2RDQWdJQ0FnSUdsbUlDaHBkR1Z0TGw5dmJsUnBiV1Z2ZFhRcFhHNWNkQ0FnSUNBZ0lDQWdhWFJsYlM1ZmIyNVVhVzFsYjNWMEtDazdYRzVjZENBZ0lDQjlMQ0J0YzJWamN5azdYRzVjZENBZ2ZWeHVYSFI5TzF4dVhIUmNibHgwTHk4Z1ZHaGhkQ2R6SUc1dmRDQm9iM2NnYm05a1pTNXFjeUJwYlhCc1pXMWxiblJ6SUdsMElHSjFkQ0IwYUdVZ1pYaHdiM05sWkNCaGNHa2dhWE1nZEdobElITmhiV1V1WEc1Y2RHVjRjRzl5ZEhNdWMyVjBTVzF0WldScFlYUmxJRDBnZEhsd1pXOW1JSE5sZEVsdGJXVmthV0YwWlNBOVBUMGdYQ0ptZFc1amRHbHZibHdpSUQ4Z2MyVjBTVzF0WldScFlYUmxJRG9nWm5WdVkzUnBiMjRvWm00cElIdGNibHgwSUNCMllYSWdhV1FnUFNCdVpYaDBTVzF0WldScFlYUmxTV1FyS3p0Y2JseDBJQ0IyWVhJZ1lYSm5jeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUENBeUlEOGdabUZzYzJVZ09pQnpiR2xqWlM1allXeHNLR0Z5WjNWdFpXNTBjeXdnTVNrN1hHNWNkRnh1WEhRZ0lHbHRiV1ZrYVdGMFpVbGtjMXRwWkYwZ1BTQjBjblZsTzF4dVhIUmNibHgwSUNCdVpYaDBWR2xqYXlobWRXNWpkR2x2YmlCdmJrNWxlSFJVYVdOcktDa2dlMXh1WEhRZ0lDQWdhV1lnS0dsdGJXVmthV0YwWlVsa2MxdHBaRjBwSUh0Y2JseDBJQ0FnSUNBZ0x5OGdabTR1WTJGc2JDZ3BJR2x6SUdaaGMzUmxjaUJ6YnlCM1pTQnZjSFJwYldsNlpTQm1iM0lnZEdobElHTnZiVzF2YmlCMWMyVXRZMkZ6WlZ4dVhIUWdJQ0FnSUNBdkx5QkFjMlZsSUdoMGRIQTZMeTlxYzNCbGNtWXVZMjl0TDJOaGJHd3RZWEJ3YkhrdGMyVm5kVnh1WEhRZ0lDQWdJQ0JwWmlBb1lYSm5jeWtnZTF4dVhIUWdJQ0FnSUNBZ0lHWnVMbUZ3Y0d4NUtHNTFiR3dzSUdGeVozTXBPMXh1WEhRZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1WEhRZ0lDQWdJQ0FnSUdadUxtTmhiR3dvYm5Wc2JDazdYRzVjZENBZ0lDQWdJSDFjYmx4MElDQWdJQ0FnTHk4Z1VISmxkbVZ1ZENCcFpITWdabkp2YlNCc1pXRnJhVzVuWEc1Y2RDQWdJQ0FnSUdWNGNHOXlkSE11WTJ4bFlYSkpiVzFsWkdsaGRHVW9hV1FwTzF4dVhIUWdJQ0FnZlZ4dVhIUWdJSDBwTzF4dVhIUmNibHgwSUNCeVpYUjFjbTRnYVdRN1hHNWNkSDA3WEc1Y2RGeHVYSFJsZUhCdmNuUnpMbU5zWldGeVNXMXRaV1JwWVhSbElEMGdkSGx3Wlc5bUlHTnNaV0Z5U1cxdFpXUnBZWFJsSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lnUHlCamJHVmhja2x0YldWa2FXRjBaU0E2SUdaMWJtTjBhVzl1S0dsa0tTQjdYRzVjZENBZ1pHVnNaWFJsSUdsdGJXVmthV0YwWlVsa2MxdHBaRjA3WEc1Y2RIMDdYRzVjZEM4cUlGZEZRbEJCUTBzZ1ZrRlNJRWxPU2tWRFZFbFBUaUFxTDMwdVkyRnNiQ2hsZUhCdmNuUnpMQ0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0RJcExuTmxkRWx0YldWa2FXRjBaU3dnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlneUtTNWpiR1ZoY2tsdGJXVmthV0YwWlNrcFhHNWNiaThxS2lvdklIMHNYRzR2S2lBeklDb3ZYRzR2S2lvcUx5Qm1kVzVqZEdsdmJpaHRiMlIxYkdVc0lHVjRjRzl5ZEhNcElIdGNibHh1WEhRdkx5QnphR2x0SUdadmNpQjFjMmx1WnlCd2NtOWpaWE56SUdsdUlHSnliM2R6WlhKY2JseDBYRzVjZEhaaGNpQndjbTlqWlhOeklEMGdiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjdmVHRjYmx4MFhHNWNkQzh2SUdOaFkyaGxaQ0JtY205dElIZG9ZWFJsZG1WeUlHZHNiMkpoYkNCcGN5QndjbVZ6Wlc1MElITnZJSFJvWVhRZ2RHVnpkQ0J5ZFc1dVpYSnpJSFJvWVhRZ2MzUjFZaUJwZEZ4dVhIUXZMeUJrYjI0bmRDQmljbVZoYXlCMGFHbHVaM011SUNCQ2RYUWdkMlVnYm1WbFpDQjBieUIzY21Gd0lHbDBJR2x1SUdFZ2RISjVJR05oZEdOb0lHbHVJR05oYzJVZ2FYUWdhWE5jYmx4MEx5OGdkM0poY0hCbFpDQnBiaUJ6ZEhKcFkzUWdiVzlrWlNCamIyUmxJSGRvYVdOb0lHUnZaWE51SjNRZ1pHVm1hVzVsSUdGdWVTQm5iRzlpWVd4ekxpQWdTWFFuY3lCcGJuTnBaR1VnWVZ4dVhIUXZMeUJtZFc1amRHbHZiaUJpWldOaGRYTmxJSFJ5ZVM5allYUmphR1Z6SUdSbGIzQjBhVzFwZW1VZ2FXNGdZMlZ5ZEdGcGJpQmxibWRwYm1WekxseHVYSFJjYmx4MGRtRnlJR05oWTJobFpGTmxkRlJwYldWdmRYUTdYRzVjZEhaaGNpQmpZV05vWldSRGJHVmhjbFJwYldWdmRYUTdYRzVjZEZ4dVhIUW9ablZ1WTNScGIyNGdLQ2tnZTF4dVhIUWdJSFJ5ZVNCN1hHNWNkQ0FnSUNCallXTm9aV1JUWlhSVWFXMWxiM1YwSUQwZ2MyVjBWR2x0Wlc5MWREdGNibHgwSUNCOUlHTmhkR05vSUNobEtTQjdYRzVjZENBZ0lDQmpZV05vWldSVFpYUlVhVzFsYjNWMElEMGdablZ1WTNScGIyNGdLQ2tnZTF4dVhIUWdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjNObGRGUnBiV1Z2ZFhRZ2FYTWdibTkwSUdSbFptbHVaV1FuS1R0Y2JseDBJQ0FnSUgxY2JseDBJQ0I5WEc1Y2RDQWdkSEo1SUh0Y2JseDBJQ0FnSUdOaFkyaGxaRU5zWldGeVZHbHRaVzkxZENBOUlHTnNaV0Z5VkdsdFpXOTFkRHRjYmx4MElDQjlJR05oZEdOb0lDaGxLU0I3WEc1Y2RDQWdJQ0JqWVdOb1pXUkRiR1ZoY2xScGJXVnZkWFFnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzVjZENBZ0lDQWdJSFJvY205M0lHNWxkeUJGY25KdmNpZ25ZMnhsWVhKVWFXMWxiM1YwSUdseklHNXZkQ0JrWldacGJtVmtKeWs3WEc1Y2RDQWdJQ0I5WEc1Y2RDQWdmVnh1WEhSOUlDZ3BLVnh1WEhSMllYSWdjWFZsZFdVZ1BTQmJYVHRjYmx4MGRtRnlJR1J5WVdsdWFXNW5JRDBnWm1Gc2MyVTdYRzVjZEhaaGNpQmpkWEp5Wlc1MFVYVmxkV1U3WEc1Y2RIWmhjaUJ4ZFdWMVpVbHVaR1Y0SUQwZ0xURTdYRzVjZEZ4dVhIUm1kVzVqZEdsdmJpQmpiR1ZoYmxWd1RtVjRkRlJwWTJzb0tTQjdYRzVjZENBZ0lDQnBaaUFvSVdSeVlXbHVhVzVuSUh4OElDRmpkWEp5Wlc1MFVYVmxkV1VwSUh0Y2JseDBJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNWNkQ0FnSUNCOVhHNWNkQ0FnSUNCa2NtRnBibWx1WnlBOUlHWmhiSE5sTzF4dVhIUWdJQ0FnYVdZZ0tHTjFjbkpsYm5SUmRXVjFaUzVzWlc1bmRHZ3BJSHRjYmx4MElDQWdJQ0FnSUNCeGRXVjFaU0E5SUdOMWNuSmxiblJSZFdWMVpTNWpiMjVqWVhRb2NYVmxkV1VwTzF4dVhIUWdJQ0FnZlNCbGJITmxJSHRjYmx4MElDQWdJQ0FnSUNCeGRXVjFaVWx1WkdWNElEMGdMVEU3WEc1Y2RDQWdJQ0I5WEc1Y2RDQWdJQ0JwWmlBb2NYVmxkV1V1YkdWdVozUm9LU0I3WEc1Y2RDQWdJQ0FnSUNBZ1pISmhhVzVSZFdWMVpTZ3BPMXh1WEhRZ0lDQWdmVnh1WEhSOVhHNWNkRnh1WEhSbWRXNWpkR2x2YmlCa2NtRnBibEYxWlhWbEtDa2dlMXh1WEhRZ0lDQWdhV1lnS0dSeVlXbHVhVzVuS1NCN1hHNWNkQ0FnSUNBZ0lDQWdjbVYwZFhKdU8xeHVYSFFnSUNBZ2ZWeHVYSFFnSUNBZ2RtRnlJSFJwYldWdmRYUWdQU0JqWVdOb1pXUlRaWFJVYVcxbGIzVjBLR05zWldGdVZYQk9aWGgwVkdsamF5azdYRzVjZENBZ0lDQmtjbUZwYm1sdVp5QTlJSFJ5ZFdVN1hHNWNkRnh1WEhRZ0lDQWdkbUZ5SUd4bGJpQTlJSEYxWlhWbExteGxibWQwYUR0Y2JseDBJQ0FnSUhkb2FXeGxLR3hsYmlrZ2UxeHVYSFFnSUNBZ0lDQWdJR04xY25KbGJuUlJkV1YxWlNBOUlIRjFaWFZsTzF4dVhIUWdJQ0FnSUNBZ0lIRjFaWFZsSUQwZ1cxMDdYRzVjZENBZ0lDQWdJQ0FnZDJocGJHVWdLQ3NyY1hWbGRXVkpibVJsZUNBOElHeGxiaWtnZTF4dVhIUWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1kzVnljbVZ1ZEZGMVpYVmxLU0I3WEc1Y2RDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamRYSnlaVzUwVVhWbGRXVmJjWFZsZFdWSmJtUmxlRjB1Y25WdUtDazdYRzVjZENBZ0lDQWdJQ0FnSUNBZ0lIMWNibHgwSUNBZ0lDQWdJQ0I5WEc1Y2RDQWdJQ0FnSUNBZ2NYVmxkV1ZKYm1SbGVDQTlJQzB4TzF4dVhIUWdJQ0FnSUNBZ0lHeGxiaUE5SUhGMVpYVmxMbXhsYm1kMGFEdGNibHgwSUNBZ0lIMWNibHgwSUNBZ0lHTjFjbkpsYm5SUmRXVjFaU0E5SUc1MWJHdzdYRzVjZENBZ0lDQmtjbUZwYm1sdVp5QTlJR1poYkhObE8xeHVYSFFnSUNBZ1kyRmphR1ZrUTJ4bFlYSlVhVzFsYjNWMEtIUnBiV1Z2ZFhRcE8xeHVYSFI5WEc1Y2RGeHVYSFJ3Y205alpYTnpMbTVsZUhSVWFXTnJJRDBnWm5WdVkzUnBiMjRnS0daMWJpa2dlMXh1WEhRZ0lDQWdkbUZ5SUdGeVozTWdQU0J1WlhjZ1FYSnlZWGtvWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0F0SURFcE8xeHVYSFFnSUNBZ2FXWWdLR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQaUF4S1NCN1hHNWNkQ0FnSUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SURFN0lHa2dQQ0JoY21kMWJXVnVkSE11YkdWdVozUm9PeUJwS3lzcElIdGNibHgwSUNBZ0lDQWdJQ0FnSUNBZ1lYSm5jMXRwSUMwZ01WMGdQU0JoY21kMWJXVnVkSE5iYVYwN1hHNWNkQ0FnSUNBZ0lDQWdmVnh1WEhRZ0lDQWdmVnh1WEhRZ0lDQWdjWFZsZFdVdWNIVnphQ2h1WlhjZ1NYUmxiU2htZFc0c0lHRnlaM01wS1R0Y2JseDBJQ0FnSUdsbUlDaHhkV1YxWlM1c1pXNW5kR2dnUFQwOUlERWdKaVlnSVdSeVlXbHVhVzVuS1NCN1hHNWNkQ0FnSUNBZ0lDQWdZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDaGtjbUZwYmxGMVpYVmxMQ0F3S1R0Y2JseDBJQ0FnSUgxY2JseDBmVHRjYmx4MFhHNWNkQzh2SUhZNElHeHBhMlZ6SUhCeVpXUnBZM1JwWW14bElHOWlhbVZqZEhOY2JseDBablZ1WTNScGIyNGdTWFJsYlNobWRXNHNJR0Z5Y21GNUtTQjdYRzVjZENBZ0lDQjBhR2x6TG1aMWJpQTlJR1oxYmp0Y2JseDBJQ0FnSUhSb2FYTXVZWEp5WVhrZ1BTQmhjbkpoZVR0Y2JseDBmVnh1WEhSSmRHVnRMbkJ5YjNSdmRIbHdaUzV5ZFc0Z1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc1Y2RDQWdJQ0IwYUdsekxtWjFiaTVoY0hCc2VTaHVkV3hzTENCMGFHbHpMbUZ5Y21GNUtUdGNibHgwZlR0Y2JseDBjSEp2WTJWemN5NTBhWFJzWlNBOUlDZGljbTkzYzJWeUp6dGNibHgwY0hKdlkyVnpjeTVpY205M2MyVnlJRDBnZEhKMVpUdGNibHgwY0hKdlkyVnpjeTVsYm5ZZ1BTQjdmVHRjYmx4MGNISnZZMlZ6Y3k1aGNtZDJJRDBnVzEwN1hHNWNkSEJ5YjJObGMzTXVkbVZ5YzJsdmJpQTlJQ2NuT3lBdkx5QmxiWEIwZVNCemRISnBibWNnZEc4Z1lYWnZhV1FnY21WblpYaHdJR2x6YzNWbGMxeHVYSFJ3Y205alpYTnpMblpsY25OcGIyNXpJRDBnZTMwN1hHNWNkRnh1WEhSbWRXNWpkR2x2YmlCdWIyOXdLQ2tnZTMxY2JseDBYRzVjZEhCeWIyTmxjM011YjI0Z1BTQnViMjl3TzF4dVhIUndjbTlqWlhOekxtRmtaRXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibHgwY0hKdlkyVnpjeTV2Ym1ObElEMGdibTl2Y0R0Y2JseDBjSEp2WTJWemN5NXZabVlnUFNCdWIyOXdPMXh1WEhSd2NtOWpaWE56TG5KbGJXOTJaVXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibHgwY0hKdlkyVnpjeTV5WlcxdmRtVkJiR3hNYVhOMFpXNWxjbk1nUFNCdWIyOXdPMXh1WEhSd2NtOWpaWE56TG1WdGFYUWdQU0J1YjI5d08xeHVYSFJjYmx4MGNISnZZMlZ6Y3k1aWFXNWthVzVuSUQwZ1puVnVZM1JwYjI0Z0tHNWhiV1VwSUh0Y2JseDBJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduY0hKdlkyVnpjeTVpYVc1a2FXNW5JR2x6SUc1dmRDQnpkWEJ3YjNKMFpXUW5LVHRjYmx4MGZUdGNibHgwWEc1Y2RIQnliMk5sYzNNdVkzZGtJRDBnWm5WdVkzUnBiMjRnS0NrZ2V5QnlaWFIxY200Z0p5OG5JSDA3WEc1Y2RIQnliMk5sYzNNdVkyaGthWElnUFNCbWRXNWpkR2x2YmlBb1pHbHlLU0I3WEc1Y2RDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KM0J5YjJObGMzTXVZMmhrYVhJZ2FYTWdibTkwSUhOMWNIQnZjblJsWkNjcE8xeHVYSFI5TzF4dVhIUndjbTlqWlhOekxuVnRZWE5ySUQwZ1puVnVZM1JwYjI0b0tTQjdJSEpsZEhWeWJpQXdPeUI5TzF4dVhHNWNiaThxS2lvdklIMHNYRzR2S2lBMElDb3ZYRzR2S2lvcUx5Qm1kVzVqZEdsdmJpaHRiMlIxYkdVc0lHVjRjRzl5ZEhNc0lGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHBJSHRjYmx4dVhIUjJZWElnVlhScGJITWdQU0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0RVcE8xeHVYSFJjYmx4MEx5b3FYRzVjZENBcUlFSmhjMlZVY21GdWMybDBhVzl1SUhSdklHVjRkR1Z1WkZ4dVhIUWdLbHh1WEhRZ0tpQkFibUZ0WlhOd1lXTmxJRUpoY21KaExrSmhjMlZVY21GdWMybDBhVzl1WEc1Y2RDQXFJRUIwZVhCbElIdFBZbXBsWTNSOVhHNWNkQ0FxTDF4dVhIUjJZWElnUW1GelpWUnlZVzV6YVhScGIyNGdQU0I3WEc1Y2RDQWdMeW9xWEc1Y2RDQWdJQ29nUUcxbGJXSmxjazltSUVKaGNtSmhMa0poYzJWVWNtRnVjMmwwYVc5dVhHNWNkQ0FnSUNvZ1FIUjVjR1VnZTBoVVRVeEZiR1Z0Wlc1MGZWeHVYSFFnSUNBcUwxeHVYSFFnSUc5c1pFTnZiblJoYVc1bGNqb2dkVzVrWldacGJtVmtMRnh1WEhSY2JseDBJQ0F2S2lwY2JseDBJQ0FnS2lCQWJXVnRZbVZ5VDJZZ1FtRnlZbUV1UW1GelpWUnlZVzV6YVhScGIyNWNibHgwSUNBZ0tpQkFkSGx3WlNCN1NGUk5URVZzWlcxbGJuUjlYRzVjZENBZ0lDb3ZYRzVjZENBZ2JtVjNRMjl1ZEdGcGJtVnlPaUIxYm1SbFptbHVaV1FzWEc1Y2RGeHVYSFFnSUM4cUtseHVYSFFnSUNBcUlFQnRaVzFpWlhKUFppQkNZWEppWVM1Q1lYTmxWSEpoYm5OcGRHbHZibHh1WEhRZ0lDQXFJRUIwZVhCbElIdFFjbTl0YVhObGZWeHVYSFFnSUNBcUwxeHVYSFFnSUc1bGQwTnZiblJoYVc1bGNreHZZV1JwYm1jNklIVnVaR1ZtYVc1bFpDeGNibHgwWEc1Y2RDQWdMeW9xWEc1Y2RDQWdJQ29nU0dWc2NHVnlJSFJ2SUdWNGRHVnVaQ0IwYUdVZ2IySnFaV04wWEc1Y2RDQWdJQ3BjYmx4MElDQWdLaUJBYldWdFltVnlUMllnUW1GeVltRXVRbUZ6WlZSeVlXNXphWFJwYjI1Y2JseDBJQ0FnS2lCQWNHRnlZVzBnSUh0UFltcGxZM1I5SUc1bGQwOWlhbVZqZEZ4dVhIUWdJQ0FxSUVCeVpYUjFjbTRnZTA5aWFtVmpkSDBnYm1WM1NXNW9aWEpwZEU5aWFtVmpkRnh1WEhRZ0lDQXFMMXh1WEhRZ0lHVjRkR1Z1WkRvZ1puVnVZM1JwYjI0b2IySnFLWHRjYmx4MElDQWdJSEpsZEhWeWJpQlZkR2xzY3k1bGVIUmxibVFvZEdocGN5d2diMkpxS1R0Y2JseDBJQ0I5TEZ4dVhIUmNibHgwSUNBdktpcGNibHgwSUNBZ0tpQlVhR2x6SUdaMWJtTjBhVzl1SUdseklHTmhiR3hsWkNCbWNtOXRJRkJxWVhnZ2JXOWtkV3hsSUhSdklHbHVhWFJwWVd4cGVtVmNibHgwSUNBZ0tpQjBhR1VnZEhKaGJuTnBkR2x2Ymk1Y2JseDBJQ0FnS2x4dVhIUWdJQ0FxSUVCdFpXMWlaWEpQWmlCQ1lYSmlZUzVDWVhObFZISmhibk5wZEdsdmJseHVYSFFnSUNBcUlFQndjbWwyWVhSbFhHNWNkQ0FnSUNvZ1FIQmhjbUZ0SUNCN1NGUk5URVZzWlcxbGJuUjlJRzlzWkVOdmJuUmhhVzVsY2x4dVhIUWdJQ0FxSUVCd1lYSmhiU0FnZTFCeWIyMXBjMlY5SUc1bGQwTnZiblJoYVc1bGNseHVYSFFnSUNBcUlFQnlaWFIxY200Z2UxQnliMjFwYzJWOVhHNWNkQ0FnSUNvdlhHNWNkQ0FnYVc1cGREb2dablZ1WTNScGIyNG9iMnhrUTI5dWRHRnBibVZ5TENCdVpYZERiMjUwWVdsdVpYSXBJSHRjYmx4MElDQWdJSFpoY2lCZmRHaHBjeUE5SUhSb2FYTTdYRzVjZEZ4dVhIUWdJQ0FnZEdocGN5NXZiR1JEYjI1MFlXbHVaWElnUFNCdmJHUkRiMjUwWVdsdVpYSTdYRzVjZENBZ0lDQjBhR2x6TGw5dVpYZERiMjUwWVdsdVpYSlFjbTl0YVhObElEMGdibVYzUTI5dWRHRnBibVZ5TzF4dVhIUmNibHgwSUNBZ0lIUm9hWE11WkdWbVpYSnlaV1FnUFNCVmRHbHNjeTVrWldabGNuSmxaQ2dwTzF4dVhIUWdJQ0FnZEdocGN5NXVaWGREYjI1MFlXbHVaWEpTWldGa2VTQTlJRlYwYVd4ekxtUmxabVZ5Y21Wa0tDazdYRzVjZENBZ0lDQjBhR2x6TG01bGQwTnZiblJoYVc1bGNreHZZV1JwYm1jZ1BTQjBhR2x6TG01bGQwTnZiblJoYVc1bGNsSmxZV1I1TG5CeWIyMXBjMlU3WEc1Y2RGeHVYSFFnSUNBZ2RHaHBjeTV6ZEdGeWRDZ3BPMXh1WEhSY2JseDBJQ0FnSUhSb2FYTXVYMjVsZDBOdmJuUmhhVzVsY2xCeWIyMXBjMlV1ZEdobGJpaG1kVzVqZEdsdmJpaHVaWGREYjI1MFlXbHVaWElwSUh0Y2JseDBJQ0FnSUNBZ1gzUm9hWE11Ym1WM1EyOXVkR0ZwYm1WeUlEMGdibVYzUTI5dWRHRnBibVZ5TzF4dVhIUWdJQ0FnSUNCZmRHaHBjeTV1WlhkRGIyNTBZV2x1WlhKU1pXRmtlUzV5WlhOdmJIWmxLQ2s3WEc1Y2RDQWdJQ0I5S1R0Y2JseDBYRzVjZENBZ0lDQnlaWFIxY200Z2RHaHBjeTVrWldabGNuSmxaQzV3Y205dGFYTmxPMXh1WEhRZ0lIMHNYRzVjZEZ4dVhIUWdJQzhxS2x4dVhIUWdJQ0FxSUZSb2FYTWdablZ1WTNScGIyNGdibVZsWkhNZ2RHOGdZbVVnWTJGc2JHVmtJR0Z6SUhOdmIyNGdkR2hsSUZSeVlXNXphWFJwYjI0Z2FYTWdabWx1YVhOb1pXUmNibHgwSUNBZ0tseHVYSFFnSUNBcUlFQnRaVzFpWlhKUFppQkNZWEppWVM1Q1lYTmxWSEpoYm5OcGRHbHZibHh1WEhRZ0lDQXFMMXh1WEhRZ0lHUnZibVU2SUdaMWJtTjBhVzl1S0NrZ2UxeHVYSFFnSUNBZ2RHaHBjeTV2YkdSRGIyNTBZV2x1WlhJdWNHRnlaVzUwVG05a1pTNXlaVzF2ZG1WRGFHbHNaQ2gwYUdsekxtOXNaRU52Ym5SaGFXNWxjaWs3WEc1Y2RDQWdJQ0IwYUdsekxtNWxkME52Ym5SaGFXNWxjaTV6ZEhsc1pTNTJhWE5wWW1sc2FYUjVJRDBnSjNacGMybGliR1VuTzF4dVhIUWdJQ0FnZEdocGN5NWtaV1psY25KbFpDNXlaWE52YkhabEtDazdYRzVjZENBZ2ZTeGNibHgwWEc1Y2RDQWdMeW9xWEc1Y2RDQWdJQ29nUTI5dWMzUnlkV04wYjNJZ1ptOXlJSGx2ZFhJZ1ZISmhibk5wZEdsdmJseHVYSFFnSUNBcVhHNWNkQ0FnSUNvZ1FHMWxiV0psY2s5bUlFSmhjbUpoTGtKaGMyVlVjbUZ1YzJsMGFXOXVYRzVjZENBZ0lDb2dRR0ZpYzNSeVlXTjBYRzVjZENBZ0lDb3ZYRzVjZENBZ2MzUmhjblE2SUdaMWJtTjBhVzl1S0NrZ2UzMHNYRzVjZEgwN1hHNWNkRnh1WEhSdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUVKaGMyVlVjbUZ1YzJsMGFXOXVPMXh1WEc1Y2JpOHFLaW92SUgwc1hHNHZLaUExSUNvdlhHNHZLaW9xTHlCbWRXNWpkR2x2YmlodGIyUjFiR1VzSUdWNGNHOXlkSE1wSUh0Y2JseHVYSFF2S2lwY2JseDBJQ29nU25WemRDQmhiaUJ2WW1wbFkzUWdkMmwwYUNCemIyMWxJR2hsYkhCbWRXd2dablZ1WTNScGIyNXpYRzVjZENBcVhHNWNkQ0FxSUVCMGVYQmxJSHRQWW1wbFkzUjlYRzVjZENBcUlFQnVZVzFsYzNCaFkyVWdRbUZ5WW1FdVZYUnBiSE5jYmx4MElDb3ZYRzVjZEhaaGNpQlZkR2xzY3lBOUlIdGNibHgwSUNBdktpcGNibHgwSUNBZ0tpQlNaWFIxY200Z2RHaGxJR04xY25KbGJuUWdkWEpzWEc1Y2RDQWdJQ3BjYmx4MElDQWdLaUJBYldWdFltVnlUMllnUW1GeVltRXVWWFJwYkhOY2JseDBJQ0FnS2lCQWNtVjBkWEp1SUh0VGRISnBibWQ5SUdOMWNuSmxiblJWY214Y2JseDBJQ0FnS2k5Y2JseDBJQ0JuWlhSRGRYSnlaVzUwVlhKc09pQm1kVzVqZEdsdmJpZ3BJSHRjYmx4MElDQWdJSEpsZEhWeWJpQjNhVzVrYjNjdWJHOWpZWFJwYjI0dWNISnZkRzlqYjJ3Z0t5QW5MeThuSUN0Y2JseDBJQ0FnSUNBZ0lDQWdJQ0IzYVc1a2IzY3ViRzlqWVhScGIyNHVhRzl6ZENBclhHNWNkQ0FnSUNBZ0lDQWdJQ0FnZDJsdVpHOTNMbXh2WTJGMGFXOXVMbkJoZEdodVlXMWxJQ3RjYmx4MElDQWdJQ0FnSUNBZ0lDQjNhVzVrYjNjdWJHOWpZWFJwYjI0dWMyVmhjbU5vTzF4dVhIUWdJSDBzWEc1Y2RGeHVYSFFnSUM4cUtseHVYSFFnSUNBcUlFZHBkbVZ1SUdGdUlIVnliQ3dnY21WMGRYSnVJR2wwSUhkcGRHaHZkWFFnZEdobElHaGhjMmhjYmx4MElDQWdLbHh1WEhRZ0lDQXFJRUJ0WlcxaVpYSlBaaUJDWVhKaVlTNVZkR2xzYzF4dVhIUWdJQ0FxSUVCd2NtbDJZWFJsWEc1Y2RDQWdJQ29nUUhCaGNtRnRJQ0I3VTNSeWFXNW5mU0IxY214Y2JseDBJQ0FnS2lCQWNtVjBkWEp1SUh0VGRISnBibWQ5SUc1bGQwTnNaV0Z1VlhKc1hHNWNkQ0FnSUNvdlhHNWNkQ0FnWTJ4bFlXNU1hVzVyT2lCbWRXNWpkR2x2YmloMWNtd3BJSHRjYmx4MElDQWdJSEpsZEhWeWJpQjFjbXd1Y21Wd2JHRmpaU2d2SXk0cUx5d2dKeWNwTzF4dVhIUWdJSDBzWEc1Y2RGeHVYSFFnSUM4cUtseHVYSFFnSUNBcUlGUnBiV1VnYVc0Z2JXbHNiR2x6WldOdmJtUWdZV1owWlhJZ2RHaGxJSGhvY2lCeVpYRjFaWE4wSUdkdlpYTWdhVzRnZEdsdFpXOTFkRnh1WEhRZ0lDQXFYRzVjZENBZ0lDb2dRRzFsYldKbGNrOW1JRUpoY21KaExsVjBhV3h6WEc1Y2RDQWdJQ29nUUhSNWNHVWdlMDUxYldKbGNuMWNibHgwSUNBZ0tpQkFaR1ZtWVhWc2RGeHVYSFFnSUNBcUwxeHVYSFFnSUhob2NsUnBiV1Z2ZFhRNklEVXdNREFzWEc1Y2RGeHVYSFFnSUM4cUtseHVYSFFnSUNBcUlGTjBZWEowSUdGdUlGaE5URWgwZEhCU1pYRjFaWE4wS0NrZ1lXNWtJSEpsZEhWeWJpQmhJRkJ5YjIxcGMyVmNibHgwSUNBZ0tseHVYSFFnSUNBcUlFQnRaVzFpWlhKUFppQkNZWEppWVM1VmRHbHNjMXh1WEhRZ0lDQXFJRUJ3WVhKaGJTQWdlMU4wY21sdVozMGdkWEpzWEc1Y2RDQWdJQ29nUUhKbGRIVnliaUI3VUhKdmJXbHpaWDFjYmx4MElDQWdLaTljYmx4MElDQjRhSEk2SUdaMWJtTjBhVzl1S0hWeWJDa2dlMXh1WEhRZ0lDQWdkbUZ5SUdSbFptVnljbVZrSUQwZ2RHaHBjeTVrWldabGNuSmxaQ2dwTzF4dVhIUWdJQ0FnZG1GeUlISmxjU0E5SUc1bGR5QllUVXhJZEhSd1VtVnhkV1Z6ZENncE8xeHVYSFJjYmx4MElDQWdJSEpsY1M1dmJuSmxZV1I1YzNSaGRHVmphR0Z1WjJVZ1BTQm1kVzVqZEdsdmJpZ3BJSHRjYmx4MElDQWdJQ0FnYVdZZ0tISmxjUzV5WldGa2VWTjBZWFJsSUQwOVBTQTBLU0I3WEc1Y2RDQWdJQ0FnSUNBZ2FXWWdLSEpsY1M1emRHRjBkWE1nUFQwOUlESXdNQ2tnZTF4dVhIUWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHUmxabVZ5Y21Wa0xuSmxjMjlzZG1Vb2NtVnhMbkpsYzNCdmJuTmxWR1Y0ZENrN1hHNWNkQ0FnSUNBZ0lDQWdmU0JsYkhObElIdGNibHgwSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJrWldabGNuSmxaQzV5WldwbFkzUW9ibVYzSUVWeWNtOXlLQ2Q0YUhJNklFaFVWRkFnWTI5a1pTQnBjeUJ1YjNRZ01qQXdKeWtwTzF4dVhIUWdJQ0FnSUNBZ0lIMWNibHgwSUNBZ0lDQWdmVnh1WEhRZ0lDQWdmVHRjYmx4MFhHNWNkQ0FnSUNCeVpYRXViMjUwYVcxbGIzVjBJRDBnWm5WdVkzUnBiMjRvS1NCN1hHNWNkQ0FnSUNBZ0lISmxkSFZ5YmlCa1pXWmxjbkpsWkM1eVpXcGxZM1FvYm1WM0lFVnljbTl5S0NkNGFISTZJRlJwYldWdmRYUWdaWGhqWldWa1pXUW5LU2s3WEc1Y2RDQWdJQ0I5TzF4dVhIUmNibHgwSUNBZ0lISmxjUzV2Y0dWdUtDZEhSVlFuTENCMWNtd3BPMXh1WEhRZ0lDQWdjbVZ4TG5ScGJXVnZkWFFnUFNCMGFHbHpMbmhvY2xScGJXVnZkWFE3WEc1Y2RDQWdJQ0J5WlhFdWMyVjBVbVZ4ZFdWemRFaGxZV1JsY2lnbmVDMWlZWEppWVNjc0lDZDVaWE1uS1R0Y2JseDBJQ0FnSUhKbGNTNXpaVzVrS0NrN1hHNWNkRnh1WEhRZ0lDQWdjbVYwZFhKdUlHUmxabVZ5Y21Wa0xuQnliMjFwYzJVN1hHNWNkQ0FnZlN4Y2JseDBYRzVjZENBZ0x5b3FYRzVjZENBZ0lDb2dSMlYwSUc5aWFpQmhibVFnY0hKdmNITWdZVzVrSUhKbGRIVnliaUJoSUc1bGR5QnZZbXBsWTNRZ2QybDBhQ0IwYUdVZ2NISnZjR1Z5ZEhrZ2JXVnlaMlZrWEc1Y2RDQWdJQ3BjYmx4MElDQWdLaUJBYldWdFltVnlUMllnUW1GeVltRXVWWFJwYkhOY2JseDBJQ0FnS2lCQWNHRnlZVzBnSUh0dlltcGxZM1I5SUc5aWFseHVYSFFnSUNBcUlFQndZWEpoYlNBZ2UyOWlhbVZqZEgwZ2NISnZjSE5jYmx4MElDQWdLaUJBY21WMGRYSnVJSHR2WW1wbFkzUjlYRzVjZENBZ0lDb3ZYRzVjZENBZ1pYaDBaVzVrT2lCbWRXNWpkR2x2Ymlodlltb3NJSEJ5YjNCektTQjdYRzVjZENBZ0lDQjJZWElnYm1WM1QySnFJRDBnVDJKcVpXTjBMbU55WldGMFpTaHZZbW9wTzF4dVhIUmNibHgwSUNBZ0lHWnZjaWgyWVhJZ2NISnZjQ0JwYmlCd2NtOXdjeWtnZTF4dVhIUWdJQ0FnSUNCcFppaHdjbTl3Y3k1b1lYTlBkMjVRY205d1pYSjBlU2h3Y205d0tTa2dlMXh1WEhRZ0lDQWdJQ0FnSUc1bGQwOWlhbHR3Y205d1hTQTlJSEJ5YjNCelczQnliM0JkTzF4dVhIUWdJQ0FnSUNCOVhHNWNkQ0FnSUNCOVhHNWNkRnh1WEhRZ0lDQWdjbVYwZFhKdUlHNWxkMDlpYWp0Y2JseDBJQ0I5TEZ4dVhIUmNibHgwSUNBdktpcGNibHgwSUNBZ0tpQlNaWFIxY200Z1lTQnVaWGNnWENKRVpXWmxjbkpsWkZ3aUlHOWlhbVZqZEZ4dVhIUWdJQ0FxSUdoMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZUVzk2YVd4c1lTOUtZWFpoVTJOeWFYQjBYMk52WkdWZmJXOWtkV3hsY3k5UWNtOXRhWE5sTG1wemJTOUVaV1psY25KbFpGeHVYSFFnSUNBcVhHNWNkQ0FnSUNvZ1FHMWxiV0psY2s5bUlFSmhjbUpoTGxWMGFXeHpYRzVjZENBZ0lDb2dRSEpsZEhWeWJpQjdSR1ZtWlhKeVpXUjlYRzVjZENBZ0lDb3ZYRzVjZENBZ1pHVm1aWEp5WldRNklHWjFibU4wYVc5dUtDa2dlMXh1WEhRZ0lDQWdjbVYwZFhKdUlHNWxkeUJtZFc1amRHbHZiaWdwSUh0Y2JseDBJQ0FnSUNBZ2RHaHBjeTV5WlhOdmJIWmxJRDBnYm5Wc2JEdGNibHgwSUNBZ0lDQWdkR2hwY3k1eVpXcGxZM1FnUFNCdWRXeHNPMXh1WEhSY2JseDBJQ0FnSUNBZ2RHaHBjeTV3Y205dGFYTmxJRDBnYm1WM0lGQnliMjFwYzJVb1puVnVZM1JwYjI0b2NtVnpiMngyWlN3Z2NtVnFaV04wS1NCN1hHNWNkQ0FnSUNBZ0lDQWdkR2hwY3k1eVpYTnZiSFpsSUQwZ2NtVnpiMngyWlR0Y2JseDBJQ0FnSUNBZ0lDQjBhR2x6TG5KbGFtVmpkQ0E5SUhKbGFtVmpkRHRjYmx4MElDQWdJQ0FnZlM1aWFXNWtLSFJvYVhNcEtUdGNibHgwSUNBZ0lIMDdYRzVjZENBZ2ZTeGNibHgwWEc1Y2RDQWdMeW9xWEc1Y2RDQWdJQ29nVW1WMGRYSnVJSFJvWlNCd2IzSjBJRzUxYldKbGNpQnViM0p0WVd4cGVtVmtMQ0JsZG1WdWRIVmhiR3g1SUhsdmRTQmpZVzRnY0dGemN5QmhJSE4wY21sdVp5QjBieUJpWlNCdWIzSnRZV3hwZW1Wa0xseHVYSFFnSUNBcVhHNWNkQ0FnSUNvZ1FHMWxiV0psY2s5bUlFSmhjbUpoTGxWMGFXeHpYRzVjZENBZ0lDb2dRSEJ5YVhaaGRHVmNibHgwSUNBZ0tpQkFjR0Z5WVcwZ0lIdFRkSEpwYm1kOUlIQmNibHgwSUNBZ0tpQkFjbVYwZFhKdUlIdEpiblI5SUhCdmNuUmNibHgwSUNBZ0tpOWNibHgwSUNCblpYUlFiM0owT2lCbWRXNWpkR2x2Ymlod0tTQjdYRzVjZENBZ0lDQjJZWElnY0c5eWRDQTlJSFI1Y0dWdlppQndJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5QS9JSEFnT2lCM2FXNWtiM2N1Ykc5allYUnBiMjR1Y0c5eWREdGNibHgwSUNBZ0lIWmhjaUJ3Y205MGIyTnZiQ0E5SUhkcGJtUnZkeTVzYjJOaGRHbHZiaTV3Y205MGIyTnZiRHRjYmx4MFhHNWNkQ0FnSUNCcFppQW9jRzl5ZENBaFBTQW5KeWxjYmx4MElDQWdJQ0FnY21WMGRYSnVJSEJoY25ObFNXNTBLSEJ2Y25RcE8xeHVYSFJjYmx4MElDQWdJR2xtSUNod2NtOTBiMk52YkNBOVBUMGdKMmgwZEhBNkp5bGNibHgwSUNBZ0lDQWdjbVYwZFhKdUlEZ3dPMXh1WEhSY2JseDBJQ0FnSUdsbUlDaHdjbTkwYjJOdmJDQTlQVDBnSjJoMGRIQnpPaWNwWEc1Y2RDQWdJQ0FnSUhKbGRIVnliaUEwTkRNN1hHNWNkQ0FnZlZ4dVhIUjlPMXh1WEhSY2JseDBiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQlZkR2xzY3p0Y2JseHVYRzR2S2lvcUx5QjlMRnh1THlvZ05pQXFMMXh1THlvcUtpOGdablZ1WTNScGIyNG9iVzlrZFd4bExDQmxlSEJ2Y25SekxDQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLU0I3WEc1Y2JseDBkbUZ5SUVScGMzQmhkR05vWlhJZ1BTQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLRGNwTzF4dVhIUjJZWElnVlhScGJITWdQU0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0RVcE8xeHVYSFJjYmx4MEx5b3FYRzVjZENBcUlFSmhjMlZXYVdWM0lIUnZJR0psSUdWNGRHVnVaR1ZrWEc1Y2RDQXFYRzVjZENBcUlFQnVZVzFsYzNCaFkyVWdRbUZ5WW1FdVFtRnpaVlpwWlhkY2JseDBJQ29nUUhSNWNHVWdlMDlpYW1WamRIMWNibHgwSUNvdlhHNWNkSFpoY2lCQ1lYTmxWbWxsZHlBZ1BTQjdYRzVjZENBZ0x5b3FYRzVjZENBZ0lDb2dUbUZ0WlhOd1lXTmxJRzltSUhSb1pTQjJhV1YzTGx4dVhIUWdJQ0FxSUNodVpXVmtJSFJ2SUdKbElHRnpjMjlqYVdGMFpXUWdkMmwwYUNCMGFHVWdaR0YwWVMxdVlXMWxjM0JoWTJVZ2IyWWdkR2hsSUdOdmJuUmhhVzVsY2lsY2JseDBJQ0FnS2x4dVhIUWdJQ0FxSUVCdFpXMWlaWEpQWmlCQ1lYSmlZUzVDWVhObFZtbGxkMXh1WEhRZ0lDQXFJRUIwZVhCbElIdFRkSEpwYm1kOVhHNWNkQ0FnSUNvdlhHNWNkQ0FnYm1GdFpYTndZV05sT2lCdWRXeHNMRnh1WEhSY2JseDBJQ0F2S2lwY2JseDBJQ0FnS2lCSVpXeHdaWElnZEc4Z1pYaDBaVzVrSUhSb1pTQnZZbXBsWTNSY2JseDBJQ0FnS2x4dVhIUWdJQ0FxSUVCdFpXMWlaWEpQWmlCQ1lYSmlZUzVDWVhObFZtbGxkMXh1WEhRZ0lDQXFJRUJ3WVhKaGJTQWdlMDlpYW1WamRIMGdibVYzVDJKcVpXTjBYRzVjZENBZ0lDb2dRSEpsZEhWeWJpQjdUMkpxWldOMGZTQnVaWGRKYm1obGNtbDBUMkpxWldOMFhHNWNkQ0FnSUNvdlhHNWNkQ0FnWlhoMFpXNWtPaUJtZFc1amRHbHZiaWh2WW1vcGUxeHVYSFFnSUNBZ2NtVjBkWEp1SUZWMGFXeHpMbVY0ZEdWdVpDaDBhR2x6TENCdlltb3BPMXh1WEhRZ0lIMHNYRzVjZEZ4dVhIUWdJQzhxS2x4dVhIUWdJQ0FxSUVsdWFYUWdkR2hsSUhacFpYY3VYRzVjZENBZ0lDb2dVQzVUTGlCSmN5QnpkV2RuWlhOMFpXUWdkRzhnYVc1cGRDQjBhR1VnZG1sbGR5QmlaV1p2Y21VZ2MzUmhjblJwYm1jZ1FtRnlZbUV1VUdwaGVDNXpkR0Z5ZENncExGeHVYSFFnSUNBcUlHbHVJSFJvYVhNZ2QyRjVJQzV2YmtWdWRHVnlLQ2tnWVc1a0lDNXZia1Z1ZEdWeVEyOXRjR3hsZEdWa0tDa2dkMmxzYkNCaVpTQm1hWEpsWkNCbWIzSWdkR2hsSUdOMWNuSmxiblJjYmx4MElDQWdLaUJqYjI1MFlXbHVaWElnZDJobGJpQjBhR1VnY0dGblpTQnBjeUJzYjJGa1pXUXVYRzVjZENBZ0lDcGNibHgwSUNBZ0tpQkFiV1Z0WW1WeVQyWWdRbUZ5WW1FdVFtRnpaVlpwWlhkY2JseDBJQ0FnS2k5Y2JseDBJQ0JwYm1sME9pQm1kVzVqZEdsdmJpZ3BJSHRjYmx4MElDQWdJSFpoY2lCZmRHaHBjeUE5SUhSb2FYTTdYRzVjZEZ4dVhIUWdJQ0FnUkdsemNHRjBZMmhsY2k1dmJpZ25hVzVwZEZOMFlYUmxRMmhoYm1kbEp5eGNibHgwSUNBZ0lDQWdablZ1WTNScGIyNG9ibVYzVTNSaGRIVnpMQ0J2YkdSVGRHRjBkWE1wSUh0Y2JseDBJQ0FnSUNBZ0lDQnBaaUFvYjJ4a1UzUmhkSFZ6SUNZbUlHOXNaRk4wWVhSMWN5NXVZVzFsYzNCaFkyVWdQVDA5SUY5MGFHbHpMbTVoYldWemNHRmpaU2xjYmx4MElDQWdJQ0FnSUNBZ0lGOTBhR2x6TG05dVRHVmhkbVVvS1R0Y2JseDBJQ0FnSUNBZ2ZWeHVYSFFnSUNBZ0tUdGNibHgwWEc1Y2RDQWdJQ0JFYVhOd1lYUmphR1Z5TG05dUtDZHVaWGRRWVdkbFVtVmhaSGtuTEZ4dVhIUWdJQ0FnSUNCbWRXNWpkR2x2YmlodVpYZFRkR0YwZFhNc0lHOXNaRk4wWVhSMWN5d2dZMjl1ZEdGcGJtVnlLU0I3WEc1Y2RDQWdJQ0FnSUNBZ1gzUm9hWE11WTI5dWRHRnBibVZ5SUQwZ1kyOXVkR0ZwYm1WeU8xeHVYSFJjYmx4MElDQWdJQ0FnSUNCcFppQW9ibVYzVTNSaGRIVnpMbTVoYldWemNHRmpaU0E5UFQwZ1gzUm9hWE11Ym1GdFpYTndZV05sS1Z4dVhIUWdJQ0FnSUNBZ0lDQWdYM1JvYVhNdWIyNUZiblJsY2lncE8xeHVYSFFnSUNBZ0lDQjlYRzVjZENBZ0lDQXBPMXh1WEhSY2JseDBJQ0FnSUVScGMzQmhkR05vWlhJdWIyNG9KM1J5WVc1emFYUnBiMjVEYjIxd2JHVjBaV1FuTEZ4dVhIUWdJQ0FnSUNCbWRXNWpkR2x2YmlodVpYZFRkR0YwZFhNc0lHOXNaRk4wWVhSMWN5a2dlMXh1WEhRZ0lDQWdJQ0FnSUdsbUlDaHVaWGRUZEdGMGRYTXVibUZ0WlhOd1lXTmxJRDA5UFNCZmRHaHBjeTV1WVcxbGMzQmhZMlVwWEc1Y2RDQWdJQ0FnSUNBZ0lDQmZkR2hwY3k1dmJrVnVkR1Z5UTI5dGNHeGxkR1ZrS0NrN1hHNWNkRnh1WEhRZ0lDQWdJQ0FnSUdsbUlDaHZiR1JUZEdGMGRYTWdKaVlnYjJ4a1UzUmhkSFZ6TG01aGJXVnpjR0ZqWlNBOVBUMGdYM1JvYVhNdWJtRnRaWE53WVdObEtWeHVYSFFnSUNBZ0lDQWdJQ0FnWDNSb2FYTXViMjVNWldGMlpVTnZiWEJzWlhSbFpDZ3BPMXh1WEhRZ0lDQWdJQ0I5WEc1Y2RDQWdJQ0FwTzF4dVhIUWdJSDBzWEc1Y2RGeHVYSFFnTHlvcVhHNWNkQ0FnS2lCVWFHbHpJR1oxYm1OMGFXOXVJSGRwYkd3Z1ltVWdabWx5WldRZ2QyaGxiaUIwYUdVZ1kyOXVkR0ZwYm1WeVhHNWNkQ0FnS2lCcGN5QnlaV0ZrZVNCaGJtUWdZWFIwWVdOb1pXUWdkRzhnZEdobElFUlBUUzVjYmx4MElDQXFYRzVjZENBZ0tpQkFiV1Z0WW1WeVQyWWdRbUZ5WW1FdVFtRnpaVlpwWlhkY2JseDBJQ0FxSUVCaFluTjBjbUZqZEZ4dVhIUWdJQ292WEc1Y2RDQWdiMjVGYm5SbGNqb2dablZ1WTNScGIyNG9LU0I3ZlN4Y2JseDBYRzVjZENBZ0x5b3FYRzVjZENBZ0lDb2dWR2hwY3lCbWRXNWpkR2x2YmlCM2FXeHNJR0psSUdacGNtVmtJSGRvWlc0Z2RHaGxJSFJ5WVc1emFYUnBiMjVjYmx4MElDQWdLaUIwYnlCMGFHbHpJR052Ym5SaGFXNWxjaUJvWVhNZ2FuVnpkQ0JtYVc1cGMyaGxaQzVjYmx4MElDQWdLbHh1WEhRZ0lDQXFJRUJ0WlcxaVpYSlBaaUJDWVhKaVlTNUNZWE5sVm1sbGQxeHVYSFFnSUNBcUlFQmhZbk4wY21GamRGeHVYSFFnSUNBcUwxeHVYSFFnSUc5dVJXNTBaWEpEYjIxd2JHVjBaV1E2SUdaMWJtTjBhVzl1S0NrZ2UzMHNYRzVjZEZ4dVhIUWdJQzhxS2x4dVhIUWdJQ0FxSUZSb2FYTWdablZ1WTNScGIyNGdkMmxzYkNCaVpTQm1hWEpsWkNCM2FHVnVJSFJvWlNCMGNtRnVjMmwwYVc5dVhHNWNkQ0FnSUNvZ2RHOGdZU0J1WlhjZ1kyOXVkR0ZwYm1WeUlHaGhjeUJxZFhOMElITjBZWEowWldRdVhHNWNkQ0FnSUNwY2JseDBJQ0FnS2lCQWJXVnRZbVZ5VDJZZ1FtRnlZbUV1UW1GelpWWnBaWGRjYmx4MElDQWdLaUJBWVdKemRISmhZM1JjYmx4MElDQWdLaTljYmx4MElDQnZia3hsWVhabE9pQm1kVzVqZEdsdmJpZ3BJSHQ5TEZ4dVhIUmNibHgwSUNBdktpcGNibHgwSUNBZ0tpQlVhR2x6SUdaMWJtTjBhVzl1SUhkcGJHd2dZbVVnWm1seVpXUWdkMmhsYmlCMGFHVWdZMjl1ZEdGcGJtVnlYRzVjZENBZ0lDb2dhR0Z6SUdwMWMzUWdZbVZsYmlCeVpXMXZkbVZrSUdaeWIyMGdkR2hsSUVSUFRTNWNibHgwSUNBZ0tseHVYSFFnSUNBcUlFQnRaVzFpWlhKUFppQkNZWEppWVM1Q1lYTmxWbWxsZDF4dVhIUWdJQ0FxSUVCaFluTjBjbUZqZEZ4dVhIUWdJQ0FxTDF4dVhIUWdJRzl1VEdWaGRtVkRiMjF3YkdWMFpXUTZJR1oxYm1OMGFXOXVLQ2tnZTMxY2JseDBmVnh1WEhSY2JseDBiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQkNZWE5sVm1sbGR6dGNibHh1WEc0dktpb3FMeUI5TEZ4dUx5b2dOeUFxTDF4dUx5b3FLaThnWm5WdVkzUnBiMjRvYlc5a2RXeGxMQ0JsZUhCdmNuUnpLU0I3WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRXhwZEhSc1pTQkVhWE53WVhSamFHVnlJR2x1YzNCcGNtVmtJR0o1SUUxcFkzSnZSWFpsYm5RdWFuTmNibHgwSUNwY2JseDBJQ29nUUc1aGJXVnpjR0ZqWlNCQ1lYSmlZUzVFYVhOd1lYUmphR1Z5WEc1Y2RDQXFJRUIwZVhCbElIdFBZbXBsWTNSOVhHNWNkQ0FxTDF4dVhIUjJZWElnUkdsemNHRjBZMmhsY2lBOUlIdGNibHgwSUNBdktpcGNibHgwSUNBZ0tpQlBZbXBsWTNRZ2RHaGhkQ0JyWldWd2N5QmhiR3dnZEdobElHVjJaVzUwYzF4dVhIUWdJQ0FxWEc1Y2RDQWdJQ29nUUcxbGJXSmxjazltSUVKaGNtSmhMa1JwYzNCaGRHTm9aWEpjYmx4MElDQWdLaUJBY21WaFpFOXViSGxjYmx4MElDQWdLaUJBZEhsd1pTQjdUMkpxWldOMGZWeHVYSFFnSUNBcUwxeHVYSFFnSUdWMlpXNTBjem9nZTMwc1hHNWNkRnh1WEhRZ0lDOHFLbHh1WEhRZ0lDQXFJRUpwYm1RZ1lTQmpZV3hzWW1GamF5QjBieUJoYmlCbGRtVnVkRnh1WEhRZ0lDQXFYRzVjZENBZ0lDb2dRRzFsYldKbGNrOW1JRUpoY21KaExrUnBjM0JoZEdOb1pYSmNibHgwSUNBZ0tpQkFjR0Z5WVcwZ0lIdFRkSEpwYm1kOUlHVjJaVzUwVG1GdFpWeHVYSFFnSUNBcUlFQndZWEpoYlNBZ2UwWjFibU4wYVc5dWZTQm1kVzVqZEdsdmJseHVYSFFnSUNBcUwxeHVYSFFnSUc5dU9pQm1kVzVqZEdsdmJpaGxMQ0JtS1NCN1hHNWNkQ0FnSUNCMGFHbHpMbVYyWlc1MGMxdGxYU0E5SUhSb2FYTXVaWFpsYm5SelcyVmRJSHg4SUZ0ZE8xeHVYSFFnSUNBZ2RHaHBjeTVsZG1WdWRITmJaVjB1Y0hWemFDaG1LVHRjYmx4MElDQjlMRnh1WEhSY2JseDBJQ0F2S2lwY2JseDBJQ0FnS2lCVmJtSnBibVFnWlhabGJuUmNibHgwSUNBZ0tseHVYSFFnSUNBcUlFQnRaVzFpWlhKUFppQkNZWEppWVM1RWFYTndZWFJqYUdWeVhHNWNkQ0FnSUNvZ1FIQmhjbUZ0SUNCN1UzUnlhVzVuZlNCbGRtVnVkRTVoYldWY2JseDBJQ0FnS2lCQWNHRnlZVzBnSUh0R2RXNWpkR2x2Ym4wZ1puVnVZM1JwYjI1Y2JseDBJQ0FnS2k5Y2JseDBJQ0J2Wm1ZNklHWjFibU4wYVc5dUtHVXNJR1lwSUh0Y2JseDBJQ0FnSUdsbUtHVWdhVzRnZEdocGN5NWxkbVZ1ZEhNZ1BUMDlJR1poYkhObEtWeHVYSFFnSUNBZ0lDQnlaWFIxY200N1hHNWNkRnh1WEhRZ0lDQWdkR2hwY3k1bGRtVnVkSE5iWlYwdWMzQnNhV05sS0hSb2FYTXVaWFpsYm5SelcyVmRMbWx1WkdWNFQyWW9aaWtzSURFcE8xeHVYSFFnSUgwc1hHNWNkRnh1WEhRZ0lDOHFLbHh1WEhRZ0lDQXFJRVpwY21VZ2RHaGxJR1YyWlc1MElISjFibTVwYm1jZ1lXeHNJSFJvWlNCbGRtVnVkQ0JoYzNOdlkybGhkR1ZrSUhSdklHbDBYRzVjZENBZ0lDcGNibHgwSUNBZ0tpQkFiV1Z0WW1WeVQyWWdRbUZ5WW1FdVJHbHpjR0YwWTJobGNseHVYSFFnSUNBcUlFQndZWEpoYlNBZ2UxTjBjbWx1WjMwZ1pYWmxiblJPWVcxbFhHNWNkQ0FnSUNvZ1FIQmhjbUZ0SUNCN0xpNHVLbjBnWVhKbmMxeHVYSFFnSUNBcUwxeHVYSFFnSUhSeWFXZG5aWEk2SUdaMWJtTjBhVzl1S0dVcElIc3ZMMlVzSUM0dUxtRnlaM05jYmx4MElDQWdJR2xtSUNobElHbHVJSFJvYVhNdVpYWmxiblJ6SUQwOVBTQm1ZV3h6WlNsY2JseDBJQ0FnSUNBZ2NtVjBkWEp1TzF4dVhIUmNibHgwSUNBZ0lHWnZjaWgyWVhJZ2FTQTlJREE3SUdrZ1BDQjBhR2x6TG1WMlpXNTBjMXRsWFM1c1pXNW5kR2c3SUdrckt5bDdYRzVjZENBZ0lDQWdJSFJvYVhNdVpYWmxiblJ6VzJWZFcybGRMbUZ3Y0d4NUtIUm9hWE1zSUVGeWNtRjVMbkJ5YjNSdmRIbHdaUzV6YkdsalpTNWpZV3hzS0dGeVozVnRaVzUwY3l3Z01Ta3BPMXh1WEhRZ0lDQWdmVnh1WEhRZ0lIMWNibHgwZlR0Y2JseDBYRzVjZEcxdlpIVnNaUzVsZUhCdmNuUnpJRDBnUkdsemNHRjBZMmhsY2p0Y2JseHVYRzR2S2lvcUx5QjlMRnh1THlvZ09DQXFMMXh1THlvcUtpOGdablZ1WTNScGIyNG9iVzlrZFd4bExDQmxlSEJ2Y25SekxDQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLU0I3WEc1Y2JseDBkbUZ5SUZWMGFXeHpJRDBnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlnMUtUdGNibHgwWEc1Y2RDOHFLbHh1WEhRZ0tpQkNZWE5sUTJGamFHVWdhWFFuY3lCaElITnBiWEJzWlNCemRHRjBhV01nWTJGamFHVmNibHgwSUNwY2JseDBJQ29nUUc1aGJXVnpjR0ZqWlNCQ1lYSmlZUzVDWVhObFEyRmphR1ZjYmx4MElDb2dRSFI1Y0dVZ2UwOWlhbVZqZEgxY2JseDBJQ292WEc1Y2RIWmhjaUJDWVhObFEyRmphR1VnUFNCN1hHNWNkQ0FnTHlvcVhHNWNkQ0FnSUNvZ1ZHaGxJRTlpYW1WamRDQjBhR0YwSUd0bFpYQnpJR0ZzYkNCMGFHVWdhMlY1SUhaaGJIVmxJR2x1Wm05eWJXRjBhVzl1WEc1Y2RDQWdJQ3BjYmx4MElDQWdLaUJBYldWdFltVnlUMllnUW1GeVltRXVRbUZ6WlVOaFkyaGxYRzVjZENBZ0lDb2dRSFI1Y0dVZ2UwOWlhbVZqZEgxY2JseDBJQ0FnS2k5Y2JseDBJQ0JrWVhSaE9pQjdmU3hjYmx4MFhHNWNkQ0FnTHlvcVhHNWNkQ0FnSUNvZ1NHVnNjR1Z5SUhSdklHVjRkR1Z1WkNCMGFHbHpJRzlpYW1WamRGeHVYSFFnSUNBcVhHNWNkQ0FnSUNvZ1FHMWxiV0psY2s5bUlFSmhjbUpoTGtKaGMyVkRZV05vWlZ4dVhIUWdJQ0FxSUVCd2NtbDJZWFJsWEc1Y2RDQWdJQ29nUUhCaGNtRnRJQ0I3VDJKcVpXTjBmU0J1WlhkUFltcGxZM1JjYmx4MElDQWdLaUJBY21WMGRYSnVJSHRQWW1wbFkzUjlJRzVsZDBsdWFHVnlhWFJQWW1wbFkzUmNibHgwSUNBZ0tpOWNibHgwSUNCbGVIUmxibVE2SUdaMWJtTjBhVzl1S0c5aWFpa2dlMXh1WEhRZ0lDQWdjbVYwZFhKdUlGVjBhV3h6TG1WNGRHVnVaQ2gwYUdsekxDQnZZbW9wTzF4dVhIUWdJSDBzWEc1Y2RGeHVYSFFnSUM4cUtseHVYSFFnSUNBcUlGTmxkQ0JoSUd0bGVTQmhibVFnZG1Gc2RXVWdaR0YwWVN3Z2JXRnBibXg1SUVKaGNtSmhJR2x6SUdkdmFXNW5JSFJ2SUhOaGRtVWdjSEp2YldselpYTmNibHgwSUNBZ0tseHVYSFFnSUNBcUlFQnRaVzFpWlhKUFppQkNZWEppWVM1Q1lYTmxRMkZqYUdWY2JseDBJQ0FnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnYTJWNVhHNWNkQ0FnSUNvZ1FIQmhjbUZ0SUhzcWZTQjJZV3gxWlZ4dVhIUWdJQ0FxTDF4dVhIUWdJSE5sZERvZ1puVnVZM1JwYjI0b2EyVjVMQ0IyWVd3cElIdGNibHgwSUNBZ0lIUm9hWE11WkdGMFlWdHJaWGxkSUQwZ2RtRnNPMXh1WEhRZ0lIMHNYRzVjZEZ4dVhIUWdJQzhxS2x4dVhIUWdJQ0FxSUZKbGRISnBaWFpsSUhSb1pTQmtZWFJoSUhWemFXNW5JSFJvWlNCclpYbGNibHgwSUNBZ0tseHVYSFFnSUNBcUlFQnRaVzFpWlhKUFppQkNZWEppWVM1Q1lYTmxRMkZqYUdWY2JseDBJQ0FnS2lCQWNHRnlZVzBnSUh0VGRISnBibWQ5SUd0bGVWeHVYSFFnSUNBcUlFQnlaWFIxY200Z2V5cDlYRzVjZENBZ0lDb3ZYRzVjZENBZ1oyVjBPaUJtZFc1amRHbHZiaWhyWlhrcElIdGNibHgwSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbVJoZEdGYmEyVjVYVHRjYmx4MElDQjlMRnh1WEhSY2JseDBJQ0F2S2lwY2JseDBJQ0FnS2lCR2JIVnphQ0IwYUdVZ1kyRmphR1ZjYmx4MElDQWdLbHh1WEhRZ0lDQXFJRUJ0WlcxaVpYSlBaaUJDWVhKaVlTNUNZWE5sUTJGamFHVmNibHgwSUNBZ0tpOWNibHgwSUNCeVpYTmxkRG9nWm5WdVkzUnBiMjRvS1NCN1hHNWNkQ0FnSUNCMGFHbHpMbVJoZEdFZ1BTQjdmVHRjYmx4MElDQjlYRzVjZEgwN1hHNWNkRnh1WEhSdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUVKaGMyVkRZV05vWlR0Y2JseHVYRzR2S2lvcUx5QjlMRnh1THlvZ09TQXFMMXh1THlvcUtpOGdablZ1WTNScGIyNG9iVzlrZFd4bExDQmxlSEJ2Y25SektTQjdYRzVjYmx4MEx5b3FYRzVjZENBcUlFaHBjM1J2Y25sTllXNWhaMlZ5SUdobGJIQnpJSFJ2SUd0bFpYQWdkSEpoWTJzZ2IyWWdkR2hsSUc1aGRtbG5ZWFJwYjI1Y2JseDBJQ3BjYmx4MElDb2dRRzVoYldWemNHRmpaU0JDWVhKaVlTNUlhWE4wYjNKNVRXRnVZV2RsY2x4dVhIUWdLaUJBZEhsd1pTQjdUMkpxWldOMGZWeHVYSFFnS2k5Y2JseDBkbUZ5SUVocGMzUnZjbmxOWVc1aFoyVnlJRDBnZTF4dVhIUWdJQzhxS2x4dVhIUWdJQ0FxSUV0bFpYQWdkSEpoWTJzZ2IyWWdkR2hsSUhOMFlYUjFjeUJwYmlCb2FYTjBiM0pwWXlCdmNtUmxjbHh1WEhRZ0lDQXFYRzVjZENBZ0lDb2dRRzFsYldKbGNrOW1JRUpoY21KaExraHBjM1J2Y25sTllXNWhaMlZ5WEc1Y2RDQWdJQ29nUUhKbFlXUlBibXg1WEc1Y2RDQWdJQ29nUUhSNWNHVWdlMEZ5Y21GNWZWeHVYSFFnSUNBcUwxeHVYSFFnSUdocGMzUnZjbms2SUZ0ZExGeHVYSFJjYmx4MElDQXZLaXBjYmx4MElDQWdLaUJCWkdRZ1lTQnVaWGNnYzJWMElHOW1JSFZ5YkNCaGJtUWdibUZ0WlhOd1lXTmxYRzVjZENBZ0lDcGNibHgwSUNBZ0tpQkFiV1Z0WW1WeVQyWWdRbUZ5WW1FdVNHbHpkRzl5ZVUxaGJtRm5aWEpjYmx4MElDQWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdkWEpzWEc1Y2RDQWdJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJRzVoYldWemNHRmpaVnh1WEhRZ0lDQXFJRUJ3Y21sMllYUmxYRzVjZENBZ0lDb3ZYRzVjZENBZ1lXUmtPaUJtZFc1amRHbHZiaWgxY213c0lHNWhiV1Z6Y0dGalpTa2dlMXh1WEhRZ0lDQWdhV1lnS0NGdVlXMWxjM0JoWTJVcFhHNWNkQ0FnSUNBZ0lHNWhiV1Z6Y0dGalpTQTlJSFZ1WkdWbWFXNWxaRHRjYmx4MFhHNWNkQ0FnSUNCMGFHbHpMbWhwYzNSdmNua3VjSFZ6YUNoN1hHNWNkQ0FnSUNBZ0lIVnliRG9nZFhKc0xGeHVYSFFnSUNBZ0lDQnVZVzFsYzNCaFkyVTZJRzVoYldWemNHRmpaVnh1WEhRZ0lDQWdmU2s3WEc1Y2RDQWdmU3hjYmx4MFhHNWNkQ0FnTHlvcVhHNWNkQ0FnSUNvZ1VtVjBkWEp1SUdsdVptOXliV0YwYVc5dUlHRmliM1YwSUhSb1pTQmpkWEp5Wlc1MElITjBZWFIxYzF4dVhIUWdJQ0FxWEc1Y2RDQWdJQ29nUUcxbGJXSmxjazltSUVKaGNtSmhMa2hwYzNSdmNubE5ZVzVoWjJWeVhHNWNkQ0FnSUNvZ1FISmxkSFZ5YmlCN1QySnFaV04wZlZ4dVhIUWdJQ0FxTDF4dVhIUWdJR04xY25KbGJuUlRkR0YwZFhNNklHWjFibU4wYVc5dUtDa2dlMXh1WEhRZ0lDQWdjbVYwZFhKdUlIUm9hWE11YUdsemRHOXllVnQwYUdsekxtaHBjM1J2Y25rdWJHVnVaM1JvSUMwZ01WMDdYRzVjZENBZ2ZTeGNibHgwWEc1Y2RDQWdMeW9xWEc1Y2RDQWdJQ29nVW1WMGRYSnVJR2x1Wm05eWJXRjBhVzl1SUdGaWIzVjBJSFJvWlNCd2NtVjJhVzkxY3lCemRHRjBkWE5jYmx4MElDQWdLbHh1WEhRZ0lDQXFJRUJ0WlcxaVpYSlBaaUJDWVhKaVlTNUlhWE4wYjNKNVRXRnVZV2RsY2x4dVhIUWdJQ0FxSUVCeVpYUjFjbTRnZTA5aWFtVmpkSDFjYmx4MElDQWdLaTljYmx4MElDQndjbVYyVTNSaGRIVnpPaUJtZFc1amRHbHZiaWdwSUh0Y2JseDBJQ0FnSUhaaGNpQm9hWE4wYjNKNUlEMGdkR2hwY3k1b2FYTjBiM0o1TzF4dVhIUmNibHgwSUNBZ0lHbG1JQ2hvYVhOMGIzSjVMbXhsYm1kMGFDQThJRElwWEc1Y2RDQWdJQ0FnSUhKbGRIVnliaUJ1ZFd4c08xeHVYSFJjYmx4MElDQWdJSEpsZEhWeWJpQm9hWE4wYjNKNVcyaHBjM1J2Y25rdWJHVnVaM1JvSUMwZ01sMDdYRzVjZENBZ2ZWeHVYSFI5TzF4dVhIUmNibHgwYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0JJYVhOMGIzSjVUV0Z1WVdkbGNqdGNibHh1WEc0dktpb3FMeUI5TEZ4dUx5b2dNVEFnS2k5Y2JpOHFLaW92SUdaMWJtTjBhVzl1S0cxdlpIVnNaU3dnWlhod2IzSjBjeXdnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlrZ2UxeHVYRzVjZEhaaGNpQlZkR2xzY3lBOUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9OU2s3WEc1Y2RIWmhjaUJFYVhOd1lYUmphR1Z5SUQwZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5ZzNLVHRjYmx4MGRtRnlJRWhwWkdWVGFHOTNWSEpoYm5OcGRHbHZiaUE5SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b01URXBPMXh1WEhSMllYSWdRbUZ6WlVOaFkyaGxJRDBnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlnNEtUdGNibHgwWEc1Y2RIWmhjaUJJYVhOMGIzSjVUV0Z1WVdkbGNpQTlJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvT1NrN1hHNWNkSFpoY2lCRWIyMGdQU0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0RFeUtUdGNibHgwWEc1Y2RDOHFLbHh1WEhRZ0tpQlFhbUY0SUdseklHRWdjM1JoZEdsaklHOWlhbVZqZENCM2FYUm9JRzFoYVc0Z1puVnVZM1JwYjI1Y2JseDBJQ3BjYmx4MElDb2dRRzVoYldWemNHRmpaU0JDWVhKaVlTNVFhbUY0WEc1Y2RDQXFJRUJpYjNKeWIzZHpJRVJ2YlNCaGN5QkViMjFjYmx4MElDb2dRSFI1Y0dVZ2UwOWlhbVZqZEgxY2JseDBJQ292WEc1Y2RIWmhjaUJRYW1GNElEMGdlMXh1WEhRZ0lFUnZiVG9nUkc5dExGeHVYSFFnSUVocGMzUnZjbms2SUVocGMzUnZjbmxOWVc1aFoyVnlMRnh1WEhRZ0lFTmhZMmhsT2lCQ1lYTmxRMkZqYUdVc1hHNWNkRnh1WEhRZ0lDOHFLbHh1WEhRZ0lDQXFJRWx1WkdsallYUmxJSGRsZEdobGNpQnZjaUJ1YjNRZ2RYTmxJSFJvWlNCallXTm9aVnh1WEhRZ0lDQXFYRzVjZENBZ0lDb2dRRzFsYldKbGNrOW1JRUpoY21KaExsQnFZWGhjYmx4MElDQWdLaUJBZEhsd1pTQjdRbTl2YkdWaGJuMWNibHgwSUNBZ0tpQkFaR1ZtWVhWc2RGeHVYSFFnSUNBcUwxeHVYSFFnSUdOaFkyaGxSVzVoWW14bFpEb2dkSEoxWlN4Y2JseDBYRzVjZENBZ0x5b3FYRzVjZENBZ0lDb2dTVzVrYVdOaGRHVWdhV1lnZEdobGNtVWdhWE1nWVc0Z1lXNXBiV0YwYVc5dUlHbHVJSEJ5YjJkeVpYTnpYRzVjZENBZ0lDcGNibHgwSUNBZ0tpQkFiV1Z0WW1WeVQyWWdRbUZ5WW1FdVVHcGhlRnh1WEhRZ0lDQXFJRUJ5WldGa1QyNXNlVnh1WEhRZ0lDQXFJRUIwZVhCbElIdENiMjlzWldGdWZWeHVYSFFnSUNBcUwxeHVYSFFnSUhSeVlXNXphWFJwYjI1UWNtOW5jbVZ6Y3pvZ1ptRnNjMlVzWEc1Y2RGeHVYSFFnSUM4cUtseHVYSFFnSUNBcUlFTnNZWE56SUc1aGJXVWdkWE5sWkNCMGJ5QnBaMjV2Y21VZ2JHbHVhM05jYmx4MElDQWdLbHh1WEhRZ0lDQXFJRUJ0WlcxaVpYSlBaaUJDWVhKaVlTNVFhbUY0WEc1Y2RDQWdJQ29nUUhSNWNHVWdlMU4wY21sdVozMWNibHgwSUNBZ0tpQkFaR1ZtWVhWc2RGeHVYSFFnSUNBcUwxeHVYSFFnSUdsbmJtOXlaVU5zWVhOelRHbHVhem9nSjI1dkxXSmhjbUpoSnl4Y2JseDBYRzVjZENBZ0x5b3FYRzVjZENBZ0lDb2dSblZ1WTNScGIyNGdkRzhnWW1VZ1kyRnNiR1ZrSUhSdklITjBZWEowSUZCcVlYaGNibHgwSUNBZ0tseHVYSFFnSUNBcUlFQnRaVzFpWlhKUFppQkNZWEppWVM1UWFtRjRYRzVjZENBZ0lDb3ZYRzVjZENBZ2MzUmhjblE2SUdaMWJtTjBhVzl1S0NrZ2UxeHVYSFFnSUNBZ2RHaHBjeTVwYm1sMEtDazdYRzVjZENBZ2ZTeGNibHgwWEc1Y2RDQWdMeW9xWEc1Y2RDQWdJQ29nU1c1cGRDQjBhR1VnWlhabGJuUnpYRzVjZENBZ0lDcGNibHgwSUNBZ0tpQkFiV1Z0WW1WeVQyWWdRbUZ5WW1FdVVHcGhlRnh1WEhRZ0lDQXFJRUJ3Y21sMllYUmxYRzVjZENBZ0lDb3ZYRzVjZENBZ2FXNXBkRG9nWm5WdVkzUnBiMjRvS1NCN1hHNWNkQ0FnSUNCMllYSWdZMjl1ZEdGcGJtVnlJRDBnZEdocGN5NUViMjB1WjJWMFEyOXVkR0ZwYm1WeUtDazdYRzVjZENBZ0lDQjJZWElnZDNKaGNIQmxjaUE5SUhSb2FYTXVSRzl0TG1kbGRGZHlZWEJ3WlhJb0tUdGNibHgwWEc1Y2RDQWdJQ0IzY21Gd2NHVnlMbk5sZEVGMGRISnBZblYwWlNnbllYSnBZUzFzYVhabEp5d2dKM0J2YkdsMFpTY3BPMXh1WEhSY2JseDBJQ0FnSUhSb2FYTXVTR2x6ZEc5eWVTNWhaR1FvWEc1Y2RDQWdJQ0FnSUhSb2FYTXVaMlYwUTNWeWNtVnVkRlZ5YkNncExGeHVYSFFnSUNBZ0lDQjBhR2x6TGtSdmJTNW5aWFJPWVcxbGMzQmhZMlVvWTI5dWRHRnBibVZ5S1Z4dVhIUWdJQ0FnS1R0Y2JseDBYRzVjZENBZ0lDQXZMMFpwY21VZ1ptOXlJSFJvWlNCamRYSnlaVzUwSUhacFpYY3VYRzVjZENBZ0lDQkVhWE53WVhSamFHVnlMblJ5YVdkblpYSW9KMmx1YVhSVGRHRjBaVU5vWVc1blpTY3NJSFJvYVhNdVNHbHpkRzl5ZVM1amRYSnlaVzUwVTNSaGRIVnpLQ2twTzF4dVhIUWdJQ0FnUkdsemNHRjBZMmhsY2k1MGNtbG5aMlZ5S0NkdVpYZFFZV2RsVW1WaFpIa25MRnh1WEhRZ0lDQWdJQ0IwYUdsekxraHBjM1J2Y25rdVkzVnljbVZ1ZEZOMFlYUjFjeWdwTEZ4dVhIUWdJQ0FnSUNCN2ZTeGNibHgwSUNBZ0lDQWdZMjl1ZEdGcGJtVnlMRnh1WEhRZ0lDQWdJQ0IwYUdsekxrUnZiUzVqZFhKeVpXNTBTRlJOVEZ4dVhIUWdJQ0FnS1R0Y2JseDBJQ0FnSUVScGMzQmhkR05vWlhJdWRISnBaMmRsY2lnbmRISmhibk5wZEdsdmJrTnZiWEJzWlhSbFpDY3NJSFJvYVhNdVNHbHpkRzl5ZVM1amRYSnlaVzUwVTNSaGRIVnpLQ2twTzF4dVhIUmNibHgwSUNBZ0lIUm9hWE11WW1sdVpFVjJaVzUwY3lncE8xeHVYSFFnSUgwc1hHNWNkRnh1WEhRZ0lDOHFLbHh1WEhRZ0lDQXFJRUYwZEdGamFDQjBhR1VnWlhabGJuUnNhWE4wWlc1bGNuTmNibHgwSUNBZ0tseHVYSFFnSUNBcUlFQnRaVzFpWlhKUFppQkNZWEppWVM1UWFtRjRYRzVjZENBZ0lDb2dRSEJ5YVhaaGRHVmNibHgwSUNBZ0tpOWNibHgwSUNCaWFXNWtSWFpsYm5Sek9pQm1kVzVqZEdsdmJpZ3BJSHRjYmx4MElDQWdJR1J2WTNWdFpXNTBMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMk5zYVdOckp5eGNibHgwSUNBZ0lDQWdkR2hwY3k1dmJreHBibXREYkdsamF5NWlhVzVrS0hSb2FYTXBYRzVjZENBZ0lDQXBPMXh1WEhSY2JseDBJQ0FnSUhkcGJtUnZkeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2R3YjNCemRHRjBaU2NzWEc1Y2RDQWdJQ0FnSUhSb2FYTXViMjVUZEdGMFpVTm9ZVzVuWlM1aWFXNWtLSFJvYVhNcFhHNWNkQ0FnSUNBcE8xeHVYSFFnSUgwc1hHNWNkRnh1WEhRZ0lDOHFLbHh1WEhRZ0lDQXFJRkpsZEhWeWJpQjBhR1VnWTNWeWNtVnVkRlZTVENCamJHVmhibVZrWEc1Y2RDQWdJQ3BjYmx4MElDQWdLaUJBYldWdFltVnlUMllnUW1GeVltRXVVR3BoZUZ4dVhIUWdJQ0FxSUVCeVpYUjFjbTRnZTFOMGNtbHVaMzBnWTNWeWNtVnVkRlZ5YkZ4dVhIUWdJQ0FxTDF4dVhIUWdJR2RsZEVOMWNuSmxiblJWY213NklHWjFibU4wYVc5dUtDa2dlMXh1WEhRZ0lDQWdjbVYwZFhKdUlGVjBhV3h6TG1Oc1pXRnVUR2x1YXloY2JseDBJQ0FnSUNBZ1ZYUnBiSE11WjJWMFEzVnljbVZ1ZEZWeWJDZ3BYRzVjZENBZ0lDQXBPMXh1WEhRZ0lIMHNYRzVjZEZ4dVhIUWdJQzhxS2x4dVhIUWdJQ0FxSUVOb1lXNW5aU0IwYUdVZ1ZWSk1JSGRwZEdnZ2NIVnphSE4wWVhSbElHRnVaQ0IwY21sbloyVnlJSFJvWlNCemRHRjBaU0JqYUdGdVoyVmNibHgwSUNBZ0tseHVYSFFnSUNBcUlFQnRaVzFpWlhKUFppQkNZWEppWVM1UWFtRjRYRzVjZENBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlHNWxkMVZ5YkZ4dVhIUWdJQ0FxTDF4dVhIUWdJR2R2Vkc4NklHWjFibU4wYVc5dUtIVnliQ2tnZTF4dVhIUWdJQ0FnZDJsdVpHOTNMbWhwYzNSdmNua3VjSFZ6YUZOMFlYUmxLRzUxYkd3c0lHNTFiR3dzSUhWeWJDazdYRzVjZENBZ0lDQjBhR2x6TG05dVUzUmhkR1ZEYUdGdVoyVW9LVHRjYmx4MElDQjlMRnh1WEhSY2JseDBJQ0F2S2lwY2JseDBJQ0FnS2lCR2IzSmpaU0IwYUdVZ1luSnZkM05sY2lCMGJ5Qm5ieUIwYnlCaElHTmxjblJoYVc0Z2RYSnNYRzVjZENBZ0lDcGNibHgwSUNBZ0tpQkFiV1Z0WW1WeVQyWWdRbUZ5WW1FdVVHcGhlRnh1WEhRZ0lDQXFJRUJ3WVhKaGJTQjdVM1J5YVc1bmZTQjFjbXhjYmx4MElDQWdLaUJBY0hKcGRtRjBaVnh1WEhRZ0lDQXFMMXh1WEhRZ0lHWnZjbU5sUjI5VWJ6b2dablZ1WTNScGIyNG9kWEpzS1NCN1hHNWNkQ0FnSUNCM2FXNWtiM2N1Ykc5allYUnBiMjRnUFNCMWNtdzdYRzVjZENBZ2ZTeGNibHgwWEc1Y2RDQWdMeW9xWEc1Y2RDQWdJQ29nVEc5aFpDQmhiaUIxY213c0lIZHBiR3dnYzNSaGNuUWdZVzRnZUdoeUlISmxjWFZsYzNRZ2IzSWdiRzloWkNCbWNtOXRJSFJvWlNCallXTm9aVnh1WEhRZ0lDQXFYRzVjZENBZ0lDb2dRRzFsYldKbGNrOW1JRUpoY21KaExsQnFZWGhjYmx4MElDQWdLaUJBY0hKcGRtRjBaVnh1WEhRZ0lDQXFJRUJ3WVhKaGJTQWdlMU4wY21sdVozMGdkWEpzWEc1Y2RDQWdJQ29nUUhKbGRIVnliaUI3VUhKdmJXbHpaWDFjYmx4MElDQWdLaTljYmx4MElDQnNiMkZrT2lCbWRXNWpkR2x2YmloMWNtd3BJSHRjYmx4MElDQWdJSFpoY2lCa1pXWmxjbkpsWkNBOUlGVjBhV3h6TG1SbFptVnljbVZrS0NrN1hHNWNkQ0FnSUNCMllYSWdYM1JvYVhNZ1BTQjBhR2x6TzF4dVhIUWdJQ0FnZG1GeUlIaG9janRjYmx4MFhHNWNkQ0FnSUNCNGFISWdQU0IwYUdsekxrTmhZMmhsTG1kbGRDaDFjbXdwTzF4dVhIUmNibHgwSUNBZ0lHbG1JQ2doZUdoeUtTQjdYRzVjZENBZ0lDQWdJSGhvY2lBOUlGVjBhV3h6TG5ob2NpaDFjbXdwTzF4dVhIUWdJQ0FnSUNCMGFHbHpMa05oWTJobExuTmxkQ2gxY213c0lIaG9jaWs3WEc1Y2RDQWdJQ0I5WEc1Y2RGeHVYSFFnSUNBZ2VHaHlMblJvWlc0b1hHNWNkQ0FnSUNBZ0lHWjFibU4wYVc5dUtHUmhkR0VwSUh0Y2JseDBJQ0FnSUNBZ0lDQjJZWElnWTI5dWRHRnBibVZ5SUQwZ1gzUm9hWE11Ukc5dExuQmhjbk5sVW1WemNHOXVjMlVvWkdGMFlTazdYRzVjZEZ4dVhIUWdJQ0FnSUNBZ0lGOTBhR2x6TGtSdmJTNXdkWFJEYjI1MFlXbHVaWElvWTI5dWRHRnBibVZ5S1R0Y2JseDBYRzVjZENBZ0lDQWdJQ0FnYVdZZ0tDRmZkR2hwY3k1allXTm9aVVZ1WVdKc1pXUXBYRzVjZENBZ0lDQWdJQ0FnSUNCZmRHaHBjeTVEWVdOb1pTNXlaWE5sZENncE8xeHVYSFJjYmx4MElDQWdJQ0FnSUNCa1pXWmxjbkpsWkM1eVpYTnZiSFpsS0dOdmJuUmhhVzVsY2lrN1hHNWNkQ0FnSUNBZ0lIMHNYRzVjZENBZ0lDQWdJR1oxYm1OMGFXOXVLQ2tnZTF4dVhIUWdJQ0FnSUNBZ0lDOHZVMjl0WlhSb2FXNW5JSGRsYm5RZ2QzSnZibWNnS0hScGJXVnZkWFFzSURRd05Dd2dOVEExTGk0dUtWeHVYSFFnSUNBZ0lDQWdJRjkwYUdsekxtWnZjbU5sUjI5VWJ5aDFjbXdwTzF4dVhIUmNibHgwSUNBZ0lDQWdJQ0JrWldabGNuSmxaQzV5WldwbFkzUW9LVHRjYmx4MElDQWdJQ0FnZlZ4dVhIUWdJQ0FnS1R0Y2JseDBYRzVjZENBZ0lDQnlaWFIxY200Z1pHVm1aWEp5WldRdWNISnZiV2x6WlR0Y2JseDBJQ0I5TEZ4dVhIUmNibHgwSUNBdktpcGNibHgwSUNBZ0tpQkhaWFFnZEdobElDNW9jbVZtSUhCaGNtRnRaWFJsY2lCdmRYUWdiMllnWVc0Z1pXeGxiV1Z1ZEZ4dVhIUWdJQ0FxSUdGdVpDQm9ZVzVrYkdVZ2MzQmxZMmxoYkNCallYTmxjeUFvYkdsclpTQjRiR2x1YXpwb2NtVm1LVnh1WEhRZ0lDQXFYRzVjZENBZ0lDb2dRSEJ5YVhaaGRHVmNibHgwSUNBZ0tpQkFiV1Z0WW1WeVQyWWdRbUZ5WW1FdVVHcGhlRnh1WEhRZ0lDQXFJRUJ3WVhKaGJTQWdlMGhVVFV4RmJHVnRaVzUwZlNCbGJGeHVYSFFnSUNBcUlFQnlaWFIxY200Z2UxTjBjbWx1WjMwZ2FISmxabHh1WEhRZ0lDQXFMMXh1WEhRZ0lHZGxkRWh5WldZNklHWjFibU4wYVc5dUtHVnNLU0I3WEc1Y2RDQWdJQ0JwWmlBb0lXVnNLU0I3WEc1Y2RDQWdJQ0FnSUhKbGRIVnliaUIxYm1SbFptbHVaV1E3WEc1Y2RDQWdJQ0I5WEc1Y2RGeHVYSFFnSUNBZ2FXWWdLR1ZzTG1kbGRFRjBkSEpwWW5WMFpTQW1KaUIwZVhCbGIyWWdaV3d1WjJWMFFYUjBjbWxpZFhSbEtDZDRiR2x1YXpwb2NtVm1KeWtnUFQwOUlDZHpkSEpwYm1jbktTQjdYRzVjZENBZ0lDQWdJSEpsZEhWeWJpQmxiQzVuWlhSQmRIUnlhV0oxZEdVb0ozaHNhVzVyT21oeVpXWW5LVHRjYmx4MElDQWdJSDFjYmx4MFhHNWNkQ0FnSUNCcFppQW9kSGx3Wlc5bUlHVnNMbWh5WldZZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc1Y2RDQWdJQ0FnSUhKbGRIVnliaUJsYkM1b2NtVm1PMXh1WEhRZ0lDQWdmVnh1WEhSY2JseDBJQ0FnSUhKbGRIVnliaUIxYm1SbFptbHVaV1E3WEc1Y2RDQWdmU3hjYmx4MFhHNWNkQ0FnTHlvcVhHNWNkQ0FnSUNvZ1EyRnNiR0poWTJzZ1kyRnNiR1ZrSUdaeWIyMGdZMnhwWTJzZ1pYWmxiblJjYmx4MElDQWdLbHh1WEhRZ0lDQXFJRUJ0WlcxaVpYSlBaaUJDWVhKaVlTNVFhbUY0WEc1Y2RDQWdJQ29nUUhCeWFYWmhkR1ZjYmx4MElDQWdLaUJBY0dGeVlXMGdlMDF2ZFhObFJYWmxiblI5SUdWMmRGeHVYSFFnSUNBcUwxeHVYSFFnSUc5dVRHbHVhME5zYVdOck9pQm1kVzVqZEdsdmJpaGxkblFwSUh0Y2JseDBJQ0FnSUhaaGNpQmxiQ0E5SUdWMmRDNTBZWEpuWlhRN1hHNWNkRnh1WEhRZ0lDQWdMeTlIYnlCMWNDQnBiaUIwYUdVZ2JtOWtaV3hwYzNRZ2RXNTBhV3dnZDJWY2JseDBJQ0FnSUM4dlptbHVaQ0J6YjIxbGRHaHBibWNnZDJsMGFDQmhiaUJvY21WbVhHNWNkQ0FnSUNCM2FHbHNaU0FvWld3Z0ppWWdJWFJvYVhNdVoyVjBTSEpsWmlobGJDa3BJSHRjYmx4MElDQWdJQ0FnWld3Z1BTQmxiQzV3WVhKbGJuUk9iMlJsTzF4dVhIUWdJQ0FnZlZ4dVhIUmNibHgwSUNBZ0lHbG1JQ2gwYUdsekxuQnlaWFpsYm5SRGFHVmpheWhsZG5Rc0lHVnNLU2tnZTF4dVhIUWdJQ0FnSUNCbGRuUXVjM1J2Y0ZCeWIzQmhaMkYwYVc5dUtDazdYRzVjZENBZ0lDQWdJR1YyZEM1d2NtVjJaVzUwUkdWbVlYVnNkQ2dwTzF4dVhIUmNibHgwSUNBZ0lDQWdSR2x6Y0dGMFkyaGxjaTUwY21sbloyVnlLQ2RzYVc1clEyeHBZMnRsWkNjc0lHVnNMQ0JsZG5RcE8xeHVYSFJjYmx4MElDQWdJQ0FnZG1GeUlHaHlaV1lnUFNCMGFHbHpMbWRsZEVoeVpXWW9aV3dwTzF4dVhIUWdJQ0FnSUNCMGFHbHpMbWR2Vkc4b2FISmxaaWs3WEc1Y2RDQWdJQ0I5WEc1Y2RDQWdmU3hjYmx4MFhHNWNkQ0FnTHlvcVhHNWNkQ0FnSUNvZ1JHVjBaWEp0YVc1bElHbG1JSFJvWlNCc2FXNXJJSE5vYjNWc1pDQmlaU0JtYjJ4c2IzZGxaRnh1WEhRZ0lDQXFYRzVjZENBZ0lDb2dRRzFsYldKbGNrOW1JRUpoY21KaExsQnFZWGhjYmx4MElDQWdLaUJBY0dGeVlXMGdJSHROYjNWelpVVjJaVzUwZlNCbGRuUmNibHgwSUNBZ0tpQkFjR0Z5WVcwZ0lIdElWRTFNUld4bGJXVnVkSDBnWld4bGJXVnVkRnh1WEhRZ0lDQXFJRUJ5WlhSMWNtNGdlMEp2YjJ4bFlXNTlYRzVjZENBZ0lDb3ZYRzVjZENBZ2NISmxkbVZ1ZEVOb1pXTnJPaUJtZFc1amRHbHZiaWhsZG5Rc0lHVnNaVzFsYm5RcElIdGNibHgwSUNBZ0lHbG1JQ2doZDJsdVpHOTNMbWhwYzNSdmNua3VjSFZ6YUZOMFlYUmxLVnh1WEhRZ0lDQWdJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNWNkRnh1WEhRZ0lDQWdkbUZ5SUdoeVpXWWdQU0IwYUdsekxtZGxkRWh5WldZb1pXeGxiV1Z1ZENrN1hHNWNkRnh1WEhRZ0lDQWdMeTlWYzJWeVhHNWNkQ0FnSUNCcFppQW9JV1ZzWlcxbGJuUWdmSHdnSVdoeVpXWXBYRzVjZENBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JseDBYRzVjZENBZ0lDQXZMMDFwWkdSc1pTQmpiR2xqYXl3Z1kyMWtJR05zYVdOckxDQmhibVFnWTNSeWJDQmpiR2xqYTF4dVhIUWdJQ0FnYVdZZ0tHVjJkQzUzYUdsamFDQStJREVnZkh3Z1pYWjBMbTFsZEdGTFpYa2dmSHdnWlhaMExtTjBjbXhMWlhrZ2ZId2daWFowTG5Ob2FXWjBTMlY1SUh4OElHVjJkQzVoYkhSTFpYa3BYRzVjZENBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JseDBYRzVjZENBZ0lDQXZMMGxuYm05eVpTQjBZWEpuWlhRZ2QybDBhQ0JmWW14aGJtc2dkR0Z5WjJWMFhHNWNkQ0FnSUNCcFppQW9aV3hsYldWdWRDNTBZWEpuWlhRZ0ppWWdaV3hsYldWdWRDNTBZWEpuWlhRZ1BUMDlJQ2RmWW14aGJtc25LVnh1WEhRZ0lDQWdJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNWNkRnh1WEhRZ0lDQWdMeTlEYUdWamF5QnBaaUJwZENkeklIUm9aU0J6WVcxbElHUnZiV0ZwYmx4dVhIUWdJQ0FnYVdZZ0tIZHBibVJ2ZHk1c2IyTmhkR2x2Ymk1d2NtOTBiMk52YkNBaFBUMGdaV3hsYldWdWRDNXdjbTkwYjJOdmJDQjhmQ0IzYVc1a2IzY3ViRzlqWVhScGIyNHVhRzl6ZEc1aGJXVWdJVDA5SUdWc1pXMWxiblF1YUc5emRHNWhiV1VwWEc1Y2RDQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNibHgwWEc1Y2RDQWdJQ0F2TDBOb1pXTnJJR2xtSUhSb1pTQndiM0owSUdseklIUm9aU0J6WVcxbFhHNWNkQ0FnSUNCcFppQW9WWFJwYkhNdVoyVjBVRzl5ZENncElDRTlQU0JWZEdsc2N5NW5aWFJRYjNKMEtHVnNaVzFsYm5RdWNHOXlkQ2twWEc1Y2RDQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNibHgwWEc1Y2RDQWdJQ0F2TDBsbmJtOXlaU0JqWVhObElIZG9aVzRnWVNCb1lYTm9JR2x6SUdKbGFXNW5JSFJoWTJ0bFpDQnZiaUIwYUdVZ1kzVnljbVZ1ZENCVlVreGNibHgwSUNBZ0lHbG1JQ2hvY21WbUxtbHVaR1Y0VDJZb0p5TW5LU0ErSUMweEtWeHVYSFFnSUNBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc1Y2RGeHVYSFFnSUNBZ0x5OUpaMjV2Y21VZ1kyRnpaU0IzYUdWeVpTQjBhR1Z5WlNCcGN5QmtiM2R1Ykc5aFpDQmhkSFJ5YVdKMWRHVmNibHgwSUNBZ0lHbG1JQ2hsYkdWdFpXNTBMbWRsZEVGMGRISnBZblYwWlNBbUppQjBlWEJsYjJZZ1pXeGxiV1Z1ZEM1blpYUkJkSFJ5YVdKMWRHVW9KMlJ2ZDI1c2IyRmtKeWtnUFQwOUlDZHpkSEpwYm1jbktWeHVYSFFnSUNBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc1Y2RGeHVYSFFnSUNBZ0x5OUpiaUJqWVhObElIbHZkU2R5WlNCMGNubHBibWNnZEc4Z2JHOWhaQ0IwYUdVZ2MyRnRaU0J3WVdkbFhHNWNkQ0FnSUNCcFppQW9WWFJwYkhNdVkyeGxZVzVNYVc1cktHaHlaV1lwSUQwOUlGVjBhV3h6TG1Oc1pXRnVUR2x1YXloc2IyTmhkR2x2Ymk1b2NtVm1LU2xjYmx4MElDQWdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVYSFJjYmx4MElDQWdJR2xtSUNobGJHVnRaVzUwTG1Oc1lYTnpUR2x6ZEM1amIyNTBZV2x1Y3loMGFHbHpMbWxuYm05eVpVTnNZWE56VEdsdWF5a3BYRzVjZENBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JseDBYRzVjZENBZ0lDQnlaWFIxY200Z2RISjFaVHRjYmx4MElDQjlMRnh1WEhSY2JseDBJQ0F2S2lwY2JseDBJQ0FnS2lCU1pYUjFjbTRnWVNCMGNtRnVjMmwwYVc5dUlHOWlhbVZqZEZ4dVhIUWdJQ0FxWEc1Y2RDQWdJQ29nUUcxbGJXSmxjazltSUVKaGNtSmhMbEJxWVhoY2JseDBJQ0FnS2lCQWNtVjBkWEp1SUh0Q1lYSmlZUzVVY21GdWMybDBhVzl1ZlNCVWNtRnVjMmwwYVc5dUlHOWlhbVZqZEZ4dVhIUWdJQ0FxTDF4dVhIUWdJR2RsZEZSeVlXNXphWFJwYjI0NklHWjFibU4wYVc5dUtDa2dlMXh1WEhRZ0lDQWdMeTlWYzJWeUlHTjFjM1J2YldsNllXSnNaVnh1WEhRZ0lDQWdjbVYwZFhKdUlFaHBaR1ZUYUc5M1ZISmhibk5wZEdsdmJqdGNibHgwSUNCOUxGeHVYSFJjYmx4MElDQXZLaXBjYmx4MElDQWdLaUJOWlhSb2IyUWdZMkZzYkdWa0lHRm1kR1Z5SUdFZ0ozQnZjSE4wWVhSbEp5QnZjaUJtY205dElDNW5iMVJ2S0NsY2JseDBJQ0FnS2x4dVhIUWdJQ0FxSUVCdFpXMWlaWEpQWmlCQ1lYSmlZUzVRYW1GNFhHNWNkQ0FnSUNvZ1FIQnlhWFpoZEdWY2JseDBJQ0FnS2k5Y2JseDBJQ0J2YmxOMFlYUmxRMmhoYm1kbE9pQm1kVzVqZEdsdmJpZ3BJSHRjYmx4MElDQWdJSFpoY2lCdVpYZFZjbXdnUFNCMGFHbHpMbWRsZEVOMWNuSmxiblJWY213b0tUdGNibHgwWEc1Y2RDQWdJQ0JwWmlBb2RHaHBjeTUwY21GdWMybDBhVzl1VUhKdlozSmxjM01wWEc1Y2RDQWdJQ0FnSUhSb2FYTXVabTl5WTJWSGIxUnZLRzVsZDFWeWJDazdYRzVjZEZ4dVhIUWdJQ0FnYVdZZ0tIUm9hWE11U0dsemRHOXllUzVqZFhKeVpXNTBVM1JoZEhWektDa3VkWEpzSUQwOVBTQnVaWGRWY213cFhHNWNkQ0FnSUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmx4MFhHNWNkQ0FnSUNCMGFHbHpMa2hwYzNSdmNua3VZV1JrS0c1bGQxVnliQ2s3WEc1Y2RGeHVYSFFnSUNBZ2RtRnlJRzVsZDBOdmJuUmhhVzVsY2lBOUlIUm9hWE11Ykc5aFpDaHVaWGRWY213cE8xeHVYSFFnSUNBZ2RtRnlJSFJ5WVc1emFYUnBiMjRnUFNCUFltcGxZM1F1WTNKbFlYUmxLSFJvYVhNdVoyVjBWSEpoYm5OcGRHbHZiaWdwS1R0Y2JseDBYRzVjZENBZ0lDQjBhR2x6TG5SeVlXNXphWFJwYjI1UWNtOW5jbVZ6Y3lBOUlIUnlkV1U3WEc1Y2RGeHVYSFFnSUNBZ1JHbHpjR0YwWTJobGNpNTBjbWxuWjJWeUtDZHBibWwwVTNSaGRHVkRhR0Z1WjJVbkxGeHVYSFFnSUNBZ0lDQjBhR2x6TGtocGMzUnZjbmt1WTNWeWNtVnVkRk4wWVhSMWN5Z3BMRnh1WEhRZ0lDQWdJQ0IwYUdsekxraHBjM1J2Y25rdWNISmxkbE4wWVhSMWN5Z3BYRzVjZENBZ0lDQXBPMXh1WEhSY2JseDBJQ0FnSUhaaGNpQjBjbUZ1YzJsMGFXOXVTVzV6ZEdGdVkyVWdQU0IwY21GdWMybDBhVzl1TG1sdWFYUW9YRzVjZENBZ0lDQWdJSFJvYVhNdVJHOXRMbWRsZEVOdmJuUmhhVzVsY2lncExGeHVYSFFnSUNBZ0lDQnVaWGREYjI1MFlXbHVaWEpjYmx4MElDQWdJQ2s3WEc1Y2RGeHVYSFFnSUNBZ2JtVjNRMjl1ZEdGcGJtVnlMblJvWlc0b1hHNWNkQ0FnSUNBZ0lIUm9hWE11YjI1T1pYZERiMjUwWVdsdVpYSk1iMkZrWldRdVltbHVaQ2gwYUdsektWeHVYSFFnSUNBZ0tUdGNibHgwWEc1Y2RDQWdJQ0IwY21GdWMybDBhVzl1U1c1emRHRnVZMlV1ZEdobGJpaGNibHgwSUNBZ0lDQWdkR2hwY3k1dmJsUnlZVzV6YVhScGIyNUZibVF1WW1sdVpDaDBhR2x6S1Z4dVhIUWdJQ0FnS1R0Y2JseDBJQ0I5TEZ4dVhIUmNibHgwSUNBdktpcGNibHgwSUNBZ0tpQkdkVzVqZEdsdmJpQmpZV3hzWldRZ1lYTWdjMjl2YmlCMGFHVWdibVYzSUdOdmJuUmhhVzVsY2lCcGN5QnlaV0ZrZVZ4dVhIUWdJQ0FxWEc1Y2RDQWdJQ29nUUcxbGJXSmxjazltSUVKaGNtSmhMbEJxWVhoY2JseDBJQ0FnS2lCQWNISnBkbUYwWlZ4dVhIUWdJQ0FxSUVCd1lYSmhiU0I3U0ZSTlRFVnNaVzFsYm5SOUlHTnZiblJoYVc1bGNseHVYSFFnSUNBcUwxeHVYSFFnSUc5dVRtVjNRMjl1ZEdGcGJtVnlURzloWkdWa09pQm1kVzVqZEdsdmJpaGpiMjUwWVdsdVpYSXBJSHRjYmx4MElDQWdJSFpoY2lCamRYSnlaVzUwVTNSaGRIVnpJRDBnZEdocGN5NUlhWE4wYjNKNUxtTjFjbkpsYm5SVGRHRjBkWE1vS1R0Y2JseDBJQ0FnSUdOMWNuSmxiblJUZEdGMGRYTXVibUZ0WlhOd1lXTmxJRDBnZEdocGN5NUViMjB1WjJWMFRtRnRaWE53WVdObEtHTnZiblJoYVc1bGNpazdYRzVjZEZ4dVhIUWdJQ0FnUkdsemNHRjBZMmhsY2k1MGNtbG5aMlZ5S0NkdVpYZFFZV2RsVW1WaFpIa25MRnh1WEhRZ0lDQWdJQ0IwYUdsekxraHBjM1J2Y25rdVkzVnljbVZ1ZEZOMFlYUjFjeWdwTEZ4dVhIUWdJQ0FnSUNCMGFHbHpMa2hwYzNSdmNua3VjSEpsZGxOMFlYUjFjeWdwTEZ4dVhIUWdJQ0FnSUNCamIyNTBZV2x1WlhJc1hHNWNkQ0FnSUNBZ0lIUm9hWE11Ukc5dExtTjFjbkpsYm5SSVZFMU1YRzVjZENBZ0lDQXBPMXh1WEhRZ0lIMHNYRzVjZEZ4dVhIUWdJQzhxS2x4dVhIUWdJQ0FxSUVaMWJtTjBhVzl1SUdOaGJHeGxaQ0JoY3lCemIyOXVJSFJvWlNCMGNtRnVjMmwwYVc5dUlHbHpJR1pwYm1semFHVmtYRzVjZENBZ0lDcGNibHgwSUNBZ0tpQkFiV1Z0WW1WeVQyWWdRbUZ5WW1FdVVHcGhlRnh1WEhRZ0lDQXFJRUJ3Y21sMllYUmxYRzVjZENBZ0lDb3ZYRzVjZENBZ2IyNVVjbUZ1YzJsMGFXOXVSVzVrT2lCbWRXNWpkR2x2YmlncElIdGNibHgwSUNBZ0lIUm9hWE11ZEhKaGJuTnBkR2x2YmxCeWIyZHlaWE56SUQwZ1ptRnNjMlU3WEc1Y2RGeHVYSFFnSUNBZ1JHbHpjR0YwWTJobGNpNTBjbWxuWjJWeUtDZDBjbUZ1YzJsMGFXOXVRMjl0Y0d4bGRHVmtKeXhjYmx4MElDQWdJQ0FnZEdocGN5NUlhWE4wYjNKNUxtTjFjbkpsYm5SVGRHRjBkWE1vS1N4Y2JseDBJQ0FnSUNBZ2RHaHBjeTVJYVhOMGIzSjVMbkJ5WlhaVGRHRjBkWE1vS1Z4dVhIUWdJQ0FnS1R0Y2JseDBJQ0I5WEc1Y2RIMDdYRzVjZEZ4dVhIUnRiMlIxYkdVdVpYaHdiM0owY3lBOUlGQnFZWGc3WEc1Y2JseHVMeW9xS2k4Z2ZTeGNiaThxSURFeElDb3ZYRzR2S2lvcUx5Qm1kVzVqZEdsdmJpaHRiMlIxYkdVc0lHVjRjRzl5ZEhNc0lGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHBJSHRjYmx4dVhIUjJZWElnUW1GelpWUnlZVzV6YVhScGIyNGdQU0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0RRcE8xeHVYSFJjYmx4MEx5b3FYRzVjZENBcUlFSmhjMmxqSUZSeVlXNXphWFJwYjI0Z2IySnFaV04wTENCM1lXbDBJR1p2Y2lCMGFHVWdibVYzSUVOdmJuUmhhVzVsY2lCMGJ5QmlaU0J5WldGa2VTeGNibHgwSUNvZ2MyTnliMnhzSUhSdmNDd2dZVzVrSUdacGJtbHphQ0IwYUdVZ2RISmhibk5wZEdsdmJpQW9jbVZ0YjNacGJtY2dkR2hsSUc5c1pDQmpiMjUwWVdsdVpYSWdZVzVrSUdScGMzQnNZWGxwYm1jZ2RHaGxJRzVsZHlCdmJtVXBYRzVjZENBcVhHNWNkQ0FxSUVCd2NtbDJZWFJsWEc1Y2RDQXFJRUJ1WVcxbGMzQmhZMlVnUW1GeVltRXVTR2xrWlZOb2IzZFVjbUZ1YzJsMGFXOXVYRzVjZENBcUlFQmhkV2R0Wlc1MGN5QkNZWEppWVM1Q1lYTmxWSEpoYm5OcGRHbHZibHh1WEhRZ0tpOWNibHgwZG1GeUlFaHBaR1ZUYUc5M1ZISmhibk5wZEdsdmJpQTlJRUpoYzJWVWNtRnVjMmwwYVc5dUxtVjRkR1Z1WkNoN1hHNWNkQ0FnYzNSaGNuUTZJR1oxYm1OMGFXOXVLQ2tnZTF4dVhIUWdJQ0FnZEdocGN5NXVaWGREYjI1MFlXbHVaWEpNYjJGa2FXNW5MblJvWlc0b2RHaHBjeTVtYVc1cGMyZ3VZbWx1WkNoMGFHbHpLU2s3WEc1Y2RDQWdmU3hjYmx4MFhHNWNkQ0FnWm1sdWFYTm9PaUJtZFc1amRHbHZiaWdwSUh0Y2JseDBJQ0FnSUdSdlkzVnRaVzUwTG1KdlpIa3VjMk55YjJ4c1ZHOXdJRDBnTUR0Y2JseDBJQ0FnSUhSb2FYTXVaRzl1WlNncE8xeHVYSFFnSUgxY2JseDBmU2s3WEc1Y2RGeHVYSFJ0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRWhwWkdWVGFHOTNWSEpoYm5OcGRHbHZianRjYmx4dVhHNHZLaW9xTHlCOUxGeHVMeW9nTVRJZ0tpOWNiaThxS2lvdklHWjFibU4wYVc5dUtHMXZaSFZzWlN3Z1pYaHdiM0owY3lrZ2UxeHVYRzVjZEM4cUtseHVYSFFnS2lCUFltcGxZM1FnZEdoaGRDQnBjeUJuYjJsdVp5QjBieUJrWldGc0lIZHBkR2dnUkU5TklIQmhjbk5wYm1jdmJXRnVhWEIxYkdGMGFXOXVYRzVjZENBcVhHNWNkQ0FxSUVCdVlXMWxjM0JoWTJVZ1FtRnlZbUV1VUdwaGVDNUViMjFjYmx4MElDb2dRSFI1Y0dVZ2UwOWlhbVZqZEgxY2JseDBJQ292WEc1Y2RIWmhjaUJFYjIwZ1BTQjdYRzVjZENBZ0x5b3FYRzVjZENBZ0lDb2dWR2hsSUc1aGJXVWdiMllnZEdobElHUmhkR0VnWVhSMGNtbGlkWFJsSUc5dUlIUm9aU0JqYjI1MFlXbHVaWEpjYmx4MElDQWdLbHh1WEhRZ0lDQXFJRUJ0WlcxaVpYSlBaaUJDWVhKaVlTNVFhbUY0TGtSdmJWeHVYSFFnSUNBcUlFQjBlWEJsSUh0VGRISnBibWQ5WEc1Y2RDQWdJQ29nUUdSbFptRjFiSFJjYmx4MElDQWdLaTljYmx4MElDQmtZWFJoVG1GdFpYTndZV05sT2lBbmJtRnRaWE53WVdObEp5eGNibHgwWEc1Y2RDQWdMeW9xWEc1Y2RDQWdJQ29nU1dRZ2IyWWdkR2hsSUcxaGFXNGdkM0poY0hCbGNseHVYSFFnSUNBcVhHNWNkQ0FnSUNvZ1FHMWxiV0psY2s5bUlFSmhjbUpoTGxCcVlYZ3VSRzl0WEc1Y2RDQWdJQ29nUUhSNWNHVWdlMU4wY21sdVozMWNibHgwSUNBZ0tpQkFaR1ZtWVhWc2RGeHVYSFFnSUNBcUwxeHVYSFFnSUhkeVlYQndaWEpKWkRvZ0oySmhjbUpoTFhkeVlYQndaWEluTEZ4dVhIUmNibHgwSUNBdktpcGNibHgwSUNBZ0tpQkRiR0Z6Y3lCdVlXMWxJSFZ6WldRZ2RHOGdhV1JsYm5ScFpua2dkR2hsSUdOdmJuUmhhVzVsY25OY2JseDBJQ0FnS2x4dVhIUWdJQ0FxSUVCdFpXMWlaWEpQWmlCQ1lYSmlZUzVRYW1GNExrUnZiVnh1WEhRZ0lDQXFJRUIwZVhCbElIdFRkSEpwYm1kOVhHNWNkQ0FnSUNvZ1FHUmxabUYxYkhSY2JseDBJQ0FnS2k5Y2JseDBJQ0JqYjI1MFlXbHVaWEpEYkdGemN6b2dKMkpoY21KaExXTnZiblJoYVc1bGNpY3NYRzVjZEZ4dVhIUWdJQzhxS2x4dVhIUWdJQ0FxSUVaMWJHd2dTRlJOVENCVGRISnBibWNnYjJZZ2RHaGxJR04xY25KbGJuUWdjR0ZuWlM1Y2JseDBJQ0FnS2lCQ2VTQmtaV1poZFd4MElHbHpJSFJvWlNCcGJtNWxja2hVVFV3Z2IyWWdkR2hsSUdsdWFYUnBZV3dnYkc5aFpHVmtJSEJoWjJVdVhHNWNkQ0FnSUNwY2JseDBJQ0FnS2lCRllXTm9JSFJwYldVZ1lTQnVaWGNnY0dGblpTQnBjeUJzYjJGa1pXUXNJSFJvWlNCMllXeDFaU0JwY3lCMGFHVWdjbVZ6Y0c5dWMyVWdiMllnZEdobElIaG9jaUJqWVd4c0xseHVYSFFnSUNBcVhHNWNkQ0FnSUNvZ1FHMWxiV0psY2s5bUlFSmhjbUpoTGxCcVlYZ3VSRzl0WEc1Y2RDQWdJQ29nUUhSNWNHVWdlMU4wY21sdVozMWNibHgwSUNBZ0tpOWNibHgwSUNCamRYSnlaVzUwU0ZSTlREb2daRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MExtbHVibVZ5U0ZSTlRDeGNibHgwWEc1Y2RDQWdMeW9xWEc1Y2RDQWdJQ29nVUdGeWMyVWdkR2hsSUhKbGMzQnZibk5sVkdWNGRDQnZZblJoYVc1bFpDQm1jbTl0SUhSb1pTQjRhSElnWTJGc2JGeHVYSFFnSUNBcVhHNWNkQ0FnSUNvZ1FHMWxiV0psY2s5bUlFSmhjbUpoTGxCcVlYZ3VSRzl0WEc1Y2RDQWdJQ29nUUhCeWFYWmhkR1ZjYmx4MElDQWdLaUJBY0dGeVlXMGdJSHRUZEhKcGJtZDlJSEpsYzNCdmJuTmxWR1Y0ZEZ4dVhIUWdJQ0FxSUVCeVpYUjFjbTRnZTBoVVRVeEZiR1Z0Wlc1MGZWeHVYSFFnSUNBcUwxeHVYSFFnSUhCaGNuTmxVbVZ6Y0c5dWMyVTZJR1oxYm1OMGFXOXVLSEpsYzNCdmJuTmxWR1Y0ZENrZ2UxeHVYSFFnSUNBZ2RHaHBjeTVqZFhKeVpXNTBTRlJOVENBOUlISmxjM0J2Ym5ObFZHVjRkRHRjYmx4MFhHNWNkQ0FnSUNCMllYSWdkM0poY0hCbGNpQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb0oyUnBkaWNwTzF4dVhIUWdJQ0FnZDNKaGNIQmxjaTVwYm01bGNraFVUVXdnUFNCeVpYTndiMjV6WlZSbGVIUTdYRzVjZEZ4dVhIUWdJQ0FnZG1GeUlIUnBkR3hsUld3Z1BTQjNjbUZ3Y0dWeUxuRjFaWEo1VTJWc1pXTjBiM0lvSjNScGRHeGxKeWs3WEc1Y2RGeHVYSFFnSUNBZ2FXWWdLSFJwZEd4bFJXd3BYRzVjZENBZ0lDQWdJR1J2WTNWdFpXNTBMblJwZEd4bElEMGdkR2wwYkdWRmJDNTBaWGgwUTI5dWRHVnVkRHRjYmx4MFhHNWNkQ0FnSUNCeVpYUjFjbTRnZEdocGN5NW5aWFJEYjI1MFlXbHVaWElvZDNKaGNIQmxjaWs3WEc1Y2RDQWdmU3hjYmx4MFhHNWNkQ0FnTHlvcVhHNWNkQ0FnSUNvZ1IyVjBJSFJvWlNCdFlXbHVJR0poY21KaElIZHlZWEJ3WlhJZ1lua2dkR2hsSUVsRUlHQjNjbUZ3Y0dWeVNXUmdYRzVjZENBZ0lDcGNibHgwSUNBZ0tpQkFiV1Z0WW1WeVQyWWdRbUZ5WW1FdVVHcGhlQzVFYjIxY2JseDBJQ0FnS2lCQWNtVjBkWEp1SUh0SVZFMU1SV3hsYldWdWRIMGdaV3hsYldWdWRGeHVYSFFnSUNBcUwxeHVYSFFnSUdkbGRGZHlZWEJ3WlhJNklHWjFibU4wYVc5dUtDa2dlMXh1WEhRZ0lDQWdkbUZ5SUhkeVlYQndaWElnUFNCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2gwYUdsekxuZHlZWEJ3WlhKSlpDazdYRzVjZEZ4dVhIUWdJQ0FnYVdZZ0tDRjNjbUZ3Y0dWeUtWeHVYSFFnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0owSmhjbUpoTG1wek9pQjNjbUZ3Y0dWeUlHNXZkQ0JtYjNWdVpDRW5LVHRjYmx4MFhHNWNkQ0FnSUNCeVpYUjFjbTRnZDNKaGNIQmxjanRjYmx4MElDQjlMRnh1WEhSY2JseDBJQ0F2S2lwY2JseDBJQ0FnS2lCSFpYUWdkR2hsSUdOdmJuUmhhVzVsY2lCdmJpQjBhR1VnWTNWeWNtVnVkQ0JFVDAwc1hHNWNkQ0FnSUNvZ2IzSWdabkp2YlNCaGJpQklWRTFNUld4bGJXVnVkQ0J3WVhOelpXUWdkbWxoSUdGeVozVnRaVzUwWEc1Y2RDQWdJQ3BjYmx4MElDQWdLaUJBYldWdFltVnlUMllnUW1GeVltRXVVR3BoZUM1RWIyMWNibHgwSUNBZ0tpQkFjSEpwZG1GMFpWeHVYSFFnSUNBcUlFQndZWEpoYlNBZ2UwaFVUVXhGYkdWdFpXNTBmU0JsYkdWdFpXNTBYRzVjZENBZ0lDb2dRSEpsZEhWeWJpQjdTRlJOVEVWc1pXMWxiblI5WEc1Y2RDQWdJQ292WEc1Y2RDQWdaMlYwUTI5dWRHRnBibVZ5T2lCbWRXNWpkR2x2YmlobGJHVnRaVzUwS1NCN1hHNWNkQ0FnSUNCcFppQW9JV1ZzWlcxbGJuUXBYRzVjZENBZ0lDQWdJR1ZzWlcxbGJuUWdQU0JrYjJOMWJXVnVkQzVpYjJSNU8xeHVYSFJjYmx4MElDQWdJR2xtSUNnaFpXeGxiV1Z1ZENsY2JseDBJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkQ1lYSmlZUzVxY3pvZ1JFOU5JRzV2ZENCeVpXRmtlU0VuS1R0Y2JseDBYRzVjZENBZ0lDQjJZWElnWTI5dWRHRnBibVZ5SUQwZ2RHaHBjeTV3WVhKelpVTnZiblJoYVc1bGNpaGxiR1Z0Wlc1MEtUdGNibHgwWEc1Y2RDQWdJQ0JwWmlBb1kyOXVkR0ZwYm1WeUlDWW1JR052Ym5SaGFXNWxjaTVxY1hWbGNua3BYRzVjZENBZ0lDQWdJR052Ym5SaGFXNWxjaUE5SUdOdmJuUmhhVzVsY2xzd1hUdGNibHgwWEc1Y2RDQWdJQ0JwWmlBb0lXTnZiblJoYVc1bGNpbGNibHgwSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZENZWEppWVM1cWN6b2dibThnWTI5dWRHRnBibVZ5SUdadmRXNWtKeWs3WEc1Y2RGeHVYSFFnSUNBZ2NtVjBkWEp1SUdOdmJuUmhhVzVsY2p0Y2JseDBJQ0I5TEZ4dVhIUmNibHgwSUNBdktpcGNibHgwSUNBZ0tpQkhaWFFnZEdobElHNWhiV1Z6Y0dGalpTQnZaaUIwYUdVZ1kyOXVkR0ZwYm1WeVhHNWNkQ0FnSUNwY2JseDBJQ0FnS2lCQWJXVnRZbVZ5VDJZZ1FtRnlZbUV1VUdwaGVDNUViMjFjYmx4MElDQWdLaUJBY0hKcGRtRjBaVnh1WEhRZ0lDQXFJRUJ3WVhKaGJTQWdlMGhVVFV4RmJHVnRaVzUwZlNCbGJHVnRaVzUwWEc1Y2RDQWdJQ29nUUhKbGRIVnliaUI3VTNSeWFXNW5mVnh1WEhRZ0lDQXFMMXh1WEhRZ0lHZGxkRTVoYldWemNHRmpaVG9nWm5WdVkzUnBiMjRvWld4bGJXVnVkQ2tnZTF4dVhIUWdJQ0FnYVdZZ0tHVnNaVzFsYm5RZ0ppWWdaV3hsYldWdWRDNWtZWFJoYzJWMEtTQjdYRzVjZENBZ0lDQWdJSEpsZEhWeWJpQmxiR1Z0Wlc1MExtUmhkR0Z6WlhSYmRHaHBjeTVrWVhSaFRtRnRaWE53WVdObFhUdGNibHgwSUNBZ0lIMGdaV3h6WlNCcFppQW9aV3hsYldWdWRDa2dlMXh1WEhRZ0lDQWdJQ0J5WlhSMWNtNGdaV3hsYldWdWRDNW5aWFJCZEhSeWFXSjFkR1VvSjJSaGRHRXRKeUFySUhSb2FYTXVaR0YwWVU1aGJXVnpjR0ZqWlNrN1hHNWNkQ0FnSUNCOVhHNWNkRnh1WEhRZ0lDQWdjbVYwZFhKdUlHNTFiR3c3WEc1Y2RDQWdmU3hjYmx4MFhHNWNkQ0FnTHlvcVhHNWNkQ0FnSUNvZ1VIVjBJSFJvWlNCamIyNTBZV2x1WlhJZ2IyNGdkR2hsSUhCaFoyVmNibHgwSUNBZ0tseHVYSFFnSUNBcUlFQnRaVzFpWlhKUFppQkNZWEppWVM1UWFtRjRMa1J2YlZ4dVhIUWdJQ0FxSUVCd2NtbDJZWFJsWEc1Y2RDQWdJQ29nUUhCaGNtRnRJQ0I3U0ZSTlRFVnNaVzFsYm5SOUlHVnNaVzFsYm5SY2JseDBJQ0FnS2k5Y2JseDBJQ0J3ZFhSRGIyNTBZV2x1WlhJNklHWjFibU4wYVc5dUtHVnNaVzFsYm5RcElIdGNibHgwSUNBZ0lHVnNaVzFsYm5RdWMzUjViR1V1ZG1semFXSnBiR2wwZVNBOUlDZG9hV1JrWlc0bk8xeHVYSFJjYmx4MElDQWdJSFpoY2lCM2NtRndjR1Z5SUQwZ2RHaHBjeTVuWlhSWGNtRndjR1Z5S0NrN1hHNWNkQ0FnSUNCM2NtRndjR1Z5TG1Gd2NHVnVaRU5vYVd4a0tHVnNaVzFsYm5RcE8xeHVYSFFnSUgwc1hHNWNkRnh1WEhRZ0lDOHFLbHh1WEhRZ0lDQXFJRWRsZENCamIyNTBZV2x1WlhJZ2MyVnNaV04wYjNKY2JseDBJQ0FnS2x4dVhIUWdJQ0FxSUVCdFpXMWlaWEpQWmlCQ1lYSmlZUzVRYW1GNExrUnZiVnh1WEhRZ0lDQXFJRUJ3Y21sMllYUmxYRzVjZENBZ0lDb2dRSEJoY21GdElDQjdTRlJOVEVWc1pXMWxiblI5SUdWc1pXMWxiblJjYmx4MElDQWdLaUJBY21WMGRYSnVJSHRJVkUxTVJXeGxiV1Z1ZEgwZ1pXeGxiV1Z1ZEZ4dVhIUWdJQ0FxTDF4dVhIUWdJSEJoY25ObFEyOXVkR0ZwYm1WeU9pQm1kVzVqZEdsdmJpaGxiR1Z0Wlc1MEtTQjdYRzVjZENBZ0lDQnlaWFIxY200Z1pXeGxiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1SnlBcklIUm9hWE11WTI5dWRHRnBibVZ5UTJ4aGMzTXBPMXh1WEhRZ0lIMWNibHgwZlR0Y2JseDBYRzVjZEcxdlpIVnNaUzVsZUhCdmNuUnpJRDBnUkc5dE8xeHVYRzVjYmk4cUtpb3ZJSDBzWEc0dktpQXhNeUFxTDF4dUx5b3FLaThnWm5WdVkzUnBiMjRvYlc5a2RXeGxMQ0JsZUhCdmNuUnpMQ0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS1NCN1hHNWNibHgwZG1GeUlGVjBhV3h6SUQwZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5ZzFLVHRjYmx4MGRtRnlJRkJxWVhnZ1BTQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLREV3S1R0Y2JseDBYRzVjZEM4cUtseHVYSFFnS2lCUWNtVm1aWFJqYUZ4dVhIUWdLbHh1WEhRZ0tpQkFibUZ0WlhOd1lXTmxJRUpoY21KaExsQnlaV1psZEdOb1hHNWNkQ0FxSUVCMGVYQmxJSHRQWW1wbFkzUjlYRzVjZENBcUwxeHVYSFIyWVhJZ1VISmxabVYwWTJnZ1BTQjdYRzVjZENBZ0x5b3FYRzVjZENBZ0lDb2dRMnhoYzNNZ2JtRnRaU0IxYzJWa0lIUnZJR2xuYm05eVpTQndjbVZtWlhSamFDQnZiaUJzYVc1cmMxeHVYSFFnSUNBcVhHNWNkQ0FnSUNvZ1FHMWxiV0psY2s5bUlFSmhjbUpoTGxCeVpXWmxkR05vWEc1Y2RDQWdJQ29nUUhSNWNHVWdlMU4wY21sdVozMWNibHgwSUNBZ0tpQkFaR1ZtWVhWc2RGeHVYSFFnSUNBcUwxeHVYSFFnSUdsbmJtOXlaVU5zWVhOelRHbHVhem9nSjI1dkxXSmhjbUpoTFhCeVpXWmxkR05vSnl4Y2JseDBYRzVjZENBZ0x5b3FYRzVjZENBZ0lDb2dTVzVwZENCMGFHVWdaWFpsYm5RZ2JHbHpkR1Z1WlhJZ2IyNGdiVzkxYzJWdmRtVnlJR0Z1WkNCMGIzVmphSE4wWVhKMFhHNWNkQ0FnSUNvZ1ptOXlJSFJvWlNCd2NtVm1aWFJqYUZ4dVhIUWdJQ0FxWEc1Y2RDQWdJQ29nUUcxbGJXSmxjazltSUVKaGNtSmhMbEJ5WldabGRHTm9YRzVjZENBZ0lDb3ZYRzVjZENBZ2FXNXBkRG9nWm5WdVkzUnBiMjRvS1NCN1hHNWNkQ0FnSUNCcFppQW9JWGRwYm1SdmR5NW9hWE4wYjNKNUxuQjFjMmhUZEdGMFpTa2dlMXh1WEhRZ0lDQWdJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNWNkQ0FnSUNCOVhHNWNkRnh1WEhRZ0lDQWdaRzlqZFcxbGJuUXVZbTlrZVM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkdGIzVnpaVzkyWlhJbkxDQjBhR2x6TG05dVRHbHVhMFZ1ZEdWeUxtSnBibVFvZEdocGN5a3BPMXh1WEhRZ0lDQWdaRzlqZFcxbGJuUXVZbTlrZVM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkMGIzVmphSE4wWVhKMEp5d2dkR2hwY3k1dmJreHBibXRGYm5SbGNpNWlhVzVrS0hSb2FYTXBLVHRjYmx4MElDQjlMRnh1WEhSY2JseDBJQ0F2S2lwY2JseDBJQ0FnS2lCRFlXeHNZbUZqYXlCbWIzSWdkR2hsSUcxdmRYTmxhRzkyWlhJdmRHOTFZMmh6ZEdGeWRGeHVYSFFnSUNBcVhHNWNkQ0FnSUNvZ1FHMWxiV0psY2s5bUlFSmhjbUpoTGxCeVpXWmxkR05vWEc1Y2RDQWdJQ29nUUhCeWFYWmhkR1ZjYmx4MElDQWdLaUJBY0dGeVlXMGdJSHRQWW1wbFkzUjlJR1YyZEZ4dVhIUWdJQ0FxTDF4dVhIUWdJRzl1VEdsdWEwVnVkR1Z5T2lCbWRXNWpkR2x2YmlobGRuUXBJSHRjYmx4MElDQWdJSFpoY2lCbGJDQTlJR1YyZEM1MFlYSm5aWFE3WEc1Y2RGeHVYSFFnSUNBZ2QyaHBiR1VnS0dWc0lDWW1JQ0ZRYW1GNExtZGxkRWh5WldZb1pXd3BLU0I3WEc1Y2RDQWdJQ0FnSUdWc0lEMGdaV3d1Y0dGeVpXNTBUbTlrWlR0Y2JseDBJQ0FnSUgxY2JseDBYRzVjZENBZ0lDQnBaaUFvSVdWc0lIeDhJR1ZzTG1Oc1lYTnpUR2x6ZEM1amIyNTBZV2x1Y3loMGFHbHpMbWxuYm05eVpVTnNZWE56VEdsdWF5a3BJSHRjYmx4MElDQWdJQ0FnY21WMGRYSnVPMXh1WEhRZ0lDQWdmVnh1WEhSY2JseDBJQ0FnSUhaaGNpQjFjbXdnUFNCUWFtRjRMbWRsZEVoeVpXWW9aV3dwTzF4dVhIUmNibHgwSUNBZ0lDOHZRMmhsWTJzZ2FXWWdkR2hsSUd4cGJtc2dhWE1nWld4bFoybGliR1VnWm05eUlGQnFZWGhjYmx4MElDQWdJR2xtSUNoUWFtRjRMbkJ5WlhabGJuUkRhR1ZqYXlobGRuUXNJR1ZzS1NBbUppQWhVR3BoZUM1RFlXTm9aUzVuWlhRb2RYSnNLU2tnZTF4dVhIUWdJQ0FnSUNCMllYSWdlR2h5SUQwZ1ZYUnBiSE11ZUdoeUtIVnliQ2s3WEc1Y2RDQWdJQ0FnSUZCcVlYZ3VRMkZqYUdVdWMyVjBLSFZ5YkN3Z2VHaHlLVHRjYmx4MElDQWdJSDFjYmx4MElDQjlYRzVjZEgwN1hHNWNkRnh1WEhSdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUZCeVpXWmxkR05vTzF4dVhHNWNiaThxS2lvdklIMWNiaThxS2lvcUtpb3ZJRjBwWEc1OUtUdGNianRjYmk4dkl5QnpiM1Z5WTJWTllYQndhVzVuVlZKTVBXSmhjbUpoTG1wekxtMWhjQ0lzSWk4cUlTQk5kV3gwYVhCc1pTNXFjeUF0SUhZd0xqQXVNU0F0SURJd01UWXRNRFF0TURsY2NseHVLaUJvZEhSd09pOHZUbVZZVkhNdVoybDBhSFZpTG1OdmJTOU5kV3gwYVhCc1pTNXFjeTljY2x4dUtpQkRiM0I1Y21sbmFIUWdLR01wSURJd01UVWdSR1Z1YVhNZ1RIVnJiM1k3SUV4cFkyVnVjMlZrSUUxSlZDQXFMMXh5WEc1Y2NseHVPeWhtZFc1amRHbHZiaWh5YjI5MExDQmtaV1pwYm1sMGFXOXVLU0I3WEhKY2JpQWdJQ0JwWmlBb2RIbHdaVzltSUcxdlpIVnNaU0FoUFNBbmRXNWtaV1pwYm1Wa0p5a2diVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQmtaV1pwYm1sMGFXOXVLQ2s3WEhKY2JpQWdJQ0JsYkhObElHbG1JQ2gwZVhCbGIyWWdaR1ZtYVc1bElEMDlJQ2RtZFc1amRHbHZiaWNnSmlZZ2RIbHdaVzltSUdSbFptbHVaUzVoYldRZ1BUMGdKMjlpYW1WamRDY3BJR1JsWm1sdVpTaGtaV1pwYm1sMGFXOXVLVHRjY2x4dUlDQWdJR1ZzYzJVZ2NtOXZkRnNuVFhWc2RHbHdiR1VuWFNBOUlHUmxabWx1YVhScGIyNG9LVHRjY2x4dWZTaDBhR2x6TENCbWRXNWpkR2x2YmlncElIdGNjbHh1WEhSY0luVnpaU0J6ZEhKcFkzUmNJbHh5WEc1Y2NseHVYSFF2THlCb2RIUndPaTh2YzNSaFkydHZkbVZ5Wm14dmR5NWpiMjB2WVM4ME9ERTVPRGcyTHpFeU1qRXdPREpjY2x4dVhIUjJZWElnYVhOTmIySnBiR1VnUFNBbmIyNTBiM1ZqYUhOMFlYSjBKeUJwYmlCM2FXNWtiM2NnZkh3Z2JtRjJhV2RoZEc5eUxtMWhlRlJ2ZFdOb1VHOXBiblJ6TzF4eVhHNWNkQzh2SUdoMGRIQTZMeTl6ZEdGamEyOTJaWEptYkc5M0xtTnZiUzloTHpFeU5qSTFPVEEzTHpFeU1qRXdPREpjY2x4dVhIUjJZWElnYVhOWFpXSnJhWFFnUFNBblYyVmlhMmwwUVhCd1pXRnlZVzVqWlNjZ2FXNGdaRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MExuTjBlV3hsTzF4eVhHNWNjbHh1WEhRdkx5QkdiM0pqWlNCM1pXSnJhWFFnY21Wd1lXbHVkQ0J2YmlCeVpYTnBlbVZjY2x4dVhIUnBjMWRsWW10cGRDQW1KaUIzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25jbVZ6YVhwbEp5d2dablZ1WTNScGIyNG9aU2w3WEhKY2JseDBYSFJrYjJOMWJXVnVkQzVpYjJSNUxuTjBlV3hsTG5acGMybGlhV3hwZEhrZ1BTQW5hR2xrWkdWdUp6dGNjbHh1WEhSY2RHVWdQU0JrYjJOMWJXVnVkQzVpYjJSNUxtOW1abk5sZEVobGFXZG9kRHRjY2x4dVhIUmNkR1J2WTNWdFpXNTBMbUp2WkhrdWMzUjViR1V1ZG1semFXSnBiR2wwZVNBOUlDY25PMXh5WEc1Y2RIMHBPMXh5WEc1Y2NseHVYSFIyWVhJZ1RYVnNkR2x3YkdVZ1BTQm1kVzVqZEdsdmJpaHZjSFJwYjI1ektTQjdYSEpjYmx4MFhIUnBaaWdnSVNBb2RHaHBjeUJwYm5OMFlXNWpaVzltSUUxMWJIUnBjR3hsS1NrZ2NtVjBkWEp1SUc1bGR5Qk5kV3gwYVhCc1pTaHZjSFJwYjI1ektUdGNjbHh1WEhKY2JseDBYSFJiSjNObGJHVmpkRzl5Snl3Z0oySmhZMnRuY205MWJtUW5MQ0FuWVdabVpXTjBWR1Y0ZENjc0lDZHZjR0ZqYVhSNUoxMHVabTl5UldGamFDaG1kVzVqZEdsdmJpaHZjSFJwYjI0cElIdGNjbHh1WEhSY2RGeDBkR2hwYzF0dmNIUnBiMjVkSUQwZ2IzQjBhVzl1YzF0dmNIUnBiMjVkTzF4eVhHNWNkRngwZlM1aWFXNWtLSFJvYVhNcEtUdGNjbHh1WEhKY2JseDBYSFIwYUdsekxtTnNZWE56VG1GdFpTQTlJQ2R0ZFd4MGFYQnNaUzBuSUNzZ0tHbHpUVzlpYVd4bElEOGdKMjF2WW1sc1pTY2dPaUFuWkdWemEzUnZjQ2NwSUNzZ0tIUm9hWE11WVdabVpXTjBWR1Y0ZENBL0lDY3RkR1Y0ZENjZ09pQW5KeWs3WEhKY2JseDBYSFIwYUdsekxuVndaR0YwWlNoMGFHbHpMbUpoWTJ0bmNtOTFibVFwTzF4eVhHNWNkSDFjY2x4dVhISmNibHgwVFhWc2RHbHdiR1V1Y0hKdmRHOTBlWEJsSUQwZ2UxeHlYRzVjZEZ4MFkyOXVjM1J5ZFdOMGIzSTZJRTExYkhScGNHeGxMRnh5WEc1Y2RGeDBaV0ZqYURvZ1puVnVZM1JwYjI0b2MyVnNaV04wTENCallXeHNZbUZqYXl3Z2JtOWtaWE1wSUh0Y2NseHVYSFJjZEZ4MFFYSnlZWGt1Y0hKdmRHOTBlWEJsTG5Oc2FXTmxMbU5oYkd3b2JtOWtaWE1nUHlCelpXeGxZM1FnT2lCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlRV3hzS0hObGJHVmpkQ2twTG1admNrVmhZMmdvWTJGc2JHSmhZMnN1WW1sdVpDaDBhR2x6S1NrN1hISmNibHgwWEhSOUxGeHlYRzVjZEZ4MEx5OGdJMlk1TlNCdmNpQWpabVk1T1RVMUlHOXlJSEpuWWlneU5UVXNNVFV6TERnMUtTQXRQaUJ5WjJKaEtESTFOU3d4TURJc01Dd3dMalkyTmlsY2NseHVYSFJjZEhObGRFOXdZV05wZEhrNklHWjFibU4wYVc5dUtITjBlV3hsY3lrZ2UxeHlYRzVjZEZ4MFhIUnlaWFIxY200Z2MzUjViR1Z6TG5KbGNHeGhZMlVvTHlOY1hHSW9XMkV0Wmx4Y1pGMTdNMzE4VzJFdFpseGNaRjE3Tm4wcFhGeGlMMmRwTENCbWRXNWpkR2x2YmlobWRXeHNMQ0JvWlhncElIdGNjbHh1WEhSY2RGeDBJQ0JjZEhaaGNpQnlaMklnUFNCb1pYZ3ViV0YwWTJnb2JtVjNJRkpsWjBWNGNDZ25LQzU3SnlBcklHaGxlQzVzWlc1bmRHZ3ZNeUFySUNkOUtTY3NJQ2RuSnlrcExtMWhjQ2htZFc1amRHbHZiaWhzS1NCN0lISmxkSFZ5YmlCd1lYSnpaVWx1ZENob1pYZ3ViR1Z1WjNSb0pUSWdQeUJzSzJ3Z09pQnNMQ0F4TmlrZ2ZTazdYSEpjYmx4MFhIUmNkRngwY21WMGRYSnVJQ2R5WjJJb0p5QXJJSEpuWWk1cWIybHVLQ2NzSnlrZ0t5QW5LU2M3WEhKY2JseDBYSFJjZEgwcExuSmxjR3hoWTJVb0wzSm5ZbHhjS0NndVcxNWNYQ2xkS2lsY1hDa3ZaMmtzSUdaMWJtTjBhVzl1S0daMWJHd3NJSEpuWWlrZ2UxeHlYRzVjZEZ4MFhIUmNkSFpoY2lCdGFXNHNJR0VnUFNBb01qVTFJQzBnS0cxcGJpQTlJRTFoZEdndWJXbHVMbUZ3Y0d4NUtFMWhkR2dzSUNoeVoySWdQU0J5WjJJdWMzQnNhWFFvSnl3bktTa3BLU2tnTHlBeU5UVXNYSEpjYmx4MFhIUmNkRngwWEhSeVoySmhJRDBnZEdocGN5NXZjR0ZqYVhSNUlEMDlQU0IwY25WbFhISmNibHgwWEhSY2RGeDBYSFJjZEQ4Z2NtZGlMbTFoY0NobWRXNWpkR2x2YmloamFHRnVibVZzS1NCN0lISmxkSFZ5YmlBd0lId2dLR05vWVc1dVpXd2dMU0J0YVc0cElDOGdZU0I5S1M1amIyNWpZWFFvS0RCOE1UQXdNQ3BoS1M4eE1EQXdLVnh5WEc1Y2RGeDBYSFJjZEZ4MFhIUTZJSEpuWWk1amIyNWpZWFFvZEdocGN5NXZjR0ZqYVhSNUtUdGNjbHh1WEhSY2RGeDBYSFJ5WlhSMWNtNGdKM0puWW1Fb0p5QXJJSEpuWW1FdWFtOXBiaWduTENjcElDc2dKeWtuTzF4eVhHNWNkRngwWEhSOUxtSnBibVFvZEdocGN5a3BPMXh5WEc1Y2RGeDBmU3hjY2x4dVhIUmNkQzh2SUd4cGJtVmhjaTFuY21Ga2FXVnVkQ2dqWm1abUxDQWpNREF3S1NBdFBpQXRkMlZpYTJsMExTb3NJQzF0YjNvdEtpd2dMVzF6TFNvc0lDMXZMU3BjY2x4dVhIUmNkSE5sZEZabGJtUnZjbk02SUdaMWJtTjBhVzl1S0hOMGVXeGxjeXdnZEdWNGRFMXZaR1VwSUh0Y2NseHVYSFJjZEZ4MGRtRnlJSEpsYzNWc2RDQTlJSFJsZUhSTmIyUmxJRDhnVzEwZ09pQmJjM1I1YkdWelhUdGNjbHh1WEhSY2RGeDBhV1lvTHkxbmNtRmthV1Z1ZEZ4Y0tDOXBMblJsYzNRb2MzUjViR1Z6S1NCOGZDQjBaWGgwVFc5a1pTa2dXeWQzWldKcmFYUW5MQ0FuYlc5Nkp5d2dKMjF6Snl3Z0oyOG5YUzVtYjNKRllXTm9LR1oxYm1OMGFXOXVLSFpsYm1SdmNpd2dhU2tnZTF4eVhHNWNkRngwWEhSY2RHbG1LSFJsZUhSTmIyUmxJQ1ltSUdrcElISmxkSFZ5Ymp0Y2NseHVYSFJjZEZ4MFhIUnlaWE4xYkhRdWRXNXphR2xtZENnb2RHVjRkRTF2WkdVZ1B5QW5MWGRsWW10cGRDMXNhVzVsWVhJdFozSmhaR2xsYm5Rb2RISmhibk53WVhKbGJuUXNkSEpoYm5Od1lYSmxiblFwTENjZ09pQW5KeWtnS3lCemRIbHNaWE11Y21Wd2JHRmpaU2d2S0Z0ZUxGeGNjMTBxTFdkeVlXUnBaVzUwWEZ3b0tTOW5hU3dnSnkwbklDc2dkbVZ1Wkc5eUlDc2dKeTBrTVNjcEtUdGNjbHh1WEhRZ0lGeDBYSFI5S1R0Y2NseHVYSFJjZEZ4MGNtVjBkWEp1SUhKbGMzVnNkRHRjY2x4dVhIUmNkSDBzWEhKY2JseDBYSFJ6WlhSVGRIbHNaWE02SUdaMWJtTjBhVzl1S0hObGJHVmpkRzl5TENCemRIbHNaWE1zSUhSbGVIUk5iMlJsS1NCN1hISmNibHgwWEhSY2RHbG1LSFJvYVhNdWIzQmhZMmwwZVNrZ2MzUjViR1Z6SUQwZ2RHaHBjeTV6WlhSUGNHRmphWFI1S0hOMGVXeGxjeWs3WEhKY2JseDBYSFJjZEhSb2FYTXVjM1I1YkdWVVlXY3VhVzV1WlhKSVZFMU1JRDBnYzJWc1pXTjBiM0lnS3lBbmUySmhZMnRuY205MWJtUXRhVzFoWjJVNkp5QXJJSFJvYVhNdWMyVjBWbVZ1Wkc5eWN5aHpkSGxzWlhNc0lIUmxlSFJOYjJSbEtTNXFiMmx1S0NjN1hGeHVZbUZqYTJkeWIzVnVaQzFwYldGblpUb25LU0FySUNkOUp6dGNjbHh1WEhSY2RIMHNYSEpjYmx4MFhIUnlaVzVrWlhKVVlXYzZJR1oxYm1OMGFXOXVLR05zWVhOelRtRnRaU2tnZTF4eVhHNWNkRngwWEhSMllYSWdkR0ZuSUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2duWkdsMkp5azdYSEpjYmx4MFhIUmNkSFJoWnk1amJHRnpjMDVoYldVZ1BTQmpiR0Z6YzA1aGJXVTdYSEpjYmx4MFhIUmNkSEpsZEhWeWJpQjBZV2M3WEhKY2JseDBYSFI5TEZ4eVhHNWNkRngwZFhCa1lYUmxPaUJtZFc1amRHbHZiaWh6ZEhsc1pYTXBJSHRjY2x4dVhIUmNkRngwZEdocGN5NWxZV05vS0hSb2FYTXVjMlZzWldOMGIzSXNJR1oxYm1OMGFXOXVLR1ZzWlcwcElIdGNjbHh1WEhSY2RGeDBYSFJwWmlobGJHVnRMbWRsZEVGMGRISnBZblYwWlNnblpHRjBZUzF0ZFd4MGFYQnNaU2NwS1NCeVpYUjFjbTQ3WEhKY2JseDBYSFJjZEZ4MGFXWW9JQ0VnYVhOTmIySnBiR1VnZkh3Z2RHaHBjeTVoWm1abFkzUlVaWGgwS1NCeVpYUjFjbTRnWld4bGJTNWpiR0Z6YzB4cGMzUXVZV1JrS0hSb2FYTXVZMnhoYzNOT1lXMWxLVHRjY2x4dVhISmNibHgwWEhSY2RGeDBkbUZ5SUhkeVlYQndaWEpVWVdjZ1BTQjBhR2x6TG5KbGJtUmxjbFJoWnloMGFHbHpMbU5zWVhOelRtRnRaU0FySUNjdGQzSmhjSEJsY2ljcExGeHlYRzVjZEZ4MFhIUmNkRngwWTI5dWRHVnVkRlJoWnlBOUlIUm9hWE11Y21WdVpHVnlWR0ZuS0hSb2FYTXVZMnhoYzNOT1lXMWxJQ3NnSnkxamIyNTBaVzUwSnlrN1hISmNibHgwWEhSY2RGeDBkR2hwY3k1bFlXTm9LR1ZzWlcwdVkyaHBiR1JPYjJSbGN5d2dablZ1WTNScGIyNG9ZMmhwYkdRcElIc2dZMjl1ZEdWdWRGUmhaeTVoY0hCbGJtUkRhR2xzWkNoamFHbHNaQ2tnZlN3Z2RISjFaU2s3WEhKY2JseDBYSFJjZEZ4MFpXeGxiUzVoY0hCbGJtUkRhR2xzWkNoM2NtRndjR1Z5VkdGbktUdGNjbHh1WEhSY2RGeDBYSFIzY21Gd2NHVnlWR0ZuTG1Gd2NHVnVaRU5vYVd4a0tIUm9hWE11Y21WdVpHVnlWR0ZuS0hSb2FYTXVZMnhoYzNOT1lXMWxLU2s3WEhKY2JseDBYSFJjZEZ4MGQzSmhjSEJsY2xSaFp5NWhjSEJsYm1SRGFHbHNaQ2hqYjI1MFpXNTBWR0ZuS1R0Y2NseHVYSFJjZEZ4MFhIUmxiR1Z0TG5ObGRFRjBkSEpwWW5WMFpTZ25aR0YwWVMxdGRXeDBhWEJzWlNjc0lIUnlkV1VwTzF4eVhHNWNkRngwWEhSOUtUdGNjbHh1WEhKY2JseDBYSFJjZEdsbUtDQWhJSE4wZVd4bGN5a2djbVYwZFhKdU8xeHlYRzVjZEZ4MFhIUnBaaWdnSVNCMGFHbHpMbk4wZVd4bFZHRm5LU0JrYjJOMWJXVnVkQzVvWldGa0xtRndjR1Z1WkVOb2FXeGtLSFJvYVhNdWMzUjViR1ZVWVdjZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0NkemRIbHNaU2NwS1R0Y2NseHVYSFJjZEZ4MGFXWW9JQ0VnYVhOTmIySnBiR1VnZkh3Z0lTQjBhR2x6TG1GbVptVmpkRlJsZUhRcElIUm9hWE11YzJWMFUzUjViR1Z6S0hSb2FYTXVjMlZzWldOMGIzSWdLeUFvYVhOTmIySnBiR1VnUHlBbklDY2dPaUFuSnlrZ0t5QW5MaWNnS3lCMGFHbHpMbU5zWVhOelRtRnRaU0FySUNocGMwMXZZbWxzWlNBL0lDYzZZbVZtYjNKbEp5QTZJQ2NuS1N3Z2MzUjViR1Z6TENCMGFHbHpMbUZtWm1WamRGUmxlSFFwTzF4eVhHNWNkRngwWEhScFppaDBhR2x6TG1GbVptVmpkRlJsZUhRcElIUm9hWE11YzNSNWJHVlVZV2N1YVc1dVpYSklWRTFNSUNzOUlIUm9hWE11YzJWc1pXTjBiM0lnS3lBbkxpY2dLeUIwYUdsekxtTnNZWE56VG1GdFpTQXJJQ2Q3WTI5c2IzSTZKeUFySUhSb2FYTXVZV1ptWldOMFZHVjRkQ0FySUNkOUp6dGNjbHh1WEhSY2RIMHNYSEpjYmx4MFhIUmtaWE4wY205NU9pQm1kVzVqZEdsdmJpZ3BJSHRjY2x4dVhIUmNkRngwZEdocGN5NXpkSGxzWlZSaFp5NXdZWEpsYm5ST2IyUmxJQ1ltSUhSb2FYTXVjM1I1YkdWVVlXY3VjR0Z5Wlc1MFRtOWtaUzV5WlcxdmRtVkRhR2xzWkNoMGFHbHpMbk4wZVd4bFZHRm5LU0FtSmlCa1pXeGxkR1VnZEdocGN5NXpkSGxzWlZSaFp6dGNjbHh1WEhSY2RGeDBkR2hwY3k1bFlXTm9LSFJvYVhNdWMyVnNaV04wYjNJc0lHWjFibU4wYVc5dUtHVnNaVzBwSUh0Y2NseHVYSFJjZEZ4MFhIUmxiR1Z0TG1Oc1lYTnpUR2x6ZEM1eVpXMXZkbVVvZEdocGN5NWpiR0Z6YzA1aGJXVXBPMXh5WEc1Y2RGeDBYSFJjZEdWc1pXMHVjbVZ0YjNabFFYUjBjbWxpZFhSbEtDZGtZWFJoTFcxMWJIUnBjR3hsSnlrN1hISmNibHh5WEc1Y2RGeDBYSFJjZEdsbUtDQWhJR2x6VFc5aWFXeGxJSHg4SUhSb2FYTXVZV1ptWldOMFZHVjRkQ2tnY21WMGRYSnVPMXh5WEc1Y2RGeDBYSFJjZEhSb2FYTXVaV0ZqYUNobGJHVnRMbU5vYVd4a2NtVnVXekJkTG1Ob2FXeGtjbVZ1V3pGZExtTm9hV3hrVG05a1pYTXNJR1oxYm1OMGFXOXVLR05vYVd4a0tTQjdJR1ZzWlcwdVlYQndaVzVrUTJocGJHUW9ZMmhwYkdRcElIMHNJSFJ5ZFdVcE8xeHlYRzVjZEZ4MFhIUmNkR1ZzWlcwdWNtVnRiM1psUTJocGJHUW9aV3hsYlM1amFHbHNaSEpsYmxzd1hTazdYSEpjYmx4MFhIUmNkSDBwTzF4eVhHNWNkRngwZlZ4eVhHNWNkSDFjY2x4dVhISmNibHgwY21WMGRYSnVJRTExYkhScGNHeGxPMXh5WEc1OUtTazdJaXdpTHlvaElITnJjbTlzYkhJZ01DNDJMakkySUNneU1ERTBMVEEyTFRBNEtTQjhJRUZzWlhoaGJtUmxjaUJRY21sdWVtaHZjbTRnTFNCb2RIUndjem92TDJkcGRHaDFZaTVqYjIwdlVISnBibnBvYjNKdUwzTnJjbTlzYkhJZ2ZDQkdjbVZsSUhSdklIVnpaU0IxYm1SbGNpQjBaWEp0Y3lCdlppQk5TVlFnYkdsalpXNXpaU0FxTDF4dUtHWjFibU4wYVc5dUtHVXNkQ3h5S1h0Y0luVnpaU0J6ZEhKcFkzUmNJanRtZFc1amRHbHZiaUJ1S0hJcGUybG1LRzg5ZEM1a2IyTjFiV1Z1ZEVWc1pXMWxiblFzWVQxMExtSnZaSGtzU3lncExHbDBQWFJvYVhNc2NqMXlmSHg3ZlN4MWREMXlMbU52Ym5OMFlXNTBjM3g4ZTMwc2NpNWxZWE5wYm1jcFptOXlLSFpoY2lCdUlHbHVJSEl1WldGemFXNW5LVlZiYmwwOWNpNWxZWE5wYm1kYmJsMDdlWFE5Y2k1bFpHZGxVM1J5WVhSbFozbDhmRndpYzJWMFhDSXNZM1E5ZTJKbFptOXlaWEpsYm1SbGNqcHlMbUpsWm05eVpYSmxibVJsY2l4eVpXNWtaWEk2Y2k1eVpXNWtaWElzYTJWNVpuSmhiV1U2Y2k1clpYbG1jbUZ0Wlgwc1puUTljaTVtYjNKalpVaGxhV2RvZENFOVBTRXhMR1owSmlZb1ZuUTljaTV6WTJGc1pYeDhNU2tzYlhROWNpNXRiMkpwYkdWRVpXTmxiR1Z5WVhScGIyNThmSGdzWkhROWNpNXpiVzl2ZEdoVFkzSnZiR3hwYm1jaFBUMGhNU3huZEQxeUxuTnRiMjkwYUZOamNtOXNiR2x1WjBSMWNtRjBhVzl1Zkh4RkxIWjBQWHQwWVhKblpYUlViM0E2YVhRdVoyVjBVMk55YjJ4c1ZHOXdLQ2w5TEVkMFBTaHlMbTF2WW1sc1pVTm9aV05yZkh4bWRXNWpkR2x2YmlncGUzSmxkSFZ5Ymk5QmJtUnliMmxrZkdsUWFHOXVaWHhwVUdGa2ZHbFFiMlI4UW14aFkydENaWEp5ZVM5cExuUmxjM1FvYm1GMmFXZGhkRzl5TG5WelpYSkJaMlZ1ZEh4OGJtRjJhV2RoZEc5eUxuWmxibVJ2Y254OFpTNXZjR1Z5WVNsOUtTZ3BMRWQwUHloemREMTBMbWRsZEVWc1pXMWxiblJDZVVsa0tGd2ljMnR5YjJ4c2NpMWliMlI1WENJcExITjBKaVpoZENncExGZ29LU3hFZENodkxGdDVMRk5kTEZ0VVhTa3BPa1IwS0c4c1cza3NZbDBzVzFSZEtTeHBkQzV5WldaeVpYTm9LQ2tzVTNRb1pTeGNJbkpsYzJsNlpTQnZjbWxsYm5SaGRHbHZibU5vWVc1blpWd2lMR1oxYm1OMGFXOXVLQ2w3ZG1GeUlHVTlieTVqYkdsbGJuUlhhV1IwYUN4MFBXOHVZMnhwWlc1MFNHVnBaMmgwT3loMElUMDlKSFI4ZkdVaFBUMU5kQ2ttSmlna2REMTBMRTEwUFdVc1gzUTlJVEFwZlNrN2RtRnlJR2s5V1NncE8zSmxkSFZ5YmlCbWRXNWpkR2x2YmlCc0tDbDdXaWdwTEdKMFBXa29iQ2w5S0Nrc2FYUjlkbUZ5SUc4c1lTeHBQWHRuWlhRNlpuVnVZM1JwYjI0b0tYdHlaWFIxY200Z2FYUjlMR2x1YVhRNlpuVnVZM1JwYjI0b1pTbDdjbVYwZFhKdUlHbDBmSHh1WlhjZ2JpaGxLWDBzVmtWU1UwbFBUanBjSWpBdU5pNHlObHdpZlN4c1BVOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGtzY3oxbExrMWhkR2dzWXoxbExtZGxkRU52YlhCMWRHVmtVM1I1YkdVc1pqMWNJblJ2ZFdOb2MzUmhjblJjSWl4MVBWd2lkRzkxWTJodGIzWmxYQ0lzYlQxY0luUnZkV05vWTJGdVkyVnNYQ0lzY0QxY0luUnZkV05vWlc1a1hDSXNaRDFjSW5OcmNtOXNiR0ZpYkdWY0lpeG5QV1FyWENJdFltVm1iM0psWENJc2RqMWtLMXdpTFdKbGRIZGxaVzVjSWl4b1BXUXJYQ0l0WVdaMFpYSmNJaXg1UFZ3aWMydHliMnhzY2x3aUxGUTlYQ0p1YnkxY0lpdDVMR0k5ZVN0Y0lpMWtaWE5yZEc5d1hDSXNVejE1SzF3aUxXMXZZbWxzWlZ3aUxHczlYQ0pzYVc1bFlYSmNJaXgzUFRGbE15eDRQUzR3TURRc1JUMHlNREFzUVQxY0luTjBZWEowWENJc1JqMWNJbVZ1WkZ3aUxFTTlYQ0pqWlc1MFpYSmNJaXhFUFZ3aVltOTBkRzl0WENJc1NEMWNJbDlmWDNOcmNtOXNiR0ZpYkdWZmFXUmNJaXhKUFM5ZUtEODZhVzV3ZFhSOGRHVjRkR0Z5WldGOFluVjBkRzl1ZkhObGJHVmpkQ2trTDJrc1VEMHZYbHhjY3l0OFhGeHpLeVF2Wnl4T1BTOWVaR0YwWVNnL09pMG9YMXhjZHlzcEtUOG9Qem90UHlndFAxeGNaQ3BjWEM0L1hGeGtLM0EvS1NrL0tEODZMVDhvYzNSaGNuUjhaVzVrZkhSdmNIeGpaVzUwWlhKOFltOTBkRzl0S1NrL0tEODZMVDhvZEc5d2ZHTmxiblJsY254aWIzUjBiMjBwS1Q4a0x5eFBQUzljWEhNcUtFQS9XMXhjZDF4Y0xWeGNXMXhjWFYwcktWeGNjeW82WEZ4ektpZ3VLejhwWEZ4ektpZy9PanQ4SkNrdloya3NWajB2WGloQVAxdGhMWHBjWEMxZEt5bGNYRnNvWEZ4M0t5bGNYRjBrTHl4NlBTOHRLRnRoTFhvd0xUbGZYU2t2Wnl4eFBXWjFibU4wYVc5dUtHVXNkQ2w3Y21WMGRYSnVJSFF1ZEc5VmNIQmxja05oYzJVb0tYMHNURDB2VzF4Y0xTdGRQMXRjWEdSZEtseGNMajliWEZ4a1hTc3ZaeXhOUFM5Y1hIdGNYRDljWEgwdlp5d2tQUzl5WjJKaFAxeGNLRnhjY3lvdFAxeGNaQ3RjWEhNcUxGeGNjeW90UDF4Y1pDdGNYSE1xTEZ4Y2N5b3RQMXhjWkNzdlp5eGZQUzliWVMxNlhGd3RYU3N0WjNKaFpHbGxiblF2Wnl4Q1BWd2lYQ0lzUnoxY0lsd2lMRXM5Wm5WdVkzUnBiMjRvS1h0MllYSWdaVDB2WGlnL09rOThUVzk2ZkhkbFltdHBkSHh0Y3lsOEtEODZMU2cvT205OGJXOTZmSGRsWW10cGRIeHRjeWt0S1M4N2FXWW9ZeWw3ZG1GeUlIUTlZeWhoTEc1MWJHd3BPMlp2Y2loMllYSWdiaUJwYmlCMEtXbG1LRUk5Ymk1dFlYUmphQ2hsS1h4OEsyNDlQVzRtSm5SYmJsMHViV0YwWTJnb1pTa3BZbkpsWVdzN2FXWW9JVUlwY21WMGRYSnVJRUk5UnoxY0lsd2lMSEk3UWoxQ1d6QmRMRndpTFZ3aVBUMDlRaTV6YkdsalpTZ3dMREVwUHloSFBVSXNRajE3WENJdGQyVmlhMmwwTFZ3aU9sd2lkMlZpYTJsMFhDSXNYQ0l0Ylc5NkxWd2lPbHdpVFc5NlhDSXNYQ0l0YlhNdFhDSTZYQ0p0YzF3aUxGd2lMVzh0WENJNlhDSlBYQ0o5VzBKZEtUcEhQVndpTFZ3aUswSXVkRzlNYjNkbGNrTmhjMlVvS1N0Y0lpMWNJbjE5TEZrOVpuVnVZM1JwYjI0b0tYdDJZWElnZEQxbExuSmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaWHg4WlZ0Q0xuUnZURzkzWlhKRFlYTmxLQ2tyWENKU1pYRjFaWE4wUVc1cGJXRjBhVzl1Um5KaGJXVmNJbDBzY2oxUWRDZ3BPM0psZEhWeWJpaEhkSHg4SVhRcEppWW9kRDFtZFc1amRHbHZiaWgwS1h0MllYSWdiajFRZENncExYSXNiejF6TG0xaGVDZ3dMREZsTXk4Mk1DMXVLVHR5WlhSMWNtNGdaUzV6WlhSVWFXMWxiM1YwS0daMWJtTjBhVzl1S0NsN2NqMVFkQ2dwTEhRb0tYMHNieWw5S1N4MGZTeFNQV1oxYm1OMGFXOXVLQ2w3ZG1GeUlIUTlaUzVqWVc1alpXeEJibWx0WVhScGIyNUdjbUZ0Wlh4OFpWdENMblJ2VEc5M1pYSkRZWE5sS0NrclhDSkRZVzVqWld4QmJtbHRZWFJwYjI1R2NtRnRaVndpWFR0eVpYUjFjbTRvUjNSOGZDRjBLU1ltS0hROVpuVnVZM1JwYjI0b2RDbDdjbVYwZFhKdUlHVXVZMnhsWVhKVWFXMWxiM1YwS0hRcGZTa3NkSDBzVlQxN1ltVm5hVzQ2Wm5WdVkzUnBiMjRvS1h0eVpYUjFjbTRnTUgwc1pXNWtPbVoxYm1OMGFXOXVLQ2w3Y21WMGRYSnVJREY5TEd4cGJtVmhjanBtZFc1amRHbHZiaWhsS1h0eVpYUjFjbTRnWlgwc2NYVmhaSEpoZEdsak9tWjFibU4wYVc5dUtHVXBlM0psZEhWeWJpQmxLbVY5TEdOMVltbGpPbVoxYm1OMGFXOXVLR1VwZTNKbGRIVnliaUJsS21VcVpYMHNjM2RwYm1jNlpuVnVZM1JwYjI0b1pTbDdjbVYwZFhKdUxYTXVZMjl6S0dVcWN5NVFTU2t2TWlzdU5YMHNjM0Z5ZERwbWRXNWpkR2x2YmlobEtYdHlaWFIxY200Z2N5NXpjWEowS0dVcGZTeHZkWFJEZFdKcFl6cG1kVzVqZEdsdmJpaGxLWHR5WlhSMWNtNGdjeTV3YjNjb1pTMHhMRE1wS3pGOUxHSnZkVzVqWlRwbWRXNWpkR2x2YmlobEtYdDJZWElnZER0cFppZ3VOVEE0TXo0OVpTbDBQVE03Wld4elpTQnBaaWd1T0RRNE9UNDlaU2wwUFRrN1pXeHpaU0JwWmlndU9UWXlNRGcrUFdVcGREMHlOenRsYkhObGUybG1LQ0VvTGprNU9UZ3hQajFsS1NseVpYUjFjbTRnTVR0MFBUa3hmWEpsZEhWeWJpQXhMWE11WVdKektETXFjeTVqYjNNb01TNHdNamdxWlNwMEtTOTBLWDE5TzI0dWNISnZkRzkwZVhCbExuSmxabkpsYzJnOVpuVnVZM1JwYjI0b1pTbDdkbUZ5SUc0c2J5eGhQU0V4TzJadmNpaGxQVDA5Y2o4b1lUMGhNQ3hzZEQxYlhTeENkRDB3TEdVOWRDNW5aWFJGYkdWdFpXNTBjMEo1VkdGblRtRnRaU2hjSWlwY0lpa3BPbVV1YkdWdVozUm9QVDA5Y2lZbUtHVTlXMlZkS1N4dVBUQXNiejFsTG14bGJtZDBhRHR2UG00N2Jpc3JLWHQyWVhJZ2FUMWxXMjVkTEd3OWFTeHpQVnRkTEdNOVpIUXNaajE1ZEN4MVBTRXhPMmxtS0dFbUprZ2dhVzRnYVNZbVpHVnNaWFJsSUdsYlNGMHNhUzVoZEhSeWFXSjFkR1Z6S1h0bWIzSW9kbUZ5SUcwOU1DeHdQV2t1WVhSMGNtbGlkWFJsY3k1c1pXNW5kR2c3Y0Q1dE8yMHJLeWw3ZG1GeUlHYzlhUzVoZEhSeWFXSjFkR1Z6VzIxZE8ybG1LRndpWkdGMFlTMWhibU5vYjNJdGRHRnlaMlYwWENJaFBUMW5MbTVoYldVcGFXWW9YQ0prWVhSaExYTnRiMjkwYUMxelkzSnZiR3hwYm1kY0lpRTlQV2N1Ym1GdFpTbHBaaWhjSW1SaGRHRXRaV1JuWlMxemRISmhkR1ZuZVZ3aUlUMDlaeTV1WVcxbEtXbG1LRndpWkdGMFlTMWxiV2wwTFdWMlpXNTBjMXdpSVQwOVp5NXVZVzFsS1h0MllYSWdkajFuTG01aGJXVXViV0YwWTJnb1RpazdhV1lvYm5Wc2JDRTlQWFlwZTNaaGNpQm9QWHR3Y205d2N6cG5MblpoYkhWbExHVnNaVzFsYm5RNmFTeGxkbVZ1ZEZSNWNHVTZaeTV1WVcxbExuSmxjR3hoWTJVb2VpeHhLWDA3Y3k1d2RYTm9LR2dwTzNaaGNpQjVQWFpiTVYwN2VTWW1LR2d1WTI5dWMzUmhiblE5ZVM1emRXSnpkSElvTVNrcE8zWmhjaUJVUFhaYk1sMDdMM0FrTHk1MFpYTjBLRlFwUHlob0xtbHpVR1Z5WTJWdWRHRm5aVDBoTUN4b0xtOW1abk5sZEQwb01IeFVMbk5zYVdObEtEQXNMVEVwS1M4eE1EQXBPbWd1YjJabWMyVjBQVEI4VkR0MllYSWdZajEyV3pOZExGTTlkbHMwWFh4OFlqdGlKaVppSVQwOVFTWW1ZaUU5UFVZL0tHZ3ViVzlrWlQxY0luSmxiR0YwYVhabFhDSXNhQzVoYm1Ob2IzSnpQVnRpTEZOZEtUb29hQzV0YjJSbFBWd2lZV0p6YjJ4MWRHVmNJaXhpUFQwOVJqOW9MbWx6Ulc1a1BTRXdPbWd1YVhOUVpYSmpaVzUwWVdkbGZId29hQzV2Wm1aelpYUTlhQzV2Wm1aelpYUXFWblFwS1gxOVpXeHpaU0IxUFNFd08yVnNjMlVnWmoxbkxuWmhiSFZsTzJWc2MyVWdZejFjSW05bVpsd2lJVDA5Wnk1MllXeDFaVHRsYkhObElHbG1LR3c5ZEM1eGRXVnllVk5sYkdWamRHOXlLR2N1ZG1Gc2RXVXBMRzUxYkd3OVBUMXNLWFJvY205M0oxVnVZV0pzWlNCMGJ5Qm1hVzVrSUdGdVkyaHZjaUIwWVhKblpYUWdYQ0luSzJjdWRtRnNkV1VySjF3aUozMXBaaWh6TG14bGJtZDBhQ2w3ZG1GeUlHc3NkeXg0T3lGaEppWklJR2x1SUdrL0tIZzlhVnRJWFN4clBXeDBXM2hkTG5OMGVXeGxRWFIwY2l4M1BXeDBXM2hkTG1Oc1lYTnpRWFIwY2lrNktIZzlhVnRJWFQxQ2RDc3JMR3M5YVM1emRIbHNaUzVqYzNOVVpYaDBMSGM5UTNRb2FTa3BMR3gwVzNoZFBYdGxiR1Z0Wlc1ME9ta3NjM1I1YkdWQmRIUnlPbXNzWTJ4aGMzTkJkSFJ5T25jc1lXNWphRzl5VkdGeVoyVjBPbXdzYTJWNVJuSmhiV1Z6T25Nc2MyMXZiM1JvVTJOeWIyeHNhVzVuT21Nc1pXUm5aVk4wY21GMFpXZDVPbVlzWlcxcGRFVjJaVzUwY3pwMUxHeGhjM1JHY21GdFpVbHVaR1Y0T2kweGZTeEVkQ2hwTEZ0a1hTeGJYU2w5ZlgxbWIzSW9SWFFvS1N4dVBUQXNiejFsTG14bGJtZDBhRHR2UG00N2Jpc3JLWHQyWVhJZ1JUMXNkRnRsVzI1ZFcwaGRYVHRGSVQwOWNpWW1LRW9vUlNrc1pYUW9SU2twZlhKbGRIVnliaUJwZEgwc2JpNXdjbTkwYjNSNWNHVXVjbVZzWVhScGRtVlViMEZpYzI5c2RYUmxQV1oxYm1OMGFXOXVLR1VzZEN4eUtYdDJZWElnYmoxdkxtTnNhV1Z1ZEVobGFXZG9kQ3hoUFdVdVoyVjBRbTkxYm1ScGJtZERiR2xsYm5SU1pXTjBLQ2tzYVQxaExuUnZjQ3hzUFdFdVltOTBkRzl0TFdFdWRHOXdPM0psZEhWeWJpQjBQVDA5UkQ5cExUMXVPblE5UFQxREppWW9hUzA5Ymk4eUtTeHlQVDA5UkQ5cEt6MXNPbkk5UFQxREppWW9hU3M5YkM4eUtTeHBLejFwZEM1blpYUlRZM0p2Ykd4VWIzQW9LU3d3ZkdrckxqVjlMRzR1Y0hKdmRHOTBlWEJsTG1GdWFXMWhkR1ZVYnoxbWRXNWpkR2x2YmlobExIUXBlM1E5ZEh4OGUzMDdkbUZ5SUc0OVVIUW9LU3h2UFdsMExtZGxkRk5qY205c2JGUnZjQ2dwTzNKbGRIVnliaUJ3ZEQxN2MzUmhjblJVYjNBNmJ5eDBiM0JFYVdabU9tVXRieXgwWVhKblpYUlViM0E2WlN4a2RYSmhkR2x2YmpwMExtUjFjbUYwYVc5dWZIeDNMSE4wWVhKMFZHbHRaVHB1TEdWdVpGUnBiV1U2Ymlzb2RDNWtkWEpoZEdsdmJueDhkeWtzWldGemFXNW5PbFZiZEM1bFlYTnBibWQ4Zkd0ZExHUnZibVU2ZEM1a2IyNWxmU3h3ZEM1MGIzQkVhV1ptZkh3b2NIUXVaRzl1WlNZbWNIUXVaRzl1WlM1allXeHNLR2wwTENFeEtTeHdkRDF5S1N4cGRIMHNiaTV3Y205MGIzUjVjR1V1YzNSdmNFRnVhVzFoZEdWVWJ6MW1kVzVqZEdsdmJpZ3BlM0IwSmlad2RDNWtiMjVsSmlad2RDNWtiMjVsTG1OaGJHd29hWFFzSVRBcExIQjBQWEo5TEc0dWNISnZkRzkwZVhCbExtbHpRVzVwYldGMGFXNW5WRzg5Wm5WdVkzUnBiMjRvS1h0eVpYUjFjbTRoSVhCMGZTeHVMbkJ5YjNSdmRIbHdaUzVwYzAxdlltbHNaVDFtZFc1amRHbHZiaWdwZTNKbGRIVnliaUJIZEgwc2JpNXdjbTkwYjNSNWNHVXVjMlYwVTJOeWIyeHNWRzl3UFdaMWJtTjBhVzl1S0hRc2NpbDdjbVYwZFhKdUlHaDBQWEk5UFQwaE1DeEhkRDlMZEQxekxtMXBiaWh6TG0xaGVDaDBMREFwTEU5MEtUcGxMbk5qY205c2JGUnZLREFzZENrc2FYUjlMRzR1Y0hKdmRHOTBlWEJsTG1kbGRGTmpjbTlzYkZSdmNEMW1kVzVqZEdsdmJpZ3BlM0psZEhWeWJpQkhkRDlMZERwbExuQmhaMlZaVDJabWMyVjBmSHh2TG5OamNtOXNiRlJ2Y0h4OFlTNXpZM0p2Ykd4VWIzQjhmREI5TEc0dWNISnZkRzkwZVhCbExtZGxkRTFoZUZOamNtOXNiRlJ2Y0QxbWRXNWpkR2x2YmlncGUzSmxkSFZ5YmlCUGRIMHNiaTV3Y205MGIzUjVjR1V1YjI0OVpuVnVZM1JwYjI0b1pTeDBLWHR5WlhSMWNtNGdZM1JiWlYwOWRDeHBkSDBzYmk1d2NtOTBiM1I1Y0dVdWIyWm1QV1oxYm1OMGFXOXVLR1VwZTNKbGRIVnliaUJrWld4bGRHVWdZM1JiWlYwc2FYUjlMRzR1Y0hKdmRHOTBlWEJsTG1SbGMzUnliM2s5Wm5WdVkzUnBiMjRvS1h0MllYSWdaVDFTS0NrN1pTaGlkQ2tzZDNRb0tTeEVkQ2h2TEZ0VVhTeGJlU3hpTEZOZEtUdG1iM0lvZG1GeUlIUTlNQ3h1UFd4MExteGxibWQwYUR0dVBuUTdkQ3NyS1c5MEtHeDBXM1JkTG1Wc1pXMWxiblFwTzI4dWMzUjViR1V1YjNabGNtWnNiM2M5WVM1emRIbHNaUzV2ZG1WeVpteHZkejFjSWx3aUxHOHVjM1I1YkdVdWFHVnBaMmgwUFdFdWMzUjViR1V1YUdWcFoyaDBQVndpWENJc2MzUW1KbWt1YzJWMFUzUjViR1VvYzNRc1hDSjBjbUZ1YzJadmNtMWNJaXhjSW01dmJtVmNJaWtzYVhROWNpeHpkRDF5TEdOMFBYSXNablE5Y2l4UGREMHdMRlowUFRFc2RYUTljaXh0ZEQxeUxIcDBQVndpWkc5M2Jsd2lMSEYwUFMweExFMTBQVEFzSkhROU1DeGZkRDBoTVN4d2REMXlMR1IwUFhJc1ozUTljaXgyZEQxeUxHaDBQWElzUW5ROU1DeDVkRDF5TEVkMFBTRXhMRXQwUFRBc1ZIUTljbjA3ZG1GeUlGZzlablZ1WTNScGIyNG9LWHQyWVhJZ2JpeHBMR3dzWXl4a0xHY3NkaXhvTEhrc1ZDeGlMRk03VTNRb2J5eGJaaXgxTEcwc2NGMHVhbTlwYmloY0lpQmNJaWtzWm5WdVkzUnBiMjRvWlNsN2RtRnlJRzg5WlM1amFHRnVaMlZrVkc5MVkyaGxjMXN3WFR0bWIzSW9ZejFsTG5SaGNtZGxkRHN6UFQwOVl5NXViMlJsVkhsd1pUc3BZejFqTG5CaGNtVnVkRTV2WkdVN2MzZHBkR05vS0dROWJ5NWpiR2xsYm5SWkxHYzlieTVqYkdsbGJuUllMRlE5WlM1MGFXMWxVM1JoYlhBc1NTNTBaWE4wS0dNdWRHRm5UbUZ0WlNsOGZHVXVjSEpsZG1WdWRFUmxabUYxYkhRb0tTeGxMblI1Y0dVcGUyTmhjMlVnWmpwdUppWnVMbUpzZFhJb0tTeHBkQzV6ZEc5d1FXNXBiV0YwWlZSdktDa3NiajFqTEdrOWRqMWtMR3c5Wnl4NVBWUTdZbkpsWVdzN1kyRnpaU0IxT2trdWRHVnpkQ2hqTG5SaFowNWhiV1VwSmlaMExtRmpkR2wyWlVWc1pXMWxiblFoUFQxakppWmxMbkJ5WlhabGJuUkVaV1poZFd4MEtDa3NhRDFrTFhZc1V6MVVMV0lzYVhRdWMyVjBVMk55YjJ4c1ZHOXdLRXQwTFdnc0lUQXBMSFk5WkN4aVBWUTdZbkpsWVdzN1pHVm1ZWFZzZERwallYTmxJRzA2WTJGelpTQndPblpoY2lCaFBXa3RaQ3hyUFd3dFp5eDNQV3NxYXl0aEttRTdhV1lvTkRrK2R5bDdhV1lvSVVrdWRHVnpkQ2h1TG5SaFowNWhiV1VwS1h0dUxtWnZZM1Z6S0NrN2RtRnlJSGc5ZEM1amNtVmhkR1ZGZG1WdWRDaGNJazF2ZFhObFJYWmxiblJ6WENJcE8zZ3VhVzVwZEUxdmRYTmxSWFpsYm5Rb1hDSmpiR2xqYTF3aUxDRXdMQ0V3TEdVdWRtbGxkeXd4TEc4dWMyTnlaV1Z1V0N4dkxuTmpjbVZsYmxrc2J5NWpiR2xsYm5SWUxHOHVZMnhwWlc1MFdTeGxMbU4wY214TFpYa3NaUzVoYkhSTFpYa3NaUzV6YUdsbWRFdGxlU3hsTG0xbGRHRkxaWGtzTUN4dWRXeHNLU3h1TG1ScGMzQmhkR05vUlhabGJuUW9lQ2w5Y21WMGRYSnVmVzQ5Y2p0MllYSWdSVDFvTDFNN1JUMXpMbTFoZUNoekxtMXBiaWhGTERNcExDMHpLVHQyWVhJZ1FUMXpMbUZpY3loRkwyMTBLU3hHUFVVcVFTc3VOU3B0ZENwQktrRXNRejFwZEM1blpYUlRZM0p2Ykd4VWIzQW9LUzFHTEVROU1EdERQazkwUHloRVBTaFBkQzFES1M5R0xFTTlUM1FwT2pBK1F5WW1LRVE5TFVNdlJpeERQVEFwTEVFcVBURXRSQ3hwZEM1aGJtbHRZWFJsVkc4b01IeERLeTQxTEh0bFlYTnBibWM2WENKdmRYUkRkV0pwWTF3aUxHUjFjbUYwYVc5dU9rRjlLWDE5S1N4bExuTmpjbTlzYkZSdktEQXNNQ2tzYnk1emRIbHNaUzV2ZG1WeVpteHZkejFoTG5OMGVXeGxMbTkyWlhKbWJHOTNQVndpYUdsa1pHVnVYQ0o5TEdvOVpuVnVZM1JwYjI0b0tYdDJZWElnWlN4MExISXNiaXhoTEdrc2JDeGpMR1lzZFN4dExIQTlieTVqYkdsbGJuUklaV2xuYUhRc1pEMUJkQ2dwTzJadmNpaGpQVEFzWmoxc2RDNXNaVzVuZEdnN1pqNWpPMk1yS3lsbWIzSW9aVDFzZEZ0alhTeDBQV1V1Wld4bGJXVnVkQ3h5UFdVdVlXNWphRzl5VkdGeVoyVjBMRzQ5WlM1clpYbEdjbUZ0WlhNc1lUMHdMR2s5Ymk1c1pXNW5kR2c3YVQ1aE8yRXJLeWxzUFc1YllWMHNkVDFzTG05bVpuTmxkQ3h0UFdSYmJDNWpiMjV6ZEdGdWRGMThmREFzYkM1bWNtRnRaVDExTEd3dWFYTlFaWEpqWlc1MFlXZGxKaVlvZFNvOWNDeHNMbVp5WVcxbFBYVXBMRndpY21Wc1lYUnBkbVZjSWowOVBXd3ViVzlrWlNZbUtHOTBLSFFwTEd3dVpuSmhiV1U5YVhRdWNtVnNZWFJwZG1WVWIwRmljMjlzZFhSbEtISXNiQzVoYm1Ob2IzSnpXekJkTEd3dVlXNWphRzl5YzFzeFhTa3RkU3h2ZENoMExDRXdLU2tzYkM1bWNtRnRaU3M5YlN4bWRDWW1JV3d1YVhORmJtUW1KbXd1Wm5KaGJXVStUM1FtSmloUGREMXNMbVp5WVcxbEtUdG1iM0lvVDNROWN5NXRZWGdvVDNRc1JuUW9LU2tzWXowd0xHWTliSFF1YkdWdVozUm9PMlkrWXp0akt5c3BlMlp2Y2lobFBXeDBXMk5kTEc0OVpTNXJaWGxHY21GdFpYTXNZVDB3TEdrOWJpNXNaVzVuZEdnN2FUNWhPMkVyS3lsc1BXNWJZVjBzYlQxa1cyd3VZMjl1YzNSaGJuUmRmSHd3TEd3dWFYTkZibVFtSmloc0xtWnlZVzFsUFU5MExXd3ViMlptYzJWMEsyMHBPMlV1YTJWNVJuSmhiV1Z6TG5OdmNuUW9UblFwZlgwc1Z6MW1kVzVqZEdsdmJpaGxMSFFwZTJadmNpaDJZWElnY2owd0xHNDliSFF1YkdWdVozUm9PMjQrY2p0eUt5c3BlM1poY2lCdkxHRXNjejFzZEZ0eVhTeGpQWE11Wld4bGJXVnVkQ3htUFhNdWMyMXZiM1JvVTJOeWIyeHNhVzVuUDJVNmRDeDFQWE11YTJWNVJuSmhiV1Z6TEcwOWRTNXNaVzVuZEdnc2NEMTFXekJkTEhrOWRWdDFMbXhsYm1kMGFDMHhYU3hVUFhBdVpuSmhiV1UrWml4aVBXWStlUzVtY21GdFpTeFRQVlEvY0RwNUxHczljeTVsYldsMFJYWmxiblJ6TEhjOWN5NXNZWE4wUm5KaGJXVkpibVJsZUR0cFppaFVmSHhpS1h0cFppaFVKaVl0TVQwOVBYTXVaV1JuWlh4OFlpWW1NVDA5UFhNdVpXUm5aU2xqYjI1MGFXNTFaVHR6ZDJsMFkyZ29WRDhvUkhRb1l5eGJaMTBzVzJnc2RsMHBMR3NtSm5jK0xURW1KaWg0ZENoakxIQXVaWFpsYm5SVWVYQmxMSHAwS1N4ekxteGhjM1JHY21GdFpVbHVaR1Y0UFMweEtTazZLRVIwS0dNc1cyaGRMRnRuTEhaZEtTeHJKaVp0UG5jbUppaDRkQ2hqTEhrdVpYWmxiblJVZVhCbExIcDBLU3h6TG14aGMzUkdjbUZ0WlVsdVpHVjRQVzBwS1N4ekxtVmtaMlU5VkQ4dE1Ub3hMSE11WldSblpWTjBjbUYwWldkNUtYdGpZWE5sWENKeVpYTmxkRndpT205MEtHTXBPMk52Ym5ScGJuVmxPMk5oYzJWY0ltVmhjMlZjSWpwbVBWTXVabkpoYldVN1luSmxZV3M3WkdWbVlYVnNkRHBqWVhObFhDSnpaWFJjSWpwMllYSWdlRDFUTG5CeWIzQnpPMlp2Y2lodklHbHVJSGdwYkM1allXeHNLSGdzYnlrbUppaGhQVzUwS0hoYmIxMHVkbUZzZFdVcExEQTlQVDF2TG1sdVpHVjRUMllvWENKQVhDSXBQMk11YzJWMFFYUjBjbWxpZFhSbEtHOHVjM1ZpYzNSeUtERXBMR0VwT21rdWMyVjBVM1I1YkdVb1l5eHZMR0VwS1R0amIyNTBhVzUxWlgxOVpXeHpaU0F3SVQwOWN5NWxaR2RsSmlZb1JIUW9ZeXhiWkN4MlhTeGJaeXhvWFNrc2N5NWxaR2RsUFRBcE8yWnZjaWgyWVhJZ1JUMHdPMjB0TVQ1Rk8wVXJLeWxwWmlobVBqMTFXMFZkTG1aeVlXMWxKaVoxVzBVck1WMHVabkpoYldVK1BXWXBlM1poY2lCQlBYVmJSVjBzUmoxMVcwVXJNVjA3Wm05eUtHOGdhVzRnUVM1d2NtOXdjeWxwWmloc0xtTmhiR3dvUVM1d2NtOXdjeXh2S1NsN2RtRnlJRU05S0dZdFFTNW1jbUZ0WlNrdktFWXVabkpoYldVdFFTNW1jbUZ0WlNrN1F6MUJMbkJ5YjNCelcyOWRMbVZoYzJsdVp5aERLU3hoUFhKMEtFRXVjSEp2Y0hOYmIxMHVkbUZzZFdVc1JpNXdjbTl3YzF0dlhTNTJZV3gxWlN4REtTeGhQVzUwS0dFcExEQTlQVDF2TG1sdVpHVjRUMllvWENKQVhDSXBQMk11YzJWMFFYUjBjbWxpZFhSbEtHOHVjM1ZpYzNSeUtERXBMR0VwT21rdWMyVjBVM1I1YkdVb1l5eHZMR0VwZldzbUpuY2hQVDFGSmlZb1hDSmtiM2R1WENJOVBUMTZkRDk0ZENoakxFRXVaWFpsYm5SVWVYQmxMSHAwS1RwNGRDaGpMRVl1WlhabGJuUlVlWEJsTEhwMEtTeHpMbXhoYzNSR2NtRnRaVWx1WkdWNFBVVXBPMkp5WldGcmZYMTlMRm85Wm5WdVkzUnBiMjRvS1h0ZmRDWW1LRjkwUFNFeExFVjBLQ2twTzNaaGNpQmxMSFFzYmoxcGRDNW5aWFJUWTNKdmJHeFViM0FvS1N4dlBWQjBLQ2s3YVdZb2NIUXBiejQ5Y0hRdVpXNWtWR2x0WlQ4b2JqMXdkQzUwWVhKblpYUlViM0FzWlQxd2RDNWtiMjVsTEhCMFBYSXBPaWgwUFhCMExtVmhjMmx1Wnlnb2J5MXdkQzV6ZEdGeWRGUnBiV1VwTDNCMExtUjFjbUYwYVc5dUtTeHVQVEI4Y0hRdWMzUmhjblJVYjNBcmRDcHdkQzUwYjNCRWFXWm1LU3hwZEM1elpYUlRZM0p2Ykd4VWIzQW9iaXdoTUNrN1pXeHpaU0JwWmlnaGFIUXBlM1poY2lCaFBYWjBMblJoY21kbGRGUnZjQzF1TzJFbUppaDJkRDE3YzNSaGNuUlViM0E2Y1hRc2RHOXdSR2xtWmpwdUxYRjBMSFJoY21kbGRGUnZjRHB1TEhOMFlYSjBWR2x0WlRwTWRDeGxibVJVYVcxbE9reDBLMmQwZlNrc2RuUXVaVzVrVkdsdFpUNDlieVltS0hROVZTNXpjWEowS0NodkxYWjBMbk4wWVhKMFZHbHRaU2t2WjNRcExHNDlNSHgyZEM1emRHRnlkRlJ2Y0N0MEtuWjBMblJ2Y0VScFptWXBmV2xtS0VkMEppWnpkQ1ltYVM1elpYUlRkSGxzWlNoemRDeGNJblJ5WVc1elptOXliVndpTEZ3aWRISmhibk5zWVhSbEtEQXNJRndpS3kxTGRDdGNJbkI0S1NCY0lpdFVkQ2tzYUhSOGZIRjBJVDA5YmlsN2VuUTliajV4ZEQ5Y0ltUnZkMjVjSWpweGRENXVQMXdpZFhCY0lqcDZkQ3hvZEQwaE1UdDJZWElnYkQxN1kzVnlWRzl3T200c2JHRnpkRlJ2Y0RweGRDeHRZWGhVYjNBNlQzUXNaR2x5WldOMGFXOXVPbnAwZlN4elBXTjBMbUpsWm05eVpYSmxibVJsY2lZbVkzUXVZbVZtYjNKbGNtVnVaR1Z5TG1OaGJHd29hWFFzYkNrN2N5RTlQU0V4SmlZb1Z5aHVMR2wwTG1kbGRGTmpjbTlzYkZSdmNDZ3BLU3h4ZEQxdUxHTjBMbkpsYm1SbGNpWW1ZM1F1Y21WdVpHVnlMbU5oYkd3b2FYUXNiQ2twTEdVbUptVXVZMkZzYkNocGRDd2hNU2w5VEhROWIzMHNTajFtZFc1amRHbHZiaWhsS1h0bWIzSW9kbUZ5SUhROU1DeHlQV1V1YTJWNVJuSmhiV1Z6TG14bGJtZDBhRHR5UG5RN2RDc3JLWHRtYjNJb2RtRnlJRzRzYnl4aExHa3NiRDFsTG10bGVVWnlZVzFsYzF0MFhTeHpQWHQ5TzI1MWJHd2hQVDBvYVQxUExtVjRaV01vYkM1d2NtOXdjeWtwT3lsaFBXbGJNVjBzYnoxcFd6SmRMRzQ5WVM1dFlYUmphQ2hXS1N4dWRXeHNJVDA5Ymo4b1lUMXVXekZkTEc0OWJsc3lYU2s2YmoxckxHODlieTVwYm1SbGVFOW1LRndpSVZ3aUtUOVJLRzhwT2x0dkxuTnNhV05sS0RFcFhTeHpXMkZkUFh0MllXeDFaVHB2TEdWaGMybHVaenBWVzI1ZGZUdHNMbkJ5YjNCelBYTjlmU3hSUFdaMWJtTjBhVzl1S0dVcGUzWmhjaUIwUFZ0ZE8zSmxkSFZ5YmlBa0xteGhjM1JKYm1SbGVEMHdMR1U5WlM1eVpYQnNZV05sS0NRc1puVnVZM1JwYjI0b1pTbDdjbVYwZFhKdUlHVXVjbVZ3YkdGalpTaE1MR1oxYm1OMGFXOXVLR1VwZTNKbGRIVnliaUF4TURBcUtHVXZNalUxS1N0Y0lpVmNJbjBwZlNrc1J5WW1LRjh1YkdGemRFbHVaR1Y0UFRBc1pUMWxMbkpsY0d4aFkyVW9YeXhtZFc1amRHbHZiaWhsS1h0eVpYUjFjbTRnUnl0bGZTa3BMR1U5WlM1eVpYQnNZV05sS0V3c1puVnVZM1JwYjI0b1pTbDdjbVYwZFhKdUlIUXVjSFZ6YUNnclpTa3NYQ0o3UDMxY0luMHBMSFF1ZFc1emFHbG1kQ2hsS1N4MGZTeGxkRDFtZFc1amRHbHZiaWhsS1h0MllYSWdkQ3h5TEc0OWUzMDdabTl5S0hROU1DeHlQV1V1YTJWNVJuSmhiV1Z6TG14bGJtZDBhRHR5UG5RN2RDc3JLWFIwS0dVdWEyVjVSbkpoYldWelczUmRMRzRwTzJadmNpaHVQWHQ5TEhROVpTNXJaWGxHY21GdFpYTXViR1Z1WjNSb0xURTdkRDQ5TUR0MExTMHBkSFFvWlM1clpYbEdjbUZ0WlhOYmRGMHNiaWw5TEhSMFBXWjFibU4wYVc5dUtHVXNkQ2w3ZG1GeUlISTdabTl5S0hJZ2FXNGdkQ2xzTG1OaGJHd29aUzV3Y205d2N5eHlLWHg4S0dVdWNISnZjSE5iY2wwOWRGdHlYU2s3Wm05eUtISWdhVzRnWlM1d2NtOXdjeWwwVzNKZFBXVXVjSEp2Y0hOYmNsMTlMSEowUFdaMWJtTjBhVzl1S0dVc2RDeHlLWHQyWVhJZ2JpeHZQV1V1YkdWdVozUm9PMmxtS0c4aFBUMTBMbXhsYm1kMGFDbDBhSEp2ZDF3aVEyRnVKM1FnYVc1MFpYSndiMnhoZEdVZ1ltVjBkMlZsYmlCY1hGd2lYQ0lyWlZzd1hTc25YQ0lnWVc1a0lGd2lKeXQwV3pCZEt5ZGNJaWM3ZG1GeUlHRTlXMlZiTUYxZE8yWnZjaWh1UFRFN2J6NXVPMjRyS3lsaFcyNWRQV1ZiYmwwcktIUmJibDB0WlZ0dVhTa3FjanR5WlhSMWNtNGdZWDBzYm5ROVpuVnVZM1JwYjI0b1pTbDdkbUZ5SUhROU1UdHlaWFIxY200Z1RTNXNZWE4wU1c1a1pYZzlNQ3hsV3pCZExuSmxjR3hoWTJVb1RTeG1kVzVqZEdsdmJpZ3BlM0psZEhWeWJpQmxXM1FySzExOUtYMHNiM1E5Wm5WdVkzUnBiMjRvWlN4MEtYdGxQVnRkTG1OdmJtTmhkQ2hsS1R0bWIzSW9kbUZ5SUhJc2JpeHZQVEFzWVQxbExteGxibWQwYUR0aFBtODdieXNyS1c0OVpWdHZYU3h5UFd4MFcyNWJTRjFkTEhJbUppaDBQeWh1TG5OMGVXeGxMbU56YzFSbGVIUTljaTVrYVhKMGVWTjBlV3hsUVhSMGNpeEVkQ2h1TEhJdVpHbHlkSGxEYkdGemMwRjBkSElwS1Rvb2NpNWthWEowZVZOMGVXeGxRWFIwY2oxdUxuTjBlV3hsTG1OemMxUmxlSFFzY2k1a2FYSjBlVU5zWVhOelFYUjBjajFEZENodUtTeHVMbk4wZVd4bExtTnpjMVJsZUhROWNpNXpkSGxzWlVGMGRISXNSSFFvYml4eUxtTnNZWE56UVhSMGNpa3BLWDBzWVhROVpuVnVZM1JwYjI0b0tYdFVkRDFjSW5SeVlXNXpiR0YwWlZvb01DbGNJaXhwTG5ObGRGTjBlV3hsS0hOMExGd2lkSEpoYm5ObWIzSnRYQ0lzVkhRcE8zWmhjaUJsUFdNb2MzUXBMSFE5WlM1blpYUlFjbTl3WlhKMGVWWmhiSFZsS0Z3aWRISmhibk5tYjNKdFhDSXBMSEk5WlM1blpYUlFjbTl3WlhKMGVWWmhiSFZsS0VjclhDSjBjbUZ1YzJadmNtMWNJaWtzYmoxMEppWmNJbTV2Ym1WY0lpRTlQWFI4ZkhJbUpsd2libTl1WlZ3aUlUMDljanR1Zkh3b1ZIUTlYQ0pjSWlsOU8ya3VjMlYwVTNSNWJHVTlablZ1WTNScGIyNG9aU3gwTEhJcGUzWmhjaUJ1UFdVdWMzUjViR1U3YVdZb2REMTBMbkpsY0d4aFkyVW9laXh4S1M1eVpYQnNZV05sS0Z3aUxWd2lMRndpWENJcExGd2lla2x1WkdWNFhDSTlQVDEwS1c1YmRGMDlhWE5PWVU0b2Npay9janBjSWx3aUt5Z3dmSElwTzJWc2MyVWdhV1lvWENKbWJHOWhkRndpUFQwOWRDbHVMbk4wZVd4bFJteHZZWFE5Ymk1amMzTkdiRzloZEQxeU8yVnNjMlVnZEhKNWUwSW1KaWh1VzBJcmRDNXpiR2xqWlNnd0xERXBMblJ2VlhCd1pYSkRZWE5sS0NrcmRDNXpiR2xqWlNneEtWMDljaWtzYmx0MFhUMXlmV05oZEdOb0tHOHBlMzE5TzNaaGNpQnBkQ3hzZEN4emRDeGpkQ3htZEN4MWRDeHRkQ3h3ZEN4a2RDeG5kQ3gyZEN4b2RDeDVkQ3hVZEN4aWRDeFRkRDFwTG1Ga1pFVjJaVzUwUFdaMWJtTjBhVzl1S0hRc2NpeHVLWHQyWVhJZ2J6MW1kVzVqZEdsdmJpaDBLWHR5WlhSMWNtNGdkRDEwZkh4bExtVjJaVzUwTEhRdWRHRnlaMlYwZkh3b2RDNTBZWEpuWlhROWRDNXpjbU5GYkdWdFpXNTBLU3gwTG5CeVpYWmxiblJFWldaaGRXeDBmSHdvZEM1d2NtVjJaVzUwUkdWbVlYVnNkRDFtZFc1amRHbHZiaWdwZTNRdWNtVjBkWEp1Vm1Gc2RXVTlJVEVzZEM1a1pXWmhkV3gwVUhKbGRtVnVkR1ZrUFNFd2ZTa3NiaTVqWVd4c0tIUm9hWE1zZENsOU8zSTljaTV6Y0d4cGRDaGNJaUJjSWlrN1ptOXlLSFpoY2lCaExHazlNQ3hzUFhJdWJHVnVaM1JvTzJ3K2FUdHBLeXNwWVQxeVcybGRMSFF1WVdSa1JYWmxiblJNYVhOMFpXNWxjajkwTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvWVN4dUxDRXhLVHAwTG1GMGRHRmphRVYyWlc1MEtGd2liMjVjSWl0aExHOHBMRmwwTG5CMWMyZ29lMlZzWlcxbGJuUTZkQ3h1WVcxbE9tRXNiR2x6ZEdWdVpYSTZibjBwZlN4cmREMXBMbkpsYlc5MlpVVjJaVzUwUFdaMWJtTjBhVzl1S0dVc2RDeHlLWHQwUFhRdWMzQnNhWFFvWENJZ1hDSXBPMlp2Y2loMllYSWdiajB3TEc4OWRDNXNaVzVuZEdnN2J6NXVPMjRyS3lsbExuSmxiVzkyWlVWMlpXNTBUR2x6ZEdWdVpYSS9aUzV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0hSYmJsMHNjaXdoTVNrNlpTNWtaWFJoWTJoRmRtVnVkQ2hjSW05dVhDSXJkRnR1WFN4eUtYMHNkM1E5Wm5WdVkzUnBiMjRvS1h0bWIzSW9kbUZ5SUdVc2REMHdMSEk5V1hRdWJHVnVaM1JvTzNJK2REdDBLeXNwWlQxWmRGdDBYU3hyZENobExtVnNaVzFsYm5Rc1pTNXVZVzFsTEdVdWJHbHpkR1Z1WlhJcE8xbDBQVnRkZlN4NGREMW1kVzVqZEdsdmJpaGxMSFFzY2lsN1kzUXVhMlY1Wm5KaGJXVW1KbU4wTG10bGVXWnlZVzFsTG1OaGJHd29hWFFzWlN4MExISXBmU3hGZEQxbWRXNWpkR2x2YmlncGUzWmhjaUJsUFdsMExtZGxkRk5qY205c2JGUnZjQ2dwTzA5MFBUQXNablFtSmlGSGRDWW1LR0V1YzNSNWJHVXVhR1ZwWjJoMFBWd2lYQ0lwTEdvb0tTeG1kQ1ltSVVkMEppWW9ZUzV6ZEhsc1pTNW9aV2xuYUhROVQzUXJieTVqYkdsbGJuUklaV2xuYUhRclhDSndlRndpS1N4SGREOXBkQzV6WlhSVFkzSnZiR3hVYjNBb2N5NXRhVzRvYVhRdVoyVjBVMk55YjJ4c1ZHOXdLQ2tzVDNRcEtUcHBkQzV6WlhSVFkzSnZiR3hVYjNBb1pTd2hNQ2tzYUhROUlUQjlMRUYwUFdaMWJtTjBhVzl1S0NsN2RtRnlJR1VzZEN4eVBXOHVZMnhwWlc1MFNHVnBaMmgwTEc0OWUzMDdabTl5S0dVZ2FXNGdkWFFwZEQxMWRGdGxYU3hjSW1aMWJtTjBhVzl1WENJOVBYUjVjR1Z2WmlCMFAzUTlkQzVqWVd4c0tHbDBLVG92Y0NRdkxuUmxjM1FvZENrbUppaDBQWFF1YzJ4cFkyVW9NQ3d0TVNrdk1UQXdLbklwTEc1YlpWMDlkRHR5WlhSMWNtNGdibjBzUm5ROVpuVnVZM1JwYjI0b0tYdDJZWElnWlQxemRDWW1jM1F1YjJabWMyVjBTR1ZwWjJoMGZId3dMSFE5Y3k1dFlYZ29aU3hoTG5OamNtOXNiRWhsYVdkb2RDeGhMbTltWm5ObGRFaGxhV2RvZEN4dkxuTmpjbTlzYkVobGFXZG9kQ3h2TG05bVpuTmxkRWhsYVdkb2RDeHZMbU5zYVdWdWRFaGxhV2RvZENrN2NtVjBkWEp1SUhRdGJ5NWpiR2xsYm5SSVpXbG5hSFI5TEVOMFBXWjFibU4wYVc5dUtIUXBlM1poY2lCeVBWd2lZMnhoYzNOT1lXMWxYQ0k3Y21WMGRYSnVJR1V1VTFaSFJXeGxiV1Z1ZENZbWRDQnBibk4wWVc1alpXOW1JR1V1VTFaSFJXeGxiV1Z1ZENZbUtIUTlkRnR5WFN4eVBWd2lZbUZ6WlZaaGJGd2lLU3gwVzNKZGZTeEVkRDFtZFc1amRHbHZiaWgwTEc0c2J5bDdkbUZ5SUdFOVhDSmpiR0Z6YzA1aGJXVmNJanRwWmlobExsTldSMFZzWlcxbGJuUW1KblFnYVc1emRHRnVZMlZ2WmlCbExsTldSMFZzWlcxbGJuUW1KaWgwUFhSYllWMHNZVDFjSW1KaGMyVldZV3hjSWlrc2J6MDlQWElwY21WMGRYSnVJSFJiWVYwOWJpeHlPMlp2Y2loMllYSWdhVDEwVzJGZExHdzlNQ3h6UFc4dWJHVnVaM1JvTzNNK2JEdHNLeXNwYVQxSmRDaHBLUzV5WlhCc1lXTmxLRWwwS0c5YmJGMHBMRndpSUZ3aUtUdHBQVWgwS0drcE8yWnZjaWgyWVhJZ1l6MHdMR1k5Ymk1c1pXNW5kR2c3Wmo1ak8yTXJLeWt0TVQwOVBVbDBLR2twTG1sdVpHVjRUMllvU1hRb2JsdGpYU2twSmlZb2FTczlYQ0lnWENJcmJsdGpYU2s3ZEZ0aFhUMUlkQ2hwS1gwc1NIUTlablZ1WTNScGIyNG9aU2w3Y21WMGRYSnVJR1V1Y21Wd2JHRmpaU2hRTEZ3aVhDSXBmU3hKZEQxbWRXNWpkR2x2YmlobEtYdHlaWFIxY201Y0lpQmNJaXRsSzF3aUlGd2lmU3hRZEQxRVlYUmxMbTV2ZDN4OFpuVnVZM1JwYjI0b0tYdHlaWFIxY200cmJtVjNJRVJoZEdWOUxFNTBQV1oxYm1OMGFXOXVLR1VzZENsN2NtVjBkWEp1SUdVdVpuSmhiV1V0ZEM1bWNtRnRaWDBzVDNROU1DeFdkRDB4TEhwMFBWd2laRzkzYmx3aUxIRjBQUzB4TEV4MFBWQjBLQ2tzVFhROU1Dd2tkRDB3TEY5MFBTRXhMRUowUFRBc1IzUTlJVEVzUzNROU1DeFpkRDFiWFR0Y0ltWjFibU4wYVc5dVhDSTlQWFI1Y0dWdlppQmtaV1pwYm1VbUptUmxabWx1WlM1aGJXUS9aR1ZtYVc1bEtGd2ljMnR5YjJ4c2Nsd2lMR1oxYm1OMGFXOXVLQ2w3Y21WMGRYSnVJR2w5S1RwY0luVnVaR1ZtYVc1bFpGd2lJVDEwZVhCbGIyWWdiVzlrZFd4bEppWnRiMlIxYkdVdVpYaHdiM0owY3o5dGIyUjFiR1V1Wlhod2IzSjBjejFwT21VdWMydHliMnhzY2oxcGZTa29kMmx1Wkc5M0xHUnZZM1Z0Wlc1MEtUc2lMQ0l2S2lCWFpXSWdSbTl1ZENCTWIyRmtaWElnZGpFdU5pNHlPQ0F0SUNoaktTQkJaRzlpWlNCVGVYTjBaVzF6TENCSGIyOW5iR1V1SUV4cFkyVnVjMlU2SUVGd1lXTm9aU0F5TGpBZ0tpOG9ablZ1WTNScGIyNG9LWHRtZFc1amRHbHZiaUJoWVNoaExHSXNZeWw3Y21WMGRYSnVJR0V1WTJGc2JDNWhjSEJzZVNoaExtSnBibVFzWVhKbmRXMWxiblJ6S1gxbWRXNWpkR2x2YmlCaVlTaGhMR0lzWXlsN2FXWW9JV0VwZEdoeWIzY2dSWEp5YjNJb0tUdHBaaWd5UEdGeVozVnRaVzUwY3k1c1pXNW5kR2dwZTNaaGNpQmtQVUZ5Y21GNUxuQnliM1J2ZEhsd1pTNXpiR2xqWlM1allXeHNLR0Z5WjNWdFpXNTBjeXd5S1R0eVpYUjFjbTRnWm5WdVkzUnBiMjRvS1h0MllYSWdZejFCY25KaGVTNXdjbTkwYjNSNWNHVXVjMnhwWTJVdVkyRnNiQ2hoY21kMWJXVnVkSE1wTzBGeWNtRjVMbkJ5YjNSdmRIbHdaUzUxYm5Ob2FXWjBMbUZ3Y0d4NUtHTXNaQ2s3Y21WMGRYSnVJR0V1WVhCd2JIa29ZaXhqS1gxOWNtVjBkWEp1SUdaMWJtTjBhVzl1S0NsN2NtVjBkWEp1SUdFdVlYQndiSGtvWWl4aGNtZDFiV1Z1ZEhNcGZYMW1kVzVqZEdsdmJpQndLR0VzWWl4aktYdHdQVVoxYm1OMGFXOXVMbkJ5YjNSdmRIbHdaUzVpYVc1a0ppWXRNU0U5Um5WdVkzUnBiMjR1Y0hKdmRHOTBlWEJsTG1KcGJtUXVkRzlUZEhKcGJtY29LUzVwYm1SbGVFOW1LRndpYm1GMGFYWmxJR052WkdWY0lpay9ZV0U2WW1FN2NtVjBkWEp1SUhBdVlYQndiSGtvYm5Wc2JDeGhjbWQxYldWdWRITXBmWFpoY2lCeFBVUmhkR1V1Ym05M2ZIeG1kVzVqZEdsdmJpZ3BlM0psZEhWeWJpdHVaWGNnUkdGMFpYMDdablZ1WTNScGIyNGdZMkVvWVN4aUtYdDBhR2x6TG1FOVlUdDBhR2x6TG04OVlueDhZVHQwYUdsekxtTTlkR2hwY3k1dkxtUnZZM1Z0Wlc1MGZYWmhjaUJrWVQwaElYZHBibVJ2ZHk1R2IyNTBSbUZqWlR0bWRXNWpkR2x2YmlCMEtHRXNZaXhqTEdRcGUySTlZUzVqTG1OeVpXRjBaVVZzWlcxbGJuUW9ZaWs3YVdZb1l5bG1iM0lvZG1GeUlHVWdhVzRnWXlsakxtaGhjMDkzYmxCeWIzQmxjblI1S0dVcEppWW9YQ0p6ZEhsc1pWd2lQVDFsUDJJdWMzUjViR1V1WTNOelZHVjRkRDFqVzJWZE9tSXVjMlYwUVhSMGNtbGlkWFJsS0dVc1kxdGxYU2twTzJRbUptSXVZWEJ3Wlc1a1EyaHBiR1FvWVM1akxtTnlaV0YwWlZSbGVIUk9iMlJsS0dRcEtUdHlaWFIxY200Z1luMW1kVzVqZEdsdmJpQjFLR0VzWWl4aktYdGhQV0V1WXk1blpYUkZiR1Z0Wlc1MGMwSjVWR0ZuVG1GdFpTaGlLVnN3WFR0aGZId29ZVDFrYjJOMWJXVnVkQzVrYjJOMWJXVnVkRVZzWlcxbGJuUXBPMkV1YVc1elpYSjBRbVZtYjNKbEtHTXNZUzVzWVhOMFEyaHBiR1FwZldaMWJtTjBhVzl1SUhZb1lTbDdZUzV3WVhKbGJuUk9iMlJsSmlaaExuQmhjbVZ1ZEU1dlpHVXVjbVZ0YjNabFEyaHBiR1FvWVNsOVhHNW1kVzVqZEdsdmJpQjNLR0VzWWl4aktYdGlQV0o4ZkZ0ZE8yTTlZM3g4VzEwN1ptOXlLSFpoY2lCa1BXRXVZMnhoYzNOT1lXMWxMbk53YkdsMEtDOWNYSE1yTHlrc1pUMHdPMlU4WWk1c1pXNW5kR2c3WlNzOU1TbDdabTl5S0haaGNpQm1QU0V4TEdjOU1EdG5QR1F1YkdWdVozUm9PMmNyUFRFcGFXWW9ZbHRsWFQwOVBXUmJaMTBwZTJZOUlUQTdZbkpsWVd0OVpueDhaQzV3ZFhOb0tHSmJaVjBwZldJOVcxMDdabTl5S0dVOU1EdGxQR1F1YkdWdVozUm9PMlVyUFRFcGUyWTlJVEU3Wm05eUtHYzlNRHRuUEdNdWJHVnVaM1JvTzJjclBURXBhV1lvWkZ0bFhUMDlQV05iWjEwcGUyWTlJVEE3WW5KbFlXdDlabng4WWk1d2RYTm9LR1JiWlYwcGZXRXVZMnhoYzNOT1lXMWxQV0l1YW05cGJpaGNJaUJjSWlrdWNtVndiR0ZqWlNndlhGeHpLeTluTEZ3aUlGd2lLUzV5WlhCc1lXTmxLQzllWEZ4ekszeGNYSE1ySkM4c1hDSmNJaWw5Wm5WdVkzUnBiMjRnZVNoaExHSXBlMlp2Y2loMllYSWdZejFoTG1Oc1lYTnpUbUZ0WlM1emNHeHBkQ2d2WEZ4ekt5OHBMR1E5TUN4bFBXTXViR1Z1WjNSb08yUThaVHRrS3lzcGFXWW9ZMXRrWFQwOVlpbHlaWFIxY200aE1EdHlaWFIxY200aE1YMWNibVoxYm1OMGFXOXVJR1ZoS0dFcGUzSmxkSFZ5YmlCaExtOHViRzlqWVhScGIyNHVhRzl6ZEc1aGJXVjhmR0V1WVM1c2IyTmhkR2x2Ymk1b2IzTjBibUZ0WlgxbWRXNWpkR2x2YmlCNktHRXNZaXhqS1h0bWRXNWpkR2x2YmlCa0tDbDdiU1ltWlNZbVppWW1LRzBvWnlrc2JUMXVkV3hzS1gxaVBYUW9ZU3hjSW14cGJtdGNJaXg3Y21Wc09sd2ljM1I1YkdWemFHVmxkRndpTEdoeVpXWTZZaXh0WldScFlUcGNJbUZzYkZ3aWZTazdkbUZ5SUdVOUlURXNaajBoTUN4blBXNTFiR3dzYlQxamZIeHVkV3hzTzJSaFB5aGlMbTl1Ykc5aFpEMW1kVzVqZEdsdmJpZ3BlMlU5SVRBN1pDZ3BmU3hpTG05dVpYSnliM0k5Wm5WdVkzUnBiMjRvS1h0bFBTRXdPMmM5UlhKeWIzSW9YQ0pUZEhsc1pYTm9aV1YwSUdaaGFXeGxaQ0IwYnlCc2IyRmtYQ0lwTzJRb0tYMHBPbk5sZEZScGJXVnZkWFFvWm5WdVkzUnBiMjRvS1h0bFBTRXdPMlFvS1gwc01DazdkU2hoTEZ3aWFHVmhaRndpTEdJcGZWeHVablZ1WTNScGIyNGdRU2hoTEdJc1l5eGtLWHQyWVhJZ1pUMWhMbU11WjJWMFJXeGxiV1Z1ZEhOQ2VWUmhaMDVoYldVb1hDSm9aV0ZrWENJcFd6QmRPMmxtS0dVcGUzWmhjaUJtUFhRb1lTeGNJbk5qY21sd2RGd2lMSHR6Y21NNlluMHBMR2M5SVRFN1ppNXZibXh2WVdROVppNXZibkpsWVdSNWMzUmhkR1ZqYUdGdVoyVTlablZ1WTNScGIyNG9LWHRuZkh4MGFHbHpMbkpsWVdSNVUzUmhkR1VtSmx3aWJHOWhaR1ZrWENJaFBYUm9hWE11Y21WaFpIbFRkR0YwWlNZbVhDSmpiMjF3YkdWMFpWd2lJVDEwYUdsekxuSmxZV1I1VTNSaGRHVjhmQ2huUFNFd0xHTW1KbU1vYm5Wc2JDa3NaaTV2Ym14dllXUTlaaTV2Ym5KbFlXUjVjM1JoZEdWamFHRnVaMlU5Ym5Wc2JDeGNJa2hGUVVSY0lqMDlaaTV3WVhKbGJuUk9iMlJsTG5SaFowNWhiV1VtSm1VdWNtVnRiM1psUTJocGJHUW9aaWtwZlR0bExtRndjR1Z1WkVOb2FXeGtLR1lwTzNObGRGUnBiV1Z2ZFhRb1puVnVZM1JwYjI0b0tYdG5mSHdvWnowaE1DeGpKaVpqS0VWeWNtOXlLRndpVTJOeWFYQjBJR3h2WVdRZ2RHbHRaVzkxZEZ3aUtTa3BmU3hrZkh3MVJUTXBPM0psZEhWeWJpQm1mWEpsZEhWeWJpQnVkV3hzZlR0bWRXNWpkR2x2YmlCQ0tDbDdkR2hwY3k1aFBUQTdkR2hwY3k1alBXNTFiR3g5Wm5WdVkzUnBiMjRnUXloaEtYdGhMbUVyS3p0eVpYUjFjbTRnWm5WdVkzUnBiMjRvS1h0aExtRXRMVHRFS0dFcGZYMW1kVzVqZEdsdmJpQkZLR0VzWWlsN1lTNWpQV0k3UkNoaEtYMW1kVzVqZEdsdmJpQkVLR0VwZXpBOVBXRXVZU1ltWVM1akppWW9ZUzVqS0Nrc1lTNWpQVzUxYkd3cGZUdG1kVzVqZEdsdmJpQkdLR0VwZTNSb2FYTXVZVDFoZkh4Y0lpMWNJbjFHTG5CeWIzUnZkSGx3WlM1alBXWjFibU4wYVc5dUtHRXBlMlp2Y2loMllYSWdZajFiWFN4alBUQTdZenhoY21kMWJXVnVkSE11YkdWdVozUm9PMk1yS3lsaUxuQjFjMmdvWVhKbmRXMWxiblJ6VzJOZExuSmxjR3hoWTJVb0wxdGNYRmRmWFNzdlp5eGNJbHdpS1M1MGIweHZkMlZ5UTJGelpTZ3BLVHR5WlhSMWNtNGdZaTVxYjJsdUtIUm9hWE11WVNsOU8yWjFibU4wYVc5dUlFY29ZU3hpS1h0MGFHbHpMbU05WVR0MGFHbHpMbVk5TkR0MGFHbHpMbUU5WENKdVhDSTdkbUZ5SUdNOUtHSjhmRndpYmpSY0lpa3ViV0YwWTJnb0wxNG9XMjVwYjEwcEtGc3hMVGxkS1NRdmFTazdZeVltS0hSb2FYTXVZVDFqV3pGZExIUm9hWE11Wmoxd1lYSnpaVWx1ZENoald6SmRMREV3S1NsOVpuVnVZM1JwYjI0Z1ptRW9ZU2w3Y21WMGRYSnVJRWdvWVNrclhDSWdYQ0lyS0dFdVppdGNJakF3WENJcEsxd2lJRE13TUhCNElGd2lLMGtvWVM1aktYMW1kVzVqZEdsdmJpQkpLR0VwZTNaaGNpQmlQVnRkTzJFOVlTNXpjR3hwZENndkxGeGNjeW92S1R0bWIzSW9kbUZ5SUdNOU1EdGpQR0V1YkdWdVozUm9PMk1yS3lsN2RtRnlJR1E5WVZ0alhTNXlaWEJzWVdObEtDOWJKMXdpWFM5bkxGd2lYQ0lwT3kweElUMWtMbWx1WkdWNFQyWW9YQ0lnWENJcGZId3ZYbHhjWkM4dWRHVnpkQ2hrS1Q5aUxuQjFjMmdvWENJblhDSXJaQ3RjSWlkY0lpazZZaTV3ZFhOb0tHUXBmWEpsZEhWeWJpQmlMbXB2YVc0b1hDSXNYQ0lwZldaMWJtTjBhVzl1SUVvb1lTbDdjbVYwZFhKdUlHRXVZU3RoTG1aOVpuVnVZM1JwYjI0Z1NDaGhLWHQyWVhJZ1lqMWNJbTV2Y20xaGJGd2lPMXdpYjF3aVBUMDlZUzVoUDJJOVhDSnZZbXhwY1hWbFhDSTZYQ0pwWENJOVBUMWhMbUVtSmloaVBWd2lhWFJoYkdsalhDSXBPM0psZEhWeWJpQmlmVnh1Wm5WdVkzUnBiMjRnWjJFb1lTbDdkbUZ5SUdJOU5DeGpQVndpYmx3aUxHUTliblZzYkR0aEppWW9LR1E5WVM1dFlYUmphQ2d2S0c1dmNtMWhiSHh2WW14cGNYVmxmR2wwWVd4cFl5a3ZhU2twSmlaa1d6RmRKaVlvWXoxa1d6RmRMbk4xWW5OMGNpZ3dMREVwTG5SdlRHOTNaWEpEWVhObEtDa3BMQ2hrUFdFdWJXRjBZMmdvTHloYk1TMDVYVEF3Zkc1dmNtMWhiSHhpYjJ4a0tTOXBLU2ttSm1SYk1WMG1KaWd2WW05c1pDOXBMblJsYzNRb1pGc3hYU2svWWowM09pOWJNUzA1WFRBd0x5NTBaWE4wS0dSYk1WMHBKaVlvWWoxd1lYSnpaVWx1ZENoa1d6RmRMbk4xWW5OMGNpZ3dMREVwTERFd0tTa3BLVHR5WlhSMWNtNGdZeXRpZlR0bWRXNWpkR2x2YmlCb1lTaGhMR0lwZTNSb2FYTXVZejFoTzNSb2FYTXVaajFoTG04dVpHOWpkVzFsYm5RdVpHOWpkVzFsYm5SRmJHVnRaVzUwTzNSb2FYTXVhRDFpTzNSb2FYTXVZVDF1WlhjZ1JpaGNJaTFjSWlrN2RHaHBjeTVxUFNFeElUMDlZaTVsZG1WdWRITTdkR2hwY3k1blBTRXhJVDA5WWk1amJHRnpjMlZ6ZldaMWJtTjBhVzl1SUdsaEtHRXBlMkV1WnlZbWR5aGhMbVlzVzJFdVlTNWpLRndpZDJaY0lpeGNJbXh2WVdScGJtZGNJaWxkS1R0TEtHRXNYQ0pzYjJGa2FXNW5YQ0lwZldaMWJtTjBhVzl1SUV3b1lTbDdhV1lvWVM1bktYdDJZWElnWWoxNUtHRXVaaXhoTG1FdVl5aGNJbmRtWENJc1hDSmhZM1JwZG1WY0lpa3BMR005VzEwc1pEMWJZUzVoTG1Nb1hDSjNabHdpTEZ3aWJHOWhaR2x1WjF3aUtWMDdZbng4WXk1d2RYTm9LR0V1WVM1aktGd2lkMlpjSWl4Y0ltbHVZV04wYVhabFhDSXBLVHQzS0dFdVppeGpMR1FwZlVzb1lTeGNJbWx1WVdOMGFYWmxYQ0lwZldaMWJtTjBhVzl1SUVzb1lTeGlMR01wZTJsbUtHRXVhaVltWVM1b1cySmRLV2xtS0dNcFlTNW9XMkpkS0dNdVl5eEtLR01wS1R0bGJITmxJR0V1YUZ0aVhTZ3BmVHRtZFc1amRHbHZiaUJxWVNncGUzUm9hWE11WXoxN2ZYMW1kVzVqZEdsdmJpQnJZU2hoTEdJc1l5bDdkbUZ5SUdROVcxMHNaVHRtYjNJb1pTQnBiaUJpS1dsbUtHSXVhR0Z6VDNkdVVISnZjR1Z5ZEhrb1pTa3BlM1poY2lCbVBXRXVZMXRsWFR0bUppWmtMbkIxYzJnb1ppaGlXMlZkTEdNcEtYMXlaWFIxY200Z1pIMDdablZ1WTNScGIyNGdUU2hoTEdJcGUzUm9hWE11WXoxaE8zUm9hWE11WmoxaU8zUm9hWE11WVQxMEtIUm9hWE11WXl4Y0luTndZVzVjSWl4N1hDSmhjbWxoTFdocFpHUmxibHdpT2x3aWRISjFaVndpZlN4MGFHbHpMbVlwZldaMWJtTjBhVzl1SUU0b1lTbDdkU2hoTG1Nc1hDSmliMlI1WENJc1lTNWhLWDFtZFc1amRHbHZiaUJQS0dFcGUzSmxkSFZ5Ymx3aVpHbHpjR3hoZVRwaWJHOWphenR3YjNOcGRHbHZianBoWW5OdmJIVjBaVHQwYjNBNkxUazVPVGx3ZUR0c1pXWjBPaTA1T1RrNWNIZzdabTl1ZEMxemFYcGxPak13TUhCNE8zZHBaSFJvT21GMWRHODdhR1ZwWjJoME9tRjFkRzg3YkdsdVpTMW9aV2xuYUhRNmJtOXliV0ZzTzIxaGNtZHBiam93TzNCaFpHUnBibWM2TUR0bWIyNTBMWFpoY21saGJuUTZibTl5YldGc08zZG9hWFJsTFhOd1lXTmxPbTV2ZDNKaGNEdG1iMjUwTFdaaGJXbHNlVHBjSWl0SktHRXVZeWtyWENJN1hDSXJLRndpWm05dWRDMXpkSGxzWlRwY0lpdElLR0VwSzF3aU8yWnZiblF0ZDJWcFoyaDBPbHdpS3loaExtWXJYQ0l3TUZ3aUtTdGNJanRjSWlsOU8yWjFibU4wYVc5dUlGQW9ZU3hpTEdNc1pDeGxMR1lwZTNSb2FYTXVaejFoTzNSb2FYTXVhajFpTzNSb2FYTXVZVDFrTzNSb2FYTXVZejFqTzNSb2FYTXVaajFsZkh3elJUTTdkR2hwY3k1b1BXWjhmSFp2YVdRZ01IMVFMbkJ5YjNSdmRIbHdaUzV6ZEdGeWREMW1kVzVqZEdsdmJpZ3BlM1poY2lCaFBYUm9hWE11WXk1dkxtUnZZM1Z0Wlc1MExHSTlkR2hwY3l4alBYRW9LU3hrUFc1bGR5QlFjbTl0YVhObEtHWjFibU4wYVc5dUtHUXNaU2w3Wm5WdVkzUnBiMjRnWmlncGUzRW9LUzFqUGoxaUxtWS9aU2dwT21FdVptOXVkSE11Ykc5aFpDaG1ZU2hpTG1FcExHSXVhQ2t1ZEdobGJpaG1kVzVqZEdsdmJpaGhLWHN4UEQxaExteGxibWQwYUQ5a0tDazZjMlYwVkdsdFpXOTFkQ2htTERJMUtYMHNablZ1WTNScGIyNG9LWHRsS0NsOUtYMW1LQ2w5S1N4bFBXNTFiR3dzWmoxdVpYY2dVSEp2YldselpTaG1kVzVqZEdsdmJpaGhMR1FwZTJVOWMyVjBWR2x0Wlc5MWRDaGtMR0l1WmlsOUtUdFFjbTl0YVhObExuSmhZMlVvVzJZc1pGMHBMblJvWlc0b1puVnVZM1JwYjI0b0tYdGxKaVlvWTJ4bFlYSlVhVzFsYjNWMEtHVXBMR1U5Ym5Wc2JDazdZaTVuS0dJdVlTbDlMR1oxYm1OMGFXOXVLQ2w3WWk1cUtHSXVZU2w5S1gwN1puVnVZM1JwYjI0Z1VTaGhMR0lzWXl4a0xHVXNaaXhuS1h0MGFHbHpMblk5WVR0MGFHbHpMa0k5WWp0MGFHbHpMbU05WXp0MGFHbHpMbUU5WkR0MGFHbHpMbk05WjN4OFhDSkNSVk5pYzNkNVhDSTdkR2hwY3k1bVBYdDlPM1JvYVhNdWR6MWxmSHd6UlRNN2RHaHBjeTUxUFdaOGZHNTFiR3c3ZEdocGN5NXRQWFJvYVhNdWFqMTBhR2x6TG1nOWRHaHBjeTVuUFc1MWJHdzdkR2hwY3k1blBXNWxkeUJOS0hSb2FYTXVZeXgwYUdsekxuTXBPM1JvYVhNdWFEMXVaWGNnVFNoMGFHbHpMbU1zZEdocGN5NXpLVHQwYUdsekxtbzlibVYzSUUwb2RHaHBjeTVqTEhSb2FYTXVjeWs3ZEdocGN5NXRQVzVsZHlCTktIUm9hWE11WXl4MGFHbHpMbk1wTzJFOWJtVjNJRWNvZEdocGN5NWhMbU1yWENJc2MyVnlhV1pjSWl4S0tIUm9hWE11WVNrcE8yRTlUeWhoS1R0MGFHbHpMbWN1WVM1emRIbHNaUzVqYzNOVVpYaDBQV0U3WVQxdVpYY2dSeWgwYUdsekxtRXVZeXRjSWl4ellXNXpMWE5sY21sbVhDSXNTaWgwYUdsekxtRXBLVHRoUFU4b1lTazdkR2hwY3k1b0xtRXVjM1I1YkdVdVkzTnpWR1Y0ZEQxaE8yRTlibVYzSUVjb1hDSnpaWEpwWmx3aUxFb29kR2hwY3k1aEtTazdZVDFQS0dFcE8zUm9hWE11YWk1aExuTjBlV3hsTG1OemMxUmxlSFE5WVR0aFBXNWxkeUJIS0Z3aWMyRnVjeTF6WlhKcFpsd2lMRW9vZEdocGN5NWhLU2s3WVQxY2JrOG9ZU2s3ZEdocGN5NXRMbUV1YzNSNWJHVXVZM056VkdWNGREMWhPMDRvZEdocGN5NW5LVHRPS0hSb2FYTXVhQ2s3VGloMGFHbHpMbW9wTzA0b2RHaHBjeTV0S1gxMllYSWdVajE3UkRwY0luTmxjbWxtWENJc1F6cGNJbk5oYm5NdGMyVnlhV1pjSW4wc1V6MXVkV3hzTzJaMWJtTjBhVzl1SUZRb0tYdHBaaWh1ZFd4c1BUMDlVeWw3ZG1GeUlHRTlMMEZ3Y0d4bFYyVmlTMmwwWEZ3dktGc3dMVGxkS3lrb1B6cGNYQzRvV3pBdE9WMHJLU2t2TG1WNFpXTW9kMmx1Wkc5M0xtNWhkbWxuWVhSdmNpNTFjMlZ5UVdkbGJuUXBPMU05SVNGaEppWW9OVE0yUG5CaGNuTmxTVzUwS0dGYk1WMHNNVEFwZkh3MU16WTlQVDF3WVhKelpVbHVkQ2hoV3pGZExERXdLU1ltTVRFK1BYQmhjbk5sU1c1MEtHRmJNbDBzTVRBcEtYMXlaWFIxY200Z1UzMVJMbkJ5YjNSdmRIbHdaUzV6ZEdGeWREMW1kVzVqZEdsdmJpZ3BlM1JvYVhNdVppNXpaWEpwWmoxMGFHbHpMbW91WVM1dlptWnpaWFJYYVdSMGFEdDBhR2x6TG1aYlhDSnpZVzV6TFhObGNtbG1YQ0pkUFhSb2FYTXViUzVoTG05bVpuTmxkRmRwWkhSb08zUm9hWE11UVQxeEtDazdWU2gwYUdsektYMDdYRzVtZFc1amRHbHZiaUJzWVNoaExHSXNZeWw3Wm05eUtIWmhjaUJrSUdsdUlGSXBhV1lvVWk1b1lYTlBkMjVRY205d1pYSjBlU2hrS1NZbVlqMDlQV0V1Wmx0U1cyUmRYU1ltWXowOVBXRXVabHRTVzJSZFhTbHlaWFIxY200aE1EdHlaWFIxY200aE1YMW1kVzVqZEdsdmJpQlZLR0VwZTNaaGNpQmlQV0V1Wnk1aExtOW1abk5sZEZkcFpIUm9MR005WVM1b0xtRXViMlptYzJWMFYybGtkR2dzWkRzb1pEMWlQVDA5WVM1bUxuTmxjbWxtSmlaalBUMDlZUzVtVzF3aWMyRnVjeTF6WlhKcFpsd2lYU2w4ZkNoa1BWUW9LU1ltYkdFb1lTeGlMR01wS1R0a1AzRW9LUzFoTGtFK1BXRXVkejlVS0NrbUpteGhLR0VzWWl4aktTWW1LRzUxYkd3OVBUMWhMblY4ZkdFdWRTNW9ZWE5QZDI1UWNtOXdaWEowZVNoaExtRXVZeWtwUDFZb1lTeGhMbllwT2xZb1lTeGhMa0lwT20xaEtHRXBPbFlvWVN4aExuWXBmV1oxYm1OMGFXOXVJRzFoS0dFcGUzTmxkRlJwYldWdmRYUW9jQ2htZFc1amRHbHZiaWdwZTFVb2RHaHBjeWw5TEdFcExEVXdLWDFtZFc1amRHbHZiaUJXS0dFc1lpbDdjMlYwVkdsdFpXOTFkQ2h3S0daMWJtTjBhVzl1S0NsN2RpaDBhR2x6TG1jdVlTazdkaWgwYUdsekxtZ3VZU2s3ZGloMGFHbHpMbW91WVNrN2RpaDBhR2x6TG0wdVlTazdZaWgwYUdsekxtRXBmU3hoS1N3d0tYMDdablZ1WTNScGIyNGdWeWhoTEdJc1l5bDdkR2hwY3k1alBXRTdkR2hwY3k1aFBXSTdkR2hwY3k1bVBUQTdkR2hwY3k1dFBYUm9hWE11YWowaE1UdDBhR2x6TG5NOVkzMTJZWElnV0QxdWRXeHNPMWN1Y0hKdmRHOTBlWEJsTG1jOVpuVnVZM1JwYjI0b1lTbDdkbUZ5SUdJOWRHaHBjeTVoTzJJdVp5WW1keWhpTG1Zc1cySXVZUzVqS0Z3aWQyWmNJaXhoTG1Nc1NpaGhLUzUwYjFOMGNtbHVaeWdwTEZ3aVlXTjBhWFpsWENJcFhTeGJZaTVoTG1Nb1hDSjNabHdpTEdFdVl5eEtLR0VwTG5SdlUzUnlhVzVuS0Nrc1hDSnNiMkZrYVc1blhDSXBMR0l1WVM1aktGd2lkMlpjSWl4aExtTXNTaWhoS1M1MGIxTjBjbWx1WnlncExGd2lhVzVoWTNScGRtVmNJaWxkS1R0TEtHSXNYQ0ptYjI1MFlXTjBhWFpsWENJc1lTazdkR2hwY3k1dFBTRXdPMjVoS0hSb2FYTXBmVHRjYmxjdWNISnZkRzkwZVhCbExtZzlablZ1WTNScGIyNG9ZU2w3ZG1GeUlHSTlkR2hwY3k1aE8ybG1LR0l1WnlsN2RtRnlJR005ZVNoaUxtWXNZaTVoTG1Nb1hDSjNabHdpTEdFdVl5eEtLR0VwTG5SdlUzUnlhVzVuS0Nrc1hDSmhZM1JwZG1WY0lpa3BMR1E5VzEwc1pUMWJZaTVoTG1Nb1hDSjNabHdpTEdFdVl5eEtLR0VwTG5SdlUzUnlhVzVuS0Nrc1hDSnNiMkZrYVc1blhDSXBYVHRqZkh4a0xuQjFjMmdvWWk1aExtTW9YQ0ozWmx3aUxHRXVZeXhLS0dFcExuUnZVM1J5YVc1bktDa3NYQ0pwYm1GamRHbDJaVndpS1NrN2R5aGlMbVlzWkN4bEtYMUxLR0lzWENKbWIyNTBhVzVoWTNScGRtVmNJaXhoS1R0dVlTaDBhR2x6S1gwN1puVnVZM1JwYjI0Z2JtRW9ZU2w3TUQwOUxTMWhMbVltSm1FdWFpWW1LR0V1YlQ4b1lUMWhMbUVzWVM1bkppWjNLR0V1Wml4YllTNWhMbU1vWENKM1psd2lMRndpWVdOMGFYWmxYQ0lwWFN4YllTNWhMbU1vWENKM1psd2lMRndpYkc5aFpHbHVaMXdpS1N4aExtRXVZeWhjSW5kbVhDSXNYQ0pwYm1GamRHbDJaVndpS1YwcExFc29ZU3hjSW1GamRHbDJaVndpS1NrNlRDaGhMbUVwS1gwN1puVnVZM1JwYjI0Z2IyRW9ZU2w3ZEdocGN5NXFQV0U3ZEdocGN5NWhQVzVsZHlCcVlUdDBhR2x6TG1nOU1EdDBhR2x6TG1ZOWRHaHBjeTVuUFNFd2ZXOWhMbkJ5YjNSdmRIbHdaUzVzYjJGa1BXWjFibU4wYVc5dUtHRXBlM1JvYVhNdVl6MXVaWGNnWTJFb2RHaHBjeTVxTEdFdVkyOXVkR1Y0ZEh4OGRHaHBjeTVxS1R0MGFHbHpMbWM5SVRFaFBUMWhMbVYyWlc1MGN6dDBhR2x6TG1ZOUlURWhQVDFoTG1Oc1lYTnpaWE03Y0dFb2RHaHBjeXh1WlhjZ2FHRW9kR2hwY3k1akxHRXBMR0VwZlR0Y2JtWjFibU4wYVc5dUlIRmhLR0VzWWl4akxHUXNaU2w3ZG1GeUlHWTlNRDA5TFMxaExtZzdLR0V1Wm54OFlTNW5LU1ltYzJWMFZHbHRaVzkxZENobWRXNWpkR2x2YmlncGUzWmhjaUJoUFdWOGZHNTFiR3dzYlQxa2ZIeHVkV3hzZkh4N2ZUdHBaaWd3UFQwOVl5NXNaVzVuZEdnbUptWXBUQ2hpTG1FcE8yVnNjMlY3WWk1bUt6MWpMbXhsYm1kMGFEdG1KaVlvWWk1cVBXWXBPM1poY2lCb0xHdzlXMTA3Wm05eUtHZzlNRHRvUEdNdWJHVnVaM1JvTzJnckt5bDdkbUZ5SUdzOVkxdG9YU3h1UFcxYmF5NWpYU3h5UFdJdVlTeDRQV3M3Y2k1bkppWjNLSEl1Wml4YmNpNWhMbU1vWENKM1psd2lMSGd1WXl4S0tIZ3BMblJ2VTNSeWFXNW5LQ2tzWENKc2IyRmthVzVuWENJcFhTazdTeWh5TEZ3aVptOXVkR3h2WVdScGJtZGNJaXg0S1R0eVBXNTFiR3c3YVdZb2JuVnNiRDA5UFZncGFXWW9kMmx1Wkc5M0xrWnZiblJHWVdObEtYdDJZWElnZUQwdlIyVmphMjh1S2tacGNtVm1iM2hjWEM4b1hGeGtLeWt2TG1WNFpXTW9kMmx1Wkc5M0xtNWhkbWxuWVhSdmNpNTFjMlZ5UVdkbGJuUXBMSGhoUFM5UFV5QllMaXBXWlhKemFXOXVYRnd2TVRCY1hDNHVLbE5oWm1GeWFTOHVaWGhsWXloM2FXNWtiM2N1Ym1GMmFXZGhkRzl5TG5WelpYSkJaMlZ1ZENrbUppOUJjSEJzWlM4dVpYaGxZeWgzYVc1a2IzY3VibUYyYVdkaGRHOXlMblpsYm1SdmNpazdYRzVZUFhnL05ESThjR0Z5YzJWSmJuUW9lRnN4WFN3eE1DazZlR0UvSVRFNklUQjlaV3h6WlNCWVBTRXhPMWcvY2oxdVpYY2dVQ2h3S0dJdVp5eGlLU3h3S0dJdWFDeGlLU3hpTG1Nc2F5eGlMbk1zYmlrNmNqMXVaWGNnVVNod0tHSXVaeXhpS1N4d0tHSXVhQ3hpS1N4aUxtTXNheXhpTG5Nc1lTeHVLVHRzTG5CMWMyZ29jaWw5Wm05eUtHZzlNRHRvUEd3dWJHVnVaM1JvTzJnckt5bHNXMmhkTG5OMFlYSjBLQ2w5ZlN3d0tYMW1kVzVqZEdsdmJpQndZU2hoTEdJc1l5bDdkbUZ5SUdROVcxMHNaVDFqTG5ScGJXVnZkWFE3YVdFb1lpazdkbUZ5SUdROWEyRW9ZUzVoTEdNc1lTNWpLU3htUFc1bGR5QlhLR0V1WXl4aUxHVXBPMkV1YUQxa0xteGxibWQwYUR0aVBUQTdabTl5S0dNOVpDNXNaVzVuZEdnN1lqeGpPMklyS3lsa1cySmRMbXh2WVdRb1puVnVZM1JwYjI0b1lpeGtMR01wZTNGaEtHRXNaaXhpTEdRc1l5bDlLWDA3Wm5WdVkzUnBiMjRnY21Fb1lTeGlLWHQwYUdsekxtTTlZVHQwYUdsekxtRTlZbjFjYm5KaExuQnliM1J2ZEhsd1pTNXNiMkZrUFdaMWJtTjBhVzl1S0dFcGUyWjFibU4wYVc5dUlHSW9LWHRwWmlobVcxd2lYMTl0ZEdsZlptNTBUSE4wWENJclpGMHBlM1poY2lCalBXWmJYQ0pmWDIxMGFWOW1iblJNYzNSY0lpdGtYU2dwTEdVOVcxMHNhRHRwWmloaktXWnZjaWgyWVhJZ2JEMHdPMnc4WXk1c1pXNW5kR2c3YkNzcktYdDJZWElnYXoxalcyeGRMbVp2Ym5SbVlXMXBiSGs3ZG05cFpDQXdJVDFqVzJ4ZExtWnZiblJUZEhsc1pTWW1kbTlwWkNBd0lUMWpXMnhkTG1admJuUlhaV2xuYUhRL0tHZzlZMXRzWFM1bWIyNTBVM1I1YkdVclkxdHNYUzVtYjI1MFYyVnBaMmgwTEdVdWNIVnphQ2h1WlhjZ1J5aHJMR2dwS1NrNlpTNXdkWE5vS0c1bGR5QkhLR3NwS1gxaEtHVXBmV1ZzYzJVZ2MyVjBWR2x0Wlc5MWRDaG1kVzVqZEdsdmJpZ3BlMklvS1gwc05UQXBmWFpoY2lCalBYUm9hWE1zWkQxakxtRXVjSEp2YW1WamRFbGtMR1U5WXk1aExuWmxjbk5wYjI0N2FXWW9aQ2w3ZG1GeUlHWTlZeTVqTG04N1FTaDBhR2x6TG1Nc0tHTXVZUzVoY0dsOGZGd2lhSFIwY0hNNkx5OW1ZWE4wTG1admJuUnpMbTVsZEM5cWMyRndhVndpS1N0Y0lpOWNJaXRrSzF3aUxtcHpYQ0lyS0dVL1hDSS9kajFjSWl0bE9sd2lYQ0lwTEdaMWJtTjBhVzl1S0dVcGUyVS9ZU2hiWFNrNktHWmJYQ0pmWDAxdmJtOTBlWEJsUTI5dVptbG5kWEpoZEdsdmJsOWZYQ0lyWEc1a1hUMW1kVzVqZEdsdmJpZ3BlM0psZEhWeWJpQmpMbUY5TEdJb0tTbDlLUzVwWkQxY0lsOWZUVzl1YjNSNWNHVkJVRWxUWTNKcGNIUmZYMXdpSzJSOVpXeHpaU0JoS0Z0ZEtYMDdablZ1WTNScGIyNGdjMkVvWVN4aUtYdDBhR2x6TG1NOVlUdDBhR2x6TG1FOVluMXpZUzV3Y205MGIzUjVjR1V1Ykc5aFpEMW1kVzVqZEdsdmJpaGhLWHQyWVhJZ1lpeGpMR1E5ZEdocGN5NWhMblZ5YkhOOGZGdGRMR1U5ZEdocGN5NWhMbVpoYldsc2FXVnpmSHhiWFN4bVBYUm9hWE11WVM1MFpYTjBVM1J5YVc1bmMzeDhlMzBzWnoxdVpYY2dRanRpUFRBN1ptOXlLR005WkM1c1pXNW5kR2c3WWp4ak8ySXJLeWw2S0hSb2FYTXVZeXhrVzJKZExFTW9aeWtwTzNaaGNpQnRQVnRkTzJJOU1EdG1iM0lvWXoxbExteGxibWQwYUR0aVBHTTdZaXNyS1dsbUtHUTlaVnRpWFM1emNHeHBkQ2hjSWpwY0lpa3NaRnN4WFNsbWIzSW9kbUZ5SUdnOVpGc3hYUzV6Y0d4cGRDaGNJaXhjSWlrc2JEMHdPMnc4YUM1c1pXNW5kR2c3YkNzOU1TbHRMbkIxYzJnb2JtVjNJRWNvWkZzd1hTeG9XMnhkS1NrN1pXeHpaU0J0TG5CMWMyZ29ibVYzSUVjb1pGc3dYU2twTzBVb1p5eG1kVzVqZEdsdmJpZ3BlMkVvYlN4bUtYMHBmVHRtZFc1amRHbHZiaUIwWVNoaExHSXBlMkUvZEdocGN5NWpQV0U2ZEdocGN5NWpQWFZoTzNSb2FYTXVZVDFiWFR0MGFHbHpMbVk5VzEwN2RHaHBjeTVuUFdKOGZGd2lYQ0o5ZG1GeUlIVmhQVndpYUhSMGNITTZMeTltYjI1MGN5NW5iMjluYkdWaGNHbHpMbU52YlM5amMzTmNJanRtZFc1amRHbHZiaUIyWVNoaExHSXBlMlp2Y2loMllYSWdZejFpTG14bGJtZDBhQ3hrUFRBN1pEeGpPMlFyS3lsN2RtRnlJR1U5WWx0a1hTNXpjR3hwZENoY0lqcGNJaWs3TXowOVpTNXNaVzVuZEdnbUptRXVaaTV3ZFhOb0tHVXVjRzl3S0NrcE8zWmhjaUJtUFZ3aVhDSTdNajA5WlM1c1pXNW5kR2dtSmx3aVhDSWhQV1ZiTVYwbUppaG1QVndpT2x3aUtUdGhMbUV1Y0hWemFDaGxMbXB2YVc0b1ppa3BmWDFjYm1aMWJtTjBhVzl1SUhkaEtHRXBlMmxtS0RBOVBXRXVZUzVzWlc1bmRHZ3BkR2h5YjNjZ1JYSnliM0lvWENKT2J5Qm1iMjUwY3lCMGJ5QnNiMkZrSVZ3aUtUdHBaaWd0TVNFOVlTNWpMbWx1WkdWNFQyWW9YQ0pyYVhROVhDSXBLWEpsZEhWeWJpQmhMbU03Wm05eUtIWmhjaUJpUFdFdVlTNXNaVzVuZEdnc1l6MWJYU3hrUFRBN1pEeGlPMlFyS3lsakxuQjFjMmdvWVM1aFcyUmRMbkpsY0d4aFkyVW9MeUF2Wnl4Y0lpdGNJaWtwTzJJOVlTNWpLMXdpUDJaaGJXbHNlVDFjSWl0akxtcHZhVzRvWENJbE4wTmNJaWs3TUR4aExtWXViR1Z1WjNSb0ppWW9ZaXM5WENJbWMzVmljMlYwUFZ3aUsyRXVaaTVxYjJsdUtGd2lMRndpS1NrN01EeGhMbWN1YkdWdVozUm9KaVlvWWlzOVhDSW1kR1Y0ZEQxY0lpdGxibU52WkdWVlVrbERiMjF3YjI1bGJuUW9ZUzVuS1NrN2NtVjBkWEp1SUdKOU8yWjFibU4wYVc5dUlIbGhLR0VwZTNSb2FYTXVaajFoTzNSb2FYTXVZVDFiWFR0MGFHbHpMbU05ZTMxOVhHNTJZWElnZW1FOWUyeGhkR2x1T2x3aVFrVlRZbk4zZVZ3aUxGd2liR0YwYVc0dFpYaDBYQ0k2WENKY1hIVXdNR1UzWEZ4MU1EQm1ObHhjZFRBd1ptTmNYSFV3TVRGbVhGeDFNREUxWmx3aUxHTjVjbWxzYkdsak9sd2lYRngxTURRek9WeGNkVEEwTkdaY1hIVXdOREUyWENJc1ozSmxaV3M2WENKY1hIVXdNMkl4WEZ4MU1ETmlNbHhjZFRBellUTmNJaXhyYUcxbGNqcGNJbHhjZFRFM09EQmNYSFV4TnpneFhGeDFNVGM0TWx3aUxFaGhiblZ0WVc0NlhDSmNYSFV4Tnpnd1hGeDFNVGM0TVZ4Y2RURTNPREpjSW4wc1FXRTllM1JvYVc0NlhDSXhYQ0lzWlhoMGNtRnNhV2RvZERwY0lqSmNJaXhjSW1WNGRISmhMV3hwWjJoMFhDSTZYQ0l5WENJc2RXeDBjbUZzYVdkb2REcGNJakpjSWl4Y0luVnNkSEpoTFd4cFoyaDBYQ0k2WENJeVhDSXNiR2xuYUhRNlhDSXpYQ0lzY21WbmRXeGhjanBjSWpSY0lpeGliMjlyT2x3aU5Gd2lMRzFsWkdsMWJUcGNJalZjSWl4Y0luTmxiV2t0WW05c1pGd2lPbHdpTmx3aUxITmxiV2xpYjJ4a09sd2lObHdpTEZ3aVpHVnRhUzFpYjJ4a1hDSTZYQ0kyWENJc1pHVnRhV0p2YkdRNlhDSTJYQ0lzWW05c1pEcGNJamRjSWl4Y0ltVjRkSEpoTFdKdmJHUmNJanBjSWpoY0lpeGxlSFJ5WVdKdmJHUTZYQ0k0WENJc1hDSjFiSFJ5WVMxaWIyeGtYQ0k2WENJNFhDSXNkV3gwY21GaWIyeGtPbHdpT0Z3aUxHSnNZV05yT2x3aU9Wd2lMR2hsWVhaNU9sd2lPVndpTEd3NlhDSXpYQ0lzY2pwY0lqUmNJaXhpT2x3aU4xd2lmU3hDWVQxN2FUcGNJbWxjSWl4cGRHRnNhV002WENKcFhDSXNianBjSW01Y0lpeHViM0p0WVd3NlhDSnVYQ0o5TEZ4dVEyRTlMMTRvZEdocGJud29Qem9vUHpwbGVIUnlZWHgxYkhSeVlTa3RQeWsvYkdsbmFIUjhjbVZuZFd4aGNueGliMjlyZkcxbFpHbDFiWHdvUHpvb1B6cHpaVzFwZkdSbGJXbDhaWGgwY21GOGRXeDBjbUVwTFQ4cFAySnZiR1I4WW14aFkydDhhR1ZoZG5sOGJIeHlmR0o4V3pFdE9WMHdNQ2svS0c1OGFYeHViM0p0WVd4OGFYUmhiR2xqS1Q4a0x6dGNibVoxYm1OMGFXOXVJRVJoS0dFcGUyWnZjaWgyWVhJZ1lqMWhMbVl1YkdWdVozUm9MR005TUR0alBHSTdZeXNyS1h0MllYSWdaRDFoTG1aYlkxMHVjM0JzYVhRb1hDSTZYQ0lwTEdVOVpGc3dYUzV5WlhCc1lXTmxLQzljWENzdlp5eGNJaUJjSWlrc1pqMWJYQ0p1TkZ3aVhUdHBaaWd5UEQxa0xteGxibWQwYUNsN2RtRnlJR2M3ZG1GeUlHMDlaRnN4WFR0blBWdGRPMmxtS0cwcFptOXlLSFpoY2lCdFBXMHVjM0JzYVhRb1hDSXNYQ0lwTEdnOWJTNXNaVzVuZEdnc2JEMHdPMnc4YUR0c0t5c3BlM1poY2lCck8yczliVnRzWFR0cFppaHJMbTFoZEdOb0tDOWVXMXhjZHkxZEt5UXZLU2w3ZG1GeUlHNDlRMkV1WlhobFl5aHJMblJ2VEc5M1pYSkRZWE5sS0NrcE8ybG1LRzUxYkd3OVBXNHBhejFjSWx3aU8yVnNjMlY3YXoxdVd6SmRPMnM5Ym5Wc2JEMDlhM3g4WENKY0lqMDlhejljSW01Y0lqcENZVnRyWFR0dVBXNWJNVjA3YVdZb2JuVnNiRDA5Ym54OFhDSmNJajA5YmlsdVBWd2lORndpTzJWc2MyVWdkbUZ5SUhJOVFXRmJibDBzYmoxeVAzSTZhWE5PWVU0b2Jpay9YQ0kwWENJNmJpNXpkV0p6ZEhJb01Dd3hLVHRyUFZ0ckxHNWRMbXB2YVc0b1hDSmNJaWw5ZldWc2MyVWdhejFjSWx3aU8yc21KbWN1Y0hWemFDaHJLWDB3UEdjdWJHVnVaM1JvSmlZb1pqMW5LVHN6UFQxa0xteGxibWQwYUNZbUtHUTlaRnN5WFN4blBWdGRMR1E5WkQ5a0xuTndiR2wwS0Z3aUxGd2lLVHBjYm1jc01EeGtMbXhsYm1kMGFDWW1LR1E5ZW1GYlpGc3dYVjBwSmlZb1lTNWpXMlZkUFdRcEtYMWhMbU5iWlYxOGZDaGtQWHBoVzJWZEtTWW1LR0V1WTF0bFhUMWtLVHRtYjNJb1pEMHdPMlE4Wmk1c1pXNW5kR2c3WkNzOU1TbGhMbUV1Y0hWemFDaHVaWGNnUnlobExHWmJaRjBwS1gxOU8yWjFibU4wYVc5dUlFVmhLR0VzWWlsN2RHaHBjeTVqUFdFN2RHaHBjeTVoUFdKOWRtRnlJRVpoUFh0QmNtbHRiem9oTUN4RGIzVnphVzVsT2lFd0xGUnBibTl6T2lFd2ZUdEZZUzV3Y205MGIzUjVjR1V1Ykc5aFpEMW1kVzVqZEdsdmJpaGhLWHQyWVhJZ1lqMXVaWGNnUWl4alBYUm9hWE11WXl4a1BXNWxkeUIwWVNoMGFHbHpMbUV1WVhCcExIUm9hWE11WVM1MFpYaDBLU3hsUFhSb2FYTXVZUzVtWVcxcGJHbGxjenQyWVNoa0xHVXBPM1poY2lCbVBXNWxkeUI1WVNobEtUdEVZU2htS1R0NktHTXNkMkVvWkNrc1F5aGlLU2s3UlNoaUxHWjFibU4wYVc5dUtDbDdZU2htTG1Fc1ppNWpMRVpoS1gwcGZUdG1kVzVqZEdsdmJpQkhZU2hoTEdJcGUzUm9hWE11WXoxaE8zUm9hWE11WVQxaWZVZGhMbkJ5YjNSdmRIbHdaUzVzYjJGa1BXWjFibU4wYVc5dUtHRXBlM1poY2lCaVBYUm9hWE11WVM1cFpDeGpQWFJvYVhNdVl5NXZPMkkvUVNoMGFHbHpMbU1zS0hSb2FYTXVZUzVoY0dsOGZGd2lhSFIwY0hNNkx5OTFjMlV1ZEhsd1pXdHBkQzV1WlhSY0lpa3JYQ0l2WENJcllpdGNJaTVxYzF3aUxHWjFibU4wYVc5dUtHSXBlMmxtS0dJcFlTaGJYU2s3Wld4elpTQnBaaWhqTGxSNWNHVnJhWFFtSm1NdVZIbHdaV3RwZEM1amIyNW1hV2NtSm1NdVZIbHdaV3RwZEM1amIyNW1hV2N1Wm00cGUySTlZeTVVZVhCbGEybDBMbU52Ym1acFp5NW1ianRtYjNJb2RtRnlJR1U5VzEwc1pqMHdPMlk4WWk1c1pXNW5kR2c3WmlzOU1pbG1iM0lvZG1GeUlHYzlZbHRtWFN4dFBXSmJaaXN4WFN4b1BUQTdhRHh0TG14bGJtZDBhRHRvS3lzcFpTNXdkWE5vS0c1bGR5QkhLR2NzYlZ0b1hTa3BPM1J5ZVh0akxsUjVjR1ZyYVhRdWJHOWhaQ2g3WlhabGJuUnpPaUV4TEdOc1lYTnpaWE02SVRFc1lYTjVibU02SVRCOUtYMWpZWFJqYUNoc0tYdDlZU2hsS1gxOUxESkZNeWs2WVNoYlhTbDlPMloxYm1OMGFXOXVJRWhoS0dFc1lpbDdkR2hwY3k1alBXRTdkR2hwY3k1bVBXSTdkR2hwY3k1aFBWdGRmVWhoTG5CeWIzUnZkSGx3WlM1c2IyRmtQV1oxYm1OMGFXOXVLR0VwZTNaaGNpQmlQWFJvYVhNdVppNXBaQ3hqUFhSb2FYTXVZeTV2TEdROWRHaHBjenRpUHloakxsOWZkMlZpWm05dWRHWnZiblJrWldOcmJXOWtkV3hsWDE5OGZDaGpMbDlmZDJWaVptOXVkR1p2Ym5Sa1pXTnJiVzlrZFd4bFgxODllMzBwTEdNdVgxOTNaV0ptYjI1MFptOXVkR1JsWTJ0dGIyUjFiR1ZmWDF0aVhUMW1kVzVqZEdsdmJpaGlMR01wZTJadmNpaDJZWElnWnowd0xHMDlZeTVtYjI1MGN5NXNaVzVuZEdnN1p6eHRPeXNyWnlsN2RtRnlJR2c5WXk1bWIyNTBjMXRuWFR0a0xtRXVjSFZ6YUNodVpYY2dSeWhvTG01aGJXVXNaMkVvWENKbWIyNTBMWGRsYVdkb2REcGNJaXRvTG5kbGFXZG9kQ3RjSWp0bWIyNTBMWE4wZVd4bE9sd2lLMmd1YzNSNWJHVXBLU2w5WVNoa0xtRXBmU3hCS0hSb2FYTXVZeXdvZEdocGN5NW1MbUZ3YVh4OFhDSm9kSFJ3Y3pvdkwyWXVabTl1ZEdSbFkyc3VZMjl0TDNNdlkzTnpMMnB6TDF3aUtTdGxZU2gwYUdsekxtTXBLMXdpTDF3aUsySXJYQ0l1YW5OY0lpeG1kVzVqZEdsdmJpaGlLWHRpSmlaaEtGdGRLWDBwS1RwaEtGdGRLWDA3ZG1GeUlGazlibVYzSUc5aEtIZHBibVJ2ZHlrN1dTNWhMbU11WTNWemRHOXRQV1oxYm1OMGFXOXVLR0VzWWlsN2NtVjBkWEp1SUc1bGR5QnpZU2hpTEdFcGZUdFpMbUV1WXk1bWIyNTBaR1ZqYXoxbWRXNWpkR2x2YmloaExHSXBlM0psZEhWeWJpQnVaWGNnU0dFb1lpeGhLWDA3V1M1aExtTXViVzl1YjNSNWNHVTlablZ1WTNScGIyNG9ZU3hpS1h0eVpYUjFjbTRnYm1WM0lISmhLR0lzWVNsOU8xa3VZUzVqTG5SNWNHVnJhWFE5Wm5WdVkzUnBiMjRvWVN4aUtYdHlaWFIxY200Z2JtVjNJRWRoS0dJc1lTbDlPMWt1WVM1akxtZHZiMmRzWlQxbWRXNWpkR2x2YmloaExHSXBlM0psZEhWeWJpQnVaWGNnUldFb1lpeGhLWDA3ZG1GeUlGbzllMnh2WVdRNmNDaFpMbXh2WVdRc1dTbDlPMXdpWm5WdVkzUnBiMjVjSWowOVBYUjVjR1Z2WmlCa1pXWnBibVVtSm1SbFptbHVaUzVoYldRL1pHVm1hVzVsS0daMWJtTjBhVzl1S0NsN2NtVjBkWEp1SUZwOUtUcGNJblZ1WkdWbWFXNWxaRndpSVQwOWRIbHdaVzltSUcxdlpIVnNaU1ltYlc5a2RXeGxMbVY0Y0c5eWRITS9iVzlrZFd4bExtVjRjRzl5ZEhNOVdqb29kMmx1Wkc5M0xsZGxZa1p2Ym5ROVdpeDNhVzVrYjNjdVYyVmlSbTl1ZEVOdmJtWnBaeVltV1M1c2IyRmtLSGRwYm1SdmR5NVhaV0pHYjI1MFEyOXVabWxuS1NrN2ZTZ3BLVHRjYmlKZGZRPT0ifQ==
