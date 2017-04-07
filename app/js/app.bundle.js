webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(8);
__webpack_require__(9);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(24);
__webpack_require__(22);
__webpack_require__(25);
__webpack_require__(23);
__webpack_require__(26);
__webpack_require__(17);
__webpack_require__(16);
__webpack_require__(19);
__webpack_require__(18);
__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(14);
__webpack_require__(15);




/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);
__webpack_require__(30);
__webpack_require__(27);
__webpack_require__(29);

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
		template: '<div ui-view="orderlist" id="orderlist"></div><div ui-view="sideinfo" id="sideinfo"></div>',
		abstract:true
	}).state('order.list',{
			url:'/list',
			views:{
				"orderlist":{
					controller:'orderCtrl',
					templateUrl:"../view/detailcontent/order/list.html"
				},
				"sideinfo":{
					template:""
				}
			},
			resolve:{
				suppliers: function(supplierFactory){
					return supplierFactory.getAllSuppliers();
				},
				products: function(productFactory){
					return productFactory.getAllProducts();
				}
			}
		}).state('order.info',{
			url:'/{orderID}',
			views:{
				"orderlist":{
					controller:'orderCtrl',
					templateUrl:"../view/detailcontent/order/list.html"
				},
				"sideinfo":{
					templateUrl:"../view/detailcontent/order/info.html",
					controller:'orderInfoCtrl'
				}
			},
			resolve:{
				suppliers: function(supplierFactory){
					return supplierFactory.getAllSuppliers();
				},
				products: function(productFactory){
					return productFactory.getAllProducts();
				}
			}
		});
	$stateProvider.state('report',{
		url:'/report',
		template: '<h1>Hello Report!!!</h1>'
	});
	$stateProvider.state('supplier',{
		url:'/supplier',
		template: '<div ui-view="supplierlist" id="supplierlist"></div><div ui-view="sideinfo" id="sideinfo"></div>',
		abstract:true
	}).state('supplier.list',{
			url:'/list',
			views:{
				"supplierlist":{
					controller:'supplierCtrl',
					templateUrl:"../view/detailcontent/supplier/list.html"
				},
				"sideinfo":{
					template:""
				}
			}
		}).state('supplier.info',{
			url:'/{supplierID}',
			views:{
				"supplierlist":{
					controller:'supplierCtrl',
					templateUrl:"../view/detailcontent/supplier/list.html"
				},
				"sideinfo":{
					templateUrl:"../view/detailcontent/supplier/info.html",
					controller:'supplierInfoCtrl'
				}
			}
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

app.controller('orderCtrl',['$scope','$rootScope','$state','$http','$compile','orderFactory','supplierFactory','suppliers','products',function($scope,$rootScope,$state,$http,$compile,orderFactory,supplierFactory,suppliers,products){
	var ctrl=this;
	var orders=[];
	var suppliers=suppliers;
	$scope.products=[];
	$scope.status;
	$scope.state;
	$scope.setFunction=null;

	$scope.sort={
		field:'name',
		reverse:false
	}
	$scope.assignProduct=function(){
		console.log("IN");
	}
	function init(){
		if(!suppliers.hasOwnProperty("name")){
			$scope.suppliers=suppliers.data;
		}
		if(!products.hasOwnProperty("name")){
			$scope.products=products.data;
		}
		$scope.getAllOrders();
		$scope.state=$state.current.name;
		changeWidth();

	};

	$scope.init=init;

	$scope.setOrder=function(type){
		if($scope.sort.field==type){
			$scope.sort.reverse=!$scope.sort.reverse
		}
		else{
			$scope.sort.field=type;
			$scope.sort.reverse=true;
		}
	}

	$scope.addNewLine=function(){
		var el=$compile("<tr new-item></tr>")($scope);
		$('#order-product-list').append(el);
	}

	$scope.$on('product_select',function(ev){
		$scope.setFunction=ev.targetScope.assignProduct;
	});

	$scope.$on('createNewLine',function(ev){
		$scope.addNewLine();
	})


	function convertDate(string){
		var DateString=string.split('T')[0].split('-');
		DateString.reverse();

		return DateString.join('-');
	}

	$scope.convertDate=convertDate;

	function getAllSuppliers(){
		supplierFactory.getAllSuppliers()
			.then(function(response){
				$scope.suppliers=response.data;
			},function(error){
				$scope.status='Unable to load suppliers. Message:'+error.message;
			});
	};
	$scope.getAllSuppliers=getAllSuppliers
	
	function getSupplierName(id){
		var sname='A';
		angular.forEach($scope.suppliers, function(supplier) {
			if (supplier._id == id)
				sname=supplier.name;
		});
		return sname;
	};

	$scope.getSupplierName = getSupplierName;

	$scope.getAllOrders=function(){
		orderFactory.getAllOrders()
			.then(function(response){
				$scope.orders=response.data;
			},function(error){
				$scope.status='Unable to load orders. Message:'+error.message;
			});
	};

	function changeWidth(){
		var list=$('#orderlist');
		if($scope.state=='order.list')
		{
			list.width('100%');
			
		}
		else if($scope.state=='order.info'){
			list.css({'float':'left','width':'25rem'});
		}
	};

	$scope.getOrder=function(id){
		res={};
		orderFactory.getOrder(id)
			.then(function(response){
				res.data=response.data;
				res.err=false;
			},function(error){
				res.err=true;
				res.txt=error.message;
			});
		return res;
	}
	$scope.deleteOrder = function(id,index){
		orderFactory.deleteOrder(id)
			.then(function(response){
				$scope.orders.splice(index,1);
				window.alert('Delete successfully ');
			},function(error){
				window.alert('Unable to delete order.\n Error message: '+error.message);
			});
	}

	$scope.addProductLine = function(){
		var container=$("#order-product-list");

	}

}])

/***/ }),
/* 9 */
/***/ (function(module, exports) {

app.controller("orderInfoCtrl",['$scope','$rootScope','$state','$stateParams','orderFactory','supplierFactory','productFactory','suppliers','products',function($scope,$rootScope,$state,$stateParams,orderFactory,supplierFactory,productFactory,suppliers,products){

	$scope.suppliers=[];
	$scope.purchaseOrder={};
	$scope.eOrder={supplierName:''};

	$scope.init= function(){
		if(!suppliers.hasOwnProperty("name")){
			$scope.suppliers=suppliers.data;
		}
		if(!products.hasOwnProperty("name")){
			$scope.products=products.data;
		}
		$scope.getOrder();

		changeWidth();
		$(document).ready(function(){
			$('ul.tabs').tabs();
		});
	}

	function changeWidth(){
		var info=$('#sideinfo');
		info.addClass('inInfo');
	}
	$scope.getOrder= function(){

		orderFactory.getOrder($stateParams.orderID)
			.then(function(res){
				$scope.purchaseOrder=res.data.data;
				$scope.eOrder = jQuery.extend(true, {}, $scope.purchaseOrder);
				$('#edit-supplierName').val($scope.eOrder.supplierName);
			},function(err){
				window.warning('Cannot get order.\n Error message: '+ err.message);
			});
	};

	function getSupplierName(id){
		var sname='Supplier not exist anymore.';
		angular.forEach($scope.suppliers, function(supplier) {
			if (supplier._id == id)
				sname=supplier.name;
		});
		return sname;
	};

	$scope.getSupplierName=getSupplierName;

	function convertDate(string){
		if (string==null)
			return '';
		var DateString=string.split('T')[0].split('-');
		DateString.reverse();

		return DateString.join('-');
	}

	$scope.convertDate=convertDate;

	
	function getProduct(id,att){
		var ret='Product not exist anymore.';
		angular.forEach($scope.products, function(product) {
			if (product._id == id)
			{
				if(att=='name')
					ret=product.name;
				if(att=='price')
					ret=product.buyPrice;
			}
				
		});
		return ret;
	}

	$scope.getProduct=getProduct;



	$scope.editOrder= function(){
		if ($scope.eOrder.supplierName!=$scope.purchaseOrder.supplierName){
			console.log("IN");
			supplierFactory.editOrder($scope.purchaseOrder._id,$scope.purchaseOrder.supplierName,$scope.eOrder.supplierName)
			.then(function(res){
				console.log(res);
			},function(err){
				window.warning("Cannot edit order.\n Error message:" +err.message);
			})
		}
		orderFactory.updateOrder($scope.eOrder)
			.then(function(res){
				window.alert("Edit successfully.");
				$scope.getOrder();
			},function(err){
				window.warning("Cannot edit order.\n Error message: "+ err.message);
			});
	}

	$scope.deleteOrder=function(id){
		var bool=window.confirm("The order will be deleted permanently. Do you want to proceed?");
		var isSolved=$scope.purchaseOrder.isSolved;
		if(bool==true){
			supplierFactory.changeOrder($scope.purchaseOrder.supplierName,id,true);
			orderFactory.deleteOrder(id)
				.then(function(res){
					window.alert("Delete successfully.");

					$state.go('order.list');
				},function(err){
					window.warning("Cannot delete order. \n Error message: "+err.message);
					$state.go('order.list');
				})
			if(isSolved==true){
				updateProductAmount('Remove order',-1);
			}
			removeProductOrder();
		}
	}

	$scope.markedAsSolved=function(id){
		var bool=window.confirm("You cannot edit the order after it is marked as solved. Proceed ?");
		if(bool==true){
			$scope.eOrder.isSolved=true;
			orderFactory.updateOrder($scope.eOrder)
			//Update product stocks
			.then(function(res){
				updateProductAmount('Purchase Order',1)
				window.alert("Updated successfully.");
				$scope.getOrder();
			},function(err){
				window.warning("Cannot update order.\n Error message: "+ err.message);
			});
		}
	}

	function updateProductAmount(reason,revert){
		products=$scope.purchaseOrder.batch;
		var err=false;
		var result=[];
		var errs=[];
		angular.forEach(products,function(product){
			productFactory.updateAmount(product.productID,product.amount*revert,reason)
				.then(function(res){
					result.push(res);
				},function(error){
					err=true;
					errs.push(error.message)
				});
		})
		if(err==true){
			window.warning('Cannot update product\'s stock.\n Error message:' + errs.join('\n'));
		}
		else{
			window.alert('Updated amount successfully!');
		}
	}

	function removeProductOrder(){
		products=$scope.purchaseOrder.batch;
		var err=false;
		var result=[];
		var errs=[];
		angular.forEach(products,function(product){
			productFactory.updateOrder(product._id,$scope.purchaseOrder._id).then(function(res){
					result.push(res);
				},function(error){
					err=true;
					errs.push(error.message)
				});
		})
		if(err==true){
			window.warning('Cannot remove product\'s order.\n Error message:' + errs.join('\n'));
		}
		else{
			window.alert('Updated amount successfully!');
		}
	}

}])

/***/ }),
/* 10 */
/***/ (function(module, exports) {

app.controller('productCtrl',['$scope','$rootScope','$state','$http','productFactory',function($scope,$rootScope,$state,$http,productFactory){
	var ctrl=this;
	var products=[];
	$scope.status;
	$scope.state;
	

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
	};

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
		res={};
		productFactory.getProduct(id)
			.then(function(response){
				res.data=response.data;
				res.err=false;
			},function(error){
				res.err=true;
				res.txt=error.message;
			});
		return res;
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

}])

/***/ }),
/* 11 */
/***/ (function(module, exports) {

app.controller("productInfoCtrl",['$scope','$rootScope','$state','$stateParams','productFactory','orderFactory','supplierFactory',function($scope,$rootScope,$state,$stateParams,productFactory,orderFactory,supplierFactory){

	$scope.product;

	$scope.selectTab=0;
	$scope.stockAdjustAmount=0;
	$scope.adjustReason='';
	$scope.adjustDate='';
	$scope.purchaseOrder=[];

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

	$scope.init=init;
	function changeWidth(){
		var info=$('#sideinfo');
		info.addClass('inInfo');
	}
	$scope.getItem= function(){
		productFactory.getProduct($stateParams.productID)
			.then(function(res){
				$scope.product=res.data.data;
				getOrder($scope.product.purchaseOrder);
			},function(err){
				alert('Cannot get product.\n Error message: '+ err.message);
			});
	};
	$scope.editProduct= function(){
		productFactory.updateProduct($scope.product)
			.then(function(res){
				window.alert("Edit successfully.");
				$scope.getItem();
			},function(err){
				alert("Cannot edit product.\n Error message: "+ err.message);
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
						alert("Cannot adjust product.\n Error message: "+ err.message);
					});
				
			},function(err){
				alert('Cannot get product.\n Error message: '+ err.message);
			});
	}

	$scope.deleteItem=function(id){
		var bool=window.confirm("The item will be deleted permanently. Do you want to proceed?");
		if($scope.product.purchaseOrder.length>0)
		{
			alert("Please delete all related order before delete product.");
			return;
		}
		if(bool==true){
			productFactory.deleteProduct(id)
				.then(function(res){
					window.alert("Delete successfully.");
					$state.go('product.list');
				},function(err){
					alert("Cannot delete product. \n Error message: "+err.message);
					$state.go('product.list');
				})
			
		}
	}

	$scope.selectTabs=function (tab){
		$scope.selectTab=tab;
	}

	function getOrder(orders){
		$scope.purchaseOrder=[];
		for(i in orders){
			var tmp=orderFactory.getOrder(orders[i].orderID).then(function(res){
				$scope.purchaseOrder.push(processOrder(res.data.data));
			},function(err){
				if(err){
					alert("Cannot get orders of product!\n Error message: "+ err.message);
				}
			});
		}
	}

	function processOrder(order){
		var ret={};
		ret._id=order._id;
		ret.name=order.name;
		ret.createdAt=order.createdAt;
		ret.amount=0;
		angular.forEach(order.batch,function(product){
			if(product.productID==$scope.product._id){
				ret.amount=product.amount;
			}
		});
		if (order.isSolved==false){
			ret.stat="Not Solved";
		}
		else {
			ret.stat="Solved";
		}

		return ret;
	}

	function convertDate(string){
		if (string==null)
			return '';
		var DateString=string.split('T')[0].split('-');
		DateString.reverse();

		return DateString.join('-');
	}

	$scope.convertDate=convertDate;
	
	
}])

