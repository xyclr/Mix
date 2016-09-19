<?php
/**
 * The trade block view file of block module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     block
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<table class='table table-data table-hover block-contract table-fixed'>
  <?php foreach($trades as $id => $trade):?>
  <?php $appid = ($this->get->app == 'sys' and isset($_GET['entry'])) ? "class='app-btn' data-id='{$this->get->entry}'" : ''?>
  <tr>
    <td class='nobr'><?php echo zget($depositorList, $trade->depositor);?></td>
    <td class='w-80px text-center'><?php echo zget($lang->trade->typeList, $trade->type);?></td>
    <td class='w-120px text-center'><?php echo zget($currencySign, $trade->currency) . $trade->money?></td>
    <td class='w-80px text-center'><?php echo $trade->date;?></td>
  </tr>
  <?php endforeach;?>
</table>
<script>if(!$.ipsStart) $('.block-contract').dataTable();</script>
