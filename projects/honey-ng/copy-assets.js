const fs = require('fs-extra');
const dest = require('./ng-package.json').dest;

fs.copy(__dirname + '/src/assets', __dirname + '/../../../dist/honey-ng/assets', function (err) {
  if (err) {
    throw new Error(JSON.stringify(err));
  } else {
    console.log("success!");
  }
});
