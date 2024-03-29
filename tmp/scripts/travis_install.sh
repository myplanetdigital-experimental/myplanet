#!/bin/sh
# Travis Install Script for CI Testing

# MySQL Create Database
mysql -e "CREATE DATABASE ${PROJECT_NAME};"

# Install Drush
pear channel-discover pear.drush.org
pear install drush/drush-${DRUSH_VERSION}.0
phpenv rehash

# Install WetKit Distro
cd ..
export WORKSPACE=`pwd`
mv ${PROJECT_NAME} profile
cd $WORKSPACE/profile
drush make build-${PROJECT_NAME}.make $WORKSPACE/build \
  --prepare-install \
  --yes
cd $WORKSPACE/build
drush site-install ${PROJECT_NAME} \
  --db-url=mysql://root:@127.0.0.1/${PROJECT_NAME} \
  --sites-subdir=default \
  --account-name=admin \
  --account-pass=admin \
  --site-mail=admin@example.com \
  --site-name=${PROJECT_NAME} \
  --yes
drush cc all --yes
drush runserver --server=builtin 8080 &
