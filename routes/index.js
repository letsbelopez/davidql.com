const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const contentDir = path.join(__dirname, '../content');

fs.readdir(path.join(__dirname, '../content'), async (err, files) => {
  if (err) return console.error("Couldn't start the server");
  const data = await getContentData(contentDir, files);
  createRoutes(data);
});

function getContentData(basePath, files, result = [], directory) {
  for (let i = 0; i < files.length; ++i) {
    const current = files[i];
    let newbase = path.join(basePath, current);

    if (fs.statSync(newbase).isDirectory()) {
      let index = newbase.lastIndexOf('/');
      const currentDir = newbase.slice(++index);
      getContentData(newbase, fs.readdirSync(newbase), result, currentDir);
    } else {
      const lines = getLines(newbase);
      const title = lines[0];
      const body = lines.slice(1).join('');
      const route = {
        date: current.slice(0, 10),
        slug: current.slice(11),
        title,
        body,
        directory,
      };
      result.push(route);
    }
  }
  // Note don't include async functions above or this will return early
  return result;
}

function createRoutes(data) {
  data.forEach((d) => {
    router.get(`/${d.slug}`, function (req, res) {
      res.render(d.directory, { date: d.date, title: d.title, body: d.body });
    });
  });
}

function getLines(path) {
  var data = fs.readFileSync(path, 'utf8');
  return data.split('\n');
}

// Home page route
router.get(`/`, function (req, res) {
  res.render('index');
});

module.exports = router;
