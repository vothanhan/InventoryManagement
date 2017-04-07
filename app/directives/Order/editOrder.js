app.directive('editOrder',function(){
	return {
		templateUrl: '../view/detailcontent/order/editOrder.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
		}
	}
})