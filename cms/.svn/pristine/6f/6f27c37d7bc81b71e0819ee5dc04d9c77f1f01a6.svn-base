<?php
/**
 * The personal view file of attend module of Ranzhi.
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
<div class='with-side'>
  <div class='side'>
    <div class='panel panel-sm'>
      <div class='panel-body'>
        <ul class='tree' data-collapsed='true'>
          <?php foreach($yearList as $year):?>
          <li class='<?php echo $year == $currentYear ? 'active' : ''?>'>
            <?php commonModel::printLink('attend', 'personal', "date=$year", $year);?>
            <ul>
              <?php foreach($monthList[$year] as $month):?>
              <li class='<?php echo ($year == $currentYear and $month == $currentMonth) ? 'active' : ''?>'>
                <?php commonModel::printLink('attend', 'personal', "date=$year$month", $year . $month);?>
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
    <div class='row'>
      <?php
      $weekIndex = 0;
      if($this->config->attend->workingDays > 7)
      {
          $startDate     = strtotime("$currentYear-$currentMonth-01");
          $startDate     = date('w', $startDate) == 0 ? $startDate : strtotime("last Sunday", $startDate);
          $endDate       = strtotime("last day of this month $currentYear-$currentMonth-01");
          $endDate       = date('w', $endDate) == 6 ? $endDate : strtotime("next Saturday", $endDate);
          $firstDayIndex = 0;
          $lastDayIndex  = 6;
      }
      else
      {
          $startDate     = strtotime("$currentYear-$currentMonth-01");
          $startDate     = date('w', $startDate) == 1 ? $startDate : strtotime("last Monday", $startDate);
          $endDate       = strtotime("last day of this month $currentYear-$currentMonth-01");
          $endDate       = date('w', $endDate) == 0 ? $endDate : strtotime("next Sunday", $endDate);
          $firstDayIndex = 1;
          $lastDayIndex  = 0;
      }
      ?>
      <?php while($startDate <= $endDate):?>
      <?php $dayIndex = date('w', $startDate);?>
      <?php if($dayIndex == $firstDayIndex):?>
      <div class='col-xs-4'>
        <div class='panel'>
          <div class='panel-body no-padding'>
            <table class='table table-data table-fixed text-center'>
              <thead>
                <tr>
                  <th class='w-80px'><?php echo $lang->attend->weeks[$weekIndex];?></th>
                  <th class='text-center'><?php echo $lang->attend->dayName;?></th>
                  <th class='text-center'><?php echo $lang->attend->signIn;?></th>
                  <th class='text-center'><?php echo $lang->attend->signOut;?></th>
                  <th class='text-center w-100px'><?php echo $lang->actions . '/' . $lang->attend->status;?></th>
                </tr>
              </thead>
        <?php endif;?>
              <?php $currentDate = date("Y-m-d", $startDate);?>
              <?php if(isset($attends[$currentDate])):?>
              <?php $status = $attends[$currentDate]->status;?>
              <?php $reason = $attends[$currentDate]->reason;?>
              <tr class="attend-<?php echo $status?> <?php echo (date('m', $startDate) == $currentMonth) ? '' : 'otherMonth'?>" title='<?php echo $lang->attend->statusList[$status]?>'>
                <td><?php echo $currentDate;?></td>
                <td><?php echo $lang->datepicker->abbrDayNames[$dayIndex]?></td>
                <td class='attend-signin'>
                  <?php $signIn = substr($attends[$currentDate]->signIn, 0, 5);?>
                  <?php if(strpos(',late,absent,', $status) !== false) $signIn = $lang->attend->statusList[$status];?>
                  <?php if($status == 'both') $signIn = $lang->attend->statusList['late'];?>
                  <?php echo $signIn;?>
                </td>
                <td class='attend-signout'>
                  <?php $signOut = substr($attends[$currentDate]->signOut, 0, 5);?>
                  <?php if(strpos(',early,absent,', $status) !== false) $signOut = $lang->attend->statusList[$status];?>
                  <?php if($status == 'both') $signOut = $lang->attend->statusList['early'];?>
                  <?php echo $signOut;?>
                </td>
                <td>
                  <?php
                  if(strpos('rest, normal, trip, leave', $status) === false)
                  {
                      if($reason == '' or $reason == 'normal') echo html::a($this->createLink('attend', 'edit', "date=" . str_replace('-', '', $currentDate)), $lang->attend->edit, "data-toggle='modal' data-width='500px'");
                      if($reason == '' or $reason == 'leave')  echo html::a($this->createLink('leave', 'create', "date=" . str_replace('-', '', $currentDate)), $lang->attend->leave, "data-toggle='modal' data-width='500px'");
                      if($reason == '' or $reason == 'trip')   echo html::a($this->createLink('trip', 'create'), $lang->attend->trip, "data-toggle='modal' data-width='500px'");
                  }
                  else
                  {
                      echo "<span class='attend-{$status}'>";
                      echo $lang->attend->statusList[$status];
                      if($status == 'leave' or $status == 'trip' and $attends[$currentDate]->desc) echo ' ' . $attends[$currentDate]->desc . 'h';
                      echo "</span>";
                  }
                  ?>
                </td>
              </tr>
              <?php else:?>
              <tr class="<?php echo (date('m', $startDate) == $currentMonth) ? '' : 'otherMonth'?>">
                <td><?php echo $currentDate;?></td>
                <td><?php echo $lang->datepicker->abbrDayNames[$dayIndex]?></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <?php endif;?>
      <?php if($dayIndex == $lastDayIndex):?>
            </table>
          </div>
        </div>
        <?php $weekIndex += 1;?>
      </div>
      <?php endif;?>
      <?php $startDate = strtotime('+1 day', $startDate);?>
      <?php endwhile;?>
    </div>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
