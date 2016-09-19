<?php
/**
 * The edit view file of trip module of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     trip
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<div class='panel-body'>
  <form id='ajaxForm' method='post' action="<?php echo $this->createLink('oa.trip', 'edit', "id=$trip->id")?>">
    <table class='table table-form table-condensed'>
      <tr>
        <th class='w-80px'><?php echo $lang->trip->name?></th>
        <td><?php echo html::input('name', $trip->name, "class='form-control'")?></td>
        <td></td>
      </tr>
      <tr>
        <th><?php echo $lang->trip->begin?></th>
        <td>
          <div class='input-group'>
            <span class='input-group-addon'><?php echo $lang->trip->date?></span>
            <?php echo html::input('begin', $trip->begin, "class='form-control form-date'")?>
            <span class='input-group-addon fix-border'><?php echo $lang->trip->time?></span>
            <?php echo html::input('start', $trip->start, "class='form-control form-time'")?>
          </div>
        </td>
        <td></td>
      </tr>
      <tr>
        <th><?php echo $lang->trip->end?></th>
        <td>
          <div class='input-group'>
            <span class='input-group-addon'><?php echo $lang->trip->date?></span>
            <?php echo html::input('end', $trip->end, "class='form-control form-date'")?>
            <span class='input-group-addon fix-border'><?php echo $lang->trip->time?></span>
            <?php echo html::input('finish', $trip->finish, "class='form-control form-time'")?>
          </div>
        </td>
        <td></td>
      </tr>
      <tr>
        <th><?php echo $lang->trip->from?></th>
        <td>
          <?php echo html::input('from', $trip->from, "class='form-control'")?>
        </td>
        <td></td>
      </tr>
      <tr>
        <th><?php echo $lang->trip->to?></th>
        <td>
          <?php echo html::input('to', $trip->to, "class='form-control'")?>
        </td>
        <td></td>
      </tr>
      <tr>
        <th><?php echo $lang->trip->desc?></th>
        <td><?php echo html::textarea('desc', $trip->desc, "class='form-control'")?></td>
        <td></td>
      </tr> 
      <tr><th></th><td clospan='2'><?php echo html::submitButton();?></td></tr>
    </table>
  </form>
</div>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
