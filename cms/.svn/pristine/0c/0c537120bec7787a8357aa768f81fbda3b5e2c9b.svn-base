<?php
/**
 * The settings view file of refund module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     refund
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/chosen.html.php';?>
<div class='with-side'>
  <div class='side'>
    <nav class='menu leftmenu affix'>
      <ul class='nav nav-primary'>
        <li><?php commonModel::printLink('refund', 'settings', '', "{$lang->refund->settings}");?></li>
        <li><?php commonModel::printLink('refund', 'setCategory', '', "{$lang->refund->setCategory}");?></li>
      </ul>
    </nav>
  </div>
  <div class='main'>
    <div class='panel'>
      <div class='panel-heading'><?php echo $lang->refund->settings;?></div>
      <div class='panel-body'>
        <form id='ajaxForm' method='post'>
          <table class='table table-form table-condensed w-p40'>
          <tr>
            <th class='w-100px'><?php echo $lang->refund->firstReviewer;?></th>
            <td><?php echo html::select('firstReviewer', $firstReviewers, $firstReviewer, "class='form-control chosen'")?></td><td></td>
          </tr>
          <tr>
            <th><?php echo $lang->refund->secondReviewer;?></th>
            <td><?php echo html::select('secondReviewer', $secondReviewers, $secondReviewer, "class='form-control chosen'")?></td>
            <td><?php echo html::a('javascript:void(0)', "<i class='icon-question-sign'></i>", "data-original-title='{$lang->refund->secondReviewerTip}' data-toggle='tooltip' data-placement='right' ");?></td>
          </tr>
          <tr><th></th><td colspan='2'><?php echo html::submitButton();?></td></tr>
          </table>
        </form>
      </div>
    </div>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>
