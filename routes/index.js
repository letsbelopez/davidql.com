const express = require('express');
const path = require('path');
const readline = require('readline');
const fs = require('fs');

const router = express.Router();
const contentDir = path.join(__dirname, '../content');

fs.readdir(path.join(__dirname, '../content'), async (err, files) => {
  if (err) return console.error("Couldn't start the server");
  const data = await getContentData(contentDir, files);
  createRoutes(data);
});

function getContentData(basePath, files, result = []) {
  for (let i = 0; i < files.length; i++) {
    const current = files[i];
    let newbase = path.join(basePath, current);
    if (fs.statSync(newbase).isDirectory()) {
      getContentData(newbase, fs.readdirSync(newbase), result);
    } else {
      const lines = getLines(newbase);
      const title = lines[0];
      const body = lines.slice(1).join('');
      const route = {
        date: current.slice(0, 10),
        slug: current.slice(11),
        title,
        body,
      };
      result.push(route);
    }
  }
  return result;
}

function createRoutes(data) {
  data.forEach((d) => {
    router.get(`/${d.slug}`, function (req, res) {
      res.render('blog', { date: d.date, title: d.title, body: d.body });
    });
  });
}

function getLines(path) {
  var data = fs.readFileSync(path, 'utf8');
  return data.split('\n');
}

// Home page route
router.get(`/`, function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;
