app.directive('addSaleOrder',['saleOrderFactory','productFactory','selectedProductFactory',function(saleOrderFactory,productFactory,selectedProductFactory){
	return {
		templateUrl: '../view/detailcontent/saleorder/addOrder.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
			
			function initiateScope(){
				$scope.name='';
				$scope.isSolved=false;
				$('#order-product-list').html('');
				selectedProductFactory.reset();
			}

			initiateScope();

			function getProductList(container){
				var products=container[0].children;
				var ret=[]
				var price=0;
				angular.forEach(products,function(product){
					if((product.children[1].children[0]).hasAttribute('productid'))
					{
						tmp={
							productID:$(product.children[1].children[0]).attr('productID'),
							amount:$(product.children[2].children[0]).val()
						};
						ret.push(tmp);
						price+=parseInt($(product.children[4].children[0]).text());
					}
				});
				return [ret,price];
			}

			function updateProductAmount(reason,revert,products){
				var err=false;
				var result=[];
				var errs=[];
				angular.forEach(products,function(product){
					var stock=getStock($scope.products,product.productID);
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

			$scope.addOrder = function(){
				tmp=getProductList($('#order-product-list'))
				newOrder={
					name:$scope.name,
					batch:tmp[0],
					price:tmp[1]
				};
				updateProductAmount("Sale Order",-1,newOrder.batch);
				saleOrderFactory.addOrder(newOrder).then(function(response){
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