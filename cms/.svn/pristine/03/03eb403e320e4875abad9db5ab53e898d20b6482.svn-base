<?php
/**
 * The view file of browse function of resume module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     resume
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<table class='table table-bordered table-data'>
  <tr class='text-center'>
    <th class='w-220px'><?php echo $lang->resume->time;?></th>
    <th><?php echo $lang->resume->customer;?></th>
    <th class='w-100px'><?php echo $lang->resume->dept;?></th>
    <th><?php echo $lang->resume->title;?></th>
    <th class='w-80px'><?php echo $lang->actions;?></th>
    <th class='w-70px text-middle' rowspan='<?php echo count($resumes) + 1;?>'>
      <?php commonModel::printLink('resume', 'create', "contactID=$contact->id", $lang->create, "class='loadInModal btn btn-primary' title='{$lang->resume->create}'");?>
    </th>
  </tr>
  <?php foreach($resumes as $resume):?>
  <tr>
    <td>
      <?php
      if($resume->join) printf($lang->resume->showJoin, $resume->join);
      if($resume->left) printf($lang->resume->showLeft, $resume->left);
      ?>
    </td>
    <td><?php echo isset($customers[$resume->customer]) ? $customers[$resume->customer] : ''?></td>
    <td><?php echo $resume->dept?></td>
    <td><?php echo $resume->title?></td>
    <td>
      <?php
      commonModel::printLink('resume', 'edit', "resumeID=$resume->id", $lang->edit, "class='loadInModal'");
      commonModel::printLink('resume', 'delete', "resumeID=$resume->id", $lang->delete, "class='deleter'");
      ?>
    </td>
  </tr>
  <?php endforeach;?>
</table>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
