#!/usr/bin/env node

const sass = require('sass');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const inputDir = path.join(__dirname, 'scss');
const outputDir = path.join(__dirname, 'dist');

function clearOutputDir() {
  if (fs.existsSync(outputDir)) {
    fs.readdirSync(outputDir).forEach((file) => {
      const filePath = path.join(outputDir, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    });
    console.log(`Cleared contents of ${outputDir}`);
  }
}

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

async function compileSass(inputPath, outputPath) {
  const result = sass.renderSync({
    file: inputPath,
    outFile: outputPath,
    outputStyle: 'compressed',
  });

  const postcssResult = await postcss([autoprefixer]).process(result.css, { from: undefined });

  ensureDirectoryExistence(outputPath);
  fs.writeFileSync(outputPath, postcssResult.css);
  console.log(`Compiled ${inputPath} to ${outputPath}`);
}

function compileAllSassFiles() {
  clearOutputDir(); // Clear the output directory before compiling

  glob(`${inputDir}/**/*.scss`, (err, files) => {
    if (err) {
      console.error('Error finding SCSS files:', err);
      return;
    }

    files.forEach((file) => {
      const inputPath = file;
      const outputPath = path.join(
        outputDir,
        path.relative(inputDir, file).replace('.scss', '.css'),
      );
      compileSass(inputPath, outputPath);
    });
  });
}

compileAllSassFiles();
