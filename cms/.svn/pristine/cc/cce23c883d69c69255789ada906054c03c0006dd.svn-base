<?php 
/**
 * The inveset view file of trade module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     trade 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<div class='panel'>
  <div class='panel-heading'>
    <strong><i class="icon-plus"></i> <?php echo $lang->trade->inveset;?></strong>
  </div>
  <div class='panel-body'>
    <form method='post' id='ajaxForm'>
      <table class='table table-form w-p60'>
        <tr>
          <th class='w-100px'><?php echo $lang->trade->depositor;?></th>
          <td><?php echo html::select('depositor', $depositorList, '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->type;?></th>
          <td><?php echo html::select('type', $lang->trade->invesetTypeList, '', "class='form-control'");?></td>
        </tr>
        <tr class='trader'>
          <th><?php echo $lang->trade->trader;?></th>
          <td>
            <?php if(count($traderList) > 1):?>
            <div class='input-group'>
              <?php  echo html::select('trader', $traderList, '', "class='form-control chosen'");?>
              <?php  echo html::input('traderName', '', "class='form-control' style='display:none'");?>
              <div class='input-group-addon'><?php echo html::checkbox('createTrader', array( 1 => $lang->trade->newTrader));?></div>
            </div>
            <?php else:?>
            <?php echo html::input('traderName', '', "class='form-control'") . html::hidden('createTrader', '');?>
            <?php endif;?>
          </td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->money;?></th>
          <td><?php echo html::input('money', '', "class='form-control'");?></td>
        </tr>
        <tr class='category hide'>
          <th><?php echo $lang->trade->in;?></th>
          <td>
            <div class='input-group'>
              <?php echo html::select('invesetCategory', $lang->trade->invesetCategoryList, '', "class='form-control'");?>
              <span class="input-group-addon fix-border fix-padding"></span>
              <?php echo html::input('invesetMoney', '', "class='form-control'");?>
            </div>
          </td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->dept;?></th>
          <td><?php echo html::select('dept', $deptList, '', "class='form-control chosen'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->handlers;?></th>
          <td><?php echo html::select('handlers[]', $users, '', "class='form-control chosen' multiple");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->date;?></th>
          <td><?php echo html::input('date', date('Y-m-d'), "class='form-control form-date'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->desc;?></th>
          <td><?php echo html::textarea('desc','', "class='form-control' rows='8'");?></td>
        </tr>
        <tr>
          <th></th>
          <td><?php echo html::submitButton() . '&nbsp;&nbsp;' . html::backButton();?></td>
        </tr>
      </table>
    </form>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
