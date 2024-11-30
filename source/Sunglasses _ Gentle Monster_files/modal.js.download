(function () {
	//ref:https://github.com/ghosh/Micromodal/blob/master/lib/src/index.js

	var FOCUSABLE_ELEMENTS = [
		'a[href]',
		'area[href]',
		'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
		'select:not([disabled]):not([aria-hidden])',
		'textarea:not([disabled]):not([aria-hidden])',
		'button:not([disabled]):not([aria-hidden])',
		'iframe',
		'object',
		'embed',
		'[contenteditable]',
		'[tabindex]:not([tabindex^="-"])'
	];

	/**
	 * @namespace GMComponents
	 */
	var Components = window.GMComponents || (window.GMComponents = {});
	/**
	 * @typedef ModalOptions
	 * @type {Object}
	 * @property {string} baseClass
	 * @property {string} closeTrigger
	 */


	/**
	 * @class
	 * @param {HTMLElement} container
	 * @param {ModalOptions} options
	 */

	Components.Modal = function (container, options) {
		this.containerEl = container;
		this._isOpened = false;
		this._baseClass = '';
		this.id = null;
		this.uuid = null;
		this.dim = null;
		this.options = Components.Utils.merge({
			baseClass: 'modal-box',
			closeTrigger: 'data-close'
		}, options);
		this._initialize();
	}


	/**
	 * initialize constructor
	 */
	Components.Modal.prototype._initialize = function () {
		this._baseClass = this.options.baseClass;

		if (!Components.Utils.addClass(this.containerEl, this._baseClass)) {
			Components.Utils.addClass(this.containerEl, this._baseClass);
		}

		this.dim = document.createElement('div');
		this.uuid = Components.Utils.uuidv4();
		this.id = this.containerEl.getAttribute('id');
		if (!this.id) {
			this.id = this.uuid;
			this.containerEl.setAttribute('id', this.id);
		}

		// attribute setup
		this.containerEl.setAttribute('role', 'dialog');
		this.containerEl.setAttribute('tabindex', '-1');
		this.containerEl.setAttribute('aria-modal', this._isOpened.toString());
		this.containerEl.setAttribute('aria-hidden', (!this._isOpened).toString());


		Components.Utils.addClass(this.dim, this._baseClass + '__dim')
		this.dim.setAttribute(this.options.closeTrigger, '');
		this.containerEl.appendChild(this.dim);


		document.addEventListener('keydown', this.onKeydown.bind(this));
		document.addEventListener('click', this.onDelegateClose.bind(this));
		this.containerEl.style.display = '';
	}

	Components.Modal.prototype.onDelegateClose = function (event) {
		var target = event.srcElement || event.target;
		var isInComponent = this.containerEl !== target && this.containerEl.contains(target);

		if (!(isInComponent && target.hasAttribute(this.options.closeTrigger))) return;

		this.close();
	}

	Components.Modal.prototype.onKeydown = function (event) {
		if (event.keyCode === Components.KeyCode.ESC) this.close() // esc
		if (event.keyCode === Components.KeyCode.TAB) this.retainFocus(event) // tab
	}

	Components.Modal.prototype.setFirstNodeFocus = function () {
		var self = this;
		var focusElementList = this.getFocusElementList();

		if (focusElementList.length === 0) return;


		var ignoreFocusList = focusElementList.filter(function (node) {
			return !node.hasAttribute(self.options.closeTrigger);
		});

		if (ignoreFocusList.length > 0) ignoreFocusList[0].focus();
		else focusElementList[0].focus();
	}
	/**
	 * @param {KeyboardEvent} event
	 */
	Components.Modal.prototype.retainFocus = function (event) {
		var isShiftKey = event.shiftKey,
			activeElement = document.activeElement,
			focusElementList = this.getFocusElementList();

		if (focusElementList.length === 0 || !this._isOpened) return;

		if (!this.containerEl.contains(activeElement)) {
			event.preventDefault();
			focusElementList[0].focus();
		} else {
			var currentIndex = -1;
			for (var i = 0; i < focusElementList.length; i++) {
				if (focusElementList[i] === activeElement) {
					currentIndex = i;
					break;
				}
			}

			// 이전포커스 키 입력 전 포커스가 제일 빠른 인덱스 일 때
			if (isShiftKey && currentIndex === 0) {
				event.preventDefault();
				focusElementList[focusElementList.length - 1].focus();
				// 다음포커스 키입력 전 포커스가 마지막 인덱스일때
			} else if (!isShiftKey && currentIndex === focusElementList.length - 1) {
				event.preventDefault();
				focusElementList[0].focus();
			}
		}
	}


	var mobileKeyWords = ['Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson'];
	/**
	 * @desc
	 *  모달 컴포넌트 open 메소드
	 */
	Components.Modal.prototype.open = function () {
		var self = this;
		if (this._isOpened) return;

		this._isOpened = true;
		Components.Utils.addClass(this.containerEl, this._baseClass + '--open');
		this.containerEl.setAttribute('aria-modal', this._isOpened.toString());
		this.containerEl.setAttribute('aria-hidden', (!this._isOpened).toString());
		requestAnimationFrame(function () {
			self.setFirstNodeFocus();
		});

		if (window.innerWidth < 420) {
			document.documentElement.classList.add('modal-open');
		}
	}

	/**
	 * @desc
	 *  모달 컴포넌트 close 메소드
	 */
	Components.Modal.prototype.close = function () {
		if (!this._isOpened) return;
		this._isOpened = false;
		Components.Utils.removeClass(this.containerEl, this._baseClass + '--open');
		this.containerEl.setAttribute('aria-modal', this._isOpened.toString());
		this.containerEl.setAttribute('aria-hidden', (!this._isOpened).toString());

		if (window.innerWidth < 420) {
			document.documentElement.classList.remove('modal-open');
		}
	}

	/**
	 * @desc
	 *  open/close 여부 확인 메소드
	 * @return {boolean}
	 */
	Components.Modal.prototype.isOpen = function () {
		return this._isOpened;
	}

	/**
	 * @desc
	 *  Modal Component 내부 FOCUS 가능한 Element 배열 번환
	 * @return {Element[]}
	 */
	Components.Modal.prototype.getFocusElementList = function () {
		var focusElementList = Array.from(this.containerEl.querySelectorAll(FOCUSABLE_ELEMENTS.join(',')));

		return focusElementList.filter(function (node) {
			// @ts-ignore
			return node.offsetParent !== null;
		});
	}

	Components.Modal.prototype.destroy = function () {
		if (this._isOpened) {
			this.close();

			this._isOpened = false;
		}
		Components.Utils.remove(this.containerEl);
		this.containerEl = null;
	}
})();
