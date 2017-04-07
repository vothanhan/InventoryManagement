app.directive('addAdjust',function(){
	return {
		templateUrl: '../view/detailcontent/product/addAdjust.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
		}
	}
})