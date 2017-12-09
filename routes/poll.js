const router = require('express').Router();
const Poll = require('../models/polls')

router.get('/create', function(req, res){
    res.render('newPoll')
    Poll.find({}, function(err, polls){
        if(err) throw err;
        console.log(polls)
    })
})

router.post('/create', function(req, res){
    var author = req.user.username
    var title = req.body.title
    var options = req.body.options.split(',')
    var optionsArr = [];
    for(var i = 0; i < options.length; i++){
        // optionObj[options[i]] = {votes: 0, name: options[i]
        optionsArr.push({title: options[i]})
    }
    
 
    // var optionObj = {};
    // for(var i = 0; i < options.length; i++){
    //     optionObj[options[i]] = 0;
    // }
    var newPoll = ({
        author: author,
        title: title,
        options: optionsArr,
        voters: []
    })
    
    
    
    Poll.create(newPoll, function(err, newlyCreated){
        if(err) throw err;
        
        // 
        res.redirect(`/${newlyCreated._id}`)
    })
})


router.get('/:id', function(req, res){
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) throw err;
        res.render('poll', {foundPoll: foundPoll})
    })
})

router.put('/:id', function(req, res){
    var id = req.params.id;
    var userVote = req.body.vote
    var user = req.user.username
    Poll.findById(id, function(err, data){
        if(err) throw err;
        submitAnswer(userVote, res, id, user)
    })
    
})

router.post('/:id', function(req, res){
var id = req.params.id
var customVote = req.body.vote
var user = req.user.username
    Poll.findByIdAndUpdate(id, { $push: {options: {title: customVote}}}, {new: true}, 
    function(err, data){
        if(err) throw err;
        submitAnswer(customVote, res, id, user)
    })

})

function submitAnswer(field, res, id, user){
  //  $push: {'voters': user}}, 
    Poll.findOneAndUpdate(
    { options: {$elemMatch: {title: field}}},
    { $inc: { 'options.$.vote': 1}, $push: {'voters': user}},
 
    function(err, poll){
        if(err) throw err;
        res.json({updated: poll})
    })
}

module.exports = router;