var Order= require('../models/order');
var Supplier=require('../models/supplier');
var Product= require('../models/product');

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
			isSolved: req.body.isSolved,
			price:req.body.price
		});

		var response={}
		tmp.save(function(err,data){
			if(err){
				response={"error":true,"data":err};
			}
			else {
				for(i in req.body.batch){
					console.log(req.body.batch[i].productID,data._id);
					Product.update({_id:req.body.batch[i].productID},{$push:{purchaseOrder:{orderID:data._id}}},{new : true},
					function(err, model) {
						if(err){
							console.log(err.message);
						}
						console.log(model)
					});
				}
				response={"error":false,"data":data}
			}
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
					data.name=req.body.name;
					data.supplierName=req.body.supplierName;
					data.batch=req.body.batch;
					data.isSolved=req.body.isSolved;
					data.price=req.body.price;
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

	router.route("/api/orders/:id/:suppID").put(function(req,res){
		var response={"error":false}
		Supplier.findByIdAndUpdate(
			req.params.suppID,
			{$push: {"transaction": {orderID:req.params.id}}},
			{new : true},
			function(err, model) {
				if(err){
					console.log(err.message);
				}
			}
		);
		res.json(response)
	});
};

