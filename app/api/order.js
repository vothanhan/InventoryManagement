var Order= require('../models/order.js');

module.exports = function(exrouter){
	//initialize Router
	router=exrouter;
	//CRUD for order
	router.route("/api/orders").get(function(req,res){
		Order.find(function(err,products){
			if (err){
				console.log(err);
			}
			res.json(products);
		});
	}).post(function(req,res){
		tmp= new Order({
			name: req.body.name,
			supplierName: req.body.supplierName,
			batch: req.body.batch,
			price: req.body.price,
			isSolved: req.body.isSolved
		});
		var response={}
		tmp.save(function(err){
			if(err){
				response={"error":true,"data":err};
			}
			else response={"error":false,"data":"Success"}
			res.json(response);
		});
	})
	router.route("/api/orders/:id").get(function(req,res){
		var response={};
		Order.findById(req.params.id,function(err,data){
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
		Order.findById(req.params.id,function(err,data){
			if (err){
				response={"error":true,"data":err};
			}
			else{
				if(data!=null){
					if(req.body.name){
						data.name=req.body.name;
					}
					if(req.body.supplierName){
						data.supplierName=req.body.supplierName;
					}
					if(req.body.batch){
						data.batch=req.body.batch;
					}
					if(req.body.price){
						data.price=req.body.price;
					}
					if(req.body.isSolved){
						data.isSolved=req.body.isSolved;
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
		Order.remove({
			_id:req.params.id
		},function(err,order){
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

