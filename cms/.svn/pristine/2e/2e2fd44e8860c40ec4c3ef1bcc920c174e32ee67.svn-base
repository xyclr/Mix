<?php
/**
 * The show import view of trade module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     trade
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include $app->getModuleRoot() . 'common/view/header.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<form id='ajaxForm' method='post'>
  <div class='panel'>
    <div class='panel-heading'><strong><?php echo $lang->trade->showImport;?></strong></div>
    <table class='table table-hover'>
      <thead>
        <tr class='text-center'>
          <th class='w-100px'><?php echo $lang->trade->depositor;?></th>
          <th class='w-90px'><?php echo $lang->trade->type;?></th> 
          <th class='w-120px'><?php echo $lang->trade->category;?></th> 
          <th class='w-220px'><?php echo $lang->trade->trader;?></th> 
          <th class='w-100px'><?php echo $lang->trade->money;?></th>
          <th class='w-80px'><?php echo $lang->trade->dept;?></th>
          <th class='w-170px'><?php echo $lang->trade->handlers;?></th>
          <th class='w-110px'><?php echo $lang->trade->date;?></th>
          <th><?php echo $lang->trade->desc;?></th>
        </tr>
      </thead>
      <tbody>
        <?php
        $incomeTypes['ditto']  = $lang->ditto;
        $expenseTypes['ditto'] = $lang->ditto;
        $deptList['ditto']     = $lang->ditto;
        ?>
        <?php foreach($trades as $i => $trade):?>
        <?php
        if($i == 0)
        {
            $trade['category'] = $trade['category'] ? $trade['category'] : '';
            $trade['dept']     = $trade['dept'] ? $trade['dept'] : '';
        }
        else
        {
            $trade['category'] = $trade['category'] ? $trade['category'] : 'ditto';
            $trade['dept']     = $trade['dept'] ? $trade['dept'] : 'ditto';
        }
        ?>
        <tr>
          <td class='text-middle'><?php echo $depositor->abbr;?></td>
          <td>
            <?php echo html::select("type[$i]", $lang->trade->typeList, $trade['type'], "class='form-control type' id='type{$i}'");?>
          </td>
          <td>
            <?php echo html::select("category[$i]", $incomeTypes, $trade['category'], "class='form-control in' style='display:none'");?>
            <?php echo html::select("category[$i]", $expenseTypes, $trade['category'], "class='form-control out'");?>
          </td>
          <td>
            <?php $hasCustomer = (is_numeric($trade['trader']) or empty($trade['trader']));?>
            <div class='input-group out' <?php if($trade['type'] == 'in') echo "style='display:none'"?>>
              <?php echo html::select("trader[$i]", $traderList, ($hasCustomer ? $trade['trader'] : 0), "class='form-control chosen' id='trader{$i}'");?>
              <?php echo html::input("traderName[$i]", $hasCustomer ? '' : $trade['trader'], "class='form-control' id='traderName{$i}' style='display:none'");?>
              <div class='input-group-addon'>
                <label class="checkbox">
                  <input type="checkbox" name="createTrader[<?php echo $i;?>]" value="1">
                  <?php echo $lang->trade->newTrader;?>
                  <?php if(!$hasCustomer and empty($trader['trader'])):?><i class='red icon-question' title="<?php echo $lang->trade->noTraderMatch;?>"></i><?php endif;?>
                </label>
              </div>
            </div>
            <div class='input-group in' <?php if($trade['type'] == 'out') echo "style='display:none'"?>>
              <?php echo html::select("trader[$i]", $customerList, ($hasCustomer ? $trade['trader'] : 0), "class='form-control chosen' id='trader{$i}'");?>
              <?php echo html::input("customerName[$i]", ($hasCustomer ? '' : $trade['trader']), "class='form-control' id='customerName{$i}' style='display:none'");?>
              <div class='input-group-addon'>
                <label class="checkbox">
                  <input type="checkbox" name="createCustomer[<?php echo $i;?>]" value="1">
                  <?php echo $lang->trade->newTrader;?>
                  <?php if(!$hasCustomer and empty($trader['trader'])):?><i class='red icon-question' title="<?php echo $lang->trade->noTraderMatch;?>"></i><?php endif;?>
                </label>
              </div>
            </div>
          </td>
          <td><?php echo html::input("money[$i]", $trade['money'], "class='form-control'");?></td>
          <td><?php echo html::select("dept[$i]", $deptList, $trade['dept'], "class='form-control chosen'");?></td>
          <td><?php echo html::select("handlers[$i][]", $users, $this->app->user->account, "class='form-control chosen' id='handlers{$i}' multiple");?></td>
          <td><?php echo html::input("date[$i]", $trade['date'], "class='form-control form-date' id='date{$i}'");?></td>
          <td><?php echo html::textarea("desc[$i]", $trade['desc'], "rows='1' class='form-control'");?></td>
        </tr>
        <?php endforeach;?>
      </tbody>
      <tfoot><tr><td colspan='9' class='text-center'><?php echo html::submitButton() . html::backButton();?></td></tr></tfoot>
    </table>
  </div>
</form>
<?php include $app->getModuleRoot() . 'common/view/footer.html.php';?>
