<?php 
/**
 * The browse view file of trade module of RanZhi.
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
<?php include '../../../sys/common/view/treeview.html.php';?>
<?php js::set('mode', $mode);?>
<?php js::set('date', $date);?>
<?php $vars = "mode={$mode}&date={$date}&orderBy=%s&recTotal={$pager->recTotal}&recPerPage={$pager->recPerPage}&pageID={$pager->pageID}";?>
<li id='bysearchTab'><?php echo html::a('#', "<i class='icon-search icon'></i>" . $lang->search->common)?></li>
<div id='menuActions'>
  <?php commonModel::printLink('trade', 'create', 'type=in',  "{$lang->trade->createIn}", "class='btn btn-primary'")?>
  <?php commonModel::printLink('trade', 'create', 'type=out', "{$lang->trade->createOut}", "class='btn btn-primary'")?>
  <?php commonModel::printLink('trade', 'transfer', '', "{$lang->trade->transfer}", "class='btn btn-primary'")?>
  <?php commonModel::printLink('trade', 'inveset', '', "{$lang->trade->inveset}", "class='btn btn-primary'")?>
  <?php commonModel::printLink('trade', 'batchcreate', '', "{$lang->trade->batchCreate}", "class='btn btn-primary'")?>
  <?php commonModel::printLink('trade', 'import', '', "{$lang->trade->import}", "class='btn btn-primary' data-toggle='modal'")?>
  <?php if(commonModel::hasPriv('trade', 'export')):?>
  <div class='btn-group'>
    <button data-toggle='dropdown' class='btn btn-primary dropdown-toggle' type='button'><?php echo $lang->export;?> <span class='caret'></span></button>
    <ul id='exportActionMenu' class='dropdown-menu pull-right'>
      <li><?php commonModel::printLink('trade', 'export', "mode=all&orderBy={$orderBy}", $lang->exportAll, "class='iframe' data-width='700'");?></li>
      <li><?php commonModel::printLink('trade', 'export', "mode=thisPage&orderBy={$orderBy}", $lang->exportThisPage, "class='iframe' data-width='700'");?></li>
    </ul>
  </div>
  <?php endif;?>
</div>
<?php $sideClass = $this->cookie->tradeListSide == 'hide' ? 'hide-side' : '';?>
<div class='with-side <?php echo $sideClass?>'>
  <div class='side'>
    <a class='side-handle'><i class='icon-caret-left'></i></a>
    <div class='side-body'>
      <div class='panel panel-sm'>
        <div class='panel-heading nobr'>
          <strong><?php echo $lang->trade->modeList[$mode];?></strong>
        </div>
        <div class='panel-body'>
          <?php if($currentYear):?> 
          <ul class='tree'>
            <li>
              <?php commonModel::printLink('trade', 'browse', "mode=$mode&date=$currentYear", $currentYear);?>
              <ul>
                <?php foreach($lang->trade->quarterList as $key => $quarter):?>
                <li>
                  <?php commonModel::printLink('trade', 'browse', "mode=$mode&date=$currentYear$key", $quarter);?>
                  <ul>
                    <?php $monthList = explode(',', $lang->trade->quarters->$key);?>
                    <?php foreach($monthList as $month):?>
                    <li>
                      <?php commonModel::printLink('trade', 'browse', "mode=$mode&date=$currentYear$month", $currentYear . $month);?>
                    </li>
                    <?php endforeach;?>
                  </ul>
                </li>
                <?php endforeach;?>
              </ul>
            </li>
          </ul>
          <?php endif;?>
          <ul class='tree' data-collapsed='true'>
            <?php foreach($tradeYears as $tradeYear):?>
            <li>
              <?php commonModel::printLink('trade', 'browse', "mode=$mode&date=$tradeYear", $tradeYear);?>
              <ul>
                <?php foreach($lang->trade->quarterList as $key => $quarter):?>
                <li>
                  <?php commonModel::printLink('trade', 'browse', "mode=$mode&date=$tradeYear$key", $quarter);?>
                  <ul>
                    <?php $monthList = explode(',', $lang->trade->quarters->$key);?>
                    <?php foreach($monthList as $month):?>
                    <li>
                      <?php commonModel::printLink('trade', 'browse', "mode=$mode&date=$tradeYear$month", $tradeYear . $month);?>
                    </li>
                    <?php endforeach;?>
                  </ul>
                </li>
                <?php endforeach;?>
              </ul>
            </li>
            <?php endforeach;?>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class='main'>
    <div class='panel'>
      <form method='post' action='<?php echo inlink('batchedit', 'step=form')?>'>
        <table class='table table-hover table-striped tablesorter table-data' id='tradeList'>
          <thead>
            <tr class='text-center'>
              <th class='w-100px'><?php commonModel::printOrderLink('date', $orderBy, $vars, $lang->trade->date);?></th>
              <th class='w-100px'><?php commonModel::printOrderLink('depositor', $orderBy, $vars, $lang->trade->depositor);?></th>
              <th class='w-60px'><?php commonModel::printOrderLink('type', $orderBy, $vars, $lang->trade->type);?></th>
              <th><?php commonModel::printOrderLink('trader', $orderBy, $vars, $lang->trade->trader);?></th>
              <th class='w-100px'><?php commonModel::printOrderLink('category', $orderBy, $vars, $lang->trade->category);?></th>
              <th class='w-120px text-right'><?php commonModel::printOrderLink('money', $orderBy, $vars, $lang->trade->money);?></th>
              <th class='w-100px'><?php commonModel::printOrderLink('handlers', $orderBy, $vars, $lang->trade->handlers);?></th>
              <th class='w-200px visible-lg'><?php echo $lang->trade->desc;?></th>
              <th class='w-110px'><?php echo $lang->actions;?></th>
            </tr>
          </thead>
          <tbody>
            <?php foreach($trades as $trade):?>
            <tr class='text-center'>
              <td class='text-left'>
              <label class='checkbox-inline'><input type='checkbox' name='tradeIDList[]' value='<?php echo $trade->id;?>'/><?php echo formatTime($trade->date, DT_DATE1);?></label>
              </td>
              <td class='text-left'><?php echo zget($depositorList, $trade->depositor, ' ');?></td>
              <td><?php echo $lang->trade->typeList[$trade->type];?></td>
              <td class='text-left'><?php if($trade->trader) echo zget($customerList, $trade->trader);?></td>
              <td class='text-left'><?php echo zget($categories, $trade->category, ' ');?></td>
              <td class='text-right'><?php echo zget($currencySign, $trade->currency) . formatMoney($trade->money);?></td>
              <td><?php foreach(explode(',', $trade->handlers) as $handler) echo zget($users, $handler) . ' ';?></td>
              <td class='text-left visible-lg'><div title="<?php echo $trade->desc;?>" class='w-200px text-ellipsis'><?php echo $trade->desc;?><div></td>
              <td>
                <?php commonModel::printLink('trade', 'edit', "tradeID={$trade->id}", $lang->edit);?>
                <?php commonModel::printLink('trade', 'detail', "tradeID={$trade->id}", $lang->trade->detail, "data-toggle='modal'");?>
                <?php commonModel::printLink('trade', 'delete', "tradeID={$trade->id}", $lang->delete, "class='deleter'");?>
              </td>
            </tr>
            <?php endforeach;?>
          </tbody>
        </table>
        <div class='table-footer'>
          <div class='pull-left'>
            <?php echo html::selectButton() . html::submitButton($lang->edit);?>
            <span class='text-danger'><?php $this->trade->countMoney($trades, $mode);?></span>
          </div>
          <?php echo $pager->get();?>
        </div>
      </form>
    </div>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
