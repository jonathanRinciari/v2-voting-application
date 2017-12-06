const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.send('loging')
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    console.log(req.user)
    res.redirect('/');
});

// auth with github
router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}));

// callback route for github to redirect to
// hand control to passport to use code to grab profile info
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    res.send(req.user);
    
});

module.exports = router;