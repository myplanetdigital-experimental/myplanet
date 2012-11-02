#!/bin/sh
# Travis Testing Script for CI Testing

# Prepare PhantomJS
echo "PhantomJS version: `phantomjs --version`"
sh -e /etc/init.d/xvfb start

# Install CasperJS Testing Suite
cd ..
git clone git://github.com/n1k0/casperjs.git --branch=${CASPERJS_VERSION}
