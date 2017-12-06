const router = require('express').Router();
const Poll = require('../models/polls')

router.get('/create', function(req, res){
    res.render('newPoll')
})

router.post('/create', function(req, res){
    var author = req.user.id
    var title = req.body.title
    var options = req.body.options.split(',')
    var optionObj = {};
    for(var i = 0; i < options.length; i++){
        optionObj[options[i]] = 0;
    }
    
    var newPoll = ({
        author: author,
        title: title,
        options: optionObj,
        voters: []
    })
    
    Poll.create(newPoll, function(err, newlyCreated){
        if(err) throw err;
        else {
            console.log(newlyCreated)
            res.send(newlyCreated)
        }
    })
})

module.exports = router;