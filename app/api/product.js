var Product= require('../models/product.js');
var moment= require('moment');


var processTime=function(product){
	changeHistory=product.changeHistory;
	for(i=0;i<changeHistory.length;i++){
		date=moment(changeHistory[i].date).format('DD-MM-YYYY');
		changeHistory[i].date=date;
	}
	product.changeHistory=changeHistory;
	sellHistory=product.sellHistory;
	for(i=0;i<sellHistory.length;i++){
		date=moment(sellHistory[i].date).format('DD-MM-YYYY');
		sellHistory[i].date=date;
	}	
	product.sellHistory=sellHistory;
	return product;
}

module.exports = function(exrouter){
	//initialize Router
	router=exrouter;
	//CRUD for product
	router.route("/api/items").get(function(req,res){
		Product.find(function(err,products){
			if (err){
				console.log(err);
			}
			res.json(products);
		});
	}).post(function(req,res){
		tmp= new Product({
			name: req.body.name,
			sellPrice: req.body.sellPrice,
			buyPrice: req.body.buyPrice,
			itemType: req.body.itemType,
			stock: req.body.stock,
			restockAmount: req.body.restockAmount,
			unit: req.body.unit,
			changeHistory:[{amount:req.body.stock,reason:"Initialized",currentStock:0,date:new Date()}],
			sellHistory:[],
			purchaseOrder:[]
		});
		Product.findOne({'name':tmp.name},function(err,product){
			if(err){
				console.log(err);
			}
			else{
				if(product!=null){
					product.stock+=tmp.stock;
					product.save(function(err){
						if(err){
							response={"error":true,"data":err};
						}
						else response={"error":false,"data":tmp}
						res.json(response);
					});
				}
				else{
					tmp.save(function(err){
						if(err){
							response={"error":true,"data":err};
						}
						else response={"error":false,"data":tmp}
						res.json(response);
					});
				}
			}
		})
	})
	router.route("/api/items/:id").get(function(req,res){
		var response={};
		Product.findById(req.params.id,function(err,data){
			if(err){
				response={"error":true,"data":err};
			}
			else{
				data=data.toJSON();
				data=processTime(data);
				response={"error":false,"data":data};
			}
			res.json(response);
		});
	}).put(function(req,res){
		var response={}
		Product.findById(req.params.id,function(err,data){
			if (err){
				response={"error":true,"data":err};
			}
			else{
				if(data!=null){
					data.name= req.body.name;
					data.sellPrice= req.body.sellPrice;
					data.buyPrice= req.body.buyPrice;
					data.itemType= req.body.itemType;
					data.stock= req.body.stock;
					data.restockAmount= req.body.restockAmount;
					data.unit= req.body.unit;
					data.changeHistory=req.body.changeHistory;
					data.sellHistory=req.body.sellHistory;
					data.purchaseOrder=req.body.purchaseOrder;
					data.save(function(err){
						if (err){
							response={"error":true,"data":err};
							console.log(response);
						}
						else{
							response={"error":false,"data":"Save success"};
						}
					})
				}
				
			}
			res.json(response);

		});
	}).delete(function(req,res){
		Product.remove({
			_id:req.params.id
		},function(err,product){
			var response={}
			if(err){
				response={"error":true,"data":err};
			}
			else{
				response={"error":false,"data":"Delete successfully"}
			}
			res.json(response);
		});
	});

	router.route("/api/items/amount/:id").put(function(req,res){
		response={};
		Product.findByIdAndUpdate(req.params.id,
			{$push:{changeHistory:{amount:req.body.amount,reason:req.body.reason,date:new Date(),currentStock:req.body.stock}},$inc:
				{stock:req.body.amount}},
			{new:true},function(err,model){
				if(err){
					console.log(err);
					response={'error':true,'data':err};
				}
				else{
					response={'error':false,'data':'Update success'};
				}
			})
		res.json(response);
	});

	router.route("/api/items/order/:id").put(function(req,res){
		response={};
		Product.update({_id:req.params.id},{$pull:{purchaseOrder:{orderID:req.body.orderID}}},{new:true},function(err,model){
				if(err){
					console.log(err);
					response={'error':true,'data':err};
				}
				else{
					response={'error':false,'data':'Update success'};
				}
			});
		res.json(response);
	});

	router.route("/api/items/saleorder/:id").put(function(req,res){
		response={};
		Product.update({_id:req.params.id},{$pull:{sellHistory:{orderID:req.body.orderID}}},{new:true},function(err,model){
				if(err){
					console.log(err);
					response={'error':true,'data':err};
				}
				else{
					response={'error':false,'data':'Update success'};
				}
			});
		res.json(response);
	});
};

