<?php 
/**
 * The create view file of product module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     product 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<form method='post' action='<?php echo inlink('create');?>' id='ajaxForm'>
  <table class='table table-form'>
    <tr>
      <th class='w-50px'><?php echo $lang->product->name;?></th>
      <td><?php echo html::input('name', '', "class='form-control'");?></td><td></td>
    </tr>
    <tr>
      <th><?php echo $lang->product->line;?></th>
      <td><?php echo html::select("line", $lang->product->lineList, '', "class='form-control'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->product->type;?></th>
      <td><?php echo html::select("type", $lang->product->typeList, '', "class='form-control'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->product->status;?></th>
      <td><?php echo html::select("status", $lang->product->statusList, '', "class='form-control'");?></td>
    </tr>
    <tr>
      <th></th>
      <td><?php echo html::submitButton();?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
