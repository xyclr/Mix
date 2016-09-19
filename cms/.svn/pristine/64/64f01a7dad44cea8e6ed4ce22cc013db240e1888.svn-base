<?php 
/**
 * The browse view file of schema module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     schema 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include $app->getModuleRoot() . 'common/view/header.html.php';?>
<div class='panel'>
  <div class="panel-heading">
    <strong><i class="icon-group"></i> <?php echo $lang->schema->common;?></strong>
    <div class="panel-actions pull-right">
      <?php echo html::a(inlink('create'),  "{$lang->schema->create}</i>", "data-toggle='modal' class='btn btn-primary'")?>
    </div>
  </div>
  <table class='table table-hover table-striped tablesorter table-data' id='schemaList'>
    <tbody class='text-center'>
      <tr class='text-center'>
        <th class='w-70px'><?php  echo $lang->trade->id;?></th>
        <th class='text-left'><?php echo $lang->schema->name;?></th>
        <th class='w-200px'><?php echo $lang->actions;?></th>
      </tr>
      <?php foreach($schemas as $schema):?>
      <tr>
        <td><?php echo $schema->id;?></td>
        <td class='text-left'><?php echo $schema->name;?></td>
        <td>
          <?php echo html::a(inlink('view', "schema={$schema->id}"), $lang->schema->view, "data-toggle='modal'");?>
          <?php echo html::a(inlink('edit', "schemaID={$schema->id}"), $lang->edit);?>
          <?php echo html::a(inlink('delete', "schemaID={$schema->id}"), $lang->delete, "class='deleter'");?>
        </td>
      </tr>
      <?php endforeach;?>
    </tbody>
  </table>
</div>
<?php include '../../common/view/footer.html.php';?>
