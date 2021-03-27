// const readdirSync = require("@jsdevtools/readdir-enhanced");
// const fs = require('fs');
// const sourceDir = '../src/button/';
// const distDir = '../dist/';
// const scssExtension = 'scss';
//
// readdirSync(sourceDir, {filter: `**/*.${scssExtension}`, deep: true}, (error, files) => {
//   files.forEach((file, index) => {
//     fs.copyFile(file, distDir+file, (err) => {
//       if (err) {
//         console.log('File is not copied. Error: ', err);
//       }
//     });
//
//     // replaceContent(file);
//   });
//
//   console.log('::: All *.scss files have been successfully written to the dist folder :::')
// });

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

    // const result = data.replace(searchValue, replaceValue);
    //
    // fs.writeFile(`../dist/${file}`, result, 'utf8', error => {
    //   debugger;
    //   if (error) {
    //     return console.error('Error while reading file', error);
    //   }
    // })
//   })
// }

//changelog/changelog.component.scss

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

const { join, basename } = require('path');
const fs = require('fs');

const sourceDir = '../src/button/';
const distDir = '../dist/';

function getAllFiles(src, extension, files, result, regex) {
  files = files || fs.readdirSync(src);
  result = result || [];
  regex = regex || new RegExp(`\\${extension}$`)

  for (let i = 0; i < files.length; i++) {
    let file = join(src, files[i]);
    if (fs.statSync(file).isDirectory()) {
      try {
        result = getAllFiles(file, extension, fs.readdirSync(file), result, regex);
      } catch (error) {
        continue;
      }
    } else {
      if (regex.test(file)) {
        result.push(file);
      }
    }
  }

  result.forEach(file => {
    debugger;
    console.log(file.data);
    // fs.writeFile(file, data, 'utf8', error => {
    //   if (error) {
    //     console.log(error);
    //   }
    // })
  })

  // return result;
}

function getFilesNames(arrayOfFilePaths) {
  let arrayOfFileNames = [];

  arrayOfFilePaths.forEach(file => {
    arrayOfFileNames.push(basename(file));
  });

  return arrayOfFileNames;
}

function copyFilesToDist(files) {
  files.forEach( file => {
    writeFile(distDir+file, data, 'utf8', error => {
      if (error) {
        console.log('File doesn\'t written', error);
      }
    });
  })
}

function moveAndRename(sourceDir, destDir){
  fs.readdir(sourceDir, function(err, files){
    if(err)
      return err;
    else {
      files.forEach(function(file){
        let dotIndex = file.lastIndexOf(".");
        let name = file.slice(0, dotIndex);

        let read = fs.createReadStream(path.join(sourceDir, file));
        let write = fs.createWriteStream(path.join(destDir, newName));
        read.pipe(write);
      });
    }
  });
}

// moveAndRename(sourceDir, distDir);

const arrayOfScssFiles = getAllFiles('../src/', '.scss');
copyFilesToDist(getFilesNames(arrayOfScssFiles));
