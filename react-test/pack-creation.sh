#!/bin/bash

# Go to core
cd ../core
echo "Going to core"

# Make a build
npm run build
echo "Build done!"

# Make a link
npm link
echo "Link done!"

# Make a pack
#npm pack --pack-destination "../react-test"
#echo "Packing done!"

cd ../react-test
echo "Back to react-test!"

# Rename a pack
#mv "$(ls *.tgz | head -n 1)" scania-tegel.tgz
#echo "Renaming done!"

# Linking
npm link @scania/tegel
echo "Linking done!"

# Building
npm run build
echo "Building done!"
