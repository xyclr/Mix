<?php
/**
 * The create view file of trip module of Ranzhi.
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
    <form id='ajaxForm' method='post' action="<?php echo $this->createLink('oa.trip', 'create')?>">
    <table class='table table-form table-condensed'>
      <tr>
        <th class='w-80px'><?php echo $lang->trip->name?></th>
        <td><?php echo html::input('name', '', "class='form-control'")?></td>
        <td></td>
      </tr>
      <tr>
        <th><?php echo $lang->trip->begin?></th>
        <td>
          <div class='input-group'>
            <span class='input-group-addon'><?php echo $lang->trip->date?></span>
            <?php echo html::input('begin', '', "class='form-control form-date'")?>
            <span class='input-group-addon fix-border'><?php echo $lang->trip->time?></span>
            <?php echo html::input('start', $this->config->attend->signInLimit, "class='form-control form-time'")?>
          </div>
        </td>
        <td></td>
      </tr>
      <tr>
        <th><?php echo $lang->trip->end?></th>
        <td>
          <div class='input-group'>
            <span class='input-group-addon'><?php echo $lang->trip->date?></span>
            <?php echo html::input('end', '', "class='form-control form-date'")?>
            <span class='input-group-addon fix-border'><?php echo $lang->trip->time?></span>
            <?php echo html::input('finish', $this->config->attend->signOutLimit, "class='form-control form-time'")?>
          </div>
        </td>
        <td></td>
      </tr>
      <tr>
        <th><?php echo $lang->trip->from?></th>
        <td>
          <?php echo html::input('from', '', "class='form-control'")?>
        </td>
        <td></td>
      </tr>
      <tr>
        <th><?php echo $lang->trip->to?></th>
        <td>
          <?php echo html::input('to', '', "class='form-control'")?>
        </td>
        <td></td>
      </tr>
      <tr>
        <th><?php echo $lang->trip->desc?></th>
        <td><?php echo html::textarea('desc', '', "class='form-control'")?></td>
        <td></td>
      </tr> 
      <tr><th></th><td clospan='2'><?php echo html::submitButton();?></td></tr>
    </table>
  </form>
</div>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
