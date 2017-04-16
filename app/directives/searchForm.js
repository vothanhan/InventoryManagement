app.directive('searchForm',[function(){
	return{
		templateUrl:"../view/detailcontent/searchForm.html",
		replace:true,
		link:function($scope,element,attr){
			$scope.filterString='';
			$scope.checkFilter=function(item){

				var relevant=false;
				for(var att in item){
					if (item.hasOwnProperty(att)){
						if(typeof(item[att])=='string' || typeof(item[att])=='number'){
							if(String(item[att]).toLowerCase().indexOf($scope.filterString.toLowerCase())!=-1){
								relevant=true;
							}
						}
					}
				}
				return relevant;
			}
		}
	}
}])