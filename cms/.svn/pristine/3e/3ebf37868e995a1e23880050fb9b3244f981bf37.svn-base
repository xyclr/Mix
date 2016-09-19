<?php
/**
 * The browse view file of holiday module of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     holiday
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<div id='menuActions'>
  <?php commonModel::printLink('holiday', 'create', "", "{$lang->create}", "data-toggle='modal' class='btn btn-primary'")?>
</div>
<div class='with-side'>
  <div class='side'>
    <div class='panel panel-sm'>
      <div class='panel-body'>
        <ul class='tree' data-collapsed='true'>
          <?php foreach($yearList as $year):?>
          <li class='<?php echo $year == $currentYear ? 'active' : ''?>'>
            <?php commonModel::printLink('holiday', 'browse', "year=$year", $year);?>
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
            <th class='w-150px'><?php echo $lang->holiday->name;?></th>
            <th class='w-200px'><?php echo $lang->holiday->holiday;?></th>
            <th><?php echo $lang->holiday->desc;?></th>
            <th class='w-100px'><?php echo $lang->actions;?></th>
          </tr>
        </thead>
        <?php foreach($holidays as $holiday):?>
        <tr>
          <td><?php echo $holiday->name;?></td>
          <td><?php echo $holiday->begin . ' ~ ' . $holiday->end;?></td>
          <td><?php echo $holiday->desc;?></td>
          <td>
            <?php echo html::a($this->createLink('oa.holiday', 'edit', "id=$holiday->id"), $lang->edit, "data-toggle='modal'");?>
            <?php echo html::a($this->createLink('oa.holiday', 'delete', "id=$holiday->id"), $lang->delete, "class='deleter'");?>
          </td>
        </tr>
        <?php endforeach;?>
      </table>
    </div>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
