webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(8);
__webpack_require__(9);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(14);
__webpack_require__(12);
__webpack_require__(16);
__webpack_require__(13);
__webpack_require__(17);
__webpack_require__(11);
__webpack_require__(10);
__webpack_require__(15);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);

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
		template: '<div ui-view="itemlist" id="itemlist"></div><div ui-view="sideinfo" id="sideinfo"></div>',
		abstract:true
	})
		.state('product.list',{
			url:'/list',
			views:{
				"itemlist":{
					controller:'productCtrl',
					templateUrl:"../view/detailcontent/product/list.html"
				},
				"sideinfo":{
					template:""
				}
			}
		}).state('product.info',{
			url:'/{productID}',
			views:{
				"itemlist":{
					controller:'productCtrl',
					templateUrl:"../view/detailcontent/product/list.html"
				},
				"sideinfo":{
					templateUrl:"../view/detailcontent/product/info.html",
					controller:'productInfoCtrl'
				}
			}
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

app.controller('productCtrl',['$scope','$rootScope','$state','$http','productFactory',function($scope,$rootScope,$state,$http,productFactory){
	var ctrl=this;
	var products=[];
	$scope.status;
	$scope.state;
	$scope.name='';
	$scope.itemType='';
	$scope.sellPrice='';
	$scope.buyPrice='';
	$scope.stock='';
	$scope.restockAmount='';
	$scope.unit='';
	$scope.changeHistory=[];
	$scope.sellHistory=[];

	$scope.sort={
		field:'name',
		reverse:false
	}

	init();
	function init(){
		
		getAllProducts();
		$scope.state=$state.current.name;
		changeWidth();
	};

	$scope.setOrder=function(type){
		if($scope.sort.field==type){
			$scope.sort.reverse=!$scope.sort.reverse
		}
		else{
			$scope.sort.field=type;
			$scope.sort.reverse=true;
		}
	}

	function getAllProducts(){
		productFactory.getAllProducts()
			.then(function(response){
				$scope.products=response.data;
			},function(error){
				$scope.status='Unable to load products. Message:'+error.message;
			});
	};
	function changeWidth(){
		var list=$('#itemlist');
		if($scope.state=='product.list')
		{
			list.width('100%');
			
		}
		else if($scope.state=='product.info'){
			list.css({'float':'left','width':'25rem'});
		}
	};
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

		newProduct={
			name:$scope.name,
			itemType:$scope.itemType,
			sellPrice:$scope.sellPrice,
			buyPrice:$scope.buyPrice,
			restockAmount:$scope.restockAmount,
			stock:$scope.stock,
			unit:$scope.unit,
			changeHistory:[],
			sellHistory:[]
		};
		productFactory.addProduct(newProduct).then(function(response){
			$scope.products.push(response.data.data);
			window.alert('Add '+ $scope.name +' successfully');
			//$scope.products.push(response.data)
		},function(error){
			window.alert("Cannot add " + $scope.name+"\nError message: "+error.message);
		});

		return false;
	}

}])

/***/ }),
/* 9 */
/***/ (function(module, exports) {

app.controller("productInfoCtrl",['$scope','$rootScope','$state','$stateParams','productFactory',function($scope,$rootScope,$state,$stateParams,productFactory){

	$scope.product;

	$scope.selectTab=0;
	$scope.stockAdjustAmount=0;
	$scope.adjustReason='';
	$scope.adjustDate='';

	var init= function(){
		$scope.getItem();
		changeWidth();
		$(document).ready(function(){
			$('ul.tabs').tabs();
		});
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			day:'picker__day',
			disabled:'picker__day--disabled'
		});

	}
	function changeWidth(){
		var info=$('#sideinfo');
		info.addClass('inInfo');
	}
	$scope.getItem= function(){
		productFactory.getProduct($stateParams.productID)
			.then(function(res){
				$scope.product=res.data.data;
			},function(err){
				window.warning('Cannot get product.\n Error message: '+ err.message);
			});
	};
	$scope.editProduct= function(){
		productFactory.updateProduct($scope.product)
			.then(function(res){
				window.alert("Edit successfully.");
				$scope.getItem();
			},function(err){
				window.warning("Cannot edit product.\n Error message: "+ err.message);
			});
	}

	$scope.adjustStock= function(id){
		productFactory.getProduct(id)
			.then(function(res){
				var tmp=res.data.data;
				var adjustment={"amount":$scope.stockAdjustAmount,"reason":$scope.adjustReason,"date":$("#adjust-date").val()}
				tmp.changeHistory.push(adjustment);
				tmp.stock+=$scope.stockAdjustAmount;
				productFactory.updateProduct(tmp)
					.then(function(res){
						window.alert("Adjust successfully.");
						$scope.getItem();
					},function(err){
						window.warning("Cannot adjust product.\n Error message: "+ err.message);
					});
				
			},function(err){
				window.warning('Cannot get product.\n Error message: '+ err.message);
			});
	}

	$scope.deleteItem=function(id){
		var bool=window.confirm("The item will be deleted permanently. Do you want to proceed?");
		if(bool==true){
			productFactory.deleteProduct(id)
				.then(function(res){
					window.alert("Delete successfully.");
				},function(err){
					window.warning("Cannot delete product. \n Error message: "+err.message);
				})
			$state.go('product.list');
		}
	}

	$scope.selectTabs=function (tab){
		$scope.selectTab=tab;
	}

	
	init();
}])

