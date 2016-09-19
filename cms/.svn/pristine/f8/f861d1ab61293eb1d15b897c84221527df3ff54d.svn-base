<?php
/**
 * The activate file of task module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     task
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.modal.html.php';?>
<?php include '../../common/view/kindeditor.html.php';?>
<?php include '../../common/view/chosen.html.php';?>
<form id='ajaxForm' method='post' action='<?php echo inlink('activate', "taskID=$task->id")?>'>
  <table class='table table-form'>
    <tr>
      <th class='w-80px'><?php echo $lang->task->assignedTo;?></th>
      <td class='w-p45'><?php echo html::select('assignedTo', $users, $task->finishedBy, "class='form-control chosen'");?></td><td></td>
    </tr>
    <tr <?php if(!empty($task->team)) echo "class='hidden'";?>>
      <th><?php echo $lang->task->left;?></th>
      <td>
        <div class='input-group'>
          <?php echo html::input('left', '', "class='form-control'");?>
          <span class='input-group-addon'><?php echo $lang->task->hour;?></span>
        </div>
      </td>
    </tr>
    <tr>
      <th><?php echo $lang->comment;?></th>
      <td colspan='2'><?php echo html::textarea('comment', '', "rows='6' class='w-p98'");?></td>
    </tr>
    <tr>
      <td colspan='3' class='text-center'>
       <?php 
       echo html::submitButton();
       ?>
      </td>
    </tr>
  </table>
</form>
<?php include '../../common/view/footer.modal.html.php';?>
