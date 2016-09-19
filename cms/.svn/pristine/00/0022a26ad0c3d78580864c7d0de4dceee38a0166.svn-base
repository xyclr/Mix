<?php 
/**
 * The browse view file of order module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     order 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php js::set('mode', $mode);?>
<?php js::set('createTradeTip', $lang->refund->createTradeTip);?>
<?php $secondReviewerClass = empty($this->config->refund->secondReviewer) ? 'hidden' : '';?>
<div id='menuActions'>
  <?php commonModel::printLink('refund', 'create', '', '<i class="icon-plus"></i> ' . $lang->refund->create, 'class="btn btn-primary"');?>
</div>
<div class='panel'>
  <table class='table table-hover table-striped tablesorter table-data table-fixed text-center'>
    <thead>
      <tr class='text-center'>
        <?php $vars = "orderBy=%s&recTotal={$pager->recTotal}&recPerPage={$pager->recPerPage}&pageID={$pager->pageID}";?>
        <th class='w-50px'><?php commonModel::printOrderLink('id', $orderBy, $vars, $lang->refund->id);?></th>
        <th class='w-100px visible-lg'><?php echo $lang->user->dept;?></th>
        <th><?php commonModel::printOrderLink('name', $orderBy, $vars, $lang->refund->name);?></th>
        <th class='w-100px text-right'><?php commonModel::printOrderLink('money', $orderBy, $vars, $lang->refund->money);?></th>
        <th class='w-90px'><?php commonModel::printOrderLink('status', $orderBy, $vars, $lang->refund->status);?></th>
        <th class='w-90px'><?php commonModel::printOrderLink('createdBy', $orderBy, $vars, $lang->refund->createdBy);?></th>
        <th class='w-80px'><?php commonModel::printOrderLink('createdDate', $orderBy, $vars, $lang->refund->createdDate);?></th>
        <th class='w-150px'><?php commonModel::printOrderLink('firstReviewer', $orderBy, $vars, $lang->refund->reviewer);?></th>
        <th class='w-90px'><?php commonModel::printOrderLink('refundBy', $orderBy, $vars, $lang->refund->refundBy);?></th>
        <th class='w-80px'><?php commonModel::printOrderLink('refundDate', $orderBy, $vars, $lang->refund->refundDate);?></th>
        <th class='w-100px'><?php echo $lang->actions;?></th>
      </tr>
    </thead>
    <?php foreach($refunds as $refund):?>
    <tr data-url='<?php echo $this->createLink('refund', 'view', "refundID=$refund->id");?>'>
      <td><?php echo $refund->id;?></td>
      <td class='visible-lg'><?php echo zget($userDept, $refund->createdBy);?></td>
      <td class='text-left'><?php echo $refund->name?></td>
      <td class='text-right'><?php echo zget($currencySign, $refund->currency) . $refund->money?></td>
      <td class='<?php echo $refund->status?>'><?php echo zget($lang->refund->statusList, $refund->status)?></td>
      <td><?php echo zget($userPairs, $refund->createdBy);?></td>
      <td><?php echo substr($refund->createdDate, 0, 10)?></td>
      <td><?php echo zget($userPairs, $refund->firstReviewer) . ' ' . zget($userPairs, $refund->secondReviewer);?></td>
      <td><?php echo zget($userPairs, $refund->refundBy);?></td>
      <td><?php echo substr($refund->refundDate, 0, 10)?></td>
      <td>
        <?php echo html::a($this->createLink('refund', 'view',   "refundID={$refund->id}"), $lang->view, "")?>
        <?php if($refund->createdBy == $this->app->user->account and $refund->status == 'wait'):?>
        <?php echo html::a($this->createLink('refund', 'edit',   "refundID={$refund->id}"), $lang->edit, "")?>
        <?php echo html::a($this->createLink('refund', 'delete', "refundID={$refund->id}"), $lang->delete, "class='deleter'")?>
        <?php endif;?>
        <?php if($mode == 'todo') echo html::a($this->createLink('refund', 'reimburse', "refundID={$refund->id}"), $lang->refund->common, "class='refund'");?>
        <?php if($mode == 'todo') echo html::a($this->createLink('refund', 'createtrade', "refundID={$refund->id}"), $lang->refund->common, "class='createTrade hide'");?>
      </td>
    </tr>
    <?php endforeach;?>
  </table>
  <div class='table-footer'>
    <?php $pager->show();?>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