/***/ }),
/* 10 */
/***/ (function(module, exports) {

app.directive('addAdjust',function(){
	return {
		templateUrl: '../view/detailcontent/product/addAdjust.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
		}
	}
})

/***/ }),
/* 11 */
/***/ (function(module, exports) {

app.directive('addProduct',function(){
	return {
		templateUrl: '../view/detailcontent/product/addProduct.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
		}
	}
})

/***/ }),
/* 12 */
/***/ (function(module, exports) {

app.directive('appContent',function(){
	return {
		templateUrl: '../view/appcontent/index.html',
		replace:true
	}
})

/***/ }),
/* 13 */
/***/ (function(module, exports) {

app.directive('detailContent',function(){
	return {
		templateUrl: '../view/detailcontent/index.html',
		replace:true
	}
})


/***/ }),
/* 14 */
/***/ (function(module, exports) {

app.directive('headerBar',function(){
	return {
		templateUrl: '../view/header/index.html',
		replace:true
	}
})


/***/ }),
/* 15 */
/***/ (function(module, exports) {

app.directive('productEdit',function(){
	return {
		templateUrl: '../view/detailcontent/product/productEdit.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
		}
	}
})

/***/ }),
/* 16 */
/***/ (function(module, exports) {

app.directive('sideBar',function(){
	return {
		templateUrl: '../view/sidebar/index.html',
		replace:true
	}
})


/***/ }),
/* 17 */
/***/ (function(module, exports) {

app.directive('uiSrefActiveIf', ['$state', function($state) {
	return {
		restrict: "A",
		controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
			var state = $attrs.uiSrefActiveIf;

			function update() {
				if ( $state.includes(state) || $state.is(state) ) {
					$element.addClass("active");
				} else {
					$element.removeClass("active");
				}
			}

			$scope.$on('$stateChangeSuccess', update);
			update();
		}]
	};
}])

/***/ }),
/* 18 */
/***/ (function(module, exports) {

app.factory('productFactory',['$http',function($http){
	var productFactory={};
	var urlBase='/api/items';

	productFactory.getAllProducts = function(){
		return $http.get(urlBase);
	};

	productFactory.getProduct = function(id){
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
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

angular = __webpack_require__(0);
app = angular.module('inventorymanage',['ui.router']);

domain='localhost:3000';

__webpack_require__(4);
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);


/***/ })
],[32]);