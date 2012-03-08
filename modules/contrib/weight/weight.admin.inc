<?php

function weight_admin_form() {
  $form['remove'] = array(
    '#type' => 'fieldset',
    '#title' => t('Remove instances'),
    '#collapsible' => TRUE,
  );

  $form['remove']['remove_text'] = array(
    '#markup' => '<p>' . t('Before the weight module can be uninstalled, all
			field instances need to be removed. Click the button below to remove them.
			WARNING: This will delete all current weights!') . '</p>',
  );

  $form['remove']['remove_instances'] = array(
    '#type' => 'submit',
    '#value' => t('Remove instances'),
    '#submit' => array('weight_remove_instances_submit'),
  );

  return $form;
}

function weight_remove_instances_submit($form, &$form_state) {
  $result = db_query('SELECT type, weight_range FROM {weight_settings}');
  foreach ($result as $row) {
    _weight_delete_instance($row->type, $row->weight_range);
  }

  field_sync_field_status();
  $limit = variable_get('field_purge_batch_size', 10);
  field_purge_batch($limit);
}
