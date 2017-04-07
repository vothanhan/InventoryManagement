app.factory('supplierFactory',['$http',function($http){
	var supplierFactory={};
	var urlBase='/api/suppliers';

	supplierFactory.getAllSuppliers = function(){
		return $http.get(urlBase);
	};

	supplierFactory.getSupplier = function(id){
		return $http.get(urlBase+'/'+id);
	};

	supplierFactory.addSupplier = function(supplier){
		return $http.post(urlBase,supplier);
	};

	supplierFactory.updateSupplier = function(supplier){
		return $http.put(urlBase+'/'+supplier._id,supplier);
	};

	supplierFactory.deleteSupplier = function(id){
		return $http.delete(urlBase+'/'+id);
	};

	supplierFactory.editOrder = function(id,oldID,newID){
		return $http.put(urlBase+'/order/'+id,{oldID:oldID,newID:newID});
	}

	supplierFactory.changeOrder = function (id,orderID,remove){
		return $http.post(urlBase+"/order/"+id,{remove:remove,orderID:orderID});
	}
	
	return supplierFactory;
}])