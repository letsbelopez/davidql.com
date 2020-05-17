const fs = require('fs');
const config = require('../config');
const contentController = require('./content');

const files = fs.readdirSync(config.contentdir);
const data = contentController.getContentData(config.contentdir, files);

if (!fs.existsSync(config.outdir)) {
  fs.mkdirSync(config.outdir);
}

contentController.createPages(data);
contentController.createHomePage();
