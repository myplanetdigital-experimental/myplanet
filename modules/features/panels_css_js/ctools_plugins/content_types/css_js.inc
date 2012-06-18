<?php

$plugin = array (
  'single' => true,
  'icon' => 'icon_page.png',
  'title' => t('CSS & JS files'),
  'description' => t('Add additional CSS & JS files.'),
  'category' => t('Page elements'),
  'defaults' => array(
    'override_title' => false,
    'override_title_text' => '',
    'panels_css_js_css' => '',
    'panels_css_js_js' => '',
  ),
);

function panels_css_js_css_js_content_type_edit_form($form, &$form_state) {
  $conf = &$form_state['conf'];
  panels_css_js_edit_form($form, $conf);
  return $form;
}

function panels_css_js_css_js_content_type_edit_form_submit($form, &$form_state) {
  $conf = &$form_state['conf'];
  panels_css_js_edit_form_submit($form_state, $conf);
}

function panels_css_js_css_js_content_type_render($subtype, $conf, $panel_args, $context) {
  if (!isset($conf['panels_css_js_css'])) {
    return;
  }
  panels_css_js_render($conf);
}
