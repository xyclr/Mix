<?php 
/**
 * The create view file of schema module of RanZhi.
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
<?php include dirname($app->getAppRoot()) . '/sys/common/view/chosen.html.php';?>
<form method='post' id='ajaxForm'>
<div id='recordBox' class='panel'>
  <div class='panel-heading'>
    <strong><i class="icon-plus"></i> <?php echo $lang->schema->create;?></strong>
  </div>
  <div class='panel-body'>
    <table class="table table-form">
      <tr>
        <td class='w-300px'>
          <div class='input-group'>
            <span class='input-group-addon'><?php echo $lang->schema->name;?></span>
            <?php echo html::input('name', $file['title'], "class='form-control'");?>
          </div>
        </td>
        <td><?php echo html::submitButton()?></td>
      </tr>
    </table>
    <div id='recordTable'>
      <?php if($mode == 'row'):?>
      <table class='table table-data'>
        <thead>
          <tr>
            <?php for($i = 0; $i < $columns; $i ++):?>
            <th><?php echo html::select('schema[' . chr($i + 65) . '][]', $lang->trade->importedFields, '', "class='form-control chosen' multiple data-placeholder='{$lang->schema->placeholder->selectField}'");?></th>
            <?php endfor;?>
          </tr>
        </thead>
        <tbody>
          <?php foreach($records as $row => $values):?>
          <?php if($row > 10) break;?>
          <tr>
            <?php foreach($values as $key => $value):?>
            <td><nobr><?php echo $value;?></nobr></td>
            <?php endforeach;?>
          </tr>
          <?php endforeach;?>
        </tbody>
      </table>
      <?php endif?>
      <?php if($mode == 'col'):?>
      <table class='table table-data table-data-col'>
        <?php for($i = 0; $i < $columns; $i ++):?>
        <tr id="data-tr-<?php echo $i;?>"><th class='w-200px'><?php echo html::select('schema[' . chr($i + 65) . '][]', $lang->trade->importedFields, '', "class='form-control chosen' multiple data-placeholder='{$lang->schema->placeholder->selectField}'");?></th></tr>
        <?php endfor;?>
      </table>
      <?php endif?>
    </div>
  </div>
</div>
</form>
<?php if($mode == 'col'):?>
<?php js::set('records', $records)?>
<?php js::set('columns', $columns)?>
<script>
$(document).ready(function()
{
    for(row in v.records){
        if(row > 5) break;
        for(i = 0; i < v.columns; i++)
        {
            addContent = v.records[row][i];
            if(typeof(v.records[row][i]) == "undefined") addContent = "";
            if(row == 0)
            {
                addContent = "<th>" + addContent + "</th>";
            }
            else
            {
                addContent = "<td>" + addContent + "</td>";
            }
            $('#data-tr-' + i).append(addContent);
        }
    }
});
</script>
<?php endif?>
<?php include '../../common/view/footer.html.php';?>
