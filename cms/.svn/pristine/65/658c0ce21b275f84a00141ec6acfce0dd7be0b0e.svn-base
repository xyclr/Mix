<?php
/**
 * The browse view file of sales module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     sales
 * @version     $Id: browse.html.php 4769 2013-05-05 07:24:21Z wwccss $
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<div class='panel'>
  <div class='panel-heading'>
    <strong><i class='icon-group'></i> <?php echo $lang->sales->browse;?></strong>
    <span class='panel-actions pull-right'><?php commonModel::printLink('sales', 'create', '', $lang->sales->create, "class='btn btn-primary'");?></span>
  </div>
  <table class='table table-hover table-striped'>
    <thead>
      <tr>
       <th class='w-50px'><?php echo $lang->sales->id;?></th>
       <th class='w-100px'><?php echo $lang->sales->name;?></th>
       <th class='w-200px visible-lg'><?php echo $lang->sales->desc;?></th>
       <th><?php echo $lang->sales->users;?></th>
       <th class='w-240px text-center'><?php echo $lang->actions;?></th>
      </tr>
    </thead>
    <tbody>
    <?php foreach($groups as $group):?>
    <?php $users = $group->users;?>
    <tr>
      <td class='text-center'><?php echo $group->id;?></td>
      <td><?php echo $group->name;?></td>
      <td class='visible-lg'><?php echo $group->desc;?></td>
      <td title='<?php echo $users;?>'><?php echo $users;?></td>
      <td class='text-center'>
        <?php
        commonModel::printLink('sales', 'edit', "groupID=$group->id", $lang->sales->edit);
        commonModel::printLink('sales', 'delete', "groupID=$group->id", $lang->sales->delete, "class='deleter'");
        ?>
      </td>
    </tr>
    <?php endforeach;?>
    </tbody>
  </table>
</div>
<?php include '../../common/view/footer.html.php';?>
