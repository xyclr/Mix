<?php
/**
 * The personal view file of attend module of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     attend
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php js::set('confirmReview', $lang->attend->confirmReview);?>
<div class='panel'>
  <table class='table table-hover table-striped table-sorter table-data table-fixed text-center'>
    <thead>
      <tr class='text-center'>
        <th class='w-50px'><?php echo $lang->user->id;?></th>
        <th class='w-100px'><?php echo $lang->user->dept;?></th>
        <th class='w-100px'><?php echo $lang->user->realname;?></th>
        <th class='w-100px'><?php echo $lang->attend->date;?></th>
        <th class='w-100px'><?php echo $lang->attend->status;?></th>
        <th class='w-80px'><?php echo $lang->attend->manualIn;?></th>
        <th class='w-80px'><?php echo $lang->attend->manualOut;?></th>
        <th class='w-100px'><?php echo $lang->attend->reason;?></th>
        <th><?php echo $lang->attend->desc;?></th>
        <th class='w-150px'><?php echo $lang->actions;?></th>
      </tr>
    </thead>
    <?php if(!empty($this->config->attend->reviewedBy)):?>
    <?php if($this->config->attend->reviewedBy == $this->app->user->account):?>
    <?php foreach($attends as $attend):?>
    <?php $account = $attend->account;?>
    <?php $currentDept = $users[$attend->account]->dept;?>
    <tr>
      <td><?php echo $attend->id;?></td>
      <td><?php echo $deptList[$currentDept];?></td>
      <td><?php echo isset($users[$account]) ? $users[$account]->realname : '';?></td>
      <td><?php echo $attend->date?></td>
      <td><?php echo zget($lang->attend->statusList, $attend->status)?></td>
      <td><?php echo substr($attend->manualIn, 0, 5)?></td>
      <td><?php echo substr($attend->manualOut, 0, 5)?></td>
      <td><?php echo zget($lang->attend->reasonList, $attend->reason)?></td>
      <td><?php echo $attend->desc?></td>
      <td>
        <?php echo html::a($this->createLink('attend', 'review', "attendID={$attend->id}&status=pass"), $lang->attend->reviewStatusList['pass'], "class='pass'")?>
        <?php echo html::a($this->createLink('attend', 'review', "attendID={$attend->id}&status=reject"), $lang->attend->reviewStatusList['reject'], "class='reject'")?>
      </td>
    </tr>
    <?php endforeach;?>
    <?php endif;?>
    <?php else:?>
    <?php foreach($attends as $dept => $deptAttends):?>
      <?php foreach($deptAttends as $account => $userAttends):?>
        <?php foreach($userAttends as $attend):?>
        <?php $currentDept = $users[$attend->account]->dept;?>
        <tr>
          <td><?php echo $attend->id;?></td>
          <td><?php echo $deptList[$currentDept]->name?></td>
          <td><?php echo isset($users[$account]) ? $users[$account]->realname : '';?></td>
          <td><?php echo $attend->date?></td>
          <td><?php echo zget($lang->attend->statusList, $attend->status)?></td>
          <td><?php echo substr($attend->manualIn, 0, 5)?></td>
          <td><?php echo substr($attend->manualOut, 0, 5)?></td>
          <td><?php echo zget($lang->attend->reasonList, $attend->reason)?></td>
          <td><?php echo $attend->desc?></td>
          <td>
            <?php echo html::a($this->createLink('attend', 'review', "attendID={$attend->id}&status=pass"), $lang->attend->reviewStatusList['pass'], "class='pass'")?>
            <?php echo html::a($this->createLink('attend', 'review', "attendID={$attend->id}&status=reject"), $lang->attend->reviewStatusList['reject'], "class='reject'")?>
          </td>
        </tr>
        <?php endforeach;?>
      <?php endforeach;?>
    <?php endforeach;?>
    <?php endif;?>
  </table>
</div>
<?php include '../../common/view/footer.html.php';?>
