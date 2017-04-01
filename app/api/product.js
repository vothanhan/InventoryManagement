var Product= require('../models/product.js');

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
			unit: req.body.unit
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
					console.log(req.body.name);
					if(req.body.name){
						data.name=req.body.name;
					}
					if(req.body.price){
						data.price=req.body.price;
					}
					if(req.body.itemType){
						data.itemType=req.body.itemType;
					}
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

};

