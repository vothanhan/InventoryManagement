app.controller('reportCtrl',['$scope','$rootScope','$state','$stateParams','$http','reportFactory','productFactory','supplierFactory','suppliers',function($scope,$rootScope,$state,$stateParams,$http,reportFactory,productFactory,supplierFactory,suppliers){
	
	$scope.selectedReport='';

	function init(){
		document.getElementById("selectReportScreen").style.display='none';
		$scope.selectedReport=$state.$current.name.split('.')[1];
		if($scope.selectedReport!='inventory')
			$scope.sdate=convertDate($stateParams.sdate).toDateString();

		$scope.edate=convertDate($stateParams.edate).toDateString();

		$scope.edatedate=convertDate($stateParams.edate);
		$scope.sort={
			field:'name',
			reverse:false
		}
		if(!suppliers.hasOwnProperty("name")){
			$scope.suppliers=suppliers.data;
		}
		getReport($scope.selectedReport);
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});
		if($scope.selectedReport!='inventory')
			document.getElementById('sdate').value=convertDate($stateParams.sdate).toDateString();
		document.getElementById('edate').value=convertDate($stateParams.edate).toDateString();
	}

	$scope.setOrder=function(type){
		console.log($scope.sort);
		if($scope.sort.field==type){
			$scope.sort.reverse=!$scope.sort.reverse
		}
		else{
			$scope.sort.field=type;
			$scope.sort.reverse=false;
		}
	}

	function getReport(report){
		if (report=='order'){
			reportFactory.getOrder($stateParams.sdate,$stateParams.edate).then(function(data){
				$scope.arr=data.data;
			},function(err){
				alert("Cannot get report data.\n Error messages: "+err.message);
			})
		}
		else if(report=='sale'){
			reportFactory.getSaleOrder($stateParams.sdate,$stateParams.edate).then(function(data){
				$scope.arr=data.data;
				console.log(data.data);
			},function(err){
				alert("Cannot get report data.\n Error messages: "+err.message);
			})
		}
		else if (report=='inventory'){
			productFactory.getAllProducts().then(function(data){
				$scope.arr=data.data;
			},function(err){
				alert("Cannot get report data.\n Error messages: "+err.message)
			})
		}
	}

	$scope.getQuantity=function(changeHistory,isIn){
		var ret=0;
		if (isIn==true){

			angular.forEach(changeHistory,function(change){
				var date=new Date(change.date);
				if(change.amount>0 && date<=$scope.edatedate){
					ret+=change.amount;
				}
			})
		}
		else{
			angular.forEach(changeHistory,function(change){
				var date=new Date(change.date);
				if(change.amount<0 && date<=$scope.edatedate){
					ret+=change.amount;
				}
			})
			ret=-ret;
		}
		return ret;
	}

	$scope.getRemaining=function(changeHistory){
		var ret=0;
		var lastChange=null;
		angular.forEach(changeHistory,function(change){
			var date=new Date(change.date);
			if(date<=$scope.edatedate){
				lastChange=change;
			}
		})
		if (lastChange==null){
			return ret;
		}
		else{
			ret=lastChange.currentStock+lastChange.amount;
			return ret;
		}
	}

	function getSupplierName(id){
		var sname='Supplier not exist anymore.';
		angular.forEach($scope.suppliers, function(supplier) {
			if (supplier._id == id)
				sname=supplier.name;
		});
		return sname;
	};

	$scope.getSupplierName=getSupplierName;

	function convertDate(date){
		date=date.split('-')
		date=new Date(date[2],date[1]-1,date[0])
		return date
	}
	$scope.convertDate=function(date){
		var dat=new Date(date);
		return dat.toDateString();
	}

	$scope.getStatus=function(stat){
		if(stat){
			return "Solved";
		}
		else
			return "Not Solved";
	}

	$scope.setDate=function(report){
		if(report!='inventory'){
			var sdate=new Date(document.getElementById('sdate').value);
			var edate=new Date(document.getElementById('edate').value)
			var sdate=sdate.getDate()+'-'+(sdate.getMonth()+1)+'-'+(sdate.getFullYear());
			var edate=edate.getDate()+'-'+(edate.getMonth()+1)+'-'+(edate.getFullYear());
			$state.go('report.'+report,{sdate:sdate,edate:edate});
		}
		else{
			var edate=new Date(document.getElementById('edate').value)
			var edate=edate.getDate()+'-'+(edate.getMonth()+1)+'-'+(edate.getFullYear());
			$state.go('report.'+report,{edate:edate});
		}
		
	}
	init();
}]);