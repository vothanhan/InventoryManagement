webpackJsonp([0],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);
__webpack_require__(5);
__webpack_require__(8);
__webpack_require__(6)

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

angular = __webpack_require__(0);
app = angular.module('inventorymanage',[]);

//require('./controllers/index.js');
__webpack_require__(1);
//require('./services/index.js');


/***/ }),

/***/ 5:
/***/ (function(module, exports) {

angular.module('inventorymanage').directive('appContent',function(){
	return {
		templateUrl: '../view/appcontent/index.html',
		replace:true
	}
})


/***/ }),

/***/ 6:
/***/ (function(module, exports) {

angular.module('inventorymanage').directive('detailContent',function(){
	return {
		templateUrl: '../view/detailcontent/index.html',
		replace:true
	}
})


/***/ }),

/***/ 7:
/***/ (function(module, exports) {

angular.module('inventorymanage').directive('headerBar',function(){
	return {
		templateUrl: '../view/header/index.html',
		replace:true
	}
})


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

angular.module('inventorymanage').directive('sideBar',function(){
	return {
		templateUrl: '../view/sidebar/index.html',
		replace:true
	}
})


/***/ })

},[22]);