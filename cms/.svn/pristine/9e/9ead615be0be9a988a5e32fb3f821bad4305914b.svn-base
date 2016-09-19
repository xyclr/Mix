<?php
/**
 * The settings view file of attend module of ZenTaoPMS.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     attend
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php js::set('status', $attend->status);?>
<?php js::set('reason', $attend->reason);?>
<div class='panel-body'>
  <form id='ajaxForm' method='post' action='<?php echo $this->createLink('attend', 'edit', "date=$date")?>'>
    <table class='table table-form table-condensed'>
      <?php if(!empty($attend->reviewStatus)):?>
      <tr>
        <th><?php echo $lang->attend->reviewStatus?></th>
        <td><?php echo zget($lang->attend->reviewStatusList, $attend->reviewStatus) . " " . $attend->reviewedBy . " " . $attend->reviewedDate?></td>
      </tr>
      <?php endif;?>
      <tr>
        <th class='w-80px'><?php echo $lang->attend->date?></th>
        <td><?php echo $attend->dayName;?></td>
      </tr> 
    </table>
    <table class='table table-form table-condensed editMode'>
      <?php if(strpos(',late,both,absent', $attend->status) !== false):?>
      <tr id='trIn'>
        <th class='w-80px'><?php echo $lang->attend->manualIn?></th>
        <td><?php echo html::input('manualIn', empty($attend->manualIn) ? $this->config->attend->signInLimit : $attend->manualIn, "class='form-control form-time'")?></td>
      </tr>
      <?php endif;?>
      <?php if(strpos(',early,both,absent', $attend->status) !== false):?>
      <tr id='trOut'>
        <th><?php echo $lang->attend->manualOut?></th>
        <td><?php echo html::input('manualOut', empty($attend->manualOut) ? $this->config->attend->signOutLimit : $attend->manualOut, "class='form-control form-time'")?></td>
      </tr> 
      <?php endif;?>
      <tr>
        <th><?php echo $lang->attend->desc?></th>
        <td><?php echo html::textarea('desc', $attend->desc, "class='form-control'")?></td>
      </tr> 
      <tr><th></th><td><?php echo html::submitButton();?></td></tr>
    </table>
    <table class='table table-form table-condensed viewMode'>
      <?php if(strpos(',late,both,absent', $attend->status) !== false):?>
      <tr id='trIn'>
        <th class='w-80px'><?php echo $lang->attend->manualIn?></th>
        <td><?php echo $attend->manualIn;?></td>
      </tr>
      <?php endif;?>
      <?php if(strpos(',early,both,absent', $attend->status) !== false):?>
      <tr id='trOut'>
        <th><?php echo $lang->attend->manualOut?></th>
        <td><?php echo $attend->manualOut;?></td>
      </tr> 
      <?php endif;?>
      <tr>
        <th><?php echo $lang->attend->desc?></th>
        <td><?php echo $attend->desc;?></td>
      </tr> 
      <?php if($attend->reviewStatus != 'pass'):?>
      <tr><th></th><td clospan='3'><?php echo html::commonButton($lang->edit, "btn btn-primary edit");?></td></tr>
      <?php endif;?>
    </table>
  </form>
</div>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
