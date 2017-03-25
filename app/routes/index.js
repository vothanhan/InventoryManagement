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
