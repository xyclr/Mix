<?php
/**
 * The index view file of cron module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     cron
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php if(!empty($config->global->cron)):?>
<div id='menuActions'>
  <?php echo html::a(inlink('turnon'), $lang->cron->turnonList[0], "class='btn btn-primary' data-type='iframe' data-toggle='modal'")?>
  <?php echo html::a(inlink('create'), $lang->cron->create, "class='btn btn-primary'")?>
</div>
<div class='panel'>
  <table class='table table-hover table-border'>
    <thead>
      <tr class='text-center'>
        <th class='w-60px'><?php echo $lang->cron->m?></th>
        <th class='w-60px'><?php echo $lang->cron->h?></th>
        <th class='w-60px'><?php echo $lang->cron->dom?></th>
        <th class='w-60px'><?php echo $lang->cron->mon?></th>
        <th class='w-60px'><?php echo $lang->cron->dow?></th>
        <th><?php echo $lang->cron->command?></th>
        <th class='w-130px'><?php echo $lang->cron->remark?></th>
        <th class='w-120px'><?php echo $lang->cron->lastTime?></th>
        <th class='w-60px'><?php echo $lang->cron->status?></th>
        <th class='w-120px'><?php echo $lang->actions;?></th>
      </tr>
    </thead>
    <tbody class='text-center'>
    <?php foreach($crons as $cron):?>
      <tr>
        <td><?php echo $cron->m;?></td>
        <td><?php echo $cron->h;?></td>
        <td><?php echo $cron->dom;?></td>
        <td><?php echo $cron->mon;?></td>
        <td><?php echo $cron->dow;?></td>
        <td class='text-left' title='<?php echo $cron->command?>'><?php echo $cron->command;?></td>
        <td class='text-left' title='<?php echo $cron->remark?>'><?php echo $cron->remark;?></td>
        <td><?php echo substr($cron->lastTime, 2);?></td>
        <td><?php echo zget($lang->cron->statusList, $cron->status);?></td>
        <td class='text-left'>
          <?php
          if(!empty($cron->command)) echo html::a(inlink('toggle', "id=$cron->id&status=" . ($cron->status == 'stop' ? 'normal' :  'stop')), $cron->status == 'stop' ? $lang->cron->toggleList['start'] : $lang->cron->toggleList['stop']);
          if($cron->buildin == 0) echo html::a(inlink('edit', "id=$cron->id"), $lang->edit);
          if($cron->buildin == 0) echo html::a(inlink('delete', "id=$cron->id"), $lang->delete, "class='deleter'");
          ?>
        </td>
      </tr>
    <?php endforeach;?>
    </tbody>
  </table>
</div>
<?php else:?>
<div class='panel'>
  <div class='panel-body'>
    <?php
    echo $lang->cron->introduction;
    printf($lang->cron->confirmOpen, inlink('turnon'));
    ?>
  </div>
</div>
<?php endif;?>
<?php include '../../common/view/footer.html.php';?>
