<?php
/**
 * The upload view file of package module of RanZhi.
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
<?php if($canMange['result'] == 'success'):?>
<form method='post' enctype='multipart/form-data' id='uploadForm' action='<?php echo inlink('upload')?>'>
  <div id='responser'></div>
  <div class='input-group'>
    <input type='file' name='file' class='form-control' />
    <div class='input-group-btn'><?php echo html::submitButton($lang->package->install);?></div>
  </div>
</form>
<?php else:?>
<div>
  <?php printf($lang->setOkFile, $canMange['okFile']);?>
  <div class='text-right'><?php echo html::a($this->inlink('upload'), $lang->confirm, "class='btn btn-primary loadInModal'");?></div>
</div>
<?php endif;?>
<?php include '../../common/view/footer.modal.html.php';?>
