<div id="page-wrapper"><div id="page">

  <div id="header-wrapper"><div id="header"><?php print render($page['header']); ?></div></div>

  <div id="content-wrapper">
  
    <div id="content-wrapper-top"></div>
    
    <div id="content"><div id="content-inner"><div id="content-inner2">
  
      <div id="content-top"><?php print render($page['content_top']); ?></div>
    
      <div id="messages"><?php print $messages; ?></div>
    
      <div id="content-center"><?php print render($page['content']); ?></div>
    
      <div id="content-bottom"><?php print render($page['content_bottom']); ?></div>
    
    </div></div></div>
    
    <div id="content-wrapper-bottom"></div>
    
  </div>

  <div id="footer-wrapper"><div id="footer"><?php print render($page['footer']); ?></div></div>

</div></div>
