<?php
/**
 * The view file of view method of todo module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     todo
 * @version     $Id: view.html.php 4955 2013-07-02 01:47:21Z chencongzhi520@gmail.com $
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php if(!$todo->private or ($todo->private and $todo->account == $app->user->account)):?>
<div class='container mw-700px'>
  <div class='row-table'>
    <div class='col-main'>
      <div class='main'>
        <fieldset>
          <legend>
            <?php echo $lang->todo->desc;?>
          </legend>
          <div>
            <?php echo $todo->desc;?>
            <?php 
            if($todo->type == 'task') echo html::a($this->createLink('oa.task', 'view', "id={$todo->idvalue}"), $lang->task->common . '#' . $todo->idvalue, "class='btn'");
            if($todo->type == 'order') echo html::a("javascript:$.openEntry(\"crm\",\"" . $this->createLink('crm.order', 'view', "id={$todo->idvalue}") . "\")", $lang->order->common . '#' . $todo->idvalue, "class='btn'");
            if($todo->type == 'customer') echo html::a("javascript:$.openEntry(\"crm\",\"" . $this->createLink('crm.customer', 'view', "id={$todo->idvalue}") . "\")", $lang->customer->common . '#' . $todo->idvalue, "class='btn'");
            ?>
          </div>
        </fieldset>
        <?php echo $this->fetch('action', 'history', "objectType=todo&objectID={$todo->id}");?>
      </div>
    </div>
    <div class='col-side'>
      <div class='main main-side'>
        <fieldset>
        <legend><?php echo $lang->todo->legendBasic;?></legend>
          <table class='table table-data table-condensed table-borderless'> 
            <tr>
              <th><?php echo $lang->todo->pri;?></th>
              <td><?php echo $lang->todo->priList[$todo->pri];?></td>
            </tr>
            <tr>
              <th><?php echo $lang->todo->status;?></th>
              <td class='todo-<?php echo $todo->status?>'><?php echo $lang->todo->statusList[$todo->status];?></td>
            </tr>
            <tr>
              <th><?php echo $lang->todo->type;?></th>
              <td><?php echo $lang->todo->typeList[$todo->type];?></td>
            </tr>
            <tr>
              <th class='w-80px'><?php echo $lang->todo->account;?></th>
              <td><?php echo $todo->account;?></td>
            </tr>
            <tr>
              <th class='w-80px'><?php echo $lang->todo->date;?></th>
              <td><?php echo $todo->date == '00000000' ? $lang->todo->periods['future'] : date(DT_DATE1, strtotime($todo->date));?></td>
            </tr>
            <tr>
              <th><?php echo $lang->todo->beginAndEnd;?></th>
              <td><?php if(isset($times[$todo->begin])) echo $times[$todo->begin]; if(isset($times[$todo->end])) echo ' ~ ' . $times[$todo->end];?></td>
            </tr>
          </table>
      </div>
    </div>
  </div>
  <div class='text-center'>
    <?php
    $disable = $this->todo->isClickable($todo, 'finish') ? '' : 'disable';
    commonModel::printLink('todo', 'finish', "id=$todo->id", $lang->finish, "data-id='{$todo->id}' class='btn btn-success ajaxFinish $disable'");
    if($todo->account == $app->user->account)
    {
        commonModel::printLink('todo', 'edit',   "todoID=$todo->id", $lang->edit, "class='btn ajaxEdit'");
        commonModel::printLink('todo', 'delete', "todoID=$todo->id", $lang->delete, "class='btn todoDeleter'");
    }
    ?>
  </div>
</div>
<?php else:?>
<?php echo $lang->todo->thisIsPrivate;?>
<?php endif;?>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
