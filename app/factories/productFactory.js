app.factory('productFactory',['$http',function($http){
	var productFactory={};
	var urlBase='/api/items';

	productFactory.getAllProducts = function(){
		return $http.get(urlBase);
	};

	productFactory.getProduct = function(id){
		return $http.get(urlBase+'/'+id);
	};

	productFactory.addProduct = function(product){
		return $http.post(urlBase,product);
	};

	productFactory.updateProduct = function(product){
		return $http.put(urlBase+'/'+product._id,product);
	};

	productFactory.deleteProduct = function(id){
		return $http.delete(urlBase+'/'+id);
	};

	productFactory.updateAmount = function (id,amount,reason,stock,orderID){
		return $http.put(urlBase+'/amount/'+id,{amount:amount,reason:reason,stock:stock,orderID:orderID});
	}
	
	productFactory.updateOrder = function(id,orderID){
		return $http.put(urlBase+"/order/"+id,{orderID:orderID});
	}
	productFactory.updateSaleOrder = function(id,orderID){
		return $http.put(urlBase+"/saleorder/"+id,{orderID:orderID});
	}

	return productFactory;
}])