/***/ }),
/* 12 */
/***/ (function(module, exports) {

app.controller('supplierCtrl',['$scope','$rootScope','$state','$http','supplierFactory',function($scope,$rootScope,$state,$http,supplierFactory){
	var ctrl=this;
	$scope.suppliers=[];
	$scope.status;
	$scope.state;
	
	

	$scope.sort={
		field:'name',
		reverse:false
	}

	init();
	function init(){
		
		getAllSuppliers();
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
	function getAllSuppliers(){
		supplierFactory.getAllSuppliers()
			.then(function(response){
				$scope.suppliers=response.data;
			},function(error){
				$scope.status='Unable to load suppliers. Message:'+error.message;
			});
	};
	function changeWidth(){
		var list=$('#supplierlist');
		if($scope.state=='supplier.list')
		{
			list.width('100%');
			
		}
		else if($scope.state=='supplier.info'){
			list.css({'float':'left','width':'25rem'});
		}
	};
	$scope.getSupplier=function(id){
		res={};
		supplierFactory.getSupplier(id)
			.then(function(response){
				res.data=response.data;
				res.err=false;
			},function(error){
				res.err=true;
				res.txt=error.message;
			});
		return res;
	}
	$scope.deleteSupplier = function(id,index){
		supplierFactory.deleteSupplier(id)
			.then(function(response){
				$scope.suppliers.splice(index,1);
				window.alert('Delete successfully ');
			},function(error){
				window.alert('Unable to delete supplier.\n Error message: '+error.message);
			});
	}
	

}])

/***/ }),
/* 13 */
/***/ (function(module, exports) {

app.controller("supplierInfoCtrl",['$scope','$rootScope','$state','$stateParams','supplierFactory','orderFactory',function($scope,$rootScope,$state,$stateParams,supplierFactory,orderFactory){

	$scope.supplier;

	$scope.purchaseOrder=[];

	var init= function(){
		$scope.getSupplier();
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

	$scope.init=init;

	function changeWidth(){
		var info=$('#sideinfo');
		info.addClass('inInfo');
	}
	$scope.getSupplier= function(){
		supplierFactory.getSupplier($stateParams.supplierID)
			.then(function(res){
				$scope.supplier=res.data.data;
				getOrder(res.data.data.transaction);
			},function(err){
				window.warning('Cannot get supplier.\n Error message: '+ err.message);
			});
	};
	$scope.editSupplier= function(){
		supplierFactory.updateSupplier($scope.supplier)
			.then(function(res){
				window.alert("Edit successfully.");
				$scope.getSupplier();
			},function(err){
				window.warning("Cannot edit supplier.\n Error message: "+ err.message);
			});
	}

	$scope.deleteSupplier=function(id){
		if($scope.supplier.transaction.length>0){
			window.alert('Cannot delete supplier. Please delete all related transaction before proceeding.');
			return;
		}
		var bool=window.confirm("The supplier will be deleted permanently. Do you want to proceed?");
		if(bool==true){
			supplierFactory.deleteSupplier(id)
				.then(function(res){
					window.alert("Delete successfully.");
					$state.go('supplier.list');
				},function(err){
					window.warning("Cannot delete supplier. \n Error message: "+err.message);
					$state.go('supplier.list');
				})
			
		}
	}

	$scope.selectTabs=function (tab){
		$scope.selectTab=tab;
	}


	function getOrder(orders){
		$scope.purchaseOrder=[];
		for(i in orders){
			var tmp=orderFactory.getOrder(orders[i].orderID).then(function(res){
				$scope.purchaseOrder.push(processOrder(res.data.data));
			},function(err){
				if(err){
					alert("Cannot get orders of product!\n Error message: "+ err.message);
				}
			});
		}
	}

	function processOrder(order){
		var ret={};
		ret._id=order._id;
		ret.name=order.name;
		ret.createdAt=order.createdAt;
		if (order.isSolved==false){
			ret.stat="Not Solved";
		}
		else {
			ret.stat="Solved";
		}
		return ret;
	}

	function convertDate(string){
		if (string==null)
			return '';
		var DateString=string.split('T')[0].split('-');
		DateString.reverse();

		return DateString.join('-');
	}

	$scope.convertDate=convertDate;

	
}])

/***/ }),
/* 14 */
/***/ (function(module, exports) {

app.directive('addOrder',['supplierFactory','orderFactory',function(supplierFactory,orderFactory){
	return {
		templateUrl: '../view/detailcontent/order/addOrder.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
			
			function initiateScope(){
				$scope.name='';
				$scope.selectSupplier='';
				$scope.isSolved=false;
				$('#order-product-list').html('');
			}

			initiateScope();

			function getProductList(container){
				var products=container[0].children;
				var ret=[]
				angular.forEach(products,function(product){
					if((product.children[1].children[0]).hasAttribute('productid'))
					{
						tmp={
							productID:$(product.children[1].children[0]).attr('productID'),
							amount:$(product.children[2].children[0]).val()
						};
						ret.push(tmp);
					}
				});
				return ret;
			}

			$scope.addOrder = function(){
				newOrder={
					name:$scope.name,
					supplierName:$scope.selectSupplier._id,
					batch:getProductList($('#order-product-list')),
					isSolved:$scope.isSolved,
				};
				orderFactory.addOrder(newOrder).then(function(response){
					orderFactory.updateSupplier(response.data.data._id,$scope.selectSupplier._id);
					$scope.getAllOrders();
					initiateScope();
					window.alert('Add '+ $scope.name +' successfully');
					//$scope.orders.push(response.data)
				},function(error){
					window.alert("Cannot add " + $scope.name+"\nError message: "+error.message);
				});
				$('#addForm').modal('close');
				return false;
			}
		}
	}
}]);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

app.directive('editOrder',function(){
	return {
		templateUrl: '../view/detailcontent/order/editOrder.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
		}
	}
})

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports) {

app.directive('addProduct',['productFactory',function(productFactory){
	return {
		templateUrl: '../view/detailcontent/product/addProduct.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
			function initNewProduct(){
				$scope.name='';
				$scope.itemType='';
				$scope.sellPrice='';
				$scope.buyPrice='';
				$scope.stock='';
				$scope.restockAmount='';
				$scope.unit='';
				$scope.changeHistory=[];
				$scope.sellHistory=[];
				$scope.purchaseOrder=[];
			}
			initNewProduct();
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
				sellHistory:[],
				purchaseOrder:[]
			};
			productFactory.addProduct(newProduct).then(function(response){
				$scope.products.push(response.data.data);
				window.alert('Add '+ $scope.name +' successfully');
				$('#addForm').modal('close');
				//$scope.products.push(response.data)
			},function(error){
				window.alert("Cannot add " + $scope.name+"\nError message: "+error.message);
			});
			initNewProduct();
			return false;
			}
		}
	}
}])

