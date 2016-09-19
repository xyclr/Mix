<?php 
/**
 * The contact view file of order module of RanZhi.
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
<div class='panel'>
  <div class='panel-heading'>
    <strong><i class="icon-group"></i> <?php echo $lang->order->contact;?></strong>
  </div>
  <table class='table table-hover table-striped table-bordered tablesorter'>
    <thead>
      <tr class='text-center'>
        <?php $vars = "orderBy=%s&recTotal={$pager->recTotal}&recPerPage={$pager->recPerPage}&pageID={$pager->pageID}";?>
        <th class='w-60px'> <?php commonModel::printOrderLink('id',       $orderBy, $vars, $lang->contact->id);?></th>
        <th class='w-100px'><?php commonModel::printOrderLink('realname', $orderBy, $vars, $lang->contact->realname);?></th>
        <th class='w-60px'> <?php commonModel::printOrderLink('gender',   $orderBy, $vars, $lang->contact->gender);?></th>
        <th class='w-120px'><?php commonModel::printOrderLink('phone',    $orderBy, $vars, $lang->contact->phone);?></th>
        <th class='w-120px'><?php commonModel::printOrderLink('mobile',   $orderBy, $vars, $lang->contact->mobile);?></th>
        <th class='w-200px'><?php commonModel::printOrderLink('email',    $orderBy, $vars, $lang->contact->email);?></th>
        <th class='w-100px'><?php commonModel::printOrderLink('qq',       $orderBy, $vars, $lang->contact->qq);?></th>
        <th class='w-100px'><?php commonModel::printOrderLink('weixin',   $orderBy, $vars, $lang->contact->weixin);?></th>
      </tr>
    </thead>
    <tbody>
    <?php foreach($contacts as $contact):?>
    <tr class='text-center'>
      <td><?php echo $contact->id;?></td>
      <td><?php echo $contact->realname;?></td>
      <td><?php echo isset($lang->genderList->{$contact->gender}) ? $lang->genderList->{$contact->gender} : '';?></td>
      <td><?php echo $contact->phone;?></td>
      <td><?php echo $contact->mobile;?></td>
      <td><?php echo $contact->email;?></td>
      <td><?php echo $contact->qq;?></td>
      <td><?php echo $contact->weixin;?></td>
    </tr>
    <?php endforeach;?>
    </tbody>
    <tfoot><tr><td colspan='8'><?php $pager->show();?></td></tr></tfoot>
  </table>
</div>
<?php include '../../common/view/footer.html.php';?>
