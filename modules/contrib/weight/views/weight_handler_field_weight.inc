<?php

class weight_handler_field_weight extends views_handler_field_field {
  function render_items($items) {
    return '<!--form-item-' . $this->options['id'] . '--' . $this->view->row_index . '-->';
  }

  function views_form(&$form, &$form_state) {
    // The view is empty, abort.
    if (empty($this->view->result)) {
      return;
    }

    // Initialize $nids array to store nids for saving weights.
    $nids = array();

    // Get the weight field settings.
    $settings = _weight_get_settings();

    $field_name = $this->options['id'];
    $form[$field_name] = array(
      '#tree' => TRUE,
    );
    // At this point, the query has already been run, so we can access the results
    foreach ($this->view->result as $row_id => $row) {
      $type = $row->_field_data['nid']['entity']->type;
      if (!empty($row->field_weight)) {
        $weight = $row->field_weight[0]['raw'];
      }
      else {
        if (array_key_exists($type, $settings)) {
          $weight = $settings[$type]['default'];
        }
        else {
          $weight = 0;
        }
      }
      $nids[] = $row->nid;
      if (array_key_exists($type, $settings)) {
        $options = _weight_get_options($settings[$type]['range']);
      }
      else {
        $options = array(0);
      }
      $form[$field_name][$row_id][$row->nid] = array(
        '#type' => 'select',
        '#options' =>  $options,
        '#default_value' => $weight,
        '#attributes' => array('class' => array('weight-weight')),
      );
    }

    $form['nids'] = array(
      '#type' => 'value',
      '#value' => $nids,
    );

    $form['#action'] = request_uri();
    $form['#submit'][] = 'weight_views_submit';
  }
}
