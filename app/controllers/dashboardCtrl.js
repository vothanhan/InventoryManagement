app.controller('dashboardCtrl',['$scope','$state','$stateParams','reportFactory','orders','products','saleOrders',function($scope,$state,$stateParams,reportFactory,orders,products,saleOrders){

	$scope.productSale={};
	$scope.productSaleArray=[];

	function init(){
		var currentDate=new Date();
		$scope.sdate='01-'+(currentDate.getMonth()+1)+'-'+(currentDate.getFullYear());
		var lastDate=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0);
		$scope.edate=''+lastDate.getDate()+'-'+(currentDate.getMonth()+1)+'-'+(currentDate.getFullYear());

		prepareData();
		getTopsale();
		getPurchaseOrder();
	}

	function prepareData(){
		if(!orders.hasOwnProperty("name")){
			$scope.orders=orders.data;
		}
		if(!products.hasOwnProperty("name")){
			$scope.products=products.data;
		}
		if(!saleOrders.hasOwnProperty("name")){
			$scope.saleOrders=saleOrders.data;
		}

		getBelowRestock();
		$scope.productCount=$scope.products.length;

	}

	function getBelowRestock(){
		var count=0;
		angular.forEach($scope.products,function(product){
			if (product.stock<product.restockAmount){
				count+=1;
			}
		})
		$scope.belowRestock=count;
	}



	function getTopsale(){
		angular.forEach($scope.products,function(product){
			$scope.productSale[product._id]=0
		})
		
		reportFactory.getSaleOrder($scope.sdate,$scope.edate).then(function(data){
			$scope.saleCount=data.data.length;
			$scope.saleAmount=0;
			angular.forEach(data.data,function(order){
				$scope.saleAmount+=order.price;
				angular.forEach(order.batch,function(product){
					$scope.productSale[product.productID]+=product.amount;
				})
			})
			angular.forEach($scope.products,function(product){
				$scope.productSaleArray.push({productID:product._id,sale:$scope.productSale[product._id]});
			})
			$scope.productSaleArray.sort(function(a,b){
				return b.sale-a.sale;
			})
		},function(err){
			alert("Cannot get sale orders.\nError message: "+err.message);
		})
	}

	function getPurchaseOrder(){
		reportFactory.getOrder($scope.sdate,$scope.edate).then(function(data){
			$scope.orderCount=data.data.length;
			$scope.resolvedCount=0;
			$scope.purchaseAmount=0;
			angular.forEach(data.data,function(order){
				if(order.isSolved){
					$scope.purchaseAmount+=order.price;
					$scope.resolvedCount+=1;
				}
				
			})
		},function(err){
			alert("Cannot get purchase orders.\nError message: "+err.message);
		})
	}

	$scope.getProductName=function(id){
		ret=''
		angular.forEach($scope.products,function(product){
			if(product._id==id){
				ret=product.name;
			}
		})
		return ret;
	}

	init();
}])