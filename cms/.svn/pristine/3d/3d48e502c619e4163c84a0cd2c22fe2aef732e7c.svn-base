<?php $i = 1 + ($pager->pageID - 1) * $pager->recPerPage;?>
<?php foreach($replies as $reply):?>
<div id = "<?php echo $reply->id;?>" class="panel panel thread reply <?php echo $i%2!=0?'striped':'';?>">
  <div class='panel-heading'>
    <div class='panel-actions'><strong>#<?php echo $i++;?></strong></div>
    <span class='muted'><i class='icon-comment-alt'></i> <?php echo $reply->createdDate;?></span>
  </div>
  <div>
    <table class='table'>
      <tr>
        <td class='speaker'>
          <?php 
          if(isset($speakers[$reply->author]))
          {
              $this->thread->printSpeaker($speakers[$reply->author]);
          }
          else
          {
              echo $reply->author;
          }
          ?>
        </td>
        <td id='<?php echo $reply->id;?>' class='thread-wrapper'>
          <div class='thread-content article-content'><?php echo $reply->content;?></div>
          <?php $this->reply->printFiles($reply, $this->thread->canManage($board->id, $reply->author));?>
        </td>
      </tr>
    </table>
  </div>
  <div class='thread-foot'>
    <?php if($reply->editor): ?>
    <small class='text-muted'><?php printf($lang->thread->lblEdited, $reply->editorRealname, $reply->editedDate); ?></small>
    <?php endif; ?>
    <div class="pull-right reply-actions thread-actions">
    <?php if($this->app->user->account != 'guest'):?>
    <?php
    if($this->thread->canManage($board->id)) echo html::a($this->createLink('reply', 'delete', "replyID=$reply->id"), '<i class="icon-trash"></i> ' . $lang->delete, "class='deleter'");
    ?>
    <?php if($this->thread->canManage($board->id, $reply->author)) echo html::a($this->createLink('reply', 'edit',   "replyID=$reply->id"), '<i class="icon-pencil"></i> ' . $lang->edit); ?>
    <a href="#reply" class="thread-reply-btn"><i class="icon-reply"></i> <?php echo $lang->reply->common; ?></a>
    <?php else: ?>
    <a href="<?php echo $this->createLink('user', 'login', 'referer=' . helper::safe64Encode($this->app->getURI(true))); ?>#reply" class="thread-reply-btn"><i class="icon-reply"></i> <?php echo $lang->reply->common; ?></a>
    <?php endif; ?>
    </div>
  </div>
</div>
<?php endforeach;?>

<div class='clearfix pager'><?php $pager->show('right', 'short');?></div>

<?php if($this->session->user->account != 'guest'):?>
<div class='panel'>
  <div class='panel-heading'><strong><i class='icon-edit'></i> <?php echo $lang->thread->replies; ?></strong></div>
  <div class='panel-body'>
    <form method='post' enctype='multipart/form-data' id='ajaxForm' action='<?php echo $this->createLink('reply', 'post', "thread=$thread->id");?>'>
      <div class='form-group' id='reply'>
        <?php echo html::textarea('content', '', "rows='6' class='form-control'"); ?>
      </div>
      <div class='row'>
        <div class='col-md-8 col-sm-12'>
          <?php echo $this->fetch('file', 'buildForm'); ?>
        </div>
      </div>
      <div class='form-group'><?php echo html::submitButton(); ?></div>
      <?php 
      echo html::hidden('recTotal',   $pager->recTotal);
      echo html::hidden('recPerPage', $pager->recPerPage);
      echo html::hidden('pageID',     $pager->pageTotal);
      ?>
    </form>
  </div>
</div>
<?php endif;?>
