app.factory('selectedProductFactory',[function(){

	var selectedProductFactory={};

	selectedProductFactory.selectedProduct=[];

	selectedProductFactory.addSelected=function(id){
		selectedProductFactory.selectedProduct.push(id);
	}

	selectedProductFactory.checkExist=function(id){
		for(i in selectedProductFactory.selectedProduct)
		{
			if(selectedProductFactory.selectedProduct[i]==id){
				return true;
			}
		}
		return false;
	}
	selectedProductFactory.removeSelected=function(id){
		var index=selectedProductFactory.selectedProduct.indexOf(id);
		if(index>-1)
			selectedProductFactory.selectedProduct.splice(index,1);
	}

	selectedProductFactory.reset=function(){
		selectedProductFactory.selectedProduct=[];
	}

	return selectedProductFactory;

}]);