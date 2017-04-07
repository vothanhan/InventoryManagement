app.directive('addProduct',['productFactory',function(productFactory){
	return {
		templateUrl: '../view/detailcontent/product/addProduct.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
			function initNewProduct(){
				$scope.name='';
				$scope.itemType='';
				$scope.sellPrice='';
				$scope.buyPrice='';
				$scope.stock='';
				$scope.restockAmount='';
				$scope.unit='';
				$scope.changeHistory=[];
				$scope.sellHistory=[];
				$scope.purchaseOrder=[];
			}
			initNewProduct();
			$scope.addProduct = function(){

			newProduct={
				name:$scope.name,
				itemType:$scope.itemType,
				sellPrice:$scope.sellPrice,
				buyPrice:$scope.buyPrice,
				restockAmount:$scope.restockAmount,
				stock:$scope.stock,
				unit:$scope.unit,
				changeHistory:[],
				sellHistory:[],
				purchaseOrder:[]
			};
			productFactory.addProduct(newProduct).then(function(response){
				$scope.products.push(response.data.data);
				window.alert('Add '+ $scope.name +' successfully');
				$('#addForm').modal('close');
				//$scope.products.push(response.data)
			},function(error){
				window.alert("Cannot add " + $scope.name+"\nError message: "+error.message);
			});
			initNewProduct();
			return false;
			}
		}
	}
}])