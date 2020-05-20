const app = require("./app");
app.set("port", 3000);

if (process.env.NODE_ENV === 'dev') {
  // build the code
  require('./src/index');
}

const server = app.listen(app.get("port"), () => {
  console.log(`Express running - PORT ${server.address().port}`);
});