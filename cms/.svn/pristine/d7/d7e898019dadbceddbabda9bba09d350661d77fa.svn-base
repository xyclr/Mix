<?php
/**
 * The mail file of order module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chu Jilu <chujilu@cnezsoft.com>
 * @package     order
 * @version     $Id: sendmail.html.php 867 2010-06-17 09:32:58Z yuren_@126.com $
 * @link        http://www.ranzhico.com
 */
?>
<?php
$onlybody = isonlybody() ? true : false;
if($onlybody) $_GET['onlybody'] = 'no';
?>
<table width='98%' align='center'>
  <tr class='header'>
    <td>
      ORDER #<?php echo $order->id . "=>$order->assignedTo " . html::a(commonModel::getSysURL() . $this->createLink('crm.order', 'view', "orderID=$order->id"), $order->title);?>
    </td>
  </tr>
  <tr>
    <td>
    <fieldset>
      <legend><?php echo $lang->order->view;?></legend>
      <div class='content'>
        <?php $productName = count($order->products) > 1 ? current($order->products) . $lang->etc : current($order->products);?>
        <p><?php printf($lang->order->infoBuy, $order->customerName, $productName);?></p>
        <?php if($order->status == 'signed' and $contract):?>
        <p><?php printf($lang->order->infoContract, $order->contractName);?></p>
        <?php endif;?>
        <p><?php printf($lang->order->infoAmount, $order->plan, $order->real)?></p>
        <p>
          <?php if(formatTime($order->contactedDate)) printf($lang->order->infoContacted, $order->contactedDate)?>
          <?php if(formatTime($order->nextDate)) printf($lang->order->infoNextDate, $order->nextDate)?>
        </p>
      </div>
    </fieldset>
    </td>
  </tr>
  <tr>
    <td><?php include '../../../sys/common/view/mail.html.php';?></td>
  </tr>
</table>
<?php if($onlybody) $_GET['onlybody'] = 'yes';?>
