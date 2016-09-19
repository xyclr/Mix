<?php
/**
 * The edit order record view file of order module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Xiying Guan <guanxiying@xirangit.com>
 * @package     order
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php if(helper::isAjaxRequest()):?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php else:?>
<?php include '../../../sys/common/view/header.lite.html.php';?>
<?php endif;?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php js::set('from', $from);?>
<?php js::set('referer', $this->server->http_referer);?>
<form method='post' id='editRecord' action='<?php echo inlink('editrecord', "recordID=$record->id")?>'>
  <table class='table table-form'>
    <?php if($record->objectType != 'contact'):?>
    <tr>
      <th><?php echo $lang->action->record->contact;?></th>
      <td><?php echo html::select('contact', $contacts, $record->contact, "class='form-control chosen select-contact'");?></td>
    </tr>
    <?php endif;?>
    <tr>
      <th class='w-70px'><?php echo $lang->action->record->date;?></th>
      <td><?php echo html::input('date', formatTime($record->date), "class='form-control form-datetime'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->action->record->comment;?></th>
      <td><?php echo html::textarea('comment', $record->comment, "class='form-control' rows='5'");?></td>
    </tr>
    <tr>
      <th></th>
      <td><?php echo html::submitButton() . html::hidden('referer', $this->server->http_referer);?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
