const express = require('express');
const fs = require('fs');
const showdown = require('showdown');

const router = express.Router();
const mkdwnConverter = new showdown.Converter();

router.get('/', function (req, res) {
  const post = fs.readFileSync(`${__dirname}/../posts/first.md`, 'utf8');

  res.render('index', { post: mkdwnConverter.makeHtml(post) });
});

module.exports = router;
