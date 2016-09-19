<?php
/**
 * The admin view file of block module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     block
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.modal.html.php';?>
<table class='table table-form'>
  <tr>
    <th class='w-100px'><?php echo $lang->block->lblEntry; ?></th>
    <?php
    $entryID = '';
    if($block) $entryID = $block->source != '' ? $block->source : $block->block;
    ?>
    <td><?php echo html::select('allEntries', $allEntries, $entryID, "class='form-control'")?></td>
  </tr>
  <tr></tr>
</table>
<div id='blockParam'></div>
<?php js::set('index', $index)?>
<?php include '../../common/view/footer.modal.html.php';?>
