<?php
// Site myplanet, environment dev
$aliases['dev'] = array(
  'parent' => '@parent',
  'site' => 'myplanet',
  'env' => 'dev',
  'root' => '/var/www/html/myplanet.dev/docroot',
  'remote-host' => 'srv-168.devcloud.hosting.acquia.com',
  'remote-user' => 'myplanet',
);
// Site myplanet, environment test
$aliases['test'] = array(
  'parent' => '@parent',
  'site' => 'myplanet',
  'env' => 'test',
  'root' => '/var/www/html/myplanet.test/docroot',
  'remote-host' => 'srv-168.devcloud.hosting.acquia.com',
  'remote-user' => 'myplanet',
);
// Site myplanet, environment prod
$aliases['prod'] = array(
  'parent' => '@parent',
  'site' => 'myplanet',
  'env' => 'prod',
  'root' => '/var/www/html/myplanet.prod/docroot',
  'remote-host' => 'srv-168.devcloud.hosting.acquia.com',
  'remote-user' => 'myplanet',
);
