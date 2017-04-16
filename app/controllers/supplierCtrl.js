app.controller('supplierCtrl',['$scope','$rootScope','$state','$http','supplierFactory',function($scope,$rootScope,$state,$http,supplierFactory){
	var ctrl=this;
	$scope.suppliers=[];
	$scope.status;
	$scope.state;
	
	

	$scope.sort={
		field:'name',
		reverse:false
	}

	init();
	function init(){
		
		getAllSuppliers();
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
	}
	function getAllSuppliers(){
		supplierFactory.getAllSuppliers()
			.then(function(response){
				$scope.suppliers=response.data;
			},function(error){
				$scope.status='Unable to load suppliers. Message:'+error.message;
			});
	};
	function changeWidth(){
		var list=$('#supplierlist');
		if($scope.state=='supplier.list')
		{
			list.width('100%');
			
		}
		else if($scope.state=='supplier.info'){
			list.css({'float':'left','width':'25rem'});
		}
	};
	$scope.getSupplier=function(id){
		res={};
		supplierFactory.getSupplier(id)
			.then(function(response){
				res.data=response.data;
				res.err=false;
			},function(error){
				res.err=true;
				res.txt=error.message;
			});
		return res;
	}
	$scope.deleteSupplier = function(id,index){
		supplierFactory.deleteSupplier(id)
			.then(function(response){
				$scope.suppliers.splice(index,1);
				window.alert('Delete successfully ');
			},function(error){
				window.alert('Unable to delete supplier.\n Error message: '+error.message);
			});
	}
	

}])