#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);

// Configuration options
const config = {
  defaultTargetDir: 'public/assets',
  dryRun: false,
};

// Get custom path from command line argument, if provided
const targetDir = path.resolve(process.cwd(), process.argv[2] || config.defaultTargetDir);

// Determine if we're running from the installed package or from the monorepo
const isInstalledPackage = currentDirPath.includes('node_modules');

// Define the source directories
const sourceDirs = {
  fonts: isInstalledPackage
    ? path.join(currentDirPath, '..', 'dist', 'tegel', 'assets', 'fonts')
    : path.join(currentDirPath, '..', '..', '..', 'assets', 'fonts'),
  logos: isInstalledPackage
    ? path.join(currentDirPath, '..', 'dist', 'tegel', 'assets', 'logos')
    : path.join(currentDirPath, '..', '..', '..', 'assets', 'logos')
};

function copyFonts(sourceDir, targetDir) {
  // Create target directory if it doesn't exist
  if (!config.dryRun) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  try {
    const files = fs.readdirSync(sourceDir);

    files.forEach(file => {
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(targetDir, file);

      // Skip if not a file
      if (!fs.statSync(srcPath).isFile()) return;

      if (config.dryRun) {
        console.log(`Would copy: ${srcPath} to ${destPath}`);
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${destPath}`);
      }
    });
  } catch (error) {
    console.error(`Error copying fonts from ${sourceDir}:`, error);
  }
}

function copyLogos(sourceDir, targetDir) {
  const logoTargetDir = path.join(targetDir, 'logos');

  if (!config.dryRun) {
    fs.mkdirSync(logoTargetDir, { recursive: true });
  }

  // Copy only the local fallback logos
  const fallbackLogos = [
    'scania-wordmark-white.svg',
    'scania-symbol.svg',
    'scania-symbol.png'
  ];

  for (const logo of fallbackLogos) {
    const srcPath = path.join(sourceDir, logo);
    const destPath = path.join(logoTargetDir, logo);

    if (config.dryRun) {
      console.log(`Would copy: ${srcPath} to ${destPath}`);
    } else if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${destPath}`);
    } else {
      console.warn(`Warning: Logo file not found: ${srcPath}`);
    }
  }
}

console.log('Asset copying script started');

// Copy fonts
if (!fs.existsSync(sourceDirs.fonts)) {
  console.error(`Error: Fonts directory does not exist: ${sourceDirs.fonts}`);
} else {
  ['cyrillic', 'latin'].forEach(subdir => {
    const subSourceDir = path.join(sourceDirs.fonts, subdir);
    const subTargetDir = path.join(targetDir, 'fonts', subdir);
    
    if (fs.existsSync(subSourceDir)) {
      copyFonts(subSourceDir, subTargetDir);
    } else {
      console.warn(`Warning: ${subdir} subdirectory not found in fonts source.`);
    }
  });
}

// Copy logos
if (!fs.existsSync(sourceDirs.logos)) {
  console.error(`Error: Logos directory does not exist: ${sourceDirs.logos}`);
} else {
  copyLogos(sourceDirs.logos, targetDir);
}

console.log('Asset copying process complete!');
if (config.dryRun) {
  console.log('This was a dry run. No files were actually copied.');
}
console.log(`Target directory: ${targetDir}`);
console.log('Please ensure your application is configured to serve static files from this location.');