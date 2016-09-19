<?php 
/**
 * The browse view file of depositor module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     depositor 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<div class='panel'>
  <div class='panel-heading'>
    <strong><i class="icon-group"></i> <?php echo $lang->depositor->browse;?></strong>
    <?php if($app->user->admin == 'super' or isset($app->user->rights['balance']['browse'])):?>
    <?php foreach($balances as $currency => $balanceList):?>
    <?php $sum = 0;?>
    <?php foreach($balanceList as $balance) $sum += $balance->money;?>
    <strong class='text-danger' title='<?php echo $sum?>'><?php echo $currencyList[$currency] . $lang->colon . commonModel::tidyMoney($sum);?></strong>
    <?php endforeach;?>
    <?php endif;?>
    <div class='panel-actions pull-right'>
      <?php commonModel::printLink('depositor', 'export', '', "<i class='icon-download-alt'></i> " . $lang->export, "class='iframe btn btn-primary' data-width='700'");?></li>
      <?php commonModel::printLink('depositor', 'create', '', "<i class='icon-plus'></i> {$lang->depositor->create}", "class='btn btn-primary' data-toggle='modal'")?>
    </div>
  </div>
  <div class='panel-body'>
    <div class="cards">
      <?php foreach($depositors as $depositor):?>
      <div class='col-md-4 col-sm-6'>
        <div class='card card-depositor'>
          <div class='card-heading <?php echo $depositor->type;?>'>
            <div class='info'><span class='label' title='<?php echo $lang->depositor->type?>'><i class='icon'></i> <?php echo $lang->depositor->typeList[$depositor->type]?></span></div>
            <h4 class='title'><?php echo $depositor->abbr;?></h4>
            <div class='subtitle'>
              <?php if($depositor->type != 'cash' && !empty($depositor->title) && $depositor->title != $depositor->abbr):?>
              <span class='cell text-muted' title='<?php echo $lang->depositor->title;?>'><?php echo $depositor->title;?></span>
              <?php endif;?>
            </div>
          </div>
          <div class='card-caption row'>
            <?php if($depositor->type != 'cash'):?>
            <?php if($depositor->type == 'bank') echo "<dl class='dl-horizontal'><dt>{$lang->depositor->bankProvider} {$lang->colon} </dt><dd>$depositor->provider </dd></dl>";?>
            <?php if($depositor->type == 'online') echo "<dl class='dl-horizontal'><dt>{$lang->depositor->serviceProvider} {$lang->colon} </dt><dd>{$lang->depositor->providerList[$depositor->provider]} </dd></dl>";?>
            <?php echo "<dl class='dl-horizontal'><dt>{$lang->depositor->account} {$lang->colon} </dt><dd>$depositor->account</dd></dl>";?>
            <?php if($depositor->type == 'bank') echo "<dl class='dl-horizontal'><dt>{$lang->depositor->bankcode} {$lang->colon} </dt><dd>$depositor->bankcode</dd></dl>";?>
           <?php endif;?>
           <?php if(($app->user->admin == 'super' or isset($app->user->rights['balance']['browse'])) and isset($balances[$depositor->currency][$depositor->id])):?>
             <span  class='label-balance text-danger'>
             <?php echo zget($lang->currencySymbols, $depositor->currency)?>
             <?php echo formatMoney($balances[$depositor->currency][$depositor->id]->money);?>
             </span>
           <?php endif;?>
          </div>
          <div class='card-actions'>
            <div class='pull-right'>
              <?php commonModel::printLink('depositor', 'edit', "depositorID=$depositor->id", $lang->edit, "data-toggle='modal'");?>
              <?php commonModel::printLink('depositor', 'check', "depositorID=$depositor->id", $lang->depositor->check);?>
              <?php if($depositor->status == 'normal') commonModel::printLink('depositor', 'forbid', "depositorID=$depositor->id", $lang->depositor->forbid, "data-toggle=modal");?>
              <?php if($depositor->status == 'disable') commonModel::printLink('depositor', 'activate', "depositorID=$depositor->id", $lang->depositor->activate, "data-toggle=modal");?>
              <?php commonModel::printLink('balance', 'browse', "depositorID=$depositor->id", $lang->depositor->balance, "data-toggle='modal'");?>
              <?php if(empty($trades[$depositor->id])) commonModel::printLink('depositor', 'delete', "depositorID=$depositor->id", $lang->delete, "class='deleter'");?>
            </div>
            <?php echo "<span class='text-" . ($depositor->status == 'normal' ? 'success': 'danger') . "'>{$lang->depositor->statusList[$depositor->status]}</span>";?>
          </div>
        </div>
      </div>
      <?php endforeach;?>
    </div>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
