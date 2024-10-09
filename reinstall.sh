#!/bin/bash

# Array of directories to go into
directories=(
  "./packages/core"
  "./packages/angular"
  "./packages/angular/projects/components"
  "./packages/angular-17"
  "./packages/angular-17/projects/components"
  "./packages/react"
  # Add more directories as needed
)

echo "removing node modules and package-lock.json in $PWD"
rm -rf node_modules
rm -rf package-lock.json

echo "removing node modules and package-lock.json in subdirectories"

for dir in "${directories[@]}"; do
  echo "removing node modules in $dir"
  rm -rf $dir/node_modules
  echo "removing package-lock.json in $dir"
  rm -rf $dir/package-lock.json
done

echo "installing dependencies in $PWD"
npm i

echo "installing dependencies in subdirectories"

for dir in "${directories[@]}"; do
  if [ -d "$dir" ]; then
    echo "installing dependencies in $dir"
    (cd $dir && npm i)
  else
    echo "Directory $dir does not exist"
  fi
done