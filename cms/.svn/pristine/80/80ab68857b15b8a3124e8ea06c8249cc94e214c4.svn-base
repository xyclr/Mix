<?php 
/**
 * The create view file of provider module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     provider 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<div class='panel'>
  <div class='panel-heading'>
    <strong><i class="icon-plus"></i> <?php echo $lang->provider->create;?></strong>
  </div>
  <div class='panel-body'>
    <form method='post' id='providerForm' class='form-condensed'>
      <table class='table table-form'>
        <tr>
          <th class='w-80px'><?php echo $lang->provider->name;?></th>
          <td class='w-p40'><?php echo html::input('name', '', "class='form-control'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->contact;?></th>
          <td><?php echo html::input('contact', '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->phone;?></th>
          <td><?php echo html::input('phone', '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->email;?></th>
          <td><?php echo html::input('email', '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->qq;?></th>
          <td><?php echo html::input('qq', '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->type;?></th>
          <td><?php echo html::select("type", $lang->provider->typeList, '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->size;?></th>
          <td><?php echo html::select('size', $lang->provider->sizeList, '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->industry;?></th>
          <td><?php echo html::select('industry', $industries, '', "class='form-control chosen'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->area;?></th>
          <td><?php echo html::select('area', $areas, '', "class='form-control chosen'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->weibo;?></th>
          <td><?php echo html::input('weibo', 'http://weibo.com/', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->weixin;?></th>
          <td><?php echo html::input('weixin', '', "class='form-control'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->site;?></th>
          <td><?php echo html::input('site', 'http://', "class='form-control'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->desc;?></th>
          <td colspan='2'><?php echo html::textarea('desc', '', "rows='2' class='form-control'");?></td>
        </tr>
        <tr>
          <th></th>
          <td>
            <?php echo html::submitButton() . '&nbsp;&nbsp;' . html::backButton();?>
            <div class='popover'></div>
          </td>
        </tr>
      </table>
    </form>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
