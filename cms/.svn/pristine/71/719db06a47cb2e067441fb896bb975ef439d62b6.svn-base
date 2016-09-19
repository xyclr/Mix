<?php
/**
 * The review file of refund module of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     refund
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<div class='panel'>
  <table class='table table-hover table-striped table-sorter table-data table-fixed text-center'>
    <thead>
      <tr class='text-center'>
        <th class='w-50px'><?php echo $lang->refund->id;?></th>
        <th class='w-150px'><?php echo $lang->refund->name;?></th>
        <th class='w-100px'><?php echo $lang->refund->category;?></th>
        <th class='w-100px'><?php echo $lang->user->dept;?></th>
        <th class='w-100px'><?php echo $lang->user->realname;?></th>
        <th class='w-100px'><?php echo $lang->refund->money;?></th>
        <th class='w-100px'><?php echo $lang->refund->date;?></th>
        <th class='w-100px'><?php echo $lang->refund->status;?></th>
        <th><?php echo $lang->refund->desc;?></th>
        <th class='w-150px'><?php echo $lang->actions;?></th>
      </tr>
    </thead>
    <?php foreach($refunds as $refund):?>
    <?php $account = $refund->createdBy;?>
    <?php $currentDept = $users[$account]->dept;?>
    <tr>
      <td><?php echo $refund->id;?></td>
      <td class='text-left'><?php echo $refund->name;?></td>
      <td><?php echo $categories[$refund->category];?></td>
      <td><?php echo $deptList[$currentDept]->name;?></td>
      <td><?php echo isset($users[$account]) ? $users[$account]->realname : '';?></td>
      <td class='text-right'><?php echo zget($currencySign, $refund->currency) . $refund->money;?></td>
      <td><?php echo $refund->date;?></td>
      <td><?php echo zget($lang->refund->statusList, $refund->status);?></td>
      <td><?php echo $refund->desc?></td>
      <td>
        <?php echo html::a($this->createLink('refund', 'review', "refundID={$refund->id}"), $lang->refund->review, "data-toggle='modal'")?>
      </td>
    </tr>
    <?php endforeach;?>
  </table>
</div>
<?php include '../../common/view/footer.html.php';?>
