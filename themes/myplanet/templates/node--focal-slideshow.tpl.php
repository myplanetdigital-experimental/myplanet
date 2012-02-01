<div class="focal-slideshow">
  <div class="slides">
    <ul>
      <?php foreach ($node->field_fs_bg_position[LANGUAGE_NONE] as $position) { ?>
        <li class="slide" style="background: url(<?php echo file_create_url($node->field_fs_image[LANGUAGE_NONE][0]['uri']) ?>) no-repeat <?php echo $position['value'] ?>;"></li>
      <?php } ?>
    </ul>
  </div>
  <div class="focal-nav focal-prev"></div>
  <div class="focal-nav focal-next"></div>
</div>