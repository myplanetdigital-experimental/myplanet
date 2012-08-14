<?php
/**
 * @file
 * base_roles.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function base_roles_user_default_roles() {
  $roles = array();

  // Exported role: administrator.
  $roles['administrator'] = array(
    'name' => 'administrator',
    'weight' => '2',
  );

  // Exported role: editor.
  $roles['editor'] = array(
    'name' => 'editor',
    'weight' => '3',
  );

  // Exported role: writer.
  $roles['writer'] = array(
    'name' => 'writer',
    'weight' => '4',
  );

  return $roles;
}
