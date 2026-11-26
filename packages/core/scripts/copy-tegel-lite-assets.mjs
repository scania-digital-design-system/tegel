#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

// Source directories (from the root)
const sourceAssetsDir = path.resolve(dirName, '../../../assets');

// Target directory in `tegel-lite`
const targetAssetsDir = path.resolve(dirName, '../../tegel-lite/dist/assets');

function copyDirectory(source, target) {
  if (!fs.existsSync(source)) {
    console.warn(`⚠️ Warning: Source directory does not exist: ${source}`);
    return;
  }

  fs.mkdirSync(target, { recursive: true });

  fs.readdirSync(source).forEach((file) => {
    // Skip macOS metadata files
    if (file === '.DS_Store') {
      return;
    }
    const srcPath = path.join(source, file);
    const destPath = path.join(target, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${file} -> ${destPath}`);
    }
  });
}

// Copy assets into `tegel-lite`
console.log(`Copying assets to ${targetAssetsDir}`);
copyDirectory(sourceAssetsDir, targetAssetsDir);
console.log(`Asset copy complete!`);
