app.directive('newItem',['$compile','productFactory','selectedProductFactory',function($compile,productFactory,selectedProductFactory){
	return {
		templateUrl: '../view/detailcontent/order/newitem.html',
		restrict:'A',
		scope:{},
		link:function(scope, element, attrs){
			$('.dropdown-button').dropdown({
				gutter: 0, // Spacing from edge
				alignment: 'left', // Displays dropdown with edge aligned to the left of button
				belowOrigin:true
				}
			);
			scope.amount=1;
			scope.price=0;
			scope.product={};
			scope.maxAmount=0;
			scope.product_id='';
			scope.initAmount=function(){
				if(scope.amount==null || scope.amount<1){
					scope.amount=1;
				}
				if(scope.amount>scope.maxAmount){
					scope.amount=scope.maxAmount;
				}
			}
			scope.chooseItem= function(){
				var dropdown=angular.element(document.getElementById('product_dropdown'));
				scope.$emit('product_select');
			}
			function addNewLine(){
				var el=$compile("<tr new-item></tr>")(scope.$parent);
				$(element.parent()[0]).append(el);
			}
			scope.assignProduct=function(product,isSell){
				console.log(selectedProductFactory.selectedProduct,selectedProductFactory.checkExist(product._id));
				if (!selectedProductFactory.checkExist(product._id)){
					if(scope.product_id!=''){
						selectedProductFactory.removeSelected(scope.product_id);
					}
					scope.product_id=product._id;
					selectedProductFactory.addSelected(product._id);
					// if($(element[0].children[1].children[0]).attr('productID')==undefined || element.parent().children().length==1)
					// {
					// 	addNewLine();
					// }
					$(element[0].children[1].children[0]).attr('productID',product._id);
					element[0].children[1].children[0].value=product.name;
					scope.maxAmount=product.stock;
					
					if(isSell==true){
						element[0].children[3].children[0].innerHTML=product.sellPrice;
						scope.price=product.sellPrice;
					}
					else{
						element[0].children[3].children[0].innerHTML=product.buyPrice;
						scope.price=product.buyPrice;
					}
					
				}
				else{
					alert("Product already selected!");
				}
			}

			scope.deleteProductLine=function(){
				if(scope.product_id!=''){
					selectedProductFactory.removeSelected(scope.product_id);
				}
				if($((element.parent())[0]).children().length>1){
					element.remove();
					scope.$destroy();
				}
			}
		}

	};
}]);