<?php
/**
 * The importtask view file of project module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     project 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php $this->project->setMenu($this->projects, $projectID);?>
<div class='row page-content'>
  <div class='panel'>
    <div class='panel-heading'>
      <strong><i class='icon-upload-alt'></i> <?php echo $lang->project->importTask;?></strong>
      <div class='input-group pull-right'>
        <?php $projects = array(0 => $lang->project->fromproject) + $projects;?>
        <span class='input-group-addon'><strong><?php echo $lang->project->selectProject;?></strong></span>
        <?php  echo html::select('fromproject', $projects, $fromProject, "onchange='reload($projectID, this.value)' class='form-control chosen'");?>
      </div>
    </div>
    <form id='ajaxForm' class='form-condensed' method='post' target='hiddenwin'>
      <table class='table tablesorter'>
        <thead>
        <tr class='text-center'>
          <th class='w-id'><?php echo $lang->task->id;?></th>
          <th class='w-200px {sorter:false}'><?php echo $lang->project->name ?></th>
          <th class='w-pri'><?php echo $lang->task->lblPri;?></th>
          <th><?php echo $lang->task->name;?></th>
          <th class='w-80px'><?php echo $lang->task->assignedTo;?></th>
          <th class='w-90px visible-lg'><?php echo $lang->task->consumedAB . $lang->task->lblHour;?></th>
          <th class='w-110px'><?php echo $lang->task->left . $lang->task->lblHour;?></th>
          <th class='w-100px'><?php echo $lang->task->deadline;?></th>
          <th class='w-90px'><?php echo $lang->task->status;?></th>
        </tr>
        </thead>
        <tbody>
          <?php foreach($tasks2Imported as $task):?>
          <?php $class = $task->assignedTo == $app->user->account ? 'style=color:red' : '';?>
          <tr class='text-center'>
            <td>
            <input type='checkbox' name='tasks[]' value='<?php echo $task->id;?>' />
            <?php if(!commonModel::printLink('task', 'view', "task=$task->id", sprintf('%03d', $task->id))) printf('%03d', $task->id);?>
            </td>
            <td><?php echo $projects[$task->project];?></td>
            <td><span class='active pri pri-<?php echo $task->pri; ?>'><?php echo $lang->task->priList[$task->pri];?></span></td>
            <td class='text-left nobr'><?php if(!commonModel::printLink('task', 'view', "task=$task->id", $task->name)) echo $task->name;?></td>
            <td <?php echo $class;?>><?php if(isset($users[$task->assignedTo])) echo $users[$task->assignedTo];?></td>
            <td class='visible-lg'><?php echo $task->consumed;?></td>
            <td class='visible-lg'><?php echo $task->left;?></td>
            <td><?php echo $task->deadline;?></td>
            <td><?php echo zget($lang->task->statusList, $task->status);?></td>
          </tr>
          <?php endforeach;?>
          <tfoot>
            <tr>
              <td colspan='9'>
                <div class='table-actions clearfix'>
                  <div class='btn-group'><?php echo html::selectButton();?></div>
                  <?php echo html::submitButton($lang->project->importTask) . html::hidden('referer', $this->server->http_referer);?>
                </div>
              </td>
            </tr>
          </tfoot>
        </tbody>
      </table>
    </form>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
