<?php 
/**
 * The import view file of trade module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     trade 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<form method='post' id='uploadForm' enctype='multipart/form-data' action='<?php echo inlink('create')?>'>
  <table class='table table-form'>
    <tr>
      <th><?php echo $lang->schema->csvFile?></th>
      <td><?php echo html::file('files', "class='form-control'")?></td>
    </tr>
    <tr>
      <th><?php echo $lang->trade->encode?></th>
      <td><?php echo html::select('encode', $lang->trade->encodeList, '', "class='form-control'")?></td>
    </tr>
    <tr>
      <th></th>
      <td colspan='3'><?php echo html::submitButton() . $lang->trade->fileNode;?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
