(function () {
	/** Array.from polyfill */
	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	if (!Array.from) {
		Array.from = (function () {
			var toStr = Object.prototype.toString;
			var isCallable = function (fn) {
				return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
			};
			var toInteger = function (value) {
				var number = Number(value);
				if (isNaN(number)) {
					return 0;
				}
				if (number === 0 || !isFinite(number)) {
					return number;
				}
				return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
			};
			var maxSafeInteger = Math.pow(2, 53) - 1;
			var toLength = function (value) {
				var len = toInteger(value);
				return Math.min(Math.max(len, 0), maxSafeInteger);
			};

			// The length property of the from method is 1.
			return function from(arrayLike /*, mapFn, thisArg */) {
				// 1. Let C be the this value.
				var C = this;

				// 2. Let items be ToObject(arrayLike).
				var items = Object(arrayLike);

				// 3. ReturnIfAbrupt(items).
				if (arrayLike == null) {
					throw new TypeError('Array.from requires an array-like object - not null or undefined');
				}

				// 4. If mapfn is undefined, then let mapping be false.
				var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
				var T;
				if (typeof mapFn !== 'undefined') {
					// 5. else
					// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
					if (!isCallable(mapFn)) {
						throw new TypeError(
							'Array.from: when provided, the second argument must be a function');
					}

					// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
					if (arguments.length > 2) {
						T = arguments[2];
					}
				}

				// 10. Let lenValue be Get(items, "length").
				// 11. Let len be ToLength(lenValue).
				var len = toLength(items.length);

				// 13. If IsConstructor(C) is true, then
				// 13. a. Let A be the result of calling the [[Construct]] internal method
				// of C with an argument list containing the single item len.
				// 14. a. Else, Let A be ArrayCreate(len).
				var A = isCallable(C) ? Object(new C(len)) : new Array(len);

				// 16. Let k be 0.
				var k = 0;
				// 17. Repeat, while k < len… (also steps a - h)
				var kValue;
				while (k < len) {
					kValue = items[k];
					if (mapFn) {
						A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
					} else {
						A[k] = kValue;
					}
					k += 1;
				}
				// 18. Let putStatus be Put(A, "length", len, true).
				A.length = len;
				// 20. Return A.
				return A;
			};
		}());
	}
	if (typeof window.CustomEvent !== "function") {
		function CustomEvent(event, params) {
			params = params || {bubbles: false, cancelable: false, detail: undefined};
			var evt = document.createEvent('CustomEvent');
			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
			return evt;
		}

		CustomEvent.prototype = window.Event.prototype;

		window.CustomEvent = CustomEvent;
	}
})();
(function (root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		//@require Jquery
		if (!root.GMComponents) {
			root.GMComponents = {}
		}

		$.extend(root.GMComponents, factory());
	}
})(this, function () {

	var KeyCode = {
		BACKSPACE: 8,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		DELETE: 46
	};

	var Utils = {}
	// Polyfill src https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
	Utils.matches = function (element, selector) {
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.matchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.oMatchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				function (s) {
					var matches = element.parentNode.querySelectorAll(s);
					var i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {
					}
					return i > -1;
				};
		}

		return element.matches(selector);
	};

	Utils.remove = function (item) {
		if (item.remove && typeof item.remove === 'function') {
			return item.remove();
		}
		if (item.parentNode &&
			item.parentNode.removeChild &&
			typeof item.parentNode.removeChild === 'function') {
			return item.parentNode.removeChild(item);
		}
		return false;
	};

	Utils.isFocusable = function (element) {
		if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
			return true;
		}

		if (element.disabled) {
			return false;
		}

		switch (element.nodeName) {
			case 'A':
				return !!element.href && element.rel != 'ignore';
			case 'INPUT':
				return element.type != 'hidden' && element.type != 'file';
			case 'BUTTON':
			case 'SELECT':
			case 'TEXTAREA':
				return true;
			default:
				return false;
		}
	};

	Utils.getAncestorBySelector = function (element, selector) {
		if (!Utils.matches(element, selector + ' ' + element.tagName)) {
			// Element is not inside an element that matches selector
			return null;
		}

		// Move up the DOM tree until a parent matching the selector is found
		var currentNode = element;
		var ancestor = null;
		while (ancestor === null) {
			if (Utils.matches(currentNode.parentNode, selector)) {
				ancestor = currentNode.parentNode;
			} else {
				currentNode = currentNode.parentNode;
			}
		}

		return ancestor;
	};


	Utils.hasClass = function (element, className) {
		return (new RegExp('(\\s|^)' + className + '(\\s|$)')).test(element.className);
	};

	Utils.addClass = function (element, className) {
		if (!Utils.hasClass(element, className)) {
			element.className += ' ' + className;
		}
	};

	Utils.removeClass = function (element, className) {
		var classRegex = new RegExp('(\\s|^)' + className + '(\\s|$)');
		element.className = element.className.replace(classRegex, ' ').trim();
	};

	Utils.bindMethods = function (object /* , ...methodNames */) {
		var methodNames = Array.prototype.slice.call(arguments, 1);
		methodNames.forEach(function (method) {
			object[method] = object[method].bind(object);
		});
	};

	Utils.merge = function () {
		var args = Array.from(arguments);
		var copy = {};

		args.forEach(function (arg) {
			if (typeof arg !== 'object') return;

			var keys = Object.keys(arg);

			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (arg.hasOwnProperty(key)) {
					copy[key] = arg[key];
				}
			}
		});

		return copy;
	}

	Utils.uuidv4 = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	return {
		Utils: Utils,
		KeyCode: KeyCode
	}
});


