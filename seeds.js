var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment =require("./models/comment");

var data=[
{
	name: "Cloud",
	image: "https://www.foresthillstala.com/images/camp-gallery-1.jpg",
	description: "blah blah blah!"
},
{
	name: "Cloud1",
	image: "https://pix10.agoda.net/hotelImages/296/296957/296957_14072511280020479928.jpg?s=1024x768",
	description: "blah blah blah!"
},
{
	name: "Cloud2",
	image: "https://www.foresthillstala.com/images/experience-camping.jpg",
	description: "blah blah blah!"
}
]

function seedDb() {
	
//Remove all campgrounds
Campground.remove({}, function(err) {
	if(err){
		console.log(err);
	}
	console.log("removed campgrounds!");
	data.forEach(function(seed) {
	Campground.create(seed, function(err, campground) {
		if(err){
			console.log(err)
		} else{
			console.log("added a campground");
			//create acomment
			Comment.create(
				{
			text: "this place is great",
			author: "Homer" 	
		}, function(err,comment){
			if(err){
				console.log(err);
			} else{
			campground.comments.push(comment);
			campground.save();
			console.log("comment");
	}
		});
		}
	});
});

});



}

module.exports=seedDb;
