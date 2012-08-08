api = 2
core = 7.x

; ; TEMPLATE
; projects[][subdir] = contrib
; projects[][version] =
; ; This is the issue title: http://drupal.org/node/xxxxxxx#comment-xxxxxxx
; projects[][patch][] =

; Requires Drush 5.5 to work
defaults[projects][subdir] = contrib

; MODULES
; Ascending Alphabetical order from the module name

projects[admin_menu][version] = 3.0-rc3
projects[admin_views][version] = 1.0-alpha1
projects[beautytips][version] = 2.0-beta2
projects[bueditor][version] = 1.4
projects[calendar][version] = 3.4
projects[calendar_tooltips][version] = 2.1
projects[ctools][version] = 1.0
projects[date][version] = 2.5
projects[entity][version] = 1.0-rc3
projects[entityreference][version] = 1.0-rc3
projects[entityreference_view_widget][version] = 1.0-alpha2
projects[features][version] = 1.0-rc3
projects[geolocation][version] = 1.1
projects[image_resize_filter][version] = 1.13
projects[imce][version] = 1.5
projects[libraries][version] = 2.0-alpha2
projects[logintoboggan][version] = 1.3
projects[panels][version] = 3.2
projects[panels_breadcrumbs][version] = 1.6
projects[panels_everywhere][version] = 1.0-alpha1
projects[pathauto][version] = 1.1
projects[quickbar][version] = 2.0-beta1
projects[realname][version] = 1.0
projects[token][version] = 1.1
projects[twitter_pull][version] = 1.0-rc1
projects[views][version] = 3.3
projects[views_bulk_operations][version] = 3.0-rc1
projects[views_field_view][version] = 1.0-rc3
projects[views_slideshow][version] = 3.0
projects[views_tree][version] = 2.0
projects[webform][version] = 3.18
projects[webform_ajax][version] = 1.0
projects[weight][version] = 2.0

; THEMES

; LIBRARIES

libraries[kcfinder][download][type] = file
libraries[kcfinder][download][url] = http://sourceforge.net/projects/kcfinder/files/KCFinder/2.51/kcfinder-2.51.tar.gz/download

; Currently using v2.9998 (v2.9999.5 is most recent)
libraries[jquery.cycle][download][type] = file
libraries[jquery.cycle][download][url] = https://raw.github.com/myplanetdigital/cycle/cc6a55e/jquery.cycle.all.js

libraries[swfupload][download][type] = file
libraries[swfupload][download][url] = http://swfupload.googlecode.com/files/SWFUpload%20v2.2.0.1%20Core.zip

libraries[excanvas_r3][download][type] = file
libraries[excanvas_r3][download][url] = http://explorercanvas.googlecode.com/files/excanvas_r3.zip
libraries[excanvas_r3][destination] = modules/contrib/beautytips/other_libs
