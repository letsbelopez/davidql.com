const path = require('path');
const fs = require('fs');
const config = require('../config');
const pug = require('pug');

function getLines(path) {
  var data = fs.readFileSync(path, 'utf8');
  return data.split('\n');
}

function createPage(page) {
  let compileFunction = pug.compileFile(`${config.viewsdir}/${page.directory}.pug`);
  return compileFunction(page);
}

exports.getContentData = function getContentData(basePath, files, result = [], directory) {
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

exports.createPages = function (content) {
  for (let page of content) {
    fs.writeFile(
      `${config.outdir}/${page.slug}.html`,
      createPage(page),
      e => {
        if (e) throw e;
        console.log(`${config.outdir}/${page.slug} was created successfully`);
      })
  }
}

exports.createHomePage = function () {
  let compileFunction = pug.compileFile(`${config.viewsdir}/index.pug`);
  fs.writeFile(
    `${config.outdir}/index.html`,
    compileFunction(),
    e => {
      if (e) throw e;
      console.log(`${config.outdir}/index.html was created successfully`)
    })
}
