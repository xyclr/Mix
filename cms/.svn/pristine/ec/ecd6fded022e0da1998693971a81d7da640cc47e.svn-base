<?php
/**
 * The task block view file of block module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     block
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<table class='table table-hover table-condensed block-task'>
  <?php foreach($tasks as $id => $task):?>
  <?php $appid = ($this->get->app == 'sys' and isset($_GET['entry'])) ? "class='app-btn' data-id={$this->get->entry}" : ''?>
  <tr data-url='<?php echo $this->createLink('oa.task', 'view', "taskID=$id"); ?>' <?php echo $appid?>>
    <td class='w-20px text-center'><span class='active pri pri-<?php echo $task->pri;?>'><?php echo $lang->task->priList[$task->pri];?></span></td>
    <td><?php echo $task->name;?></td>
    <td class='w-60px'><?php echo $lang->task->statusList[$task->status];?></td>
  </tr>
  <?php endforeach;?>
</table>
<script>$('.block-task').dataTable();</script>
