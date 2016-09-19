<?php
/**
 * The browse view file of attend module of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     attend
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/treeview.html.php';?>
<?php $lang->attend->abbrStatusList['rest'] = '';?>
<div id='menuActions'>
  <?php commonModel::printLink('attend', 'export', "data=$currentYear$currentMonth&company=$company", "{$lang->attend->export}", "class='iframe btn btn-primary'")?>
</div>
<div class='with-side'>
  <div class='side'>
    <div class='panel panel-sm'>
      <div class='panel-body'>
        <ul class='tree' data-collapsed='true'>
          <?php foreach($yearList as $year):?>
          <li class='<?php echo $year == $currentYear ? 'active' : ''?>'>
            <?php commonModel::printLink('attend', $company ? 'company' : 'department', "date=$year", $year);?>
            <ul>
              <?php foreach($monthList[$year] as $month):?>
              <li class='<?php echo ($year == $currentYear and $month == $currentMonth) ? 'active' : ''?>'>
                <?php commonModel::printLink('attend', $company ? 'company' : 'department', "date=$year$month", $year . $month);?>
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
      <div class='panel-heading text-center'>
        <strong><?php echo $currentYear . $lang->year . $currentMonth . $lang->month . $lang->attend->report;?></strong>
      </div>
      <table class='table table-data table-bordered text-center table-fixed'>
        <thead>
          <tr class='text-center'>
            <th rowspan='2' class='w-80px valign-middle'><?php echo $lang->user->dept;?></th>
            <th rowspan='2' class='w-80px valign-middle'><?php echo $lang->user->realname;?></th>
            <?php for($day = 1; $day <= $dayNum; $day++):?>
            <th><?php echo $day?></th>
            <?php endfor;?>
          </tr>
          <tr class='text-center'>
            <?php $weekOffset = date('w', strtotime("$currentYear-$currentMonth-01")) - 1;?>
            <?php for($day = 1; $day <= $dayNum; $day++):?>
            <th><?php echo $lang->datepicker->abbrDayNames[($day + $weekOffset) % 7]?></th>
            <?php endfor;?>
          </tr>
        </thead>
        <?php foreach($attends as $dept => $deptAttends):?>
          <?php $isFirst = true;?>
          <?php foreach($deptAttends as $account => $userAttends):?>
          <tr>
            <?php if($isFirst):?>
            <td rowspan='<?php echo count($deptAttends);?>' class='valign-middle'>
              <?php echo isset($users[$account]) ? $deptList[$users[$account]->dept] : ''?>
            </td>
            <?php $isFirst = false;?>
            <?php endif;?>
            <td class='valign-middle'><?php echo isset($users[$account]) ? $users[$account]->realname : '';?></td>
            <?php for($day = 1; $day <= $dayNum; $day++):?>
              <?php $currentDate = date("Y-m-d", strtotime("{$currentYear}-{$currentMonth}-{$day}"));?>
              <?php if(isset($userAttends[$currentDate])):?>
              <td class='attend-status attend-<?php echo $userAttends[$currentDate]->status?>' title='<?php echo $lang->attend->statusList[$userAttends[$currentDate]->status]?>'>
                <span><?php echo $lang->attend->markStatusList[$userAttends[$currentDate]->status]?></span>
              </td>
              <?php else:?>
              <td></td>
              <?php endif;?>
            <?php endfor;?>
          </tr>
          <?php endforeach;?>
        <?php endforeach;?>
      </table>
    </div>
    <div class='legend'>
    <?php foreach($lang->attend->markStatusList as $key => $value):?>
      <span class='legend-item attend-<?php echo $key?>'>
        <i class='legend-i'><?php echo $value?></i>
        <?php echo $lang->attend->statusList[$key]?>
      </span>
    <?php endforeach;?>
    </div>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
