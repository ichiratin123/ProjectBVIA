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
		root.GMShopApi = factory();
	}
}(this, function () {
	/**
	 * 젠몬 프론트 리뉴얼 상품 api 호출 스크립트
	 * @author 김태웅
	 */

	/**
	 * @typedef shopApiParams
	 * @property {string} category - 1depth category Id
	 * @property {number} page in category
	 * @property {number} limit
	 * @property {string} [sub_category] - 2depth category Id
	 * @property {string} [lens_colors[]] product color (filter option)
	 * @property {string} [frame_colors[]] product color (filter option)
	 * @property {string} [gender[]] product gender (filter option)
	 * @property {string} [order] product order (filter option) ex. value in (newest, low_price, high_price)
	 */

	/**
	 * @typedef shopApiItemParams
	 * @property {string|string[]} it_id item_id
	 */

	/**
	 * @typedef shopApiResult
	 * @property {string} status SUCCESS, FAIL Text
	 * @property {Array<any>} [data] model result data
	 * @property {number} [count] query total count
	 * @property {number} [limit] data page list coint
	 * @property {number} [page] page number
	 * @property {boolean} [is_last_page] is last model data
	 */

	/**
	 * @module GMShipApi
	 */
	var shopApi = {};

	var API_PATH = {
		SHOP_LIST: 'product/api/items_by_category',
		SHOP_LIST_COUNT: 'product/api/items_by_category_count',
		GET_LIST_BY_ID: 'shop/api/items_by_id.php',
		WISHLIST: 'wishlist/api',
	}

	/**
	 * ajax method get
	 * @param {String} url
	 * @param {any} [data]
	 * @return {Promise<shopApiResult>}
	 */
	function request(url, data) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				method: 'get',
				url: url,
				data: data,
				dataType: 'json'
			})
				.done(resolve)
				.error(reject);
		});
	}

	function requestPost(url, data) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				method: 'post',
				url: url,
				data: data,
				dataType: 'json'
			})
				.done(resolve)
				.error(reject);
		});
	}

	function requestDelete(url, data) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				method: 'delete',
				url: url,
				data: data,
				dataType: 'json'
			})
				.done(resolve)
				.error(reject);
		});
	}

	/**
	 * getProductList
	 * @param {shopApiParams|String} shopApiParams
	 * @param {String} countryDomain
	 * @return {Promise<shopApiResult>}
	 */
	shopApi.getList = function (shopApiParams, countryDomain= '') {
		var params = shopApiParams;

		return request(`${countryDomain}${API_PATH.SHOP_LIST}`, params)
			.then(function (data) {
				return data;
			});
	}

	/**
	 * getProductListCount
	 * @param {shopApiParams} shopApiParams
	 * @param {String} countryDomain
	 * @return {Promise<shopApiResult>}
	 */
	shopApi.getListCount = function (shopApiParams, countryDomain= '') {
		var params = shopApiParams;

		return request(`${countryDomain}${API_PATH.SHOP_LIST_COUNT}`, params);
	}


	/**
	 * getList by product.it_id
	 * @param {shopApiItemParams|String} params
	 * @param {String} countryDomain
	 * @return {Promise<shopApiResult>}
	 */
	shopApi.getListById = function (params, countryDomain= '') {
		return request(`${countryDomain}${API_PATH.GET_LIST_BY_ID}`, params)
			.then(function (data) {
				return data;
			});
	}

	/**
	 * add Wishlist item api
	 * @param {String} sku
	 * @param {String} countryDomain
	 * @return {Promise<shopApiResult>}
	 */
	shopApi.addWishList = function (sku, countryDomain= '') {
		return requestPost(`${countryDomain}${API_PATH.WISHLIST}` + '/' + sku);
	}

	/**
	 * remove Wishlist item api by id
	 * @param {String} sku
	 * @param {String} countryDomain
	 * @return {Promise<shopApiResult>}
	 */
	shopApi.removeWishList = function (sku, countryDomain= '') {
		return requestDelete(`${countryDomain}${API_PATH.WISHLIST}` + '/' + sku);
	}

	/**
	 * get Wishlist items api
	 * @param {String} countryDomain
	 * @return {Promise<shopApiResult>}
	 */
	shopApi.getWishListIds = function (countryDomain= '') {
		return request(`${countryDomain}${API_PATH.WISHLIST}`);
	}

	return shopApi;
}));
