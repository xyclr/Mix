<?php 
/**
 * The edit view file of provider module of RanZhi.
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
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<ul id='menuTitle'>
  <li><?php commonModel::printLink('provider', 'browse', '', $lang->provider->browse);?></li>
  <li class='divider angle'></li>
</ul>
<div class='panel'>
  <div class='panel-heading'>
    <strong><i class="icon-edit"></i> <?php echo $lang->provider->edit;?></strong>
  </div>
  <div class='panel-body'>
    <form method='post' id='providerForm' class='form-inline'>
      <table class='table table-form w-p60'>
        <tr>
          <th class='w-80px'><?php echo $lang->provider->name;?></th>
          <td class='w-p40'><?php echo html::input('name', $provider->name, "class='form-control'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->relation;?></th>
          <td><?php echo html::select('relation', $lang->provider->relationList, $provider->relation, "class='form-control'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->type;?></th>
          <td><?php echo html::select("type", $lang->provider->typeList, $provider->type, "class='form-control'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->size;?></th>
          <td><?php echo html::select('size', $lang->provider->sizeList, $provider->size, "class='form-control'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->industry;?></th>
          <td><?php echo html::select('industry', $industries, $provider->industry, "class='form-control chosen'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->area;?></th>
          <td><?php echo html::select('area', $areas,  $provider->area, "class='form-control chosen'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->weibo;?></th>
          <td><?php echo html::input('weibo', $provider->weibo ? $provider->weibo : 'http://weibo.com/', "class='form-control'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->weixin;?></th>
          <td><?php echo html::input('weixin', $provider->weixin, "class='form-control'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->site;?></th>
          <td><?php echo html::input('site', $provider->site ? $provider->site : 'http://', "class='form-control'");?></td><td></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->desc;?></th>
          <td colspan='2'><?php echo html::textarea('desc', $provider->desc, "rows='2' class='form-control'");?></td>
        </tr>
        <tr>
          <th></th>
          <td>
            <?php echo html::submitButton() . '&nbsp;&nbsp;' . html::backButton();?>
            <div class='popover'></div>
          </td><td></td>
        </tr>
      </table>
    </form>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
