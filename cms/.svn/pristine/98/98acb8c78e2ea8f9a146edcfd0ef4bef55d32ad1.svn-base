<div class='panel thread'>
  <div class='panel-heading'>
    <i class='icon-comment-alt pull-left'></i>
    <div class='panel-actions pull-right'>
      <?php if($thread->readonly) echo "<span class='label'><i class='icon-lock'></i> " . $lang->thread->readonly . "</span> &nbsp;"; ?>
    </div>
    <strong><?php $common->printForum($board, $thread);?></strong>
    <div class='text-muted'><?php echo $thread->createdDate;?></div>
  </div>
  <div>
    <table class='table'>
      <tr>
        <td class='speaker'>
         <?php
         if(isset($speakers[$thread->author]))
         {
             $this->thread->printSpeaker($speakers[$thread->author]);
         }
         else
         {
             echo $thread->author;
         }
         ?>
        </td>
        <td id='<?php echo $thread->id;?>' class='thread-wrapper'>
          <div class='thread-content ariticle-content'><?php echo $thread->content;?></div>
          <?php $this->thread->printFiles($thread, $this->thread->canManage($board->id, $thread->author));?>
        </td>
      </tr>
    </table>
  </div>
  <div class='thread-foot'>
    <?php if($thread->editor): ?>
    <small class='text-muted'><?php printf($lang->thread->lblEdited, $thread->editorRealname, $thread->editedDate); ?></small>
    <?php endif; ?>
    <div class='pull-right thread-actions'>
      <?php if($this->app->user->account != 'guest'): ?>
        <?php if($this->thread->canManage($board->id)): ?>
        <span class='dropdown dropup'>
          <a data-toggle='dropdown' href='###'><i class='icon-flag-alt'></i> <?php echo $lang->thread->sticks[$thread->stick]; ?> <span class='caret'></span></a>
          <ul class='dropdown-menu' role='menu' aria-labelledby='dLabel'>
          <?php
          foreach($lang->thread->sticks as $stick => $label)
          {
              if($thread->stick != $stick)
              {
                  commonModel::printLink('thread', 'stick', "thread=$thread->id&stick=$stick", $label, "class='jsoner'", '', '', 'li');
              }
              else
              {
                  echo '<li class="active"><a href="###">' . $label . '</a></li>';
              }
          }
          ?>
          </ul>
        </span>
        <?php
        if($thread->hidden)
        {
            commonModel::printLink('thread', 'switchStatus', "threadID=$thread->id", '<i class="icon-eye-open"></i> ' . $lang->thread->show, "class='switcher'");
        }
        else
        {
            commonModel::printLink('thread', 'switchStatus', "threadID=$thread->id", '<i class="icon-eye-close"></i> ' . $lang->thread->hide, "class='switcher'");
        }
        commonModel::printLink('thread', 'delete', "threadID=$thread->id", '<i class="icon-trash"></i> ' . $lang->delete, "class='deleter'");
        ?>
        <?php endif; ?>
      <?php if($this->thread->canManage($board->id, $thread->author)) commonModel::printLink('thread', 'edit', "threadID=$thread->id", '<i class="icon-pencil"></i> ' . $lang->edit); ?>
      <a href='#reply' class='thread-reply-btn<?php echo ($thread->readonly ? ' disabled' : '');?>'><i class='icon-reply'></i> <?php echo $lang->reply->common; ?></a>
      <?php else: ?>
      <a href="<?php echo $this->createLink('user', 'login', 'referer=' . helper::safe64Encode($this->app->getURI(true))); ?>#reply" class="thread-reply-btn"><i class="icon-reply"></i> <?php echo $lang->reply->common; ?></a>
      <?php endif; ?>
    </div>
  </div>
</div>
