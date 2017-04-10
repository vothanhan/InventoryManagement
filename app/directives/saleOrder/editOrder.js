app.directive('editSaleOrder',function(){
	return {
		templateUrl: '../view/detailcontent/saleorder/editOrder.html',
		replace:true,
		link:function($scope, element, attrs){
			$('.modal').modal();
		}
	}
})