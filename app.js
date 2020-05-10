var express = require("express"),
	app = express(),
	port= 3000,
	bodyParser=require("body-parser"),
	mongoose = require("mongoose"),
	Campground =require("./models/campground"),
	seedDB= require("./seeds")

 
mongoose
.connect("mongodb://localhost:27017/yelp_camp", {
useUnifiedTopology: true,
useNewUrlParser: true,
});
app.use(bodyParser.urlencoded({extended: true})); 

app.set("view engine","ejs");
seedDB();



app.get("/",function(req,res){
	res.render("landing");	
});

app.get("/campgrounds", function(req,res) {
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds});		
		}
	});
	
});
app.get("/campgrounds/new", function(req,res){
	res.render("campgrounds/new");
})

app.post("/campgrounds", function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampground={name:name, image:image,description:desc}
	Campground.create(newCampground, function(err, newlyCreated) {
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
	 
});

app.get("/campgrounds/:id", function(req,res) {
	Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			//console.log(foundCampground);
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

//==================
app.get("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {campground: campground});
		}
	})
	
})

app.listen(port, function function_name() {
	console.log("the yelpcamp server has started!");
})
