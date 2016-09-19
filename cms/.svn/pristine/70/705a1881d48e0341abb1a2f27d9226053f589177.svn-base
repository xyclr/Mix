<?php 
/**
 * The browse view file of balance module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     balance 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php commonModel::printLink('balance', 'create', "depositor={$depositor}", "<i class='icon-plus'></i> {$lang->balance->create}", "class='btn btn-primary btn-create loadInModal'")?>
<table class='table table-hover table-striped table-data' id='balanceList'>
  <tr>
    <th><?php echo $lang->balance->depositor;?></th>
    <th class='w-100px'><?php echo $lang->balance->date;?></th>
    <th><?php echo $lang->balance->currency;?></th>
    <th><?php echo $lang->balance->money;?></th>
    <th class='text-center'><?php echo $lang->actions;?></th>
  </tr>
  <tbody>
    <?php foreach($balances as $balance):?>
    <tr>
      <td><?php echo $depositorList[$balance->depositor];?></td>
      <td><?php echo formatTime($balance->date, DT_DATE1);?></td>
      <td><?php echo zget($currencyList, $balance->currency);?></td>
      <td><?php echo formatMoney($balance->money);?></td>
      <td class='text-center'>
        <?php commonModel::printLink('balance', 'edit', "balanceID={$balance->id}", $lang->edit, "class='loadInModal'");?>
        <?php commonModel::printLink('balance', 'delete', "balanceID={$balance->id}", $lang->delete, "class='deleter'");?>
      </td>
    </tr>
    <?php endforeach;?>
    <tr><td colspan='5'><?php echo $pager->show('right', 'short');?></td></tr>
  </tbody>
</table>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
