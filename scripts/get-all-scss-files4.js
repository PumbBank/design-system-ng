const copyFiles = require('copyfiles');
const rimraf = require("rimraf");
const fs = require('fs');
const source = '../src/**/*.scss';
const distStylesDir = '../dist/styles/';
const searchValue = new RegExp('::ng-deep',"g")
const replaceValue = '::v-deep';

const WriteFilesPromise = new Promise((resolve, reject) => {
  rimraf.sync(distStylesDir);

  copyFiles([source, distStylesDir], {up: true}, error => {
    if (error === undefined) {
      resolve(fs.readdirSync(distStylesDir));
    } else {
      reject();
    }
  });
})

WriteFilesPromise.then((files) => {
  files.map(file => distStylesDir + file).forEach(fileName => {
    replaceContent(fileName, searchValue, replaceValue);
  })
}).catch(() => {
  console.error('Promise failed');
})

function replaceContent(fullFilePath, searchValue, replaceValue) {
  fs.readFile(fullFilePath, 'utf8', (error, data) => {
    if (error) {
      return console.log(error);
    }

    const result = data.replace(searchValue, replaceValue);
    fs.writeFileSync(fullFilePath, result);
  })
}
