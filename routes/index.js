var express = require('express');
var router = express.Router();
var Poll = require('../models/polls')

/* GET home page. */
router.get('/', function(req, res, next) {
  Poll.find({}, function(err, polls){
      if (err) throw err
      else {
        console.log(polls)
        res.render('index', {title: 'Voting App', polls: polls  });
      }
  })
});

module.exports = router;
