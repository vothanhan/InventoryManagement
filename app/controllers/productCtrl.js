app.controller('productCtrl',['$scope','$rootScope','$state','$http','productFactory',function($scope,$rootScope,$state,$http,productFactory){
	var ctrl=this;
	var products=[];
	$scope.status;
	$scope.state;
	$scope.name='';
	$scope.itemType='';
	$scope.sellPrice='';
	$scope.buyPrice='';
	$scope.stock='';
	$scope.restockAmount='';
	$scope.unit='';
	$scope.changeHistory=[];
	$scope.sellHistory=[];

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
			$scope.sort.reverse=true;
		}
	}

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

		newProduct={
			name:$scope.name,
			itemType:$scope.itemType,
			sellPrice:$scope.sellPrice,
			buyPrice:$scope.buyPrice,
			restockAmount:$scope.restockAmount,
			stock:$scope.stock,
			unit:$scope.unit,
			changeHistory:[],
			sellHistory:[]
		};
		productFactory.addProduct(newProduct).then(function(response){
			$scope.products.push(response.data.data);
			window.alert('Add '+ $scope.name +' successfully');
			//$scope.products.push(response.data)
		},function(error){
			window.alert("Cannot add " + $scope.name+"\nError message: "+error.message);
		});

		return false;
	}

}])