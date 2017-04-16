app.factory('reportFactory',['$http',function($http){
	var reportFactory={};
	var urlBase='/api/reports/';

	reportFactory.getOrder = function(sdate,edate){
		return $http.get(urlBase+'order/'+sdate+'/'+edate);
	};

	reportFactory.getSaleOrder = function(sdate,edate){
		return $http.get(urlBase+'saleOrder/'+sdate+'/'+edate);
	};

	return reportFactory;
}])