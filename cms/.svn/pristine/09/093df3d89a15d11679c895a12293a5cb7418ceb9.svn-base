<?php
/**
 * The view file of edit function of address module of RanZhi.
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
<?php include '../../../sys/common/view/chosen.html.php';?>
<form id='addressForm' method='post' action='<?php echo inlink('edit', "addressID=$address->id")?>'>
  <table class='table table-form'>
    <tr>
      <th class='w-60px'><?php echo $lang->address->title;?></th>
      <td><?php echo html::input('title', $address->title, "class='form-control'")?></td>
    </tr>
    <tr>
      <th><?php echo $lang->address->area;?></th>
      <td><?php echo html::select('area', $areas, isset($address->area) ? $address->area : '', "class='form-control chosen'")?></td>
    </tr>
    <tr>
      <th><?php echo $lang->address->location;?></th>
      <td><?php echo html::input('location', $address->location, "class='form-control'")?></td>
    </tr>
    <tr>
      <th></th>
      <td><?php echo html::submitButton() . html::commonButton($lang->goback, 'reloadModal btn');?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
