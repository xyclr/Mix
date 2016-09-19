<?php 
/**
 * The info file of customer module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     customer 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<ul id='menuTitle'>
  <li><?php commonModel::printLink('customer', 'browse', '', "<i class='icon-list-ul'></i> " . $lang->customer->list);?></li>
  <li class='divider angle'></li>
  <li class='title'>
    <?php echo $customer->name;?>
    <?php if($customer->public):?>
    <span class='label label-primary'><?php echo $lang->customer->public;?></span>
    <?php endif;?>
  </li>
</ul>
<div class='row-table'>
  <div class='col-main'>
    <div class='panel'>
      <div class='panel-heading'><strong><?php echo $lang->customer->desc;?></strong></div>
      <div class='panel-body'><?php echo $customer->desc;?></div>
    </div>
    <div class='panel'>
      <div class='panel-heading'><strong><i class="icon-list-info"></i> <?php echo $lang->customer->intension;?></strong></div>
      <div class='panel-body'><?php echo $customer->intension;?></div>
    </div>
    <?php echo $this->fetch('action', 'history', "objectType=customer&objectID={$customer->id}")?>
    <div class='page-actions'>
      <?php
      echo "<div class='btn-group'>";
      commonModel::printLink('action', 'createRecord', "objectType=customer&objectID={$customer->id}&customer={$customer->id}", $lang->customer->record, "class='btn' data-toggle='modal' data-type='iframe' data-icon='comment-alt'");
      commonModel::printLink('customer', 'assign', "customerID=$customer->id", $lang->customer->assign, "class='btn' data-toggle='modal'");
      commonModel::printLink('customer', 'contact', "customerID=$customer->id", $lang->customer->contact,  "class='btn' data-toggle='modal'");
      commonModel::printLink('address',  'browse', "objectType=customer&objectID=$customer->id", $lang->customer->address, "class='btn' data-toggle='modal'");
      echo '</div>';
      echo "<div class='btn-group'>";
      commonModel::printLink('customer', 'edit', "customerID=$customer->id", $lang->edit, "class='btn'");
      commonModel::printLink('customer', 'delete', "customerID=$customer->id", $lang->delete, "class='deleter btn'");
      echo '</div>';

      $browseLink = $this->session->customerList ? $this->session->customerList : inlink('browse');
      commonModel::printRPN($browseLink, $preAndNext);
      ?>
    </div>
  </div>
  <div class='col-side'>  
    <div class='panel'>
      <div class='panel-heading'><strong><i class="icon-list-info"></i> <?php echo $lang->customer->basicInfo;?></strong></div>
      <div class='panel-body'>
        <table class='table table-info'>
          <tr>
            <th class='w-70px'><?php echo $lang->customer->level;?></th>
            <td><?php if($customer->level) echo $lang->customer->levelNameList[$customer->level];?></td>
          </tr>
          <tr>
            <th><?php echo $lang->customer->status;?></th>
            <td><?php if($customer->status) echo $lang->customer->statusList[$customer->status];?></td>
          </tr>
          <tr>
            <th><?php echo $lang->customer->assignedTo;?></th>
            <td><?php echo zget($users, $customer->assignedTo);?></td>
          </tr>
          <tr>
            <th><?php echo $lang->customer->size;?></th>
            <td><?php echo $lang->customer->sizeNameList[$customer->size];?></td>
          </tr>
          <tr>
            <th><?php echo $lang->customer->type;?></th>
            <td><?php echo $lang->customer->typeList[$customer->type];?></td>
          </tr>
          <tr>
            <th><?php echo $lang->customer->industry;?></th>
            <td><?php if($customer->industry) echo $industryList[$customer->industry];?></td>
          </tr>
          <tr>
            <th><?php echo $lang->customer->area;?></th>
            <td><?php if($customer->area) echo $areaList[$customer->area];?></td>
          </tr>
          <tr>
            <th><?php echo $lang->customer->weibo;?></th>
            <td><?php echo html::a("$customer->weibo", $customer->weibo, "target='_blank'");?></td>
          </tr>
          <tr>
            <th><?php echo $lang->customer->weixin;?></th>
            <td><?php echo $customer->weixin;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->customer->site;?></th>
            <td><?php echo html::a("$customer->site", $customer->site, "target='_blank'");?></td>
          </tr>
          <?php if(formatTime($customer->nextDate)):?>
          <tr>
            <th><?php echo $lang->customer->nextDate;?></th>
            <td><?php echo $customer->nextDate;?></td>
          </tr>
          <?php endif;?>
        </table>
      </div>
    </div>
    <?php echo $this->fetch('contact', 'block', "customer={$customer->id}")?>
    <div class='panel'>
      <div class='panel-heading'>
        <div class='row'>      
          <div class='col-sm-8'><strong><i class="icon-list-info"></i> <?php echo $lang->customer->contract;?></strong></div>
          <div class='col-sm-2'><strong><?php echo $lang->order->amount;?></strong></div> 
          <div class='col-sm-2'><strong><?php echo $lang->order->status;?></strong></div> 
        </div>
      </div>
      <table class='table table-data table-condensed'>
        <?php foreach($contracts as $contract):?>
        <tr data-url='<?php echo $this->createLink('contract', 'view', "contractID=$contract->id"); ?>'>
          <td class='w-p70'><?php echo $contract->name;?></td>
          <td class='w-p15'><?php echo zget($currencySign, $contract->currency, '') . $contract->amount;?></td>
          <td class='w-p15 <?php echo "contract-{$contract->status}";?>'><?php echo $lang->contract->statusList[$contract->status];?></td>
        </tr>
        <?php endforeach;?>
      </table>
    </div>
    <div class='panel'>
      <div class='panel-heading'>
        <div class='row'>      
          <div class='col-sm-4'><strong><i class="icon-list-info"></i> <?php echo $lang->customer->order;?></strong></div>
          <div class='col-sm-3'><strong><?php echo $lang->order->plan;?></strong></div>
          <div class='col-sm-3'><strong><?php echo $lang->order->real;?></strong></div>
          <div class='col-sm-2'><strong><?php echo $lang->order->status;?></strong></div>
        </div>
      </div>
      <table class='table table-data table-condensed'>
        <?php foreach($orders as $order):?>
        <tr data-url='<?php echo $this->createLink('order', 'view', "orderID=$order->id"); ?>'>
          <td class='w-p35'><?php foreach($order->products as $product) echo $product . ' ';?></td>
          <td class='w-p25'><?php echo $order->plan;?></td>
          <td class='w-p25'><?php echo zget($currencySign, $order->currency, '') . $order->real;?></td>
          <td class='w-p15 <?php echo "order-{$order->status}";?>'><?php echo $lang->order->statusList[$order->status];?></td>
        </tr>
        <?php endforeach;?>
      </table>
    </div>
    <div class='panel'>
      <div class='panel-heading'><strong><?php echo $lang->customer->address;?></strong></div>
      <table class='table table-data table-condensed'>
        <?php foreach($addresses as $address):?>
        <tr>
          <td><?php echo $address->title . $lang->colon . $address->fullLocation;?></td>
        </tr>
        <?php endforeach;?>
      </table>
    </div>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
