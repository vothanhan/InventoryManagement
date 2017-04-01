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