const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { Strategy: OAuth2Strategy } = require('passport-oauth2');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
