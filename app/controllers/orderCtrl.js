app.controller('orderCtrl',['$scope','$rootScope','$state','$http','$compile','orderFactory','supplierFactory','suppliers','products',function($scope,$rootScope,$state,$http,$compile,orderFactory,supplierFactory,suppliers,products){
	var ctrl=this;
	var orders=[];
	var suppliers=suppliers;
	$scope.products=[];
	$scope.status;
	$scope.state;
	$scope.setFunction=null;

	$scope.sort={
		field:'name',
		reverse:false
	}
	$scope.assignProduct=function(){
		console.log("IN");
	}
	function init(){
		if(!suppliers.hasOwnProperty("name")){
			$scope.suppliers=suppliers.data;
		}
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

	function getAllSuppliers(){
		supplierFactory.getAllSuppliers()
			.then(function(response){
				$scope.suppliers=response.data;
			},function(error){
				$scope.status='Unable to load suppliers. Message:'+error.message;
			});
	};
	$scope.getAllSuppliers=getAllSuppliers
	
	function getSupplierName(id){
		var sname='A';
		angular.forEach($scope.suppliers, function(supplier) {
			if (supplier._id == id)
				sname=supplier.name;
		});
		return sname;
	};

	$scope.getSupplierName = getSupplierName;

	$scope.getAllOrders=function(){
		orderFactory.getAllOrders()
			.then(function(response){
				$scope.orders=response.data;
			},function(error){
				$scope.status='Unable to load orders. Message:'+error.message;
			});
	};

	function getSolved(bool){
		if(bool==true)
			return "Solved"
		else
			return "Not Solved"
	}

	$scope.getSolved=getSolved;

	function changeWidth(){
		var list=$('#orderlist');
		if($scope.state=='order.list')
		{
			list.width('100%');
			
		}
		else if($scope.state=='order.info'){
			list.css({'float':'left','width':'25rem'});
		}
	};

	$scope.getOrder=function(id){
		res={};
		orderFactory.getOrder(id)
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
		orderFactory.deleteOrder(id)
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