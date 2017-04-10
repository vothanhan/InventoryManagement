app.directive('addOrder',['supplierFactory','orderFactory','selectedProductFactory',function(supplierFactory,orderFactory,selectedProductFactory){
	return {
		templateUrl: '../view/detailcontent/order/addOrder.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
			
			function initiateScope(){
				$scope.name='';
				$scope.selectSupplier='';
				$scope.isSolved=false;
				$('#order-product-list').html('');
				selectedProductFactory.reset();
			}

			initiateScope();

			function getProductList(container){
				var products=container[0].children;
				var ret=[]
				angular.forEach(products,function(product){
					if((product.children[1].children[0]).hasAttribute('productid'))
					{
						tmp={
							productID:$(product.children[1].children[0]).attr('productID'),
							amount:$(product.children[2].children[0]).text()
						};
						ret.push(tmp);
					}
				});
				return ret;
			}

			$scope.addOrder = function(){
				newOrder={
					name:$scope.name,
					supplierName:$scope.selectSupplier._id,
					batch:getProductList($('#order-product-list')),
					isSolved:$scope.isSolved,
				};
				orderFactory.addOrder(newOrder).then(function(response){
					orderFactory.updateSupplier(response.data.data._id,$scope.selectSupplier._id);
					$scope.getAllOrders();
					initiateScope();
					window.alert('Add '+ $scope.name +' successfully');
					//$scope.orders.push(response.data)
				},function(error){
					window.alert("Cannot add " + $scope.name+"\nError message: "+error.message);
				});
				$('#addForm').modal('close');
				return false;
			}
		}
	}
}]);