app.directive('supplierEdit',function(){
	return {
		templateUrl: '../view/detailcontent/supplier/editSupplier.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
		}
	}
})