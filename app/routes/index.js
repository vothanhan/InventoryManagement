app.config(function($stateProvider,$urlRouterProvider,$locationProvider){

	$stateProvider.state('dashboard',{
		url:'/dashboard',
		templateUrl: '../view/detailcontent/dashboard/index.html',
		controller:'dashboardCtrl',
		resolve:{
				orders: function(orderFactory){
					return orderFactory.getAllOrders();
				},
				products: function(productFactory){
					return productFactory.getAllProducts();
				},
				saleOrders: function(saleOrderFactory){
					return saleOrderFactory.getAllOrders();
				}
			}
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
		templateUrl: '../view/detailcontent/report/index.html',
		controller:function($scope,$state){
			$scope.$on("$stateChangeStart",function(){
				document.getElementById('selectReportScreen').style.display='';
			})
			var currentDate=new Date();
			$scope.sdate='01-'+(currentDate.getMonth()+1)+'-'+(currentDate.getFullYear());
			var lastDate=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0);
			$scope.edate=''+lastDate.getDate()+'-'+(currentDate.getMonth()+1)+'-'+(currentDate.getFullYear());
		}
	}).state('report.sale',{
		url:'/sale/{sdate}/{edate}',
		templateUrl:'../view/detailcontent/report/saleReport.html',
		controller:'reportCtrl',
		resolve:{
			suppliers: function(supplierFactory){
					return supplierFactory.getAllSuppliers();
				},
		}
	}).state('report.order',{
		url:'/order/{sdate}/{edate}',
		templateUrl:'../view/detailcontent/report/orderReport.html',
		controller:'reportCtrl',
		resolve:{
			suppliers: function(supplierFactory){
					return supplierFactory.getAllSuppliers();
				},
		}
	}).state('report.inventory',{
		url:'/inventory/{edate}',
		templateUrl:'../view/detailcontent/report/inventoryReport.html',
		controller:'reportCtrl',
		resolve:{
			suppliers: function(supplierFactory){
					return supplierFactory.getAllSuppliers();
				},
		}
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
