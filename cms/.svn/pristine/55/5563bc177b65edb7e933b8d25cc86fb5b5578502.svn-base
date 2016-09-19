<?php 
/**
 * The create view file of balance module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     balance 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<?php js::set('currencyList', $currencyList);?>
<form method='post' action='<?php echo $this->createLink('balance', 'create')?>' id='balanceForm'>
  <table class='table table-form w-p60'>
   <tr>
      <th class='w-70px'><?php echo $lang->balance->depositor;?></th>
      <td>
        <select name='depositor' id='depositor' class='form-control'>
          <?php foreach($depositorList as $depositor):?>
          <option <?php if($depositor->id == $currentDepositor) echo "selected"?> value="<?php echo $depositor->id;?>" data-currency="<?php echo $depositor->currency;?>"><?php echo $depositor->abbr;?></option>
          <?php endforeach;?>
        </select>
      </td>
    </tr>
    <tr>
      <th><?php echo $lang->balance->date;?></th>
      <td><?php echo html::input('date', date('Y-m-d'), "class='form-control form-date'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->balance->money;?></th>
      <td>
        <div class='input-group'>
          <?php echo html::input('money', '', "class='form-control'");?>
          <span class='input-group-addon'><span class='currency'></span></span>
        </div>
      </td>
    </tr>
    <tr>
      <th></th>
      <td><?php echo html::submitButton();?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
