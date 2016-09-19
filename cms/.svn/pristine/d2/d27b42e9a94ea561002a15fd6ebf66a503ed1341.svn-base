<?php 
/**
 * The create view of contact module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     contact 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<div class='panel'>
  <div class='panel-heading'>
    <strong><i class="icon-plus"></i> <?php echo $lang->contact->create;?></strong>
  </div>
  <div class='panel-body'>
    <form method='post' id='contactForm' class='form-condensed'>
      <div class='row'>
        <div class='col-md-9'>
          <table class='table table-form'>
            <tr>
              <th class='w-100px'><?php echo $lang->contact->realname;?></th>
              <td class='w-p40'><?php echo html::input('realname', '', "class='form-control'");?><td>
            </tr>
            <tr>
              <th><?php echo $lang->contact->provider;?></th>
              <td>
                <div class='input-group'>
                  <?php echo html::select('customer', $customers, !empty($customer) ? $customer : '', "class='form-control chosen'");?>
                  <?php echo html::input('name', '', "class='form-control' style='display:none'");?>
                  <span class='input-group-addon'>
                    <label class='checkbox'>
                      <input type='checkbox' name='newCustomer' id='newCustomer' value='1' /><?php echo $lang->contact->newCustomer?>
                    </label>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th><?php echo $lang->contact->gender;?></th>
              <td><?php unset($lang->genderList->u); echo html::radio('gender', $lang->genderList, '');?></td>
            </tr>
            <tr>
              <th><?php echo $lang->contact->email;?></th>
              <td><?php echo html::input('email', '', "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->contact->mobile;?></th>
              <td><?php echo html::input('mobile', '', "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->contact->phone;?></th>
              <td><?php echo html::input('phone', '', "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->contact->fax;?></th>
              <td><?php echo html::input('fax', '', "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->contact->qq;?></th>
              <td><?php echo html::input('qq', '', "class='form-control'");?></td>
            </tr>
            <tr class='customerInfo hide'>
              <th><?php echo $lang->customer->type;?></th>
              <td><?php echo html::select('type', $lang->customer->typeList, '', "class='form-control'");?></td>
            </tr>
            <tr class='customerInfo hide'>
              <th><?php echo $lang->customer->size;?></th>
              <td><?php echo html::select('size', $sizeList, '', "class='form-control'");?></td>
            </tr>
            <tr class='customerInfo hide'>
              <th><?php echo $lang->customer->status;?></th>
              <td><?php echo html::select('status', $lang->customer->statusList, '', "class='form-control'");?></td>
            </tr>
            <tr class='customerInfo hide'>
              <th><?php echo $lang->customer->level;?></th>
              <td><?php echo html::select('level', $levelList, '', "class='form-control'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->contact->createdDate;?></th>
              <td><?php echo html::input('createdDate', date('Y-m-d H:i:s'), "class='form-control form-datetime'");?></td>
            </tr>
            <tr>
              <th><?php echo $lang->contact->desc;?></th>
              <td colspan='2'><?php echo html::textarea('desc', '', "rows='3' class='form-control'");?></td>
            </tr>
            <tr>
              <th></th>
              <td colspan='2'>
                <?php echo html::submitButton() . '&nbsp;&nbsp;' . html::backButton();?>
                <div id='duplicateError' class='hide'></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
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
