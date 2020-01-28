var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");


//===========================
// COMMENTS ROUTES
//===========================

// Comments new
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {           
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments create
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    // console.log(comment);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    // add username and id to comment
                    campground.comments.push(comment._id);
                    campground.save();
                    // console.log(comment);
                    req.flash("success", "Successfully created comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});


//EDIT comment route
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash("error", "No Campground Found!");
            res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect("back");
            } else {
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        });
    });
});

//UPDATE comment route
router.put("/campgrounds/:id/comments/:comment_id/", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY comment route
router.delete("/campgrounds/:id/comments/:comment_id/", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Deleted comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// middleware in middleware folder index.js

module.exports = router;