/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports) {

app.directive('newItem',['$compile','productFactory','selectedProductFactory',function($compile,productFactory,selectedProductFactory){
	return {
		templateUrl: '../view/detailcontent/order/newitem.html',
		restrict:'A',
		scope:{},
		link:function(scope, element, attrs){
			$('.dropdown-button').dropdown({
				gutter: 0, // Spacing from edge
				alignment: 'left', // Displays dropdown with edge aligned to the left of button
				belowOrigin:true
				}
			);
			scope.amount=1;
			scope.price=0;
			scope.product={};
			scope.maxAmount=0;
			scope.product_id='';
			scope.initAmount=function(){
				if(scope.amount==null || scope.amount<1){
					scope.amount=1;
				}
				if(scope.amount>scope.maxAmount){
					scope.amount=scope.maxAmount;
				}
			}
			scope.chooseItem= function(){
				var dropdown=angular.element(document.getElementById('product_dropdown'));
				scope.$emit('product_select');
			}
			function addNewLine(){
				var el=$compile("<tr new-item></tr>")(scope.$parent);
				$(element.parent()[0]).append(el);
			}
			scope.assignProduct=function(product){
				console.log(selectedProductFactory.selectedProduct,selectedProductFactory.checkExist(product._id));
				if (!selectedProductFactory.checkExist(product._id)){
					if(scope.product_id!=''){
						selectedProductFactory.removeSelected(scope.product_id);
					}
					scope.product_id=product._id;
					selectedProductFactory.addSelected(product._id);
					// if($(element[0].children[1].children[0]).attr('productID')==undefined || element.parent().children().length==1)
					// {
					// 	addNewLine();
					// }
					$(element[0].children[1].children[0]).attr('productID',product._id);
					element[0].children[1].children[0].value=product.name;
					scope.maxAmount=product.stock;
					scope.price=product.sellPrice;
					element[0].children[3].children[0].innerHTML=product.sellPrice;
				}
				else{
					alert("Product already selected!");
				}
			}

			scope.deleteProductLine=function(){
				if(scope.product_id!=''){
					selectedProductFactory.removeSelected(scope.product_id);
				}
				if($((element.parent())[0]).children().length>1){
					element.remove();
					scope.$destroy();
				}
			}
		}

	};
}]);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

app.directive('addSupplier',['supplierFactory',function(supplierFactory){
	return {
		templateUrl: '../view/detailcontent/supplier/addSupplier.html',
		replace:true,
		link:function($scope, element, attrs){

			function initiateScope(){
				$scope.name='';
				$scope.phoneNumber='';
				$scope.email='';
			}

			initiateScope();

			$('.modal').modal();

			$scope.addSupplier = function(){

				newSupplier={
					name:$scope.name,
					phoneNumber:$scope.phoneNumber,
					email:$scope.email,
					transaction:[],
				};
				supplierFactory.addSupplier(newSupplier).then(function(response){
					$scope.suppliers.push(response.config.data);
					window.alert('Add '+ $scope.name +' successfully');
					//$scope.suppliers.push(response.data)
				},function(error){
					window.alert("Cannot add " + $scope.name+"\nError message: "+error.message);
				});
				initiateScope();
				$('#addForm').modal('close');
				
				return false;
			}
		}
	}
}])

/***/ }),
/* 21 */
/***/ (function(module, exports) {

app.directive('supplierEdit',function(){
	return {
		templateUrl: '../view/detailcontent/supplier/editSupplier.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
		}
	}
})

/***/ }),
/* 22 */
/***/ (function(module, exports) {

app.directive('appContent',function(){
	return {
		templateUrl: '../view/appcontent/index.html',
		replace:true
	}
})

/***/ }),
/* 23 */
/***/ (function(module, exports) {

app.directive('detailContent',function(){
	return {
		templateUrl: '../view/detailcontent/index.html',
		replace:true
	}
})


/***/ }),
/* 24 */
/***/ (function(module, exports) {

app.directive('headerBar',function(){
	return {
		templateUrl: '../view/header/index.html',
		replace:true
	}
})


/***/ }),
/* 25 */
/***/ (function(module, exports) {

app.directive('sideBar',function(){
	return {
		templateUrl: '../view/sidebar/index.html',
		replace:true
	}
})


/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports) {

app.factory('orderFactory',['$http',function($http){
	var orderFactory={};
	var urlBase='/api/orders';

	orderFactory.getAllOrders = function(){
		return $http.get(urlBase);
	};

	orderFactory.getOrder = function(id){
		return $http.get(urlBase+'/'+id);
	};

	orderFactory.addOrder = function(order){
		return $http.post(urlBase,order);
	};

	orderFactory.updateOrder = function(order){
		return $http.put(urlBase+'/'+order._id,order);
	};

	orderFactory.deleteOrder = function(id){
		return $http.delete(urlBase+'/'+id);
	};

	orderFactory.updateSupplier = function(id,idsupp){
		return $http.put(urlBase+'/'+id+'/'+idsupp);
	};
	
	return orderFactory;
}])

/***/ }),
/* 28 */
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

	productFactory.updateAmount = function (id,amount,reason){
		return $http.put(urlBase+'/amount/'+id,{amount:amount,reason:reason});
	}
	
	productFactory.updateOrder = function(id,orderID){
		return $http.put(urlBase+"/order/"+id,{orderID:orderID});
	}

	return productFactory;
}])

