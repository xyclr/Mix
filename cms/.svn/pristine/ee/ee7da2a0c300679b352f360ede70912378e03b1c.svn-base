<?php 
/**
 * The browse view file of product module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     product 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php js::set('mode', $mode);?>
<div id='menuActions'>
  <?php commonModel::printLink('product', 'create', '', '<i class="icon-plus"></i> ' . $lang->product->create, "class='btn btn-primary' data-toggle='modal'");?>
</div>
<div class='panel'>
  <table class='table table-hover table-striped tablesorter table-data' id='productList'>
    <thead>
      <tr class='text-center'>
        <?php $vars = "mode={$mode}&orderBy=%s&recTotal={$pager->recTotal}&recPerPage={$pager->recPerPage}&pageID={$pager->pageID}";?>
        <th class='w-60px'> <?php commonModel::printOrderLink('id',          $orderBy, $vars, $lang->product->id);?></th>
        <th>                <?php commonModel::printOrderLink('name',        $orderBy, $vars, $lang->product->name);?></th>
        <th class='w-160px visible-lg'><?php commonModel::printOrderLink('createdDate', $orderBy, $vars, $lang->product->createdDate);?></th>
        <th class='w-80px'> <?php commonModel::printOrderLink('line',        $orderBy, $vars, $lang->product->line);?></th>
        <th class='w-60px'> <?php commonModel::printOrderLink('type',        $orderBy, $vars, $lang->product->type);?></th>
        <th class='w-60px'> <?php commonModel::printOrderLink('status',      $orderBy, $vars, $lang->product->status);?></th>
        <th class='w-100px'><?php echo $lang->actions;?></th>
      </tr>
    </thead>
    <tbody>
      <?php foreach($products as $product):?>
      <tr class='text-center' data-url="<?php echo $this->createLink('product', 'view', "productID={$product->id}");?>">
        <td><?php echo $product->id;?></td>
        <td class='text-left'><?php echo $product->name;?></td>
        <td class='visible-lg'><?php echo $product->createdDate;?></td>
        <td><?php echo $lang->product->lineList[$product->line];?></td>
        <td><?php echo $lang->product->typeList[$product->type];?></td>
        <td><?php echo $lang->product->statusList[$product->status];?></td>
        <td>
          <?php
          commonModel::printLink('product', 'edit', "productID=$product->id", $lang->edit, "data-toggle='modal'");
          commonModel::printLink('product', 'delete', "productID=$product->id", $lang->delete, "class='reloadDeleter'");
          ?>
        </td>
      </tr>
      <?php endforeach;?>
    </tbody>
  </table>
  <div class='table-footer'><?php $pager->show();?></div>
</div>
<?php include '../../common/view/footer.html.php';?>
