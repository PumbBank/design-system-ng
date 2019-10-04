const fs = require('fs-extra');
const dest = require('./ng-package.json').dest;

console.log(__dirname + '\\src\\assets');
fs.copy(__dirname + '\\src\\assets', __dirname + '..\\..\\..\\dist\\honey-ng\\assets', function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
  }
});
