const path = require('path');

const config = {
    contentdir: path.join(__dirname, './content'),
    outdir: path.join(__dirname, './public'),
    viewsdir: path.join(__dirname, './views')
}

module.exports = config;