<?php
/**
 * The view file of browse function of address module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     address
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<table class='table table-bordered table-data'>
  <tr class='text-center'>
    <th class='w-150px'><?php echo $lang->address->title;?></th>
    <th><?php echo $lang->address->location;?></th>
    <th class='w-100px'><?php echo $lang->actions;?></th>
    <th class='w-70px text-middle' rowspan='<?php echo count($addresses) + 1;?>'>
      <?php commonModel::printLink('address', 'create', "objectType=$objectType&objectID=$objectID", $lang->create, "class='loadInModal btn btn-primary' title='{$lang->address->create}'");?>
    </th>
  </tr>
  <?php foreach($addresses as $address):?>
  <tr>
    <td><?php echo $address->title?></td>
    <td><?php echo $address->fullLocation;?></td>
    <td>
      <?php
      if($address->objectType == $objectType and $address->objectID == $objectID)
      {
          commonModel::printLink('address', 'edit', "addressID=$address->id", $lang->edit, "class='loadInModal'");
          commonModel::printLink('address', 'delete', "addressID=$address->id", $lang->delete, "class='deleter'");
      }
      ?>
    </td>
  </tr>
  <?php endforeach;?>
</table>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
