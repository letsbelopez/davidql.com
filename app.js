const express = require('express');
const path = require('path');
const config = require('./config');

// Create the express app
const app = express();

// serves up static assets
app.use(express.static(path.join(__dirname, 'assets')));

// All other content routes
app.use('/:slug', function(req, res) {
  res.sendFile(`${config.outdir}/${req.params.slug}.html`);
});

// Home
app.use('/', function(req, res) {
  res.sendFile(`${config.outdir}/index.html`);
});

module.exports = app;