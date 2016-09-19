<?php
/**
 * The trash view file of action module of ZenTaoPMS.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     action
 * @version     $Id$
 * @link        http://www.zentao.net
 */
?>
<?php include '../../common/view/header.html.php';?>
<div id='menuActions'>
  <?php if($type == 'hidden') echo html::a(inLink('trash', "type=all"),    $lang->goback, "class='btn'");?>
  <?php if($type == 'all')    echo html::a(inLink('trash', "type=hidden"), "<i class='icon-eye-close'></i> " . $lang->action->hidden, "class='btn btn-primary'");?>
</div>
<div class='panel'>
  <table class='table table-hover tablesorter table-border'>
    <?php $vars = "type=$type&orderBy=%s&recTotal={$pager->recTotal}&recPerPage={$pager->recPerPage}"; ?>
    <thead>
      <tr class='class-center'>
        <th class='w-90px'><?php commonModel::printOrderLink('objectType', $orderBy, $vars, $lang->action->objectType);?></th>
        <th class='w-90px'><?php commonModel::printOrderLink('objectID',   $orderBy, $vars, $lang->action->objectID);?></th>
        <th><?php echo $lang->action->objectName;?></th>
        <th class='w-100px'><?php commonModel::printOrderLink('actor',     $orderBy, $vars, $lang->action->actor);?></th>
        <th class='w-150px'><?php commonModel::printOrderLink('date',      $orderBy, $vars, $lang->action->date);?></th>
        <th class='w-100px'><?php echo $lang->actions;?></th>
      </tr>
    </thead>
    <tbody>
      <?php foreach($trashes as $action):?>
      <tr class='text-center'>
        <?php 
          $appname = $this->config->action->objectAppNames[$action->objectType];
          $link    = $action->objectType == 'resume' ? '' : $this->createLink("{$appname}.{$action->objectType}", 'view', "id=$action->objectID");
        ?>
        <td><?php echo zget($lang->action->objectTypes, $action->objectType, '');?></td>
        <td><?php echo $action->objectID;?></td>
        <td class='text-left'><?php echo html::a("javascript:$.openEntry(\"{$appname}\", \"{$link}\")", $action->objectName);?></td>
        <td><?php echo zget($users, $action->actor, $action->actor);?></td>
        <td><?php echo $action->date;?></td>
        <td>
          <?php
          commonModel::printLink('action', 'undelete', "actionid=$action->id", $lang->action->undelete, "class='ajax'");
          if($type == 'all') commonModel::printLink('action', 'hideOne',  "actionid=$action->id", $lang->action->hideOne, "class='ajax'");
          ?>
        </td>
      </tr>
      <?php endforeach;?>
    </tbody>
    <tfoot>
      <tr>
        <td colspan='3'>
          <?php if($trashes and $type == 'all'):?>
          <?php echo html::a(inlink('hideAll'), $lang->action->hideAll, "id='hideAll' class='btn ajax'");?>
          <span class=''><?php echo $lang->action->trashTips;?></span>
          <?php endif;?>
        </td>
        <td colspan='3'>
          <?php $pager->show();?>
        </td>
      </tr>
    </tfoot>
  </table>
</div>
<?php include '../../common/view/footer.html.php';?>
