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
		root.GMWishListManager = factory();
	}
}(this, function () {

	/**
	 * 젠몬 프론트 리뉴얼 상품 WishList 관리 스크립트
	 * @author 김태웅
	 */

	/**
	 * 위시리스트 변경 콜백함수
	 * @callback changeCallback
	 * @param {String} action - add OR remove action type
	 */


	/**
	 * @param {Boolean} isMember 회원인지 아닌지 여부
	 * @param {String} storeView
	 */
	function GMWishListManager(isMember, storeView) {
		/**
		 * @type {import('./api.js')}
		 */
		this._api = window.GMShopApi;

		this._isMember = isMember;
		this.storeView = storeView
		try {
			this._isSupportStorage = !!window.localStorage;
		} catch (e) {
			
		}

		this._callbacks = [];
	}

	var _callbacks = [];

	/**
	 * @static
	 */
	GMWishListManager.KEYS = {
		'GUEST_WISHLIST': 'guest_wishlist',
	}
	/**
	 * @static
	 * @param {changeCallback} callback
	 */
	GMWishListManager.onChange = function (callback) {
		if (typeof callback === 'function') {
			_callbacks.push(callback);
		}
	};

	/**
	 * 위시리스트 변경 시 change 이벤트 발생 트리거
	 * @static
	 * @param {String} action
	 */
	GMWishListManager.emitChange = function (action) {
		_callbacks.forEach(function (callback) {
			callback(action);
		});
	};

	/**
	 * 위시리스트 추가 메소드
	 * @param {Object} item
	 * @param {String} item.sku
	 * @param {String} item.image
	 * @param {String} item.link
	 * @param {Object} item.categories
	 * @param {String} countryDomain
	 * @return {Promise<any>}
	 */
	GMWishListManager.prototype.addItem = function (item, countryDomain= '') {
		var pr = null;
		if (this._isMember) {
			pr = this._api.addWishList(item.sku, countryDomain);
		} else {
			const storeView = this.storeView;
			pr = new Promise(function (resolve, reject) {
				try {
					const wishlistItems = getItemsFromLocalStorage();
					const countryWishlistItems = wishlistItems[storeView] ? wishlistItems[storeView] : [];
					countryWishlistItems.push(item);
					wishlistItems[storeView] = countryWishlistItems;
					localStorage.setItem(GMWishListManager.KEYS.GUEST_WISHLIST, JSON.stringify(wishlistItems));
					resolve();
				} catch (e) {
					reject(e);
				}
			});
		}

		return pr.then(function () {
			GMWishListManager.emitChange('add');
		});
	}

	/**
	 * 위시리스트 삭제 메소드
	 * @param {String} sku Magento product sku
	 * @param {String} countryDomain
	 * @return {Promise<any>}
	 */
	GMWishListManager.prototype.removeItem = function (sku, countryDomain = '') {
		var pr = null;
		if (this._isMember) {
			pr = this._api.removeWishList(sku, countryDomain);
		} else {
			const storeView = this.storeView;
			pr = new Promise(function (resolve, reject) {
				try {
					const wishlistItems = getItemsFromLocalStorage();
					let countryWishlistItems = wishlistItems[storeView];

					countryWishlistItems = countryWishlistItems.filter(function (item) {
						return sku !== item.sku;
					});
					wishlistItems[storeView] = countryWishlistItems;

					localStorage.setItem(GMWishListManager.KEYS.GUEST_WISHLIST, JSON.stringify(wishlistItems));
					resolve();
				} catch (e) {
					reject(e);
				}
			});
		}

		return pr.then(function () {
			GMWishListManager.emitChange('remove');
		});
	}

	/**
	 * @return {Promise<String[]>}
	 * @param {String} countryDomain
	 * 위시리스트 ID 반환 함수
	 */
	GMWishListManager.prototype.getWishListItems = function (countryDomain = '') {
		if (this._isMember) {
			return this._api.getWishListIds(countryDomain)
				.then(function (response) {
					let wishlist = JSON.parse(response.data);

					wishlist = wishlist.map(function (product) {
						const sku = product.sku;
						const image = product.image.url;
						const price = product.price;
						const name = product.name;
						const parentSku = product.parent_sku;
						const categories = product.categories;

						let link = '';

						if (product.is_gift_card) {
							link = countryDomain + 'shop/gift_card_detail?parent_sku=' + sku;
						} else {
							link = countryDomain + 'shop/detail?parent_sku=' + parentSku + '&sku=' + sku;
						}

						return { sku: sku, image: image, link: link, name: name, price: price, categories: categories };
					});

					return wishlist;
				});
		} else {
			const storeView = this.storeView;
			return new Promise(function (resolve, reject) {
				try {
					const wishlistItems = getItemsFromLocalStorage();
					const countryWishlistItems = wishlistItems[storeView] ? wishlistItems[storeView] : [];
					resolve(countryWishlistItems.reverse());
				} catch (e) {
					reject(e);
				}
			});
		}
	}

	/**
	 * @return {Object}
	 */
	function getItemsFromLocalStorage() {
		const wishListItemsString = localStorage.getItem(GMWishListManager.KEYS.GUEST_WISHLIST);
		let wishlistItems = {};

		if (wishListItemsString) {
			wishlistItems = JSON.parse(wishListItemsString);
		}

		return wishlistItems;
	}

	return GMWishListManager;

}));
