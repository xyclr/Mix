<?php 
/**
 * The edit view file of trade module of RanZhi.
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
<ul id='menuTitle'>
  <li><?php commonModel::printLink('trade', 'browse', '', $lang->trade->browse);?></li>
  <li class='divider angle'></li>
</ul>
<div class='panel'>
  <div class='panel-heading'>
    <strong><i class="icon-edit"></i> <?php echo $lang->trade->edit;?></strong>
  </div>
  <div class='panel-body'>
    <form method='post' id='ajaxForm' class='form-inline'>
      <table class='table table-form w-p60'>
        <tr>
          <th class='w-100px'><?php echo $lang->trade->depositor;?></th>
          <td><?php echo html::select('depositor', $depositorList, $trade->depositor, "class='form-control'");?></td>
        </tr>
        <?php if($trade->type == 'in'):?>
        <tr class='income'>
          <th><?php echo $lang->trade->category;?></th>
          <td><?php echo html::select('category', array('') + $categories, $trade->category, "class='form-control'");?></td>
        </tr>
        <?php endif;?>
        <?php if($trade->type == 'out'):?>
        <tr class='expense'>
          <th><?php echo $lang->trade->category;?></th>
          <td>
            <div class='input-group'>
              <?php echo html::select('category', array('') + $categories, $trade->category, "class='form-control'");?>
              <div class='input-group-addon'><?php echo html::checkbox('objectType', $lang->trade->objectTypeList, $objectType);?></div>
            </div>
          </td>
        </tr>
        <?php endif;?>
        <?php if($trade->type == 'out'):?>
        <tr>
          <th><?php echo $lang->trade->order;?></th>
          <td><?php echo html::select('order', array('') + $orderList, $trade->order, "class='form-control chosen'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->contract;?></th>
          <td><?php echo html::select('contract', array('') + $contractList, $trade->contract, "class='form-control chosen'");?></td>
        </tr>
        <?php endif;?>
        <?php if($trade->type == 'out'):?>
        <tr>
          <th><?php echo $lang->trade->trader;?></th>
          <td>
            <div class='input-group'>
              <?php  echo html::select('trader', $traderList, $trade->trader, "class='form-control chosen'");?>
              <?php  echo html::input('traderName', '', "class='form-control' style='display:none'");?>
              <div class='input-group-addon'><?php echo html::checkbox('createTrader', array( 1 => $lang->trade->newTrader));?></div>
            </div>
          </td>
        </tr>
        <?php endif;?>
        <?php if($trade->type == 'in'):?>
        <tr>
          <th><?php echo $lang->trade->customer;?></th>
          <td><?php echo html::select('trader', $customerList, $trade->trader, "class='form-control chosen' onchange='getContract(this.value)'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->contract;?></th>
          <td class='contractTD'><?php echo html::select('contract', $tradeContract, $trade->contract, "class='form-control'");?></td>
        </tr>
        <?php endif;?>
        <tr>
          <th><?php echo $lang->trade->money;?></th>
          <td><?php echo html::input('money', $trade->money, "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->dept;?></th>
          <td><?php echo html::select('dept', $deptList, $trade->dept, "class='form-control chosen'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->handlers;?></th>
          <td><?php echo html::select('handlers[]', $users, $trade->handlers, "class='form-control chosen' multiple");?></td>
        </tr>
        <?php if($trade->type == 'in'):?>
        <tr>
          <th><?php echo $lang->trade->product;?></th>
          <td><?php echo html::select('product', array('') + $productList, $trade->product, "class='form-control'");?></td>
        </tr>
        <?php endif;?>
        <tr>
          <th><?php echo $lang->trade->date;?></th>
          <td><?php echo html::input('date', $trade->date, "class='form-control form-date'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->desc;?></th>
          <td><?php echo html::textarea('desc',$trade->desc, "class='form-control' rows='3'");?></td>
        </tr>
        <tr>
          <th></th>
          <td><?php echo html::submitButton();?></td>
        </tr>
      </table>
    </form>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
