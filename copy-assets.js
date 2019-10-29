const fs = require('fs-extra');
const path = require('path');
const libDest = require('./ng-package.json').dest;

const dest = path.join(__dirname, libDest, '/assets');
const from = path.join(__dirname, './src/assets');
console.log(from, dest);

fs.copy(from, dest, function (err) {
  if (err) {
    throw new Error(JSON.stringify(err));
  } else {
    console.log("success!");
  }
});
