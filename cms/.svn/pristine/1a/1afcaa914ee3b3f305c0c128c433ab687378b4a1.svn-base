<?php
/**
 * The side view file of thread module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     thread
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<div class='col-md-2'>
  <?php foreach($boards as $parentBoard):?>
  <ul class="nav nav-primary nav-stacked">
    <li class="nav-heading"><?php echo $parentBoard->name;?></li>
    <?php foreach($parentBoard->children as $childBoard):?>
    <li><?php echo html::a($this->createLink('forum', 'board', "id=$childBoard->id"), $childBoard->name, "id='board{$childBoard->id}'");?></li>
    <?php endforeach;?>
  </ul>
  <?php endforeach;?>
</div>
