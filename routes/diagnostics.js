const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.log("hello from diagnostics post");

  const body = req.body;
  const errors = body.errors;
  const time = new Date();
  const errorId = uuidv4();

  const errorObj = {
    "time": time,
    "error_id": errorId,
    "errors": errors,
  }

  readAndAppend(errorObj, './db/diagnostics.json');
  let errorString = ""

  if (errors.tip) {
    errorString += errors.tip + "\n"
  }

  if (errors.topic) {
    errorString += errors.topic + "\n"
  }

  if (errors.username) {
    errorString += errors.username + "\n"
  }

  res.json(errorString);
});

module.exports = diagnostics;
