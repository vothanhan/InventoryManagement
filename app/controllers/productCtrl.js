app.controller('productCtrl',['$scope','$rootScope','$http','productFactory',function($scope,$rootScope,$http,productFactory){
	var ctrl=this;
	var products=[];

	$scope.status;
	$scope.name='';
	$scope.itemType='';
	$scope.price='';

	init();
	function init(){
		getAllProducts();
	};

	function getAllProducts(){
		productFactory.getAllProducts()
			.then(function(response){
				$scope.products=response.data;
			},function(error){
				$scope.status='Unable to load products. Message:'+error.message;
			});
	}	
	$scope.getProduct=function(id){
		response={};
		productFactory.getProduct(id)
			.then(function(response){
				response.data=response.data;
				response.err=false;
			},function(error){
				response.err=true;
				response.txt=error.message;
			});
		return response;
	}
	$scope.deleteProduct = function(id){
		productFactory.deleteProduct(id)
			.then(function(response){
				window.alert('Delete successfully ');
			},function(error){
				window.alert('Unable to delete product.\n Error message: '+error.message);
			});
	}
	$scope.addProduct = function(){
		newProduct={};
		newProduct.name=$scope.name;
		newProduct.itemType=$scope.itemType;
		newProduct.price=$scope.price;
		productFactory.addProduct(newProduct).then(function(response){
			window.alert('Add '+ $scope.name +' successfully');
			$scope.products.push(response.data.data);
			//$scope.products.push(response.data)
		},function(error){
			window.alert("Cannot add " + $scope.name+"\nError message: "+error.message);
		});
	}

}])