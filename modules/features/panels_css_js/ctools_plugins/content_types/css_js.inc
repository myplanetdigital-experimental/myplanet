<?php

/**
 * @file
 * Contains the ctools content type plugin for adding CSS & JS files.
 * You can find this item unser "Page elements tab".
 */

/**
 * Plugins are described by creating a $plugin array which will be used
 * by the system that includes this file.
 */
$plugin = array(
  'single' => TRUE,
  'icon' => 'icon_page.png',
  'title' => t('CSS & JS files'),
  'description' => t('Add additional CSS & JS files.'),
  'category' => t('Page elements'),
  'defaults' => array(
    'override_title' => FALSE,
    'override_title_text' => '',
    'panels_css_js_css' => '',
    'panels_css_js_js' => '',
  ),
);

/**
 * CSS & JS settings form for Content Type.
 */
function panels_css_js_css_js_content_type_edit_form($form, &$form_state) {
  $conf = &$form_state['conf'];
  panels_css_js_edit_form($form, $conf);
  return $form;
}

/**
 * Handles CSS & JS settings form submission for Content Type.
 */
function panels_css_js_css_js_content_type_edit_form_submit($form, &$form_state) {
  $conf = &$form_state['conf'];
  panels_css_js_edit_form_submit($form_state, $conf);
}

/**
 * Implements hook_content_type_render().
 * When a Panels item is rendered, add CSS & JS files for Content Type.
 */
function panels_css_js_css_js_content_type_render($subtype, $conf, $panel_args, $context) {
  if (!isset($conf['panels_css_js_css'])) {
    return;
  }
  panels_css_js_render($conf);
}
