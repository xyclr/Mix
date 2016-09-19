<?php
/**
 * The activate view file of order module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     order
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<form method='post' id='ajaxForm' action='<?php echo $this->createLink('order', 'activate', "orderID=$orderID")?>'>
  <table class='table table-form'>
    <tr>
      <th class='w-100px'><?php echo $lang->order->assignedTo;?></th>
      <td class='w-p40'><?php echo html::select('assignedTo', $users, '', "class='form-control chosen'")?></td><td></td>
    </tr>
    <tr>
      <th><?php echo $lang->comment?></th>
      <td colspan='2'><?php echo html::textarea('comment')?></td>
    </tr>
    <tr>
      <th></th>
      <td><?php echo html::submitButton();?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
