<div id="page-wrapper"><div id="page">
  <div id="layer-wrapper"><div id="layer"><?php print render($page['layer']); ?></div></div>
  <div id="header-wrapper"><div id="header"><?php print render($page['header']); ?></div></div>
  <div id="content-wrapper">
    <div id="content-back-top"></div>
    <div id="content-menu-divider"></div>
    <div id="content-menu-divider-2"></div>
    <div id="content-back"></div>
    <div id="sub-menu"><?php print render($page['sub_menu']); ?></div>
    <div id="content"><div id="content-inner">
      <div id="content-top"><?php print render($page['content_top']); ?></div>
      <?php print $messages; ?>
      <div id="content-center"><?php print render($page['content']); ?></div>
      <div id="content-bottom"><?php print render($page['content_bottom']); ?></div>
      <div id="breadcrumb"><?php print $breadcrumb; ?></div>
    </div></div>
    <div id="content-back-bottom"></div>
  </div>
  <div id="footer-wrapper"><div id="footer"><?php print render($page['footer']); ?></div></div>
</div></div>
