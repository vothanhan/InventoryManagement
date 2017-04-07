app.directive('productEdit',function(){
	return {
		templateUrl: '../view/detailcontent/product/productEdit.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
		}
	}
})