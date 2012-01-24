<div id="page-wrapper"><div id="page">
  <div id="header-wrapper"><div id="header"><?php print render($page['header']); ?></div></div>
  <div id="content-wrapper">
    <div id="content-back-top"></div>
    <div id="content-menu-divider"></div>
    <div id="content-back"></div>
    <div id="content"><div id="content-inner">
      <div id="content-top"><?php print render($page['content_top']); ?></div>
      <?php print $messages; ?>
      <div id="content-center"><?php print render($page['content']); ?></div>
      <div id="content-bottom"><?php print render($page['content_bottom']); ?></div>
    </div></div>
    <div id="content-back-bottom"></div>
  </div>
  <div id="footer-wrapper"><div id="footer"><?php print render($page['footer']); ?></div></div>
</div></div>
