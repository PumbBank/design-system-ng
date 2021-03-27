const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");
const distDir = '../dist/';
const distStylesDir = '../dist/styles/';

const files = [
  '../src/button/components/button/button.component.scss',
  '../src/button/examples/button-overview/button-overview.component.scss',
  '../src/button/examples/button-page/button-page.component.scss'
];


function deleteDir(src) {
  rimraf(src, error => console.log(error));
}

function makeDir(src) {
  fs.mkdirSync(src, { recursive: true });
}

function copyFiles(filesList, distFolder) {
  filesList.forEach((file) => {
    fs.copyFileSync(file, distFolder + path.basename(file));
  })
}

deleteDir(distDir);
makeDir(distStylesDir);
copyFiles(files, distStylesDir);
