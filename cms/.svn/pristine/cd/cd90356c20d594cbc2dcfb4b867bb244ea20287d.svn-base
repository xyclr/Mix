<?php 
/**
 * The edit view file of depositor module of RanZhi.
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
<form method='post' id='ajaxForm' action='<?php echo $this->createLink('depositor', 'edit', "depositorID=$depositor->id")?>'>
  <table class='table table-form w-p60'>
    <tr>
      <th class='w-120px'><?php echo $lang->depositor->type;?></th>
      <td><?php echo html::select('type', $lang->depositor->typeList, $depositor->type, "class='form-control' disabled");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->depositor->abbr;?></th>
      <td><?php echo html::input('abbr', $depositor->abbr, "class='form-control'");?></td>
    </tr>
    <?php if($depositor->type != 'cash'):?>
    <?php if($depositor->type == 'bank'):?>
    <tr>
      <th><?php echo $lang->depositor->bankProvider;?></th>
      <td><?php echo html::input('provider', $depositor->provider, "class='form-control'");?></td>
    </tr>
    <?php else:?>
    <tr>
      <th><?php echo $lang->depositor->serviceProvider;?></th>
      <td><?php echo html::select('provider', $lang->depositor->providerList, $depositor->provider, "class='form-control'");?></td>
    </tr> 
    <?php endif;?>
    <tr>
      <th><?php echo $lang->depositor->title;?></th>
      <td><?php echo html::input('title', $depositor->title, "class='form-control'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->depositor->account;?></th>
      <td><?php echo html::input('account', $depositor->account, "class='form-control'");?></td>
    </tr>
    <?php if($depositor->type == 'bank'):?>
    <tr>
      <th><?php echo $lang->depositor->bankcode;?></th>
      <td><?php echo html::input('bankcode', $depositor->bankcode, "class='form-control'");?></td>
    </tr>
    <?php endif;?>
    <tr>
      <th><?php echo $lang->depositor->public;?></th>
      <td><?php echo html::radio('public', $lang->depositor->publicList, $depositor->public);?></td>
    </tr>
    <?php endif;?>
    <tr>
      <th><?php echo $lang->depositor->currency;?></th>
      <td><?php echo html::select('currency', $currencyList, $depositor->currency, "class='form-control' disabled");?></td>
    </tr>
    <tr>
      <th></th>
      <td><?php echo html::submitButton();?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>
