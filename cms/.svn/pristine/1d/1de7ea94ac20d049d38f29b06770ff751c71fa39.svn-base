<?php
/**
 * The browse view file of trip module of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     trip
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/treeview.html.php';?>
<?php js::set('type', $type)?>
<div id='menuActions'>
  <?php commonModel::printLink('trip', 'create', "", "<i class='icon icon-plus'></i> {$lang->trip->create}", "data-toggle='modal' class='btn btn-primary'")?>
</div>
<div class='with-side'>
  <div class='side'>
    <div class='panel panel-sm'>
      <div class='panel-body'>
        <ul class='tree' data-collapsed='true'>
          <?php foreach($yearList as $year):?>
          <li class='<?php echo $year == $currentYear ? 'active' : ''?>'>
            <?php commonModel::printLink('trip', $type, "date=$year", $year);?>
            <ul>
              <?php foreach($monthList[$year] as $month):?>
              <li class='<?php echo ($year == $currentYear and $month == $currentMonth) ? 'active' : ''?>'>
                <?php commonModel::printLink('trip', $type, "date=$year$month", $year . $month);?>
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
            <th class='w-50px'> <?php echo $lang->trip->id;?></th>
            <th class='w-80px'> <?php echo $lang->trip->createdBy;?></th>
            <th class='w-180px'> <?php echo $lang->trip->name;?></th>
            <th class='w-150px'><?php echo $lang->trip->begin;?></th>
            <th class='w-150px'><?php echo $lang->trip->end;?></th>
            <th class='w-80px'><?php echo $lang->trip->from;?></th>
            <th class='w-80px'><?php echo $lang->trip->to;?></th>
            <th><?php echo $lang->trip->desc;?></th>
            <th class='w-100px'><?php echo $lang->actions;?></th>
          </tr>
        </thead>
        <?php foreach($tripList as $trip):?>
        <tr>
          <td><?php echo $trip->id;?></td>
          <td><?php echo zget($users, $trip->createdBy);?></td>
          <td title='<?php echo $trip->name?>'><?php echo $trip->name;?></td>
          <td><?php echo $trip->begin . ' ' . $trip->start;?></td>
          <td><?php echo $trip->end . ' ' . $trip->finish;?></td>
          <td title='<?php echo $trip->from?>'><?php echo $trip->from;?></td>
          <td title='<?php echo $trip->to?>'>  <?php echo $trip->to;?></td>
          <td title='<?php echo $trip->desc?>'><?php echo $trip->desc;?></td>
          <td>
            <?php if($trip->createdBy == $this->app->user->account):?>
            <?php echo html::a($this->createLink('oa.trip', 'edit', "id=$trip->id"), $lang->edit, "data-toggle='modal'");?>
            <?php echo html::a($this->createLink('oa.trip', 'delete', "id=$trip->id"), $lang->delete, "class='deleter'");?>
            <?php endif;?>
          </td>
        </tr>
        <?php endforeach;?>
      </table>
    </div>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
