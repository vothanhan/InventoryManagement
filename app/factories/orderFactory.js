app.factory('orderFactory',['$http',function($http){
	var orderFactory={};
	var urlBase='/api/orders';

	orderFactory.getAllOrders = function(){
		return $http.get(urlBase);
	};

	orderFactory.getOrder = function(id){
		return $http.get(urlBase+'/'+id);
	};

	orderFactory.addOrder = function(order){
		return $http.post(urlBase,order);
	};

	orderFactory.updateOrder = function(order){
		return $http.put(urlBase+'/'+order._id,order);
	};

	orderFactory.deleteOrder = function(id){
		return $http.delete(urlBase+'/'+id);
	};

	orderFactory.updateSupplier = function(id,idsupp){
		return $http.put(urlBase+'/'+id+'/'+idsupp);
	};
	
	return orderFactory;
}])