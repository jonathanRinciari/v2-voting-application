const router = require('express').Router();
const Poll = require('../models/polls')

router.get('/create', function(req, res){
    res.render('newPoll')
})

router.post('/create', function(req, res){
    var author = req.user.id
    var title = req.body.title
    var options = req.body.options.split(',')
    
    console.log(author, title, options)
})

module.exports = router;