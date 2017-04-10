var SaleOrder= require('../models/saleOrder');
var Product= require('../models/product')

module.exports = function(exrouter){
	//initialize Router
	router=exrouter;
	//CRUD for order
	router.route("/api/saleorders").get(function(req,res){
		SaleOrder.find(function(err,products){
			if (err){
				console.log(err);
			}
			res.json(products);
		});
	}).post(function(req,res){
		tmp= new SaleOrder({
			name: req.body.name,
			batch: req.body.batch,
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
					Product.update({_id:req.body.batch[i].productID},{$push:{sellHistory:{orderID:data._id}}},{new : true},
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
	router.route("/api/saleorders/:id").get(function(req,res){
		var response={};
		SaleOrder.findById(req.params.id,function(err,data){
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
		SaleOrder.findById(req.params.id,function(err,data){
			if (err){
				response={"error":true,"data":err};
			}
			else{
				if(data!=null){
					data.name=req.body.name;
					data.batch=req.body.batch;
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
		SaleOrder.remove({
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

