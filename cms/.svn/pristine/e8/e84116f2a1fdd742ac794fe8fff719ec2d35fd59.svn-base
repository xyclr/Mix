<?php
/**
 * The save order record view file of order module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     order
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.lite.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php js::import($jsRoot . 'date.js');?>
<?php js::set('customer', $customer);?>
<div class='panel-body'>
<form method='post' id='createRecordForm' action='<?php echo inlink('createrecord', "objectType={$objectType}&objectID={$objectID}")?>' class='form-inline'>
  <table class='table table-form'>
    <?php if($objectType != 'contact'):?>
    <tr>
      <th><?php echo $lang->action->record->contact;?></th>
      <td>
        <div class='col-sm-5'>
          <div class='input-group'>
            <?php echo html::select('contact', $contacts, '', "class='form-control'");?>
            <?php echo html::input('realname', '', "class='form-control' style='display:none'");?>
            <?php if($objectType == 'customer'):?>
            <span class='input-group-addon'>
              <?php echo html::checkbox('createContact', array(1 => $lang->action->createContact), '', "class='checkbox-inline'");?>
              <?php echo html::checkbox('objectType', array('order' => $lang->action->record->order, 'contract' => $lang->action->record->contract), '', "class='checkbox-inline'");?>
            </span>
            <?php endif;?>
          </div>
        </div>
      </td>
    </tr>
    <?php elseif($objectType != 'customer'):?>
    <tr>
      <th><?php echo $lang->action->record->customer;?></th>
      <td>
        <div class='col-sm-5'>
          <?php echo html::hidden('contact', $objectID);?>
          <?php echo html::select('customer', $customers, '', "class='form-control'");?>
        </div>
      </td>
    </tr>
    <?php endif;?>
    <?php if($objectType == 'customer'):?>
    <tr style='display:none'>
      <th><?php echo $lang->action->record->contract;?></th>
      <td>
        <div class='col-sm-5'>
          <?php echo html::select('contract', $contracts, '', "class='form-control chosen'");?>
        </div>
      </td>
    </tr>
    <tr style='display:none'>
      <th><?php echo $lang->action->record->order;?></th>
      <td>
        <div class='col-sm-5'>
          <?php echo html::select('order', $orders, '', "class='form-control'");?>
        </div>
      </td>
    </tr>
    <?php endif;?>
    <tr>
      <th class='w-70px'><?php echo $lang->action->record->date;?></th>
      <td><div class='col-sm-5'><?php echo html::input('date', date('Y-m-d H:i:s'), "class='form-control form-datetime'");?></div></td>
    </tr> 
    <tr>
      <th><?php echo $lang->action->record->nextDate;?></th>
      <td>
        <div class='col-sm-5'><?php echo html::input('nextDate', '', "class='form-control form-date'");?></div>
        <div class='col-sm-7'>&nbsp;&nbsp;<?php echo html::radio('delta', $lang->action->nextContactList , '', "onclick='computeNextDate(this.value)'");?></div>
      </td>
    </tr>
    <tr>
      <th><?php echo $lang->action->record->comment;?></th>
      <td><div class='col-sm-12'><?php echo html::textarea('comment', '', "class='form-control' rows='3'");?></div></td>
    </tr>
    <tr>
      <th></th>
      <td>
        <div class='col-sm-12'>
          <?php echo html::submitButton() . html::hidden('customer', $customer);?>
          <div id='duplicateError' class='hide'></div>
        </div>
      </td>
    </tr>
  </table>
  <?php echo $this->fetch('action', 'history', "objectType={$objectType}&objectID={$objectID}&action=record&from=createRecord");?>
</form>
</div>
<div class='errorMessage hide'>
  <div class='alert alert-danger alert-dismissable'>
    <button aria-hidden='true' data-dismiss='alert' class='close' type='button'>×</button>
    <button type='submit' class='btn btn-default' id='continueSubmit'><?php echo $lang->continueSave;?></button>
  </div>
</div>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
