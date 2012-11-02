#!/bin/sh
# Travis Testing Script for CI Testing
cd ..
bash casperjs/bin/casperjs test profile/tmp/tests/casperjs/

# Install + Run Selenium Testing Suite
wget http://selenium.googlecode.com/files/selenium-server-standalone-2.15.0.jar
java -jar selenium-server-standalone-2.15.0.jar -htmlSuite "*firefox" "http://127.0.0.1:8080" "drupal_wet/profiles/wetkit/tests/selenium/WetKitTestSuite.html" "drupal_wet/profiles/wetkit/tests/selenium/Result.html"
