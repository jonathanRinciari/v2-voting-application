const router = require('express').Router();
const Poll = require('../models/polls');
const middleware = require('../middleware')

router.get('/create', middleware.isLoggedIn,function(req, res){
    res.render('newPoll')
    Poll.find({}, function(err, polls){
        if(err) throw err;
    })
})

router.post('/create', middleware.isLoggedIn, function(req, res){
  
    var author = req.user.username
    var title = req.body.title
    var options = req.body.options.split(',')
    var optionsArr = [];
    if(options !== '' && title !== ''){
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
    } else {
        req.flash("error", "You must include a title and options for your poll")
        res.redirect("back")
    }
})


router.get('/:id', function(req, res){
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) throw err;
        res.render('poll', {foundPoll: foundPoll})
    })
})

router.put('/:id', middleware.isLoggedIn, function(req, res){
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


router.post('/:id', middleware.isLoggedIn,function(req, res){
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

router.delete('/:id',function(req, res){
    Poll.findByIdAndRemove(req.body.id, function(err){
        if(err){
            res.json({message: 'An Error Occured Deleting'})
        } else {
            res.json({updated: 'success'})
        }
    })
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