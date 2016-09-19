<?php
/**
 * The reimburse view file of refund module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     refund 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<form method='post' id='ajaxForm' action='<?php echo inlink('createtrade', "refundid={$refundID}")?>'>
  <table class='table table-form'>
    <tr>
      <th class='w-60px'><?php echo $lang->trade->depositor;?></th>
      <td><?php echo html::select('depositor', $depositorList, '', "class='form-control'");?></td>
      <td><?php echo html::submitButton();?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
