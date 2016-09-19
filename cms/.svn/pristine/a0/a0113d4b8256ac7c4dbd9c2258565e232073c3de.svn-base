<?php
/**
 * The view view file of contract module of RanZhi.
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
<ul id='menuTitle'>
  <li><?php commonModel::printLink('contract', 'browse', '', $lang->contract->list);?></li>
  <li class='divider angle'></li>
  <li class='title'><?php echo $contract->name;?></li>
</ul>
<div class="row-table">
  <div class='col-main'>
    <div class='panel'>
      <div class='panel-heading'><strong><?php echo $lang->contract->items;?></strong></div>
      <div class='panel-body'>
        <?php echo $contract->items;?>
        <div><?php echo $this->fetch('file', 'printFiles', array('files' => $contract->files, 'fieldset' => 'false'))?></div>
      </div>
    </div>
    <?php echo $this->fetch('action', 'history', "objectType=contract&objectID={$contract->id}")?>
    <div class='page-actions'>
      <?php
      echo $this->contract->buildOperateMenu($contract, 'btn', 'view');

      $browseLink = $this->session->contractList ? $this->session->contractList : inlink('browse');
      commonModel::printRPN($browseLink, $preAndNext);
      ?>
    </div>
  </div>
  <div class='col-side'>
    <div class='panel'>
      <div class='panel-heading'>
        <strong><?php echo $lang->basicInfo;?></strong>
      </div>
      <div class='panel-body'>
        <table class='table table-info'>
          <tr>
            <th class='w-80px'><?php echo $lang->contract->customer;?></th>
            <td><?php echo html::a($this->createLink('customer', 'view', "customerID={$contract->customer}"), zget($customers, $contract->customer));?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->order;?></th>
            <td>
              <?php foreach($orders as $order):?>
              <div><?php echo html::a($this->createLink('order', 'view', "orderID={$order->id}"), $order->title);?></div>
              <?php endforeach;?>
            </td>
          </tr>
          <?php if(!empty($orders)):?>
          <tr>
            <th><?php echo $lang->order->product;?></th>
            <td>
              <?php foreach($orders as $order):?>
                <?php foreach($order->products as $product):?>
                <span><?php echo $product?> </span>
                <?php endforeach;?>
              <?php endforeach;?>
            </td>
          </tr>
          <?php endif;?>
          <tr>
            <th><?php echo $lang->contract->amount;?></th>
            <td><?php echo zget($currencySign, $contract->currency, '') . formatMoney($contract->amount);?></td>
          </tr>
          <tr>
            <th class='w-70px'><?php echo $lang->contract->delivery;?></th>
            <td><?php echo $lang->contract->deliveryList[$contract->delivery];?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->return;?></th>
            <td><?php echo $lang->contract->returnList[$contract->return];?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->status;?></th>
            <td><?php echo $lang->contract->statusList[$contract->status];?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->contact;?></th>
            <td><?php if(isset($contacts[$contract->contact]) and trim($contacts[$contract->contact]) != "") echo html::a($this->createLink('contact', 'view', "contactID={$contract->contact}"), $contacts[$contract->contact]);?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->begin;?></th>
            <td><?php echo $contract->begin;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->end;?></th>
            <td><?php echo $contract->end;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->handlers;?></th>
            <td>
              <?php
              foreach(explode(',', $contract->handlers) as $handler)
              {
                  if($handler and isset($users[$handler])) echo $users[$handler] . ' ';
              }
              ?>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <?php if(!empty($contract->returnList)):?>
    <div class='panel'>
      <div class='panel-heading'>
        <div class='row'>      
          <div class='col-sm-3'><strong><i class="icon-list-info"></i> <?php echo $lang->contract->returnedDate;?></strong></div>
          <div class='col-sm-4'><strong><?php echo $lang->contract->returnedBy;?></strong></div> 
          <div class='col-sm-3'><strong><?php echo $lang->contract->amount;?></strong></div> 
        </div>
      </div>
      <table class='table table-data table-condensed'>
        <?php foreach($contract->returnList as $return):?>
        <tr>
          <td class='w-p30'><?php echo $return->returnedDate;?></td>
          <td class='w-p30'><?php echo zget($users, $return->returnedBy, $return->returnedBy);?></td>
          <td class='w-p20'><?php echo zget($currencySign, $contract->currency, '') . formatMoney($return->amount);?></td>
          <td class='w-p20'>
            <?php commonModel::printLink('contract', 'editReturn', "id=$return->id", $lang->edit, "data-toggle='modal'");?>
            <?php commonModel::printLink('contract', 'deleteReturn', "id=$return->id", $lang->delete, "class='deleter'");?>
         </td>
        </tr>
        <?php endforeach;?>
      </table>
    </div>
    <?php endif;?>
    <?php if(!empty($contract->deliveryList)):?>
    <div class='panel'>
      <div class='panel-heading'>
        <div class='row'>      
          <div class='col-sm-3'><strong><i class="icon-list-info"></i> <?php echo $lang->contract->deliveredDate;?></strong></div>
          <div class='col-sm-3'><strong><?php echo $lang->contract->deliveredBy;?></strong></div> 
          <div class='col-sm-6'><strong><?php echo $lang->comment;?></strong></div> 
        </div>
      </div>
      <table class='table table-data table-condensed'>
        <?php foreach($contract->deliveryList as $delivery):?>
        <tr>
          <td class='w-p25'><?php echo $delivery->deliveredDate;?></td>
          <td class='w-p20'><?php echo zget($users, $delivery->deliveredBy, $delivery->deliveredBy);?></td>
          <td class='w-p35'><?php echo $delivery->comment;?></td>
          <td class='w-p20'>
            <?php commonModel::printLink('contract', 'editDelivery', "id=$delivery->id", $lang->edit, "data-toggle='modal'");?>
            <?php commonModel::printLink('contract', 'deleteDelivery', "id=$delivery->id", $lang->delete, "class='deleter'");?>
         </td>
        </tr>
        <?php endforeach;?>
      </table>
    </div>
    <?php endif;?>
    <div class='panel'>
      <div class='panel-heading'>
        <strong><?php echo $lang->contract->lifetime;?></strong>
      </div>
      <div class='panel-body'>
        <table class='table table-info' id='contractLife'>
          <tr>
            <th class='w-70px'><?php echo $lang->contract->createdBy;?></th>
            <td><?php echo zget($users, $contract->createdBy, $contract->createdBy) . $lang->at . $contract->createdDate;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->signedBy;?></th>
            <td><?php if($contract->signedBy) echo zget($users, $contract->signedBy, $contract->signedBy) . $lang->at . $contract->signedDate;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->deliveredBy;?></th>
            <td><?php if($contract->deliveredBy) echo zget($users, $contract->deliveredBy, $contract->deliveredBy) . $lang->at . $contract->deliveredDate;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->returnedBy;?></th>
            <td><?php if($contract->returnedBy) echo zget($users, $contract->returnedBy, $contract->returnedBy) . $lang->at . $contract->returnedDate;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->finishedBy;?></th>
            <td><?php if($contract->finishedBy) echo zget($users, $contract->finishedBy, $contract->finishedBy) . $lang->at . $contract->finishedDate;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->canceledBy;?></th>
            <td><?php if($contract->canceledBy) echo zget($users, $contract->canceledBy, $contract->canceledBy) . $lang->at . $contract->canceledDate;?></td>
          </tr>
          <tr>
            <th><?php echo $lang->contract->editedBy;?></th>
            <td><?php if($contract->editedBy) echo zget($users, $contract->editedBy, $contract->editedBy) . $lang->at . $contract->editedDate;?></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
