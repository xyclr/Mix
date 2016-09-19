<?php 
/**
 * The edit view file of order module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     order 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php'; ?>
<?php include '../../common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php'; ?>
<ul id='menuTitle'>
  <li><?php commonModel::printLink('order', 'browse', '', "<i class='icon-list-ul'></i> " . $lang->order->list);?></li>
  <li class='divider angle'></li>
  <li><?php commonModel::printLink('order', 'view', "orderID={$order->id}", $lang->order->view);?></li>
  <li class='divider angle'></li>
  <li class='title'><?php echo $lang->order->edit?></li>
</ul>
<form method='post' id='ajaxForm' class='form-condensed'>
  <div class='row-table'>
    <div class='col-main'>
      <?php echo $this->fetch('action', 'history', "objectType=order&objectID={$order->id}");?>
      <div class='page-actions'>
        <?php echo html::submitButton();?>
        <?php echo html::backButton();?>
        <?php echo html::hidden('referer', $this->server->http_referer);?>
      </div>
    </div>
    <div class="col-side">
      <div class='panel'>
        <div class='panel-heading'><strong><i class="icon-list-info"></i> <?php echo $lang->order->basicInfo;?></strong></div>
        <div class='panel-body'>
          <table class='table table-info'>
            <tr>
              <th class='w-70px'><?php echo $lang->order->customer;?></th>
              <td><?php echo html::select('customer', $customers, $order->customer, "class='form-control chosen'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->product;?></th>
              <td><?php echo html::select('product[]', $products, $order->product, "class='form-control chosen' multiple");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->currency;?></th>
              <td><?php echo html::select('currency', $currencyList, $order->currency, "class='form-control' disabled");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->plan;?></th>
              <td><?php echo html::input('plan', $order->plan, "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->real;?></th>
              <td><?php echo html::input('real', $order->real, "class='form-control' disabled");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->assignedTo;?></th>
              <td><?php echo html::select('assignedTo', $users, $order->assignedTo, "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->assignedBy;?></th>
              <td><?php echo html::select('assignedBy', $users, $order->assignedBy, "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->assignedDate;?></th>
              <td><?php echo html::input('assignedDate', formatTime($order->assignedDate), "class='form-control form-datetime'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->status;?></th>
              <td><?php echo html::select('status', $lang->order->statusList, $order->status, "class='form-control'");?></td>
            </tr>
          </table>
        </div>
      </div>
      <div class='panel'>
        <div class='panel-heading'><strong><i class='icon-file-text-alt'></i> <?php echo $lang->order->lifetime;?></strong></div>
        <div class='panel-body'>
          <table class='table table-info'>
            <tr>
              <th><?php echo $lang->order->createdBy;?></th>
              <td><?php echo $order->createdBy;?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->contactedDate;?></th>
              <td><?php echo $order->contactedDate;?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->nextDate;?></th>
              <td><?php echo html::input('nextDate', $order->nextDate, "class='form-control form-date'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->signedBy;?></th>
              <td><?php echo html::select('signedBy', $users, $order->signedBy, "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->signedDate;?></th>
              <td><?php echo html::input('signedDate', $order->signedDate, "class='form-control form-date'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->closedBy;?></th>
              <td><?php echo html::select('closedBy', $users, $order->closedBy, "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->closedReason;?></th>
              <td><?php echo html::select('closedReason', $lang->order->closedReasonList, $order->closedReason, "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->closedDate;?></th>
              <td><?php echo html::input('closedDate', formatTime($order->closedDate), "class='form-control form-datetime'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->activatedBy;?></th>
              <td><?php echo html::select('activatedBy', $users, $order->activatedBy, "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->order->activatedDate;?></th>
              <td><?php echo html::input('activatedDate', formatTime($order->activatedDate), "class='form-control form-datetime'");?></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</form>
<?php include '../../common/view/footer.html.php';?>
