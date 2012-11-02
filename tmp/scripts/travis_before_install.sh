#!/bin/sh
# Travis Testing Script for CI Testing

# Run Headless Testing Server
echo "PhantomJS version: `phantomjs --version`"
export PHANTOMJS_EXECUTABLE='phantomjs --local-to-remote-url-access=yes --ignore-ssl-errors=yes'
export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start

# Install CasperJS Testing Suite
cd ..
pwd
git clone git://github.com/n1k0/casperjs.git --branch=tags/${CASPERJS_VERSION}
