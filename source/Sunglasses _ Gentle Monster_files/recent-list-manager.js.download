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
		root.GMRecentListManager = factory();
	}
}(this, function () {

	/**
	 * 젠몬 프론트 리뉴얼 최근 본 상품 관리 스크립트
	 * @author 김태웅
	 * 수정 wisecommerce 박윤권
	 */

	/**
	 * 최근 본 상품 변경 콜백함수
	 * @callback changeCallback
	 * @param {String} action - add OR remove action type
	 */


	/**
	 * @constructor
	 */
	function GMRecentListManager() {
		/**
		 * @type {import('./api.js')}
		 */
		this._callbacks = [];
		this._maxCount = 20;
	}

	var _callbacks = [];

	/**
	 * @static
	 */
	GMRecentListManager.KEYS = {
		'RECENT_ITEMS': 'recent_items',
	}
	/**
	 * @static
	 * @param {changeCallback} callback
	 */
	GMRecentListManager.onChange = function (callback) {
		if (typeof callback === 'function') {
			_callbacks.push(callback);
		}
	};

	/**
	 * 최근 본 상품 추가/삭제 시 change 이벤트 발생 트리거
	 * @static
	 * @param {String} action
	 */
	GMRecentListManager.emitChange = function (action) {
		_callbacks.forEach(function (callback) {
			callback(action);
		});
	};

	/**
	 * 최근 본 상품 추가 메소드
	 * @param {Object} item
	 * @param {String} item.sku
	 * @param {String} item.image
	 * @param {String} item.link
	 * @return {undefined}
	 */
	GMRecentListManager.prototype.addItem = function (item) {
		const itemsString = localStorage.getItem(GMRecentListManager.KEYS.RECENT_ITEMS);
		let items = [];
		let hasIdIndex = -1;

		if (itemsString) {
			items = JSON.parse(itemsString);
		}

		if (!Array.isArray(items)) {
			return;
		}

		for (let i = 0; i < items.length; i++) {
			if (items[i]['sku'] === item.sku) {
				hasIdIndex = i;
			}
		}

		/**
		 * 이미 담긴 상품이면 삭제 후 index를 앞으로 조정한다.
		 */
		if (hasIdIndex !== -1) {
			items.splice(hasIdIndex, 1);
		}
		items = [item].concat(items);


		if (items.length > this._maxCount) {
			items = items.slice(0, this._maxCount);
		}

		localStorage.setItem(GMRecentListManager.KEYS.RECENT_ITEMS, JSON.stringify(items));
		GMRecentListManager.emitChange('add');
	}

	/**
	 * 최근 본 상품 삭제 메소드
	 * @param {String} it_id 상품 고유 ID
	 * @return {Promise<any>}
	 */
	// This function seems to be not use.
	GMRecentListManager.prototype.removeItem = function (it_id) {
		return new Promise(function (resolve, reject) {
			try {
				var idListString = localStorage.getItem(GMRecentListManager.KEYS.RECENT_ITEMS);
				var ids = [];
				if (idListString) {
					ids = JSON.parse(idListString);
				}

				if (Array.isArray(ids)) {
					ids = ids.filter(function (id) {
						return id !== it_id;
					});
				}

				localStorage.setItem(GMRecentListManager.KEYS.RECENT_ITEMS, JSON.stringify(ids));
				resolve();
			} catch (e) {
				reject(e);
			}
		}).then(function () {
			GMRecentListManager.emitChange('remove');
		});
	}

	/**
	 * @return {String[]}
	 * return recently viewed items
	 */
	GMRecentListManager.prototype.getItems = function () {
		const itemsString = localStorage.getItem(GMRecentListManager.KEYS.RECENT_ITEMS);
		let items = [];

		if (itemsString) {
			items = JSON.parse(itemsString);
		}

		return items;
	}

	return GMRecentListManager;
}));
