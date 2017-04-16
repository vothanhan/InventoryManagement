app.controller('saleOrderCtrl',['$scope','$rootScope','$state','$http','$compile','saleOrderFactory','products',function($scope,$rootScope,$state,$http,$compile,saleOrderFactory,products){
	var ctrl=this;
	var orders=[];

	$scope.products=[];
	$scope.status;
	$scope.state;
	$scope.setFunction=null;

	$scope.sort={
		field:'name',
		reverse:false
	}

	function init(){
		if(!products.hasOwnProperty("name")){
			$scope.products=products.data;
		}
		$scope.getAllOrders();
		$scope.state=$state.current.name;
		changeWidth();

	};

	$scope.init=init;

	$scope.setOrder=function(type){
		if($scope.sort.field==type){
			$scope.sort.reverse=!$scope.sort.reverse
		}
		else{
			$scope.sort.field=type;
			$scope.sort.reverse=false;
		}
	}

	$scope.addNewLine=function(){
		var el=$compile("<tr new-item></tr>")($scope);
		$('#order-product-list').append(el);
	}

	$scope.$on('product_select',function(ev){
		$scope.setFunction=ev.targetScope.assignProduct;
	});

	$scope.$on('createNewLine',function(ev){
		$scope.addNewLine();
	})


	function convertDate(string){
		var DateString=string.split('T')[0].split('-');
		DateString.reverse();

		return DateString.join('-');
	}

	$scope.convertDate=convertDate;

	$scope.getAllOrders=function(){
		saleOrderFactory.getAllOrders()
			.then(function(response){
				$scope.orders=response.data;
			},function(error){
				$scope.status='Unable to load orders. Message:'+error.message;
			});
	};

	function changeWidth(){
		var list=$('#orderlist');
		if($scope.state=='saleorder.list')
		{
			list.width('100%');
			
		}
		else if($scope.state=='saleorder.info'){
			list.css({'float':'left','width':'25rem'});
		}
	};

	$scope.getOrder=function(id){
		res={};
		saleOrderFactory.getOrder(id)
			.then(function(response){
				res.data=response.data;
				res.err=false;
			},function(error){
				res.err=true;
				res.txt=error.message;
			});
		return res;
	}
	$scope.deleteOrder = function(id,index){
		saleOrderFactory.deleteOrder(id)
			.then(function(response){
				$scope.orders.splice(index,1);
				window.alert('Delete successfully ');
			},function(error){
				window.alert('Unable to delete order.\n Error message: '+error.message);
			});
	}

	$scope.addProductLine = function(){
		var container=$("#order-product-list");

	}



}])