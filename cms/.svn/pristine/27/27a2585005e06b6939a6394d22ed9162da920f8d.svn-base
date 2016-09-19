<?php
/**
 * The view file of edit function of resume module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     resume
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php include '../../common/view/datepicker.html.php';?>
<form id='resumeForm' method='post' action='<?php echo inlink('edit', "resumeID=$resume->id")?>'>
  <table class='table table-form'>
    <tr>
      <th><?php echo $lang->resume->customer;?></th>
      <td colspan='2'><?php echo $customer->name;?></td>
    </tr>
    <tr>
      <th class='w-70px'><?php echo $lang->resume->dept;?></th>
      <td><?php echo html::input('dept', $resume->dept, "class='form-control'")?></td>
    </tr>
    <tr>
      <th><?php echo $lang->resume->maker?></th>
      <td>
        <?php $checked = $resume->maker ? "checked='checked'" : '';?>
        <input type='checkbox' name='maker' id='maker' value='1' <?php echo $checked?>/>
        <label for='maker'><?php echo $lang->resume->maker?></label>
      </td>
    </tr>
    <tr>
      <th><?php echo $lang->resume->title;?></th>
      <td><?php echo html::input('title', $resume->title, "class='form-control'")?></td>
    </tr>
    <tr>
      <th><?php echo $lang->resume->join;?></th>
      <td><?php echo html::input('join', $resume->join, "class='form-control form-date'")?></td>
    </tr>
    <tr>
      <th><?php echo $lang->resume->left;?></th>
      <td><?php echo html::input('left', $resume->left, "class='form-control form-date'")?></td>
    </tr>
    <tr>
      <th></th>
      <td><?php echo html::submitButton() . html::commonButton($lang->goback, 'reloadModal btn');?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
