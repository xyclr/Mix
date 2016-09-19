<?php
/**
 * The browse view file of leave module of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     leave
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/treeview.html.php';?>
<?php js::set('confirmReview', $lang->leave->confirmReview)?>
<div id='menuActions'>
  <?php commonModel::printLink('leave', 'create', "", "<i class='icon icon-plus'></i> {$lang->leave->create}", "data-toggle='modal' class='btn btn-primary'")?>
</div>
<div class='with-side'>
  <div class='side'>
    <div class='panel panel-sm'>
      <div class='panel-body'>
        <ul class='tree' data-collapsed='true'>
          <?php foreach($yearList as $year):?>
          <li class='<?php echo $year == $currentYear ? 'active' : ''?>'>
            <?php commonModel::printLink('leave', $type, "date=$year", $year);?>
            <ul>
              <?php foreach($monthList[$year] as $month):?>
              <li class='<?php echo ($year == $currentYear and $month == $currentMonth) ? 'active' : ''?>'>
                <?php commonModel::printLink('leave', $type, "date=$year$month", $year . $month);?>
              </li>
              <?php endforeach;?>
            </ul>
          </li>
          <?php endforeach;?>
        </ul>
      </div>
    </div>
  </div>
  <div class='main'>
    <div class='panel'>
      <table class='table table-data table-hover text-center table-fixed'>
        <thead>
          <tr class='text-center'>
            <th class='w-80px'> <?php echo $lang->leave->id;?></th>
            <th class='w-80px'><?php echo $lang->leave->createdBy;?></th>
            <th class='w-100px'><?php echo $lang->user->dept;?></th>
            <th class='w-80px'><?php echo $lang->leave->type;?></th>
            <th class='w-150px'><?php echo $lang->leave->begin;?></th>
            <th class='w-150px'><?php echo $lang->leave->end;?></th>
            <th><?php echo $lang->leave->desc;?></th>
            <th class='w-80px'><?php echo $lang->leave->status;?></th>
            <?php if($type != 'browseReview'):?>
            <th class='w-80px'><?php echo $lang->leave->reviewedBy;?></th>
            <?php endif;?>
            <?php if($type != 'company'):?>
            <th class='w-150px'><?php echo $lang->actions;?></th>
            <?php endif;?>
          </tr>
        </thead>
        <?php foreach($leaveList as $leave):?>
        <tr>
          <td><?php echo $leave->id;?></td>
          <td><?php echo zget($users, $leave->createdBy);?></td>
          <td><?php echo zget($deptList, $leave->dept);?></td>
          <td><?php echo zget($this->lang->leave->typeList, $leave->type);?></td>
          <td><?php echo $leave->begin . ' ' . $leave->start;?></td>
          <td><?php echo $leave->end . ' ' . $leave->finish;?></td>
          <td title='<?php echo $leave->desc?>'><?php echo $leave->desc;?></td>
          <td class='leave-<?php echo $leave->status?>'><?php echo zget($this->lang->leave->statusList, $leave->status);?></td>
          <?php if($type != 'browseReview'):?>
          <td><?php echo zget($users, $leave->reviewedBy);?></td>
          <?php endif;?>
          <?php if($type != 'company'):?>
          <td>
            <?php if($type == 'browseReview' and $leave->status == 'wait'):?>
            <?php echo html::a($this->createLink('oa.leave', 'review', "id=$leave->id&status=pass"), $lang->leave->statusList['pass'], "class='reviewPass'");?>
            <?php echo html::a($this->createLink('oa.leave', 'review', "id=$leave->id&status=reject"), $lang->leave->statusList['reject'], "class='reviewReject'");?>
            <?php endif;?>
            <?php if($type == 'personal' and $leave->status == 'wait'):?>
            <?php echo html::a($this->createLink('oa.leave', 'edit', "id=$leave->id"), $lang->edit, "data-toggle='modal'");?>
            <?php echo html::a($this->createLink('oa.leave', 'delete', "id=$leave->id"), $lang->delete, "class='deleter'");?>
            <?php endif;?>
          </td>
          <?php endif;?>
        </tr>
        <?php endforeach;?>
      </table>
    </div>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
