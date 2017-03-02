const express = require('express')
const session = require('express-session')
const passport = require('passport')
const passportGithub2 = require('passport-github2')
const config = require('./config.js')

const app = express();

const port = 3000;

app.use(session({
  resave: false, 
  saveUninitialized: true, 
  secret: config.SessionSecret
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));

passport.use(new GitHubStrategy({
    clientID: config.githubAuth.clientID,
    clientSecret: config.githubAuth.clientSecret,
    callbackURL: config.githubAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(userA, done) {
  console.log('serializing', userA);
  var userB = userA;
  done(null, userB); 
});

passport.deserializeUser(function(userB, done) {
  var userC = userC;
  done(null, userC); 
});

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });

app.get('./api/github/following', function(req,res){
    
})


app.listen(port, function(){
   console.log('Listening on port', port)
})