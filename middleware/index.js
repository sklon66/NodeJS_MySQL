// const redis = require('./databases/redis').client;
const express = require('express');
const bodyParser = require('body-parser');

// require('./databases/mongodb');

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
app.use('/', require('../routes'));

// Error handing
app.use((req, res) => {
  res
    .status(404)
    .send('http/404');
});

app.use((err, req, res, next) => {
  console.warn(err);
  res
    .status(500)
    .send('http/500');
})

process.on('uncaughtException', (err) => {
  console.error(err);
});

module.exports = app;
