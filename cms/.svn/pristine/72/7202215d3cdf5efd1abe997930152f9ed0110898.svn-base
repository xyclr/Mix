<?php 
/**
 * The view file for page of view a schema of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Xiying Guan <guanxiying@xirangit.com>
 * @package     schema 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<table class='table table-bordered' id='schemaList'>
  <thead>
    <tr class='text-center'>
    <?php for($i = 65; $i <= ord($maxColumn); $i ++):?>
    <th><?php echo chr($i); ?></th>
    <?php endfor;?>
    </tr>
  </thead>
  <tbody>
    <tr class='text-center'>
    <?php for($i = 65; $i <= ord($maxColumn); $i ++):?>
    <td><?php echo isset($schema[chr($i)]) ? $lang->trade->{$schema[chr($i)]} : '';?></td>
    <?php endfor;?>
    </tr>
  </tbody>
</table>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
