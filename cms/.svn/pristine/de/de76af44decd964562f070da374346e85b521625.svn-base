<?php
/**
 * The structure view file of package module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     package
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.modal.html.php';?>
<?php 
$basePath = $this->app->getBasePath();
$files    = json_decode($package->files);
echo '<pre>';
foreach($files as $file => $md5) echo $basePath . $file . "<br />";
echo '</pre>';
?>  
<?php include '../../common/view/footer.modal.html.php';?>
