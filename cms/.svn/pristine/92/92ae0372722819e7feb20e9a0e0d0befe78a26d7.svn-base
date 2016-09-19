<?php
/**
 * The attend block view file of block module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     block
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<style>
.nomargin {margin: 0;}
.header {height: 10%;}
.AM {height: 39%;}
.PM {height: 39%;}
.status {height: 12%;}
.col-p13 {width: 13%;}
.col-p9 {width: 9%;}
.calendar {width: 100%; height: 101%; text-align: center;}
.calendar th {text-align: center; color: gray;}
.AM td, .PM td {vertical-align: top;}
.calendar tr+tr {border-top: 1px solid rgb(221, 221, 221);}
.calendar th+th, .calendar td+td, .calendar th+td {border-left: 1px solid rgb(221, 221, 221);}
.calendar .today {background: #f0f0f0;}
.event {color: rgb(255, 255, 255); width: 100%; height: 18px; overflow: hidden; margin: 1px 0;}
.event:hover {cursor: pointer;}
.event.done {background-color: rgb(56, 176, 63);}
.event.wait {background-color: rgb(50, 128, 252);}
.attend-normal {color: #8BC34A;}
.attend-late   {color: #EA644A;}
.attend-early  {color: #FF8A65;}
.attend-both   {color: #FF5722;}
.attend-absent {color: #F1A325;}
.attend-leave  {color: #9E9E9E;}
.attend-trip   {color: #8668B8;}
.attend-status:hover {cursor: pointer;}
</style>
<?php $dateList = range(strtotime($startDate), strtotime($endDate), 86400);?>
<table class='calendar'>
  <tr class='header'>
    <th class='col-p9'></th>
    <?php foreach($dateList as $d):?>
    <?php $dStr = date('Y-m-d', $d);?>
    <?php $class = $dStr == $date ? 'today' : '';?>
      <th class='col-p13 <?php echo $class?>'><?php echo zget($this->lang->datepicker->abbrDayNames, date('w', $d))?></th>
    <?php endforeach;?>
  </tr>
  <tr class='AM'>
    <th><?php echo $lang->attend->AM?></th>
    <?php foreach($dateList as $d):?>
    <?php $dStr = date('Y-m-d', $d);?>
    <?php $class = $dStr == $date ? 'today' : '';?>
      <td class='<?php echo $class?>'>
        <?php if(!isset($todos[$dStr]['AM'])) continue;?>
        <?php foreach($todos[$dStr]['AM'] as $todo):?>
        <?php $link = "$.openEntry('oa', '" . $this->createLink('oa.todo', 'calendar') . "')";?>
        <div class='event <?php echo $todo->status?>' onclick="<?php echo $link?>" title='<?php echo $todo->begin . ' ' . $todo->name?>'>
          <?php echo $todo->name;?>
        </div>
        <?php endforeach;?>
      </td>
    <?php endforeach;?>
  </tr>
  <tr class='PM'>
    <th><?php echo $lang->attend->PM?></th>
    <?php foreach($dateList as $d):?>
    <?php $dStr = date('Y-m-d', $d);?>
    <?php $class = $dStr == $date ? 'today' : '';?>
      <td class='<?php echo $class?>'>
        <?php if(!isset($todos[$dStr]['PM'])) continue;?>
        <?php foreach($todos[$dStr]['PM'] as $todo):?>
        <?php $link = "$.openEntry('oa', '" . $this->createLink('oa.todo', 'calendar') . "')";?>
        <div class='event <?php echo $todo->status?>' onclick="<?php echo $link?>" title='<?php echo $todo->begin . ' ' . $todo->name?>'>
          <?php echo $todo->name;?>
        </div>
        <?php endforeach;?>
      </td>
    <?php endforeach;?>
  </tr>
  <?php $link = "$.openEntry('oa', '" . $this->createLink('oa.attend', 'personal') . "')";?>
  <tr class='status'>
    <th><?php echo $lang->attend->common?></th>
    <?php foreach($dateList as $d):?>
    <?php $dStr = date('Y-m-d', $d);?>
    <?php $class = $dStr == $date ? 'today' : '';?>
    <?php if(isset($attends[$dStr])):?>
      <td class='<?php echo "$class attend-status attend-{$attends[$dStr]->status}"?>' onclick="<?php echo $link?>">
        <?php echo zget($this->lang->attend->abbrStatusList, $attends[$dStr]->status)?>
      </td>
    <?php else:?>
      <td class='<?php echo $class?>'></td>
    <?php endif;?>
    <?php endforeach;?>
  </tr>
</table>
