const router = require('express').Router();
const Poll = require('../models/polls')
const middleware = require('../middleware')

router.get('/', middleware.isLoggedIn, function(req, res){
    
    Poll.find({author: req.user.username}, function(err, polls){
        if(polls.length === 0){
            res.redirect('/poll/create')
        } else {
            res.render('myPolls', {polls})
        }
        
    })
})



module.exports = router
