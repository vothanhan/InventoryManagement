app.factory('saleOrderFactory',['$http',function($http){
	var saleOrderFactory={};
	var urlBase='/api/saleorders';

	saleOrderFactory.getAllOrders = function(){
		return $http.get(urlBase);
	};

	saleOrderFactory.getOrder = function(id){
		return $http.get(urlBase+'/'+id);
	};

	saleOrderFactory.addOrder = function(order){
		return $http.post(urlBase,order);
	};

	saleOrderFactory.updateOrder = function(order){
		return $http.put(urlBase+'/'+order._id,order);
	};

	saleOrderFactory.deleteOrder = function(id){
		return $http.delete(urlBase+'/'+id);
	};

	
	return saleOrderFactory;
}])