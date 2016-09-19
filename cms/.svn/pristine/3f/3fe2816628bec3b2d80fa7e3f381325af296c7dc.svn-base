<?php 
/**
 * The setting view of contract module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Xiying Guan <guanxiying@xirangit.com>
 * @package     contract 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<div class='panel'>
  <div class='panel-heading'>
  <strong><i class='icon-wrench'></i> <?php echo $lang->contract->setting;?></strong>
  </div>
  <div class='panel-body'>
    <form method='post' id='ajaxForm'>
      <div class='w-450px'>
        <?php
        foreach($config->contract->codeFormat as $unit):
        $value = '';
        if(!isset($lang->contract->codeUnitList[$unit]))
        {
            $value = $unit; 
            $unit  = 'fix';
        }
        $hideInput = $unit != 'fix';
        ?>
        <div class='row input-row'>
          <div class='col-xs-9'>
            <div class='input-cell<?php echo $hideInput ? '' : ' input-group'; ?>'>
            <?php
            echo html::select('unit[]', $lang->contract->codeUnitList, $unit, "class='form-control unit'");
            echo "<span class='input-group-addon input-cell-addon'>:</span>" . html::input('unit[]', $value, "class='form-control input-cell-addon'");
            ?>
            </div>
          </div>
          <div class='col-xs-3'>
            <i class='btn btn-mini icon-plus'></i>
            <i class='btn btn-mini icon-remove'></i>
          </div>
        </div>
        <?php endforeach;?>
      </div>
      <div><?php echo html::submitButton();?></div>
    </form>
  </div>
</div>
<div id='unitItem' class='hide'>
  <div class='row input-row'>
    <div class='col-xs-9'>
      <div class='input-cell'>
        <?php
        echo html::select('unit[]', $lang->contract->codeUnitList, '', "class='form-control unit'");
        echo "<span class='input-group-addon input-cell-addon'>:</span>" . html::input('unit[]', '', "class='form-control input-cell-addon'");
        ?>
      </div>
    </div>
    <div class='col-xs-3'>
      <i class='btn btn-mini icon-plus'></i>
      <i class='btn btn-mini icon-remove'></i>
    </div>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
