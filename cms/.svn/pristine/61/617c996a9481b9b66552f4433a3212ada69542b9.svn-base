<?php
/**
 * The project list block view file of block module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     block
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<div class='list items'>
  <?php foreach($depositors as $id => $depositor):?>
  <?php $provider = $depositor->type == 'bank' ? $depositor->provider : $lang->depositor->providerList[$depositor->provider]; ?>
  <div class='item'>
     <strong class='item-heading'><?php echo $depositor->title;?></strong>
     <div class='item-content'> 
       <span><?php echo $depositor->account;?></span>
       <span><?php echo $provider;?></span>
     </div>
  </div>
  <?php endforeach;?>
</div>
