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