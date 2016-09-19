<?php
/**
 * The start view file of task module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     task
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.modal.html.php';?>
<?php include '../../common/view/kindeditor.html.php';?>
<?php include '../../common/view/datepicker.html.php';?>
<form method='post' id='startForm' action='<?php echo $this->createLink('task', 'start', "taskID=$taskID")?>'>
  <table class='table table-form'>
    <tr>
      <th class='w-80px'><?php echo $lang->task->realStarted;?></th>
      <td class='w-p40'><?php echo html::input('realStarted', helper::today(), "class='form-control form-date'");?></td><td></td>
    </tr>
    <tr>
      <th><?php echo $lang->task->consumed;?></th>
      <td><div class='input-group'><?php echo html::input('consumed', $task->consumed, "class='form-control'");?> <span class='input-group-addon'><?php echo $lang->task->hour;?></span></div></td><td></td>
    </tr>
    <tr>
      <th><?php echo $lang->task->left;?></th>
      <td><div class='input-group'><?php echo html::input('left', $task->left, "class='form-control'");?> <span class='input-group-addon'><?php echo $lang->task->hour;?></span></div></td><td></td>
    </tr>
    <tr>
      <th><?php echo $lang->comment;?></th>
      <td colspan='2'><?php echo html::textarea('comment', '', "rows='6' class='form-control'");?></td>
    </tr>
    <tr>
      <th></th><td colspan='2'><?php echo html::submitButton() . html::hidden('doStart', '');?></td>
    </tr>
  </table>
</form>
<?php include '../../common/view/footer.modal.html.php';?>
