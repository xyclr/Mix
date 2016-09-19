<?php
js::set('objectType', $objectType);
js::set('objectID',   $objectID);
css::internal($pageCSS);
?>
<?php if(isset($comments) and $comments):?>
<div class='panel'>
  <div class='panel-heading'>
    <div class='panel-actions pull-right'><a href='#commentForm' class='btn btn-primary'><i class='icon-comment-alt'></i> <?php echo $lang->message->post; ?></a></div>
    <strong><i class='icon-comments'></i> <?php echo $lang->message->list;?></strong>
  </div>
  <div class='panel-body'>
    <div class='comments-list'>
      <?php foreach($comments as $number => $comment):?>
      <div class='comment' id="comment<?php echo $comment->id?>">
        <div class='content'>
          <div class='text'><span class='author'><strong><?php echo $comment->from . $lang->colon;?></strong></span> &nbsp;<?php echo nl2br($comment->content);?></div>
          <div class='actions text-muted small'>
            <div class='pull-right'></div>
            <?php echo $lang->comment->commentAt . ' ' . $comment->date;?>
          </div>
        </div>
        <?php if(!empty($replies[$comment->id])):?>
          <div class='comments-list'>
            <?php foreach($replies[$comment->id] as $reply):?>
            <div class='comment'>
              <div class='content'>
                <div class='text'><span class='author'><strong><?php echo $reply->from . $lang->colon;?></strong></span> &nbsp;<?php echo nl2br($reply->content);?></div>
                <div class='actions text-muted small'><?php echo $lang->comment->replyAt . ' ' . $reply->date;?></div>
              </div>
            </div>
            <?php endforeach; ?>
          </div>
        <?php endif;?>
      </div>
      <?php endforeach;?>
    </div>
    <div class='pager clearfix' id='pager'><?php $pager->show('right', 'shortest');?></div>
  </div>
</div>
<?php endif;?>

<div class='panel'>
  <div class='panel-heading'><strong><i class='icon-comment-alt'></i> <?php echo $lang->message->post;?></strong></div>
  <div class='panel-body'>
    <form method='post' class='form-horizontal' id='commentForm' action="<?php echo $this->createLink('message', 'post', 'type=comment');?>">
      <div class='form-group'>
        <label for='from' class='col-sm-1 control-label'><?php echo $lang->message->from; ?></label>
        <div class='col-sm-11'>
          <div class='signed-user-info'>
            <i class='icon-user text-muted'></i> <strong><?php echo $this->session->user->realname ;?></strong>
            <?php echo html::hidden('from', $this->session->user->realname);?>
          </div>
        </div>
      </div>
      <div class='form-group'>
        <label for='content' class='col-sm-1 control-label'><?php echo $lang->message->content; ?></label>
        <div class='col-sm-11 required'>
          <?php
          echo html::textarea('content', '', "class='form-control'");
          echo html::hidden('objectType', $objectType);
          echo html::hidden('objectID', $objectID);
          ?>
        </div>
      </div>
      <div class='form-group hiding' id='captchaBox'></div>
      <div class='form-group'>
        <div class='col-sm-11 col-sm-offset-1'><?php echo html::submitButton();?></div>
      </div>
    </form>
  </div>
</div>
<?php js::execute($pageJS);?>
