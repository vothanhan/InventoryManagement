webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



__webpack_require__(8);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(11);
__webpack_require__(9);
__webpack_require__(12);
__webpack_require__(10)

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

app.config(function($stateProvider,$urlRouterProvider,$locationProvider){

	$stateProvider.state('dashboard',{
		url:'/dashboard',
		template: '<h1>Hello World!!!</h1>'
	});
	$stateProvider.state('product',{
		url:'/product',
		templateUrl: '../view/detailcontent/product/index.html',
		controller:'productCtrl'
	});
	$stateProvider.state('order',{
		url:'/order',
		template: '<h1>Hello Order!!!</h1>'
	});
	$stateProvider.state('report',{
		url:'/report',
		template: '<h1>Hello Report!!!</h1>'
	});
	$stateProvider.state('supplier',{
		url:'/supplier',
		template: '<h1>Hello Supplier!!!</h1>'
	});


	//$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('dashboard');
})


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

app.controller('productCtrl',['$scope','$rootScope','$http','productFactory',function($scope,$rootScope,$http,productFactory){
	var ctrl=this;
	var products=[];

	$scope.status;
	$scope.name='';
	$scope.itemType='';
	$scope.price='';
	$scope.stock='';
	init();
	function init(){
		getAllProducts();
		$('.modal').modal();

	};

	function getAllProducts(){
		productFactory.getAllProducts()
			.then(function(response){
				$scope.products=response.data;
			},function(error){
				$scope.status='Unable to load products. Message:'+error.message;
			});
	}	
	$scope.getProduct=function(id){
		response={};
		productFactory.getProduct(id)
			.then(function(response){
				response.data=response.data;
				response.err=false;
			},function(error){
				response.err=true;
				response.txt=error.message;
			});
		return response;
	}
	$scope.deleteProduct = function(id,index){
		productFactory.deleteProduct(id)
			.then(function(response){
				$scope.products.splice(index,1);
				window.alert('Delete successfully ');
			},function(error){
				window.alert('Unable to delete product.\n Error message: '+error.message);
			});
	}
	$scope.addProduct = function(){
		newProduct={};
		newProduct.name=$scope.name;
		newProduct.itemType=$scope.itemType;
		newProduct.price=$scope.price;
		newProduct.stock=$scope.stock;
		productFactory.addProduct(newProduct).then(function(response){
			$scope.products.push(response.data.data);
			window.alert('Add '+ $scope.name +' successfully');
			//$scope.products.push(response.data)
		},function(error){
			window.alert("Cannot add " + $scope.name+"\nError message: "+error.message);
		});
	}

}])

/***/ }),
/* 9 */
/***/ (function(module, exports) {

app.directive('appContent',function(){
	return {
		templateUrl: '../view/appcontent/index.html',
		replace:true
	}
})

/***/ }),
/* 10 */
/***/ (function(module, exports) {

app.directive('detailContent',function(){
	return {
		templateUrl: '../view/detailcontent/index.html',
		replace:true
	}
})


/***/ }),
/* 11 */
/***/ (function(module, exports) {

app.directive('headerBar',function(){
	return {
		templateUrl: '../view/header/index.html',
		replace:true
	}
})


/***/ }),
/* 12 */
/***/ (function(module, exports) {

app.directive('sideBar',function(){
	return {
		templateUrl: '../view/sidebar/index.html',
		replace:true
	}
})


/***/ }),
/* 13 */
/***/ (function(module, exports) {

app.factory('productFactory',['$http',function($http){
	var productFactory={};
	var urlBase='/api/items';

	productFactory.getAllProducts = function(){
		console.log($http.get(urlBase));
		return $http.get(urlBase);
	};

	productFactory.getProduct = function(id){
		console.log($http.get(urlBase+'/'+id));
		return $http.get(urlBase+'/'+id);
	};

	productFactory.addProduct = function(product){
		return $http.post(urlBase,product);
	};

	productFactory.updateProduct = function(product){
		return $http.put(urlBase+'/'+product._id,product);
	};

	productFactory.deleteProduct = function(id){
		return $http.delete(urlBase+'/'+id);
	};

	return productFactory;
}])

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

angular = __webpack_require__(0);
app = angular.module('inventorymanage',['ui.router']);

domain='localhost:3000';

__webpack_require__(4);
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);


/***/ })
],[27]);