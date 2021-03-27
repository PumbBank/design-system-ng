const readdirSync = require("@jsdevtools/readdir-enhanced");
const copyfiles = require('copyfiles');
const path = require('path');
const rimraf = require("rimraf");
const fs = require('fs');
const sourceDir = '../src/button/';
const distDir = '../dist/';
const distStylesDir = '../dist/styles/';
const scssExtension = 'scss';

rimraf.sync(distStylesDir);

// function deleteDir(src) {
//   rimraf(src, error => console.log(error));
// }

// function makeDir(src) {
//   fs.mkdirSync(src, { recursive: true });
// }
//
// function copyFiles(filesList, distFolder) {
//   filesList.forEach((file) => {
//     fs.copyFileSync(file, distFolder + path.basename(file));
//   })
// }
//
// readdirSync(sourceDir, {filter: `**/*.${scssExtension}`, deep: true}, (error, files) => {
//   debugger;
//   copyFiles(files, makeDir(distStylesDir));
//   debugger;
//   // cpx "src/**/*.{sass,scss}" dist;
//
//   console.log('::: All *.scss files have been successfully written to the dist folder :::')
// });

// readdirSync(distStylesDir, (error, files) => {
//   debugger;
//   files.forEach((file) => {
//     console.log(file);
//     // let newFileName = path.basename(file);
//     // debugger;
//     // fs.copyFileSync(file, distDir+newFileName);
//   });
// })

// function replaceContent(file) {
//   const searchValue = new RegExp('::ng-deep',"g")
//   const replaceValue = '::v-deep';
//   const fullFilePath = sourceDir + file;
//
//   fs.readFile(fullFilePath, 'utf8', (error, data) => {
//     if (error) {
//       return console.error('Error while reading file', error);
//     }
//
//     fs.writeFile(`../dist/${file}`, data, 'utf8', error => {
//       if (error) {
//         return console.error('Error while reading file', error);
//       }
//     });
//
//     const result = data.replace(searchValue, replaceValue);
//
//     fs.writeFile(`../dist/${file}`, result, 'utf8', error => {
//       debugger;
//       if (error) {
//         return console.error('Error while reading file', error);
//       }
//     })
//   })
// }

// const chipScssFile = 'changelog.component.scss';
// const chipScssPath = `src/changelog/${chipScssFile}`;
// let fs = require('fs');
//
// fs.readFile(chipScssPath, 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//
//   let result = data.replace(/::ng-deep/g, '::v-deep');
//
//   fs.writeFile(`../dist/${chipScssFile}`, result, 'utf8', function (err) {
//     if (err) return console.log(err);
//   });
// });
