#!/usr/bin/env bash

echo -e "Removing Current build dir \n"
rm -rf geomap/build

echo -e "Building bundle \n"
yarn --cwd geomap build

touch geomap/build/.nojekyl

echo -e "Setting up deployment to gh-pages\n"
git init geomap/build
git -C geomap/build add .
git -C geomap/build commit -m "Initial commit"
git -C geomap/build remote add origin git@github.com:yevgenybulochnik/medimap-lite.git
git -C geomap/build push --force origin master:gh-pages
