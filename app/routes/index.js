app.config(function($stateProvider,$urlRouterProvider,$locationProvider){

	$stateProvider.state('dashboard',{
		url:'/dashboard',
		template: '<h1>Hello World!!!</h1>'
	});
	$stateProvider.state('product',{
		url:'/product',
		template: '<div ui-view="itemlist" id="itemlist"></div><div ui-view="sideinfo" id="sideinfo" ></div>',
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
					template:"<div style='display:none'></div>"
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
					template:"<div style='display:none'></div>"
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
	$stateProvider.state('saleorder',{
		url:'/saleorder',
		template: '<div ui-view="orderlist" id="orderlist"></div><div ui-view="sideinfo" id="sideinfo"></div>',
		abstract:true
	}).state('saleorder.list',{
			url:'/list',
			views:{
				"orderlist":{
					controller:'saleOrderCtrl',
					templateUrl:"../view/detailcontent/saleorder/list.html"
				},
				"sideinfo":{
					template:"<div style='display:none'></div>"
				}
			},
			resolve:{
				products: function(productFactory){
					return productFactory.getAllProducts();
				}
			}
		}).state('saleorder.info',{
			url:'/{orderID}',
			views:{
				"orderlist":{
					controller:'saleOrderCtrl',
					templateUrl:"../view/detailcontent/saleorder/list.html"
				},
				"sideinfo":{
					templateUrl:"../view/detailcontent/saleorder/info.html",
					controller:'saleOrderInfoCtrl'
				}
			},
			resolve:{
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
					template:"<div style='display:none'></div>"
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
