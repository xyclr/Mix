<?php 
/**
 * The create view file of depositor module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     depositor 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<form method='post' id='ajaxForm' action='<?php echo $this->createLink('depositor', 'create')?>'>
  <table class='table table-form w-p60'>
    <tr>
      <th class='w-100px'><?php echo $lang->depositor->type;?></th>
      <td><?php echo html::select('type', $lang->depositor->typeList, '', "class='form-control'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->depositor->abbr;?></th>
      <td><?php echo html::input('abbr', '', "class='form-control'");?></td>
    </tr>
    <tr class='form-online'>
      <th><?php echo $lang->depositor->serviceProvider;?></th>
      <td><?php echo html::select('provider', $lang->depositor->providerList, '', "class='form-control'");?></td>
    </tr>
    <tr class='form-bank form-online'>
      <th><?php echo $lang->depositor->title;?></th>
      <td><?php echo html::input('title', '', "class='form-control'");?></td>
    </tr>
    <tr class='form-bank'>
      <th><?php echo $lang->depositor->bankProvider;?></th>
      <td><?php echo html::input('provider', '', "class='form-control'");?></td>
    </tr>
   <tr class='form-bank form-online'>
      <th><?php echo $lang->depositor->account;?></th>
      <td><?php echo html::input('account', '', "class='form-control'");?></td>
    </tr>
    <tr class='form-bank'>
      <th><?php echo $lang->depositor->bankcode;?></th>
      <td><?php echo html::input('bankcode', '', "class='form-control'");?></td>
    </tr>
    <tr class='form-bank form-online'>
      <th><?php echo $lang->depositor->public;?></th>
      <td><?php echo html::radio('public', $lang->depositor->publicList, '');?></td>
    </tr>
    <tr>
      <th><?php echo $lang->depositor->currency;?></th>
      <td><?php echo html::select('currency', $currencyList, '', "class='form-control'");?></td>
    </tr>
    <tr>
      <th></th>
      <td><?php echo html::submitButton();?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
