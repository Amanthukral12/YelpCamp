var express = require("express"),
	app = express(),
	port= 3000,
	bodyParser=require("body-parser"),
	mongoose = require("mongoose")

 
mongoose
.connect("mongodb://localhost:27017/yelp_camp", {
useUnifiedTopology: true,
useNewUrlParser: true,
});
app.use(bodyParser.urlencoded({extended: true})); 

app.set("view engine","ejs");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground=mongoose.model("Campground",campgroundSchema);

// Campground.create({
// 	name: "Aman",
// 	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRI1r68jk04-6RcQWg4BAj-9XRIYW1QHFrRN-JF7BTpBGFs6DbG&usqp=CAU",
// 	description:"this is a drawing of a silly face" 
// },
// function(err,campground) {
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("newly created");
// 		console.log(campground);
// 	}
// });	
app.get("/",function(req,res){
	res.render("landing");	
});

app.get("/campgrounds", function(req,res) {
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index",{campgrounds:allCampgrounds});		
		}
	});
	
});
app.get("/campgrounds/new", function(req,res){
	res.render("new");
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
	Campground.findById(req.params.id, function (err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("show",{campground: foundCampground});
		}
	});
});

app.listen(port, function function_name() {
	console.log("the yelpcamp server has started!");
})