<?php 
/**
 * The transfer view file of trade module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     trade 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<div class='panel'>
  <div class='panel-heading'>
    <strong><i class="icon-plus"></i> <?php echo $lang->trade->transfer;?></strong>
  </div>
  <div class='panel-body'>
    <form method='post' id='ajaxForm'>
      <table class='table table-form w-p60'>
       <tr>
          <th class='w-100px'><?php echo $lang->trade->payment;?></th>
          <td>
            <select name='payment' id='payment' class='form-control amount'>
            <?php foreach($depositorList as $depositor):?>
            <option value="<?php echo $depositor->id;?>" data-currency="<?php echo $depositor->currency;?>"><?php echo $depositor->abbr;?></option>
            <?php endforeach;?>
            </select>
          </td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->receipt;?></th>
          <td>
            <select name='receipt' id='receipt' class='form-control amount'>
            <?php foreach($depositorList as $depositor):?>
            <option value="<?php echo $depositor->id;?>" data-currency="<?php echo $depositor->currency;?>"><?php echo $depositor->abbr;?></option>
            <?php endforeach;?>
            </select>
          </td>
        </tr>
        <tr class='money'>
          <th><?php echo $lang->trade->money;?></th>
          <td><?php echo html::input('money', '', "class='form-control'");?></td>
        </tr>
        <tr class='transfer'>
          <th><?php echo $lang->trade->transferOut;?></th>
          <td><?php echo html::input('transferOut', '', "class='form-control'");?></td>
        </tr>
         <tr class='transfer'>
          <th><?php echo $lang->trade->transferIn;?></th>
          <td><?php echo html::input('transferIn', '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->fee;?></th>
          <td><?php echo html::input('fee', '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->dept;?></th>
          <td><?php echo html::select('dept', $deptList, '', "class='form-control chosen'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->handlers;?></th>
          <td><?php echo html::select('handlers[]', $users, '', "class='form-control chosen' multiple");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->date;?></th>
          <td><?php echo html::input('date', date('Y-m-d'), "class='form-control form-date'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->desc;?></th>
          <td><?php echo html::textarea('desc','', "class='form-control' rows='8'");?></td>
        </tr>
        <tr>
          <th></th>
          <td><?php echo html::submitButton() . '&nbsp;&nbsp;' . html::backButton();?></td>
        </tr>
      </table>
    </form>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
