app.controller('productCtrl',['$scope','$rootScope','$state','$http','productFactory',function($scope,$rootScope,$state,$http,productFactory){
	var ctrl=this;
	var products=[];
	$scope.status;
	$scope.state;
	

	$scope.sort={
		field:'name',
		reverse:false
	}

	init();
	function init(){
		
		getAllProducts();
		$scope.state=$state.current.name;
		changeWidth();
	};

	$scope.setOrder=function(type){
		if($scope.sort.field==type){
			$scope.sort.reverse=!$scope.sort.reverse
		}
		else{
			$scope.sort.field=type;
			$scope.sort.reverse=false;
		}
	};

	function getAllProducts(){
		productFactory.getAllProducts()
			.then(function(response){
				$scope.products=response.data;
			},function(error){
				$scope.status='Unable to load products. Message:'+error.message;
			});
	};
	function changeWidth(){
		var list=$('#itemlist');
		if($scope.state=='product.list')
		{
			list.width('100%');
			
		}
		else if($scope.state=='product.info'){
			list.css({'float':'left','width':'25rem'});
		}
	};
	$scope.getProduct=function(id){
		res={};
		productFactory.getProduct(id)
			.then(function(response){
				res.data=response.data;
				res.err=false;
			},function(error){
				res.err=true;
				res.txt=error.message;
			});
		return res;
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

}])