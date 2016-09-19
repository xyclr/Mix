<?php 
/**
 * The browse view file of order module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     order 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php js::set('mode', $mode);?>
<li id='bysearchTab'><?php echo html::a('#', "<i class='icon-search icon'></i>" . $lang->search->common)?></li>
<div id='menuActions'>
  <?php if(commonModel::hasPriv('order', 'export')):?>
  <div class='btn-group'>
    <button data-toggle='dropdown' class='btn btn-primary dropdown-toggle' type='button'><i class='icon-upload-alt'></i> <?php echo $lang->export;?> <span class='caret'></span></button>
    <ul id='exportActionMenu' class='dropdown-menu'>
      <li><?php commonModel::printLink('order', 'export', "mode=all&&orderBy={$orderBy}", $lang->exportAll, "class='iframe' data-width='700'");?></li>
      <li><?php commonModel::printLink('order', 'export', "mode=thisPage&&orderBy={$orderBy}", $lang->exportThisPage, "class='iframe' data-width='700'");?></li>
    </ul>
  </div>
  <?php endif;?>
  <?php commonModel::printLink('order', 'create', '', '<i class="icon-plus"></i> ' . $lang->order->create, 'class="btn btn-primary"');?>
</div>
<div class='panel'>
  <table class='table table-hover table-striped tablesorter table-data table-fixed'>
    <thead>
      <tr class='text-center'>
        <?php $vars = "mode={$mode}&orderBy=%s&recTotal={$pager->recTotal}&recPerPage={$pager->recPerPage}&pageID={$pager->pageID}";?>
        <th class='w-60px'><?php commonModel::printOrderLink('id', $orderBy, $vars, $lang->order->id);?></th>
        <th class='w-60px visible-lg'><?php commonModel::printOrderLink('level', $orderBy, $vars, $lang->customer->level);?></th>
        <th class='text-left'><?php commonModel::printOrderLink('customer', $orderBy, $vars, $lang->order->customer);?></th>
        <th><?php commonModel::printOrderLink('product', $orderBy, $vars, $lang->order->product);?></th>
        <th class='w-90px'><?php commonModel::printOrderLink('plan', $orderBy, $vars, $lang->order->plan);?></th>
        <th class='w-90px'><?php commonModel::printOrderLink('real', $orderBy, $vars, $lang->order->real);?></th>
        <th class='w-80px'><?php commonModel::printOrderLink('assignedTo', $orderBy, $vars, $lang->order->assignedTo);?></th>
        <th class='w-60px'><?php commonModel::printOrderLink('status', $orderBy, $vars, $lang->order->status);?></th>
        <th class='w-90px visible-lg'><?php commonModel::printOrderLink('contactedDate', $orderBy, $vars, $lang->order->contactedDate);?></th>
        <th class='w-90px'><?php commonModel::printOrderLink('nextDate', $orderBy, $vars, $lang->order->nextDate);?></th>
        <th class='w-180px text-center'><?php echo $lang->actions;?></th>
      </tr>
    </thead>
    <tbody>
      <?php if(!empty($orders)) foreach($orders as $order):?>
      <?php $status = $order->status != 'closed' ? "order-{$order->status}" : "order-{$order->closedReason}"?>
      <tr class='text-center' data-url='<?php echo $this->createLink('order', 'view', "orderID=$order->id");?>'>
        <?php $products = ''; foreach($order->products as $product) $products .= $product . ' ';?>
        <td><?php echo $order->id;?></td>
        <td class='visible-lg'><?php echo zget($lang->customer->levelNameList, $order->level, $order->level);?></td>
        <td class='text-left'><?php echo $order->customerName;?></td>
        <td title='<?php echo $products;?>'><?php echo $products;?></td>
        <td class='text-right'><?php echo zget($currencySign, $order->currency, '') . formatMoney($order->plan);?></td>
        <td class='text-right'><?php echo zget($currencySign, $order->currency, '') . formatMoney($order->real);?></td>
        <td><?php if(isset($users[$order->assignedTo])) echo $users[$order->assignedTo];?></td>
        <td class="<?php echo $status;?>">
          <?php if($order->status != 'closed') echo isset($lang->order->statusList[$order->status]) ? $lang->order->statusList[$order->status] : $order->status;?>
          <?php if($order->status == 'closed') echo $lang->order->closedReasonList[$order->closedReason];?>
        </td>
        <td class='visible-lg'><?php echo formatTime($order->contactedDate, DT_DATE1);?></td>
        <td><?php echo $order->nextDate;?></td>
        <td class='actions'><?php echo $this->order->buildOperateMenu($order); ?></td>
      </tr>
      <?php endforeach;?>
    </tbody>
  </table>
  <div class='table-footer'>
    <?php if(isset($totalAmount)):?>
    <div class='pull-left text-danger'>
      <?php if(!empty($totalAmount)) printf($lang->order->totalAmount, implode('，', $totalAmount['plan']), implode('，', $totalAmount['real']));?>
    </div>
    <?php endif;?>
    <?php $pager->show();?>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
