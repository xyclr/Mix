<?php
/**
 * The batch edit trade view of trade module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Xiying Guan <guanxiying@xirangit.com>
 * @package     trade
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include $app->getModuleRoot() . 'common/view/header.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<form id='ajaxForm' method='post' action="<?php echo inlink('batchedit', 'step=save')?>">
  <div class='panel'>
    <div class='panel-heading'><strong><?php echo $lang->trade->showImport;?></strong></div>
    <table class='table table-hover'>
      <thead>
        <tr class='text-center'>
          <th class='w-100px'><?php echo $lang->trade->type;?></th> 
          <th class='w-100px'><?php echo $lang->trade->depositor;?></th>
          <th class='w-120px'><?php echo $lang->trade->category;?></th> 
          <th class='w-180px'><?php echo $lang->trade->trader;?></th> 
          <th class='w-120px'><?php echo $lang->trade->money;?></th>
          <th class='w-80px'><?php echo $lang->trade->dept;?></th>
          <th class='w-200px'><?php echo $lang->trade->handlers;?></th>
          <th class='w-120px'><?php echo $lang->trade->date;?></th>
          <th><?php echo $lang->trade->desc;?></th>
        </tr>
      </thead>
      <tbody>
        <?php foreach($trades as $id => $trade):?>
        <tr>
          <td>
            <?php echo html::input("", zget($lang->trade->typeList, $trade->type), "class='form-control' readonly");?>
            <?php echo html::hidden("type[{$id}]", $trade->type);?>
          </td>
          <td><?php echo html::select("depositor[{$id}]", $depositors, $trade->depositor, "class='form-control' id='depositor{$id}'");?></td>
          <td>
            <?php $disabled = in_array($trade->category, array('fee', 'profit', 'loss')) ? 'disabled' : '';?>
            <?php if($trade->type == 'in') echo html::select("category[$id]", $incomeTypes, $trade->category, "class='form-control in' id='category{$id}' $disabled");?>
            <?php if($trade->type == 'out') echo html::select("category[$id]", $expenseTypes, $trade->category, "class='form-control in' id='category{$id}' $disabled");?>
            <?php if(in_array($trade->type, array('transferin', 'transferout', 'inveset', 'redeem'))) echo html::select("category[$id]", $lang->trade->categoryList, $trade->category, "class='form-control' disabled");?>
          </td>
          <td>
            <?php if($trade->type == 'in' and !in_array($trade->category, array('profit'))) echo html::select("trader[{$id}]", $customerList, $trade->trader, "class='form-control chosen'");?>
            <?php if($trade->type == 'out' and !in_array($trade->category, array('fee', 'loss'))) echo html::select("trader[{$id}]", $traderList, $trade->trader, "class='form-control chosen'");?>
            <?php if(in_array($trade->type, array('transferin', 'transferout', 'inveset', 'redeem')) or in_array($trade->category, array('profit', 'fee', 'loss'))) echo html::hidden("trader[$id]", 0);?>
          </td>
          <td><?php echo html::input("money[$id]", $trade->money, "class='form-control' id='money{$id}'");?></td>
          <td><?php echo html::select("dept[$id]", $deptList, $trade->dept, "class='form-control chosen' id='dept{$id}'");?></td>
          <td><?php echo html::select("handlers[$id][]", $users, $trade->handlers, "class='form-control chosen' id='handlers{$id}' multiple");?></td>
          <td><?php echo html::input("date[$id]", $trade->date, "class='form-control form-date' id='date{$id}'");?></td>
          <td><?php echo html::textarea("desc[$id]", $trade->desc, "rows='1' class='form-control'");?></td>
        </tr>
        <?php endforeach;?>
      </tbody>
      <tfoot><tr><td colspan='9' class='text-center'><?php echo html::submitButton() . html::backButton();?></td></tr></tfoot>
    </table>
  </div>
</form>
<?php include $app->getModuleRoot() . 'common/view/footer.html.php';?>
