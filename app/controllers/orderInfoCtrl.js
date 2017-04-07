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