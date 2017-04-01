app.controller("productInfoCtrl",['$scope','$rootScope','$state','$stateParams','productFactory',function($scope,$rootScope,$state,$stateParams,productFactory){

	$scope.product;

	var init= function(){
		$scope.getItem();
		changeWidth();
		$(document).ready(function(){
			$('ul.tabs').tabs();
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
	$scope.editItem= function(){

	}
	init();
}])