<?php
/**
 * The view file of task module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     task
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include $app->getModuleRoot() . 'common/view/header.html.php';?>
<?php if($mode) js::set('mode', $mode);?>
<?php $this->loadModel('project')->setMenu($projects, $projectID, "$orderBy");?>
<li id='bysearchTab'><?php echo html::a('#', "<i class='icon-search icon'></i>" . $lang->search->common)?></li>
<div class='row with-menu page-content'>
  <div class='panel'>
    <table class='table table-hover table-striped tablesorter table-data' id='taskList'>
      <thead>
        <tr class='text-center'>
          <?php $vars = "projectID=$projectID&mode={$mode}&orderBy=%s&recTotal={$pager->recTotal}&recPerPage={$pager->recPerPage}&pageID={$pager->pageID}";?>
          <th class='w-60px'> <?php commonModel::printOrderLink('id',          $orderBy, $vars, $lang->task->id);?></th>
          <th class='w-40px'> <?php commonModel::printOrderLink('pri',         $orderBy, $vars, $lang->task->lblPri);?></th>
          <th>                <?php commonModel::printOrderLink('name',        $orderBy, $vars, $lang->task->name);?></th>
          <th class='w-100px'><?php commonModel::printOrderLink('deadline',    $orderBy, $vars, $lang->task->deadline);?></th>
          <th class='w-80px'> <?php commonModel::printOrderLink('assignedTo',  $orderBy, $vars, $lang->task->assignedTo);?></th>
          <th class='w-90px'> <?php commonModel::printOrderLink('status',      $orderBy, $vars, $lang->task->status);?></th>
          <th class='w-100px visible-lg'><?php commonModel::printOrderLink('createdDate', $orderBy, $vars, $lang->task->createdDate);?></th>
          <th class='w-90px visible-lg'> <?php commonModel::printOrderLink('consumed',    $orderBy, $vars, $lang->task->consumedAB . $lang->task->lblHour);?></th>
          <th class='w-110px visible-lg'> <?php commonModel::printOrderLink('left',       $orderBy, $vars, $lang->task->left . $lang->task->lblHour);?></th>
          <th class='w-240px'><?php echo $lang->actions;?></th>
        </tr>
      </thead>
      <tbody>
        <?php foreach($tasks as $task):?>
        <tr class='text-center' data-url='<?php echo $this->createLink('task', 'view', "taskID=$task->id"); ?>'>
          <td><?php echo $task->id;?></td>
          <td><span class='active pri pri-<?php echo $task->pri; ?>'><?php echo $lang->task->priList[$task->pri];?></span></td>
          <td class='text-left'>
            <?php if($task->parent != 0) echo "<span class='label'>{$lang->task->childrenAB}</span>"?>
            <?php if(!empty($task->team)) echo "<span class='label'>{$lang->task->multipleAB}</span>"?>
            <?php echo $task->name;?>
            <?php if(!empty($task->children)) echo "<span class='task-toogle'>&nbsp;&nbsp;<i class='icon icon-minus'></i>&nbsp;&nbsp;</span>"?>
          </td>
          <td><?php echo $task->deadline;?></td>
          <td><?php if(isset($users[$task->assignedTo])) echo $users[$task->assignedTo];?></td>
          <td><?php echo zget($lang->task->statusList, $task->status);?></td>
          <td class='visible-lg'><?php echo substr($task->createdDate, 0, 10);?></td>
          <td class='visible-lg'><?php echo $task->consumed;?></td>
          <td class='visible-lg'><?php echo $task->left;?></td>
          <td class='text-left'><?php $this->task->buildOperateMenu($task);?></td>
        </tr>
        <?php if(!empty($task->children)):?>
        <tr class='tr-child'>
          <td colspan='10'>
            <table class='table table-data table-hover'>
              <?php foreach($task->children as $child):?>
              <tr class="text-center" data-url='<?php echo $this->createLink('task', 'view', "taskID=$child->id"); ?>'>
                <td class='w-60px'><?php echo $child->id;?></td>
                <td class='w-40px'><span class='active pri pri-<?php echo $child->pri; ?>'><?php echo $lang->task->priList[$child->pri];?></span></td>
                <td class='text-left'>
                  <span class='label'><?php echo $lang->task->childrenAB?></span>
                  <?php echo $child->name;?>
                </td>
                <td class='w-100px'>  <?php echo $child->deadline;?></td>
                <td class='w-80px'>   <?php if(isset($users[$child->assignedTo])) echo $users[$child->assignedTo];?></td>
                <td class='w-90px'>   <?php echo zget($lang->task->statusList, $child->status);?></td>
                <td class='w-100px visible-lg'><?php echo substr($child->createdDate, 0, 10);?></td>
                <td class='w-90px visible-lg'> <?php echo $child->consumed;?></td>
                <td class='w-110px visible-lg'><?php echo $child->left;?></td>
                <td class='w-240px text-left'><?php $this->task->buildOperateMenu($child);?></td>
              </tr>
              <?php endforeach;?>
            </table>
          </td>
        </tr>
        <?php endif;?>
        <?php endforeach;?>
      </tbody>
      <tfoot><tr><td colspan='10'><?php $pager->show();?></td></tr></tfoot>
    </table>
  </div>
</div>
<?php include $app->getModuleRoot() . 'common/view/footer.html.php';?>
