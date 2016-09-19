<?php 
/**
 * The check view file of depositor module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     depositor 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php js::set('dateOptions', !empty($dateOptions));?>
<?php js::set('createBalance', $lang->depositor->createBalance);?>
<div class='panel'>
  <div class='panel-heading'>
    <form method='post' id='checkForm' class='form-inline'>
      <table class="table table-form w-p100">
        <tr>
          <th class='w-40px'><?php echo $lang->depositor->common;?></th>
          <td><?php echo html::select('depositor[]', array('all' => $lang->depositor->all) + $depositorList, empty($selected) ? 'all' : $selected, "class='form-control chosen'");?></td>
          <th class='w-70px'><?php echo $lang->depositor->start;?></th>
          <td class='w-200px'><?php echo html::select('start', $dateOptions, $start, "class='form-control'");?></td>
          <th class='w-70px'><?php echo $lang->depositor->end;?></th>
          <td class='w-200px'><?php echo html::select('end', array_merge(array(date(DT_DATE1) => $lang->today), $dateOptions), $end, "class='form-control'");?></td>
          <th class='w-80px'><?php echo html::submitButton($lang->depositor->check);?></th>
        </tr>
      </table>
    </form>
  </div>
  <?php if(!empty($results)):?>
  <table class='table tablesorter table-data'>
    <thead>
      <tr>
        <th><?php echo $lang->depositor->common;?></th>
        <th><?php echo $lang->depositor->currency;?></th>
        <th><?php echo $lang->depositor->originValue;?></th>
        <th><?php echo $lang->depositor->computedValue;?></th>
        <th><?php echo $lang->depositor->actualValue;?></th>
        <th><?php echo $lang->depositor->result;?></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <?php foreach($results as $depositorID => $result):?>
      <?php $class = bccomp($result->computed, $result->actual, 2) === -1 ? 'text-error' : ''; ?>
      <?php $diff  = bcsub($result->computed, $result->actual, 2);?>
      <tr class='<?php echo $class;?>'>
        <td><?php echo zget($depositorList, $depositorID); ?></td>
        <td><?php echo zget($currencyList, $result->currency); ?></td>
        <td><?php echo formatMoney($result->origin);?></td>
        <td><?php echo formatMoney($result->computed);?></td>
        <td><?php echo formatMoney($result->actual);?></td>
        <?php if($diff == 0):?>
        <td><?php echo $lang->depositor->success;?></td>
        <?php endif;?>
        <?php if($diff > 0):?>
        <td><?php printf($lang->depositor->more, formatMoney($diff));?></td>
        <?php endif;?>
        <?php if($diff < 0):?>
        <td><?php printf($lang->depositor->less, formatMoney($diff));?></td>
        <?php endif;?>
        <td>
          <?php commonModel::printLink('depositor', 'saveBalance', "depositor={$depositorID}&mony={$result->computed}&date=" . strtotime($this->post->end), $lang->depositor->saveBalance, "class='btn-save-result'");?>
          <?php if($result->tradeList) echo html::a('javascript:;', $lang->depositor->detail, "class='btn-detail'");?>
        </td>
      </tr>
      <?php if($result->tradeList):?>
      <tr class='detail hide'>
        <td colspan='9'>
          <div class='panel'>
            <table class='table table-hover table-striped table-data'>
              <tr class='text-center'>
                <th class='w-50px'> <?php echo $lang->trade->id;?></th>
                <th class='w-60px'> <?php echo $lang->trade->type;?></th>
                <th>                <?php echo $lang->trade->trader;?></th>
                <th class='w-120px'><?php echo $lang->trade->money;?></th>
                <th class='w-100px'><?php echo $lang->trade->category;?></th>
                <th class='w-100px'><?php echo $lang->trade->handlers;?></th>
                <th class='w-100px'><?php echo $lang->trade->date;?></th>
                <th class='visible-lg'><?php echo $lang->trade->desc;?></th>
              </tr>
              <?php foreach($result->tradeList as $trade):?>
              <tr class='text-center'>
                <td><?php echo $trade->id;?></td>
                <td><?php echo $lang->trade->typeList[$trade->type];?></td>
                <td><?php if($trade->trader) echo zget($customerList, $trade->trader);?></td>
                <td><?php echo zget($currencySign, $trade->currency) . formatMoney($trade->money);?></td>
                <td><?php echo zget($categories, $trade->category, ' ');?></td>
                <td><?php foreach(explode(',', $trade->handlers) as $handler) echo zget($users, $handler) . ' ';?></td>
                <td><?php echo formatTime($trade->date, DT_DATE1);?></td>
                <td class='text-left visible-lg'><?php echo $trade->desc;?></td>
              </tr>
              <?php endforeach;?>
            </table>
          </div>
        </td>
      </tr>
      <?php endif;?>
      <?php endforeach;?>
    </tbody>
  </table>
  <?php endif;?>
</div>
<?php include '../../common/view/footer.html.php';?>
