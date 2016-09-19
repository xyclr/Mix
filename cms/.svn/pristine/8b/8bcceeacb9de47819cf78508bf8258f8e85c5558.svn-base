<?php 
/**
 * The receive payments file of contract module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     contract 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<?php include '../../common/view/datepicker.html.php';?>
<form method='post' id='ajaxForm' class='form-inline' action='<?php echo $this->createLink('contract', 'editReturn', "returnID={$return->id}")?>'>
  <table class='table table-form table-condensed'>
    <tr>
      <th><?php echo $lang->contract->all;?></th>
      <td><?php echo zget($currencySign, $contract->currency, $contract->currency) . $contract->amount;?></td>
    </tr>
    <tr>
      <th class='w-80px'><?php echo $lang->contract->thisAmount;?></th>
      <td class='w-p40'>
        <div class='input-group'>
          <?php echo html::input('amount', $return->amount, "class='form-control'");?>
          <?php $checked = $contract->return == 'done' ? 'checked' : '';?>
          <div class='input-group-addon'>
            <label class='checkbox'><input type='checkbox' id='finish' name='finish' value='1' <?php echo $checked;?>> <?php echo $lang->contract->completeReturn;?></label>
          </div>
        </div>
      </td><td></td>
    </tr>
    <tr>
      <th><?php echo $lang->contract->returnedBy;?></th>
      <td><?php echo html::select('returnedBy', $users, $return->returnedBy, "class='form-control chosen'");?></td><td></td>
    </tr>
    <tr>
      <th><?php echo $lang->contract->returnedDate;?></th>
      <td><?php echo html::input('returnedDate', $return->returnedDate, "class='form-control form-date'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->contract->handlers;?></th>
      <td colspan='2'><?php echo html::select('handlers[]', $users, $contract->handlers, "class='form-control chosen' multiple");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->comment;?></th>
      <td colspan='2'><?php echo html::textarea('comment', '', "rows='2'");?></td>
    </tr>
    <tr>
      <th></th>
      <td><?php echo html::submitButton();?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
