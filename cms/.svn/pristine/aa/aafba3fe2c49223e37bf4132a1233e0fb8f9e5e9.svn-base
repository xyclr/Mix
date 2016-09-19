<?php
/**
 * The manage privilege view of group module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Xiying Guan <guanxiying@xirangit.com>
 * @package     group
 * @version     $Id: managepriv.html.php 4129 2013-01-18 01:58:14Z wwccss $
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<form class='form-inline' id='ajaxForm' method='post'>
  <?php if($type == 'byGroup'):?>
  <div class='row'>
    <div class='col-md-6'>
      <div class='panel panel-app'>
        <div class='panel-heading'>
          <strong><?php echo $lang->group->noPriv?></strong>
        </div>
        <div class='panel-body'>
          <?php foreach($rights as $code => $right):?>
          <?php if($right['right'] != 1):?>
          <div class='group-item'>
            <label>
              <?php if($right['icon']) echo html::image($right['icon'], "class='app-icon'");?>
              <?php if(!$right['icon']):?>
              <?php $name = $right['abbr'] ? $right['abbr'] : $right['name'];?>
              <?php $rightName = validater::checkCode(substr($name, 0, 1)) ? strtoupper(substr($name, 0, 1)) : substr($name, 0, 3);?>
              <?php if(validater::checkCode(substr($name, 0, 1)) and validater::checkCode(substr($name, 1, 1)))   $rightName .= strtoupper(substr($name, 1, 1));?>
              <?php if(validater::checkCode(substr($name, 0, 1)) and !validater::checkCode(substr($name, 1, 1)))  $rightName .= strtoupper(substr($name, 1, 3));?>
              <?php if(!validater::checkCode(substr($name, 0, 1)) and validater::checkCode(substr($name, 3, 1)))  $rightName .= strtoupper(substr($name, 3, 1));?>
              <?php if(!validater::checkCode(substr($name, 0, 1)) and !validater::checkCode(substr($name, 3, 1))) $rightName .= substr($name, 3, 3);?>
              <i class='icon icon-default' style="background-color: hsl(<?php echo $right['id'] * 47 % 360;?>, 100%, 40%)"> <span><?php echo $rightName;?> </span></i>
              <?php endif;?>
              <?php echo html::checkbox('apps', array($code => $right['name']), ($right['right'] == '1' ? $code : '') . "onchange='submitForm()'");?>
            </label>
          </div>
          <?php endif?>
          <?php endforeach?>
        </div>
      </div>
    </div>
    <div class='col-md-6'>
      <div class='panel panel-app'>
        <div class='panel-heading'>
          <strong><?php echo $lang->group->havePriv?></strong>
        </div>
        <div class='panel-body'>
          <?php foreach($rights as $code => $right):?>
          <?php if($right['right'] == 1):?>
          <div class='group-item'>
            <label>
              <?php if($right['icon']) echo html::image($right['icon'], "class='app-icon'");?>
              <?php if(!$right['icon']):?>
              <?php $name = $right['abbr'] ? $right['abbr'] : $right['name'];?>
              <?php $rightName = validater::checkCode(substr($name, 0, 1)) ? strtoupper(substr($name, 0, 1)) : substr($name, 0, 3);?>
              <?php if(validater::checkCode(substr($name, 0, 1)) and validater::checkCode(substr($name, 1, 1)))   $rightName .= strtoupper(substr($name, 1, 1));?>
              <?php if(validater::checkCode(substr($name, 0, 1)) and !validater::checkCode(substr($name, 1, 1)))  $rightName .= strtoupper(substr($name, 1, 3));?>
              <?php if(!validater::checkCode(substr($name, 0, 1)) and validater::checkCode(substr($name, 3, 1)))  $rightName .= strtoupper(substr($name, 3, 1));?>
              <?php if(!validater::checkCode(substr($name, 0, 1)) and !validater::checkCode(substr($name, 3, 1))) $rightName .= substr($name, 3, 3);?>
              <i class='icon icon-default' style="background-color: hsl(<?php echo $right['id'] * 47 % 360;?>, 100%, 40%)"> <span><?php echo $rightName;?> </span></i>
              <?php endif;?>
              <?php echo html::checkbox('apps', array($code => $right['name']), $right['right'] == '1' ? $code : '');?>
            </label>
          </div>
          <?php endif?>
          <?php endforeach?>
        </div>
      </div>
    </div>
  </div>
  <?php endif?>
  <div class='panel'>
    <?php if($type == 'byApp'):?>
    <div class='panel-heading'>
      <strong><?php echo $lang->group->priv?></strong>
    </div>
    <div class='panel-body'>
      <?php foreach($rights as $code => $right):?>
      <div class='group-item'><?php echo html::checkbox('groups', array($code => $right['name']), $right['right'] == '1' ? $code : '');?></div>
      <?php endforeach?>
    </div>
    <?php endif?>
    <div class='panel-footer text-center'>
      <?php 
      echo html::submitButton();
      echo html::backButton();
      echo html::hidden('foo'); // Just a var, to make sure $_POST is not empty.
      ?>
    </div>
  </div>
</form>
<?php include '../../common/view/footer.html.php';?>
