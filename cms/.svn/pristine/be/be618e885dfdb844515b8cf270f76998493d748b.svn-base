<?php
/**
 * The batch create view of trade module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     trade
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include $app->getModuleRoot() . 'common/view/header.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<?php js::set('dittoText', $lang->ditto);?>
<form id='ajaxForm' method='post'>
  <div class='panel'>
    <div class='panel-heading'><strong><?php echo $lang->trade->batchCreate;?></strong></div>
    <table class='table table-hover'>
      <thead>
        <tr class='text-center'>
          <th class='w-160px'><?php echo $lang->trade->depositor;?></th>
          <th class='w-100px'><?php echo $lang->trade->type;?></th> 
          <th class='w-160px'><?php echo $lang->trade->category;?></th> 
          <th class='w-260px'><?php echo $lang->trade->trader;?></th> 
          <th class='w-100px'><?php echo $lang->trade->money;?></th>
          <th class='w-80px'> <?php echo $lang->trade->dept;?></th>
          <th class='w-120px'><?php echo $lang->trade->handlers;?></th>
          <th class='w-110px'><?php echo $lang->trade->date;?></th>
          <th><?php echo $lang->trade->desc;?></th>
        </tr>
      </thead>
      <tbody>
        <?php for($i = 0; $i < $config->trade->batchCreateCount; $i++):?>
        <tr>
          <td><?php echo html::select("depositor[$i]", $depositors, '', "class='form-control' id='depositor{$i}'");?></td>
          <td><?php echo html::select("type[$i]", $lang->trade->typeList, 'out', "class='form-control type' id='type{$i}'");?></td>
          <td>
            <?php echo html::select("category[$i]", $incomeTypes, '', "class='form-control in' style='display:none'");?>
            <?php echo html::select("category[$i]", $expenseTypes, '', "class='form-control out' id='category{$i}'");?>
          </td>
          <td>
            <div class='input-group out'>
              <?php echo html::select("trader[$i]", $traderList, '', "class='form-control chosen' id='trader{$i}'");?>
              <?php  echo html::input("traderName[$i]", '', "class='form-control' id='traderName{$i}' style='display:none'");?>
              <span class='input-group-addon'>
                <label class="checkbox">
                  <input type="checkbox" name="createTrader[<?php echo $i;?>]" value="1"> <?php echo $lang->trade->newTrader;?>
                </label>
              </span>
            </div>
            <div class='in'><?php echo html::select("trader[$i]", $customerList, '', "class='form-control in chosen' id='trader{$i}' style='display:none'");?></div>
          </td>
          <td><?php echo html::input("money[$i]", '', "class='form-control'");?></td>
          <td><?php echo html::select("dept[$i]", $deptList, '', "class='form-control chosen'");?></td>
          <td><?php echo html::select("handlers[$i][]", $users, '', "class='form-control chosen' id='handlers{$i}' multiple");?></td>
          <td><?php echo html::input("date[$i]", date('Y-m-d'), "class='form-control form-date' id='date{$i}'");?></td>
          <td><?php echo html::textarea("desc[$i]", '', "rows='1' class='form-control'");?></td>
        </tr>
        <?php endfor;?>
      </tbody>
      <tr><td colspan='9' class='text-center'><?php echo html::submitButton() . html::backButton();?></td></tr>
    </table>
  </div>
</form>
<?php include $app->getModuleRoot() . 'common/view/footer.html.php';?>
