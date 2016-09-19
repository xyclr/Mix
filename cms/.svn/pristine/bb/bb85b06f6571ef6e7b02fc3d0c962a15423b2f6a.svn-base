<?php
/**
 * The view view file of task module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     task
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include $app->getModuleRoot() . 'common/view/header.html.php';?>
<?php $this->loadModel('project')->setMenu($projects, $projectID);?>
<?php if($task->parent != 0):?>
<div class='addonMenu'>
  <li class='divider angle'></li>
  <li><?php echo html::a($this->createLink('task', 'view', "id={$task->parent}"), $lang->task->parent)?></li>
</div>
<?php endif;?>
<div class='with-menu page-content'>
  <div class='row-table'>
    <div class='col-main'>
      <div class='panel'>
        <div class='panel-heading'>
          <?php if(!empty($task->team)) echo "<span class='label'>{$lang->task->multipleAB}</span>"?>
          <strong><?php echo $task->name;?></strong>
        </div>
        <div class='panel-body'>
          <?php echo $task->desc;?>
          <div><?php echo $this->fetch('file', 'printFiles', array('files' =>$task->files, 'fieldset' => 'false'))?></div>
        </div>
      </div>
      <?php if(!empty($task->children)):?>
      <div class='panel'>
        <div class='panel-heading'><strong><?php echo $this->lang->task->children;?></strong></div>
        <table class='table table-hover table-data table-fixed'>
          <tr class='text-center'>
            <th class='w-60px'> <?php echo$lang->task->id;?></th>
            <th class='w-40px'> <?php echo$lang->task->lblPri;?></th>
            <th>                <?php echo$lang->task->name;?></th>
            <th class='w-100px'><?php echo$lang->task->deadline;?></th>
            <th class='w-80px'> <?php echo$lang->task->assignedTo;?></th>
            <th class='w-90px'> <?php echo$lang->task->status;?></th>
            <th class='w-50px visible-lg'> <?php echo $lang->task->consumedAB . $lang->task->lblHour;?></th>
            <th class='w-50px visible-lg'><?php echo $lang->task->leftAB . $lang->task->lblHour;?></th>
            <th class='w-200px'><?php echo $lang->actions;?></th>
          </tr>
          <?php foreach($task->children as $child):?>
          <tr class='text-center' data-url='<?php echo $this->createLink('task', 'view', "taskID=$child->id"); ?>'>
            <td><?php echo $child->id;?></td>
            <td><span class='active pri pri-<?php echo $child->pri; ?>'><?php echo $lang->task->priList[$child->pri];?></span></td>
            <td class='text-left'><?php echo $child->name;?></td>
            <td><?php echo $child->deadline;?></td>
            <td><?php if(isset($users[$child->assignedTo])) echo $users[$child->assignedTo];?></td>
            <td><?php echo zget($lang->task->statusList, $child->status);?></td>
            <td class='visible-lg'><?php echo $child->consumed;?></td>
            <td class='visible-lg'><?php echo $child->left;?></td>
            <td><?php $this->task->buildOperateMenu($child);?></td>
          </tr>
          <?php endforeach;?>
        </table>
      </div>
      <?php endif;?>
      <?php echo $this->fetch('action', 'history', "objectType=task&objectID={$task->id}");?>
      <div class='page-actions'>
        <?php
        $this->task->buildOperateMenu($task, 'btn', 'view');

        $browseLink = $this->session->taskList ? $this->session->taskList : inlink('browse', "project=$task->project");
        commonModel::printRPN($browseLink, $preAndNext);
        ?>
      </div>
    </div>
    <div class='col-side'>
      <div class='panel'>
        <div class='panel-heading'><strong><?php echo $lang->task->basicInfo?></strong></div>
        <div class='panel-body'>
          <table class='table table-info'>
            <tr>
              <th class='w-80px'><?php echo $lang->task->project;?></th>
              <td><?php echo $projects[$task->project];?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->assignedTo;?></th>
              <td><?php echo zget($members, $task->assignedTo, $task->assignedTo);?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->status;?></th>
              <td><?php echo $lang->task->statusList[$task->status];?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->pri;?></th>
              <td><?php echo $lang->task->priList[$task->pri];?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->deadline;?></th>
              <td><?php echo $task->deadline;?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->estimate;?></th>
              <td><?php echo $task->estimate;?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->consumed;?></th>
              <td><?php echo $task->consumed;?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->left;?></th>
              <td><?php echo $task->left;?></td>
            </tr>
          </table>
        </div>
      </div>
      <?php if(!empty($task->team)):?>
      <div class='panel'>
        <table class='table table-data'>
          <thead>
            <tr>
              <th><?php echo $lang->task->team?></th>
              <th class='text-center'><?php echo $lang->task->estimate?></th>
              <th class='text-center'><?php echo $lang->task->consumed?></th>
              <th class='text-center'><?php echo $lang->task->left?></th>
            </tr>
          </thead>
          <?php foreach($task->team as $member):?>
          <tr class='text-center'>
            <td class='text-left'><?php echo zget($members, $member->account)?></td>
            <td><?php echo $member->estimate?></td>
            <td><?php echo $member->consumed?></td>
            <td><?php echo $member->left?></td>
          </tr>
          <?php endforeach;?>
        </table>
      </div>
      <?php endif;?>
      <div class='panel'>
        <div class='panel-heading'><strong><?php echo $lang->task->life?></strong></div>
        <div class='panel-body'>
          <table class='table table-info'>
            <tr>
              <th class='w-80px'><?php echo $lang->task->createdBy;?></th>
              <td><?php echo zget($users, $task->createdBy, $task->createdBy) . $lang->at . $task->createdDate;?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->finishedBy;?></th>
              <td><?php if($task->finishedBy) echo zget($users, $task->finishedBy, $task->finishedBy) . $lang->at . $task->finishedDate;?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->canceledBy;?></th>
              <td><?php if($task->canceledBy) echo zget($users, $task->canceledBy, $task->canceledBy) . $lang->at . $task->canceledDate;?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->closedBy;?></th>
              <td><?php if($task->closedBy) echo zget($users, $task->closedBy, $task->closedBy) . $lang->at . $task->closedDate;?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->closedReason;?></th>
              <td><?php echo $lang->task->reasonList[$task->closedReason];?></td>
            </tr>
            <tr>
              <th><?php echo $lang->task->lastEditedBy;?></th>
              <td><?php if($task->editedBy) echo zget($users, $task->editedBy, $task->editedBy) . $lang->at . $task->editedDate;?></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<?php include $app->getModuleRoot() . 'common/view/footer.html.php';?>
