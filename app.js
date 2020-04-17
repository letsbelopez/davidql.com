const express = require('express');
const path = require('path');
const routes = require('./routes/index');

// Create the express app
const app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// serves up static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// handle our own routes
app.use('/', routes);

module.exports = app;