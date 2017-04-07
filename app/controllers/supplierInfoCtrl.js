app.controller("supplierInfoCtrl",['$scope','$rootScope','$state','$stateParams','supplierFactory',function($scope,$rootScope,$state,$stateParams,supplierFactory){

	$scope.supplier;


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
	function changeWidth(){
		var info=$('#sideinfo');
		info.addClass('inInfo');
	}
	$scope.getSupplier= function(){
		supplierFactory.getSupplier($stateParams.supplierID)
			.then(function(res){
				$scope.supplier=res.data.data;
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

	
	init();
}])