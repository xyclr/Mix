<?php
/**
 * The review view file of refund module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     refund 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<?php include '../../../sys/common/view/kindeditor.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<?php js::set('detail', !empty($refund->detail) ? true : false);?>
<form method='post' id='ajaxForm' action='<?php echo inlink('review', "refundID={$refund->id}")?>'>
  <?php if(!empty($refund->detail)):?>
  <table class='table table-form'>
    <tr class='text-center'>
      <th class='w-80px'><?php echo $lang->refund->date;?></th>
      <th class='w-100px text-right'><?php echo $lang->refund->money;?></th>
      <th class='w-100px'><?php echo $lang->refund->status;?></th>
      <th class='w-120px'><?php echo $lang->refund->category;?></th>
      <th><?php echo $lang->refund->desc;?></th>
      <th>
        <div class='btn-group'>
          <button class='btn btn-mini all-pass' type='button'><?php echo $lang->refund->reviewAllStatusList['allpass'];?></button>
          <button class='btn btn-mini all-reject' type='button'><?php echo $lang->refund->reviewAllStatusList['allreject'];?></button>
          <?php echo html::input('allPass', '1', "class='hide'");?>
          <?php echo html::input('allReject', '0', "class='hide'");?>
        </div>
      </th>
    </tr>
    <?php foreach($refund->detail as $detail):?>
    <tr class='text-center'>
      <td><?php echo $detail->date;?></td>
      <td class='text-right'><?php echo zget($currencySign, $detail->currency) . "<span class='detailMoney'>" . $detail->money . "</span>";?></td>
      <td><?php echo $lang->refund->statusList[$detail->status];?></td>
      <td><?php echo $categories[$detail->category];?></td>
      <td><?php echo $detail->desc?></td>
      <td><?php echo html::radio("status{$detail->id}", $lang->refund->reviewStatusList, $detail->status == 'reject' ? 'reject' : 'pass');?></td>
    </tr>
    <?php endforeach;?>
  </table>
  <?php endif;?>
  <table class='table table-form'>
    <?php if(empty($refund->detail)):?>
    <tr>
      <th class='w-60px'><?php echo $lang->refund->status;?></th>
      <td class='text-left'><?php echo html::radio("status", $lang->refund->reviewStatusList, 'pass');?></td>
    </tr>
    <?php endif;?>
    <tr class='reviewMoney'>
      <th class='w-60px'><?php echo $lang->refund->reviewMoney;?></th>
      <td>
        <div class='input-group'>
          <?php echo html::input('money', $refund->money, "class='form-control'");?>
          <span class='input-group-addon'><?php echo zget($lang->currencyList, $refund->currency, $refund->currency);?></span>
        </div>
      </td>
    </tr>
    <tr class='reason hide'>
      <th class='w-60px'><?php echo $lang->refund->reason;?></th>
      <td><?php echo html::textarea("reason", '', "class='form-control rowspan=3'");?></td>
    </tr>
    <tr>
      <th></th><td><?php echo html::submitButton();?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
