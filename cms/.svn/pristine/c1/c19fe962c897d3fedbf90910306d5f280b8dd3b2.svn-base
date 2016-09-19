<?php 
/**
 * The edit view file of customer module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     customer 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<ul id='menuTitle'>
  <li><?php commonModel::printLink('customer', 'browse', '', $lang->customer->list);?></li>
  <li class='divider angle'></li>
  <li><?php commonModel::printLink('customer', 'view', "customerID={$customer->id}", $lang->customer->view);?></li>
  <li class='divider angle'></li>
  <li class='title'><?php echo $lang->customer->edit?></li>
</ul>
<form method='post' id='customerForm' class='form-condensed'>
<div class='row-table'>
  <div class='col-main'>
   <div class='panel'>
     <div class='panel-body'>
       <table class='table table-form table-data'>
         <tr>
           <th class='w-70px'><?php echo $lang->customer->name;?></th>
           <td>
             <div class='input-group'>
               <?php echo html::input('name', $customer->name, "class='form-control'");?>
               <div class='input-group-addon'>
                 <label class='checkbox'><input type='checkbox' id='public' name='public' value='1' <?php if($customer->public) echo 'checked';?>> <?php echo $lang->customer->public;?></label>
               </div>
             </div>
           </td>
         </tr>
         <tr>
           <th><?php echo $lang->customer->intension;?></th>
           <td><?php echo html::textarea('intension', $customer->intension, "class='form-control' rows=2");?></td>
         </tr>
         <tr>
           <th><?php echo $lang->customer->desc;?></th>
           <td><?php echo html::textarea('desc', $customer->desc, "rows='2' class='form-control'");?></td>
         </tr>
       </table>
     </div>
   </div>
    <?php echo $this->fetch('action', 'history', "objectType=customer&objectID={$customer->id}")?>
    <div class='page-actions'>
      <?php echo html::submitButton() . html::backButton();?>
      <div class='popover'></div>
    </div>
  </div>
  <div class='col-side'>  
   <div class='panel'>
     <div class='panel-heading'><strong><i class="icon-list-info"></i> <?php echo $lang->customer->basicInfo;?></strong></div>
     <div class='panel-body'>
       <table class='table table-info'>
         <tr>
           <th class='w-70px'><?php echo $lang->customer->level;?></th>
           <td><?php echo html::select('level', $levelList, $customer->level, "class='form-control'");?></td>
         </tr>
         <tr>
           <th><?php echo $lang->customer->status;?></th>
           <td><?php echo html::select("status", $lang->customer->statusList, $customer->status, "class='form-control'");?></td>
         </tr>
         <tr>
           <th><?php echo $lang->customer->size;?></th>
           <td><?php echo html::select('size', $sizeList, $customer->size, "class='form-control'");?></td>
         </tr>
         <tr>
           <th><?php echo $lang->customer->type;?></th>
           <td><?php echo html::select("type", $lang->customer->typeList, $customer->type, "class='form-control'");?></td><td></td>
         </tr>
         <tr>
           <th><?php echo $lang->customer->industry;?></th>
           <td><?php echo html::select('industry', $industryList, $customer->industry, "class='form-control chosen'");?></td>
         </tr>
         <tr>
           <th><?php echo $lang->customer->area;?></th>
           <td><?php echo html::select('area', $areaList,  $customer->area, "class='form-control chosen'");?></td>
         </tr>
         <tr>
           <th><?php echo $lang->customer->weibo;?></th>
           <td><?php echo html::input('weibo', $customer->weibo ? $customer->weibo : 'http://weibo.com/', "class='form-control'");?></td>
         </tr>
         <tr>
           <th><?php echo $lang->customer->weixin;?></th>
           <td><?php echo html::input('weixin', $customer->weixin, "class='form-control'");?></td>
         </tr>
         <tr>
           <th><?php echo $lang->customer->site;?></th>
           <td><?php echo html::input('site', $customer->site ? $customer->site : 'http://', "class='form-control'");?></td><td></td>
         </tr>
       </table>
     </div>
   </div>
  </div>
</div>
</form>
<?php include '../../common/view/footer.html.php';?>
