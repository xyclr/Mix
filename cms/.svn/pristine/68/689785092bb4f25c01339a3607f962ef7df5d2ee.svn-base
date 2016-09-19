<?php
/**
 * The action view of common module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     common 
 * @version     $Id: chosen.html.php 7417 2013-12-23 07:51:50Z wwccss $
 * @link        http://www.ranzhico.com
 */
?>
<?php if($extView = $this->getExtViewFile(__FILE__)){include $extView; return helper::cd();}?>
<script src='<?php echo $config->webRoot;?>js/jquery/reverseorder/raw.js' type='text/javascript'></script>

<div class='panel panel-history'>
  <div class='panel-heading'>
    <strong><?php echo $lang->history?></strong>
    <div class='panel-actions'>
      <span class='btn btn-mini sorter hand'> <?php echo "<span title='$lang->reverse' class='log-asc'></span>";?></span>
      <span class='btn btn-mini toggle-all change-show hand' title="<?php echo $lang->switchDisplay;?>"></span>
    </div>
  </div>
  <div class='panel-body'>
    <ol>
      <?php $i = 1; ?>
      <?php foreach($actions as $action):?>
      <?php $canEditComment = ($action->action != 'record' and end($actions) == $action and $action->comment and $this->methodName == 'view' and $action->actor == $this->app->user->account);?>
      <li value='<?php echo $i ++;?>'>
      <?php
      if(isset($users[$action->actor])) $action->actor = $users[$action->actor];
      if($action->action == 'assigned' and isset($users[$action->extra]) ) $action->extra = $users[$action->extra];
      if(strpos($action->actor, ':') !== false) $action->actor = substr($action->actor, strpos($action->actor, ':') + 1);
      ?>
      <span>
        <?php $this->action->printAction($action);?>
        <?php if(!empty($action->history)) echo "<span id='switchButton$i' class='hand toggle change-show btn btn-mini'></span>";?>
      </span>
      <?php if(!empty($action->comment) or !empty($action->history)):?>
      <?php if(!empty($action->comment)) echo "<div class='history'>";?>
        <div class='changes history' style='display:none;'>
        <?php echo $this->action->printChanges($action->objectType, $action->history, $action->action);?>
        </div>
        <?php if($canEditComment):?>
        <span class='link-button pull-right comment<?php echo $action->id;?>'><?php echo html::a('#lastCommentBox', '<i class="icon-edit-sign icon-large"></i>', "onclick='toggleComment($action->id)'")?></span>
        <?php endif;?>
        <?php if($action->action == 'record'):?>
        <span class='link-button text-muted pull-right'>
        <?php 
        if(helper::isAjaxRequest())
        {
            $append  = "class='loadInModal'";
        }
        else
        {
            $append = $from == 'view' ?  "data-toggle='modal' data-type='ajax'" : '';
        }
        $editUrl =$this->createLink('action', 'editRecord', "id={$action->id}&from={$from}");

        echo html::a($editUrl, '<i class="icon-edit"></i>', $append)
        ?>
        </span>
        <?php endif;?>
        <?php 
        if($action->comment) 
        {
            echo "<div class='comment$action->id'>";
            echo strip_tags($action->comment) == $action->comment ? nl2br($action->comment) : $action->comment; 
            echo "</div>";
        }
        ?>
        <?php if($canEditComment):?>
        <div id='lastCommentBox' style='display:none'>
          <form method='post' id='ajaxFormComment' action='<?php echo $this->createLink('action', 'editComment', "actionID=$action->id")?>'>
            <p><?php echo html::textarea('lastComment', $action->comment);?></p>
            <p><?php echo html::submitButton() . html::commonButton($lang->goback, 'btn btn-default', "onclick='toggleComment($action->id)'");?></p>
          </form>
        </div>
        <?php endif;?>
        <?php if(!empty($action->comment)) echo "</div>";?>
        <?php endif;?>
      </li>
      <?php endforeach;?>
    </ol>
  </div>
</div>
<?php js::execute($pageJS);?>
