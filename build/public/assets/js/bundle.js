(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _menu = _interopRequireDefault(require("./default/menu"));

var _movingFormLabels = _interopRequireDefault(require("./default/moving-form-labels"));

var _webfontLoader = _interopRequireDefault(require("./default/webfont-loader"));

var _accordion = _interopRequireDefault(require("./default/accordion"));

var _social = _interopRequireDefault(require("./default/social"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.require = require; // Basic menu JS
// Optional Barba.JS stuff
//import pageTransitions from './default/pageTransitions'

},{"./default/accordion":2,"./default/menu":3,"./default/moving-form-labels":4,"./default/social":5,"./default/webfont-loader":6}],2:[function(require,module,exports){
"use strict";

var _accordion = _interopRequireDefault(require("accordion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Alhadis basic Accordion package: https://github.com/Alhadis/Accordion#readme
if ($('.js-accordion').length > 0) {
  $('.js-accordion').each(function (i, el) {
    console.log('accordion set!');
    new Accordion(el, {
      onToggle: function onToggle(target) {
        target.accordion.folds.forEach(function (fold) {
          if (fold !== target) fold.open = false;
        });
      }
    });
  });
}

},{"accordion":7}],3:[function(require,module,exports){
"use strict";

var $body = $('body'),
    $hamburger = $('.menu__hamburger'),
    $mask = $('.menu__mask'),
    $checkbox = $('.menu__checkbox'),
    $menuLink = $('.menu__link'),
    $menuList = $('.menu__list'),
    activeMenuClass = 'menu-is-active',
    activeClass = 'is-active'; // Find polyfill

var find = require("jspolyfill-array.prototype.find"); // Hamburger click event


$hamburger.click(function () {
  if ($body.hasClass(activeMenuClass)) {
    $body.removeClass(activeMenuClass);
  } else {
    $body.addClass(activeMenuClass);
  }
}); // Link click event

$menuLink.click(function (e) {
  $body.removeClass(activeMenuClass);
  $checkbox.prop('checked', false);
  $menuLink.removeClass(activeClass);
  $(this).addClass(activeClass);
}); // Mask click event

$mask.click(function () {
  if ($body.hasClass(activeMenuClass)) {
    $body.removeClass(activeMenuClass);
    $checkbox.prop('checked', false);
  } else {
    $body.addClass(activeMenuClass);
  }
}); // Sticky header

var $header = $('.header'),
    $window = $(window),
    stickyClass = 'is-sticky',
    top = $header.offset().top + 1;
$window.scroll(function () {
  if ($window.scrollTop() >= top) {
    $header.addClass(stickyClass);
  } else {
    $header.removeClass(stickyClass);
  }
});

},{"jspolyfill-array.prototype.find":8}],4:[function(require,module,exports){
"use strict";

if ($('.js-moving-labels').length > 0) {
  var checkForInput = function checkForInput(element) {
    var $label = $(element).siblings('label');

    if ($(element).val().length > 0) {
      $label.addClass('has-value');
    } else {
      $label.removeClass('has-value');
    }
  }; // The lines below are executed on page load


  var $input = $('.form__input');
  $input.each(function () {
    checkForInput(this);
  }); // The lines below (inside) are executed on change & keyup

  $input.on('change keyup', function () {
    checkForInput(this);
  });
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function social() {
  if ($('.social').length > 0) {
    var $socialWindow = $('.js-social-window');
    $socialWindow.on('click', function () {
      console.log('clicked');
      window.open(this.href, "Social", "width=800, height=600");
      return false;
    });
  }
}

var _default = {
  social: social
};
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

var _webfontloader = _interopRequireDefault(require("webfontloader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_webfontloader.default.load({
  google: {
    families: ['Montserrat:400,500,700']
  }
});

},{"webfontloader":9}],7:[function(require,module,exports){
(function(){
	"use strict";

	var touchEnabled = "ontouchstart" in document.documentElement;
	var pressEvent   = touchEnabled ? "touchend" : "click";
	var each         = [].forEach;


	// Name of the onTransitionEnd event supported by this browser
	var transitionEnd = (function(){
		for(var names = "transitionend webkitTransitionEnd oTransitionEnd otransitionend".split(" "), i = 0; i < 4; ++i)
			if("on"+names[i].toLowerCase() in window) return names[i];
		return names[0];
	}());
	
	
	
	/**
	 * Conditionally add or remove a token from a token-list.
	 *
	 * @param {DOMTokenList} list
	 * @param {String} token
	 * @param {Boolean} enabled
	 */
	function setToken(list, token, enabled){
		enabled ? list.add(token) : list.remove(token);
	}



	/**
	 * Stop a function from firing too quickly.
	 *
	 * Returns a copy of the original function that runs only after the designated
	 * number of milliseconds have elapsed. Useful for throttling onResize handlers.
	 *
	 * @param {Number} limit - Threshold to stall execution by, in milliseconds.
	 * @param {Boolean} soon - If TRUE, will call the function *before* the threshold's elapsed, rather than after.
	 * @return {Function}
	 */
	function debounce(fn, limit, soon){
		var limit = limit < 0 ? 0 : limit,
			started, context, args, timer,

			delayed = function(){

				// Get the time between now and when the function was first fired
				var timeSince = Date.now() - started;

				if(timeSince >= limit){
					if(!soon) fn.apply(context, args);
					if(timer) clearTimeout(timer);
					timer = context = args = null;
				}

				else timer = setTimeout(delayed, limit - timeSince);
			};


		// Debounced copy of the original function
		return function(){
			context = this,
			args    = arguments;

			if(!limit)
				return fn.apply(context, args);

			started = Date.now();
			if(!timer){
				if(soon) fn.apply(context, args);
				timer = setTimeout(delayed, limit);
			}
		};
	};



	var uniqueID = (function(){
		var IDs     = {};
		var indexes = {};
		
		
		/**
		 * Generate a unique ID for a DOM element.
		 *
		 * By default, minimalist IDs like "_1" or "_2" are generated using internally
		 * tracked incrementation. Uglier, more collision-proof IDs can be generated by
		 * passing a truthy value to the function's first argument.
		 *
		 * Irrespective of whether values are being generated simply or randomly, the
		 * document tree is always consulted first to ensure a duplicate ID is never
		 * returned.
		 *
		 * @param {String}  prefix - Prefix prepended to result. Default: "_"
		 * @param {Boolean} random - Generate collision-proof IDs using random symbols
		 * @param {Number}  length - Length of random passwords. Default: 6
		 * @return {String}
		 */
		function uniqueID(prefix, complex, length){
			length     = +(length || 6);
			var result =  (prefix = prefix || "_");
			
			// Simple IDs
			if(!complex){
				
				// Set this prefix's starting index if it's not been used yet
				if(!indexes[prefix])
					indexes[prefix] = 0;
				
				result += ++indexes[prefix];
			}
			
			// Uglier/safer IDs
			else{
				var chars   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
				chars      += chars.toLowerCase();
				result     += chars[ Math.round(Math.random() * (chars.length - 1)) ];
				chars      += "0123456789";
				
				while(result.length < length)
					result += chars[ Math.round(Math.random() * (chars.length - 1))];
			}
			
			return IDs[result] || document.getElementById(result)
				? uniqueID(prefix, complex)
				: (IDs[result] = true, result);
		}
		
		
		return uniqueID;
	}());


	// Name of the CSSOM property used by this browser for CSS transforms
	var cssTransform = (function(n){
		s = document.documentElement.style;
		if((prop = n.toLowerCase()) in s) return prop;
		for(var prop, s, p = "Webkit Moz Ms O Khtml", p = (p.toLowerCase() + p).split(" "), i = 0; i < 10; ++i)
			if((prop = p[i]+n) in s) return prop;
		return "";
	}("Transform"));


	// Whether 3D transforms are supported by this browser
	var css3DSupported = (function(propName){
		var e = document.createElement("div"), s = e.style,
		v = [["translateY(", ")"], ["translate3d(0,", ",0)"]]
		try{ s[propName] = v[1].join("1px"); } catch(e){}
		return v[+!!s[propName]] === v[1];
	}(cssTransform));









	var folds = [];


	/**
	 * Represents a single panel of togglable content inside an Accordion.
	 *
	 * @param {Accordion} accordion
	 * @param {HTMLElement} el
	 * @constructor
	 */
	var Fold = function(accordion, el){
		var THIS            = this;
		var heading         = el.firstElementChild;
		var content         = el.lastElementChild;
		var elClasses       = el.classList;
		var openClass       = accordion.openClass;
		var closeClass      = accordion.closeClass;
		var keysEnabled     = !accordion.noKeys;
		var useBorders      = accordion.useBorders;
		var useTransforms   = !accordion.noTransforms && cssTransform;
		var onToggle        = accordion.onToggle;
		var _disabled       = false;
		var _open, _y, _height, _ariaEnabled;
		var scrollX, scrollY;
		var onTouchStart;
		var onKeyDown;
		var onPress;
		
		
		Object.defineProperties(THIS, {
			fit: {value: fit},
			
			
			// Add or remove relevant ARIA attributes from the fold's elements
			ariaEnabled: {
				get: function(){ return _ariaEnabled; },
				set: function(input){
					if((input = !!input) !== !!_ariaEnabled){
						_ariaEnabled = input;
						
						// Enable ARIA-attribute management
						if(input){
							heading.setAttribute("role", "tab");
							content.setAttribute("role", "tabpanel");
							checkIDs();
							
							// Update the attributes that're controlled by .open's setter
							heading.setAttribute("aria-selected", !!_open);
							heading.setAttribute("aria-expanded", !!_open);
							content.setAttribute("aria-hidden",   !_open);
						}
						
						// Disabling; remove all relevant attributes
						else{
							heading.removeAttribute("role");
							heading.removeAttribute("aria-controls");
							heading.removeAttribute("aria-selected");
							heading.removeAttribute("aria-expanded");
							
							content.removeAttribute("role");
							content.removeAttribute("aria-labelledby");
							content.removeAttribute("aria-hidden");
						}
					}
				}
			},

			
			
			// Whether or not the fold's currently opened
			open: {
				
				get: function(){
					
					// Derive the fold's opened state from the DOM if it's not been determined yet
					if(undefined === _open){
						_open = elClasses.contains(openClass);
						setToken(elClasses, closeClass, !_open);
					}
					
					return _open;
				},
				
				
				set: function(input){
					if((input = !!input) !== _open){
						
						// If an onToggle callback was specified, run it. Avoid doing anything if it returns false.
						if("function" === typeof onToggle && false === onToggle.call(null, THIS, input))
							return;
						
						setToken(elClasses, openClass,   input);
						setToken(elClasses, closeClass, !input);
						_open = input;
						
						// Update ARIA attributes
						if(_ariaEnabled){
							heading.setAttribute("aria-selected",  input);
							heading.setAttribute("aria-expanded",  input);
							content.setAttribute("aria-hidden",   !input);
						}
						
						// If this fold was closed when the screen resized, run a full update in case its contents were juggled around
						if(THIS.needsRefresh){
							delete THIS.needsRefresh;
							accordion.refresh();
						}
						else accordion.update();
						
						// Close other folds if accordion is modal
						if(accordion.modal && _open){
							for(var fold, i = 0, l = accordion.folds.length; i < l; ++i){
								if(THIS !== (fold = accordion.folds[i]))
									fold.open = false;
							}
						}
					}
				}
			},
			
			
			// Whether the fold's been deactivated
			disabled: {
				get: function(){ return _disabled },
				set: function(input){
					if((input = !!input) !== _disabled){
						var style = el.style;
						
						// Deactivated
						if(_disabled = input){
							style.height = null;
							useTransforms
								? (style[cssTransform] = null)
								: (style.top = null);
							
							touchEnabled && heading.removeEventListener("touchstart", onTouchStart);
							heading.removeEventListener(pressEvent, onPress);
							elClasses.remove(openClass, closeClass);
							if(onKeyDown){
								heading.removeEventListener("keydown", onKeyDown);
								heading.removeAttribute("tabindex");
							}
							
							if(_ariaEnabled){
								THIS.ariaEnabled = false;
								_ariaEnabled     = true;
							}
						}
						
						// Reactivated
						else{
							style.height = _height + "px";
							useTransforms
								? style[cssTransform] =
									css3DSupported
										? ("translate3D(0," + _y + "px,0)")
										: ("translateY("    + _y + "px)")
								: (style.top = _y + "px");
							
							touchEnabled && heading.addEventListener("touchstart", onTouchStart);
							heading.addEventListener(pressEvent, onPress);
							
							if(onKeyDown){
								heading.addEventListener("keydown", onKeyDown);
								heading.tabIndex = 0;
							}
						}
					}
				}
			},
			
			
			// Vertical position of the fold within an accordion's container
			y: {
				get: function(){
					if(undefined === _y)
						return (_y = parseInt(el.style.top) || 0);
					return _y;
				},
				
				set: function(input){
					if((input = +input) !== _y){
						_y = input;
						useTransforms
							? el.style[cssTransform] =
								css3DSupported
									? ("translate3D(0," + input + "px,0)")
									: ("translateY("    + input + "px)")
							: (el.style.top = input + "px");
					}
				}
			},
			
			
			// Height of the fold's outermost container
			height: {
				
				get: function(){
					if(undefined === _height){
						_height = THIS.headingHeight + content.scrollHeight;
						el.style.height = _height + "px";
					}
					return _height;
				},
				
				set: function(input){
					if(input && (input = +input) !== _height){
						el.style.height = input + "px"
						_height         = input;
					}
				}
			},
			

			// Current height of the fold's heading
			headingHeight: {
				get: function(){
					return heading.scrollHeight
						+ THIS.heightOffset
						+ (useBorders ? THIS.headingBorder : 0)
				}
			},
			
			// Total height consumed by the heading element's CSS borders, if any
			headingBorder: {
				get: function(){
					return (heading.offsetHeight || 0) - (heading.clientHeight || 0);
				}
			},
			
			
			
			// Total height of the fold's container element
			elHeight: {
				get: function(){
					return el.scrollHeight + (useBorders ? THIS.elBorder : 0);
				}
			},
			
			// Total height consumed by container element's CSS borders, if any
			elBorder: {
				get: function(){
					return (el.offsetHeight || 0) - (el.clientHeight || 0);
				}
			},
			
			
			// Whether the fold's container has been resized incorrectly
			wrongSize: {
				get: function(){
					return THIS.headingHeight + content.scrollHeight !== el.scrollHeight;
				}
			}
		});
		
		
		
		THIS.index        = folds.push(THIS) - 1;
		THIS.accordion    = accordion;
		THIS.el           = el;
		THIS.heading      = heading;
		THIS.content      = content;
		THIS.ariaEnabled  = !accordion.noAria;
		THIS.heightOffset = accordion.heightOffset;
		el.accordionFold  = THIS.index;
		useBorders        = "auto" === useBorders ? (0 !== THIS.elBorder + THIS.headingBorder) : useBorders;
		
		
		
		function checkIDs(){
			var headingSuffix = "-heading";
			var contentSuffix = "-content";
			var elID            = el.id;
			var id;
			
			// Neither of the fold's elements have an ID attribute
			if(!heading.id && !content.id){
				id             = elID || uniqueID("a");
				heading.id     = id + headingSuffix;
				content.id     = id + contentSuffix;
			}
			
			// Either the heading or element lack an ID
			else if(!content.id) content.id   = (elID || heading.id) + contentSuffix;
			else if(!heading.id) heading.id   = (elID || content.id) + headingSuffix;
			
			// Finally, double-check each element's ID is really unique
			var $ = function(s){return document.querySelectorAll("#"+s)};
			while($(content.id).length > 1 || $(heading.id).length > 1){
				id         = uniqueID("a");
				content.id = id + contentSuffix;
				heading.id = id + headingSuffix;
			}
			
			// Update ARIA attributes
			heading.setAttribute("aria-controls",    content.id);
			content.setAttribute("aria-labelledby",  heading.id);
		}
		
		
		
		// Keyboard navigation
		if(keysEnabled){
			heading.tabIndex = 0;
			heading.addEventListener("keydown", onKeyDown = function(e){
				var key = e.keyCode;
				var fold;
				
				switch(key){

					// Spacebar: Toggle
					case 32:
						e.preventDefault(); // Fall-through
					
					
					// Enter: Toggle
					case 13:
						THIS.open = !THIS.open;
						if("A" === e.target.tagName)
							e.preventDefault();
						break;
					
					
					// Escape: Clear focus
					case 27:
						e.target.blur();
						break;
					
					
					// Up arrow: Previous section
					case 38:{
						
						// Is there a previous sibling to navigate up to?
						if(fold = THIS.previousFold){
							var children = fold.childAccordions;
							
							// Is it open, and does it have nested accordions?
							if(fold.open && children){
								var lastAcc;
								var lastFold;
								
								// Locate the deepest/nearest accordion that's currently exposed
								while(children){
									lastAcc  = children[children.length - 1];
									lastFold = lastAcc.folds[lastAcc.folds.length - 1];
									if(!lastFold.open) break;
									children = lastFold.childAccordions;
								}
								
								lastFold.heading.focus();
							}
							
							// Nope
							else fold.heading.focus();
						}
						
						// Is there a higher level we can jump back up to?
						else if(accordion.parent)
							accordion.parentFold.heading.focus();
						
						// There's nothing to move back to, so just let the browser run its usual behaviour
						else return true;
						
						e.preventDefault();
						return false;
					}
					
					
					
					// Down arrow: Next section
					case 40:{
						var children = THIS.childAccordions;
						
						// Is there a nested accordion to jump into?
						if(THIS.open && children)
							children[0].folds[0].heading.focus();
						
						// No, there isn't. Is there another sibling to move down to?
						else if(fold = THIS.nextFold)
							fold.heading.focus();
						
						// Is there a containing accordion we can navigate back up to?
						else if(THIS.accordion.parent){
							var parent = THIS;
							while(parent = parent.accordion.parentFold)
								if(fold = parent.nextFold){
									fold.heading.focus();
									break;
								}
							
							// Nowhere left to go...
							if(!parent) return true;
						}
						
						// Nah. Just scroll the window normally, as per browser default
						else return true;
						
						e.preventDefault();
						return false;
					}
					
					
					// Left arrow
					case 37:{
						
						// Close an opened section
						if(THIS.open) THIS.open = false;
						
						// Switch focus back to parent
						else if(accordion.parent)
							accordion.parentFold.heading.focus();
						
						break;
					}
					
					// Right arrow
					case 39:{
						var children = THIS.childAccordions;
						
						// Open a closed section
						if(!THIS.open) THIS.open = true;
						
						// Switch focus to a nested accordion
						else if(children)
							children[0].folds[0].heading.focus();
						
						break;
					}
				}
			});
		}
		
		
		// Listener to record the viewport's scroll offsets at the beginning of a touch
		touchEnabled && heading.addEventListener("touchstart", onTouchStart = function(e){
			scrollX = window.pageXOffset;
			scrollY = window.pageYOffset;
		}, {passive: true});
		
		
		heading.addEventListener(pressEvent, onPress = function(e){
			
			// Pressed on something inside the header
			if(e.target !== heading && heading.contains(e.target)){
				
				// Cancel fold-toggle if user clicked on an anchor-link
				if("A" === e.target.tagName && e.target.href)
					return true;
			}
			
			if(e.type !== "touchend" || (e.cancelable && window.pageXOffset === scrollX && window.pageYOffset === scrollY)){
				THIS.open = !THIS.open;
				e.preventDefault();
			}
			return false;
		});
		
		
		
		
		/**
		 * Adjust a fold's container to fit its content.
		 */
		function fit(){
			var height = THIS.headingHeight;
			if(THIS.open)   height += content.scrollHeight;
			if(useBorders)  height += THIS.elBorder;
			THIS.height = height;
		}
	}







	var accordions       = [];
	var activeAccordions = 0;
	var lastResizeRate;


	/**
	 * Represents a column of collapsible content regions.
	 *
	 * @param {HTMLElement} el                    - Container wrapped around each immediate fold
	 * @param {Object}      options               - Optional hash of settings
	 * @param {String}      options.openClass     - CSS class controlling each fold's "open" state
	 * @param {String}      options.closeClass    - CSS class used to mark a fold as closed
	 * @param {String}      options.edgeClass     - CSS class toggled based on whether the bottom-edge is visible
	 * @param {String}      options.snapClass     - CSS class for disabling transitions between window resizes
	 * @param {String}      options.enabledClass  - CSS class marking an accordion as enabled
	 * @param {String}      options.disabledClass - CSS class marking an accordion as disabled
	 * @param {Boolean}     options.disabled      - Whether to disable the accordion on creation
	 * @param {Boolean}     options.modal         - Whether to close the current fold when opening another
	 * @param {Boolean}     options.noAria        - Disable the addition and management of ARIA attributes
	 * @param {Boolean}     options.noKeys        - Disable keyboard navigation
	 * @param {Boolean}     options.noTransforms  - Disable CSS transforms; positioning will be used instead
	 * @param {Number}      options.heightOffset  - Distance to offset each fold by
	 * @param {Boolean}     options.useBorders    - Consider borders when calculating fold heights
	 * @param {Function}    options.onToggle      - Callback executed when opening or closing a fold
	 * @constructor
	 */
	var Accordion = function(el, options){
		var THIS          = this;
		var elClasses     = el.classList;
		var options       = options || {};
		var edgeClass     = (undefined === options.edgeClass    ? "edge-visible" : options.edgeClass);
		var snapClass     = (undefined === options.snapClass    ? "snap"         : options.snapClass);
		var enabledClass  = (undefined === options.enabledClass ? "accordion"    : options.enabledClass);
		var disabledClass = options.disabledClass;
		var _height, _disabled, _parent, _parentFold, _modal;


		Object.defineProperties(THIS, {
			update:     {value: update},
			updateFold: {value: updateFold},
			refresh:    {value: refresh},
			
			// Whether the accordion's been deactivated
			disabled: {
				get: function(){ return _disabled; },
				set: function(input){
					if((input = !!input) !== _disabled){
						var style   = el.style;
						var folds   = THIS.folds;
						
						enabledClass  && setToken(elClasses, enabledClass,  !input);
						disabledClass && setToken(elClasses, disabledClass,  input);
						
						
						// Deactivating
						if(_disabled = input){
							style.height = null;
							snapClass && elClasses.remove(snapClass);
							if(edgeClass){
								el.removeEventListener(transitionEnd, THIS.onTransitionEnd);
								elClasses.remove(edgeClass);
							}
							
							for(var i = 0, l = folds.length; i < l; ++i)
								folds[i].disabled = true;
							
							THIS.noAria || el.removeAttribute("role");
							--activeAccordions;
						}
						
						
						// Reactivating
						else{
							for(var i = 0, l = folds.length; i < l; ++i)
								folds[i].disabled = false;
							
							THIS.noAria || el.setAttribute("role", "tablist");
							++activeAccordions;
							update();
						}
						

						
						// If there're no more active accordions, disable the onResize handler
						if(activeAccordions <= 0){
							activeAccordions = 0;
							Accordion.setResizeRate(false);
						}
						
						// Otherwise, reactivate the onResize handler, assuming it was previously active
						else if(lastResizeRate)
							Accordion.setResizeRate(lastResizeRate);
					}
				}
			},
			
			// Get or set the accordion enclosing this one
			parent: {
				set: function(input){ _parent = input; },
				get: function(){
					var result = _parent;
					if(!result) return null;
					
					// Search for the first ancestor that *isn't* disabled
					while(result){
						if(!result.disabled) return result;
						result = result.parent;
					}
					return null;
				}
			},
			
			// Get or set the fold of the accordion enclosing this one
			parentFold: {
				set: function(input){ _parentFold = input; },
				get: function(){
					var fold = _parentFold;
					if(!fold) return null;
					
					var accordion = fold.accordion;
					
					// Search for the first ancestor that *isn't* disabled
					while(fold && accordion){
						if(!accordion.disabled) return fold;
						if(accordion = accordion.parent)
							fold = accordion.parentFold;
					}
					return null;
				}
			},
			
			// Height of the accordion's container element
			height: {
				get: function(){ return _height; },
				set: function(input){
					if(input && (input = +input) !== _height){
						el.style.height = input + "px";
						_height         = input;
					}
				}
			},
			
			// Whether one of the Accordion's folds has been resized incorrectly
			wrongSize: {
				get: function(){
					var a = this.folds;
					var l = a.length;
					var i = 0;
					for(; i < l; ++i) if(a[i].wrongSize) return true;
					if(a = this.childAccordions)
					for(; i < l; ++i) if(a[i].wrongSize) return true;
					return false;
				}
			},
			
			// Top-level ancestor this accordion's nested inside
			root: {
				get: function(){
					var result = this;
					while(result){
						if(!result.parent) return result;
						result = result.parent;
					}
				}
			}
		});

		
		// Assign options as properties
		THIS.openClass    = options.openClass  || "open";
		THIS.closeClass   = options.closeClass || "closed";
		THIS.modal        = !!options.modal;
		THIS.noAria       = !!options.noAria;
		THIS.noKeys       = !!options.noKeys;
		THIS.noTransforms = !!options.noTransforms;
		THIS.index        = accordions.push(THIS) - 1;
		THIS.heightOffset = +options.heightOffset || 0;
		THIS.useBorders   = undefined === options.useBorders ? "auto" : options.useBorders;
		THIS.onToggle     = options.onToggle;
		
		
		// Create a fold for each immediate descendant of the Accordion's container
		var folds = [];
		each.call(el.children, function(i){
			var fold = new Fold(THIS, i);
			folds.push(fold);
			
			// Connect the fold to its previous sibling, if it's not the first to be added
			var prev = folds[folds.length - 2];
			if(prev){
				prev.nextFold     = fold;
				fold.previousFold = prev;
			}
		});
		
		
		el.accordion    = THIS.index;
		THIS.noAria || el.setAttribute("role", "tablist");
		THIS.el         = el;
		THIS.folds      = folds;
		
		// Add .enabledClass early - it might affect the heights of each fold
		if(!options.disabled && enabledClass)
			elClasses.add(enabledClass);
		
		update();
		
		
		// Find out if this accordion's nested inside another
		var next = el;
		while((next = next.parentNode) && 1 === next.nodeType){
			var fold = Accordion.getFold(next);
			if(fold){
				var accordion   = fold.accordion;
				THIS.parent     = accordion;
				THIS.parentFold = fold;
				edgeClass && elClasses.remove(edgeClass);
				(accordion.childAccordions = accordion.childAccordions || []).push(THIS);
				(fold.childAccordions      = fold.childAccordions      || []).push(THIS);

				// Adjust the height of the containing fold's element
				if(fold.open){
					var scrollHeight = fold.el.scrollHeight;
					var distance     = (fold.headingHeight + fold.content.scrollHeight) - scrollHeight || (scrollHeight - fold.el.clientHeight);
					accordion.updateFold(fold, distance);
				}
				break;
			}
		}
		
		
		edgeClass && el.addEventListener(transitionEnd, this.onTransitionEnd = function(e){
			if(!THIS.parent && e.target === el && "height" === e.propertyName && el.getBoundingClientRect().bottom > window.innerHeight)
				elClasses.remove(edgeClass);
		});
		
		this.disabled = !!options.disabled;
		
		
		
		/**
		 * Internal method to check if an accordion's bottom-edge is visible to the user (or about to be).
		 *
		 * @param {Number} offset
		 * @private
		 */
		function edgeCheck(offset){
			if(edgeClass){
				var box         = el.getBoundingClientRect();
				var windowEdge  = window.innerHeight;
				
				// If the bottom-edge is visible (or about to be), enable height animation
				if(box.bottom + (offset || 0) < windowEdge)
					elClasses.add(edgeClass)
				
				// If the bottom-edge isn't visible anyway, disable height animation immediately
				else if(box.bottom > windowEdge)
					elClasses.remove(edgeClass);
			}
		}
		
		
		
		/**
		 * Update the vertical ordinate of each sibling for a particular fold.
		 *
		 * @param {Fold} fold
		 * @param {Number} offset - Pixel distance to adjust by
		 */
		function updateFold(fold, offset){
			var next = fold;
			var parentFold = THIS.parentFold;
			
			while(next = next.nextFold)
				next.y  += offset;
			parentFold || edgeCheck(offset);
			fold.height += offset;
			THIS.height += offset;
			
			parentFold && parentFold.open && THIS.parent.updateFold(parentFold, offset);
		}
		
		
		/**
		 * Update the height of each fold to fit its content.
		 */
		function update(){
			var y      = 0;
			var height = 0;
			var i      = 0;
			var l      = folds.length;
			var parentFold = THIS.parentFold;
			var fold, diff;
			
			for(; i < l; ++i){
				fold   = folds[i];
				fold.y = y;
				fold.fit();
				y      += fold.height;
				height += fold.height;
			}
			
			diff = height - _height;
			parentFold
				? (parentFold.open && THIS.parent.updateFold(parentFold, diff))
				: edgeCheck(diff);
			
			THIS.height = height;
		}
		
		
		
		/**
		 * Recalculate the boundaries of an Accordion and its descendants.
		 *
		 * This method should only be called if the width of a container changes,
		 * or a fold's contents have resized unexpectedly (such as when images load).
		 *
		 * @param {Boolean} allowSnap - Snap folds instantly into place without transitioning
		 */
		function refresh(allowSnap){
			var snap = allowSnap ? snapClass : false;
			snap && elClasses.add(snap);
			
			THIS.update();
			THIS.childAccordions && THIS.childAccordions.forEach(function(a){
				a.parentFold.open
					? a.refresh(allowSnap)
					: (a.parentFold.needsRefresh = true);
			});
			
			snap && setTimeout(function(e){elClasses.remove(snap)}, 20);
		}
	}

	// If IE8PP exists, it means the author wants/needs IE8 support. See also: tinyurl.com/fixIE8-9
	if("function" === typeof IE8PP)
		Accordion = IE8PP(Accordion),
		Fold      = IE8PP(Fold);



	/**
	 * Alter the rate at which screen-resize events update accordion widths.
	 *
	 * @param {Number} delay - Rate expressed in milliseconds
	 */
	Accordion.setResizeRate = function(delay){
		var fn = function(e){
			for(var a, i = 0, l = accordions.length; i < l; ++i){
				a = accordions[i];
				a.parent || a.disabled || a.refresh(true);
			}
		};
		
		var THIS = Accordion;
		THIS.onResize && window.removeEventListener("resize", THIS.onResize);
		
		// Make sure we weren't passed an explicit value of FALSE, or a negative value
		if(false !== delay && (delay = +delay || 0) >= 0){
			THIS.onResize = delay ? debounce(fn, delay) : fn;
			window.addEventListener("resize", THIS.onResize);
			if(delay) lastResizeRate = delay;
		}
	}
	
	
	
	/**
	 * Return the closest (most deeply-nested) accordion enclosing an element.
	 *
	 * @param {Node} node
	 * @return {Accordion}
	 */
	Accordion.getAccordion = function(node){
		while(node){
			if("accordion" in node)
				return accordions[node.accordion];
			
			node = node.parentNode;
			if(!node || node.nodeType !== 1) return null;
		}
	}
	
	
	/**
	 * Return the closest (most deeply-nested) fold enclosing an element.
	 *
	 * @param {Node} node
	 * @return {Fold}
	 */
	Accordion.getFold = function(node){
		while(node){
			if("accordionFold" in node)
				return folds[node.accordionFold];
			
			node = node.parentNode;
			if(!node || node.nodeType !== 1) return null;
		}
	}
	

	
	Accordion.setResizeRate(25);
	
	
	// Browser export
	window.Accordion = Accordion;
	
	// CommonJS/Node.js
	if("object" === typeof module && "object" === typeof module.exports)
		module.exports.Accordion = Accordion;
	
	// AMD/UMD-like systems
	return Accordion;
}());

},{}],8:[function(require,module,exports){
'use strict';

Array.prototype.find = Array.prototype.find || function(callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  var list = Object(this);
  // Makes sures is always has an positive integer as length.
  var length = list.length >>> 0;
  var thisArg = arguments[1];
  for (var i = 0; i < length; i++) {
    var element = list[i];
    if ( callback.call(thisArg, element, i, list) ) {
      return element;
    }
  }
};

},{}],9:[function(require,module,exports){
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfYXNzZXRzL2pzL2FwcC5qcyIsIl9hc3NldHMvanMvZGVmYXVsdC9hY2NvcmRpb24uanMiLCJfYXNzZXRzL2pzL2RlZmF1bHQvbWVudS5qcyIsIl9hc3NldHMvanMvZGVmYXVsdC9tb3ZpbmctZm9ybS1sYWJlbHMuanMiLCJfYXNzZXRzL2pzL2RlZmF1bHQvc29jaWFsLmpzIiwiX2Fzc2V0cy9qcy9kZWZhdWx0L3dlYmZvbnQtbG9hZGVyLmpzIiwibm9kZV9tb2R1bGVzL2FjY29yZGlvbi9zcmMvYWNjb3JkaW9uLmpzIiwibm9kZV9tb2R1bGVzL2pzcG9seWZpbGwtYXJyYXkucHJvdG90eXBlLmZpbmQvZmluZC5qcyIsIm5vZGVfbW9kdWxlcy93ZWJmb250bG9hZGVyL3dlYmZvbnRsb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0dBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOzs7O0FBZkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBakIsQyxDQUVBO0FBZ0JBO0FBQ0E7Ozs7O0FDbkJBOzs7O0FBRUE7QUFFQSxJQUFJLENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUIsTUFBbkIsR0FBNEIsQ0FBaEMsRUFBbUM7QUFFL0IsRUFBQSxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CLElBQW5CLENBQXdCLFVBQVMsQ0FBVCxFQUFZLEVBQVosRUFBZ0I7QUFDcEMsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGdCQUFaO0FBQ0EsUUFBSSxTQUFKLENBQWMsRUFBZCxFQUFrQjtBQUNkLE1BQUEsUUFBUSxFQUFFLGtCQUFTLE1BQVQsRUFBZ0I7QUFDdEIsUUFBQSxNQUFNLENBQUMsU0FBUCxDQUFpQixLQUFqQixDQUF1QixPQUF2QixDQUErQixVQUFBLElBQUksRUFBSTtBQUNuQyxjQUFHLElBQUksS0FBSyxNQUFaLEVBQ0EsSUFBSSxDQUFDLElBQUwsR0FBWSxLQUFaO0FBQ0gsU0FIRDtBQUlIO0FBTmEsS0FBbEI7QUFRSCxHQVZEO0FBV0g7Ozs7O0FDakJELElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFELENBQWY7QUFBQSxJQUNJLFVBQVUsR0FBRyxDQUFDLENBQUMsa0JBQUQsQ0FEbEI7QUFBQSxJQUVJLEtBQUssR0FBRyxDQUFDLENBQUMsYUFBRCxDQUZiO0FBQUEsSUFHSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLGlCQUFELENBSGpCO0FBQUEsSUFJSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLGFBQUQsQ0FKakI7QUFBQSxJQUtJLFNBQVMsR0FBRyxDQUFDLENBQUMsYUFBRCxDQUxqQjtBQUFBLElBTUksZUFBZSxHQUFHLGdCQU50QjtBQUFBLElBT0ksV0FBVyxHQUFHLFdBUGxCLEMsQ0FTQTs7QUFDQSxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsaUNBQUQsQ0FBcEIsQyxDQUVBOzs7QUFDQSxVQUFVLENBQUMsS0FBWCxDQUFpQixZQUFXO0FBQ3hCLE1BQUksS0FBSyxDQUFDLFFBQU4sQ0FBZSxlQUFmLENBQUosRUFBcUM7QUFDakMsSUFBQSxLQUFLLENBQUMsV0FBTixDQUFrQixlQUFsQjtBQUNILEdBRkQsTUFFTztBQUNILElBQUEsS0FBSyxDQUFDLFFBQU4sQ0FBZSxlQUFmO0FBQ0g7QUFDSixDQU5ELEUsQ0FRQTs7QUFDQSxTQUFTLENBQUMsS0FBVixDQUFnQixVQUFTLENBQVQsRUFBWTtBQUN4QixFQUFBLEtBQUssQ0FBQyxXQUFOLENBQWtCLGVBQWxCO0FBQ0EsRUFBQSxTQUFTLENBQUMsSUFBVixDQUFlLFNBQWYsRUFBMEIsS0FBMUI7QUFDQSxFQUFBLFNBQVMsQ0FBQyxXQUFWLENBQXNCLFdBQXRCO0FBQ0EsRUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsUUFBUixDQUFpQixXQUFqQjtBQUNILENBTEQsRSxDQU9BOztBQUNBLEtBQUssQ0FBQyxLQUFOLENBQVksWUFBVztBQUNuQixNQUFJLEtBQUssQ0FBQyxRQUFOLENBQWUsZUFBZixDQUFKLEVBQXFDO0FBQ2pDLElBQUEsS0FBSyxDQUFDLFdBQU4sQ0FBa0IsZUFBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxJQUFWLENBQWUsU0FBZixFQUEwQixLQUExQjtBQUNILEdBSEQsTUFHTztBQUNILElBQUEsS0FBSyxDQUFDLFFBQU4sQ0FBZSxlQUFmO0FBQ0g7QUFDSixDQVBELEUsQ0FVQTs7QUFDQSxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsU0FBRCxDQUFqQjtBQUFBLElBQ0ksT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFELENBRGY7QUFBQSxJQUVJLFdBQVcsR0FBRyxXQUZsQjtBQUFBLElBR0ksR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLEdBQWpCLEdBQXVCLENBSGpDO0FBS0EsT0FBTyxDQUFDLE1BQVIsQ0FBZSxZQUFXO0FBQ3RCLE1BQUksT0FBTyxDQUFDLFNBQVIsTUFBdUIsR0FBM0IsRUFBZ0M7QUFDNUIsSUFBQSxPQUFPLENBQUMsUUFBUixDQUFpQixXQUFqQjtBQUNILEdBRkQsTUFFTztBQUNILElBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsV0FBcEI7QUFDSDtBQUNKLENBTkQ7Ozs7O0FDOUNBLElBQUksQ0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUIsTUFBdkIsR0FBZ0MsQ0FBcEMsRUFBdUM7QUFBQSxNQUcxQixhQUgwQixHQUduQyxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0M7QUFDNUIsUUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXLFFBQVgsQ0FBb0IsT0FBcEIsQ0FBZjs7QUFFQSxRQUFJLENBQUMsQ0FBQyxPQUFELENBQUQsQ0FBVyxHQUFYLEdBQWlCLE1BQWpCLEdBQTBCLENBQTlCLEVBQWlDO0FBQzdCLE1BQUEsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsV0FBaEI7QUFDSCxLQUZELE1BRU87QUFDSCxNQUFBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLFdBQW5CO0FBQ0g7QUFDSixHQVhrQyxFQWFuQzs7O0FBWkEsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLGNBQUQsQ0FBaEI7QUFhQSxFQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVksWUFBVztBQUNuQixJQUFBLGFBQWEsQ0FBQyxJQUFELENBQWI7QUFDSCxHQUZELEVBZG1DLENBa0JuQzs7QUFDQSxFQUFBLE1BQU0sQ0FBQyxFQUFQLENBQVUsY0FBVixFQUEwQixZQUFXO0FBQ2pDLElBQUEsYUFBYSxDQUFDLElBQUQsQ0FBYjtBQUNILEdBRkQ7QUFHSDs7Ozs7Ozs7OztBQ3RCRCxTQUFTLE1BQVQsR0FBa0I7QUFDZCxNQUFJLENBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYSxNQUFiLEdBQXNCLENBQTFCLEVBQTZCO0FBQ3pCLFFBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxtQkFBRCxDQUF2QjtBQUVBLElBQUEsYUFBYSxDQUFDLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsWUFBVztBQUNqQyxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksU0FBWjtBQUNBLE1BQUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxLQUFLLElBQWpCLEVBQXVCLFFBQXZCLEVBQWlDLHVCQUFqQztBQUNBLGFBQU8sS0FBUDtBQUNILEtBSkQ7QUFLSDtBQUNKOztlQUVjO0FBQUUsRUFBQSxNQUFNLEVBQU47QUFBRixDOzs7Ozs7QUNaZjs7OztBQUVBLHVCQUFRLElBQVIsQ0FBYTtBQUNULEVBQUEsTUFBTSxFQUFFO0FBQ0osSUFBQSxRQUFRLEVBQUUsQ0FBQyx3QkFBRDtBQUROO0FBREMsQ0FBYjs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ3aW5kb3cucmVxdWlyZSA9IHJlcXVpcmVcblxuLy8gQmFzaWMgbWVudSBKU1xuaW1wb3J0IG1lbnUgZnJvbSAnLi9kZWZhdWx0L21lbnUnXG5cbi8vIENoYW5nZSBmb3JtIGlucHV0cyBvbiBwb3B1bGF0aW5nIGZpZWxkXG5pbXBvcnQgZm9ybUxhYmVscyBmcm9tICcuL2RlZmF1bHQvbW92aW5nLWZvcm0tbGFiZWxzJ1xuXG4vLyBMb2FkIHdlYmZvbnRzXG5pbXBvcnQgd2ViZm9udExvYWRlciBmcm9tICcuL2RlZmF1bHQvd2ViZm9udC1sb2FkZXInXG5cbi8vIEFjY29yZGlvblxuaW1wb3J0IGFjY29yZGlvbiBmcm9tICcuL2RlZmF1bHQvYWNjb3JkaW9uJ1xuXG4vLyBPcGVuIHNoYXJlIGxpbmtzIGluIG1pbmkgd2luZG93c1xuaW1wb3J0IHNvY2lhbCBmcm9tICcuL2RlZmF1bHQvc29jaWFsJ1xuXG5cbi8vIE9wdGlvbmFsIEJhcmJhLkpTIHN0dWZmXG4vL2ltcG9ydCBwYWdlVHJhbnNpdGlvbnMgZnJvbSAnLi9kZWZhdWx0L3BhZ2VUcmFuc2l0aW9ucyciLCJpbXBvcnQgXyBmcm9tICdhY2NvcmRpb24nXG5cbi8vIEFsaGFkaXMgYmFzaWMgQWNjb3JkaW9uIHBhY2thZ2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9BbGhhZGlzL0FjY29yZGlvbiNyZWFkbWVcblxuaWYgKCQoJy5qcy1hY2NvcmRpb24nKS5sZW5ndGggPiAwKSB7XG5cbiAgICAkKCcuanMtYWNjb3JkaW9uJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xuICAgICAgICBjb25zb2xlLmxvZygnYWNjb3JkaW9uIHNldCEnKVxuICAgICAgICBuZXcgQWNjb3JkaW9uKGVsLCB7XG4gICAgICAgICAgICBvblRvZ2dsZTogZnVuY3Rpb24odGFyZ2V0KXtcbiAgICAgICAgICAgICAgICB0YXJnZXQuYWNjb3JkaW9uLmZvbGRzLmZvckVhY2goZm9sZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGZvbGQgIT09IHRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgZm9sZC5vcGVuID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59IiwiY29uc3QgJGJvZHkgPSAkKCdib2R5JyksXG4gICAgJGhhbWJ1cmdlciA9ICQoJy5tZW51X19oYW1idXJnZXInKSxcbiAgICAkbWFzayA9ICQoJy5tZW51X19tYXNrJyksXG4gICAgJGNoZWNrYm94ID0gJCgnLm1lbnVfX2NoZWNrYm94JyksXG4gICAgJG1lbnVMaW5rID0gJCgnLm1lbnVfX2xpbmsnKSxcbiAgICAkbWVudUxpc3QgPSAkKCcubWVudV9fbGlzdCcpLFxuICAgIGFjdGl2ZU1lbnVDbGFzcyA9ICdtZW51LWlzLWFjdGl2ZScsXG4gICAgYWN0aXZlQ2xhc3MgPSAnaXMtYWN0aXZlJ1xuXG4vLyBGaW5kIHBvbHlmaWxsXG5jb25zdCBmaW5kID0gcmVxdWlyZShcImpzcG9seWZpbGwtYXJyYXkucHJvdG90eXBlLmZpbmRcIilcblxuLy8gSGFtYnVyZ2VyIGNsaWNrIGV2ZW50XG4kaGFtYnVyZ2VyLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkYm9keS5oYXNDbGFzcyhhY3RpdmVNZW51Q2xhc3MpKSB7XG4gICAgICAgICRib2R5LnJlbW92ZUNsYXNzKGFjdGl2ZU1lbnVDbGFzcylcbiAgICB9IGVsc2Uge1xuICAgICAgICAkYm9keS5hZGRDbGFzcyhhY3RpdmVNZW51Q2xhc3MpXG4gICAgfVxufSlcblxuLy8gTGluayBjbGljayBldmVudFxuJG1lbnVMaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAkYm9keS5yZW1vdmVDbGFzcyhhY3RpdmVNZW51Q2xhc3MpXG4gICAgJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSlcbiAgICAkbWVudUxpbmsucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhhY3RpdmVDbGFzcylcbn0pXG5cbi8vIE1hc2sgY2xpY2sgZXZlbnRcbiRtYXNrLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkYm9keS5oYXNDbGFzcyhhY3RpdmVNZW51Q2xhc3MpKSB7XG4gICAgICAgICRib2R5LnJlbW92ZUNsYXNzKGFjdGl2ZU1lbnVDbGFzcylcbiAgICAgICAgJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSlcbiAgICB9IGVsc2Uge1xuICAgICAgICAkYm9keS5hZGRDbGFzcyhhY3RpdmVNZW51Q2xhc3MpXG4gICAgfVxufSlcblxuXG4vLyBTdGlja3kgaGVhZGVyXG5jb25zdCAkaGVhZGVyID0gJCgnLmhlYWRlcicpLFxuICAgICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgc3RpY2t5Q2xhc3MgPSAnaXMtc3RpY2t5JyxcbiAgICB0b3AgPSAkaGVhZGVyLm9mZnNldCgpLnRvcCArIDFcblxuJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCR3aW5kb3cuc2Nyb2xsVG9wKCkgPj0gdG9wKSB7XG4gICAgICAgICRoZWFkZXIuYWRkQ2xhc3Moc3RpY2t5Q2xhc3MpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhzdGlja3lDbGFzcylcbiAgICB9XG59KSIsImlmICgkKCcuanMtbW92aW5nLWxhYmVscycpLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCAkaW5wdXQgPSAkKCcuZm9ybV9faW5wdXQnKVxuXG4gICAgZnVuY3Rpb24gY2hlY2tGb3JJbnB1dChlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0ICRsYWJlbCA9ICQoZWxlbWVudCkuc2libGluZ3MoJ2xhYmVsJylcblxuICAgICAgICBpZiAoJChlbGVtZW50KS52YWwoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkbGFiZWwuYWRkQ2xhc3MoJ2hhcy12YWx1ZScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkbGFiZWwucmVtb3ZlQ2xhc3MoJ2hhcy12YWx1ZScpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gVGhlIGxpbmVzIGJlbG93IGFyZSBleGVjdXRlZCBvbiBwYWdlIGxvYWRcbiAgICAkaW5wdXQuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgY2hlY2tGb3JJbnB1dCh0aGlzKVxuICAgIH0pXG5cbiAgICAvLyBUaGUgbGluZXMgYmVsb3cgKGluc2lkZSkgYXJlIGV4ZWN1dGVkIG9uIGNoYW5nZSAmIGtleXVwXG4gICAgJGlucHV0Lm9uKCdjaGFuZ2Uga2V5dXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2hlY2tGb3JJbnB1dCh0aGlzKVxuICAgIH0pXG59IiwiZnVuY3Rpb24gc29jaWFsKCkge1xuICAgIGlmICgkKCcuc29jaWFsJykubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCAkc29jaWFsV2luZG93ID0gJCgnLmpzLXNvY2lhbC13aW5kb3cnKVxuXG4gICAgICAgICRzb2NpYWxXaW5kb3cub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcpXG4gICAgICAgICAgICB3aW5kb3cub3Blbih0aGlzLmhyZWYsIFwiU29jaWFsXCIsIFwid2lkdGg9ODAwLCBoZWlnaHQ9NjAwXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7IHNvY2lhbCB9IiwiaW1wb3J0IFdlYkZvbnQgZnJvbSAnd2ViZm9udGxvYWRlcidcblxuV2ViRm9udC5sb2FkKHtcbiAgICBnb29nbGU6IHtcbiAgICAgICAgZmFtaWxpZXM6IFsnTW9udHNlcnJhdDo0MDAsNTAwLDcwMCddXG4gICAgfVxufSlcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgdG91Y2hFbmFibGVkID0gXCJvbnRvdWNoc3RhcnRcIiBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdHZhciBwcmVzc0V2ZW50ICAgPSB0b3VjaEVuYWJsZWQgPyBcInRvdWNoZW5kXCIgOiBcImNsaWNrXCI7XG5cdHZhciBlYWNoICAgICAgICAgPSBbXS5mb3JFYWNoO1xuXG5cblx0Ly8gTmFtZSBvZiB0aGUgb25UcmFuc2l0aW9uRW5kIGV2ZW50IHN1cHBvcnRlZCBieSB0aGlzIGJyb3dzZXJcblx0dmFyIHRyYW5zaXRpb25FbmQgPSAoZnVuY3Rpb24oKXtcblx0XHRmb3IodmFyIG5hbWVzID0gXCJ0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmRcIi5zcGxpdChcIiBcIiksIGkgPSAwOyBpIDwgNDsgKytpKVxuXHRcdFx0aWYoXCJvblwiK25hbWVzW2ldLnRvTG93ZXJDYXNlKCkgaW4gd2luZG93KSByZXR1cm4gbmFtZXNbaV07XG5cdFx0cmV0dXJuIG5hbWVzWzBdO1xuXHR9KCkpO1xuXHRcblx0XG5cdFxuXHQvKipcblx0ICogQ29uZGl0aW9uYWxseSBhZGQgb3IgcmVtb3ZlIGEgdG9rZW4gZnJvbSBhIHRva2VuLWxpc3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RE9NVG9rZW5MaXN0fSBsaXN0XG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlblxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGVuYWJsZWRcblx0ICovXG5cdGZ1bmN0aW9uIHNldFRva2VuKGxpc3QsIHRva2VuLCBlbmFibGVkKXtcblx0XHRlbmFibGVkID8gbGlzdC5hZGQodG9rZW4pIDogbGlzdC5yZW1vdmUodG9rZW4pO1xuXHR9XG5cblxuXG5cdC8qKlxuXHQgKiBTdG9wIGEgZnVuY3Rpb24gZnJvbSBmaXJpbmcgdG9vIHF1aWNrbHkuXG5cdCAqXG5cdCAqIFJldHVybnMgYSBjb3B5IG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB0aGF0IHJ1bnMgb25seSBhZnRlciB0aGUgZGVzaWduYXRlZFxuXHQgKiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZC4gVXNlZnVsIGZvciB0aHJvdHRsaW5nIG9uUmVzaXplIGhhbmRsZXJzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge051bWJlcn0gbGltaXQgLSBUaHJlc2hvbGQgdG8gc3RhbGwgZXhlY3V0aW9uIGJ5LCBpbiBtaWxsaXNlY29uZHMuXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc29vbiAtIElmIFRSVUUsIHdpbGwgY2FsbCB0aGUgZnVuY3Rpb24gKmJlZm9yZSogdGhlIHRocmVzaG9sZCdzIGVsYXBzZWQsIHJhdGhlciB0aGFuIGFmdGVyLlxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0ICovXG5cdGZ1bmN0aW9uIGRlYm91bmNlKGZuLCBsaW1pdCwgc29vbil7XG5cdFx0dmFyIGxpbWl0ID0gbGltaXQgPCAwID8gMCA6IGxpbWl0LFxuXHRcdFx0c3RhcnRlZCwgY29udGV4dCwgYXJncywgdGltZXIsXG5cblx0XHRcdGRlbGF5ZWQgPSBmdW5jdGlvbigpe1xuXG5cdFx0XHRcdC8vIEdldCB0aGUgdGltZSBiZXR3ZWVuIG5vdyBhbmQgd2hlbiB0aGUgZnVuY3Rpb24gd2FzIGZpcnN0IGZpcmVkXG5cdFx0XHRcdHZhciB0aW1lU2luY2UgPSBEYXRlLm5vdygpIC0gc3RhcnRlZDtcblxuXHRcdFx0XHRpZih0aW1lU2luY2UgPj0gbGltaXQpe1xuXHRcdFx0XHRcdGlmKCFzb29uKSBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0XHRpZih0aW1lcikgY2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHRcdFx0XHR0aW1lciA9IGNvbnRleHQgPSBhcmdzID0gbnVsbDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsc2UgdGltZXIgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIGxpbWl0IC0gdGltZVNpbmNlKTtcblx0XHRcdH07XG5cblxuXHRcdC8vIERlYm91bmNlZCBjb3B5IG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvblxuXHRcdHJldHVybiBmdW5jdGlvbigpe1xuXHRcdFx0Y29udGV4dCA9IHRoaXMsXG5cdFx0XHRhcmdzICAgID0gYXJndW1lbnRzO1xuXG5cdFx0XHRpZighbGltaXQpXG5cdFx0XHRcdHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcblxuXHRcdFx0c3RhcnRlZCA9IERhdGUubm93KCk7XG5cdFx0XHRpZighdGltZXIpe1xuXHRcdFx0XHRpZihzb29uKSBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0dGltZXIgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIGxpbWl0KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cblxuXHR2YXIgdW5pcXVlSUQgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgSURzICAgICA9IHt9O1xuXHRcdHZhciBpbmRleGVzID0ge307XG5cdFx0XG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogR2VuZXJhdGUgYSB1bmlxdWUgSUQgZm9yIGEgRE9NIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBCeSBkZWZhdWx0LCBtaW5pbWFsaXN0IElEcyBsaWtlIFwiXzFcIiBvciBcIl8yXCIgYXJlIGdlbmVyYXRlZCB1c2luZyBpbnRlcm5hbGx5XG5cdFx0ICogdHJhY2tlZCBpbmNyZW1lbnRhdGlvbi4gVWdsaWVyLCBtb3JlIGNvbGxpc2lvbi1wcm9vZiBJRHMgY2FuIGJlIGdlbmVyYXRlZCBieVxuXHRcdCAqIHBhc3NpbmcgYSB0cnV0aHkgdmFsdWUgdG8gdGhlIGZ1bmN0aW9uJ3MgZmlyc3QgYXJndW1lbnQuXG5cdFx0ICpcblx0XHQgKiBJcnJlc3BlY3RpdmUgb2Ygd2hldGhlciB2YWx1ZXMgYXJlIGJlaW5nIGdlbmVyYXRlZCBzaW1wbHkgb3IgcmFuZG9tbHksIHRoZVxuXHRcdCAqIGRvY3VtZW50IHRyZWUgaXMgYWx3YXlzIGNvbnN1bHRlZCBmaXJzdCB0byBlbnN1cmUgYSBkdXBsaWNhdGUgSUQgaXMgbmV2ZXJcblx0XHQgKiByZXR1cm5lZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSAgcHJlZml4IC0gUHJlZml4IHByZXBlbmRlZCB0byByZXN1bHQuIERlZmF1bHQ6IFwiX1wiXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSByYW5kb20gLSBHZW5lcmF0ZSBjb2xsaXNpb24tcHJvb2YgSURzIHVzaW5nIHJhbmRvbSBzeW1ib2xzXG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9ICBsZW5ndGggLSBMZW5ndGggb2YgcmFuZG9tIHBhc3N3b3Jkcy4gRGVmYXVsdDogNlxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cblx0XHQgKi9cblx0XHRmdW5jdGlvbiB1bmlxdWVJRChwcmVmaXgsIGNvbXBsZXgsIGxlbmd0aCl7XG5cdFx0XHRsZW5ndGggICAgID0gKyhsZW5ndGggfHwgNik7XG5cdFx0XHR2YXIgcmVzdWx0ID0gIChwcmVmaXggPSBwcmVmaXggfHwgXCJfXCIpO1xuXHRcdFx0XG5cdFx0XHQvLyBTaW1wbGUgSURzXG5cdFx0XHRpZighY29tcGxleCl7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBTZXQgdGhpcyBwcmVmaXgncyBzdGFydGluZyBpbmRleCBpZiBpdCdzIG5vdCBiZWVuIHVzZWQgeWV0XG5cdFx0XHRcdGlmKCFpbmRleGVzW3ByZWZpeF0pXG5cdFx0XHRcdFx0aW5kZXhlc1twcmVmaXhdID0gMDtcblx0XHRcdFx0XG5cdFx0XHRcdHJlc3VsdCArPSArK2luZGV4ZXNbcHJlZml4XTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gVWdsaWVyL3NhZmVyIElEc1xuXHRcdFx0ZWxzZXtcblx0XHRcdFx0dmFyIGNoYXJzICAgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XG5cdFx0XHRcdGNoYXJzICAgICAgKz0gY2hhcnMudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0cmVzdWx0ICAgICArPSBjaGFyc1sgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKGNoYXJzLmxlbmd0aCAtIDEpKSBdO1xuXHRcdFx0XHRjaGFycyAgICAgICs9IFwiMDEyMzQ1Njc4OVwiO1xuXHRcdFx0XHRcblx0XHRcdFx0d2hpbGUocmVzdWx0Lmxlbmd0aCA8IGxlbmd0aClcblx0XHRcdFx0XHRyZXN1bHQgKz0gY2hhcnNbIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChjaGFycy5sZW5ndGggLSAxKSldO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gSURzW3Jlc3VsdF0gfHwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocmVzdWx0KVxuXHRcdFx0XHQ/IHVuaXF1ZUlEKHByZWZpeCwgY29tcGxleClcblx0XHRcdFx0OiAoSURzW3Jlc3VsdF0gPSB0cnVlLCByZXN1bHQpO1xuXHRcdH1cblx0XHRcblx0XHRcblx0XHRyZXR1cm4gdW5pcXVlSUQ7XG5cdH0oKSk7XG5cblxuXHQvLyBOYW1lIG9mIHRoZSBDU1NPTSBwcm9wZXJ0eSB1c2VkIGJ5IHRoaXMgYnJvd3NlciBmb3IgQ1NTIHRyYW5zZm9ybXNcblx0dmFyIGNzc1RyYW5zZm9ybSA9IChmdW5jdGlvbihuKXtcblx0XHRzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXHRcdGlmKChwcm9wID0gbi50b0xvd2VyQ2FzZSgpKSBpbiBzKSByZXR1cm4gcHJvcDtcblx0XHRmb3IodmFyIHByb3AsIHMsIHAgPSBcIldlYmtpdCBNb3ogTXMgTyBLaHRtbFwiLCBwID0gKHAudG9Mb3dlckNhc2UoKSArIHApLnNwbGl0KFwiIFwiKSwgaSA9IDA7IGkgPCAxMDsgKytpKVxuXHRcdFx0aWYoKHByb3AgPSBwW2ldK24pIGluIHMpIHJldHVybiBwcm9wO1xuXHRcdHJldHVybiBcIlwiO1xuXHR9KFwiVHJhbnNmb3JtXCIpKTtcblxuXG5cdC8vIFdoZXRoZXIgM0QgdHJhbnNmb3JtcyBhcmUgc3VwcG9ydGVkIGJ5IHRoaXMgYnJvd3NlclxuXHR2YXIgY3NzM0RTdXBwb3J0ZWQgPSAoZnVuY3Rpb24ocHJvcE5hbWUpe1xuXHRcdHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgcyA9IGUuc3R5bGUsXG5cdFx0diA9IFtbXCJ0cmFuc2xhdGVZKFwiLCBcIilcIl0sIFtcInRyYW5zbGF0ZTNkKDAsXCIsIFwiLDApXCJdXVxuXHRcdHRyeXsgc1twcm9wTmFtZV0gPSB2WzFdLmpvaW4oXCIxcHhcIik7IH0gY2F0Y2goZSl7fVxuXHRcdHJldHVybiB2WyshIXNbcHJvcE5hbWVdXSA9PT0gdlsxXTtcblx0fShjc3NUcmFuc2Zvcm0pKTtcblxuXG5cblxuXG5cblxuXG5cblx0dmFyIGZvbGRzID0gW107XG5cblxuXHQvKipcblx0ICogUmVwcmVzZW50cyBhIHNpbmdsZSBwYW5lbCBvZiB0b2dnbGFibGUgY29udGVudCBpbnNpZGUgYW4gQWNjb3JkaW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0FjY29yZGlvbn0gYWNjb3JkaW9uXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblx0dmFyIEZvbGQgPSBmdW5jdGlvbihhY2NvcmRpb24sIGVsKXtcblx0XHR2YXIgVEhJUyAgICAgICAgICAgID0gdGhpcztcblx0XHR2YXIgaGVhZGluZyAgICAgICAgID0gZWwuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cdFx0dmFyIGNvbnRlbnQgICAgICAgICA9IGVsLmxhc3RFbGVtZW50Q2hpbGQ7XG5cdFx0dmFyIGVsQ2xhc3NlcyAgICAgICA9IGVsLmNsYXNzTGlzdDtcblx0XHR2YXIgb3BlbkNsYXNzICAgICAgID0gYWNjb3JkaW9uLm9wZW5DbGFzcztcblx0XHR2YXIgY2xvc2VDbGFzcyAgICAgID0gYWNjb3JkaW9uLmNsb3NlQ2xhc3M7XG5cdFx0dmFyIGtleXNFbmFibGVkICAgICA9ICFhY2NvcmRpb24ubm9LZXlzO1xuXHRcdHZhciB1c2VCb3JkZXJzICAgICAgPSBhY2NvcmRpb24udXNlQm9yZGVycztcblx0XHR2YXIgdXNlVHJhbnNmb3JtcyAgID0gIWFjY29yZGlvbi5ub1RyYW5zZm9ybXMgJiYgY3NzVHJhbnNmb3JtO1xuXHRcdHZhciBvblRvZ2dsZSAgICAgICAgPSBhY2NvcmRpb24ub25Ub2dnbGU7XG5cdFx0dmFyIF9kaXNhYmxlZCAgICAgICA9IGZhbHNlO1xuXHRcdHZhciBfb3BlbiwgX3ksIF9oZWlnaHQsIF9hcmlhRW5hYmxlZDtcblx0XHR2YXIgc2Nyb2xsWCwgc2Nyb2xsWTtcblx0XHR2YXIgb25Ub3VjaFN0YXJ0O1xuXHRcdHZhciBvbktleURvd247XG5cdFx0dmFyIG9uUHJlc3M7XG5cdFx0XG5cdFx0XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVEhJUywge1xuXHRcdFx0Zml0OiB7dmFsdWU6IGZpdH0sXG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0Ly8gQWRkIG9yIHJlbW92ZSByZWxldmFudCBBUklBIGF0dHJpYnV0ZXMgZnJvbSB0aGUgZm9sZCdzIGVsZW1lbnRzXG5cdFx0XHRhcmlhRW5hYmxlZDoge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBfYXJpYUVuYWJsZWQ7IH0sXG5cdFx0XHRcdHNldDogZnVuY3Rpb24oaW5wdXQpe1xuXHRcdFx0XHRcdGlmKChpbnB1dCA9ICEhaW5wdXQpICE9PSAhIV9hcmlhRW5hYmxlZCl7XG5cdFx0XHRcdFx0XHRfYXJpYUVuYWJsZWQgPSBpbnB1dDtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gRW5hYmxlIEFSSUEtYXR0cmlidXRlIG1hbmFnZW1lbnRcblx0XHRcdFx0XHRcdGlmKGlucHV0KXtcblx0XHRcdFx0XHRcdFx0aGVhZGluZy5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwidGFiXCIpO1xuXHRcdFx0XHRcdFx0XHRjb250ZW50LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJ0YWJwYW5lbFwiKTtcblx0XHRcdFx0XHRcdFx0Y2hlY2tJRHMoKTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdC8vIFVwZGF0ZSB0aGUgYXR0cmlidXRlcyB0aGF0J3JlIGNvbnRyb2xsZWQgYnkgLm9wZW4ncyBzZXR0ZXJcblx0XHRcdFx0XHRcdFx0aGVhZGluZy5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsICEhX29wZW4pO1xuXHRcdFx0XHRcdFx0XHRoZWFkaW5nLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgISFfb3Blbik7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgICAhX29wZW4pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBEaXNhYmxpbmc7IHJlbW92ZSBhbGwgcmVsZXZhbnQgYXR0cmlidXRlc1xuXHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdFx0aGVhZGluZy5yZW1vdmVBdHRyaWJ1dGUoXCJyb2xlXCIpO1xuXHRcdFx0XHRcdFx0XHRoZWFkaW5nLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIik7XG5cdFx0XHRcdFx0XHRcdGhlYWRpbmcucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiKTtcblx0XHRcdFx0XHRcdFx0aGVhZGluZy5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0Y29udGVudC5yZW1vdmVBdHRyaWJ1dGUoXCJyb2xlXCIpO1xuXHRcdFx0XHRcdFx0XHRjb250ZW50LnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtbGFiZWxsZWRieVwiKTtcblx0XHRcdFx0XHRcdFx0Y29udGVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdFxuXHRcdFx0XG5cdFx0XHQvLyBXaGV0aGVyIG9yIG5vdCB0aGUgZm9sZCdzIGN1cnJlbnRseSBvcGVuZWRcblx0XHRcdG9wZW46IHtcblx0XHRcdFx0XG5cdFx0XHRcdGdldDogZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBEZXJpdmUgdGhlIGZvbGQncyBvcGVuZWQgc3RhdGUgZnJvbSB0aGUgRE9NIGlmIGl0J3Mgbm90IGJlZW4gZGV0ZXJtaW5lZCB5ZXRcblx0XHRcdFx0XHRpZih1bmRlZmluZWQgPT09IF9vcGVuKXtcblx0XHRcdFx0XHRcdF9vcGVuID0gZWxDbGFzc2VzLmNvbnRhaW5zKG9wZW5DbGFzcyk7XG5cdFx0XHRcdFx0XHRzZXRUb2tlbihlbENsYXNzZXMsIGNsb3NlQ2xhc3MsICFfb3Blbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiBfb3Blbjtcblx0XHRcdFx0fSxcblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKGlucHV0KXtcblx0XHRcdFx0XHRpZigoaW5wdXQgPSAhIWlucHV0KSAhPT0gX29wZW4pe1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBJZiBhbiBvblRvZ2dsZSBjYWxsYmFjayB3YXMgc3BlY2lmaWVkLCBydW4gaXQuIEF2b2lkIGRvaW5nIGFueXRoaW5nIGlmIGl0IHJldHVybnMgZmFsc2UuXG5cdFx0XHRcdFx0XHRpZihcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBvblRvZ2dsZSAmJiBmYWxzZSA9PT0gb25Ub2dnbGUuY2FsbChudWxsLCBUSElTLCBpbnB1dCkpXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0c2V0VG9rZW4oZWxDbGFzc2VzLCBvcGVuQ2xhc3MsICAgaW5wdXQpO1xuXHRcdFx0XHRcdFx0c2V0VG9rZW4oZWxDbGFzc2VzLCBjbG9zZUNsYXNzLCAhaW5wdXQpO1xuXHRcdFx0XHRcdFx0X29wZW4gPSBpbnB1dDtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gVXBkYXRlIEFSSUEgYXR0cmlidXRlc1xuXHRcdFx0XHRcdFx0aWYoX2FyaWFFbmFibGVkKXtcblx0XHRcdFx0XHRcdFx0aGVhZGluZy5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsICBpbnB1dCk7XG5cdFx0XHRcdFx0XHRcdGhlYWRpbmcuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCAgaW5wdXQpO1xuXHRcdFx0XHRcdFx0XHRjb250ZW50LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsICAgIWlucHV0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gSWYgdGhpcyBmb2xkIHdhcyBjbG9zZWQgd2hlbiB0aGUgc2NyZWVuIHJlc2l6ZWQsIHJ1biBhIGZ1bGwgdXBkYXRlIGluIGNhc2UgaXRzIGNvbnRlbnRzIHdlcmUganVnZ2xlZCBhcm91bmRcblx0XHRcdFx0XHRcdGlmKFRISVMubmVlZHNSZWZyZXNoKXtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIFRISVMubmVlZHNSZWZyZXNoO1xuXHRcdFx0XHRcdFx0XHRhY2NvcmRpb24ucmVmcmVzaCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBhY2NvcmRpb24udXBkYXRlKCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIENsb3NlIG90aGVyIGZvbGRzIGlmIGFjY29yZGlvbiBpcyBtb2RhbFxuXHRcdFx0XHRcdFx0aWYoYWNjb3JkaW9uLm1vZGFsICYmIF9vcGVuKXtcblx0XHRcdFx0XHRcdFx0Zm9yKHZhciBmb2xkLCBpID0gMCwgbCA9IGFjY29yZGlvbi5mb2xkcy5sZW5ndGg7IGkgPCBsOyArK2kpe1xuXHRcdFx0XHRcdFx0XHRcdGlmKFRISVMgIT09IChmb2xkID0gYWNjb3JkaW9uLmZvbGRzW2ldKSlcblx0XHRcdFx0XHRcdFx0XHRcdGZvbGQub3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRcblx0XHRcdC8vIFdoZXRoZXIgdGhlIGZvbGQncyBiZWVuIGRlYWN0aXZhdGVkXG5cdFx0XHRkaXNhYmxlZDoge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBfZGlzYWJsZWQgfSxcblx0XHRcdFx0c2V0OiBmdW5jdGlvbihpbnB1dCl7XG5cdFx0XHRcdFx0aWYoKGlucHV0ID0gISFpbnB1dCkgIT09IF9kaXNhYmxlZCl7XG5cdFx0XHRcdFx0XHR2YXIgc3R5bGUgPSBlbC5zdHlsZTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gRGVhY3RpdmF0ZWRcblx0XHRcdFx0XHRcdGlmKF9kaXNhYmxlZCA9IGlucHV0KXtcblx0XHRcdFx0XHRcdFx0c3R5bGUuaGVpZ2h0ID0gbnVsbDtcblx0XHRcdFx0XHRcdFx0dXNlVHJhbnNmb3Jtc1xuXHRcdFx0XHRcdFx0XHRcdD8gKHN0eWxlW2Nzc1RyYW5zZm9ybV0gPSBudWxsKVxuXHRcdFx0XHRcdFx0XHRcdDogKHN0eWxlLnRvcCA9IG51bGwpO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0dG91Y2hFbmFibGVkICYmIGhlYWRpbmcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Ub3VjaFN0YXJ0KTtcblx0XHRcdFx0XHRcdFx0aGVhZGluZy5yZW1vdmVFdmVudExpc3RlbmVyKHByZXNzRXZlbnQsIG9uUHJlc3MpO1xuXHRcdFx0XHRcdFx0XHRlbENsYXNzZXMucmVtb3ZlKG9wZW5DbGFzcywgY2xvc2VDbGFzcyk7XG5cdFx0XHRcdFx0XHRcdGlmKG9uS2V5RG93bil7XG5cdFx0XHRcdFx0XHRcdFx0aGVhZGluZy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuXHRcdFx0XHRcdFx0XHRcdGhlYWRpbmcucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdGlmKF9hcmlhRW5hYmxlZCl7XG5cdFx0XHRcdFx0XHRcdFx0VEhJUy5hcmlhRW5hYmxlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdF9hcmlhRW5hYmxlZCAgICAgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIFJlYWN0aXZhdGVkXG5cdFx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0XHRzdHlsZS5oZWlnaHQgPSBfaGVpZ2h0ICsgXCJweFwiO1xuXHRcdFx0XHRcdFx0XHR1c2VUcmFuc2Zvcm1zXG5cdFx0XHRcdFx0XHRcdFx0PyBzdHlsZVtjc3NUcmFuc2Zvcm1dID1cblx0XHRcdFx0XHRcdFx0XHRcdGNzczNEU3VwcG9ydGVkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdD8gKFwidHJhbnNsYXRlM0QoMCxcIiArIF95ICsgXCJweCwwKVwiKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ6IChcInRyYW5zbGF0ZVkoXCIgICAgKyBfeSArIFwicHgpXCIpXG5cdFx0XHRcdFx0XHRcdFx0OiAoc3R5bGUudG9wID0gX3kgKyBcInB4XCIpO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0dG91Y2hFbmFibGVkICYmIGhlYWRpbmcuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Ub3VjaFN0YXJ0KTtcblx0XHRcdFx0XHRcdFx0aGVhZGluZy5hZGRFdmVudExpc3RlbmVyKHByZXNzRXZlbnQsIG9uUHJlc3MpO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0aWYob25LZXlEb3duKXtcblx0XHRcdFx0XHRcdFx0XHRoZWFkaW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG5cdFx0XHRcdFx0XHRcdFx0aGVhZGluZy50YWJJbmRleCA9IDA7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0Ly8gVmVydGljYWwgcG9zaXRpb24gb2YgdGhlIGZvbGQgd2l0aGluIGFuIGFjY29yZGlvbidzIGNvbnRhaW5lclxuXHRcdFx0eToge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0aWYodW5kZWZpbmVkID09PSBfeSlcblx0XHRcdFx0XHRcdHJldHVybiAoX3kgPSBwYXJzZUludChlbC5zdHlsZS50b3ApIHx8IDApO1xuXHRcdFx0XHRcdHJldHVybiBfeTtcblx0XHRcdFx0fSxcblx0XHRcdFx0XG5cdFx0XHRcdHNldDogZnVuY3Rpb24oaW5wdXQpe1xuXHRcdFx0XHRcdGlmKChpbnB1dCA9ICtpbnB1dCkgIT09IF95KXtcblx0XHRcdFx0XHRcdF95ID0gaW5wdXQ7XG5cdFx0XHRcdFx0XHR1c2VUcmFuc2Zvcm1zXG5cdFx0XHRcdFx0XHRcdD8gZWwuc3R5bGVbY3NzVHJhbnNmb3JtXSA9XG5cdFx0XHRcdFx0XHRcdFx0Y3NzM0RTdXBwb3J0ZWRcblx0XHRcdFx0XHRcdFx0XHRcdD8gKFwidHJhbnNsYXRlM0QoMCxcIiArIGlucHV0ICsgXCJweCwwKVwiKVxuXHRcdFx0XHRcdFx0XHRcdFx0OiAoXCJ0cmFuc2xhdGVZKFwiICAgICsgaW5wdXQgKyBcInB4KVwiKVxuXHRcdFx0XHRcdFx0XHQ6IChlbC5zdHlsZS50b3AgPSBpbnB1dCArIFwicHhcIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRcblx0XHRcdC8vIEhlaWdodCBvZiB0aGUgZm9sZCdzIG91dGVybW9zdCBjb250YWluZXJcblx0XHRcdGhlaWdodDoge1xuXHRcdFx0XHRcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGlmKHVuZGVmaW5lZCA9PT0gX2hlaWdodCl7XG5cdFx0XHRcdFx0XHRfaGVpZ2h0ID0gVEhJUy5oZWFkaW5nSGVpZ2h0ICsgY29udGVudC5zY3JvbGxIZWlnaHQ7XG5cdFx0XHRcdFx0XHRlbC5zdHlsZS5oZWlnaHQgPSBfaGVpZ2h0ICsgXCJweFwiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gX2hlaWdodDtcblx0XHRcdFx0fSxcblx0XHRcdFx0XG5cdFx0XHRcdHNldDogZnVuY3Rpb24oaW5wdXQpe1xuXHRcdFx0XHRcdGlmKGlucHV0ICYmIChpbnB1dCA9ICtpbnB1dCkgIT09IF9oZWlnaHQpe1xuXHRcdFx0XHRcdFx0ZWwuc3R5bGUuaGVpZ2h0ID0gaW5wdXQgKyBcInB4XCJcblx0XHRcdFx0XHRcdF9oZWlnaHQgICAgICAgICA9IGlucHV0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFxuXG5cdFx0XHQvLyBDdXJyZW50IGhlaWdodCBvZiB0aGUgZm9sZCdzIGhlYWRpbmdcblx0XHRcdGhlYWRpbmdIZWlnaHQ6IHtcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHJldHVybiBoZWFkaW5nLnNjcm9sbEhlaWdodFxuXHRcdFx0XHRcdFx0KyBUSElTLmhlaWdodE9mZnNldFxuXHRcdFx0XHRcdFx0KyAodXNlQm9yZGVycyA/IFRISVMuaGVhZGluZ0JvcmRlciA6IDApXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdC8vIFRvdGFsIGhlaWdodCBjb25zdW1lZCBieSB0aGUgaGVhZGluZyBlbGVtZW50J3MgQ1NTIGJvcmRlcnMsIGlmIGFueVxuXHRcdFx0aGVhZGluZ0JvcmRlcjoge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0cmV0dXJuIChoZWFkaW5nLm9mZnNldEhlaWdodCB8fCAwKSAtIChoZWFkaW5nLmNsaWVudEhlaWdodCB8fCAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0XG5cdFx0XHRcblx0XHRcdC8vIFRvdGFsIGhlaWdodCBvZiB0aGUgZm9sZCdzIGNvbnRhaW5lciBlbGVtZW50XG5cdFx0XHRlbEhlaWdodDoge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0cmV0dXJuIGVsLnNjcm9sbEhlaWdodCArICh1c2VCb3JkZXJzID8gVEhJUy5lbEJvcmRlciA6IDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHQvLyBUb3RhbCBoZWlnaHQgY29uc3VtZWQgYnkgY29udGFpbmVyIGVsZW1lbnQncyBDU1MgYm9yZGVycywgaWYgYW55XG5cdFx0XHRlbEJvcmRlcjoge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0cmV0dXJuIChlbC5vZmZzZXRIZWlnaHQgfHwgMCkgLSAoZWwuY2xpZW50SGVpZ2h0IHx8IDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRcblx0XHRcdC8vIFdoZXRoZXIgdGhlIGZvbGQncyBjb250YWluZXIgaGFzIGJlZW4gcmVzaXplZCBpbmNvcnJlY3RseVxuXHRcdFx0d3JvbmdTaXplOiB7XG5cdFx0XHRcdGdldDogZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRyZXR1cm4gVEhJUy5oZWFkaW5nSGVpZ2h0ICsgY29udGVudC5zY3JvbGxIZWlnaHQgIT09IGVsLnNjcm9sbEhlaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdFRISVMuaW5kZXggICAgICAgID0gZm9sZHMucHVzaChUSElTKSAtIDE7XG5cdFx0VEhJUy5hY2NvcmRpb24gICAgPSBhY2NvcmRpb247XG5cdFx0VEhJUy5lbCAgICAgICAgICAgPSBlbDtcblx0XHRUSElTLmhlYWRpbmcgICAgICA9IGhlYWRpbmc7XG5cdFx0VEhJUy5jb250ZW50ICAgICAgPSBjb250ZW50O1xuXHRcdFRISVMuYXJpYUVuYWJsZWQgID0gIWFjY29yZGlvbi5ub0FyaWE7XG5cdFx0VEhJUy5oZWlnaHRPZmZzZXQgPSBhY2NvcmRpb24uaGVpZ2h0T2Zmc2V0O1xuXHRcdGVsLmFjY29yZGlvbkZvbGQgID0gVEhJUy5pbmRleDtcblx0XHR1c2VCb3JkZXJzICAgICAgICA9IFwiYXV0b1wiID09PSB1c2VCb3JkZXJzID8gKDAgIT09IFRISVMuZWxCb3JkZXIgKyBUSElTLmhlYWRpbmdCb3JkZXIpIDogdXNlQm9yZGVycztcblx0XHRcblx0XHRcblx0XHRcblx0XHRmdW5jdGlvbiBjaGVja0lEcygpe1xuXHRcdFx0dmFyIGhlYWRpbmdTdWZmaXggPSBcIi1oZWFkaW5nXCI7XG5cdFx0XHR2YXIgY29udGVudFN1ZmZpeCA9IFwiLWNvbnRlbnRcIjtcblx0XHRcdHZhciBlbElEICAgICAgICAgICAgPSBlbC5pZDtcblx0XHRcdHZhciBpZDtcblx0XHRcdFxuXHRcdFx0Ly8gTmVpdGhlciBvZiB0aGUgZm9sZCdzIGVsZW1lbnRzIGhhdmUgYW4gSUQgYXR0cmlidXRlXG5cdFx0XHRpZighaGVhZGluZy5pZCAmJiAhY29udGVudC5pZCl7XG5cdFx0XHRcdGlkICAgICAgICAgICAgID0gZWxJRCB8fCB1bmlxdWVJRChcImFcIik7XG5cdFx0XHRcdGhlYWRpbmcuaWQgICAgID0gaWQgKyBoZWFkaW5nU3VmZml4O1xuXHRcdFx0XHRjb250ZW50LmlkICAgICA9IGlkICsgY29udGVudFN1ZmZpeDtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gRWl0aGVyIHRoZSBoZWFkaW5nIG9yIGVsZW1lbnQgbGFjayBhbiBJRFxuXHRcdFx0ZWxzZSBpZighY29udGVudC5pZCkgY29udGVudC5pZCAgID0gKGVsSUQgfHwgaGVhZGluZy5pZCkgKyBjb250ZW50U3VmZml4O1xuXHRcdFx0ZWxzZSBpZighaGVhZGluZy5pZCkgaGVhZGluZy5pZCAgID0gKGVsSUQgfHwgY29udGVudC5pZCkgKyBoZWFkaW5nU3VmZml4O1xuXHRcdFx0XG5cdFx0XHQvLyBGaW5hbGx5LCBkb3VibGUtY2hlY2sgZWFjaCBlbGVtZW50J3MgSUQgaXMgcmVhbGx5IHVuaXF1ZVxuXHRcdFx0dmFyICQgPSBmdW5jdGlvbihzKXtyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNcIitzKX07XG5cdFx0XHR3aGlsZSgkKGNvbnRlbnQuaWQpLmxlbmd0aCA+IDEgfHwgJChoZWFkaW5nLmlkKS5sZW5ndGggPiAxKXtcblx0XHRcdFx0aWQgICAgICAgICA9IHVuaXF1ZUlEKFwiYVwiKTtcblx0XHRcdFx0Y29udGVudC5pZCA9IGlkICsgY29udGVudFN1ZmZpeDtcblx0XHRcdFx0aGVhZGluZy5pZCA9IGlkICsgaGVhZGluZ1N1ZmZpeDtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gVXBkYXRlIEFSSUEgYXR0cmlidXRlc1xuXHRcdFx0aGVhZGluZy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsICAgIGNvbnRlbnQuaWQpO1xuXHRcdFx0Y29udGVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIiwgIGhlYWRpbmcuaWQpO1xuXHRcdH1cblx0XHRcblx0XHRcblx0XHRcblx0XHQvLyBLZXlib2FyZCBuYXZpZ2F0aW9uXG5cdFx0aWYoa2V5c0VuYWJsZWQpe1xuXHRcdFx0aGVhZGluZy50YWJJbmRleCA9IDA7XG5cdFx0XHRoZWFkaW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93biA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHR2YXIga2V5ID0gZS5rZXlDb2RlO1xuXHRcdFx0XHR2YXIgZm9sZDtcblx0XHRcdFx0XG5cdFx0XHRcdHN3aXRjaChrZXkpe1xuXG5cdFx0XHRcdFx0Ly8gU3BhY2ViYXI6IFRvZ2dsZVxuXHRcdFx0XHRcdGNhc2UgMzI6XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IC8vIEZhbGwtdGhyb3VnaFxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIEVudGVyOiBUb2dnbGVcblx0XHRcdFx0XHRjYXNlIDEzOlxuXHRcdFx0XHRcdFx0VEhJUy5vcGVuID0gIVRISVMub3Blbjtcblx0XHRcdFx0XHRcdGlmKFwiQVwiID09PSBlLnRhcmdldC50YWdOYW1lKVxuXHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBFc2NhcGU6IENsZWFyIGZvY3VzXG5cdFx0XHRcdFx0Y2FzZSAyNzpcblx0XHRcdFx0XHRcdGUudGFyZ2V0LmJsdXIoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIFVwIGFycm93OiBQcmV2aW91cyBzZWN0aW9uXG5cdFx0XHRcdFx0Y2FzZSAzODp7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIElzIHRoZXJlIGEgcHJldmlvdXMgc2libGluZyB0byBuYXZpZ2F0ZSB1cCB0bz9cblx0XHRcdFx0XHRcdGlmKGZvbGQgPSBUSElTLnByZXZpb3VzRm9sZCl7XG5cdFx0XHRcdFx0XHRcdHZhciBjaGlsZHJlbiA9IGZvbGQuY2hpbGRBY2NvcmRpb25zO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0Ly8gSXMgaXQgb3BlbiwgYW5kIGRvZXMgaXQgaGF2ZSBuZXN0ZWQgYWNjb3JkaW9ucz9cblx0XHRcdFx0XHRcdFx0aWYoZm9sZC5vcGVuICYmIGNoaWxkcmVuKXtcblx0XHRcdFx0XHRcdFx0XHR2YXIgbGFzdEFjYztcblx0XHRcdFx0XHRcdFx0XHR2YXIgbGFzdEZvbGQ7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Ly8gTG9jYXRlIHRoZSBkZWVwZXN0L25lYXJlc3QgYWNjb3JkaW9uIHRoYXQncyBjdXJyZW50bHkgZXhwb3NlZFxuXHRcdFx0XHRcdFx0XHRcdHdoaWxlKGNoaWxkcmVuKXtcblx0XHRcdFx0XHRcdFx0XHRcdGxhc3RBY2MgID0gY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG5cdFx0XHRcdFx0XHRcdFx0XHRsYXN0Rm9sZCA9IGxhc3RBY2MuZm9sZHNbbGFzdEFjYy5mb2xkcy5sZW5ndGggLSAxXTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKCFsYXN0Rm9sZC5vcGVuKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkcmVuID0gbGFzdEZvbGQuY2hpbGRBY2NvcmRpb25zO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRsYXN0Rm9sZC5oZWFkaW5nLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdC8vIE5vcGVcblx0XHRcdFx0XHRcdFx0ZWxzZSBmb2xkLmhlYWRpbmcuZm9jdXMoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gSXMgdGhlcmUgYSBoaWdoZXIgbGV2ZWwgd2UgY2FuIGp1bXAgYmFjayB1cCB0bz9cblx0XHRcdFx0XHRcdGVsc2UgaWYoYWNjb3JkaW9uLnBhcmVudClcblx0XHRcdFx0XHRcdFx0YWNjb3JkaW9uLnBhcmVudEZvbGQuaGVhZGluZy5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBUaGVyZSdzIG5vdGhpbmcgdG8gbW92ZSBiYWNrIHRvLCBzbyBqdXN0IGxldCB0aGUgYnJvd3NlciBydW4gaXRzIHVzdWFsIGJlaGF2aW91clxuXHRcdFx0XHRcdFx0ZWxzZSByZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBEb3duIGFycm93OiBOZXh0IHNlY3Rpb25cblx0XHRcdFx0XHRjYXNlIDQwOntcblx0XHRcdFx0XHRcdHZhciBjaGlsZHJlbiA9IFRISVMuY2hpbGRBY2NvcmRpb25zO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBJcyB0aGVyZSBhIG5lc3RlZCBhY2NvcmRpb24gdG8ganVtcCBpbnRvP1xuXHRcdFx0XHRcdFx0aWYoVEhJUy5vcGVuICYmIGNoaWxkcmVuKVxuXHRcdFx0XHRcdFx0XHRjaGlsZHJlblswXS5mb2xkc1swXS5oZWFkaW5nLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIE5vLCB0aGVyZSBpc24ndC4gSXMgdGhlcmUgYW5vdGhlciBzaWJsaW5nIHRvIG1vdmUgZG93biB0bz9cblx0XHRcdFx0XHRcdGVsc2UgaWYoZm9sZCA9IFRISVMubmV4dEZvbGQpXG5cdFx0XHRcdFx0XHRcdGZvbGQuaGVhZGluZy5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBJcyB0aGVyZSBhIGNvbnRhaW5pbmcgYWNjb3JkaW9uIHdlIGNhbiBuYXZpZ2F0ZSBiYWNrIHVwIHRvP1xuXHRcdFx0XHRcdFx0ZWxzZSBpZihUSElTLmFjY29yZGlvbi5wYXJlbnQpe1xuXHRcdFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gVEhJUztcblx0XHRcdFx0XHRcdFx0d2hpbGUocGFyZW50ID0gcGFyZW50LmFjY29yZGlvbi5wYXJlbnRGb2xkKVxuXHRcdFx0XHRcdFx0XHRcdGlmKGZvbGQgPSBwYXJlbnQubmV4dEZvbGQpe1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9sZC5oZWFkaW5nLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHQvLyBOb3doZXJlIGxlZnQgdG8gZ28uLi5cblx0XHRcdFx0XHRcdFx0aWYoIXBhcmVudCkgcmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIE5haC4gSnVzdCBzY3JvbGwgdGhlIHdpbmRvdyBub3JtYWxseSwgYXMgcGVyIGJyb3dzZXIgZGVmYXVsdFxuXHRcdFx0XHRcdFx0ZWxzZSByZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBMZWZ0IGFycm93XG5cdFx0XHRcdFx0Y2FzZSAzNzp7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIENsb3NlIGFuIG9wZW5lZCBzZWN0aW9uXG5cdFx0XHRcdFx0XHRpZihUSElTLm9wZW4pIFRISVMub3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBTd2l0Y2ggZm9jdXMgYmFjayB0byBwYXJlbnRcblx0XHRcdFx0XHRcdGVsc2UgaWYoYWNjb3JkaW9uLnBhcmVudClcblx0XHRcdFx0XHRcdFx0YWNjb3JkaW9uLnBhcmVudEZvbGQuaGVhZGluZy5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gUmlnaHQgYXJyb3dcblx0XHRcdFx0XHRjYXNlIDM5Ontcblx0XHRcdFx0XHRcdHZhciBjaGlsZHJlbiA9IFRISVMuY2hpbGRBY2NvcmRpb25zO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBPcGVuIGEgY2xvc2VkIHNlY3Rpb25cblx0XHRcdFx0XHRcdGlmKCFUSElTLm9wZW4pIFRISVMub3BlbiA9IHRydWU7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIFN3aXRjaCBmb2N1cyB0byBhIG5lc3RlZCBhY2NvcmRpb25cblx0XHRcdFx0XHRcdGVsc2UgaWYoY2hpbGRyZW4pXG5cdFx0XHRcdFx0XHRcdGNoaWxkcmVuWzBdLmZvbGRzWzBdLmhlYWRpbmcuZm9jdXMoKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0XG5cdFx0XG5cdFx0Ly8gTGlzdGVuZXIgdG8gcmVjb3JkIHRoZSB2aWV3cG9ydCdzIHNjcm9sbCBvZmZzZXRzIGF0IHRoZSBiZWdpbm5pbmcgb2YgYSB0b3VjaFxuXHRcdHRvdWNoRW5hYmxlZCAmJiBoZWFkaW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIG9uVG91Y2hTdGFydCA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0c2Nyb2xsWCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcblx0XHRcdHNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cdFx0fSwge3Bhc3NpdmU6IHRydWV9KTtcblx0XHRcblx0XHRcblx0XHRoZWFkaW5nLmFkZEV2ZW50TGlzdGVuZXIocHJlc3NFdmVudCwgb25QcmVzcyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XG5cdFx0XHQvLyBQcmVzc2VkIG9uIHNvbWV0aGluZyBpbnNpZGUgdGhlIGhlYWRlclxuXHRcdFx0aWYoZS50YXJnZXQgIT09IGhlYWRpbmcgJiYgaGVhZGluZy5jb250YWlucyhlLnRhcmdldCkpe1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ2FuY2VsIGZvbGQtdG9nZ2xlIGlmIHVzZXIgY2xpY2tlZCBvbiBhbiBhbmNob3ItbGlua1xuXHRcdFx0XHRpZihcIkFcIiA9PT0gZS50YXJnZXQudGFnTmFtZSAmJiBlLnRhcmdldC5ocmVmKVxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZihlLnR5cGUgIT09IFwidG91Y2hlbmRcIiB8fCAoZS5jYW5jZWxhYmxlICYmIHdpbmRvdy5wYWdlWE9mZnNldCA9PT0gc2Nyb2xsWCAmJiB3aW5kb3cucGFnZVlPZmZzZXQgPT09IHNjcm9sbFkpKXtcblx0XHRcdFx0VEhJUy5vcGVuID0gIVRISVMub3Blbjtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIEFkanVzdCBhIGZvbGQncyBjb250YWluZXIgdG8gZml0IGl0cyBjb250ZW50LlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGZpdCgpe1xuXHRcdFx0dmFyIGhlaWdodCA9IFRISVMuaGVhZGluZ0hlaWdodDtcblx0XHRcdGlmKFRISVMub3BlbikgICBoZWlnaHQgKz0gY29udGVudC5zY3JvbGxIZWlnaHQ7XG5cdFx0XHRpZih1c2VCb3JkZXJzKSAgaGVpZ2h0ICs9IFRISVMuZWxCb3JkZXI7XG5cdFx0XHRUSElTLmhlaWdodCA9IGhlaWdodDtcblx0XHR9XG5cdH1cblxuXG5cblxuXG5cblxuXHR2YXIgYWNjb3JkaW9ucyAgICAgICA9IFtdO1xuXHR2YXIgYWN0aXZlQWNjb3JkaW9ucyA9IDA7XG5cdHZhciBsYXN0UmVzaXplUmF0ZTtcblxuXG5cdC8qKlxuXHQgKiBSZXByZXNlbnRzIGEgY29sdW1uIG9mIGNvbGxhcHNpYmxlIGNvbnRlbnQgcmVnaW9ucy5cblx0ICpcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgICAgICAgICAgICAgICAgICAgIC0gQ29udGFpbmVyIHdyYXBwZWQgYXJvdW5kIGVhY2ggaW1tZWRpYXRlIGZvbGRcblx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgIC0gT3B0aW9uYWwgaGFzaCBvZiBzZXR0aW5nc1xuXHQgKiBAcGFyYW0ge1N0cmluZ30gICAgICBvcHRpb25zLm9wZW5DbGFzcyAgICAgLSBDU1MgY2xhc3MgY29udHJvbGxpbmcgZWFjaCBmb2xkJ3MgXCJvcGVuXCIgc3RhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgb3B0aW9ucy5jbG9zZUNsYXNzICAgIC0gQ1NTIGNsYXNzIHVzZWQgdG8gbWFyayBhIGZvbGQgYXMgY2xvc2VkXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIG9wdGlvbnMuZWRnZUNsYXNzICAgICAtIENTUyBjbGFzcyB0b2dnbGVkIGJhc2VkIG9uIHdoZXRoZXIgdGhlIGJvdHRvbS1lZGdlIGlzIHZpc2libGVcblx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgb3B0aW9ucy5zbmFwQ2xhc3MgICAgIC0gQ1NTIGNsYXNzIGZvciBkaXNhYmxpbmcgdHJhbnNpdGlvbnMgYmV0d2VlbiB3aW5kb3cgcmVzaXplc1xuXHQgKiBAcGFyYW0ge1N0cmluZ30gICAgICBvcHRpb25zLmVuYWJsZWRDbGFzcyAgLSBDU1MgY2xhc3MgbWFya2luZyBhbiBhY2NvcmRpb24gYXMgZW5hYmxlZFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gICAgICBvcHRpb25zLmRpc2FibGVkQ2xhc3MgLSBDU1MgY2xhc3MgbWFya2luZyBhbiBhY2NvcmRpb24gYXMgZGlzYWJsZWRcblx0ICogQHBhcmFtIHtCb29sZWFufSAgICAgb3B0aW9ucy5kaXNhYmxlZCAgICAgIC0gV2hldGhlciB0byBkaXNhYmxlIHRoZSBhY2NvcmRpb24gb24gY3JlYXRpb25cblx0ICogQHBhcmFtIHtCb29sZWFufSAgICAgb3B0aW9ucy5tb2RhbCAgICAgICAgIC0gV2hldGhlciB0byBjbG9zZSB0aGUgY3VycmVudCBmb2xkIHdoZW4gb3BlbmluZyBhbm90aGVyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgIG9wdGlvbnMubm9BcmlhICAgICAgICAtIERpc2FibGUgdGhlIGFkZGl0aW9uIGFuZCBtYW5hZ2VtZW50IG9mIEFSSUEgYXR0cmlidXRlc1xuXHQgKiBAcGFyYW0ge0Jvb2xlYW59ICAgICBvcHRpb25zLm5vS2V5cyAgICAgICAgLSBEaXNhYmxlIGtleWJvYXJkIG5hdmlnYXRpb25cblx0ICogQHBhcmFtIHtCb29sZWFufSAgICAgb3B0aW9ucy5ub1RyYW5zZm9ybXMgIC0gRGlzYWJsZSBDU1MgdHJhbnNmb3JtczsgcG9zaXRpb25pbmcgd2lsbCBiZSB1c2VkIGluc3RlYWRcblx0ICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgb3B0aW9ucy5oZWlnaHRPZmZzZXQgIC0gRGlzdGFuY2UgdG8gb2Zmc2V0IGVhY2ggZm9sZCBieVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59ICAgICBvcHRpb25zLnVzZUJvcmRlcnMgICAgLSBDb25zaWRlciBib3JkZXJzIHdoZW4gY2FsY3VsYXRpbmcgZm9sZCBoZWlnaHRzXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259ICAgIG9wdGlvbnMub25Ub2dnbGUgICAgICAtIENhbGxiYWNrIGV4ZWN1dGVkIHdoZW4gb3BlbmluZyBvciBjbG9zaW5nIGEgZm9sZFxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cdHZhciBBY2NvcmRpb24gPSBmdW5jdGlvbihlbCwgb3B0aW9ucyl7XG5cdFx0dmFyIFRISVMgICAgICAgICAgPSB0aGlzO1xuXHRcdHZhciBlbENsYXNzZXMgICAgID0gZWwuY2xhc3NMaXN0O1xuXHRcdHZhciBvcHRpb25zICAgICAgID0gb3B0aW9ucyB8fCB7fTtcblx0XHR2YXIgZWRnZUNsYXNzICAgICA9ICh1bmRlZmluZWQgPT09IG9wdGlvbnMuZWRnZUNsYXNzICAgID8gXCJlZGdlLXZpc2libGVcIiA6IG9wdGlvbnMuZWRnZUNsYXNzKTtcblx0XHR2YXIgc25hcENsYXNzICAgICA9ICh1bmRlZmluZWQgPT09IG9wdGlvbnMuc25hcENsYXNzICAgID8gXCJzbmFwXCIgICAgICAgICA6IG9wdGlvbnMuc25hcENsYXNzKTtcblx0XHR2YXIgZW5hYmxlZENsYXNzICA9ICh1bmRlZmluZWQgPT09IG9wdGlvbnMuZW5hYmxlZENsYXNzID8gXCJhY2NvcmRpb25cIiAgICA6IG9wdGlvbnMuZW5hYmxlZENsYXNzKTtcblx0XHR2YXIgZGlzYWJsZWRDbGFzcyA9IG9wdGlvbnMuZGlzYWJsZWRDbGFzcztcblx0XHR2YXIgX2hlaWdodCwgX2Rpc2FibGVkLCBfcGFyZW50LCBfcGFyZW50Rm9sZCwgX21vZGFsO1xuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhUSElTLCB7XG5cdFx0XHR1cGRhdGU6ICAgICB7dmFsdWU6IHVwZGF0ZX0sXG5cdFx0XHR1cGRhdGVGb2xkOiB7dmFsdWU6IHVwZGF0ZUZvbGR9LFxuXHRcdFx0cmVmcmVzaDogICAge3ZhbHVlOiByZWZyZXNofSxcblx0XHRcdFxuXHRcdFx0Ly8gV2hldGhlciB0aGUgYWNjb3JkaW9uJ3MgYmVlbiBkZWFjdGl2YXRlZFxuXHRcdFx0ZGlzYWJsZWQ6IHtcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gX2Rpc2FibGVkOyB9LFxuXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKGlucHV0KXtcblx0XHRcdFx0XHRpZigoaW5wdXQgPSAhIWlucHV0KSAhPT0gX2Rpc2FibGVkKXtcblx0XHRcdFx0XHRcdHZhciBzdHlsZSAgID0gZWwuc3R5bGU7XG5cdFx0XHRcdFx0XHR2YXIgZm9sZHMgICA9IFRISVMuZm9sZHM7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdGVuYWJsZWRDbGFzcyAgJiYgc2V0VG9rZW4oZWxDbGFzc2VzLCBlbmFibGVkQ2xhc3MsICAhaW5wdXQpO1xuXHRcdFx0XHRcdFx0ZGlzYWJsZWRDbGFzcyAmJiBzZXRUb2tlbihlbENsYXNzZXMsIGRpc2FibGVkQ2xhc3MsICBpbnB1dCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gRGVhY3RpdmF0aW5nXG5cdFx0XHRcdFx0XHRpZihfZGlzYWJsZWQgPSBpbnB1dCl7XG5cdFx0XHRcdFx0XHRcdHN0eWxlLmhlaWdodCA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdHNuYXBDbGFzcyAmJiBlbENsYXNzZXMucmVtb3ZlKHNuYXBDbGFzcyk7XG5cdFx0XHRcdFx0XHRcdGlmKGVkZ2VDbGFzcyl7XG5cdFx0XHRcdFx0XHRcdFx0ZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRW5kLCBUSElTLm9uVHJhbnNpdGlvbkVuZCk7XG5cdFx0XHRcdFx0XHRcdFx0ZWxDbGFzc2VzLnJlbW92ZShlZGdlQ2xhc3MpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwLCBsID0gZm9sZHMubGVuZ3RoOyBpIDwgbDsgKytpKVxuXHRcdFx0XHRcdFx0XHRcdGZvbGRzW2ldLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFRISVMubm9BcmlhIHx8IGVsLnJlbW92ZUF0dHJpYnV0ZShcInJvbGVcIik7XG5cdFx0XHRcdFx0XHRcdC0tYWN0aXZlQWNjb3JkaW9ucztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBSZWFjdGl2YXRpbmdcblx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRcdGZvcih2YXIgaSA9IDAsIGwgPSBmb2xkcy5sZW5ndGg7IGkgPCBsOyArK2kpXG5cdFx0XHRcdFx0XHRcdFx0Zm9sZHNbaV0uZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFRISVMubm9BcmlhIHx8IGVsLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJ0YWJsaXN0XCIpO1xuXHRcdFx0XHRcdFx0XHQrK2FjdGl2ZUFjY29yZGlvbnM7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XG5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gSWYgdGhlcmUncmUgbm8gbW9yZSBhY3RpdmUgYWNjb3JkaW9ucywgZGlzYWJsZSB0aGUgb25SZXNpemUgaGFuZGxlclxuXHRcdFx0XHRcdFx0aWYoYWN0aXZlQWNjb3JkaW9ucyA8PSAwKXtcblx0XHRcdFx0XHRcdFx0YWN0aXZlQWNjb3JkaW9ucyA9IDA7XG5cdFx0XHRcdFx0XHRcdEFjY29yZGlvbi5zZXRSZXNpemVSYXRlKGZhbHNlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCByZWFjdGl2YXRlIHRoZSBvblJlc2l6ZSBoYW5kbGVyLCBhc3N1bWluZyBpdCB3YXMgcHJldmlvdXNseSBhY3RpdmVcblx0XHRcdFx0XHRcdGVsc2UgaWYobGFzdFJlc2l6ZVJhdGUpXG5cdFx0XHRcdFx0XHRcdEFjY29yZGlvbi5zZXRSZXNpemVSYXRlKGxhc3RSZXNpemVSYXRlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdC8vIEdldCBvciBzZXQgdGhlIGFjY29yZGlvbiBlbmNsb3NpbmcgdGhpcyBvbmVcblx0XHRcdHBhcmVudDoge1xuXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKGlucHV0KXsgX3BhcmVudCA9IGlucHV0OyB9LFxuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dmFyIHJlc3VsdCA9IF9wYXJlbnQ7XG5cdFx0XHRcdFx0aWYoIXJlc3VsdCkgcmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gU2VhcmNoIGZvciB0aGUgZmlyc3QgYW5jZXN0b3IgdGhhdCAqaXNuJ3QqIGRpc2FibGVkXG5cdFx0XHRcdFx0d2hpbGUocmVzdWx0KXtcblx0XHRcdFx0XHRcdGlmKCFyZXN1bHQuZGlzYWJsZWQpIHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQucGFyZW50O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0Ly8gR2V0IG9yIHNldCB0aGUgZm9sZCBvZiB0aGUgYWNjb3JkaW9uIGVuY2xvc2luZyB0aGlzIG9uZVxuXHRcdFx0cGFyZW50Rm9sZDoge1xuXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKGlucHV0KXsgX3BhcmVudEZvbGQgPSBpbnB1dDsgfSxcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciBmb2xkID0gX3BhcmVudEZvbGQ7XG5cdFx0XHRcdFx0aWYoIWZvbGQpIHJldHVybiBudWxsO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHZhciBhY2NvcmRpb24gPSBmb2xkLmFjY29yZGlvbjtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBTZWFyY2ggZm9yIHRoZSBmaXJzdCBhbmNlc3RvciB0aGF0ICppc24ndCogZGlzYWJsZWRcblx0XHRcdFx0XHR3aGlsZShmb2xkICYmIGFjY29yZGlvbil7XG5cdFx0XHRcdFx0XHRpZighYWNjb3JkaW9uLmRpc2FibGVkKSByZXR1cm4gZm9sZDtcblx0XHRcdFx0XHRcdGlmKGFjY29yZGlvbiA9IGFjY29yZGlvbi5wYXJlbnQpXG5cdFx0XHRcdFx0XHRcdGZvbGQgPSBhY2NvcmRpb24ucGFyZW50Rm9sZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdC8vIEhlaWdodCBvZiB0aGUgYWNjb3JkaW9uJ3MgY29udGFpbmVyIGVsZW1lbnRcblx0XHRcdGhlaWdodDoge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBfaGVpZ2h0OyB9LFxuXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKGlucHV0KXtcblx0XHRcdFx0XHRpZihpbnB1dCAmJiAoaW5wdXQgPSAraW5wdXQpICE9PSBfaGVpZ2h0KXtcblx0XHRcdFx0XHRcdGVsLnN0eWxlLmhlaWdodCA9IGlucHV0ICsgXCJweFwiO1xuXHRcdFx0XHRcdFx0X2hlaWdodCAgICAgICAgID0gaW5wdXQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHQvLyBXaGV0aGVyIG9uZSBvZiB0aGUgQWNjb3JkaW9uJ3MgZm9sZHMgaGFzIGJlZW4gcmVzaXplZCBpbmNvcnJlY3RseVxuXHRcdFx0d3JvbmdTaXplOiB7XG5cdFx0XHRcdGdldDogZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR2YXIgYSA9IHRoaXMuZm9sZHM7XG5cdFx0XHRcdFx0dmFyIGwgPSBhLmxlbmd0aDtcblx0XHRcdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRcdFx0Zm9yKDsgaSA8IGw7ICsraSkgaWYoYVtpXS53cm9uZ1NpemUpIHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdGlmKGEgPSB0aGlzLmNoaWxkQWNjb3JkaW9ucylcblx0XHRcdFx0XHRmb3IoOyBpIDwgbDsgKytpKSBpZihhW2ldLndyb25nU2l6ZSkgcmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHQvLyBUb3AtbGV2ZWwgYW5jZXN0b3IgdGhpcyBhY2NvcmRpb24ncyBuZXN0ZWQgaW5zaWRlXG5cdFx0XHRyb290OiB7XG5cdFx0XHRcdGdldDogZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpcztcblx0XHRcdFx0XHR3aGlsZShyZXN1bHQpe1xuXHRcdFx0XHRcdFx0aWYoIXJlc3VsdC5wYXJlbnQpIHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQucGFyZW50O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0XG5cdFx0Ly8gQXNzaWduIG9wdGlvbnMgYXMgcHJvcGVydGllc1xuXHRcdFRISVMub3BlbkNsYXNzICAgID0gb3B0aW9ucy5vcGVuQ2xhc3MgIHx8IFwib3BlblwiO1xuXHRcdFRISVMuY2xvc2VDbGFzcyAgID0gb3B0aW9ucy5jbG9zZUNsYXNzIHx8IFwiY2xvc2VkXCI7XG5cdFx0VEhJUy5tb2RhbCAgICAgICAgPSAhIW9wdGlvbnMubW9kYWw7XG5cdFx0VEhJUy5ub0FyaWEgICAgICAgPSAhIW9wdGlvbnMubm9BcmlhO1xuXHRcdFRISVMubm9LZXlzICAgICAgID0gISFvcHRpb25zLm5vS2V5cztcblx0XHRUSElTLm5vVHJhbnNmb3JtcyA9ICEhb3B0aW9ucy5ub1RyYW5zZm9ybXM7XG5cdFx0VEhJUy5pbmRleCAgICAgICAgPSBhY2NvcmRpb25zLnB1c2goVEhJUykgLSAxO1xuXHRcdFRISVMuaGVpZ2h0T2Zmc2V0ID0gK29wdGlvbnMuaGVpZ2h0T2Zmc2V0IHx8IDA7XG5cdFx0VEhJUy51c2VCb3JkZXJzICAgPSB1bmRlZmluZWQgPT09IG9wdGlvbnMudXNlQm9yZGVycyA/IFwiYXV0b1wiIDogb3B0aW9ucy51c2VCb3JkZXJzO1xuXHRcdFRISVMub25Ub2dnbGUgICAgID0gb3B0aW9ucy5vblRvZ2dsZTtcblx0XHRcblx0XHRcblx0XHQvLyBDcmVhdGUgYSBmb2xkIGZvciBlYWNoIGltbWVkaWF0ZSBkZXNjZW5kYW50IG9mIHRoZSBBY2NvcmRpb24ncyBjb250YWluZXJcblx0XHR2YXIgZm9sZHMgPSBbXTtcblx0XHRlYWNoLmNhbGwoZWwuY2hpbGRyZW4sIGZ1bmN0aW9uKGkpe1xuXHRcdFx0dmFyIGZvbGQgPSBuZXcgRm9sZChUSElTLCBpKTtcblx0XHRcdGZvbGRzLnB1c2goZm9sZCk7XG5cdFx0XHRcblx0XHRcdC8vIENvbm5lY3QgdGhlIGZvbGQgdG8gaXRzIHByZXZpb3VzIHNpYmxpbmcsIGlmIGl0J3Mgbm90IHRoZSBmaXJzdCB0byBiZSBhZGRlZFxuXHRcdFx0dmFyIHByZXYgPSBmb2xkc1tmb2xkcy5sZW5ndGggLSAyXTtcblx0XHRcdGlmKHByZXYpe1xuXHRcdFx0XHRwcmV2Lm5leHRGb2xkICAgICA9IGZvbGQ7XG5cdFx0XHRcdGZvbGQucHJldmlvdXNGb2xkID0gcHJldjtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRcblx0XHRcblx0XHRlbC5hY2NvcmRpb24gICAgPSBUSElTLmluZGV4O1xuXHRcdFRISVMubm9BcmlhIHx8IGVsLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJ0YWJsaXN0XCIpO1xuXHRcdFRISVMuZWwgICAgICAgICA9IGVsO1xuXHRcdFRISVMuZm9sZHMgICAgICA9IGZvbGRzO1xuXHRcdFxuXHRcdC8vIEFkZCAuZW5hYmxlZENsYXNzIGVhcmx5IC0gaXQgbWlnaHQgYWZmZWN0IHRoZSBoZWlnaHRzIG9mIGVhY2ggZm9sZFxuXHRcdGlmKCFvcHRpb25zLmRpc2FibGVkICYmIGVuYWJsZWRDbGFzcylcblx0XHRcdGVsQ2xhc3Nlcy5hZGQoZW5hYmxlZENsYXNzKTtcblx0XHRcblx0XHR1cGRhdGUoKTtcblx0XHRcblx0XHRcblx0XHQvLyBGaW5kIG91dCBpZiB0aGlzIGFjY29yZGlvbidzIG5lc3RlZCBpbnNpZGUgYW5vdGhlclxuXHRcdHZhciBuZXh0ID0gZWw7XG5cdFx0d2hpbGUoKG5leHQgPSBuZXh0LnBhcmVudE5vZGUpICYmIDEgPT09IG5leHQubm9kZVR5cGUpe1xuXHRcdFx0dmFyIGZvbGQgPSBBY2NvcmRpb24uZ2V0Rm9sZChuZXh0KTtcblx0XHRcdGlmKGZvbGQpe1xuXHRcdFx0XHR2YXIgYWNjb3JkaW9uICAgPSBmb2xkLmFjY29yZGlvbjtcblx0XHRcdFx0VEhJUy5wYXJlbnQgICAgID0gYWNjb3JkaW9uO1xuXHRcdFx0XHRUSElTLnBhcmVudEZvbGQgPSBmb2xkO1xuXHRcdFx0XHRlZGdlQ2xhc3MgJiYgZWxDbGFzc2VzLnJlbW92ZShlZGdlQ2xhc3MpO1xuXHRcdFx0XHQoYWNjb3JkaW9uLmNoaWxkQWNjb3JkaW9ucyA9IGFjY29yZGlvbi5jaGlsZEFjY29yZGlvbnMgfHwgW10pLnB1c2goVEhJUyk7XG5cdFx0XHRcdChmb2xkLmNoaWxkQWNjb3JkaW9ucyAgICAgID0gZm9sZC5jaGlsZEFjY29yZGlvbnMgICAgICB8fCBbXSkucHVzaChUSElTKTtcblxuXHRcdFx0XHQvLyBBZGp1c3QgdGhlIGhlaWdodCBvZiB0aGUgY29udGFpbmluZyBmb2xkJ3MgZWxlbWVudFxuXHRcdFx0XHRpZihmb2xkLm9wZW4pe1xuXHRcdFx0XHRcdHZhciBzY3JvbGxIZWlnaHQgPSBmb2xkLmVsLnNjcm9sbEhlaWdodDtcblx0XHRcdFx0XHR2YXIgZGlzdGFuY2UgICAgID0gKGZvbGQuaGVhZGluZ0hlaWdodCArIGZvbGQuY29udGVudC5zY3JvbGxIZWlnaHQpIC0gc2Nyb2xsSGVpZ2h0IHx8IChzY3JvbGxIZWlnaHQgLSBmb2xkLmVsLmNsaWVudEhlaWdodCk7XG5cdFx0XHRcdFx0YWNjb3JkaW9uLnVwZGF0ZUZvbGQoZm9sZCwgZGlzdGFuY2UpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRcblx0XHRlZGdlQ2xhc3MgJiYgZWwuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRW5kLCB0aGlzLm9uVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0aWYoIVRISVMucGFyZW50ICYmIGUudGFyZ2V0ID09PSBlbCAmJiBcImhlaWdodFwiID09PSBlLnByb3BlcnR5TmFtZSAmJiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPiB3aW5kb3cuaW5uZXJIZWlnaHQpXG5cdFx0XHRcdGVsQ2xhc3Nlcy5yZW1vdmUoZWRnZUNsYXNzKTtcblx0XHR9KTtcblx0XHRcblx0XHR0aGlzLmRpc2FibGVkID0gISFvcHRpb25zLmRpc2FibGVkO1xuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIEludGVybmFsIG1ldGhvZCB0byBjaGVjayBpZiBhbiBhY2NvcmRpb24ncyBib3R0b20tZWRnZSBpcyB2aXNpYmxlIHRvIHRoZSB1c2VyIChvciBhYm91dCB0byBiZSkuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHRmdW5jdGlvbiBlZGdlQ2hlY2sob2Zmc2V0KXtcblx0XHRcdGlmKGVkZ2VDbGFzcyl7XG5cdFx0XHRcdHZhciBib3ggICAgICAgICA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHR2YXIgd2luZG93RWRnZSAgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBJZiB0aGUgYm90dG9tLWVkZ2UgaXMgdmlzaWJsZSAob3IgYWJvdXQgdG8gYmUpLCBlbmFibGUgaGVpZ2h0IGFuaW1hdGlvblxuXHRcdFx0XHRpZihib3guYm90dG9tICsgKG9mZnNldCB8fCAwKSA8IHdpbmRvd0VkZ2UpXG5cdFx0XHRcdFx0ZWxDbGFzc2VzLmFkZChlZGdlQ2xhc3MpXG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBJZiB0aGUgYm90dG9tLWVkZ2UgaXNuJ3QgdmlzaWJsZSBhbnl3YXksIGRpc2FibGUgaGVpZ2h0IGFuaW1hdGlvbiBpbW1lZGlhdGVseVxuXHRcdFx0XHRlbHNlIGlmKGJveC5ib3R0b20gPiB3aW5kb3dFZGdlKVxuXHRcdFx0XHRcdGVsQ2xhc3Nlcy5yZW1vdmUoZWRnZUNsYXNzKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0XG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlIHRoZSB2ZXJ0aWNhbCBvcmRpbmF0ZSBvZiBlYWNoIHNpYmxpbmcgZm9yIGEgcGFydGljdWxhciBmb2xkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtGb2xkfSBmb2xkXG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCAtIFBpeGVsIGRpc3RhbmNlIHRvIGFkanVzdCBieVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHVwZGF0ZUZvbGQoZm9sZCwgb2Zmc2V0KXtcblx0XHRcdHZhciBuZXh0ID0gZm9sZDtcblx0XHRcdHZhciBwYXJlbnRGb2xkID0gVEhJUy5wYXJlbnRGb2xkO1xuXHRcdFx0XG5cdFx0XHR3aGlsZShuZXh0ID0gbmV4dC5uZXh0Rm9sZClcblx0XHRcdFx0bmV4dC55ICArPSBvZmZzZXQ7XG5cdFx0XHRwYXJlbnRGb2xkIHx8IGVkZ2VDaGVjayhvZmZzZXQpO1xuXHRcdFx0Zm9sZC5oZWlnaHQgKz0gb2Zmc2V0O1xuXHRcdFx0VEhJUy5oZWlnaHQgKz0gb2Zmc2V0O1xuXHRcdFx0XG5cdFx0XHRwYXJlbnRGb2xkICYmIHBhcmVudEZvbGQub3BlbiAmJiBUSElTLnBhcmVudC51cGRhdGVGb2xkKHBhcmVudEZvbGQsIG9mZnNldCk7XG5cdFx0fVxuXHRcdFxuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZSB0aGUgaGVpZ2h0IG9mIGVhY2ggZm9sZCB0byBmaXQgaXRzIGNvbnRlbnQuXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gdXBkYXRlKCl7XG5cdFx0XHR2YXIgeSAgICAgID0gMDtcblx0XHRcdHZhciBoZWlnaHQgPSAwO1xuXHRcdFx0dmFyIGkgICAgICA9IDA7XG5cdFx0XHR2YXIgbCAgICAgID0gZm9sZHMubGVuZ3RoO1xuXHRcdFx0dmFyIHBhcmVudEZvbGQgPSBUSElTLnBhcmVudEZvbGQ7XG5cdFx0XHR2YXIgZm9sZCwgZGlmZjtcblx0XHRcdFxuXHRcdFx0Zm9yKDsgaSA8IGw7ICsraSl7XG5cdFx0XHRcdGZvbGQgICA9IGZvbGRzW2ldO1xuXHRcdFx0XHRmb2xkLnkgPSB5O1xuXHRcdFx0XHRmb2xkLmZpdCgpO1xuXHRcdFx0XHR5ICAgICAgKz0gZm9sZC5oZWlnaHQ7XG5cdFx0XHRcdGhlaWdodCArPSBmb2xkLmhlaWdodDtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0ZGlmZiA9IGhlaWdodCAtIF9oZWlnaHQ7XG5cdFx0XHRwYXJlbnRGb2xkXG5cdFx0XHRcdD8gKHBhcmVudEZvbGQub3BlbiAmJiBUSElTLnBhcmVudC51cGRhdGVGb2xkKHBhcmVudEZvbGQsIGRpZmYpKVxuXHRcdFx0XHQ6IGVkZ2VDaGVjayhkaWZmKTtcblx0XHRcdFxuXHRcdFx0VEhJUy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0fVxuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIFJlY2FsY3VsYXRlIHRoZSBib3VuZGFyaWVzIG9mIGFuIEFjY29yZGlvbiBhbmQgaXRzIGRlc2NlbmRhbnRzLlxuXHRcdCAqXG5cdFx0ICogVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIGlmIHRoZSB3aWR0aCBvZiBhIGNvbnRhaW5lciBjaGFuZ2VzLFxuXHRcdCAqIG9yIGEgZm9sZCdzIGNvbnRlbnRzIGhhdmUgcmVzaXplZCB1bmV4cGVjdGVkbHkgKHN1Y2ggYXMgd2hlbiBpbWFnZXMgbG9hZCkuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFsbG93U25hcCAtIFNuYXAgZm9sZHMgaW5zdGFudGx5IGludG8gcGxhY2Ugd2l0aG91dCB0cmFuc2l0aW9uaW5nXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcmVmcmVzaChhbGxvd1NuYXApe1xuXHRcdFx0dmFyIHNuYXAgPSBhbGxvd1NuYXAgPyBzbmFwQ2xhc3MgOiBmYWxzZTtcblx0XHRcdHNuYXAgJiYgZWxDbGFzc2VzLmFkZChzbmFwKTtcblx0XHRcdFxuXHRcdFx0VEhJUy51cGRhdGUoKTtcblx0XHRcdFRISVMuY2hpbGRBY2NvcmRpb25zICYmIFRISVMuY2hpbGRBY2NvcmRpb25zLmZvckVhY2goZnVuY3Rpb24oYSl7XG5cdFx0XHRcdGEucGFyZW50Rm9sZC5vcGVuXG5cdFx0XHRcdFx0PyBhLnJlZnJlc2goYWxsb3dTbmFwKVxuXHRcdFx0XHRcdDogKGEucGFyZW50Rm9sZC5uZWVkc1JlZnJlc2ggPSB0cnVlKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRzbmFwICYmIHNldFRpbWVvdXQoZnVuY3Rpb24oZSl7ZWxDbGFzc2VzLnJlbW92ZShzbmFwKX0sIDIwKTtcblx0XHR9XG5cdH1cblxuXHQvLyBJZiBJRThQUCBleGlzdHMsIGl0IG1lYW5zIHRoZSBhdXRob3Igd2FudHMvbmVlZHMgSUU4IHN1cHBvcnQuIFNlZSBhbHNvOiB0aW55dXJsLmNvbS9maXhJRTgtOVxuXHRpZihcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBJRThQUClcblx0XHRBY2NvcmRpb24gPSBJRThQUChBY2NvcmRpb24pLFxuXHRcdEZvbGQgICAgICA9IElFOFBQKEZvbGQpO1xuXG5cblxuXHQvKipcblx0ICogQWx0ZXIgdGhlIHJhdGUgYXQgd2hpY2ggc2NyZWVuLXJlc2l6ZSBldmVudHMgdXBkYXRlIGFjY29yZGlvbiB3aWR0aHMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSAtIFJhdGUgZXhwcmVzc2VkIGluIG1pbGxpc2Vjb25kc1xuXHQgKi9cblx0QWNjb3JkaW9uLnNldFJlc2l6ZVJhdGUgPSBmdW5jdGlvbihkZWxheSl7XG5cdFx0dmFyIGZuID0gZnVuY3Rpb24oZSl7XG5cdFx0XHRmb3IodmFyIGEsIGkgPSAwLCBsID0gYWNjb3JkaW9ucy5sZW5ndGg7IGkgPCBsOyArK2kpe1xuXHRcdFx0XHRhID0gYWNjb3JkaW9uc1tpXTtcblx0XHRcdFx0YS5wYXJlbnQgfHwgYS5kaXNhYmxlZCB8fCBhLnJlZnJlc2godHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRcblx0XHR2YXIgVEhJUyA9IEFjY29yZGlvbjtcblx0XHRUSElTLm9uUmVzaXplICYmIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIFRISVMub25SZXNpemUpO1xuXHRcdFxuXHRcdC8vIE1ha2Ugc3VyZSB3ZSB3ZXJlbid0IHBhc3NlZCBhbiBleHBsaWNpdCB2YWx1ZSBvZiBGQUxTRSwgb3IgYSBuZWdhdGl2ZSB2YWx1ZVxuXHRcdGlmKGZhbHNlICE9PSBkZWxheSAmJiAoZGVsYXkgPSArZGVsYXkgfHwgMCkgPj0gMCl7XG5cdFx0XHRUSElTLm9uUmVzaXplID0gZGVsYXkgPyBkZWJvdW5jZShmbiwgZGVsYXkpIDogZm47XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBUSElTLm9uUmVzaXplKTtcblx0XHRcdGlmKGRlbGF5KSBsYXN0UmVzaXplUmF0ZSA9IGRlbGF5O1xuXHRcdH1cblx0fVxuXHRcblx0XG5cdFxuXHQvKipcblx0ICogUmV0dXJuIHRoZSBjbG9zZXN0IChtb3N0IGRlZXBseS1uZXN0ZWQpIGFjY29yZGlvbiBlbmNsb3NpbmcgYW4gZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSBub2RlXG5cdCAqIEByZXR1cm4ge0FjY29yZGlvbn1cblx0ICovXG5cdEFjY29yZGlvbi5nZXRBY2NvcmRpb24gPSBmdW5jdGlvbihub2RlKXtcblx0XHR3aGlsZShub2RlKXtcblx0XHRcdGlmKFwiYWNjb3JkaW9uXCIgaW4gbm9kZSlcblx0XHRcdFx0cmV0dXJuIGFjY29yZGlvbnNbbm9kZS5hY2NvcmRpb25dO1xuXHRcdFx0XG5cdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuXHRcdFx0aWYoIW5vZGUgfHwgbm9kZS5ub2RlVHlwZSAhPT0gMSkgcmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cdFxuXHRcblx0LyoqXG5cdCAqIFJldHVybiB0aGUgY2xvc2VzdCAobW9zdCBkZWVwbHktbmVzdGVkKSBmb2xkIGVuY2xvc2luZyBhbiBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcblx0ICogQHJldHVybiB7Rm9sZH1cblx0ICovXG5cdEFjY29yZGlvbi5nZXRGb2xkID0gZnVuY3Rpb24obm9kZSl7XG5cdFx0d2hpbGUobm9kZSl7XG5cdFx0XHRpZihcImFjY29yZGlvbkZvbGRcIiBpbiBub2RlKVxuXHRcdFx0XHRyZXR1cm4gZm9sZHNbbm9kZS5hY2NvcmRpb25Gb2xkXTtcblx0XHRcdFxuXHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcblx0XHRcdGlmKCFub2RlIHx8IG5vZGUubm9kZVR5cGUgIT09IDEpIHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXHRcblxuXHRcblx0QWNjb3JkaW9uLnNldFJlc2l6ZVJhdGUoMjUpO1xuXHRcblx0XG5cdC8vIEJyb3dzZXIgZXhwb3J0XG5cdHdpbmRvdy5BY2NvcmRpb24gPSBBY2NvcmRpb247XG5cdFxuXHQvLyBDb21tb25KUy9Ob2RlLmpzXG5cdGlmKFwib2JqZWN0XCIgPT09IHR5cGVvZiBtb2R1bGUgJiYgXCJvYmplY3RcIiA9PT0gdHlwZW9mIG1vZHVsZS5leHBvcnRzKVxuXHRcdG1vZHVsZS5leHBvcnRzLkFjY29yZGlvbiA9IEFjY29yZGlvbjtcblx0XG5cdC8vIEFNRC9VTUQtbGlrZSBzeXN0ZW1zXG5cdHJldHVybiBBY2NvcmRpb247XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcnJheS5wcm90b3R5cGUuZmluZCA9IEFycmF5LnByb3RvdHlwZS5maW5kIHx8IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmQgY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cbiAgdmFyIGxpc3QgPSBPYmplY3QodGhpcyk7XG4gIC8vIE1ha2VzIHN1cmVzIGlzIGFsd2F5cyBoYXMgYW4gcG9zaXRpdmUgaW50ZWdlciBhcyBsZW5ndGguXG4gIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcbiAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZWxlbWVudCA9IGxpc3RbaV07XG4gICAgaWYgKCBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIGVsZW1lbnQsIGksIGxpc3QpICkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuICB9XG59O1xuIiwiLyogV2ViIEZvbnQgTG9hZGVyIHYxLjYuMjggLSAoYykgQWRvYmUgU3lzdGVtcywgR29vZ2xlLiBMaWNlbnNlOiBBcGFjaGUgMi4wICovKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYWEoYSxiLGMpe3JldHVybiBhLmNhbGwuYXBwbHkoYS5iaW5kLGFyZ3VtZW50cyl9ZnVuY3Rpb24gYmEoYSxiLGMpe2lmKCFhKXRocm93IEVycm9yKCk7aWYoMjxhcmd1bWVudHMubGVuZ3RoKXt2YXIgZD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMik7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtBcnJheS5wcm90b3R5cGUudW5zaGlmdC5hcHBseShjLGQpO3JldHVybiBhLmFwcGx5KGIsYyl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiBhLmFwcGx5KGIsYXJndW1lbnRzKX19ZnVuY3Rpb24gcChhLGIsYyl7cD1GdW5jdGlvbi5wcm90b3R5cGUuYmluZCYmLTEhPUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLnRvU3RyaW5nKCkuaW5kZXhPZihcIm5hdGl2ZSBjb2RlXCIpP2FhOmJhO3JldHVybiBwLmFwcGx5KG51bGwsYXJndW1lbnRzKX12YXIgcT1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4rbmV3IERhdGV9O2Z1bmN0aW9uIGNhKGEsYil7dGhpcy5hPWE7dGhpcy5vPWJ8fGE7dGhpcy5jPXRoaXMuby5kb2N1bWVudH12YXIgZGE9ISF3aW5kb3cuRm9udEZhY2U7ZnVuY3Rpb24gdChhLGIsYyxkKXtiPWEuYy5jcmVhdGVFbGVtZW50KGIpO2lmKGMpZm9yKHZhciBlIGluIGMpYy5oYXNPd25Qcm9wZXJ0eShlKSYmKFwic3R5bGVcIj09ZT9iLnN0eWxlLmNzc1RleHQ9Y1tlXTpiLnNldEF0dHJpYnV0ZShlLGNbZV0pKTtkJiZiLmFwcGVuZENoaWxkKGEuYy5jcmVhdGVUZXh0Tm9kZShkKSk7cmV0dXJuIGJ9ZnVuY3Rpb24gdShhLGIsYyl7YT1hLmMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYilbMF07YXx8KGE9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTthLmluc2VydEJlZm9yZShjLGEubGFzdENoaWxkKX1mdW5jdGlvbiB2KGEpe2EucGFyZW50Tm9kZSYmYS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEpfVxuZnVuY3Rpb24gdyhhLGIsYyl7Yj1ifHxbXTtjPWN8fFtdO2Zvcih2YXIgZD1hLmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pLGU9MDtlPGIubGVuZ3RoO2UrPTEpe2Zvcih2YXIgZj0hMSxnPTA7ZzxkLmxlbmd0aDtnKz0xKWlmKGJbZV09PT1kW2ddKXtmPSEwO2JyZWFrfWZ8fGQucHVzaChiW2VdKX1iPVtdO2ZvcihlPTA7ZTxkLmxlbmd0aDtlKz0xKXtmPSExO2ZvcihnPTA7ZzxjLmxlbmd0aDtnKz0xKWlmKGRbZV09PT1jW2ddKXtmPSEwO2JyZWFrfWZ8fGIucHVzaChkW2VdKX1hLmNsYXNzTmFtZT1iLmpvaW4oXCIgXCIpLnJlcGxhY2UoL1xccysvZyxcIiBcIikucmVwbGFjZSgvXlxccyt8XFxzKyQvLFwiXCIpfWZ1bmN0aW9uIHkoYSxiKXtmb3IodmFyIGM9YS5jbGFzc05hbWUuc3BsaXQoL1xccysvKSxkPTAsZT1jLmxlbmd0aDtkPGU7ZCsrKWlmKGNbZF09PWIpcmV0dXJuITA7cmV0dXJuITF9XG5mdW5jdGlvbiBlYShhKXtyZXR1cm4gYS5vLmxvY2F0aW9uLmhvc3RuYW1lfHxhLmEubG9jYXRpb24uaG9zdG5hbWV9ZnVuY3Rpb24geihhLGIsYyl7ZnVuY3Rpb24gZCgpe20mJmUmJmYmJihtKGcpLG09bnVsbCl9Yj10KGEsXCJsaW5rXCIse3JlbDpcInN0eWxlc2hlZXRcIixocmVmOmIsbWVkaWE6XCJhbGxcIn0pO3ZhciBlPSExLGY9ITAsZz1udWxsLG09Y3x8bnVsbDtkYT8oYi5vbmxvYWQ9ZnVuY3Rpb24oKXtlPSEwO2QoKX0sYi5vbmVycm9yPWZ1bmN0aW9uKCl7ZT0hMDtnPUVycm9yKFwiU3R5bGVzaGVldCBmYWlsZWQgdG8gbG9hZFwiKTtkKCl9KTpzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZT0hMDtkKCl9LDApO3UoYSxcImhlYWRcIixiKX1cbmZ1bmN0aW9uIEEoYSxiLGMsZCl7dmFyIGU9YS5jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtpZihlKXt2YXIgZj10KGEsXCJzY3JpcHRcIix7c3JjOmJ9KSxnPSExO2Yub25sb2FkPWYub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7Z3x8dGhpcy5yZWFkeVN0YXRlJiZcImxvYWRlZFwiIT10aGlzLnJlYWR5U3RhdGUmJlwiY29tcGxldGVcIiE9dGhpcy5yZWFkeVN0YXRlfHwoZz0hMCxjJiZjKG51bGwpLGYub25sb2FkPWYub25yZWFkeXN0YXRlY2hhbmdlPW51bGwsXCJIRUFEXCI9PWYucGFyZW50Tm9kZS50YWdOYW1lJiZlLnJlbW92ZUNoaWxkKGYpKX07ZS5hcHBlbmRDaGlsZChmKTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Z3x8KGc9ITAsYyYmYyhFcnJvcihcIlNjcmlwdCBsb2FkIHRpbWVvdXRcIikpKX0sZHx8NUUzKTtyZXR1cm4gZn1yZXR1cm4gbnVsbH07ZnVuY3Rpb24gQigpe3RoaXMuYT0wO3RoaXMuYz1udWxsfWZ1bmN0aW9uIEMoYSl7YS5hKys7cmV0dXJuIGZ1bmN0aW9uKCl7YS5hLS07RChhKX19ZnVuY3Rpb24gRShhLGIpe2EuYz1iO0QoYSl9ZnVuY3Rpb24gRChhKXswPT1hLmEmJmEuYyYmKGEuYygpLGEuYz1udWxsKX07ZnVuY3Rpb24gRihhKXt0aGlzLmE9YXx8XCItXCJ9Ri5wcm90b3R5cGUuYz1mdW5jdGlvbihhKXtmb3IodmFyIGI9W10sYz0wO2M8YXJndW1lbnRzLmxlbmd0aDtjKyspYi5wdXNoKGFyZ3VtZW50c1tjXS5yZXBsYWNlKC9bXFxXX10rL2csXCJcIikudG9Mb3dlckNhc2UoKSk7cmV0dXJuIGIuam9pbih0aGlzLmEpfTtmdW5jdGlvbiBHKGEsYil7dGhpcy5jPWE7dGhpcy5mPTQ7dGhpcy5hPVwiblwiO3ZhciBjPShifHxcIm40XCIpLm1hdGNoKC9eKFtuaW9dKShbMS05XSkkL2kpO2MmJih0aGlzLmE9Y1sxXSx0aGlzLmY9cGFyc2VJbnQoY1syXSwxMCkpfWZ1bmN0aW9uIGZhKGEpe3JldHVybiBIKGEpK1wiIFwiKyhhLmYrXCIwMFwiKStcIiAzMDBweCBcIitJKGEuYyl9ZnVuY3Rpb24gSShhKXt2YXIgYj1bXTthPWEuc3BsaXQoLyxcXHMqLyk7Zm9yKHZhciBjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPWFbY10ucmVwbGFjZSgvWydcIl0vZyxcIlwiKTstMSE9ZC5pbmRleE9mKFwiIFwiKXx8L15cXGQvLnRlc3QoZCk/Yi5wdXNoKFwiJ1wiK2QrXCInXCIpOmIucHVzaChkKX1yZXR1cm4gYi5qb2luKFwiLFwiKX1mdW5jdGlvbiBKKGEpe3JldHVybiBhLmErYS5mfWZ1bmN0aW9uIEgoYSl7dmFyIGI9XCJub3JtYWxcIjtcIm9cIj09PWEuYT9iPVwib2JsaXF1ZVwiOlwiaVwiPT09YS5hJiYoYj1cIml0YWxpY1wiKTtyZXR1cm4gYn1cbmZ1bmN0aW9uIGdhKGEpe3ZhciBiPTQsYz1cIm5cIixkPW51bGw7YSYmKChkPWEubWF0Y2goLyhub3JtYWx8b2JsaXF1ZXxpdGFsaWMpL2kpKSYmZFsxXSYmKGM9ZFsxXS5zdWJzdHIoMCwxKS50b0xvd2VyQ2FzZSgpKSwoZD1hLm1hdGNoKC8oWzEtOV0wMHxub3JtYWx8Ym9sZCkvaSkpJiZkWzFdJiYoL2JvbGQvaS50ZXN0KGRbMV0pP2I9NzovWzEtOV0wMC8udGVzdChkWzFdKSYmKGI9cGFyc2VJbnQoZFsxXS5zdWJzdHIoMCwxKSwxMCkpKSk7cmV0dXJuIGMrYn07ZnVuY3Rpb24gaGEoYSxiKXt0aGlzLmM9YTt0aGlzLmY9YS5vLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDt0aGlzLmg9Yjt0aGlzLmE9bmV3IEYoXCItXCIpO3RoaXMuaj0hMSE9PWIuZXZlbnRzO3RoaXMuZz0hMSE9PWIuY2xhc3Nlc31mdW5jdGlvbiBpYShhKXthLmcmJncoYS5mLFthLmEuYyhcIndmXCIsXCJsb2FkaW5nXCIpXSk7SyhhLFwibG9hZGluZ1wiKX1mdW5jdGlvbiBMKGEpe2lmKGEuZyl7dmFyIGI9eShhLmYsYS5hLmMoXCJ3ZlwiLFwiYWN0aXZlXCIpKSxjPVtdLGQ9W2EuYS5jKFwid2ZcIixcImxvYWRpbmdcIildO2J8fGMucHVzaChhLmEuYyhcIndmXCIsXCJpbmFjdGl2ZVwiKSk7dyhhLmYsYyxkKX1LKGEsXCJpbmFjdGl2ZVwiKX1mdW5jdGlvbiBLKGEsYixjKXtpZihhLmomJmEuaFtiXSlpZihjKWEuaFtiXShjLmMsSihjKSk7ZWxzZSBhLmhbYl0oKX07ZnVuY3Rpb24gamEoKXt0aGlzLmM9e319ZnVuY3Rpb24ga2EoYSxiLGMpe3ZhciBkPVtdLGU7Zm9yKGUgaW4gYilpZihiLmhhc093blByb3BlcnR5KGUpKXt2YXIgZj1hLmNbZV07ZiYmZC5wdXNoKGYoYltlXSxjKSl9cmV0dXJuIGR9O2Z1bmN0aW9uIE0oYSxiKXt0aGlzLmM9YTt0aGlzLmY9Yjt0aGlzLmE9dCh0aGlzLmMsXCJzcGFuXCIse1wiYXJpYS1oaWRkZW5cIjpcInRydWVcIn0sdGhpcy5mKX1mdW5jdGlvbiBOKGEpe3UoYS5jLFwiYm9keVwiLGEuYSl9ZnVuY3Rpb24gTyhhKXtyZXR1cm5cImRpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOi05OTk5cHg7bGVmdDotOTk5OXB4O2ZvbnQtc2l6ZTozMDBweDt3aWR0aDphdXRvO2hlaWdodDphdXRvO2xpbmUtaGVpZ2h0Om5vcm1hbDttYXJnaW46MDtwYWRkaW5nOjA7Zm9udC12YXJpYW50Om5vcm1hbDt3aGl0ZS1zcGFjZTpub3dyYXA7Zm9udC1mYW1pbHk6XCIrSShhLmMpK1wiO1wiKyhcImZvbnQtc3R5bGU6XCIrSChhKStcIjtmb250LXdlaWdodDpcIisoYS5mK1wiMDBcIikrXCI7XCIpfTtmdW5jdGlvbiBQKGEsYixjLGQsZSxmKXt0aGlzLmc9YTt0aGlzLmo9Yjt0aGlzLmE9ZDt0aGlzLmM9Yzt0aGlzLmY9ZXx8M0UzO3RoaXMuaD1mfHx2b2lkIDB9UC5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmMuby5kb2N1bWVudCxiPXRoaXMsYz1xKCksZD1uZXcgUHJvbWlzZShmdW5jdGlvbihkLGUpe2Z1bmN0aW9uIGYoKXtxKCktYz49Yi5mP2UoKTphLmZvbnRzLmxvYWQoZmEoYi5hKSxiLmgpLnRoZW4oZnVuY3Rpb24oYSl7MTw9YS5sZW5ndGg/ZCgpOnNldFRpbWVvdXQoZiwyNSl9LGZ1bmN0aW9uKCl7ZSgpfSl9ZigpfSksZT1udWxsLGY9bmV3IFByb21pc2UoZnVuY3Rpb24oYSxkKXtlPXNldFRpbWVvdXQoZCxiLmYpfSk7UHJvbWlzZS5yYWNlKFtmLGRdKS50aGVuKGZ1bmN0aW9uKCl7ZSYmKGNsZWFyVGltZW91dChlKSxlPW51bGwpO2IuZyhiLmEpfSxmdW5jdGlvbigpe2IuaihiLmEpfSl9O2Z1bmN0aW9uIFEoYSxiLGMsZCxlLGYsZyl7dGhpcy52PWE7dGhpcy5CPWI7dGhpcy5jPWM7dGhpcy5hPWQ7dGhpcy5zPWd8fFwiQkVTYnN3eVwiO3RoaXMuZj17fTt0aGlzLnc9ZXx8M0UzO3RoaXMudT1mfHxudWxsO3RoaXMubT10aGlzLmo9dGhpcy5oPXRoaXMuZz1udWxsO3RoaXMuZz1uZXcgTSh0aGlzLmMsdGhpcy5zKTt0aGlzLmg9bmV3IE0odGhpcy5jLHRoaXMucyk7dGhpcy5qPW5ldyBNKHRoaXMuYyx0aGlzLnMpO3RoaXMubT1uZXcgTSh0aGlzLmMsdGhpcy5zKTthPW5ldyBHKHRoaXMuYS5jK1wiLHNlcmlmXCIsSih0aGlzLmEpKTthPU8oYSk7dGhpcy5nLmEuc3R5bGUuY3NzVGV4dD1hO2E9bmV3IEcodGhpcy5hLmMrXCIsc2Fucy1zZXJpZlwiLEoodGhpcy5hKSk7YT1PKGEpO3RoaXMuaC5hLnN0eWxlLmNzc1RleHQ9YTthPW5ldyBHKFwic2VyaWZcIixKKHRoaXMuYSkpO2E9TyhhKTt0aGlzLmouYS5zdHlsZS5jc3NUZXh0PWE7YT1uZXcgRyhcInNhbnMtc2VyaWZcIixKKHRoaXMuYSkpO2E9XG5PKGEpO3RoaXMubS5hLnN0eWxlLmNzc1RleHQ9YTtOKHRoaXMuZyk7Tih0aGlzLmgpO04odGhpcy5qKTtOKHRoaXMubSl9dmFyIFI9e0Q6XCJzZXJpZlwiLEM6XCJzYW5zLXNlcmlmXCJ9LFM9bnVsbDtmdW5jdGlvbiBUKCl7aWYobnVsbD09PVMpe3ZhciBhPS9BcHBsZVdlYktpdFxcLyhbMC05XSspKD86XFwuKFswLTldKykpLy5leGVjKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtTPSEhYSYmKDUzNj5wYXJzZUludChhWzFdLDEwKXx8NTM2PT09cGFyc2VJbnQoYVsxXSwxMCkmJjExPj1wYXJzZUludChhWzJdLDEwKSl9cmV0dXJuIFN9US5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oKXt0aGlzLmYuc2VyaWY9dGhpcy5qLmEub2Zmc2V0V2lkdGg7dGhpcy5mW1wic2Fucy1zZXJpZlwiXT10aGlzLm0uYS5vZmZzZXRXaWR0aDt0aGlzLkE9cSgpO1UodGhpcyl9O1xuZnVuY3Rpb24gbGEoYSxiLGMpe2Zvcih2YXIgZCBpbiBSKWlmKFIuaGFzT3duUHJvcGVydHkoZCkmJmI9PT1hLmZbUltkXV0mJmM9PT1hLmZbUltkXV0pcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gVShhKXt2YXIgYj1hLmcuYS5vZmZzZXRXaWR0aCxjPWEuaC5hLm9mZnNldFdpZHRoLGQ7KGQ9Yj09PWEuZi5zZXJpZiYmYz09PWEuZltcInNhbnMtc2VyaWZcIl0pfHwoZD1UKCkmJmxhKGEsYixjKSk7ZD9xKCktYS5BPj1hLnc/VCgpJiZsYShhLGIsYykmJihudWxsPT09YS51fHxhLnUuaGFzT3duUHJvcGVydHkoYS5hLmMpKT9WKGEsYS52KTpWKGEsYS5CKTptYShhKTpWKGEsYS52KX1mdW5jdGlvbiBtYShhKXtzZXRUaW1lb3V0KHAoZnVuY3Rpb24oKXtVKHRoaXMpfSxhKSw1MCl9ZnVuY3Rpb24gVihhLGIpe3NldFRpbWVvdXQocChmdW5jdGlvbigpe3YodGhpcy5nLmEpO3YodGhpcy5oLmEpO3YodGhpcy5qLmEpO3YodGhpcy5tLmEpO2IodGhpcy5hKX0sYSksMCl9O2Z1bmN0aW9uIFcoYSxiLGMpe3RoaXMuYz1hO3RoaXMuYT1iO3RoaXMuZj0wO3RoaXMubT10aGlzLmo9ITE7dGhpcy5zPWN9dmFyIFg9bnVsbDtXLnByb3RvdHlwZS5nPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuYTtiLmcmJncoYi5mLFtiLmEuYyhcIndmXCIsYS5jLEooYSkudG9TdHJpbmcoKSxcImFjdGl2ZVwiKV0sW2IuYS5jKFwid2ZcIixhLmMsSihhKS50b1N0cmluZygpLFwibG9hZGluZ1wiKSxiLmEuYyhcIndmXCIsYS5jLEooYSkudG9TdHJpbmcoKSxcImluYWN0aXZlXCIpXSk7SyhiLFwiZm9udGFjdGl2ZVwiLGEpO3RoaXMubT0hMDtuYSh0aGlzKX07XG5XLnByb3RvdHlwZS5oPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuYTtpZihiLmcpe3ZhciBjPXkoYi5mLGIuYS5jKFwid2ZcIixhLmMsSihhKS50b1N0cmluZygpLFwiYWN0aXZlXCIpKSxkPVtdLGU9W2IuYS5jKFwid2ZcIixhLmMsSihhKS50b1N0cmluZygpLFwibG9hZGluZ1wiKV07Y3x8ZC5wdXNoKGIuYS5jKFwid2ZcIixhLmMsSihhKS50b1N0cmluZygpLFwiaW5hY3RpdmVcIikpO3coYi5mLGQsZSl9SyhiLFwiZm9udGluYWN0aXZlXCIsYSk7bmEodGhpcyl9O2Z1bmN0aW9uIG5hKGEpezA9PS0tYS5mJiZhLmomJihhLm0/KGE9YS5hLGEuZyYmdyhhLmYsW2EuYS5jKFwid2ZcIixcImFjdGl2ZVwiKV0sW2EuYS5jKFwid2ZcIixcImxvYWRpbmdcIiksYS5hLmMoXCJ3ZlwiLFwiaW5hY3RpdmVcIildKSxLKGEsXCJhY3RpdmVcIikpOkwoYS5hKSl9O2Z1bmN0aW9uIG9hKGEpe3RoaXMuaj1hO3RoaXMuYT1uZXcgamE7dGhpcy5oPTA7dGhpcy5mPXRoaXMuZz0hMH1vYS5wcm90b3R5cGUubG9hZD1mdW5jdGlvbihhKXt0aGlzLmM9bmV3IGNhKHRoaXMuaixhLmNvbnRleHR8fHRoaXMuaik7dGhpcy5nPSExIT09YS5ldmVudHM7dGhpcy5mPSExIT09YS5jbGFzc2VzO3BhKHRoaXMsbmV3IGhhKHRoaXMuYyxhKSxhKX07XG5mdW5jdGlvbiBxYShhLGIsYyxkLGUpe3ZhciBmPTA9PS0tYS5oOyhhLmZ8fGEuZykmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXt2YXIgYT1lfHxudWxsLG09ZHx8bnVsbHx8e307aWYoMD09PWMubGVuZ3RoJiZmKUwoYi5hKTtlbHNle2IuZis9Yy5sZW5ndGg7ZiYmKGIuaj1mKTt2YXIgaCxsPVtdO2ZvcihoPTA7aDxjLmxlbmd0aDtoKyspe3ZhciBrPWNbaF0sbj1tW2suY10scj1iLmEseD1rO3IuZyYmdyhyLmYsW3IuYS5jKFwid2ZcIix4LmMsSih4KS50b1N0cmluZygpLFwibG9hZGluZ1wiKV0pO0socixcImZvbnRsb2FkaW5nXCIseCk7cj1udWxsO2lmKG51bGw9PT1YKWlmKHdpbmRvdy5Gb250RmFjZSl7dmFyIHg9L0dlY2tvLipGaXJlZm94XFwvKFxcZCspLy5leGVjKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSx4YT0vT1MgWC4qVmVyc2lvblxcLzEwXFwuLipTYWZhcmkvLmV4ZWMod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpJiYvQXBwbGUvLmV4ZWMod2luZG93Lm5hdmlnYXRvci52ZW5kb3IpO1xuWD14PzQyPHBhcnNlSW50KHhbMV0sMTApOnhhPyExOiEwfWVsc2UgWD0hMTtYP3I9bmV3IFAocChiLmcsYikscChiLmgsYiksYi5jLGssYi5zLG4pOnI9bmV3IFEocChiLmcsYikscChiLmgsYiksYi5jLGssYi5zLGEsbik7bC5wdXNoKHIpfWZvcihoPTA7aDxsLmxlbmd0aDtoKyspbFtoXS5zdGFydCgpfX0sMCl9ZnVuY3Rpb24gcGEoYSxiLGMpe3ZhciBkPVtdLGU9Yy50aW1lb3V0O2lhKGIpO3ZhciBkPWthKGEuYSxjLGEuYyksZj1uZXcgVyhhLmMsYixlKTthLmg9ZC5sZW5ndGg7Yj0wO2ZvcihjPWQubGVuZ3RoO2I8YztiKyspZFtiXS5sb2FkKGZ1bmN0aW9uKGIsZCxjKXtxYShhLGYsYixkLGMpfSl9O2Z1bmN0aW9uIHJhKGEsYil7dGhpcy5jPWE7dGhpcy5hPWJ9XG5yYS5wcm90b3R5cGUubG9hZD1mdW5jdGlvbihhKXtmdW5jdGlvbiBiKCl7aWYoZltcIl9fbXRpX2ZudExzdFwiK2RdKXt2YXIgYz1mW1wiX19tdGlfZm50THN0XCIrZF0oKSxlPVtdLGg7aWYoYylmb3IodmFyIGw9MDtsPGMubGVuZ3RoO2wrKyl7dmFyIGs9Y1tsXS5mb250ZmFtaWx5O3ZvaWQgMCE9Y1tsXS5mb250U3R5bGUmJnZvaWQgMCE9Y1tsXS5mb250V2VpZ2h0PyhoPWNbbF0uZm9udFN0eWxlK2NbbF0uZm9udFdlaWdodCxlLnB1c2gobmV3IEcoayxoKSkpOmUucHVzaChuZXcgRyhrKSl9YShlKX1lbHNlIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtiKCl9LDUwKX12YXIgYz10aGlzLGQ9Yy5hLnByb2plY3RJZCxlPWMuYS52ZXJzaW9uO2lmKGQpe3ZhciBmPWMuYy5vO0EodGhpcy5jLChjLmEuYXBpfHxcImh0dHBzOi8vZmFzdC5mb250cy5uZXQvanNhcGlcIikrXCIvXCIrZCtcIi5qc1wiKyhlP1wiP3Y9XCIrZTpcIlwiKSxmdW5jdGlvbihlKXtlP2EoW10pOihmW1wiX19Nb25vdHlwZUNvbmZpZ3VyYXRpb25fX1wiK1xuZF09ZnVuY3Rpb24oKXtyZXR1cm4gYy5hfSxiKCkpfSkuaWQ9XCJfX01vbm90eXBlQVBJU2NyaXB0X19cIitkfWVsc2UgYShbXSl9O2Z1bmN0aW9uIHNhKGEsYil7dGhpcy5jPWE7dGhpcy5hPWJ9c2EucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYSl7dmFyIGIsYyxkPXRoaXMuYS51cmxzfHxbXSxlPXRoaXMuYS5mYW1pbGllc3x8W10sZj10aGlzLmEudGVzdFN0cmluZ3N8fHt9LGc9bmV3IEI7Yj0wO2ZvcihjPWQubGVuZ3RoO2I8YztiKyspeih0aGlzLmMsZFtiXSxDKGcpKTt2YXIgbT1bXTtiPTA7Zm9yKGM9ZS5sZW5ndGg7YjxjO2IrKylpZihkPWVbYl0uc3BsaXQoXCI6XCIpLGRbMV0pZm9yKHZhciBoPWRbMV0uc3BsaXQoXCIsXCIpLGw9MDtsPGgubGVuZ3RoO2wrPTEpbS5wdXNoKG5ldyBHKGRbMF0saFtsXSkpO2Vsc2UgbS5wdXNoKG5ldyBHKGRbMF0pKTtFKGcsZnVuY3Rpb24oKXthKG0sZil9KX07ZnVuY3Rpb24gdGEoYSxiKXthP3RoaXMuYz1hOnRoaXMuYz11YTt0aGlzLmE9W107dGhpcy5mPVtdO3RoaXMuZz1ifHxcIlwifXZhciB1YT1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzXCI7ZnVuY3Rpb24gdmEoYSxiKXtmb3IodmFyIGM9Yi5sZW5ndGgsZD0wO2Q8YztkKyspe3ZhciBlPWJbZF0uc3BsaXQoXCI6XCIpOzM9PWUubGVuZ3RoJiZhLmYucHVzaChlLnBvcCgpKTt2YXIgZj1cIlwiOzI9PWUubGVuZ3RoJiZcIlwiIT1lWzFdJiYoZj1cIjpcIik7YS5hLnB1c2goZS5qb2luKGYpKX19XG5mdW5jdGlvbiB3YShhKXtpZigwPT1hLmEubGVuZ3RoKXRocm93IEVycm9yKFwiTm8gZm9udHMgdG8gbG9hZCFcIik7aWYoLTEhPWEuYy5pbmRleE9mKFwia2l0PVwiKSlyZXR1cm4gYS5jO2Zvcih2YXIgYj1hLmEubGVuZ3RoLGM9W10sZD0wO2Q8YjtkKyspYy5wdXNoKGEuYVtkXS5yZXBsYWNlKC8gL2csXCIrXCIpKTtiPWEuYytcIj9mYW1pbHk9XCIrYy5qb2luKFwiJTdDXCIpOzA8YS5mLmxlbmd0aCYmKGIrPVwiJnN1YnNldD1cIithLmYuam9pbihcIixcIikpOzA8YS5nLmxlbmd0aCYmKGIrPVwiJnRleHQ9XCIrZW5jb2RlVVJJQ29tcG9uZW50KGEuZykpO3JldHVybiBifTtmdW5jdGlvbiB5YShhKXt0aGlzLmY9YTt0aGlzLmE9W107dGhpcy5jPXt9fVxudmFyIHphPXtsYXRpbjpcIkJFU2Jzd3lcIixcImxhdGluLWV4dFwiOlwiXFx1MDBlN1xcdTAwZjZcXHUwMGZjXFx1MDExZlxcdTAxNWZcIixjeXJpbGxpYzpcIlxcdTA0MzlcXHUwNDRmXFx1MDQxNlwiLGdyZWVrOlwiXFx1MDNiMVxcdTAzYjJcXHUwM2EzXCIsa2htZXI6XCJcXHUxNzgwXFx1MTc4MVxcdTE3ODJcIixIYW51bWFuOlwiXFx1MTc4MFxcdTE3ODFcXHUxNzgyXCJ9LEFhPXt0aGluOlwiMVwiLGV4dHJhbGlnaHQ6XCIyXCIsXCJleHRyYS1saWdodFwiOlwiMlwiLHVsdHJhbGlnaHQ6XCIyXCIsXCJ1bHRyYS1saWdodFwiOlwiMlwiLGxpZ2h0OlwiM1wiLHJlZ3VsYXI6XCI0XCIsYm9vazpcIjRcIixtZWRpdW06XCI1XCIsXCJzZW1pLWJvbGRcIjpcIjZcIixzZW1pYm9sZDpcIjZcIixcImRlbWktYm9sZFwiOlwiNlwiLGRlbWlib2xkOlwiNlwiLGJvbGQ6XCI3XCIsXCJleHRyYS1ib2xkXCI6XCI4XCIsZXh0cmFib2xkOlwiOFwiLFwidWx0cmEtYm9sZFwiOlwiOFwiLHVsdHJhYm9sZDpcIjhcIixibGFjazpcIjlcIixoZWF2eTpcIjlcIixsOlwiM1wiLHI6XCI0XCIsYjpcIjdcIn0sQmE9e2k6XCJpXCIsaXRhbGljOlwiaVwiLG46XCJuXCIsbm9ybWFsOlwiblwifSxcbkNhPS9eKHRoaW58KD86KD86ZXh0cmF8dWx0cmEpLT8pP2xpZ2h0fHJlZ3VsYXJ8Ym9va3xtZWRpdW18KD86KD86c2VtaXxkZW1pfGV4dHJhfHVsdHJhKS0/KT9ib2xkfGJsYWNrfGhlYXZ5fGx8cnxifFsxLTldMDApPyhufGl8bm9ybWFsfGl0YWxpYyk/JC87XG5mdW5jdGlvbiBEYShhKXtmb3IodmFyIGI9YS5mLmxlbmd0aCxjPTA7YzxiO2MrKyl7dmFyIGQ9YS5mW2NdLnNwbGl0KFwiOlwiKSxlPWRbMF0ucmVwbGFjZSgvXFwrL2csXCIgXCIpLGY9W1wibjRcIl07aWYoMjw9ZC5sZW5ndGgpe3ZhciBnO3ZhciBtPWRbMV07Zz1bXTtpZihtKWZvcih2YXIgbT1tLnNwbGl0KFwiLFwiKSxoPW0ubGVuZ3RoLGw9MDtsPGg7bCsrKXt2YXIgaztrPW1bbF07aWYoay5tYXRjaCgvXltcXHctXSskLykpe3ZhciBuPUNhLmV4ZWMoay50b0xvd2VyQ2FzZSgpKTtpZihudWxsPT1uKWs9XCJcIjtlbHNle2s9blsyXTtrPW51bGw9PWt8fFwiXCI9PWs/XCJuXCI6QmFba107bj1uWzFdO2lmKG51bGw9PW58fFwiXCI9PW4pbj1cIjRcIjtlbHNlIHZhciByPUFhW25dLG49cj9yOmlzTmFOKG4pP1wiNFwiOm4uc3Vic3RyKDAsMSk7az1bayxuXS5qb2luKFwiXCIpfX1lbHNlIGs9XCJcIjtrJiZnLnB1c2goayl9MDxnLmxlbmd0aCYmKGY9Zyk7Mz09ZC5sZW5ndGgmJihkPWRbMl0sZz1bXSxkPWQ/ZC5zcGxpdChcIixcIik6XG5nLDA8ZC5sZW5ndGgmJihkPXphW2RbMF1dKSYmKGEuY1tlXT1kKSl9YS5jW2VdfHwoZD16YVtlXSkmJihhLmNbZV09ZCk7Zm9yKGQ9MDtkPGYubGVuZ3RoO2QrPTEpYS5hLnB1c2gobmV3IEcoZSxmW2RdKSl9fTtmdW5jdGlvbiBFYShhLGIpe3RoaXMuYz1hO3RoaXMuYT1ifXZhciBGYT17QXJpbW86ITAsQ291c2luZTohMCxUaW5vczohMH07RWEucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYSl7dmFyIGI9bmV3IEIsYz10aGlzLmMsZD1uZXcgdGEodGhpcy5hLmFwaSx0aGlzLmEudGV4dCksZT10aGlzLmEuZmFtaWxpZXM7dmEoZCxlKTt2YXIgZj1uZXcgeWEoZSk7RGEoZik7eihjLHdhKGQpLEMoYikpO0UoYixmdW5jdGlvbigpe2EoZi5hLGYuYyxGYSl9KX07ZnVuY3Rpb24gR2EoYSxiKXt0aGlzLmM9YTt0aGlzLmE9Yn1HYS5wcm90b3R5cGUubG9hZD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmEuaWQsYz10aGlzLmMubztiP0EodGhpcy5jLCh0aGlzLmEuYXBpfHxcImh0dHBzOi8vdXNlLnR5cGVraXQubmV0XCIpK1wiL1wiK2IrXCIuanNcIixmdW5jdGlvbihiKXtpZihiKWEoW10pO2Vsc2UgaWYoYy5UeXBla2l0JiZjLlR5cGVraXQuY29uZmlnJiZjLlR5cGVraXQuY29uZmlnLmZuKXtiPWMuVHlwZWtpdC5jb25maWcuZm47Zm9yKHZhciBlPVtdLGY9MDtmPGIubGVuZ3RoO2YrPTIpZm9yKHZhciBnPWJbZl0sbT1iW2YrMV0saD0wO2g8bS5sZW5ndGg7aCsrKWUucHVzaChuZXcgRyhnLG1baF0pKTt0cnl7Yy5UeXBla2l0LmxvYWQoe2V2ZW50czohMSxjbGFzc2VzOiExLGFzeW5jOiEwfSl9Y2F0Y2gobCl7fWEoZSl9fSwyRTMpOmEoW10pfTtmdW5jdGlvbiBIYShhLGIpe3RoaXMuYz1hO3RoaXMuZj1iO3RoaXMuYT1bXX1IYS5wcm90b3R5cGUubG9hZD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmYuaWQsYz10aGlzLmMubyxkPXRoaXM7Yj8oYy5fX3dlYmZvbnRmb250ZGVja21vZHVsZV9ffHwoYy5fX3dlYmZvbnRmb250ZGVja21vZHVsZV9fPXt9KSxjLl9fd2ViZm9udGZvbnRkZWNrbW9kdWxlX19bYl09ZnVuY3Rpb24oYixjKXtmb3IodmFyIGc9MCxtPWMuZm9udHMubGVuZ3RoO2c8bTsrK2cpe3ZhciBoPWMuZm9udHNbZ107ZC5hLnB1c2gobmV3IEcoaC5uYW1lLGdhKFwiZm9udC13ZWlnaHQ6XCIraC53ZWlnaHQrXCI7Zm9udC1zdHlsZTpcIitoLnN0eWxlKSkpfWEoZC5hKX0sQSh0aGlzLmMsKHRoaXMuZi5hcGl8fFwiaHR0cHM6Ly9mLmZvbnRkZWNrLmNvbS9zL2Nzcy9qcy9cIikrZWEodGhpcy5jKStcIi9cIitiK1wiLmpzXCIsZnVuY3Rpb24oYil7YiYmYShbXSl9KSk6YShbXSl9O3ZhciBZPW5ldyBvYSh3aW5kb3cpO1kuYS5jLmN1c3RvbT1mdW5jdGlvbihhLGIpe3JldHVybiBuZXcgc2EoYixhKX07WS5hLmMuZm9udGRlY2s9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbmV3IEhhKGIsYSl9O1kuYS5jLm1vbm90eXBlPWZ1bmN0aW9uKGEsYil7cmV0dXJuIG5ldyByYShiLGEpfTtZLmEuYy50eXBla2l0PWZ1bmN0aW9uKGEsYil7cmV0dXJuIG5ldyBHYShiLGEpfTtZLmEuYy5nb29nbGU9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbmV3IEVhKGIsYSl9O3ZhciBaPXtsb2FkOnAoWS5sb2FkLFkpfTtcImZ1bmN0aW9uXCI9PT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiBafSk6XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPVo6KHdpbmRvdy5XZWJGb250PVosd2luZG93LldlYkZvbnRDb25maWcmJlkubG9hZCh3aW5kb3cuV2ViRm9udENvbmZpZykpO30oKSk7XG4iXSwicHJlRXhpc3RpbmdDb21tZW50IjoiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWljbTkzYzJWeUxYQmhZMnN2WDNCeVpXeDFaR1V1YW5NaUxDSmZZWE56WlhSekwycHpMMkZ3Y0M1cWN5SXNJbDloYzNObGRITXZhbk12WkdWbVlYVnNkQzloWTJOdmNtUnBiMjR1YW5NaUxDSmZZWE56WlhSekwycHpMMlJsWm1GMWJIUXZiV1Z1ZFM1cWN5SXNJbDloYzNObGRITXZhbk12WkdWbVlYVnNkQzl0YjNacGJtY3RabTl5YlMxc1lXSmxiSE11YW5NaUxDSmZZWE56WlhSekwycHpMMlJsWm1GMWJIUXZjMjlqYVdGc0xtcHpJaXdpWDJGemMyVjBjeTlxY3k5a1pXWmhkV3gwTDNkbFltWnZiblF0Ykc5aFpHVnlMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMkZqWTI5eVpHbHZiaTl6Y21NdllXTmpiM0prYVc5dUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwycHpjRzlzZVdacGJHd3RZWEp5WVhrdWNISnZkRzkwZVhCbExtWnBibVF2Wm1sdVpDNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OTNaV0ptYjI1MGJHOWhaR1Z5TDNkbFltWnZiblJzYjJGa1pYSXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN096dEJRMGRCT3p0QlFVZEJPenRCUVVkQk96dEJRVWRCT3p0QlFVZEJPenM3TzBGQlprRXNUVUZCVFN4RFFVRkRMRTlCUVZBc1IwRkJhVUlzVDBGQmFrSXNReXhEUVVWQk8wRkJaMEpCTzBGQlEwRTdPenM3TzBGRGJrSkJPenM3TzBGQlJVRTdRVUZGUVN4SlFVRkpMRU5CUVVNc1EwRkJReXhsUVVGRUxFTkJRVVFzUTBGQmJVSXNUVUZCYmtJc1IwRkJORUlzUTBGQmFFTXNSVUZCYlVNN1FVRkZMMElzUlVGQlFTeERRVUZETEVOQlFVTXNaVUZCUkN4RFFVRkVMRU5CUVcxQ0xFbEJRVzVDTEVOQlFYZENMRlZCUVZNc1EwRkJWQ3hGUVVGWkxFVkJRVm9zUlVGQlowSTdRVUZEY0VNc1NVRkJRU3hQUVVGUExFTkJRVU1zUjBGQlVpeERRVUZaTEdkQ1FVRmFPMEZCUTBFc1VVRkJTU3hUUVVGS0xFTkJRV01zUlVGQlpDeEZRVUZyUWp0QlFVTmtMRTFCUVVFc1VVRkJVU3hGUVVGRkxHdENRVUZUTEUxQlFWUXNSVUZCWjBJN1FVRkRkRUlzVVVGQlFTeE5RVUZOTEVOQlFVTXNVMEZCVUN4RFFVRnBRaXhMUVVGcVFpeERRVUYxUWl4UFFVRjJRaXhEUVVFclFpeFZRVUZCTEVsQlFVa3NSVUZCU1R0QlFVTnVReXhqUVVGSExFbEJRVWtzUzBGQlN5eE5RVUZhTEVWQlEwRXNTVUZCU1N4RFFVRkRMRWxCUVV3c1IwRkJXU3hMUVVGYU8wRkJRMGdzVTBGSVJEdEJRVWxJTzBGQlRtRXNTMEZCYkVJN1FVRlJTQ3hIUVZaRU8wRkJWMGc3T3pzN08wRkRha0pFTEVsQlFVMHNTMEZCU3l4SFFVRkhMRU5CUVVNc1EwRkJReXhOUVVGRUxFTkJRV1k3UVVGQlFTeEpRVU5KTEZWQlFWVXNSMEZCUnl4RFFVRkRMRU5CUVVNc2EwSkJRVVFzUTBGRWJFSTdRVUZCUVN4SlFVVkpMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU1zWVVGQlJDeERRVVppTzBGQlFVRXNTVUZIU1N4VFFVRlRMRWRCUVVjc1EwRkJReXhEUVVGRExHbENRVUZFTEVOQlNHcENPMEZCUVVFc1NVRkpTU3hUUVVGVExFZEJRVWNzUTBGQlF5eERRVUZETEdGQlFVUXNRMEZLYWtJN1FVRkJRU3hKUVV0SkxGTkJRVk1zUjBGQlJ5eERRVUZETEVOQlFVTXNZVUZCUkN4RFFVeHFRanRCUVVGQkxFbEJUVWtzWlVGQlpTeEhRVUZITEdkQ1FVNTBRanRCUVVGQkxFbEJUMGtzVjBGQlZ5eEhRVUZITEZkQlVHeENMRU1zUTBGVFFUczdRVUZEUVN4SlFVRk5MRWxCUVVrc1IwRkJSeXhQUVVGUExFTkJRVU1zYVVOQlFVUXNRMEZCY0VJc1F5eERRVVZCT3pzN1FVRkRRU3hWUVVGVkxFTkJRVU1zUzBGQldDeERRVUZwUWl4WlFVRlhPMEZCUTNoQ0xFMUJRVWtzUzBGQlN5eERRVUZETEZGQlFVNHNRMEZCWlN4bFFVRm1MRU5CUVVvc1JVRkJjVU03UVVGRGFrTXNTVUZCUVN4TFFVRkxMRU5CUVVNc1YwRkJUaXhEUVVGclFpeGxRVUZzUWp0QlFVTklMRWRCUmtRc1RVRkZUenRCUVVOSUxFbEJRVUVzUzBGQlN5eERRVUZETEZGQlFVNHNRMEZCWlN4bFFVRm1PMEZCUTBnN1FVRkRTaXhEUVU1RUxFVXNRMEZSUVRzN1FVRkRRU3hUUVVGVExFTkJRVU1zUzBGQlZpeERRVUZuUWl4VlFVRlRMRU5CUVZRc1JVRkJXVHRCUVVONFFpeEZRVUZCTEV0QlFVc3NRMEZCUXl4WFFVRk9MRU5CUVd0Q0xHVkJRV3hDTzBGQlEwRXNSVUZCUVN4VFFVRlRMRU5CUVVNc1NVRkJWaXhEUVVGbExGTkJRV1lzUlVGQk1FSXNTMEZCTVVJN1FVRkRRU3hGUVVGQkxGTkJRVk1zUTBGQlF5eFhRVUZXTEVOQlFYTkNMRmRCUVhSQ08wRkJRMEVzUlVGQlFTeERRVUZETEVOQlFVTXNTVUZCUkN4RFFVRkVMRU5CUVZFc1VVRkJVaXhEUVVGcFFpeFhRVUZxUWp0QlFVTklMRU5CVEVRc1JTeERRVTlCT3p0QlFVTkJMRXRCUVVzc1EwRkJReXhMUVVGT0xFTkJRVmtzV1VGQlZ6dEJRVU51UWl4TlFVRkpMRXRCUVVzc1EwRkJReXhSUVVGT0xFTkJRV1VzWlVGQlppeERRVUZLTEVWQlFYRkRPMEZCUTJwRExFbEJRVUVzUzBGQlN5eERRVUZETEZkQlFVNHNRMEZCYTBJc1pVRkJiRUk3UVVGRFFTeEpRVUZCTEZOQlFWTXNRMEZCUXl4SlFVRldMRU5CUVdVc1UwRkJaaXhGUVVFd1FpeExRVUV4UWp0QlFVTklMRWRCU0VRc1RVRkhUenRCUVVOSUxFbEJRVUVzUzBGQlN5eERRVUZETEZGQlFVNHNRMEZCWlN4bFFVRm1PMEZCUTBnN1FVRkRTaXhEUVZCRUxFVXNRMEZWUVRzN1FVRkRRU3hKUVVGTkxFOUJRVThzUjBGQlJ5eERRVUZETEVOQlFVTXNVMEZCUkN4RFFVRnFRanRCUVVGQkxFbEJRMGtzVDBGQlR5eEhRVUZITEVOQlFVTXNRMEZCUXl4TlFVRkVMRU5CUkdZN1FVRkJRU3hKUVVWSkxGZEJRVmNzUjBGQlJ5eFhRVVpzUWp0QlFVRkJMRWxCUjBrc1IwRkJSeXhIUVVGSExFOUJRVThzUTBGQlF5eE5RVUZTTEVkQlFXbENMRWRCUVdwQ0xFZEJRWFZDTEVOQlNHcERPMEZCUzBFc1QwRkJUeXhEUVVGRExFMUJRVklzUTBGQlpTeFpRVUZYTzBGQlEzUkNMRTFCUVVrc1QwRkJUeXhEUVVGRExGTkJRVklzVFVGQmRVSXNSMEZCTTBJc1JVRkJaME03UVVGRE5VSXNTVUZCUVN4UFFVRlBMRU5CUVVNc1VVRkJVaXhEUVVGcFFpeFhRVUZxUWp0QlFVTklMRWRCUmtRc1RVRkZUenRCUVVOSUxFbEJRVUVzVDBGQlR5eERRVUZETEZkQlFWSXNRMEZCYjBJc1YwRkJjRUk3UVVGRFNEdEJRVU5LTEVOQlRrUTdPenM3TzBGRE9VTkJMRWxCUVVrc1EwRkJReXhEUVVGRExHMUNRVUZFTEVOQlFVUXNRMEZCZFVJc1RVRkJka0lzUjBGQlowTXNRMEZCY0VNc1JVRkJkVU03UVVGQlFTeE5RVWN4UWl4aFFVZ3dRaXhIUVVkdVF5eFRRVUZUTEdGQlFWUXNRMEZCZFVJc1QwRkJka0lzUlVGQlowTTdRVUZETlVJc1VVRkJUU3hOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETEU5QlFVUXNRMEZCUkN4RFFVRlhMRkZCUVZnc1EwRkJiMElzVDBGQmNFSXNRMEZCWmpzN1FVRkZRU3hSUVVGSkxFTkJRVU1zUTBGQlF5eFBRVUZFTEVOQlFVUXNRMEZCVnl4SFFVRllMRWRCUVdsQ0xFMUJRV3BDTEVkQlFUQkNMRU5CUVRsQ0xFVkJRV2xETzBGQlF6ZENMRTFCUVVFc1RVRkJUU3hEUVVGRExGRkJRVkFzUTBGQlowSXNWMEZCYUVJN1FVRkRTQ3hMUVVaRUxFMUJSVTg3UVVGRFNDeE5RVUZCTEUxQlFVMHNRMEZCUXl4WFFVRlFMRU5CUVcxQ0xGZEJRVzVDTzBGQlEwZzdRVUZEU2l4SFFWaHJReXhGUVdGdVF6czdPMEZCV2tFc1RVRkJUU3hOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETEdOQlFVUXNRMEZCYUVJN1FVRmhRU3hGUVVGQkxFMUJRVTBzUTBGQlF5eEpRVUZRTEVOQlFWa3NXVUZCVnp0QlFVTnVRaXhKUVVGQkxHRkJRV0VzUTBGQlF5eEpRVUZFTEVOQlFXSTdRVUZEU0N4SFFVWkVMRVZCWkcxRExFTkJhMEp1UXpzN1FVRkRRU3hGUVVGQkxFMUJRVTBzUTBGQlF5eEZRVUZRTEVOQlFWVXNZMEZCVml4RlFVRXdRaXhaUVVGWE8wRkJRMnBETEVsQlFVRXNZVUZCWVN4RFFVRkRMRWxCUVVRc1EwRkJZanRCUVVOSUxFZEJSa1E3UVVGSFNEczdPenM3T3pzN096dEJRM1JDUkN4VFFVRlRMRTFCUVZRc1IwRkJhMEk3UVVGRFpDeE5RVUZKTEVOQlFVTXNRMEZCUXl4VFFVRkVMRU5CUVVRc1EwRkJZU3hOUVVGaUxFZEJRWE5DTEVOQlFURkNMRVZCUVRaQ08wRkJRM3BDTEZGQlFVMHNZVUZCWVN4SFFVRkhMRU5CUVVNc1EwRkJReXh0UWtGQlJDeERRVUYyUWp0QlFVVkJMRWxCUVVFc1lVRkJZU3hEUVVGRExFVkJRV1FzUTBGQmFVSXNUMEZCYWtJc1JVRkJNRUlzV1VGQlZ6dEJRVU5xUXl4TlFVRkJMRTlCUVU4c1EwRkJReXhIUVVGU0xFTkJRVmtzVTBGQldqdEJRVU5CTEUxQlFVRXNUVUZCVFN4RFFVRkRMRWxCUVZBc1EwRkJXU3hMUVVGTExFbEJRV3BDTEVWQlFYVkNMRkZCUVhaQ0xFVkJRV2xETEhWQ1FVRnFRenRCUVVOQkxHRkJRVThzUzBGQlVEdEJRVU5JTEV0QlNrUTdRVUZMU0R0QlFVTktPenRsUVVWak8wRkJRVVVzUlVGQlFTeE5RVUZOTEVWQlFVNDdRVUZCUml4RE96czdPenM3UVVOYVpqczdPenRCUVVWQkxIVkNRVUZSTEVsQlFWSXNRMEZCWVR0QlFVTlVMRVZCUVVFc1RVRkJUU3hGUVVGRk8wRkJRMG9zU1VGQlFTeFJRVUZSTEVWQlFVVXNRMEZCUXl4M1FrRkJSRHRCUVVST08wRkJSRU1zUTBGQllqczdPMEZEUmtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUXpWb1EwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTnVRa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUlvWm5WdVkzUnBiMjRvS1h0bWRXNWpkR2x2YmlCeUtHVXNiaXgwS1h0bWRXNWpkR2x2YmlCdktHa3NaaWw3YVdZb0lXNWJhVjBwZTJsbUtDRmxXMmxkS1h0MllYSWdZejFjSW1aMWJtTjBhVzl1WENJOVBYUjVjR1Z2WmlCeVpYRjFhWEpsSmlaeVpYRjFhWEpsTzJsbUtDRm1KaVpqS1hKbGRIVnliaUJqS0drc0lUQXBPMmxtS0hVcGNtVjBkWEp1SUhVb2FTd2hNQ2s3ZG1GeUlHRTlibVYzSUVWeWNtOXlLRndpUTJGdWJtOTBJR1pwYm1RZ2JXOWtkV3hsSUNkY0lpdHBLMXdpSjF3aUtUdDBhSEp2ZHlCaExtTnZaR1U5WENKTlQwUlZURVZmVGs5VVgwWlBWVTVFWENJc1lYMTJZWElnY0QxdVcybGRQWHRsZUhCdmNuUnpPbnQ5ZlR0bFcybGRXekJkTG1OaGJHd29jQzVsZUhCdmNuUnpMR1oxYm1OMGFXOXVLSElwZTNaaGNpQnVQV1ZiYVYxYk1WMWJjbDA3Y21WMGRYSnVJRzhvYm54OGNpbDlMSEFzY0M1bGVIQnZjblJ6TEhJc1pTeHVMSFFwZlhKbGRIVnliaUJ1VzJsZExtVjRjRzl5ZEhOOVptOXlLSFpoY2lCMVBWd2lablZ1WTNScGIyNWNJajA5ZEhsd1pXOW1JSEpsY1hWcGNtVW1KbkpsY1hWcGNtVXNhVDB3TzJrOGRDNXNaVzVuZEdnN2FTc3JLVzhvZEZ0cFhTazdjbVYwZFhKdUlHOTljbVYwZFhKdUlISjlLU2dwSWl3aWQybHVaRzkzTG5KbGNYVnBjbVVnUFNCeVpYRjFhWEpsWEc1Y2JpOHZJRUpoYzJsaklHMWxiblVnU2xOY2JtbHRjRzl5ZENCdFpXNTFJR1p5YjIwZ0p5NHZaR1ZtWVhWc2RDOXRaVzUxSjF4dVhHNHZMeUJEYUdGdVoyVWdabTl5YlNCcGJuQjFkSE1nYjI0Z2NHOXdkV3hoZEdsdVp5Qm1hV1ZzWkZ4dWFXMXdiM0owSUdadmNtMU1ZV0psYkhNZ1puSnZiU0FuTGk5a1pXWmhkV3gwTDIxdmRtbHVaeTFtYjNKdExXeGhZbVZzY3lkY2JseHVMeThnVEc5aFpDQjNaV0ptYjI1MGMxeHVhVzF3YjNKMElIZGxZbVp2Ym5STWIyRmtaWElnWm5KdmJTQW5MaTlrWldaaGRXeDBMM2RsWW1admJuUXRiRzloWkdWeUoxeHVYRzR2THlCQlkyTnZjbVJwYjI1Y2JtbHRjRzl5ZENCaFkyTnZjbVJwYjI0Z1puSnZiU0FuTGk5a1pXWmhkV3gwTDJGalkyOXlaR2x2YmlkY2JseHVMeThnVDNCbGJpQnphR0Z5WlNCc2FXNXJjeUJwYmlCdGFXNXBJSGRwYm1SdmQzTmNibWx0Y0c5eWRDQnpiMk5wWVd3Z1puSnZiU0FuTGk5a1pXWmhkV3gwTDNOdlkybGhiQ2RjYmx4dVhHNHZMeUJQY0hScGIyNWhiQ0JDWVhKaVlTNUtVeUJ6ZEhWbVpseHVMeTlwYlhCdmNuUWdjR0ZuWlZSeVlXNXphWFJwYjI1eklHWnliMjBnSnk0dlpHVm1ZWFZzZEM5d1lXZGxWSEpoYm5OcGRHbHZibk1uSWl3aWFXMXdiM0owSUY4Z1puSnZiU0FuWVdOamIzSmthVzl1SjF4dVhHNHZMeUJCYkdoaFpHbHpJR0poYzJsaklFRmpZMjl5WkdsdmJpQndZV05yWVdkbE9pQm9kSFJ3Y3pvdkwyZHBkR2gxWWk1amIyMHZRV3hvWVdScGN5OUJZMk52Y21ScGIyNGpjbVZoWkcxbFhHNWNibWxtSUNna0tDY3Vhbk10WVdOamIzSmthVzl1SnlrdWJHVnVaM1JvSUQ0Z01Da2dlMXh1WEc0Z0lDQWdKQ2duTG1wekxXRmpZMjl5WkdsdmJpY3BMbVZoWTJnb1puVnVZM1JwYjI0b2FTd2daV3dwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjMjlzWlM1c2IyY29KMkZqWTI5eVpHbHZiaUJ6WlhRaEp5bGNiaUFnSUNBZ0lDQWdibVYzSUVGalkyOXlaR2x2YmlobGJDd2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2IyNVViMmRuYkdVNklHWjFibU4wYVc5dUtIUmhjbWRsZENsN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHRnlaMlYwTG1GalkyOXlaR2x2Ymk1bWIyeGtjeTVtYjNKRllXTm9LR1p2YkdRZ1BUNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppaG1iMnhrSUNFOVBTQjBZWEpuWlhRcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1p2YkdRdWIzQmxiaUE5SUdaaGJITmxYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmU2xjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmU2xjYmlBZ0lDQjlLVnh1ZlNJc0ltTnZibk4wSUNSaWIyUjVJRDBnSkNnblltOWtlU2NwTEZ4dUlDQWdJQ1JvWVcxaWRYSm5aWElnUFNBa0tDY3ViV1Z1ZFY5ZmFHRnRZblZ5WjJWeUp5a3NYRzRnSUNBZ0pHMWhjMnNnUFNBa0tDY3ViV1Z1ZFY5ZmJXRnpheWNwTEZ4dUlDQWdJQ1JqYUdWamEySnZlQ0E5SUNRb0p5NXRaVzUxWDE5amFHVmphMkp2ZUNjcExGeHVJQ0FnSUNSdFpXNTFUR2x1YXlBOUlDUW9KeTV0Wlc1MVgxOXNhVzVySnlrc1hHNGdJQ0FnSkcxbGJuVk1hWE4wSUQwZ0pDZ25MbTFsYm5WZlgyeHBjM1FuS1N4Y2JpQWdJQ0JoWTNScGRtVk5aVzUxUTJ4aGMzTWdQU0FuYldWdWRTMXBjeTFoWTNScGRtVW5MRnh1SUNBZ0lHRmpkR2wyWlVOc1lYTnpJRDBnSjJsekxXRmpkR2wyWlNkY2JseHVMeThnUm1sdVpDQndiMng1Wm1sc2JGeHVZMjl1YzNRZ1ptbHVaQ0E5SUhKbGNYVnBjbVVvWENKcWMzQnZiSGxtYVd4c0xXRnljbUY1TG5CeWIzUnZkSGx3WlM1bWFXNWtYQ0lwWEc1Y2JpOHZJRWhoYldKMWNtZGxjaUJqYkdsamF5QmxkbVZ1ZEZ4dUpHaGhiV0oxY21kbGNpNWpiR2xqYXlobWRXNWpkR2x2YmlncElIdGNiaUFnSUNCcFppQW9KR0p2WkhrdWFHRnpRMnhoYzNNb1lXTjBhWFpsVFdWdWRVTnNZWE56S1NrZ2UxeHVJQ0FnSUNBZ0lDQWtZbTlrZVM1eVpXMXZkbVZEYkdGemN5aGhZM1JwZG1WTlpXNTFRMnhoYzNNcFhHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSkdKdlpIa3VZV1JrUTJ4aGMzTW9ZV04wYVhabFRXVnVkVU5zWVhOektWeHVJQ0FnSUgxY2JuMHBYRzVjYmk4dklFeHBibXNnWTJ4cFkyc2daWFpsYm5SY2JpUnRaVzUxVEdsdWF5NWpiR2xqYXlobWRXNWpkR2x2YmlobEtTQjdYRzRnSUNBZ0pHSnZaSGt1Y21WdGIzWmxRMnhoYzNNb1lXTjBhWFpsVFdWdWRVTnNZWE56S1Z4dUlDQWdJQ1JqYUdWamEySnZlQzV3Y205d0tDZGphR1ZqYTJWa0p5d2dabUZzYzJVcFhHNGdJQ0FnSkcxbGJuVk1hVzVyTG5KbGJXOTJaVU5zWVhOektHRmpkR2wyWlVOc1lYTnpLVnh1SUNBZ0lDUW9kR2hwY3lrdVlXUmtRMnhoYzNNb1lXTjBhWFpsUTJ4aGMzTXBYRzU5S1Z4dVhHNHZMeUJOWVhOcklHTnNhV05ySUdWMlpXNTBYRzRrYldGemF5NWpiR2xqYXlobWRXNWpkR2x2YmlncElIdGNiaUFnSUNCcFppQW9KR0p2WkhrdWFHRnpRMnhoYzNNb1lXTjBhWFpsVFdWdWRVTnNZWE56S1NrZ2UxeHVJQ0FnSUNBZ0lDQWtZbTlrZVM1eVpXMXZkbVZEYkdGemN5aGhZM1JwZG1WTlpXNTFRMnhoYzNNcFhHNGdJQ0FnSUNBZ0lDUmphR1ZqYTJKdmVDNXdjbTl3S0NkamFHVmphMlZrSnl3Z1ptRnNjMlVwWEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdKR0p2WkhrdVlXUmtRMnhoYzNNb1lXTjBhWFpsVFdWdWRVTnNZWE56S1Z4dUlDQWdJSDFjYm4wcFhHNWNibHh1THk4Z1UzUnBZMnQ1SUdobFlXUmxjbHh1WTI5dWMzUWdKR2hsWVdSbGNpQTlJQ1FvSnk1b1pXRmtaWEluS1N4Y2JpQWdJQ0FrZDJsdVpHOTNJRDBnSkNoM2FXNWtiM2NwTEZ4dUlDQWdJSE4wYVdOcmVVTnNZWE56SUQwZ0oybHpMWE4wYVdOcmVTY3NYRzRnSUNBZ2RHOXdJRDBnSkdobFlXUmxjaTV2Wm1aelpYUW9LUzUwYjNBZ0t5QXhYRzVjYmlSM2FXNWtiM2N1YzJOeWIyeHNLR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJR2xtSUNna2QybHVaRzkzTG5OamNtOXNiRlJ2Y0NncElENDlJSFJ2Y0NrZ2UxeHVJQ0FnSUNBZ0lDQWthR1ZoWkdWeUxtRmtaRU5zWVhOektITjBhV05yZVVOc1lYTnpLVnh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDUm9aV0ZrWlhJdWNtVnRiM1psUTJ4aGMzTW9jM1JwWTJ0NVEyeGhjM01wWEc0Z0lDQWdmVnh1ZlNraUxDSnBaaUFvSkNnbkxtcHpMVzF2ZG1sdVp5MXNZV0psYkhNbktTNXNaVzVuZEdnZ1BpQXdLU0I3WEc0Z0lDQWdZMjl1YzNRZ0pHbHVjSFYwSUQwZ0pDZ25MbVp2Y20xZlgybHVjSFYwSnlsY2JseHVJQ0FnSUdaMWJtTjBhVzl1SUdOb1pXTnJSbTl5U1c1d2RYUW9aV3hsYldWdWRDa2dlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQWtiR0ZpWld3Z1BTQWtLR1ZzWlcxbGJuUXBMbk5wWW14cGJtZHpLQ2RzWVdKbGJDY3BYRzVjYmlBZ0lDQWdJQ0FnYVdZZ0tDUW9aV3hsYldWdWRDa3VkbUZzS0NrdWJHVnVaM1JvSUQ0Z01Da2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0pHeGhZbVZzTG1Ga1pFTnNZWE56S0Nkb1lYTXRkbUZzZFdVbktWeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSkd4aFltVnNMbkpsYlc5MlpVTnNZWE56S0Nkb1lYTXRkbUZzZFdVbktWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0FnSUZ4dUlDQWdJQzh2SUZSb1pTQnNhVzVsY3lCaVpXeHZkeUJoY21VZ1pYaGxZM1YwWldRZ2IyNGdjR0ZuWlNCc2IyRmtYRzRnSUNBZ0pHbHVjSFYwTG1WaFkyZ29ablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdJQ0FnSUdOb1pXTnJSbTl5U1c1d2RYUW9kR2hwY3lsY2JpQWdJQ0I5S1Z4dVhHNGdJQ0FnTHk4Z1ZHaGxJR3hwYm1WeklHSmxiRzkzSUNocGJuTnBaR1VwSUdGeVpTQmxlR1ZqZFhSbFpDQnZiaUJqYUdGdVoyVWdKaUJyWlhsMWNGeHVJQ0FnSUNScGJuQjFkQzV2YmlnblkyaGhibWRsSUd0bGVYVndKeXdnWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNBZ0lHTm9aV05yUm05eVNXNXdkWFFvZEdocGN5bGNiaUFnSUNCOUtWeHVmU0lzSW1aMWJtTjBhVzl1SUhOdlkybGhiQ2dwSUh0Y2JpQWdJQ0JwWmlBb0pDZ25Mbk52WTJsaGJDY3BMbXhsYm1kMGFDQStJREFwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnSkhOdlkybGhiRmRwYm1SdmR5QTlJQ1FvSnk1cWN5MXpiMk5wWVd3dGQybHVaRzkzSnlsY2JseHVJQ0FnSUNBZ0lDQWtjMjlqYVdGc1YybHVaRzkzTG05dUtDZGpiR2xqYXljc0lHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjMjlzWlM1c2IyY29KMk5zYVdOclpXUW5LVnh1SUNBZ0lDQWdJQ0FnSUNBZ2QybHVaRzkzTG05d1pXNG9kR2hwY3k1b2NtVm1MQ0JjSWxOdlkybGhiRndpTENCY0luZHBaSFJvUFRnd01Dd2dhR1ZwWjJoMFBUWXdNRndpS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sTzF4dUlDQWdJQ0FnSUNCOUtWeHVJQ0FnSUgxY2JuMWNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdleUJ6YjJOcFlXd2dmU0lzSW1sdGNHOXlkQ0JYWldKR2IyNTBJR1p5YjIwZ0ozZGxZbVp2Ym5Sc2IyRmtaWEluWEc1Y2JsZGxZa1p2Ym5RdWJHOWhaQ2g3WEc0Z0lDQWdaMjl2WjJ4bE9pQjdYRzRnSUNBZ0lDQWdJR1poYldsc2FXVnpPaUJiSjAxdmJuUnpaWEp5WVhRNk5EQXdMRFV3TUN3M01EQW5YVnh1SUNBZ0lIMWNibjBwWEc0aUxDSW9ablZ1WTNScGIyNG9LWHRjYmx4MFhDSjFjMlVnYzNSeWFXTjBYQ0k3WEc1Y2JseDBkbUZ5SUhSdmRXTm9SVzVoWW14bFpDQTlJRndpYjI1MGIzVmphSE4wWVhKMFhDSWdhVzRnWkc5amRXMWxiblF1Wkc5amRXMWxiblJGYkdWdFpXNTBPMXh1WEhSMllYSWdjSEpsYzNORmRtVnVkQ0FnSUQwZ2RHOTFZMmhGYm1GaWJHVmtJRDhnWENKMGIzVmphR1Z1WkZ3aUlEb2dYQ0pqYkdsamExd2lPMXh1WEhSMllYSWdaV0ZqYUNBZ0lDQWdJQ0FnSUQwZ1cxMHVabTl5UldGamFEdGNibHh1WEc1Y2RDOHZJRTVoYldVZ2IyWWdkR2hsSUc5dVZISmhibk5wZEdsdmJrVnVaQ0JsZG1WdWRDQnpkWEJ3YjNKMFpXUWdZbmtnZEdocGN5QmljbTkzYzJWeVhHNWNkSFpoY2lCMGNtRnVjMmwwYVc5dVJXNWtJRDBnS0daMWJtTjBhVzl1S0NsN1hHNWNkRngwWm05eUtIWmhjaUJ1WVcxbGN5QTlJRndpZEhKaGJuTnBkR2x2Ym1WdVpDQjNaV0pyYVhSVWNtRnVjMmwwYVc5dVJXNWtJRzlVY21GdWMybDBhVzl1Ulc1a0lHOTBjbUZ1YzJsMGFXOXVaVzVrWENJdWMzQnNhWFFvWENJZ1hDSXBMQ0JwSUQwZ01Ec2dhU0E4SURRN0lDc3JhU2xjYmx4MFhIUmNkR2xtS0Z3aWIyNWNJaXR1WVcxbGMxdHBYUzUwYjB4dmQyVnlRMkZ6WlNncElHbHVJSGRwYm1SdmR5a2djbVYwZFhKdUlHNWhiV1Z6VzJsZE8xeHVYSFJjZEhKbGRIVnliaUJ1WVcxbGMxc3dYVHRjYmx4MGZTZ3BLVHRjYmx4MFhHNWNkRnh1WEhSY2JseDBMeW9xWEc1Y2RDQXFJRU52Ym1ScGRHbHZibUZzYkhrZ1lXUmtJRzl5SUhKbGJXOTJaU0JoSUhSdmEyVnVJR1p5YjIwZ1lTQjBiMnRsYmkxc2FYTjBMbHh1WEhRZ0tseHVYSFFnS2lCQWNHRnlZVzBnZTBSUFRWUnZhMlZ1VEdsemRIMGdiR2x6ZEZ4dVhIUWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdkRzlyWlc1Y2JseDBJQ29nUUhCaGNtRnRJSHRDYjI5c1pXRnVmU0JsYm1GaWJHVmtYRzVjZENBcUwxeHVYSFJtZFc1amRHbHZiaUJ6WlhSVWIydGxiaWhzYVhOMExDQjBiMnRsYml3Z1pXNWhZbXhsWkNsN1hHNWNkRngwWlc1aFlteGxaQ0EvSUd4cGMzUXVZV1JrS0hSdmEyVnVLU0E2SUd4cGMzUXVjbVZ0YjNabEtIUnZhMlZ1S1R0Y2JseDBmVnh1WEc1Y2JseHVYSFF2S2lwY2JseDBJQ29nVTNSdmNDQmhJR1oxYm1OMGFXOXVJR1p5YjIwZ1ptbHlhVzVuSUhSdmJ5QnhkV2xqYTJ4NUxseHVYSFFnS2x4dVhIUWdLaUJTWlhSMWNtNXpJR0VnWTI5d2VTQnZaaUIwYUdVZ2IzSnBaMmx1WVd3Z1puVnVZM1JwYjI0Z2RHaGhkQ0J5ZFc1eklHOXViSGtnWVdaMFpYSWdkR2hsSUdSbGMybG5ibUYwWldSY2JseDBJQ29nYm5WdFltVnlJRzltSUcxcGJHeHBjMlZqYjI1a2N5Qm9ZWFpsSUdWc1lYQnpaV1F1SUZWelpXWjFiQ0JtYjNJZ2RHaHliM1IwYkdsdVp5QnZibEpsYzJsNlpTQm9ZVzVrYkdWeWN5NWNibHgwSUNwY2JseDBJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJR3hwYldsMElDMGdWR2h5WlhOb2IyeGtJSFJ2SUhOMFlXeHNJR1Y0WldOMWRHbHZiaUJpZVN3Z2FXNGdiV2xzYkdselpXTnZibVJ6TGx4dVhIUWdLaUJBY0dGeVlXMGdlMEp2YjJ4bFlXNTlJSE52YjI0Z0xTQkpaaUJVVWxWRkxDQjNhV3hzSUdOaGJHd2dkR2hsSUdaMWJtTjBhVzl1SUNwaVpXWnZjbVVxSUhSb1pTQjBhSEpsYzJodmJHUW5jeUJsYkdGd2MyVmtMQ0J5WVhSb1pYSWdkR2hoYmlCaFpuUmxjaTVjYmx4MElDb2dRSEpsZEhWeWJpQjdSblZ1WTNScGIyNTlYRzVjZENBcUwxeHVYSFJtZFc1amRHbHZiaUJrWldKdmRXNWpaU2htYml3Z2JHbHRhWFFzSUhOdmIyNHBlMXh1WEhSY2RIWmhjaUJzYVcxcGRDQTlJR3hwYldsMElEd2dNQ0EvSURBZ09pQnNhVzFwZEN4Y2JseDBYSFJjZEhOMFlYSjBaV1FzSUdOdmJuUmxlSFFzSUdGeVozTXNJSFJwYldWeUxGeHVYRzVjZEZ4MFhIUmtaV3hoZVdWa0lEMGdablZ1WTNScGIyNG9LWHRjYmx4dVhIUmNkRngwWEhRdkx5QkhaWFFnZEdobElIUnBiV1VnWW1WMGQyVmxiaUJ1YjNjZ1lXNWtJSGRvWlc0Z2RHaGxJR1oxYm1OMGFXOXVJSGRoY3lCbWFYSnpkQ0JtYVhKbFpGeHVYSFJjZEZ4MFhIUjJZWElnZEdsdFpWTnBibU5sSUQwZ1JHRjBaUzV1YjNjb0tTQXRJSE4wWVhKMFpXUTdYRzVjYmx4MFhIUmNkRngwYVdZb2RHbHRaVk5wYm1ObElENDlJR3hwYldsMEtYdGNibHgwWEhSY2RGeDBYSFJwWmlnaGMyOXZiaWtnWm00dVlYQndiSGtvWTI5dWRHVjRkQ3dnWVhKbmN5azdYRzVjZEZ4MFhIUmNkRngwYVdZb2RHbHRaWElwSUdOc1pXRnlWR2x0Wlc5MWRDaDBhVzFsY2lrN1hHNWNkRngwWEhSY2RGeDBkR2x0WlhJZ1BTQmpiMjUwWlhoMElEMGdZWEpuY3lBOUlHNTFiR3c3WEc1Y2RGeDBYSFJjZEgxY2JseHVYSFJjZEZ4MFhIUmxiSE5sSUhScGJXVnlJRDBnYzJWMFZHbHRaVzkxZENoa1pXeGhlV1ZrTENCc2FXMXBkQ0F0SUhScGJXVlRhVzVqWlNrN1hHNWNkRngwWEhSOU8xeHVYRzVjYmx4MFhIUXZMeUJFWldKdmRXNWpaV1FnWTI5d2VTQnZaaUIwYUdVZ2IzSnBaMmx1WVd3Z1puVnVZM1JwYjI1Y2JseDBYSFJ5WlhSMWNtNGdablZ1WTNScGIyNG9LWHRjYmx4MFhIUmNkR052Ym5SbGVIUWdQU0IwYUdsekxGeHVYSFJjZEZ4MFlYSm5jeUFnSUNBOUlHRnlaM1Z0Wlc1MGN6dGNibHh1WEhSY2RGeDBhV1lvSVd4cGJXbDBLVnh1WEhSY2RGeDBYSFJ5WlhSMWNtNGdabTR1WVhCd2JIa29ZMjl1ZEdWNGRDd2dZWEpuY3lrN1hHNWNibHgwWEhSY2RITjBZWEowWldRZ1BTQkVZWFJsTG01dmR5Z3BPMXh1WEhSY2RGeDBhV1lvSVhScGJXVnlLWHRjYmx4MFhIUmNkRngwYVdZb2MyOXZiaWtnWm00dVlYQndiSGtvWTI5dWRHVjRkQ3dnWVhKbmN5azdYRzVjZEZ4MFhIUmNkSFJwYldWeUlEMGdjMlYwVkdsdFpXOTFkQ2hrWld4aGVXVmtMQ0JzYVcxcGRDazdYRzVjZEZ4MFhIUjlYRzVjZEZ4MGZUdGNibHgwZlR0Y2JseHVYRzVjYmx4MGRtRnlJSFZ1YVhGMVpVbEVJRDBnS0daMWJtTjBhVzl1S0NsN1hHNWNkRngwZG1GeUlFbEVjeUFnSUNBZ1BTQjdmVHRjYmx4MFhIUjJZWElnYVc1a1pYaGxjeUE5SUh0OU8xeHVYSFJjZEZ4dVhIUmNkRnh1WEhSY2RDOHFLbHh1WEhSY2RDQXFJRWRsYm1WeVlYUmxJR0VnZFc1cGNYVmxJRWxFSUdadmNpQmhJRVJQVFNCbGJHVnRaVzUwTGx4dVhIUmNkQ0FxWEc1Y2RGeDBJQ29nUW5rZ1pHVm1ZWFZzZEN3Z2JXbHVhVzFoYkdsemRDQkpSSE1nYkdsclpTQmNJbDh4WENJZ2IzSWdYQ0pmTWx3aUlHRnlaU0JuWlc1bGNtRjBaV1FnZFhOcGJtY2dhVzUwWlhKdVlXeHNlVnh1WEhSY2RDQXFJSFJ5WVdOclpXUWdhVzVqY21WdFpXNTBZWFJwYjI0dUlGVm5iR2xsY2l3Z2JXOXlaU0JqYjJ4c2FYTnBiMjR0Y0hKdmIyWWdTVVJ6SUdOaGJpQmlaU0JuWlc1bGNtRjBaV1FnWW5sY2JseDBYSFFnS2lCd1lYTnphVzVuSUdFZ2RISjFkR2g1SUhaaGJIVmxJSFJ2SUhSb1pTQm1kVzVqZEdsdmJpZHpJR1pwY25OMElHRnlaM1Z0Wlc1MExseHVYSFJjZENBcVhHNWNkRngwSUNvZ1NYSnlaWE53WldOMGFYWmxJRzltSUhkb1pYUm9aWElnZG1Gc2RXVnpJR0Z5WlNCaVpXbHVaeUJuWlc1bGNtRjBaV1FnYzJsdGNHeDVJRzl5SUhKaGJtUnZiV3g1TENCMGFHVmNibHgwWEhRZ0tpQmtiMk4xYldWdWRDQjBjbVZsSUdseklHRnNkMkY1Y3lCamIyNXpkV3gwWldRZ1ptbHljM1FnZEc4Z1pXNXpkWEpsSUdFZ1pIVndiR2xqWVhSbElFbEVJR2x6SUc1bGRtVnlYRzVjZEZ4MElDb2djbVYwZFhKdVpXUXVYRzVjZEZ4MElDcGNibHgwWEhRZ0tpQkFjR0Z5WVcwZ2UxTjBjbWx1WjMwZ0lIQnlaV1pwZUNBdElGQnlaV1pwZUNCd2NtVndaVzVrWldRZ2RHOGdjbVZ6ZFd4MExpQkVaV1poZFd4ME9pQmNJbDljSWx4dVhIUmNkQ0FxSUVCd1lYSmhiU0I3UW05dmJHVmhibjBnY21GdVpHOXRJQzBnUjJWdVpYSmhkR1VnWTI5c2JHbHphVzl1TFhCeWIyOW1JRWxFY3lCMWMybHVaeUJ5WVc1a2IyMGdjM2x0WW05c2MxeHVYSFJjZENBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNBZ2JHVnVaM1JvSUMwZ1RHVnVaM1JvSUc5bUlISmhibVJ2YlNCd1lYTnpkMjl5WkhNdUlFUmxabUYxYkhRNklEWmNibHgwWEhRZ0tpQkFjbVYwZFhKdUlIdFRkSEpwYm1kOVhHNWNkRngwSUNvdlhHNWNkRngwWm5WdVkzUnBiMjRnZFc1cGNYVmxTVVFvY0hKbFptbDRMQ0JqYjIxd2JHVjRMQ0JzWlc1bmRHZ3BlMXh1WEhSY2RGeDBiR1Z1WjNSb0lDQWdJQ0E5SUNzb2JHVnVaM1JvSUh4OElEWXBPMXh1WEhSY2RGeDBkbUZ5SUhKbGMzVnNkQ0E5SUNBb2NISmxabWw0SUQwZ2NISmxabWw0SUh4OElGd2lYMXdpS1R0Y2JseDBYSFJjZEZ4dVhIUmNkRngwTHk4Z1UybHRjR3hsSUVsRWMxeHVYSFJjZEZ4MGFXWW9JV052YlhCc1pYZ3BlMXh1WEhSY2RGeDBYSFJjYmx4MFhIUmNkRngwTHk4Z1UyVjBJSFJvYVhNZ2NISmxabWw0SjNNZ2MzUmhjblJwYm1jZ2FXNWtaWGdnYVdZZ2FYUW5jeUJ1YjNRZ1ltVmxiaUIxYzJWa0lIbGxkRnh1WEhSY2RGeDBYSFJwWmlnaGFXNWtaWGhsYzF0d2NtVm1hWGhkS1Z4dVhIUmNkRngwWEhSY2RHbHVaR1Y0WlhOYmNISmxabWw0WFNBOUlEQTdYRzVjZEZ4MFhIUmNkRnh1WEhSY2RGeDBYSFJ5WlhOMWJIUWdLejBnS3l0cGJtUmxlR1Z6VzNCeVpXWnBlRjA3WEc1Y2RGeDBYSFI5WEc1Y2RGeDBYSFJjYmx4MFhIUmNkQzh2SUZWbmJHbGxjaTl6WVdabGNpQkpSSE5jYmx4MFhIUmNkR1ZzYzJWN1hHNWNkRngwWEhSY2RIWmhjaUJqYUdGeWN5QWdJRDBnWENKQlFrTkVSVVpIU0VsS1MweE5UazlRVVZKVFZGVldWMWhaV2x3aU8xeHVYSFJjZEZ4MFhIUmphR0Z5Y3lBZ0lDQWdJQ3M5SUdOb1lYSnpMblJ2VEc5M1pYSkRZWE5sS0NrN1hHNWNkRngwWEhSY2RISmxjM1ZzZENBZ0lDQWdLejBnWTJoaGNuTmJJRTFoZEdndWNtOTFibVFvVFdGMGFDNXlZVzVrYjIwb0tTQXFJQ2hqYUdGeWN5NXNaVzVuZEdnZ0xTQXhLU2tnWFR0Y2JseDBYSFJjZEZ4MFkyaGhjbk1nSUNBZ0lDQXJQU0JjSWpBeE1qTTBOVFkzT0RsY0lqdGNibHgwWEhSY2RGeDBYRzVjZEZ4MFhIUmNkSGRvYVd4bEtISmxjM1ZzZEM1c1pXNW5kR2dnUENCc1pXNW5kR2dwWEc1Y2RGeDBYSFJjZEZ4MGNtVnpkV3gwSUNzOUlHTm9ZWEp6V3lCTllYUm9Mbkp2ZFc1a0tFMWhkR2d1Y21GdVpHOXRLQ2tnS2lBb1kyaGhjbk11YkdWdVozUm9JQzBnTVNrcFhUdGNibHgwWEhSY2RIMWNibHgwWEhSY2RGeHVYSFJjZEZ4MGNtVjBkWEp1SUVsRWMxdHlaWE4xYkhSZElIeDhJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tISmxjM1ZzZENsY2JseDBYSFJjZEZ4MFB5QjFibWx4ZFdWSlJDaHdjbVZtYVhnc0lHTnZiWEJzWlhncFhHNWNkRngwWEhSY2REb2dLRWxFYzF0eVpYTjFiSFJkSUQwZ2RISjFaU3dnY21WemRXeDBLVHRjYmx4MFhIUjlYRzVjZEZ4MFhHNWNkRngwWEc1Y2RGeDBjbVYwZFhKdUlIVnVhWEYxWlVsRU8xeHVYSFI5S0NrcE8xeHVYRzVjYmx4MEx5OGdUbUZ0WlNCdlppQjBhR1VnUTFOVFQwMGdjSEp2Y0dWeWRIa2dkWE5sWkNCaWVTQjBhR2x6SUdKeWIzZHpaWElnWm05eUlFTlRVeUIwY21GdWMyWnZjbTF6WEc1Y2RIWmhjaUJqYzNOVWNtRnVjMlp2Y20wZ1BTQW9ablZ1WTNScGIyNG9iaWw3WEc1Y2RGeDBjeUE5SUdSdlkzVnRaVzUwTG1SdlkzVnRaVzUwUld4bGJXVnVkQzV6ZEhsc1pUdGNibHgwWEhScFppZ29jSEp2Y0NBOUlHNHVkRzlNYjNkbGNrTmhjMlVvS1NrZ2FXNGdjeWtnY21WMGRYSnVJSEJ5YjNBN1hHNWNkRngwWm05eUtIWmhjaUJ3Y205d0xDQnpMQ0J3SUQwZ1hDSlhaV0pyYVhRZ1RXOTZJRTF6SUU4Z1MyaDBiV3hjSWl3Z2NDQTlJQ2h3TG5SdlRHOTNaWEpEWVhObEtDa2dLeUJ3S1M1emNHeHBkQ2hjSWlCY0lpa3NJR2tnUFNBd095QnBJRHdnTVRBN0lDc3JhU2xjYmx4MFhIUmNkR2xtS0Nod2NtOXdJRDBnY0Z0cFhTdHVLU0JwYmlCektTQnlaWFIxY200Z2NISnZjRHRjYmx4MFhIUnlaWFIxY200Z1hDSmNJanRjYmx4MGZTaGNJbFJ5WVc1elptOXliVndpS1NrN1hHNWNibHh1WEhRdkx5QlhhR1YwYUdWeUlETkVJSFJ5WVc1elptOXliWE1nWVhKbElITjFjSEJ2Y25SbFpDQmllU0IwYUdseklHSnliM2R6WlhKY2JseDBkbUZ5SUdOemN6TkVVM1Z3Y0c5eWRHVmtJRDBnS0daMWJtTjBhVzl1S0hCeWIzQk9ZVzFsS1h0Y2JseDBYSFIyWVhJZ1pTQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb1hDSmthWFpjSWlrc0lITWdQU0JsTG5OMGVXeGxMRnh1WEhSY2RIWWdQU0JiVzF3aWRISmhibk5zWVhSbFdTaGNJaXdnWENJcFhDSmRMQ0JiWENKMGNtRnVjMnhoZEdVelpDZ3dMRndpTENCY0lpd3dLVndpWFYxY2JseDBYSFIwY25sN0lITmJjSEp2Y0U1aGJXVmRJRDBnZGxzeFhTNXFiMmx1S0Z3aU1YQjRYQ0lwT3lCOUlHTmhkR05vS0dVcGUzMWNibHgwWEhSeVpYUjFjbTRnZGxzcklTRnpXM0J5YjNCT1lXMWxYVjBnUFQwOUlIWmJNVjA3WEc1Y2RIMG9ZM056VkhKaGJuTm1iM0p0S1NrN1hHNWNibHh1WEc1Y2JseHVYRzVjYmx4dVhHNWNkSFpoY2lCbWIyeGtjeUE5SUZ0ZE8xeHVYRzVjYmx4MEx5b3FYRzVjZENBcUlGSmxjSEpsYzJWdWRITWdZU0J6YVc1bmJHVWdjR0Z1Wld3Z2IyWWdkRzluWjJ4aFlteGxJR052Ym5SbGJuUWdhVzV6YVdSbElHRnVJRUZqWTI5eVpHbHZiaTVjYmx4MElDcGNibHgwSUNvZ1FIQmhjbUZ0SUh0QlkyTnZjbVJwYjI1OUlHRmpZMjl5WkdsdmJseHVYSFFnS2lCQWNHRnlZVzBnZTBoVVRVeEZiR1Z0Wlc1MGZTQmxiRnh1WEhRZ0tpQkFZMjl1YzNSeWRXTjBiM0pjYmx4MElDb3ZYRzVjZEhaaGNpQkdiMnhrSUQwZ1puVnVZM1JwYjI0b1lXTmpiM0prYVc5dUxDQmxiQ2w3WEc1Y2RGeDBkbUZ5SUZSSVNWTWdJQ0FnSUNBZ0lDQWdJQ0E5SUhSb2FYTTdYRzVjZEZ4MGRtRnlJR2hsWVdScGJtY2dJQ0FnSUNBZ0lDQTlJR1ZzTG1acGNuTjBSV3hsYldWdWRFTm9hV3hrTzF4dVhIUmNkSFpoY2lCamIyNTBaVzUwSUNBZ0lDQWdJQ0FnUFNCbGJDNXNZWE4wUld4bGJXVnVkRU5vYVd4a08xeHVYSFJjZEhaaGNpQmxiRU5zWVhOelpYTWdJQ0FnSUNBZ1BTQmxiQzVqYkdGemMweHBjM1E3WEc1Y2RGeDBkbUZ5SUc5d1pXNURiR0Z6Y3lBZ0lDQWdJQ0E5SUdGalkyOXlaR2x2Ymk1dmNHVnVRMnhoYzNNN1hHNWNkRngwZG1GeUlHTnNiM05sUTJ4aGMzTWdJQ0FnSUNBOUlHRmpZMjl5WkdsdmJpNWpiRzl6WlVOc1lYTnpPMXh1WEhSY2RIWmhjaUJyWlhselJXNWhZbXhsWkNBZ0lDQWdQU0FoWVdOamIzSmthVzl1TG01dlMyVjVjenRjYmx4MFhIUjJZWElnZFhObFFtOXlaR1Z5Y3lBZ0lDQWdJRDBnWVdOamIzSmthVzl1TG5WelpVSnZjbVJsY25NN1hHNWNkRngwZG1GeUlIVnpaVlJ5WVc1elptOXliWE1nSUNBOUlDRmhZMk52Y21ScGIyNHVibTlVY21GdWMyWnZjbTF6SUNZbUlHTnpjMVJ5WVc1elptOXliVHRjYmx4MFhIUjJZWElnYjI1VWIyZG5iR1VnSUNBZ0lDQWdJRDBnWVdOamIzSmthVzl1TG05dVZHOW5aMnhsTzF4dVhIUmNkSFpoY2lCZlpHbHpZV0pzWldRZ0lDQWdJQ0FnUFNCbVlXeHpaVHRjYmx4MFhIUjJZWElnWDI5d1pXNHNJRjk1TENCZmFHVnBaMmgwTENCZllYSnBZVVZ1WVdKc1pXUTdYRzVjZEZ4MGRtRnlJSE5qY205c2JGZ3NJSE5qY205c2JGazdYRzVjZEZ4MGRtRnlJRzl1Vkc5MVkyaFRkR0Z5ZER0Y2JseDBYSFIyWVhJZ2IyNUxaWGxFYjNkdU8xeHVYSFJjZEhaaGNpQnZibEJ5WlhOek8xeHVYSFJjZEZ4dVhIUmNkRnh1WEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBhV1Z6S0ZSSVNWTXNJSHRjYmx4MFhIUmNkR1pwZERvZ2UzWmhiSFZsT2lCbWFYUjlMRnh1WEhSY2RGeDBYRzVjZEZ4MFhIUmNibHgwWEhSY2RDOHZJRUZrWkNCdmNpQnlaVzF2ZG1VZ2NtVnNaWFpoYm5RZ1FWSkpRU0JoZEhSeWFXSjFkR1Z6SUdaeWIyMGdkR2hsSUdadmJHUW5jeUJsYkdWdFpXNTBjMXh1WEhSY2RGeDBZWEpwWVVWdVlXSnNaV1E2SUh0Y2JseDBYSFJjZEZ4MFoyVjBPaUJtZFc1amRHbHZiaWdwZXlCeVpYUjFjbTRnWDJGeWFXRkZibUZpYkdWa095QjlMRnh1WEhSY2RGeDBYSFJ6WlhRNklHWjFibU4wYVc5dUtHbHVjSFYwS1h0Y2JseDBYSFJjZEZ4MFhIUnBaaWdvYVc1d2RYUWdQU0FoSVdsdWNIVjBLU0FoUFQwZ0lTRmZZWEpwWVVWdVlXSnNaV1FwZTF4dVhIUmNkRngwWEhSY2RGeDBYMkZ5YVdGRmJtRmliR1ZrSUQwZ2FXNXdkWFE3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNibHgwWEhSY2RGeDBYSFJjZEM4dklFVnVZV0pzWlNCQlVrbEJMV0YwZEhKcFluVjBaU0J0WVc1aFoyVnRaVzUwWEc1Y2RGeDBYSFJjZEZ4MFhIUnBaaWhwYm5CMWRDbDdYRzVjZEZ4MFhIUmNkRngwWEhSY2RHaGxZV1JwYm1jdWMyVjBRWFIwY21saWRYUmxLRndpY205c1pWd2lMQ0JjSW5SaFlsd2lLVHRjYmx4MFhIUmNkRngwWEhSY2RGeDBZMjl1ZEdWdWRDNXpaWFJCZEhSeWFXSjFkR1VvWENKeWIyeGxYQ0lzSUZ3aWRHRmljR0Z1Wld4Y0lpazdYRzVjZEZ4MFhIUmNkRngwWEhSY2RHTm9aV05yU1VSektDazdYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeHVYSFJjZEZ4MFhIUmNkRngwWEhRdkx5QlZjR1JoZEdVZ2RHaGxJR0YwZEhKcFluVjBaWE1nZEdoaGRDZHlaU0JqYjI1MGNtOXNiR1ZrSUdKNUlDNXZjR1Z1SjNNZ2MyVjBkR1Z5WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkR2hsWVdScGJtY3VjMlYwUVhSMGNtbGlkWFJsS0Z3aVlYSnBZUzF6Wld4bFkzUmxaRndpTENBaElWOXZjR1Z1S1R0Y2JseDBYSFJjZEZ4MFhIUmNkRngwYUdWaFpHbHVaeTV6WlhSQmRIUnlhV0oxZEdVb1hDSmhjbWxoTFdWNGNHRnVaR1ZrWENJc0lDRWhYMjl3Wlc0cE8xeHVYSFJjZEZ4MFhIUmNkRngwWEhSamIyNTBaVzUwTG5ObGRFRjBkSEpwWW5WMFpTaGNJbUZ5YVdFdGFHbGtaR1Z1WENJc0lDQWdJVjl2Y0dWdUtUdGNibHgwWEhSY2RGeDBYSFJjZEgxY2JseDBYSFJjZEZ4MFhIUmNkRnh1WEhSY2RGeDBYSFJjZEZ4MEx5OGdSR2x6WVdKc2FXNW5PeUJ5WlcxdmRtVWdZV3hzSUhKbGJHVjJZVzUwSUdGMGRISnBZblYwWlhOY2JseDBYSFJjZEZ4MFhIUmNkR1ZzYzJWN1hHNWNkRngwWEhSY2RGeDBYSFJjZEdobFlXUnBibWN1Y21WdGIzWmxRWFIwY21saWRYUmxLRndpY205c1pWd2lLVHRjYmx4MFhIUmNkRngwWEhSY2RGeDBhR1ZoWkdsdVp5NXlaVzF2ZG1WQmRIUnlhV0oxZEdVb1hDSmhjbWxoTFdOdmJuUnliMnh6WENJcE8xeHVYSFJjZEZ4MFhIUmNkRngwWEhSb1pXRmthVzVuTG5KbGJXOTJaVUYwZEhKcFluVjBaU2hjSW1GeWFXRXRjMlZzWldOMFpXUmNJaWs3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkR2hsWVdScGJtY3VjbVZ0YjNabFFYUjBjbWxpZFhSbEtGd2lZWEpwWVMxbGVIQmhibVJsWkZ3aUtUdGNibHgwWEhSY2RGeDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RGeDBYSFJjZEdOdmJuUmxiblF1Y21WdGIzWmxRWFIwY21saWRYUmxLRndpY205c1pWd2lLVHRjYmx4MFhIUmNkRngwWEhSY2RGeDBZMjl1ZEdWdWRDNXlaVzF2ZG1WQmRIUnlhV0oxZEdVb1hDSmhjbWxoTFd4aFltVnNiR1ZrWW5sY0lpazdYRzVjZEZ4MFhIUmNkRngwWEhSY2RHTnZiblJsYm5RdWNtVnRiM1psUVhSMGNtbGlkWFJsS0Z3aVlYSnBZUzFvYVdSa1pXNWNJaWs3WEc1Y2RGeDBYSFJjZEZ4MFhIUjlYRzVjZEZ4MFhIUmNkRngwZlZ4dVhIUmNkRngwWEhSOVhHNWNkRngwWEhSOUxGeHVYRzVjZEZ4MFhIUmNibHgwWEhSY2RGeHVYSFJjZEZ4MEx5OGdWMmhsZEdobGNpQnZjaUJ1YjNRZ2RHaGxJR1p2YkdRbmN5QmpkWEp5Wlc1MGJIa2diM0JsYm1Wa1hHNWNkRngwWEhSdmNHVnVPaUI3WEc1Y2RGeDBYSFJjZEZ4dVhIUmNkRngwWEhSblpYUTZJR1oxYm1OMGFXOXVLQ2w3WEc1Y2RGeDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RGeDBMeThnUkdWeWFYWmxJSFJvWlNCbWIyeGtKM01nYjNCbGJtVmtJSE4wWVhSbElHWnliMjBnZEdobElFUlBUU0JwWmlCcGRDZHpJRzV2ZENCaVpXVnVJR1JsZEdWeWJXbHVaV1FnZVdWMFhHNWNkRngwWEhSY2RGeDBhV1lvZFc1a1pXWnBibVZrSUQwOVBTQmZiM0JsYmlsN1hHNWNkRngwWEhSY2RGeDBYSFJmYjNCbGJpQTlJR1ZzUTJ4aGMzTmxjeTVqYjI1MFlXbHVjeWh2Y0dWdVEyeGhjM01wTzF4dVhIUmNkRngwWEhSY2RGeDBjMlYwVkc5clpXNG9aV3hEYkdGemMyVnpMQ0JqYkc5elpVTnNZWE56TENBaFgyOXdaVzRwTzF4dVhIUmNkRngwWEhSY2RIMWNibHgwWEhSY2RGeDBYSFJjYmx4MFhIUmNkRngwWEhSeVpYUjFjbTRnWDI5d1pXNDdYRzVjZEZ4MFhIUmNkSDBzWEc1Y2RGeDBYSFJjZEZ4dVhIUmNkRngwWEhSY2JseDBYSFJjZEZ4MGMyVjBPaUJtZFc1amRHbHZiaWhwYm5CMWRDbDdYRzVjZEZ4MFhIUmNkRngwYVdZb0tHbHVjSFYwSUQwZ0lTRnBibkIxZENrZ0lUMDlJRjl2Y0dWdUtYdGNibHgwWEhSY2RGeDBYSFJjZEZ4dVhIUmNkRngwWEhSY2RGeDBMeThnU1dZZ1lXNGdiMjVVYjJkbmJHVWdZMkZzYkdKaFkyc2dkMkZ6SUhOd1pXTnBabWxsWkN3Z2NuVnVJR2wwTGlCQmRtOXBaQ0JrYjJsdVp5QmhibmwwYUdsdVp5QnBaaUJwZENCeVpYUjFjbTV6SUdaaGJITmxMbHh1WEhSY2RGeDBYSFJjZEZ4MGFXWW9YQ0ptZFc1amRHbHZibHdpSUQwOVBTQjBlWEJsYjJZZ2IyNVViMmRuYkdVZ0ppWWdabUZzYzJVZ1BUMDlJRzl1Vkc5bloyeGxMbU5oYkd3b2JuVnNiQ3dnVkVoSlV5d2dhVzV3ZFhRcEtWeHVYSFJjZEZ4MFhIUmNkRngwWEhSeVpYUjFjbTQ3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNibHgwWEhSY2RGeDBYSFJjZEhObGRGUnZhMlZ1S0dWc1EyeGhjM05sY3l3Z2IzQmxia05zWVhOekxDQWdJR2x1Y0hWMEtUdGNibHgwWEhSY2RGeDBYSFJjZEhObGRGUnZhMlZ1S0dWc1EyeGhjM05sY3l3Z1kyeHZjMlZEYkdGemN5d2dJV2x1Y0hWMEtUdGNibHgwWEhSY2RGeDBYSFJjZEY5dmNHVnVJRDBnYVc1d2RYUTdYRzVjZEZ4MFhIUmNkRngwWEhSY2JseDBYSFJjZEZ4MFhIUmNkQzh2SUZWd1pHRjBaU0JCVWtsQklHRjBkSEpwWW5WMFpYTmNibHgwWEhSY2RGeDBYSFJjZEdsbUtGOWhjbWxoUlc1aFlteGxaQ2w3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkR2hsWVdScGJtY3VjMlYwUVhSMGNtbGlkWFJsS0Z3aVlYSnBZUzF6Wld4bFkzUmxaRndpTENBZ2FXNXdkWFFwTzF4dVhIUmNkRngwWEhSY2RGeDBYSFJvWldGa2FXNW5Mbk5sZEVGMGRISnBZblYwWlNoY0ltRnlhV0V0Wlhod1lXNWtaV1JjSWl3Z0lHbHVjSFYwS1R0Y2JseDBYSFJjZEZ4MFhIUmNkRngwWTI5dWRHVnVkQzV6WlhSQmRIUnlhV0oxZEdVb1hDSmhjbWxoTFdocFpHUmxibHdpTENBZ0lDRnBibkIxZENrN1hHNWNkRngwWEhSY2RGeDBYSFI5WEc1Y2RGeDBYSFJjZEZ4MFhIUmNibHgwWEhSY2RGeDBYSFJjZEM4dklFbG1JSFJvYVhNZ1ptOXNaQ0IzWVhNZ1kyeHZjMlZrSUhkb1pXNGdkR2hsSUhOamNtVmxiaUJ5WlhOcGVtVmtMQ0J5ZFc0Z1lTQm1kV3hzSUhWd1pHRjBaU0JwYmlCallYTmxJR2wwY3lCamIyNTBaVzUwY3lCM1pYSmxJR3AxWjJkc1pXUWdZWEp2ZFc1a1hHNWNkRngwWEhSY2RGeDBYSFJwWmloVVNFbFRMbTVsWldSelVtVm1jbVZ6YUNsN1hHNWNkRngwWEhSY2RGeDBYSFJjZEdSbGJHVjBaU0JVU0VsVExtNWxaV1J6VW1WbWNtVnphRHRjYmx4MFhIUmNkRngwWEhSY2RGeDBZV05qYjNKa2FXOXVMbkpsWm5KbGMyZ29LVHRjYmx4MFhIUmNkRngwWEhSY2RIMWNibHgwWEhSY2RGeDBYSFJjZEdWc2MyVWdZV05qYjNKa2FXOXVMblZ3WkdGMFpTZ3BPMXh1WEhSY2RGeDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RGeDBYSFF2THlCRGJHOXpaU0J2ZEdobGNpQm1iMnhrY3lCcFppQmhZMk52Y21ScGIyNGdhWE1nYlc5a1lXeGNibHgwWEhSY2RGeDBYSFJjZEdsbUtHRmpZMjl5WkdsdmJpNXRiMlJoYkNBbUppQmZiM0JsYmlsN1hHNWNkRngwWEhSY2RGeDBYSFJjZEdadmNpaDJZWElnWm05c1pDd2dhU0E5SURBc0lHd2dQU0JoWTJOdmNtUnBiMjR1Wm05c1pITXViR1Z1WjNSb095QnBJRHdnYkRzZ0t5dHBLWHRjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJwWmloVVNFbFRJQ0U5UFNBb1ptOXNaQ0E5SUdGalkyOXlaR2x2Ymk1bWIyeGtjMXRwWFNrcFhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUm1iMnhrTG05d1pXNGdQU0JtWVd4elpUdGNibHgwWEhSY2RGeDBYSFJjZEZ4MGZWeHVYSFJjZEZ4MFhIUmNkRngwZlZ4dVhIUmNkRngwWEhSY2RIMWNibHgwWEhSY2RGeDBmVnh1WEhSY2RGeDBmU3hjYmx4MFhIUmNkRnh1WEhSY2RGeDBYRzVjZEZ4MFhIUXZMeUJYYUdWMGFHVnlJSFJvWlNCbWIyeGtKM01nWW1WbGJpQmtaV0ZqZEdsMllYUmxaRnh1WEhSY2RGeDBaR2x6WVdKc1pXUTZJSHRjYmx4MFhIUmNkRngwWjJWME9pQm1kVzVqZEdsdmJpZ3BleUJ5WlhSMWNtNGdYMlJwYzJGaWJHVmtJSDBzWEc1Y2RGeDBYSFJjZEhObGREb2dablZ1WTNScGIyNG9hVzV3ZFhRcGUxeHVYSFJjZEZ4MFhIUmNkR2xtS0NocGJuQjFkQ0E5SUNFaGFXNXdkWFFwSUNFOVBTQmZaR2x6WVdKc1pXUXBlMXh1WEhSY2RGeDBYSFJjZEZ4MGRtRnlJSE4wZVd4bElEMGdaV3d1YzNSNWJHVTdYRzVjZEZ4MFhIUmNkRngwWEhSY2JseDBYSFJjZEZ4MFhIUmNkQzh2SUVSbFlXTjBhWFpoZEdWa1hHNWNkRngwWEhSY2RGeDBYSFJwWmloZlpHbHpZV0pzWldRZ1BTQnBibkIxZENsN1hHNWNkRngwWEhSY2RGeDBYSFJjZEhOMGVXeGxMbWhsYVdkb2RDQTlJRzUxYkd3N1hHNWNkRngwWEhSY2RGeDBYSFJjZEhWelpWUnlZVzV6Wm05eWJYTmNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUS9JQ2h6ZEhsc1pWdGpjM05VY21GdWMyWnZjbTFkSUQwZ2JuVnNiQ2xjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFE2SUNoemRIbHNaUzUwYjNBZ1BTQnVkV3hzS1R0Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkSFJ2ZFdOb1JXNWhZbXhsWkNBbUppQm9aV0ZrYVc1bkxuSmxiVzkyWlVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0owYjNWamFITjBZWEowWENJc0lHOXVWRzkxWTJoVGRHRnlkQ2s3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkR2hsWVdScGJtY3VjbVZ0YjNabFJYWmxiblJNYVhOMFpXNWxjaWh3Y21WemMwVjJaVzUwTENCdmJsQnlaWE56S1R0Y2JseDBYSFJjZEZ4MFhIUmNkRngwWld4RGJHRnpjMlZ6TG5KbGJXOTJaU2h2Y0dWdVEyeGhjM01zSUdOc2IzTmxRMnhoYzNNcE8xeHVYSFJjZEZ4MFhIUmNkRngwWEhScFppaHZia3RsZVVSdmQyNHBlMXh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkR2hsWVdScGJtY3VjbVZ0YjNabFJYWmxiblJNYVhOMFpXNWxjaWhjSW10bGVXUnZkMjVjSWl3Z2IyNUxaWGxFYjNkdUtUdGNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUm9aV0ZrYVc1bkxuSmxiVzkyWlVGMGRISnBZblYwWlNoY0luUmhZbWx1WkdWNFhDSXBPMXh1WEhSY2RGeDBYSFJjZEZ4MFhIUjlYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeHVYSFJjZEZ4MFhIUmNkRngwWEhScFppaGZZWEpwWVVWdVlXSnNaV1FwZTF4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZSSVNWTXVZWEpwWVVWdVlXSnNaV1FnUFNCbVlXeHpaVHRjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJmWVhKcFlVVnVZV0pzWldRZ0lDQWdJRDBnZEhKMVpUdGNibHgwWEhSY2RGeDBYSFJjZEZ4MGZWeHVYSFJjZEZ4MFhIUmNkRngwZlZ4dVhIUmNkRngwWEhSY2RGeDBYRzVjZEZ4MFhIUmNkRngwWEhRdkx5QlNaV0ZqZEdsMllYUmxaRnh1WEhSY2RGeDBYSFJjZEZ4MFpXeHpaWHRjYmx4MFhIUmNkRngwWEhSY2RGeDBjM1I1YkdVdWFHVnBaMmgwSUQwZ1gyaGxhV2RvZENBcklGd2ljSGhjSWp0Y2JseDBYSFJjZEZ4MFhIUmNkRngwZFhObFZISmhibk5tYjNKdGMxeHVYSFJjZEZ4MFhIUmNkRngwWEhSY2REOGdjM1I1YkdWYlkzTnpWSEpoYm5ObWIzSnRYU0E5WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSamMzTXpSRk4xY0hCdmNuUmxaRnh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhRL0lDaGNJblJ5WVc1emJHRjBaVE5FS0RBc1hDSWdLeUJmZVNBcklGd2ljSGdzTUNsY0lpbGNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwT2lBb1hDSjBjbUZ1YzJ4aGRHVlpLRndpSUNBZ0lDc2dYM2tnS3lCY0luQjRLVndpS1Z4dVhIUmNkRngwWEhSY2RGeDBYSFJjZERvZ0tITjBlV3hsTG5SdmNDQTlJRjk1SUNzZ1hDSndlRndpS1R0Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkSFJ2ZFdOb1JXNWhZbXhsWkNBbUppQm9aV0ZrYVc1bkxtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb1hDSjBiM1ZqYUhOMFlYSjBYQ0lzSUc5dVZHOTFZMmhUZEdGeWRDazdYRzVjZEZ4MFhIUmNkRngwWEhSY2RHaGxZV1JwYm1jdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lod2NtVnpjMFYyWlc1MExDQnZibEJ5WlhOektUdGNibHgwWEhSY2RGeDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RGeDBYSFJjZEdsbUtHOXVTMlY1Ukc5M2JpbDdYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBhR1ZoWkdsdVp5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtGd2lhMlY1Wkc5M2Jsd2lMQ0J2Ymt0bGVVUnZkMjRwTzF4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEdobFlXUnBibWN1ZEdGaVNXNWtaWGdnUFNBd08xeHVYSFJjZEZ4MFhIUmNkRngwWEhSOVhHNWNkRngwWEhSY2RGeDBYSFI5WEc1Y2RGeDBYSFJjZEZ4MGZWeHVYSFJjZEZ4MFhIUjlYRzVjZEZ4MFhIUjlMRnh1WEhSY2RGeDBYRzVjZEZ4MFhIUmNibHgwWEhSY2RDOHZJRlpsY25ScFkyRnNJSEJ2YzJsMGFXOXVJRzltSUhSb1pTQm1iMnhrSUhkcGRHaHBiaUJoYmlCaFkyTnZjbVJwYjI0bmN5QmpiMjUwWVdsdVpYSmNibHgwWEhSY2RIazZJSHRjYmx4MFhIUmNkRngwWjJWME9pQm1kVzVqZEdsdmJpZ3BlMXh1WEhSY2RGeDBYSFJjZEdsbUtIVnVaR1ZtYVc1bFpDQTlQVDBnWDNrcFhHNWNkRngwWEhSY2RGeDBYSFJ5WlhSMWNtNGdLRjk1SUQwZ2NHRnljMlZKYm5Rb1pXd3VjM1I1YkdVdWRHOXdLU0I4ZkNBd0tUdGNibHgwWEhSY2RGeDBYSFJ5WlhSMWNtNGdYM2s3WEc1Y2RGeDBYSFJjZEgwc1hHNWNkRngwWEhSY2RGeHVYSFJjZEZ4MFhIUnpaWFE2SUdaMWJtTjBhVzl1S0dsdWNIVjBLWHRjYmx4MFhIUmNkRngwWEhScFppZ29hVzV3ZFhRZ1BTQXJhVzV3ZFhRcElDRTlQU0JmZVNsN1hHNWNkRngwWEhSY2RGeDBYSFJmZVNBOUlHbHVjSFYwTzF4dVhIUmNkRngwWEhSY2RGeDBkWE5sVkhKaGJuTm1iM0p0YzF4dVhIUmNkRngwWEhSY2RGeDBYSFEvSUdWc0xuTjBlV3hsVzJOemMxUnlZVzV6Wm05eWJWMGdQVnh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkR056Y3pORVUzVndjRzl5ZEdWa1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUS9JQ2hjSW5SeVlXNXpiR0YwWlRORUtEQXNYQ0lnS3lCcGJuQjFkQ0FySUZ3aWNIZ3NNQ2xjSWlsY2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REb2dLRndpZEhKaGJuTnNZWFJsV1NoY0lpQWdJQ0FySUdsdWNIVjBJQ3NnWENKd2VDbGNJaWxjYmx4MFhIUmNkRngwWEhSY2RGeDBPaUFvWld3dWMzUjViR1V1ZEc5d0lEMGdhVzV3ZFhRZ0t5QmNJbkI0WENJcE8xeHVYSFJjZEZ4MFhIUmNkSDFjYmx4MFhIUmNkRngwZlZ4dVhIUmNkRngwZlN4Y2JseDBYSFJjZEZ4dVhIUmNkRngwWEc1Y2RGeDBYSFF2THlCSVpXbG5hSFFnYjJZZ2RHaGxJR1p2YkdRbmN5QnZkWFJsY20xdmMzUWdZMjl1ZEdGcGJtVnlYRzVjZEZ4MFhIUm9aV2xuYUhRNklIdGNibHgwWEhSY2RGeDBYRzVjZEZ4MFhIUmNkR2RsZERvZ1puVnVZM1JwYjI0b0tYdGNibHgwWEhSY2RGeDBYSFJwWmloMWJtUmxabWx1WldRZ1BUMDlJRjlvWldsbmFIUXBlMXh1WEhSY2RGeDBYSFJjZEZ4MFgyaGxhV2RvZENBOUlGUklTVk11YUdWaFpHbHVaMGhsYVdkb2RDQXJJR052Ym5SbGJuUXVjMk55YjJ4c1NHVnBaMmgwTzF4dVhIUmNkRngwWEhSY2RGeDBaV3d1YzNSNWJHVXVhR1ZwWjJoMElEMGdYMmhsYVdkb2RDQXJJRndpY0hoY0lqdGNibHgwWEhSY2RGeDBYSFI5WEc1Y2RGeDBYSFJjZEZ4MGNtVjBkWEp1SUY5b1pXbG5hSFE3WEc1Y2RGeDBYSFJjZEgwc1hHNWNkRngwWEhSY2RGeHVYSFJjZEZ4MFhIUnpaWFE2SUdaMWJtTjBhVzl1S0dsdWNIVjBLWHRjYmx4MFhIUmNkRngwWEhScFppaHBibkIxZENBbUppQW9hVzV3ZFhRZ1BTQXJhVzV3ZFhRcElDRTlQU0JmYUdWcFoyaDBLWHRjYmx4MFhIUmNkRngwWEhSY2RHVnNMbk4wZVd4bExtaGxhV2RvZENBOUlHbHVjSFYwSUNzZ1hDSndlRndpWEc1Y2RGeDBYSFJjZEZ4MFhIUmZhR1ZwWjJoMElDQWdJQ0FnSUNBZ1BTQnBibkIxZER0Y2JseDBYSFJjZEZ4MFhIUjlYRzVjZEZ4MFhIUmNkSDFjYmx4MFhIUmNkSDBzWEc1Y2RGeDBYSFJjYmx4dVhIUmNkRngwTHk4Z1EzVnljbVZ1ZENCb1pXbG5hSFFnYjJZZ2RHaGxJR1p2YkdRbmN5Qm9aV0ZrYVc1blhHNWNkRngwWEhSb1pXRmthVzVuU0dWcFoyaDBPaUI3WEc1Y2RGeDBYSFJjZEdkbGREb2dablZ1WTNScGIyNG9LWHRjYmx4MFhIUmNkRngwWEhSeVpYUjFjbTRnYUdWaFpHbHVaeTV6WTNKdmJHeElaV2xuYUhSY2JseDBYSFJjZEZ4MFhIUmNkQ3NnVkVoSlV5NW9aV2xuYUhSUFptWnpaWFJjYmx4MFhIUmNkRngwWEhSY2RDc2dLSFZ6WlVKdmNtUmxjbk1nUHlCVVNFbFRMbWhsWVdScGJtZENiM0prWlhJZ09pQXdLVnh1WEhSY2RGeDBYSFI5WEc1Y2RGeDBYSFI5TEZ4dVhIUmNkRngwWEc1Y2RGeDBYSFF2THlCVWIzUmhiQ0JvWldsbmFIUWdZMjl1YzNWdFpXUWdZbmtnZEdobElHaGxZV1JwYm1jZ1pXeGxiV1Z1ZENkeklFTlRVeUJpYjNKa1pYSnpMQ0JwWmlCaGJubGNibHgwWEhSY2RHaGxZV1JwYm1kQ2IzSmtaWEk2SUh0Y2JseDBYSFJjZEZ4MFoyVjBPaUJtZFc1amRHbHZiaWdwZTF4dVhIUmNkRngwWEhSY2RISmxkSFZ5YmlBb2FHVmhaR2x1Wnk1dlptWnpaWFJJWldsbmFIUWdmSHdnTUNrZ0xTQW9hR1ZoWkdsdVp5NWpiR2xsYm5SSVpXbG5hSFFnZkh3Z01DazdYRzVjZEZ4MFhIUmNkSDFjYmx4MFhIUmNkSDBzWEc1Y2RGeDBYSFJjYmx4MFhIUmNkRnh1WEhSY2RGeDBYRzVjZEZ4MFhIUXZMeUJVYjNSaGJDQm9aV2xuYUhRZ2IyWWdkR2hsSUdadmJHUW5jeUJqYjI1MFlXbHVaWElnWld4bGJXVnVkRnh1WEhSY2RGeDBaV3hJWldsbmFIUTZJSHRjYmx4MFhIUmNkRngwWjJWME9pQm1kVzVqZEdsdmJpZ3BlMXh1WEhSY2RGeDBYSFJjZEhKbGRIVnliaUJsYkM1elkzSnZiR3hJWldsbmFIUWdLeUFvZFhObFFtOXlaR1Z5Y3lBL0lGUklTVk11Wld4Q2IzSmtaWElnT2lBd0tUdGNibHgwWEhSY2RGeDBmVnh1WEhSY2RGeDBmU3hjYmx4MFhIUmNkRnh1WEhSY2RGeDBMeThnVkc5MFlXd2dhR1ZwWjJoMElHTnZibk4xYldWa0lHSjVJR052Ym5SaGFXNWxjaUJsYkdWdFpXNTBKM01nUTFOVElHSnZjbVJsY25Nc0lHbG1JR0Z1ZVZ4dVhIUmNkRngwWld4Q2IzSmtaWEk2SUh0Y2JseDBYSFJjZEZ4MFoyVjBPaUJtZFc1amRHbHZiaWdwZTF4dVhIUmNkRngwWEhSY2RISmxkSFZ5YmlBb1pXd3ViMlptYzJWMFNHVnBaMmgwSUh4OElEQXBJQzBnS0dWc0xtTnNhV1Z1ZEVobGFXZG9kQ0I4ZkNBd0tUdGNibHgwWEhSY2RGeDBmVnh1WEhSY2RGeDBmU3hjYmx4MFhIUmNkRnh1WEhSY2RGeDBYRzVjZEZ4MFhIUXZMeUJYYUdWMGFHVnlJSFJvWlNCbWIyeGtKM01nWTI5dWRHRnBibVZ5SUdoaGN5QmlaV1Z1SUhKbGMybDZaV1FnYVc1amIzSnlaV04wYkhsY2JseDBYSFJjZEhkeWIyNW5VMmw2WlRvZ2UxeHVYSFJjZEZ4MFhIUm5aWFE2SUdaMWJtTjBhVzl1S0NsN1hHNWNkRngwWEhSY2RGeDBjbVYwZFhKdUlGUklTVk11YUdWaFpHbHVaMGhsYVdkb2RDQXJJR052Ym5SbGJuUXVjMk55YjJ4c1NHVnBaMmgwSUNFOVBTQmxiQzV6WTNKdmJHeElaV2xuYUhRN1hHNWNkRngwWEhSY2RIMWNibHgwWEhSY2RIMWNibHgwWEhSOUtUdGNibHgwWEhSY2JseDBYSFJjYmx4MFhIUmNibHgwWEhSVVNFbFRMbWx1WkdWNElDQWdJQ0FnSUNBOUlHWnZiR1J6TG5CMWMyZ29WRWhKVXlrZ0xTQXhPMXh1WEhSY2RGUklTVk11WVdOamIzSmthVzl1SUNBZ0lEMGdZV05qYjNKa2FXOXVPMXh1WEhSY2RGUklTVk11Wld3Z0lDQWdJQ0FnSUNBZ0lEMGdaV3c3WEc1Y2RGeDBWRWhKVXk1b1pXRmthVzVuSUNBZ0lDQWdQU0JvWldGa2FXNW5PMXh1WEhSY2RGUklTVk11WTI5dWRHVnVkQ0FnSUNBZ0lEMGdZMjl1ZEdWdWREdGNibHgwWEhSVVNFbFRMbUZ5YVdGRmJtRmliR1ZrSUNBOUlDRmhZMk52Y21ScGIyNHVibTlCY21saE8xeHVYSFJjZEZSSVNWTXVhR1ZwWjJoMFQyWm1jMlYwSUQwZ1lXTmpiM0prYVc5dUxtaGxhV2RvZEU5bVpuTmxkRHRjYmx4MFhIUmxiQzVoWTJOdmNtUnBiMjVHYjJ4a0lDQTlJRlJJU1ZNdWFXNWtaWGc3WEc1Y2RGeDBkWE5sUW05eVpHVnljeUFnSUNBZ0lDQWdQU0JjSW1GMWRHOWNJaUE5UFQwZ2RYTmxRbTl5WkdWeWN5QS9JQ2d3SUNFOVBTQlVTRWxUTG1Wc1FtOXlaR1Z5SUNzZ1ZFaEpVeTVvWldGa2FXNW5RbTl5WkdWeUtTQTZJSFZ6WlVKdmNtUmxjbk03WEc1Y2RGeDBYRzVjZEZ4MFhHNWNkRngwWEc1Y2RGeDBablZ1WTNScGIyNGdZMmhsWTJ0SlJITW9LWHRjYmx4MFhIUmNkSFpoY2lCb1pXRmthVzVuVTNWbVptbDRJRDBnWENJdGFHVmhaR2x1WjF3aU8xeHVYSFJjZEZ4MGRtRnlJR052Ym5SbGJuUlRkV1ptYVhnZ1BTQmNJaTFqYjI1MFpXNTBYQ0k3WEc1Y2RGeDBYSFIyWVhJZ1pXeEpSQ0FnSUNBZ0lDQWdJQ0FnSUQwZ1pXd3VhV1E3WEc1Y2RGeDBYSFIyWVhJZ2FXUTdYRzVjZEZ4MFhIUmNibHgwWEhSY2RDOHZJRTVsYVhSb1pYSWdiMllnZEdobElHWnZiR1FuY3lCbGJHVnRaVzUwY3lCb1lYWmxJR0Z1SUVsRUlHRjBkSEpwWW5WMFpWeHVYSFJjZEZ4MGFXWW9JV2hsWVdScGJtY3VhV1FnSmlZZ0lXTnZiblJsYm5RdWFXUXBlMXh1WEhSY2RGeDBYSFJwWkNBZ0lDQWdJQ0FnSUNBZ0lDQTlJR1ZzU1VRZ2ZId2dkVzVwY1hWbFNVUW9YQ0poWENJcE8xeHVYSFJjZEZ4MFhIUm9aV0ZrYVc1bkxtbGtJQ0FnSUNBOUlHbGtJQ3NnYUdWaFpHbHVaMU4xWm1acGVEdGNibHgwWEhSY2RGeDBZMjl1ZEdWdWRDNXBaQ0FnSUNBZ1BTQnBaQ0FySUdOdmJuUmxiblJUZFdabWFYZzdYRzVjZEZ4MFhIUjlYRzVjZEZ4MFhIUmNibHgwWEhSY2RDOHZJRVZwZEdobGNpQjBhR1VnYUdWaFpHbHVaeUJ2Y2lCbGJHVnRaVzUwSUd4aFkyc2dZVzRnU1VSY2JseDBYSFJjZEdWc2MyVWdhV1lvSVdOdmJuUmxiblF1YVdRcElHTnZiblJsYm5RdWFXUWdJQ0E5SUNobGJFbEVJSHg4SUdobFlXUnBibWN1YVdRcElDc2dZMjl1ZEdWdWRGTjFabVpwZUR0Y2JseDBYSFJjZEdWc2MyVWdhV1lvSVdobFlXUnBibWN1YVdRcElHaGxZV1JwYm1jdWFXUWdJQ0E5SUNobGJFbEVJSHg4SUdOdmJuUmxiblF1YVdRcElDc2dhR1ZoWkdsdVoxTjFabVpwZUR0Y2JseDBYSFJjZEZ4dVhIUmNkRngwTHk4Z1JtbHVZV3hzZVN3Z1pHOTFZbXhsTFdOb1pXTnJJR1ZoWTJnZ1pXeGxiV1Z1ZENkeklFbEVJR2x6SUhKbFlXeHNlU0IxYm1seGRXVmNibHgwWEhSY2RIWmhjaUFrSUQwZ1puVnVZM1JwYjI0b2N5bDdjbVYwZFhKdUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0pCYkd3b1hDSWpYQ0lyY3lsOU8xeHVYSFJjZEZ4MGQyaHBiR1VvSkNoamIyNTBaVzUwTG1sa0tTNXNaVzVuZEdnZ1BpQXhJSHg4SUNRb2FHVmhaR2x1Wnk1cFpDa3ViR1Z1WjNSb0lENGdNU2w3WEc1Y2RGeDBYSFJjZEdsa0lDQWdJQ0FnSUNBZ1BTQjFibWx4ZFdWSlJDaGNJbUZjSWlrN1hHNWNkRngwWEhSY2RHTnZiblJsYm5RdWFXUWdQU0JwWkNBcklHTnZiblJsYm5SVGRXWm1hWGc3WEc1Y2RGeDBYSFJjZEdobFlXUnBibWN1YVdRZ1BTQnBaQ0FySUdobFlXUnBibWRUZFdabWFYZzdYRzVjZEZ4MFhIUjlYRzVjZEZ4MFhIUmNibHgwWEhSY2RDOHZJRlZ3WkdGMFpTQkJVa2xCSUdGMGRISnBZblYwWlhOY2JseDBYSFJjZEdobFlXUnBibWN1YzJWMFFYUjBjbWxpZFhSbEtGd2lZWEpwWVMxamIyNTBjbTlzYzF3aUxDQWdJQ0JqYjI1MFpXNTBMbWxrS1R0Y2JseDBYSFJjZEdOdmJuUmxiblF1YzJWMFFYUjBjbWxpZFhSbEtGd2lZWEpwWVMxc1lXSmxiR3hsWkdKNVhDSXNJQ0JvWldGa2FXNW5MbWxrS1R0Y2JseDBYSFI5WEc1Y2RGeDBYRzVjZEZ4MFhHNWNkRngwWEc1Y2RGeDBMeThnUzJWNVltOWhjbVFnYm1GMmFXZGhkR2x2Ymx4dVhIUmNkR2xtS0d0bGVYTkZibUZpYkdWa0tYdGNibHgwWEhSY2RHaGxZV1JwYm1jdWRHRmlTVzVrWlhnZ1BTQXdPMXh1WEhSY2RGeDBhR1ZoWkdsdVp5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtGd2lhMlY1Wkc5M2Jsd2lMQ0J2Ymt0bGVVUnZkMjRnUFNCbWRXNWpkR2x2YmlobEtYdGNibHgwWEhSY2RGeDBkbUZ5SUd0bGVTQTlJR1V1YTJWNVEyOWtaVHRjYmx4MFhIUmNkRngwZG1GeUlHWnZiR1E3WEc1Y2RGeDBYSFJjZEZ4dVhIUmNkRngwWEhSemQybDBZMmdvYTJWNUtYdGNibHh1WEhSY2RGeDBYSFJjZEM4dklGTndZV05sWW1GeU9pQlViMmRuYkdWY2JseDBYSFJjZEZ4MFhIUmpZWE5sSURNeU9seHVYSFJjZEZ4MFhIUmNkRngwWlM1d2NtVjJaVzUwUkdWbVlYVnNkQ2dwT3lBdkx5QkdZV3hzTFhSb2NtOTFaMmhjYmx4MFhIUmNkRngwWEhSY2JseDBYSFJjZEZ4MFhIUmNibHgwWEhSY2RGeDBYSFF2THlCRmJuUmxjam9nVkc5bloyeGxYRzVjZEZ4MFhIUmNkRngwWTJGelpTQXhNenBjYmx4MFhIUmNkRngwWEhSY2RGUklTVk11YjNCbGJpQTlJQ0ZVU0VsVExtOXdaVzQ3WEc1Y2RGeDBYSFJjZEZ4MFhIUnBaaWhjSWtGY0lpQTlQVDBnWlM1MFlYSm5aWFF1ZEdGblRtRnRaU2xjYmx4MFhIUmNkRngwWEhSY2RGeDBaUzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh1WEhSY2RGeDBYSFJjZEZ4MFluSmxZV3M3WEc1Y2RGeDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RGeDBYRzVjZEZ4MFhIUmNkRngwTHk4Z1JYTmpZWEJsT2lCRGJHVmhjaUJtYjJOMWMxeHVYSFJjZEZ4MFhIUmNkR05oYzJVZ01qYzZYRzVjZEZ4MFhIUmNkRngwWEhSbExuUmhjbWRsZEM1aWJIVnlLQ2s3WEc1Y2RGeDBYSFJjZEZ4MFhIUmljbVZoYXp0Y2JseDBYSFJjZEZ4MFhIUmNibHgwWEhSY2RGeDBYSFJjYmx4MFhIUmNkRngwWEhRdkx5QlZjQ0JoY25KdmR6b2dVSEpsZG1sdmRYTWdjMlZqZEdsdmJseHVYSFJjZEZ4MFhIUmNkR05oYzJVZ016ZzZlMXh1WEhSY2RGeDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RGeDBYSFF2THlCSmN5QjBhR1Z5WlNCaElIQnlaWFpwYjNWeklITnBZbXhwYm1jZ2RHOGdibUYyYVdkaGRHVWdkWEFnZEc4L1hHNWNkRngwWEhSY2RGeDBYSFJwWmlobWIyeGtJRDBnVkVoSlV5NXdjbVYyYVc5MWMwWnZiR1FwZTF4dVhIUmNkRngwWEhSY2RGeDBYSFIyWVhJZ1kyaHBiR1J5Wlc0Z1BTQm1iMnhrTG1Ob2FXeGtRV05qYjNKa2FXOXVjenRjYmx4MFhIUmNkRngwWEhSY2RGeDBYRzVjZEZ4MFhIUmNkRngwWEhSY2RDOHZJRWx6SUdsMElHOXdaVzRzSUdGdVpDQmtiMlZ6SUdsMElHaGhkbVVnYm1WemRHVmtJR0ZqWTI5eVpHbHZibk0vWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkR2xtS0dadmJHUXViM0JsYmlBbUppQmphR2xzWkhKbGJpbDdYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBkbUZ5SUd4aGMzUkJZMk03WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwZG1GeUlHeGhjM1JHYjJ4a08xeHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RDOHZJRXh2WTJGMFpTQjBhR1VnWkdWbGNHVnpkQzl1WldGeVpYTjBJR0ZqWTI5eVpHbHZiaUIwYUdGMEozTWdZM1Z5Y21WdWRHeDVJR1Y0Y0c5elpXUmNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUjNhR2xzWlNoamFHbHNaSEpsYmlsN1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUnNZWE4wUVdOaklDQTlJR05vYVd4a2NtVnVXMk5vYVd4a2NtVnVMbXhsYm1kMGFDQXRJREZkTzF4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MGJHRnpkRVp2YkdRZ1BTQnNZWE4wUVdOakxtWnZiR1J6VzJ4aGMzUkJZMk11Wm05c1pITXViR1Z1WjNSb0lDMGdNVjA3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhScFppZ2hiR0Z6ZEVadmJHUXViM0JsYmlrZ1luSmxZV3M3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSamFHbHNaSEpsYmlBOUlHeGhjM1JHYjJ4a0xtTm9hV3hrUVdOamIzSmthVzl1Y3p0Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSOVhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MGJHRnpkRVp2YkdRdWFHVmhaR2x1Wnk1bWIyTjFjeWdwTzF4dVhIUmNkRngwWEhSY2RGeDBYSFI5WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRnh1WEhSY2RGeDBYSFJjZEZ4MFhIUXZMeUJPYjNCbFhHNWNkRngwWEhSY2RGeDBYSFJjZEdWc2MyVWdabTlzWkM1b1pXRmthVzVuTG1adlkzVnpLQ2s3WEc1Y2RGeDBYSFJjZEZ4MFhIUjlYRzVjZEZ4MFhIUmNkRngwWEhSY2JseDBYSFJjZEZ4MFhIUmNkQzh2SUVseklIUm9aWEpsSUdFZ2FHbG5hR1Z5SUd4bGRtVnNJSGRsSUdOaGJpQnFkVzF3SUdKaFkyc2dkWEFnZEc4L1hHNWNkRngwWEhSY2RGeDBYSFJsYkhObElHbG1LR0ZqWTI5eVpHbHZiaTV3WVhKbGJuUXBYRzVjZEZ4MFhIUmNkRngwWEhSY2RHRmpZMjl5WkdsdmJpNXdZWEpsYm5SR2IyeGtMbWhsWVdScGJtY3VabTlqZFhNb0tUdGNibHgwWEhSY2RGeDBYSFJjZEZ4dVhIUmNkRngwWEhSY2RGeDBMeThnVkdobGNtVW5jeUJ1YjNSb2FXNW5JSFJ2SUcxdmRtVWdZbUZqYXlCMGJ5d2djMjhnYW5WemRDQnNaWFFnZEdobElHSnliM2R6WlhJZ2NuVnVJR2wwY3lCMWMzVmhiQ0JpWldoaGRtbHZkWEpjYmx4MFhIUmNkRngwWEhSY2RHVnNjMlVnY21WMGRYSnVJSFJ5ZFdVN1hHNWNkRngwWEhSY2RGeDBYSFJjYmx4MFhIUmNkRngwWEhSY2RHVXVjSEpsZG1WdWRFUmxabUYxYkhRb0tUdGNibHgwWEhSY2RGeDBYSFJjZEhKbGRIVnliaUJtWVd4elpUdGNibHgwWEhSY2RGeDBYSFI5WEc1Y2RGeDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RGeDBYRzVjZEZ4MFhIUmNkRngwWEc1Y2RGeDBYSFJjZEZ4MEx5OGdSRzkzYmlCaGNuSnZkem9nVG1WNGRDQnpaV04wYVc5dVhHNWNkRngwWEhSY2RGeDBZMkZ6WlNBME1EcDdYRzVjZEZ4MFhIUmNkRngwWEhSMllYSWdZMmhwYkdSeVpXNGdQU0JVU0VsVExtTm9hV3hrUVdOamIzSmthVzl1Y3p0Y2JseDBYSFJjZEZ4MFhIUmNkRnh1WEhSY2RGeDBYSFJjZEZ4MEx5OGdTWE1nZEdobGNtVWdZU0J1WlhOMFpXUWdZV05qYjNKa2FXOXVJSFJ2SUdwMWJYQWdhVzUwYno5Y2JseDBYSFJjZEZ4MFhIUmNkR2xtS0ZSSVNWTXViM0JsYmlBbUppQmphR2xzWkhKbGJpbGNibHgwWEhSY2RGeDBYSFJjZEZ4MFkyaHBiR1J5Wlc1Yk1GMHVabTlzWkhOYk1GMHVhR1ZoWkdsdVp5NW1iMk4xY3lncE8xeHVYSFJjZEZ4MFhIUmNkRngwWEc1Y2RGeDBYSFJjZEZ4MFhIUXZMeUJPYnl3Z2RHaGxjbVVnYVhOdUozUXVJRWx6SUhSb1pYSmxJR0Z1YjNSb1pYSWdjMmxpYkdsdVp5QjBieUJ0YjNabElHUnZkMjRnZEc4L1hHNWNkRngwWEhSY2RGeDBYSFJsYkhObElHbG1LR1p2YkdRZ1BTQlVTRWxUTG01bGVIUkdiMnhrS1Z4dVhIUmNkRngwWEhSY2RGeDBYSFJtYjJ4a0xtaGxZV1JwYm1jdVptOWpkWE1vS1R0Y2JseDBYSFJjZEZ4MFhIUmNkRnh1WEhSY2RGeDBYSFJjZEZ4MEx5OGdTWE1nZEdobGNtVWdZU0JqYjI1MFlXbHVhVzVuSUdGalkyOXlaR2x2YmlCM1pTQmpZVzRnYm1GMmFXZGhkR1VnWW1GamF5QjFjQ0IwYno5Y2JseDBYSFJjZEZ4MFhIUmNkR1ZzYzJVZ2FXWW9WRWhKVXk1aFkyTnZjbVJwYjI0dWNHRnlaVzUwS1h0Y2JseDBYSFJjZEZ4MFhIUmNkRngwZG1GeUlIQmhjbVZ1ZENBOUlGUklTVk03WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkSGRvYVd4bEtIQmhjbVZ1ZENBOUlIQmhjbVZ1ZEM1aFkyTnZjbVJwYjI0dWNHRnlaVzUwUm05c1pDbGNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUnBaaWhtYjJ4a0lEMGdjR0Z5Wlc1MExtNWxlSFJHYjJ4a0tYdGNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkR1p2YkdRdWFHVmhaR2x1Wnk1bWIyTjFjeWdwTzF4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFluSmxZV3M3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwZlZ4dVhIUmNkRngwWEhSY2RGeDBYSFJjYmx4MFhIUmNkRngwWEhSY2RGeDBMeThnVG05M2FHVnlaU0JzWldaMElIUnZJR2R2TGk0dVhHNWNkRngwWEhSY2RGeDBYSFJjZEdsbUtDRndZWEpsYm5RcElISmxkSFZ5YmlCMGNuVmxPMXh1WEhSY2RGeDBYSFJjZEZ4MGZWeHVYSFJjZEZ4MFhIUmNkRngwWEc1Y2RGeDBYSFJjZEZ4MFhIUXZMeUJPWVdndUlFcDFjM1FnYzJOeWIyeHNJSFJvWlNCM2FXNWtiM2NnYm05eWJXRnNiSGtzSUdGeklIQmxjaUJpY205M2MyVnlJR1JsWm1GMWJIUmNibHgwWEhSY2RGeDBYSFJjZEdWc2MyVWdjbVYwZFhKdUlIUnlkV1U3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNibHgwWEhSY2RGeDBYSFJjZEdVdWNISmxkbVZ1ZEVSbFptRjFiSFFvS1R0Y2JseDBYSFJjZEZ4MFhIUmNkSEpsZEhWeWJpQm1ZV3h6WlR0Y2JseDBYSFJjZEZ4MFhIUjlYRzVjZEZ4MFhIUmNkRngwWEc1Y2RGeDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RGeDBMeThnVEdWbWRDQmhjbkp2ZDF4dVhIUmNkRngwWEhSY2RHTmhjMlVnTXpjNmUxeHVYSFJjZEZ4MFhIUmNkRngwWEc1Y2RGeDBYSFJjZEZ4MFhIUXZMeUJEYkc5elpTQmhiaUJ2Y0dWdVpXUWdjMlZqZEdsdmJseHVYSFJjZEZ4MFhIUmNkRngwYVdZb1ZFaEpVeTV2Y0dWdUtTQlVTRWxUTG05d1pXNGdQU0JtWVd4elpUdGNibHgwWEhSY2RGeDBYSFJjZEZ4dVhIUmNkRngwWEhSY2RGeDBMeThnVTNkcGRHTm9JR1p2WTNWeklHSmhZMnNnZEc4Z2NHRnlaVzUwWEc1Y2RGeDBYSFJjZEZ4MFhIUmxiSE5sSUdsbUtHRmpZMjl5WkdsdmJpNXdZWEpsYm5RcFhHNWNkRngwWEhSY2RGeDBYSFJjZEdGalkyOXlaR2x2Ymk1d1lYSmxiblJHYjJ4a0xtaGxZV1JwYm1jdVptOWpkWE1vS1R0Y2JseDBYSFJjZEZ4MFhIUmNkRnh1WEhSY2RGeDBYSFJjZEZ4MFluSmxZV3M3WEc1Y2RGeDBYSFJjZEZ4MGZWeHVYSFJjZEZ4MFhIUmNkRnh1WEhSY2RGeDBYSFJjZEM4dklGSnBaMmgwSUdGeWNtOTNYRzVjZEZ4MFhIUmNkRngwWTJGelpTQXpPVHA3WEc1Y2RGeDBYSFJjZEZ4MFhIUjJZWElnWTJocGJHUnlaVzRnUFNCVVNFbFRMbU5vYVd4a1FXTmpiM0prYVc5dWN6dGNibHgwWEhSY2RGeDBYSFJjZEZ4dVhIUmNkRngwWEhSY2RGeDBMeThnVDNCbGJpQmhJR05zYjNObFpDQnpaV04wYVc5dVhHNWNkRngwWEhSY2RGeDBYSFJwWmlnaFZFaEpVeTV2Y0dWdUtTQlVTRWxUTG05d1pXNGdQU0IwY25WbE8xeHVYSFJjZEZ4MFhIUmNkRngwWEc1Y2RGeDBYSFJjZEZ4MFhIUXZMeUJUZDJsMFkyZ2dabTlqZFhNZ2RHOGdZU0J1WlhOMFpXUWdZV05qYjNKa2FXOXVYRzVjZEZ4MFhIUmNkRngwWEhSbGJITmxJR2xtS0dOb2FXeGtjbVZ1S1Z4dVhIUmNkRngwWEhSY2RGeDBYSFJqYUdsc1pISmxibHN3WFM1bWIyeGtjMXN3WFM1b1pXRmthVzVuTG1adlkzVnpLQ2s3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNibHgwWEhSY2RGeDBYSFJjZEdKeVpXRnJPMXh1WEhSY2RGeDBYSFJjZEgxY2JseDBYSFJjZEZ4MGZWeHVYSFJjZEZ4MGZTazdYRzVjZEZ4MGZWeHVYSFJjZEZ4dVhIUmNkRnh1WEhSY2RDOHZJRXhwYzNSbGJtVnlJSFJ2SUhKbFkyOXlaQ0IwYUdVZ2RtbGxkM0J2Y25RbmN5QnpZM0p2Ykd3Z2IyWm1jMlYwY3lCaGRDQjBhR1VnWW1WbmFXNXVhVzVuSUc5bUlHRWdkRzkxWTJoY2JseDBYSFIwYjNWamFFVnVZV0pzWldRZ0ppWWdhR1ZoWkdsdVp5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtGd2lkRzkxWTJoemRHRnlkRndpTENCdmJsUnZkV05vVTNSaGNuUWdQU0JtZFc1amRHbHZiaWhsS1h0Y2JseDBYSFJjZEhOamNtOXNiRmdnUFNCM2FXNWtiM2N1Y0dGblpWaFBabVp6WlhRN1hHNWNkRngwWEhSelkzSnZiR3haSUQwZ2QybHVaRzkzTG5CaFoyVlpUMlptYzJWME8xeHVYSFJjZEgwc0lIdHdZWE56YVhabE9pQjBjblZsZlNrN1hHNWNkRngwWEc1Y2RGeDBYRzVjZEZ4MGFHVmhaR2x1Wnk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0hCeVpYTnpSWFpsYm5Rc0lHOXVVSEpsYzNNZ1BTQm1kVzVqZEdsdmJpaGxLWHRjYmx4MFhIUmNkRnh1WEhSY2RGeDBMeThnVUhKbGMzTmxaQ0J2YmlCemIyMWxkR2hwYm1jZ2FXNXphV1JsSUhSb1pTQm9aV0ZrWlhKY2JseDBYSFJjZEdsbUtHVXVkR0Z5WjJWMElDRTlQU0JvWldGa2FXNW5JQ1ltSUdobFlXUnBibWN1WTI5dWRHRnBibk1vWlM1MFlYSm5aWFFwS1h0Y2JseDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RDOHZJRU5oYm1ObGJDQm1iMnhrTFhSdloyZHNaU0JwWmlCMWMyVnlJR05zYVdOclpXUWdiMjRnWVc0Z1lXNWphRzl5TFd4cGJtdGNibHgwWEhSY2RGeDBhV1lvWENKQlhDSWdQVDA5SUdVdWRHRnlaMlYwTG5SaFowNWhiV1VnSmlZZ1pTNTBZWEpuWlhRdWFISmxaaWxjYmx4MFhIUmNkRngwWEhSeVpYUjFjbTRnZEhKMVpUdGNibHgwWEhSY2RIMWNibHgwWEhSY2RGeHVYSFJjZEZ4MGFXWW9aUzUwZVhCbElDRTlQU0JjSW5SdmRXTm9aVzVrWENJZ2ZId2dLR1V1WTJGdVkyVnNZV0pzWlNBbUppQjNhVzVrYjNjdWNHRm5aVmhQWm1aelpYUWdQVDA5SUhOamNtOXNiRmdnSmlZZ2QybHVaRzkzTG5CaFoyVlpUMlptYzJWMElEMDlQU0J6WTNKdmJHeFpLU2w3WEc1Y2RGeDBYSFJjZEZSSVNWTXViM0JsYmlBOUlDRlVTRWxUTG05d1pXNDdYRzVjZEZ4MFhIUmNkR1V1Y0hKbGRtVnVkRVJsWm1GMWJIUW9LVHRjYmx4MFhIUmNkSDFjYmx4MFhIUmNkSEpsZEhWeWJpQm1ZV3h6WlR0Y2JseDBYSFI5S1R0Y2JseDBYSFJjYmx4MFhIUmNibHgwWEhSY2JseDBYSFJjYmx4MFhIUXZLaXBjYmx4MFhIUWdLaUJCWkdwMWMzUWdZU0JtYjJ4a0ozTWdZMjl1ZEdGcGJtVnlJSFJ2SUdacGRDQnBkSE1nWTI5dWRHVnVkQzVjYmx4MFhIUWdLaTljYmx4MFhIUm1kVzVqZEdsdmJpQm1hWFFvS1h0Y2JseDBYSFJjZEhaaGNpQm9aV2xuYUhRZ1BTQlVTRWxUTG1obFlXUnBibWRJWldsbmFIUTdYRzVjZEZ4MFhIUnBaaWhVU0VsVExtOXdaVzRwSUNBZ2FHVnBaMmgwSUNzOUlHTnZiblJsYm5RdWMyTnliMnhzU0dWcFoyaDBPMXh1WEhSY2RGeDBhV1lvZFhObFFtOXlaR1Z5Y3lrZ0lHaGxhV2RvZENBclBTQlVTRWxUTG1Wc1FtOXlaR1Z5TzF4dVhIUmNkRngwVkVoSlV5NW9aV2xuYUhRZ1BTQm9aV2xuYUhRN1hHNWNkRngwZlZ4dVhIUjlYRzVjYmx4dVhHNWNibHh1WEc1Y2JseDBkbUZ5SUdGalkyOXlaR2x2Ym5NZ0lDQWdJQ0FnUFNCYlhUdGNibHgwZG1GeUlHRmpkR2wyWlVGalkyOXlaR2x2Ym5NZ1BTQXdPMXh1WEhSMllYSWdiR0Z6ZEZKbGMybDZaVkpoZEdVN1hHNWNibHh1WEhRdktpcGNibHgwSUNvZ1VtVndjbVZ6Wlc1MGN5QmhJR052YkhWdGJpQnZaaUJqYjJ4c1lYQnphV0pzWlNCamIyNTBaVzUwSUhKbFoybHZibk11WEc1Y2RDQXFYRzVjZENBcUlFQndZWEpoYlNCN1NGUk5URVZzWlcxbGJuUjlJR1ZzSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdElFTnZiblJoYVc1bGNpQjNjbUZ3Y0dWa0lHRnliM1Z1WkNCbFlXTm9JR2x0YldWa2FXRjBaU0JtYjJ4a1hHNWNkQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0FnSUNBZ0lHOXdkR2x2Ym5NZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F0SUU5d2RHbHZibUZzSUdoaGMyZ2diMllnYzJWMGRHbHVaM05jYmx4MElDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlDQWdJQ0FnYjNCMGFXOXVjeTV2Y0dWdVEyeGhjM01nSUNBZ0lDMGdRMU5USUdOc1lYTnpJR052Ym5SeWIyeHNhVzVuSUdWaFkyZ2dabTlzWkNkeklGd2liM0JsYmx3aUlITjBZWFJsWEc1Y2RDQXFJRUJ3WVhKaGJTQjdVM1J5YVc1bmZTQWdJQ0FnSUc5d2RHbHZibk11WTJ4dmMyVkRiR0Z6Y3lBZ0lDQXRJRU5UVXlCamJHRnpjeUIxYzJWa0lIUnZJRzFoY21zZ1lTQm1iMnhrSUdGeklHTnNiM05sWkZ4dVhIUWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdJQ0FnSUNCdmNIUnBiMjV6TG1Wa1oyVkRiR0Z6Y3lBZ0lDQWdMU0JEVTFNZ1kyeGhjM01nZEc5bloyeGxaQ0JpWVhObFpDQnZiaUIzYUdWMGFHVnlJSFJvWlNCaWIzUjBiMjB0WldSblpTQnBjeUIyYVhOcFlteGxYRzVjZENBcUlFQndZWEpoYlNCN1UzUnlhVzVuZlNBZ0lDQWdJRzl3ZEdsdmJuTXVjMjVoY0VOc1lYTnpJQ0FnSUNBdElFTlRVeUJqYkdGemN5Qm1iM0lnWkdsellXSnNhVzVuSUhSeVlXNXphWFJwYjI1eklHSmxkSGRsWlc0Z2QybHVaRzkzSUhKbGMybDZaWE5jYmx4MElDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlDQWdJQ0FnYjNCMGFXOXVjeTVsYm1GaWJHVmtRMnhoYzNNZ0lDMGdRMU5USUdOc1lYTnpJRzFoY210cGJtY2dZVzRnWVdOamIzSmthVzl1SUdGeklHVnVZV0pzWldSY2JseDBJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJQ0FnSUNBZ2IzQjBhVzl1Y3k1a2FYTmhZbXhsWkVOc1lYTnpJQzBnUTFOVElHTnNZWE56SUcxaGNtdHBibWNnWVc0Z1lXTmpiM0prYVc5dUlHRnpJR1JwYzJGaWJHVmtYRzVjZENBcUlFQndZWEpoYlNCN1FtOXZiR1ZoYm4wZ0lDQWdJRzl3ZEdsdmJuTXVaR2x6WVdKc1pXUWdJQ0FnSUNBdElGZG9aWFJvWlhJZ2RHOGdaR2x6WVdKc1pTQjBhR1VnWVdOamIzSmthVzl1SUc5dUlHTnlaV0YwYVc5dVhHNWNkQ0FxSUVCd1lYSmhiU0I3UW05dmJHVmhibjBnSUNBZ0lHOXdkR2x2Ym5NdWJXOWtZV3dnSUNBZ0lDQWdJQ0F0SUZkb1pYUm9aWElnZEc4Z1kyeHZjMlVnZEdobElHTjFjbkpsYm5RZ1ptOXNaQ0IzYUdWdUlHOXdaVzVwYm1jZ1lXNXZkR2hsY2x4dVhIUWdLaUJBY0dGeVlXMGdlMEp2YjJ4bFlXNTlJQ0FnSUNCdmNIUnBiMjV6TG01dlFYSnBZU0FnSUNBZ0lDQWdMU0JFYVhOaFlteGxJSFJvWlNCaFpHUnBkR2x2YmlCaGJtUWdiV0Z1WVdkbGJXVnVkQ0J2WmlCQlVrbEJJR0YwZEhKcFluVjBaWE5jYmx4MElDb2dRSEJoY21GdElIdENiMjlzWldGdWZTQWdJQ0FnYjNCMGFXOXVjeTV1YjB0bGVYTWdJQ0FnSUNBZ0lDMGdSR2x6WVdKc1pTQnJaWGxpYjJGeVpDQnVZWFpwWjJGMGFXOXVYRzVjZENBcUlFQndZWEpoYlNCN1FtOXZiR1ZoYm4wZ0lDQWdJRzl3ZEdsdmJuTXVibTlVY21GdWMyWnZjbTF6SUNBdElFUnBjMkZpYkdVZ1ExTlRJSFJ5WVc1elptOXliWE03SUhCdmMybDBhVzl1YVc1bklIZHBiR3dnWW1VZ2RYTmxaQ0JwYm5OMFpXRmtYRzVjZENBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNBZ0lDQWdJRzl3ZEdsdmJuTXVhR1ZwWjJoMFQyWm1jMlYwSUNBdElFUnBjM1JoYm1ObElIUnZJRzltWm5ObGRDQmxZV05vSUdadmJHUWdZbmxjYmx4MElDb2dRSEJoY21GdElIdENiMjlzWldGdWZTQWdJQ0FnYjNCMGFXOXVjeTUxYzJWQ2IzSmtaWEp6SUNBZ0lDMGdRMjl1YzJsa1pYSWdZbTl5WkdWeWN5QjNhR1Z1SUdOaGJHTjFiR0YwYVc1bklHWnZiR1FnYUdWcFoyaDBjMXh1WEhRZ0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQWdJQ0J2Y0hScGIyNXpMbTl1Vkc5bloyeGxJQ0FnSUNBZ0xTQkRZV3hzWW1GamF5QmxlR1ZqZFhSbFpDQjNhR1Z1SUc5d1pXNXBibWNnYjNJZ1kyeHZjMmx1WnlCaElHWnZiR1JjYmx4MElDb2dRR052Ym5OMGNuVmpkRzl5WEc1Y2RDQXFMMXh1WEhSMllYSWdRV05qYjNKa2FXOXVJRDBnWm5WdVkzUnBiMjRvWld3c0lHOXdkR2x2Ym5NcGUxeHVYSFJjZEhaaGNpQlVTRWxUSUNBZ0lDQWdJQ0FnSUQwZ2RHaHBjenRjYmx4MFhIUjJZWElnWld4RGJHRnpjMlZ6SUNBZ0lDQTlJR1ZzTG1Oc1lYTnpUR2x6ZER0Y2JseDBYSFIyWVhJZ2IzQjBhVzl1Y3lBZ0lDQWdJQ0E5SUc5d2RHbHZibk1nZkh3Z2UzMDdYRzVjZEZ4MGRtRnlJR1ZrWjJWRGJHRnpjeUFnSUNBZ1BTQW9kVzVrWldacGJtVmtJRDA5UFNCdmNIUnBiMjV6TG1Wa1oyVkRiR0Z6Y3lBZ0lDQS9JRndpWldSblpTMTJhWE5wWW14bFhDSWdPaUJ2Y0hScGIyNXpMbVZrWjJWRGJHRnpjeWs3WEc1Y2RGeDBkbUZ5SUhOdVlYQkRiR0Z6Y3lBZ0lDQWdQU0FvZFc1a1pXWnBibVZrSUQwOVBTQnZjSFJwYjI1ekxuTnVZWEJEYkdGemN5QWdJQ0EvSUZ3aWMyNWhjRndpSUNBZ0lDQWdJQ0FnT2lCdmNIUnBiMjV6TG5OdVlYQkRiR0Z6Y3lrN1hHNWNkRngwZG1GeUlHVnVZV0pzWldSRGJHRnpjeUFnUFNBb2RXNWtaV1pwYm1Wa0lEMDlQU0J2Y0hScGIyNXpMbVZ1WVdKc1pXUkRiR0Z6Y3lBL0lGd2lZV05qYjNKa2FXOXVYQ0lnSUNBZ09pQnZjSFJwYjI1ekxtVnVZV0pzWldSRGJHRnpjeWs3WEc1Y2RGeDBkbUZ5SUdScGMyRmliR1ZrUTJ4aGMzTWdQU0J2Y0hScGIyNXpMbVJwYzJGaWJHVmtRMnhoYzNNN1hHNWNkRngwZG1GeUlGOW9aV2xuYUhRc0lGOWthWE5oWW14bFpDd2dYM0JoY21WdWRDd2dYM0JoY21WdWRFWnZiR1FzSUY5dGIyUmhiRHRjYmx4dVhHNWNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25ScFpYTW9WRWhKVXl3Z2UxeHVYSFJjZEZ4MGRYQmtZWFJsT2lBZ0lDQWdlM1poYkhWbE9pQjFjR1JoZEdWOUxGeHVYSFJjZEZ4MGRYQmtZWFJsUm05c1pEb2dlM1poYkhWbE9pQjFjR1JoZEdWR2IyeGtmU3hjYmx4MFhIUmNkSEpsWm5KbGMyZzZJQ0FnSUh0MllXeDFaVG9nY21WbWNtVnphSDBzWEc1Y2RGeDBYSFJjYmx4MFhIUmNkQzh2SUZkb1pYUm9aWElnZEdobElHRmpZMjl5WkdsdmJpZHpJR0psWlc0Z1pHVmhZM1JwZG1GMFpXUmNibHgwWEhSY2RHUnBjMkZpYkdWa09pQjdYRzVjZEZ4MFhIUmNkR2RsZERvZ1puVnVZM1JwYjI0b0tYc2djbVYwZFhKdUlGOWthWE5oWW14bFpEc2dmU3hjYmx4MFhIUmNkRngwYzJWME9pQm1kVzVqZEdsdmJpaHBibkIxZENsN1hHNWNkRngwWEhSY2RGeDBhV1lvS0dsdWNIVjBJRDBnSVNGcGJuQjFkQ2tnSVQwOUlGOWthWE5oWW14bFpDbDdYRzVjZEZ4MFhIUmNkRngwWEhSMllYSWdjM1I1YkdVZ0lDQTlJR1ZzTG5OMGVXeGxPMXh1WEhSY2RGeDBYSFJjZEZ4MGRtRnlJR1p2YkdSeklDQWdQU0JVU0VsVExtWnZiR1J6TzF4dVhIUmNkRngwWEhSY2RGeDBYRzVjZEZ4MFhIUmNkRngwWEhSbGJtRmliR1ZrUTJ4aGMzTWdJQ1ltSUhObGRGUnZhMlZ1S0dWc1EyeGhjM05sY3l3Z1pXNWhZbXhsWkVOc1lYTnpMQ0FnSVdsdWNIVjBLVHRjYmx4MFhIUmNkRngwWEhSY2RHUnBjMkZpYkdWa1EyeGhjM01nSmlZZ2MyVjBWRzlyWlc0b1pXeERiR0Z6YzJWekxDQmthWE5oWW14bFpFTnNZWE56TENBZ2FXNXdkWFFwTzF4dVhIUmNkRngwWEhSY2RGeDBYRzVjZEZ4MFhIUmNkRngwWEhSY2JseDBYSFJjZEZ4MFhIUmNkQzh2SUVSbFlXTjBhWFpoZEdsdVoxeHVYSFJjZEZ4MFhIUmNkRngwYVdZb1gyUnBjMkZpYkdWa0lEMGdhVzV3ZFhRcGUxeHVYSFJjZEZ4MFhIUmNkRngwWEhSemRIbHNaUzVvWldsbmFIUWdQU0J1ZFd4c08xeHVYSFJjZEZ4MFhIUmNkRngwWEhSemJtRndRMnhoYzNNZ0ppWWdaV3hEYkdGemMyVnpMbkpsYlc5MlpTaHpibUZ3UTJ4aGMzTXBPMXh1WEhSY2RGeDBYSFJjZEZ4MFhIUnBaaWhsWkdkbFEyeGhjM01wZTF4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEdWc0xuSmxiVzkyWlVWMlpXNTBUR2x6ZEdWdVpYSW9kSEpoYm5OcGRHbHZia1Z1WkN3Z1ZFaEpVeTV2YmxSeVlXNXphWFJwYjI1RmJtUXBPMXh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkR1ZzUTJ4aGMzTmxjeTV5WlcxdmRtVW9aV1JuWlVOc1lYTnpLVHRjYmx4MFhIUmNkRngwWEhSY2RGeDBmVnh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNibHgwWEhSY2RGeDBYSFJjZEZ4MFptOXlLSFpoY2lCcElEMGdNQ3dnYkNBOUlHWnZiR1J6TG14bGJtZDBhRHNnYVNBOElHdzdJQ3NyYVNsY2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSbWIyeGtjMXRwWFM1a2FYTmhZbXhsWkNBOUlIUnlkV1U3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRnh1WEhSY2RGeDBYSFJjZEZ4MFhIUlVTRWxUTG01dlFYSnBZU0I4ZkNCbGJDNXlaVzF2ZG1WQmRIUnlhV0oxZEdVb1hDSnliMnhsWENJcE8xeHVYSFJjZEZ4MFhIUmNkRngwWEhRdExXRmpkR2wyWlVGalkyOXlaR2x2Ym5NN1hHNWNkRngwWEhSY2RGeDBYSFI5WEc1Y2RGeDBYSFJjZEZ4MFhIUmNibHgwWEhSY2RGeDBYSFJjZEZ4dVhIUmNkRngwWEhSY2RGeDBMeThnVW1WaFkzUnBkbUYwYVc1blhHNWNkRngwWEhSY2RGeDBYSFJsYkhObGUxeHVYSFJjZEZ4MFhIUmNkRngwWEhSbWIzSW9kbUZ5SUdrZ1BTQXdMQ0JzSUQwZ1ptOXNaSE11YkdWdVozUm9PeUJwSUR3Z2JEc2dLeXRwS1Z4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEdadmJHUnpXMmxkTG1ScGMyRmliR1ZrSUQwZ1ptRnNjMlU3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRnh1WEhSY2RGeDBYSFJjZEZ4MFhIUlVTRWxUTG01dlFYSnBZU0I4ZkNCbGJDNXpaWFJCZEhSeWFXSjFkR1VvWENKeWIyeGxYQ0lzSUZ3aWRHRmliR2x6ZEZ3aUtUdGNibHgwWEhSY2RGeDBYSFJjZEZ4MEt5dGhZM1JwZG1WQlkyTnZjbVJwYjI1ek8xeHVYSFJjZEZ4MFhIUmNkRngwWEhSMWNHUmhkR1VvS1R0Y2JseDBYSFJjZEZ4MFhIUmNkSDFjYmx4MFhIUmNkRngwWEhSY2RGeHVYRzVjZEZ4MFhIUmNkRngwWEhSY2JseDBYSFJjZEZ4MFhIUmNkQzh2SUVsbUlIUm9aWEpsSjNKbElHNXZJRzF2Y21VZ1lXTjBhWFpsSUdGalkyOXlaR2x2Ym5Nc0lHUnBjMkZpYkdVZ2RHaGxJRzl1VW1WemFYcGxJR2hoYm1Sc1pYSmNibHgwWEhSY2RGeDBYSFJjZEdsbUtHRmpkR2wyWlVGalkyOXlaR2x2Ym5NZ1BEMGdNQ2w3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkR0ZqZEdsMlpVRmpZMjl5WkdsdmJuTWdQU0F3TzF4dVhIUmNkRngwWEhSY2RGeDBYSFJCWTJOdmNtUnBiMjR1YzJWMFVtVnphWHBsVW1GMFpTaG1ZV3h6WlNrN1hHNWNkRngwWEhSY2RGeDBYSFI5WEc1Y2RGeDBYSFJjZEZ4MFhIUmNibHgwWEhSY2RGeDBYSFJjZEM4dklFOTBhR1Z5ZDJselpTd2djbVZoWTNScGRtRjBaU0IwYUdVZ2IyNVNaWE5wZW1VZ2FHRnVaR3hsY2l3Z1lYTnpkVzFwYm1jZ2FYUWdkMkZ6SUhCeVpYWnBiM1Z6YkhrZ1lXTjBhWFpsWEc1Y2RGeDBYSFJjZEZ4MFhIUmxiSE5sSUdsbUtHeGhjM1JTWlhOcGVtVlNZWFJsS1Z4dVhIUmNkRngwWEhSY2RGeDBYSFJCWTJOdmNtUnBiMjR1YzJWMFVtVnphWHBsVW1GMFpTaHNZWE4wVW1WemFYcGxVbUYwWlNrN1hHNWNkRngwWEhSY2RGeDBmVnh1WEhSY2RGeDBYSFI5WEc1Y2RGeDBYSFI5TEZ4dVhIUmNkRngwWEc1Y2RGeDBYSFF2THlCSFpYUWdiM0lnYzJWMElIUm9aU0JoWTJOdmNtUnBiMjRnWlc1amJHOXphVzVuSUhSb2FYTWdiMjVsWEc1Y2RGeDBYSFJ3WVhKbGJuUTZJSHRjYmx4MFhIUmNkRngwYzJWME9pQm1kVzVqZEdsdmJpaHBibkIxZENsN0lGOXdZWEpsYm5RZ1BTQnBibkIxZERzZ2ZTeGNibHgwWEhSY2RGeDBaMlYwT2lCbWRXNWpkR2x2YmlncGUxeHVYSFJjZEZ4MFhIUmNkSFpoY2lCeVpYTjFiSFFnUFNCZmNHRnlaVzUwTzF4dVhIUmNkRngwWEhSY2RHbG1LQ0Z5WlhOMWJIUXBJSEpsZEhWeWJpQnVkV3hzTzF4dVhIUmNkRngwWEhSY2RGeHVYSFJjZEZ4MFhIUmNkQzh2SUZObFlYSmphQ0JtYjNJZ2RHaGxJR1pwY25OMElHRnVZMlZ6ZEc5eUlIUm9ZWFFnS21semJpZDBLaUJrYVhOaFlteGxaRnh1WEhSY2RGeDBYSFJjZEhkb2FXeGxLSEpsYzNWc2RDbDdYRzVjZEZ4MFhIUmNkRngwWEhScFppZ2hjbVZ6ZFd4MExtUnBjMkZpYkdWa0tTQnlaWFIxY200Z2NtVnpkV3gwTzF4dVhIUmNkRngwWEhSY2RGeDBjbVZ6ZFd4MElEMGdjbVZ6ZFd4MExuQmhjbVZ1ZER0Y2JseDBYSFJjZEZ4MFhIUjlYRzVjZEZ4MFhIUmNkRngwY21WMGRYSnVJRzUxYkd3N1hHNWNkRngwWEhSY2RIMWNibHgwWEhSY2RIMHNYRzVjZEZ4MFhIUmNibHgwWEhSY2RDOHZJRWRsZENCdmNpQnpaWFFnZEdobElHWnZiR1FnYjJZZ2RHaGxJR0ZqWTI5eVpHbHZiaUJsYm1Oc2IzTnBibWNnZEdocGN5QnZibVZjYmx4MFhIUmNkSEJoY21WdWRFWnZiR1E2SUh0Y2JseDBYSFJjZEZ4MGMyVjBPaUJtZFc1amRHbHZiaWhwYm5CMWRDbDdJRjl3WVhKbGJuUkdiMnhrSUQwZ2FXNXdkWFE3SUgwc1hHNWNkRngwWEhSY2RHZGxkRG9nWm5WdVkzUnBiMjRvS1h0Y2JseDBYSFJjZEZ4MFhIUjJZWElnWm05c1pDQTlJRjl3WVhKbGJuUkdiMnhrTzF4dVhIUmNkRngwWEhSY2RHbG1LQ0ZtYjJ4a0tTQnlaWFIxY200Z2JuVnNiRHRjYmx4MFhIUmNkRngwWEhSY2JseDBYSFJjZEZ4MFhIUjJZWElnWVdOamIzSmthVzl1SUQwZ1ptOXNaQzVoWTJOdmNtUnBiMjQ3WEc1Y2RGeDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RGeDBMeThnVTJWaGNtTm9JR1p2Y2lCMGFHVWdabWx5YzNRZ1lXNWpaWE4wYjNJZ2RHaGhkQ0FxYVhOdUozUXFJR1JwYzJGaWJHVmtYRzVjZEZ4MFhIUmNkRngwZDJocGJHVW9abTlzWkNBbUppQmhZMk52Y21ScGIyNHBlMXh1WEhSY2RGeDBYSFJjZEZ4MGFXWW9JV0ZqWTI5eVpHbHZiaTVrYVhOaFlteGxaQ2tnY21WMGRYSnVJR1p2YkdRN1hHNWNkRngwWEhSY2RGeDBYSFJwWmloaFkyTnZjbVJwYjI0Z1BTQmhZMk52Y21ScGIyNHVjR0Z5Wlc1MEtWeHVYSFJjZEZ4MFhIUmNkRngwWEhSbWIyeGtJRDBnWVdOamIzSmthVzl1TG5CaGNtVnVkRVp2YkdRN1hHNWNkRngwWEhSY2RGeDBmVnh1WEhSY2RGeDBYSFJjZEhKbGRIVnliaUJ1ZFd4c08xeHVYSFJjZEZ4MFhIUjlYRzVjZEZ4MFhIUjlMRnh1WEhSY2RGeDBYRzVjZEZ4MFhIUXZMeUJJWldsbmFIUWdiMllnZEdobElHRmpZMjl5WkdsdmJpZHpJR052Ym5SaGFXNWxjaUJsYkdWdFpXNTBYRzVjZEZ4MFhIUm9aV2xuYUhRNklIdGNibHgwWEhSY2RGeDBaMlYwT2lCbWRXNWpkR2x2YmlncGV5QnlaWFIxY200Z1gyaGxhV2RvZERzZ2ZTeGNibHgwWEhSY2RGeDBjMlYwT2lCbWRXNWpkR2x2YmlocGJuQjFkQ2w3WEc1Y2RGeDBYSFJjZEZ4MGFXWW9hVzV3ZFhRZ0ppWWdLR2x1Y0hWMElEMGdLMmx1Y0hWMEtTQWhQVDBnWDJobGFXZG9kQ2w3WEc1Y2RGeDBYSFJjZEZ4MFhIUmxiQzV6ZEhsc1pTNW9aV2xuYUhRZ1BTQnBibkIxZENBcklGd2ljSGhjSWp0Y2JseDBYSFJjZEZ4MFhIUmNkRjlvWldsbmFIUWdJQ0FnSUNBZ0lDQTlJR2x1Y0hWME8xeHVYSFJjZEZ4MFhIUmNkSDFjYmx4MFhIUmNkRngwZlZ4dVhIUmNkRngwZlN4Y2JseDBYSFJjZEZ4dVhIUmNkRngwTHk4Z1YyaGxkR2hsY2lCdmJtVWdiMllnZEdobElFRmpZMjl5WkdsdmJpZHpJR1p2YkdSeklHaGhjeUJpWldWdUlISmxjMmw2WldRZ2FXNWpiM0p5WldOMGJIbGNibHgwWEhSY2RIZHliMjVuVTJsNlpUb2dlMXh1WEhSY2RGeDBYSFJuWlhRNklHWjFibU4wYVc5dUtDbDdYRzVjZEZ4MFhIUmNkRngwZG1GeUlHRWdQU0IwYUdsekxtWnZiR1J6TzF4dVhIUmNkRngwWEhSY2RIWmhjaUJzSUQwZ1lTNXNaVzVuZEdnN1hHNWNkRngwWEhSY2RGeDBkbUZ5SUdrZ1BTQXdPMXh1WEhSY2RGeDBYSFJjZEdadmNpZzdJR2tnUENCc095QXJLMmtwSUdsbUtHRmJhVjB1ZDNKdmJtZFRhWHBsS1NCeVpYUjFjbTRnZEhKMVpUdGNibHgwWEhSY2RGeDBYSFJwWmloaElEMGdkR2hwY3k1amFHbHNaRUZqWTI5eVpHbHZibk1wWEc1Y2RGeDBYSFJjZEZ4MFptOXlLRHNnYVNBOElHdzdJQ3NyYVNrZ2FXWW9ZVnRwWFM1M2NtOXVaMU5wZW1VcElISmxkSFZ5YmlCMGNuVmxPMXh1WEhSY2RGeDBYSFJjZEhKbGRIVnliaUJtWVd4elpUdGNibHgwWEhSY2RGeDBmVnh1WEhSY2RGeDBmU3hjYmx4MFhIUmNkRnh1WEhSY2RGeDBMeThnVkc5d0xXeGxkbVZzSUdGdVkyVnpkRzl5SUhSb2FYTWdZV05qYjNKa2FXOXVKM01nYm1WemRHVmtJR2x1YzJsa1pWeHVYSFJjZEZ4MGNtOXZkRG9nZTF4dVhIUmNkRngwWEhSblpYUTZJR1oxYm1OMGFXOXVLQ2w3WEc1Y2RGeDBYSFJjZEZ4MGRtRnlJSEpsYzNWc2RDQTlJSFJvYVhNN1hHNWNkRngwWEhSY2RGeDBkMmhwYkdVb2NtVnpkV3gwS1h0Y2JseDBYSFJjZEZ4MFhIUmNkR2xtS0NGeVpYTjFiSFF1Y0dGeVpXNTBLU0J5WlhSMWNtNGdjbVZ6ZFd4ME8xeHVYSFJjZEZ4MFhIUmNkRngwY21WemRXeDBJRDBnY21WemRXeDBMbkJoY21WdWREdGNibHgwWEhSY2RGeDBYSFI5WEc1Y2RGeDBYSFJjZEgxY2JseDBYSFJjZEgxY2JseDBYSFI5S1R0Y2JseHVYSFJjZEZ4dVhIUmNkQzh2SUVGemMybG5iaUJ2Y0hScGIyNXpJR0Z6SUhCeWIzQmxjblJwWlhOY2JseDBYSFJVU0VsVExtOXdaVzVEYkdGemN5QWdJQ0E5SUc5d2RHbHZibk11YjNCbGJrTnNZWE56SUNCOGZDQmNJbTl3Wlc1Y0lqdGNibHgwWEhSVVNFbFRMbU5zYjNObFEyeGhjM01nSUNBOUlHOXdkR2x2Ym5NdVkyeHZjMlZEYkdGemN5QjhmQ0JjSW1Oc2IzTmxaRndpTzF4dVhIUmNkRlJJU1ZNdWJXOWtZV3dnSUNBZ0lDQWdJRDBnSVNGdmNIUnBiMjV6TG0xdlpHRnNPMXh1WEhSY2RGUklTVk11Ym05QmNtbGhJQ0FnSUNBZ0lEMGdJU0Z2Y0hScGIyNXpMbTV2UVhKcFlUdGNibHgwWEhSVVNFbFRMbTV2UzJWNWN5QWdJQ0FnSUNBOUlDRWhiM0IwYVc5dWN5NXViMHRsZVhNN1hHNWNkRngwVkVoSlV5NXViMVJ5WVc1elptOXliWE1nUFNBaElXOXdkR2x2Ym5NdWJtOVVjbUZ1YzJadmNtMXpPMXh1WEhSY2RGUklTVk11YVc1a1pYZ2dJQ0FnSUNBZ0lEMGdZV05qYjNKa2FXOXVjeTV3ZFhOb0tGUklTVk1wSUMwZ01UdGNibHgwWEhSVVNFbFRMbWhsYVdkb2RFOW1abk5sZENBOUlDdHZjSFJwYjI1ekxtaGxhV2RvZEU5bVpuTmxkQ0I4ZkNBd08xeHVYSFJjZEZSSVNWTXVkWE5sUW05eVpHVnljeUFnSUQwZ2RXNWtaV1pwYm1Wa0lEMDlQU0J2Y0hScGIyNXpMblZ6WlVKdmNtUmxjbk1nUHlCY0ltRjFkRzljSWlBNklHOXdkR2x2Ym5NdWRYTmxRbTl5WkdWeWN6dGNibHgwWEhSVVNFbFRMbTl1Vkc5bloyeGxJQ0FnSUNBOUlHOXdkR2x2Ym5NdWIyNVViMmRuYkdVN1hHNWNkRngwWEc1Y2RGeDBYRzVjZEZ4MEx5OGdRM0psWVhSbElHRWdabTlzWkNCbWIzSWdaV0ZqYUNCcGJXMWxaR2xoZEdVZ1pHVnpZMlZ1WkdGdWRDQnZaaUIwYUdVZ1FXTmpiM0prYVc5dUozTWdZMjl1ZEdGcGJtVnlYRzVjZEZ4MGRtRnlJR1p2YkdSeklEMGdXMTA3WEc1Y2RGeDBaV0ZqYUM1allXeHNLR1ZzTG1Ob2FXeGtjbVZ1TENCbWRXNWpkR2x2YmlocEtYdGNibHgwWEhSY2RIWmhjaUJtYjJ4a0lEMGdibVYzSUVadmJHUW9WRWhKVXl3Z2FTazdYRzVjZEZ4MFhIUm1iMnhrY3k1d2RYTm9LR1p2YkdRcE8xeHVYSFJjZEZ4MFhHNWNkRngwWEhRdkx5QkRiMjV1WldOMElIUm9aU0JtYjJ4a0lIUnZJR2wwY3lCd2NtVjJhVzkxY3lCemFXSnNhVzVuTENCcFppQnBkQ2R6SUc1dmRDQjBhR1VnWm1seWMzUWdkRzhnWW1VZ1lXUmtaV1JjYmx4MFhIUmNkSFpoY2lCd2NtVjJJRDBnWm05c1pITmJabTlzWkhNdWJHVnVaM1JvSUMwZ01sMDdYRzVjZEZ4MFhIUnBaaWh3Y21WMktYdGNibHgwWEhSY2RGeDBjSEpsZGk1dVpYaDBSbTlzWkNBZ0lDQWdQU0JtYjJ4a08xeHVYSFJjZEZ4MFhIUm1iMnhrTG5CeVpYWnBiM1Z6Um05c1pDQTlJSEJ5WlhZN1hHNWNkRngwWEhSOVhHNWNkRngwZlNrN1hHNWNkRngwWEc1Y2RGeDBYRzVjZEZ4MFpXd3VZV05qYjNKa2FXOXVJQ0FnSUQwZ1ZFaEpVeTVwYm1SbGVEdGNibHgwWEhSVVNFbFRMbTV2UVhKcFlTQjhmQ0JsYkM1elpYUkJkSFJ5YVdKMWRHVW9YQ0p5YjJ4bFhDSXNJRndpZEdGaWJHbHpkRndpS1R0Y2JseDBYSFJVU0VsVExtVnNJQ0FnSUNBZ0lDQWdQU0JsYkR0Y2JseDBYSFJVU0VsVExtWnZiR1J6SUNBZ0lDQWdQU0JtYjJ4a2N6dGNibHgwWEhSY2JseDBYSFF2THlCQlpHUWdMbVZ1WVdKc1pXUkRiR0Z6Y3lCbFlYSnNlU0F0SUdsMElHMXBaMmgwSUdGbVptVmpkQ0IwYUdVZ2FHVnBaMmgwY3lCdlppQmxZV05vSUdadmJHUmNibHgwWEhScFppZ2hiM0IwYVc5dWN5NWthWE5oWW14bFpDQW1KaUJsYm1GaWJHVmtRMnhoYzNNcFhHNWNkRngwWEhSbGJFTnNZWE56WlhNdVlXUmtLR1Z1WVdKc1pXUkRiR0Z6Y3lrN1hHNWNkRngwWEc1Y2RGeDBkWEJrWVhSbEtDazdYRzVjZEZ4MFhHNWNkRngwWEc1Y2RGeDBMeThnUm1sdVpDQnZkWFFnYVdZZ2RHaHBjeUJoWTJOdmNtUnBiMjRuY3lCdVpYTjBaV1FnYVc1emFXUmxJR0Z1YjNSb1pYSmNibHgwWEhSMllYSWdibVY0ZENBOUlHVnNPMXh1WEhSY2RIZG9hV3hsS0NodVpYaDBJRDBnYm1WNGRDNXdZWEpsYm5ST2IyUmxLU0FtSmlBeElEMDlQU0J1WlhoMExtNXZaR1ZVZVhCbEtYdGNibHgwWEhSY2RIWmhjaUJtYjJ4a0lEMGdRV05qYjNKa2FXOXVMbWRsZEVadmJHUW9ibVY0ZENrN1hHNWNkRngwWEhScFppaG1iMnhrS1h0Y2JseDBYSFJjZEZ4MGRtRnlJR0ZqWTI5eVpHbHZiaUFnSUQwZ1ptOXNaQzVoWTJOdmNtUnBiMjQ3WEc1Y2RGeDBYSFJjZEZSSVNWTXVjR0Z5Wlc1MElDQWdJQ0E5SUdGalkyOXlaR2x2Ymp0Y2JseDBYSFJjZEZ4MFZFaEpVeTV3WVhKbGJuUkdiMnhrSUQwZ1ptOXNaRHRjYmx4MFhIUmNkRngwWldSblpVTnNZWE56SUNZbUlHVnNRMnhoYzNObGN5NXlaVzF2ZG1Vb1pXUm5aVU5zWVhOektUdGNibHgwWEhSY2RGeDBLR0ZqWTI5eVpHbHZiaTVqYUdsc1pFRmpZMjl5WkdsdmJuTWdQU0JoWTJOdmNtUnBiMjR1WTJocGJHUkJZMk52Y21ScGIyNXpJSHg4SUZ0ZEtTNXdkWE5vS0ZSSVNWTXBPMXh1WEhSY2RGeDBYSFFvWm05c1pDNWphR2xzWkVGalkyOXlaR2x2Ym5NZ0lDQWdJQ0E5SUdadmJHUXVZMmhwYkdSQlkyTnZjbVJwYjI1eklDQWdJQ0FnZkh3Z1cxMHBMbkIxYzJnb1ZFaEpVeWs3WEc1Y2JseDBYSFJjZEZ4MEx5OGdRV1JxZFhOMElIUm9aU0JvWldsbmFIUWdiMllnZEdobElHTnZiblJoYVc1cGJtY2dabTlzWkNkeklHVnNaVzFsYm5SY2JseDBYSFJjZEZ4MGFXWW9abTlzWkM1dmNHVnVLWHRjYmx4MFhIUmNkRngwWEhSMllYSWdjMk55YjJ4c1NHVnBaMmgwSUQwZ1ptOXNaQzVsYkM1elkzSnZiR3hJWldsbmFIUTdYRzVjZEZ4MFhIUmNkRngwZG1GeUlHUnBjM1JoYm1ObElDQWdJQ0E5SUNobWIyeGtMbWhsWVdScGJtZElaV2xuYUhRZ0t5Qm1iMnhrTG1OdmJuUmxiblF1YzJOeWIyeHNTR1ZwWjJoMEtTQXRJSE5qY205c2JFaGxhV2RvZENCOGZDQW9jMk55YjJ4c1NHVnBaMmgwSUMwZ1ptOXNaQzVsYkM1amJHbGxiblJJWldsbmFIUXBPMXh1WEhSY2RGeDBYSFJjZEdGalkyOXlaR2x2Ymk1MWNHUmhkR1ZHYjJ4a0tHWnZiR1FzSUdScGMzUmhibU5sS1R0Y2JseDBYSFJjZEZ4MGZWeHVYSFJjZEZ4MFhIUmljbVZoYXp0Y2JseDBYSFJjZEgxY2JseDBYSFI5WEc1Y2RGeDBYRzVjZEZ4MFhHNWNkRngwWldSblpVTnNZWE56SUNZbUlHVnNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9kSEpoYm5OcGRHbHZia1Z1WkN3Z2RHaHBjeTV2YmxSeVlXNXphWFJwYjI1RmJtUWdQU0JtZFc1amRHbHZiaWhsS1h0Y2JseDBYSFJjZEdsbUtDRlVTRWxUTG5CaGNtVnVkQ0FtSmlCbExuUmhjbWRsZENBOVBUMGdaV3dnSmlZZ1hDSm9aV2xuYUhSY0lpQTlQVDBnWlM1d2NtOXdaWEowZVU1aGJXVWdKaVlnWld3dVoyVjBRbTkxYm1ScGJtZERiR2xsYm5SU1pXTjBLQ2t1WW05MGRHOXRJRDRnZDJsdVpHOTNMbWx1Ym1WeVNHVnBaMmgwS1Z4dVhIUmNkRngwWEhSbGJFTnNZWE56WlhNdWNtVnRiM1psS0dWa1oyVkRiR0Z6Y3lrN1hHNWNkRngwZlNrN1hHNWNkRngwWEc1Y2RGeDBkR2hwY3k1a2FYTmhZbXhsWkNBOUlDRWhiM0IwYVc5dWN5NWthWE5oWW14bFpEdGNibHgwWEhSY2JseDBYSFJjYmx4MFhIUmNibHgwWEhRdktpcGNibHgwWEhRZ0tpQkpiblJsY201aGJDQnRaWFJvYjJRZ2RHOGdZMmhsWTJzZ2FXWWdZVzRnWVdOamIzSmthVzl1SjNNZ1ltOTBkRzl0TFdWa1oyVWdhWE1nZG1semFXSnNaU0IwYnlCMGFHVWdkWE5sY2lBb2IzSWdZV0p2ZFhRZ2RHOGdZbVVwTGx4dVhIUmNkQ0FxWEc1Y2RGeDBJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJRzltWm5ObGRGeHVYSFJjZENBcUlFQndjbWwyWVhSbFhHNWNkRngwSUNvdlhHNWNkRngwWm5WdVkzUnBiMjRnWldSblpVTm9aV05yS0c5bVpuTmxkQ2w3WEc1Y2RGeDBYSFJwWmlobFpHZGxRMnhoYzNNcGUxeHVYSFJjZEZ4MFhIUjJZWElnWW05NElDQWdJQ0FnSUNBZ1BTQmxiQzVuWlhSQ2IzVnVaR2x1WjBOc2FXVnVkRkpsWTNRb0tUdGNibHgwWEhSY2RGeDBkbUZ5SUhkcGJtUnZkMFZrWjJVZ0lEMGdkMmx1Wkc5M0xtbHVibVZ5U0dWcFoyaDBPMXh1WEhSY2RGeDBYSFJjYmx4MFhIUmNkRngwTHk4Z1NXWWdkR2hsSUdKdmRIUnZiUzFsWkdkbElHbHpJSFpwYzJsaWJHVWdLRzl5SUdGaWIzVjBJSFJ2SUdKbEtTd2daVzVoWW14bElHaGxhV2RvZENCaGJtbHRZWFJwYjI1Y2JseDBYSFJjZEZ4MGFXWW9ZbTk0TG1KdmRIUnZiU0FySUNodlptWnpaWFFnZkh3Z01Da2dQQ0IzYVc1a2IzZEZaR2RsS1Z4dVhIUmNkRngwWEhSY2RHVnNRMnhoYzNObGN5NWhaR1FvWldSblpVTnNZWE56S1Z4dVhIUmNkRngwWEhSY2JseDBYSFJjZEZ4MEx5OGdTV1lnZEdobElHSnZkSFJ2YlMxbFpHZGxJR2x6YmlkMElIWnBjMmxpYkdVZ1lXNTVkMkY1TENCa2FYTmhZbXhsSUdobGFXZG9kQ0JoYm1sdFlYUnBiMjRnYVcxdFpXUnBZWFJsYkhsY2JseDBYSFJjZEZ4MFpXeHpaU0JwWmloaWIzZ3VZbTkwZEc5dElENGdkMmx1Wkc5M1JXUm5aU2xjYmx4MFhIUmNkRngwWEhSbGJFTnNZWE56WlhNdWNtVnRiM1psS0dWa1oyVkRiR0Z6Y3lrN1hHNWNkRngwWEhSOVhHNWNkRngwZlZ4dVhIUmNkRnh1WEhSY2RGeHVYSFJjZEZ4dVhIUmNkQzhxS2x4dVhIUmNkQ0FxSUZWd1pHRjBaU0IwYUdVZ2RtVnlkR2xqWVd3Z2IzSmthVzVoZEdVZ2IyWWdaV0ZqYUNCemFXSnNhVzVuSUdadmNpQmhJSEJoY25ScFkzVnNZWElnWm05c1pDNWNibHgwWEhRZ0tseHVYSFJjZENBcUlFQndZWEpoYlNCN1JtOXNaSDBnWm05c1pGeHVYSFJjZENBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCdlptWnpaWFFnTFNCUWFYaGxiQ0JrYVhOMFlXNWpaU0IwYnlCaFpHcDFjM1FnWW5sY2JseDBYSFFnS2k5Y2JseDBYSFJtZFc1amRHbHZiaUIxY0dSaGRHVkdiMnhrS0dadmJHUXNJRzltWm5ObGRDbDdYRzVjZEZ4MFhIUjJZWElnYm1WNGRDQTlJR1p2YkdRN1hHNWNkRngwWEhSMllYSWdjR0Z5Wlc1MFJtOXNaQ0E5SUZSSVNWTXVjR0Z5Wlc1MFJtOXNaRHRjYmx4MFhIUmNkRnh1WEhSY2RGeDBkMmhwYkdVb2JtVjRkQ0E5SUc1bGVIUXVibVY0ZEVadmJHUXBYRzVjZEZ4MFhIUmNkRzVsZUhRdWVTQWdLejBnYjJabWMyVjBPMXh1WEhSY2RGeDBjR0Z5Wlc1MFJtOXNaQ0I4ZkNCbFpHZGxRMmhsWTJzb2IyWm1jMlYwS1R0Y2JseDBYSFJjZEdadmJHUXVhR1ZwWjJoMElDczlJRzltWm5ObGREdGNibHgwWEhSY2RGUklTVk11YUdWcFoyaDBJQ3M5SUc5bVpuTmxkRHRjYmx4MFhIUmNkRnh1WEhSY2RGeDBjR0Z5Wlc1MFJtOXNaQ0FtSmlCd1lYSmxiblJHYjJ4a0xtOXdaVzRnSmlZZ1ZFaEpVeTV3WVhKbGJuUXVkWEJrWVhSbFJtOXNaQ2h3WVhKbGJuUkdiMnhrTENCdlptWnpaWFFwTzF4dVhIUmNkSDFjYmx4MFhIUmNibHgwWEhSY2JseDBYSFF2S2lwY2JseDBYSFFnS2lCVmNHUmhkR1VnZEdobElHaGxhV2RvZENCdlppQmxZV05vSUdadmJHUWdkRzhnWm1sMElHbDBjeUJqYjI1MFpXNTBMbHh1WEhSY2RDQXFMMXh1WEhSY2RHWjFibU4wYVc5dUlIVndaR0YwWlNncGUxeHVYSFJjZEZ4MGRtRnlJSGtnSUNBZ0lDQTlJREE3WEc1Y2RGeDBYSFIyWVhJZ2FHVnBaMmgwSUQwZ01EdGNibHgwWEhSY2RIWmhjaUJwSUNBZ0lDQWdQU0F3TzF4dVhIUmNkRngwZG1GeUlHd2dJQ0FnSUNBOUlHWnZiR1J6TG14bGJtZDBhRHRjYmx4MFhIUmNkSFpoY2lCd1lYSmxiblJHYjJ4a0lEMGdWRWhKVXk1d1lYSmxiblJHYjJ4a08xeHVYSFJjZEZ4MGRtRnlJR1p2YkdRc0lHUnBabVk3WEc1Y2RGeDBYSFJjYmx4MFhIUmNkR1p2Y2lnN0lHa2dQQ0JzT3lBcksya3BlMXh1WEhSY2RGeDBYSFJtYjJ4a0lDQWdQU0JtYjJ4a2MxdHBYVHRjYmx4MFhIUmNkRngwWm05c1pDNTVJRDBnZVR0Y2JseDBYSFJjZEZ4MFptOXNaQzVtYVhRb0tUdGNibHgwWEhSY2RGeDBlU0FnSUNBZ0lDczlJR1p2YkdRdWFHVnBaMmgwTzF4dVhIUmNkRngwWEhSb1pXbG5hSFFnS3owZ1ptOXNaQzVvWldsbmFIUTdYRzVjZEZ4MFhIUjlYRzVjZEZ4MFhIUmNibHgwWEhSY2RHUnBabVlnUFNCb1pXbG5hSFFnTFNCZmFHVnBaMmgwTzF4dVhIUmNkRngwY0dGeVpXNTBSbTlzWkZ4dVhIUmNkRngwWEhRL0lDaHdZWEpsYm5SR2IyeGtMbTl3Wlc0Z0ppWWdWRWhKVXk1d1lYSmxiblF1ZFhCa1lYUmxSbTlzWkNod1lYSmxiblJHYjJ4a0xDQmthV1ptS1NsY2JseDBYSFJjZEZ4ME9pQmxaR2RsUTJobFkyc29aR2xtWmlrN1hHNWNkRngwWEhSY2JseDBYSFJjZEZSSVNWTXVhR1ZwWjJoMElEMGdhR1ZwWjJoME8xeHVYSFJjZEgxY2JseDBYSFJjYmx4MFhIUmNibHgwWEhSY2JseDBYSFF2S2lwY2JseDBYSFFnS2lCU1pXTmhiR04xYkdGMFpTQjBhR1VnWW05MWJtUmhjbWxsY3lCdlppQmhiaUJCWTJOdmNtUnBiMjRnWVc1a0lHbDBjeUJrWlhOalpXNWtZVzUwY3k1Y2JseDBYSFFnS2x4dVhIUmNkQ0FxSUZSb2FYTWdiV1YwYUc5a0lITm9iM1ZzWkNCdmJteDVJR0psSUdOaGJHeGxaQ0JwWmlCMGFHVWdkMmxrZEdnZ2IyWWdZU0JqYjI1MFlXbHVaWElnWTJoaGJtZGxjeXhjYmx4MFhIUWdLaUJ2Y2lCaElHWnZiR1FuY3lCamIyNTBaVzUwY3lCb1lYWmxJSEpsYzJsNlpXUWdkVzVsZUhCbFkzUmxaR3g1SUNoemRXTm9JR0Z6SUhkb1pXNGdhVzFoWjJWeklHeHZZV1FwTGx4dVhIUmNkQ0FxWEc1Y2RGeDBJQ29nUUhCaGNtRnRJSHRDYjI5c1pXRnVmU0JoYkd4dmQxTnVZWEFnTFNCVGJtRndJR1p2YkdSeklHbHVjM1JoYm5Sc2VTQnBiblJ2SUhCc1lXTmxJSGRwZEdodmRYUWdkSEpoYm5OcGRHbHZibWx1WjF4dVhIUmNkQ0FxTDF4dVhIUmNkR1oxYm1OMGFXOXVJSEpsWm5KbGMyZ29ZV3hzYjNkVGJtRndLWHRjYmx4MFhIUmNkSFpoY2lCemJtRndJRDBnWVd4c2IzZFRibUZ3SUQ4Z2MyNWhjRU5zWVhOeklEb2dabUZzYzJVN1hHNWNkRngwWEhSemJtRndJQ1ltSUdWc1EyeGhjM05sY3k1aFpHUW9jMjVoY0NrN1hHNWNkRngwWEhSY2JseDBYSFJjZEZSSVNWTXVkWEJrWVhSbEtDazdYRzVjZEZ4MFhIUlVTRWxUTG1Ob2FXeGtRV05qYjNKa2FXOXVjeUFtSmlCVVNFbFRMbU5vYVd4a1FXTmpiM0prYVc5dWN5NW1iM0pGWVdOb0tHWjFibU4wYVc5dUtHRXBlMXh1WEhSY2RGeDBYSFJoTG5CaGNtVnVkRVp2YkdRdWIzQmxibHh1WEhSY2RGeDBYSFJjZEQ4Z1lTNXlaV1p5WlhOb0tHRnNiRzkzVTI1aGNDbGNibHgwWEhSY2RGeDBYSFE2SUNoaExuQmhjbVZ1ZEVadmJHUXVibVZsWkhOU1pXWnlaWE5vSUQwZ2RISjFaU2s3WEc1Y2RGeDBYSFI5S1R0Y2JseDBYSFJjZEZ4dVhIUmNkRngwYzI1aGNDQW1KaUJ6WlhSVWFXMWxiM1YwS0daMWJtTjBhVzl1S0dVcGUyVnNRMnhoYzNObGN5NXlaVzF2ZG1Vb2MyNWhjQ2w5TENBeU1DazdYRzVjZEZ4MGZWeHVYSFI5WEc1Y2JseDBMeThnU1dZZ1NVVTRVRkFnWlhocGMzUnpMQ0JwZENCdFpXRnVjeUIwYUdVZ1lYVjBhRzl5SUhkaGJuUnpMMjVsWldSeklFbEZPQ0J6ZFhCd2IzSjBMaUJUWldVZ1lXeHpiem9nZEdsdWVYVnliQzVqYjIwdlptbDRTVVU0TFRsY2JseDBhV1lvWENKbWRXNWpkR2x2Ymx3aUlEMDlQU0IwZVhCbGIyWWdTVVU0VUZBcFhHNWNkRngwUVdOamIzSmthVzl1SUQwZ1NVVTRVRkFvUVdOamIzSmthVzl1S1N4Y2JseDBYSFJHYjJ4a0lDQWdJQ0FnUFNCSlJUaFFVQ2hHYjJ4a0tUdGNibHh1WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRUZzZEdWeUlIUm9aU0J5WVhSbElHRjBJSGRvYVdOb0lITmpjbVZsYmkxeVpYTnBlbVVnWlhabGJuUnpJSFZ3WkdGMFpTQmhZMk52Y21ScGIyNGdkMmxrZEdoekxseHVYSFFnS2x4dVhIUWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdaR1ZzWVhrZ0xTQlNZWFJsSUdWNGNISmxjM05sWkNCcGJpQnRhV3hzYVhObFkyOXVaSE5jYmx4MElDb3ZYRzVjZEVGalkyOXlaR2x2Ymk1elpYUlNaWE5wZW1WU1lYUmxJRDBnWm5WdVkzUnBiMjRvWkdWc1lYa3BlMXh1WEhSY2RIWmhjaUJtYmlBOUlHWjFibU4wYVc5dUtHVXBlMXh1WEhSY2RGeDBabTl5S0haaGNpQmhMQ0JwSUQwZ01Dd2diQ0E5SUdGalkyOXlaR2x2Ym5NdWJHVnVaM1JvT3lCcElEd2diRHNnS3l0cEtYdGNibHgwWEhSY2RGeDBZU0E5SUdGalkyOXlaR2x2Ym5OYmFWMDdYRzVjZEZ4MFhIUmNkR0V1Y0dGeVpXNTBJSHg4SUdFdVpHbHpZV0pzWldRZ2ZId2dZUzV5WldaeVpYTm9LSFJ5ZFdVcE8xeHVYSFJjZEZ4MGZWeHVYSFJjZEgwN1hHNWNkRngwWEc1Y2RGeDBkbUZ5SUZSSVNWTWdQU0JCWTJOdmNtUnBiMjQ3WEc1Y2RGeDBWRWhKVXk1dmJsSmxjMmw2WlNBbUppQjNhVzVrYjNjdWNtVnRiM1psUlhabGJuUk1hWE4wWlc1bGNpaGNJbkpsYzJsNlpWd2lMQ0JVU0VsVExtOXVVbVZ6YVhwbEtUdGNibHgwWEhSY2JseDBYSFF2THlCTllXdGxJSE4xY21VZ2QyVWdkMlZ5Wlc0bmRDQndZWE56WldRZ1lXNGdaWGh3YkdsamFYUWdkbUZzZFdVZ2IyWWdSa0ZNVTBVc0lHOXlJR0VnYm1WbllYUnBkbVVnZG1Gc2RXVmNibHgwWEhScFppaG1ZV3h6WlNBaFBUMGdaR1ZzWVhrZ0ppWWdLR1JsYkdGNUlEMGdLMlJsYkdGNUlIeDhJREFwSUQ0OUlEQXBlMXh1WEhSY2RGeDBWRWhKVXk1dmJsSmxjMmw2WlNBOUlHUmxiR0Y1SUQ4Z1pHVmliM1Z1WTJVb1ptNHNJR1JsYkdGNUtTQTZJR1p1TzF4dVhIUmNkRngwZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0p5WlhOcGVtVmNJaXdnVkVoSlV5NXZibEpsYzJsNlpTazdYRzVjZEZ4MFhIUnBaaWhrWld4aGVTa2diR0Z6ZEZKbGMybDZaVkpoZEdVZ1BTQmtaV3hoZVR0Y2JseDBYSFI5WEc1Y2RIMWNibHgwWEc1Y2RGeHVYSFJjYmx4MEx5b3FYRzVjZENBcUlGSmxkSFZ5YmlCMGFHVWdZMnh2YzJWemRDQW9iVzl6ZENCa1pXVndiSGt0Ym1WemRHVmtLU0JoWTJOdmNtUnBiMjRnWlc1amJHOXphVzVuSUdGdUlHVnNaVzFsYm5RdVhHNWNkQ0FxWEc1Y2RDQXFJRUJ3WVhKaGJTQjdUbTlrWlgwZ2JtOWtaVnh1WEhRZ0tpQkFjbVYwZFhKdUlIdEJZMk52Y21ScGIyNTlYRzVjZENBcUwxeHVYSFJCWTJOdmNtUnBiMjR1WjJWMFFXTmpiM0prYVc5dUlEMGdablZ1WTNScGIyNG9ibTlrWlNsN1hHNWNkRngwZDJocGJHVW9ibTlrWlNsN1hHNWNkRngwWEhScFppaGNJbUZqWTI5eVpHbHZibHdpSUdsdUlHNXZaR1VwWEc1Y2RGeDBYSFJjZEhKbGRIVnliaUJoWTJOdmNtUnBiMjV6VzI1dlpHVXVZV05qYjNKa2FXOXVYVHRjYmx4MFhIUmNkRnh1WEhSY2RGeDBibTlrWlNBOUlHNXZaR1V1Y0dGeVpXNTBUbTlrWlR0Y2JseDBYSFJjZEdsbUtDRnViMlJsSUh4OElHNXZaR1V1Ym05a1pWUjVjR1VnSVQwOUlERXBJSEpsZEhWeWJpQnVkV3hzTzF4dVhIUmNkSDFjYmx4MGZWeHVYSFJjYmx4MFhHNWNkQzhxS2x4dVhIUWdLaUJTWlhSMWNtNGdkR2hsSUdOc2IzTmxjM1FnS0cxdmMzUWdaR1ZsY0d4NUxXNWxjM1JsWkNrZ1ptOXNaQ0JsYm1Oc2IzTnBibWNnWVc0Z1pXeGxiV1Z1ZEM1Y2JseDBJQ3BjYmx4MElDb2dRSEJoY21GdElIdE9iMlJsZlNCdWIyUmxYRzVjZENBcUlFQnlaWFIxY200Z2UwWnZiR1I5WEc1Y2RDQXFMMXh1WEhSQlkyTnZjbVJwYjI0dVoyVjBSbTlzWkNBOUlHWjFibU4wYVc5dUtHNXZaR1VwZTF4dVhIUmNkSGRvYVd4bEtHNXZaR1VwZTF4dVhIUmNkRngwYVdZb1hDSmhZMk52Y21ScGIyNUdiMnhrWENJZ2FXNGdibTlrWlNsY2JseDBYSFJjZEZ4MGNtVjBkWEp1SUdadmJHUnpXMjV2WkdVdVlXTmpiM0prYVc5dVJtOXNaRjA3WEc1Y2RGeDBYSFJjYmx4MFhIUmNkRzV2WkdVZ1BTQnViMlJsTG5CaGNtVnVkRTV2WkdVN1hHNWNkRngwWEhScFppZ2hibTlrWlNCOGZDQnViMlJsTG01dlpHVlVlWEJsSUNFOVBTQXhLU0J5WlhSMWNtNGdiblZzYkR0Y2JseDBYSFI5WEc1Y2RIMWNibHgwWEc1Y2JseDBYRzVjZEVGalkyOXlaR2x2Ymk1elpYUlNaWE5wZW1WU1lYUmxLREkxS1R0Y2JseDBYRzVjZEZ4dVhIUXZMeUJDY205M2MyVnlJR1Y0Y0c5eWRGeHVYSFIzYVc1a2IzY3VRV05qYjNKa2FXOXVJRDBnUVdOamIzSmthVzl1TzF4dVhIUmNibHgwTHk4Z1EyOXRiVzl1U2xNdlRtOWtaUzVxYzF4dVhIUnBaaWhjSW05aWFtVmpkRndpSUQwOVBTQjBlWEJsYjJZZ2JXOWtkV3hsSUNZbUlGd2liMkpxWldOMFhDSWdQVDA5SUhSNWNHVnZaaUJ0YjJSMWJHVXVaWGh3YjNKMGN5bGNibHgwWEhSdGIyUjFiR1V1Wlhod2IzSjBjeTVCWTJOdmNtUnBiMjRnUFNCQlkyTnZjbVJwYjI0N1hHNWNkRnh1WEhRdkx5QkJUVVF2VlUxRUxXeHBhMlVnYzNsemRHVnRjMXh1WEhSeVpYUjFjbTRnUVdOamIzSmthVzl1TzF4dWZTZ3BLVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVFYSnlZWGt1Y0hKdmRHOTBlWEJsTG1acGJtUWdQU0JCY25KaGVTNXdjbTkwYjNSNWNHVXVabWx1WkNCOGZDQm1kVzVqZEdsdmJpaGpZV3hzWW1GamF5a2dlMXh1SUNCcFppQW9kR2hwY3lBOVBUMGdiblZzYkNrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb0owRnljbUY1TG5CeWIzUnZkSGx3WlM1bWFXNWtJR05oYkd4bFpDQnZiaUJ1ZFd4c0lHOXlJSFZ1WkdWbWFXNWxaQ2NwTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLSFI1Y0dWdlppQmpZV3hzWW1GamF5QWhQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb0oyTmhiR3hpWVdOcklHMTFjM1FnWW1VZ1lTQm1kVzVqZEdsdmJpY3BPMXh1SUNCOVhHNGdJSFpoY2lCc2FYTjBJRDBnVDJKcVpXTjBLSFJvYVhNcE8xeHVJQ0F2THlCTllXdGxjeUJ6ZFhKbGN5QnBjeUJoYkhkaGVYTWdhR0Z6SUdGdUlIQnZjMmwwYVhabElHbHVkR1ZuWlhJZ1lYTWdiR1Z1WjNSb0xseHVJQ0IyWVhJZ2JHVnVaM1JvSUQwZ2JHbHpkQzVzWlc1bmRHZ2dQajQrSURBN1hHNGdJSFpoY2lCMGFHbHpRWEpuSUQwZ1lYSm5kVzFsYm5Seld6RmRPMXh1SUNCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHeGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdkbUZ5SUdWc1pXMWxiblFnUFNCc2FYTjBXMmxkTzF4dUlDQWdJR2xtSUNnZ1kyRnNiR0poWTJzdVkyRnNiQ2gwYUdselFYSm5MQ0JsYkdWdFpXNTBMQ0JwTENCc2FYTjBLU0FwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJsYkdWdFpXNTBPMXh1SUNBZ0lIMWNiaUFnZlZ4dWZUdGNiaUlzSWk4cUlGZGxZaUJHYjI1MElFeHZZV1JsY2lCMk1TNDJMakk0SUMwZ0tHTXBJRUZrYjJKbElGTjVjM1JsYlhNc0lFZHZiMmRzWlM0Z1RHbGpaVzV6WlRvZ1FYQmhZMmhsSURJdU1DQXFMeWhtZFc1amRHbHZiaWdwZTJaMWJtTjBhVzl1SUdGaEtHRXNZaXhqS1h0eVpYUjFjbTRnWVM1allXeHNMbUZ3Y0d4NUtHRXVZbWx1WkN4aGNtZDFiV1Z1ZEhNcGZXWjFibU4wYVc5dUlHSmhLR0VzWWl4aktYdHBaaWdoWVNsMGFISnZkeUJGY25KdmNpZ3BPMmxtS0RJOFlYSm5kVzFsYm5SekxteGxibWQwYUNsN2RtRnlJR1E5UVhKeVlYa3VjSEp2ZEc5MGVYQmxMbk5zYVdObExtTmhiR3dvWVhKbmRXMWxiblJ6TERJcE8zSmxkSFZ5YmlCbWRXNWpkR2x2YmlncGUzWmhjaUJqUFVGeWNtRjVMbkJ5YjNSdmRIbHdaUzV6YkdsalpTNWpZV3hzS0dGeVozVnRaVzUwY3lrN1FYSnlZWGt1Y0hKdmRHOTBlWEJsTG5WdWMyaHBablF1WVhCd2JIa29ZeXhrS1R0eVpYUjFjbTRnWVM1aGNIQnNlU2hpTEdNcGZYMXlaWFIxY200Z1puVnVZM1JwYjI0b0tYdHlaWFIxY200Z1lTNWhjSEJzZVNoaUxHRnlaM1Z0Wlc1MGN5bDlmV1oxYm1OMGFXOXVJSEFvWVN4aUxHTXBlM0E5Um5WdVkzUnBiMjR1Y0hKdmRHOTBlWEJsTG1KcGJtUW1KaTB4SVQxR2RXNWpkR2x2Ymk1d2NtOTBiM1I1Y0dVdVltbHVaQzUwYjFOMGNtbHVaeWdwTG1sdVpHVjRUMllvWENKdVlYUnBkbVVnWTI5a1pWd2lLVDloWVRwaVlUdHlaWFIxY200Z2NDNWhjSEJzZVNodWRXeHNMR0Z5WjNWdFpXNTBjeWw5ZG1GeUlIRTlSR0YwWlM1dWIzZDhmR1oxYm1OMGFXOXVLQ2w3Y21WMGRYSnVLMjVsZHlCRVlYUmxmVHRtZFc1amRHbHZiaUJqWVNoaExHSXBlM1JvYVhNdVlUMWhPM1JvYVhNdWJ6MWlmSHhoTzNSb2FYTXVZejEwYUdsekxtOHVaRzlqZFcxbGJuUjlkbUZ5SUdSaFBTRWhkMmx1Wkc5M0xrWnZiblJHWVdObE8yWjFibU4wYVc5dUlIUW9ZU3hpTEdNc1pDbDdZajFoTG1NdVkzSmxZWFJsUld4bGJXVnVkQ2hpS1R0cFppaGpLV1p2Y2loMllYSWdaU0JwYmlCaktXTXVhR0Z6VDNkdVVISnZjR1Z5ZEhrb1pTa21KaWhjSW5OMGVXeGxYQ0k5UFdVL1lpNXpkSGxzWlM1amMzTlVaWGgwUFdOYlpWMDZZaTV6WlhSQmRIUnlhV0oxZEdVb1pTeGpXMlZkS1NrN1pDWW1ZaTVoY0hCbGJtUkRhR2xzWkNoaExtTXVZM0psWVhSbFZHVjRkRTV2WkdVb1pDa3BPM0psZEhWeWJpQmlmV1oxYm1OMGFXOXVJSFVvWVN4aUxHTXBlMkU5WVM1akxtZGxkRVZzWlcxbGJuUnpRbmxVWVdkT1lXMWxLR0lwV3pCZE8yRjhmQ2hoUFdSdlkzVnRaVzUwTG1SdlkzVnRaVzUwUld4bGJXVnVkQ2s3WVM1cGJuTmxjblJDWldadmNtVW9ZeXhoTG14aGMzUkRhR2xzWkNsOVpuVnVZM1JwYjI0Z2RpaGhLWHRoTG5CaGNtVnVkRTV2WkdVbUptRXVjR0Z5Wlc1MFRtOWtaUzV5WlcxdmRtVkRhR2xzWkNoaEtYMWNibVoxYm1OMGFXOXVJSGNvWVN4aUxHTXBlMkk5WW54OFcxMDdZejFqZkh4YlhUdG1iM0lvZG1GeUlHUTlZUzVqYkdGemMwNWhiV1V1YzNCc2FYUW9MMXhjY3lzdktTeGxQVEE3WlR4aUxteGxibWQwYUR0bEt6MHhLWHRtYjNJb2RtRnlJR1k5SVRFc1p6MHdPMmM4WkM1c1pXNW5kR2c3WnlzOU1TbHBaaWhpVzJWZFBUMDlaRnRuWFNsN1pqMGhNRHRpY21WaGEzMW1mSHhrTG5CMWMyZ29ZbHRsWFNsOVlqMWJYVHRtYjNJb1pUMHdPMlU4WkM1c1pXNW5kR2c3WlNzOU1TbDdaajBoTVR0bWIzSW9aejB3TzJjOFl5NXNaVzVuZEdnN1p5czlNU2xwWmloa1cyVmRQVDA5WTF0blhTbDdaajBoTUR0aWNtVmhhMzFtZkh4aUxuQjFjMmdvWkZ0bFhTbDlZUzVqYkdGemMwNWhiV1U5WWk1cWIybHVLRndpSUZ3aUtTNXlaWEJzWVdObEtDOWNYSE1yTDJjc1hDSWdYQ0lwTG5KbGNHeGhZMlVvTDE1Y1hITXJmRnhjY3lza0x5eGNJbHdpS1gxbWRXNWpkR2x2YmlCNUtHRXNZaWw3Wm05eUtIWmhjaUJqUFdFdVkyeGhjM05PWVcxbExuTndiR2wwS0M5Y1hITXJMeWtzWkQwd0xHVTlZeTVzWlc1bmRHZzdaRHhsTzJRckt5bHBaaWhqVzJSZFBUMWlLWEpsZEhWeWJpRXdPM0psZEhWeWJpRXhmVnh1Wm5WdVkzUnBiMjRnWldFb1lTbDdjbVYwZFhKdUlHRXVieTVzYjJOaGRHbHZiaTVvYjNOMGJtRnRaWHg4WVM1aExteHZZMkYwYVc5dUxtaHZjM1J1WVcxbGZXWjFibU4wYVc5dUlIb29ZU3hpTEdNcGUyWjFibU4wYVc5dUlHUW9LWHR0SmlabEppWm1KaVlvYlNobktTeHRQVzUxYkd3cGZXSTlkQ2hoTEZ3aWJHbHVhMXdpTEh0eVpXdzZYQ0p6ZEhsc1pYTm9aV1YwWENJc2FISmxaanBpTEcxbFpHbGhPbHdpWVd4c1hDSjlLVHQyWVhJZ1pUMGhNU3htUFNFd0xHYzliblZzYkN4dFBXTjhmRzUxYkd3N1pHRS9LR0l1YjI1c2IyRmtQV1oxYm1OMGFXOXVLQ2w3WlQwaE1EdGtLQ2w5TEdJdWIyNWxjbkp2Y2oxbWRXNWpkR2x2YmlncGUyVTlJVEE3WnoxRmNuSnZjaWhjSWxOMGVXeGxjMmhsWlhRZ1ptRnBiR1ZrSUhSdklHeHZZV1JjSWlrN1pDZ3BmU2s2YzJWMFZHbHRaVzkxZENobWRXNWpkR2x2YmlncGUyVTlJVEE3WkNncGZTd3dLVHQxS0dFc1hDSm9aV0ZrWENJc1lpbDlYRzVtZFc1amRHbHZiaUJCS0dFc1lpeGpMR1FwZTNaaGNpQmxQV0V1WXk1blpYUkZiR1Z0Wlc1MGMwSjVWR0ZuVG1GdFpTaGNJbWhsWVdSY0lpbGJNRjA3YVdZb1pTbDdkbUZ5SUdZOWRDaGhMRndpYzJOeWFYQjBYQ0lzZTNOeVl6cGlmU2tzWnowaE1UdG1MbTl1Ykc5aFpEMW1MbTl1Y21WaFpIbHpkR0YwWldOb1lXNW5aVDFtZFc1amRHbHZiaWdwZTJkOGZIUm9hWE11Y21WaFpIbFRkR0YwWlNZbVhDSnNiMkZrWldSY0lpRTlkR2hwY3k1eVpXRmtlVk4wWVhSbEppWmNJbU52YlhCc1pYUmxYQ0loUFhSb2FYTXVjbVZoWkhsVGRHRjBaWHg4S0djOUlUQXNZeVltWXlodWRXeHNLU3htTG05dWJHOWhaRDFtTG05dWNtVmhaSGx6ZEdGMFpXTm9ZVzVuWlQxdWRXeHNMRndpU0VWQlJGd2lQVDFtTG5CaGNtVnVkRTV2WkdVdWRHRm5UbUZ0WlNZbVpTNXlaVzF2ZG1WRGFHbHNaQ2htS1NsOU8yVXVZWEJ3Wlc1a1EyaHBiR1FvWmlrN2MyVjBWR2x0Wlc5MWRDaG1kVzVqZEdsdmJpZ3BlMmQ4ZkNoblBTRXdMR01tSm1Nb1JYSnliM0lvWENKVFkzSnBjSFFnYkc5aFpDQjBhVzFsYjNWMFhDSXBLU2w5TEdSOGZEVkZNeWs3Y21WMGRYSnVJR1o5Y21WMGRYSnVJRzUxYkd4OU8yWjFibU4wYVc5dUlFSW9LWHQwYUdsekxtRTlNRHQwYUdsekxtTTliblZzYkgxbWRXNWpkR2x2YmlCREtHRXBlMkV1WVNzck8zSmxkSFZ5YmlCbWRXNWpkR2x2YmlncGUyRXVZUzB0TzBRb1lTbDlmV1oxYm1OMGFXOXVJRVVvWVN4aUtYdGhMbU05WWp0RUtHRXBmV1oxYm1OMGFXOXVJRVFvWVNsN01EMDlZUzVoSmlaaExtTW1KaWhoTG1Nb0tTeGhMbU05Ym5Wc2JDbDlPMloxYm1OMGFXOXVJRVlvWVNsN2RHaHBjeTVoUFdGOGZGd2lMVndpZlVZdWNISnZkRzkwZVhCbExtTTlablZ1WTNScGIyNG9ZU2w3Wm05eUtIWmhjaUJpUFZ0ZExHTTlNRHRqUEdGeVozVnRaVzUwY3k1c1pXNW5kR2c3WXlzcktXSXVjSFZ6YUNoaGNtZDFiV1Z1ZEhOYlkxMHVjbVZ3YkdGalpTZ3ZXMXhjVjE5ZEt5OW5MRndpWENJcExuUnZURzkzWlhKRFlYTmxLQ2twTzNKbGRIVnliaUJpTG1wdmFXNG9kR2hwY3k1aEtYMDdablZ1WTNScGIyNGdSeWhoTEdJcGUzUm9hWE11WXoxaE8zUm9hWE11WmowME8zUm9hWE11WVQxY0ltNWNJanQyWVhJZ1l6MG9Zbng4WENKdU5Gd2lLUzV0WVhSamFDZ3ZYaWhiYm1sdlhTa29XekV0T1YwcEpDOXBLVHRqSmlZb2RHaHBjeTVoUFdOYk1WMHNkR2hwY3k1bVBYQmhjbk5sU1c1MEtHTmJNbDBzTVRBcEtYMW1kVzVqZEdsdmJpQm1ZU2hoS1h0eVpYUjFjbTRnU0NoaEtTdGNJaUJjSWlzb1lTNW1LMXdpTURCY0lpa3JYQ0lnTXpBd2NIZ2dYQ0lyU1NoaExtTXBmV1oxYm1OMGFXOXVJRWtvWVNsN2RtRnlJR0k5VzEwN1lUMWhMbk53YkdsMEtDOHNYRnh6S2k4cE8yWnZjaWgyWVhJZ1l6MHdPMk04WVM1c1pXNW5kR2c3WXlzcktYdDJZWElnWkQxaFcyTmRMbkpsY0d4aFkyVW9MMXNuWENKZEwyY3NYQ0pjSWlrN0xURWhQV1F1YVc1a1pYaFBaaWhjSWlCY0lpbDhmQzllWEZ4a0x5NTBaWE4wS0dRcFAySXVjSFZ6YUNoY0lpZGNJaXRrSzF3aUoxd2lLVHBpTG5CMWMyZ29aQ2w5Y21WMGRYSnVJR0l1YW05cGJpaGNJaXhjSWlsOVpuVnVZM1JwYjI0Z1NpaGhLWHR5WlhSMWNtNGdZUzVoSzJFdVpuMW1kVzVqZEdsdmJpQklLR0VwZTNaaGNpQmlQVndpYm05eWJXRnNYQ0k3WENKdlhDSTlQVDFoTG1FL1lqMWNJbTlpYkdseGRXVmNJanBjSW1sY0lqMDlQV0V1WVNZbUtHSTlYQ0pwZEdGc2FXTmNJaWs3Y21WMGRYSnVJR0o5WEc1bWRXNWpkR2x2YmlCbllTaGhLWHQyWVhJZ1lqMDBMR005WENKdVhDSXNaRDF1ZFd4c08yRW1KaWdvWkQxaExtMWhkR05vS0M4b2JtOXliV0ZzZkc5aWJHbHhkV1Y4YVhSaGJHbGpLUzlwS1NrbUptUmJNVjBtSmloalBXUmJNVjB1YzNWaWMzUnlLREFzTVNrdWRHOU1iM2RsY2tOaGMyVW9LU2tzS0dROVlTNXRZWFJqYUNndktGc3hMVGxkTURCOGJtOXliV0ZzZkdKdmJHUXBMMmtwS1NZbVpGc3hYU1ltS0M5aWIyeGtMMmt1ZEdWemRDaGtXekZkS1Q5aVBUYzZMMXN4TFRsZE1EQXZMblJsYzNRb1pGc3hYU2ttSmloaVBYQmhjbk5sU1c1MEtHUmJNVjB1YzNWaWMzUnlLREFzTVNrc01UQXBLU2twTzNKbGRIVnliaUJqSzJKOU8yWjFibU4wYVc5dUlHaGhLR0VzWWlsN2RHaHBjeTVqUFdFN2RHaHBjeTVtUFdFdWJ5NWtiMk4xYldWdWRDNWtiMk4xYldWdWRFVnNaVzFsYm5RN2RHaHBjeTVvUFdJN2RHaHBjeTVoUFc1bGR5QkdLRndpTFZ3aUtUdDBhR2x6TG1vOUlURWhQVDFpTG1WMlpXNTBjenQwYUdsekxtYzlJVEVoUFQxaUxtTnNZWE56WlhOOVpuVnVZM1JwYjI0Z2FXRW9ZU2w3WVM1bkppWjNLR0V1Wml4YllTNWhMbU1vWENKM1psd2lMRndpYkc5aFpHbHVaMXdpS1YwcE8wc29ZU3hjSW14dllXUnBibWRjSWlsOVpuVnVZM1JwYjI0Z1RDaGhLWHRwWmloaExtY3BlM1poY2lCaVBYa29ZUzVtTEdFdVlTNWpLRndpZDJaY0lpeGNJbUZqZEdsMlpWd2lLU2tzWXoxYlhTeGtQVnRoTG1FdVl5aGNJbmRtWENJc1hDSnNiMkZrYVc1blhDSXBYVHRpZkh4akxuQjFjMmdvWVM1aExtTW9YQ0ozWmx3aUxGd2lhVzVoWTNScGRtVmNJaWtwTzNjb1lTNW1MR01zWkNsOVN5aGhMRndpYVc1aFkzUnBkbVZjSWlsOVpuVnVZM1JwYjI0Z1N5aGhMR0lzWXlsN2FXWW9ZUzVxSmlaaExtaGJZbDBwYVdZb1l5bGhMbWhiWWwwb1l5NWpMRW9vWXlrcE8yVnNjMlVnWVM1b1cySmRLQ2w5TzJaMWJtTjBhVzl1SUdwaEtDbDdkR2hwY3k1alBYdDlmV1oxYm1OMGFXOXVJR3RoS0dFc1lpeGpLWHQyWVhJZ1pEMWJYU3hsTzJadmNpaGxJR2x1SUdJcGFXWW9ZaTVvWVhOUGQyNVFjbTl3WlhKMGVTaGxLU2w3ZG1GeUlHWTlZUzVqVzJWZE8yWW1KbVF1Y0hWemFDaG1LR0piWlYwc1l5a3BmWEpsZEhWeWJpQmtmVHRtZFc1amRHbHZiaUJOS0dFc1lpbDdkR2hwY3k1alBXRTdkR2hwY3k1bVBXSTdkR2hwY3k1aFBYUW9kR2hwY3k1akxGd2ljM0JoYmx3aUxIdGNJbUZ5YVdFdGFHbGtaR1Z1WENJNlhDSjBjblZsWENKOUxIUm9hWE11WmlsOVpuVnVZM1JwYjI0Z1RpaGhLWHQxS0dFdVl5eGNJbUp2WkhsY0lpeGhMbUVwZldaMWJtTjBhVzl1SUU4b1lTbDdjbVYwZFhKdVhDSmthWE53YkdGNU9tSnNiMk5yTzNCdmMybDBhVzl1T21GaWMyOXNkWFJsTzNSdmNEb3RPVGs1T1hCNE8yeGxablE2TFRrNU9UbHdlRHRtYjI1MExYTnBlbVU2TXpBd2NIZzdkMmxrZEdnNllYVjBienRvWldsbmFIUTZZWFYwYnp0c2FXNWxMV2hsYVdkb2REcHViM0p0WVd3N2JXRnlaMmx1T2pBN2NHRmtaR2x1Wnpvd08yWnZiblF0ZG1GeWFXRnVkRHB1YjNKdFlXdzdkMmhwZEdVdGMzQmhZMlU2Ym05M2NtRndPMlp2Ym5RdFptRnRhV3g1T2x3aUswa29ZUzVqS1N0Y0lqdGNJaXNvWENKbWIyNTBMWE4wZVd4bE9sd2lLMGdvWVNrclhDSTdabTl1ZEMxM1pXbG5hSFE2WENJcktHRXVaaXRjSWpBd1hDSXBLMXdpTzF3aUtYMDdablZ1WTNScGIyNGdVQ2hoTEdJc1l5eGtMR1VzWmlsN2RHaHBjeTVuUFdFN2RHaHBjeTVxUFdJN2RHaHBjeTVoUFdRN2RHaHBjeTVqUFdNN2RHaHBjeTVtUFdWOGZETkZNenQwYUdsekxtZzlabng4ZG05cFpDQXdmVkF1Y0hKdmRHOTBlWEJsTG5OMFlYSjBQV1oxYm1OMGFXOXVLQ2w3ZG1GeUlHRTlkR2hwY3k1akxtOHVaRzlqZFcxbGJuUXNZajEwYUdsekxHTTljU2dwTEdROWJtVjNJRkJ5YjIxcGMyVW9ablZ1WTNScGIyNG9aQ3hsS1h0bWRXNWpkR2x2YmlCbUtDbDdjU2dwTFdNK1BXSXVaajlsS0NrNllTNW1iMjUwY3k1c2IyRmtLR1poS0dJdVlTa3NZaTVvS1M1MGFHVnVLR1oxYm1OMGFXOXVLR0VwZXpFOFBXRXViR1Z1WjNSb1AyUW9LVHB6WlhSVWFXMWxiM1YwS0dZc01qVXBmU3htZFc1amRHbHZiaWdwZTJVb0tYMHBmV1lvS1gwcExHVTliblZzYkN4bVBXNWxkeUJRY205dGFYTmxLR1oxYm1OMGFXOXVLR0VzWkNsN1pUMXpaWFJVYVcxbGIzVjBLR1FzWWk1bUtYMHBPMUJ5YjIxcGMyVXVjbUZqWlNoYlppeGtYU2t1ZEdobGJpaG1kVzVqZEdsdmJpZ3BlMlVtSmloamJHVmhjbFJwYldWdmRYUW9aU2tzWlQxdWRXeHNLVHRpTG1jb1lpNWhLWDBzWm5WdVkzUnBiMjRvS1h0aUxtb29ZaTVoS1gwcGZUdG1kVzVqZEdsdmJpQlJLR0VzWWl4akxHUXNaU3htTEdjcGUzUm9hWE11ZGoxaE8zUm9hWE11UWoxaU8zUm9hWE11WXoxak8zUm9hWE11WVQxa08zUm9hWE11Y3oxbmZIeGNJa0pGVTJKemQzbGNJanQwYUdsekxtWTllMzA3ZEdocGN5NTNQV1Y4ZkRORk16dDBhR2x6TG5VOVpueDhiblZzYkR0MGFHbHpMbTA5ZEdocGN5NXFQWFJvYVhNdWFEMTBhR2x6TG1jOWJuVnNiRHQwYUdsekxtYzlibVYzSUUwb2RHaHBjeTVqTEhSb2FYTXVjeWs3ZEdocGN5NW9QVzVsZHlCTktIUm9hWE11WXl4MGFHbHpMbk1wTzNSb2FYTXVhajF1WlhjZ1RTaDBhR2x6TG1Nc2RHaHBjeTV6S1R0MGFHbHpMbTA5Ym1WM0lFMG9kR2hwY3k1akxIUm9hWE11Y3lrN1lUMXVaWGNnUnloMGFHbHpMbUV1WXl0Y0lpeHpaWEpwWmx3aUxFb29kR2hwY3k1aEtTazdZVDFQS0dFcE8zUm9hWE11Wnk1aExuTjBlV3hsTG1OemMxUmxlSFE5WVR0aFBXNWxkeUJIS0hSb2FYTXVZUzVqSzF3aUxITmhibk10YzJWeWFXWmNJaXhLS0hSb2FYTXVZU2twTzJFOVR5aGhLVHQwYUdsekxtZ3VZUzV6ZEhsc1pTNWpjM05VWlhoMFBXRTdZVDF1WlhjZ1J5aGNJbk5sY21sbVhDSXNTaWgwYUdsekxtRXBLVHRoUFU4b1lTazdkR2hwY3k1cUxtRXVjM1I1YkdVdVkzTnpWR1Y0ZEQxaE8yRTlibVYzSUVjb1hDSnpZVzV6TFhObGNtbG1YQ0lzU2loMGFHbHpMbUVwS1R0aFBWeHVUeWhoS1R0MGFHbHpMbTB1WVM1emRIbHNaUzVqYzNOVVpYaDBQV0U3VGloMGFHbHpMbWNwTzA0b2RHaHBjeTVvS1R0T0tIUm9hWE11YWlrN1RpaDBhR2x6TG0wcGZYWmhjaUJTUFh0RU9sd2ljMlZ5YVdaY0lpeERPbHdpYzJGdWN5MXpaWEpwWmx3aWZTeFRQVzUxYkd3N1puVnVZM1JwYjI0Z1ZDZ3BlMmxtS0c1MWJHdzlQVDFUS1h0MllYSWdZVDB2UVhCd2JHVlhaV0pMYVhSY1hDOG9XekF0T1YwcktTZy9PbHhjTGloYk1DMDVYU3NwS1M4dVpYaGxZeWgzYVc1a2IzY3VibUYyYVdkaGRHOXlMblZ6WlhKQloyVnVkQ2s3VXowaElXRW1KaWcxTXpZK2NHRnljMlZKYm5Rb1lWc3hYU3d4TUNsOGZEVXpOajA5UFhCaGNuTmxTVzUwS0dGYk1WMHNNVEFwSmlZeE1UNDljR0Z5YzJWSmJuUW9ZVnN5WFN3eE1Da3BmWEpsZEhWeWJpQlRmVkV1Y0hKdmRHOTBlWEJsTG5OMFlYSjBQV1oxYm1OMGFXOXVLQ2w3ZEdocGN5NW1Mbk5sY21sbVBYUm9hWE11YWk1aExtOW1abk5sZEZkcFpIUm9PM1JvYVhNdVpsdGNJbk5oYm5NdGMyVnlhV1pjSWwwOWRHaHBjeTV0TG1FdWIyWm1jMlYwVjJsa2RHZzdkR2hwY3k1QlBYRW9LVHRWS0hSb2FYTXBmVHRjYm1aMWJtTjBhVzl1SUd4aEtHRXNZaXhqS1h0bWIzSW9kbUZ5SUdRZ2FXNGdVaWxwWmloU0xtaGhjMDkzYmxCeWIzQmxjblI1S0dRcEppWmlQVDA5WVM1bVcxSmJaRjFkSmlaalBUMDlZUzVtVzFKYlpGMWRLWEpsZEhWeWJpRXdPM0psZEhWeWJpRXhmV1oxYm1OMGFXOXVJRlVvWVNsN2RtRnlJR0k5WVM1bkxtRXViMlptYzJWMFYybGtkR2dzWXoxaExtZ3VZUzV2Wm1aelpYUlhhV1IwYUN4a095aGtQV0k5UFQxaExtWXVjMlZ5YVdZbUptTTlQVDFoTG1aYlhDSnpZVzV6TFhObGNtbG1YQ0pkS1h4OEtHUTlWQ2dwSmlac1lTaGhMR0lzWXlrcE8yUS9jU2dwTFdFdVFUNDlZUzUzUDFRb0tTWW1iR0VvWVN4aUxHTXBKaVlvYm5Wc2JEMDlQV0V1ZFh4OFlTNTFMbWhoYzA5M2JsQnliM0JsY25SNUtHRXVZUzVqS1NrL1ZpaGhMR0V1ZGlrNlZpaGhMR0V1UWlrNmJXRW9ZU2s2VmloaExHRXVkaWw5Wm5WdVkzUnBiMjRnYldFb1lTbDdjMlYwVkdsdFpXOTFkQ2h3S0daMWJtTjBhVzl1S0NsN1ZTaDBhR2x6S1gwc1lTa3NOVEFwZldaMWJtTjBhVzl1SUZZb1lTeGlLWHR6WlhSVWFXMWxiM1YwS0hBb1puVnVZM1JwYjI0b0tYdDJLSFJvYVhNdVp5NWhLVHQyS0hSb2FYTXVhQzVoS1R0MktIUm9hWE11YWk1aEtUdDJLSFJvYVhNdWJTNWhLVHRpS0hSb2FYTXVZU2w5TEdFcExEQXBmVHRtZFc1amRHbHZiaUJYS0dFc1lpeGpLWHQwYUdsekxtTTlZVHQwYUdsekxtRTlZanQwYUdsekxtWTlNRHQwYUdsekxtMDlkR2hwY3k1cVBTRXhPM1JvYVhNdWN6MWpmWFpoY2lCWVBXNTFiR3c3Vnk1d2NtOTBiM1I1Y0dVdVp6MW1kVzVqZEdsdmJpaGhLWHQyWVhJZ1lqMTBhR2x6TG1FN1lpNW5KaVozS0dJdVppeGJZaTVoTG1Nb1hDSjNabHdpTEdFdVl5eEtLR0VwTG5SdlUzUnlhVzVuS0Nrc1hDSmhZM1JwZG1WY0lpbGRMRnRpTG1FdVl5aGNJbmRtWENJc1lTNWpMRW9vWVNrdWRHOVRkSEpwYm1jb0tTeGNJbXh2WVdScGJtZGNJaWtzWWk1aExtTW9YQ0ozWmx3aUxHRXVZeXhLS0dFcExuUnZVM1J5YVc1bktDa3NYQ0pwYm1GamRHbDJaVndpS1YwcE8wc29ZaXhjSW1admJuUmhZM1JwZG1WY0lpeGhLVHQwYUdsekxtMDlJVEE3Ym1Fb2RHaHBjeWw5TzF4dVZ5NXdjbTkwYjNSNWNHVXVhRDFtZFc1amRHbHZiaWhoS1h0MllYSWdZajEwYUdsekxtRTdhV1lvWWk1bktYdDJZWElnWXoxNUtHSXVaaXhpTG1FdVl5aGNJbmRtWENJc1lTNWpMRW9vWVNrdWRHOVRkSEpwYm1jb0tTeGNJbUZqZEdsMlpWd2lLU2tzWkQxYlhTeGxQVnRpTG1FdVl5aGNJbmRtWENJc1lTNWpMRW9vWVNrdWRHOVRkSEpwYm1jb0tTeGNJbXh2WVdScGJtZGNJaWxkTzJOOGZHUXVjSFZ6YUNoaUxtRXVZeWhjSW5kbVhDSXNZUzVqTEVvb1lTa3VkRzlUZEhKcGJtY29LU3hjSW1sdVlXTjBhWFpsWENJcEtUdDNLR0l1Wml4a0xHVXBmVXNvWWl4Y0ltWnZiblJwYm1GamRHbDJaVndpTEdFcE8yNWhLSFJvYVhNcGZUdG1kVzVqZEdsdmJpQnVZU2hoS1hzd1BUMHRMV0V1WmlZbVlTNXFKaVlvWVM1dFB5aGhQV0V1WVN4aExtY21KbmNvWVM1bUxGdGhMbUV1WXloY0luZG1YQ0lzWENKaFkzUnBkbVZjSWlsZExGdGhMbUV1WXloY0luZG1YQ0lzWENKc2IyRmthVzVuWENJcExHRXVZUzVqS0Z3aWQyWmNJaXhjSW1sdVlXTjBhWFpsWENJcFhTa3NTeWhoTEZ3aVlXTjBhWFpsWENJcEtUcE1LR0V1WVNrcGZUdG1kVzVqZEdsdmJpQnZZU2hoS1h0MGFHbHpMbW85WVR0MGFHbHpMbUU5Ym1WM0lHcGhPM1JvYVhNdWFEMHdPM1JvYVhNdVpqMTBhR2x6TG1jOUlUQjliMkV1Y0hKdmRHOTBlWEJsTG14dllXUTlablZ1WTNScGIyNG9ZU2w3ZEdocGN5NWpQVzVsZHlCallTaDBhR2x6TG1vc1lTNWpiMjUwWlhoMGZIeDBhR2x6TG1vcE8zUm9hWE11WnowaE1TRTlQV0V1WlhabGJuUnpPM1JvYVhNdVpqMGhNU0U5UFdFdVkyeGhjM05sY3p0d1lTaDBhR2x6TEc1bGR5Qm9ZU2gwYUdsekxtTXNZU2tzWVNsOU8xeHVablZ1WTNScGIyNGdjV0VvWVN4aUxHTXNaQ3hsS1h0MllYSWdaajB3UFQwdExXRXVhRHNvWVM1bWZIeGhMbWNwSmlaelpYUlVhVzFsYjNWMEtHWjFibU4wYVc5dUtDbDdkbUZ5SUdFOVpYeDhiblZzYkN4dFBXUjhmRzUxYkd4OGZIdDlPMmxtS0RBOVBUMWpMbXhsYm1kMGFDWW1aaWxNS0dJdVlTazdaV3h6Wlh0aUxtWXJQV011YkdWdVozUm9PMlltSmloaUxtbzlaaWs3ZG1GeUlHZ3NiRDFiWFR0bWIzSW9hRDB3TzJnOFl5NXNaVzVuZEdnN2FDc3JLWHQyWVhJZ2F6MWpXMmhkTEc0OWJWdHJMbU5kTEhJOVlpNWhMSGc5YXp0eUxtY21KbmNvY2k1bUxGdHlMbUV1WXloY0luZG1YQ0lzZUM1akxFb29lQ2t1ZEc5VGRISnBibWNvS1N4Y0lteHZZV1JwYm1kY0lpbGRLVHRMS0hJc1hDSm1iMjUwYkc5aFpHbHVaMXdpTEhncE8zSTliblZzYkR0cFppaHVkV3hzUFQwOVdDbHBaaWgzYVc1a2IzY3VSbTl1ZEVaaFkyVXBlM1poY2lCNFBTOUhaV05yYnk0cVJtbHlaV1p2ZUZ4Y0x5aGNYR1FyS1M4dVpYaGxZeWgzYVc1a2IzY3VibUYyYVdkaGRHOXlMblZ6WlhKQloyVnVkQ2tzZUdFOUwwOVRJRmd1S2xabGNuTnBiMjVjWEM4eE1GeGNMaTRxVTJGbVlYSnBMeTVsZUdWaktIZHBibVJ2ZHk1dVlYWnBaMkYwYjNJdWRYTmxja0ZuWlc1MEtTWW1MMEZ3Y0d4bEx5NWxlR1ZqS0hkcGJtUnZkeTV1WVhacFoyRjBiM0l1ZG1WdVpHOXlLVHRjYmxnOWVEODBNanh3WVhKelpVbHVkQ2g0V3pGZExERXdLVHA0WVQ4aE1Ub2hNSDFsYkhObElGZzlJVEU3V0Q5eVBXNWxkeUJRS0hBb1lpNW5MR0lwTEhBb1lpNW9MR0lwTEdJdVl5eHJMR0l1Y3l4dUtUcHlQVzVsZHlCUktIQW9ZaTVuTEdJcExIQW9ZaTVvTEdJcExHSXVZeXhyTEdJdWN5eGhMRzRwTzJ3dWNIVnphQ2h5S1gxbWIzSW9hRDB3TzJnOGJDNXNaVzVuZEdnN2FDc3JLV3hiYUYwdWMzUmhjblFvS1gxOUxEQXBmV1oxYm1OMGFXOXVJSEJoS0dFc1lpeGpLWHQyWVhJZ1pEMWJYU3hsUFdNdWRHbHRaVzkxZER0cFlTaGlLVHQyWVhJZ1pEMXJZU2hoTG1Fc1l5eGhMbU1wTEdZOWJtVjNJRmNvWVM1akxHSXNaU2s3WVM1b1BXUXViR1Z1WjNSb08ySTlNRHRtYjNJb1l6MWtMbXhsYm1kMGFEdGlQR003WWlzcktXUmJZbDB1Ykc5aFpDaG1kVzVqZEdsdmJpaGlMR1FzWXlsN2NXRW9ZU3htTEdJc1pDeGpLWDBwZlR0bWRXNWpkR2x2YmlCeVlTaGhMR0lwZTNSb2FYTXVZejFoTzNSb2FYTXVZVDFpZlZ4dWNtRXVjSEp2ZEc5MGVYQmxMbXh2WVdROVpuVnVZM1JwYjI0b1lTbDdablZ1WTNScGIyNGdZaWdwZTJsbUtHWmJYQ0pmWDIxMGFWOW1iblJNYzNSY0lpdGtYU2w3ZG1GeUlHTTlabHRjSWw5ZmJYUnBYMlp1ZEV4emRGd2lLMlJkS0Nrc1pUMWJYU3hvTzJsbUtHTXBabTl5S0haaGNpQnNQVEE3YkR4akxteGxibWQwYUR0c0t5c3BlM1poY2lCclBXTmJiRjB1Wm05dWRHWmhiV2xzZVR0MmIybGtJREFoUFdOYmJGMHVabTl1ZEZOMGVXeGxKaVoyYjJsa0lEQWhQV05iYkYwdVptOXVkRmRsYVdkb2REOG9hRDFqVzJ4ZExtWnZiblJUZEhsc1pTdGpXMnhkTG1admJuUlhaV2xuYUhRc1pTNXdkWE5vS0c1bGR5QkhLR3NzYUNrcEtUcGxMbkIxYzJnb2JtVjNJRWNvYXlrcGZXRW9aU2w5Wld4elpTQnpaWFJVYVcxbGIzVjBLR1oxYm1OMGFXOXVLQ2w3WWlncGZTdzFNQ2w5ZG1GeUlHTTlkR2hwY3l4a1BXTXVZUzV3Y205cVpXTjBTV1FzWlQxakxtRXVkbVZ5YzJsdmJqdHBaaWhrS1h0MllYSWdaajFqTG1NdWJ6dEJLSFJvYVhNdVl5d29ZeTVoTG1Gd2FYeDhYQ0pvZEhSd2N6b3ZMMlpoYzNRdVptOXVkSE11Ym1WMEwycHpZWEJwWENJcEsxd2lMMXdpSzJRclhDSXVhbk5jSWlzb1pUOWNJajkyUFZ3aUsyVTZYQ0pjSWlrc1puVnVZM1JwYjI0b1pTbDdaVDloS0Z0ZEtUb29abHRjSWw5ZlRXOXViM1I1Y0dWRGIyNW1hV2QxY21GMGFXOXVYMTljSWl0Y2JtUmRQV1oxYm1OMGFXOXVLQ2w3Y21WMGRYSnVJR011WVgwc1lpZ3BLWDBwTG1sa1BWd2lYMTlOYjI1dmRIbHdaVUZRU1ZOamNtbHdkRjlmWENJclpIMWxiSE5sSUdFb1cxMHBmVHRtZFc1amRHbHZiaUJ6WVNoaExHSXBlM1JvYVhNdVl6MWhPM1JvYVhNdVlUMWlmWE5oTG5CeWIzUnZkSGx3WlM1c2IyRmtQV1oxYm1OMGFXOXVLR0VwZTNaaGNpQmlMR01zWkQxMGFHbHpMbUV1ZFhKc2MzeDhXMTBzWlQxMGFHbHpMbUV1Wm1GdGFXeHBaWE44ZkZ0ZExHWTlkR2hwY3k1aExuUmxjM1JUZEhKcGJtZHpmSHg3ZlN4blBXNWxkeUJDTzJJOU1EdG1iM0lvWXoxa0xteGxibWQwYUR0aVBHTTdZaXNyS1hvb2RHaHBjeTVqTEdSYllsMHNReWhuS1NrN2RtRnlJRzA5VzEwN1lqMHdPMlp2Y2loalBXVXViR1Z1WjNSb08ySThZenRpS3lzcGFXWW9aRDFsVzJKZExuTndiR2wwS0Z3aU9sd2lLU3hrV3pGZEtXWnZjaWgyWVhJZ2FEMWtXekZkTG5Od2JHbDBLRndpTEZ3aUtTeHNQVEE3YkR4b0xteGxibWQwYUR0c0t6MHhLVzB1Y0hWemFDaHVaWGNnUnloa1d6QmRMR2hiYkYwcEtUdGxiSE5sSUcwdWNIVnphQ2h1WlhjZ1J5aGtXekJkS1NrN1JTaG5MR1oxYm1OMGFXOXVLQ2w3WVNodExHWXBmU2w5TzJaMWJtTjBhVzl1SUhSaEtHRXNZaWw3WVQ5MGFHbHpMbU05WVRwMGFHbHpMbU05ZFdFN2RHaHBjeTVoUFZ0ZE8zUm9hWE11WmoxYlhUdDBhR2x6TG1jOVlueDhYQ0pjSW4xMllYSWdkV0U5WENKb2RIUndjem92TDJadmJuUnpMbWR2YjJkc1pXRndhWE11WTI5dEwyTnpjMXdpTzJaMWJtTjBhVzl1SUhaaEtHRXNZaWw3Wm05eUtIWmhjaUJqUFdJdWJHVnVaM1JvTEdROU1EdGtQR003WkNzcktYdDJZWElnWlQxaVcyUmRMbk53YkdsMEtGd2lPbHdpS1RzelBUMWxMbXhsYm1kMGFDWW1ZUzVtTG5CMWMyZ29aUzV3YjNBb0tTazdkbUZ5SUdZOVhDSmNJanN5UFQxbExteGxibWQwYUNZbVhDSmNJaUU5WlZzeFhTWW1LR1k5WENJNlhDSXBPMkV1WVM1d2RYTm9LR1V1YW05cGJpaG1LU2w5ZlZ4dVpuVnVZM1JwYjI0Z2QyRW9ZU2w3YVdZb01EMDlZUzVoTG14bGJtZDBhQ2wwYUhKdmR5QkZjbkp2Y2loY0lrNXZJR1p2Ym5SeklIUnZJR3h2WVdRaFhDSXBPMmxtS0MweElUMWhMbU11YVc1a1pYaFBaaWhjSW10cGREMWNJaWtwY21WMGRYSnVJR0V1WXp0bWIzSW9kbUZ5SUdJOVlTNWhMbXhsYm1kMGFDeGpQVnRkTEdROU1EdGtQR0k3WkNzcktXTXVjSFZ6YUNoaExtRmJaRjB1Y21Wd2JHRmpaU2d2SUM5bkxGd2lLMXdpS1NrN1lqMWhMbU1yWENJL1ptRnRhV3g1UFZ3aUsyTXVhbTlwYmloY0lpVTNRMXdpS1Rzd1BHRXVaaTVzWlc1bmRHZ21KaWhpS3oxY0lpWnpkV0p6WlhROVhDSXJZUzVtTG1wdmFXNG9YQ0lzWENJcEtUc3dQR0V1Wnk1c1pXNW5kR2dtSmloaUt6MWNJaVowWlhoMFBWd2lLMlZ1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ2hoTG1jcEtUdHlaWFIxY200Z1luMDdablZ1WTNScGIyNGdlV0VvWVNsN2RHaHBjeTVtUFdFN2RHaHBjeTVoUFZ0ZE8zUm9hWE11WXoxN2ZYMWNiblpoY2lCNllUMTdiR0YwYVc0NlhDSkNSVk5pYzNkNVhDSXNYQ0pzWVhScGJpMWxlSFJjSWpwY0lseGNkVEF3WlRkY1hIVXdNR1kyWEZ4MU1EQm1ZMXhjZFRBeE1XWmNYSFV3TVRWbVhDSXNZM2x5YVd4c2FXTTZYQ0pjWEhVd05ETTVYRngxTURRMFpseGNkVEEwTVRaY0lpeG5jbVZsYXpwY0lseGNkVEF6WWpGY1hIVXdNMkl5WEZ4MU1ETmhNMXdpTEd0b2JXVnlPbHdpWEZ4MU1UYzRNRnhjZFRFM09ERmNYSFV4TnpneVhDSXNTR0Z1ZFcxaGJqcGNJbHhjZFRFM09EQmNYSFV4TnpneFhGeDFNVGM0TWx3aWZTeEJZVDE3ZEdocGJqcGNJakZjSWl4bGVIUnlZV3hwWjJoME9sd2lNbHdpTEZ3aVpYaDBjbUV0YkdsbmFIUmNJanBjSWpKY0lpeDFiSFJ5WVd4cFoyaDBPbHdpTWx3aUxGd2lkV3gwY21FdGJHbG5hSFJjSWpwY0lqSmNJaXhzYVdkb2REcGNJak5jSWl4eVpXZDFiR0Z5T2x3aU5Gd2lMR0p2YjJzNlhDSTBYQ0lzYldWa2FYVnRPbHdpTlZ3aUxGd2ljMlZ0YVMxaWIyeGtYQ0k2WENJMlhDSXNjMlZ0YVdKdmJHUTZYQ0kyWENJc1hDSmtaVzFwTFdKdmJHUmNJanBjSWpaY0lpeGtaVzFwWW05c1pEcGNJalpjSWl4aWIyeGtPbHdpTjF3aUxGd2laWGgwY21FdFltOXNaRndpT2x3aU9Gd2lMR1Y0ZEhKaFltOXNaRHBjSWpoY0lpeGNJblZzZEhKaExXSnZiR1JjSWpwY0lqaGNJaXgxYkhSeVlXSnZiR1E2WENJNFhDSXNZbXhoWTJzNlhDSTVYQ0lzYUdWaGRuazZYQ0k1WENJc2JEcGNJak5jSWl4eU9sd2lORndpTEdJNlhDSTNYQ0o5TEVKaFBYdHBPbHdpYVZ3aUxHbDBZV3hwWXpwY0ltbGNJaXh1T2x3aWJsd2lMRzV2Y20xaGJEcGNJbTVjSW4wc1hHNURZVDB2WGloMGFHbHVmQ2cvT2lnL09tVjRkSEpoZkhWc2RISmhLUzAvS1Q5c2FXZG9kSHh5WldkMWJHRnlmR0p2YjJ0OGJXVmthWFZ0ZkNnL09pZy9Pbk5sYldsOFpHVnRhWHhsZUhSeVlYeDFiSFJ5WVNrdFB5ay9ZbTlzWkh4aWJHRmphM3hvWldGMmVYeHNmSEo4WW54Yk1TMDVYVEF3S1Q4b2JueHBmRzV2Y20xaGJIeHBkR0ZzYVdNcFB5UXZPMXh1Wm5WdVkzUnBiMjRnUkdFb1lTbDdabTl5S0haaGNpQmlQV0V1Wmk1c1pXNW5kR2dzWXowd08yTThZanRqS3lzcGUzWmhjaUJrUFdFdVpsdGpYUzV6Y0d4cGRDaGNJanBjSWlrc1pUMWtXekJkTG5KbGNHeGhZMlVvTDF4Y0t5OW5MRndpSUZ3aUtTeG1QVnRjSW00MFhDSmRPMmxtS0RJOFBXUXViR1Z1WjNSb0tYdDJZWElnWnp0MllYSWdiVDFrV3pGZE8yYzlXMTA3YVdZb2JTbG1iM0lvZG1GeUlHMDliUzV6Y0d4cGRDaGNJaXhjSWlrc2FEMXRMbXhsYm1kMGFDeHNQVEE3YkR4b08yd3JLeWw3ZG1GeUlHczdhejF0VzJ4ZE8ybG1LR3N1YldGMFkyZ29MMTViWEZ4M0xWMHJKQzhwS1h0MllYSWdiajFEWVM1bGVHVmpLR3N1ZEc5TWIzZGxja05oYzJVb0tTazdhV1lvYm5Wc2JEMDliaWxyUFZ3aVhDSTdaV3h6Wlh0clBXNWJNbDA3YXoxdWRXeHNQVDFyZkh4Y0lsd2lQVDFyUDF3aWJsd2lPa0poVzJ0ZE8yNDlibHN4WFR0cFppaHVkV3hzUFQxdWZIeGNJbHdpUFQxdUtXNDlYQ0kwWENJN1pXeHpaU0IyWVhJZ2NqMUJZVnR1WFN4dVBYSS9janBwYzA1aFRpaHVLVDljSWpSY0lqcHVMbk4xWW5OMGNpZ3dMREVwTzJzOVcyc3NibDB1YW05cGJpaGNJbHdpS1gxOVpXeHpaU0JyUFZ3aVhDSTdheVltWnk1d2RYTm9LR3NwZlRBOFp5NXNaVzVuZEdnbUppaG1QV2NwT3pNOVBXUXViR1Z1WjNSb0ppWW9aRDFrV3pKZExHYzlXMTBzWkQxa1AyUXVjM0JzYVhRb1hDSXNYQ0lwT2x4dVp5d3dQR1F1YkdWdVozUm9KaVlvWkQxNllWdGtXekJkWFNrbUppaGhMbU5iWlYwOVpDa3BmV0V1WTF0bFhYeDhLR1E5ZW1GYlpWMHBKaVlvWVM1alcyVmRQV1FwTzJadmNpaGtQVEE3WkR4bUxteGxibWQwYUR0a0t6MHhLV0V1WVM1d2RYTm9LRzVsZHlCSEtHVXNabHRrWFNrcGZYMDdablZ1WTNScGIyNGdSV0VvWVN4aUtYdDBhR2x6TG1NOVlUdDBhR2x6TG1FOVluMTJZWElnUm1FOWUwRnlhVzF2T2lFd0xFTnZkWE5wYm1VNklUQXNWR2x1YjNNNklUQjlPMFZoTG5CeWIzUnZkSGx3WlM1c2IyRmtQV1oxYm1OMGFXOXVLR0VwZTNaaGNpQmlQVzVsZHlCQ0xHTTlkR2hwY3k1akxHUTlibVYzSUhSaEtIUm9hWE11WVM1aGNHa3NkR2hwY3k1aExuUmxlSFFwTEdVOWRHaHBjeTVoTG1aaGJXbHNhV1Z6TzNaaEtHUXNaU2s3ZG1GeUlHWTlibVYzSUhsaEtHVXBPMFJoS0dZcE8zb29ZeXgzWVNoa0tTeERLR0lwS1R0RktHSXNablZ1WTNScGIyNG9LWHRoS0dZdVlTeG1MbU1zUm1FcGZTbDlPMloxYm1OMGFXOXVJRWRoS0dFc1lpbDdkR2hwY3k1alBXRTdkR2hwY3k1aFBXSjlSMkV1Y0hKdmRHOTBlWEJsTG14dllXUTlablZ1WTNScGIyNG9ZU2w3ZG1GeUlHSTlkR2hwY3k1aExtbGtMR005ZEdocGN5NWpMbTg3WWo5QktIUm9hWE11WXl3b2RHaHBjeTVoTG1Gd2FYeDhYQ0pvZEhSd2N6b3ZMM1Z6WlM1MGVYQmxhMmwwTG01bGRGd2lLU3RjSWk5Y0lpdGlLMXdpTG1welhDSXNablZ1WTNScGIyNG9ZaWw3YVdZb1lpbGhLRnRkS1R0bGJITmxJR2xtS0dNdVZIbHdaV3RwZENZbVl5NVVlWEJsYTJsMExtTnZibVpwWnlZbVl5NVVlWEJsYTJsMExtTnZibVpwWnk1bWJpbDdZajFqTGxSNWNHVnJhWFF1WTI5dVptbG5MbVp1TzJadmNpaDJZWElnWlQxYlhTeG1QVEE3Wmp4aUxteGxibWQwYUR0bUt6MHlLV1p2Y2loMllYSWdaejFpVzJaZExHMDlZbHRtS3pGZExHZzlNRHRvUEcwdWJHVnVaM1JvTzJnckt5bGxMbkIxYzJnb2JtVjNJRWNvWnl4dFcyaGRLU2s3ZEhKNWUyTXVWSGx3Wld0cGRDNXNiMkZrS0h0bGRtVnVkSE02SVRFc1kyeGhjM05sY3pvaE1TeGhjM2x1WXpvaE1IMHBmV05oZEdOb0tHd3BlMzFoS0dVcGZYMHNNa1V6S1RwaEtGdGRLWDA3Wm5WdVkzUnBiMjRnU0dFb1lTeGlLWHQwYUdsekxtTTlZVHQwYUdsekxtWTlZanQwYUdsekxtRTlXMTE5U0dFdWNISnZkRzkwZVhCbExteHZZV1E5Wm5WdVkzUnBiMjRvWVNsN2RtRnlJR0k5ZEdocGN5NW1MbWxrTEdNOWRHaHBjeTVqTG04c1pEMTBhR2x6TzJJL0tHTXVYMTkzWldKbWIyNTBabTl1ZEdSbFkydHRiMlIxYkdWZlgzeDhLR011WDE5M1pXSm1iMjUwWm05dWRHUmxZMnR0YjJSMWJHVmZYejE3ZlNrc1l5NWZYM2RsWW1admJuUm1iMjUwWkdWamEyMXZaSFZzWlY5ZlcySmRQV1oxYm1OMGFXOXVLR0lzWXlsN1ptOXlLSFpoY2lCblBUQXNiVDFqTG1admJuUnpMbXhsYm1kMGFEdG5QRzA3S3l0bktYdDJZWElnYUQxakxtWnZiblJ6VzJkZE8yUXVZUzV3ZFhOb0tHNWxkeUJIS0dndWJtRnRaU3huWVNoY0ltWnZiblF0ZDJWcFoyaDBPbHdpSzJndWQyVnBaMmgwSzF3aU8yWnZiblF0YzNSNWJHVTZYQ0lyYUM1emRIbHNaU2twS1gxaEtHUXVZU2w5TEVFb2RHaHBjeTVqTENoMGFHbHpMbVl1WVhCcGZIeGNJbWgwZEhCek9pOHZaaTVtYjI1MFpHVmpheTVqYjIwdmN5OWpjM012YW5NdlhDSXBLMlZoS0hSb2FYTXVZeWtyWENJdlhDSXJZaXRjSWk1cWMxd2lMR1oxYm1OMGFXOXVLR0lwZTJJbUptRW9XMTBwZlNrcE9tRW9XMTBwZlR0MllYSWdXVDF1WlhjZ2IyRW9kMmx1Wkc5M0tUdFpMbUV1WXk1amRYTjBiMjA5Wm5WdVkzUnBiMjRvWVN4aUtYdHlaWFIxY200Z2JtVjNJSE5oS0dJc1lTbDlPMWt1WVM1akxtWnZiblJrWldOclBXWjFibU4wYVc5dUtHRXNZaWw3Y21WMGRYSnVJRzVsZHlCSVlTaGlMR0VwZlR0WkxtRXVZeTV0YjI1dmRIbHdaVDFtZFc1amRHbHZiaWhoTEdJcGUzSmxkSFZ5YmlCdVpYY2djbUVvWWl4aEtYMDdXUzVoTG1NdWRIbHdaV3RwZEQxbWRXNWpkR2x2YmloaExHSXBlM0psZEhWeWJpQnVaWGNnUjJFb1lpeGhLWDA3V1M1aExtTXVaMjl2WjJ4bFBXWjFibU4wYVc5dUtHRXNZaWw3Y21WMGRYSnVJRzVsZHlCRllTaGlMR0VwZlR0MllYSWdXajE3Ykc5aFpEcHdLRmt1Ykc5aFpDeFpLWDA3WENKbWRXNWpkR2x2Ymx3aVBUMDlkSGx3Wlc5bUlHUmxabWx1WlNZbVpHVm1hVzVsTG1GdFpEOWtaV1pwYm1Vb1puVnVZM1JwYjI0b0tYdHlaWFIxY200Z1duMHBPbHdpZFc1a1pXWnBibVZrWENJaFBUMTBlWEJsYjJZZ2JXOWtkV3hsSmladGIyUjFiR1V1Wlhod2IzSjBjejl0YjJSMWJHVXVaWGh3YjNKMGN6MWFPaWgzYVc1a2IzY3VWMlZpUm05dWREMWFMSGRwYm1SdmR5NVhaV0pHYjI1MFEyOXVabWxuSmlaWkxteHZZV1FvZDJsdVpHOTNMbGRsWWtadmJuUkRiMjVtYVdjcEtUdDlLQ2twTzF4dUlsMTkifQ==
