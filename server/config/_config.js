"use strict"

require('dotenv').config();

var ids = {
  github: {
    clientID: process.env.GITHUBCLIENT,
    clientSecret: process.env.GITHUBSECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  linkedin: {
    clientID: process.env.LINKEDINCLIENT,
    clientSecret: process.env.LINKEDINSECRET,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
  },
  twitter: {
    consumerKey: process.env.TWITTERKEY,
    consumerSecret: process.env.TWITTERSECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
    facebook: {
    clientID: process.env.FACEBOOKCLIENT,
    clientSecret: process.env.FACEBOOKSECRET,
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
  },
    google: {
    clientID: process.env.GOOGLECLIENT,
    clientSecret: process.env.GOOGLESECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  }
};

module.exports = ids;