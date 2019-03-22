const express = require('express');
const bodyParser = require('body-parser');
const store = require('../model/store.js');
const statusCodes = require('../constants/statusCodes.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//GET requests

//POST requests
app.post('/part', (req, res) => {
  store.createPart(req.body, (err, data) => {
    if (err) {
      return res.sendStatus(statusCodes.badRequest);
    }
    res.sendStatus(statusCodes.created);
  });
});

//PUT requests

//DELETE requests

//Start Up
app.listen(3000, (err) => {
  if (err) {
    return console.log('Error at server startup', err);
  }
  console.log('Listening on port 3000');
});