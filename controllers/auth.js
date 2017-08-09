const express = require('express');

const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = (dataLoader) => {
  const authController = express.Router();


  // Create a new user (signup)
  authController.post('/users', (req, res) => {
    dataLoader.createUser({
      email: req.body.email,
      password: req.body.password
    })
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json(err));
  });


  // Create a new session (login)
  authController.post('/sessions', (req, res) => {
    dataLoader.createTokenFromCredentials(
      req.body.email,
      req.body.password
    )
    .then(token => res.status(201).json({ token: token }))
    .catch(err => res.status(401).json(err));
  });


  // Delete a session (logout)
  authController.delete('/sessions', onlyLoggedIn,(req, res) => {

    if (req.sessionToken === req.body.token) {
      dataLoader.deleteToken(req.body.token)
      .then(() => res.status(204).end())
      .catch(err => res.status(400).json(err));
    } else {
      res.status(401).json({ error: 'Invalid session token' });
    }
  });


  // Retrieve current user

  authController.get('/me',onlyLoggedIn, (req, res) => {

   if (req.sessionToken) {
    dataLoader.getUserFromSession(req.sessionToken)
      .then(data => res.json(data))


      .then(() => res.status(204).end())
              .catch(err => res.status(400).json(err));
              } else {
                res.status(401).json({ error: 'Invalid session token' });
              }

  });

  return authController;
};
