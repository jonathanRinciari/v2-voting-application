const router = require('express').Router();
const Poll = require('../models/polls')

router.get('/all', function(req, res){
    Poll.find({}, function(err, polls){
        if(err) throw err;
        res.send(polls)
    })
})

router.get('/:id', function(req, res){
    console.log(req.params.id)
    Poll.findById(req.params.id, function(err, poll){
        if(err) throw err;
         else {
             res.json(poll)
         }
    })
})

module.exports = router;