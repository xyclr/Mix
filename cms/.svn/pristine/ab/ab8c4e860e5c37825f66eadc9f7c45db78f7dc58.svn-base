<?php
/**
 * The contract block view file of block module of RanZhi.
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
  <?php foreach($contracts as $id => $contract):?>
  <?php $appid = ($this->get->app == 'sys' and isset($_GET['entry'])) ? "class='app-btn' data-id='{$this->get->entry}'" : ''?>
  <tr data-url='<?php echo $this->createLink('crm.contract', 'view', "id=$id");?>' <?php echo $appid;?>>
    <td class='nobr'><?php echo $contract->name;?></td>
    <td class='w-80px text-center text-danger'><?php echo $contract->amount?></td>
    <td class='w-120px'><?php echo $lang->contract->deliveryList[$contract->delivery] . ' ' . $lang->contract->returnList[$contract->return];?></td>
  </tr>
  <?php endforeach;?>
</table>
<script>if(!$.ipsStart) $('.block-contract').dataTable();</script>
