app.directive('addProduct',function(){
	return {
		templateUrl: '../view/detailcontent/product/addProduct.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
		}
	}
})