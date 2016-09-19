<?php
/**
 * The batch create view of task module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <Yidong@cnezsoft.com>
 * @package     task
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php 
$isChildren = !empty($parent);
include $app->getAppRoot() . '../sys/common/view/header.modal.html.php';
?>
<?php include '../../common/view/datepicker.html.php';?>
<?php include '../../common/view/chosen.html.php';?>
<?php if(!$isChildren) $this->loadModel('project')->setMenu($projects, $projectID);?>
<div class='<?php echo $isChildren ? '' : 'with-menu';?> page-content'>
  <form id='ajaxForm' method='post' action='<?php echo $this->createLink('task', 'batchCreate', "projectID=$projectID&parent=$parent");?>'>
    <div class='panel'>
      <table class='table table-form'>
        <thead>
          <tr class='text-center'>
            <th class='w-60px'><?php echo $lang->task->id;?></th> 
            <th><?php echo $lang->task->name;?> <span class='required'></span></th>
            <th class='w-100px'><?php echo $lang->task->assignedTo;?></th>
            <th class='w-p25'><?php echo $lang->task->desc;?></th>
            <th class='w-120px'><?php echo $lang->task->deadline;?></th>
            <th class='w-70px'><?php echo $lang->task->pri;?></th>
            <th class='w-70px'><?php echo $lang->task->estimateAB;?></th>
          </tr>
        </thead>

        <?php
        $teamUsers = $users;
        $users['ditto'] = $lang->ditto;
        ?>
        <?php for($i = 0; $i < $config->task->batchCreate; $i++):?>
        <?php 
        $member = $i == 0 ? '' : 'ditto';
        $pri = 3;
        ?>
        <tr>
          <td class='text-center'><?php echo $i+1;?><?php echo html::input("parent[$i]", $parent, "class='hide'");?></td>
          <?php if($isChildren):?>
          <td><?php echo html::input("name[$i]", '', "class='form-control'");?></td>
          <td><?php echo html::select("assignedTo[$i]", $users, $member, "class='form-control chosen'");?></td>
          <?php else:?>
          <td>
            <div class='input-group'>
              <?php echo html::input("name[$i]", '', "class='form-control'");?>
              <span class='input-group-addon'>
                <label class='checkbox'>
                  <input type='checkBox' data-id='<?php echo $i?>' name='<?php echo "multiple[$i]"?>' value='1' />
                  <?php echo $lang->task->multipleAB;?>
                </label>
              </span>
            </div>
            <div class="modal fade modal-team" id="modal<?php echo $i;?>">
              <div class="modal-dialog">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only"><?php echo $lang->close?></span></button>
                  <h4 class="modal-title"><?php echo $lang->task->team?></h4>
                </div>
                <div class="modal-content">
                  <table class='table-form'>
                    <?php for($mi = 0; $mi < 6; $mi++):?>
                    <tr>
                      <td class='w-p70'><?php echo html::select("team[$i][]", $teamUsers, '', "class='form-control chosen'")?></td>
                      <td class='w-p30'>
                        <div class='input-group'>
                          <?php echo html::input("teamEstimate[$i][]", '', "class='form-control text-center' placeholder='{$lang->task->estimateAB}'")?>
                          <span class='input-group-addon'><?php echo $lang->task->hour?></span>
                        </div>
                      </td>
                    </tr>
                    <?php endfor;?>
                    <tr><td colspan='2' class='text-center'><?php echo html::a('javascript:void(0)', $lang->confirm, "class='btn btn-primary' data-dismiss='modal'")?></td></tr>
                  </table>
                </div>
              </div>
            </div>
          </td>
          <td>
            <?php echo html::select("assignedTo[$i]", $users, $member, "class='form-control'");?>
            <?php echo html::a("#modal{$i}", $lang->task->team, "class='form-control btn hidden' data-toggle='modal' data-target='#modal{$i}'");?>
          </td>
          <?php endif;?>
          <td><?php echo html::textarea("desc[$i]", '', "rows='1' class='form-control'");?></td>
          <td><?php echo html::input("deadline[$i]", '', "class='form-control form-date'");?></td>
          <td><?php echo html::select("pri[$i]", $lang->task->priList, $pri, "class=form-control");?></td>
          <td><?php echo html::input("estimate[$i]", '', "class='form-control text-center' placeholder='{$lang->task->hour}'");?></td>
        </tr>
        <?php endfor;?>
        <tr>
          <td colspan='<?php echo $isChildren ? 6 : 7?>' class='text-center'>
          <?php
          $browseLink = $this->session->taskList ? $this->session->taskList : inlink('browse', "project=$task->project");
          echo html::submitButton() . html::a($browseLink, $lang->goback, "class='btn btn-default'") . html::hidden('referer', $this->server->http_referer);
          ?>
          </td>
        </tr>
      </table>
    </div>
  </form>
</div>
<?php include $app->getAppRoot() . '../sys/common/view/footer.modal.html.php';?>
