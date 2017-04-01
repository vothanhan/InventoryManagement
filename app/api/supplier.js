var Supplier= require('../models/supplier.js');

module.exports = function(exrouter){
	//initialize Router
	router=exrouter;
	//CRUD for supplier
	router.route("/api/suppliers").get(function(req,res){
		Supplier.find(function(err,products){
			if (err){
				console.log(err);
			}
			res.json(products);
		});
	}).post(function(req,res){
		tmp= new Supplier({
			name:req.body.name
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
	router.route("/api/suppliers/:id").get(function(req,res){
		var response={};
		Supplier.findById(req.params.id,function(err,data){
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
		Supplier.findById(req.params.id,function(err,data){
			if (err){
				response={"error":true,"data":err};
			}
			else{
				if(data!=null){
					if(req.body.name){
						data.name=req.body.name;
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
		Supplier.remove({
			_id:req.params.id
		},function(err,supplier){
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

