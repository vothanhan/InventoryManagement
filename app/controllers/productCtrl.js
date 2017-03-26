app.controller('productCtrl',['$scope','$rootScope','$http','productFactory',function($scope,$rootScope,$http,productFactory){
	var ctrl=this;
	var products=[];

	$scope.status;
	$scope.name='';
	$scope.itemType='';
	$scope.price='';
	$scope.stock='';
	init();
	function init(){
		getAllProducts();
		$('.modal').modal();

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
	$scope.deleteProduct = function(id,index){
		productFactory.deleteProduct(id)
			.then(function(response){
				$scope.products.splice(index,1);
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
		newProduct.stock=$scope.stock;
		productFactory.addProduct(newProduct).then(function(response){
			$scope.products.push(response.data.data);
			window.alert('Add '+ $scope.name +' successfully');
			//$scope.products.push(response.data)
		},function(error){
			window.alert("Cannot add " + $scope.name+"\nError message: "+error.message);
		});
	}

}])