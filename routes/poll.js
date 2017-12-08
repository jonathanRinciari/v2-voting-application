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
    var optionObj = {};
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
        res.redirect('/')
    })
})


router.get('/:id', function(req, res){
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) throw err;
        res.render('poll', {foundPoll: foundPoll})
    })
})

// router.post('/:id', function(req, res){
//     var vote = req.body.vote;

//     console.log(req.body)
//     Poll.findByIdAndUpdate({"_id": req.params.id, "options": req.body.vote, {$inc:{"options[":1}}, function(err, poll){
//         if(err) throw err
//         console.log(req.body.vote)
//          var votes = poll.options[req.body.vote];
//          votes += 1;
         
//     })
    
// })

module.exports = router;