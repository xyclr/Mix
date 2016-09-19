<?php
/**
 * The colleague view file of user module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     User
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php
include $app->getModuleRoot() . 'common/view/header.html.php';
include '../../common/view/treeview.html.php';
js::set('deptID', $deptID);
?>
<div class='col-xs-2'>
  <div class='panel'>
    <div class='panel-heading'><strong><i class="icon-building"></i> <?php echo $lang->dept->common;?></strong></div>
    <div class='panel-body'><div id='treeMenuBox'><?php echo $treeMenu;?></div></div>
  </div>
</div>
<div class='col-xs-10'>
  <div class='clearfix'>
    <div class="panel">
      <div class="panel-heading">
        <strong><i class="icon-group"></i> <?php echo $lang->user->colleague;?></strong>
        <div class="pull-right panel-actions search">
          <form method='post' class='form-inline form-search w-300px'>
            <div class="input-group">
              <?php echo html::input('query', $query, "class='form-control search-query' placeholder='{$lang->user->inputColleague}'"); ?>
              <span class="input-group-btn">
                <?php echo html::submitButton($lang->user->searchUser,"btn btn-primary"); ?>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div class='cards cards-user'>
        <?php foreach($users as $user):?>
        <div class='col-card'>
          <div class='card card-user gender-<?php echo $user->gender?>'>
            <div class='card-heading'>
              <?php if($user->avatar) echo html::image($user->avatar, "class='bg'");?>
              <div class='cover'></div>
              <div class='avatar'><?php if($user->avatar) echo html::image($user->avatar);?></div>
              <div class='title'>
                <h4 class='user-realname'><?php echo $user->realname;?></h4>
                <?php if($user->dept or $user->role):?>
                <div class='user-info'>
                  <i class='icon-group'></i>
                  <?php
                  if($user->dept) echo zget($depts, $user->dept, ' ');
                  if($user->role and $user->dept) echo '&nbsp;·&nbsp;';
                  if($user->role) echo zget($lang->user->roleList, $user->role);
                  ?>
                </div>
                <?php endif;?>
              </div>
              <div class='action'>
                <a href='javascript:;' class='btn-vcard'><i class='icon-qrcode'></i></a>
              </div>
            </div>
            <div class='card-content'>
              <dl class='contact-info'>
                <?php $companyName = isset($config->company->name) ? $config->company->name : '';?>
                <?php if($user->phone or $user->mobile) echo "<dd><i class='icon icon-phone-sign'></i> $user->phone $user->mobile</dd>";?>
                <?php if($user->qq) echo "<dd><i class='icon icon-qq'></i> " . html::a("http://wpa.qq.com/msgrd?v=3&uin={$user->qq}&site={$companyName}&menu=yes", $user->qq, "target='_blank'") . "</dd>";?>
                <?php if($user->email) echo "<dd><i class='icon icon-envelope-alt'></i> " . html::mailto($user->email, $user->email) . "</dd>";?>
                <?php if($user->address) echo "<dd><i class='icon icon-home'></i> $user->address </dd>";?>
              </dl>
            </div>
            <div class='vcard text-center'>
              <?php echo html::image(inlink('vcard', "user={$user->account}"));?>
            </div>
          </div>
        </div>
        <?php endforeach;?>
        <?php $pager->show();?>
      </div>
    </div>
  </div>
</div>
<?php include '../../../team/common/view/footer.html.php'; ?>
