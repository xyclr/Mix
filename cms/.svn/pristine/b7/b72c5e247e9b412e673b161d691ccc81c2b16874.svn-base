<?php
/**
 * The edit view file of announce module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     announce
 * @version     $Id: edit.html.php 9828 2014-06-09 05:27:02Z guanxiying $
 * @link        http://www.ranzhico.com
 */
?>
<?php include $app->getModuleRoot() . 'common/view/header.html.php';?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<div class='panel'>
  <div class='panel-heading'><strong><i class='icon-edit'></i> <?php echo $lang->announce->edit;?></strong></div>
  <div class='panel-body'>
  <form method='post' id='ajaxForm'>
    <table class='table table-form'>
      <tr>
        <th class='w-100px'><?php echo $lang->article->category;?></th>
        <td class='w-p40'>
        <?php echo html::select("categories[]", $categories, array_keys($article->categories), "multiple='multiple' class='form-control chosen'");?>
        </td><td></td>
      </tr>
      <tr>
        <th><?php echo $lang->article->title;?></th>
        <td colspan='2'><?php echo html::input('title', $article->title, "class='form-control'");?></td>
      </tr>
      <tr>
        <th><?php echo $lang->article->content;?></th>
        <td colspan='2'><?php echo html::textarea('content', htmlspecialchars($article->content), "rows='20' class='form-control'");?></td>
      </tr>
      <tr class='hide'>
        <th><?php echo $lang->article->status;?></th>
        <td><?php echo html::select('status', $lang->article->statusList, $article->status, "class='form-control'");?></td>
      </tr>
      <tr>
        <th></th><td colspan='2'><?php echo html::submitButton();?></td>
      </tr>
    </table>
  </form>
  </div>
</div>
<?php include $app->getModuleRoot() . 'common/view/footer.html.php';?>
