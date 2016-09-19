<?php 
/**
 * The browse view file of contact module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     contact 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php js::set('mode', $mode);?>
<div id='menuActions'>
  <?php commonModel::printLink('contact', 'create', '', "<i class='icon-plus'></i> {$lang->contact->create}", "class='btn btn-primary'")?>
</div>
<div class='panel'>
  <table class='table table-hover table-striped tablesorter table-data table-fixed' id='contactList'>
    <thead>
      <tr class='text-center'>
        <?php $vars = "mode={$mode}&orderBy=%s&recTotal={$pager->recTotal}&recPerPage={$pager->recPerPage}&pageID={$pager->pageID}";?>
        <th class='w-60px'> <?php commonModel::printOrderLink('id',       $orderBy, $vars, $lang->contact->id);?></th>
        <th class='w-100px text-left'><?php commonModel::printOrderLink('realname', $orderBy, $vars, $lang->contact->realname);?></th>
        <th class="text-left"><?php commonModel::printOrderLink('customer', $orderBy, $vars, $lang->contact->provider);?></th>
        <th class='w-60px'> <?php commonModel::printOrderLink('gender',   $orderBy, $vars, $lang->contact->gender);?></th>
        <th class='w-200px text-left'><?php commonModel::printOrderLink('phone',    $orderBy, $vars, $lang->contact->phone . $lang->slash . $lang->contact->mobile);?></th>
        <th class='w-200px'><?php commonModel::printOrderLink('email',    $orderBy, $vars, $lang->contact->email);?></th>
        <th class='w-100px visible-lg'><?php commonModel::printOrderLink('qq',       $orderBy, $vars, $lang->contact->qq);?></th>
        <th class='w-120px'><?php echo $lang->actions;?></th>
      </tr>
    </thead>
    <tbody>
    <?php foreach($contacts as $contact):?>
    <tr class='text-center'>
      <td><?php echo $contact->id;?></td>
      <td class='text-left'><?php echo html::a(inlink('view', "contactID=$contact->id"), $contact->realname);?></td>
      <td class='text-left'><?php if(isset($customers[$contact->customer])) echo html::a($this->createLink('provider', 'view', "customerID=$contact->customer"), $customers[$contact->customer]);?></td>
      <td><?php echo isset($lang->genderList->{$contact->gender}) ? $lang->genderList->{$contact->gender} : '';?></td>
      <td class='text-left'><?php echo $contact->phone . ' ' . $contact->mobile;?></td>
      <td><?php echo html::mailto($contact->email, $contact->email)?></td>
      <td class='visible-lg'><?php echo empty($contact->qq) ? '' : html::a("tencent://Message/?Uin={$contact->qq}&websiteName=RanZhi&Menu=yes", $contact->qq, "target='_blank'")?></td>
      <td class='operate'>
        <?php
        commonModel::printLink('contact', 'edit', "contactID=$contact->id", $lang->edit);
        commonModel::printLink('contact', 'vcard', "contactID=$contact->id", $lang->contact->qrcode, "class='iframe' data-width='400' data-icon='qrcode' data-height='440'");
        commonModel::printLink('contact', 'delete', "contactID=$contact->id", $lang->delete, "class='reloadDeleter'");
        ?>
      </td>
    </tr>
    <?php endforeach;?>
    </tbody>
  </table>
  <div class='table-footer'><?php $pager->show();?></div>
</div>
<?php include '../../common/view/footer.html.php';?>
