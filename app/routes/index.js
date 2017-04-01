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
