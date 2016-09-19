<?php 
/**
 * The view file for the method of view of order module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     customer 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php'; ?>
<ul id='menuTitle'>
  <li><?php commonmodel::printLink('order', 'browse', '', "<i class='icon-list-ul'></i> " . $lang->order->list);?></li>
  <li class='divider angle'></li>
  <?php $productName = count($order->products) > 1 ? current($order->products)->name . $lang->etc : current($order->products)->name;?>
  <li class='title'><?php printf($lang->order->titleLBL, $customer->name, $productName, date('Y-m-d', strtotime($order->createdDate)));?> <span class='label-primary label'><?php echo $customer->level != '0' ? $customer->level : '';?></span> <span class='label-success label'><?php echo $lang->order->statusList[$order->status];?></span></li>
</ul>
<div class='row-table'>
  <div class='col-main'>
    <div class='panel'>
      <div class='panel-heading'><strong><?php echo $lang->order->view?></strong></div>
      <div class='panel-body'>
        <?php 
        $payed = $order->status == 'payed';
        $customerLink = html::a($this->createLink('customer', 'view', "customerID={$customer->id}"), $customer->name);
        $productLink = '';
        foreach($order->products as $product)
        {
            $productLink .= html::a($this->createLink('product', 'view', "productID={$product->id}"), $product->name);
        }

        if($contract) $contractLink = html::a($this->createLink('contract', 'view', "contractID={$contract->id}"), $contract->name);
        ?>
        <p><?php printf($lang->order->infoBuy, $customerLink, $productLink);?></p>
        <?php if($order->status == 'signed' and $contract):?>
        <p><?php printf($lang->order->infoContract, $contractLink);?></p>
        <?php endif;?>
        <p><?php printf($lang->order->infoAmount, zget($currencySign, $order->currency, '') . formatMoney($order->plan), zget($currencySign, $order->currency, '') . formatMoney($order->real))?></p>
        <p>
          <?php if(formatTime($order->contactedDate)) printf($lang->order->infoContacted, $order->contactedDate)?>
          <?php if(formatTime($order->nextDate)) printf($lang->order->infoNextDate, $order->nextDate)?>
        </p>
      </div>
    </div> 
    <?php echo $this->fetch('action', 'history', "objectType=order&objectID={$order->id}");?>
    <div class='page-actions'>
      <?php
      echo "<div class='btn-group'>";
      commonModel::printLink('action', 'createRecord', "objectType=order&objectID={$order->id}&customer={$order->customer}", $lang->order->record, "class='btn' data-toggle='modal' data-type='iframe'");
      if($order->status == 'normal') commonModel::printLink('contract', 'create', "customer={$order->customer}&orderID={$order->id}", $lang->order->sign, "class='btn btn-default'");
      if($order->status != 'normal') echo html::a('###', $lang->order->sign, "class='btn' disabled='disabled' class='disabled'");
      if($order->status != 'closed') commonModel::printLink('order', 'assign', "orderID=$order->id", $lang->assign, "data-toggle='modal' class='btn btn-default'");
      if($order->status == 'closed') echo html::a('###', $lang->assign, "data-toggle='modal' class='btn btn-default disabled' disabled");
      echo '</div>';

      echo "<div class='btn-group'>";
      if($order->status != 'closed') commonModel::printLink('order', 'close', "orderID=$order->id", $lang->close, "class='btn btn-default' data-toggle='modal'");
      if($order->closedReason == 'payed') echo html::a('###', $lang->close, "disabled='disabled' class='disabled btn'");
      if($order->closedReason != 'payed' and $order->status == 'closed') commonModel::printLink('order', 'activate', "orderID=$order->id", $lang->activate, "class='btn' data-toggle='modal'");
      if($order->closedReason == 'payed' or  $order->status != 'closed') echo html::a('###', $lang->activate, "class='btn disabled' data-toggle='modal'");
      echo '</div>';

      echo "<div class='btn-group'>";
      commonModel::printLink('order', 'edit', "orderID=$order->id", $lang->edit, "class='btn btn-default'");
      if($order->status == 'normal' or $order->closedReason == 'failed') commonModel::printLink('order', 'delete', "orderID=$order->id", $lang->delete, "class='btn btn-default deleter'");
      echo '</div>';

      $browseLink = $this->session->orderList ? $this->session->orderList : inlink('browse');
      commonModel::printRPN($browseLink, $preAndNext);
      ?>
    </div>
  </div>
  <div class='col-side'>
    <div class='panel'>
      <div class='panel-heading'><strong><i class='icon-file-text-alt'></i> <?php echo $lang->order->lifetime;?></strong></div>
      <div class='panel-body'>
        <?php $payed = $order->status == 'payed';?>
        <table class='table table-info'>
          <tr>
            <th class='w-80px'><?php echo $lang->lifetime->createdBy;?></th>
            <td><?php echo zget($users, $order->createdBy) . $lang->at . $order->createdDate;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->lifetime->assignedTo;?></th>
            <td><?php if($order->assignedTo) echo zget($users, $order->assignedTo) . $lang->at . $order->assignedDate;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->lifetime->closedBy;?></th>
            <td><?php if($order->closedBy) echo zget($users, $order->closedBy) . $lang->at . $order->closedDate;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->lifetime->closedReason;?></th>
            <td><?php echo $lang->order->closedReasonList[$order->closedReason];?></td>
          </tr>
          <tr>
            <th><?php echo $lang->lifetime->signedBy;?></th>
            <td>
              <?php if($contract and $contract->signedBy and $contract->status != 'canceled') echo zget($users, $contract->signedBy) . $lang->at . $contract->signedDate;?>
            </td>
          </tr>
          <tr>
            <th><?php echo $lang->order->editedBy;?></th>
            <td><?php if($order->editedBy) echo zget($users, $order->editedBy) . $lang->at . $order->editedDate;?></td>
            <td>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <?php echo $this->fetch('contact', 'block', "customer={$order->customer}");?>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
