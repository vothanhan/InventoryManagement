app.directive('selectReport',['$state',function($state){
	return {
		templateUrl:'../view/detailcontent/report/reportSelect.html',
		replace:true,
		link: function($scope,element,attrs){
			$scope.selectReport=function(){
				var currentDate=new Date();
				var sdate='01-'+(currentDate.getMonth()+1)+'-'+(currentDate.getFullYear());
				var lastDate=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0);
				var edate=''+lastDate.getDate()+'-'+(currentDate.getMonth()+1)+'-'+(currentDate.getFullYear());
				
				$state.go('report.'+$scope.selectedReport,{sdate:sdate,edate:edate});
			}

		}
	}
}])