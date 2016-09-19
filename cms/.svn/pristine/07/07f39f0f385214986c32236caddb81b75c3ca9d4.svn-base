<?php
/**
 * The ajaxGetDropMenu view file of project module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     project 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php js::set('projectID', $projectID);?>
<?php js::set('module', $module);?>
<?php js::set('method', $method);?>
<?php js::set('extra', $extra);?>
<input type='text' class='form-control' id='search' value='' onkeyup='searchItems(this.value, "project", v.projectID, v.module, v.method, v.extra)' placeholder='<?php echo $this->lang->project->search;?>'/>

<div id='searchResult'>
  <div id='defaultMenu'>
    <ul>
      <?php
      $iCharges  = 0;
      $others    = 0;
      $finisheds = 0;
      $suspends  = 0;
      foreach($projects as $project)
      {
          if($project->status != 'finished' and $project->status != 'suspend' and $project->PM == $this->app->user->account) $iCharges++;
          if($project->status != 'finished' and $project->status != 'suspend' and !($project->PM == $this->app->user->account)) $others++;
          if($project->status == 'finished') $finisheds++;
          if($project->status == 'suspend')  $suspends++;
      }
 
      if($iCharges and $others) echo "<li class='heading'>{$lang->project->mine}</li>";
      foreach($projects as $project)
      {
          if($project->status != 'finished' and $project->status != 'suspend' and $project->PM == $this->app->user->account)
          {
              echo "<li>" . html::a(sprintf($link, $project->id), "<i class='icon-folder-close-alt'></i> " . $project->name). "</li>";
          }
      }
 
      if($iCharges and $others) echo "<li class='heading'>{$lang->project->other}</li>";
      $class = ($iCharges and $others) ? "class='other'" : '';
      foreach($projects as $project)
      {
          if($project->status != 'finished' and $project->status != 'suspend' and !($project->PM == $this->app->user->account))
          {
              echo "<li>" . html::a(sprintf($link, $project->id), "<i class='icon-folder-close-alt'></i> " . $project->name, '', "$class"). "</li>";
          }
      }
      ?>
    </ul>
    <div>
      <?php echo html::a($this->createLink('project', 'index', "status={$currentProject->status}"), "<i class='icon-th'></i> " . $lang->project->browse, "id='backButton'");?>
      <div class='pull-right actions'>
        <div><?php if($finisheds):?><a id='finishedMore' href='javascript:switchFinished()'><?php echo $lang->project->finished . ' <i class="icon-angle-right"></i>';?></a><?php endif;?></div>
        <div><?php if($suspends):?><a id='suspendMore' href='javascript:switchSuspend()'><?php echo $lang->project->suspended . ' <i class="icon-angle-right"></i>';?></a><?php endif;?></div>
      </div>
    </div>
  </div>

  <div id='finishedMenu'>
    <ul>
      <?php
      foreach($projects as $project)
      {
          if($project->status == 'finished') echo "<li>" . html::a(sprintf($link, $project->id), "<i class='icon-folder-close-alt'></i> " . $project->name, '', "class='done'"). "</li>";
      }
      ?>
    </ul>
  </div>

  <div id='suspendMenu'>
    <ul>
      <?php
      foreach($projects as $project)
      {
          if($project->status == 'suspend') echo "<li>" . html::a(sprintf($link, $project->id), "<i class='icon-folder-close-alt'></i> " . $project->name, '', "class='done'"). "</li>";
      }
      ?>
    </ul>
  </div>
</div>
