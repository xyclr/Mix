<?php
/**
 * The browse view file of contract module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     contract
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php js::set('mode', $mode);?>
<li id='bysearchTab'><?php echo html::a('#', "<i class='icon-search icon'></i>" . $lang->search->common)?></li>
<div id='menuActions'>
  <?php if(commonModel::hasPriv('contract', 'export')):?>
  <div class='btn-group'>
    <button data-toggle='dropdown' class='btn btn-primary dropdown-toggle' type='button'><i class='icon-upload-alt'></i> <?php echo $lang->export;?> <span class='caret'></span></button>
    <ul id='exportActionMenu' class='dropdown-menu'>
      <li><?php commonModel::printLink('contract', 'export', "mode=all&orderBy={$orderBy}", $lang->exportAll, "class='iframe' data-width='700'");?></li>
      <li><?php commonModel::printLink('contract', 'export', "mode=thisPage&orderBy={$orderBy}", $lang->exportThisPage, "class='iframe' data-width='700'");?></li>
    </ul>
  </div>
  <?php endif;?>
  <?php commonModel::printLink('contract', 'create', '', '<i class="icon-plus"></i> ' . $lang->contract->create, "class='btn btn-primary'");?>
</div>
<div class='panel'>
  <table class='table table-hover table-striped tablesorter table-data table-fixed' id='contractList'>
    <thead>
      <tr class='text-center'>
        <?php $vars = "mode={$mode}&orderBy=%s&recTotal={$pager->recTotal}&recPerPage={$pager->recPerPage}&pageID={$pager->pageID}";?>
        <th class='w-60px'> <?php commonModel::printOrderLink('id',          $orderBy, $vars, $lang->contract->id);?></th>
        <th>                <?php commonModel::printOrderLink('name',        $orderBy, $vars, $lang->contract->name);?></th>
        <th class='w-100px'><?php commonModel::printOrderLink('amount',      $orderBy, $vars, $lang->contract->amount);?></th>
        <th class='w-100px visible-lg'><?php commonModel::printOrderLink('createdDate', $orderBy, $vars, $lang->contract->createdDate);?></th>
        <th class='w-100px'><?php commonModel::printOrderLink('begin',       $orderBy, $vars, $lang->contract->begin);?></th>
        <th class='w-100px'><?php commonModel::printOrderLink('end',         $orderBy, $vars, $lang->contract->end);?></th>
        <th class='w-80px'> <?php commonModel::printOrderLink('return',      $orderBy, $vars, $lang->contract->return);?></th>
        <th class='w-80px'> <?php commonModel::printOrderLink('delivery',    $orderBy, $vars, $lang->contract->delivery);?></th>
        <th class='w-60px'> <?php commonModel::printOrderLink('status',      $orderBy, $vars, $lang->contract->status);?></th>
        <th class='w-210px'><?php echo $lang->actions;?></th>
      </tr>
    </thead>
    <tbody>
      <?php foreach($contracts as $contract):?>
      <tr class='text-center' data-url='<?php echo inlink('view', "contractID=$contract->id"); ?>'>
        <td><?php echo $contract->id;?></td>
        <td class='text-left'><?php echo $contract->name;?></td>
        <td class='text-right'><?php echo zget($currencySign, $contract->currency, '') . formatMoney($contract->amount);?></td>
        <td class='visible-lg'><?php echo substr($contract->createdDate, 0, 10);?></td>
        <td><?php echo substr($contract->begin, 0, 10);?></td>
        <td><?php echo substr($contract->end, 0, 10);?></td>
        <td><?php echo $lang->contract->returnList[$contract->return];?></td>
        <td><?php echo $lang->contract->deliveryList[$contract->delivery];?></td>
        <td class='<?php echo "contract-{$contract->status}";?>'><?php echo $lang->contract->statusList[$contract->status];?></td>
        <td class='operate'><?php echo $this->contract->buildOperateMenu($contract) ?></td>
      </tr>
      <?php endforeach;?>
    </tbody>
  </table>
  <div class='table-footer'>
    <?php if(isset($totalAmount)):?>
    <div class='pull-left text-danger'>
      <?php if(!empty($totalAmount)) printf($lang->contract->totalAmount, implode('，', $totalAmount['contract']), implode('，', $totalAmount['return']));?>
    </div>
    <?php endif;?>
    <?php $pager->show();?>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
