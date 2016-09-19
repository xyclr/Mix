<?php
/**
 * The deactivate view file of package module of RanZhi.
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
<?php if(isset($error) and $error):?>
<div class='alert alert-danger'>
  <i class='icon-info-sign'></i>
  <div class='content'><?php $error;?></div>
</div>
<?php else:?>
<div class='alert alert-success'>
  <i class='icon-ok-sign'></i>
  <div class='content'>
    <h3><?php echo $title;?></h3>
    <p class='text-center'><?php echo html::a(inlink('browse', 'type=installed'), $lang->package->viewInstalled, "class='btn'");?></p>
  </div>
</div>
<?php endif;?>
<?php include '../../common/view/footer.modal.html.php';?>
