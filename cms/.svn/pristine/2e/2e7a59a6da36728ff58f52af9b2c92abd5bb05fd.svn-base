<?php
/**
 * The create view file of doc module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     doc 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<?php js::set('holders', $lang->doc->placeholder);?>
<?php js::set('libID', $libID);?>
<div class='panel'>
  <div class='panel-heading'>
    <strong><small class='text-muted'><i class='icon icon-plus'></i></small> <?php echo $lang->doc->create;?></strong>
  </div>
  <div class='panel-body'>
    <form class='form-condensed' method='post' enctype='multipart/form-data' id='ajaxForm'>
      <table class='table table-form'> 
        <?php if($libID == 'product'):?>
        <tr>
          <th><?php echo $lang->doc->product;?></th>
          <td><?php echo html::select('product', $products, $productID, "class='form-control'");?></td>
        </tr>  
        <?php elseif($libID == 'project'):?>
        <tr>
          <th><?php echo $lang->doc->project;?></th>
          <td><?php echo html::select('project', $projects, $projectID, "class='form-control' onchange=loadProducts(this.value);");?></td>
        </tr>  
        <tr>
          <th><?php echo $lang->doc->product;?></th>
          <td><span id='productBox'><?php echo html::select('product', $products, '', "class='form-control'");?></span></td>
        </tr>  
        <?php endif;?>
        <tr>
          <th class='w-80px'><?php echo $lang->doc->category;?></th>
          <td><?php echo html::select('module', $moduleOptionMenu, $moduleID, "class='form-control'");?></td>
        </tr>  
        <tr>
          <th><?php echo $lang->doc->type;?></th>
          <td><?php echo html::radio('type', $lang->doc->types, 'file', "onclick=setType(this.value)");?></td>
        </tr>  
        <tr>
          <th><?php echo $lang->doc->title;?></th>
          <td><?php echo html::input('title', '', "class='form-control'");?></td>
        </tr> 
        <tr id='urlBox' class='hidden'>
          <th><?php echo $lang->doc->url;?></th>
          <td><?php echo html::input('url', '', "class='form-control'");?></td>
        </tr>  
        <tr id='contentBox' class='hidden'>
          <th><?php echo $lang->doc->content;?></th>
          <td><?php echo html::textarea('content', '', "class='form-control' rows=8");?></td>
        </tr>  
        <tr>
          <th><?php echo $lang->doc->keywords;?></th>
          <td><?php echo html::input('keywords', '', "class='form-control'");?></td>
        </tr>  
        <tr>
          <th><?php echo $lang->doc->digest;?></th>
          <td><?php echo html::textarea('digest', '', "class='form-control' rows=3");?></td>
        </tr>  
        <tr id='fileBox'>
          <th><?php echo $lang->doc->files;?></th>
          <td><?php echo $this->fetch('file', 'buildform', 'fileCount=2');?></td>
        </tr>  
        <tr>
          <th></th>
          <td><?php echo html::submitButton() . html::backButton() . html::hidden('lib', $libID);?></td>
        </tr>
      </table>
    </form>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
