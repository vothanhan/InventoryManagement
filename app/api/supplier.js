var Supplier= require('../models/supplier.js');

module.exports = function(exrouter){
	//initialize Router
	router=exrouter;
	//CRUD for supplier
	router.route("/api/suppliers").get(function(req,res){
		Supplier.find(function(err,suppliers){
			if (err){
				console.log(err);
			}
			res.json(suppliers);
		});
	}).post(function(req,res){
		tmp= new Supplier({
			name:req.body.name,
			phoneNumber:req.body.phoneNumber,
			email:req.body.email,
			transaction:req.body.transaction
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
					data.name=req.body.name;
					data.phoneNumber=req.body.phoneNumber;
					data.email=req.body.email;
					data.transaction=req.body.transaction;
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

	router.route("/api/suppliers/order/:id").put(function(req,res){
		var errs=[]
		var response={};
		Supplier.update({_id:req.body.oldID},{$pull:{transaction:{orderID:req.params.id}}},function(err){
			if(err){
				errs.push(err);
			}
		});
		Supplier.update({_id:req.body.newID},{$push:{transaction:{orderID:req.params.id}}},function(err){
			if(err){
				errs.push(err);
			}
		});
		if(errs.length>=1){
			response={errors:true,data:errs};
		}
		else {
			response={errors:false,data:"Success"};
		}
		res.json(response);
	}).post(function(req,res){
		var response={};
		if(req.body.remove==true){
			Supplier.update({_id:req.params.id},{$pull:{transaction:{orderID:req.body.orderID}}},function(err){
				if(err){
					response={error:true,data:err};
				}
				else{
					response={error:false,data:"Success"};
				}
			});
		}
		else{
			Supplier.update({_id:req.params.id},{$push:{transaction:{orderID:req.body.orderID}}},function(err){
				if(err){
					response={error:true,data:err};
				}
				else{
					response={error:false,data:"Success"};
				}
			});
		}
	});


};

