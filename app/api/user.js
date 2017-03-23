var User= require('../models/user.js');

module.exports = function(exrouter){
	//initialize Router
	router=exrouter;
	//CRUD for user
	router.route("/api/users").get(function(req,res){
		User.find(function(err,products){
			if (err){
				console.log(err);
			}
			res.json(products);
		});
	}).post(function(req,res){
		tmp= new User();
		tmp.name=req.body.name;
		tmp.password=req.body.password;
		tmp.isAdmin=req.body.isAdmin;
		var response={}
		tmp.save(function(err){
			if(err){
				response={"error":true,"data":err};
			}
			else response={"error":false,"data":"Success"}
			res.json(response);
		});
	});
	router.route("/api/users/:id").get(function(req,res){
		var response={};
		User.findById(req.params.id,function(err,data){
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
		User.findById(req.params.id,function(err,data){
			if (err){
				response={"error":true,"data":err};
			}
			else{
				if(data!=null)
				{
					if(req.body.name){
						data.name=req.body.name;
					}
					if(req.body.password){
						data.password=req.body.password;
					}
					if(req.body.isAdmin){
						data.isAdmin=req.body.isAdmin;
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
				};
			}
			res.json(response);
		});
	}).delete(function(req,res){
		User.remove({
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

