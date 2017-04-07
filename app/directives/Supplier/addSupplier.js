app.directive('addSupplier',['supplierFactory',function(supplierFactory){
	return {
		templateUrl: '../view/detailcontent/supplier/addSupplier.html',
		replace:true,
		link:function($scope, element, attrs){

			function initiateScope(){
				$scope.name='';
				$scope.phoneNumber='';
				$scope.email='';
			}

			initiateScope();

			$('.modal').modal();

			$scope.addSupplier = function(){

				newSupplier={
					name:$scope.name,
					phoneNumber:$scope.phoneNumber,
					email:$scope.email,
					transaction:[],
				};
				supplierFactory.addSupplier(newSupplier).then(function(response){
					$scope.suppliers.push(response.config.data);
					window.alert('Add '+ $scope.name +' successfully');
					//$scope.suppliers.push(response.data)
				},function(error){
					window.alert("Cannot add " + $scope.name+"\nError message: "+error.message);
				});
				initiateScope();
				$('#addForm').modal('close');
				
				return false;
			}
		}
	}
}])