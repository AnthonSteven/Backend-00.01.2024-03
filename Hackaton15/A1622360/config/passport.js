const passport = require('passport');
const { Strategy: OAuth2Strategy } = require('passport-oauth2');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(new OAuth2Strategy({
  authorizationURL: 'oauth-provider-authorization-url',
  tokenURL: 'oauth-provider-token-url',
  clientID: 'your-client-id',
  clientSecret: 'your-client-secret',
  callbackURL: 'your-callback-url',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const [user, created] = await User.findOrCreate({
      where: { oauthId: profile.id },
      defaults: {
        username: profile.username,
      },
    });

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));
