<?php
/**
 * The edit view file of project module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     project 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<form method='post' id='ajaxForm' action='<?php echo inlink('edit', "projectID={$project->id}")?>' class='form-inline'>
  <table class='table-form w-p90'>
    <tr>
      <th class='w-80px'><?php echo $lang->project->name;?></th>
      <td class='w-p60'>
        <div class='required required-wrapper'></div>
        <?php echo html::input('name', $project->name, "class='form-control'");?>
      </td><td></td>
    </tr>
    <tr>
      <th><?php echo $lang->project->manager;?></th>
      <td><?php echo html::select('manager', $users, $project->PM, "class='form-control user-chosen'");?></td><td></td>
    </tr>
    <tr>
      <th><?php echo $lang->project->begin;?></th>
      <td>
        <div class='required required-wrapper'></div>
        <?php echo html::input('begin', $project->begin, "class='form-control form-date'");?>
      </td><td></td>
    </tr>
    <tr>
      <th><?php echo $lang->project->end;?></th>
      <td>
        <div class='required required-wrapper'></div>
        <?php echo html::input('end', $project->end, "class='form-control form-date'");?>
      </td><td></td>
    </tr>
    <tr>
      <th><?php echo $lang->project->desc;?></th>
      <td colspan='2'><?php echo html::textarea('desc', $project->desc, "class='form-control' rows='5'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->project->whitelist . ' ' . html::a('javascript:void(0)', "<i class='icon-question-sign'></i>", "data-original-title='{$lang->project->whitelistTip}' data-toggle='tooltip'");?></th>
      <td colspan='2'><?php echo html::checkbox('whitelist', $groups, $project->whitelist);?></td>
    </tr>
    <tr><th></th><td><?php echo html::submitButton();?></td></tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
