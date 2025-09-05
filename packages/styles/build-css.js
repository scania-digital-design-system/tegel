#!/usr/bin/env node

import * as sass from 'sass';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const inputDir = path.join(dirname, 'scss');
const outputDir = path.join(dirname, 'dist');

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
  const directory = path.dirname(filePath);
  if (fs.existsSync(directory)) {
    return true;
  }
  ensureDirectoryExistence(directory);
  fs.mkdirSync(directory);
  return true;
}

async function compileSass(inputPath, outputPath) {
  const result = sass.compile(inputPath, {
    style: 'compressed',
  });

  const postcssResult = await postcss([autoprefixer]).process(result.css, { from: undefined });

  ensureDirectoryExistence(outputPath);
  fs.writeFileSync(outputPath, postcssResult.css);
  console.log(`Compiled ${inputPath} to ${outputPath}`);
}

async function compileAllSassFiles() {
  clearOutputDir(); // Clear the output directory before compiling

  try {
    const files = await glob(`${inputDir}/**/*.scss`);

    const compilePromises = files.map((file) => {
      const inputPath = file;
      const outputPath = path.join(
        outputDir,
        path.relative(inputDir, file).replace('.scss', '.css'),
      );
      return compileSass(inputPath, outputPath);
    });

    await Promise.all(compilePromises);
  } catch (err) {
    console.error('Error finding SCSS files:', err);
    process.exit(1);
  }
}

compileAllSassFiles();
