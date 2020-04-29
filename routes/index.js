const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const contentDir = path.join(__dirname, '../content');

fs.readdir(path.join(__dirname, '../content'), function(err, files) {
  if (err) return console.error("Couldn't start the server");
  const data = getContentData(contentDir, files);
  createRoutes(data);
});

function getContentData(basePath, files, result = []) {
  for (let i = 0; i < files.length; i++) {
    const current = files[i];
    let newbase = path.join(basePath, current);
    if (fs.statSync(newbase).isDirectory()) {
      getContentData(newbase, fs.readdirSync(newbase), result);
    } else {
      const route = {
        date: current.slice(0, 10),
        slug: current.slice(11).replace('.html', ''),
        path: newbase
      }
      result.push(route);
    }
  }
  return result;
}

function createRoutes(data) {
  data.forEach(d => {
    router.get(`/${d.slug}`, function(req, res) {
      let content = fs.readFileSync(d.path, 'utf8');
      res.render('index', { content });
    });
  });
}

module.exports = router;
