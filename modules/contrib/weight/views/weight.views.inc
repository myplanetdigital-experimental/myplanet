<?php

/**
 * Implements hook_views_data().
 */
function weight_views_data() {
  $data['weight_settings']['table']['join']['node'] = array(
    'left_field' => 'type',
    'field' => 'type',
  );

  $data['weight_settings']['weight_enabled'] = array(
    'group' => t('Weight'),
    'title' => t('Enabled'),
    'help' => t('Displays nodes that are Weight enabled'),
    'filter' => array(
      'handler' => 'weight_handler_filter_weight_enabled',
    ),
  );

  return $data;
}

/**
 * Implements hook_views_data_alter().
 */
function weight_views_data_alter(&$data) {
  $data['field_data_weight']['weight']['group'] = t('Weight');
  $data['field_data_weight']['weight']['field']['handler'] = 'weight_handler_field_weight';
  $data['field_data_weight']['weight_value']['group'] = t('Weight');
}

/**
 * Implements of hook_views_handlers().
 */
function weight_views_handlers() {
  return array(
    'info' => array(
      'path' => drupal_get_path('module', 'weight') . '/views',
    ),
    'handlers' => array(
      'weight_handler_field_weight' => array(
        'parent' => 'views_handler_field_field',
      ),
      'weight_handler_filter_weight_enabled' => array(
        'parent' => 'views_handler_filter',
      ),
    ),
  );
}
