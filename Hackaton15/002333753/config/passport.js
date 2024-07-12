// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = function(passport) { 
  passport.use(new LocalStrategy(
    {
      usernameField: 'email', 
      passwordField: 'password' 
    },
    async (email, password, done) => {
      try {
       
        const user = await User.findOne({ email });

        
        if (!user) {
          return done(null, false, { message: 'Correo electrónico o contraseña incorrectos.' });
        }

        
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Correo electrónico o contraseña incorrectos.' });
        }

       
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
