const passport = require('passport');

exports.login = passport.authenticate('oauth2');

exports.loginCallback = passport.authenticate('oauth2', {
  successRedirect: '/',
  failureRedirect: '/login',
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
