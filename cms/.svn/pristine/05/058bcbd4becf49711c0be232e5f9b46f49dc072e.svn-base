<?php 
/**
 * The create view file of customer module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     customer 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<div class='panel'>
  <div class='panel-heading'>
    <strong><i class="icon-plus"></i> <?php echo $lang->customer->create;?></strong>
  </div>
  <div class='panel-body'>
    <form method='post' id='customerForm' class='form-condensed'>
      <table class='table table-form'>
        <tr>
          <th class='w-80px'><?php echo $lang->customer->name;?></th>
          <td class='w-p40'>
            <div class='input-group'>
              <?php echo html::input('name', '', "class='form-control'");?>
              <div class='input-group-addon'>
                <label class='checkbox'><input type='checkbox' id='public' name='public' value='1'> <?php echo $lang->customer->public;?></label>
              </div>
            </div>
          </td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->customer->contact;?></th>
          <td><?php echo html::input('contact', '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->customer->phone;?></th>
          <td><?php echo html::input('phone', '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->customer->email;?></th>
          <td><?php echo html::input('email', '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->customer->qq;?></th>
          <td><?php echo html::input('qq', '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->customer->type;?></th>
          <td><?php echo html::select("type", $lang->customer->typeList, '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->customer->size;?></th>
          <td><?php echo html::select('size', $sizeList, '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->customer->status;?></th>
          <td><?php echo html::select("status", $lang->customer->statusList, '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->customer->level;?></th>
          <td><?php echo html::select('level', $levelList, 0, "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->customer->intension;?></th>
          <td colspan='2'><?php echo html::textarea('intension', '', "rows='2' class='form-control'");?></td>
        </tr>
        <tr>
          <th></th>
          <td colspan='2'>
            <?php echo html::submitButton() . '&nbsp;&nbsp;' . html::backButton();?>
            <div id='duplicateError' class='hide'></div>
          </td>
        </tr>
      </table>
    </form>
  </div>
</div>
<div class='errorMessage hide'>
  <div class='alert alert-danger alert-dismissable'>
    <button aria-hidden='true' data-dismiss='alert' class='close' type='button'>×</button>
    <button type='submit' class='btn btn-default' id='continueSubmit'><?php echo $lang->continueSave;?></button>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
