<?php
/**
 * The create view of todo module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     todo
 * @version     $Id: edit.html.php 4728 2013-05-03 06:14:34Z chencongzhi520@gmail.com $
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<div class='container mw-700px'>
  <form class='form-condensed' method='post' id='ajaxForm' action='<?php echo $this->createLink('todo', 'edit', "id=$todo->id")?>'>
    <table class='table table-form'> 
      <tr>
        <th class='w-80px'><?php echo $lang->todo->date;?></th>
        <td class='w-p50'>
          <div class='input-group'>
            <?php $disabled = $todo->date == '00000000' ? "disabled='disabled'" : ''?>
            <?php echo html::input('date', $todo->date, "class='form-control form-date' $disabled");?>
            <span class='input-group-addon'><input type='checkbox' <?php echo $todo->date == '00000000' ? 'checked' : ''?> id='switchDate' onclick='switchDateTodo(this);'> <?php echo $lang->todo->periods['future'];?></span>
          </div>
        </td><td></td>
      </tr>
      <tr>
        <th><?php echo $lang->todo->type;?></th>
        <td><input type='hidden' name='type' value='<?php echo $todo->type;?>' /><?php echo $lang->todo->typeList[$todo->type];?></td>
      </tr>  
      <tr>
        <th><?php echo $lang->todo->pri;?></th>
        <td><?php echo html::select('pri', $lang->todo->priList, $todo->pri, "class='form-control'");?></td>
      </tr>  
      <tr>
        <th><?php echo $lang->todo->name;?></th>
        <td>
          <?php
          $readType = $todo->type != 'custom' ? 'readonly' : '';
          echo html::input('name', $todo->name, "$readType class=form-control");
          ?>
        </td>
      </tr>  
      <tr>
        <th><?php echo $lang->todo->desc;?></th>
        <td colspan='2'><?php echo html::textarea('desc', htmlspecialchars($todo->desc), "rows=4 class='form-control'");?></td>
      </tr>
      <tr>
        <th><?php echo $lang->todo->status;?></th>
        <td><?php echo html::select('status', $lang->todo->statusList, $todo->status, "class='form-control'");?></td>
      </tr>  
      <tr>
        <th><?php echo $lang->todo->beginAndEnd;?></th>
        <td>
          <div class='input-group'>
            <?php echo html::select('begin', $times, $todo->begin, 'onchange=selectNext(); class="form-control" style="width: 50%"') . html::select('end', $times, $todo->end, 'class="form-control" style="width: 50%"');?>
          </div>
        </td>
        <td>
          <input type='checkbox' id='dateSwitcher' onclick='switchDateFeature(this);' <?php if($todo->begin == 2400) echo 'checked';?> > <?php echo $lang->todo->lblDisableDate;?>
        </td>
      </tr>  
      <tr>
        <th><?php echo $lang->todo->private;?></th>
        <td><input type='checkbox' name='private' id='private' value='1' <?php if($todo->private) echo 'checked';?>></td>
      </tr>  
      <tr>
        <th></th>
        <td>
          <?php echo html::submitButton();?>
        </td>
      </tr>
    </table>
  </form>
</div>
<?php js::set('account', $app->user->account)?>
<script language='Javascript'>
$(document).ready(function(){switchDateFeature(document.getElementById('dateSwitcher'))});
</script>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