/***/ }),
/* 29 */
/***/ (function(module, exports) {

app.factory('selectedProductFactory',[function(){

	var selectedProductFactory={};

	selectedProductFactory.selectedProduct=[];

	selectedProductFactory.addSelected=function(id){
		selectedProductFactory.selectedProduct.push(id);
	}

	selectedProductFactory.checkExist=function(id){
		for(i in selectedProductFactory.selectedProduct)
		{
			if(selectedProductFactory.selectedProduct[i]==id){
				return true;
			}
		}
		return false;
	}
	selectedProductFactory.removeSelected=function(id){
		var index=selectedProductFactory.selectedProduct.indexOf(id);
		if(index>-1)
			selectedProductFactory.selectedProduct.splice(index,1);
	}

	selectedProductFactory.reset=function(){
		selectedProductFactory.selectedProduct=[];
	}

	return selectedProductFactory;

}]);

/***/ }),
/* 30 */
/***/ (function(module, exports) {

app.factory('supplierFactory',['$http',function($http){
	var supplierFactory={};
	var urlBase='/api/suppliers';

	supplierFactory.getAllSuppliers = function(){
		return $http.get(urlBase);
	};

	supplierFactory.getSupplier = function(id){
		return $http.get(urlBase+'/'+id);
	};

	supplierFactory.addSupplier = function(supplier){
		return $http.post(urlBase,supplier);
	};

	supplierFactory.updateSupplier = function(supplier){
		return $http.put(urlBase+'/'+supplier._id,supplier);
	};

	supplierFactory.deleteSupplier = function(id){
		return $http.delete(urlBase+'/'+id);
	};

	supplierFactory.editOrder = function(id,oldID,newID){
		return $http.put(urlBase+'/order/'+id,{oldID:oldID,newID:newID});
	}

	supplierFactory.changeOrder = function (id,orderID,remove){
		return $http.post(urlBase+"/order/"+id,{remove:remove,orderID:orderID});
	}
	
	return supplierFactory;
}])

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

angular = __webpack_require__(0);
app = angular.module('inventorymanage',['ui.router']);

domain='localhost:3000';

__webpack_require__(4);
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);


/***/ })
],[44]);