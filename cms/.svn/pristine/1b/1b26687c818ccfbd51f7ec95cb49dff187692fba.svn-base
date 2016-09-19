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
<?php js::set('notAllowed', $lang->task->notAllowed);?>
<?php js::set('groupBy', $groupBy);?>
<?php $this->loadModel('project')->setMenu($projects, $projectID, $orderBy);?>
<div class='with-menu page-content'>
  <div class='boards-container'>
    <div class='boards task-boards clearfix' id='taskKanban'>
    <?php foreach($tasks as $groupKey => $groupTasks):?>
      <div class='board task-board' data-group="<?php echo $groupBy?>" data-key="<?php echo $groupKey;?>" style="width: <?php echo $colWidth?>%">
        <div class='panel'>
          <div class='panel-heading'>
            <?php if(empty($groupKey)):?>
            <?php echo $lang->task->unkown;?>
            <?php elseif($groupBy == 'status'):?>
            <?php echo $lang->task->statusList[$groupKey];?>
            <?php else:?>
            <?php echo zget($users, $groupKey);?>
            <?php endif;?>
          </div>
          <div class='panel-body'>
            <div class='board-list'>
              <?php foreach($groupTasks as $task):?>
              <div class='board-item task' data-id="<?php echo $task->id;?>">
                <div class='task-heading'>
                  <?php if(!empty($task->children)) $task->name .= "&nbsp;<i class='icon icon-plus'></i>"?>
                  <?php echo html::a($this->createLink('task', 'view', "taskID={$task->id}"), $task->name)?>
                  <?php if(!empty($task->team))   echo "<span class='label'>{$lang->task->multipleAB}</span>"?>
                  <?php if(!empty($task->parent)) echo "<span class='label'>{$lang->task->childrenAB}</span>"?>
                </div>
                <?php if(!empty($task->desc)): ?>
                <div class='text-muted'><?php echo trim($task->name) == trim($task->desc) ? '' : $task->desc;?></div>
                <?php endif; ?>
                <div class='task-info clearfix'>
                  <div class='pull-left'>
                  <span class="pri pri-<?php echo $task->pri; ?>">P<?php echo ($task->pri == 0 ? '?' : $task->pri);?></span>
                  <?php if($groupBy != 'status'):?>
                    <span class="task-status text-<?php echo $task->status;?>"><small><?php echo $lang->task->statusList[$task->status];?></small></span>&nbsp;
                  <?php endif;?>
                  <?php if(!empty($task->assignedTo)):?>
                    <span class='task-assignedTo text-muted'><i class='icon-hand-right'></i> <small><?php echo $task->assignedTo;?></small></span>
                  <?php endif;?>
                  </div>
                  <?php if(!empty($task->deadline) and $task->deadline != '0000-00-00'):?>
                  <div class='task-deadline text-warning pull-right'><i class='icon-time'></i> <small><?php echo $task->deadline;?></small></div>
                  <?php endif;?>
                </div>
                <div class='task-actions'>
                  <button type='button' class='btn btn-mini btn-link btn-info-toggle'><i class='icon-angle-down'></i></button>
                  <div class='dropdown'>
                    <button type='button' class='btn btn-mini btn-link dropdown-toggle' data-toggle='dropdown'>
                      <span class='icon-ellipsis-vertical'></span>
                    </button>
                    <div class='dropdown-menu pull-right'>
                      <?php $this->task->buildOperateMenu($task);?>
                    </div>
                  </div>
                </div>
              </div>
              <?php endforeach;?>
            </div>
          </div>
        </div>
      </div>
    <?php endforeach;?>
    </div>
  </div>
</div>
<?php include $app->getModuleRoot() . 'common/view/footer.html.php';?>
