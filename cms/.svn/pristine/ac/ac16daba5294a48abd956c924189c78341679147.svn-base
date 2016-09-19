<?php
/**
 * The view file of backup module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     backup
 * @version     $Id: view.html.php 2568 2012-02-09 06:56:35Z shiyangyangwork@yahoo.cn $
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php if(!empty($error)):?>
<div id="notice" class='alert alert-success'>
  <div class="content"><i class='icon-info-sign'></i> <?php echo $error;?></div>
</div>
<?php endif;?>

<div id='menuActions'>
  <div class='actions'><?php commonModel::printLink('backup', 'backup', '', $lang->backup->backup, "class='btn btn-primary backup'");?></div>
</div>
<div class='panel'>
  <table class='table table-condensed table-bordered active-disabled table-fixed'>
    <thead>
      <tr class='text-center'>
        <th class='w-150px'><?php echo $lang->backup->time?></th>
        <th><?php echo $lang->backup->files?></th>
        <th class='w-150px'><?php echo $lang->backup->size?></th>
        <th class='w-80px'><?php echo $lang->actions?></th>
      </tr>
    </thead>
    <tbody class='text-center'>
    <?php foreach($backups as $backupFile):?>
      <?php $rowspan = count($backupFile->files);?>
      <?php $i = 0?>
      <?php foreach($backupFile->files as $file => $size):?>
      <tr>
        <?php if($i == 0):?>
        <td <?php if($rowspan > 1) echo "rowspan='$rowspan'"?>><?php echo date(DT_DATETIME1, $backupFile->time);?></td>
        <?php endif;?>
        <td class='text-left'><?php echo $file;?></td>
        <td><?php echo $size / 1024 >= 1024 ? round($size / 1024 / 1024, 2) . 'MB' : round($size / 1024, 2) . 'KB';?></td>
        <?php if($i == 0):?>
        <td <?php if($rowspan > 1) echo "rowspan='$rowspan'"?>>
          <?php
          commonModel::printLink('backup', 'restore', "file=$backupFile->name", $lang->backup->restore, "class='restore'");
          commonModel::printLink('backup', 'delete', "file=$backupFile->name", $lang->delete, "class='deleter'");
          ?>
        </td>
        <?php endif;?>
      </tr>
      <?php $i++;?>
      <?php endforeach;?>
    <?php endforeach;?>
    </tbody>
  </table>
</div>
<?php js::set('backup', $lang->backup);?>
<?php include '../../common/view/footer.html.php';?>
