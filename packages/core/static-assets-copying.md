

# Asset Copying Script Usage
This script helps you copy Tegel design system assets (fonts and logos) to your application's public directory.

## Prerequisites

- Node.js installed
- Tegel package installed in your project (@scania/tegel)

## Usage

Run the script using npx:
npx copy-assets

By default, this will copy assets to `./public/assets` in your project root.

### Custom Directory

To copy assets to a different directory, provide the path as an argument:
npx copy-assets custom/assets/path

### Windows
The script script handles path separators correctly because it uses Node.js's path module, which automatically handles path separators for the current operating system. But if Windows users experience problems they can use backward slashes when specifying paths:
npx copy-assets custom/assets/path ❌  
npx copy-assets custom\assets\path ✅

## What Gets Copied

The script will copy:

### Fonts

- Cyrillic fonts to <target-dir>/fonts/cyrillic/
- Latin fonts to <target-dir>/fonts/latin/


### Logos

The following logos will be copied to <target-dir>/logos/:

- scania-wordmark-white.svg
- scania-symbol.svg
- scania-symbol.png

## Verification
After running the script:

1. Check the console output for any warnings or errors
2. Verify that the assets have been copied to the target directory
3. Ensure your application is configured to serve static files from the target directory

## Troubleshooting
If you encounter issues:
- Verify that the Tegel package is properly installed
- Check if your target directory is writable
- Review console output for specific error messages