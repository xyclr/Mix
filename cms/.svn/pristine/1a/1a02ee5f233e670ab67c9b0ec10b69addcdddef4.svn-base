<?php
/**
 * The transfer view file of thread module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     thread
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<div class='modal-dialog w-600px'>
  <div class='modal-content'>
    <div class='modal-header'>
      <?php echo html::closeButton();?>
      <h4 class='modal-title'><i class='icon-edit'></i> <?php echo $lang->thread->transfer;?></h4>
    </div>
    <div class='modal-body'>
      <form id='ajaxForm' class='form-horizontal' action='<?php echo inlink('transfer', "threadID={$thread->id}")?>'  method='post'>
        <div class='form-group'>
          <label for='link' class='col-xs-3 control-label'><?php echo $lang->thread->board;?></label>
          <div class='col-xs-8'>
            <?php echo html::select('targetBoard', $boards, $thread->board, "class='form-control chosen'");?>
          </div>
        </div>
        <div class='form-group'>
          <div class='col-xs-3'></div>
          <div class='col-xs-8'>
            <?php echo html::submitButton();?>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<?php if(isset($pageJS)) js::execute($pageJS);?>
