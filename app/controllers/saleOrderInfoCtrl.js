app.controller("saleOrderInfoCtrl",['$scope','$rootScope','$state','$stateParams','saleOrderFactory','productFactory','products',function($scope,$rootScope,$state,$stateParams,saleOrderFactory,productFactory,products){

	$scope.saleOrder={};
	$scope.eOrder={supplierName:''};

	$scope.init= function(){
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

		saleOrderFactory.getOrder($stateParams.orderID)
			.then(function(res){
				$scope.saleOrder=res.data.data;
				$scope.eOrder = jQuery.extend(true, {}, $scope.saleOrder);
			},function(err){
				window.warning('Cannot get order.\n Error message: '+ err.message);
			});
	};

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
					ret=product.sellPrice;
			}
				
		});
		return ret;
	}

	$scope.getProduct=getProduct;



	$scope.editOrder= function(){
		saleOrderFactory.updateOrder($scope.eOrder)
			.then(function(res){
				window.alert("Edit successfully.");
				$scope.getOrder();
			},function(err){
				window.warning("Cannot edit order.\n Error message: "+ err.message);
			});
	}

	$scope.deleteOrder=function(id){
	var bool=window.confirm("The order will be deleted permanently. Do you want to proceed?");
	if(bool==true){
		saleOrderFactory.deleteOrder(id)
			.then(function(res){
				window.alert("Delete successfully.");

				$state.go('saleorder.list');
			},function(err){
				window.warning("Cannot delete order. \n Error message: "+err.message);
				$state.go('order.list');
			})
		updateProductAmount('Remove order',1);
		removeProductOrder();
	}
	}

	function updateProductAmount(reason,revert){
		products=$scope.saleOrder.batch;
		var err=false;
		var result=[];
		var errs=[];
		angular.forEach(products,function(product){

			var stock= getStock($scope.products,product.productID)
			productFactory.updateAmount(product.productID,product.amount*revert,reason,stock)
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

	function getStock(products,id){
		var ret=0;
		angular.forEach(products,function(product){
			if (product._id==id){
				ret= product.stock;
			}
		})
		return ret;
	}

	function removeProductOrder(){
		products=$scope.saleOrder.batch;
		var err=false;
		var result=[];
		var errs=[];
		angular.forEach(products,function(product){
			productFactory.updateSaleOrder(product.productID,$scope.saleOrder._id).then(function(res){
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