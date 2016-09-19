<?php 
/**
 * The browse view file of project module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     project 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php js::set('status', $status);?>
<div id='menuActions'><?php commonModel::printLink('project', 'create', '', $this->lang->project->create, "id='createButton' class='btn btn-primary'");?></div>
<div class='row'>
<?php foreach($projects as $project):?>
  <div class='col-md-4 col-sm-6'>
    <div class='panel project-block'>
      <div class='panel-heading'>
        <strong><?php echo $project->name;?></strong>
        <div class="panel-actions pull-right">
          <div class="dropdown">
            <button class="btn btn-mini" data-toggle="dropdown"><span class="caret"></span></button>
            <ul class="dropdown-menu pull-right">
              <?php commonModel::printLink('project', 'edit', "projectID=$project->id", $lang->edit, "data-toggle='modal'", '', '', 'li');?>
              <?php commonModel::printLink('project', 'member', "projectID=$project->id", $lang->project->member, "data-toggle='modal'", '', '', 'li');?>
              <?php if($project->status != 'finished') commonModel::printLink('project','finish', "projectID=$project->id", $lang->finish, "data-toggle='modal'", '', '', 'li');?>
              <?php if($project->status != 'doing') commonModel::printLink('project', 'activate', "projectID=$project->id", $lang->activate, "class='switcher' data-confirm='{$lang->project->confirm->activate}'", '', '', 'li');?>
              <?php if($project->status != 'suspend') commonModel::printLink('project', 'suspend', "projectID=$project->id", $lang->project->suspend, "class='switcher' data-confirm='{$lang->project->confirm->suspend}'", '', '', 'li');?>
              <?php commonModel::printLink('project', 'delete', "projectID=$project->id", $lang->delete, "class='deleter'", '', '', 'li');?>
            </ul>
          </div>
        </div>
      </div>
      <div class='panel-body'>
        <p class='info'><?php echo $project->desc;?></p>
        <div class='footerbar text-important'>
          <span><?php foreach($project->members as $member) if($member->role == 'manager') echo "<i class='icon icon-user'> </i>" . $users[$member->account];?></span>
          <span class=''><i class='icon icon-time'> </i><?php echo formatTime($project->begin, 'm-d') . ' ~ ' .  formatTime($project->end, 'm-d');?></span>
          <?php $browseLink = helper::createLink('task', $this->cookie->taskListType == false ? 'browse' : $this->cookie->taskListType, "projectID=$project->id");?>
          <?php echo html::a($browseLink, $lang->project->enter, "class='btn btn-primary entry'");?>
        </div>
      </div>
    </div>
  </div>
<?php endforeach;?>
</div>
<?php include '../../common/view/footer.html.php';?>
