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
        optionsArr.push({title: options[i]})
    }

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
        res.render('poll', {foundPoll: foundPoll.options})
    })
})

router.put('/:id', function(req, res){
    var id = req.params.id;
    var userVote = req.body.vote
    var user = req.user.username
     checkVoted(id, user)
        .then(function(newVoter){
          if(newVoter){
              console.log(newVoter)
             submitAnswer(userVote, res, id, user)
           } else {
               res.json({message: 'Already voted!'})
           }
        })
           .catch(function(err){
               console.log(err)
           })
})


router.post('/:id', function(req, res){
var id = req.params.id
var customVote = req.body.vote
var user = req.user.username
    checkVoted(id, user)
      .then(function(newUser){
   if(newUser){
    Poll.findByIdAndUpdate(id, { $push: {options: {title: customVote}}}, {new: true}, 
    function(err, data){
        if(err) throw err;
        submitAnswer(customVote, res, id, user)
    })
   } else {
       res.json({message: 'You already voted'})
   }
} );

})

function submitAnswer(field, res, id, user){
  //  $push: {'voters': user}}, 
  
    Poll.findOneAndUpdate(
    { options: {$elemMatch: {title: field}}},
    { $inc: { 'options.$.vote': 1}, $push: {voters: user}},
    function(err, poll){
        if(err) throw err;
        res.json({updated: poll})
    })
}

function checkVoted(id, user) {
    return new Promise(function (resolve, reject) {
        Poll.findById(id, function (err, data) {
            if(err) throw err
            var voted = data.voters
            let ipIsNew = voted.every(function(hist){return hist !== user});
            if(ipIsNew){
                return resolve(true);
            }else{
                return resolve(false);
            }
        });
    });

}

module.exports = router;