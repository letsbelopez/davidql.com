const express = require('express');
const path = require('path');

// Create the express app
const app = express();

// serves up static files from the public folder
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));
app.use(express.static(path.join(__dirname, 'public/assets')));

module.exports = app;