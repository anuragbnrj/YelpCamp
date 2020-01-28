var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data =[
    {
        name: "Dharamshala Mountains", 
        image:"https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=89f8de1875d71adbd5fff976ac2341be&auto=format&fit=crop&w=967&q=80",
        description: "Cras et velit sem. Vestibulum auctor ligula et turpis porta, sit amet finibus mauris egestas."
    },
    {
        name: "Yellow Mountains", 
        image:"https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aa6e65fcad07b9a68420c430034f84f2&auto=format&fit=crop&w=1050&q=80",
        description: "Maecenas placerat hendrerit venenatis. Suspendisse sed convallis nunc."
    },
    {
        name: "Aurora Mountains", 
        image:"https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8e0ef56213507ac99a507966ab9c5499&auto=format&fit=crop&w=1050&q=80",
        description: "Aliquam venenatis ex in a molestie. Aliquam ultrices, ac vehicula non."
    },
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        // Add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err);
        //         }
        //         else{
        //             console.log("Added a campground!");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                     text: "Great Place but no internet.",
        //                     author: "Caesar"
                            
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     }
        //                     else{
        //                         campground.comments.push(comment._id);
        //                         campground.save();
        //                         console.log("Created a new comment");
        //                     }
        //                 }
        //             );
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;