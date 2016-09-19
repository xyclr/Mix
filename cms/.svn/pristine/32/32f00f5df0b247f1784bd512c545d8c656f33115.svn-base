<?php 
/**
 * The edit view file of schema module of RanZhi.
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
  <div class='panel-heading'>
    <strong><i class="icon-plus"></i> <?php echo $lang->schema->edit;?></strong>
  </div>
  <div class='panel-body'>
    <form method='post' id='ajaxForm' class='form-inline'>
      <table class='table table-form w-p40'>
        <tr>
          <th class='w-100px'><?php echo $lang->schema->name;?></th>
          <td><?php echo html::input('name', $schema->name, "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->category;?></th>
          <td><?php echo html::input('category', $schema->category, "class='form-control' placeholder='{$lang->schema->placeholder->common}'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->dept;?></th>
          <td><?php echo html::input('dept', $schema->dept, "class='form-control' placeholder='{$lang->schema->placeholder->common}'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->trader;?></th>
          <td><?php  echo html::input('trader', $schema->trader, "class='form-control' placeholder='{$lang->schema->placeholder->common}'");?></td>
        </tr>
<?php
$diffCol = strpos($schema->money, ',') !== false ? true : false;
$in = $out = '';
if($diffCol)
{
    list($in, $out) = explode(',', $schema->money);
    $schema->money = '';
}
?>
        <tr>
          <th><?php echo $lang->trade->money;?></th>
          <td>
            <div class='input-group'>
              <?php echo html::input('money', $schema->money, "class='form-control' placeholder='{$lang->schema->placeholder->common}'");?>
              <div class='input-group-addon'><?php echo html::checkbox('diffCol', array(1 => $lang->schema->diffCol), $diffCol ? 1 : '')?></div>
            </div>
          </td>
        </tr>
        <tr class='out'>
          <th><?php echo $lang->trade->typeList['out'];?></th>
          <td><?php  echo html::input('out', $out, "class='form-control' placeholder='{$lang->schema->placeholder->out}'");?></td>
        </tr>
        <tr class='in'>
          <th><?php echo $lang->trade->typeList['in'];?></th>
          <td><?php  echo html::input('in', $in, "class='form-control' placeholder='{$lang->schema->placeholder->in}'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->type;?></th>
          <td><?php  echo html::input('type', $schema->type, "class='form-control' placeholder='{$lang->schema->placeholder->type}'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->date;?></th>
          <td><?php echo html::input('date', $schema->date, "class='form-control' placeholder='{$lang->schema->placeholder->date}'");?></td>
        <tr>
          <th><?php echo $lang->trade->desc;?></th>
          <td><?php echo html::input('desc', $schema->desc, "class='form-control' placeholder='{$lang->schema->placeholder->desc}'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->trade->fee;?></th>
          <td>
            <div class='input-group'>
              <?php echo html::input('fee', $schema->fee, "class='form-control' placeholder='{$lang->schema->placeholder->common}'");?>
              <div class='input-group-addon'><?php echo html::checkbox('feeRow', array(1 => $lang->schema->feeRow), $schema->fee ? '' : 1)?></div>
            </div>
          </td>
        </tr>
        <tr>
          <th></th>
          <td><?php echo html::submitButton();?></td>
        </tr>
      </table>
    </form>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
