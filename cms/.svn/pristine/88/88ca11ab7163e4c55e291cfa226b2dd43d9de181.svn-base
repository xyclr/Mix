<?php
/**
 * The order block view file of block module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     block
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<table class='table table-data table-hover block-order table-fixed'>
  <?php foreach($orders as $id => $order):?>
  <?php $appid = ($this->get->app == 'sys' and isset($_GET['entry'])) ? "class='app-btn' data-id='{$this->get->entry}'" : ''?>
  <tr data-url='<?php echo $this->createLink('crm.order', 'view', "orderID=$id"); ?>' <?php echo $appid?>>
    <td><?php if(isset($customers[$order->customer])) echo $customers[$order->customer]?></td>
    <td class='text-center w-90px'><?php echo $order->real == '0.00' ? $order->plan : $order->real;?></td>
    <td class='w-50px'><?php echo $lang->order->statusList[$order->status]?></td>
  </tr>
  <?php endforeach;?>
</table>
<script>$('.block-order').dataTable();</script>
