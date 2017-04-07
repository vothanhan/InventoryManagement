app.controller("productInfoCtrl",['$scope','$rootScope','$state','$stateParams','productFactory','orderFactory','supplierFactory',function($scope,$rootScope,$state,$stateParams,productFactory,orderFactory,supplierFactory){

	$scope.product;

	$scope.selectTab=0;
	$scope.stockAdjustAmount=0;
	$scope.adjustReason='';
	$scope.adjustDate='';
	$scope.purchaseOrder=[];

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

	$scope.init=init;
	function changeWidth(){
		var info=$('#sideinfo');
		info.addClass('inInfo');
	}
	$scope.getItem= function(){
		productFactory.getProduct($stateParams.productID)
			.then(function(res){
				$scope.product=res.data.data;
				getOrder($scope.product.purchaseOrder);
			},function(err){
				alert('Cannot get product.\n Error message: '+ err.message);
			});
	};
	$scope.editProduct= function(){
		productFactory.updateProduct($scope.product)
			.then(function(res){
				window.alert("Edit successfully.");
				$scope.getItem();
			},function(err){
				alert("Cannot edit product.\n Error message: "+ err.message);
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
						alert("Cannot adjust product.\n Error message: "+ err.message);
					});
				
			},function(err){
				alert('Cannot get product.\n Error message: '+ err.message);
			});
	}

	$scope.deleteItem=function(id){
		var bool=window.confirm("The item will be deleted permanently. Do you want to proceed?");
		if($scope.product.purchaseOrder.length>0)
		{
			alert("Please delete all related order before delete product.");
			return;
		}
		if(bool==true){
			productFactory.deleteProduct(id)
				.then(function(res){
					window.alert("Delete successfully.");
					$state.go('product.list');
				},function(err){
					alert("Cannot delete product. \n Error message: "+err.message);
					$state.go('product.list');
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
		ret.amount=0;
		angular.forEach(order.batch,function(product){
			if(product.productID==$scope.product._id){
				ret.amount=product.amount;
			}
		});
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