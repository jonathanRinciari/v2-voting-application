var Poll = require('../models/polls')
var middlewareObj = {}

middlewareObj.isOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Poll.findById(req.params.id, function(err, foundPoll){
        if (err) {
            req.flash("error", "Campground not Found")
            res.redirect("back");
       } else {
            if(foundPoll.author.equals(req.user.currentUserName)){
                next();
            } else {
                req.flash("error", "You need to be logged in to do that!")
                res.redirect("back");
            }
        }
        })
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to to that!")
  res.redirect("/auth/login");
}

module.exports = middlewareObj;