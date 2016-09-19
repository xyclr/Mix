<?php
/**
 * The finish view file of task module of RanZhi.
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
<?php include '../../common/view/chosen.html.php';?>
<?php include '../../common/view/datepicker.html.php';?>
<form method='post' id='ajaxForm' action='<?php echo $this->createLink('task', 'finish', "taskID=$taskID")?>'>
  <table class='table table-form'>
    <tr>
      <th><?php echo empty($task->team) ? $lang->task->consumed : $lang->task->myConsumption;?></th>
      <td><?php echo html::input('consumed', $task->consumed ? $task->consumed : '', "class='form-control' autocomplete='off'")?></td>
    </tr>
    <tr>
      <th><?php echo $lang->task->assignedTo;?></th>
      <td><?php echo html::select('assignedTo', $users, $task->createdBy, "class='form-control'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->task->finishedDate;?></th>
      <td><?php echo html::input('finishedDate', helper::now(), "class='form-control form-datetime'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->comment?></th>
      <td><?php echo html::textarea('comment');?></td>
    </tr>
    <tr>
      <th><?php echo $lang->files;?></th>
      <td><?php echo $this->fetch('file', 'buildForm')?></td>
    </tr>
    <tr>
      <th></th>
      <td><?php echo html::submitButton();?></td>
    </tr>
  </table>
</form>
<?php include '../../common/view/footer.modal.html.php';?>
