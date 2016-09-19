<?php
/**
 * The manage privilege view of group module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Xiying Guan <guanxiying@xirangit.com>
 * @package     group
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include $app->getModuleRoot() . 'common/view/header.html.php';?>
<form class='form-inline' id='ajaxForm' method='post'>
  <div class='panel'>
    <div class='panel-heading'>
      <strong><?php echo $lang->group->priv?></strong>
    </div>
    <div class='panel-body'>
      <?php foreach($rights as $code => $right):?>
      <div class='group-item'><?php echo html::checkbox('groups', array($code => $right['name']), $right['right'] == '1' ? $code : '');?></div>
      <?php endforeach?>
    </div>
    <div class='panel-footer'><?php echo html::submitButton() . html::hidden('foo'); // Just a var, to make sure $_POST is not empty.?></div>
  </div>
</form>
<?php include $app->getModuleRoot() . 'common/view/footer.html.php';?>
