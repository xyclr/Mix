<?php
/**
 * The thread block view file of block module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     block
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<table class='table table-data table-hover table-fixed block-thread'>
  <?php foreach($threads as $id => $thread):?>
  <?php $appid = ($this->get->app == 'sys' and isset($_GET['entry'])) ? "class='app-btn' data-id={$this->get->entry}" : ''?>
  <tr data-url='<?php echo $this->createLink('team.thread', 'view', "id=$thread->id"); ?>' <?php echo $appid?>>
    <td><?php echo $thread->title;?></td>
    <td class='w-50px'><?php echo substr($thread->createdDate, 5, 5);?></td>
  </tr>  
  <?php endforeach;?>
</table>
<script>$('.block-thread').dataTable();</script>
