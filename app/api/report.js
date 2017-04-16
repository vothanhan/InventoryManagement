var Order= require('../models/order');
var Supplier=require('../models/supplier');
var Product= require('../models/product');
var SaleOrder= require('../models/saleOrder');


module.exports = function(exrouter){
	//initialize Router
	router=exrouter;

	router.route("/api/reports/order/:sdate/:edate").get(function(req,res){

		sdate= req.params.sdate.split('-');
		edate= req.params.edate.split('-');
		sdate= new Date(sdate[2],parseInt(sdate[1])-1,sdate[0]);
		edate= new Date(edate[2],parseInt(edate[1])-1,parseInt(edate[0])+1);
		console.log(sdate,edate)
		Order.find({createdAt:{$gte:sdate,$lt:edate}},function(err,data){
			if (err){
				console.log(err);
			}
			console.log(data)
			res.json(data);
		});
	});

	router.route("/api/reports/saleOrder/:sdate/:edate").get(function(req,res){
		sdate= req.params.sdate.split('-');
		edate= req.params.edate.split('-');
		sdate= new Date(sdate[2],parseInt(sdate[1])-1,sdate[0]);
		edate= new Date(edate[2],parseInt(edate[1])-1,parseInt(edate[0])+1);
		SaleOrder.find({createdAt:{$gte:sdate,$lte:edate}},function(err,data){
			if (err){
				console.log(err);
			}
			res.json(data);
		});
	});
	}