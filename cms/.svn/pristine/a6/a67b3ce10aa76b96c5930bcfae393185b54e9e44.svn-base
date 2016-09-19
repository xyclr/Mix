<?php
/**
 * The create view file of contract module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     contract
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<?php js::set('customer', isset($customer) ? $customer : 0);?>
<div class='panel'>
  <div class='panel-heading'>
    <strong><i class="icon-plus"></i> <?php echo $lang->contract->create;?></strong>
  </div>
  <div class='panel-body'>
    <form method='post' id='ajaxForm'>
      <table class='table table-form'>
        <tr>
          <th><?php echo $lang->contract->customer;?></th>
          <td><?php echo html::select('customer', $customers, isset($customer) ? $customer : '', "class='form-control chosen' onchange='getOrder(this.value)'");?></td>
        </tr>
        <?php if(isset($currentOrder)):?>
        <tr>
          <th><?php echo $lang->contract->order;?></th>
          <td>
            <div class='form-group'>
              <span class='col-sm-7'>
                <select name='order[]' class='select-order form-control'>
                  <option value=''></option>
                  <?php foreach($orders as $order):?>
                  <?php $selected = $orderID == $order->id ? 'selected' : ''; ?>
                  <option value="<?php echo $order->id;?>" <?php echo $selected;?>  data-real="<?php echo $order->plan;?>" data-currency="<?php echo $order->currency?>"><?php echo $order->title;?></option>
                  <?php endforeach;?>
                </select>
              </span>
              <span class='col-sm-4'>
                <div class='input-group'>
                  <div class='input-group-addon order-currency'>
                    <?php echo zget($currencySign, $currentOrder->currency, '');?> 
                  </div>
                  <?php echo html::input('real[]', $currentOrder->plan, "class='order-real form-control' placeholder='{$this->lang->contract->placeholder->real}'");?>
                </div>
              </span>
              <span class='col-sm-1'><?php echo html::a('javascript:;', "<i class='icon-plus'></i>", "class='plus'") . html::a('javascript:;', "<i class='icon-minus'></i>", "class='minus'");?></span>
            </div>
          </td>
        </tr>
        <?php endif;?>
        <tr id='orderTR' class='hide'>
          <th><?php echo $lang->contract->order;?></th>
          <td id='orderTD'></td>
        </tr>
        <tr class='hide' id='tmpData'><td></td></tr>
        <tr>
          <th class='w-80px'><?php echo $lang->contract->name;?></th>
          <td class='w-p40'><?php echo html::input('name', '', "class='form-control'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->contract->code;?></th>
          <td><?php echo html::input('code', '', "class='form-control'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->contract->amount;?></th>
          <td>
            <div class='row'>
              <div class='col-sm-3'><?php echo html::select('currency', $currencyList, isset($currentOrder) ? $currentOrder->currency : '', "class='form-control'");?></div>
              <div class='col-sm-9'><?php echo html::input('amount', isset($currentOrder) ? $currentOrder->plan : '', "class='form-control'");?></div>
            </div>
          </td>
        </tr>
        <tr>
          <th><?php echo $lang->contract->contact;?></th>
          <td class='contactTD'><select name='contact' id='contact' class='form-control'></select></td>
        </tr>
        <tr>
          <th><?php echo $lang->contract->signedBy;?></th>
          <td><?php echo html::select('signedBy', $users, '', "class='form-control chosen'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->contract->signedDate;?></th>
          <td><?php echo html::input('signedDate', '', "class='form-control form-date'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->contract->dateRange;?></th>
          <td>
          <div class="input-group">
            <?php echo html::input('begin', '', "class='form-control form-date' placeholder='{$lang->contract->begin}'");?>
            <span class="input-group-addon"><?php echo $lang->minus;?></span>
            <?php echo html::input('end', '', "class='form-control form-date' placeholder='{$lang->contract->end}'");?></td>
          </div>
          </td>
        </tr>
        <tr>
          <th><?php echo $lang->contract->handlers;?></th>
          <td><?php echo html::select('handlers[]', $users, $this->app->user->account, "class='form-control chosen' multiple");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->contract->items;?></th>
          <td colspan='2'><?php echo html::textarea('items', '',"rows='5' class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->contract->uploadFile;?></th>
          <td colspan='2'><?php echo $this->fetch('file', 'buildForm');?></td>
        </tr>
        <tr>
          <th></th>
          <td><?php echo html::submitButton() . '&nbsp;&nbsp;' . html::backButton();?></td>
        </tr>
      </table>
    </form>
  </div>
</div>
<table class='hide'><tr class='orderInfo'><td></td></tr></table>
<?php js::set('currencySign', array('' => '') + $currencySign);?>
<?php include '../../common/view/footer.html.php';?>
