#!/bin/bash

# Go to core
cd ../core
echo "Going to core"

# Make a build
npm run build
echo "Build done!"

# Make a pack
npm pack --pack-destination "../react-test"
echo "Packing done!"

cd ../react-test
echo "Back to react-test!"

# Rename a pack
mv "$(ls *.tgz | head -n 1)" scania-tegel.tgz
echo "Renaming done!"

# Installing
npm install scania-tegel.tgz
echo "Installation of Tegel done!"

# Building
npm run build
echo "Building done!"

