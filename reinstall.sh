#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

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

# Function to remove node_modules and package-lock.json safely
clean_directory() {
  if [ -d "$1/node_modules" ]; then
    echo "Removing node_modules in $1"
    rm -rf "$1/node_modules"
  fi
  if [ -f "$1/package-lock.json" ]; then
    echo "Removing package-lock.json in $1"
    rm -rf "$1/package-lock.json"
  fi
}

# Clean root node_modules and package-lock.json
echo "removing node modules and package-lock.json in $PWD"
clean_directory "$PWD"

# Clean npm cache
echo "Cleaning npm cache"
npm cache clean --force

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
  # Final confirmation message
  echo "Installation process completed successfully!"
done