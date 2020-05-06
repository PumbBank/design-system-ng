const fs = require('fs-extra');
const path = require('path');
const distFolder = './dist-package';
const distPackageJson = require(distFolder + '/package.json');
const libDest = require('./ng-package.json').dest;

const dest = path.join(__dirname, libDest, '/assets');
const from = path.join(__dirname, './src/assets');

// Modify package.json with removing private and devDependencies fields
Reflect.deleteProperty(distPackageJson, 'private');
Reflect.deleteProperty(distPackageJson, 'devDependencies');
fs.writeFileSync(distFolder + `/package.json`, JSON.stringify(distPackageJson, null, 2));

fs.copy(from, dest, function (err) {
  if (err) {
    throw new Error(JSON.stringify(err));
  } else {
    console.log("%c Assets successfully copied!", 'background: #242424; color: #bada55;');
  }
});
